import { NextRequest, NextResponse } from 'next/server';
import { lookup } from 'dns/promises';
import { isIP } from 'net';
import { prisma } from '@/lib/prisma';

/**
 * Proxy de PDFs para el visor integrado.
 *
 * Muchos sitios (INCIBE, AEPD, etc.) envían X-Frame-Options / CSP
 * `frame-ancestors`, por lo que el navegador se niega a mostrarlos dentro
 * de un <iframe> de otra página. Aquí el servidor descarga el PDF y lo
 * entrega desde el MISMO dominio de CiberShield, donde sí puede incrustarse.
 *
 * Seguridad (anti-SSRF): solo se sirven URLs registradas como Recurso de
 * tipo PDF en la base de datos, nunca una URL arbitraria; además se
 * bloquean direcciones privadas/locales, se limita el tamaño y se
 * verifica que el contenido sea realmente un PDF.
 */
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_BYTES = 30 * 1024 * 1024;
const TIMEOUT_MS = 45_000;

// Copias alternativas del MISMO documento por si el sitio oficial bloquea
// la descarga desde el servidor (algunos sitios rechazan peticiones automáticas).
const ESPEJOS: Record<string, string[]> = {
  'https://www.incibe.es/sites/default/files/docs/guia-ciberataques/osi-guia-ciberataques.pdf': [
    'https://basc-pichincha.org.ec/wp-content/uploads/2025/10/GUIA_DE_CIBERATAQUES.pdf',
  ],
  'https://www.incibe.es/sites/default/files/docs/senior/guia_ciberseguridad_para_todos.pdf': [
    'https://aedhe.es/wp-content/uploads/2023/11/guia_ciberseguridad_para_todos-1.pdf',
  ],
};

const CABECERAS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'application/pdf,application/octet-stream;q=0.9,*/*;q=0.8',
  'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
};

async function descargar(destino: URL): Promise<{ datos: Uint8Array } | { error: string }> {
  if (!(await hostSeguro(destino.hostname))) return { error: 'Dirección no permitida.' };
  for (let intento = 0; intento < 2; intento++) {
    try {
      let actual = destino;
      let respuesta: Response | null = null;
      for (let i = 0; i < 5; i++) {
        respuesta = await fetch(actual, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS), headers: { ...CABECERAS, Referer: actual.origin + '/' } });
        if (respuesta.status >= 300 && respuesta.status < 400 && respuesta.headers.get('location')) {
          actual = new URL(respuesta.headers.get('location')!, actual);
          if (!['http:', 'https:'].includes(actual.protocol) || !(await hostSeguro(actual.hostname))) return { error: 'Redirección no permitida.' };
          continue;
        }
        break;
      }
      if (!respuesta || !respuesta.ok) return { error: `El sitio de origen respondió con error (${respuesta?.status ?? 'sin respuesta'}).` };
      const largo = Number(respuesta.headers.get('content-length') ?? 0);
      if (largo > MAX_BYTES) return { error: 'El documento es demasiado grande para mostrarlo aquí.' };
      const datos = new Uint8Array(await respuesta.arrayBuffer());
      if (datos.byteLength > MAX_BYTES) return { error: 'El documento es demasiado grande para mostrarlo aquí.' };
      if (!Buffer.from(datos.subarray(0, 1024)).toString('latin1').includes('%PDF')) return { error: 'El enlace no apunta a un archivo PDF.' };
      return { datos };
    } catch {
      // reintenta una vez
    }
  }
  return { error: 'No se pudo descargar el documento (tiempo de espera agotado o sitio no disponible).' };
}

function esIpPrivada(ip: string) {
  if (ip.includes(':')) {
    const l = ip.toLowerCase();
    return l === '::1' || l.startsWith('fc') || l.startsWith('fd') || l.startsWith('fe80') || l.startsWith('::ffff:127.') || l.startsWith('::ffff:10.') || l.startsWith('::ffff:192.168.');
  }
  const [a, b] = ip.split('.').map(Number);
  return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || a >= 224;
}

async function hostSeguro(hostname: string) {
  if (hostname === 'localhost' || hostname.endsWith('.local') || hostname.endsWith('.internal')) return false;
  if (isIP(hostname)) return !esIpPrivada(hostname);
  try {
    const res = await lookup(hostname, { all: true });
    return res.length > 0 && res.every((r) => !esIpPrivada(r.address));
  } catch {
    return false;
  }
}

function error(mensaje: string, status: number) {
  const html = `<!doctype html><meta charset="utf-8"><body style="font-family:system-ui;padding:2rem;color:#334"><h3>No se pudo mostrar el documento</h3><p>${mensaje}</p><p>Usa el botón «Abrir aparte» para verlo en otra pestaña.</p></body>`;
  return new NextResponse(html, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) return error('Falta la dirección del documento.', 400);

  let destino: URL;
  try {
    destino = new URL(url);
  } catch {
    return error('La dirección del documento no es válida.', 400);
  }
  if (destino.protocol !== 'https:' && destino.protocol !== 'http:') return error('Dirección no permitida.', 400);

  // Solo URLs que el administrador registró como recurso PDF.
  let registrado = false;
  try {
    registrado = !!(await prisma.recurso.findFirst({ where: { tipo: 'PDF', url }, select: { id: true } }));
  } catch {
    return error('No se pudo verificar el recurso.', 500);
  }
  if (!registrado) return error('Este documento no está registrado en la biblioteca.', 403);

  if (!(await hostSeguro(destino.hostname))) return error('Dirección no permitida.', 403);

  // Se prueba el original y, si falla, copias del mismo documento (ver ESPEJOS).
  const candidatos = [destino.toString(), ...(ESPEJOS[destino.toString()] ?? [])];
  let ultimo = 'No se pudo descargar el documento (tiempo de espera agotado o sitio no disponible).';
  for (const c of candidatos) {
    const r = await descargar(new URL(c));
    if ('datos' in r) {
      return new NextResponse(r.datos, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="documento.pdf"',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
    ultimo = r.error;
  }
  return error(ultimo, 504);
}

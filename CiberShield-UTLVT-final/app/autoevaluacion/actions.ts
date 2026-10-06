'use server';

import { obtenerSesionActual } from '@/lib/auth';
import { autoevaluacionRepository, compararIntentos, type DetalleModulo } from '@/repository/autoevaluacion.repository';
import { estadoRuta } from '@/lib/ruta-estado';
import { MAX_INTENTOS_FINAL } from '@/lib/autoevaluacion-config';
import { categoriaRepository } from '@/repository/categoria.repository';

/**
 * Guarda el resultado de una autoevaluación del estudiante con sesión.
 *  - El primer intento es la autoevaluación INICIAL.
 *  - La FINAL admite hasta MAX_INTENTOS_FINAL intentos (se compara el mejor).
 *  - La FINAL solo se guarda cuando completó todos los módulos y aprobó sus evaluaciones.
 * Sigue siendo práctica libre: no da certificado.
 */
export async function guardarAutoevaluacion(aciertos: number, total: number, detalle: DetalleModulo[]) {
  const usuario = await obtenerSesionActual();
  if (!usuario) return { guardado: false as const };

  try {
    const categorias = await categoriaRepository.findAll();
    const slugs = new Set(categorias.map((c) => c.slug));
    const limpio = (Array.isArray(detalle) ? detalle : [])
      .filter((d) => d && slugs.has(d.slug) && Number.isInteger(d.ok) && Number.isInteger(d.total) && d.total > 0 && d.ok >= 0 && d.ok <= d.total)
      .map((d) => ({ slug: d.slug, ok: d.ok, total: d.total }));
    if (!Number.isInteger(aciertos) || !Number.isInteger(total) || total <= 0 || aciertos < 0 || aciertos > total || limpio.length === 0) {
      return { guardado: false as const };
    }

    // Regla de la ruta: primero la INICIAL; la FINAL solo al terminar todos los módulos y sus evaluaciones.
    const ruta = await estadoRuta(usuario);
    const previos = ruta.intentos;
    let tipo: 'INICIAL' | 'FINAL';
    if (!ruta.tieneInicial) tipo = 'INICIAL';
    else if (ruta.listoParaFinal) {
      if (ruta.intentosFinal >= MAX_INTENTOS_FINAL) return { guardado: false as const, limite: true as const };
      tipo = 'FINAL';
    }
    else return { guardado: false as const };

    const nuevo = await autoevaluacionRepository.crear({
      usuarioId: usuario.id,
      tipo,
      aciertos,
      total,
      porcentaje: Math.round((aciertos / total) * 100),
      detalle: limpio,
    });

    const { inicial, final } = compararIntentos([...previos, nuevo]);
    const resumen = (i: typeof nuevo | null) => (i ? { porcentaje: i.porcentaje, detalle: JSON.parse(i.detalle) as DetalleModulo[], fecha: i.createdAt.toISOString() } : null);
    const usados = tipo === 'FINAL' ? ruta.intentosFinal + 1 : 1;
    return { guardado: true as const, tipo, inicial: resumen(inicial), final: resumen(final), intento: usados, restantes: tipo === 'FINAL' ? MAX_INTENTOS_FINAL - usados : 0 };
  } catch (e) {
    console.error('No se pudo guardar la autoevaluación (¿falta aplicar la migración?):', e);
    return { guardado: false as const, error: true as const };
  }
}

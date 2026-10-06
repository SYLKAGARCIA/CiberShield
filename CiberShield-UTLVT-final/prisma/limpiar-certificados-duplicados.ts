/**
 * Limpia certificados repetidos: deja UNO por estudiante y evaluación (el más
 * antiguo) y elimina los demás. Los intentos (resultados) NO se borran.
 * Uso: npx tsx prisma/limpiar-certificados-duplicados.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const certs = await prisma.certificado.findMany({
    include: { resultado: { select: { evaluacionId: true } } },
    orderBy: { emitidoEn: 'asc' },
  });
  const vistos = new Set<string>();
  const sobrantes: string[] = [];
  for (const c of certs) {
    const clave = `${c.usuarioId}:${c.resultado.evaluacionId}`;
    if (vistos.has(clave)) sobrantes.push(c.id);
    else vistos.add(clave);
  }
  if (sobrantes.length) await prisma.certificado.deleteMany({ where: { id: { in: sobrantes } } });
  console.log(`Certificados: ${certs.length} · eliminados duplicados: ${sobrantes.length} · quedan: ${certs.length - sobrantes.length}`);
}

main().finally(() => prisma.$disconnect());

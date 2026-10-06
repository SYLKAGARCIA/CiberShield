/**
 * Carga SOLO los recursos de tipo VIDEO (y PDF) de seed-recursos.ts,
 * sin tocar el resto de la base de datos. Es seguro ejecutarlo varias
 * veces (usa upsert por id y no pisa lo que ya editaste en el admin).
 *
 * Uso:  npx tsx prisma/seed-videos.ts
 */
import { PrismaClient } from '@prisma/client';
import { RECURSOS_ADICIONALES } from './seed-recursos';

const prisma = new PrismaClient();

async function main() {
  let creados = 0;
  for (const r of RECURSOS_ADICIONALES.filter((x) => x.tipo === 'VIDEO' || x.tipo === 'PDF')) {
    const categoria = await prisma.categoria.findUnique({ where: { slug: r.categoriaSlug } });
    const existente = await prisma.recurso.findUnique({ where: { id: r.id } });
    await prisma.recurso.upsert({
      where: { id: r.id },
      update: {},
      create: { id: r.id, titulo: r.titulo, descripcion: r.descripcion, tipo: r.tipo, url: r.url, categoriaId: categoria?.id },
    });
    if (!existente) creados++;
  }
  console.log(`✅ ${creados} recursos nuevos (PDF/video) agregados.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

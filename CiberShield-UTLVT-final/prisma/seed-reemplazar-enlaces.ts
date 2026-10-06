/**
 * Convierte en tu base de datos los recursos tipo ENLACE (y corrige dos PDF)
 * en VIDEO/PDF integrados. Actualiza por `id`: si ya existe, lo sobrescribe
 * con los datos de prisma/recursos-multimedia.ts; si no existe, lo crea.
 *
 * Uso:  npx tsx prisma/seed-reemplazar-enlaces.ts
 * Es seguro repetirlo. No toca recursos que hayas creado tú en el admin.
 */
import { PrismaClient } from '@prisma/client';
import { REEMPLAZOS } from './recursos-multimedia';

const prisma = new PrismaClient();

async function main() {
  let actualizados = 0;
  let creados = 0;
  for (const r of REEMPLAZOS) {
    const categoria = await prisma.categoria.findUnique({ where: { slug: r.categoriaSlug } });
    const existe = await prisma.recurso.findUnique({ where: { id: r.id } });
    const datos = { titulo: r.titulo, descripcion: r.descripcion, tipo: r.tipo, url: r.url, categoriaId: categoria?.id ?? null };
    await prisma.recurso.upsert({ where: { id: r.id }, update: datos, create: { id: r.id, ...datos } });
    if (existe) actualizados++; else creados++;
  }
  const quedan = await prisma.recurso.count({ where: { tipo: 'ENLACE' } });
  console.log(`✅ ${actualizados} recursos actualizados, ${creados} creados. Recursos tipo ENLACE restantes: ${quedan}.`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

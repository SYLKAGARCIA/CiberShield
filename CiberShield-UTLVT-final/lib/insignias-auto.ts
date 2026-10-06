import { prisma } from '@/lib/prisma';
import { insigniaRepository } from '@/repository/insignia.repository';

const NOMBRE_FINAL = 'Ciberseguro/a CiberShield';

/**
 * Entrega insignias según el progreso real del estudiante:
 *  - una por cada módulo completado, y
 *  - la insignia final al completar TODOS los módulos.
 * Crea la insignia si aún no existe (por nombre) y es idempotente: se puede
 * llamar muchas veces sin duplicar. Devuelve los nombres recién otorgados.
 * Nunca lanza: si algo falla, el progreso del módulo igual queda guardado.
 */
export async function otorgarInsigniasPorProgreso(usuarioId: string, categoriaId: string): Promise<string[]> {
  const nuevas: string[] = [];
  try {
    const asegurar = async (nombre: string, descripcion: string, icono: string, criterio: string) => {
      const insignia = await prisma.insignia.upsert({
        where: { nombre },
        update: {},
        create: { nombre, descripcion, icono, criterio },
      });
      const ya = await prisma.usuarioInsignia.findUnique({
        where: { usuarioId_insigniaId: { usuarioId, insigniaId: insignia.id } },
      });
      if (!ya) {
        await insigniaRepository.otorgar(usuarioId, insignia.id);
        nuevas.push(nombre);
      }
    };

    const categoria = await prisma.categoria.findUnique({ where: { id: categoriaId }, select: { nombre: true } });
    if (categoria) {
      await asegurar(
        `Módulo completado: ${categoria.nombre}`,
        `Completaste el módulo «${categoria.nombre}».`,
        '🏅',
        `Marcar como completado el módulo «${categoria.nombre}».`
      );
    }

    const [total, completados] = await Promise.all([
      prisma.categoria.count(),
      prisma.progresoModulo.count({ where: { usuarioId } }),
    ]);
    if (total > 0 && completados >= total) {
      await asegurar(
        NOMBRE_FINAL,
        'Completaste todos los módulos de CiberShield. ¡Ya sabes cómo protegerte en línea!',
        '🛡️',
        'Completar todos los módulos de la plataforma.'
      );
    }
  } catch (e) {
    console.error('No se pudieron otorgar insignias:', e);
  }
  return nuevas;
}

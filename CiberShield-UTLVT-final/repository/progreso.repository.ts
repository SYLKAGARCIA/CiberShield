import { prisma } from '@/lib/prisma';

/**
 * Progreso de módulos del estudiante. Las lecturas son tolerantes a
 * fallos (devuelven vacío) para que, si la migración aún no se aplicó,
 * el resto del sitio siga funcionando.
 */
class ProgresoRepository {
  async completadosPorUsuario(usuarioId: string) {
    try {
      return await prisma.progresoModulo.findMany({
        where: { usuarioId },
        orderBy: { completadoEn: 'desc' },
        include: { categoria: true },
      });
    } catch {
      return [];
    }
  }

  async estaCompletado(usuarioId: string, categoriaId: string) {
    try {
      const r = await prisma.progresoModulo.findUnique({
        where: { usuarioId_categoriaId: { usuarioId, categoriaId } },
      });
      return !!r;
    } catch {
      return false;
    }
  }

  marcar(usuarioId: string, categoriaId: string) {
    return prisma.progresoModulo.upsert({
      where: { usuarioId_categoriaId: { usuarioId, categoriaId } },
      update: {},
      create: { usuarioId, categoriaId },
    });
  }

  async desmarcar(usuarioId: string, categoriaId: string) {
    await prisma.progresoModulo.deleteMany({ where: { usuarioId, categoriaId } });
  }
}

export const progresoRepository = new ProgresoRepository();

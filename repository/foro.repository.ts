import { prisma } from '@/lib/prisma';

class ForoRepository {
  async listarHilos() {
    try {
      return await prisma.foroHilo.findMany({
        orderBy: { createdAt: 'desc' },
        include: { autor: { select: { name: true } }, _count: { select: { respuestas: true } } },
      });
    } catch {
      return null; // null = el foro aún no está disponible (migración pendiente)
    }
  }

  async obtenerHilo(id: string) {
    try {
      return await prisma.foroHilo.findUnique({
        where: { id },
        include: {
          autor: { select: { name: true, role: { select: { name: true } } } },
          respuestas: {
            orderBy: { createdAt: 'asc' },
            include: { autor: { select: { name: true, role: { select: { name: true } } } } },
          },
        },
      });
    } catch {
      return null;
    }
  }

  crearHilo(autorId: string, titulo: string, contenido: string) {
    return prisma.foroHilo.create({ data: { autorId, titulo, contenido } });
  }

  crearRespuesta(autorId: string, hiloId: string, contenido: string) {
    return prisma.foroRespuesta.create({ data: { autorId, hiloId, contenido } });
  }

  eliminarHilo(id: string) {
    return prisma.foroHilo.delete({ where: { id } });
  }

  eliminarRespuesta(id: string) {
    return prisma.foroRespuesta.delete({ where: { id } });
  }
}

export const foroRepository = new ForoRepository();

import { prisma } from '@/lib/prisma';
import type { Evaluacion, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateEvaluacionInput = Prisma.EvaluacionCreateInput;
type UpdateEvaluacionInput = Prisma.EvaluacionUpdateInput;

class EvaluacionRepository
  implements Repository<Evaluacion, CreateEvaluacionInput, UpdateEvaluacionInput>
{
  findAll() {
    return prisma.evaluacion.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { preguntas: true, resultados: true } } },
    });
  }

  findActivas() {
    return prisma.evaluacion.findMany({
      where: { activa: true },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { preguntas: true } } },
    });
  }

  findById(id: string): Promise<Evaluacion | null> {
    return prisma.evaluacion.findUnique({ where: { id } });
  }

  /** Incluye preguntas y sus opciones, ordenadas — lista para renderizar el quiz. */
  findParaRendir(id: string) {
    return prisma.evaluacion.findUnique({
      where: { id },
      include: {
        preguntas: {
          orderBy: { orden: 'asc' },
          include: { opciones: { orderBy: { orden: 'asc' } } },
        },
      },
    });
  }

  /** Igual que `findParaRendir`, pero también trae preguntas/opciones para el panel admin. */
  findConPreguntas(id: string) {
    return this.findParaRendir(id);
  }

  create(data: CreateEvaluacionInput): Promise<Evaluacion> {
    return prisma.evaluacion.create({ data });
  }

  update(id: string, data: UpdateEvaluacionInput): Promise<Evaluacion> {
    return prisma.evaluacion.update({ where: { id }, data });
  }

  delete(id: string): Promise<Evaluacion> {
    return prisma.evaluacion.delete({ where: { id } });
  }
}

export const evaluacionRepository = new EvaluacionRepository();

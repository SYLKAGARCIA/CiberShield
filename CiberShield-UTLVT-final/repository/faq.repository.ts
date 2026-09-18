import { prisma } from '@/lib/prisma';
import type { PreguntaFrecuente, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateFAQInput = Prisma.PreguntaFrecuenteCreateInput;
type UpdateFAQInput = Prisma.PreguntaFrecuenteUpdateInput;

class FaqRepository
  implements Repository<PreguntaFrecuente, CreateFAQInput, UpdateFAQInput>
{
  findAll(): Promise<PreguntaFrecuente[]> {
    return prisma.preguntaFrecuente.findMany({ orderBy: { orden: 'asc' } });
  }

  findPublicadas(): Promise<PreguntaFrecuente[]> {
    return prisma.preguntaFrecuente.findMany({
      where: { publicada: true },
      orderBy: { orden: 'asc' },
    });
  }

  findById(id: string): Promise<PreguntaFrecuente | null> {
    return prisma.preguntaFrecuente.findUnique({ where: { id } });
  }

  create(data: CreateFAQInput): Promise<PreguntaFrecuente> {
    return prisma.preguntaFrecuente.create({ data });
  }

  update(id: string, data: UpdateFAQInput): Promise<PreguntaFrecuente> {
    return prisma.preguntaFrecuente.update({ where: { id }, data });
  }

  delete(id: string): Promise<PreguntaFrecuente> {
    return prisma.preguntaFrecuente.delete({ where: { id } });
  }
}

export const faqRepository = new FaqRepository();

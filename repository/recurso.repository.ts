import { prisma } from '@/lib/prisma';
import type { Recurso, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateRecursoInput = Prisma.RecursoCreateInput;
type UpdateRecursoInput = Prisma.RecursoUpdateInput;

class RecursoRepository
  implements Repository<Recurso, CreateRecursoInput, UpdateRecursoInput>
{
  findAll() {
    return prisma.recurso.findMany({
      include: { categoria: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string): Promise<Recurso | null> {
    return prisma.recurso.findUnique({ where: { id } });
  }

  /** Filtra por tipo ("PDF"|"VIDEO"|"ENLACE"|"IMAGEN") y/o categoría; ambos opcionales. */
  findFiltrados(filtros: { tipo?: string; categoriaSlug?: string }) {
    return prisma.recurso.findMany({
      where: {
        tipo: filtros.tipo,
        categoria: filtros.categoriaSlug ? { slug: filtros.categoriaSlug } : undefined,
      },
      include: { categoria: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: CreateRecursoInput): Promise<Recurso> {
    return prisma.recurso.create({ data });
  }

  update(id: string, data: UpdateRecursoInput): Promise<Recurso> {
    return prisma.recurso.update({ where: { id }, data });
  }

  delete(id: string): Promise<Recurso> {
    return prisma.recurso.delete({ where: { id } });
  }
}

export const recursoRepository = new RecursoRepository();

import { prisma } from '@/lib/prisma';
import type { Categoria, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateCategoriaInput = Prisma.CategoriaCreateInput;
type UpdateCategoriaInput = Prisma.CategoriaUpdateInput;

/**
 * Repositorio de Categorías.
 * Toda la aplicación (Server Actions, API Routes) debe pasar por aquí
 * para leer o escribir categorías — nunca debe llamarse a `prisma`
 * directamente desde components o features.
 */
class CategoriaRepository
  implements Repository<Categoria, CreateCategoriaInput, UpdateCategoriaInput>
{
  findAll(): Promise<Categoria[]> {
    return prisma.categoria.findMany({ orderBy: { nombre: 'asc' } });
  }

  findById(id: string): Promise<Categoria | null> {
    return prisma.categoria.findUnique({ where: { id } });
  }

  findBySlug(slug: string): Promise<Categoria | null> {
    return prisma.categoria.findUnique({ where: { slug } });
  }

  create(data: CreateCategoriaInput): Promise<Categoria> {
    return prisma.categoria.create({ data });
  }

  update(id: string, data: UpdateCategoriaInput): Promise<Categoria> {
    return prisma.categoria.update({ where: { id }, data });
  }

  delete(id: string): Promise<Categoria> {
    return prisma.categoria.delete({ where: { id } });
  }
}

// Se exporta una única instancia (patrón singleton simple), ya que el
// repositorio no guarda estado propio entre llamadas.
export const categoriaRepository = new CategoriaRepository();

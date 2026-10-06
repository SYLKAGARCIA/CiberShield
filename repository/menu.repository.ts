import { prisma } from '@/lib/prisma';
import type { ItemMenu, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateItemMenuInput = Prisma.ItemMenuCreateInput;
type UpdateItemMenuInput = Prisma.ItemMenuUpdateInput;

class MenuRepository
  implements Repository<ItemMenu, CreateItemMenuInput, UpdateItemMenuInput>
{
  findAll(): Promise<ItemMenu[]> {
    return prisma.itemMenu.findMany({ orderBy: { orden: 'asc' } });
  }

  findById(id: string): Promise<ItemMenu | null> {
    return prisma.itemMenu.findUnique({ where: { id } });
  }

  /**
   * Devuelve los ítems raíz (sin padre) de una ubicación, con sus
   * hijos ya cargados, listos para renderizar un menú con submenús.
   * `ubicacion` debe ser "HEADER" o "FOOTER" (ver schema.prisma).
   */
  findByUbicacion(ubicacion: 'HEADER' | 'FOOTER') {
    return prisma.itemMenu.findMany({
      where: { ubicacion, padreId: null },
      orderBy: { orden: 'asc' },
      include: { hijos: { orderBy: { orden: 'asc' } } },
    });
  }

  create(data: CreateItemMenuInput): Promise<ItemMenu> {
    return prisma.itemMenu.create({ data });
  }

  update(id: string, data: UpdateItemMenuInput): Promise<ItemMenu> {
    return prisma.itemMenu.update({ where: { id }, data });
  }

  delete(id: string): Promise<ItemMenu> {
    return prisma.itemMenu.delete({ where: { id } });
  }
}

export const menuRepository = new MenuRepository();

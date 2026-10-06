import { prisma } from '@/lib/prisma';
import type { Banner, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateBannerInput = Prisma.BannerCreateInput;
type UpdateBannerInput = Prisma.BannerUpdateInput;

class BannerRepository
  implements Repository<Banner, CreateBannerInput, UpdateBannerInput>
{
  findAll(): Promise<Banner[]> {
    return prisma.banner.findMany({ orderBy: { orden: 'asc' } });
  }

  findById(id: string): Promise<Banner | null> {
    return prisma.banner.findUnique({ where: { id } });
  }

  /**
   * Devuelve los banners activos de un grupo (ej. "home-hero"),
   * ordenados, listos para alimentar un carrusel. Respeta la ventana
   * de vigencia (fechaInicio/fechaFin) cuando está definida.
   */
  findActivosPorGrupo(grupo: string): Promise<Banner[]> {
    const ahora = new Date();
    return prisma.banner.findMany({
      where: {
        grupo,
        activo: true,
        AND: [
          { OR: [{ fechaInicio: null }, { fechaInicio: { lte: ahora } }] },
          { OR: [{ fechaFin: null }, { fechaFin: { gte: ahora } }] },
        ],
      },
      orderBy: { orden: 'asc' },
    });
  }

  create(data: CreateBannerInput): Promise<Banner> {
    return prisma.banner.create({ data });
  }

  update(id: string, data: UpdateBannerInput): Promise<Banner> {
    return prisma.banner.update({ where: { id }, data });
  }

  delete(id: string): Promise<Banner> {
    return prisma.banner.delete({ where: { id } });
  }
}

export const bannerRepository = new BannerRepository();

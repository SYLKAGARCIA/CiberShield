import { prisma } from '@/lib/prisma';
import type { Publicacion, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreatePublicacionInput = Prisma.PublicacionCreateInput;
type UpdatePublicacionInput = Prisma.PublicacionUpdateInput;

class PublicacionRepository
  implements Repository<Publicacion, CreatePublicacionInput, UpdatePublicacionInput>
{
  findAll(): Promise<Publicacion[]> {
    return prisma.publicacion.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findById(id: string): Promise<Publicacion | null> {
    return prisma.publicacion.findUnique({ where: { id } });
  }

  findBySlug(slug: string) {
    return prisma.publicacion.findUnique({
      where: { slug },
      include: { categoria: true, autor: true },
    });
  }

  /** Publicaciones publicadas de un tipo ("ARTICULO" | "NOTICIA"), más recientes primero. */
  findPublicadas(tipo: 'ARTICULO' | 'NOTICIA', limite?: number) {
    return prisma.publicacion.findMany({
      where: { tipo, publicado: true },
      include: { categoria: true },
      orderBy: { publicadoEn: 'desc' },
      take: limite,
    });
  }

  /** Artículos publicados de una categoría específica (por slug de categoría). */
  findPorCategoria(categoriaSlug: string) {
    return prisma.publicacion.findMany({
      where: {
        tipo: 'ARTICULO',
        publicado: true,
        categoria: { slug: categoriaSlug },
      },
      include: { categoria: true },
      orderBy: { publicadoEn: 'desc' },
    });
  }

  /**
   * Para el panel administrativo: todas las publicaciones (publicadas
   * o no), opcionalmente filtradas por tipo. A diferencia de
   * `findPublicadas`, incluye borradores — el admin necesita verlos
   * para poder editarlos y publicarlos.
   */
  findParaAdmin(tipo?: 'ARTICULO' | 'NOTICIA') {
    return prisma.publicacion.findMany({
      where: tipo ? { tipo } : undefined,
      include: { categoria: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Búsqueda de texto simple sobre título/resumen/contenido, solo
   * entre publicaciones ya publicadas. SQLite no tiene un motor de
   * búsqueda de texto completo habilitado por defecto en Prisma, así
   * que se usa `contains` (suficiente para el tamaño de este sitio).
   */
  buscar(query: string, categoriaSlug?: string) {
    return prisma.publicacion.findMany({
      where: {
        publicado: true,
        categoria: categoriaSlug ? { slug: categoriaSlug } : undefined,
        OR: [
          { titulo: { contains: query } },
          { resumen: { contains: query } },
          { contenido: { contains: query } },
        ],
      },
      include: { categoria: true },
      orderBy: { publicadoEn: 'desc' },
    });
  }

  create(data: CreatePublicacionInput): Promise<Publicacion> {
    return prisma.publicacion.create({ data });
  }

  update(id: string, data: UpdatePublicacionInput): Promise<Publicacion> {
    return prisma.publicacion.update({ where: { id }, data });
  }

  delete(id: string): Promise<Publicacion> {
    return prisma.publicacion.delete({ where: { id } });
  }
}

export const publicacionRepository = new PublicacionRepository();

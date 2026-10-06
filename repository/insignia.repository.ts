import { prisma } from '@/lib/prisma';
import type { Insignia, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateInsigniaInput = Prisma.InsigniaCreateInput;
type UpdateInsigniaInput = Prisma.InsigniaUpdateInput;

class InsigniaRepository
  implements Repository<Insignia, CreateInsigniaInput, UpdateInsigniaInput>
{
  findAll(): Promise<Insignia[]> {
    return prisma.insignia.findMany({ orderBy: { nombre: 'asc' } });
  }

  /** Igual que findAll(), pero con la cantidad de estudiantes que tienen cada una (para el panel admin). */
  findAllConConteo() {
    return prisma.insignia.findMany({
      orderBy: { nombre: 'asc' },
      include: { _count: { select: { usuarios: true } } },
    });
  }

  findById(id: string): Promise<Insignia | null> {
    return prisma.insignia.findUnique({ where: { id } });
  }

  create(data: CreateInsigniaInput): Promise<Insignia> {
    return prisma.insignia.create({ data });
  }

  update(id: string, data: UpdateInsigniaInput): Promise<Insignia> {
    return prisma.insignia.update({ where: { id }, data });
  }

  delete(id: string): Promise<Insignia> {
    return prisma.insignia.delete({ where: { id } });
  }

  /** Insignias que ya tiene un usuario específico (para mostrarlas en su perfil). */
  findDeUsuario(usuarioId: string) {
    return prisma.usuarioInsignia.findMany({
      where: { usuarioId },
      include: { insignia: true },
      orderBy: { obtenidaEn: 'desc' },
    });
  }

  /**
   * Otorga una insignia a un usuario si todavía no la tiene.
   * Usa upsert sobre la clave compuesta para que sea seguro llamarla
   * varias veces sin duplicar ni lanzar error.
   */
  otorgar(usuarioId: string, insigniaId: string) {
    return prisma.usuarioInsignia.upsert({
      where: { usuarioId_insigniaId: { usuarioId, insigniaId } },
      create: { usuarioId, insigniaId },
      update: {},
    });
  }
}

export const insigniaRepository = new InsigniaRepository();

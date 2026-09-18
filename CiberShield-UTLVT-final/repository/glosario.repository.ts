import { prisma } from '@/lib/prisma';
import type { TerminoGlosario, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateTerminoInput = Prisma.TerminoGlosarioCreateInput;
type UpdateTerminoInput = Prisma.TerminoGlosarioUpdateInput;

class GlosarioRepository
  implements Repository<TerminoGlosario, CreateTerminoInput, UpdateTerminoInput>
{
  findAll(): Promise<TerminoGlosario[]> {
    return prisma.terminoGlosario.findMany({ orderBy: { termino: 'asc' } });
  }

  findById(id: string): Promise<TerminoGlosario | null> {
    return prisma.terminoGlosario.findUnique({ where: { id } });
  }

  create(data: CreateTerminoInput): Promise<TerminoGlosario> {
    return prisma.terminoGlosario.create({ data });
  }

  buscar(query: string) {
    return prisma.terminoGlosario.findMany({
      where: {
        OR: [{ termino: { contains: query } }, { definicion: { contains: query } }],
      },
      orderBy: { termino: 'asc' },
    });
  }

  update(id: string, data: UpdateTerminoInput): Promise<TerminoGlosario> {
    return prisma.terminoGlosario.update({ where: { id }, data });
  }

  delete(id: string): Promise<TerminoGlosario> {
    return prisma.terminoGlosario.delete({ where: { id } });
  }
}

export const glosarioRepository = new GlosarioRepository();

import { prisma } from '@/lib/prisma';

class RoleRepository {
  findAll() {
    return prisma.role.findMany({ orderBy: { name: 'asc' } });
  }

  findById(id: string) {
    return prisma.role.findUnique({ where: { id } });
  }
}

export const roleRepository = new RoleRepository();

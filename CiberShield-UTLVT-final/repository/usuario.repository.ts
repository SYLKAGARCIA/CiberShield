import { prisma } from '@/lib/prisma';
import type { User, Role, Prisma } from '@prisma/client';
import type { Repository } from '@/types/repository';

type CreateUserInput = Prisma.UserCreateInput;
type UpdateUserInput = Prisma.UserUpdateInput;

// Los métodos de lectura siempre incluyen el rol (se usa constantemente
// para mostrar permisos y para autenticación); se tipa explícitamente
// para que TypeScript permita acceder a `usuario.role` en quien consuma
// este repositorio (ej. lib/auth.ts).
export type UsuarioConRol = User & { role: Role };

class UsuarioRepository
  implements Repository<User, CreateUserInput, UpdateUserInput>
{
  findAll(): Promise<UsuarioConRol[]> {
    return prisma.user.findMany({
      include: { role: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string): Promise<UsuarioConRol | null> {
    return prisma.user.findUnique({ where: { id }, include: { role: true } });
  }

  findByEmail(email: string): Promise<UsuarioConRol | null> {
    return prisma.user.findUnique({ where: { email }, include: { role: true } });
  }

  findByResetToken(token: string): Promise<UsuarioConRol | null> {
    return prisma.user.findUnique({ where: { resetToken: token }, include: { role: true } });
  }

  guardarTokenReset(id: string, token: string, expires: Date): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { resetToken: token, resetTokenExpires: expires },
    });
  }

  restablecerPassword(id: string, passwordHash: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { passwordHash, resetToken: null, resetTokenExpires: null },
    });
  }

  create(data: CreateUserInput): Promise<User> {
    return prisma.user.create({ data });
  }

  update(id: string, data: UpdateUserInput): Promise<User> {
    return prisma.user.update({ where: { id }, data });
  }

  delete(id: string): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}

export const usuarioRepository = new UsuarioRepository();

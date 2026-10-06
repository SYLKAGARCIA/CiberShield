import { prisma } from '@/lib/prisma';

class SessionRepository {
  create(userId: string, token: string, expiresAt: Date) {
    return prisma.session.create({ data: { userId, token, expiresAt } });
  }

  /** Incluye el usuario y su rol, necesarios para autorizar acceso al panel. */
  findByToken(token: string) {
    return prisma.session.findUnique({
      where: { token },
      include: { user: { include: { role: true } } },
    });
  }

  deleteByToken(token: string) {
    // deleteMany en vez de delete: no falla si el token ya no existe
    // (ej. doble clic en "cerrar sesión").
    return prisma.session.deleteMany({ where: { token } });
  }

  deleteExpiradas() {
    return prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  }
}

export const sessionRepository = new SessionRepository();

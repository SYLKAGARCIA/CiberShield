import { PrismaClient } from '@prisma/client';

/**
 * Patrón singleton para el cliente de Prisma.
 * Evita que Next.js (en modo desarrollo, con hot-reload) cree múltiples
 * instancias de conexión a la base de datos.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

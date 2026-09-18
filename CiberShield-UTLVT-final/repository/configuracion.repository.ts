import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

const SINGLETON_ID = 'singleton';

/**
 * Repositorio de la configuración general del sitio.
 * Patrón singleton (igual que ContenidoInicio, ver
 * repository/contenido-inicio.repository.ts): solo existe un registro.
 */
class ConfiguracionRepository {
  get() {
    return prisma.configuracion.findUnique({ where: { id: SINGLETON_ID } });
  }

  update(data: Prisma.ConfiguracionUpdateInput) {
    return prisma.configuracion.update({ where: { id: SINGLETON_ID }, data });
  }
}

export const configuracionRepository = new ConfiguracionRepository();

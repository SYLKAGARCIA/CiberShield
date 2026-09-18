import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

type UpdateContenidoInicioInput = Prisma.ContenidoInicioUpdateInput;

const SINGLETON_ID = 'singleton';

/**
 * Repositorio del contenido editable de la página de inicio.
 * Sigue el patrón singleton (ver decisión técnica en docs/02-FASE-2.md):
 * siempre existe un único registro con id fijo "singleton".
 */
class ContenidoInicioRepository {
  get() {
    return prisma.contenidoInicio.findUnique({ where: { id: SINGLETON_ID } });
  }

  update(data: UpdateContenidoInicioInput) {
    return prisma.contenidoInicio.upsert({
      where: { id: SINGLETON_ID },
      create: { id: SINGLETON_ID, ...data } as Prisma.ContenidoInicioCreateInput,
      update: data,
    });
  }
}

export const contenidoInicioRepository = new ContenidoInicioRepository();

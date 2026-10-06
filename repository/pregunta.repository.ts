import { prisma } from '@/lib/prisma';

class PreguntaRepository {
  findById(id: string) {
    return prisma.pregunta.findUnique({
      where: { id },
      include: { opciones: { orderBy: { orden: 'asc' } } },
    });
  }

  /** Crea una pregunta junto con sus opciones en una sola operación anidada. */
  crearConOpciones(data: {
    evaluacionId: string;
    enunciado: string;
    orden: number;
    opciones: { texto: string; esCorrecta: boolean; orden: number }[];
  }) {
    return prisma.pregunta.create({
      data: {
        evaluacionId: data.evaluacionId,
        enunciado: data.enunciado,
        orden: data.orden,
        opciones: { create: data.opciones },
      },
    });
  }

  /**
   * Reemplaza el enunciado y TODAS las opciones de una pregunta.
   * Estrategia simple y segura: se borran las opciones anteriores y se
   * recrean con los valores del formulario, en una transacción. Como
   * las opciones no tienen relaciones propias hijas, esto no arrastra
   * efectos secundarios y evita calcular un diff campo por campo.
   */
  actualizarConOpciones(
    id: string,
    data: {
      enunciado: string;
      opciones: { texto: string; esCorrecta: boolean; orden: number }[];
    }
  ) {
    return prisma.$transaction([
      prisma.opcionRespuesta.deleteMany({ where: { preguntaId: id } }),
      prisma.pregunta.update({
        where: { id },
        data: {
          enunciado: data.enunciado,
          opciones: { create: data.opciones },
        },
      }),
    ]);
  }

  delete(id: string) {
    return prisma.pregunta.delete({ where: { id } });
  }
}

export const preguntaRepository = new PreguntaRepository();

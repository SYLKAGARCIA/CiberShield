import { prisma } from '@/lib/prisma';

class ResultadoEvaluacionRepository {
  create(data: {
    usuarioId: string;
    evaluacionId: string;
    puntaje: number;
    aprobado: boolean;
    respuestas: string; // JSON.stringify() — SQLite no soporta el tipo Json de Prisma
  }) {
    return prisma.resultadoEvaluacion.create({ data });
  }

  /** Envío idéntico reciente (doble clic / reenvío): se reutiliza en vez de duplicar. */
  findReciente(usuarioId: string, evaluacionId: string, respuestas: string, segundos = 120) {
    return prisma.resultadoEvaluacion.findFirst({
      where: { usuarioId, evaluacionId, respuestas, completadoEn: { gte: new Date(Date.now() - segundos * 1000) } },
      orderBy: { completadoEn: 'desc' },
    });
  }

  findById(id: string) {
    return prisma.resultadoEvaluacion.findUnique({
      where: { id },
      include: { evaluacion: true, certificado: true, usuario: true },
    });
  }

  findPorUsuario(usuarioId: string) {
    return prisma.resultadoEvaluacion.findMany({
      where: { usuarioId },
      include: { evaluacion: true, certificado: true },
      orderBy: { completadoEn: 'desc' },
    });
  }
}

export const resultadoEvaluacionRepository = new ResultadoEvaluacionRepository();

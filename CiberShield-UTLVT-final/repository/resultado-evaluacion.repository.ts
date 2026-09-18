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

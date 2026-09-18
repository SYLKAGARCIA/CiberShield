import { prisma } from '@/lib/prisma';

class CertificadoRepository {
  /**
   * Se crea SIN `archivoPdfUrl` a propósito: el código de verificación
   * (`codigo`) lo genera Prisma automáticamente al insertar
   * (`@default(cuid())`), y ese código es el que se usa como nombre del
   * archivo PDF — por eso el PDF solo puede generarse DESPUÉS de crear
   * este registro. Ver `actualizarPdfUrl` y el flujo completo en
   * app/evaluaciones/[id]/actions.ts.
   */
  create(data: { usuarioId: string; resultadoId: string }) {
    return prisma.certificado.create({ data });
  }

  actualizarPdfUrl(id: string, archivoPdfUrl: string) {
    return prisma.certificado.update({ where: { id }, data: { archivoPdfUrl } });
  }

  findByCodigo(codigo: string) {
    return prisma.certificado.findUnique({
      where: { codigo },
      include: {
        usuario: true,
        resultado: { include: { evaluacion: true } },
      },
    });
  }

  findPorUsuario(usuarioId: string) {
    return prisma.certificado.findMany({
      where: { usuarioId },
      include: { resultado: { include: { evaluacion: true } } },
      orderBy: { emitidoEn: 'desc' },
    });
  }

  /** Para el panel administrativo: todos los certificados emitidos, con datos del estudiante y evaluación. */
  findAllParaAdmin() {
    return prisma.certificado.findMany({
      include: { usuario: true, resultado: { include: { evaluacion: true } } },
      orderBy: { emitidoEn: 'desc' },
    });
  }
}

export const certificadoRepository = new CertificadoRepository();

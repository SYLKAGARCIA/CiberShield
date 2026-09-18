'use server';

import { redirect } from 'next/navigation';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { resultadoEvaluacionRepository } from '@/repository/resultado-evaluacion.repository';
import { certificadoRepository } from '@/repository/certificado.repository';
import { generarCertificadoPDF } from '@/lib/certificado-pdf';
import { guardarCertificadoPDF } from '@/lib/certificado-storage';
import { obtenerSesionActual } from '@/lib/auth';

/**
 * Envía y califica una evaluación.
 *
 * REGLA DE SEGURIDAD CLAVE: el puntaje se calcula aquí, en el
 * servidor, comparando las opciones marcadas como correctas EN LA BASE
 * DE DATOS contra lo que el usuario envió. Nunca se confía en un
 * puntaje calculado en el cliente — alguien podría manipular el HTML o
 * el JavaScript del navegador y enviar "aprobado: true" directamente.
 */
export async function enviarEvaluacion(evaluacionId: string, formData: FormData) {
  const usuario = await obtenerSesionActual();
  if (!usuario) {
    redirect(`/login?from=/evaluaciones/${evaluacionId}/realizar`);
  }

  const evaluacion = await evaluacionRepository.findParaRendir(evaluacionId);
  if (!evaluacion || !evaluacion.activa) {
    redirect('/evaluaciones');
  }

  let correctas = 0;
  const detalleRespuestas = evaluacion.preguntas.map((pregunta) => {
    const opcionSeleccionadaId = formData.get(`pregunta_${pregunta.id}`)?.toString() ?? null;
    const opcionCorrecta = pregunta.opciones.find((o) => o.esCorrecta);
    const esCorrecta = opcionSeleccionadaId !== null && opcionSeleccionadaId === opcionCorrecta?.id;

    if (esCorrecta) correctas += 1;

    return {
      preguntaId: pregunta.id,
      enunciado: pregunta.enunciado,
      opcionSeleccionadaId,
      textoSeleccionado:
        pregunta.opciones.find((o) => o.id === opcionSeleccionadaId)?.texto ?? null,
      esCorrecta,
    };
  });

  const totalPreguntas = evaluacion.preguntas.length;
  const puntaje = totalPreguntas > 0 ? Math.round((correctas / totalPreguntas) * 100) : 0;
  const aprobado = puntaje >= evaluacion.puntajeMinimo;

  const resultado = await resultadoEvaluacionRepository.create({
    usuarioId: usuario.id,
    evaluacionId: evaluacion.id,
    puntaje,
    aprobado,
    respuestas: JSON.stringify(detalleRespuestas),
  });

  if (aprobado) {
    await emitirCertificado(usuario.id, usuario.name, evaluacion.titulo, puntaje, resultado.id);
  }

  redirect(`/evaluaciones/${evaluacionId}/resultado/${resultado.id}`);
}

/**
 * Crea el registro de Certificado (Prisma genera el código único vía
 * `@default(cuid())`), y RECIÉN DESPUÉS genera el PDF usando ese
 * código como nombre de archivo, guardándolo en disco y completando
 * `archivoPdfUrl`. El orden importa: no se puede nombrar el archivo
 * con un código que todavía no existe.
 */
async function emitirCertificado(
  usuarioId: string,
  nombreEstudiante: string,
  nombreEvaluacion: string,
  puntaje: number,
  resultadoId: string
) {
  const certificado = await certificadoRepository.create({ usuarioId, resultadoId });

  try {
    const pdfBytes = await generarCertificadoPDF({
      nombreEstudiante,
      nombreEvaluacion,
      puntaje,
      codigo: certificado.codigo,
      fecha: certificado.emitidoEn,
    });
    const url = await guardarCertificadoPDF(certificado.codigo, pdfBytes);
    await certificadoRepository.actualizarPdfUrl(certificado.id, url);
  } catch (error) {
    // Si falla la generación del PDF (ej. sistema de archivos de solo
    // lectura en algunos entornos de despliegue), el Certificado ya
    // quedó registrado igual — el código de verificación sigue siendo
    // válido en /certificados/[codigo], solo faltaría el PDF descargable.
    console.error('No se pudo generar el PDF del certificado:', error);
  }
}

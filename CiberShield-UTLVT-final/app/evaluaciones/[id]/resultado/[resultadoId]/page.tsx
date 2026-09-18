import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { CheckCircle2, XCircle, Download, ExternalLink } from 'lucide-react';
import { resultadoEvaluacionRepository } from '@/repository/resultado-evaluacion.repository';
import { obtenerSesionActual } from '@/lib/auth';

export const metadata: Metadata = { title: 'Resultado de la Evaluación' };

interface PageProps {
  params: { id: string; resultadoId: string };
}

export default async function ResultadoEvaluacionPage({ params }: PageProps) {
  const usuario = await obtenerSesionActual();
  if (!usuario) redirect('/login');

  const resultado = await resultadoEvaluacionRepository.findById(params.resultadoId);

  // El resultado debe existir Y pertenecer al usuario con sesión activa
  // — nadie debería poder ver el resultado de otra persona cambiando
  // el ID en la URL.
  if (!resultado || resultado.usuarioId !== usuario.id) notFound();

  return (
    <div className="mx-auto max-w-lg px-6 py-20 text-center">
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
          resultado.aprobado ? 'bg-seguro-500/10' : 'bg-alerta-500/10'
        }`}
      >
        {resultado.aprobado ? (
          <CheckCircle2 className="text-seguro-500" size={30} aria-hidden="true" />
        ) : (
          <XCircle className="text-alerta-600" size={30} aria-hidden="true" />
        )}
      </div>

      <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900 dark:text-white">
        {resultado.aprobado ? '¡Aprobaste!' : 'No alcanzaste el puntaje mínimo'}
      </h1>
      <p className="mt-2 text-ink-700 dark:text-slate-400">{resultado.evaluacion.titulo}</p>

      <div className="mx-auto mt-8 flex w-fit items-center justify-center rounded-full bg-slate-100 px-6 py-3 dark:bg-surface-dark-elevated">
        <span className="font-display text-3xl font-semibold text-ink-900 dark:text-white">
          {resultado.puntaje}%
        </span>
      </div>
      <p className="mt-2 text-xs text-ink-700/60 dark:text-slate-500">
        Necesitabas {resultado.evaluacion.puntajeMinimo}% para aprobar
      </p>

      <div className="mt-10 flex flex-col items-center gap-3">
        {resultado.aprobado && resultado.certificado ? (
          resultado.certificado.archivoPdfUrl ? (
            <a
              href={resultado.certificado.archivoPdfUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600"
            >
              <Download size={16} aria-hidden="true" />
              Descargar certificado
            </a>
          ) : (
            <p className="text-sm text-alerta-600 dark:text-alerta-400">
              Tu certificado fue registrado (código {resultado.certificado.codigo}), pero el PDF
              no se pudo generar automáticamente. Contacta al administrador con este código.
            </p>
          )
        ) : !resultado.aprobado ? (
          <Link
            href={`/evaluaciones/${resultado.evaluacionId}/realizar`}
            className="inline-flex items-center rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Intentar de nuevo
          </Link>
        ) : null}

        {resultado.certificado && (
          <Link
            href={`/certificados/${resultado.certificado.codigo}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline dark:text-primary-300"
          >
            Ver certificado verificable
            <ExternalLink size={13} aria-hidden="true" />
          </Link>
        )}

        <Link
          href="/evaluaciones"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Volver a Evaluaciones
        </Link>
      </div>
    </div>
  );
}

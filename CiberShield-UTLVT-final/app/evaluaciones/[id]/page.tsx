import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ClipboardList, Clock, Target } from 'lucide-react';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { obtenerSesionActual } from '@/lib/auth';

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const evaluacion = await evaluacionRepository.findById(params.id);
  return { title: evaluacion?.titulo ?? 'Evaluación' };
}

export default async function EvaluacionIntroPage({ params }: PageProps) {
  const [evaluacion, usuario] = await Promise.all([
    evaluacionRepository.findParaRendir(params.id),
    obtenerSesionActual(),
  ]);

  if (!evaluacion || !evaluacion.activa) notFound();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-white">
        <ClipboardList size={26} aria-hidden="true" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-semibold text-ink-900 dark:text-white">
        {evaluacion.titulo}
      </h1>
      {evaluacion.descripcion && (
        <p className="mt-3 text-lg leading-relaxed text-ink-700 dark:text-slate-400">
          {evaluacion.descripcion}
        </p>
      )}

      <div className="mt-8 flex justify-center gap-8">
        <div className="flex items-center gap-2 text-sm text-ink-700 dark:text-slate-400">
          <ClipboardList size={16} aria-hidden="true" />
          {evaluacion.preguntas.length} preguntas
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-700 dark:text-slate-400">
          <Target size={16} aria-hidden="true" />
          {evaluacion.puntajeMinimo}% para aprobar
        </div>
        <div className="flex items-center gap-2 text-sm text-ink-700 dark:text-slate-400">
          <Clock size={16} aria-hidden="true" />
          Sin límite de tiempo
        </div>
      </div>

      <div className="mt-10">
        {usuario ? (
          <Link
            href={`/evaluaciones/${evaluacion.id}/realizar`}
            className="inline-flex items-center rounded-lg bg-seguro-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600"
          >
            Comenzar evaluación
          </Link>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-ink-700 dark:text-slate-400">
              Necesitas una cuenta para guardar tu resultado y certificado.
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href={`/registro`}
                className="inline-flex items-center rounded-lg bg-seguro-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-seguro-600"
              >
                Crear cuenta
              </Link>
              <Link
                href={`/login?from=/evaluaciones/${evaluacion.id}`}
                className="inline-flex items-center rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-ink-900 hover:border-primary-300 dark:border-slate-700 dark:text-white"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

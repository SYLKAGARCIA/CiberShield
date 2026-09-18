import type { Metadata } from 'next';
import Link from 'next/link';
import { ClipboardList, ArrowUpRight } from 'lucide-react';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Evaluaciones',
  descripcion: 'Aprueba una evaluación y obtén tu certificado de concientización digital.',
  ruta: '/evaluaciones',
});

export default async function EvaluacionesPage() {
  const [evaluaciones, usuario] = await Promise.all([
    evaluacionRepository.findActivas(),
    obtenerSesionActual(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Evaluaciones"
        titulo="Pon a prueba lo que aprendiste"
        descripcion="Aprueba una evaluación y obtén tu certificado de concientización digital."
      />

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-10">
        {!usuario && (
          <div className="mb-6 rounded-lg border border-primary-500/20 bg-primary-50 p-4 text-sm text-primary-700 dark:border-primary-500/20 dark:bg-primary-500/5 dark:text-primary-300">
            Necesitas{' '}
            <Link href="/login" className="font-semibold underline">
              iniciar sesión
            </Link>{' '}
            o{' '}
            <Link href="/registro" className="font-semibold underline">
              crear una cuenta
            </Link>{' '}
            para tomar una evaluación y recibir tu certificado.
          </div>
        )}

        {evaluaciones.length === 0 ? (
          <EmptyState
            titulo="Todavía no hay evaluaciones disponibles"
            descripcion="El equipo está preparando el contenido. Vuelve pronto."
          />
        ) : (
          <div className="space-y-4">
            {evaluaciones.map((evaluacion, i) => (
              <Reveal key={evaluacion.id} delay={i * 60}>
                <Link
                  href={`/evaluaciones/${evaluacion.id}`}
                  className="group relative flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-transparent hover:shadow-xl hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-slate-200 transition-colors group-hover:bg-seguro-500 dark:bg-slate-700"
                  />
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                      <ClipboardList size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ink-900 dark:text-white">
                        {evaluacion.titulo}
                      </h3>
                      {evaluacion.descripcion && (
                        <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
                          {evaluacion.descripcion}
                        </p>
                      )}
                      <p className="mt-1.5 text-xs text-ink-700/60 dark:text-slate-500">
                        {evaluacion._count.preguntas} preguntas · Puntaje mínimo{' '}
                        {evaluacion.puntajeMinimo}%
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-ink-700/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-seguro-500 dark:text-slate-600"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

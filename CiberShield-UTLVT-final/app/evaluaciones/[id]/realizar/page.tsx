import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { enviarEvaluacion } from '../actions';

interface PageProps {
  params: { id: string };
}

export const metadata: Metadata = { title: 'Realizar Evaluación' };

export default async function RealizarEvaluacionPage({ params }: PageProps) {
  const usuario = await obtenerSesionActual();
  if (!usuario) redirect(`/login?from=/evaluaciones/${params.id}`);

  const evaluacion = await evaluacionRepository.findParaRendir(params.id);
  if (!evaluacion || !evaluacion.activa) notFound();

  const enviarConId = enviarEvaluacion.bind(null, evaluacion.id);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
        <span className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
          Evaluación
        </span>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink-900 dark:text-white">
          {evaluacion.titulo}
        </h1>
      </div>

      <form action={enviarConId} className="space-y-8">
        {evaluacion.preguntas.map((pregunta, index) => (
          <fieldset
            key={pregunta.id}
            className="rounded-lg border border-slate-200 p-5 dark:border-slate-800"
          >
            <legend className="px-1 font-display text-base font-semibold text-ink-900 dark:text-white">
              {index + 1}. {pregunta.enunciado}
            </legend>
            <div className="mt-3 space-y-2">
              {pregunta.opciones.map((opcion) => (
                <label
                  key={opcion.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink-900 hover:bg-slate-50 dark:text-white dark:hover:bg-surface-dark"
                >
                  <input
                    type="radio"
                    name={`pregunta_${pregunta.id}`}
                    value={opcion.id}
                    required
                    className="h-4 w-4 border-slate-300 text-seguro-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
                  />
                  {opcion.texto}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-seguro-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600"
        >
          Enviar respuestas
        </button>
      </form>
    </div>
  );
}

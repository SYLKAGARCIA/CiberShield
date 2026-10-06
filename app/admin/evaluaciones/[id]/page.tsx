import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Plus, CheckCircle2, Pencil } from 'lucide-react';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { DeleteButton } from '@/components/admin/delete-button';
import { EvaluacionForm } from '../evaluacion-form';
import { actualizarEvaluacion, eliminarPregunta } from '../actions';

export const metadata: Metadata = { title: 'Gestionar Evaluación | Admin' };

interface PageProps {
  params: { id: string };
}

export default async function GestionarEvaluacionPage({ params }: PageProps) {
  const evaluacion = await evaluacionRepository.findParaRendir(params.id);
  if (!evaluacion) notFound();

  const actualizarConId = actualizarEvaluacion.bind(null, evaluacion.id);
  const eliminarPreguntaDeEsta = eliminarPregunta.bind(null, evaluacion.id);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
          {evaluacion.titulo}
        </h1>
        <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
          Edita los datos generales y gestiona sus preguntas.
        </p>
      </div>

      <section>
        <h2 className="mb-4 font-display text-base font-semibold text-ink-900 dark:text-white">
          Datos generales
        </h2>
        <EvaluacionForm
          accion={actualizarConId}
          valoresIniciales={evaluacion}
          volverA="/admin/evaluaciones"
        />
      </section>

      <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
            Preguntas ({evaluacion.preguntas.length})
          </h2>
          <Link
            href={`/admin/evaluaciones/${evaluacion.id}/preguntas/nueva`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-seguro-500 px-4 py-2 text-sm font-semibold text-white hover:bg-seguro-600"
          >
            <Plus size={15} aria-hidden="true" />
            Nueva pregunta
          </Link>
        </div>

        {evaluacion.preguntas.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-ink-700/60 dark:border-slate-700 dark:text-slate-500">
            Todavía no hay preguntas. Los estudiantes no podrán tomar esta evaluación hasta que
            agregues al menos una.
          </p>
        ) : (
          <div className="space-y-3">
            {evaluacion.preguntas.map((pregunta, i) => (
              <div
                key={pregunta.id}
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-surface-dark-elevated"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-ink-900 dark:text-white">
                    {i + 1}. {pregunta.enunciado}
                  </p>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/evaluaciones/${evaluacion.id}/preguntas/${pregunta.id}/editar`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-ink-700 hover:border-seguro-500 hover:text-seguro-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      <Pencil size={12} aria-hidden="true" />
                      Editar
                    </Link>
                    <DeleteButton
                      accion={eliminarPreguntaDeEsta}
                      id={pregunta.id}
                      etiquetaConfirmacion="¿Eliminar esta pregunta y sus opciones?"
                    />
                  </div>
                </div>
                <ul className="mt-2 space-y-1 pl-4">
                  {pregunta.opciones.map((opcion) => (
                    <li
                      key={opcion.id}
                      className="flex items-center gap-2 text-sm text-ink-700 dark:text-slate-400"
                    >
                      {opcion.esCorrecta && (
                        <CheckCircle2 size={13} className="shrink-0 text-seguro-500" aria-hidden="true" />
                      )}
                      <span className={opcion.esCorrecta ? 'font-medium text-seguro-600 dark:text-seguro-400' : ''}>
                        {opcion.texto}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

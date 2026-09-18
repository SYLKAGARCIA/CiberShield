import type { Metadata } from 'next';
import Link from 'next/link';
import { Settings2 } from 'lucide-react';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarEvaluacion } from './actions';

export const metadata: Metadata = { title: 'Evaluaciones | Admin' };

export default async function AdminEvaluacionesPage() {
  const evaluaciones = await evaluacionRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Evaluaciones"
        descripcion="Cada evaluación se gestiona con sus preguntas desde su propia página."
        nuevoHref="/admin/evaluaciones/nueva"
        nuevoEtiqueta="Nueva evaluación"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Preguntas</th>
              <th className="px-4 py-3 font-medium">Resultados</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {evaluaciones.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay evaluaciones todavía.
                </td>
              </tr>
            ) : (
              evaluaciones.map((evaluacion) => (
                <tr key={evaluacion.id}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {evaluacion.titulo}
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {evaluacion._count.preguntas}
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {evaluacion._count.resultados}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        evaluacion.activa
                          ? 'inline-flex items-center rounded-full bg-seguro-500/10 px-2.5 py-0.5 text-xs font-medium text-seguro-600 dark:text-seguro-400'
                          : 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-700/60 dark:bg-slate-800 dark:text-slate-500'
                      }
                    >
                      {evaluacion.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/evaluaciones/${evaluacion.id}`}
                        aria-label="Gestionar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Settings2 size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarEvaluacion}
                        id={evaluacion.id}
                        etiquetaConfirmacion={`¿Eliminar "${evaluacion.titulo}"? Solo es posible si no tiene resultados registrados.`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

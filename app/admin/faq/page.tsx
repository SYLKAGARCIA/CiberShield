import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { faqRepository } from '@/repository/faq.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarFaq } from './actions';

export const metadata: Metadata = { title: 'Preguntas Frecuentes | Admin' };

export default async function AdminFaqPage() {
  const preguntas = await faqRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Preguntas Frecuentes"
        descripcion="Se muestran en /faq ordenadas por el campo 'orden'."
        nuevoHref="/admin/faq/nueva"
        nuevoEtiqueta="Nueva pregunta"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Pregunta</th>
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {preguntas.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay preguntas todavía.
                </td>
              </tr>
            ) : (
              preguntas.map((pregunta) => (
                <tr key={pregunta.id}>
                  <td className="max-w-md px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {pregunta.pregunta}
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">{pregunta.orden}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        pregunta.publicada
                          ? 'inline-flex items-center rounded-full bg-seguro-500/10 px-2.5 py-0.5 text-xs font-medium text-seguro-600 dark:text-seguro-400'
                          : 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-700/60 dark:bg-slate-800 dark:text-slate-500'
                      }
                    >
                      {pregunta.publicada ? 'Publicada' : 'Oculta'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/faq/${pregunta.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton accion={eliminarFaq} id={pregunta.id} />
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

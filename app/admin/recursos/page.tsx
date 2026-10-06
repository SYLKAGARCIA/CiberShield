import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil, ExternalLink } from 'lucide-react';
import { recursoRepository } from '@/repository/recurso.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarRecurso } from './actions';

export const metadata: Metadata = { title: 'Recursos | Admin' };

export default async function AdminRecursosPage() {
  const recursos = await recursoRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Recursos"
        descripcion="PDFs, videos y enlaces mostrados en /recursos."
        nuevoHref="/admin/recursos/nuevo"
        nuevoEtiqueta="Nuevo recurso"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recursos.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay recursos todavía.
                </td>
              </tr>
            ) : (
              recursos.map((recurso) => (
                <tr key={recurso.id}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                    <a
                      href={recurso.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-primary-600"
                    >
                      {recurso.titulo}
                      <ExternalLink size={12} aria-hidden="true" />
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-xs uppercase text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                      {recurso.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {recurso.categoria?.nombre ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/recursos/${recurso.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton accion={eliminarRecurso} id={recurso.id} />
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

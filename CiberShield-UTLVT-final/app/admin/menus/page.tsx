import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { menuRepository } from '@/repository/menu.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarItemMenu } from './actions';

export const metadata: Metadata = { title: 'Menús | Admin' };

export default async function AdminMenusPage() {
  const items = await menuRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Menús"
        descripcion="Controlan los enlaces del encabezado y el pie de página del sitio."
        nuevoHref="/admin/menus/nuevo"
        nuevoEtiqueta="Nuevo ítem"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Etiqueta</th>
              <th className="px-4 py-3 font-medium">URL</th>
              <th className="px-4 py-3 font-medium">Ubicación</th>
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay ítems de menú todavía.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {item.etiqueta}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-700 dark:text-slate-400">
                    {item.url}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-xs uppercase text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                      {item.ubicacion}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">{item.orden}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/menus/${item.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarItemMenu}
                        id={item.id}
                        etiquetaConfirmacion={`¿Eliminar "${item.etiqueta}" del menú?`}
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

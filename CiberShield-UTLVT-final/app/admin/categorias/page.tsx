import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { categoriaRepository } from '@/repository/categoria.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarCategoria } from './actions';

export const metadata: Metadata = { title: 'Categorías | Admin' };

export default async function AdminCategoriasPage() {
  const categorias = await categoriaRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Categorías"
        descripcion="Usadas para clasificar artículos, noticias y recursos."
        nuevoHref="/admin/categorias/nueva"
        nuevoEtiqueta="Nueva categoría"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {categorias.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay categorías todavía.
                </td>
              </tr>
            ) : (
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {categoria.nombre}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-700 dark:text-slate-400">
                    {categoria.slug}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-ink-700 dark:text-slate-400">
                    {categoria.descripcion ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/categorias/${categoria.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarCategoria}
                        id={categoria.id}
                        etiquetaConfirmacion={`¿Eliminar la categoría "${categoria.nombre}"?`}
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

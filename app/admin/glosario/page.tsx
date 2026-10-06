import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { glosarioRepository } from '@/repository/glosario.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarTermino } from './actions';

export const metadata: Metadata = { title: 'Glosario | Admin' };

export default async function AdminGlosarioPage() {
  const terminos = await glosarioRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Glosario"
        descripcion="Términos técnicos explicados en lenguaje simple."
        nuevoHref="/admin/glosario/nuevo"
        nuevoEtiqueta="Nuevo término"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Término</th>
              <th className="px-4 py-3 font-medium">Definición</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {terminos.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay términos todavía.
                </td>
              </tr>
            ) : (
              terminos.map((termino) => (
                <tr key={termino.id}>
                  <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {termino.termino}
                  </td>
                  <td className="max-w-md truncate px-4 py-3 text-ink-700 dark:text-slate-400">
                    {termino.definicion}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/glosario/${termino.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarTermino}
                        id={termino.id}
                        etiquetaConfirmacion={`¿Eliminar el término "${termino.termino}"?`}
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

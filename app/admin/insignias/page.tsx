import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil, Award } from 'lucide-react';
import { insigniaRepository } from '@/repository/insignia.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarInsignia } from './actions';

export const metadata: Metadata = { title: 'Insignias | Admin' };

export default async function AdminInsigniasPage() {
  const insignias = await insigniaRepository.findAllConConteo();

  return (
    <div>
      <AdminPageHeader
        titulo="Insignias"
        descripcion="Gamificación: reconocimientos que los estudiantes pueden ganar."
        nuevoHref="/admin/insignias/nueva"
        nuevoEtiqueta="Nueva insignia"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Insignia</th>
              <th className="px-4 py-3 font-medium">Criterio</th>
              <th className="px-4 py-3 font-medium">Estudiantes que la tienen</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {insignias.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  Todavía no hay insignias creadas.
                </td>
              </tr>
            ) : (
              insignias.map((insignia) => (
                <tr key={insignia.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-seguro-500/10 text-base">
                        {insignia.icono || <Award size={15} className="text-seguro-500" aria-hidden="true" />}
                      </span>
                      <div>
                        <p className="font-medium text-ink-900 dark:text-white">{insignia.nombre}</p>
                        {insignia.descripcion && (
                          <p className="text-xs text-ink-700/70 dark:text-slate-500">
                            {insignia.descripcion}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="max-w-xs px-4 py-3 text-ink-700 dark:text-slate-400">
                    {insignia.criterio || '—'}
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {insignia._count.usuarios}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/insignias/${insignia.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarInsignia}
                        id={insignia.id}
                        etiquetaConfirmacion={`¿Eliminar la insignia "${insignia.nombre}"? Los estudiantes que la tenían la perderán.`}
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { cn } from '@/lib/utils';
import { eliminarPublicacion } from './actions';

export const metadata: Metadata = { title: 'Artículos y Noticias | Admin' };

const FILTROS = [
  { valor: undefined, etiqueta: 'Todos' },
  { valor: 'ARTICULO', etiqueta: 'Artículos' },
  { valor: 'NOTICIA', etiqueta: 'Noticias' },
] as const;

interface PageProps {
  searchParams: { tipo?: string };
}

export default async function AdminPublicacionesPage({ searchParams }: PageProps) {
  const tipoActivo = searchParams.tipo as 'ARTICULO' | 'NOTICIA' | undefined;

  const publicaciones = await publicacionRepository.findParaAdmin(tipoActivo);

  return (
    <div>
      <AdminPageHeader
        titulo="Artículos y Noticias"
        descripcion="Ambos comparten el mismo modelo de datos, filtra por tipo abajo."
        nuevoHref="/admin/publicaciones/nueva"
        nuevoEtiqueta="Nueva publicación"
      />

      <div className="mb-4 flex gap-2">
        {FILTROS.map((filtro) => {
          const activo = tipoActivo === filtro.valor;
          const href = filtro.valor
            ? `/admin/publicaciones?tipo=${filtro.valor}`
            : '/admin/publicaciones';
          return (
            <Link
              key={filtro.etiqueta}
              href={href}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activo
                  ? 'bg-seguro-500 text-white'
                  : 'bg-slate-100 text-ink-700 hover:bg-primary-50 dark:bg-surface-dark-elevated dark:text-slate-400'
              )}
            >
              {filtro.etiqueta}
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Título</th>
              <th className="px-4 py-3 font-medium">Tipo</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {publicaciones.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  No hay publicaciones todavía.
                </td>
              </tr>
            ) : (
              publicaciones.map((publicacion) => (
                <tr key={publicacion.id}>
                  <td className="max-w-xs truncate px-4 py-3 font-medium text-ink-900 dark:text-white">
                    {publicacion.titulo}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-xs uppercase text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                      {publicacion.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">
                    {publicacion.categoria.nombre}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        publicacion.publicado
                          ? 'inline-flex items-center rounded-full bg-seguro-500/10 px-2.5 py-0.5 text-xs font-medium text-seguro-600 dark:text-seguro-400'
                          : 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-700/60 dark:bg-slate-800 dark:text-slate-500'
                      }
                    >
                      {publicacion.publicado ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/publicaciones/${publicacion.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarPublicacion}
                        id={publicacion.id}
                        etiquetaConfirmacion={`¿Eliminar "${publicacion.titulo}"?`}
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

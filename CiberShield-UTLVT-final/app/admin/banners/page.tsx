import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil, ImageOff } from 'lucide-react';
import { bannerRepository } from '@/repository/banner.repository';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { BannerThumbnail } from './banner-thumbnail';
import { eliminarBanner } from './actions';

export const metadata: Metadata = { title: 'Banners | Admin' };

export default async function AdminBannersPage() {
  const banners = await bannerRepository.findAll();

  return (
    <div>
      <AdminPageHeader
        titulo="Banners y Carruseles"
        descripcion="Imágenes rotativas que se muestran en /inicio (grupo home-hero)."
        nuevoHref="/admin/banners/nuevo"
        nuevoEtiqueta="Nuevo banner"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Imagen</th>
              <th className="px-4 py-3 font-medium">Título / Grupo</th>
              <th className="px-4 py-3 font-medium">Orden</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {banners.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-700/60 dark:text-slate-500">
                  Todavía no hay banners. El carrusel no se muestra en /inicio hasta que agregues
                  al menos uno activo.
                </td>
              </tr>
            ) : (
              banners.map((banner) => (
                <tr key={banner.id}>
                  <td className="px-4 py-3">
                    <BannerThumbnail src={banner.imagenUrl} />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink-900 dark:text-white">
                      {banner.titulo || '(sin título)'}
                    </p>
                    <p className="text-xs text-ink-700/70 dark:text-slate-500">{banner.grupo}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-700 dark:text-slate-400">{banner.orden}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        banner.activo
                          ? 'inline-flex items-center rounded-full bg-seguro-500/10 px-2.5 py-0.5 text-xs font-medium text-seguro-600 dark:text-seguro-400'
                          : 'inline-flex items-center rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-medium text-ink-700/70 dark:bg-slate-800 dark:text-slate-500'
                      }
                    >
                      {banner.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/banners/${banner.id}/editar`}
                        aria-label="Editar"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                      >
                        <Pencil size={15} aria-hidden="true" />
                      </Link>
                      <DeleteButton
                        accion={eliminarBanner}
                        id={banner.id}
                        etiquetaConfirmacion={`¿Eliminar el banner "${banner.titulo || banner.id}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {banners.length === 0 && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-700/60 dark:text-slate-500">
          <ImageOff size={13} aria-hidden="true" />
          Tip: usa URLs de imágenes anchas (ej. 1600×600) para que se vean bien en el carrusel.
        </p>
      )}
    </div>
  );
}

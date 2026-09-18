import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Publicacion, Categoria } from '@prisma/client';

type PublicacionConCategoria = Publicacion & { categoria: Categoria };

export function ArticleCard({ publicacion }: { publicacion: PublicacionConCategoria }) {
  const href =
    publicacion.tipo === 'NOTICIA'
      ? `/noticias/${publicacion.slug}`
      : `/articulos/${publicacion.slug}`;

  const fecha = publicacion.publicadoEn
    ? new Date(publicacion.publicadoEn).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-all hover:border-transparent hover:shadow-xl hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 rounded-l-lg bg-slate-200 transition-colors group-hover:bg-seguro-500 dark:bg-slate-700"
      />

      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
          {publicacion.categoria.nombre}
        </span>
        <ArrowUpRight
          size={16}
          className="shrink-0 text-ink-700/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-seguro-500 dark:text-slate-600"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900 group-hover:text-primary-600 dark:text-white">
        {publicacion.titulo}
      </h3>
      {publicacion.resumen && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
          {publicacion.resumen}
        </p>
      )}
      {fecha && (
        <span className="mt-4 border-t border-slate-100 pt-3 text-xs text-ink-700/60 dark:border-slate-800 dark:text-slate-500">
          {fecha}
        </span>
      )}
    </Link>
  );
}

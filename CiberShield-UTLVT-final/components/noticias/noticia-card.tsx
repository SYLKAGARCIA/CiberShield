import Link from 'next/link';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';
import type { Publicacion, Categoria } from '@prisma/client';
import { etiquetaClasificacion } from '@/lib/noticias';
import { cn } from '@/lib/utils';

type Noticia = Publicacion & { categoria: Categoria };

const COLOR: Record<string, string> = {
  NACIONAL: 'bg-primary-500 text-white',
  INTERNACIONAL: 'bg-seguro-500 text-white',
  ALERTA: 'bg-red-600 text-white',
  TENDENCIA: 'bg-alerta-500 text-ink-900',
};

export function NoticiaCard({ noticia }: { noticia: Noticia }) {
  const clasif = etiquetaClasificacion(noticia.clasificacion);
  const fecha = noticia.publicadoEn
    ? new Date(noticia.publicadoEn).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <Link
      href={`/noticias/${noticia.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-primary-900/15 dark:border-slate-800 dark:bg-surface-dark-elevated"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary-500 to-primary-700">
        {noticia.imagenPortada ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={noticia.imagenPortada} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-white/30"><Newspaper size={56} aria-hidden="true" /></div>
        )}
        {clasif && (
          <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest shadow', COLOR[noticia.clasificacion ?? ''] ?? 'bg-white text-ink-900')}>{clasif}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-700/80 dark:text-slate-500">
          {fecha && <span className="inline-flex items-center gap-1"><CalendarDays size={12} aria-hidden="true" />{fecha}</span>}
          <span className="rounded-full bg-primary-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">{noticia.categoria.nombre}</span>
        </div>
        <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900 group-hover:text-primary-600 dark:text-white">{noticia.titulo}</h3>
        {noticia.resumen && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-700 dark:text-slate-400">{noticia.resumen}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-seguro-600 dark:text-seguro-400">Leer noticia <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

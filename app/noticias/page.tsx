import Link from 'next/link';
import type { Metadata } from 'next';
import { Newspaper } from 'lucide-react';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { NoticiaCard } from '@/components/noticias/noticia-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { CLASIFICACIONES } from '@/lib/noticias';
import { cn } from '@/lib/utils';
import { construirMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = construirMetadata({
  titulo: 'Noticias',
  descripcion: 'Noticias nacionales e internacionales, alertas y tendencias de ciberseguridad.',
  ruta: '/noticias',
});

export default async function NoticiasPage({ searchParams }: { searchParams: { clasificacion?: string } }) {
  const activo = CLASIFICACIONES.find((c) => c.valor === searchParams.clasificacion)?.valor;
  const noticias = await publicacionRepository.findNoticias(activo);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-primary-600 to-ink-900 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest"><Newspaper size={14} aria-hidden="true" />Noticias</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">Mantente informado</h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-100">Lo que pasa en ciberseguridad, en el país y en el mundo.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Clasificación de noticias">
          <Link href="/noticias" className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-colors', !activo ? 'bg-seguro-500 text-white' : 'bg-slate-100 text-ink-700 hover:bg-primary-50 dark:bg-surface-dark-elevated dark:text-slate-400')}>Todas</Link>
          {CLASIFICACIONES.map((c) => (
            <Link key={c.valor} href={`/noticias?clasificacion=${c.valor}`} className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-colors', activo === c.valor ? 'bg-seguro-500 text-white' : 'bg-slate-100 text-ink-700 hover:bg-primary-50 dark:bg-surface-dark-elevated dark:text-slate-400')}>{c.etiqueta}</Link>
          ))}
        </div>

        {noticias.length === 0 ? (
          <EmptyState titulo="Todavía no hay noticias en esta sección" descripcion="El equipo editorial publicará novedades próximamente." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {noticias.map((n, i) => (
              <Reveal key={n.id} delay={(i % 6) * 60}><NoticiaCard noticia={n} /></Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

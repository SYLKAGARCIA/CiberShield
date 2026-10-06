import Link from 'next/link';
import type { Metadata } from 'next';
import { Library } from 'lucide-react';
import { recursoRepository } from '@/repository/recurso.repository';
import { RecursoGrid } from '@/components/shared/resource-viewer';
import { EmptyState } from '@/components/shared/empty-state';
import { cn } from '@/lib/utils';
import { construirMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = construirMetadata({
  titulo: 'Biblioteca',
  descripcion: 'PDFs, videos y enlaces para profundizar en ciberseguridad, sin salir de CiberShield.',
  ruta: '/biblioteca',
});

const FILTROS = [
  { valor: undefined, etiqueta: 'Todos' },
  { valor: 'PDF', etiqueta: 'PDF' },
  { valor: 'VIDEO', etiqueta: 'Videos' },
  { valor: 'ENLACE', etiqueta: 'Enlaces' },
  { valor: 'IMAGEN', etiqueta: 'Imágenes' },
] as const;

export default async function BibliotecaPage({ searchParams }: { searchParams: { tipo?: string } }) {
  const tipoActivo = FILTROS.some((f) => f.valor === searchParams.tipo) ? searchParams.tipo : undefined;
  const recursos = await recursoRepository.findFiltrados({ tipo: tipoActivo });

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-primary-500 to-primary-700 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest"><Library size={14} aria-hidden="true" />Biblioteca</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">Material para profundizar</h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-100">Lee los PDF y mira los videos aquí mismo: se abren dentro de CiberShield.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTROS.map((f) => (
            <Link key={f.etiqueta} href={f.valor ? `/biblioteca?tipo=${f.valor}` : '/biblioteca'}
              className={cn('rounded-full px-4 py-1.5 text-sm font-medium transition-colors', tipoActivo === f.valor ? 'bg-seguro-500 text-white' : 'bg-slate-100 text-ink-700 hover:bg-primary-50 dark:bg-surface-dark-elevated dark:text-slate-400')}>
              {f.etiqueta}
            </Link>
          ))}
        </div>
        {recursos.length === 0 ? (
          <EmptyState titulo="No hay recursos con este filtro todavía" descripcion="Prueba con otro filtro o vuelve más adelante." />
        ) : (
          <RecursoGrid recursos={recursos.map((r) => ({ id: r.id, titulo: r.titulo, descripcion: r.descripcion, tipo: r.tipo, url: r.url, modulo: r.categoria?.nombre ?? null }))} />
        )}
      </div>
    </>
  );
}

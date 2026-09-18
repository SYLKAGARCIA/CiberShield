import Link from 'next/link';
import type { Metadata } from 'next';
import { recursoRepository } from '@/repository/recurso.repository';
import { PageHeader } from '@/components/shared/page-header';
import { ResourceCard } from '@/components/shared/resource-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { cn } from '@/lib/utils';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Recursos',
  descripcion: 'PDFs, videos y enlaces útiles para profundizar en ciberseguridad.',
  ruta: '/recursos',
});

const FILTROS = [
  { valor: undefined, etiqueta: 'Todos' },
  { valor: 'PDF', etiqueta: 'PDF' },
  { valor: 'VIDEO', etiqueta: 'Video' },
  { valor: 'ENLACE', etiqueta: 'Enlaces' },
  { valor: 'IMAGEN', etiqueta: 'Imágenes' },
] as const;

interface PageProps {
  searchParams: { tipo?: string };
}

export default async function RecursosPage({ searchParams }: PageProps) {
  const tipoActivo = searchParams.tipo;
  const recursos = await recursoRepository.findFiltrados({ tipo: tipoActivo });

  return (
    <>
      <PageHeader
        eyebrow="Recursos"
        titulo="Material para profundizar"
        descripcion="Una selección curada de guías, videos y enlaces confiables."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <div className="mb-8 flex flex-wrap gap-2">
          {FILTROS.map((filtro) => {
            const activo = tipoActivo === filtro.valor;
            const href = filtro.valor ? `/recursos?tipo=${filtro.valor}` : '/recursos';
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

        {recursos.length === 0 ? (
          <EmptyState
            titulo="No hay recursos en esta categoría todavía"
            descripcion="Prueba con otro filtro o vuelve más adelante."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {recursos.map((recurso, i) => (
              <Reveal key={recurso.id} delay={i * 50}>
                <ResourceCard recurso={recurso} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

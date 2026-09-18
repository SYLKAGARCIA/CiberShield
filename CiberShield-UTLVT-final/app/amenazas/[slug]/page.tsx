import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categoriaRepository } from '@/repository/categoria.repository';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { ArticleCard } from '@/components/shared/article-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { getIconoCategoria } from '@/lib/iconos-categorias';
import { construirMetadata } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoria = await categoriaRepository.findBySlug(params.slug);
  if (!categoria) return {};
  return construirMetadata({
    titulo: `${categoria.nombre} | Amenazas`,
    descripcion: categoria.descripcion ?? undefined,
    ruta: `/amenazas/${params.slug}`,
  });
}

export default async function CategoriaAmenazaPage({ params }: PageProps) {
  const categoria = await categoriaRepository.findBySlug(params.slug);
  if (!categoria) notFound();

  const articulos = await publicacionRepository.findPorCategoria(params.slug);
  const Icono = getIconoCategoria(categoria.slug);

  return (
    <>
      <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-surface-dark-elevated/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dot-grid text-primary-500/[0.04] dark:text-primary-300/[0.05]"
        />
        <div className="relative mx-auto flex max-w-4xl items-start gap-4 px-6 py-16">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg shadow-primary-900/20">
            <Icono size={20} aria-hidden="true" />
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
              Amenazas
            </span>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink-900 dark:text-white md:text-4xl">
              {categoria.nombre}
            </h1>
            {categoria.descripcion && (
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-700 dark:text-slate-400">
                {categoria.descripcion}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {articulos.length === 0 ? (
          <EmptyState
            titulo="Aún no hay artículos en esta categoría"
            descripcion="Vuelve pronto: el equipo está preparando contenido sobre este tema."
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articulos.map((articulo, i) => (
              <Reveal key={articulo.id} delay={i * 60}>
                <ArticleCard publicacion={articulo} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { BookMarked } from 'lucide-react';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { glosarioRepository } from '@/repository/glosario.repository';
import { categoriaRepository } from '@/repository/categoria.repository';
import { PageHeader } from '@/components/shared/page-header';
import { ArticleCard } from '@/components/shared/article-card';
import { EmptyState } from '@/components/shared/empty-state';
import { SearchBar } from '@/components/tools/search-bar';
import { cn } from '@/lib/utils';

export const metadata: Metadata = { title: 'Buscar' };

interface PageProps {
  searchParams: { q?: string; categoria?: string };
}

export default async function BuscarPage({ searchParams }: PageProps) {
  const query = searchParams.q?.trim() ?? '';
  const categoriaActiva = searchParams.categoria;

  const [resultadosPublicaciones, resultadosGlosario, categorias] = await Promise.all([
    query ? publicacionRepository.buscar(query, categoriaActiva) : Promise.resolve([]),
    query ? glosarioRepository.buscar(query) : Promise.resolve([]),
    categoriaRepository.findAll(),
  ]);

  const hayResultados = resultadosPublicaciones.length > 0 || resultadosGlosario.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Buscador"
        titulo="Encuentra lo que necesitas"
        descripcion="Busca en artículos, noticias y el glosario del sitio."
      />

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-10">
        <Suspense fallback={<div className="h-11 rounded-lg bg-slate-100 dark:bg-surface-dark-elevated" />}>
          <SearchBar />
        </Suspense>

        {query && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href={`/buscar?q=${encodeURIComponent(query)}`}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                !categoriaActiva
                  ? 'bg-seguro-500 text-white'
                  : 'bg-slate-100 text-ink-700 hover:bg-primary-50 dark:bg-surface-dark-elevated dark:text-slate-400'
              )}
            >
              Todas las categorías
            </Link>
            {categorias.map((categoria) => (
              <Link
                key={categoria.id}
                href={`/buscar?q=${encodeURIComponent(query)}&categoria=${categoria.slug}`}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                  categoriaActiva === categoria.slug
                    ? 'bg-seguro-500 text-white'
                    : 'bg-slate-100 text-ink-700 hover:bg-primary-50 dark:bg-surface-dark-elevated dark:text-slate-400'
                )}
              >
                {categoria.nombre}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8">
          {!query ? (
            <EmptyState
              titulo="Escribe algo para empezar"
              descripcion='Prueba con un término como "phishing" o "contraseñas".'
            />
          ) : !hayResultados ? (
            <EmptyState
              titulo={`Sin resultados para "${query}"`}
              descripcion="Prueba con otra palabra clave o quita el filtro de categoría."
            />
          ) : (
            <div className="space-y-10">
              {resultadosPublicaciones.length > 0 && (
                <section>
                  <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                    Artículos y noticias ({resultadosPublicaciones.length})
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {resultadosPublicaciones.map((publicacion) => (
                      <ArticleCard key={publicacion.id} publicacion={publicacion} />
                    ))}
                  </div>
                </section>
              )}

              {resultadosGlosario.length > 0 && (
                <section>
                  <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">
                    Glosario ({resultadosGlosario.length})
                  </h2>
                  <div className="mt-4 space-y-3">
                    {resultadosGlosario.map((termino) => (
                      <Link
                        key={termino.id}
                        href="/glosario"
                        className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 hover:border-primary-300 dark:border-slate-800 dark:bg-surface-dark-elevated"
                      >
                        <BookMarked
                          size={16}
                          className="mt-0.5 shrink-0 text-primary-500"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-display font-semibold text-ink-900 dark:text-white">
                            {termino.termino}
                          </p>
                          <p className="mt-0.5 text-sm text-ink-700 dark:text-slate-400">
                            {termino.definicion}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

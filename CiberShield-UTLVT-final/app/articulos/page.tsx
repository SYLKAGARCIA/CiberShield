import type { Metadata } from 'next';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { PageHeader } from '@/components/shared/page-header';
import { ArticleCard } from '@/components/shared/article-card';
import { EmptyState } from '@/components/shared/empty-state';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Artículos y Noticias',
  descripcion: 'Todos los artículos educativos y noticias de ciberseguridad en un solo lugar.',
  ruta: '/articulos',
});

export default async function ArticulosPage() {
  const [articulos, noticias] = await Promise.all([
    publicacionRepository.findPublicadas('ARTICULO'),
    publicacionRepository.findPublicadas('NOTICIA'),
  ]);

  // Se combinan y se ordenan por fecha de publicación, más reciente primero.
  const publicaciones = [...articulos, ...noticias].sort(
    (a, b) => new Date(b.publicadoEn ?? 0).getTime() - new Date(a.publicadoEn ?? 0).getTime()
  );

  return (
    <>
      <PageHeader
        eyebrow="Artículos y Noticias"
        titulo="Todo el contenido, en un solo lugar"
        descripcion="Guías, artículos educativos y noticias de ciberseguridad relevantes para la comunidad estudiantil."
      />

      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {publicaciones.length === 0 ? (
          <EmptyState
            titulo="Todavía no hay contenido publicado"
            descripcion="El equipo editorial publicará novedades próximamente."
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {publicaciones.map((publicacion, i) => (
              <Reveal key={publicacion.id} delay={i * 60}>
                <ArticleCard publicacion={publicacion} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

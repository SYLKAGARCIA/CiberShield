import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { JsonLd } from '@/components/shared/json-ld';
import { ContenidoConEnlaces } from '@/components/shared/contenido-con-enlaces';
import { SITE_URL } from '@/lib/constants';

/**
 * Renderiza el detalle de una Publicacion (artículo o noticia) dado su
 * slug. Se reutiliza desde /articulos/[slug] y /noticias/[slug] para no
 * duplicar el layout, ya que ambos tipos comparten exactamente los
 * mismos campos (ver decisión técnica en docs/02-FASE-2.md).
 */
export async function PublicacionDetalle({
  slug,
  tipoEsperado,
  volverA,
}: {
  slug: string;
  tipoEsperado: 'ARTICULO' | 'NOTICIA';
  volverA: { href: string; etiqueta: string };
}) {
  const publicacion = await publicacionRepository.findBySlug(slug);

  if (!publicacion || publicacion.tipo !== tipoEsperado || !publicacion.publicado) {
    notFound();
  }

  const fecha = publicacion.publicadoEn
    ? new Date(publicacion.publicadoEn).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  const ruta = publicacion.tipo === 'NOTICIA' ? `/noticias/${slug}` : `/articulos/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: publicacion.titulo,
          description: publicacion.resumen ?? publicacion.metaDescripcion ?? undefined,
          datePublished: publicacion.publicadoEn?.toISOString(),
          dateModified: publicacion.updatedAt.toISOString(),
          author: publicacion.autor ? { '@type': 'Person', name: publicacion.autor.name } : undefined,
          url: `${SITE_URL}${ruta}`,
        }}
      />
      <Link
        href={volverA.href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-seguro-600 dark:text-primary-300"
      >
        ← {volverA.etiqueta}
      </Link>

      <div className="mt-6 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-seguro-500" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
          {publicacion.categoria.nombre}
        </span>
      </div>

      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 dark:text-white md:text-4xl">
        {publicacion.titulo}
      </h1>

      <div className="mt-4 flex items-center gap-3 border-b border-slate-200 pb-6 text-sm text-ink-700/70 dark:border-slate-800 dark:text-slate-500">
        {publicacion.autor && <span>{publicacion.autor.name}</span>}
        {fecha && <span>· {fecha}</span>}
      </div>

      {publicacion.resumen && (
        <p className="mt-6 text-lg leading-relaxed text-ink-700 dark:text-slate-400">
          {publicacion.resumen}
        </p>
      )}

      {/* El contenido se guarda como texto plano/HTML simple desde el
          panel administrativo (Fase 6). Se preserva el salto de línea
          hasta que exista un editor enriquecido. */}
      <div className="prose-content mt-8 whitespace-pre-line text-base leading-relaxed text-ink-900 dark:text-slate-200">
        <ContenidoConEnlaces texto={publicacion.contenido} />
      </div>
    </article>
  );
}

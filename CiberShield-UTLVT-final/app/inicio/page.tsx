import type { Metadata } from 'next';
import { bannerRepository } from '@/repository/banner.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { categoriaRepository } from '@/repository/categoria.repository';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { recursoRepository } from '@/repository/recurso.repository';
import { glosarioRepository } from '@/repository/glosario.repository';
import { StatsStrip } from '@/components/home/stats-strip';
import { BannerCarousel } from '@/components/home/banner-carousel';
import { HowItWorks } from '@/components/home/how-it-works';
import { SectionDivider } from '@/components/shared/section-divider';
import { JsonLd } from '@/components/shared/json-ld';
import { construirMetadata } from '@/lib/seo';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = construirMetadata({
  titulo: SITE_NAME,
  descripcion: SITE_DESCRIPTION,
  ruta: '/inicio',
});

export default async function HomePage() {
  const [categorias, articulos, noticias, recursos, terminos, banners, usuario] = await Promise.all([
    categoriaRepository.findAll(),
    publicacionRepository.findPublicadas('ARTICULO'),
    publicacionRepository.findPublicadas('NOTICIA'),
    recursoRepository.findAll(),
    glosarioRepository.findAll(),
    bannerRepository.findActivosPorGrupo('home-hero'),
    obtenerSesionActual(),
  ]);

  const stats = [
    { valor: categorias.length, etiqueta: 'Categorías de amenazas' },
    { valor: articulos.length + noticias.length, etiqueta: 'Publicaciones' },
    { valor: recursos.length, etiqueta: 'Recursos' },
    { valor: terminos.length, etiqueta: 'Términos en el glosario' },
  ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'EducationalOrganization',
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: SITE_URL,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/buscar?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      {usuario && (
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Bienvenido a CiberShield, {usuario.name}
          </h1>
          <p className="mt-1 text-ink-700 dark:text-slate-400">
            Sigue aprendiendo a reconocer amenazas y navegar internet con criterio.
          </p>
        </div>
      )}

      {banners.length > 0 && <BannerCarousel banners={banners} />}

      <div className="mx-auto max-w-6xl px-6 py-10">
        <StatsStrip stats={stats} />
      </div>

      {!usuario && <SectionDivider className="text-slate-50 dark:text-surface-dark-elevated/40" />}
      <HowItWorks />
    </>
  );
}

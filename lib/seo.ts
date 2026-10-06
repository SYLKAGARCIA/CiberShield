import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants';

interface OpcionesMetadata {
  titulo: string;
  descripcion?: string;
  /** Ruta relativa (ej. "/amenazas/phishing"), usada para el canonical y Open Graph. */
  ruta?: string;
  /** Poner en `noindex` páginas que no deben aparecer en buscadores (ej. resultados privados). */
  sinIndexar?: boolean;
  tipo?: 'website' | 'article';
}

/**
 * Construye un objeto `Metadata` de Next.js consistente (título,
 * descripción, Open Graph, Twitter Card y URL canónica) a partir de
 * unos pocos datos por página, para no repetir la misma estructura de
 * metadata en cada `page.tsx` del sitio.
 */
export function construirMetadata({
  titulo,
  descripcion = SITE_DESCRIPTION,
  ruta = '',
  sinIndexar = false,
  tipo = 'website',
}: OpcionesMetadata): Metadata {
  const url = `${SITE_URL}${ruta}`;

  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: url },
    robots: sinIndexar
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      siteName: SITE_NAME,
      locale: 'es_ES',
      type: tipo,
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: descripcion,
    },
  };
}

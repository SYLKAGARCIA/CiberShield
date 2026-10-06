import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin', // panel administrativo, nunca debe indexarse
          '/admin/*',
          '/api/*', // endpoints, no páginas para indexar
          '/evaluaciones/*/realizar', // formulario del quiz, sin valor para buscadores
          '/evaluaciones/*/resultado/*', // resultado privado de cada estudiante
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

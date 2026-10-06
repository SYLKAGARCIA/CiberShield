import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';

/**
 * Next.js sirve este archivo automáticamente en /manifest.webmanifest
 * (convención de "metadata routes" del App Router, sin configuración
 * adicional). Los íconos apuntan a las rutas generadas dinámicamente
 * en app/icons/192 y app/icons/512.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'CiberShield',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F9FB',
    theme_color: '#123A66',
    orientation: 'portrait-primary',
    icons: [
      { src: '/icons/192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/192', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

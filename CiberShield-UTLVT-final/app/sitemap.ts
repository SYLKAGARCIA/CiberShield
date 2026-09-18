import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { categoriaRepository } from '@/repository/categoria.repository';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { evaluacionRepository } from '@/repository/evaluacion.repository';

const RUTAS_ESTATICAS = [
  { ruta: '/inicio', prioridad: 1.0, frecuencia: 'weekly' as const },
  { ruta: '/sobre-ciberseguridad', prioridad: 0.8, frecuencia: 'monthly' as const },
  { ruta: '/amenazas', prioridad: 0.9, frecuencia: 'weekly' as const },
  { ruta: '/buenas-practicas', prioridad: 0.8, frecuencia: 'monthly' as const },
  { ruta: '/herramientas', prioridad: 0.8, frecuencia: 'monthly' as const },
  { ruta: '/herramientas/generador-contrasenas', prioridad: 0.6, frecuencia: 'yearly' as const },
  { ruta: '/herramientas/verificador-contrasenas', prioridad: 0.6, frecuencia: 'yearly' as const },
  { ruta: '/herramientas/simulador-phishing', prioridad: 0.6, frecuencia: 'yearly' as const },
  { ruta: '/herramientas/calculadora-seguridad', prioridad: 0.6, frecuencia: 'yearly' as const },
  { ruta: '/herramientas/checklist', prioridad: 0.6, frecuencia: 'yearly' as const },
  { ruta: '/evaluaciones', prioridad: 0.8, frecuencia: 'weekly' as const },
  { ruta: '/recursos', prioridad: 0.7, frecuencia: 'weekly' as const },
  { ruta: '/noticias', prioridad: 0.8, frecuencia: 'daily' as const },
  { ruta: '/glosario', prioridad: 0.7, frecuencia: 'monthly' as const },
  { ruta: '/faq', prioridad: 0.6, frecuencia: 'monthly' as const },
  { ruta: '/contacto', prioridad: 0.4, frecuencia: 'yearly' as const },
  { ruta: '/acerca-del-proyecto', prioridad: 0.4, frecuencia: 'yearly' as const },
  { ruta: '/certificados/verificar', prioridad: 0.3, frecuencia: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categorias, articulos, noticias, evaluaciones] = await Promise.all([
    categoriaRepository.findAll(),
    publicacionRepository.findPublicadas('ARTICULO'),
    publicacionRepository.findPublicadas('NOTICIA'),
    evaluacionRepository.findActivas(),
  ]);

  const estaticas: MetadataRoute.Sitemap = RUTAS_ESTATICAS.map((r) => ({
    url: `${SITE_URL}${r.ruta}`,
    changeFrequency: r.frecuencia,
    priority: r.prioridad,
  }));

  const paginasCategorias: MetadataRoute.Sitemap = categorias.map((categoria) => ({
    url: `${SITE_URL}/amenazas/${categoria.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const paginasArticulos: MetadataRoute.Sitemap = articulos.map((articulo) => ({
    url: `${SITE_URL}/articulos/${articulo.slug}`,
    lastModified: articulo.publicadoEn ?? undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const paginasNoticias: MetadataRoute.Sitemap = noticias.map((noticia) => ({
    url: `${SITE_URL}/noticias/${noticia.slug}`,
    lastModified: noticia.publicadoEn ?? undefined,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const paginasEvaluaciones: MetadataRoute.Sitemap = evaluaciones.map((evaluacion) => ({
    url: `${SITE_URL}/evaluaciones/${evaluacion.id}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [
    ...estaticas,
    ...paginasCategorias,
    ...paginasArticulos,
    ...paginasNoticias,
    ...paginasEvaluaciones,
  ];
}

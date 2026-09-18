import { redirect } from 'next/navigation';

/**
 * La raíz del sitio ("/") ahora es el login: es la primera pantalla que
 * ve cualquier visitante. El contenido público informativo (categorías
 * de amenazas, artículos, etc.) que antes vivía aquí se movió a
 * /inicio, y sigue siendo público — /login no exige sesión para
 * navegar el resto del sitio, solo se usa como portada.
 */
export default function RootPage() {
  redirect('/login');
}

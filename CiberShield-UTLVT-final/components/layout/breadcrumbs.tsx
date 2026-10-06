'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const ETIQUETAS: Record<string, string> = {
  modulos: 'Módulos', amenazas: 'Amenazas', biblioteca: 'Biblioteca', 'casos-practicos': 'Casos prácticos',
  evaluaciones: 'Evaluaciones', autoevaluacion: 'Autoevaluación', foro: 'Foro', noticias: 'Noticias',
  glosario: 'Glosario', herramientas: 'Herramientas', 'buenas-practicas': 'Buenas prácticas',
  'sobre-ciberseguridad': 'Sobre la ciberseguridad', faq: 'Preguntas frecuentes', 'mi-progreso': 'Mi progreso',
  articulos: 'Artículos', certificados: 'Certificados', contacto: 'Contacto', buscar: 'Búsqueda',
  'acerca-del-proyecto': 'Acerca del proyecto', nuevo: 'Nuevo hilo', realizar: 'Realizar', resultado: 'Resultado',
};

function prettify(seg: string) {
  const t = decodeURIComponent(seg).replace(/-/g, ' ');
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Migas de pan automáticas a partir de la ruta (solo desde el 2.º nivel). */
export function Breadcrumbs() {
  const pathname = usePathname();
  const segs = pathname.split('/').filter(Boolean);
  if (segs.length < 2 || segs[0] === 'admin') return null;
  // Evita mostrar identificadores internos largos (ids de resultado, etc.)
  const visibles = segs.filter((s) => s.length < 40);

  return (
    <nav aria-label="Migas de pan" className="border-b border-slate-100 bg-slate-50/70 dark:border-slate-800/60 dark:bg-surface-dark/60">
      <ol className="mx-auto flex max-w-[88rem] flex-wrap items-center gap-1 px-4 py-2 text-xs text-ink-700 dark:text-slate-400 sm:px-6">
        <li>
          <Link href="/inicio" className="flex items-center gap-1 hover:text-primary-600 dark:hover:text-white"><Home size={12} aria-hidden="true" />Inicio</Link>
        </li>
        {visibles.map((seg, i) => {
          const href = '/' + segs.slice(0, segs.indexOf(seg) + 1).join('/');
          const ultimo = i === visibles.length - 1;
          return (
            <li key={href} className="flex items-center gap-1">
              <ChevronRight size={12} aria-hidden="true" className="opacity-50" />
              {ultimo ? (
                <span aria-current="page" className="max-w-[220px] truncate font-medium text-ink-900 dark:text-white">{ETIQUETAS[seg] ?? prettify(seg)}</span>
              ) : (
                <Link href={href} className="hover:text-primary-600 dark:hover:text-white">{ETIQUETAS[seg] ?? prettify(seg)}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { autoevaluacionRepository } from '@/repository/autoevaluacion.repository';
import {
  FolderTree,
  Newspaper,
  BookMarked,
  HelpCircle,
  Library,
  Menu as MenuIcon,
  ClipboardList,
  Award,
  Star,
  GalleryHorizontal,
} from 'lucide-react';
import { obtenerSesionActual } from '@/lib/auth';
import { categoriaRepository } from '@/repository/categoria.repository';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { glosarioRepository } from '@/repository/glosario.repository';
import { faqRepository } from '@/repository/faq.repository';
import { recursoRepository } from '@/repository/recurso.repository';
import { menuRepository } from '@/repository/menu.repository';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { certificadoRepository } from '@/repository/certificado.repository';
import { insigniaRepository } from '@/repository/insignia.repository';
import { bannerRepository } from '@/repository/banner.repository';

export const metadata: Metadata = {
  title: 'Panel Administrativo',
};

export default async function AdminDashboardPage() {
  // El layout (app/admin/layout.tsx) ya garantiza que hay sesión y
  // rol válido antes de llegar aquí.
  const [usuario, categorias, publicaciones, terminos, preguntas, recursos, items, evaluaciones, certificados, insignias, banners, resumenAuto] =
    await Promise.all([
      obtenerSesionActual(),
      categoriaRepository.findAll(),
      publicacionRepository.findParaAdmin(),
      glosarioRepository.findAll(),
      faqRepository.findAll(),
      recursoRepository.findAll(),
      menuRepository.findAll(),
      evaluacionRepository.findAll(),
      certificadoRepository.findAllParaAdmin(),
      insigniaRepository.findAll(),
      bannerRepository.findAll(),
      autoevaluacionRepository.resumenGlobal(),
    ]);

  const tarjetas = [
    { href: '/admin/categorias', etiqueta: 'Módulos', cantidad: categorias.length, icono: FolderTree },
    { href: '/admin/publicaciones', etiqueta: 'Noticias', cantidad: publicaciones.length, icono: Newspaper },
    { href: '/admin/glosario', etiqueta: 'Términos de Glosario', cantidad: terminos.length, icono: BookMarked },
    { href: '/admin/faq', etiqueta: 'Preguntas Frecuentes', cantidad: preguntas.length, icono: HelpCircle },
    { href: '/admin/recursos', etiqueta: 'Recursos', cantidad: recursos.length, icono: Library },
    { href: '/admin/evaluaciones', etiqueta: 'Evaluaciones', cantidad: evaluaciones.length, icono: ClipboardList },
    { href: '/admin/certificados', etiqueta: 'Certificados Emitidos', cantidad: certificados.length, icono: Award },
    { href: '/admin/insignias', etiqueta: 'Insignias', cantidad: insignias.length, icono: Star },
    { href: '/admin/banners', etiqueta: 'Banners', cantidad: banners.length, icono: GalleryHorizontal },
    { href: '/admin/menus', etiqueta: 'Ítems de Menú', cantidad: items.length, icono: MenuIcon },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
        Bienvenido, {usuario?.name}
      </h1>
      <p className="mt-1 text-ink-700 dark:text-slate-400">
        Gestiona todo el contenido del sitio desde aquí, sin tocar código.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tarjetas.map((tarjeta) => (
          <Link
            key={tarjeta.href}
            href={tarjeta.href}
            className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-primary-300 hover:shadow-md dark:border-slate-800 dark:bg-surface-dark-elevated"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
              <tarjeta.icono size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
                {tarjeta.cantidad}
              </p>
              <p className="text-sm text-ink-700 dark:text-slate-400">{tarjeta.etiqueta}</p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-surface-dark-elevated">
        <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Autoevaluación: inicial vs. final</h2>
        {!resumenAuto || resumenAuto.conInicial === 0 ? (
          <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">Aún no hay autoevaluaciones guardadas.</p>
        ) : (
          <dl className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { l: 'Estudiantes con autoevaluación inicial', v: String(resumenAuto.conInicial) },
              { l: 'Con inicial y final', v: String(resumenAuto.conAmbas) },
              { l: 'Promedio inicial → final', v: resumenAuto.conAmbas ? `${resumenAuto.promedioInicial}% → ${resumenAuto.promedioFinal}%` : '—' },
              { l: 'Mejora promedio', v: resumenAuto.conAmbas ? `${(resumenAuto.mejoraPromedio ?? 0) > 0 ? '+' : ''}${resumenAuto.mejoraPromedio} pts` : '—' },
            ].map((x) => (
              <div key={x.l}><dd className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{x.v}</dd><dt className="text-xs text-ink-700 dark:text-slate-400">{x.l}</dt></div>
            ))}
          </dl>
        )}
      </section>
    </div>
  );
}

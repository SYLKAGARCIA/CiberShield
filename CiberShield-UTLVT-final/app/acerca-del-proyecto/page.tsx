import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Acerca del Proyecto',
  descripcion: 'Contexto académico y objetivos del proyecto.',
  ruta: '/acerca-del-proyecto',
});

export default function AcercaDelProyectoPage() {
  return (
    <>
      <PageHeader eyebrow="Acerca de" titulo="El proyecto" />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-6 leading-relaxed text-ink-700 dark:text-slate-400">
          <p>
            <strong className="text-ink-900 dark:text-white">
              CiberShield UTLVT
            </strong>{' '}
            es un proyecto universitario desarrollado bajo el título
            &ldquo;Diseño de una página web informativa sobre ciberseguridad
            para la concientización de los estudiantes&rdquo;. Su objetivo es
            ofrecer una plataforma educativa, moderna y gratuita para que
            los estudiantes aprendan a protegerse en entornos digitales.
          </p>
          <p>
            La plataforma combina contenido educativo, herramientas
            interactivas y evaluaciones con certificación, todo
            gestionable desde un panel administrativo sin necesidad de
            modificar código.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-display font-semibold text-ink-900 dark:text-white">
              Stack tecnológico
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-ink-700 dark:text-slate-400">
              <li>Next.js 14 (App Router) + TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Prisma ORM + SQLite</li>
              <li>Desplegable en Vercel</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink-900 dark:text-white">
              Principios de arquitectura
            </h3>
            <ul className="mt-2 space-y-1 text-sm text-ink-700 dark:text-slate-400">
              <li>Clean Architecture por capas</li>
              <li>Repository Pattern</li>
              <li>SOLID · DRY · KISS</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

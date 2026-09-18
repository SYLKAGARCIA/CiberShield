import type { Metadata } from 'next';
import { ShieldAlert, GraduationCap, Users2 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Sobre la Ciberseguridad',
  descripcion: 'Por qué la ciberseguridad importa para estudiantes universitarios.',
  ruta: '/sobre-ciberseguridad',
});

export default function SobreCiberseguridadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sobre la Ciberseguridad"
        titulo="Tu vida está en línea. Protegerla también depende de ti"
        descripcion="La ciberseguridad no es un tema exclusivo de expertos en tecnología: es una habilidad básica para cualquier persona que use internet a diario."
      />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-6 leading-relaxed text-ink-700 dark:text-slate-400">
          <p>
            Como estudiante universitario, usas plataformas académicas, redes
            sociales, banca en línea y servicios en la nube todos los días.
            Cada una de esas cuentas guarda información que alguien más
            podría querer: tus datos personales, tus contraseñas, tu dinero
            o simplemente tu identidad para engañar a otros.
          </p>
          <p>
            La buena noticia es que la mayoría de los ataques comunes
            —phishing, contraseñas débiles, redes WiFi inseguras— se
            previenen con conocimiento básico y hábitos simples, no con
            herramientas costosas ni conocimientos avanzados de
            programación.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <Reveal>
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-alerta-500/10 text-alerta-600 dark:text-alerta-400">
                <ShieldAlert size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">
                Identifica amenazas
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
                Aprende a reconocer intentos de phishing, malware y engaños
                antes de que te afecten.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-300">
                <GraduationCap size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">
                Aprende haciendo
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
                Practica con herramientas interactivas y evaluaciones, no solo
                teoría.
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-seguro-500/10 text-seguro-600 dark:text-seguro-400">
                <Users2 size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">
                Protege a tu comunidad
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">
                Lo que aprendes aquí también ayuda a proteger a tu familia y
                compañeros.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}

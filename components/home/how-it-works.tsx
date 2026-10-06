import { BookOpen, ListChecks, Award } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';

const PASOS = [
  {
    numero: '01',
    titulo: 'Aprende',
    descripcion:
      'Explora artículos, el glosario y recursos sobre las amenazas digitales más comunes.',
    icono: BookOpen,
  },
  {
    numero: '02',
    titulo: 'Practica',
    descripcion:
      'Usa las herramientas interactivas: generador de contraseñas, simulador de phishing y más.',
    icono: ListChecks,
  },
  {
    numero: '03',
    titulo: 'Obtén tu credencial',
    descripcion:
      'Aprueba las evaluaciones y descarga tu certificado de concientización digital.',
    icono: Award,
  },
] as const;

export function HowItWorks() {
  return (
    <section
      aria-labelledby="proceso-titulo"
      className="border-y border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-surface-dark-elevated/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-start gap-4">
          <span aria-hidden="true" className="mt-1.5 h-8 w-1 shrink-0 rounded-full bg-seguro-500" />
          <h2
            id="proceso-titulo"
            className="font-display text-3xl font-semibold text-ink-900 dark:text-white"
          >
            Tu ruta hacia la credencial digital
          </h2>
        </div>

        <ol className="relative mt-14 grid grid-cols-1 gap-y-12 md:grid-cols-3 md:gap-x-8">
          {/* Línea conectora entre los pasos (solo en pantallas medianas+) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-slate-300 md:block dark:bg-slate-700"
          />

          {PASOS.map((paso, i) => (
            <Reveal key={paso.numero} delay={i * 120}>
              <li className="relative pl-16 md:pl-0 md:text-center">
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-slate-50 bg-primary-500 text-white shadow-sm dark:border-surface-dark-elevated md:static md:mx-auto">
                  <paso.icono size={20} aria-hidden="true" />
                </div>
                <span className="mt-0 block font-mono text-xs text-seguro-600 dark:text-seguro-400 md:mt-4">
                  PASO {paso.numero}
                </span>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-white">
                  {paso.titulo}
                </h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-700 dark:text-slate-400">
                  {paso.descripcion}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

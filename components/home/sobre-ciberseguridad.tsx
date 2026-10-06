import { ShieldAlert, GraduationCap, Users2 } from 'lucide-react';
import { Reveal } from '@/components/shared/reveal';

const TARJETAS = [
  { icono: ShieldAlert, color: 'bg-alerta-500/10 text-alerta-600 dark:text-alerta-400', titulo: 'Identifica amenazas', texto: 'Aprende a reconocer intentos de phishing, malware y engaños antes de que te afecten.' },
  { icono: GraduationCap, color: 'bg-primary-500/10 text-primary-600 dark:text-primary-300', titulo: 'Aprende haciendo', texto: 'Practica con herramientas interactivas y evaluaciones, no solo teoría.' },
  { icono: Users2, color: 'bg-seguro-500/10 text-seguro-600 dark:text-seguro-400', titulo: 'Protege a tu comunidad', texto: 'Lo que aprendes aquí también ayuda a proteger a tu familia y compañeros.' },
];

/** Sección «Sobre la ciberseguridad» (antes una página aparte), mostrada en el inicio. */
export function SobreCiberseguridad() {
  return (
    <section id="sobre-ciberseguridad" aria-labelledby="sobre-titulo" className="scroll-mt-28">
      <p className="font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">Sobre la ciberseguridad</p>
      <h2 id="sobre-titulo" className="mt-1 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-white md:text-3xl">
        Tu vida está en línea. Protegerla también depende de ti
      </h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink-700 dark:text-slate-300">
        La ciberseguridad no es un tema exclusivo de expertos en tecnología: es una habilidad básica para cualquier persona que use internet a diario.
      </p>

      <div className="mt-6 grid max-w-4xl gap-4 leading-relaxed text-ink-700 dark:text-slate-400 md:grid-cols-2">
        <p>
          Como estudiante universitario, usas plataformas académicas, redes sociales, banca en línea y servicios en la nube todos los días. Cada una de esas cuentas guarda información que alguien más podría querer: tus datos personales, tus contraseñas, tu dinero o simplemente tu identidad para engañar a otros.
        </p>
        <p>
          La buena noticia es que la mayoría de los ataques comunes —phishing, contraseñas débiles, redes WiFi inseguras— se previenen con conocimiento básico y hábitos simples, no con herramientas costosas ni conocimientos avanzados de programación.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {TARJETAS.map((t, i) => (
          <Reveal key={t.titulo} delay={i * 80}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.color}`}>
                <t.icono size={20} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-ink-900 dark:text-white">{t.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700 dark:text-slate-400">{t.texto}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

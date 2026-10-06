import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Info, Cog, Theater, Home, Siren, AlertTriangle, ShieldCheck, LifeBuoy, ArrowLeft, ArrowRight, GraduationCap } from 'lucide-react';
import { AMENAZAS, obtenerAmenaza } from '@/lib/amenazas-data';
import { categoriaRepository } from '@/repository/categoria.repository';
import { ThreatIcon } from '@/components/shared/threat-icon';
import { construirMetadata } from '@/lib/seo';

interface PageProps { params: { slug: string } }

export function generateMetadata({ params }: PageProps): Metadata {
  const a = obtenerAmenaza(params.slug);
  if (!a) return {};
  return construirMetadata({ titulo: `${a.nombre} | Amenazas`, descripcion: a.resumen, ruta: `/amenazas/${params.slug}` });
}

function Bloque({ icono: Icono, titulo, color, children }: { icono: typeof Info; titulo: string; color: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-surface-dark-elevated sm:p-6">
      <h2 className="mb-3 flex items-center gap-3 font-display text-lg font-semibold text-ink-900 dark:text-white">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}><Icono size={18} aria-hidden="true" /></span>{titulo}
      </h2>
      {children}
    </section>
  );
}

function Lista({ items, marca }: { items: string[]; marca: string }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-700 dark:text-slate-300"><span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${marca}`} />{t}</li>
      ))}
    </ul>
  );
}

export default async function AmenazaPage({ params }: PageProps) {
  const a = obtenerAmenaza(params.slug);

  // Compatibilidad con enlaces antiguos: /amenazas/<slug-de-categoría> ahora vive en /modulos/<slug>
  if (!a) {
    const categoria = await categoriaRepository.findBySlug(params.slug);
    if (categoria) redirect(`/modulos/${categoria.slug}`);
    notFound();
  }

  const i = AMENAZAS.findIndex((x) => x.slug === a.slug);
  const prev = i > 0 ? AMENAZAS[i - 1] : null;
  const next = i < AMENAZAS.length - 1 ? AMENAZAS[i + 1] : null;
  const modulo = await categoriaRepository.findBySlug(a.moduloSlug);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-ink-900 via-primary-700 to-primary-600 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto flex max-w-4xl items-start gap-5 px-6 py-12 md:py-16">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-alerta-500 text-white shadow-lg shadow-alerta-500/30"><ThreatIcon nombre={a.icono} size={30} /></span>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-alerta-400">Amenaza · Riesgo {a.nivel.toLowerCase()}</span>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight md:text-4xl">{a.nombre}</h1>
            <p className="mt-3 max-w-2xl text-lg text-primary-100">{a.resumen}</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-5 px-6 pb-24 pt-10">
        <Bloque icono={Info} titulo="¿Qué es?" color="bg-primary-500/10 text-primary-600 dark:text-primary-300"><p className="leading-relaxed text-ink-700 dark:text-slate-300">{a.queEs}</p></Bloque>
        <Bloque icono={Cog} titulo="¿Cómo funciona?" color="bg-primary-500/10 text-primary-600 dark:text-primary-300"><p className="leading-relaxed text-ink-700 dark:text-slate-300">{a.comoFunciona}</p></Bloque>
        <Bloque icono={Theater} titulo="¿Cómo intentan engañarte?" color="bg-alerta-500/10 text-alerta-600"><Lista items={a.comoEngañan} marca="bg-alerta-500" /></Bloque>

        <section className="rounded-2xl border-l-4 border-alerta-500 bg-alerta-500/5 p-5 sm:p-6">
          <h2 className="mb-2 flex items-center gap-2 font-display text-lg font-semibold text-ink-900 dark:text-white"><Home size={18} className="text-alerta-600" aria-hidden="true" />Ejemplo cotidiano</h2>
          <p className="leading-relaxed text-ink-900 dark:text-slate-200">{a.ejemplo}</p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <Bloque icono={Siren} titulo="Señales de alerta" color="bg-red-500/10 text-red-600"><Lista items={a.señales} marca="bg-red-500" /></Bloque>
          <Bloque icono={AlertTriangle} titulo="¿Qué riesgos existen?" color="bg-alerta-500/10 text-alerta-600"><Lista items={a.riesgos} marca="bg-alerta-500" /></Bloque>
        </div>

        <Bloque icono={ShieldCheck} titulo="¿Cómo protegerte?" color="bg-seguro-500/10 text-seguro-600 dark:text-seguro-400"><Lista items={a.proteccion} marca="bg-seguro-500" /></Bloque>
        <Bloque icono={LifeBuoy} titulo="¿Qué hacer si te encuentras con esta situación?" color="bg-primary-500/10 text-primary-600 dark:text-primary-300">
          <ol className="space-y-2">
            {a.queHacer.map((t, k) => (
              <li key={k} className="flex gap-3 text-sm leading-relaxed text-ink-700 dark:text-slate-300"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xs font-semibold text-white">{k + 1}</span>{t}</li>
            ))}
          </ol>
        </Bloque>

        {modulo && (
          <Link href={`/modulos/${modulo.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl bg-primary-500 p-5 text-white transition-colors hover:bg-primary-600">
            <span className="flex items-center gap-3"><GraduationCap size={22} aria-hidden="true" /><span><span className="block text-xs text-primary-100">Aprende más en el módulo</span><span className="font-display text-lg font-semibold">{modulo.nombre}</span></span></span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}

        <div className="flex justify-between gap-3 pt-4">
          {prev ? <Link href={`/amenazas/${prev.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white"><ArrowLeft size={15} aria-hidden="true" />{prev.nombre}</Link> : <span />}
          {next ? <Link href={`/amenazas/${next.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white">{next.nombre}<ArrowRight size={15} aria-hidden="true" /></Link> : <span />}
        </div>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import { AMENAZAS } from '@/lib/amenazas-data';
import { ThreatCard } from '@/components/shared/threat-card';
import { Reveal } from '@/components/shared/reveal';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Amenazas',
  descripcion: 'Conoce las amenazas digitales más comunes: phishing, malware, ingeniería social, deepfakes y más.',
  ruta: '/amenazas',
});

export default function AmenazasPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-ink-900 via-primary-700 to-primary-600 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-alerta-500/20 px-3 py-1 font-mono text-xs uppercase tracking-widest text-alerta-400"><ShieldAlert size={14} aria-hidden="true" />Catálogo de amenazas</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">Reconoce el riesgo antes de que te alcance</h1>
          <p className="mt-3 max-w-2xl text-lg text-primary-100">{AMENAZAS.length} amenazas explicadas en lenguaje claro: cómo funcionan, cómo intentan engañarte y cómo protegerte.</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {AMENAZAS.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 8) * 50}><ThreatCard amenaza={a} /></Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

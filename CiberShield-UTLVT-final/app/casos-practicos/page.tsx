import type { Metadata } from 'next';
import { Briefcase } from 'lucide-react';
import { ESCENARIOS } from '@/lib/escenarios-data';
import { PreguntaInteractiva } from '@/components/escenarios/pregunta-interactiva';
import { construirMetadata } from '@/lib/seo';

export const metadata: Metadata = construirMetadata({
  titulo: 'Casos prácticos',
  descripcion: 'Situaciones cotidianas para decidir qué harías y descubrir la respuesta segura.',
  ruta: '/casos-practicos',
});

export default function CasosPracticosPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-seguro-600 to-primary-700 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto max-w-5xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest"><Briefcase size={14} aria-hidden="true" />Casos prácticos</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">¿Qué harías tú?</h1>
          <p className="mt-3 max-w-2xl text-lg text-white/85">Situaciones de la vida diaria. Elige una opción y conoce la respuesta segura y por qué.</p>
        </div>
      </section>
      <div className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 pt-10 md:grid-cols-2">
        {ESCENARIOS.map((e) => (
          <PreguntaInteractiva key={e.id} etiqueta={`${e.tema} · ${e.titulo}`} pregunta={e.situacion} opciones={e.opciones} correcta={e.correcta} explicacion={e.explicacion} />
        ))}
      </div>
    </>
  );
}

'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Circle, ClipboardCheck, Loader2 } from 'lucide-react';
import { alternarModuloCompletado } from '@/app/modulos/[slug]/actions';
import { cn } from '@/lib/utils';

interface Props { categoriaId: string; slug: string; completado: boolean; haySesion: boolean; evaluacionId?: string | null }

export function BotonCompletar({ categoriaId, slug, completado, haySesion, evaluacionId }: Props) {
  const router = useRouter();
  const [pendiente, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [ganadas, setGanadas] = useState<string[]>([]);

  if (!haySesion) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-ink-700 dark:border-slate-700 dark:text-slate-400">
        <Link href={`/login?from=/modulos/${slug}`} className="font-semibold text-seguro-600 hover:underline dark:text-seguro-400">Inicia sesión</Link> para marcar este módulo como completado y guardar tu progreso.
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        disabled={pendiente}
        onClick={() => {
          setError(null);
          start(async () => {
            const r = await alternarModuloCompletado(categoriaId, slug, !completado);
            if (!r.ok) { setError(r.error); return; }
            setGanadas(r.insignias);
            if (!completado && evaluacionId) {
              // Si ganó insignias, se muestran unos segundos antes de ir a la evaluación.
              if (r.insignias.length > 0) setTimeout(() => router.push(`/evaluaciones/${evaluacionId}`), 3500);
              else router.push(`/evaluaciones/${evaluacionId}`);
            } else router.refresh();
          });
        }}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all disabled:opacity-60',
          completado ? 'bg-seguro-500/10 text-seguro-600 ring-1 ring-seguro-500/40 hover:bg-seguro-500/20 dark:text-seguro-400' : 'bg-seguro-500 text-white shadow-lg shadow-seguro-500/20 hover:bg-seguro-600'
        )}
      >
        {pendiente ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : completado ? <CheckCircle2 size={17} aria-hidden="true" /> : <Circle size={17} aria-hidden="true" />}
        {completado ? 'Módulo completado (clic para desmarcar)' : evaluacionId ? 'Marcar como completado e ir a la evaluación' : 'Marcar como completado'}
      </button>
      {ganadas.length > 0 && (
        <div role="status" className="mt-4 rounded-xl border border-alerta-500/30 bg-alerta-500/10 p-4 text-sm text-ink-900 dark:text-white">
          <p className="font-semibold">🎉 ¡Ganaste {ganadas.length > 1 ? 'nuevas insignias' : 'una nueva insignia'}!</p>
          <ul className="mt-1 list-inside list-disc">{ganadas.map((g) => <li key={g}>{g}</li>)}</ul>
        </div>
      )}
      {completado && evaluacionId && (
        <Link href={`/evaluaciones/${evaluacionId}`} className="mt-4 flex items-center gap-3 rounded-xl border border-primary-500/30 bg-primary-50 p-4 text-sm font-semibold text-primary-700 hover:bg-primary-100 dark:bg-primary-500/10 dark:text-primary-300">
          <ClipboardCheck size={18} aria-hidden="true" /> ¡Terminaste el módulo! Rinde ahora su evaluación
        </Link>
      )}
      {error && <p role="alert" className="mt-2 text-sm text-alerta-600">{error}</p>}
    </div>
  );
}

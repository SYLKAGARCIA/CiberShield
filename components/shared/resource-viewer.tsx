'use client';

import { useEffect, useState } from 'react';
import { FileText, Video, Link2, Image as ImageIcon, X, ExternalLink, PlayCircle, BookOpen } from 'lucide-react';
import { resolverEmbed } from '@/lib/recurso-embed';

export interface RecursoVista {
  id: string;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  url: string;
  modulo?: string | null;
}

const ICONOS: Record<string, typeof FileText> = { PDF: FileText, VIDEO: Video, ENLACE: Link2, IMAGEN: ImageIcon };
const COLORES: Record<string, string> = {
  PDF: 'bg-red-500/10 text-red-600 dark:text-red-400',
  VIDEO: 'bg-primary-500/10 text-primary-600 dark:text-primary-300',
  ENLACE: 'bg-seguro-500/10 text-seguro-600 dark:text-seguro-400',
  IMAGEN: 'bg-alerta-500/10 text-alerta-600 dark:text-alerta-400',
};

function Visor({ recurso, onCerrar }: { recurso: RecursoVista; onCerrar: () => void }) {
  const embed = resolverEmbed(recurso.tipo, recurso.url);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCerrar();
    document.addEventListener('keydown', onKey);
    const previo = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previo;
    };
  }, [onCerrar]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={recurso.titulo}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900/70 p-2 backdrop-blur-sm sm:p-6"
      onClick={onCerrar}
    >
      <div
        className="flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-fade-in-up dark:bg-surface-dark-elevated"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:text-primary-300">{recurso.tipo}</p>
            <h2 className="truncate font-display text-base font-semibold text-ink-900 dark:text-white">{recurso.titulo}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={recurso.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-surface-dark sm:inline-flex"
            >
              <ExternalLink size={13} aria-hidden="true" /> Abrir aparte
            </a>
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar visor"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-dark"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-slate-100 dark:bg-surface-dark">
          {embed.kind === 'iframe' && recurso.tipo === 'VIDEO' && (
            <iframe
              src={embed.src}
              title={recurso.titulo}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
          {embed.kind === 'iframe' && recurso.tipo !== 'VIDEO' && (
            <iframe src={embed.src} title={recurso.titulo} className="absolute inset-0 h-full w-full bg-white" />
          )}
          {embed.kind === 'video' && (
            <video src={embed.src} controls className="absolute inset-0 h-full w-full bg-black" />
          )}
          {embed.kind === 'image' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={embed.src} alt={recurso.titulo} className="absolute inset-0 h-full w-full object-contain" />
          )}
          {embed.kind === 'externo' && (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
              <p className="text-sm text-ink-700 dark:text-slate-400">Este recurso no se puede mostrar dentro de la plataforma.</p>
              <a href={recurso.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-seguro-500 px-4 py-2 text-sm font-semibold text-white hover:bg-seguro-600">
                Abrir recurso
              </a>
            </div>
          )}
        </div>

        {recurso.tipo === 'PDF' && (
          <p className="border-t border-slate-200 px-4 py-2 text-xs text-ink-700/70 dark:border-slate-800 dark:text-slate-500">
            ¿No se ve el documento? Algunos sitios bloquean su visualización incrustada; usa «Abrir aparte».
          </p>
        )}
      </div>
    </div>
  );
}

export function RecursoGrid({ recursos, compacto = false }: { recursos: RecursoVista[]; compacto?: boolean }) {
  const [activo, setActivo] = useState<RecursoVista | null>(null);

  return (
    <>
      <div className={compacto ? 'grid grid-cols-1 gap-3 sm:grid-cols-2' : 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'}>
        {recursos.map((r) => {
          const Icono = ICONOS[r.tipo] ?? FileText;
          const integrable = resolverEmbed(r.tipo, r.url).kind !== 'externo';
          const Accion = r.tipo === 'VIDEO' ? PlayCircle : BookOpen;
          const contenido = (
            <>
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${COLORES[r.tipo] ?? COLORES.ENLACE}`}>
                <Icono size={20} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 text-left">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:text-primary-300">
                  {r.tipo}{r.modulo ? ` · ${r.modulo}` : ''}
                </span>
                <h3 className="mt-0.5 font-display text-base font-semibold leading-snug text-ink-900 group-hover:text-primary-600 dark:text-white">{r.titulo}</h3>
                {r.descripcion && <p className="mt-1 line-clamp-2 text-sm text-ink-700 dark:text-slate-400">{r.descripcion}</p>}
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-seguro-600 dark:text-seguro-400">
                  {integrable ? <><Accion size={14} aria-hidden="true" /> {r.tipo === 'VIDEO' ? 'Reproducir aquí' : r.tipo === 'PDF' ? 'Leer en la plataforma' : 'Ver aquí'}</> : <><ExternalLink size={13} aria-hidden="true" /> Abrir enlace</>}
                </span>
              </div>
            </>
          );
          const clases = 'group flex w-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-seguro-500/40 hover:shadow-lg hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated';
          return integrable ? (
            <button key={r.id} type="button" onClick={() => setActivo(r)} className={clases}>{contenido}</button>
          ) : (
            <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className={clases}>{contenido}</a>
          );
        })}
      </div>
      {activo && <Visor recurso={activo} onCerrar={() => setActivo(null)} />}
    </>
  );
}

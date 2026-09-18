import { ShieldCheck, Lock } from 'lucide-react';

/**
 * Elemento de firma visual del rediseño CiberShield UTLVT: un panel de
 * seguridad flotante que muestra el "escudo activo", con una línea de
 * escaneo sutil. Reemplaza visualmente a la antigua "credencial de
 * acceso" (Fase 3) manteniendo el mismo espíritu conceptual pero con la
 * nueva paleta azul profundo + verde y el nuevo lenguaje de marca.
 * Respeta `prefers-reduced-motion` (animaciones se desactivan vía CSS
 * global, ver app/globals.css).
 */
export function SecurityClearanceCard() {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-primary-500/20 bg-ink-900 p-6 text-white shadow-2xl shadow-primary-500/20">
      {/* Rejilla decorativa de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid text-white/[0.04]"
      />
      {/* Línea de escaneo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-seguro-400/20 to-transparent animate-scan motion-reduce:animate-none"
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-widest text-seguro-400">
          Panel de Seguridad
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-seguro-500/15">
          <ShieldCheck className="text-seguro-400" size={18} aria-hidden="true" />
        </div>
      </div>

      <div className="relative mt-8 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-seguro-400 animate-pulse-ring" />
        <p className="font-display text-2xl font-semibold text-white">
          Escudo Activo
        </p>
      </div>
      <p className="relative mt-1 font-mono text-xs text-slate-400">
        Nivel de conciencia digital: en construcción
      </p>

      <div className="relative mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
            Institución
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
            <Lock size={13} className="text-seguro-400" aria-hidden="true" />
            UTLVT
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
            Programa
          </p>
          <p className="mt-1 text-sm font-medium">CiberShield</p>
        </div>
      </div>

      <div className="relative mt-6 flex items-center gap-1.5" aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className="h-6 w-1 rounded-sm bg-white/15"
            style={{ opacity: i % 3 === 0 ? 0.6 : 0.25 }}
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, ShieldAlert, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { barajarOpciones } from '@/lib/barajar';
import type { Escenario } from '@/lib/escenarios-data';
import { guardarAutoevaluacion } from '@/app/autoevaluacion/actions';
import { ComparacionAutoevaluacion, type IntentoResumen } from '@/components/escenarios/comparacion-autoevaluacion';

interface Props {
  escenarios: Escenario[];
  modulos: { slug: string; nombre: string }[];
  amenazas: Record<string, string>; // slug → nombre
  modo: 'diagnostico' | 'repaso';
  haySesion?: boolean;
}

/** Autoevaluación: práctica libre. No se guarda ni da certificado (eso son las Evaluaciones). */
export function AutoevaluacionQuiz({ escenarios, modulos, amenazas, modo, haySesion = false }: Props) {
  // Orden de los módulos del curso; las preguntas siguen ese orden.
  const preguntas = useMemo(() => {
    const orden = new Map(modulos.map((m, i) => [m.slug, i]));
    return [...escenarios]
      .sort((a, b) => (orden.get(a.moduloSlug) ?? 99) - (orden.get(b.moduloSlug) ?? 99))
      .map((e) => ({ ...e, ...barajarOpciones(e.opciones, e.correcta, e.id) }));
  }, [escenarios, modulos]);

  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, boolean>>({});
  const [fin, setFin] = useState(false);
  const [guardado, setGuardado] = useState<{ tipo: string; intento: number; restantes: number; inicial: IntentoResumen | null; final: IntentoResumen | null } | null>(null);
  const [, iniciarGuardado] = useTransition();
  const yaGuardo = useRef(false);
  const [limite, setLimite] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState(false);

  // Al terminar, se guarda el resultado (solo con sesión) para poder comparar inicial vs final.
  useEffect(() => {
    if (!fin || !haySesion || yaGuardo.current) return;
    yaGuardo.current = true;
    const detalle = modulos
      .map((m) => {
        const qs = preguntas.filter((p) => p.moduloSlug === m.slug);
        return { slug: m.slug, total: qs.length, ok: qs.filter((p) => respuestas[p.id]).length };
      })
      .filter((d) => d.total > 0);
    const ok = Object.values(respuestas).filter(Boolean).length;
    iniciarGuardado(async () => {
      const r = await guardarAutoevaluacion(ok, preguntas.length, detalle);
      if (r.guardado) setGuardado({ tipo: r.tipo, intento: r.intento, restantes: r.restantes, inicial: r.inicial, final: r.final });
      else if ('limite' in r) setLimite(true);
      else if ('error' in r) setErrorGuardado(true);
    });
  }, [fin, haySesion, modulos, preguntas, respuestas]);

  const actual = preguntas[indice];
  const progreso = Math.round(((indice + (elegida !== null ? 1 : 0)) / preguntas.length) * 100);
  const aciertos = Object.values(respuestas).filter(Boolean).length;

  function responder(i: number) {
    if (elegida !== null) return;
    setElegida(i);
    setRespuestas((r) => ({ ...r, [actual.id]: i === actual.correcta }));
  }
  function siguiente() {
    if (indice + 1 >= preguntas.length) setFin(true);
    else { setIndice((n) => n + 1); setElegida(null); }
  }
  function reiniciar() { setErrorGuardado(false); setLimite(false); yaGuardo.current = false; setGuardado(null); setIndice(0); setElegida(null); setRespuestas({}); setFin(false); }

  if (fin) {
    const pct = Math.round((aciertos / preguntas.length) * 100);
    const porModulo = modulos
      .map((m) => {
        const qs = preguntas.filter((p) => p.moduloSlug === m.slug);
        const ok = qs.filter((p) => respuestas[p.id]).length;
        return { ...m, total: qs.length, ok, pct: qs.length ? Math.round((ok / qs.length) * 100) : 100 };
      })
      .filter((m) => m.total > 0);
    const reforzar = porModulo.filter((m) => m.ok < m.total).sort((a, b) => a.pct - b.pct);
    const falladas = preguntas.filter((p) => !respuestas[p.id]);
    const amenazasRepasar = Array.from(new Set(falladas.map((p) => p.amenazaSlug).filter((s): s is string => !!s && !!amenazas[s])));

    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-surface-dark-elevated">
          <Trophy className="mx-auto text-seguro-500" size={40} aria-hidden="true" />
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink-900 dark:text-white">Resultado: {aciertos} de {preguntas.length} ({pct} %)</h2>
          <p className="mx-auto mt-1 max-w-lg text-ink-700 dark:text-slate-400">
            {pct >= 80
              ? '¡Muy bien! Reconoces la mayoría de las situaciones de riesgo.'
              : pct >= 50
                ? 'Vas por buen camino. Refuerza los módulos que aparecen abajo.'
                : modo === 'diagnostico'
                  ? 'Este es tu punto de partida: no te preocupes, para eso están los módulos.'
                  : 'Te conviene repasar los módulos que aparecen abajo antes de la evaluación.'}
          </p>
        </div>

        {haySesion && guardado && (
          <p role="status" className="rounded-xl border border-seguro-500/30 bg-seguro-500/5 px-4 py-3 text-sm text-ink-900 dark:text-white">
            {guardado.tipo === 'INICIAL' && '¡Listo! Guardamos tu autoevaluación INICIAL: ya puedes entrar a los módulos. Al terminar todos los módulos y sus evaluaciones harás la autoevaluación final para ver cuánto mejoraste.'}
            {guardado.tipo === 'FINAL' && ('Guardamos este resultado como tu autoevaluación FINAL (intento ' + guardado.intento + ' de ' + (guardado.intento + guardado.restantes) + '). ' + (guardado.restantes > 0 ? 'Si quieres, puedes intentarlo de nuevo: se compara tu mejor resultado.' : 'Usaste todos tus intentos; se compara tu mejor resultado.') + ' Abajo ves la comparación con la inicial.')}
                      </p>
        )}
        {limite && <p role="alert" className="rounded-xl border border-alerta-500/30 bg-alerta-500/10 px-4 py-3 text-sm text-ink-900 dark:text-white">Ya usaste tus intentos de la autoevaluación final: este resultado no se guardó.</p>}
        {errorGuardado && <p role="alert" className="rounded-xl border border-alerta-500/30 bg-alerta-500/10 px-4 py-3 text-sm text-ink-900 dark:text-white"><strong>No se pudo guardar tu autoevaluación.</strong> Por eso los módulos siguen bloqueados. Avisa al administrador (puede faltar aplicar la migración de la base de datos: <code>npx prisma migrate deploy</code>) e inténtalo de nuevo.</p>}
        {!haySesion && (
          <p className="rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm text-ink-700 dark:border-slate-700 dark:text-slate-400">
            <Link href="/login?from=/autoevaluacion" className="font-semibold text-seguro-600 hover:underline dark:text-seguro-400">Inicia sesión</Link> para guardar tu autoevaluación y comparar tu avance al final.
          </p>
        )}
        {guardado?.inicial && guardado.final && <ComparacionAutoevaluacion inicial={guardado.inicial} final={guardado.final} modulos={modulos} />}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
          <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Tu resultado por módulo</h3>
          <ul className="mt-4 space-y-3">
            {porModulo.map((m) => (
              <li key={m.slug}>
                <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-ink-900 dark:text-white">{m.nombre}</span>
                  <span className="shrink-0 text-ink-700 dark:text-slate-400">{m.ok}/{m.total}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={cn('h-full rounded-full transition-all duration-700', m.pct === 100 ? 'bg-seguro-500' : m.pct >= 50 ? 'bg-alerta-500' : 'bg-red-500')} style={{ width: `${m.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {reforzar.length > 0 ? (
          <div className="rounded-2xl border border-seguro-500/30 bg-seguro-500/5 p-6">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink-900 dark:text-white"><GraduationCap size={20} className="text-seguro-500" aria-hidden="true" />Te recomendamos estos módulos</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {reforzar.map((m) => (
                <li key={m.slug}>
                  <Link href={`/modulos/${m.slug}`} className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-seguro-500 dark:border-slate-700 dark:bg-surface-dark dark:text-white">
                    <span>{m.nombre}<span className="block text-xs font-normal text-ink-700 dark:text-slate-400">{m.total - m.ok} {m.total - m.ok === 1 ? 'situación por reforzar' : 'situaciones por reforzar'}</span></span>
                    <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            {amenazasRepasar.length > 0 && (
              <div className="mt-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white"><ShieldAlert size={16} className="text-alerta-500" aria-hidden="true" />Amenazas para repasar</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {amenazasRepasar.map((s) => (
                    <Link key={s} href={`/amenazas/${s}`} className="rounded-full bg-alerta-500/10 px-3 py-1 text-xs font-semibold text-alerta-600 hover:bg-alerta-500 hover:text-white dark:text-alerta-400">{amenazas[s]}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-seguro-500/30 bg-seguro-500/5 p-6 text-center">
            <p className="font-display text-lg font-semibold text-ink-900 dark:text-white">¡Respondiste todo correctamente!</p>
            <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">Estás listo para la evaluación con certificado.</p>
          </div>
        )}

        {falladas.length > 0 && (
          <details className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
            <summary className="cursor-pointer font-display text-lg font-semibold text-ink-900 dark:text-white">Revisa lo que fallaste ({falladas.length})</summary>
            <ul className="mt-4 space-y-4">
              {falladas.map((p) => (
                <li key={p.id} className="border-l-4 border-alerta-500 pl-4 text-sm">
                  <p className="font-semibold text-ink-900 dark:text-white">{p.tema} · {p.titulo}</p>
                  <p className="mt-1 text-ink-700 dark:text-slate-400">Lo seguro: <strong>{p.opciones[p.correcta]}</strong>. {p.explicacion}</p>
                </li>
              ))}
            </ul>
          </details>
        )}

        <div className="flex flex-wrap justify-center gap-3">
          {(!haySesion || (!guardado && !limite) || errorGuardado) && <button type="button" onClick={reiniciar} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-surface-dark"><RotateCcw size={15} aria-hidden="true" />Repetir</button>}
          {guardado?.tipo === 'FINAL' && guardado.restantes > 0 && <Link href="/autoevaluacion?repetir=1" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-surface-dark"><RotateCcw size={15} aria-hidden="true" />Intentar de nuevo ({guardado.restantes} {guardado.restantes === 1 ? 'intento restante' : 'intentos restantes'})</Link>}
          <Link href="/modulos" className="inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-seguro-600">Ir a los módulos <ArrowRight size={15} aria-hidden="true" /></Link>
          <Link href="/evaluaciones" className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-600">Evaluaciones con certificado</Link>
        </div>
      </div>
    );
  }

  const acierto = elegida === actual.correcta;
  const nombreModulo = modulos.find((m) => m.slug === actual.moduloSlug)?.nombre;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-surface-dark-elevated sm:p-7">
      <div className="mb-5">
        <div className="mb-1.5 flex justify-between gap-3 text-xs text-ink-700 dark:text-slate-400"><span>Pregunta {indice + 1} de {preguntas.length}</span><span className="truncate text-right">{nombreModulo}</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-seguro-500 transition-all duration-500" style={{ width: `${progreso}%` }} /></div>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:text-primary-300">{actual.tema}</p>
      <h2 className="mt-1 font-display text-lg font-semibold text-ink-900 dark:text-white">{actual.titulo}</h2>
      <p className="mt-2 leading-relaxed text-ink-700 dark:text-slate-300">{actual.situacion}</p>
      <div className="mt-4 space-y-2">
        {actual.opciones.map((op, i) => (
          <button key={i} type="button" disabled={elegida !== null} onClick={() => responder(i)}
            className={cn('flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all',
              elegida === null && 'border-slate-200 hover:border-seguro-500 hover:bg-seguro-500/5 dark:border-slate-700',
              elegida !== null && i === actual.correcta && 'border-seguro-500 bg-seguro-500/10',
              elegida === i && i !== actual.correcta && 'border-alerta-500 bg-alerta-500/10',
              elegida !== null && i !== actual.correcta && elegida !== i && 'border-slate-200 opacity-60 dark:border-slate-700')}>
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[11px] font-semibold text-ink-700 dark:border-slate-600 dark:text-slate-400">{String.fromCharCode(65 + i)}</span>
            <span className="text-ink-900 dark:text-slate-200">{op}</span>
          </button>
        ))}
      </div>
      {elegida !== null && (
        <div role="status" className={cn('mt-4 flex gap-3 rounded-xl border p-4 text-sm animate-fade-in-up', acierto ? 'border-seguro-500/30 bg-seguro-500/5' : 'border-alerta-500/30 bg-alerta-500/5')}>
          {acierto ? <CheckCircle2 className="mt-0.5 shrink-0 text-seguro-500" size={18} aria-hidden="true" /> : <XCircle className="mt-0.5 shrink-0 text-alerta-600" size={18} aria-hidden="true" />}
          <div className="flex-1">
            <p className="font-semibold text-ink-900 dark:text-white">{acierto ? '¡Correcto!' : 'Respuesta segura: ' + actual.opciones[actual.correcta]}</p>
            <p className="mt-1 text-ink-700 dark:text-slate-400">{actual.explicacion}</p>
          </div>
        </div>
      )}
      <div className="mt-5 flex justify-end">
        <button type="button" onClick={siguiente} disabled={elegida === null} className="inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-40">
          {indice + 1 >= preguntas.length ? 'Ver resultado' : 'Siguiente'} <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

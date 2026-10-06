import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle2, Circle, ClipboardCheck, Award, History, Library, ArrowRight, Star } from 'lucide-react';
import { obtenerSesionActual } from '@/lib/auth';
import { categoriaRepository } from '@/repository/categoria.repository';
import { progresoRepository } from '@/repository/progreso.repository';
import { resultadoEvaluacionRepository } from '@/repository/resultado-evaluacion.repository';
import { certificadoRepository } from '@/repository/certificado.repository';
import { insigniaRepository } from '@/repository/insignia.repository';
import { recursoRepository } from '@/repository/recurso.repository';
import { autoevaluacionRepository, compararIntentos, type DetalleModulo } from '@/repository/autoevaluacion.repository';
import { ComparacionAutoevaluacion } from '@/components/escenarios/comparacion-autoevaluacion';
import { ordenarModulos } from '@/lib/modulos-data';
import type { Categoria } from '@prisma/client';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Mi progreso' };

const fecha = (d: Date) => new Date(d).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

export default async function MiProgresoPage() {
  const usuario = await obtenerSesionActual();
  if (!usuario) redirect('/login?from=/mi-progreso');

  const [categorias, progreso, resultados, certificados, insignias, recursos, intentosAuto] = await Promise.all([
    categoriaRepository.findAll(),
    progresoRepository.completadosPorUsuario(usuario.id),
    resultadoEvaluacionRepository.findPorUsuario(usuario.id),
    certificadoRepository.findPorUsuario(usuario.id),
    insigniaRepository.findDeUsuario(usuario.id),
    recursoRepository.findAll(),
    autoevaluacionRepository.intentosDeUsuario(usuario.id),
  ]);
  const { inicial, final } = compararIntentos(intentosAuto);
  const aResumen = (i: NonNullable<typeof inicial>) => ({ porcentaje: i.porcentaje, detalle: JSON.parse(i.detalle) as DetalleModulo[], fecha: i.createdAt.toISOString() });

  const modulos = ordenarModulos<Categoria>(categorias);
  const hechos = new Set(progreso.map((p) => p.categoriaId));
  const pct = modulos.length ? Math.round((hechos.size / modulos.length) * 100) : 0;
  const aprobadas = resultados.filter((r) => r.aprobado).length;

  const actividad = [
    ...progreso.map((p) => ({ fecha: p.completadoEn, texto: `Completaste el módulo «${p.categoria.nombre}»`, tipo: 'modulo' })),
    ...resultados.map((r) => ({ fecha: r.completadoEn, texto: `Realizaste «${r.evaluacion.titulo}»: ${r.puntaje}% (${r.aprobado ? 'aprobada' : 'no aprobada'})`, tipo: 'eval' })),
    ...certificados.map((c) => ({ fecha: c.emitidoEn, texto: `Obtuviste un certificado: «${c.resultado.evaluacion.titulo}»`, tipo: 'cert' })),
  ].sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha)).slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <p className="font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">Mi progreso</p>
      <h1 className="mt-1 font-display text-3xl font-semibold text-ink-900 dark:text-white md:text-4xl">Hola, {usuario.name.split(' ')[0]}</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { v: `${hechos.size}/${modulos.length}`, l: 'Módulos completados' },
          { v: String(resultados.length), l: 'Evaluaciones realizadas' },
          { v: String(aprobadas), l: 'Evaluaciones aprobadas' },
          { v: String(certificados.length), l: 'Certificados' },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-surface-dark-elevated">
            <p className="font-display text-3xl font-semibold text-primary-600 dark:text-white">{s.v}</p>
            <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {inicial && final ? (
          <ComparacionAutoevaluacion inicial={aResumen(inicial)} final={aResumen(final)} modulos={modulos.map((m) => ({ slug: m.slug, nombre: m.nombre }))} />
        ) : (
          <Link href="/autoevaluacion" className="flex items-center justify-between gap-3 rounded-2xl border border-seguro-500/30 bg-seguro-500/5 p-5 text-sm text-ink-900 hover:bg-seguro-500/10 dark:text-white">
            <span><span className="block font-display text-base font-semibold">{inicial ? 'Repite la autoevaluación al terminar los módulos' : 'Haz tu autoevaluación inicial'}</span>
              <span className="text-ink-700 dark:text-slate-400">{inicial ? `Tu resultado inicial fue ${inicial.porcentaje}%. Al repetirla verás cuánto mejoraste.` : 'Así podrás comparar tu avance al final del curso.'}</span></span>
            <ArrowRight size={18} className="shrink-0" aria-hidden="true" />
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="mb-3 flex items-end justify-between"><h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white">Ruta de módulos</h2><span className="text-sm font-semibold text-seguro-600 dark:text-seguro-400">{pct}%</span></div>
          <div className="mb-4 h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-seguro-500 transition-all" style={{ width: `${pct}%` }} /></div>
          <ul className="space-y-2">
            {modulos.map((m, i) => {
              const ok = hechos.has(m.id);
              return (
                <li key={m.id}>
                  <Link href={`/modulos/${m.slug}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-seguro-500/50 dark:border-slate-800 dark:bg-surface-dark-elevated">
                    {ok ? <CheckCircle2 className="shrink-0 text-seguro-500" size={20} aria-hidden="true" /> : <Circle className="shrink-0 text-slate-300 dark:text-slate-600" size={20} aria-hidden="true" />}
                    <span className="flex-1 text-sm font-medium text-ink-900 dark:text-white">Módulo {i + 1} · {m.nombre}</span>
                    <span className={cn('text-xs', ok ? 'text-seguro-600 dark:text-seguro-400' : 'text-ink-700/60 dark:text-slate-500')}>{ok ? 'Completado' : 'Pendiente'}</span>
                    <ArrowRight size={14} className="text-ink-700/30 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <h2 className="mb-3 mt-10 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-white"><ClipboardCheck size={20} aria-hidden="true" />Evaluaciones y resultados</h2>
          {resultados.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 p-5 text-sm text-ink-700 dark:border-slate-700 dark:text-slate-400">Aún no has realizado evaluaciones. <Link href="/evaluaciones" className="font-semibold text-seguro-600 hover:underline dark:text-seguro-400">Ver evaluaciones</Link></p>
          ) : (
            <ul className="space-y-2">
              {resultados.map((r) => (
                <li key={r.id}>
                  <Link href={`/evaluaciones/${r.evaluacionId}/resultado/${r.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm hover:border-seguro-500/50 dark:border-slate-800 dark:bg-surface-dark-elevated">
                    <span><span className="block font-medium text-ink-900 dark:text-white">{r.evaluacion.titulo}</span><span className="text-xs text-ink-700/70 dark:text-slate-500">{fecha(r.completadoEn)}</span></span>
                    <span className="text-right"><span className="block font-display text-lg font-semibold text-ink-900 dark:text-white">{r.puntaje}%</span><span className={cn('text-xs font-semibold', r.aprobado ? 'text-seguro-600 dark:text-seguro-400' : 'text-alerta-600')}>{r.aprobado ? 'Aprobada' : 'No aprobada'}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-8">
          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-white"><History size={20} aria-hidden="true" />Actividad reciente</h2>
            {actividad.length === 0 ? <p className="text-sm text-ink-700 dark:text-slate-400">Todavía no hay actividad. ¡Empieza por un módulo!</p> : (
              <ul className="space-y-3 border-l border-slate-200 pl-4 dark:border-slate-800">
                {actividad.map((a, i) => (<li key={i} className="text-sm"><p className="text-ink-900 dark:text-slate-200">{a.texto}</p><p className="text-xs text-ink-700/60 dark:text-slate-500">{fecha(a.fecha)}</p></li>))}
              </ul>
            )}
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-semibold text-ink-900 dark:text-white"><Award size={20} aria-hidden="true" />Certificados e insignias</h2>
            {certificados.length === 0 && insignias.length === 0 && <p className="text-sm text-ink-700 dark:text-slate-400">Completa módulos para ganar insignias y aprueba una evaluación para obtener tu certificado.</p>}
            <ul className="space-y-2">
              {certificados.map((c) => (<li key={c.id}><Link href={`/certificados/${c.codigo}`} className="block rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-ink-900 hover:border-seguro-500/50 dark:border-slate-800 dark:bg-surface-dark-elevated dark:text-white">{c.resultado.evaluacion.titulo}</Link></li>))}
              {insignias.map((i) => (<li key={i.insigniaId} className="flex items-center gap-2 rounded-lg bg-alerta-500/10 px-3 py-2 text-sm text-ink-900 dark:text-white">{i.insignia.icono ? <span aria-hidden="true">{i.insignia.icono}</span> : <Star size={14} className="text-alerta-500" aria-hidden="true" />}{i.insignia.nombre}</li>))}
            </ul>
          </section>

          <Link href="/biblioteca" className="flex items-center gap-3 rounded-2xl bg-primary-500 p-5 text-white transition-colors hover:bg-primary-600">
            <Library size={22} aria-hidden="true" /><span><span className="block font-display font-semibold">Biblioteca</span><span className="text-sm text-primary-100">{recursos.length} recursos disponibles</span></span>
          </Link>
        </aside>
      </div>
    </div>
  );
}

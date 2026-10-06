import type { Metadata } from 'next';
import Link from 'next/link';
import { Target, CheckCircle2, Circle, Lock, ArrowRight } from 'lucide-react';
import { AMENAZAS } from '@/lib/amenazas-data';
import { ordenarModulos } from '@/lib/modulos-data';
import { categoriaRepository } from '@/repository/categoria.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { AutoevaluacionQuiz } from '@/components/escenarios/autoevaluacion-quiz';
import { construirMetadata } from '@/lib/seo';
import { estadoRuta } from '@/lib/ruta-estado';
import { MAX_INTENTOS_FINAL } from '@/lib/autoevaluacion-config';
import { compararIntentos, type DetalleModulo } from '@/repository/autoevaluacion.repository';
import { ComparacionAutoevaluacion } from '@/components/escenarios/comparacion-autoevaluacion';
import { preguntaAutoevaluacionRepository } from '@/repository/pregunta-autoevaluacion.repository';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = construirMetadata({
  titulo: 'Autoevaluación',
  descripcion: 'Descubre tu punto de partida y repasa lo aprendido. Con sesión iniciada se guarda para comparar tu avance. No da certificado.',
  ruta: '/autoevaluacion',
});

export default async function AutoevaluacionPage({ searchParams }: { searchParams: { requerida?: string; repetir?: string } }) {
  // Preguntas gestionadas desde el panel (/admin/autoevaluaciones): solo las activas, en su orden.
  const [categorias, usuario, escenarios] = await Promise.all([categoriaRepository.findAll(), obtenerSesionActual(), preguntaAutoevaluacionRepository.activasParaEstudiante()]);
  const modulos = ordenarModulos(categorias).map((c) => ({ slug: c.slug, nombre: c.nombre }));
  const ruta = await estadoRuta(usuario);
  const amenazas = Object.fromEntries(AMENAZAS.map((a) => [a.slug, a.nombre]));
  const { inicial, final } = compararIntentos(ruta.intentos);
  const resumen = (i: NonNullable<typeof inicial>) => ({ porcentaje: i.porcentaje, detalle: JSON.parse(i.detalle) as DetalleModulo[], fecha: i.createdAt.toISOString() });

  // Estados de la ruta:
  //  - sin inicial               → autoevaluación INICIAL (obligatoria para ver los módulos)
  //  - inicial, ruta incompleta  → panel de pendientes (la final aún está bloqueada)
  //  - ruta completa, sin final  → autoevaluación FINAL
  //  - con final                 → comparación (y opción de repetir la final)
  const restantes = Math.max(0, MAX_INTENTOS_FINAL - ruta.intentosFinal);
  const estado: 'inicial' | 'pendiente' | 'final' | 'comparacion' = !ruta.tieneInicial
    ? 'inicial'
    : ruta.tieneFinal && (!searchParams.repetir || restantes === 0)
      ? 'comparacion'
      : ruta.listoParaFinal
        ? 'final'
        : 'pendiente';

  const titulos = {
    inicial: ['Autoevaluación inicial: ¿cuánto sabes?', 'Es el primer paso: descubre tu punto de partida. Al terminarla se habilitan los módulos y te diremos por cuál empezar.'],
    pendiente: ['Tu autoevaluación final aún no está disponible', 'Se habilita cuando completes todos los módulos y apruebes sus evaluaciones.'],
    final: ['Autoevaluación final: ¿cuánto aprendiste?', `Terminaste todos los módulos y evaluaciones. Tienes ${MAX_INTENTOS_FINAL} intentos (te quedan ${restantes}); se compara tu mejor resultado con el inicial.`],
    comparacion: ['Tu avance: inicial vs. final', `Así cambió tu conocimiento (se usa tu mejor intento final). Intentos usados: ${ruta.intentosFinal} de ${MAX_INTENTOS_FINAL}.`],
  }[estado];

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-primary-500 to-seguro-600 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto max-w-3xl px-6 py-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest"><Target size={14} aria-hidden="true" />Autoevaluación</span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">{titulos[0]}</h1>
          <p className="mt-3 text-lg text-white/85">{titulos[1]}</p>
          {(estado === 'inicial' || estado === 'final') && (
            <p className="mt-3 text-sm text-white/75">
              {escenarios.length} situaciones que cubren los {modulos.length} módulos y las {AMENAZAS.length} amenazas. No da certificado (eso lo hacen las <Link href="/evaluaciones" className="font-semibold underline">Evaluaciones</Link>); se guarda para comparar tu avance.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl space-y-6 px-6 pb-24 pt-10">
        {searchParams.requerida && estado === 'inicial' && (
          <div role="alert" className="flex gap-3 rounded-xl border border-alerta-500/30 bg-alerta-500/10 p-4 text-sm text-ink-900 dark:text-white">
            <Lock size={18} className="mt-0.5 shrink-0 text-alerta-600" aria-hidden="true" />
            <p><strong>Primero la autoevaluación inicial.</strong> Los módulos se habilitan cuando la completes{!usuario && <>. Necesitas <Link href="/login?from=/autoevaluacion" className="font-semibold underline">iniciar sesión</Link> o <Link href="/registro" className="font-semibold underline">crear una cuenta</Link> para que se guarde</>}.</p>
          </div>
        )}

        {(estado === 'inicial' || estado === 'final') && escenarios.length === 0 && (
          <p role="status" className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-ink-700 dark:border-slate-800 dark:bg-surface-dark-elevated dark:text-slate-400">La autoevaluación no tiene preguntas disponibles en este momento. Vuelve a intentarlo más tarde.</p>
        )}

        {(estado === 'inicial' || estado === 'final') && escenarios.length > 0 && (
          <AutoevaluacionQuiz key={ruta.intentos.length} escenarios={escenarios} modulos={modulos} amenazas={amenazas} modo={estado === 'inicial' ? 'diagnostico' : 'repaso'} haySesion={!!usuario} />
        )}

        {estado === 'pendiente' && (
          <>
            {inicial && <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-ink-700 dark:border-slate-800 dark:bg-surface-dark-elevated dark:text-slate-400">Tu autoevaluación inicial fue de <strong className="text-ink-900 dark:text-white">{inicial.porcentaje}%</strong>. Completa lo que falta para hacer la final y ver tu mejora.</p>}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
              <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-white">Te falta ({ruta.pasos.length - ruta.completos} de {ruta.pasos.length} módulos)</h2>
              <ul className="mt-4 space-y-3">
                {ruta.pasos.map((p) => {
                  const ok = p.completado && p.evaluacionAprobada;
                  return (
                    <li key={p.slug} className="flex items-start gap-3 text-sm">
                      {ok ? <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-seguro-500" aria-hidden="true" /> : <Circle size={18} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />}
                      <div className="flex-1">
                        <p className="font-semibold text-ink-900 dark:text-white">{p.nombre}</p>
                        <p className="text-ink-700 dark:text-slate-400">
                          {ok ? 'Módulo y evaluación completados' : !p.completado ? 'Falta completar el módulo' : 'Falta aprobar la evaluación'}
                        </p>
                      </div>
                      {!ok && (
                        <Link href={!p.completado || !p.evaluacionId ? `/modulos/${p.slug}` : `/evaluaciones/${p.evaluacionId}`} className="shrink-0 font-semibold text-seguro-600 hover:underline dark:text-seguro-400">
                          {!p.completado ? 'Ir al módulo' : 'Rendir evaluación'}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Link href="/modulos" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-seguro-600">Ir a los módulos <ArrowRight size={15} aria-hidden="true" /></Link>
            </div>
          </>
        )}

        {estado === 'comparacion' && inicial && final && (
          <>
            <ComparacionAutoevaluacion inicial={resumen(inicial)} final={resumen(final)} modulos={modulos} />
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/mi-progreso" className="rounded-lg bg-seguro-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-seguro-600">Ver mi progreso</Link>
              {restantes > 0 ? <Link href="/autoevaluacion?repetir=1" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white">Intentar de nuevo ({restantes} {restantes === 1 ? 'intento restante' : 'intentos restantes'})</Link> : <span className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-ink-700 dark:border-slate-700 dark:text-slate-400">Usaste tus {MAX_INTENTOS_FINAL} intentos</span>}
            </div>
          </>
        )}
      </div>
    </>
  );
}

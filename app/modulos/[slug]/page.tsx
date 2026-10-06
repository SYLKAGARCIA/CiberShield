import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft, ArrowRight, Target, Lightbulb, ShieldAlert, FileText, Video, Gamepad2, BookOpen, ListChecks, Quote, CheckCircle2, Link2,
} from 'lucide-react';
import { categoriaRepository } from '@/repository/categoria.repository';
import { publicacionRepository } from '@/repository/publicacion.repository';
import { recursoRepository } from '@/repository/recurso.repository';
import { evaluacionRepository } from '@/repository/evaluacion.repository';
import { progresoRepository } from '@/repository/progreso.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { obtenerExtra, ordenarModulos } from '@/lib/modulos-data';
import { AMENAZAS } from '@/lib/amenazas-data';
import { getIconoCategoria } from '@/lib/iconos-categorias';
import { gradienteModulo } from '@/components/modulos/modulo-card';
import { BotonCompletar } from '@/components/modulos/boton-completar';
import { PreguntaInteractiva } from '@/components/escenarios/pregunta-interactiva';
import { RecursoGrid } from '@/components/shared/resource-viewer';
import { ThreatIcon } from '@/components/shared/threat-icon';
import { construirMetadata } from '@/lib/seo';
import { requerirAutoevaluacionInicial } from '@/lib/ruta-estado';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

interface PageProps { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const c = await categoriaRepository.findBySlug(params.slug);
  if (!c) return {};
  return construirMetadata({ titulo: `${c.nombre} | Módulos`, descripcion: c.descripcion ?? undefined, ruta: `/modulos/${params.slug}` });
}

function Seccion({ id, icono: Icono, titulo, children }: { id: string; icono: typeof Target; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="mb-4 flex items-center gap-3 font-display text-xl font-semibold text-ink-900 dark:text-white md:text-2xl">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-300"><Icono size={18} aria-hidden="true" /></span>
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export default async function ModuloPage({ params }: PageProps) {
  const categoria = await categoriaRepository.findBySlug(params.slug);
  if (!categoria) notFound();

  const [todas, articulos, recursos, usuario] = await Promise.all([
    categoriaRepository.findAll(),
    publicacionRepository.findPorCategoria(params.slug),
    recursoRepository.findFiltrados({ categoriaSlug: params.slug }),
    obtenerSesionActual(),
  ]);

  await requerirAutoevaluacionInicial(usuario);
  const modulos = ordenarModulos(todas);
  const indice = modulos.findIndex((m) => m.id === categoria.id);
  const anterior = indice > 0 ? modulos[indice - 1] : null;
  const siguiente = indice < modulos.length - 1 ? modulos[indice + 1] : null;

  const progreso = usuario ? await progresoRepository.completadosPorUsuario(usuario.id) : [];
  const completado = progreso.some((p) => p.categoriaId === categoria.id);
  // Evaluación del módulo: las sembradas usan el id `evaluacion-<slug>`.
  const evalModulo = await evaluacionRepository.findById(`evaluacion-${categoria.slug}`);
  const evaluacionId = evalModulo?.activa ? evalModulo.id : null;
  const hechos = progreso.length;
  const pct = modulos.length ? Math.round((hechos / modulos.length) * 100) : 0;

  const extra = obtenerExtra(categoria.slug);
  const amenazas = AMENAZAS.filter((a) => a.moduloSlug === categoria.slug);
  const Icono = getIconoCategoria(categoria.slug);
  const pdfs = recursos.filter((r) => r.tipo === 'PDF');
  const videos = recursos.filter((r) => r.tipo === 'VIDEO');
  const otros = recursos.filter((r) => r.tipo !== 'PDF' && r.tipo !== 'VIDEO');
  const aVista = (r: (typeof recursos)[number]) => ({ id: r.id, titulo: r.titulo, descripcion: r.descripcion, tipo: r.tipo, url: r.url, modulo: null });

  const indiceNav = [
    { id: 'intro', t: 'Introducción' }, { id: 'objetivos', t: 'Objetivos' },
    ...(articulos.length ? [{ id: 'contenido', t: 'Contenido' }] : []),
    ...(extra.ejemplos.length ? [{ id: 'ejemplos', t: 'Ejemplos cotidianos' }] : []),
    ...(amenazas.length ? [{ id: 'amenazas', t: 'Amenazas relacionadas' }] : []),
    ...(extra.mitos.length ? [{ id: 'mitos', t: 'Mitos y realidades' }] : []),
    { id: 'consejos', t: 'Consejos de seguridad' },
    ...(recursos.length ? [{ id: 'recursos', t: 'Recursos' }] : []),
    { id: 'actividad', t: 'Mini actividad' },
  ];

  return (
    <>
      {/* Portada */}
      <section className={cn('relative overflow-hidden bg-gradient-to-br text-white', gradienteModulo(Math.max(indice, 0)))}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <Icono size={260} className="pointer-events-none absolute -right-10 -top-10 hidden text-white/10 md:block" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-14 md:py-20">
          <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest backdrop-blur">Módulo {indice + 1} de {modulos.length}</span>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur"><Icono size={28} aria-hidden="true" /></span>
            <h1 className="font-display text-3xl font-semibold tracking-tight md:text-5xl">{categoria.nombre}</h1>
          </div>
          {categoria.descripcion && <p className="mt-4 max-w-2xl text-lg text-white/85">{categoria.descripcion}</p>}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-3 py-1">{articulos.length} {articulos.length === 1 ? 'lección' : 'lecciones'}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">{recursos.length} {recursos.length === 1 ? 'recurso' : 'recursos'}</span>
            {completado && <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-seguro-600"><CheckCircle2 size={14} aria-hidden="true" />Completado</span>}
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-10 lg:grid-cols-[220px_1fr]">
        {/* Índice lateral */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6">
            <nav aria-label="Secciones del módulo">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-ink-700/60 dark:text-slate-500">En este módulo</p>
              <ul className="space-y-1 border-l border-slate-200 dark:border-slate-800">
                {indiceNav.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-sm text-ink-700 transition-colors hover:border-seguro-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white">{s.t}</a></li>
                ))}
              </ul>
            </nav>
            {usuario && (
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
                <p className="text-xs text-ink-700 dark:text-slate-400">Progreso del curso</p>
                <p className="mt-1 font-display text-xl font-semibold text-ink-900 dark:text-white">{pct}%</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-seguro-500" style={{ width: `${pct}%` }} /></div>
                <p className="mt-1.5 text-xs text-ink-700/70 dark:text-slate-500">{hechos} de {modulos.length} módulos</p>
              </div>
            )}
          </div>
        </aside>

        <div className="min-w-0 space-y-12">
          <Seccion id="intro" icono={BookOpen} titulo="Introducción">
            <p className="text-lg leading-relaxed text-ink-700 dark:text-slate-300">{extra.introduccion}</p>
          </Seccion>

          <Seccion id="objetivos" icono={Target} titulo="Objetivos de aprendizaje">
            <ul className="grid gap-3 sm:grid-cols-3">
              {extra.objetivos.map((o, i) => (
                <li key={i} className="rounded-xl border border-slate-200 bg-white p-4 text-sm leading-relaxed text-ink-700 dark:border-slate-800 dark:bg-surface-dark-elevated dark:text-slate-300">
                  <span className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-seguro-500 text-xs font-semibold text-white">{i + 1}</span>{o}
                </li>
              ))}
            </ul>
          </Seccion>

          {articulos.length > 0 && (
            <Seccion id="contenido" icono={ListChecks} titulo="Contenido del módulo">
              <ol className="space-y-3">
                {articulos.map((a, i) => (
                  <li key={a.id}>
                    <Link href={`/articulos/${a.slug}`} className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-seguro-500/40 hover:shadow-lg hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-500/10 font-display text-sm font-semibold text-primary-600 group-hover:bg-seguro-500 group-hover:text-white dark:text-primary-300">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-base font-semibold text-ink-900 group-hover:text-primary-600 dark:text-white">{a.titulo}</span>
                        {a.resumen && <span className="mt-0.5 line-clamp-2 block text-sm text-ink-700 dark:text-slate-400">{a.resumen}</span>}
                      </span>
                      <ArrowRight size={16} className="mt-2 shrink-0 text-ink-700/30 transition-transform group-hover:translate-x-1 group-hover:text-seguro-500" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </Seccion>
          )}

          {extra.ejemplos.length > 0 && (
            <Seccion id="ejemplos" icono={Quote} titulo="Ejemplos cotidianos">
              <div className="grid gap-3 sm:grid-cols-3">
                {extra.ejemplos.map((e, i) => (
                  <div key={i} className="rounded-xl border-l-4 border-alerta-500 bg-alerta-500/5 p-4 text-sm leading-relaxed text-ink-900 dark:text-slate-200">{e}</div>
                ))}
              </div>
            </Seccion>
          )}

          {amenazas.length > 0 && (
            <Seccion id="amenazas" icono={ShieldAlert} titulo="Amenazas relacionadas">
              <div className="grid gap-3 sm:grid-cols-2">
                {amenazas.map((a) => (
                  <Link key={a.slug} href={`/amenazas/${a.slug}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-alerta-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-surface-dark-elevated">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-alerta-500/10 text-alerta-600"><ThreatIcon nombre={a.icono} size={19} /></span>
                    <span className="min-w-0"><span className="block font-semibold text-ink-900 group-hover:text-primary-600 dark:text-white">{a.nombre}</span><span className="line-clamp-1 text-xs text-ink-700 dark:text-slate-400">{a.resumen}</span></span>
                  </Link>
                ))}
              </div>
            </Seccion>
          )}

          {extra.mitos.length > 0 && (
            <Seccion id="mitos" icono={Lightbulb} titulo="Mitos y realidades">
              <div className="space-y-3">
                {extra.mitos.map((m, i) => (
                  <div key={i} className="grid overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 sm:grid-cols-2">
                    <div className="bg-alerta-500/5 p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-alerta-600">Mito</p><p className="mt-1 text-sm text-ink-900 dark:text-slate-200">{m.mito}</p></div>
                    <div className="bg-seguro-500/5 p-4"><p className="font-mono text-[10px] uppercase tracking-widest text-seguro-600 dark:text-seguro-400">Realidad</p><p className="mt-1 text-sm text-ink-900 dark:text-slate-200">{m.realidad}</p></div>
                  </div>
                ))}
              </div>
            </Seccion>
          )}

          <Seccion id="consejos" icono={Lightbulb} titulo="Consejos de seguridad">
            <ul className="grid gap-3 sm:grid-cols-3">
              {extra.consejos.map((c, i) => (
                <li key={i} className="flex gap-3 rounded-xl bg-primary-500 p-4 text-sm leading-relaxed text-white dark:bg-primary-600"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-seguro-400" aria-hidden="true" />{c}</li>
              ))}
            </ul>
          </Seccion>

          {recursos.length > 0 && (
            <Seccion id="recursos" icono={FileText} titulo="Recursos del módulo">
              <div className="space-y-6">
                {pdfs.length > 0 && <div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white"><FileText size={15} aria-hidden="true" />Documentos PDF</h3><RecursoGrid compacto recursos={pdfs.map(aVista)} /></div>}
                {videos.length > 0 && <div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white"><Video size={15} aria-hidden="true" />Videos</h3><RecursoGrid compacto recursos={videos.map(aVista)} /></div>}
                {otros.length > 0 && <div><h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-900 dark:text-white"><Link2 size={15} aria-hidden="true" />Otros recursos</h3><RecursoGrid compacto recursos={otros.map(aVista)} /></div>}
              </div>
            </Seccion>
          )}

          <Seccion id="actividad" icono={Gamepad2} titulo="Mini actividad">
            <PreguntaInteractiva etiqueta="Pon a prueba lo aprendido" {...extra.actividad} />
          </Seccion>

          {/* Cierre y navegación */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-surface-dark-elevated/60">
            <BotonCompletar categoriaId={categoria.id} slug={categoria.slug} completado={completado} haySesion={!!usuario} evaluacionId={evaluacionId} />
            <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:justify-between">
              {anterior ? (
                <Link href={`/modulos/${anterior.slug}`} className="group inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-colors hover:border-seguro-500 dark:border-slate-700 dark:bg-surface-dark">
                  <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                  <span><span className="block text-xs text-ink-700/70 dark:text-slate-500">Anterior</span><span className="font-semibold text-ink-900 dark:text-white">{anterior.nombre}</span></span>
                </Link>
              ) : <span />}
              {/* Con evaluación, el avance al siguiente módulo se hace al terminarla. */}
              {evaluacionId ? (
                <span />
              ) : siguiente ? (
                <Link href={`/modulos/${siguiente.slug}`} className="group inline-flex items-center justify-end gap-3 rounded-xl bg-primary-500 px-4 py-3 text-sm text-white transition-colors hover:bg-primary-600">
                  <span className="text-right"><span className="block text-xs text-primary-100">Siguiente</span><span className="font-semibold">{siguiente.nombre}</span></span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ) : (
                <Link href="/evaluaciones" className="inline-flex items-center gap-2 rounded-xl bg-seguro-500 px-4 py-3 text-sm font-semibold text-white hover:bg-seguro-600">Ir a las evaluaciones <ArrowRight size={16} aria-hidden="true" /></Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

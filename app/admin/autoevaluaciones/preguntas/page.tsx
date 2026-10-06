import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { CheckCircle2, Pencil, ArrowLeft } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { preguntaAutoevaluacionRepository } from '@/repository/pregunta-autoevaluacion.repository';
import { categoriaRepository } from '@/repository/categoria.repository';
import { ordenarModulos } from '@/lib/modulos-data';
import { AMENAZAS } from '@/lib/amenazas-data';
import { AccionesPregunta } from '../acciones-pregunta';
import { eliminarPreguntaAutoevaluacion } from '../actions';

export const metadata: Metadata = { title: 'Preguntas de la Autoevaluación | Admin' };
export const dynamic = 'force-dynamic';

export default async function PreguntasAutoevaluacionPage() {
  const [preguntas, categorias] = await Promise.all([preguntaAutoevaluacionRepository.findAllParaAdmin(), categoriaRepository.findAll()]);
  if (preguntas === null) redirect('/admin/autoevaluaciones');

  const amenazas = new Map(AMENAZAS.map((a) => [a.slug, a.nombre]));
  // Mismo orden que ve el estudiante: módulos en el orden del curso y, dentro de cada uno, por `orden`.
  const modulos = ordenarModulos(categorias);
  const slugs = new Set(modulos.map((m) => m.slug));
  const grupos = [
    ...modulos.map((m) => ({ clave: m.slug, nombre: m.nombre, preguntas: preguntas.filter((p) => p.moduloSlug === m.slug), huerfano: false })),
    { clave: '__sin-modulo', nombre: 'Sin módulo válido', preguntas: preguntas.filter((p) => !slugs.has(p.moduloSlug)), huerfano: true },
  ].filter((g) => g.preguntas.length > 0 || !g.huerfano);

  const activas = preguntas.filter((p) => p.activa).length;
  let numero = 0; // numeración tal como la verá el estudiante (solo activas)

  return (
    <div className="max-w-4xl">
      <Link href="/admin/autoevaluaciones" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft size={14} aria-hidden="true" /> Autoevaluaciones
      </Link>
      <AdminPageHeader
        titulo="Gestionar preguntas"
        descripcion={`${activas} activas de ${preguntas.length}. El estudiante ve las activas, agrupadas por módulo en este mismo orden. Los cambios se aplican al guardar.`}
        nuevoHref="/admin/autoevaluaciones/preguntas/nueva"
        nuevoEtiqueta="Nueva pregunta"
      />

      <div className="space-y-8">
        {grupos.map((g) => (
          <section key={g.clave}>
            <h2 className="mb-3 flex items-baseline justify-between gap-3 font-display text-base font-semibold text-ink-900 dark:text-white">
              <span>{g.nombre}</span>
              <span className="text-xs font-normal text-ink-700 dark:text-slate-400">
                {g.preguntas.filter((p) => p.activa).length} activas · {g.preguntas.length} en total
              </span>
            </h2>
            {g.huerfano && (
              <p className="mb-3 text-xs text-alerta-600">Estas preguntas pertenecen a un módulo que ya no existe: edítalas para asignarles un módulo.</p>
            )}
            {g.preguntas.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-sm text-ink-700/60 dark:border-slate-700 dark:text-slate-500">Este módulo no tiene preguntas en la autoevaluación.</p>
            ) : (
              <div className="space-y-3">
                {g.preguntas.map((p, i) => {
                  if (p.activa) numero++;
                  return (
                    <div key={p.id} className={`rounded-lg border bg-white p-4 dark:bg-surface-dark-elevated ${p.activa ? 'border-slate-200 dark:border-slate-800' : 'border-dashed border-slate-300 opacity-70 dark:border-slate-700'}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-600 dark:text-primary-300">{p.tema}</span>
                            {p.amenazaSlug && amenazas.has(p.amenazaSlug) && <span className="rounded-full bg-alerta-500/10 px-2 py-0.5 text-[10px] font-semibold text-alerta-600 dark:text-alerta-400">{amenazas.get(p.amenazaSlug)}</span>}
                            <span className={p.activa ? 'rounded-full bg-seguro-500/10 px-2 py-0.5 text-[10px] font-medium text-seguro-600 dark:text-seguro-400' : 'rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-ink-700/60 dark:bg-slate-800 dark:text-slate-500'}>
                              {p.activa ? `Activa · #${numero}` : 'Inactiva'}
                            </span>
                          </div>
                          <p className="mt-1 font-medium text-ink-900 dark:text-white">{p.titulo}</p>
                          <p className="mt-0.5 text-sm text-ink-700 dark:text-slate-400">{p.situacion}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                          <AccionesPregunta id={p.id} activa={p.activa} esPrimera={i === 0} esUltima={i === g.preguntas.length - 1} />
                          <Link href={`/admin/autoevaluaciones/preguntas/${p.id}/editar`} aria-label="Editar" title="Editar" className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500">
                            <Pencil size={15} aria-hidden="true" />
                          </Link>
                          <DeleteButton accion={eliminarPreguntaAutoevaluacion} id={p.id} etiquetaConfirmacion={`¿Eliminar la pregunta "${p.titulo}"? Dejará de aparecer a los estudiantes. Si solo quieres ocultarla, desactívala.`} />
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1 pl-1">
                        {p.opciones.map((op, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-ink-700 dark:text-slate-400">
                            {j === p.correcta ? <CheckCircle2 size={13} className="shrink-0 text-seguro-500" aria-label="Correcta" /> : <span className="w-[13px] shrink-0" />}
                            <span className={j === p.correcta ? 'font-medium text-seguro-600 dark:text-seguro-400' : ''}>{String.fromCharCode(65 + j)}. {op}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

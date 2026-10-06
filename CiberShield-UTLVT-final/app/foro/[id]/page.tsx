import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { foroRepository } from '@/repository/foro.repository';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { RespuestaForm } from '@/components/foro/respuesta-form';
import { BotonEliminar } from '@/components/foro/boton-eliminar';
import { eliminarHilo, eliminarRespuesta } from '../actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Hilo | Foro' };

const fmt = (d: Date) => new Date(d).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default async function HiloPage({ params }: { params: { id: string } }) {
  const [hilo, usuario] = await Promise.all([foroRepository.obtenerHilo(params.id), obtenerSesionActual()]);
  if (!hilo) notFound();
  const staff = tieneAccesoAdmin(usuario?.role.name);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-10">
      <Link href="/foro" className="text-sm font-medium text-ink-700 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white">← Volver al foro</Link>

      <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark-elevated">
        <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">{hilo.titulo}</h1>
        <p className="mt-1 text-xs text-ink-700/70 dark:text-slate-500">{hilo.autor.name} · {fmt(hilo.createdAt)}</p>
        <p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-ink-700 dark:text-slate-300">{hilo.contenido}</p>
        {usuario && (staff || usuario.id === hilo.autorId) && (
          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800"><BotonEliminar accion={eliminarHilo.bind(null, hilo.id)} etiqueta="Eliminar hilo" /></div>
        )}
      </article>

      <h2 className="mb-3 mt-8 font-display text-lg font-semibold text-ink-900 dark:text-white">{hilo.respuestas.length} {hilo.respuestas.length === 1 ? 'respuesta' : 'respuestas'}</h2>
      <ul className="space-y-3">
        {hilo.respuestas.map((r) => (
          <li key={r.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-surface-dark-elevated">
            <div className="flex items-center justify-between gap-2 text-xs text-ink-700/70 dark:text-slate-500">
              <span><strong className="text-ink-900 dark:text-white">{r.autor.name}</strong>{tieneAccesoAdmin(r.autor.role.name) && <span className="ml-2 rounded-full bg-seguro-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-seguro-600 dark:text-seguro-400">{r.autor.role.name}</span>} · {fmt(r.createdAt)}</span>
              {usuario && (staff || usuario.id === r.autorId) && <BotonEliminar accion={eliminarRespuesta.bind(null, r.id, hilo.id)} />}
            </div>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-ink-700 dark:text-slate-300">{r.contenido}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-surface-dark-elevated/50">
        {usuario ? <RespuestaForm hiloId={hilo.id} /> : (
          <p className="text-sm text-ink-700 dark:text-slate-400"><Link href={`/login?from=/foro/${hilo.id}`} className="font-semibold text-seguro-600 hover:underline dark:text-seguro-400">Inicia sesión</Link> para responder.</p>
        )}
      </div>
    </div>
  );
}

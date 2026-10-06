import type { Metadata } from 'next';
import Link from 'next/link';
import { MessagesSquare, Plus, MessageCircle } from 'lucide-react';
import { foroRepository } from '@/repository/foro.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { EmptyState } from '@/components/shared/empty-state';
import { construirMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = construirMetadata({
  titulo: 'Foro',
  descripcion: 'Espacio para que los estudiantes compartan dudas y experiencias sobre ciberseguridad.',
  ruta: '/foro',
});

export default async function ForoPage() {
  const [hilos, usuario] = await Promise.all([foroRepository.listarHilos(), obtenerSesionActual()]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-primary-500 to-primary-700 text-white dark:border-slate-800">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dot-grid text-white/10" />
        <div className="relative mx-auto flex max-w-4xl flex-col gap-5 px-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs uppercase tracking-widest"><MessagesSquare size={14} aria-hidden="true" />Foro</span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">Comunidad CiberShield</h1>
            <p className="mt-3 max-w-xl text-lg text-primary-100">Pregunta, comparte experiencias y aprende con otros estudiantes.</p>
          </div>
          <Link href={usuario ? '/foro/nuevo' : '/login?from=/foro/nuevo'} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-seguro-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-seguro-600"><Plus size={16} aria-hidden="true" />Nuevo hilo</Link>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-8">
        {hilos === null ? (
          <EmptyState titulo="El foro aún no está disponible" descripcion="Falta aplicar la actualización de la base de datos (npx prisma migrate deploy)." />
        ) : hilos.length === 0 ? (
          <EmptyState titulo="Aún no hay hilos" descripcion="Sé la primera persona en abrir una conversación." />
        ) : (
          <ul className="space-y-3">
            {hilos.map((h) => (
              <li key={h.id}>
                <Link href={`/foro/${h.id}`} className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-seguro-500/40 hover:shadow-lg hover:shadow-primary-900/10 dark:border-slate-800 dark:bg-surface-dark-elevated">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">{h.autor.name.charAt(0).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-ink-900 group-hover:text-primary-600 dark:text-white">{h.titulo}</span>
                    <span className="mt-0.5 line-clamp-2 block text-sm text-ink-700 dark:text-slate-400">{h.contenido}</span>
                    <span className="mt-2 block text-xs text-ink-700/70 dark:text-slate-500">{h.autor.name} · {new Date(h.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-ink-700 dark:bg-surface-dark dark:text-slate-300"><MessageCircle size={13} aria-hidden="true" />{h._count.respuestas}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

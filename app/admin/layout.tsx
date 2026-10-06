import { redirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { LogoutButton } from '@/components/admin/logout-button';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

// Defensa en profundidad (Fase 9): el panel ya está excluido en
// robots.ts, pero se refuerza aquí con metadata `noindex` por si algún
// buscador llega a rastrearlo por otra vía (ej. un enlace externo).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Segunda capa de protección (la real): corre en Node.js, consulta la
 * base de datos vía `obtenerSesionActual()` y verifica el rol. El
 * middleware (Edge) ya filtró a quien no tiene cookie; esto filtra a
 * quien tiene una cookie inválida/expirada o un rol sin permiso.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const usuario = await obtenerSesionActual();

  if (!usuario || !tieneAccesoAdmin(usuario.role.name)) {
    redirect('/login');
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-surface-dark">
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-2">
            <ShieldCheck className="text-primary-500" size={20} aria-hidden="true" />
            <span className="font-display text-base font-semibold text-ink-900 dark:text-white">
              Panel Administrativo
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-ink-900 dark:text-white">{usuario.name}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">
                {usuario.role.name}
              </p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-10">
        <aside className="hidden w-56 shrink-0 md:block">
          <AdminSidebar rol={usuario.role.name} />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

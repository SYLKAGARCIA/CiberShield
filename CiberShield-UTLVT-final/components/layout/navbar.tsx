import Link from 'next/link';
import { ShieldCheck, LayoutDashboard } from 'lucide-react';
import { menuRepository } from '@/repository/menu.repository';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { LogoutButton } from '@/components/admin/logout-button';
import { NavbarVisibility } from '@/components/layout/navbar-visibility';

export async function Navbar() {
  const [items, usuario] = await Promise.all([
    menuRepository.findByUbicacion('HEADER'),
    obtenerSesionActual(),
  ]);

  const esStaff = tieneAccesoAdmin(usuario?.role.name);
  const mostrarArticulosNoticias = !!usuario && !esStaff;

  return (
    <NavbarVisibility>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href={esStaff ? '/admin' : '/inicio'}
            className="flex items-center gap-2"
          >
            <ShieldCheck className="text-primary-500" size={20} aria-hidden="true" />
            <span className="font-display text-base font-semibold text-ink-900 dark:text-white">
              {esStaff ? 'Panel Administrativo' : usuario ? 'Estudiante' : 'CiberShield UTLVT'}
            </span>
          </Link>

          <div className="flex items-center gap-4">
            {usuario ? (
              <>
                <div className="text-right">
                  <p className="text-sm font-medium text-ink-900 dark:text-white">
                    {usuario.name}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-seguro-600 dark:text-seguro-400">
                    {usuario.role.name}
                  </p>
                </div>
                <LogoutButton />
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm font-medium text-ink-700 hover:text-primary-600 dark:text-slate-300 dark:hover:text-white"
              >
                <LayoutDashboard size={15} aria-hidden="true" />
                Acceder
              </Link>
            )}

            <ThemeToggle />
            <MobileNav items={items} mostrarArticulosNoticias={mostrarArticulosNoticias} />
          </div>
        </div>
      </header>
    </NavbarVisibility>
  );
}

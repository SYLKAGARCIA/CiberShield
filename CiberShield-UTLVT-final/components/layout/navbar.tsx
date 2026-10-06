import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { categoriaRepository } from '@/repository/categoria.repository';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { ordenarModulos } from '@/lib/modulos-data';
import { MainNav } from '@/components/layout/main-nav';
import { NavbarVisibility } from '@/components/layout/navbar-visibility';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';

export async function Navbar() {
  const [categorias, usuario] = await Promise.all([categoriaRepository.findAll(), obtenerSesionActual()]);
  const modulos = ordenarModulos(categorias).map((c) => ({ slug: c.slug, nombre: c.nombre, descripcion: c.descripcion }));

  return (
    <NavbarVisibility>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-surface-dark-elevated/90">
        <div className="mx-auto flex max-w-[88rem] items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/inicio" className="flex shrink-0 items-center gap-2" aria-label="CiberShield UTLVT — inicio">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-500 text-white shadow-md shadow-primary-900/20">
              <ShieldCheck size={19} aria-hidden="true" />
            </span>
            <span className="font-display text-base font-semibold leading-none text-ink-900 dark:text-white">
              CiberShield <span className="text-seguro-500">UTLVT</span>
            </span>
          </Link>
          <MainNav
            modulos={modulos}
            usuario={usuario ? { name: usuario.name, rol: usuario.role.name, esStaff: tieneAccesoAdmin(usuario.role.name) } : null}
          />
        </div>
      </header>
      <Breadcrumbs />
    </NavbarVisibility>
  );
}

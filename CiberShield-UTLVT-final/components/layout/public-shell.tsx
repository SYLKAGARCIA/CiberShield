import { menuRepository } from '@/repository/menu.repository';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { SiteShell } from './site-shell';

export async function PublicShell({ children }: { children: React.ReactNode }) {
  const [items, usuario] = await Promise.all([
    menuRepository.findByUbicacion('HEADER'),
    obtenerSesionActual(),
  ]);

  const mostrarArticulosNoticias = !!usuario && !tieneAccesoAdmin(usuario.role.name);

  return (
    <SiteShell items={items} mostrarArticulosNoticias={mostrarArticulosNoticias}>
      {children}
    </SiteShell>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { usuarioRepository } from '@/repository/usuario.repository';
import { obtenerSesionActual } from '@/lib/auth';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { DeleteButton } from '@/components/admin/delete-button';
import { eliminarUsuario } from './actions';

export const metadata: Metadata = { title: 'Usuarios | Admin' };

export default async function AdminUsuariosPage() {
  const [usuarios, sesionActual] = await Promise.all([
    usuarioRepository.findAll(),
    obtenerSesionActual(),
  ]);

  return (
    <div>
      <AdminPageHeader
        titulo="Usuarios"
        descripcion="Cuentas con acceso al sitio. Solo el rol ADMIN puede gestionarlas."
        nuevoHref="/admin/usuarios/nuevo"
        nuevoEtiqueta="Nuevo usuario"
      />

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-surface-dark-elevated">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-ink-700/70 dark:border-slate-800 dark:bg-surface-dark dark:text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-4 py-3 font-medium text-ink-900 dark:text-white">
                  {usuario.name}
                  {usuario.id === sesionActual?.id && (
                    <span className="ml-2 rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-medium text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                      Tú
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink-700 dark:text-slate-400">{usuario.email}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 font-mono text-xs uppercase text-primary-600 dark:bg-primary-500/10 dark:text-primary-300">
                    {usuario.role.name}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      usuario.active
                        ? 'inline-flex items-center rounded-full bg-seguro-500/10 px-2.5 py-0.5 text-xs font-medium text-seguro-600 dark:text-seguro-400'
                        : 'inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-700/60 dark:bg-slate-800 dark:text-slate-500'
                    }
                  >
                    {usuario.active ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/usuarios/${usuario.id}/editar`}
                      aria-label="Editar"
                      className="flex h-8 w-8 items-center justify-center rounded-md text-ink-700/60 hover:bg-primary-50 hover:text-primary-600 dark:text-slate-500"
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </Link>
                    {usuario.id !== sesionActual?.id && (
                      <DeleteButton
                        accion={eliminarUsuario}
                        id={usuario.id}
                        etiquetaConfirmacion={`¿Eliminar al usuario "${usuario.name}"?`}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

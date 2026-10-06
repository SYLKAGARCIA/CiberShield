import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { obtenerSesionActual } from '@/lib/auth';
import { HiloForm } from '@/components/foro/hilo-form';

export const metadata: Metadata = { title: 'Nuevo hilo | Foro' };

export default async function NuevoHiloPage() {
  const usuario = await obtenerSesionActual();
  if (!usuario) redirect('/login?from=/foro/nuevo');

  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-10">
      <Link href="/foro" className="text-sm font-medium text-ink-700 hover:text-primary-600 dark:text-slate-400 dark:hover:text-white">← Volver al foro</Link>
      <h1 className="mb-6 mt-3 font-display text-3xl font-semibold text-ink-900 dark:text-white">Nuevo hilo</h1>
      <HiloForm />
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { KeyRound, Lock, ShieldCheck, UserCheck } from 'lucide-react';
import { obtenerSesionActual, tieneAccesoAdmin } from '@/lib/auth';
import { contenidoInicioRepository } from '@/repository/contenido-inicio.repository';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Iniciar sesión',
};

export default async function LoginPage() {
  // Si ya hay una sesión activa, no tiene sentido mostrar el login de nuevo.
  const usuario = await obtenerSesionActual();
  if (usuario) {
    redirect(tieneAccesoAdmin(usuario.role.name) ? '/admin' : '/evaluaciones');
  }

  const contenido = await contenidoInicioRepository.get();
  const titulo = contenido?.heroTitulo || 'Aprende a protegerte en el mundo digital';
  const subtitulo =
    contenido?.heroSubtitulo ||
    'Recursos, herramientas y evaluaciones para que los estudiantes naveguen internet de forma segura.';

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-surface-light dark:bg-ink-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-grid text-ink-900/[0.04] dark:text-white/[0.04]"
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2">
        {/* Columna izquierda: marca + ilustración (oculta en móvil) */}
        <div className="hidden flex-col md:flex">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-seguro-500/15">
              <ShieldCheck className="text-seguro-500 dark:text-seguro-400" size={16} aria-hidden="true" />
            </div>
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-seguro-500 dark:text-seguro-400">
              CiberShield UTLVT
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-ink-900 dark:text-white">
            {titulo}
          </h1>
          <p className="mt-3 max-w-sm text-ink-700 dark:text-slate-400">{subtitulo}</p>

          <div className="relative mt-16 flex h-72 items-center justify-center">
            <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-seguro-500/15 via-primary-500/10 to-transparent blur-2xl" />
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-seguro-500/20 bg-white/60 shadow-xl backdrop-blur-sm dark:bg-white/5">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-seguro-500/15">
                <Lock className="text-seguro-500 dark:text-seguro-400" size={48} aria-hidden="true" />
              </div>
              <div className="absolute -top-3 -left-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 shadow-lg">
                <ShieldCheck className="text-white" size={24} aria-hidden="true" />
              </div>
              <div className="absolute -bottom-2 -right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-surface-dark-elevated">
                <UserCheck className="text-seguro-500 dark:text-seguro-400" size={24} aria-hidden="true" />
              </div>
            </div>
            <span className="absolute left-2 top-4 h-2 w-2 rounded-full bg-seguro-400" />
            <span className="absolute bottom-8 left-10 h-1.5 w-1.5 rounded-full bg-primary-300" />
            <span className="absolute right-4 top-10 h-1.5 w-1.5 rounded-full bg-seguro-400" />
          </div>
        </div>

        {/* Columna derecha: tarjeta con el formulario */}
        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-3xl border border-white/10 bg-surface-dark-elevated p-8 shadow-2xl">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-seguro-500/15">
                <KeyRound className="text-seguro-400" size={22} aria-hidden="true" />
              </div>
              <h1 className="mt-4 font-display text-2xl font-semibold text-white">Bienvenido</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Ingresa a tu cuenta de CiberShield UTLVT para continuar.
              </p>
            </div>

            <LoginForm />

            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <ShieldCheck size={13} className="text-seguro-400" aria-hidden="true" />
              Acceso seguro y autorizado
            </div>

            <p className="mt-5 text-center text-sm text-slate-400">
              ¿Eres estudiante y no tienes cuenta?{' '}
              <Link href="/registro" className="font-semibold text-seguro-400 hover:underline">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

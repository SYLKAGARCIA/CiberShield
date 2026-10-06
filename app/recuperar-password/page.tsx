import type { Metadata } from 'next';
import Link from 'next/link';
import { KeyRound } from 'lucide-react';
import { RecuperarPasswordForm } from '@/components/auth/recuperar-password-form';

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
};

export default function RecuperarPasswordPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-ink-900 px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-grid text-white/[0.04]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-seguro-500/15">
            <KeyRound className="text-seguro-400" size={22} aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">
            Recuperar contraseña
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Escribe tu correo y te enviaremos un enlace para restablecerla.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface-dark-elevated p-8 shadow-2xl">
          <RecuperarPasswordForm />
          <p className="mt-5 text-center text-sm text-slate-400">
            <Link href="/login" className="font-semibold text-seguro-400 hover:underline">
              Volver a iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

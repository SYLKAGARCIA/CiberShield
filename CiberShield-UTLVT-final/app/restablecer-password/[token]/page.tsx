import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { RestablecerPasswordForm } from '@/components/auth/restablecer-password-form';

export const metadata: Metadata = {
  title: 'Restablecer contraseña',
};

export default function RestablecerPasswordPage({ params }: { params: { token: string } }) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-ink-900 px-6 py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-grid text-white/[0.04]"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-seguro-500/15">
            <ShieldCheck className="text-seguro-400" size={22} aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">
            Nueva contraseña
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Escribe tu nueva contraseña para tu cuenta de CiberShield UTLVT.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface-dark-elevated p-8 shadow-2xl">
          <RestablecerPasswordForm token={params.token} />
        </div>
      </div>
    </div>
  );
}

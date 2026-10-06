import type { Metadata } from 'next';
import { ShieldQuestion } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';

export const metadata: Metadata = { title: 'Verificar Certificado' };

export default function VerificarCertificadoBuscarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Verificación"
        titulo="Verifica un certificado"
        descripcion="Ingresa el código impreso en el certificado para confirmar su autenticidad."
      />

      <div className="mx-auto max-w-md px-6 pb-24 pt-10">
        <form action="/certificados" method="GET" className="flex gap-2">
          <input
            type="text"
            name="codigo"
            placeholder="ej: clx4a9b2c0001xyz"
            required
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-mono text-sm text-ink-900 placeholder:font-sans focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
          >
            Verificar
          </button>
        </form>

        <div className="mt-8 flex items-start gap-2 rounded-lg border border-slate-200 p-4 text-sm text-ink-700 dark:border-slate-800 dark:text-slate-400">
          <ShieldQuestion size={16} className="mt-0.5 shrink-0 text-primary-500" aria-hidden="true" />
          El código de verificación aparece impreso en la parte inferior del certificado en PDF.
        </div>
      </div>
    </>
  );
}

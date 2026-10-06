'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

/** Se desactiva al enviar para evitar envíos (y certificados) duplicados por doble clic. */
export function BotonEnviar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg bg-seguro-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
      {pending ? 'Enviando…' : 'Enviar respuestas'}
    </button>
  );
}

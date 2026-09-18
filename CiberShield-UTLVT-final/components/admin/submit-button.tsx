'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ etiqueta = 'Guardar' }: { etiqueta?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center rounded-lg bg-seguro-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? 'Guardando...' : etiqueta}
    </button>
  );
}

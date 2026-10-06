'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface GlosarioFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: { termino: string; definicion: string };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function GlosarioForm({ accion, valoresIniciales }: GlosarioFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Término"
        name="termino"
        required
        defaultValue={valoresIniciales?.termino}
        error={estado.errores?.termino}
      />
      <TextAreaField
        label="Definición"
        name="definicion"
        required
        rows={4}
        defaultValue={valoresIniciales?.definicion}
        error={estado.errores?.definicion}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/glosario"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField, CheckboxField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface FaqFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: { pregunta: string; respuesta: string; orden: number; publicada: boolean };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function FaqForm({ accion, valoresIniciales }: FaqFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Pregunta"
        name="pregunta"
        required
        defaultValue={valoresIniciales?.pregunta}
        error={estado.errores?.pregunta}
      />
      <TextAreaField
        label="Respuesta"
        name="respuesta"
        required
        rows={4}
        defaultValue={valoresIniciales?.respuesta}
        error={estado.errores?.respuesta}
      />
      <TextField
        label="Orden"
        name="orden"
        type="number"
        defaultValue={String(valoresIniciales?.orden ?? 0)}
        error={estado.errores?.orden}
      />
      <CheckboxField
        label="Publicada (visible en el sitio)"
        name="publicada"
        defaultChecked={valoresIniciales?.publicada ?? true}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/faq"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

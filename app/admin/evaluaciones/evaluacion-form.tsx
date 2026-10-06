'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField, CheckboxField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface EvaluacionFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: {
    titulo: string;
    descripcion?: string | null;
    puntajeMinimo: number;
    activa: boolean;
  };
  volverA?: string;
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function EvaluacionForm({ accion, valoresIniciales, volverA = '/admin/evaluaciones' }: EvaluacionFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Título"
        name="titulo"
        required
        defaultValue={valoresIniciales?.titulo}
        error={estado.errores?.titulo}
      />
      <TextAreaField
        label="Descripción"
        name="descripcion"
        rows={3}
        defaultValue={valoresIniciales?.descripcion ?? undefined}
        error={estado.errores?.descripcion}
      />
      <TextField
        label="Puntaje mínimo para aprobar (%)"
        name="puntajeMinimo"
        type="number"
        defaultValue={String(valoresIniciales?.puntajeMinimo ?? 70)}
        error={estado.errores?.puntajeMinimo}
      />
      <CheckboxField
        label="Activa (visible en /evaluaciones)"
        name="activa"
        defaultChecked={valoresIniciales?.activa ?? true}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href={volverA}
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface CategoriaFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: { nombre: string; slug: string; descripcion?: string | null };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function CategoriaForm({ accion, valoresIniciales }: CategoriaFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Nombre"
        name="nombre"
        required
        defaultValue={valoresIniciales?.nombre}
        error={estado.errores?.nombre}
      />
      <TextField
        label="Slug"
        name="slug"
        required
        placeholder="ej: buenas-practicas"
        defaultValue={valoresIniciales?.slug}
        error={estado.errores?.slug}
      />
      <TextAreaField
        label="Descripción"
        name="descripcion"
        rows={3}
        defaultValue={valoresIniciales?.descripcion ?? undefined}
        error={estado.errores?.descripcion}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/categorias"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

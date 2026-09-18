'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField, SelectField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface RecursoFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  categorias: { id: string; nombre: string }[];
  valoresIniciales?: {
    titulo: string;
    descripcion?: string | null;
    tipo: string;
    url: string;
    categoriaId?: string | null;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function RecursoForm({ accion, categorias, valoresIniciales }: RecursoFormProps) {
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
      <SelectField
        label="Tipo"
        name="tipo"
        required
        defaultValue={valoresIniciales?.tipo ?? 'ENLACE'}
        opciones={[
          { value: 'PDF', label: 'PDF' },
          { value: 'VIDEO', label: 'Video' },
          { value: 'ENLACE', label: 'Enlace' },
          { value: 'IMAGEN', label: 'Imagen' },
        ]}
        error={estado.errores?.tipo}
      />
      <TextField
        label="URL"
        name="url"
        required
        placeholder="https://..."
        defaultValue={valoresIniciales?.url}
        error={estado.errores?.url}
      />
      <SelectField
        label="Categoría (opcional)"
        name="categoriaId"
        defaultValue={valoresIniciales?.categoriaId ?? ''}
        opciones={[
          { value: '', label: 'Sin categoría' },
          ...categorias.map((c) => ({ value: c.id, label: c.nombre })),
        ]}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/recursos"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

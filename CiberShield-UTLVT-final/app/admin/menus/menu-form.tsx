'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, SelectField, CheckboxField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface MenuFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: {
    etiqueta: string;
    url: string;
    ubicacion: string;
    orden: number;
    abrirEnNuevaPestana: boolean;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function MenuForm({ accion, valoresIniciales }: MenuFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Etiqueta"
        name="etiqueta"
        required
        placeholder="ej: Amenazas"
        defaultValue={valoresIniciales?.etiqueta}
        error={estado.errores?.etiqueta}
      />
      <TextField
        label="URL"
        name="url"
        required
        placeholder="/amenazas"
        defaultValue={valoresIniciales?.url}
        error={estado.errores?.url}
      />
      <SelectField
        label="Ubicación"
        name="ubicacion"
        required
        defaultValue={valoresIniciales?.ubicacion ?? 'HEADER'}
        opciones={[
          { value: 'HEADER', label: 'Encabezado (header)' },
          { value: 'FOOTER', label: 'Pie de página (footer)' },
        ]}
        error={estado.errores?.ubicacion}
      />
      <TextField
        label="Orden"
        name="orden"
        type="number"
        defaultValue={String(valoresIniciales?.orden ?? 0)}
        error={estado.errores?.orden}
      />
      <CheckboxField
        label="Abrir en una pestaña nueva"
        name="abrirEnNuevaPestana"
        defaultChecked={valoresIniciales?.abrirEnNuevaPestana}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/menus"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

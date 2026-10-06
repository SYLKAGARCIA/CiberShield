'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface InsigniaFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: {
    nombre: string;
    descripcion?: string | null;
    icono?: string | null;
    criterio?: string | null;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function InsigniaForm({ accion, valoresIniciales }: InsigniaFormProps) {
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
        label="Ícono (un emoji, ej: 🛡️ 🏆 🔒)"
        name="icono"
        defaultValue={valoresIniciales?.icono ?? undefined}
        error={estado.errores?.icono}
      />
      <TextAreaField
        label="Descripción"
        name="descripcion"
        rows={2}
        defaultValue={valoresIniciales?.descripcion ?? undefined}
        error={estado.errores?.descripcion}
      />
      <TextAreaField
        label="Criterio para obtenerla"
        name="criterio"
        rows={2}
        defaultValue={valoresIniciales?.criterio ?? undefined}
        error={estado.errores?.criterio}
      />
      <p className="text-xs text-ink-700/70 dark:text-slate-500">
        Por ahora esto solo describe cómo se gana la insignia; otorgarla a un estudiante en
        concreto se hace manualmente desde su perfil (próximamente automático por evaluación).
      </p>

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/insignias"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

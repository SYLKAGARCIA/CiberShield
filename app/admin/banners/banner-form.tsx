'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, CheckboxField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface BannerFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  valoresIniciales?: {
    grupo: string;
    titulo?: string | null;
    subtitulo?: string | null;
    imagenUrl: string;
    enlaceUrl?: string | null;
    orden: number;
    activo: boolean;
    fechaInicio?: Date | null;
    fechaFin?: Date | null;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

/** Date -> "YYYY-MM-DD" para precargar un <input type="date">. */
function aFechaInput(fecha?: Date | null) {
  if (!fecha) return undefined;
  return new Date(fecha).toISOString().slice(0, 10);
}

export function BannerForm({ accion, valoresIniciales }: BannerFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Grupo (para tener varios carruseles; el de la home es home-hero)"
        name="grupo"
        required
        defaultValue={valoresIniciales?.grupo ?? 'home-hero'}
        error={estado.errores?.grupo}
      />
      <TextField
        label="Título (opcional)"
        name="titulo"
        defaultValue={valoresIniciales?.titulo ?? undefined}
        error={estado.errores?.titulo}
      />
      <TextField
        label="Subtítulo (opcional)"
        name="subtitulo"
        defaultValue={valoresIniciales?.subtitulo ?? undefined}
        error={estado.errores?.subtitulo}
      />
      <TextField
        label="URL de la imagen"
        name="imagenUrl"
        required
        placeholder="https://..."
        defaultValue={valoresIniciales?.imagenUrl}
        error={estado.errores?.imagenUrl}
      />
      <TextField
        label="Enlace al hacer clic (opcional)"
        name="enlaceUrl"
        placeholder="/recursos"
        defaultValue={valoresIniciales?.enlaceUrl ?? undefined}
        error={estado.errores?.enlaceUrl}
      />
      <TextField
        label="Orden (los números menores aparecen primero)"
        name="orden"
        type="number"
        defaultValue={String(valoresIniciales?.orden ?? 0)}
        error={estado.errores?.orden}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextField
          label="Vigente desde (opcional)"
          name="fechaInicio"
          type="date"
          defaultValue={aFechaInput(valoresIniciales?.fechaInicio)}
          error={estado.errores?.fechaInicio}
        />
        <TextField
          label="Vigente hasta (opcional)"
          name="fechaFin"
          type="date"
          defaultValue={aFechaInput(valoresIniciales?.fechaFin)}
          error={estado.errores?.fechaFin}
        />
      </div>
      <p className="text-xs text-ink-700/70 dark:text-slate-500">
        Si dejas las fechas vacías, el banner se muestra siempre mientras esté &ldquo;Activo&rdquo;.
      </p>

      <CheckboxField
        label="Activo (visible en el carrusel)"
        name="activo"
        defaultChecked={valoresIniciales?.activo ?? true}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/banners"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

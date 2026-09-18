'use client';

import { useFormState } from 'react-dom';
import { CheckCircle2 } from 'lucide-react';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';
import { actualizarContenidoInicio } from './actions';

interface ContenidoInicioFormProps {
  valoresIniciales: {
    heroTitulo: string;
    heroSubtitulo?: string | null;
    heroImagenUrl?: string | null;
    heroCtaTexto?: string | null;
    heroCtaUrl?: string | null;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function ContenidoInicioForm({ valoresIniciales }: ContenidoInicioFormProps) {
  const [estado, formAction] = useFormState(actualizarContenidoInicio, ESTADO_INICIAL);
  const guardadoConExito = Object.keys(estado).length === 0 && estado !== ESTADO_INICIAL;

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}
      {guardadoConExito && (
        <div className="flex items-center gap-2 rounded-lg border border-seguro-500/30 bg-seguro-500/5 px-4 py-3 text-sm text-seguro-600 dark:text-seguro-400">
          <CheckCircle2 size={16} aria-hidden="true" />
          Contenido actualizado. Los cambios ya se ven en /inicio.
        </div>
      )}

      <TextField
        label="Título principal (hero)"
        name="heroTitulo"
        required
        defaultValue={valoresIniciales.heroTitulo}
        error={estado.errores?.heroTitulo}
      />
      <TextAreaField
        label="Subtítulo"
        name="heroSubtitulo"
        rows={3}
        defaultValue={valoresIniciales.heroSubtitulo ?? undefined}
        error={estado.errores?.heroSubtitulo}
      />
      <TextField
        label="URL de imagen del hero (opcional)"
        name="heroImagenUrl"
        placeholder="https://..."
        defaultValue={valoresIniciales.heroImagenUrl ?? undefined}
        error={estado.errores?.heroImagenUrl}
      />
      <TextField
        label="Texto del botón principal"
        name="heroCtaTexto"
        placeholder="Comenzar a aprender"
        defaultValue={valoresIniciales.heroCtaTexto ?? undefined}
        error={estado.errores?.heroCtaTexto}
      />
      <TextField
        label="Enlace del botón principal"
        name="heroCtaUrl"
        placeholder="/sobre-ciberseguridad"
        defaultValue={valoresIniciales.heroCtaUrl ?? undefined}
        error={estado.errores?.heroCtaUrl}
      />

      <SubmitButton />
    </form>
  );
}

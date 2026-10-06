'use client';

import { useFormState } from 'react-dom';
import { CheckCircle2 } from 'lucide-react';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';
import { actualizarConfiguracion } from './actions';

interface ConfiguracionFormProps {
  valoresIniciales: {
    nombreSitio: string;
    descripcionSitio?: string | null;
    emailContacto?: string | null;
    telefonoContacto?: string | null;
    facebookUrl?: string | null;
    twitterUrl?: string | null;
    instagramUrl?: string | null;
    linkedinUrl?: string | null;
    metaTituloDefault?: string | null;
    metaDescripcionDefault?: string | null;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function ConfiguracionForm({ valoresIniciales }: ConfiguracionFormProps) {
  const [estado, formAction] = useFormState(actualizarConfiguracion, ESTADO_INICIAL);
  const guardadoConExito = Object.keys(estado).length === 0 && estado !== ESTADO_INICIAL;

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}
      {guardadoConExito && (
        <div className="flex items-center gap-2 rounded-lg border border-seguro-500/30 bg-seguro-500/5 px-4 py-3 text-sm text-seguro-600 dark:text-seguro-400">
          <CheckCircle2 size={16} aria-hidden="true" />
          Configuración guardada correctamente.
        </div>
      )}

      <section className="space-y-5">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          General
        </h2>
        <TextField
          label="Nombre del sitio"
          name="nombreSitio"
          required
          defaultValue={valoresIniciales.nombreSitio}
          error={estado.errores?.nombreSitio}
        />
        <TextAreaField
          label="Descripción del sitio"
          name="descripcionSitio"
          rows={2}
          defaultValue={valoresIniciales.descripcionSitio ?? undefined}
          error={estado.errores?.descripcionSitio}
        />
      </section>

      <section className="space-y-5 border-t border-slate-200 pt-6 dark:border-slate-800">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          Contacto
        </h2>
        <TextField
          label="Email de contacto"
          name="emailContacto"
          type="email"
          defaultValue={valoresIniciales.emailContacto ?? undefined}
          error={estado.errores?.emailContacto}
        />
        <TextField
          label="Teléfono de contacto"
          name="telefonoContacto"
          defaultValue={valoresIniciales.telefonoContacto ?? undefined}
          error={estado.errores?.telefonoContacto}
        />
      </section>

      <section className="space-y-5 border-t border-slate-200 pt-6 dark:border-slate-800">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          Redes sociales
        </h2>
        <TextField
          label="Facebook"
          name="facebookUrl"
          placeholder="https://facebook.com/..."
          defaultValue={valoresIniciales.facebookUrl ?? undefined}
          error={estado.errores?.facebookUrl}
        />
        <TextField
          label="Twitter / X"
          name="twitterUrl"
          placeholder="https://x.com/..."
          defaultValue={valoresIniciales.twitterUrl ?? undefined}
          error={estado.errores?.twitterUrl}
        />
        <TextField
          label="Instagram"
          name="instagramUrl"
          placeholder="https://instagram.com/..."
          defaultValue={valoresIniciales.instagramUrl ?? undefined}
          error={estado.errores?.instagramUrl}
        />
        <TextField
          label="LinkedIn"
          name="linkedinUrl"
          placeholder="https://linkedin.com/..."
          defaultValue={valoresIniciales.linkedinUrl ?? undefined}
          error={estado.errores?.linkedinUrl}
        />
      </section>

      <section className="space-y-5 border-t border-slate-200 pt-6 dark:border-slate-800">
        <h2 className="font-display text-base font-semibold text-ink-900 dark:text-white">
          SEO por defecto
        </h2>
        <TextField
          label="Meta título por defecto"
          name="metaTituloDefault"
          defaultValue={valoresIniciales.metaTituloDefault ?? undefined}
          error={estado.errores?.metaTituloDefault}
        />
        <TextAreaField
          label="Meta descripción por defecto"
          name="metaDescripcionDefault"
          rows={2}
          defaultValue={valoresIniciales.metaDescripcionDefault ?? undefined}
          error={estado.errores?.metaDescripcionDefault}
        />
      </section>

      <SubmitButton etiqueta="Guardar configuración" />
    </form>
  );
}

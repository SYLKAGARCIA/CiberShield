'use client';

import { useFormState } from 'react-dom';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import { crearHilo } from '@/app/foro/actions';
import type { EstadoFormulario } from '@/types/admin-form';

const INICIAL: EstadoFormulario = {};

export function HiloForm() {
  const [estado, action] = useFormState(crearHilo, INICIAL);
  return (
    <form action={action} className="space-y-5">
      {estado.errorGeneral && <div role="alert" className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600">{estado.errorGeneral}</div>}
      <TextField label="Título" name="titulo" required placeholder="Ej: ¿Cómo sé si un enlace es seguro?" error={estado.errores?.titulo} />
      <TextAreaField label="Tu consulta o experiencia" name="contenido" required rows={6} error={estado.errores?.contenido} />
      <p className="text-xs text-ink-700/70 dark:text-slate-500">No compartas contraseñas, números de tarjeta ni datos personales sensibles.</p>
      <SubmitButton etiqueta="Publicar hilo" />
    </form>
  );
}

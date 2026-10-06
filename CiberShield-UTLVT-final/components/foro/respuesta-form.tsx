'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import { responderHilo } from '@/app/foro/actions';
import type { EstadoFormulario } from '@/types/admin-form';

const INICIAL: EstadoFormulario = {};

export function RespuestaForm({ hiloId }: { hiloId: string }) {
  const [estado, action] = useFormState(responderHilo.bind(null, hiloId), INICIAL);
  const ref = useRef<HTMLFormElement>(null);
  const exito = !estado.errores && !estado.errorGeneral && estado !== INICIAL;
  useEffect(() => { if (exito) ref.current?.reset(); }, [exito, estado]);

  return (
    <form ref={ref} action={action} className="space-y-3">
      {estado.errorGeneral && <div role="alert" className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600">{estado.errorGeneral}</div>}
      <TextAreaField label="Tu respuesta" name="contenido" required rows={4} error={estado.errores?.contenido} />
      <SubmitButton etiqueta="Responder" />
    </form>
  );
}

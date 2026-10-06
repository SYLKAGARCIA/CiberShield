'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, TextAreaField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface PreguntaFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  volverA: string;
  valoresIniciales?: {
    enunciado: string;
    opciones: { texto: string; esCorrecta: boolean }[];
  };
  etiquetaBoton?: string;
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function PreguntaForm({
  accion,
  volverA,
  valoresIniciales,
  etiquetaBoton = 'Agregar pregunta',
}: PreguntaFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  // Índice (1-4) de la opción marcada como correcta en valoresIniciales,
  // para preseleccionar el radio button correspondiente al editar.
  const correctaInicial = valoresIniciales?.opciones.findIndex((o) => o.esCorrecta);
  const correctaInicialStr =
    correctaInicial !== undefined && correctaInicial >= 0 ? String(correctaInicial + 1) : undefined;

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextAreaField
        label="Enunciado de la pregunta"
        name="enunciado"
        required
        rows={2}
        defaultValue={valoresIniciales?.enunciado}
        error={estado.errores?.enunciado}
      />

      <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
        <legend className="px-1 text-sm font-medium text-ink-900 dark:text-white">
          Opciones — marca cuál es la correcta
        </legend>
        {(['1', '2', '3', '4'] as const).map((n) => (
          <div key={n} className="flex items-center gap-3">
            <input
              type="radio"
              name="correcta"
              value={n}
              required
              defaultChecked={correctaInicialStr === n}
              className="h-4 w-4 shrink-0 border-slate-300 text-seguro-500"
              aria-label={`Opción ${n} es la correcta`}
            />
            <div className="flex-1">
              <TextField
                label={`Opción ${n}`}
                name={`opcion${n}`}
                required
                defaultValue={valoresIniciales?.opciones[Number(n) - 1]?.texto}
                error={estado.errores?.[`opcion${n}`]}
              />
            </div>
          </div>
        ))}
        {estado.errores?.correcta && (
          <p className="text-xs text-alerta-600">{estado.errores.correcta}</p>
        )}
      </fieldset>

      <div className="flex items-center gap-3">
        <SubmitButton etiqueta={etiquetaBoton} />
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

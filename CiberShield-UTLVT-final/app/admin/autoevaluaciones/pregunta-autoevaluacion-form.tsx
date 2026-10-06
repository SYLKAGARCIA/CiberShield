'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Plus, X } from 'lucide-react';
import { TextField, TextAreaField, SelectField, CheckboxField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import { MAX_OPCIONES_AUTOEVALUACION, MIN_OPCIONES_AUTOEVALUACION } from '@/lib/validations/pregunta-autoevaluacion.schema';
import type { EstadoFormulario } from '@/types/admin-form';

interface Props {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  modulos: { slug: string; nombre: string }[];
  amenazas: { slug: string; nombre: string }[];
  valoresIniciales?: {
    moduloSlug: string;
    amenazaSlug: string | null;
    tema: string;
    titulo: string;
    situacion: string;
    opciones: string[];
    correcta: number;
    explicacion: string;
    activa: boolean;
  };
  etiquetaBoton?: string;
}

const ESTADO_INICIAL: EstadoFormulario = {};
const VOLVER_A = '/admin/autoevaluaciones/preguntas';

export function PreguntaAutoevaluacionForm({ accion, modulos, amenazas, valoresIniciales, etiquetaBoton = 'Guardar pregunta' }: Props) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);
  const [opciones, setOpciones] = useState<string[]>(valoresIniciales?.opciones ?? ['', '', '']);
  const [correcta, setCorrecta] = useState<number | null>(valoresIniciales?.correcta ?? null);

  function agregarOpcion() {
    if (opciones.length < MAX_OPCIONES_AUTOEVALUACION) setOpciones((o) => [...o, '']);
  }
  function quitarOpcion(i: number) {
    if (opciones.length <= MIN_OPCIONES_AUTOEVALUACION) return;
    setOpciones((o) => o.filter((_, j) => j !== i));
    setCorrecta((c) => (c === null ? null : c === i ? null : c > i ? c - 1 : c));
  }

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">{estado.errorGeneral}</div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Módulo"
          name="moduloSlug"
          required
          defaultValue={valoresIniciales?.moduloSlug ?? ''}
          opciones={[{ value: '', label: 'Selecciona un módulo…' }, ...modulos.map((m) => ({ value: m.slug, label: m.nombre }))]}
          error={estado.errores?.moduloSlug}
        />
        <SelectField
          label="Amenaza relacionada (opcional)"
          name="amenazaSlug"
          defaultValue={valoresIniciales?.amenazaSlug ?? ''}
          opciones={[{ value: '', label: 'Ninguna' }, ...amenazas.map((a) => ({ value: a.slug, label: a.nombre }))]}
          error={estado.errores?.amenazaSlug}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Tema" name="tema" required placeholder="Ej. Phishing" defaultValue={valoresIniciales?.tema} error={estado.errores?.tema} />
        <TextField label="Título" name="titulo" required placeholder="Ej. Cuenta a punto de bloquearse" defaultValue={valoresIniciales?.titulo} error={estado.errores?.titulo} />
      </div>

      <TextAreaField label="Situación (la pregunta que lee el estudiante)" name="situacion" required rows={3} defaultValue={valoresIniciales?.situacion} error={estado.errores?.situacion} />

      <fieldset className="space-y-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
        <legend className="px-1 text-sm font-medium text-ink-900 dark:text-white">
          Opciones de respuesta — marca la correcta <span className="text-alerta-600">*</span>
        </legend>
        <p className="text-xs text-ink-700 dark:text-slate-400">
          Entre {MIN_OPCIONES_AUTOEVALUACION} y {MAX_OPCIONES_AUTOEVALUACION} opciones. Al estudiante se le muestran en orden aleatorio.
        </p>
        {opciones.map((texto, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="radio"
              name="correcta"
              value={i}
              checked={correcta === i}
              onChange={() => setCorrecta(i)}
              className="h-4 w-4 shrink-0 border-slate-300 text-seguro-500"
              aria-label={`La opción ${String.fromCharCode(65 + i)} es la correcta`}
            />
            <span className="w-4 shrink-0 text-sm font-semibold text-ink-700 dark:text-slate-400">{String.fromCharCode(65 + i)}</span>
            <input
              name="opciones"
              value={texto}
              onChange={(e) => setOpciones((o) => o.map((v, j) => (j === i ? e.target.value : v)))}
              aria-label={`Texto de la opción ${String.fromCharCode(65 + i)}`}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white"
            />
            <button
              type="button"
              onClick={() => quitarOpcion(i)}
              disabled={opciones.length <= MIN_OPCIONES_AUTOEVALUACION}
              aria-label={`Quitar la opción ${String.fromCharCode(65 + i)}`}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-700/60 hover:bg-alerta-500/10 hover:text-alerta-600 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-500"
            >
              <X size={15} aria-hidden="true" />
            </button>
          </div>
        ))}
        {opciones.length < MAX_OPCIONES_AUTOEVALUACION && (
          <button type="button" onClick={agregarOpcion} className="inline-flex items-center gap-1 text-sm font-medium text-seguro-600 hover:underline dark:text-seguro-400">
            <Plus size={14} aria-hidden="true" /> Agregar opción
          </button>
        )}
        {estado.errores?.opciones && <p className="text-xs text-alerta-600">{estado.errores.opciones}</p>}
        {estado.errores?.correcta && <p className="text-xs text-alerta-600">{estado.errores.correcta}</p>}
      </fieldset>

      <TextAreaField label="Explicación (se muestra al responder)" name="explicacion" required rows={3} defaultValue={valoresIniciales?.explicacion} error={estado.errores?.explicacion} />

      <CheckboxField label="Activa (visible para los estudiantes)" name="activa" defaultChecked={valoresIniciales?.activa ?? true} />

      <div className="flex items-center gap-3">
        <SubmitButton etiqueta={etiquetaBoton} />
        <Link href={VOLVER_A} className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white">
          Cancelar
        </Link>
      </div>
    </form>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { contactoSchema } from '@/lib/validations/contacto.schema';
import { cn } from '@/lib/utils';

type Estado = 'idle' | 'enviando' | 'exito' | 'error';

export function ContactForm() {
  const [estado, setEstado] = useState<Estado>('idle');
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores({});

    const formData = new FormData(e.currentTarget);
    const valores = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      asunto: formData.get('asunto'),
      mensaje: formData.get('mensaje'),
    };

    const resultado = contactoSchema.safeParse(valores);
    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        nuevosErrores[issue.path[0] as string] = issue.message;
      }
      setErrores(nuevosErrores);
      return;
    }

    setEstado('enviando');
    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultado.data),
      });
      if (!respuesta.ok) throw new Error('Fallo el envío');
      setEstado('exito');
      e.currentTarget.reset();
    } catch {
      setEstado('error');
    }
  }

  if (estado === 'exito') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-seguro-500/30 bg-seguro-500/5 p-6 text-center"
      >
        <p className="font-display text-lg font-semibold text-seguro-600 dark:text-seguro-400">
          Mensaje recibido
        </p>
        <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
          Gracias por escribirnos. Te responderemos lo antes posible.
        </p>
      </div>
    );
  }

  const campoClase =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
          Nombre
        </label>
        <input id="nombre" name="nombre" type="text" className={campoClase} />
        {errores.nombre && <p className="mt-1 text-xs text-alerta-600">{errores.nombre}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
          Correo electrónico
        </label>
        <input id="email" name="email" type="email" className={campoClase} />
        {errores.email && <p className="mt-1 text-xs text-alerta-600">{errores.email}</p>}
      </div>

      <div>
        <label htmlFor="asunto" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
          Asunto
        </label>
        <input id="asunto" name="asunto" type="text" className={campoClase} />
        {errores.asunto && <p className="mt-1 text-xs text-alerta-600">{errores.asunto}</p>}
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
          Mensaje
        </label>
        <textarea id="mensaje" name="mensaje" rows={5} className={cn(campoClase, 'resize-none')} />
        {errores.mensaje && <p className="mt-1 text-xs text-alerta-600">{errores.mensaje}</p>}
      </div>

      {estado === 'error' && (
        <p role="alert" aria-live="assertive" className="text-sm text-alerta-600">
          Algo salió mal al enviar tu mensaje. Inténtalo de nuevo en unos minutos.
        </p>
      )}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="inline-flex items-center rounded-lg bg-seguro-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import { Mail } from 'lucide-react';
import { recuperarPasswordSchema } from '@/lib/validations/recuperar-password.schema';

export function RecuperarPasswordForm() {
  const [cargando, setCargando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores({});
    setErrorGeneral(null);

    const formData = new FormData(e.currentTarget);
    const valores = { email: formData.get('email') };

    const resultado = recuperarPasswordSchema.safeParse(valores);
    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};
      for (const issue of resultado.error.issues) {
        nuevosErrores[issue.path[0] as string] = issue.message;
      }
      setErrores(nuevosErrores);
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch('/api/auth/recuperar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultado.data),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setErrorGeneral(data.error ?? 'No se pudo enviar el correo.');
        setCargando(false);
        return;
      }

      setEnviado(true);
    } catch {
      setErrorGeneral('Ocurrió un error de conexión. Inténtalo de nuevo.');
      setCargando(false);
    }
  }

  const campoClase =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white';

  if (enviado) {
    return (
      <div
        role="status"
        className="rounded-lg border border-seguro-500/30 bg-seguro-500/5 px-4 py-3 text-sm text-seguro-400"
      >
        Si ese correo tiene una cuenta registrada, te enviamos un enlace para restablecer tu
        contraseña. Revisa tu bandeja de entrada (y la carpeta de spam).
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {errorGeneral && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400"
        >
          {errorGeneral}
        </div>
      )}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          className={campoClase}
        />
        {errores.email && <p className="mt-1 text-xs text-alerta-600">{errores.email}</p>}
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-seguro-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Mail size={16} aria-hidden="true" />
        {cargando ? 'Enviando...' : 'Enviar enlace de recuperación'}
      </button>
    </form>
  );
}

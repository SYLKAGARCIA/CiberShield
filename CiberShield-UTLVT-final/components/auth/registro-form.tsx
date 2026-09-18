'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { UserPlus } from 'lucide-react';
import { registroSchema } from '@/lib/validations/registro.schema';

export function RegistroForm() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores({});
    setErrorGeneral(null);

    const formData = new FormData(e.currentTarget);
    const valores = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmarPassword: formData.get('confirmarPassword'),
    };

    const resultado = registroSchema.safeParse(valores);
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
      const respuesta = await fetch('/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultado.data),
      });
      const data = await respuesta.json();

      if (!respuesta.ok) {
        setErrorGeneral(data.error ?? 'No se pudo completar el registro.');
        setCargando(false);
        return;
      }

      router.push(data.redirectTo ?? '/');
      router.refresh();
    } catch {
      setErrorGeneral('Ocurrió un error de conexión. Inténtalo de nuevo.');
      setCargando(false);
    }
  }

  const campoClase =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white';

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
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white">
          Nombre completo
        </label>
        <input id="name" name="name" type="text" className={campoClase} />
        {errores.name && <p className="mt-1 text-xs text-alerta-600">{errores.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white">
          Correo electrónico
        </label>
        <input id="email" name="email" type="email" autoComplete="username" className={campoClase} />
        {errores.email && <p className="mt-1 text-xs text-alerta-600">{errores.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white">
          Contraseña
        </label>
        <input id="password" name="password" type="password" autoComplete="new-password" className={campoClase} />
        {errores.password && <p className="mt-1 text-xs text-alerta-600">{errores.password}</p>}
      </div>

      <div>
        <label htmlFor="confirmarPassword" className="mb-1.5 block text-sm font-medium text-white">
          Confirmar contraseña
        </label>
        <input
          id="confirmarPassword"
          name="confirmarPassword"
          type="password"
          autoComplete="new-password"
          className={campoClase}
        />
        {errores.confirmarPassword && (
          <p className="mt-1 text-xs text-alerta-600">{errores.confirmarPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-seguro-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <UserPlus size={16} aria-hidden="true" />
        {cargando ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  );
}

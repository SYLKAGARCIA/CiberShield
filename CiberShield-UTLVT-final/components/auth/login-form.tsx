'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { loginSchema } from '@/lib/validations/login.schema';

export function LoginForm() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [errores, setErrores] = useState<Record<string, string>>({});
  const [mostrarPassword, setMostrarPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores({});
    setErrorGeneral(null);

    const formData = new FormData(e.currentTarget);
    const valores = {
      email: formData.get('email'),
      password: formData.get('password'),
      recordarme: formData.get('recordarme') === 'on',
    };

    const resultado = loginSchema.safeParse(valores);
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
      const respuesta = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultado.data),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setErrorGeneral(data.error ?? 'No se pudo iniciar sesión.');
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
    'w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seguro-500 dark:border-white/10 dark:bg-white/5 dark:text-white';

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
        <div className="relative">
          <Mail
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="nombre@ejemplo.com"
            className={campoClase}
          />
        </div>
        {errores.email && <p className="mt-1 text-xs text-alerta-600">{errores.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white">
          Contraseña
        </label>
        <div className="relative">
          <Lock
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            id="password"
            name="password"
            type={mostrarPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Ingresa tu contraseña"
            className={`${campoClase} pr-10`}
          />
          <button
            type="button"
            onClick={() => setMostrarPassword((v) => !v)}
            aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
          >
            {mostrarPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
          </button>
        </div>
        {errores.password && <p className="mt-1 text-xs text-alerta-600">{errores.password}</p>}
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-300">
          <input
            type="checkbox"
            name="recordarme"
            className="h-4 w-4 rounded border-slate-400 bg-white/5 text-seguro-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-seguro-500"
          />
          Recordarme
        </label>
        <Link href="/recuperar-password" className="font-medium text-seguro-400 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <button
        type="submit"
        disabled={cargando}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-seguro-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-seguro-500/25 transition-colors hover:bg-seguro-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {cargando ? 'Verificando...' : 'Iniciar sesión'}
        {!cargando && <ArrowRight size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}

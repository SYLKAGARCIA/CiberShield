'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import { TextField, SelectField, CheckboxField } from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface UsuarioFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  roles: { id: string; name: string }[];
  modo: 'crear' | 'editar';
  valoresIniciales?: { name: string; email: string; roleId: string; active?: boolean };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function UsuarioForm({ accion, roles, modo, valoresIniciales }: UsuarioFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-lg space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <TextField
        label="Nombre completo"
        name="name"
        required
        defaultValue={valoresIniciales?.name}
        error={estado.errores?.name}
      />
      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        required
        defaultValue={valoresIniciales?.email}
        error={estado.errores?.email}
      />
      <TextField
        label={modo === 'crear' ? 'Contraseña' : 'Nueva contraseña (opcional)'}
        name="password"
        type="password"
        required={modo === 'crear'}
        placeholder={modo === 'editar' ? 'Dejar en blanco para no cambiarla' : undefined}
        error={estado.errores?.password}
      />
      <SelectField
        label="Rol"
        name="roleId"
        required
        defaultValue={valoresIniciales?.roleId}
        opciones={roles.map((r) => ({ value: r.id, label: r.name }))}
        error={estado.errores?.roleId}
      />
      {modo === 'editar' && (
        <CheckboxField
          label="Cuenta activa (puede iniciar sesión)"
          name="active"
          defaultChecked={valoresIniciales?.active ?? true}
        />
      )}

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/usuarios"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

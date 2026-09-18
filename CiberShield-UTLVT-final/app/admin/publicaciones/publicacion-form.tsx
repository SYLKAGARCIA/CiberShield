'use client';

import { useFormState } from 'react-dom';
import Link from 'next/link';
import {
  TextField,
  TextAreaField,
  SelectField,
  CheckboxField,
} from '@/components/admin/form-fields';
import { SubmitButton } from '@/components/admin/submit-button';
import type { EstadoFormulario } from '@/types/admin-form';

interface PublicacionFormProps {
  accion: (prevState: EstadoFormulario, formData: FormData) => Promise<EstadoFormulario>;
  categorias: { id: string; nombre: string }[];
  valoresIniciales?: {
    tipo: string;
    titulo: string;
    slug: string;
    resumen?: string | null;
    contenido: string;
    categoriaId: string;
    publicado: boolean;
    metaTitulo?: string | null;
    metaDescripcion?: string | null;
  };
}

const ESTADO_INICIAL: EstadoFormulario = {};

export function PublicacionForm({ accion, categorias, valoresIniciales }: PublicacionFormProps) {
  const [estado, formAction] = useFormState(accion, ESTADO_INICIAL);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {estado.errorGeneral && (
        <div className="rounded-lg border border-alerta-500/30 bg-alerta-500/5 px-4 py-3 text-sm text-alerta-600 dark:text-alerta-400">
          {estado.errorGeneral}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          label="Tipo"
          name="tipo"
          required
          defaultValue={valoresIniciales?.tipo ?? 'ARTICULO'}
          opciones={[
            { value: 'ARTICULO', label: 'Artículo' },
            { value: 'NOTICIA', label: 'Noticia' },
          ]}
          error={estado.errores?.tipo}
        />
        <SelectField
          label="Categoría"
          name="categoriaId"
          required
          defaultValue={valoresIniciales?.categoriaId}
          opciones={categorias.map((c) => ({ value: c.id, label: c.nombre }))}
          error={estado.errores?.categoriaId}
        />
      </div>

      <TextField
        label="Título"
        name="titulo"
        required
        defaultValue={valoresIniciales?.titulo}
        error={estado.errores?.titulo}
      />
      <TextField
        label="Slug"
        name="slug"
        required
        placeholder="ej: como-reconocer-un-correo-de-phishing"
        defaultValue={valoresIniciales?.slug}
        error={estado.errores?.slug}
      />
      <TextAreaField
        label="Resumen"
        name="resumen"
        rows={2}
        defaultValue={valoresIniciales?.resumen ?? undefined}
        error={estado.errores?.resumen}
      />
      <TextAreaField
        label="Contenido"
        name="contenido"
        required
        rows={10}
        defaultValue={valoresIniciales?.contenido}
        error={estado.errores?.contenido}
      />

      <details className="rounded-lg border border-slate-200 p-4 dark:border-slate-800">
        <summary className="cursor-pointer text-sm font-medium text-ink-900 dark:text-white">
          SEO (opcional)
        </summary>
        <div className="mt-4 space-y-4">
          <TextField
            label="Meta título"
            name="metaTitulo"
            defaultValue={valoresIniciales?.metaTitulo ?? undefined}
          />
          <TextAreaField
            label="Meta descripción"
            name="metaDescripcion"
            rows={2}
            defaultValue={valoresIniciales?.metaDescripcion ?? undefined}
          />
        </div>
      </details>

      <CheckboxField
        label="Publicado (visible en el sitio)"
        name="publicado"
        defaultChecked={valoresIniciales?.publicado}
      />

      <div className="flex items-center gap-3">
        <SubmitButton />
        <Link
          href="/admin/publicaciones"
          className="text-sm font-medium text-ink-700 hover:text-ink-900 dark:text-slate-400 dark:hover:text-white"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}

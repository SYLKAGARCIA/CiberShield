import { cn } from '@/lib/utils';

const claseCampo =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 dark:border-slate-700 dark:bg-surface-dark-elevated dark:text-white';

interface CampoBaseProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}

export function TextField({
  label,
  name,
  error,
  required,
  defaultValue,
  type = 'text',
  placeholder,
}: CampoBaseProps & { defaultValue?: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
        {label} {required && <span className="text-alerta-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={claseCampo}
      />
      {error && <p className="mt-1 text-xs text-alerta-600">{error}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  error,
  required,
  defaultValue,
  rows = 4,
}: CampoBaseProps & { defaultValue?: string; rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
        {label} {required && <span className="text-alerta-600">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className={cn(claseCampo, 'resize-none')}
      />
      {error && <p className="mt-1 text-xs text-alerta-600">{error}</p>}
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  required,
  defaultValue,
  opciones,
}: CampoBaseProps & { defaultValue?: string; opciones: { value: string; label: string }[] }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900 dark:text-white">
        {label} {required && <span className="text-alerta-600">*</span>}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} className={claseCampo}>
        {opciones.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-alerta-600">{error}</p>}
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-medium text-ink-900 dark:text-white">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-slate-300 text-seguro-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500"
      />
      {label}
    </label>
  );
}

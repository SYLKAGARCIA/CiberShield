interface SectionDividerProps {
  /** Color de relleno del divisor: debe ser una clase de texto (fill hereda de currentColor). */
  className?: string;
  flip?: boolean;
}

/**
 * Divisor angular entre secciones, usado para romper la composición
 * "todo apilado en rectángulos" del diseño anterior. Puramente
 * decorativo (aria-hidden), no afecta el flujo de datos.
 */
export function SectionDivider({ className, flip = false }: SectionDividerProps) {
  return (
    <div aria-hidden="true" className={flip ? 'rotate-180' : undefined}>
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className={`h-8 w-full md:h-12 ${className ?? 'text-surface-light dark:text-surface-dark'}`}
      >
        <path d="M0 48L1440 0V48H0Z" fill="currentColor" />
      </svg>
    </div>
  );
}

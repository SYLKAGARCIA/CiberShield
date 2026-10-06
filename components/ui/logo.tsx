import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showLabel?: boolean;
  /**
   * 'auto' (por defecto) sigue el tema claro/oscuro del sitio.
   * 'light' fuerza los colores para texto claro, para usarse sobre
   * fondos que son oscuros independientemente del tema (ej. el nuevo
   * footer, que siempre es oscuro).
   */
  variant?: 'auto' | 'light';
}

/**
 * Logo de CiberShield UTLVT: un escudo sólido en azul profundo con una
 * marca de verificación, más un pequeño indicador de estado en verde
 * (el mismo lenguaje visual de "seguridad activa" que se repite en el
 * resto de la interfaz). Dibujado a mano en SVG, sin librerías externas.
 */
export function Logo({ className, showLabel = true, variant = 'auto' }: LogoProps) {
  const esClaroForzado = variant === 'light';

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className="relative">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M15 2L26 6.4V14C26 21 20.9 26.6 15 28C9.1 26.6 4 21 4 14V6.4L15 2Z"
            className={esClaroForzado ? 'fill-primary-300' : 'fill-primary-500 dark:fill-primary-300'}
          />
          <path
            d="M10 14.6L13.2 17.8L20 10.4"
            stroke="white"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={esClaroForzado ? undefined : 'dark:stroke-ink-900'}
          />
        </svg>
        {/* Indicador de estado activo */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-seguro-500 animate-pulse-ring',
            esClaroForzado ? 'ring-2 ring-ink-900' : 'ring-2 ring-white dark:ring-surface-dark'
          )}
        />
      </div>
      {showLabel && (
        <span
          className={cn(
            'font-display text-lg font-semibold tracking-tight',
            esClaroForzado ? 'text-white' : 'text-ink-900 dark:text-white'
          )}
        >
          CiberShield{' '}
          <span
            className={cn(
              'font-mono text-sm font-medium',
              esClaroForzado ? 'text-seguro-400' : 'text-seguro-600 dark:text-seguro-400'
            )}
          >
            UTLVT
          </span>
        </span>
      )}
    </div>
  );
}

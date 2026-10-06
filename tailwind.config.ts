import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Azul Escudo" — azul profundo, color dominante de marca
        // (CiberShield UTLVT — rediseño visual)
        primary: {
          50: '#EEF3FA',
          100: '#D6E3F3',
          300: '#7DA0CE',
          500: '#123A66',
          600: '#0D2C4E',
          700: '#091F38',
        },
        // "Ámbar Alerta" — amenazas, advertencias, estados de riesgo
        //
        // AUDITORÍA WCAG (Fase 9): 500 y 600 originales daban ~2.2:1 y
        // ~3.0:1 de contraste sobre fondo blanco — muy por debajo del
        // mínimo de 4.5:1 para texto (se usan en 37 lugares como
        // "text-alerta-600" para mensajes de error de formularios). Se
        // oscureció 600 a #9C6008 (~5.1:1, verificado). 400/500 se
        // conservan para bordes, íconos e insignias con fondo tintado
        // (no texto), donde el requisito de contraste es distinto (3:1
        // sobre su fondo inmediato, no 4.5:1).
        alerta: {
          400: '#F5B34C',
          500: '#EFA028',
          600: '#9C6008',
        },
        // "Verde Escudo" — acento principal: botones, estados activos,
        // indicadores de seguridad (uso deliberado y estratégico, no decorativo)
        //
        // AUDITORÍA WCAG (Fase 9): el valor original de 500 (#1FA85C) daba
        // solo ~3.1:1 de contraste con texto blanco — insuficiente para
        // texto normal (se requiere 4.5:1 en WCAG AA). Se oscureció 500 a
        // #157A40 (~5.4:1) y 600 a #0F6B38 (~6.6:1, estado hover), ambos
        // verificados. El tono 400 original se conserva sin cambios para
        // usos decorativos (puntos de estado, insignias) donde no aplica
        // el requisito de contraste de texto.
        seguro: {
          400: '#4ADE8A',
          500: '#157A40',
          600: '#0F6B38',
        },
        // Tinta — texto y superficies oscuras (azul-gris neutro, no negro puro)
        ink: {
          700: '#3B4657',
          900: '#131C2B',
        },
        surface: {
          light: '#F7F9FB',
          dark: '#0A1220',
          'dark-elevated': '#121C2E',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(31, 168, 92, 0.45)' },
          '100%': { boxShadow: '0 0 0 8px rgba(31, 168, 92, 0)' },
        },
      },
      animation: {
        scan: 'scan 2.8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out both',
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
      backgroundImage: {
        // Rejilla de puntos sutil para paneles de seguridad / secciones hero
        'dot-grid':
          'radial-gradient(currentColor 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot-grid': '22px 22px',
      },
    },
  },
  plugins: [],
};

export default config;

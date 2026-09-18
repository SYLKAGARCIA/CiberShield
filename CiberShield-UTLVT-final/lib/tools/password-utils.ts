/**
 * Utilidades de contraseñas.
 *
 * IMPORTANTE — decisión de seguridad deliberada: TODO en este archivo
 * corre en el navegador del usuario. Ninguna contraseña generada ni
 * evaluada aquí se envía jamás al servidor, ni se guarda en la base de
 * datos, ni se registra en ningún log. Esto es intencional: pedirle a
 * un usuario que escriba una contraseña real (o una que planea usar)
 * en un formulario que viaja a un servidor sería una mala práctica de
 * seguridad, sin importar cuán bienintencionada sea la herramienta.
 */

const MAYUSCULAS = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // sin I/O para evitar confusión visual
const MINUSCULAS = 'abcdefghijkmnpqrstuvwxyz';
const NUMEROS = '23456789'; // sin 0/1 por la misma razón
const SIMBOLOS = '!@#$%^&*()_-+=?';

export interface OpcionesGenerador {
  longitud: number;
  mayusculas: boolean;
  minusculas: boolean;
  numeros: boolean;
  simbolos: boolean;
}

/**
 * Genera una contraseña con `crypto.getRandomValues` (criptográficamente
 * segura), NO con `Math.random()` (predecible, nunca debe usarse para
 * generar secretos).
 */
export function generarContrasena(opciones: OpcionesGenerador): string {
  let alfabeto = '';
  if (opciones.mayusculas) alfabeto += MAYUSCULAS;
  if (opciones.minusculas) alfabeto += MINUSCULAS;
  if (opciones.numeros) alfabeto += NUMEROS;
  if (opciones.simbolos) alfabeto += SIMBOLOS;

  if (alfabeto.length === 0) alfabeto = MINUSCULAS + NUMEROS; // fallback seguro

  const valoresAleatorios = new Uint32Array(opciones.longitud);
  crypto.getRandomValues(valoresAleatorios);

  return Array.from(valoresAleatorios, (v) => alfabeto[v % alfabeto.length]).join('');
}

export type NivelFortaleza = 'muy-debil' | 'debil' | 'media' | 'fuerte' | 'muy-fuerte';

export interface ResultadoFortaleza {
  puntaje: number; // 0-100
  nivel: NivelFortaleza;
  criterios: {
    etiqueta: string;
    cumplido: boolean;
  }[];
}

const PATRONES_COMUNES = [
  '123456',
  'password',
  'contraseña',
  'qwerty',
  'admin',
  '111111',
  '12345678',
  'abc123',
];

/**
 * Evalúa la fortaleza de una contraseña con reglas simples y
 * transparentes (no un modelo de "caja negra"): longitud, variedad de
 * caracteres, y detección de patrones obviamente débiles.
 */
export function evaluarFortaleza(password: string): ResultadoFortaleza {
  const criterios = [
    { etiqueta: 'Al menos 8 caracteres', cumplido: password.length >= 8 },
    { etiqueta: 'Al menos 12 caracteres (recomendado)', cumplido: password.length >= 12 },
    { etiqueta: 'Incluye mayúsculas', cumplido: /[A-Z]/.test(password) },
    { etiqueta: 'Incluye minúsculas', cumplido: /[a-z]/.test(password) },
    { etiqueta: 'Incluye números', cumplido: /[0-9]/.test(password) },
    { etiqueta: 'Incluye símbolos', cumplido: /[^A-Za-z0-9]/.test(password) },
    {
      etiqueta: 'No es un patrón común',
      cumplido:
        password.length > 0 &&
        !PATRONES_COMUNES.some((patron) => password.toLowerCase().includes(patron)),
    },
  ];

  if (password.length === 0) {
    return { puntaje: 0, nivel: 'muy-debil', criterios };
  }

  const cumplidos = criterios.filter((c) => c.cumplido).length;
  const puntaje = Math.round((cumplidos / criterios.length) * 100);

  let nivel: NivelFortaleza = 'muy-debil';
  if (puntaje >= 90) nivel = 'muy-fuerte';
  else if (puntaje >= 70) nivel = 'fuerte';
  else if (puntaje >= 45) nivel = 'media';
  else if (puntaje >= 20) nivel = 'debil';

  return { puntaje, nivel, criterios };
}

export const ETIQUETA_NIVEL: Record<NivelFortaleza, string> = {
  'muy-debil': 'Muy débil',
  debil: 'Débil',
  media: 'Media',
  fuerte: 'Fuerte',
  'muy-fuerte': 'Muy fuerte',
};

export const COLOR_NIVEL: Record<NivelFortaleza, string> = {
  'muy-debil': 'bg-red-500',
  debil: 'bg-alerta-500',
  media: 'bg-alerta-400',
  fuerte: 'bg-seguro-400',
  'muy-fuerte': 'bg-seguro-500',
};

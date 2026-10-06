import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { usuarioRepository } from '@/repository/usuario.repository';
import { sessionRepository } from '@/repository/session.repository';
import { SESSION_COOKIE_NAME } from '@/lib/auth-constants';

const SESSION_DURATION_RECORDARME_DIAS = 30;
const SESSION_DURATION_CORTA_DIAS = 1;

/** Roles con acceso al panel administrativo (ver Fase 6). */
export const ROLES_CON_ACCESO_ADMIN = ['ADMIN', 'EDITOR'] as const;

/**
 * Verifica email + contraseña contra la base de datos.
 * Devuelve el usuario (con su rol) si son correctos, o null.
 * El mensaje de error en la capa superior debe ser genérico
 * ("credenciales inválidas") para no revelar si el email existe.
 */
export async function verificarCredenciales(email: string, password: string) {
  const usuario = await usuarioRepository.findByEmail(email);
  if (!usuario || !usuario.active) return null;

  const passwordValida = await bcrypt.compare(password, usuario.passwordHash);
  if (!passwordValida) return null;

  return usuario;
}

/**
 * Crea una sesión en la base de datos y setea la cookie httpOnly
 * correspondiente en la respuesta actual. Debe llamarse desde un
 * Route Handler o Server Action (no desde un Server Component puro).
 */
export async function crearSesion(userId: string, recordarme = true) {
  const token = randomBytes(32).toString('hex');
  const dias = recordarme ? SESSION_DURATION_RECORDARME_DIAS : SESSION_DURATION_CORTA_DIAS;
  const expiresAt = new Date(Date.now() + dias * 24 * 60 * 60 * 1000);

  await sessionRepository.create(userId, token, expiresAt);

  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });
}

/**
 * Lee la cookie de sesión actual y devuelve el usuario autenticado
 * (con su rol), o null si no hay sesión válida. Elimina
 * automáticamente las sesiones expiradas que encuentra.
 */
export async function obtenerSesionActual() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const sesion = await sessionRepository.findByToken(token);
  if (!sesion) return null;

  if (sesion.expiresAt < new Date()) {
    await sessionRepository.deleteByToken(token);
    return null;
  }

  return sesion.user;
}

/** Cierra la sesión actual: la borra de la base de datos y limpia la cookie. */
export async function cerrarSesion() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await sessionRepository.deleteByToken(token);
  }
  cookies().delete(SESSION_COOKIE_NAME);
}

export function tieneAccesoAdmin(rolNombre: string | undefined): boolean {
  return !!rolNombre && (ROLES_CON_ACCESO_ADMIN as readonly string[]).includes(rolNombre);
}

/**
 * Guard para usar al inicio de TODA Server Action del panel
 * administrativo. Las Server Actions son endpoints de red por sí
 * mismas — se pueden invocar directamente aunque la página que las usa
 * esté protegida por `app/admin/layout.tsx`. Por eso cada acción debe
 * volver a verificar la sesión, no asumir que "si llegó hasta acá es
 * porque el layout ya lo dejó pasar".
 */
export async function requerirSesionAdmin() {
  const usuario = await obtenerSesionActual();
  if (!usuario || !tieneAccesoAdmin(usuario.role.name)) {
    throw new Error('No autorizado: se requiere sesión con rol ADMIN o EDITOR.');
  }
  return usuario;
}

/** Como `requerirSesionAdmin`, pero exige específicamente el rol ADMIN
 * (para acciones sensibles como gestionar usuarios). */
export async function requerirSesionSuperAdmin() {
  const usuario = await obtenerSesionActual();
  if (!usuario || usuario.role.name !== 'ADMIN') {
    throw new Error('No autorizado: se requiere rol ADMIN.');
  }
  return usuario;
}

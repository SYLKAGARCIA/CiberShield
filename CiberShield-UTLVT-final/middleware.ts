import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/auth-constants';

/**
 * Protección de rutas /admin/* — primera capa (rápida, corre en el Edge).
 *
 * IMPORTANTE: el middleware solo puede comprobar que exista la cookie
 * de sesión; no puede consultar Prisma/SQLite desde el runtime de Edge.
 * Por eso esto es una primera barrera para redirigir de inmediato a
 * quien no tiene cookie alguna. La verificación real (¿el token sigue
 * siendo válido en la base de datos? ¿el rol tiene permiso?) ocurre en
 * `app/admin/layout.tsx`, que sí corre en Node.js y consulta la DB.
 * Esta doble capa es defensa en profundidad, no redundancia innecesaria.
 */
export function middleware(request: NextRequest) {
  const tieneCookieSesion = request.cookies.has(SESSION_COOKIE_NAME);

  if (!tieneCookieSesion) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

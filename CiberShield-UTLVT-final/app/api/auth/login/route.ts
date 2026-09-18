import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/login.schema';
import { verificarCredenciales, crearSesion, tieneAccesoAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  const body = await request.json();
  const resultado = loginSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: resultado.error.flatten() },
      { status: 400 }
    );
  }

  const usuario = await verificarCredenciales(resultado.data.email, resultado.data.password);

  // Mensaje genérico deliberado: no revela si el email existe o si
  // fue la contraseña la que falló, para dificultar la enumeración
  // de cuentas.
  if (!usuario) {
    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
  }

  await crearSesion(usuario.id, resultado.data.recordarme);

  return NextResponse.json({
    ok: true,
    redirectTo: tieneAccesoAdmin(usuario.role.name) ? '/admin' : '/evaluaciones',
    usuario: { name: usuario.name, rol: usuario.role.name },
  });
}

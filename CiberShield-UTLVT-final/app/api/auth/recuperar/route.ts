import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { recuperarPasswordSchema } from '@/lib/validations/recuperar-password.schema';
import { usuarioRepository } from '@/repository/usuario.repository';
import { enviarCorreoRecuperacion } from '@/lib/email';

const TOKEN_DURACION_MS = 60 * 60 * 1000; // 1 hora

export async function POST(request: Request) {
  const body = await request.json();
  const resultado = recuperarPasswordSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: resultado.error.flatten() },
      { status: 400 },
    );
  }

  const { email } = resultado.data;
  const usuario = await usuarioRepository.findByEmail(email);

  // Respuesta idéntica exista o no la cuenta: evita que alguien use
  // este formulario para averiguar qué correos están registrados.
  const respuestaGenerica = NextResponse.json({
    ok: true,
    mensaje: 'Si ese correo tiene una cuenta, te enviamos un enlace para restablecer la contraseña.',
  });

  if (!usuario || !usuario.active) {
    return respuestaGenerica;
  }

  const token = randomBytes(32).toString('hex');
  const expira = new Date(Date.now() + TOKEN_DURACION_MS);
  await usuarioRepository.guardarTokenReset(usuario.id, token, expira);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const enlace = `${siteUrl}/restablecer-password/${token}`;

  try {
    await enviarCorreoRecuperacion(usuario.email, enlace);
  } catch (error) {
    console.error('Error enviando correo de recuperación:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'No se pudo enviar el correo. Intenta de nuevo más tarde.',
      },
      { status: 502 },
    );
  }

  return respuestaGenerica;
}

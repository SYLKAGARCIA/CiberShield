import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { restablecerPasswordSchema } from '@/lib/validations/restablecer-password.schema';
import { usuarioRepository } from '@/repository/usuario.repository';

export async function POST(request: Request) {
  const body = await request.json();
  const resultado = restablecerPasswordSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: resultado.error.flatten() },
      { status: 400 },
    );
  }

  const { token, password } = resultado.data;
  const usuario = await usuarioRepository.findByResetToken(token);

  if (!usuario || !usuario.resetTokenExpires || usuario.resetTokenExpires < new Date()) {
    return NextResponse.json(
      { error: 'El enlace no es válido o ya expiró. Solicita uno nuevo.' },
      { status: 400 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await usuarioRepository.restablecerPassword(usuario.id, passwordHash);

  return NextResponse.json({ ok: true });
}

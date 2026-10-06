import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { registroSchema } from '@/lib/validations/registro.schema';
import { usuarioRepository } from '@/repository/usuario.repository';
import { roleRepository } from '@/repository/role.repository';
import { crearSesion } from '@/lib/auth';

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  const body = await request.json();
  const resultado = registroSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: resultado.error.flatten() },
      { status: 400 }
    );
  }

  const existente = await usuarioRepository.findByEmail(resultado.data.email);
  if (existente) {
    return NextResponse.json(
      { error: 'Ya existe una cuenta con ese correo electrónico.' },
      { status: 409 }
    );
  }

  const roles = await roleRepository.findAll();
  const rolEstudiante = roles.find((r) => r.name === 'ESTUDIANTE');
  if (!rolEstudiante) {
    // No debería pasar nunca (el rol se siembra en la Fase 2), pero si
    // faltara, es mejor un error explícito que uno críptico de Prisma.
    return NextResponse.json(
      { error: 'No se pudo completar el registro. Contacta al administrador.' },
      { status: 500 }
    );
  }

  const passwordHash = await bcrypt.hash(resultado.data.password, SALT_ROUNDS);

  const usuario = await usuarioRepository.create({
    name: resultado.data.name,
    email: resultado.data.email,
    passwordHash,
    role: { connect: { id: rolEstudiante.id } },
  });

  await crearSesion(usuario.id);

  return NextResponse.json({ ok: true, redirectTo: '/evaluaciones' });
}

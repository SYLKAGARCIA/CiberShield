import { NextResponse } from 'next/server';
import { contactoSchema } from '@/lib/validations/contacto.schema';

/**
 * NOTA IMPORTANTE: este endpoint valida el mensaje y lo registra en el
 * log del servidor, pero **todavía no envía un correo real**. Falta
 * configurar un proveedor de email (ej. Resend, Nodemailer + SMTP) y su
 * respectiva variable de entorno. Se documenta como pendiente explícito
 * en docs/04-FASE-4.md — no se debe asumir que el mensaje llega a
 * ningún lado hasta que eso se implemente.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const resultado = contactoSchema.safeParse(body);

  if (!resultado.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: resultado.error.flatten() },
      { status: 400 }
    );
  }

  // TODO (pendiente, ver docs/04-FASE-4.md): enviar el correo real aquí
  // una vez configurado un proveedor de email.
  console.log('📩 Nuevo mensaje de contacto (aún no se envía por email):', resultado.data);

  return NextResponse.json({ ok: true });
}

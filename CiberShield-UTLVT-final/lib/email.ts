import nodemailer from 'nodemailer';

/**
 * Envía el correo de recuperación de contraseña usando tu propia
 * cuenta de Gmail como remitente (vía SMTP), con una "contraseña de
 * aplicación" de Google — no tu contraseña normal.
 *
 * Ventaja frente a servicios como Resend: es gratis y envía a
 * CUALQUIER correo real (no solo al tuyo), porque el remitente es tu
 * propia cuenta verificada por Google, no un dominio nuevo que haya
 * que verificar.
 *
 * Límite de Gmail: ~500 correos/día en una cuenta normal — de sobra
 * para un proyecto de tesis.
 */
export async function enviarCorreoRecuperacion(email: string, enlace: string) {
  const smtpUser = process.env.SMTP_USER;
  const smtpAppPassword = process.env.SMTP_APP_PASSWORD;

  if (!smtpUser || !smtpAppPassword) {
    throw new Error(
      'El envío de correos todavía no está configurado. Agrega SMTP_USER y SMTP_APP_PASSWORD en el archivo .env.',
    );
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: smtpUser, pass: smtpAppPassword },
  });

  await transporter.sendMail({
    from: `CiberShield UTLVT <${smtpUser}>`,
    to: email,
    subject: 'Recupera tu contraseña — CiberShield UTLVT',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color:#0f172a;">Recupera tu contraseña</h2>
        <p style="color:#334155;">
          Recibimos una solicitud para restablecer la contraseña de tu cuenta en
          CiberShield UTLVT. Si no fuiste tú, puedes ignorar este correo.
        </p>
        <p style="text-align:center; margin: 32px 0;">
          <a href="${enlace}"
             style="background:#16a34a; color:#fff; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:600;">
            Restablecer contraseña
          </a>
        </p>
        <p style="color:#64748b; font-size:13px;">
          Este enlace expira en 1 hora. Si el botón no funciona, copia y pega este
          enlace en tu navegador:<br />${enlace}
        </p>
      </div>
    `,
  });
}

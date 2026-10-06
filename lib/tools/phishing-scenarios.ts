export interface EscenarioPhishing {
  id: string;
  remitente: string;
  asunto: string;
  cuerpo: string;
  esPhishing: boolean;
  explicacion: string;
}

/**
 * Ejemplos educativos. Ninguno es un caso real ni imita una marca
 * específica de forma que pueda confundirse con contenido auténtico
 * fuera de este contexto de práctica.
 */
export const ESCENARIOS_PHISHING: EscenarioPhishing[] = [
  {
    id: 'urgencia-cuenta',
    remitente: 'soporte@campus-verificacion.net',
    asunto: 'Tu cuenta será suspendida en 24 horas',
    cuerpo:
      'Hemos detectado actividad inusual. Para evitar la suspensión de tu cuenta, verifica tus datos ahora haciendo clic en el siguiente enlace y confirmando tu contraseña actual.',
    esPhishing: true,
    explicacion:
      'Genera urgencia artificial, usa un dominio que imita a "campus" pero no es el oficial, y pide la contraseña directamente — ninguna institución seria hace esto por correo.',
  },
  {
    id: 'recordatorio-legitimo',
    remitente: 'no-responder@universidad.edu',
    asunto: 'Recordatorio: mantenimiento programado del sistema',
    cuerpo:
      'El sistema de biblioteca estará en mantenimiento el sábado de 2:00 a 4:00 AM. No se requiere ninguna acción de tu parte. Para dudas, contacta a la mesa de ayuda desde el portal oficial.',
    esPhishing: false,
    explicacion:
      'No pide ninguna acción urgente, no solicita credenciales, y remite a contactar por un canal oficial ya conocido, no por un enlace del propio correo.',
  },
  {
    id: 'premio-sospechoso',
    remitente: 'premios@sorteo-universitario.com',
    asunto: '¡Felicidades! Ganaste una beca completa',
    cuerpo:
      'Fuiste seleccionado al azar para una beca de $5000. Para reclamarla, completa el formulario adjunto con tu nombre completo, número de identificación y datos bancarios en las próximas 12 horas.',
    esPhishing: true,
    explicacion:
      'Un premio que no solicitaste, presión de tiempo, y pide directamente datos bancarios: tres señales clásicas de phishing/estafa.',
  },
  {
    id: 'notificacion-calificacion',
    remitente: 'plataforma@aula-virtual.universidad.edu',
    asunto: 'Nueva calificación publicada en Cálculo II',
    cuerpo:
      'Tu profesor publicó una nueva calificación. Inicia sesión en la plataforma del aula virtual como de costumbre para consultarla.',
    esPhishing: false,
    explicacion:
      'Te indica entrar "como de costumbre" (es decir, escribiendo tú la dirección conocida) en vez de darte un enlace directo para ingresar credenciales — un patrón mucho más seguro.',
  },
  {
    id: 'factura-adjunta',
    remitente: 'facturacion@servicio-cloud-pago.info',
    asunto: 'Factura pendiente — abre el archivo adjunto',
    cuerpo:
      'Tienes una factura pendiente de pago. Descarga y abre el archivo adjunto (Factura_2447.zip) para ver el detalle y evitar cargos adicionales.',
    esPhishing: true,
    explicacion:
      'Un archivo .zip inesperado de un remitente con dominio genérico ".info" es una táctica común para distribuir malware. Nunca abras adjuntos que no esperabas.',
  },
] as const;

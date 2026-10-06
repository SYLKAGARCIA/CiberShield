/**
 * Contenido educativo complementario de cada módulo.
 * Un módulo es una Categoria de la base de datos; aquí se añade lo que
 * la tabla no guarda (objetivos, ejemplos, consejos, mini actividad).
 * Si el administrador crea una categoría nueva sin entrada aquí, el
 * módulo se muestra igual usando `MODULO_POR_DEFECTO`.
 */
export interface Actividad {
  pregunta: string;
  opciones: string[];
  correcta: number;
  explicacion: string;
}

export interface ModuloExtra {
  orden: number;
  introduccion: string;
  objetivos: string[];
  ejemplos: string[];
  consejos: string[];
  mitos: { mito: string; realidad: string }[];
  actividad: Actividad;
}

export const MODULO_POR_DEFECTO: ModuloExtra = {
  orden: 99,
  introduccion: 'Explora este módulo para conocer los riesgos y las buenas prácticas relacionadas con este tema.',
  objetivos: ['Comprender los conceptos básicos del tema.', 'Reconocer situaciones de riesgo.', 'Aplicar medidas de protección en tu vida diaria.'],
  ejemplos: [],
  consejos: ['Desconfía de lo inesperado.', 'Verifica antes de compartir información.', 'Mantén tus dispositivos actualizados.'],
  mitos: [],
  actividad: {
    pregunta: 'Antes de compartir información personal en línea, ¿qué es lo más seguro?',
    opciones: ['Hacerlo rápido para no perder la oportunidad', 'Verificar quién la solicita y por qué', 'Compartirla si me lo piden con amabilidad'],
    correcta: 1,
    explicacion: 'Verificar quién solicita la información y con qué fin es siempre el primer paso para protegerte.',
  },
};

export const MODULOS_EXTRA: Record<string, ModuloExtra> = {
  'ingenieria-social': {
    orden: 1,
    introduccion: 'Los atacantes no siempre necesitan "hackear" un sistema: muchas veces les basta con convencerte. Este módulo te enseña a reconocer la manipulación psicológica.',
    objetivos: ['Definir qué es la ingeniería social.', 'Identificar las emociones que suelen explotar (miedo, urgencia, confianza).', 'Responder con seguridad ante pedidos sospechosos.'],
    ejemplos: ['Una llamada de "soporte técnico" que te pide tu contraseña.', 'Un mensaje de un "compañero" que necesita dinero urgente.', 'Alguien que te pide el código de verificación que llegó a tu teléfono.'],
    consejos: ['Verifica la identidad por otro canal.', 'Nadie legítimo te pedirá tu contraseña.', 'Si hay mucha prisa, detente y piensa.'],
    mitos: [
      { mito: 'Solo caen personas poco inteligentes.', realidad: 'Cualquiera puede ser engañado; los ataques están diseñados para explotar emociones, no falta de conocimiento.' },
      { mito: 'Si conocen mi nombre, es alguien de confianza.', realidad: 'Los datos básicos son fáciles de conseguir en redes sociales.' },
    ],
    actividad: {
      pregunta: 'Recibes una llamada de alguien que dice ser de "sistemas" y te pide tu contraseña para "evitar el bloqueo de tu cuenta". ¿Qué haces?',
      opciones: ['Se la doy, parece urgente', 'Cuelgo y contacto al área de TI por el canal oficial', 'Le doy solo la mitad de la clave'],
      correcta: 1,
      explicacion: 'Ninguna área legítima te pedirá tu contraseña. Cuelga y verifica por el canal oficial.',
    },
  },
  phishing: {
    orden: 2,
    introduccion: 'El phishing y los fraudes digitales buscan que entregues tus datos creyendo que hablas con una entidad confiable. Aprenderás a detectarlos en correos, mensajes, llamadas y enlaces.',
    objetivos: ['Diferenciar phishing, smishing, vishing y quishing.', 'Detectar señales de alerta en mensajes y enlaces.', 'Saber cómo reportar y actuar si caes.'],
    ejemplos: ['Un correo que dice que tu cuenta será bloqueada si no haces clic.', 'Un SMS sobre un paquete retenido con un enlace corto.', 'Un QR en un cartel que pide iniciar sesión.'],
    consejos: ['No hagas clic en enlaces inesperados.', 'Escribe tú mismo la dirección oficial.', 'Activa la verificación en dos pasos.'],
    mitos: [
      { mito: 'Si tiene el logo oficial, es real.', realidad: 'Los logos se copian fácilmente; revisa el remitente y el enlace.' },
      { mito: 'El candado del navegador significa que la página es confiable.', realidad: 'Indica conexión cifrada, no que el sitio sea legítimo.' },
    ],
    actividad: {
      pregunta: 'Recibes un mensaje urgente indicando que tu cuenta será bloqueada y contiene un enlace. ¿Qué harías?',
      opciones: ['Hacer clic para evitar el bloqueo', 'Ignorar el enlace y entrar a la cuenta desde la página oficial', 'Reenviarlo a mis amigos para avisarles'],
      correcta: 1,
      explicacion: 'Lo seguro es no usar el enlace y entrar por la dirección oficial que tú escribes.',
    },
  },
  malware: {
    orden: 3,
    introduccion: 'El malware es software diseñado para dañar, espiar o secuestrar tus dispositivos. Conocerás sus tipos y cómo prevenir infecciones con hábitos simples.',
    objetivos: ['Reconocer tipos de malware (ransomware, troyanos, spyware).', 'Identificar cómo llega a un dispositivo.', 'Aplicar medidas de prevención y respaldo.'],
    ejemplos: ['Un programa "gratis" descargado de un sitio no oficial.', 'Un adjunto de "factura" que cifra tus archivos.', 'Una app que pide permisos que no necesita.'],
    consejos: ['Descarga solo de fuentes oficiales.', 'Haz copias de seguridad.', 'Mantén antivirus y sistema actualizados.'],
    mitos: [
      { mito: 'Los celulares no se infectan.', realidad: 'Los móviles también pueden infectarse, sobre todo con apps de fuentes no oficiales.' },
      { mito: 'Si no noto nada raro, no tengo malware.', realidad: 'Mucho malware trabaja en silencio.' },
    ],
    actividad: {
      pregunta: 'Un archivo adjunto de un remitente desconocido dice ser una "factura pendiente". ¿Qué haces?',
      opciones: ['Lo abro para revisar', 'No lo abro y elimino el correo', 'Lo descargo y lo abro en otro equipo'],
      correcta: 1,
      explicacion: 'Los adjuntos inesperados son una vía común de malware. Lo seguro es no abrirlos.',
    },
  },
  contrasenas: {
    orden: 4,
    introduccion: 'Tus contraseñas son la llave de tu vida digital. Aprenderás a crearlas, protegerlas y a reforzarlas con autenticación multifactor.',
    objetivos: ['Crear contraseñas largas y únicas.', 'Entender por qué no se deben reutilizar.', 'Activar la autenticación multifactor.'],
    ejemplos: ['Usar la misma clave en correo, redes y banco.', 'Contraseñas como "123456" o la fecha de nacimiento.', 'Compartir la clave con un amigo "de confianza".'],
    consejos: ['Mejor una frase larga que una palabra compleja.', 'Una contraseña distinta por cuenta.', 'Activa la verificación en dos pasos.'],
    mitos: [
      { mito: 'Cambiar la contraseña cada semana me hace más seguro.', realidad: 'Importa más que sea larga y única; cámbiala si hay sospecha de filtración.' },
      { mito: 'Con mayúsculas y símbolos ya es segura.', realidad: 'La longitud pesa más que la complejidad aparente.' },
    ],
    actividad: {
      pregunta: '¿Cuál de estas opciones es la mejor práctica para tus contraseñas?',
      opciones: ['Usar la misma clave en todas las cuentas', 'Una frase larga y distinta para cada cuenta', 'Guardarlas en una nota sin protección'],
      correcta: 1,
      explicacion: 'Las contraseñas largas y únicas, idealmente con un gestor, limitan el daño si una se filtra.',
    },
  },
  'privacidad-datos': {
    orden: 5,
    introduccion: 'Todo lo que publicas y compartes deja huella. Este módulo te ayuda a proteger tus datos personales y a decidir qué mostrar en línea.',
    objetivos: ['Reconocer qué datos personales son sensibles.', 'Configurar la privacidad de tus cuentas.', 'Reducir tu exposición en línea.'],
    ejemplos: ['Publicar tu ubicación en tiempo real.', 'Compartir fotos de documentos o tarjetas.', 'Aceptar permisos de apps sin leerlos.'],
    consejos: ['Piensa antes de publicar: ¿quién podría verlo?', 'Revisa los permisos de tus apps.', 'Configura tus perfiles como privados.'],
    mitos: [
      { mito: 'Si lo borro, desaparece para siempre.', realidad: 'Otros pueden haberlo guardado o copiado antes de que lo borres.' },
      { mito: 'No tengo nada que ocultar.', realidad: 'Tus datos tienen valor para estafadores aunque tú no lo notes.' },
    ],
    actividad: {
      pregunta: 'Vas a publicar una foto de tu viaje. ¿Qué es lo más prudente?',
      opciones: ['Publicarla con la ubicación exacta y fechas', 'Publicarla después del viaje y sin datos sensibles', 'Dejar el perfil público para más alcance'],
      correcta: 1,
      explicacion: 'Publicar después y sin ubicación exacta reduce riesgos como robos o seguimiento.',
    },
  },
  'redes-sociales': {
    orden: 6,
    introduccion: 'Las redes sociales son útiles, pero también un terreno de estafas y exposición. Aprenderás a usarlas con criterio.',
    objetivos: ['Detectar perfiles y ofertas falsas.', 'Configurar privacidad en tus redes.', 'Cuidar tu reputación digital.'],
    ejemplos: ['Un sorteo que pide tus datos y que compartas la publicación.', 'Un perfil nuevo que te pide dinero.', 'Una tienda con precios irreales.'],
    consejos: ['Acepta solo a personas que conoces.', 'Desconfía de ofertas demasiado buenas.', 'Revisa quién ve tus publicaciones.'],
    mitos: [
      { mito: 'Si lo comparte un amigo, es seguro.', realidad: 'La cuenta de tu amigo pudo ser hackeada.' },
    ],
    actividad: {
      pregunta: 'Un perfil desconocido te ofrece un celular a mitad de precio y pide pago por adelantado. ¿Qué haces?',
      opciones: ['Pago rápido antes de que se acabe', 'Desconfío y no pago por adelantado', 'Pido más fotos y luego pago'],
      correcta: 1,
      explicacion: 'Los precios irreales y el pago por adelantado son señales clásicas de estafa.',
    },
  },
  'redes-wifi': {
    orden: 7,
    introduccion: 'Dispositivos, aplicaciones y redes forman parte de tu vida diaria. Aprende a usarlos con seguridad: Wi-Fi público, actualizaciones y navegación segura.',
    objetivos: ['Identificar redes Wi-Fi riesgosas.', 'Mantener tus dispositivos actualizados.', 'Navegar y descargar apps de forma segura.'],
    ejemplos: ['Conectarte a una red abierta con nombre similar al de un local.', 'Posponer indefinidamente las actualizaciones.', 'Instalar apps desde enlaces enviados por mensaje.'],
    consejos: ['Evita operaciones bancarias en Wi-Fi público.', 'Activa las actualizaciones automáticas.', 'Bloquea tu dispositivo con PIN o biometría.'],
    mitos: [
      { mito: 'Una red Wi-Fi con nombre de la universidad siempre es la oficial.', realidad: 'Cualquiera puede crear una red con un nombre parecido.' },
    ],
    actividad: {
      pregunta: 'Estás en una cafetería y necesitas revisar tu banco. ¿Qué es lo más seguro?',
      opciones: ['Conectarme al Wi-Fi gratuito', 'Usar mis datos móviles', 'Pedir a un desconocido su hotspot'],
      correcta: 1,
      explicacion: 'Tus datos móviles son más seguros que una red abierta para operaciones sensibles.',
    },
  },
};

export function obtenerExtra(slug: string): ModuloExtra {
  return MODULOS_EXTRA[slug] ?? MODULO_POR_DEFECTO;
}

/** Ordena categorías como módulos: primero las conocidas por su orden, luego el resto por nombre. */
export function ordenarModulos<T extends { slug: string; nombre: string }>(categorias: T[]): T[] {
  return [...categorias].sort((a, b) => {
    const oa = obtenerExtra(a.slug).orden;
    const ob = obtenerExtra(b.slug).orden;
    return oa !== ob ? oa - ob : a.nombre.localeCompare(b.nombre);
  });
}

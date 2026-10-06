/**
 * Una evaluación por cada una de las 7 categorías de amenazas, con
 * preguntas que cubren los subtemas de los artículos ya sembrados
 * (guías completas + los 20 artículos cortos por categoría).
 *
 * Se importa y se siembra desde seed.ts (ver seedEvaluacionesCategorias).
 */

export interface PreguntaSeed {
  enunciado: string;
  opciones: { texto: string; esCorrecta: boolean }[];
}

export interface EvaluacionCategoriaSeed {
  id: string;
  titulo: string;
  descripcion: string;
  preguntas: PreguntaSeed[];
}

export const EVALUACIONES_CATEGORIAS: EvaluacionCategoriaSeed[] = [
  {
    id: 'evaluacion-contrasenas',
    titulo: 'Contraseñas seguras',
    descripcion: 'Pon a prueba lo que aprendiste sobre cómo crear, guardar y proteger tus contraseñas.',
    preguntas: [
      {
        enunciado: '¿Qué hace más segura a una contraseña, según las buenas prácticas actuales?',
        opciones: [
          { texto: 'Usar símbolos raros aunque sea muy corta', esCorrecta: false },
          { texto: 'Que sea larga, por ejemplo una frase de varias palabras sin relación', esCorrecta: true },
          { texto: 'Cambiarla todos los días sin importar el largo', esCorrecta: false },
          { texto: 'Usar tu fecha de nacimiento con un símbolo al final', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué es riesgoso reutilizar la misma contraseña en varios sitios?',
        opciones: [
          { texto: 'No es riesgoso si la contraseña es larga', esCorrecta: false },
          { texto: 'Porque si un sitio es filtrado, esa contraseña se puede probar en tus otras cuentas', esCorrecta: true },
          { texto: 'Porque los sitios la comparten oficialmente entre sí', esCorrecta: false },
          { texto: 'Porque hace que tu dispositivo funcione más lento', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Para qué sirve un gestor de contraseñas?',
        opciones: [
          { texto: 'Para generar y guardar una contraseña única y fuerte por cada sitio', esCorrecta: true },
          { texto: 'Para compartir tus contraseñas con tus contactos de forma segura', esCorrecta: false },
          { texto: 'Para acelerar la conexión a internet', esCorrecta: false },
          { texto: 'Para eliminar la necesidad de usar contraseñas por completo', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es la autenticación de dos factores (2FA)?',
        opciones: [
          { texto: 'Escribir la contraseña dos veces al iniciar sesión', esCorrecta: false },
          { texto: 'Una verificación adicional (código, app o llave) además de la contraseña', esCorrecta: true },
          { texto: 'Tener dos contraseñas distintas para la misma cuenta', esCorrecta: false },
          { texto: 'Un tipo de contraseña más larga de lo normal', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "credential stuffing"?',
        opciones: [
          { texto: 'Un tipo de contraseña muy segura', esCorrecta: false },
          { texto: 'Probar automáticamente contraseñas filtradas de otros sitios en tus cuentas', esCorrecta: true },
          { texto: 'Una técnica para crear contraseñas más largas', esCorrecta: false },
          { texto: 'Un método legítimo de recuperación de cuentas', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cómo puedes revisar si tu correo apareció en una filtración de datos conocida?',
        opciones: [
          { texto: 'No es posible saberlo nunca', esCorrecta: false },
          { texto: 'Usando un servicio como Have I Been Pwned (haveibeenpwned.com)', esCorrecta: true },
          { texto: 'Preguntándole directamente al sitio filtrado por teléfono', esCorrecta: false },
          { texto: 'Cambiando el nombre de usuario de tu correo', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué son las "passkeys"?',
        opciones: [
          { texto: 'Contraseñas temporales que expiran en un minuto', esCorrecta: false },
          { texto: 'Una tecnología que reemplaza la contraseña por una llave desbloqueada con huella o rostro', esCorrecta: true },
          { texto: 'Un tipo de virus informático', esCorrecta: false },
          { texto: 'Contraseñas compartidas entre varios usuarios', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué las preguntas de seguridad tradicionales ("nombre de tu mascota") pueden ser débiles?',
        opciones: [
          { texto: 'Porque son demasiado largas de responder', esCorrecta: false },
          { texto: 'Porque la respuesta a veces está disponible públicamente en tus redes sociales', esCorrecta: true },
          { texto: 'Porque cambian automáticamente cada mes', esCorrecta: false },
          { texto: 'No tienen ninguna debilidad real', esCorrecta: false },
        ],
      },
    ],
  },
  {
    id: 'evaluacion-ingenieria-social',
    titulo: 'Ingeniería social',
    descripcion: 'Evalúa tu capacidad para reconocer intentos de manipulación psicológica y engaño.',
    preguntas: [
      {
        enunciado: '¿Qué es la ingeniería social?',
        opciones: [
          { texto: 'Un tipo de virus informático', esCorrecta: false },
          { texto: 'La manipulación psicológica de una persona para obtener información o acceso', esCorrecta: true },
          { texto: 'Una red social especializada en temas de ingeniería', esCorrecta: false },
          { texto: 'Un método de cifrado de datos', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "pretexting"?',
        opciones: [
          { texto: 'Enviar un mensaje de texto antes de una llamada', esCorrecta: false },
          { texto: 'Inventar una identidad o situación falsa creíble para ganar confianza', esCorrecta: true },
          { texto: 'Escribir un correo con errores ortográficos a propósito', esCorrecta: false },
          { texto: 'Un tipo de contraseña temporal', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "vishing"?',
        opciones: [
          { texto: 'Phishing realizado por llamada telefónica', esCorrecta: true },
          { texto: 'Un virus que se propaga por video', esCorrecta: false },
          { texto: 'Un tipo de contraseña visual', esCorrecta: false },
          { texto: 'Phishing exclusivo de videojuegos', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "baiting" en ingeniería social?',
        opciones: [
          { texto: 'Ofrecer algo tentador (USB, descarga) para que la víctima lo ejecute por curiosidad', esCorrecta: true },
          { texto: 'Un tipo de contraseña con carnada visual', esCorrecta: false },
          { texto: 'Pescar información solo por redes sociales', esCorrecta: false },
          { texto: 'Un método oficial de verificación de identidad', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál es la señal de alerta más común en un intento de ingeniería social?',
        opciones: [
          { texto: 'Un mensaje que llega en horario de oficina', esCorrecta: false },
          { texto: 'Crear una sensación artificial de urgencia para que actúes sin pensar', esCorrecta: true },
          { texto: 'Que el mensaje esté bien escrito', esCorrecta: false },
          { texto: 'Que venga de un número conocido', esCorrecta: false },
        ],
      },
      {
        enunciado: 'Un "amigo" te escribe pidiéndote dinero urgente por redes sociales. ¿Qué deberías hacer primero?',
        opciones: [
          { texto: 'Transferir el dinero de inmediato para ayudar', esCorrecta: false },
          { texto: 'Verificar por otro canal (llamada) si realmente es esa persona antes de actuar', esCorrecta: true },
          { texto: 'Ignorar el mensaje sin más', esCorrecta: false },
          { texto: 'Pedirle que lo confirme por el mismo chat', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "tailgating"?',
        opciones: [
          { texto: 'Seguir de cerca a alguien autorizado para colarse en un área restringida', esCorrecta: true },
          { texto: 'Un tipo de ataque exclusivo a automóviles', esCorrecta: false },
          { texto: 'Enviar correos en cadena', esCorrecta: false },
          { texto: 'Un método de cifrado de archivos', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué los estudiantes de primer semestre son un blanco frecuente de ingeniería social?',
        opciones: [
          { texto: 'Porque tienen más dinero que otros estudiantes', esCorrecta: false },
          { texto: 'Porque aún no conocen bien los canales oficiales de comunicación de la institución', esCorrecta: true },
          { texto: 'Porque usan contraseñas más largas', esCorrecta: false },
          { texto: 'No son un blanco más frecuente que otros', esCorrecta: false },
        ],
      },
    ],
  },
  {
    id: 'evaluacion-malware',
    titulo: 'Malware',
    descripcion: 'Comprueba qué tanto sabes sobre virus, troyanos, ransomware y cómo protegerte.',
    preguntas: [
      {
        enunciado: '¿Qué hace el ransomware?',
        opciones: [
          { texto: 'Cifra tus archivos y exige un pago para supuestamente liberarlos', esCorrecta: true },
          { texto: 'Acelera el funcionamiento de tu equipo', esCorrecta: false },
          { texto: 'Solo muestra publicidad no deseada', esCorrecta: false },
          { texto: 'Es un tipo de antivirus gratuito', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál es la diferencia principal entre un virus y un troyano?',
        opciones: [
          { texto: 'No hay ninguna diferencia real', esCorrecta: false },
          { texto: 'El virus se adjunta a archivos y se replica; el troyano se disfraza de programa legítimo', esCorrecta: true },
          { texto: 'El troyano solo afecta a celulares', esCorrecta: false },
          { texto: 'El virus es inofensivo y el troyano no', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué hace el spyware?',
        opciones: [
          { texto: 'Mejora la velocidad de tu navegador', esCorrecta: false },
          { texto: 'Recopila tu actividad e información sin tu conocimiento', esCorrecta: true },
          { texto: 'Bloquea anuncios automáticamente', esCorrecta: false },
          { texto: 'Es una función oficial del sistema operativo', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál de estas es una señal de que tu equipo podría estar infectado?',
        opciones: [
          { texto: 'Lentitud repentina e inexplicable y ventanas emergentes constantes', esCorrecta: true },
          { texto: 'Que el equipo esté apagado', esCorrecta: false },
          { texto: 'Que recibas correos de tus contactos habituales', esCorrecta: false },
          { texto: 'Que el navegador pida actualizarse', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál es la mejor defensa real contra el ransomware?',
        opciones: [
          { texto: 'Pagar el rescate inmediatamente', esCorrecta: false },
          { texto: 'Tener copias de seguridad periódicas y desconectadas de tus archivos', esCorrecta: true },
          { texto: 'Desinstalar el antivirus', esCorrecta: false },
          { texto: 'Cambiar el nombre de usuario del equipo', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "cryptojacking"?',
        opciones: [
          { texto: 'Un método legítimo de invertir en criptomonedas', esCorrecta: false },
          { texto: 'Usar el procesador de tu equipo sin permiso para minar criptomonedas', esCorrecta: true },
          { texto: 'Un tipo de contraseña cifrada', esCorrecta: false },
          { texto: 'Un antivirus especializado en criptomonedas', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué las descargas de software pirata o "cracks" son riesgosas?',
        opciones: [
          { texto: 'No hay forma de verificar qué se modificó realmente en ese archivo antes de ejecutarlo', esCorrecta: true },
          { texto: 'Son más lentas de descargar', esCorrecta: false },
          { texto: 'En realidad no representan ningún riesgo', esCorrecta: false },
          { texto: 'Solo afectan a computadoras muy antiguas', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué mantener el software actualizado se considera una medida de seguridad?',
        opciones: [
          { texto: 'Porque las actualizaciones corrigen vulnerabilidades que el malware puede explotar', esCorrecta: true },
          { texto: 'Solo agregan funciones estéticas nuevas', esCorrecta: false },
          { texto: 'No tiene relación con la seguridad', esCorrecta: false },
          { texto: 'Hacen que el antivirus ya no sea necesario', esCorrecta: false },
        ],
      },
    ],
  },
  {
    id: 'evaluacion-phishing',
    titulo: 'Phishing',
    descripcion: 'Repasa cómo identificar y responder ante distintos tipos de intentos de phishing.',
    preguntas: [
      {
        enunciado: '¿Qué es el phishing?',
        opciones: [
          { texto: 'Un tipo de videojuego en línea', esCorrecta: false },
          { texto: 'Un engaño que se hace pasar por una entidad confiable para robar información', esCorrecta: true },
          { texto: 'Un método oficial de verificación bancaria', esCorrecta: false },
          { texto: 'Un tipo de antivirus', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "smishing"?',
        opciones: [
          { texto: 'Phishing realizado por mensaje de texto (SMS)', esCorrecta: true },
          { texto: 'Un virus exclusivo de redes sociales', esCorrecta: false },
          { texto: 'Un método de cifrado de mensajes', esCorrecta: false },
          { texto: 'Phishing únicamente por correo electrónico', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué caracteriza al "spear phishing"?',
        opciones: [
          { texto: 'Que se envía a millones de personas al mismo tiempo', esCorrecta: false },
          { texto: 'Que está dirigido y personalizado a una persona específica', esCorrecta: true },
          { texto: 'Que solo ocurre por videollamada', esCorrecta: false },
          { texto: 'Que nunca incluye enlaces', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál de estas es una señal típica de un correo de phishing?',
        opciones: [
          { texto: 'Urgencia extrema para que actúes de inmediato y reveles datos', esCorrecta: true },
          { texto: 'Viene de un contacto que conoces hace años', esCorrecta: false },
          { texto: 'No contiene ningún enlace', esCorrecta: false },
          { texto: 'Está bien redactado en tu idioma', esCorrecta: false },
        ],
      },
      {
        enunciado: 'Si ya ingresaste tu contraseña en un sitio de phishing, ¿qué debes hacer primero?',
        opciones: [
          { texto: 'Esperar a ver si pasa algo', esCorrecta: false },
          { texto: 'Cambiar esa contraseña de inmediato en ese sitio y en cualquier otro donde la reutilizaste', esCorrecta: true },
          { texto: 'Borrar el correo únicamente', esCorrecta: false },
          { texto: 'Reenviar el enlace a tus contactos para advertirles', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "quishing"?',
        opciones: [
          { texto: 'Phishing realizado mediante códigos QR maliciosos', esCorrecta: true },
          { texto: 'Un tipo de contraseña gráfica', esCorrecta: false },
          { texto: 'Phishing exclusivo de aplicaciones bancarias', esCorrecta: false },
          { texto: 'Un método de verificación en dos pasos', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿El candado de HTTPS en un sitio garantiza que es completamente seguro y legítimo?',
        opciones: [
          { texto: 'Sí, si tiene el candado es 100% confiable', esCorrecta: false },
          { texto: 'No, solo indica que la conexión está cifrada; los sitios de phishing también pueden tenerlo', esCorrecta: true },
          { texto: 'El candado solo aparece en sitios de gobierno', esCorrecta: false },
          { texto: 'El candado significa que el sitio no tiene virus', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "whaling"?',
        opciones: [
          { texto: 'Un spear phishing dirigido específicamente a ejecutivos o altos cargos', esCorrecta: true },
          { texto: 'Phishing relacionado con temas marinos', esCorrecta: false },
          { texto: 'Un tipo de ransomware', esCorrecta: false },
          { texto: 'Phishing que solo afecta a estudiantes', esCorrecta: false },
        ],
      },
    ],
  },
  {
    id: 'evaluacion-privacidad-datos',
    titulo: 'Privacidad y datos personales',
    descripcion: 'Evalúa cuánto sabes sobre huella digital, metadatos y protección de tu información.',
    preguntas: [
      {
        enunciado: '¿Qué es la "huella digital"?',
        opciones: [
          { texto: 'Un tipo de autenticación biométrica exclusivamente', esCorrecta: false },
          { texto: 'El conjunto de datos que generas al usar internet (búsquedas, publicaciones, apps)', esCorrecta: true },
          { texto: 'Un virus que roba huellas dactilares', esCorrecta: false },
          { texto: 'Una función de seguridad de los bancos', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué son los metadatos de una foto?',
        opciones: [
          { texto: 'El nombre del archivo únicamente', esCorrecta: false },
          { texto: 'Información oculta como ubicación GPS, fecha y modelo de dispositivo', esCorrecta: true },
          { texto: 'Los colores predominantes de la imagen', esCorrecta: false },
          { texto: 'Los comentarios que otros dejan en la foto', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué protege realmente el modo de navegación privada/incógnito?',
        opciones: [
          { texto: 'Te hace completamente anónimo en internet', esCorrecta: false },
          { texto: 'Evita que el navegador guarde el historial localmente, pero no te oculta de sitios o tu proveedor de internet', esCorrecta: true },
          { texto: 'Bloquea todos los virus automáticamente', esCorrecta: false },
          { texto: 'Impide que cualquier sitio use cookies', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Para qué sirve una VPN?',
        opciones: [
          { texto: 'Para cifrar tu tráfico de internet y ocultar tu IP real del sitio que visitas', esCorrecta: true },
          { texto: 'Para acelerar cualquier conexión a internet sin excepción', esCorrecta: false },
          { texto: 'Para eliminar virus de tu computadora', esCorrecta: false },
          { texto: 'Para crear contraseñas automáticamente', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "derecho al olvido" en protección de datos?',
        opciones: [
          { texto: 'El derecho a olvidar tu propia contraseña sin consecuencias', esCorrecta: false },
          { texto: 'El derecho a solicitar que una empresa elimine tus datos personales', esCorrecta: true },
          { texto: 'Un derecho exclusivo de las empresas, no de las personas', esCorrecta: false },
          { texto: 'El derecho a que un sitio olvide tu contraseña automáticamente', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué son los "data brokers"?',
        opciones: [
          { texto: 'Empresas que recopilan, combinan y venden información personal de muchas fuentes', esCorrecta: true },
          { texto: 'Un tipo de antivirus especializado', esCorrecta: false },
          { texto: 'Agencias gubernamentales de protección de datos', esCorrecta: false },
          { texto: 'Un servicio de respaldo en la nube', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué es buena práctica revisar los permisos de tus aplicaciones móviles?',
        opciones: [
          { texto: 'Porque algunas apps piden acceso a datos que no necesitan para su función real', esCorrecta: true },
          { texto: 'Porque así la app pesa menos en el celular', esCorrecta: false },
          { texto: 'No tiene ningún beneficio real', esCorrecta: false },
          { texto: 'Solo es necesario en computadoras, no en celulares', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál es el riesgo de compartir tu ubicación en tiempo real en redes sociales?',
        opciones: [
          { texto: 'Ningún riesgo, es solo información de entretenimiento', esCorrecta: false },
          { texto: 'También revela que tu domicilio está vacío en ese momento', esCorrecta: true },
          { texto: 'Hace que tu batería dure más', esCorrecta: false },
          { texto: 'Mejora automáticamente tu privacidad', esCorrecta: false },
        ],
      },
    ],
  },
  {
    id: 'evaluacion-redes-sociales',
    titulo: 'Redes sociales',
    descripcion: 'Evalúa tus conocimientos sobre seguridad, privacidad y buenas prácticas en redes sociales.',
    preguntas: [
      {
        enunciado: '¿Cómo suele venir configurada la privacidad en un perfil nuevo de red social?',
        opciones: [
          { texto: 'Siempre en modo privado por defecto', esCorrecta: false },
          { texto: 'Con visibilidad amplia por defecto, lo que conviene revisar manualmente', esCorrecta: true },
          { texto: 'No se puede configurar la privacidad en redes sociales', esCorrecta: false },
          { texto: 'Bloqueada para todos hasta que pagues una suscripción', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es una cuenta "clonada"?',
        opciones: [
          { texto: 'Una cuenta oficial verificada por la plataforma', esCorrecta: false },
          { texto: 'Una cuenta falsa que copia tu foto y datos para hacerse pasar por ti', esCorrecta: true },
          { texto: 'Una cuenta con doble autenticación activada', esCorrecta: false },
          { texto: 'Una cuenta compartida entre dos personas legítimamente', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es el "grooming"?',
        opciones: [
          { texto: 'Un filtro estético usado en redes sociales', esCorrecta: false },
          { texto: 'El proceso mediante el cual un adulto se gana la confianza de un menor para explotarlo', esCorrecta: true },
          { texto: 'Una función de edición de fotos', esCorrecta: false },
          { texto: 'Un tipo de configuración de privacidad', esCorrecta: false },
        ],
      },
      {
        enunciado: 'Si sufres ciberacoso, ¿cuál es un paso recomendado?',
        opciones: [
          { texto: 'Responder agresivamente al acosador', esCorrecta: false },
          { texto: 'Guardar evidencia, bloquear, reportar a la plataforma y buscar apoyo de alguien de confianza', esCorrecta: true },
          { texto: 'Eliminar tu cuenta inmediatamente sin guardar nada', esCorrecta: false },
          { texto: 'Ignorarlo siempre sin excepción', esCorrecta: false },
        ],
      },
      {
        enunciado: 'Si eres víctima de sextorsión, ¿qué es lo más recomendable?',
        opciones: [
          { texto: 'Pagar de inmediato lo que piden', esCorrecta: false },
          { texto: 'No ceder al chantaje, guardar evidencia y reportarlo a la plataforma y autoridades', esCorrecta: true },
          { texto: 'Enviar más contenido para calmar al agresor', esCorrecta: false },
          { texto: 'No decírselo a nadie nunca', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué es importante revisar las aplicaciones de terceros conectadas a tu cuenta?',
        opciones: [
          { texto: 'Porque pueden tener acceso a tus datos y publicaciones sin que lo recuerdes', esCorrecta: true },
          { texto: 'No es realmente importante', esCorrecta: false },
          { texto: 'Solo afecta la velocidad de la app', esCorrecta: false },
          { texto: 'Las apps de terceros nunca tienen acceso a tu cuenta', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cómo puedes verificar si una cuenta "oficial" en redes sociales realmente lo es?',
        opciones: [
          { texto: 'Confiando únicamente en el nombre de usuario', esCorrecta: false },
          { texto: 'Buscando enlaces cruzados desde el sitio web oficial hacia esa cuenta', esCorrecta: true },
          { texto: 'Si tiene muchos seguidores ya es oficial', esCorrecta: false },
          { texto: 'No hay forma de verificarlo', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué deberías considerar antes de participar en un reto viral?',
        opciones: [
          { texto: 'Solo si tus amigos también participan', esCorrecta: false },
          { texto: 'Si implica algún riesgo físico, legal o de exposición de datos personales', esCorrecta: true },
          { texto: 'Cuántas vistas puede generar', esCorrecta: false },
          { texto: 'No hace falta pensarlo, siempre son seguros', esCorrecta: false },
        ],
      },
    ],
  },
  {
    id: 'evaluacion-redes-wifi',
    titulo: 'Redes WiFi',
    descripcion: 'Evalúa lo que sabes sobre seguridad en redes inalámbricas, públicas y domésticas.',
    preguntas: [
      {
        enunciado: '¿Qué es una red "gemela maligna" (evil twin)?',
        opciones: [
          { texto: 'Una red con nombre casi idéntico a una legítima, creada por un atacante', esCorrecta: true },
          { texto: 'Un router con dos antenas', esCorrecta: false },
          { texto: 'Una red doméstica con doble contraseña', esCorrecta: false },
          { texto: 'Un tipo de virus para routers', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Cuál de estos cifrados WiFi es el más seguro?',
        opciones: [
          { texto: 'WEP', esCorrecta: false },
          { texto: 'WPA3', esCorrecta: true },
          { texto: 'Sin contraseña (red abierta)', esCorrecta: false },
          { texto: 'Todos son igual de seguros', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Para qué sirve usar una VPN en una red WiFi pública?',
        opciones: [
          { texto: 'Para cifrar tu tráfico y reducir el riesgo de interceptación', esCorrecta: true },
          { texto: 'Para conectar más dispositivos a la vez', esCorrecta: false },
          { texto: 'Para acelerar la velocidad de descarga siempre', esCorrecta: false },
          { texto: 'No tiene ningún beneficio de seguridad', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué es riesgoso hacer trámites bancarios en una red WiFi abierta sin protección?',
        opciones: [
          { texto: 'No representa ningún riesgo real', esCorrecta: false },
          { texto: 'Porque el tráfico puede no ir cifrado y otros en la red podrían interceptarlo', esCorrecta: true },
          { texto: 'Porque consume más batería', esCorrecta: false },
          { texto: 'Porque los bancos bloquean automáticamente esas redes', esCorrecta: false },
        ],
      },
      {
        enunciado: 'Si ves un dispositivo desconocido conectado a tu router, ¿qué deberías hacer?',
        opciones: [
          { texto: 'Ignorarlo, es normal', esCorrecta: false },
          { texto: 'Cambiar la contraseña del WiFi de inmediato y revisar el cifrado', esCorrecta: true },
          { texto: 'Apagar el router permanentemente', esCorrecta: false },
          { texto: 'Esperar una semana antes de actuar', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Por qué se recomienda cambiar la contraseña de administrador del router apenas se instala?',
        opciones: [
          { texto: 'Porque las contraseñas por defecto suelen ser conocidas o estar impresas en el equipo', esCorrecta: true },
          { texto: 'No es necesario cambiarla nunca', esCorrecta: false },
          { texto: 'Solo por estética', esCorrecta: false },
          { texto: 'Porque así el router se ve más nuevo', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Qué es un ataque "man in the middle"?',
        opciones: [
          { texto: 'Cuando un atacante se posiciona entre tú y el sitio que visitas para interceptar datos', esCorrecta: true },
          { texto: 'Un tipo de virus que solo afecta a routers antiguos', esCorrecta: false },
          { texto: 'Un método legítimo de optimización de red', esCorrecta: false },
          { texto: 'Un ataque que solo ocurre en redes con cable', esCorrecta: false },
        ],
      },
      {
        enunciado: '¿Para qué sirve crear una red de invitados en tu WiFi doméstico?',
        opciones: [
          { texto: 'Para que las visitas y dispositivos IoT no accedan a tu red principal con datos sensibles', esCorrecta: true },
          { texto: 'Para que internet sea más rápido en general', esCorrecta: false },
          { texto: 'Es obligatorio por ley en algunos países', esCorrecta: false },
          { texto: 'No tiene ningún beneficio de seguridad', esCorrecta: false },
        ],
      },
    ],
  },
];

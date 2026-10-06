/**
 * Catálogo educativo de amenazas digitales (contenido estático).
 * Orientado a prevención: sin detalles técnicos de ataque.
 * `moduloSlug` enlaza la amenaza con el módulo (Categoria) relacionado.
 */
export interface Amenaza {
  slug: string;
  nombre: string;
  icono: string; // clave en components/shared/threat-icon.tsx
  resumen: string;
  nivel: 'Alto' | 'Medio';
  moduloSlug: string;
  queEs: string;
  comoFunciona: string;
  comoEngañan: string[];
  ejemplo: string;
  señales: string[];
  riesgos: string[];
  proteccion: string[];
  queHacer: string[];
}

export const AMENAZAS: Amenaza[] = [
  {
    slug: 'phishing', nombre: 'Phishing', icono: 'mail', nivel: 'Alto', moduloSlug: 'phishing',
    resumen: 'Correos que imitan a empresas o instituciones para que entregues tus datos.',
    queEs: 'Es un engaño por correo electrónico en el que alguien se hace pasar por una entidad confiable (banco, universidad, red social) para que entregues contraseñas o datos personales.',
    comoFunciona: 'El mensaje te lleva a una página falsa muy parecida a la real. Si escribes tus datos ahí, quedan en manos del atacante.',
    comoEngañan: ['Crean urgencia: "tu cuenta será bloqueada hoy".', 'Copian logotipos y colores oficiales.', 'Te piden "verificar" o "actualizar" tus datos.'],
    ejemplo: 'Recibes un correo de "soporte" que dice que tu cuenta institucional vence en 24 horas y trae un botón para renovarla.',
    señales: ['Remitente con dirección extraña.', 'Errores de redacción o saludo genérico.', 'Enlaces que no coinciden con el sitio oficial.', 'Presión para actuar rápido.'],
    riesgos: ['Robo de cuentas.', 'Suplantación de tu identidad.', 'Pérdida de dinero.'],
    proteccion: ['No abras enlaces de correos inesperados.', 'Entra escribiendo tú mismo la dirección oficial.', 'Activa la verificación en dos pasos.'],
    queHacer: ['No respondas ni hagas clic.', 'Si ya ingresaste datos, cambia tu contraseña de inmediato.', 'Reporta el correo como phishing y avisa a la institución.'],
  },
  {
    slug: 'smishing', nombre: 'Smishing', icono: 'message', nivel: 'Alto', moduloSlug: 'phishing',
    resumen: 'Fraude por mensaje de texto o WhatsApp con enlaces engañosos.',
    queEs: 'Es el phishing que llega por SMS o aplicaciones de mensajería, normalmente con un enlace corto o un número al que te piden llamar.',
    comoFunciona: 'El mensaje simula ser un aviso de paquete, banco o premio. El enlace conduce a una página falsa o a una descarga no deseada.',
    comoEngañan: ['Avisos de "paquete retenido".', 'Premios o sorteos que nunca solicitaste.', 'Alertas bancarias falsas.'],
    ejemplo: 'Te llega un SMS: "Tu envío no pudo entregarse, confirma tu dirección aquí" con un enlace acortado.',
    señales: ['Número desconocido.', 'Enlaces acortados.', 'Mensajes que no esperabas.', 'Urgencia o premios inesperados.'],
    riesgos: ['Robo de datos bancarios.', 'Instalación de apps maliciosas.', 'Cobros no autorizados.'],
    proteccion: ['No abras enlaces de números desconocidos.', 'Verifica por el canal oficial de la empresa.', 'Bloquea y reporta el número.'],
    queHacer: ['No toques el enlace.', 'Borra el mensaje y bloquea el número.', 'Si ingresaste datos, contacta a tu banco.'],
  },
  {
    slug: 'vishing', nombre: 'Vishing', icono: 'phone', nivel: 'Alto', moduloSlug: 'phishing',
    resumen: 'Llamadas donde alguien finge ser del banco o de soporte técnico.',
    queEs: 'Es un fraude por llamada telefónica: el atacante se presenta como funcionario o técnico para que le des información o realices una acción.',
    comoFunciona: 'Usa un tono profesional y datos básicos sobre ti para parecer legítimo, y te pide códigos, claves o que instales algo.',
    comoEngañan: ['Dicen que detectaron "movimientos sospechosos".', 'Piden códigos que llegan a tu teléfono.', 'Te ponen nervioso para que no pienses.'],
    ejemplo: 'Alguien llama diciendo ser de tu banco y te pide el código que acabas de recibir por SMS "para cancelar una compra".',
    señales: ['Te piden códigos o claves.', 'Insisten en que no cuelgues.', 'Presión por tiempo.'],
    riesgos: ['Vaciado de cuentas.', 'Acceso a tus aplicaciones.', 'Robo de identidad.'],
    proteccion: ['Ninguna entidad te pide claves por teléfono.', 'Cuelga y llama tú al número oficial.', 'Nunca compartas códigos de verificación.'],
    queHacer: ['Corta la llamada.', 'Comunícate con tu banco por su línea oficial.', 'Cambia tus claves si compartiste algo.'],
  },
  {
    slug: 'quishing', nombre: 'Quishing', icono: 'qr', nivel: 'Medio', moduloSlug: 'phishing',
    resumen: 'Códigos QR que te llevan a sitios falsos o peligrosos.',
    queEs: 'Es el engaño que usa códigos QR. Como no ves el enlace antes de escanear, puedes terminar en una página fraudulenta.',
    comoFunciona: 'El QR puede estar en un correo, un afiche pegado sobre otro o un mensaje, y dirige a un formulario falso.',
    comoEngañan: ['QR pegados sobre carteles legítimos.', 'Correos con QR "para verificar tu cuenta".', 'Promociones con QR sin origen claro.'],
    ejemplo: 'Ves un cartel de "Wi-Fi gratis de la universidad" con un QR que pide tus datos de acceso.',
    señales: ['QR en lugares donde no esperas.', 'Pide iniciar sesión tras escanear.', 'Dirección final extraña.'],
    riesgos: ['Robo de credenciales.', 'Descarga de apps falsas.'],
    proteccion: ['Revisa la dirección que muestra el móvil antes de abrir.', 'No escanees QR de origen desconocido.', 'No inicies sesión desde enlaces de un QR.'],
    queHacer: ['Cierra la página.', 'Cambia la contraseña si ingresaste datos.', 'Avisa a quien administra el lugar.'],
  },
  {
    slug: 'ingenieria-social', nombre: 'Ingeniería social', icono: 'users', nivel: 'Alto', moduloSlug: 'ingenieria-social',
    resumen: 'Manipulación psicológica para que entregues información o accesos.',
    queEs: 'Son técnicas que aprovechan la confianza, el miedo, la curiosidad o las ganas de ayudar para que una persona haga algo que no debería.',
    comoFunciona: 'En lugar de atacar un sistema, el atacante convence a la persona. Puede ser por mensaje, llamada o en persona.',
    comoEngañan: ['Fingen autoridad ("soy del área de sistemas").', 'Generan urgencia o miedo.', 'Ofrecen favores o premios.'],
    ejemplo: 'Alguien dice ser de soporte y te pide tu contraseña "para arreglar un problema" con tu cuenta.',
    señales: ['Piden información sensible.', 'Presionan para decidir rápido.', 'Evitan que verifiques su identidad.'],
    riesgos: ['Acceso a tus cuentas.', 'Fuga de información personal o institucional.'],
    proteccion: ['Verifica siempre la identidad por otro canal.', 'No compartas claves con nadie.', 'Desconfía de lo urgente.'],
    queHacer: ['Detén la conversación.', 'Cuenta lo ocurrido a alguien de confianza o al área de TI.', 'Cambia las claves involucradas.'],
  },
  {
    slug: 'suplantacion-identidad', nombre: 'Suplantación de identidad', icono: 'user-x', nivel: 'Alto', moduloSlug: 'ingenieria-social',
    resumen: 'Alguien se hace pasar por ti o por una persona de confianza.',
    queEs: 'Ocurre cuando una persona usa tu nombre, fotos o datos (o los de un conocido) para engañar a otros o realizar trámites.',
    comoFunciona: 'Crean perfiles falsos o toman cuentas ajenas y piden dinero o favores a los contactos.',
    comoEngañan: ['Perfil nuevo con fotos copiadas.', 'Mensaje de "un amigo" pidiendo dinero.', 'Uso de datos personales publicados.'],
    ejemplo: 'Un contacto te escribe desde un número nuevo diciendo que es tu compañero y te pide una transferencia urgente.',
    señales: ['Cuenta o número nuevo de alguien conocido.', 'Pedidos de dinero.', 'Estilo de escritura distinto.'],
    riesgos: ['Daño a tu reputación.', 'Estafas a tus contactos.', 'Trámites fraudulentos a tu nombre.'],
    proteccion: ['Limita qué datos publicas.', 'Confirma por llamada antes de enviar dinero.', 'Activa la verificación en dos pasos.'],
    queHacer: ['Reporta el perfil falso.', 'Avisa a tus contactos.', 'Cambia tus contraseñas y revisa tus cuentas.'],
  },
  {
    slug: 'malware', nombre: 'Malware', icono: 'bug', nivel: 'Alto', moduloSlug: 'malware',
    resumen: 'Software malicioso que daña o espía tus dispositivos.',
    queEs: 'Malware es cualquier programa creado para causar daño, robar información o tomar control de un dispositivo.',
    comoFunciona: 'Suele llegar escondido en archivos adjuntos, programas pirata o enlaces. Una vez instalado, actúa sin que lo notes.',
    comoEngañan: ['Archivos con nombres atractivos.', 'Programas "gratis" que son versiones alteradas.', 'Falsas actualizaciones.'],
    ejemplo: 'Descargas un programa de pago "gratis" desde un sitio desconocido y tu equipo se vuelve lento y muestra anuncios.',
    señales: ['Equipo inusualmente lento.', 'Ventanas emergentes constantes.', 'Programas que no instalaste.'],
    riesgos: ['Pérdida o robo de información.', 'Equipo inutilizable.', 'Espionaje.'],
    proteccion: ['Descarga solo de fuentes oficiales.', 'Mantén el sistema y el antivirus actualizados.', 'No abras adjuntos inesperados.'],
    queHacer: ['Desconecta el equipo de internet.', 'Ejecuta un análisis con antivirus.', 'Cambia tus contraseñas desde otro dispositivo.'],
  },
  {
    slug: 'ransomware', nombre: 'Ransomware', icono: 'lock', nivel: 'Alto', moduloSlug: 'malware',
    resumen: 'Bloquea tus archivos y exige un pago para devolverlos.',
    queEs: 'Es un tipo de malware que cifra tus archivos o bloquea el equipo y muestra un mensaje pidiendo dinero para liberarlos.',
    comoFunciona: 'Entra por adjuntos o descargas infectadas. Cuando se activa, los archivos dejan de abrirse.',
    comoEngañan: ['Adjuntos de "facturas" o "documentos".', 'Descargas de sitios no oficiales.'],
    ejemplo: 'Abres un adjunto de "factura pendiente" y todas tus fotos y trabajos aparecen con una nota exigiendo un pago.',
    señales: ['Archivos que no abren.', 'Extensiones raras.', 'Mensaje de rescate en pantalla.'],
    riesgos: ['Pérdida de trabajos y tesis.', 'Costos económicos.', 'Pago sin garantía de recuperar nada.'],
    proteccion: ['Haz copias de seguridad regulares (en nube y disco externo).', 'No abras adjuntos desconocidos.', 'Actualiza tu sistema.'],
    queHacer: ['Apaga y desconecta el equipo.', 'No pagues el rescate.', 'Pide ayuda al área de TI y restaura desde tu copia.'],
  },
  {
    slug: 'troyanos', nombre: 'Troyanos', icono: 'bug', nivel: 'Medio', moduloSlug: 'malware',
    resumen: 'Programas que parecen útiles pero esconden algo malicioso.',
    queEs: 'Un troyano se presenta como un programa legítimo (juego, utilidad, crack) pero en realidad realiza acciones dañinas en segundo plano.',
    comoFunciona: 'Tú lo instalas voluntariamente creyendo que es inofensivo, y así abre la puerta a otras amenazas.',
    comoEngañan: ['Programas piratas.', 'Utilidades "milagrosas".', 'Instaladores de sitios no oficiales.'],
    ejemplo: 'Instalas un "optimizador" gratuito y luego aparecen programas que no recuerdas haber instalado.',
    señales: ['Comportamiento extraño tras instalar algo.', 'Permisos excesivos.', 'Antivirus que se desactiva.'],
    riesgos: ['Acceso remoto a tu equipo.', 'Robo de datos.'],
    proteccion: ['Instala solo desde tiendas y sitios oficiales.', 'Evita software pirata.', 'Lee los permisos que solicita.'],
    queHacer: ['Desinstala el programa.', 'Analiza el equipo con antivirus.', 'Cambia tus contraseñas.'],
  },
  {
    slug: 'spyware', nombre: 'Spyware', icono: 'eye', nivel: 'Medio', moduloSlug: 'malware',
    resumen: 'Programas que te vigilan y recopilan información sin avisar.',
    queEs: 'El spyware observa lo que haces (sitios, teclas, ubicación) y envía esa información a terceros sin tu permiso.',
    comoFunciona: 'Se instala junto a otros programas o apps dudosas y trabaja en silencio.',
    comoEngañan: ['Apps gratuitas con permisos de más.', 'Extensiones de navegador desconocidas.'],
    ejemplo: 'Una app de linterna pide acceso a tus contactos y micrófono.',
    señales: ['Batería que se agota rápido.', 'Consumo de datos inusual.', 'Cambios en el navegador.'],
    riesgos: ['Pérdida de privacidad.', 'Robo de credenciales y datos personales.'],
    proteccion: ['Revisa los permisos de tus apps.', 'Quita extensiones que no uses.', 'Mantén todo actualizado.'],
    queHacer: ['Desinstala la app sospechosa.', 'Analiza con antivirus.', 'Cambia tus claves.'],
  },
  {
    slug: 'robo-credenciales', nombre: 'Robo de credenciales', icono: 'key', nivel: 'Alto', moduloSlug: 'contrasenas',
    resumen: 'Obtienen tu usuario y contraseña para entrar a tus cuentas.',
    queEs: 'Consiste en conseguir tus datos de acceso, ya sea engañándote, por filtraciones de datos o probando contraseñas repetidas.',
    comoFunciona: 'Si usas la misma contraseña en varios sitios, una filtración en uno permite entrar a los demás.',
    comoEngañan: ['Páginas de inicio de sesión falsas.', 'Aprovechan contraseñas reutilizadas.', 'Piden tu clave "por soporte".'],
    ejemplo: 'Usas la misma contraseña en todo; se filtra de un sitio pequeño y alguien entra a tu correo.',
    señales: ['Avisos de inicio de sesión desde otro lugar.', 'Mensajes de cambio de contraseña que no pediste.'],
    riesgos: ['Acceso a correo, redes y servicios.', 'Efecto dominó en otras cuentas.'],
    proteccion: ['Usa una contraseña distinta para cada cuenta.', 'Activa la autenticación multifactor.', 'Usa un gestor de contraseñas.'],
    queHacer: ['Cambia la contraseña de inmediato.', 'Cierra las sesiones abiertas.', 'Revisa tu correo y cuentas vinculadas.'],
  },
  {
    slug: 'enlaces-maliciosos', nombre: 'Enlaces maliciosos', icono: 'link', nivel: 'Alto', moduloSlug: 'phishing',
    resumen: 'Links que parecen normales pero llevan a sitios peligrosos.',
    queEs: 'Son enlaces que redirigen a páginas falsas o descargas dañinas, a menudo disfrazados con textos atractivos o direcciones acortadas.',
    comoFunciona: 'Basta un clic para abrir una página que roba datos o intenta instalar algo.',
    comoEngañan: ['Direcciones casi idénticas a las reales.', 'Enlaces acortados que ocultan el destino.', 'Mensajes que despiertan curiosidad.'],
    ejemplo: 'Un conocido (con la cuenta hackeada) te envía "mira esta foto tuya" con un enlace extraño.',
    señales: ['Dirección con letras cambiadas.', 'Sin candado (HTTPS) o con alertas del navegador.', 'Mensaje fuera de contexto.'],
    riesgos: ['Robo de datos.', 'Infección del dispositivo.'],
    proteccion: ['Pasa el cursor para ver el destino real.', 'Escribe tú la dirección oficial.', 'Pregunta al remitente por otro medio.'],
    queHacer: ['Cierra la pestaña.', 'No descargues nada.', 'Si ingresaste datos, cámbialos.'],
  },
  {
    slug: 'aplicaciones-falsas', nombre: 'Aplicaciones falsas', icono: 'smartphone', nivel: 'Medio', moduloSlug: 'redes-wifi',
    resumen: 'Apps que imitan a las originales para robar datos o mostrar anuncios.',
    queEs: 'Son aplicaciones que copian nombre e imagen de apps conocidas, pero fueron creadas para engañar o recopilar datos.',
    comoFunciona: 'Se publican en sitios no oficiales (a veces incluso en tiendas) y piden permisos que no necesitan.',
    comoEngañan: ['Nombres casi iguales a la app real.', 'Promesas como "versión premium gratis".'],
    ejemplo: 'Instalas una "versión mejorada" de tu red social desde un enlace y te pide iniciar sesión.',
    señales: ['Pocas reseñas o reseñas raras.', 'Desarrollador desconocido.', 'Permisos excesivos.'],
    riesgos: ['Robo de cuentas.', 'Espionaje.', 'Cobros ocultos.'],
    proteccion: ['Descarga solo desde tiendas oficiales.', 'Verifica el desarrollador.', 'Lee reseñas y permisos.'],
    queHacer: ['Desinstálala.', 'Cambia la contraseña de la cuenta usada.', 'Reporta la app en la tienda.'],
  },
  {
    slug: 'fraudes-redes-sociales', nombre: 'Fraudes en redes sociales', icono: 'share', nivel: 'Medio', moduloSlug: 'redes-sociales',
    resumen: 'Estafas con sorteos, ofertas falsas o perfiles que no son quienes dicen.',
    queEs: 'Son engaños que usan las redes sociales: ofertas increíbles, sorteos falsos, ventas inexistentes o perfiles creados para ganar tu confianza.',
    comoFunciona: 'Aprovechan la confianza que generan los contactos y el contenido viral para que compartas datos o pagues por algo que no existe.',
    comoEngañan: ['Sorteos que piden tus datos.', 'Tiendas falsas con precios irreales.', 'Perfiles que construyen amistad para pedir dinero.'],
    ejemplo: 'Ves un anuncio de un celular a mitad de precio; al pagar, el vendedor desaparece.',
    señales: ['Precios demasiado buenos.', 'Perfiles recién creados.', 'Piden pago por adelantado y por vías no seguras.'],
    riesgos: ['Pérdida de dinero.', 'Robo de datos.', 'Riesgo para tu reputación.'],
    proteccion: ['Compra en tiendas verificadas.', 'Investiga al vendedor.', 'Configura tu perfil como privado.'],
    queHacer: ['Deja de comunicarte.', 'Reporta el perfil o anuncio.', 'Si pagaste, contacta a tu banco.'],
  },
  {
    slug: 'wifi-publico-inseguro', nombre: 'Wi-Fi público inseguro', icono: 'wifi', nivel: 'Medio', moduloSlug: 'redes-wifi',
    resumen: 'Redes abiertas donde otros podrían ver lo que haces.',
    queEs: 'Las redes Wi-Fi abiertas o falsas pueden permitir que terceros observen tu tráfico o te dirijan a páginas engañosas.',
    comoFunciona: 'Alguien puede crear una red con un nombre parecido al de un local o la universidad para que te conectes.',
    comoEngañan: ['Redes con nombres casi idénticos al oficial.', 'Portales que piden tus datos para "dar acceso".'],
    ejemplo: 'Te conectas a "Cafe_Gratis_WiFi" y entras a tu banco desde ahí.',
    señales: ['Red sin contraseña.', 'Portal que pide datos personales o de tarjeta.', 'Nombres duplicados de la misma red.'],
    riesgos: ['Interceptación de información.', 'Acceso a cuentas.'],
    proteccion: ['Confirma el nombre de la red con el personal.', 'Evita operaciones bancarias en redes públicas.', 'Usa datos móviles o una VPN confiable.'],
    queHacer: ['Desconéctate.', 'Olvida la red en tu dispositivo.', 'Cambia las contraseñas si ingresaste a cuentas.'],
  },
  {
    slug: 'deepfakes', nombre: 'Deepfakes y suplantación con IA', icono: 'bot', nivel: 'Medio', moduloSlug: 'ingenieria-social',
    resumen: 'Voces, imágenes o videos creados con IA para hacerse pasar por alguien.',
    queEs: 'Son contenidos falsos creados con inteligencia artificial que imitan el rostro o la voz de una persona real.',
    comoFunciona: 'Con pocas muestras de audio o fotos, se pueden generar mensajes convincentes que piden dinero o difunden desinformación.',
    comoEngañan: ['Notas de voz que suenan a un familiar.', 'Videos de personas conocidas diciendo algo inusual.', 'Mensajes urgentes de "jefes" o autoridades.'],
    ejemplo: 'Recibes un audio con la voz de un familiar pidiendo dinero urgente; en realidad fue generado con IA.',
    señales: ['Petición urgente y emocional.', 'Imagen o voz con detalles extraños.', 'Mensaje por un canal inusual.'],
    riesgos: ['Estafas económicas.', 'Desinformación.', 'Daño a la reputación.'],
    proteccion: ['Verifica llamando al número que ya conoces.', 'Acuerda una palabra clave familiar.', 'Desconfía de contenido que busca provocar una reacción inmediata.'],
    queHacer: ['No envíes dinero.', 'Confirma por otra vía.', 'Reporta el contenido en la plataforma.'],
  },
];

export function obtenerAmenaza(slug: string) {
  return AMENAZAS.find((a) => a.slug === slug);
}

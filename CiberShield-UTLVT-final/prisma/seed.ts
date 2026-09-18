/**
 * Seed de datos iniciales — Fase 2.
 *
 * Crea:
 * - Roles base (ADMIN, EDITOR, ESTUDIANTE) y sus permisos.
 * - Un usuario administrador inicial.
 * - Categorías base de contenido.
 * - Un término de glosario y una FAQ de ejemplo.
 * - La configuración general del sitio (singleton).
 * - El contenido inicial de la página de inicio (singleton).
 * - Ítems básicos de menú (header y footer).
 *
 * Ejecutar con: npm run prisma:seed
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { GUIAS_CORTAS } from './seed-guias-cortas';
import { EVALUACIONES_CATEGORIAS } from './seed-evaluaciones-categorias';
import { GLOSARIO_TERMINOS } from './seed-glosario';
import { RECURSOS_ADICIONALES } from './seed-recursos';

const prisma = new PrismaClient();

const PERMISOS = [
  { key: 'usuarios.gestionar', description: 'Crear, editar y eliminar usuarios' },
  { key: 'roles.gestionar', description: 'Gestionar roles y permisos' },
  { key: 'publicaciones.gestionar', description: 'Gestionar artículos y noticias' },
  { key: 'categorias.gestionar', description: 'Gestionar categorías' },
  { key: 'glosario.gestionar', description: 'Gestionar términos del glosario' },
  { key: 'faq.gestionar', description: 'Gestionar preguntas frecuentes' },
  { key: 'recursos.gestionar', description: 'Gestionar recursos descargables' },
  { key: 'evaluaciones.gestionar', description: 'Gestionar evaluaciones y preguntas' },
  { key: 'certificados.ver', description: 'Ver y descargar certificados emitidos' },
  { key: 'configuracion.gestionar', description: 'Gestionar configuración general del sitio' },
  { key: 'banners.gestionar', description: 'Gestionar banners y carruseles' },
  { key: 'menus.gestionar', description: 'Gestionar menús de navegación' },
] as const;

async function seedRolesYPermisos() {
  // Crear todos los permisos
  for (const permiso of PERMISOS) {
    await prisma.permission.upsert({
      where: { key: permiso.key },
      update: {},
      create: permiso,
    });
  }

  const todosLosPermisos = await prisma.permission.findMany();

  // Rol ADMIN: todos los permisos
  const rolAdmin = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', description: 'Acceso total a la plataforma' },
  });

  for (const permiso of todosLosPermisos) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: rolAdmin.id, permissionId: permiso.id } },
      update: {},
      create: { roleId: rolAdmin.id, permissionId: permiso.id },
    });
  }

  // Rol EDITOR: gestión de contenido, sin usuarios/roles/configuración
  const permisosEditor = todosLosPermisos.filter((p) =>
    ['publicaciones.gestionar', 'categorias.gestionar', 'glosario.gestionar', 'faq.gestionar', 'recursos.gestionar', 'evaluaciones.gestionar'].includes(p.key)
  );
  const rolEditor = await prisma.role.upsert({
    where: { name: 'EDITOR' },
    update: {},
    create: { name: 'EDITOR', description: 'Gestión de contenido educativo' },
  });
  for (const permiso of permisosEditor) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: rolEditor.id, permissionId: permiso.id } },
      update: {},
      create: { roleId: rolEditor.id, permissionId: permiso.id },
    });
  }

  // Rol ESTUDIANTE: sin permisos administrativos
  const rolEstudiante = await prisma.role.upsert({
    where: { name: 'ESTUDIANTE' },
    update: {},
    create: { name: 'ESTUDIANTE', description: 'Usuario final de la plataforma' },
  });

  console.log('✅ Roles y permisos creados (ADMIN, EDITOR, ESTUDIANTE).');
  return { rolAdmin, rolEditor, rolEstudiante };
}

async function seedUsuarioAdmin(rolAdminId: string) {
  const passwordHash = await bcrypt.hash('CambiarEstaClave123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@ciberseguridad-edu.local' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@ciberseguridad-edu.local',
      passwordHash,
      roleId: rolAdminId,
    },
  });

  console.log('✅ Usuario administrador creado.');
  console.log('   Email:    admin@ciberseguridad-edu.local');
  console.log('   Password: CambiarEstaClave123!  (cámbiala en cuanto exista el panel de login, Fase 5)');
}

async function seedCategorias() {
  const categorias = [
    {
      nombre: 'Phishing',
      slug: 'phishing',
      descripcion: 'Engaños que buscan robar tus credenciales o datos personales.',
    },
    {
      nombre: 'Malware',
      slug: 'malware',
      descripcion: 'Software malicioso diseñado para dañar o espiar tus dispositivos.',
    },
    {
      nombre: 'Ingeniería Social',
      slug: 'ingenieria-social',
      descripcion: 'Manipulación psicológica para obtener información o accesos.',
    },
    {
      nombre: 'Contraseñas',
      slug: 'contrasenas',
      descripcion: 'Buenas prácticas para crear y proteger tus credenciales.',
    },
    {
      nombre: 'Redes Sociales',
      slug: 'redes-sociales',
      descripcion: 'Riesgos de privacidad y exposición en plataformas sociales.',
    },
    {
      nombre: 'Redes WiFi',
      slug: 'redes-wifi',
      descripcion: 'Cómo identificar y evitar redes inalámbricas inseguras.',
    },
    {
      nombre: 'Privacidad y Datos',
      slug: 'privacidad-datos',
      descripcion: 'Protección de tu información personal en línea.',
    },
  ];

  for (const c of categorias) {
    await prisma.categoria.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  console.log(`✅ ${categorias.length} categorías base creadas.`);
}

async function seedPublicaciones(autorId: string) {
  const categoriaPhishing = await prisma.categoria.findUnique({ where: { slug: 'phishing' } });
  const categoriaContrasenas = await prisma.categoria.findUnique({ where: { slug: 'contrasenas' } });

  if (categoriaPhishing) {
    await prisma.publicacion.upsert({
      where: { slug: 'como-reconocer-un-correo-de-phishing' },
      update: {},
      create: {
        tipo: 'ARTICULO',
        titulo: 'Cómo reconocer un correo de phishing',
        slug: 'como-reconocer-un-correo-de-phishing',
        resumen:
          'Cinco señales que delatan un intento de phishing antes de que hagas clic.',
        contenido:
          'Los correos de phishing suelen crear una sensación de urgencia, pidiéndote que actúes de inmediato para evitar una consecuencia negativa.\n\n' +
          'Revisa siempre el dominio real del remitente, no solo el nombre que se muestra. Pasa el cursor sobre los enlaces antes de hacer clic para ver la URL real de destino.\n\n' +
          'Ninguna institución seria te pedirá tu contraseña completa por correo electrónico. Ante la duda, contacta directamente a la institución por un canal oficial distinto al del mensaje recibido.',
        categoriaId: categoriaPhishing.id,
        autorId,
        publicado: true,
        publicadoEn: new Date(),
      },
    });
  }

  if (categoriaContrasenas) {
    await prisma.publicacion.upsert({
      where: { slug: 'anatomia-de-una-contrasena-segura' },
      update: {},
      create: {
        tipo: 'ARTICULO',
        titulo: 'Anatomía de una contraseña segura',
        slug: 'anatomia-de-una-contrasena-segura',
        resumen: 'Por qué la longitud importa más que la complejidad forzada.',
        contenido:
          'Una contraseña larga compuesta por varias palabras aleatorias suele ser más segura y más fácil de recordar que una corta llena de símbolos.\n\n' +
          'Usa un gestor de contraseñas para generar y guardar credenciales únicas por cada sitio, en vez de reutilizar la misma contraseña en todas partes.\n\n' +
          'Si un servicio sufre una filtración de datos, solo esa cuenta queda expuesta, no todas las tuyas.',
        categoriaId: categoriaContrasenas.id,
        autorId,
        publicado: true,
        publicadoEn: new Date(),
      },
    });
  }

  await prisma.publicacion.upsert({
    where: { slug: 'aumentan-los-ataques-de-phishing-en-universidades' },
    update: {},
    create: {
      tipo: 'NOTICIA',
      titulo: 'Aumentan los ataques de phishing dirigidos a universidades',
      slug: 'aumentan-los-ataques-de-phishing-en-universidades',
      resumen:
        'Instituciones educativas reportan un incremento en intentos de robo de credenciales estudiantiles.',
      contenido:
        'Varias universidades han reportado un aumento en campañas de phishing dirigidas específicamente a estudiantes, simulando comunicados sobre becas, matrícula o soporte técnico.\n\n' +
        'Los expertos recomiendan verificar siempre la fuente de cualquier comunicado urgente relacionado con trámites académicos antes de ingresar credenciales.',
      categoriaId: (categoriaPhishing ?? categoriaContrasenas)!.id,
      autorId,
      publicado: true,
      publicadoEn: new Date(),
    },
  });

  console.log('✅ Publicaciones de ejemplo creadas (2 artículos + 1 noticia).');
}

async function seedGuiasAmenazas(autorId: string) {
  const categorias = await prisma.categoria.findMany();
  const porSlug = Object.fromEntries(categorias.map((c) => [c.slug, c]));

  const guias: {
    slug: string;
    categoriaSlug: string;
    titulo: string;
    resumen: string;
    contenido: string;
  }[] = [
    {
      slug: 'guia-completa-contrasenas-seguras',
      categoriaSlug: 'contrasenas',
      titulo: 'Guía completa: cómo crear y administrar contraseñas seguras',
      resumen:
        'Todo lo que necesitas saber sobre contraseñas: cómo se roban, cómo crearlas fuertes y cómo administrarlas sin volverte loco.',
      contenido:
        'Una contraseña es la primera (y a veces única) barrera entre un desconocido y tu cuenta. Aun así, es común reutilizar la misma contraseña en varios sitios, algo que basta con que un solo sitio sufra una filtración para que un atacante pruebe esa misma combinación en tu correo, tus redes sociales y tu banca en línea.\n\n' +
        'Formas comunes en que se roban contraseñas: filtraciones masivas de bases de datos de otros sitios, phishing (páginas falsas que imitan un login real), keyloggers (programas que registran lo que escribes), y "credential stuffing" (probar automáticamente contraseñas filtradas en muchos sitios distintos).\n\n' +
        'Cómo crear una contraseña fuerte: prioriza la longitud sobre la complejidad forzada. Una frase de al menos 4 palabras sin relación entre sí ("CaballoLunaTazaVerde7") suele ser más segura y más fácil de recordar que "P@ssw0rd!" con símbolos obligatorios. Evita datos personales (fechas de nacimiento, nombres de mascotas) que alguien podría deducir de tus redes sociales.\n\n' +
        'Usa un gestor de contraseñas (como Bitwarden, 1Password o el que trae integrado tu navegador) para generar y guardar una contraseña única por cada sitio. Así, si un sitio es hackeado, solo esa cuenta queda expuesta.\n\n' +
        'Activa la autenticación de dos pasos (2FA) en cada cuenta que lo permita, especialmente correo y redes sociales: aunque roben tu contraseña, no podrán entrar sin el segundo código.\n\n' +
        'Si sospechas que una contraseña fue expuesta, cámbiala de inmediato en ese sitio y en cualquier otro donde la hayas reutilizado. Puedes revisar si tu correo apareció en alguna filtración conocida en https://haveibeenpwned.com\n\n' +
        'Más información y buenas prácticas oficiales: https://www.incibe.es y https://www.cisa.gov',
    },
    {
      slug: 'guia-completa-ingenieria-social',
      categoriaSlug: 'ingenieria-social',
      titulo: 'Ingeniería social: cómo te manipulan para que bajes la guardia',
      resumen:
        'La ingeniería social no ataca a tu computadora, te ataca a ti. Aprende a reconocer sus tácticas más comunes.',
      contenido:
        'La ingeniería social es el arte de manipular psicológicamente a una persona para que revele información confidencial, dé acceso a un sistema o realice una acción que normalmente no haría. No requiere conocimientos técnicos avanzados: se apoya en la confianza, el miedo, la urgencia o la curiosidad.\n\n' +
        'Tácticas más comunes: pretexting (el atacante inventa una identidad o situación creíble, como hacerse pasar por soporte técnico o un compañero de clase), baiting (dejar un USB "olvidado" o un enlace tentador para que la víctima lo abra por curiosidad), vishing (llamadas telefónicas haciéndose pasar por un banco o entidad oficial) y quid pro quo (ofrecer algo a cambio de información, como "ayuda técnica gratis" a cambio de tu usuario y contraseña).\n\n' +
        'Señales de alerta: alguien que crea una sensación artificial de urgencia ("tu cuenta será bloqueada en 1 hora"), que te pide información que esa persona/institución ya debería tener, que te presiona para saltarte un procedimiento normal, o que aparece por un canal inusual (una llamada quien dice ser de sistemas, pero contactándote por WhatsApp personal).\n\n' +
        'Cómo protegerte: verifica la identidad de quien te contacta por un canal alterno (llama tú directamente al número oficial de la institución, no al que te dieron), nunca compartas contraseñas ni códigos de verificación por teléfono o chat (ninguna institución real los pide así), y tómate un momento antes de actuar bajo presión — la urgencia es la principal herramienta del atacante.\n\n' +
        'Si crees que fuiste víctima, cambia inmediatamente las contraseñas involucradas, notifica a la institución afectada y, si hubo pérdida de dinero, reporta el caso a las autoridades correspondientes.\n\n' +
        'Más información: https://www.incibe.es y https://www.staysafeonline.org',
    },
    {
      slug: 'guia-completa-malware',
      categoriaSlug: 'malware',
      titulo: 'Malware: tipos, cómo se propaga y cómo protegerte',
      resumen:
        'Virus, troyanos, ransomware y spyware explicados en simple, con pasos concretos de prevención.',
      contenido:
        '"Malware" (software malicioso) es cualquier programa diseñado para dañar, espiar o tomar control de un dispositivo sin el consentimiento informado del usuario. No es un solo tipo de amenaza, sino una familia con comportamientos distintos.\n\n' +
        'Tipos principales: virus (se adjuntan a archivos legítimos y se replican al ejecutarlos), troyanos (se disfrazan de programas útiles pero ejecutan acciones maliciosas ocultas), ransomware (cifra tus archivos y exige un pago para "liberarlos"), spyware (recopila tu actividad e información sin que lo notes) y adware agresivo (satura el dispositivo con publicidad y puede rastrear tu navegación).\n\n' +
        'Formas comunes de infección: descargar software "pirata" o cracks de fuentes no oficiales, abrir adjuntos de correos no solicitados, instalar extensiones de navegador de dudosa procedencia, o conectar memorias USB de origen desconocido.\n\n' +
        'Señales de que un dispositivo podría estar infectado: lentitud repentina e inexplicable, ventanas emergentes constantes, programas que se abren solos, la cámara/micrófono activándose sin que los uses, o la batería agotándose mucho más rápido de lo normal.\n\n' +
        'Prevención: mantén el sistema operativo y las aplicaciones actualizadas (las actualizaciones cierran huecos de seguridad conocidos), instala software únicamente desde tiendas oficiales o sitios verificados del fabricante, usa un antivirus con protección en tiempo real, y haz copias de seguridad periódicas de tus archivos importantes en un disco externo o la nube — esto es lo único que te salva realmente de un ataque de ransomware sin pagar.\n\n' +
        'Si sospechas una infección, desconecta el dispositivo de internet, ejecuta un análisis completo con tu antivirus, y si el problema persiste, considera respaldar tus datos y reinstalar el sistema operativo desde cero.\n\n' +
        'Recursos técnicos y alertas de seguridad: https://www.cisa.gov y https://www.incibe.es',
    },
    {
      slug: 'guia-completa-phishing',
      categoriaSlug: 'phishing',
      titulo: 'Guía completa contra el phishing: variantes y cómo detectarlo siempre',
      resumen:
        'Del phishing clásico por correo al smishing por SMS: un repaso completo de cómo operan y cómo blindarte.',
      contenido:
        'El phishing es un intento de engañarte para que reveles información sensible (contraseñas, datos bancarios, códigos de verificación) haciéndose pasar por una entidad confiable: tu banco, tu universidad, una red social o un servicio de paquetería.\n\n' +
        'Variantes que debes conocer: phishing por correo (el más común, con enlaces a páginas falsas casi idénticas a las reales), smishing (por mensaje de texto, a menudo con enlaces acortados), vishing (por llamada telefónica), y spear phishing (un ataque dirigido y personalizado a una persona específica, usando información real sobre ella para ser más convincente).\n\n' +
        'Cómo detectarlo: revisa el dominio real del remitente (no solo el nombre visible — puede decir "Banco Pichincha" pero venir de una dirección extraña), pasa el cursor sobre los enlaces antes de hacer clic para ver la URL de destino real, desconfía de mensajes que exigen acción inmediata bajo amenaza ("tu cuenta será suspendida"), y fíjate en errores de ortografía o un diseño ligeramente distinto al oficial.\n\n' +
        'Una regla que nunca falla: ninguna institución seria te pedirá tu contraseña completa, tu PIN o un código de verificación de 2FA por correo, mensaje o llamada. Si tienes dudas, no uses los datos de contacto del mensaje sospechoso — busca el número o sitio oficial por tu cuenta y contacta directamente.\n\n' +
        'Si ya ingresaste tus datos en un sitio falso: cambia esa contraseña de inmediato (y en cualquier otro sitio donde la hayas reutilizado), activa 2FA si no lo tenías, y contacta a la institución real para alertar del incidente.\n\n' +
        'Reporta intentos de phishing y consulta alertas activas en https://www.ftc.gov/consumer-alerts y https://www.incibe.es',
    },
    {
      slug: 'guia-completa-privacidad-datos',
      categoriaSlug: 'privacidad-datos',
      titulo: 'Privacidad y datos personales: qué expones sin darte cuenta',
      resumen:
        'Metadatos, huella digital y permisos de apps: una guía para entender y reducir lo que compartes sin saberlo.',
      contenido:
        'Cada búsqueda, cada "me gusta" y cada app instalada deja un rastro. La suma de todos esos rastros forma tu "huella digital", y muchas veces es más grande y más pública de lo que imaginas.\n\n' +
        'Fuentes comunes de exposición: metadatos ocultos en fotos (muchas incluyen la ubicación exacta donde se tomaron), permisos de apps que piden acceso a contactos, micrófono o ubicación sin necesitarlo realmente para su función, configuraciones de privacidad por defecto demasiado abiertas en redes sociales, y cuestionarios/"tests" virales que en realidad recolectan datos personales para fines publicitarios o peor.\n\n' +
        'Por qué importa: tus datos personales se pueden usar para suplantación de identidad, ingeniería social dirigida (mientras más sepan de ti, más creíble puede sonar un engaño), discriminación en procesos de selección, o simplemente para venderte publicidad hiperdirigida sin tu consentimiento informado.\n\n' +
        'Cómo reducir tu exposición: revisa y limita los permisos de tus apps periódicamente (¿de verdad una linterna necesita acceso a tus contactos?), desactiva el etiquetado de ubicación en fotos que vayas a publicar, configura tus redes sociales en modo privado o restringido a conocidos, y lee al menos el resumen de privacidad antes de aceptar los términos de un nuevo servicio.\n\n' +
        'Tienes derecho a saber qué datos tuyos tiene una empresa y a pedir que los elimine (derecho de acceso y de supresión) en la mayoría de legislaciones modernas de protección de datos — no dudes en ejercerlo si te preocupa un servicio en particular.\n\n' +
        'Recursos sobre privacidad digital: https://www.eff.org y https://www.incibe.es',
    },
    {
      slug: 'guia-completa-redes-sociales',
      categoriaSlug: 'redes-sociales',
      titulo: 'Seguridad en redes sociales: perfiles, mensajes y estafas',
      resumen:
        'Cuentas falsas, enlaces maliciosos y sobreexposición: cómo usar tus redes sin regalar tu seguridad.',
      contenido:
        'Las redes sociales son, para muchos atacantes, la fuente principal de información para preparar un engaño: publican dónde estudias, con quién te relacionas, cuándo viajas y qué te interesa — todo útil para hacer un ataque de ingeniería social mucho más convincente.\n\n' +
        'Riesgos comunes: cuentas falsas o clonadas que suplantan a un amigo o familiar para pedir dinero o datos, enlaces maliciosos disfrazados de "mira este video tuyo" o encuestas virales, aplicaciones de terceros que piden acceso completo a tu cuenta a cambio de un filtro o resultado de "test", y el riesgo físico de publicar tu ubicación en tiempo real (revela cuándo tu casa está vacía).\n\n' +
        'Buenas prácticas: configura tu perfil como privado o restringido a personas que realmente conoces, desconfía de mensajes inesperados de "amigos" pidiendo dinero o códigos de verificación (verifica por otro medio antes de actuar), revisa periódicamente qué aplicaciones de terceros tienen acceso a tu cuenta y revoca las que no reconozcas o ya no uses, y evita publicar en tiempo real cuando estás fuera de casa — comparte esas fotos después.\n\n' +
        'Activa siempre la autenticación de dos pasos en tus redes sociales: son de las cuentas más buscadas por atacantes precisamente porque dan acceso a tu red de contactos completa para propagar más engaños.\n\n' +
        'Si tu cuenta es hackeada o clonada, repórtalo de inmediato desde las herramientas oficiales de la plataforma y avisa a tus contactos por otro canal para que no caigan en mensajes enviados "desde ti".\n\n' +
        'Guías oficiales de seguridad: https://safety.google y https://www.staysafeonline.org',
    },
    {
      slug: 'guia-completa-redes-wifi',
      categoriaSlug: 'redes-wifi',
      titulo: 'Redes WiFi: cómo identificar y evitar conexiones inseguras',
      resumen:
        'Redes públicas, ataques "man in the middle" y WiFi doméstico: todo lo que debes revisar antes de conectarte.',
      contenido:
        'Conectarte a una red WiFi insegura es como hablar en voz alta en un lugar lleno de desconocidos: cualquiera en esa red podría, con las herramientas adecuadas, ver parte de lo que haces si el tráfico no va cifrado.\n\n' +
        'Riesgos de las redes públicas (cafeterías, aeropuertos, universidades): redes "gemelas malignas" (un atacante crea una red con un nombre casi idéntico a la legítima para que te conectes a la suya por error), ataques "man in the middle" (el atacante se posiciona entre tú y el sitio que visitas para interceptar información), y sniffing de tráfico no cifrado en la misma red.\n\n' +
        'Cómo protegerte en redes públicas: evita ingresar contraseñas o hacer trámites bancarios en WiFi público sin protección adicional, usa una VPN confiable si necesitas hacerlo, confirma el nombre exacto de la red con el establecimiento (no asumas cuál es la oficial), y fíjate que los sitios que visitas usen HTTPS (candado en la barra de direcciones).\n\n' +
        'Seguridad en tu red doméstica: cambia la contraseña y el nombre de usuario por defecto de tu router apenas lo instales, usa cifrado WPA3 (o WPA2 si tu router no soporta WPA3 — nunca dejes WEP, es obsoleto e inseguro), crea una red de invitados separada para visitas y dispositivos IoT (cámaras, focos inteligentes), y actualiza el firmware del router periódicamente.\n\n' +
        'Señal de alerta: si tu dispositivo te advierte que "esta red no es segura" o que hay "un problema con el certificado del sitio", no ignores el aviso — son las mismas defensas del sistema tratando de protegerte.\n\n' +
        'Más información técnica: https://www.cisa.gov y https://www.incibe.es',
    },
  ];

  let creadas = 0;
  for (const guia of guias) {
    const categoria = porSlug[guia.categoriaSlug];
    if (!categoria) continue;

    await prisma.publicacion.upsert({
      where: { slug: guia.slug },
      update: {},
      create: {
        tipo: 'ARTICULO',
        titulo: guia.titulo,
        slug: guia.slug,
        resumen: guia.resumen,
        contenido: guia.contenido,
        categoriaId: categoria.id,
        autorId,
        publicado: true,
        publicadoEn: new Date(),
      },
    });
    creadas++;
  }

  console.log(`✅ ${creadas} guías completas de amenazas creadas/actualizadas (una por categoría).`);
}

async function seedGuiasCortas(autorId: string) {
  const categorias = await prisma.categoria.findMany();
  const porSlug = Object.fromEntries(categorias.map((c) => [c.slug, c]));

  let creadas = 0;
  for (const guia of GUIAS_CORTAS) {
    const categoria = porSlug[guia.categoriaSlug];
    if (!categoria) continue;

    await prisma.publicacion.upsert({
      where: { slug: guia.slug },
      update: {},
      create: {
        tipo: 'ARTICULO',
        titulo: guia.titulo,
        slug: guia.slug,
        resumen: guia.resumen,
        contenido: guia.contenido,
        categoriaId: categoria.id,
        autorId,
        publicado: true,
        publicadoEn: new Date(),
      },
    });
    creadas++;
  }

  console.log(`✅ ${creadas} artículos cortos creados/actualizados (20 por cada una de las 7 categorías).`);
}

async function seedRecursos() {
  const categoriaContrasenas = await prisma.categoria.findUnique({ where: { slug: 'contrasenas' } });

  await prisma.recurso.upsert({
    where: { id: 'recurso-ejemplo-1' },
    update: {},
    create: {
      id: 'recurso-ejemplo-1',
      titulo: 'Guía rápida: gestores de contraseñas',
      descripcion: 'Comparativa de opciones gratuitas para empezar a usar un gestor de contraseñas hoy mismo.',
      tipo: 'ENLACE',
      url: 'https://www.eff.org/deeplinks/2016/08/password-tips',
      categoriaId: categoriaContrasenas?.id,
    },
  });

  console.log('✅ Recurso de ejemplo creado.');

  let creados = 0;
  for (const recurso of RECURSOS_ADICIONALES) {
    const categoria = await prisma.categoria.findUnique({ where: { slug: recurso.categoriaSlug } });
    const existente = await prisma.recurso.findUnique({ where: { id: recurso.id } });

    await prisma.recurso.upsert({
      where: { id: recurso.id },
      update: {},
      create: {
        id: recurso.id,
        titulo: recurso.titulo,
        descripcion: recurso.descripcion,
        tipo: recurso.tipo,
        url: recurso.url,
        categoriaId: categoria?.id,
      },
    });

    if (!existente) creados++;
  }

  console.log(`✅ ${creados} recursos adicionales creados (${RECURSOS_ADICIONALES.length} en total).`);
}

async function seedEvaluaciones() {
  const evaluacion = await prisma.evaluacion.upsert({
    where: { id: 'evaluacion-ejemplo-1' },
    update: {},
    create: {
      id: 'evaluacion-ejemplo-1',
      titulo: 'Fundamentos de Ciberseguridad',
      descripcion: 'Una evaluación introductoria sobre phishing, contraseñas y buenas prácticas básicas.',
      puntajeMinimo: 70,
      activa: true,
    },
  });

  const preguntasExistentes = await prisma.pregunta.count({
    where: { evaluacionId: evaluacion.id },
  });
  if (preguntasExistentes > 0) {
    console.log('✅ Evaluación de ejemplo ya tenía preguntas, no se duplican.');
    return;
  }

  const preguntas = [
    {
      enunciado: '¿Cuál de las siguientes es una señal típica de un correo de phishing?',
      opciones: [
        { texto: 'Urgencia para actuar de inmediato y pedir tu contraseña', esCorrecta: true },
        { texto: 'Viene de un remitente que ya conoces hace años', esCorrecta: false },
        { texto: 'No tiene ningún enlace ni adjunto', esCorrecta: false },
        { texto: 'Está escrito completamente en tu idioma nativo', esCorrecta: false },
      ],
    },
    {
      enunciado: '¿Qué hace más segura a una contraseña?',
      opciones: [
        { texto: 'Usar tu fecha de nacimiento', esCorrecta: false },
        { texto: 'Ser larga y única para cada cuenta', esCorrecta: true },
        { texto: 'Usar la misma en todos los sitios para no olvidarla', esCorrecta: false },
        { texto: 'Que sea fácil de adivinar por si la olvidas', esCorrecta: false },
      ],
    },
    {
      enunciado: '¿Para qué sirve la autenticación de dos factores (2FA)?',
      opciones: [
        { texto: 'Para que la app cargue más rápido', esCorrecta: false },
        { texto: 'Para agregar una segunda verificación además de la contraseña', esCorrecta: true },
        { texto: 'Para cambiar tu contraseña automáticamente cada día', esCorrecta: false },
        { texto: 'Para compartir tu cuenta con otra persona de forma segura', esCorrecta: false },
      ],
    },
    {
      enunciado: '¿Qué deberías hacer si recibes un correo pidiendo tu contraseña "para verificar tu cuenta"?',
      opciones: [
        { texto: 'Responder con la contraseña de inmediato', esCorrecta: false },
        { texto: 'No responder ni hacer clic, y reportarlo como sospechoso', esCorrecta: true },
        { texto: 'Reenviarlo a todos tus contactos por si acaso', esCorrecta: false },
        { texto: 'Ingresar la contraseña en el enlace del correo para confirmar', esCorrecta: false },
      ],
    },
    {
      enunciado: '¿Por qué es importante hacer copias de seguridad de tus archivos?',
      opciones: [
        { texto: 'Porque ocupan menos espacio así', esCorrecta: false },
        { texto: 'Para protegerte ante pérdida de datos, fallas o ransomware', esCorrecta: true },
        { texto: 'Porque hacen que tu dispositivo funcione más rápido', esCorrecta: false },
        { texto: 'Solo las necesitan las empresas, no las personas', esCorrecta: false },
      ],
    },
  ];

  for (const [index, pregunta] of preguntas.entries()) {
    await prisma.pregunta.create({
      data: {
        evaluacionId: evaluacion.id,
        enunciado: pregunta.enunciado,
        orden: index + 1,
        opciones: {
          create: pregunta.opciones.map((opcion, i) => ({
            texto: opcion.texto,
            esCorrecta: opcion.esCorrecta,
            orden: i + 1,
          })),
        },
      },
    });
  }

  console.log(`✅ Evaluación de ejemplo creada con ${preguntas.length} preguntas.`);
}

async function seedEvaluacionesCategorias() {
  let evaluacionesCreadas = 0;

  for (const datos of EVALUACIONES_CATEGORIAS) {
    const evaluacion = await prisma.evaluacion.upsert({
      where: { id: datos.id },
      update: {},
      create: {
        id: datos.id,
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        puntajeMinimo: 70,
        activa: true,
      },
    });

    const preguntasExistentes = await prisma.pregunta.count({
      where: { evaluacionId: evaluacion.id },
    });
    if (preguntasExistentes > 0) continue;

    for (const [index, pregunta] of datos.preguntas.entries()) {
      await prisma.pregunta.create({
        data: {
          evaluacionId: evaluacion.id,
          enunciado: pregunta.enunciado,
          orden: index + 1,
          opciones: {
            create: pregunta.opciones.map((opcion, i) => ({
              texto: opcion.texto,
              esCorrecta: opcion.esCorrecta,
              orden: i + 1,
            })),
          },
        },
      });
    }
    evaluacionesCreadas++;
  }

  console.log(`✅ ${evaluacionesCreadas} evaluaciones nuevas creadas (una por categoría de amenaza).`);
}

async function seedGlosario() {
  let creados = 0;

  for (const termino of GLOSARIO_TERMINOS) {
    const existente = await prisma.terminoGlosario.findUnique({
      where: { termino: termino.termino },
    });

    await prisma.terminoGlosario.upsert({
      where: { termino: termino.termino },
      update: {},
      create: termino,
    });

    if (!existente) creados++;
  }

  console.log(`✅ ${creados} términos nuevos del glosario creados (${GLOSARIO_TERMINOS.length} en total).`);
}

async function seedFAQ() {
  await prisma.preguntaFrecuente.upsert({
    where: { id: 'faq-ejemplo-1' },
    update: {},
    create: {
      id: 'faq-ejemplo-1',
      pregunta: '¿Qué debo hacer si sospecho que recibí un correo de phishing?',
      respuesta:
        'No hagas clic en enlaces ni descargues adjuntos. Verifica el remitente, reporta el correo a tu institución y elimínalo. Nunca ingreses tus credenciales desde un enlace recibido por correo.',
      orden: 1,
    },
  });

  console.log('✅ Pregunta frecuente de ejemplo creada.');
}

async function seedConfiguracion() {
  const datosConfiguracion = {
    nombreSitio: 'CiberShield UTLVT',
    descripcionSitio:
      'Plataforma educativa de la UTLVT para la concientización de estudiantes en ciberseguridad.',
    metaTituloDefault: 'CiberShield UTLVT',
    metaDescripcionDefault:
      'Aprende sobre phishing, malware, buenas prácticas y protección de datos.',
  };

  await prisma.configuracion.upsert({
    where: { id: 'singleton' },
    // Se actualiza también en `update` (no solo en `create`) para que el
    // rebranding a "CiberShield UTLVT" se aplique aunque el seed ya se
    // haya ejecutado antes en esta base de datos.
    update: datosConfiguracion,
    create: { id: 'singleton', ...datosConfiguracion },
  });

  console.log('✅ Configuración general del sitio creada/actualizada.');
}

async function seedContenidoInicio() {
  await prisma.contenidoInicio.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      heroTitulo: 'Aprende a protegerte en el mundo digital',
      heroSubtitulo:
        'Recursos, herramientas y evaluaciones para que los estudiantes naveguen internet de forma segura.',
      heroCtaTexto: 'Comenzar a aprender',
      heroCtaUrl: '/sobre-ciberseguridad',
    },
  });

  console.log('✅ Contenido de la página de inicio creado.');
}

async function seedMenus() {
  const itemsHeader = [
    { etiqueta: 'Inicio', url: '/inicio', orden: 1 },
    { etiqueta: 'Glosario', url: '/glosario', orden: 2 },
    { etiqueta: 'Sobre la Ciberseguridad', url: '/sobre-ciberseguridad', orden: 3 },
    { etiqueta: 'Amenazas', url: '/amenazas', orden: 4 },
    { etiqueta: 'Buenas Prácticas', url: '/buenas-practicas', orden: 5 },
    { etiqueta: 'Herramientas', url: '/herramientas', orden: 6 },
    { etiqueta: 'Evaluaciones', url: '/evaluaciones', orden: 7 },
    { etiqueta: 'Recursos', url: '/recursos', orden: 8 },
    { etiqueta: 'Noticias', url: '/noticias', orden: 9 },
  ];

  for (const item of itemsHeader) {
    const existente = await prisma.itemMenu.findFirst({
      where: { etiqueta: item.etiqueta, ubicacion: 'HEADER' },
    });
    if (!existente) {
      await prisma.itemMenu.create({
        data: { ...item, ubicacion: 'HEADER' },
      });
    }
  }

  const itemsFooter = [
    { etiqueta: 'Glosario', url: '/glosario', orden: 1 },
    { etiqueta: 'Preguntas Frecuentes', url: '/faq', orden: 2 },
    { etiqueta: 'Contacto', url: '/contacto', orden: 3 },
    { etiqueta: 'Acerca del Proyecto', url: '/acerca-del-proyecto', orden: 4 },
  ];

  for (const item of itemsFooter) {
    const existente = await prisma.itemMenu.findFirst({
      where: { etiqueta: item.etiqueta, ubicacion: 'FOOTER' },
    });
    if (!existente) {
      await prisma.itemMenu.create({
        data: { ...item, ubicacion: 'FOOTER' },
      });
    }
  }

  console.log('✅ Ítems de menú (header y footer) creados.');
}

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  const { rolAdmin } = await seedRolesYPermisos();
  await seedUsuarioAdmin(rolAdmin.id);
  await seedCategorias();
  await seedGlosario();
  await seedFAQ();
  await seedConfiguracion();
  await seedContenidoInicio();
  await seedMenus();

  const admin = await prisma.user.findUnique({ where: { email: 'admin@ciberseguridad-edu.local' } });
  if (admin) {
    await seedPublicaciones(admin.id);
    await seedGuiasAmenazas(admin.id);
    await seedGuiasCortas(admin.id);
    await seedRecursos();
    await seedEvaluaciones();
    await seedEvaluacionesCategorias();
  }

  console.log('\n🌱 Seed completado correctamente.');
}

main()
  .catch((error) => {
    console.error('❌ Error ejecutando el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

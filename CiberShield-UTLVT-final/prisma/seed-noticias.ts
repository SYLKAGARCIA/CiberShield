/**
 * Noticias REALES de ciberseguridad, clasificadas (nacional, internacional,
 * alerta, tendencia). Cada una resume en palabras propias lo publicado por
 * un medio y enlaza a la fuente original, con la fecha de publicación del
 * medio. Los datos se tomaron de las páginas citadas; no se agregó nada más.
 *
 * Uso:  npx tsx prisma/seed-noticias.ts
 * Es seguro repetirlo: usa el slug como clave y no pisa lo que edites en el admin.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NoticiaSeed {
  slug: string;
  titulo: string;
  resumen: string;
  clasificacion: 'NACIONAL' | 'INTERNACIONAL' | 'ALERTA' | 'TENDENCIA';
  categoriaSlug: string;
  fecha: string; // fecha de publicación según el medio (YYYY-MM-DD)
  contenido: string;
  medio: string;
  url: string;
}

const NOTICIAS: NoticiaSeed[] = [
  {
    slug: 'ecuador-380-millones-intentos-ciberataques-semestre',
    titulo: 'Ecuador registró más de 380 millones de intentos de ciberataques en un semestre',
    resumen: 'El medio El Diario informa que el país enfrentó más de 380 millones de intentos de ciberataques en seis meses y advierte sobre phishing, ransomware y falta de capacitación.',
    clasificacion: 'NACIONAL',
    categoriaSlug: 'phishing',
    fecha: '2026-09-01',
    medio: 'El Diario (Ecuador)',
    url: 'https://www.eldiario.ec/ecuador/ecuador-registro-mas-de-380-millones-de-intentos-de-ciberataques-en-solo-un-semestre-01092026',
    contenido:
      'El Diario (Ecuador) publicó que el país registró más de 380 millones de intentos de ciberataques durante un semestre.\n\n' +
      'La nota recoge la participación de Lorena Chang, gerente de Agencias Novaecuador, en el programa Manavisión Plus, donde habló de los riesgos digitales. Entre las amenazas que se mencionan están el phishing, el ransomware y la falta de prevención tecnológica.\n\n' +
      'También se advierte que las filtraciones de datos y la ausencia de capacitación continua dejan a empresas y ciudadanos expuestos al robo masivo de información.\n\n' +
      '¿Qué puedes hacer tú? Desconfía de mensajes urgentes, no abras enlaces desconocidos y activa la verificación en dos pasos. Revisa los módulos de Phishing y Contraseñas de CiberShield.\n\n',
  },
  {
    slug: 'fraudes-digitales-ecuador-se-sofistican-ia-suplantacion',
    titulo: 'Fraudes digitales en Ecuador se sofistican: más estafas con IA y suplantación de identidad',
    resumen: 'Primicias reporta que el phishing y el smishing siguen siendo las principales amenazas y que los delincuentes usan urgencia e inteligencia artificial para engañar.',
    clasificacion: 'NACIONAL',
    categoriaSlug: 'ingenieria-social',
    fecha: '2026-03-20',
    medio: 'Primicias',
    url: 'https://www.primicias.ec/seguridad/fraudes-digitales-ecuador-118595/',
    contenido:
      'Primicias señala que los fraudes digitales en Ecuador son cada vez más sofisticados: además de los engaños masivos de siempre, ahora aparecen técnicas con inteligencia artificial y suplantación de identidad.\n\n' +
      'Según el reportaje, el phishing y el smishing continúan como las amenazas más frecuentes. Suelen crear urgencia con excusas como cuentas bloqueadas, paquetes por entregar o beneficios exclusivos, para que la persona actúe sin verificar.\n\n' +
      'Los especialistas citados indican que el usuario es el eslabón más vulnerable de la cadena de seguridad. Entre las recomendaciones: evitar mensajes no solicitados, no hacer clic en enlaces sospechosos, activar la autenticación de dos factores y recordar que las entidades financieras no piden información confidencial por correo ni por aplicaciones de mensajería.\n\n',
  },
  {
    slug: 'desmantelado-ransomware-killsec-operacion-internacional',
    titulo: 'Desmantelado el grupo de ransomware KillSec en una operación internacional',
    resumen: 'Europol y Eurojust coordinaron una operación con 3 detenidos y 5 servidores incautados contra un grupo de ransomware que habría afectado a más de 280 víctimas.',
    clasificacion: 'INTERNACIONAL',
    categoriaSlug: 'malware',
    fecha: '2026-10-03',
    medio: 'Escudo Digital',
    url: 'https://www.escudodigital.com/ciberseguridad/desmantelado-ransomware-killsec-operacion-internacional.html',
    contenido:
      'Escudo Digital informa de la operación internacional «KillSwitch», coordinada por Europol y Eurojust, contra el grupo de ransomware KillSec.\n\n' +
      'Según la nota, hubo 3 detenciones, 8 registros y la incautación de 5 servidores con 110 terabytes de datos. La investigación analizó unos 1.000 ataques presuntos, de los cuales alrededor de 500 habrían sido exitosos, con más de 280 víctimas. Algunas habrían pagado rescates cercanos a 500.000 euros en criptomonedas.\n\n' +
      'El grupo robaba información sensible, la publicaba en sitios de filtraciones y exigía pagos. En España, la Guardia Civil y los Mossos d\'Esquadra detuvieron a un menor de 16 años en Alicante. En la investigación participaron 10 países y empresas de seguridad privadas.\n\n' +
      'Lección para estudiantes: haz copias de seguridad, no abras adjuntos desconocidos y mantén tus dispositivos actualizados.\n\n',
  },
  {
    slug: 'ransomware-paraliza-parte-operaciones-keio-japon',
    titulo: 'Un ataque de ransomware afecta parte de las operaciones del mayor operador ferroviario de Japón',
    resumen: 'Keio Corporation sufrió un ataque de ransomware el 26 de septiembre; afectó los pagos de sus hoteles, pero no el servicio de trenes.',
    clasificacion: 'INTERNACIONAL',
    categoriaSlug: 'malware',
    fecha: '2026-10-03',
    medio: 'Escudo Digital',
    url: 'https://escudodigital.com/ciberseguridad/keio-trenes-japon-ataque-ransomware.html',
    contenido:
      'Escudo Digital informa que Keio Corporation, el mayor operador ferroviario de Japón, sufrió un ataque de ransomware el 26 de septiembre, con acceso no autorizado en la madrugada del sábado.\n\n' +
      'Según la nota, el ataque afectó los sistemas de pago de sus hoteles, pero no los servicios de trenes. La empresa opera 69 estaciones y 25 hoteles, y las autoridades investigan un posible robo de datos de clientes y socios.\n\n' +
      'De forma separada, Tokyo Metro informó de otro ciberataque que expuso unas 59.000 direcciones de correo electrónico. No está claro si los incidentes están relacionados, y ningún grupo ha reclamado la autoría. Keio involucró a la policía y a expertos externos.\n\n',
  },
  {
    slug: 'alerta-incibe-sms-falso-seguridad-social',
    titulo: 'Alerta de INCIBE: SMS fraudulentos que suplantan a la Seguridad Social',
    resumen: 'Mensajes de texto falsos ofrecen una ayuda inexistente y llevan a una web falsa para robar datos de tarjetas. Es un ejemplo claro de smishing.',
    clasificacion: 'ALERTA',
    categoriaSlug: 'phishing',
    fecha: '2026-09-14',
    medio: 'Qué!',
    url: 'https://www.que.es/2026/09/14/estafa-seguridad-social-sms-fraudulentos/',
    contenido:
      'El medio Qué! informa de una alerta de INCIBE (España) sobre SMS que suplantan a la Tesorería de la Seguridad Social.\n\n' +
      'El mensaje habla de una actualización pendiente y de una supuesta «ayuda» de 305,85 euros que no existe. Incluye un enlace a una página falsa que imita el portal oficial y pide datos personales y bancarios: número de tarjeta, CVV y fecha de caducidad.\n\n' +
      'Consejos de INCIBE: acceder a los servicios solo desde la aplicación o sede electrónica oficial, no tocar enlaces de SMS y, si ya diste tus datos, contactar a tu banco, guardar capturas como prueba y denunciar.\n\n' +
      'Aunque el caso es de España, la técnica (smishing) se usa en todo el mundo, incluido Ecuador.\n\n',
  },
  {
    slug: 'alerta-incibe-citaciones-judiciales-falsas',
    titulo: 'Alerta de INCIBE: citaciones judiciales falsas que amenazan con detenerte',
    resumen: 'Correos con PDF falsos suplantan a la Policía y a la Guardia Civil para asustar al destinatario y obtener sus datos personales y bancarios.',
    clasificacion: 'ALERTA',
    categoriaSlug: 'ingenieria-social',
    fecha: '2026-07-13',
    medio: 'Red Seguridad',
    url: 'https://www.redseguridad.com/actualidad/phishing-alto-nivel-citaciones-judiciales-falsas-policia-nacional-guardia-civil_20260713.html',
    contenido:
      'Red Seguridad recoge una alerta de INCIBE (España) sobre correos con falsas citaciones judiciales que suplantan a la Policía Nacional, la Guardia Civil y al propio INCIBE.\n\n' +
      'Los mensajes incluyen PDF falsificados con logotipos oficiales y firmas falsas, y amenazan con una detención en 48 a 72 horas si la persona no responde. El objetivo es obtener datos personales y bancarios mediante un supuesto trámite legal.\n\n' +
      'Recomendaciones: verificar el dominio del remitente, no hacer clic en enlaces ni descargar adjuntos, reportar el caso a INCIBE y llamar a su línea de ayuda 017.\n\n' +
      'La clave es reconocer la presión y el miedo como herramientas de la ingeniería social.\n\n',
  },
  {
    slug: 'deepfakes-ia-elevan-riesgo-ciberataques-62-organizaciones',
    titulo: 'Deepfakes y uso de IA elevan el riesgo de ciberataques: 62 % de organizaciones reportó incidentes',
    resumen: 'Vanguardia informa que el 62 % de las organizaciones vivió incidentes con deepfakes o ingeniería social asistida por IA en los últimos 12 meses.',
    clasificacion: 'TENDENCIA',
    categoriaSlug: 'ingenieria-social',
    fecha: '2026-09-22',
    medio: 'Vanguardia',
    url: 'https://www.vanguardia.com/mundo/tecnologia/2026/09/22/deepfakes-y-uso-de-ia-elevan-el-riesgo-de-ciberataques-62-de-organizaciones-reporto-incidentes/',
    contenido:
      'Vanguardia (Colombia) presenta datos sobre cómo la inteligencia artificial está cambiando las amenazas.\n\n' +
      'Según las cifras citadas, el 62 % de las organizaciones tuvo incidentes con deepfakes o ingeniería social asistida por IA en los últimos 12 meses. Además, el 57 % de los empleados admitió ingresar información sensible en herramientas públicas de IA como ChatGPT, Gemini o Copilot, y el 29 % de las organizaciones sufrió ataques dirigidos a sus propios sistemas de IA.\n\n' +
      'El reporte también indica que entre el 8 % y el 13 % de los mensajes enviados a estas herramientas contiene información que supone un riesgo de seguridad. Se citan datos de TELUS Digital y de investigaciones de GMS.\n\n' +
      'Qué hacer: no compartas contraseñas ni datos personales con asistentes de IA y verifica por otro canal cualquier audio o video que pida dinero.\n\n',
  },
  {
    slug: 'tendencias-ciberseguridad-2026-riesgos-ia',
    titulo: 'Tendencias en ciberseguridad para 2026 y el nuevo mapa de riesgos impulsado por la IA',
    resumen: 'InnovacionDigital360 anticipa ataques potenciados por IA, malware dirigido por país y medio de pago, y deepfakes de video en tiempo real cada vez más convincentes.',
    clasificacion: 'TENDENCIA',
    categoriaSlug: 'malware',
    fecha: '2026-02-20',
    medio: 'InnovacionDigital360',
    url: 'https://www.innovaciondigital360.com/cyber-security/tendencias-en-ciberseguridad-para-2026-y-el-nuevo-mapa-de-riesgos-impulsado-por-la-ia/',
    contenido:
      'InnovacionDigital360 resume las tendencias de riesgo que se esperan para 2026.\n\n' +
      'Entre ellas: ataques potenciados por IA que aprovechan la inyección de instrucciones y la contaminación de datos de entrenamiento; delincuentes que pasan de campañas masivas a malware especializado para ciertos países, sistemas bancarios y métodos de pago, en particular la tecnología NFC; y deepfakes de video en tiempo real lo bastante convincentes para engañar tanto a usuarios comunes como a especialistas.\n\n' +
      'El artículo también señala la fragilidad de infraestructuras críticas como cables submarinos, satélites y servicios en la nube, por la concentración global de dependencias.\n\n',
  },
];

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: { name: 'ADMIN' } }, orderBy: { createdAt: 'asc' } });
  if (!admin) throw new Error('No hay un usuario ADMIN. Ejecuta primero: npm run prisma:seed');

  let creadas = 0;
  for (const n of NOTICIAS) {
    const categoria =
      (await prisma.categoria.findUnique({ where: { slug: n.categoriaSlug } })) ?? (await prisma.categoria.findFirst());
    if (!categoria) throw new Error('No hay categorías (módulos). Ejecuta primero: npm run prisma:seed');

    const existente = await prisma.publicacion.findUnique({ where: { slug: n.slug } });
    await prisma.publicacion.upsert({
      where: { slug: n.slug },
      update: {},
      create: {
        tipo: 'NOTICIA',
        titulo: n.titulo,
        slug: n.slug,
        resumen: n.resumen,
        contenido: `${n.contenido}Fuente: ${n.medio}, publicado el ${n.fecha.split('-').reverse().join('/')}.\nNota original: ${n.url}`,
        clasificacion: n.clasificacion,
        publicado: true,
        publicadoEn: new Date(`${n.fecha}T12:00:00-05:00`),
        categoriaId: categoria.id,
        autorId: admin.id,
      },
    });
    if (!existente) creadas++;
  }
  console.log(`✅ ${creadas} noticias nuevas (${NOTICIAS.length} en total).`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());

/**
 * Glosario extendido de términos de ciberseguridad.
 *
 * Definiciones cortas y en lenguaje simple, pensadas para estudiantes
 * que no vienen de un área técnica. Se importa y siembra desde seed.ts
 * (ver seedGlosario).
 */

export interface TerminoGlosarioSeed {
  termino: string;
  letra: string;
  definicion: string;
}

export const GLOSARIO_TERMINOS: TerminoGlosarioSeed[] = [
  {
    termino: 'Adware',
    letra: 'A',
    definicion:
      'Programa que muestra publicidad no deseada en tu dispositivo, muchas veces instalado sin que te des cuenta al descargar otro software.',
  },
  {
    termino: 'Antivirus',
    letra: 'A',
    definicion:
      'Software que detecta, bloquea y elimina virus y otros programas maliciosos antes de que dañen tu equipo o roben tu información.',
  },
  {
    termino: 'Autenticación de dos factores (2FA)',
    letra: 'A',
    definicion:
      'Verificación adicional (un código, una app o una llave física) que se pide además de la contraseña para confirmar que eres tú quien inicia sesión.',
  },
  {
    termino: 'Backdoor (puerta trasera)',
    letra: 'B',
    definicion:
      'Método oculto que permite a alguien acceder a un sistema o dispositivo sin pasar por los controles normales de seguridad.',
  },
  {
    termino: 'Bot',
    letra: 'B',
    definicion:
      'Programa que ejecuta tareas automáticas en internet; puede ser útil (como un chatbot) o malicioso, cuando se usa para atacar o engañar sin control humano.',
  },
  {
    termino: 'Botnet',
    letra: 'B',
    definicion:
      'Red de dispositivos infectados que un atacante controla a distancia sin que sus dueños lo sepan, usada para enviar spam o realizar ataques masivos.',
  },
  {
    termino: 'Certificado digital',
    letra: 'C',
    definicion:
      'Documento electrónico que confirma la identidad de un sitio web o persona y permite establecer conexiones cifradas y confiables.',
  },
  {
    termino: 'Cifrado',
    letra: 'C',
    definicion:
      'Proceso que transforma la información en un código ilegible para quien no tenga la clave correcta, protegiéndola mientras se guarda o se envía.',
  },
  {
    termino: 'Cookie',
    letra: 'C',
    definicion:
      'Pequeño archivo que un sitio web guarda en tu navegador para recordar tus preferencias, tu sesión iniciada o tu actividad de navegación.',
  },
  {
    termino: 'Cortafuegos (firewall)',
    letra: 'C',
    definicion:
      'Sistema que filtra el tráfico de red y bloquea conexiones no autorizadas, actuando como barrera entre tu dispositivo e internet.',
  },
  {
    termino: 'Dato personal',
    letra: 'D',
    definicion:
      'Cualquier información que permite identificar a una persona, como su nombre, cédula, dirección, correo o ubicación.',
  },
  {
    termino: 'Denegación de servicio (DDoS)',
    letra: 'D',
    definicion:
      'Ataque que satura un servidor o sitio web con tráfico falso masivo hasta dejarlo lento o fuera de línea para los usuarios reales.',
  },
  {
    termino: 'Doxing',
    letra: 'D',
    definicion:
      'Práctica de recopilar y publicar información privada de una persona sin su consentimiento, generalmente con intención de hostigarla o exponerla.',
  },
  {
    termino: 'Exploit',
    letra: 'E',
    definicion:
      'Programa o técnica que aprovecha una falla de seguridad en un sistema para tomar control de él, robar datos o instalar malware.',
  },
  {
    termino: 'Firmware',
    letra: 'F',
    definicion:
      'Software básico grabado en un dispositivo (como un router) que controla su funcionamiento y que debe actualizarse para corregir fallas de seguridad.',
  },
  {
    termino: 'Grooming',
    letra: 'G',
    definicion:
      'Estrategia mediante la cual un adulto se gana la confianza de un menor en línea con la intención de abusar de él, muchas veces aislándolo de su entorno.',
  },
  {
    termino: 'Gestor de contraseñas',
    letra: 'G',
    definicion:
      'Aplicación que genera y guarda contraseñas únicas y complejas para cada cuenta, para que no tengas que memorizarlas ni repetirlas.',
  },
  {
    termino: 'Hacker',
    letra: 'H',
    definicion:
      'Persona con conocimientos avanzados de informática. Puede usar sus habilidades para proteger sistemas ("hacker ético") o para atacarlos sin autorización.',
  },
  {
    termino: 'Huella digital',
    letra: 'H',
    definicion:
      'Rastro de información que dejas al usar internet: publicaciones, búsquedas, ubicaciones y datos que quedan asociados a tu identidad en línea.',
  },
  {
    termino: 'HTTPS',
    letra: 'H',
    definicion:
      'Versión segura del protocolo HTTP que cifra la comunicación entre tu navegador y un sitio web, protegiendo los datos que envías.',
  },
  {
    termino: 'Ingeniería social',
    letra: 'I',
    definicion:
      'Conjunto de técnicas de manipulación psicológica usadas para engañar a una persona y que revele información confidencial o realice una acción riesgosa.',
  },
  {
    termino: 'Dirección IP',
    letra: 'I',
    definicion:
      'Número único que identifica a un dispositivo cuando se conecta a internet, similar a una dirección postal en la red.',
  },
  {
    termino: 'Keylogger',
    letra: 'K',
    definicion:
      'Programa malicioso que registra en secreto todo lo que escribes en el teclado, incluyendo contraseñas y datos bancarios.',
  },
  {
    termino: 'Malware',
    letra: 'M',
    definicion:
      'Nombre general para cualquier software creado con intención dañina, como virus, troyanos, spyware o ransomware.',
  },
  {
    termino: 'Autenticación multifactor (MFA)',
    letra: 'M',
    definicion:
      'Sistema de seguridad que exige dos o más pruebas distintas de identidad antes de dar acceso a una cuenta, por ejemplo contraseña más huella digital.',
  },
  {
    termino: 'Ataque de intermediario (Man-in-the-Middle)',
    letra: 'M',
    definicion:
      'Ataque en el que alguien intercepta la comunicación entre dos partes (por ejemplo, en un WiFi público) sin que ninguna se dé cuenta, para robar o alterar los datos.',
  },
  {
    termino: 'Navegación privada',
    letra: 'N',
    definicion:
      'Modo del navegador que no guarda el historial, las cookies ni los datos de formularios al cerrar la ventana, aunque no oculta tu actividad ante tu proveedor de internet.',
  },
  {
    termino: 'Parche de seguridad',
    letra: 'P',
    definicion:
      'Actualización que corrige una vulnerabilidad conocida en un programa o sistema operativo, por lo que es importante instalarla apenas está disponible.',
  },
  {
    termino: 'Phishing',
    letra: 'P',
    definicion:
      'Técnica de engaño que busca obtener información confidencial (contraseñas, datos bancarios) haciéndose pasar por una entidad confiable, generalmente por correo electrónico o sitios web falsos.',
  },
  {
    termino: 'Pharming',
    letra: 'P',
    definicion:
      'Fraude que redirige a un usuario hacia un sitio web falso sin que lo note, incluso al escribir bien la dirección real, para robar sus datos.',
  },
  {
    termino: 'Privacidad digital',
    letra: 'P',
    definicion:
      'Derecho y capacidad de una persona de controlar qué información suya se comparte, con quién y para qué se usa en internet.',
  },
  {
    termino: 'Protocolo',
    letra: 'P',
    definicion:
      'Conjunto de reglas que define cómo se comunican dos dispositivos o programas en una red, por ejemplo cómo viaja la información entre tu celular y un sitio web.',
  },
  {
    termino: 'Ransomware',
    letra: 'R',
    definicion:
      'Malware que bloquea o cifra los archivos de un dispositivo y exige un pago (rescate) para devolver el acceso a la víctima.',
  },
  {
    termino: 'Router',
    letra: 'R',
    definicion:
      'Dispositivo que distribuye la conexión a internet entre varios equipos de una red, ya sea por cable o por WiFi.',
  },
  {
    termino: 'Sextorsión',
    letra: 'S',
    definicion:
      'Chantaje en el que alguien amenaza con difundir imágenes o videos íntimos de una persona si no paga dinero o realiza otras acciones exigidas.',
  },
  {
    termino: 'Smishing',
    letra: 'S',
    definicion:
      'Variante del phishing que se realiza por mensajes de texto (SMS) o aplicaciones de mensajería, en lugar de correo electrónico.',
  },
  {
    termino: 'Spam',
    letra: 'S',
    definicion:
      'Mensajes no solicitados, generalmente publicitarios o fraudulentos, enviados de forma masiva por correo electrónico u otros medios.',
  },
  {
    termino: 'Spyware',
    letra: 'S',
    definicion:
      'Software espía que se instala sin permiso para recopilar información sobre tu actividad, tus contactos o tus datos personales y enviarla a un tercero.',
  },
  {
    termino: 'SSL/TLS',
    letra: 'S',
    definicion:
      'Protocolos que cifran la conexión entre tu dispositivo y un sitio web, base de la seguridad que representa el candado y el "https" del navegador.',
  },
  {
    termino: 'Suplantación de identidad',
    letra: 'S',
    definicion:
      'Acción de hacerse pasar por otra persona o entidad, en línea o fuera de ella, generalmente para engañar, estafar o dañar su reputación.',
  },
  {
    termino: 'Troyano',
    letra: 'T',
    definicion:
      'Malware que se disfraza de programa legítimo o útil para engañar al usuario y hacer que lo instale, abriendo así una puerta de entrada al atacante.',
  },
  {
    termino: 'URL',
    letra: 'U',
    definicion:
      'Dirección web que identifica una página específica en internet, por ejemplo "https://www.ejemplo.com"; conviene revisarla antes de hacer clic o ingresar datos.',
  },
  {
    termino: 'Vishing',
    letra: 'V',
    definicion:
      'Variante del phishing que se realiza por llamada telefónica, en la que el atacante se hace pasar por un banco, empresa o entidad oficial.',
  },
  {
    termino: 'VPN (red privada virtual)',
    letra: 'V',
    definicion:
      'Servicio que cifra tu conexión a internet y oculta tu dirección IP real, útil especialmente al usar redes WiFi públicas.',
  },
  {
    termino: 'Virus informático',
    letra: 'V',
    definicion:
      'Programa malicioso que se adhiere a archivos o programas legítimos y se replica infectando otros archivos o dispositivos.',
  },
  {
    termino: 'Vulnerabilidad',
    letra: 'V',
    definicion:
      'Falla o debilidad en un sistema, programa o dispositivo que puede ser aprovechada por un atacante para acceder o causar daño.',
  },
  {
    termino: 'Whaling',
    letra: 'W',
    definicion:
      'Tipo de phishing dirigido específicamente a altos directivos o personas de alto perfil dentro de una organización, con mensajes muy personalizados.',
  },
  {
    termino: 'WPA2 / WPA3',
    letra: 'W',
    definicion:
      'Protocolos de seguridad que cifran las redes WiFi para evitar que personas no autorizadas se conecten o intercepten el tráfico.',
  },
  {
    termino: 'Vulnerabilidad de día cero (zero-day)',
    letra: 'Z',
    definicion:
      'Falla de seguridad recién descubierta que el fabricante todavía no ha corregido, por lo que puede ser aprovechada por atacantes antes de que exista un parche.',
  },
];

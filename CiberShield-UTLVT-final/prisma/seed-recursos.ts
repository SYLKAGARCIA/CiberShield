/**
 * Recursos externos adicionales para la sección /recursos.
 *
 * Enlaces a sitios oficiales y organizaciones reconocidas de
 * ciberseguridad y seguridad digital, agrupados por categoría.
 * Se importa y siembra desde seed.ts (ver seedRecursos).
 */

export interface RecursoSeed {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'PDF' | 'VIDEO' | 'ENLACE' | 'IMAGEN';
  url: string;
  categoriaSlug: string;
}

export const RECURSOS_ADICIONALES: RecursoSeed[] = [
  {
    id: 'recurso-haveibeenpwned',
    titulo: 'Have I Been Pwned — revisa si tu correo fue filtrado',
    descripcion:
      'Herramienta gratuita que te permite comprobar si tu correo electrónico apareció en alguna filtración de datos conocida.',
    tipo: 'ENLACE',
    url: 'https://haveibeenpwned.com/',
    categoriaSlug: 'contrasenas',
  },
  {
    id: 'recurso-google-security-checkup',
    titulo: 'Revisión de seguridad de tu cuenta de Google',
    descripcion:
      'Asistente oficial de Google para revisar tus contraseñas, dispositivos conectados y configuración de seguridad de la cuenta.',
    tipo: 'ENLACE',
    url: 'https://myaccount.google.com/security-checkup',
    categoriaSlug: 'contrasenas',
  },
  {
    id: 'recurso-cisa-secure-our-world',
    titulo: 'CISA — Secure Our World',
    descripcion:
      'Campaña de la agencia de ciberseguridad de EE. UU. con consejos prácticos para reconocer y evitar intentos de phishing.',
    tipo: 'ENLACE',
    url: 'https://www.cisa.gov/secure-our-world',
    categoriaSlug: 'phishing',
  },
  {
    id: 'recurso-incibe-home',
    titulo: 'INCIBE — Instituto Nacional de Ciberseguridad de España',
    descripcion:
      'Portal oficial con guías, alertas y contenido educativo sobre phishing y otras amenazas, en español y para todo público.',
    tipo: 'ENLACE',
    url: 'https://www.incibe.es/',
    categoriaSlug: 'phishing',
  },
  {
    id: 'recurso-osi-home',
    titulo: 'OSI — Oficina de Seguridad del Internauta',
    descripcion:
      'Iniciativa pública española con recursos sencillos sobre malware, virus y cómo mantener tus dispositivos protegidos.',
    tipo: 'ENLACE',
    url: 'https://www.osi.es/es',
    categoriaSlug: 'malware',
  },
  {
    id: 'recurso-cisa-home',
    titulo: 'CISA — Agencia de Ciberseguridad de EE. UU.',
    descripcion:
      'Avisos oficiales y guías actualizadas sobre malware, ransomware y otras amenazas informáticas.',
    tipo: 'ENLACE',
    url: 'https://www.cisa.gov/',
    categoriaSlug: 'malware',
  },
  {
    id: 'recurso-staysafeonline',
    titulo: 'National Cybersecurity Alliance — Stay Safe Online',
    descripcion:
      'Organización sin fines de lucro dedicada a educar sobre manipulación digital, fraudes y buenas prácticas en línea.',
    tipo: 'ENLACE',
    url: 'https://www.staysafeonline.org/',
    categoriaSlug: 'ingenieria-social',
  },
  {
    id: 'recurso-safety-google',
    titulo: 'Google Safety Center',
    descripcion:
      'Explica de forma simple cómo reconocer intentos de manipulación y engaño en línea, y cómo protegerte de ellos.',
    tipo: 'ENLACE',
    url: 'https://safety.google/',
    categoriaSlug: 'ingenieria-social',
  },
  {
    id: 'recurso-stopbullying',
    titulo: 'StopBullying.gov — Ciberacoso',
    descripcion:
      'Recurso oficial (en inglés) con información sobre ciberacoso, grooming y cómo actuar si ocurre en redes sociales.',
    tipo: 'ENLACE',
    url: 'https://www.stopbullying.gov/',
    categoriaSlug: 'redes-sociales',
  },
  {
    id: 'recurso-commonsense',
    titulo: 'Common Sense Media',
    descripcion:
      'Guías y reseñas para usar redes sociales y aplicaciones de forma más segura, pensadas especialmente para jóvenes.',
    tipo: 'ENLACE',
    url: 'https://www.commonsensemedia.org/',
    categoriaSlug: 'redes-sociales',
  },
  {
    id: 'recurso-wifi-alliance',
    titulo: 'Wi-Fi Alliance',
    descripcion:
      'Organización que define los estándares de seguridad WiFi (como WPA3) y explica cómo proteger tu red inalámbrica.',
    tipo: 'ENLACE',
    url: 'https://www.wi-fi.org/',
    categoriaSlug: 'redes-wifi',
  },
  {
    id: 'recurso-incibe-wifi',
    titulo: 'INCIBE — Guías de seguridad en redes',
    descripcion:
      'Recomendaciones oficiales para configurar tu router y navegar de forma segura en redes WiFi públicas y privadas.',
    tipo: 'ENLACE',
    url: 'https://www.incibe.es/',
    categoriaSlug: 'redes-wifi',
  },
  {
    id: 'recurso-eff',
    titulo: 'Electronic Frontier Foundation (EFF)',
    descripcion:
      'Organización internacional que defiende los derechos digitales; contiene guías sobre privacidad y protección de datos personales.',
    tipo: 'ENLACE',
    url: 'https://www.eff.org/',
    categoriaSlug: 'privacidad-datos',
  },
  {
    id: 'recurso-safety-google-privacidad',
    titulo: 'Google Safety Center — Privacidad',
    descripcion:
      'Explica los controles de privacidad disponibles en los servicios de Google y cómo decidir qué datos compartir.',
    tipo: 'ENLACE',
    url: 'https://safety.google/',
    categoriaSlug: 'privacidad-datos',
  },

  // --- PDFs oficiales (INCIBE / OSI / AEPD) ---
  {
    id: 'recurso-pdf-ciberseguridad-para-todos',
    titulo: 'PDF — La ciberseguridad al alcance de todos',
    descripcion:
      'Guía de INCIBE/OSI que explica cómo crear contraseñas robustas, activar la doble verificación y navegar de forma segura.',
    tipo: 'PDF',
    url: 'https://www.incibe.es/sites/default/files/docs/senior/guia_ciberseguridad_para_todos.pdf',
    categoriaSlug: 'contrasenas',
  },
  {
    id: 'recurso-pdf-guia-fraudes-phishing',
    titulo: 'PDF — Guía de fraudes online: phishing',
    descripcion:
      'Documento de INCIBE que explica cómo funciona el phishing y cómo identificar un correo o sitio web fraudulento.',
    tipo: 'PDF',
    url: 'https://www.incibe.es/sites/default/files/docs/guia_fraudes/guia-fraudes-online-phishing.pdf',
    categoriaSlug: 'phishing',
  },
  {
    id: 'recurso-pdf-guia-ransomware',
    titulo: 'PDF — Ransomware: guía de aproximación',
    descripcion:
      'Explica qué es el ransomware, cómo se propaga y qué medidas tomar para prevenirlo y reaccionar ante un ataque.',
    tipo: 'PDF',
    url: 'https://www.incibe.es/sites/default/files/contenidos/guias/doc/guia_ransomware.pdf',
    categoriaSlug: 'malware',
  },
  {
    id: 'recurso-pdf-guia-ciberataques',
    titulo: 'PDF — Guía de ciberataques: todo lo que debes saber',
    descripcion:
      'Repaso de OSI/INCIBE sobre ingeniería social, phishing, vishing, smishing y otras técnicas de manipulación digital.',
    tipo: 'PDF',
    url: 'https://www.incibe.es/sites/default/files/docs/guia-ciberataques/osi-guia-ciberataques.pdf',
    categoriaSlug: 'ingenieria-social',
  },
  {
    id: 'recurso-pdf-guia-redes-sociales-familias',
    titulo: 'PDF — Guía de seguridad en redes sociales para familias',
    descripcion:
      'Guía de INCIBE (IS4K) sobre por qué las redes sociales enganchan, qué riesgos existen y cómo usarlas con más cuidado.',
    tipo: 'PDF',
    url: 'https://www.incibe.es/sites/default/files/contenidos/materiales/Campanas/is4k-guia-rrss.pdf',
    categoriaSlug: 'redes-sociales',
  },
  {
    id: 'recurso-pdf-guia-seguridad-redes-wifi',
    titulo: 'PDF — Seguridad en redes WiFi',
    descripcion:
      'Guía de INCIBE sobre cómo configurar de forma segura un router y los riesgos de conectarse a redes inalámbricas.',
    tipo: 'PDF',
    url: 'https://www.incibe.es/sites/default/files/contenidos/guias/doc/guia-de-seguridad-en-redes-wifi.pdf',
    categoriaSlug: 'redes-wifi',
  },
  {
    id: 'recurso-pdf-privacidad-seguridad-internet',
    titulo: 'PDF — Privacidad y seguridad en Internet',
    descripcion:
      'Guía conjunta de la Agencia Española de Protección de Datos (AEPD) e INCIBE, con 18 fichas sobre cómo proteger tus datos personales en línea.',
    tipo: 'PDF',
    url: 'https://www.aepd.es/es/documento/guia-privacidad-y-seguridad-en-internet.pdf',
    categoriaSlug: 'privacidad-datos',
  },

  // --- Videos oficiales (serie #AprendeCiberseguridad con INCIBE) ---
  {
    id: 'recurso-video-que-es-phishing',
    titulo: 'Video — ¿Qué es el phishing?',
    descripcion:
      'Video corto de INCIBE que explica de forma sencilla en qué consiste un ataque de phishing.',
    tipo: 'VIDEO',
    url: 'https://www.youtube.com/watch?v=uhzV5-iFb5E',
    categoriaSlug: 'phishing',
  },
  {
    id: 'recurso-video-que-es-malware',
    titulo: 'Video — ¿Qué es el malware?',
    descripcion:
      'Video de INCIBE que explica qué es el malware y por qué se instala sin que el usuario lo note.',
    tipo: 'VIDEO',
    url: 'https://www.youtube.com/watch?v=11Ww1WF0-0s',
    categoriaSlug: 'malware',
  },
  {
    id: 'recurso-video-que-es-ingenieria-social',
    titulo: 'Video — ¿Qué es la ingeniería social?',
    descripcion:
      'Video de INCIBE sobre cómo los ciberdelincuentes usan la manipulación psicológica para ganarse la confianza de la víctima.',
    tipo: 'VIDEO',
    url: 'https://www.youtube.com/watch?v=TentnM1-lg0',
    categoriaSlug: 'ingenieria-social',
  },
  {
    id: 'recurso-video-que-es-cyberbullying',
    titulo: 'Video — ¿Qué es el cyberbullying?',
    descripcion:
      'Video de INCIBE que explica en qué consiste el ciberacoso y cómo se diferencia de otras formas de acoso.',
    tipo: 'VIDEO',
    url: 'https://www.youtube.com/watch?v=KxHpkrSJ6_k',
    categoriaSlug: 'redes-sociales',
  },
];

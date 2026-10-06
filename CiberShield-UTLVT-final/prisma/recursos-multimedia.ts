/**
 * Reemplazo de los recursos tipo ENLACE por VIDEO o PDF, para que se vean
 * dentro de la plataforma (visor integrado). Cada recurso conserva su `id`.
 *
 * Todos los videos y documentos fueron verificados (existen y su título y
 * autor coinciden con lo descrito). Si algún enlace deja de funcionar con
 * el tiempo, corrígelo en Admin → Recursos.
 */
import type { RecursoSeed } from './seed-recursos';

export const REEMPLAZOS: RecursoSeed[] = [
  // ───── Contraseñas y autenticación ─────
  { id: 'recurso-haveibeenpwned', categoriaSlug: 'contrasenas', tipo: 'VIDEO',
    titulo: 'Video: Contraseñas seguras, cómo crearlas para evitar ser hackeado',
    descripcion: 'Video de KAMBIG Centro de Estudios con consejos para crear contraseñas seguras.',
    url: 'https://www.youtube.com/watch?v=Mo_iddRc16k' },
  { id: 'recurso-google-security-checkup', categoriaSlug: 'contrasenas', tipo: 'VIDEO',
    titulo: 'Video: Autenticación en dos pasos con Google Authenticator',
    descripcion: 'Tutorial para activar la verificación en dos pasos y proteger tus cuentas.',
    url: 'https://www.youtube.com/watch?v=jNtIXcjV1L8' },
  { id: 'recurso-ejemplo-1', categoriaSlug: 'contrasenas', tipo: 'PDF',
    titulo: 'Guía: Contraseñas y medidas complementarias (INCIBE)',
    descripcion: 'Guía de INCIBE sobre contraseñas robustas, gestores de contraseñas y doble autenticación.',
    url: 'https://osi.us.es/sites/osi/files/doc/formacion/concienciacion/pildoras/05_documento_formativo_contrasennas.pdf' },

  // ───── Phishing y fraudes digitales ─────
  { id: 'recurso-cisa-secure-our-world', categoriaSlug: 'phishing', tipo: 'VIDEO',
    titulo: 'Video: Estafas digitales aumentan en Ecuador y adoptan distintas modalidades',
    descripcion: 'Reportaje de Televistazo (Ecuavisa) sobre las estafas digitales en Ecuador.',
    url: 'https://www.youtube.com/watch?v=jVlEg6jmIhs' },
  { id: 'recurso-incibe-home', categoriaSlug: 'phishing', tipo: 'PDF',
    titulo: 'Tesis: Delitos informáticos frecuentes en el Ecuador (UPS)',
    descripcion: 'Estudio de la Universidad Politécnica Salesiana (2021) sobre phishing, suplantación de identidad y otros delitos informáticos en Ecuador.',
    url: 'https://dspace.ups.edu.ec/bitstream/123456789/20942/1/UPS-GT003389.pdf' },
  { id: 'recurso-pdf-guia-fraudes-phishing', categoriaSlug: 'phishing', tipo: 'PDF',
    titulo: 'Guía: Phishing, el fraude que intenta robar nuestros datos personales y bancarios (INCIBE)',
    descripcion: 'Qué es el phishing, por qué canales llega y cómo prevenirlo.',
    url: 'https://www.incibe.es/sites/default/files/docs/phishing.pdf' },

  // ───── Malware ─────
  { id: 'recurso-osi-home', categoriaSlug: 'malware', tipo: 'VIDEO',
    titulo: 'Video: Conoce qué es el ransomware y cómo puedes protegerte (ESET)',
    descripcion: 'ESET Latinoamérica explica qué es el ransomware y cómo protegerte.',
    url: 'https://www.youtube.com/watch?v=xpFU4n2iHN8' },
  { id: 'recurso-cisa-home', categoriaSlug: 'malware', tipo: 'PDF',
    titulo: 'Guía: Software malicioso (malware) — Universidad de Jaén',
    descripcion: 'Clasifica virus, troyanos, spyware y ransomware, explica cómo infectan y cómo detectarlos.',
    url: 'https://www.ujaen.es/servicios/sinformatica/sites/servicio_sinformatica/files/uploads/guiaspracticas/Guias%20de%20seguridad%20UJA%20-%203.%20Malware.pdf' },

  // ───── Ingeniería social ─────
  { id: 'recurso-staysafeonline', categoriaSlug: 'ingenieria-social', tipo: 'VIDEO',
    titulo: 'Video: Cómo evitar un ataque de ingeniería social (Google España)',
    descripcion: 'Google España explica cómo reconocer y evitar los ataques de ingeniería social.',
    url: 'https://www.youtube.com/watch?v=eosBzE50H78' },
  { id: 'recurso-safety-google', categoriaSlug: 'ingenieria-social', tipo: 'PDF',
    titulo: 'Manual de ingeniería social: cómo actuar correctamente (ESET)',
    descripcion: 'Manual de ESET sobre phishing, smishing, vishing, extorsión y suplantación de identidad.',
    url: 'https://www.eset.com/fileadmin/ESET/ES/Landings/2022/Progress_Protected/ESET_Social_engineering_handbook_v6_ESP_4.pdf' },

  // ───── Redes sociales ─────
  { id: 'recurso-stopbullying', categoriaSlug: 'redes-sociales', tipo: 'PDF',
    titulo: 'Guía para reportar contenido inapropiado en plataformas digitales (Ecuador)',
    descripcion: 'Guía de la Dirección de Ciberdelitos del Ministerio del Interior de Ecuador: cómo reportar contenido en Facebook, TikTok, WhatsApp, YouTube y más.',
    url: 'https://www.ministeriodelinterior.gob.ec/wp-content/uploads/downloads/2025/06/Guia-para-reportar-contenido-inapropiado-en-Plataformas-Digitales.pdf' },
  { id: 'recurso-commonsense', categoriaSlug: 'redes-sociales', tipo: 'VIDEO',
    titulo: 'Video: Seguridad y privacidad en redes sociales',
    descripcion: 'Video educativo sobre cómo cuidar tu seguridad y privacidad en las redes sociales.',
    url: 'https://www.youtube.com/watch?v=V0pyDsUGWVg' },

  // ───── Seguridad de dispositivos y redes ─────
  { id: 'recurso-wifi-alliance', categoriaSlug: 'redes-wifi', tipo: 'VIDEO',
    titulo: 'Video: Cómo proteger tu red wifi (OSI)',
    descripcion: 'La Oficina de Seguridad del Internauta explica cómo proteger tu red wifi.',
    url: 'https://www.youtube.com/watch?v=nV9zOtHDmcA' },
  { id: 'recurso-incibe-wifi', categoriaSlug: 'redes-wifi', tipo: 'PDF',
    titulo: 'Guía de dispositivos móviles (INCIBE / OSI)',
    descripcion: 'Cómo proteger tu móvil: contraseñas, wifi y conexiones inalámbricas, copias de seguridad y cifrado.',
    url: 'https://www.incibe.es/sites/default/files/docs/guia-seguridad-android.pdf' },

  // ───── Privacidad y protección de datos ─────
  { id: 'recurso-eff', categoriaSlug: 'privacidad-datos', tipo: 'VIDEO',
    titulo: 'Video: Huella digital, qué es y cómo protegerla',
    descripcion: 'Movistar España explica qué es la huella digital y cómo cuidarla.',
    url: 'https://www.youtube.com/watch?v=CUxxV-v0rYg' },
  { id: 'recurso-safety-google-privacidad', categoriaSlug: 'privacidad-datos', tipo: 'VIDEO',
    titulo: 'Video: Huella digital y privacidad (Fundación Movistar)',
    descripcion: 'Fundación Movistar Argentina sobre la huella digital y la privacidad en línea.',
    url: 'https://www.youtube.com/watch?v=xMaajB6WXrA' },
  { id: 'recurso-pdf-privacidad-seguridad-internet', categoriaSlug: 'privacidad-datos', tipo: 'PDF',
    titulo: 'Guía de privacidad y seguridad en Internet (AEPD e INCIBE)',
    descripcion: '18 fichas prácticas sobre privacidad y seguridad: contraseñas, redes sociales, control parental y más.',
    url: 'https://www.aepd.es/guias/guia-privacidad-y-seguridad-en-internet.pdf' },
];

export const REEMPLAZOS_POR_ID = new Map(REEMPLAZOS.map((r) => [r.id, r]));

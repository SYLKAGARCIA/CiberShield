/**
 * 20 artículos cortos por cada una de las 7 categorías de amenazas
 * (140 en total). Cada uno cubre un subtema puntual, en 2-3 párrafos
 * breves, y cierra con un enlace real a una fuente de referencia
 * (INCIBE, CISA, FTC, EFF, Have I Been Pwned, StaySafeOnline, etc).
 *
 * Se importa y se siembra desde seed.ts (ver seedGuiasCortas).
 */

export interface GuiaCorta {
  slug: string;
  categoriaSlug: string;
  titulo: string;
  resumen: string;
  contenido: string;
}

export const GUIAS_CORTAS: GuiaCorta[] = [
  // ===================== CONTRASEÑAS (20) =====================
  {
    slug: 'contrasenas-que-la-hace-fuerte',
    categoriaSlug: 'contrasenas',
    titulo: '¿Qué hace realmente fuerte a una contraseña?',
    resumen: 'La longitud importa más que los símbolos raros.',
    contenido:
      'La fortaleza de una contraseña depende sobre todo de su longitud, no de cuántos símbolos raros tenga. Una frase de 16 caracteres sin relación entre sí es mucho más difícil de adivinar que "P@ss1!" de 6.\\n\\n' +
      'Combina varias palabras al azar en vez de una sola palabra con sustituciones obvias (como "P4ssw0rd"), que los atacantes ya conocen y prueban primero.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-no-reutilizar',
    categoriaSlug: 'contrasenas',
    titulo: 'Por qué nunca debes reutilizar la misma contraseña',
    resumen: 'Un solo sitio filtrado puede comprometer todas tus cuentas.',
    contenido:
      'Si usas la misma contraseña en varios sitios, basta con que uno de ellos sufra una filtración de datos para que un atacante la pruebe automáticamente en tu correo, tus redes y tu banca.\\n\\n' +
      'Esto se llama "credential stuffing" y es una de las técnicas más efectivas porque explota la reutilización, no una falla técnica de cada sitio individual.\\n\\n' +
      'Revisa si tu correo apareció en alguna filtración conocida en https://haveibeenpwned.com',
  },
  {
    slug: 'contrasenas-gestores',
    categoriaSlug: 'contrasenas',
    titulo: 'Gestores de contraseñas: qué son y cómo empezar',
    resumen: 'La herramienta más simple para dejar de reutilizar contraseñas.',
    contenido:
      'Un gestor de contraseñas guarda y genera contraseñas únicas y complejas por cada sitio, para que tú solo tengas que recordar una contraseña maestra.\\n\\n' +
      'Opciones conocidas incluyen Bitwarden (gratuito y de código abierto) o el gestor integrado en tu navegador. Lo importante es usar alguno, no cuál específicamente.\\n\\n' +
      'Guía de buenas prácticas: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-2fa',
    categoriaSlug: 'contrasenas',
    titulo: 'Autenticación de dos factores: tu segunda cerradura',
    resumen: 'Aunque roben tu contraseña, no podrán entrar sin el segundo código.',
    contenido:
      'La autenticación de dos factores (2FA) exige un segundo elemento además de la contraseña: un código temporal, una notificación push o una llave física.\\n\\n' +
      'Actívala primero en tu correo electrónico, ya que suele ser la puerta para recuperar el resto de tus cuentas. Prefiere una app autenticadora sobre SMS cuando sea posible, ya que el SMS puede ser interceptado.\\n\\n' +
      'Más detalles: https://www.cisa.gov',
  },
  {
    slug: 'contrasenas-preguntas-seguridad',
    categoriaSlug: 'contrasenas',
    titulo: 'Por qué las preguntas de seguridad son débiles',
    resumen: 'El nombre de tu mascota puede estar en tus redes sociales.',
    contenido:
      'Preguntas como "¿nombre de tu primera mascota?" o "¿ciudad de nacimiento?" a menudo son respondibles con información que ya publicaste en redes sociales.\\n\\n' +
      'Si un servicio te obliga a usarlas, considera responder con una frase falsa que solo tú conozcas y guárdala en tu gestor de contraseñas, en vez de la respuesta real.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-fuerza-bruta',
    categoriaSlug: 'contrasenas',
    titulo: 'Qué es un ataque de fuerza bruta',
    resumen: 'Probar millones de combinaciones hasta acertar.',
    contenido:
      'Un ataque de fuerza bruta prueba automáticamente combinaciones de caracteres hasta encontrar la contraseña correcta. Mientras más corta sea tu contraseña, menos tiempo le toma a un programa acertarla.\\n\\n' +
      'Una contraseña de 8 caracteres puede descifrarse en horas con hardware moderno; una de 16+ caracteres tomaría siglos con la tecnología actual.\\n\\n' +
      'Fuente técnica: https://owasp.org',
  },
  {
    slug: 'contrasenas-credential-stuffing',
    categoriaSlug: 'contrasenas',
    titulo: 'Qué es el "credential stuffing"',
    resumen: 'Cuando tus datos filtrados en un sitio abren la puerta a otro.',
    contenido:
      'El credential stuffing consiste en tomar listas de correos y contraseñas filtradas de una brecha de datos y probarlas automáticamente en otros sitios populares.\\n\\n' +
      'Funciona precisamente porque mucha gente reutiliza contraseñas. Es una de las razones más fuertes para usar contraseñas únicas por sitio.\\n\\n' +
      'Verifica si tus datos fueron expuestos: https://haveibeenpwned.com',
  },
  {
    slug: 'contrasenas-verificar-filtracion',
    categoriaSlug: 'contrasenas',
    titulo: 'Cómo saber si tu contraseña fue filtrada',
    resumen: 'Una herramienta gratuita te lo dice en segundos.',
    contenido:
      'Existen bases de datos públicas que recopilan filtraciones conocidas y te permiten revisar si tu correo apareció en alguna, sin exponer tu contraseña actual.\\n\\n' +
      'Si tu correo aparece en una filtración, cambia esa contraseña de inmediato en todos los sitios donde la hayas usado.\\n\\n' +
      'Revisa el tuyo en https://haveibeenpwned.com',
  },
  {
    slug: 'contrasenas-dispositivos-compartidos',
    categoriaSlug: 'contrasenas',
    titulo: 'Contraseñas en computadoras compartidas o de laboratorio',
    resumen: 'Lo que debes hacer siempre antes de levantarte de esa silla.',
    contenido:
      'En laboratorios de cómputo o bibliotecas, nunca marques "recordar contraseña" y cierra sesión por completo al terminar, no solo cierres la pestaña del navegador.\\n\\n' +
      'Verifica que no quedaste conectado en el correo institucional, el campus virtual o cualquier red social antes de retirarte.\\n\\n' +
      'Recomendaciones oficiales: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-frases-vs-complejidad',
    categoriaSlug: 'contrasenas',
    titulo: 'Frases de contraseña vs. complejidad forzada',
    resumen: 'Por qué "CaballoAzulLuna7" gana a "Xk#9!qL2".',
    contenido:
      'Muchos sitios obligan a mezclar mayúsculas, números y símbolos, pero esto no siempre produce contraseñas más seguras si el resultado es corto.\\n\\n' +
      'Una frase de varias palabras aleatorias es más larga, más fácil de recordar y, en la práctica, más resistente a ataques automatizados.\\n\\n' +
      'Explicación técnica: https://owasp.org',
  },
  {
    slug: 'contrasenas-cambiarlas-periodicamente',
    categoriaSlug: 'contrasenas',
    titulo: '¿Hay que cambiar la contraseña cada mes? El mito, explicado',
    resumen: 'Cambiarla sin motivo puede ser contraproducente.',
    contenido:
      'Durante años se recomendó cambiar contraseñas cada 30-90 días, pero esto suele llevar a la gente a usar variantes predecibles ("Marzo2024", "Abril2024").\\n\\n' +
      'Hoy se recomienda una contraseña fuerte y única por sitio, y cambiarla solo cuando hay evidencia real de que fue comprometida.\\n\\n' +
      'Más contexto: https://www.cisa.gov',
  },
  {
    slug: 'contrasenas-wifi-domestico',
    categoriaSlug: 'contrasenas',
    titulo: 'La contraseña de tu WiFi también importa',
    resumen: 'No dejes la que viene de fábrica en el router.',
    contenido:
      'Muchos routers vienen con contraseñas por defecto predecibles o impresas en una etiqueta visible. Cámbiala apenas instales el router.\\n\\n' +
      'Usa una contraseña larga y distinta a las que usas en tus cuentas, ya que cualquiera con acceso físico a tu casa podría verla en la etiqueta.\\n\\n' +
      'Guía completa de redes WiFi seguras: /amenazas/redes-wifi',
  },
  {
    slug: 'contrasenas-passkeys',
    categoriaSlug: 'contrasenas',
    titulo: 'Passkeys: el futuro sin contraseñas',
    resumen: 'Un nuevo estándar que reemplaza la contraseña por tu huella o rostro.',
    contenido:
      'Las passkeys son una tecnología que reemplaza la contraseña tradicional con una llave criptográfica asociada a tu dispositivo, desbloqueada con tu huella, rostro o PIN.\\n\\n' +
      'Son resistentes al phishing porque no existe una contraseña que puedas escribir por error en un sitio falso. Cada vez más servicios grandes las están habilitando como opción.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'contrasenas-memorizar-sin-anotar',
    categoriaSlug: 'contrasenas',
    titulo: 'Cómo memorizar contraseñas fuertes sin anotarlas en papel',
    resumen: 'Técnicas simples que no dependen de un post-it.',
    contenido:
      'Una técnica útil es crear una frase memorable y personal (que nadie más asociaría contigo) y convertirla en una regla, por ejemplo tomando la primera letra de cada palabra de una oración larga.\\n\\n' +
      'Para el resto, la solución más práctica sigue siendo un gestor de contraseñas: solo memorizas una contraseña maestra fuerte.\\n\\n' +
      'Más consejos: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-apps-bancarias',
    categoriaSlug: 'contrasenas',
    titulo: 'Contraseñas de apps bancarias: cuidado extra',
    resumen: 'La cuenta que más protección merece.',
    contenido:
      'Usa una contraseña exclusiva para tu banca en línea, que no compartas con ningún otro servicio, y activa siempre la doble autenticación si el banco la ofrece.\\n\\n' +
      'Ningún banco real te pedirá tu clave completa por teléfono, correo o chat. Si alguien lo hace, es un intento de fraude.\\n\\n' +
      'Alertas de fraude: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'contrasenas-errores-comunes',
    categoriaSlug: 'contrasenas',
    titulo: '5 errores comunes al crear contraseñas',
    resumen: 'Patrones que los atacantes prueban primero.',
    contenido:
      'Usar datos personales (cumpleaños, nombre de mascota), sustituciones obvias ("a" por "@"), secuencias de teclado ("qwerty123"), la misma contraseña en todo, y contraseñas cortas son los errores más comunes y más explotados.\\n\\n' +
      'Los atacantes prueban primero listas de contraseñas comunes antes de intentar fuerza bruta pura, así que evitar estos patrones ya te protege de la mayoría de los intentos automatizados.\\n\\n' +
      'Lista de contraseñas más filtradas: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-recuperacion-segura',
    categoriaSlug: 'contrasenas',
    titulo: 'Cómo recuperar el acceso a una cuenta de forma segura',
    resumen: 'Qué revisar antes de hacer clic en "olvidé mi contraseña".',
    contenido:
      'Al recuperar una contraseña, verifica que estás en el sitio oficial (revisa la URL con cuidado) y que el correo de recuperación llegó realmente de esa institución.\\n\\n' +
      'Mantén actualizado tu correo y número de recuperación en cada cuenta importante, para no quedar bloqueado si alguna vez pierdes acceso.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'contrasenas-maestra-gestor',
    categoriaSlug: 'contrasenas',
    titulo: 'Cómo proteger la contraseña maestra de tu gestor',
    resumen: 'Es la única que de verdad debes memorizar bien.',
    contenido:
      'Tu contraseña maestra protege todas las demás, así que debe ser especialmente larga y única, y nunca debe reutilizarse en ningún otro sitio.\\n\\n' +
      'Activa 2FA en tu gestor de contraseñas si lo permite, y guarda una copia de tus códigos de recuperación en un lugar físico seguro, no digital.\\n\\n' +
      'Más consejos: https://www.staysafeonline.org',
  },
  {
    slug: 'contrasenas-ataques-diccionario',
    categoriaSlug: 'contrasenas',
    titulo: 'Ataques de diccionario, explicados simple',
    resumen: 'Por qué "contraseña123" cae en segundos.',
    contenido:
      'Un ataque de diccionario prueba automáticamente palabras comunes, nombres y contraseñas previamente filtradas, en vez de combinaciones aleatorias al azar.\\n\\n' +
      'Por eso las contraseñas basadas en palabras de diccionario (aunque tengan un número al final) son de las primeras en caer. Combinar varias palabras sin relación entre sí es mucho más resistente.\\n\\n' +
      'Más información técnica: https://owasp.org',
  },
  {
    slug: 'contrasenas-correo-institucional',
    categoriaSlug: 'contrasenas',
    titulo: 'Protegiendo tu contraseña del correo institucional',
    resumen: 'La llave de tu vida académica.',
    contenido:
      'Tu correo institucional suele estar vinculado a calificaciones, matrícula y otros trámites — comprometerlo puede tener consecuencias académicas serias, no solo de privacidad.\\n\\n' +
      'Usa una contraseña exclusiva para esta cuenta, activa 2FA si tu universidad lo ofrece, y nunca la compartas con compañeros ni la ingreses en sitios fuera del dominio oficial de tu institución.\\n\\n' +
      'Más información: https://www.incibe.es',
  },

  // ===================== INGENIERÍA SOCIAL (20) =====================
  {
    slug: 'ingsocial-que-es',
    categoriaSlug: 'ingenieria-social',
    titulo: '¿Qué es la ingeniería social?',
    resumen: 'No atacan tu computadora, te atacan a ti.',
    contenido:
      'La ingeniería social es la manipulación psicológica de una persona para que revele información, dé acceso o realice una acción que normalmente no haría.\\n\\n' +
      'No requiere conocimientos técnicos avanzados: se apoya en la confianza, el miedo, la urgencia o la curiosidad humana, que son mucho más fáciles de explotar que un sistema bien protegido.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-pretexting',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Pretexting: la mentira creíble',
    resumen: 'Cuando el atacante inventa una identidad para ganarse tu confianza.',
    contenido:
      'El pretexting consiste en construir una historia o identidad falsa creíble (soporte técnico, un compañero, un proveedor) para obtener información o acceso.\\n\\n' +
      'Suele incluir detalles específicos que dan credibilidad, obtenidos previamente investigando a la víctima en redes sociales u otras fuentes públicas.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-baiting',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Baiting: el cebo digital',
    resumen: 'Un USB "olvidado" puede ser una trampa.',
    contenido:
      'El baiting ofrece algo tentador (un archivo, un USB "perdido" en el pasillo, una descarga gratuita) para que la víctima misma ejecute el malware por curiosidad.\\n\\n' +
      'Nunca conectes un dispositivo USB desconocido a tu computadora, ni descargues software "gratis" de fuentes no oficiales que prometen algo demasiado bueno.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'ingsocial-vishing',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Vishing: engaños por llamada telefónica',
    resumen: 'La voz al otro lado puede no ser quien dice ser.',
    contenido:
      'El vishing usa llamadas telefónicas para hacerse pasar por un banco, una entidad oficial o soporte técnico, y así obtener contraseñas, códigos o datos personales.\\n\\n' +
      'Si recibes una llamada así, cuelga y llama tú directamente al número oficial de la institución (no al que te dieron) para verificar antes de dar cualquier dato.\\n\\n' +
      'Alertas de fraude telefónico: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'ingsocial-quid-pro-quo',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Quid pro quo: "te ayudo a cambio de..."',
    resumen: 'Cuando la "ayuda técnica gratis" tiene un precio oculto.',
    contenido:
      'En este engaño, el atacante ofrece algo de valor (soporte técnico, un premio, un favor) a cambio de que la víctima entregue información o acceso.\\n\\n' +
      'Desconfía de quien te ofrece resolver un problema que no reportaste, especialmente si termina pidiéndote tu contraseña o acceso remoto a tu equipo.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-shoulder-surfing',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Shoulder surfing: espiar por encima del hombro',
    resumen: 'El método más simple y menos digital de robar una clave.',
    contenido:
      'Consiste literalmente en observar a alguien mientras escribe su PIN, contraseña o código, en lugares públicos como cajeros, bibliotecas o transporte.\\n\\n' +
      'Cubre el teclado con la mano al ingresar claves en público, y mantén distancia de otras personas al hacerlo en un cajero automático o punto de venta.\\n\\n' +
      'Más consejos: https://www.staysafeonline.org',
  },
  {
    slug: 'ingsocial-tailgating',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Tailgating: colarse físicamente sin credencial',
    resumen: 'Cuando "ser amable" abre una puerta que no debería abrirse.',
    contenido:
      'El tailgating ocurre cuando alguien sin autorización entra a un área restringida simplemente siguiendo de cerca a una persona autorizada que sostiene la puerta.\\n\\n' +
      'En entornos universitarios o laborales, es válido pedir identificación a alguien desconocido antes de dejarlo pasar, aunque parezca incómodo.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-urgencia',
    categoriaSlug: 'ingenieria-social',
    titulo: 'El poder de la urgencia en los engaños',
    resumen: 'La prisa es la principal herramienta del atacante.',
    contenido:
      'Casi todo engaño de ingeniería social incluye una sensación artificial de urgencia: "tu cuenta será bloqueada en 1 hora", "responde ahora o pierdes tu beca".\\n\\n' +
      'Cuando algo te presiona a actuar de inmediato sin pensar, es la señal más clara de que debes detenerte y verificar por otro canal antes de hacer nada.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'ingsocial-suplantacion-companeros',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Suplantación de identidad entre compañeros de clase',
    resumen: 'Un mensaje de "un compañero" pidiendo dinero urgente.',
    contenido:
      'Es común que un atacante clone la cuenta de un compañero o profesor para pedir dinero, tareas o datos personales a nombre de esa persona.\\n\\n' +
      'Si recibes una petición inusual de alguien conocido, verifica por otro canal (una llamada, un mensaje directo distinto) antes de acceder.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-linkedin',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Ingeniería social en LinkedIn y redes profesionales',
    resumen: 'Ofertas de trabajo falsas que solo buscan tus datos.',
    contenido:
      'Perfiles falsos de reclutadores contactan con ofertas de empleo demasiado buenas para pedir datos personales, una "cuota de inscripción" o instalar software.\\n\\n' +
      'Verifica siempre la empresa real detrás de una oferta, y desconfía de procesos de selección que nunca incluyen una entrevista real por videollamada.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'ingsocial-soporte-tecnico-falso',
    categoriaSlug: 'ingenieria-social',
    titulo: 'La estafa del "soporte técnico" falso',
    resumen: 'Un mensaje de error que en realidad es el engaño.',
    contenido:
      'Ventanas emergentes que dicen "tu computadora está infectada, llama a este número" son casi siempre una estafa diseñada para que llames y entregues acceso remoto o pagues por un "arreglo" falso.\\n\\n' +
      'El soporte técnico legítimo nunca te contacta primero mediante una ventana emergente alarmante en el navegador.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'ingsocial-osint',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Cómo los estafadores investigan a sus víctimas',
    resumen: 'Todo lo que publicas puede usarse para hacer el engaño más creíble.',
    contenido:
      'Muchos atacantes usan "OSINT" (inteligencia de fuentes abiertas): recopilan información pública de tus redes sociales para personalizar un engaño y hacerlo más convincente.\\n\\n' +
      'Revisar y limitar qué información compartes públicamente (dónde estudias, con quién, tu rutina) reduce el material disponible para este tipo de ataques.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'ingsocial-autoridad',
    categoriaSlug: 'ingenieria-social',
    titulo: 'El principio de autoridad en las estafas',
    resumen: 'Por qué obedecemos a quien "parece" tener poder.',
    contenido:
      'Los atacantes suelen hacerse pasar por figuras de autoridad (un director, la policía, un abogado) porque las personas tendemos a obedecer instrucciones de quien parece tener poder, sin cuestionar.\\n\\n' +
      'Verifica siempre la identidad real de quien dice representar autoridad, especialmente si te pide algo inusual o urgente.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-reciprocidad',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Reciprocidad: por qué desconfiar de los "regalos"',
    resumen: 'Sentirte en deuda te hace bajar la guardia.',
    contenido:
      'La reciprocidad es un principio psicológico: si alguien te da algo (un favor, un regalo), sientes la necesidad de corresponder, incluso entregando información que normalmente no darías.\\n\\n' +
      'Los atacantes explotan esto ofreciendo "ayuda" o "premios" no solicitados antes de pedir algo a cambio. Un regalo inesperado que exige algo de vuelta es una señal de alerta.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'ingsocial-llamadas-banco',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Ingeniería social en llamadas que dicen ser de tu banco',
    resumen: 'Ningún banco te pedirá tu clave completa por teléfono.',
    contenido:
      'Un patrón muy común: te llaman diciendo que detectaron "movimientos sospechosos" en tu cuenta y te piden verificar tu clave o un código de seguridad para "protegerte".\\n\\n' +
      'Esa es exactamente la información que un banco real nunca te pediría por teléfono. Cuelga y llama tú al número oficial que aparece en tu tarjeta o app.\\n\\n' +
      'Alertas de fraude: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'ingsocial-verificar-identidad',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Cómo verificar una identidad antes de confiar',
    resumen: 'Tres pasos simples antes de dar información sensible.',
    contenido:
      'Antes de compartir información sensible, pregúntate: ¿esta persona/institución me contactó por un canal inusual?, ¿me está presionando para actuar rápido?, ¿puedo verificar esto por otro medio?\\n\\n' +
      'Si la respuesta a cualquiera es "sí, es raro", contacta directamente a la institución usando datos que tú ya tenías (no los que te acaban de dar) antes de continuar.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-error-humano',
    categoriaSlug: 'ingenieria-social',
    titulo: 'El error humano como puerta de entrada principal',
    resumen: 'La mayoría de brechas de seguridad empiezan con una persona, no un sistema.',
    contenido:
      'Estudios de la industria muestran que un porcentaje muy alto de incidentes de seguridad comienzan con un error humano: un clic apresurado, una contraseña compartida, una verificación que se saltó.\\n\\n' +
      'Esto no es un defecto personal: significa que la capacitación constante y la cultura de "está bien preguntar antes de actuar" son tan importantes como cualquier herramienta técnica.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'ingsocial-estudiantes-nuevos',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Por qué los estudiantes nuevos son un blanco frecuente',
    resumen: 'No conocer aún los procesos internos te hace más vulnerable.',
    contenido:
      'Los estudiantes de primer semestre suelen no conocer todavía los canales oficiales de comunicación de la universidad, lo que los hace más susceptibles a mensajes falsos sobre matrícula, becas o pagos.\\n\\n' +
      'Guarda desde el inicio los canales oficiales verificados (sitio web, correo institucional real, redes verificadas) para comparar cualquier mensaje sospechoso.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'ingsocial-como-reportar',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Cómo reportar un intento de ingeniería social',
    resumen: 'Reportarlo protege a otros, no solo a ti.',
    contenido:
      'Si identificas un intento de ingeniería social, repórtalo a la institución que fue suplantada (tu universidad, banco o empresa) y, si hubo pérdida de dinero o datos, considera un reporte formal ante las autoridades.\\n\\n' +
      'Reportar ayuda a que otros no caigan en el mismo engaño y permite a las instituciones alertar a su comunidad a tiempo.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'ingsocial-simulacros-empresas',
    categoriaSlug: 'ingenieria-social',
    titulo: 'Qué son los simulacros de ingeniería social',
    resumen: 'Cómo las organizaciones entrenan a su gente para no caer.',
    contenido:
      'Muchas organizaciones realizan simulacros controlados (por ejemplo, correos de phishing simulados) para medir qué tan preparado está su equipo y reforzar la capacitación donde haga falta.\\n\\n' +
      'No es para "atrapar" a nadie, sino para convertir el error en aprendizaje antes de que ocurra un ataque real.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },

  // ===================== MALWARE (20) =====================
  {
    slug: 'malware-que-es-virus',
    categoriaSlug: 'malware',
    titulo: 'Qué es un virus informático',
    resumen: 'El malware más antiguo y aún vigente.',
    contenido:
      'Un virus informático es un programa que se adjunta a archivos legítimos y se replica cuando esos archivos se ejecutan, propagándose de un equipo a otro.\\n\\n' +
      'A diferencia de otros tipos de malware, necesita que un archivo infectado se ejecute para activarse; por eso evitar fuentes de descarga no confiables lo previene en gran medida.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-troyanos',
    categoriaSlug: 'malware',
    titulo: 'Troyanos: el caballo de Troya digital',
    resumen: 'Software que parece útil pero esconde una carga maliciosa.',
    contenido:
      'Un troyano se disfraza de programa legítimo o útil (un juego, una herramienta gratuita) pero ejecuta acciones maliciosas ocultas al instalarse, como robar datos o abrir una puerta trasera.\\n\\n' +
      'Instala software únicamente desde tiendas oficiales o el sitio verificado del fabricante, nunca desde enlaces de descarga de terceros no verificados.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'malware-ransomware',
    categoriaSlug: 'malware',
    titulo: 'Ransomware: el secuestro de tus archivos',
    resumen: 'Cifra tus datos y exige un pago para "liberarlos".',
    contenido:
      'El ransomware cifra tus archivos y muestra un mensaje exigiendo un pago (usualmente en criptomonedas) para supuestamente devolverte el acceso, sin garantía real de que lo haga.\\n\\n' +
      'La mejor defensa no es pagar, sino prevenir: mantén copias de seguridad periódicas y desconectadas de tus archivos importantes, para poder restaurarlos sin depender del atacante.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-spyware',
    categoriaSlug: 'malware',
    titulo: 'Spyware: espionaje silencioso',
    resumen: 'Recopila tu actividad sin que lo notes.',
    contenido:
      'El spyware se instala sin consentimiento y recopila información sobre tu actividad: sitios que visitas, teclas que presionas, incluso acceso a tu cámara o micrófono.\\n\\n' +
      'Revisa periódicamente los permisos de tus aplicaciones y desconfía de software gratuito de fuentes desconocidas que promete demasiado por nada a cambio.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'malware-adware',
    categoriaSlug: 'malware',
    titulo: 'Adware: cuando la publicidad se vuelve invasiva',
    resumen: 'Ventanas emergentes constantes pueden ser síntoma de infección.',
    contenido:
      'El adware satura tu dispositivo con publicidad no deseada y, en sus formas más agresivas, rastrea tu navegación para vender esos datos a terceros.\\n\\n' +
      'Revisa las extensiones instaladas en tu navegador periódicamente y elimina las que no reconozcas o ya no uses.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'malware-gusanos',
    categoriaSlug: 'malware',
    titulo: 'Gusanos informáticos: se propagan solos',
    resumen: 'A diferencia de un virus, no necesitan que abras nada.',
    contenido:
      'Un gusano (worm) se propaga automáticamente por una red explotando vulnerabilidades, sin necesitar que un usuario ejecute un archivo infectado.\\n\\n' +
      'Mantener el sistema operativo y el software actualizados cierra las vulnerabilidades que los gusanos suelen explotar para propagarse.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-rootkits',
    categoriaSlug: 'malware',
    titulo: 'Rootkits: ocultos en lo más profundo del sistema',
    resumen: 'Diseñados específicamente para no ser detectados.',
    contenido:
      'Un rootkit se instala a bajo nivel en el sistema operativo, ocultando su presencia y la de otro malware, lo que lo hace especialmente difícil de detectar con un antivirus convencional.\\n\\n' +
      'Si sospechas de uno, herramientas especializadas de análisis o la reinstalación completa del sistema suelen ser la única solución confiable.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-keyloggers',
    categoriaSlug: 'malware',
    titulo: 'Keyloggers: registrando cada tecla que presionas',
    resumen: 'Una de las formas más directas de robar contraseñas.',
    contenido:
      'Un keylogger registra todo lo que escribes, incluyendo contraseñas y datos bancarios, y envía esa información al atacante sin que lo notes.\\n\\n' +
      'Un antivirus actualizado con protección en tiempo real, junto con evitar software de fuentes no confiables, es la principal defensa contra este tipo de malware.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'malware-usb',
    categoriaSlug: 'malware',
    titulo: 'Cómo se propaga el malware por USB',
    resumen: 'Ese USB "encontrado" en el pasillo puede ser una trampa.',
    contenido:
      'Algunos malware están diseñados para copiarse automáticamente a cualquier memoria USB conectada y ejecutarse en el próximo equipo donde se inserte esa memoria.\\n\\n' +
      'Nunca conectes un USB de origen desconocido a tu computadora, y considera desactivar la ejecución automática de dispositivos externos.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-descargas-pirata',
    categoriaSlug: 'malware',
    titulo: 'El riesgo real de las descargas piratas y "cracks"',
    resumen: 'El "ahorro" puede costarte mucho más caro.',
    contenido:
      'Los sitios de software pirata y cracks son una de las fuentes más comunes de malware, ya que no hay forma de verificar qué se modificó realmente en ese archivo antes de ejecutarlo.\\n\\n' +
      'Usa siempre fuentes oficiales, y si el costo es un problema, busca alternativas legítimas gratuitas — suelen ser más seguras que una versión "craqueada" de software de pago.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'malware-extensiones-navegador',
    categoriaSlug: 'malware',
    titulo: 'Extensiones de navegador maliciosas',
    resumen: 'Ese complemento "útil" puede estar leyendo todo lo que navegas.',
    contenido:
      'Algunas extensiones de navegador, incluso publicadas en tiendas oficiales, resultan tener permisos excesivos que les permiten leer y modificar todo lo que visitas.\\n\\n' +
      'Instala solo extensiones necesarias, revisa sus permisos antes de aceptar, y elimina periódicamente las que ya no uses.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'malware-apps-moviles-falsas',
    categoriaSlug: 'malware',
    titulo: 'Malware en aplicaciones móviles falsas',
    resumen: 'Apps que imitan a otras populares para infectar tu celular.',
    contenido:
      'Existen aplicaciones falsas que imitan el nombre e ícono de apps populares para engañar a los usuarios y hacer que las instalen desde tiendas no oficiales.\\n\\n' +
      'Descarga apps únicamente desde la tienda oficial de tu sistema operativo, revisa el nombre real del desarrollador y desconfía de apps con muy pocas descargas pero calificaciones perfectas.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'malware-como-funciona-antivirus',
    categoriaSlug: 'malware',
    titulo: 'Cómo funciona realmente un antivirus',
    resumen: 'No es magia, es comparación de patrones y comportamiento.',
    contenido:
      'Un antivirus compara archivos contra una base de datos de amenazas conocidas (firmas) y también analiza comportamientos sospechosos para detectar amenazas nuevas.\\n\\n' +
      'Por eso mantenerlo actualizado es tan importante: una base de firmas desactualizada no reconoce las amenazas más recientes.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-senales-infeccion',
    categoriaSlug: 'malware',
    titulo: 'Señales de que tu equipo podría estar infectado',
    resumen: 'Lentitud repentina no siempre es solo "la computadora vieja".',
    contenido:
      'Lentitud repentina e inexplicable, ventanas emergentes constantes, programas que se abren solos, la cámara o el micrófono activándose sin usarlos, o la batería agotándose muy rápido son señales de alerta.\\n\\n' +
      'Si notas varias de estas señales a la vez, ejecuta un análisis completo con tu antivirus lo antes posible.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'malware-que-hacer-ransomware',
    categoriaSlug: 'malware',
    titulo: 'Qué hacer si tienes ransomware',
    resumen: 'Los pasos correctos, en orden, sin pagar.',
    contenido:
      'Desconecta el equipo de internet y de cualquier red inmediatamente para evitar que se propague a otros dispositivos.\\n\\n' +
      'No pagues el rescate: no hay garantía de recuperar tus archivos, y financia más ataques. Busca ayuda de un profesional en seguridad y restaura desde tu copia de seguridad más reciente.\\n\\n' +
      'Guía oficial de respuesta: https://www.cisa.gov',
  },
  {
    slug: 'malware-backups-defensa',
    categoriaSlug: 'malware',
    titulo: 'Backups: tu defensa real contra el ransomware',
    resumen: 'La única solución que no depende del atacante.',
    contenido:
      'Un backup periódico y desconectado (en un disco externo o la nube, no siempre conectado a tu equipo) es la diferencia entre perder tus archivos para siempre o simplemente restaurarlos.\\n\\n' +
      'Sigue la regla básica: al menos 3 copias, en 2 medios distintos, con 1 copia fuera de tu ubicación física principal.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-actualizaciones-software',
    categoriaSlug: 'malware',
    titulo: 'Por qué las actualizaciones de software son seguridad, no solo funciones nuevas',
    resumen: 'Cada actualización cierra puertas que el malware podría usar.',
    contenido:
      'Las actualizaciones de seguridad corrigen vulnerabilidades específicas que ya han sido identificadas y que el malware puede explotar activamente.\\n\\n' +
      'Posponer actualizaciones deja esas puertas abiertas más tiempo del necesario. Configura las actualizaciones automáticas siempre que sea posible.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-fileless',
    categoriaSlug: 'malware',
    titulo: 'Malware sin archivo (fileless malware)',
    resumen: 'Una amenaza más difícil de detectar porque no deja rastro en disco.',
    contenido:
      'El malware sin archivo opera directamente en la memoria del sistema, usando herramientas legítimas ya instaladas, sin dejar un archivo tradicional que un antivirus pueda escanear.\\n\\n' +
      'Esta técnica es más común en ataques dirigidos que en amenazas masivas, y requiere soluciones de seguridad más avanzadas basadas en comportamiento, no solo en firmas.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'malware-cryptojacking',
    categoriaSlug: 'malware',
    titulo: 'Cryptojacking: minería oculta de criptomonedas',
    resumen: 'Tu equipo trabajando para otra persona sin que lo sepas.',
    contenido:
      'El cryptojacking usa el procesador de tu dispositivo sin permiso para minar criptomonedas para el atacante, lo que se nota en lentitud extrema, sobrecalentamiento y batería que se agota rápido.\\n\\n' +
      'Puede ocurrir por malware instalado o simplemente por visitar un sitio web comprometido con este tipo de script activo.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'malware-redes-universitarias',
    categoriaSlug: 'malware',
    titulo: 'Malware en redes universitarias compartidas',
    resumen: 'Cuidado extra al conectar tu equipo en laboratorios o WiFi del campus.',
    contenido:
      'Las redes compartidas de laboratorios o WiFi universitario pueden tener otros equipos infectados en la misma red, lo que aumenta el riesgo de propagación de ciertos tipos de malware.\\n\\n' +
      'Mantén tu antivirus y firewall activos siempre que uses redes compartidas, y evita conectar dispositivos personales directamente a equipos de laboratorio.\\n\\n' +
      'Más información: https://www.incibe.es',
  },

  // ===================== PHISHING (20) =====================
  {
    slug: 'phishing-que-es',
    categoriaSlug: 'phishing',
    titulo: '¿Qué es el phishing, exactamente?',
    resumen: 'El engaño más común en internet, explicado desde cero.',
    contenido:
      'El phishing es un intento de engañarte para que reveles información sensible haciéndose pasar por una entidad confiable: tu banco, universidad, red social o servicio de paquetería.\\n\\n' +
      'Casi siempre incluye un enlace a una página falsa que imita a la real, diseñada para robar lo que escribas ahí.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-identificar-correo-falso',
    categoriaSlug: 'phishing',
    titulo: 'Cómo identificar un correo de phishing',
    resumen: 'Cinco detalles que casi siempre delatan el engaño.',
    contenido:
      'Revisa el dominio real del remitente (no solo el nombre visible), pasa el cursor sobre los enlaces antes de hacer clic, y fíjate en errores de ortografía o un diseño ligeramente distinto al oficial.\\n\\n' +
      'Desconfía de mensajes que exigen acción inmediata bajo amenaza — la urgencia artificial es la señal más consistente de un intento de phishing.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-smishing',
    categoriaSlug: 'phishing',
    titulo: 'Smishing: phishing por mensaje de texto',
    resumen: 'El mismo engaño, ahora en tu SMS o WhatsApp.',
    contenido:
      'El smishing usa mensajes SMS con enlaces acortados o alarmantes, simulando ser de un banco, una empresa de paquetería o una entidad de gobierno.\\n\\n' +
      'No toques enlaces de SMS inesperados; entra directamente al sitio o app oficial escribiendo la dirección tú mismo si necesitas verificar algo.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-vishing',
    categoriaSlug: 'phishing',
    titulo: 'Vishing: cuando el phishing llega por llamada',
    resumen: 'Una voz "oficial" que en realidad no lo es.',
    contenido:
      'El vishing combina las técnicas del phishing con una llamada telefónica, a menudo usando voces grabadas o personas que se hacen pasar por representantes oficiales.\\n\\n' +
      'Cuelga y llama tú al número oficial que ya conocías, nunca al que te den durante esa misma llamada.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-spear',
    categoriaSlug: 'phishing',
    titulo: 'Spear phishing: cuando el ataque es solo para ti',
    resumen: 'Personalizado con datos reales para ser más convincente.',
    contenido:
      'A diferencia del phishing masivo, el spear phishing está dirigido a una persona específica, usando información real sobre ella (nombre, cargo, proyectos) para parecer legítimo.\\n\\n' +
      'Es más difícil de detectar precisamente por su personalización; verificar por un canal alterno sigue siendo la defensa más efectiva.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'phishing-whaling',
    categoriaSlug: 'phishing',
    titulo: 'Whaling: phishing dirigido a altos cargos',
    resumen: 'El "spear phishing" apuntado a quien tiene más poder de decisión.',
    contenido:
      'El whaling es un spear phishing dirigido específicamente a ejecutivos o cargos de alta autoridad, buscando autorizar transferencias grandes o acceder a información estratégica.\\n\\n' +
      'Las organizaciones suelen mitigarlo exigiendo doble verificación para cualquier transferencia o cambio importante, sin importar quién lo solicite.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'phishing-clonacion-sitios',
    categoriaSlug: 'phishing',
    titulo: 'Clonación de sitios web: cuando la copia es casi perfecta',
    resumen: 'Un login idéntico al real, hasta en el logo.',
    contenido:
      'Los atacantes pueden clonar visualmente un sitio de login casi a la perfección, cambiando solo la URL real donde se envían tus datos.\\n\\n' +
      'Revisa siempre la URL completa en la barra de direcciones, no solo si "se ve" como el sitio correcto, y verifica que tenga el candado de conexión segura (HTTPS).\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-enlaces-acortados',
    categoriaSlug: 'phishing',
    titulo: 'El riesgo de los enlaces acortados',
    resumen: 'No puedes ver a dónde llevan hasta que haces clic.',
    contenido:
      'Los acortadores de URL (bit.ly y similares) ocultan el destino real de un enlace, lo que los hace útiles para atacantes que quieren disfrazar un link malicioso.\\n\\n' +
      'Usa un servicio de "expandir enlaces" antes de hacer clic en uno acortado que recibiste de una fuente no verificada, o simplemente evita hacer clic si tienes dudas.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-redes-sociales',
    categoriaSlug: 'phishing',
    titulo: 'Phishing en redes sociales',
    resumen: 'No solo llega por correo: también por mensaje directo.',
    contenido:
      'El phishing en redes sociales suele llegar como un mensaje directo de una cuenta hackeada de alguien conocido, o un anuncio falso ofreciendo premios o descuentos irreales.\\n\\n' +
      'Verifica con la persona real (por otro medio) si un mensaje suyo te parece extraño antes de hacer clic en cualquier enlace que te envíe.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'phishing-academico',
    categoriaSlug: 'phishing',
    titulo: 'Phishing académico: falsas becas y matrículas',
    resumen: 'Campañas dirigidas específicamente a estudiantes.',
    contenido:
      'Es común recibir correos falsos sobre becas, devoluciones de matrícula o "problemas con tu cuenta estudiantil" que en realidad buscan robar tus credenciales institucionales.\\n\\n' +
      'Verifica cualquier comunicado de este tipo directamente en el portal oficial de tu universidad, nunca a través del enlace del correo recibido.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-verificar-remitente',
    categoriaSlug: 'phishing',
    titulo: 'Cómo verificar realmente el remitente de un correo',
    resumen: 'El nombre que se muestra no siempre es la dirección real.',
    contenido:
      'La mayoría de clientes de correo muestran solo un nombre visible, que puede decir "Universidad UTLVT" aunque la dirección real detrás sea completamente distinta y sospechosa.\\n\\n' +
      'Haz clic en el nombre del remitente o revisa los detalles del correo para ver la dirección completa antes de confiar en el contenido del mensaje.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-https-certificados',
    categoriaSlug: 'phishing',
    titulo: 'Certificados HTTPS: qué garantizan y qué no',
    resumen: 'El candado no significa que el sitio sea legítimo.',
    contenido:
      'El candado HTTPS solo indica que la conexión entre tú y el sitio está cifrada, no que el sitio sea confiable — los sitios de phishing también pueden tener HTTPS hoy en día.\\n\\n' +
      'Combina la verificación del candado con revisar la URL exacta del sitio; ambos juntos dan una imagen más completa.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'phishing-quishing',
    categoriaSlug: 'phishing',
    titulo: 'Quishing: phishing con código QR',
    resumen: 'Un QR falso pegado sobre uno real en un lugar público.',
    contenido:
      'El quishing usa códigos QR maliciosos, a veces pegados físicamente sobre códigos legítimos en carteles o mesas, que redirigen a sitios falsos al escanearlos.\\n\\n' +
      'Antes de escanear un QR en un lugar público, fíjate si parece pegado sobre otro, y revisa la URL que se abre antes de ingresar cualquier dato.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-diste-clic',
    categoriaSlug: 'phishing',
    titulo: 'Diste clic en un enlace de phishing: qué hacer ahora',
    resumen: 'Los pasos inmediatos que reducen el daño.',
    contenido:
      'Si ingresaste datos en un sitio falso, cambia esa contraseña de inmediato (y en cualquier otro sitio donde la hayas reutilizado) y activa 2FA si no lo tenías.\\n\\n' +
      'Contacta a la institución real para alertar del incidente, y revisa movimientos inusuales en tus cuentas bancarias en los días siguientes.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-bancario',
    categoriaSlug: 'phishing',
    titulo: 'Phishing bancario: los casos más típicos',
    resumen: 'Los patrones que se repiten en casi todos los países.',
    contenido:
      'Los ataques típicos incluyen alertas falsas de "actividad sospechosa", solicitudes de "verificar tu tarjeta" o avisos de que tu cuenta será "suspendida" si no actúas ya.\\n\\n' +
      'Tu banco real nunca te pedirá tu clave completa, tu PIN o el código de verificación de una transacción por correo o teléfono.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-mensajeria',
    categoriaSlug: 'phishing',
    titulo: 'Phishing en WhatsApp y otras apps de mensajería',
    resumen: 'Cadenas de mensajes que en realidad son estafas.',
    contenido:
      'Mensajes reenviados masivamente sobre premios, cupones falsos de tiendas conocidas o "tu cuenta será eliminada" suelen ser intentos de phishing que se aprovechan de la confianza en cadenas de amigos.\\n\\n' +
      'Antes de reenviar cualquier mensaje así, verifica en el sitio oficial de la marca mencionada si la promoción realmente existe.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'phishing-como-reportar',
    categoriaSlug: 'phishing',
    titulo: 'Cómo reportar un correo de phishing',
    resumen: 'Reportarlo ayuda a proteger a más personas.',
    contenido:
      'La mayoría de clientes de correo tienen una opción de "reportar phishing" o "reportar como spam" que ayuda a mejorar los filtros automáticos para todos los usuarios.\\n\\n' +
      'Si el correo suplanta a una institución específica (tu banco, tu universidad), repórtalo también directamente a esa institución.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-filtros-antiphishing',
    categoriaSlug: 'phishing',
    titulo: 'Cómo funcionan los filtros anti-phishing',
    resumen: 'La primera línea de defensa automática, y por qué no es suficiente.',
    contenido:
      'Los filtros anti-phishing analizan remitentes, enlaces y patrones de contenido conocidos para bloquear correos sospechosos antes de que lleguen a tu bandeja.\\n\\n' +
      'Ningún filtro es perfecto: los atacantes cambian tácticas constantemente, por lo que tu propio criterio sigue siendo la última línea de defensa.\\n\\n' +
      'Más información: https://owasp.org',
  },
  {
    slug: 'phishing-temporadas',
    categoriaSlug: 'phishing',
    titulo: 'Phishing estacional: cuando bajan la guardia por fechas',
    resumen: 'Becas, declaraciones de impuestos, rebajas: los momentos preferidos de los atacantes.',
    contenido:
      'Los ataques de phishing aumentan en fechas específicas donde es normal recibir comunicados reales relacionados (inicio de semestre, temporada de becas, rebajas de fin de año).\\n\\n' +
      'En esas fechas, redobla la precaución con cualquier correo inesperado relacionado, aunque el contexto haga que parezca más creíble de lo normal.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'phishing-psicologia',
    categoriaSlug: 'phishing',
    titulo: 'La psicología detrás del phishing',
    resumen: 'Por qué funciona incluso con gente cuidadosa.',
    contenido:
      'El phishing efectivo combina urgencia, autoridad percibida y una carga emocional (miedo a perder algo, curiosidad, oportunidad) diseñada específicamente para que actúes antes de pensar.\\n\\n' +
      'Entender estos mecanismos psicológicos ayuda a reconocerlos en el momento, incluso cuando el mensaje está bien elaborado.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },

  // ===================== PRIVACIDAD Y DATOS (20) =====================
  {
    slug: 'privacidad-huella-digital',
    categoriaSlug: 'privacidad-datos',
    titulo: '¿Qué es tu huella digital?',
    resumen: 'La suma de todo lo que dejas rastro en internet.',
    contenido:
      'Tu huella digital es el conjunto de datos que generas al usar internet: búsquedas, publicaciones, apps instaladas, compras y ubicaciones visitadas.\\n\\n' +
      'Es más grande y más pública de lo que la mayoría imagina, y puede usarse para perfilarte con fines publicitarios o, en el peor caso, para ingeniería social dirigida.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-metadatos-fotos',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Metadatos ocultos en tus fotos',
    resumen: 'Esa foto puede revelar exactamente dónde estás.',
    contenido:
      'Muchas fotos digitales incluyen metadatos EXIF con la ubicación GPS exacta donde se tomaron, además de la fecha, hora y modelo del dispositivo.\\n\\n' +
      'Desactiva el etiquetado de ubicación en la cámara de tu celular, o elimina los metadatos antes de publicar fotos, especialmente si muestran tu domicilio.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-permisos-apps',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Permisos de aplicaciones móviles: revísalos con criterio',
    resumen: 'Una linterna no necesita acceso a tus contactos.',
    contenido:
      'Muchas apps piden permisos que no necesitan realmente para su función (una app de linterna que pide acceso a contactos y micrófono, por ejemplo).\\n\\n' +
      'Revisa periódicamente los permisos otorgados en la configuración de tu celular y revoca los que no tengan sentido para lo que esa app hace.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'privacidad-leer-politica',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Cómo leer una política de privacidad en 2 minutos',
    resumen: 'No necesitas leer todo, pero sí buscar lo importante.',
    contenido:
      'Busca específicamente las secciones sobre "qué datos recopilamos", "con quién los compartimos" y "cómo puedes eliminarlos" — son las partes que realmente importan.\\n\\n' +
      'Si una política es deliberadamente confusa o no explica claramente estos puntos, es una señal de alerta sobre cómo esa empresa trata tus datos.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-derecho-olvido',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Derecho al olvido digital: qué es y cómo ejercerlo',
    resumen: 'En muchos países, puedes pedir que borren tus datos.',
    contenido:
      'El derecho al olvido permite solicitar a una empresa que elimine tus datos personales de sus sistemas cuando ya no hay una razón legítima para conservarlos.\\n\\n' +
      'La mayoría de plataformas grandes tienen un formulario específico para solicitar la eliminación de cuenta y datos asociados en su configuración de privacidad.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-cookies-rastreo',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Cookies y rastreo web: cómo te siguen entre sitios',
    resumen: 'Por qué ves el mismo anuncio en varias páginas distintas.',
    contenido:
      'Las cookies de terceros permiten que empresas de publicidad rastreen tu navegación entre distintos sitios web, construyendo un perfil de tus intereses.\\n\\n' +
      'Puedes limitar esto rechazando cookies no esenciales cuando un sitio te lo pregunte, y usando la configuración de privacidad de tu navegador para bloquear rastreadores.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-redes-sociales-defecto',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Redes sociales: revisa siempre la configuración por defecto',
    resumen: 'Las opciones iniciales rara vez son las más privadas.',
    contenido:
      'La mayoría de redes sociales configuran los perfiles nuevos con visibilidad amplia por defecto, ya que esto favorece más interacción y datos para la plataforma.\\n\\n' +
      'Revisa manualmente la configuración de privacidad apenas crees una cuenta nueva, en vez de asumir que ya está protegida.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'privacidad-datos-biometricos',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Datos biométricos: huellas y reconocimiento facial',
    resumen: 'A diferencia de una contraseña, no puedes "cambiar" tu huella.',
    contenido:
      'Los datos biométricos (huella, rostro, voz) son únicos y permanentes — si se filtran, no puedes simplemente "cambiarlos" como harías con una contraseña.\\n\\n' +
      'Antes de habilitar reconocimiento facial o de huella en un servicio, verifica dónde y cómo se almacena esa información.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-navegacion-privada',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Navegación privada: qué protege y qué no',
    resumen: 'El modo incógnito no te hace invisible en internet.',
    contenido:
      'El modo privado/incógnito evita que tu navegador guarde el historial localmente, pero no oculta tu actividad de tu proveedor de internet, tu empleador/universidad, ni de los sitios que visitas.\\n\\n' +
      'Es útil para no dejar rastro en un equipo compartido, pero no es una herramienta de anonimato real.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-vpn',
    categoriaSlug: 'privacidad-datos',
    titulo: 'VPN: qué es y cuándo realmente la necesitas',
    resumen: 'Cifra tu conexión, pero no te hace anónimo automáticamente.',
    contenido:
      'Una VPN cifra tu tráfico de internet y oculta tu dirección IP real del sitio que visitas, lo cual es útil especialmente en redes WiFi públicas no confiables.\\n\\n' +
      'Elige un proveedor con política clara de "no registros" (no-logs) y buena reputación — una VPN gratuita mal elegida puede vender tus datos igual que aquello de lo que te protege.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-buscadores-sin-rastreo',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Buscadores que no rastrean tus búsquedas',
    resumen: 'Alternativas que no construyen un perfil publicitario de ti.',
    contenido:
      'Existen motores de búsqueda enfocados en privacidad que no almacenan tu historial de búsquedas ni lo usan para publicidad personalizada.\\n\\n' +
      'Cambiar de buscador es uno de los pasos más simples para reducir tu huella digital diaria sin perder funcionalidad relevante.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-ubicacion-tiempo-real',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Compartir ubicación en tiempo real: el riesgo físico',
    resumen: 'Publicar "aquí estoy" también revela dónde no estás.',
    contenido:
      'Compartir tu ubicación en tiempo real en redes sociales revela también que tu domicilio está vacío en ese momento, un riesgo físico real, no solo digital.\\n\\n' +
      'Comparte fotos de viajes o salidas después de haber vuelto, no mientras ocurren, y revisa quién puede ver tu ubicación en apps que la comparten automáticamente.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'privacidad-datos-nube',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Protección de datos en la nube',
    resumen: 'Tus archivos en la nube también necesitan una buena contraseña.',
    contenido:
      'Los servicios en la nube son generalmente seguros a nivel de infraestructura, pero la mayoría de brechas ocurren por contraseñas débiles o reutilizadas en la cuenta del usuario.\\n\\n' +
      'Activa 2FA en tus cuentas de almacenamiento en la nube y revisa periódicamente qué dispositivos y apps tienen acceso conectado.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'privacidad-data-brokers',
    categoriaSlug: 'privacidad-datos',
    titulo: '¿Qué son los "data brokers"?',
    resumen: 'Empresas que compran y venden tus datos sin que lo notes.',
    contenido:
      'Los data brokers son empresas que recopilan, combinan y venden información personal de miles de fuentes distintas, a menudo sin que las personas sepan que están en esas bases de datos.\\n\\n' +
      'Algunos países permiten solicitar la eliminación de tus datos de estos servicios; vale la pena revisar si aplica en tu región.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-consentimiento-apps',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Consentimiento informado: leer antes de "Aceptar todo"',
    resumen: 'Ese botón grande no siempre es tu mejor opción.',
    contenido:
      'Muchas apps y sitios diseñan el botón "Aceptar todo" para que sea la opción más fácil, mientras esconden "Rechazar" o "Personalizar" en un menú menos visible.\\n\\n' +
      'Tómate el segundo extra de buscar la opción de personalizar permisos, en vez de aceptar todo por costumbre.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'privacidad-clases-virtuales',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Privacidad en videollamadas y clases virtuales',
    resumen: 'Qué revisar antes de encender tu cámara.',
    contenido:
      'Revisa qué se ve detrás de ti antes de encender la cámara en una clase virtual, y ten cuidado con compartir pantalla completa cuando tienes pestañas o notificaciones personales abiertas.\\n\\n' +
      'Verifica también los enlaces de reunión que recibes — algunos ataques de phishing imitan invitaciones de videollamada para robar credenciales.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'privacidad-eliminar-cuentas-antiguas',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Cómo y por qué eliminar cuentas antiguas que ya no usas',
    resumen: 'Cada cuenta olvidada es una filtración potencial más.',
    contenido:
      'Cuentas de servicios que dejaste de usar hace años siguen guardando tus datos y son un riesgo si ese servicio sufre una filtración en el futuro.\\n\\n' +
      'Busca "eliminar cuenta" en la configuración de esos servicios antiguos, o usa herramientas que te ayudan a identificar cuentas olvidadas asociadas a tu correo.\\n\\n' +
      'Más información: https://haveibeenpwned.com',
  },
  {
    slug: 'privacidad-doxxing',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Doxxing: cuando exponen tus datos personales públicamente',
    resumen: 'Una forma de acoso cada vez más común.',
    contenido:
      'El doxxing consiste en publicar información privada de una persona (domicilio, teléfono, lugar de trabajo) sin su consentimiento, generalmente con intención de intimidar o acosar.\\n\\n' +
      'Si eres víctima, guarda evidencia (capturas de pantalla), repórtalo a la plataforma donde ocurrió, y considera reportarlo formalmente si incluye amenazas.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'privacidad-legislacion-proteccion-datos',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Tus derechos según la legislación de protección de datos',
    resumen: 'Tienes más control legal sobre tus datos del que crees.',
    contenido:
      'La mayoría de legislaciones modernas de protección de datos otorgan derechos de acceso (saber qué datos tienen de ti), rectificación (corregirlos) y supresión (eliminarlos).\\n\\n' +
      'Revisa si tu país tiene una ley específica de protección de datos personales y qué autoridad la supervisa, para saber a quién acudir si una empresa no respeta tus derechos.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'privacidad-menores',
    categoriaSlug: 'privacidad-datos',
    titulo: 'Privacidad digital para hermanos o familiares menores',
    resumen: 'Consejos si acompañas a un menor en su primer celular o red social.',
    contenido:
      'Los menores suelen compartir información personal sin dimensionar completamente las consecuencias; el acompañamiento y la conversación abierta funcionan mejor que solo restricciones técnicas.\\n\\n' +
      'Configura controles parentales como apoyo, no como sustituto, y conversa regularmente sobre qué es seguro compartir en línea y qué no.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },

  // ===================== REDES SOCIALES (20) =====================
  {
    slug: 'redsocial-configurar-privacidad',
    categoriaSlug: 'redes-sociales',
    titulo: 'Cómo configurar bien la privacidad de tu perfil',
    resumen: 'El primer paso, y el más descuidado.',
    contenido:
      'Revisa quién puede ver tus publicaciones, tu lista de amigos/seguidores, tu número de teléfono y tu correo asociado en la configuración de privacidad de cada red.\\n\\n' +
      'Configura tu perfil como privado o restringido a personas que realmente conoces, especialmente si compartes información personal con frecuencia.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'redsocial-cuentas-falsas-clonadas',
    categoriaSlug: 'redes-sociales',
    titulo: 'Cuentas falsas y clonadas: cómo detectarlas',
    resumen: 'Alguien puede estar usando tus fotos ahora mismo.',
    contenido:
      'Una cuenta clonada copia tu foto de perfil y datos públicos para hacerse pasar por ti, generalmente para estafar a tus contactos pidiendo dinero o datos.\\n\\n' +
      'Busca periódicamente tu nombre en la red social para detectar posibles clones, y repórtalos de inmediato si los encuentras.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-detectar-perfil-fake',
    categoriaSlug: 'redes-sociales',
    titulo: 'Cómo detectar un perfil falso',
    resumen: 'Señales que casi siempre delatan una cuenta fraudulenta.',
    contenido:
      'Fotos de perfil que parecen de banco de imágenes, cuentas creadas recientemente con pocas publicaciones, pocos seguidores reales pero muchos "me gusta" desproporcionados, y biografías genéricas son señales de alerta.\\n\\n' +
      'Antes de aceptar una solicitud de amistad desconocida, revisa el perfil completo con cuidado, no solo la foto.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'redsocial-apps-terceros',
    categoriaSlug: 'redes-sociales',
    titulo: 'Aplicaciones de terceros conectadas a tu cuenta',
    resumen: 'Ese "test de personalidad" pudo haberse quedado con tus datos.',
    contenido:
      'Muchas apps y "tests" virales piden iniciar sesión con tu cuenta de red social, obteniendo acceso a datos de tu perfil, amigos y publicaciones.\\n\\n' +
      'Revisa periódicamente en la configuración de tu cuenta qué aplicaciones de terceros tienen acceso, y revoca las que no reconozcas o ya no uses.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'redsocial-regalos-sorteos-falsos',
    categoriaSlug: 'redes-sociales',
    titulo: 'Estafas de regalos y sorteos falsos',
    resumen: '"Ganaste un iPhone" casi nunca es verdad.',
    contenido:
      'Los sorteos falsos suelen imitar cuentas de marcas reales y piden que compartas datos personales, pagues un "envío" o inicies sesión en un sitio externo para "reclamar" el premio.\\n\\n' +
      'Verifica cualquier sorteo directamente en la cuenta oficial verificada de la marca, nunca a través del enlace del mensaje.\\n\\n' +
      'Más información: https://www.ftc.gov/consumer-alerts',
  },
  {
    slug: 'redsocial-grooming',
    categoriaSlug: 'redes-sociales',
    titulo: 'Grooming: un riesgo que hay que saber reconocer',
    resumen: 'Cuando un adulto busca ganarse la confianza de un menor con fines dañinos.',
    contenido:
      'El grooming es el proceso mediante el cual un adulto se gana gradualmente la confianza de un menor en línea con la intención de explotarlo, a menudo empezando con conversaciones aparentemente inocentes.\\n\\n' +
      'Señales de alerta incluyen pedir secretismo frente a los padres, regalos o atención excesiva, y avanzar hacia temas cada vez más personales o inapropiados.\\n\\n' +
      'Más información y reporte: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-ciberacoso',
    categoriaSlug: 'redes-sociales',
    titulo: 'Ciberacoso: cómo identificarlo y actuar',
    resumen: 'No tienes que enfrentarlo solo, y no es "solo internet".',
    contenido:
      'El ciberacoso incluye mensajes hostiles repetidos, difusión de rumores o contenido humillante, exclusión deliberada en espacios digitales grupales, y amenazas.\\n\\n' +
      'Guarda evidencia (capturas de pantalla con fecha), bloquea al acosador, repórtalo a la plataforma, y busca apoyo de alguien de confianza — profesor, familiar o servicios de bienestar estudiantil.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-sextorsion',
    categoriaSlug: 'redes-sociales',
    titulo: 'Sextorsión: prevención y qué hacer si te pasa',
    resumen: 'No estás solo, y hay pasos concretos que puedes tomar.',
    contenido:
      'La sextorsión ocurre cuando alguien amenaza con difundir contenido íntimo (real o manipulado) a menos que la víctima pague o entregue más contenido.\\n\\n' +
      'No cedas al chantaje ni sigas enviando nada: guarda evidencia, bloquea al agresor, y repórtalo tanto a la plataforma como a las autoridades. Buscar ayuda no es motivo de vergüenza.\\n\\n' +
      'Recursos de apoyo: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-retos-virales-peligrosos',
    categoriaSlug: 'redes-sociales',
    titulo: 'Retos virales peligrosos: piensa antes de participar',
    resumen: 'La presión social no vale un riesgo real a tu seguridad o salud.',
    contenido:
      'Algunos retos virales han resultado en lesiones graves o consecuencias legales para quienes participan, motivados principalmente por la presión de encajar o viralizarse.\\n\\n' +
      'Antes de sumarte a una tendencia, pregúntate si implica algún riesgo físico, legal o de exposición de datos personales.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-noticias-falsas',
    categoriaSlug: 'redes-sociales',
    titulo: 'Cómo identificar noticias falsas antes de compartirlas',
    resumen: 'Compartir sin verificar también tiene consecuencias.',
    contenido:
      'Verifica la fuente original antes de compartir una noticia impactante, busca si medios reconocidos la están reportando también, y desconfía de titulares diseñados para generar indignación inmediata.\\n\\n' +
      'Las imágenes también pueden sacarse de contexto o estar editadas — una búsqueda inversa de imagen puede revelar su origen real.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-etiquetado-ubicacion',
    categoriaSlug: 'redes-sociales',
    titulo: 'Etiquetado y ubicación en publicaciones',
    resumen: 'Revisa quién puede etiquetarte y qué se ve de tu ubicación.',
    contenido:
      'Configura quién puede etiquetarte en fotos y publicaciones, y revisa las etiquetas de ubicación que otras personas agregan a contenido donde apareces.\\n\\n' +
      'Puedes desactivar la etiquetación automática de ubicación en tus propias publicaciones desde la configuración de privacidad de cada red.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'redsocial-mensajes-directos-sospechosos',
    categoriaSlug: 'redes-sociales',
    titulo: 'Mensajes directos sospechosos: cómo responder',
    resumen: 'Un mensaje de "un amigo" pidiendo algo urgente merece verificación.',
    contenido:
      'Si un contacto conocido te pide dinero o datos de forma repentina por mensaje directo, verifica por otro canal (una llamada) antes de responder — su cuenta podría estar hackeada.\\n\\n' +
      'Nunca hagas clic en enlaces enviados por mensaje directo de cuentas que no reconoces, aunque el mensaje parezca personalizado.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-verificacion-cuentas-oficiales',
    categoriaSlug: 'redes-sociales',
    titulo: 'Cómo verificar si una cuenta oficial es realmente oficial',
    resumen: 'La insignia de verificado ayuda, pero no siempre está.',
    contenido:
      'Busca enlaces cruzados desde el sitio web oficial de la institución o marca hacia su cuenta de red social, en vez de confiar solo en el nombre de usuario.\\n\\n' +
      'Fíjate en la fecha de creación de la cuenta y su historial de publicaciones — una cuenta "oficial" creada hace pocos días es sospechosa.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'redsocial-reportar-contenido-abusivo',
    categoriaSlug: 'redes-sociales',
    titulo: 'Cómo reportar contenido abusivo correctamente',
    resumen: 'Guarda evidencia antes de reportar o bloquear.',
    contenido:
      'Antes de bloquear a alguien, toma capturas de pantalla del contenido abusivo con fecha visible, ya que el bloqueo puede ocultar el contenido antes de que puedas reportarlo formalmente.\\n\\n' +
      'Usa las herramientas de reporte específicas de cada plataforma (acoso, contenido íntimo no consentido, suplantación) para que se procese con la categoría correcta.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-huella-digital-redes',
    categoriaSlug: 'redes-sociales',
    titulo: 'Tu huella digital en redes sociales, específicamente',
    resumen: 'Lo que publicaste hace años puede seguir siendo público.',
    contenido:
      'Publicaciones antiguas que olvidaste que existían pueden seguir siendo visibles públicamente y ser encontradas por reclutadores, admisiones universitarias o cualquier persona que te busque.\\n\\n' +
      'Revisa periódicamente tu historial de publicaciones antiguas y ajusta su privacidad o elimínalas si ya no representan quién eres.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'redsocial-algoritmos-camaras-eco',
    categoriaSlug: 'redes-sociales',
    titulo: 'Algoritmos y cámaras de eco: por qué siempre ves lo mismo',
    resumen: 'Entender esto te ayuda a tener una visión más completa.',
    contenido:
      'Los algoritmos de redes sociales muestran contenido similar a lo que ya interactuaste, lo que puede crear una "cámara de eco" que refuerza las mismas ideas una y otra vez.\\n\\n' +
      'Buscar activamente fuentes distintas y diversificar a quién sigues ayuda a tener una visión más equilibrada de la información.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-seguridad-tiktok-instagram-facebook',
    categoriaSlug: 'redes-sociales',
    titulo: 'Configuración de seguridad en TikTok, Instagram y Facebook',
    resumen: 'Los ajustes específicos que vale la pena revisar en cada una.',
    contenido:
      'Cada plataforma tiene su propio centro de seguridad: revisa quién puede enviarte mensajes, comentar tus publicaciones, y qué información de tu perfil es pública por defecto.\\n\\n' +
      'Activa la autenticación de dos factores en cada una — son cuentas frecuentemente buscadas por atacantes precisamente por el acceso a tu red de contactos.\\n\\n' +
      'Más información: https://safety.google',
  },
  {
    slug: 'redsocial-grupos-comunidades',
    categoriaSlug: 'redes-sociales',
    titulo: 'Grupos y comunidades: riesgos al unirte',
    resumen: 'No todos los grupos con nombre atractivo son legítimos.',
    contenido:
      'Algunos grupos y comunidades sirven como fachada para distribuir malware, promover estafas de inversión o recopilar datos de sus miembros.\\n\\n' +
      'Revisa quién administra el grupo, la actividad reciente y si comparten enlaces sospechosos antes de unirte o participar activamente.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-bloqueo-silenciar',
    categoriaSlug: 'redes-sociales',
    titulo: 'Bloqueo y silenciar: úsalos sin culpa',
    resumen: 'Herramientas de protección, no de mala educación.',
    contenido:
      'Bloquear a alguien impide todo contacto y visibilidad mutua; silenciar deja de mostrarte su contenido sin que la otra persona lo note. Ambas son herramientas legítimas de cuidado personal.\\n\\n' +
      'No necesitas una razón "suficientemente grande" para usarlas — tu comodidad y seguridad en un espacio digital son razón suficiente.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'redsocial-uso-responsable-academico',
    categoriaSlug: 'redes-sociales',
    titulo: 'Uso responsable de redes sociales en el ámbito académico',
    resumen: 'Lo que publicas también puede tener un lado profesional.',
    contenido:
      'Reclutadores y admisiones a programas de posgrado revisan cada vez más perfiles públicos de redes sociales como parte de su evaluación informal.\\n\\n' +
      'Separar claramente lo que compartes públicamente de lo que compartes en un círculo privado de confianza ayuda a mantener control sobre tu imagen profesional futura.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },

  // ===================== REDES WIFI (20) =====================
  {
    slug: 'wifi-red-abierta-que-es',
    categoriaSlug: 'redes-wifi',
    titulo: '¿Qué es una red WiFi abierta y por qué es riesgosa?',
    resumen: 'Sin contraseña significa sin cifrado para nadie.',
    contenido:
      'Una red WiFi abierta no requiere contraseña y, en muchos casos, no cifra el tráfico entre tu dispositivo y el router, lo que permite a otros en la misma red potencialmente ver lo que haces.\\n\\n' +
      'Evita ingresar contraseñas o hacer trámites bancarios en una red abierta sin protección adicional como una VPN.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'wifi-evil-twin',
    categoriaSlug: 'redes-wifi',
    titulo: 'Redes "gemelas malignas" (evil twin)',
    resumen: 'Un nombre casi idéntico al real, pero controlado por un atacante.',
    contenido:
      'Un atacante puede crear una red WiFi con un nombre casi idéntico al de un lugar legítimo (una cafetería, un aeropuerto) para que los usuarios se conecten por error a la suya.\\n\\n' +
      'Confirma con el personal del establecimiento el nombre exacto de la red oficial antes de conectarte, en vez de asumir cuál es.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-configurar-router-seguro',
    categoriaSlug: 'redes-wifi',
    titulo: 'Cómo configurar tu router de forma segura',
    resumen: 'Cinco cambios básicos que marcan una gran diferencia.',
    contenido:
      'Cambia el nombre de usuario y contraseña de administrador por defecto, usa cifrado WPA3 o WPA2, cambia el nombre de la red (SSID) para que no revele el modelo del router, y desactiva WPS si no lo usas.\\n\\n' +
      'Estos ajustes suelen tomar menos de 10 minutos desde el panel de administración del router, accesible normalmente desde tu navegador.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-wpa2-vs-wpa3',
    categoriaSlug: 'redes-wifi',
    titulo: 'WPA2 vs WPA3: cuál usar y por qué',
    resumen: 'La diferencia entre el estándar actual y el más nuevo.',
    contenido:
      'WPA3 es el estándar de cifrado más reciente y seguro para redes WiFi; si tu router lo soporta, actívalo. WPA2 sigue siendo aceptable si WPA3 no está disponible.\\n\\n' +
      'Evita por completo WEP, un estándar antiguo que puede descifrarse en minutos con herramientas disponibles públicamente.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-vpn-redes-publicas',
    categoriaSlug: 'redes-wifi',
    titulo: 'Por qué usar VPN en redes WiFi públicas',
    resumen: 'Una capa extra de cifrado cuando no controlas la red.',
    contenido:
      'En redes públicas no sabes quién administra la red ni quién más está conectado; una VPN cifra tu tráfico de punta a punta, reduciendo el riesgo de interceptación.\\n\\n' +
      'Es especialmente recomendable si necesitas revisar correo de trabajo, banca en línea o cualquier dato sensible fuera de casa.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'wifi-https-importancia',
    categoriaSlug: 'redes-wifi',
    titulo: 'Por qué HTTPS importa aún más en WiFi público',
    resumen: 'El candado en la barra de direcciones no es solo decoración.',
    contenido:
      'Los sitios con HTTPS cifran la comunicación entre tu navegador y el sitio, lo que dificulta que alguien en la misma red WiFi pueda leer lo que envías, incluso en una red insegura.\\n\\n' +
      'Si tu navegador advierte que un sitio "no es seguro" en una red pública, tómalo en serio y evita ingresar cualquier dato ahí.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'wifi-man-in-the-middle',
    categoriaSlug: 'redes-wifi',
    titulo: 'Ataques "man in the middle" explicados',
    resumen: 'Cuando alguien se posiciona entre tú y el sitio que visitas.',
    contenido:
      'En un ataque man in the middle, el atacante intercepta la comunicación entre tu dispositivo y el destino real, pudiendo leer o incluso modificar los datos que envías.\\n\\n' +
      'Usar HTTPS, evitar redes WiFi no confiables para trámites sensibles, y usar VPN son las principales defensas contra este tipo de ataque.\\n\\n' +
      'Más información: https://owasp.org',
  },
  {
    slug: 'wifi-red-invitados',
    categoriaSlug: 'redes-wifi',
    titulo: 'Por qué crear una red de invitados en casa',
    resumen: 'Separa tus dispositivos principales de visitas y IoT.',
    contenido:
      'Una red de invitados aísla a las visitas y a dispositivos IoT (cámaras, focos inteligentes) de tu red principal, donde suelen estar tus computadoras y celulares con datos sensibles.\\n\\n' +
      'La mayoría de routers modernos permiten configurar una red de invitados en pocos pasos desde el panel de administración.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'wifi-actualizar-firmware',
    categoriaSlug: 'redes-wifi',
    titulo: 'Actualizar el firmware del router: por qué importa',
    resumen: 'El software de tu router también necesita mantenimiento.',
    contenido:
      'El firmware del router también puede tener vulnerabilidades que los fabricantes corrigen con actualizaciones, igual que cualquier otro software.\\n\\n' +
      'Revisa cada pocos meses si hay una actualización disponible desde el panel de administración, o activa las actualizaciones automáticas si tu router lo permite.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-contrasena-router-defecto',
    categoriaSlug: 'redes-wifi',
    titulo: 'El riesgo de dejar la contraseña de router por defecto',
    resumen: 'Muchas veces está impresa en una etiqueta visible.',
    contenido:
      'Los routers vienen con credenciales de administrador por defecto que suelen ser conocidas públicamente o estar impresas en una etiqueta visible en el propio dispositivo.\\n\\n' +
      'Cambia tanto el usuario como la contraseña de administrador (no solo la contraseña WiFi) apenas instales un router nuevo.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'wifi-cafeterias-aeropuertos',
    categoriaSlug: 'redes-wifi',
    titulo: 'WiFi en cafeterías y aeropuertos: buenas prácticas',
    resumen: 'Lo mínimo que deberías hacer antes de conectarte.',
    contenido:
      'Confirma el nombre exacto de la red con el personal del lugar, evita hacer trámites bancarios sin VPN, y desactiva la conexión automática a redes abiertas conocidas en la configuración de tu dispositivo.\\n\\n' +
      'Si solo necesitas navegar de forma casual, el riesgo es menor, pero cualquier dato sensible merece precaución extra en este tipo de redes.\\n\\n' +
      'Más información: https://www.staysafeonline.org',
  },
  {
    slug: 'wifi-bluetooth-riesgos',
    categoriaSlug: 'redes-wifi',
    titulo: 'Bluetooth: riesgos de seguridad que se pasan por alto',
    resumen: 'Otra conexión inalámbrica que también necesita cuidado.',
    contenido:
      'Dejar el Bluetooth siempre visible/detectable puede exponerte a intentos de conexión no autorizados en lugares públicos concurridos.\\n\\n' +
      'Desactiva el Bluetooth cuando no lo uses, y rechaza solicitudes de emparejamiento de dispositivos que no reconozcas.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-dispositivos-iot',
    categoriaSlug: 'redes-wifi',
    titulo: 'Dispositivos IoT en tu red doméstica',
    resumen: 'Cámaras y asistentes inteligentes también pueden ser una puerta de entrada.',
    contenido:
      'Cámaras, focos y asistentes inteligentes a veces tienen seguridad más débil que una computadora, y pueden ser el punto de entrada de un atacante a toda tu red doméstica.\\n\\n' +
      'Cambia sus contraseñas por defecto, mantenlos actualizados, y considera colocarlos en tu red de invitados en vez de tu red principal.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-firewalls-domesticos',
    categoriaSlug: 'redes-wifi',
    titulo: 'Firewalls domésticos: una capa de protección extra',
    resumen: 'La mayoría de routers ya traen uno, solo hay que verificarlo.',
    contenido:
      'Un firewall filtra el tráfico entrante y saliente de tu red según reglas de seguridad, bloqueando conexiones no autorizadas desde internet hacia tus dispositivos.\\n\\n' +
      'La mayoría de routers modernos ya incluyen un firewall básico activado por defecto; verifica en el panel de administración que esté habilitado.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-saber-si-alguien-usa-tu-red',
    categoriaSlug: 'redes-wifi',
    titulo: 'Cómo saber si alguien más está usando tu WiFi',
    resumen: 'Lentitud inexplicable puede tener una explicación simple.',
    contenido:
      'La mayoría de routers muestran en su panel de administración la lista de dispositivos actualmente conectados, con su nombre y dirección MAC.\\n\\n' +
      'Si ves un dispositivo que no reconoces, cambia la contraseña de tu WiFi de inmediato y revisa que el cifrado sea WPA2/WPA3, no WEP.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'wifi-universidad-buenas-practicas',
    categoriaSlug: 'redes-wifi',
    titulo: 'WiFi en la universidad: buenas prácticas específicas',
    resumen: 'Una red compartida con miles de dispositivos merece cuidado extra.',
    contenido:
      'Usa siempre la red oficial verificada de la institución (pregunta al personal de TI si tienes dudas), y evita compartir archivos o carpetas de red mientras estés conectado a la red del campus.\\n\\n' +
      'Mantén tu firewall y antivirus activos, y evita hacer trámites bancarios sensibles usando exclusivamente el WiFi público universitario sin protección adicional.\\n\\n' +
      'Más información: https://www.incibe.es',
  },
  {
    slug: 'wifi-sniffing-trafico',
    categoriaSlug: 'redes-wifi',
    titulo: 'Sniffing de tráfico: qué significa y cómo protegerte',
    resumen: 'Leer los "paquetes" que viajan por una red.',
    contenido:
      'El sniffing de tráfico consiste en capturar y analizar los datos que circulan por una red; en redes no cifradas, esto puede exponer información sensible que envías.\\n\\n' +
      'HTTPS en los sitios que visitas y una VPN en redes no confiables son las defensas más efectivas contra este tipo de interceptación.\\n\\n' +
      'Más información: https://owasp.org',
  },
  {
    slug: 'wifi-certificados-advertencias-navegador',
    categoriaSlug: 'redes-wifi',
    titulo: 'Advertencias de certificado del navegador: no las ignores',
    resumen: 'Ese aviso rojo está tratando de protegerte activamente.',
    contenido:
      'Si tu navegador muestra una advertencia de "conexión no segura" o "problema con el certificado", especialmente en una red WiFi pública, no la ignores ni continúes sin verificar.\\n\\n' +
      'Puede indicar un intento activo de interceptar tu conexión en esa red específica, no solo un error técnico del sitio.\\n\\n' +
      'Más información: https://www.eff.org',
  },
  {
    slug: 'wifi-wifi6-mejoras-seguridad',
    categoriaSlug: 'redes-wifi',
    titulo: 'WiFi 6: qué mejoras de seguridad trae',
    resumen: 'No es solo velocidad, también trae beneficios de protección.',
    contenido:
      'WiFi 6 incorpora WPA3 como estándar y mejoras en cómo se gestionan las conexiones simultáneas, reduciendo ciertos vectores de ataque presentes en versiones anteriores.\\n\\n' +
      'Si estás por renovar tu router, uno compatible con WiFi 6 y WPA3 es una inversión razonable en seguridad, no solo en velocidad.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
  {
    slug: 'wifi-sospecha-ataque-red',
    categoriaSlug: 'redes-wifi',
    titulo: 'Qué hacer si sospechas de un ataque en tu red',
    resumen: 'Los pasos inmediatos, en orden.',
    contenido:
      'Cambia de inmediato la contraseña de tu WiFi y la de administrador del router, revisa la lista de dispositivos conectados y elimina los que no reconozcas.\\n\\n' +
      'Actualiza el firmware del router a la última versión disponible, y si el problema persiste, considera reiniciar el router a configuración de fábrica y reconfigurarlo desde cero.\\n\\n' +
      'Más información: https://www.cisa.gov',
  },
];

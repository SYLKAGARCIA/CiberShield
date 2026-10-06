export interface PreguntaCalculadora {
  id: string;
  texto: string;
  puntos: number; // puntos otorgados si la respuesta es "Sí"
}

export const PREGUNTAS_CALCULADORA: PreguntaCalculadora[] = [
  { id: 'contrasenas-unicas', texto: '¿Usas una contraseña distinta para cada cuenta importante?', puntos: 15 },
  { id: '2fa', texto: '¿Tienes activada la autenticación de dos factores en tu correo principal?', puntos: 20 },
  { id: 'actualizaciones', texto: '¿Actualizas tus dispositivos y apps cuando lo piden?', puntos: 15 },
  { id: 'backups', texto: '¿Tienes una copia de seguridad de tus archivos importantes?', puntos: 15 },
  { id: 'wifi-publico', texto: '¿Evitas ingresar contraseñas en redes WiFi públicas sin VPN?', puntos: 10 },
  { id: 'verificas-enlaces', texto: '¿Verificas la URL antes de ingresar credenciales en un sitio?', puntos: 15 },
  { id: 'privacidad-redes', texto: '¿Revisaste la configuración de privacidad de tus redes sociales?', puntos: 10 },
];

export const PUNTAJE_MAXIMO = PREGUNTAS_CALCULADORA.reduce((acc, p) => acc + p.puntos, 0);

export function obtenerRecomendacion(puntaje: number): { nivel: string; mensaje: string } {
  const porcentaje = (puntaje / PUNTAJE_MAXIMO) * 100;

  if (porcentaje >= 85) {
    return {
      nivel: 'Excelente',
      mensaje:
        'Tus hábitos digitales son sólidos. Sigue así y revisa tu configuración de privacidad cada tanto.',
    };
  }
  if (porcentaje >= 60) {
    return {
      nivel: 'Bueno, con margen de mejora',
      mensaje:
        'Vas por buen camino. Revisa las preguntas marcadas como "No" — cada una es una recomendación concreta para reducir tu exposición a riesgos.',
    };
  }
  if (porcentaje >= 35) {
    return {
      nivel: 'Necesita atención',
      mensaje:
        'Hay varios hábitos básicos pendientes. Empieza por activar la autenticación de dos factores y usar contraseñas únicas — son los cambios de mayor impacto.',
    };
  }
  return {
    nivel: 'Alto riesgo',
    mensaje:
      'Tu exposición actual a riesgos digitales es alta. Te recomendamos revisar la sección de Buenas Prácticas y aplicar los cambios uno por uno, empezando por tus contraseñas.',
  };
}

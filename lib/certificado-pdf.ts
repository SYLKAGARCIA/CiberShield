import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface DatosCertificado {
  nombreEstudiante: string;
  nombreEvaluacion: string;
  puntaje: number;
  codigo: string;
  fecha: Date;
}

// Paleta del certificado, coherente con la identidad de marca
// CiberShield UTLVT (ver docs/REDISENO-VISUAL-CIBERSHIELD.md).
const AZUL_PROFUNDO = rgb(0x12 / 255, 0x3a / 255, 0x66 / 255);
const VERDE_ESCUDO = rgb(0x15 / 255, 0x7a / 255, 0x40 / 255); // seguro-500, ver tailwind.config.ts
const GRIS_TEXTO = rgb(0x3b / 255, 0x46 / 255, 0x57 / 255);

/**
 * Genera el PDF de un certificado y devuelve los bytes listos para
 * guardar en disco. Usa `pdf-lib` (JavaScript puro, sin binarios
 * nativos) para que funcione igual en desarrollo local y en un entorno
 * serverless como Vercel.
 */
export async function generarCertificadoPDF(datos: DatosCertificado): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const pagina = pdfDoc.addPage([841.89, 595.28]); // A4 horizontal (puntos)
  const { width, height } = pagina.getSize();

  const fuenteTitulo = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fuenteTexto = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Borde decorativo
  pagina.drawRectangle({
    x: 24,
    y: 24,
    width: width - 48,
    height: height - 48,
    borderColor: AZUL_PROFUNDO,
    borderWidth: 2,
  });
  pagina.drawRectangle({
    x: 34,
    y: 34,
    width: width - 68,
    height: height - 68,
    borderColor: VERDE_ESCUDO,
    borderWidth: 0.75,
  });

  const centrarX = (texto: string, tamano: number, fuente = fuenteTexto) =>
    (width - fuente.widthOfTextAtSize(texto, tamano)) / 2;

  // Marca
  const marca = 'CIBERSHIELD UTLVT';
  pagina.drawText(marca, {
    x: centrarX(marca, 14, fuenteTitulo),
    y: height - 90,
    size: 14,
    font: fuenteTitulo,
    color: AZUL_PROFUNDO,
  });

  // Título
  const titulo = 'Certificado de Concientización en Ciberseguridad';
  pagina.drawText(titulo, {
    x: centrarX(titulo, 24, fuenteTitulo),
    y: height - 160,
    size: 24,
    font: fuenteTitulo,
    color: AZUL_PROFUNDO,
  });

  // Texto introductorio
  const intro = 'Se otorga el presente certificado a';
  pagina.drawText(intro, {
    x: centrarX(intro, 13),
    y: height - 220,
    size: 13,
    font: fuenteTexto,
    color: GRIS_TEXTO,
  });

  // Nombre del estudiante (elemento principal)
  pagina.drawText(datos.nombreEstudiante, {
    x: centrarX(datos.nombreEstudiante, 30, fuenteTitulo),
    y: height - 265,
    size: 30,
    font: fuenteTitulo,
    color: VERDE_ESCUDO,
  });

  // Descripción del logro
  const logro = `por aprobar la evaluación "${datos.nombreEvaluacion}" con un puntaje de ${datos.puntaje}%.`;
  pagina.drawText(logro, {
    x: centrarX(logro, 13),
    y: height - 310,
    size: 13,
    font: fuenteTexto,
    color: GRIS_TEXTO,
  });

  // Pie: fecha y código de verificación
  const fechaTexto = `Emitido el ${datos.fecha.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;
  pagina.drawText(fechaTexto, {
    x: 80,
    y: 80,
    size: 10,
    font: fuenteTexto,
    color: GRIS_TEXTO,
  });

  const codigoTexto = `Código de verificación: ${datos.codigo}`;
  pagina.drawText(codigoTexto, {
    x: width - 80 - fuenteTexto.widthOfTextAtSize(codigoTexto, 10),
    y: 80,
    size: 10,
    font: fuenteTexto,
    color: GRIS_TEXTO,
  });

  const notaVerificacion = 'Verifica la autenticidad de este certificado en /certificados/verificar';
  pagina.drawText(notaVerificacion, {
    x: centrarX(notaVerificacion, 9),
    y: 58,
    size: 9,
    font: fuenteTexto,
    color: GRIS_TEXTO,
  });

  return pdfDoc.save();
}

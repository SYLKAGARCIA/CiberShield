import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

const CARPETA_CERTIFICADOS = path.join(process.cwd(), 'public', 'certificados');

/**
 * Guarda los bytes del PDF en `public/certificados/{codigo}.pdf` y
 * devuelve la URL pública relativa para guardar en
 * `Certificado.archivoPdfUrl`. La carpeta ya está excluida de Git
 * desde `.gitignore` (Fase 1: `public/certificados/*.pdf`).
 *
 * NOTA para despliegue: en Vercel el sistema de archivos es de solo
 * lectura salvo `/tmp` — este enfoque funciona en desarrollo local y en
 * servidores tradicionales (Node.js persistente). Si se despliega en
 * Vercel, este servicio deberá cambiarse para subir el PDF a un
 * almacenamiento externo (ej. Vercel Blob, S3) en vez de al disco
 * local. Se documenta como pendiente en docs/08-FASE-8.md.
 */
export async function guardarCertificadoPDF(codigo: string, bytes: Uint8Array): Promise<string> {
  await mkdir(CARPETA_CERTIFICADOS, { recursive: true });
  const rutaArchivo = path.join(CARPETA_CERTIFICADOS, `${codigo}.pdf`);
  await writeFile(rutaArchivo, bytes);
  return `/certificados/${codigo}.pdf`;
}

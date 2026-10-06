/** Convierte la URL de un recurso en algo que se pueda mostrar dentro de la página. */
export type Embed =
  | { kind: 'iframe'; src: string }
  | { kind: 'video'; src: string }
  | { kind: 'image'; src: string }
  | { kind: 'externo'; src: string };

export function resolverEmbed(tipo: string, url: string): Embed {
  const u = url.trim();

  if (tipo === 'VIDEO') {
    const yt = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0` };
    const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return { kind: 'iframe', src: `https://player.vimeo.com/video/${vm[1]}` };
    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(u)) return { kind: 'video', src: u };
    const drive = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (drive) return { kind: 'iframe', src: `https://drive.google.com/file/d/${drive[1]}/preview` };
    return { kind: 'externo', src: u };
  }

  if (tipo === 'PDF') {
    const drive = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
    if (drive) return { kind: 'iframe', src: `https://drive.google.com/file/d/${drive[1]}/preview` };
    // Archivo propio (carpeta /public): ya es del mismo dominio.
    if (u.startsWith('/')) return { kind: 'iframe', src: `${u}#view=FitH` };
    // Externo: se sirve a través del proxy de CiberShield para evitar el bloqueo de incrustación.
    return { kind: 'iframe', src: `/api/pdf?url=${encodeURIComponent(u)}#view=FitH` };
  }

  if (tipo === 'IMAGEN') return { kind: 'image', src: u };
  return { kind: 'externo', src: u };
}

export function esRecursoIntegrable(tipo: string, url: string) {
  return resolverEmbed(tipo, url).kind !== 'externo';
}

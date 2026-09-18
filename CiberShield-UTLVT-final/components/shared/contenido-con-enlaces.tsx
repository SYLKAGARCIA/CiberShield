import Link from 'next/link';

const URL_REGEX = /(https?:\/\/[^\s)]+)/g;

/**
 * El campo `contenido` de una publicación se guarda como texto plano
 * (ver docs/02-FASE-2.md). Esta función lo divide detectando URLs y
 * las convierte en enlaces reales, sin necesidad de renderizar HTML
 * arbitrario (evita riesgos de seguridad de un dangerouslySetInnerHTML).
 */
export function ContenidoConEnlaces({ texto }: { texto: string }) {
  const partes = texto.split(URL_REGEX);

  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith('http://') || parte.startsWith('https://') ? (
          <Link
            key={i}
            href={parte}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline underline-offset-2 hover:text-seguro-600 dark:text-primary-300"
          >
            {parte}
          </Link>
        ) : (
          <span key={i}>{parte}</span>
        )
      )}
    </>
  );
}

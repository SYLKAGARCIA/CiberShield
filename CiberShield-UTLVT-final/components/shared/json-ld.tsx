/**
 * Renderiza un bloque JSON-LD (datos estructurados para buscadores).
 * `JSON.stringify` sobre un objeto que Claude/el servidor construye
 * (no contenido arbitrario de un usuario sin sanitizar) es seguro aquí
 * — no se interpola HTML del usuario directamente en el string.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

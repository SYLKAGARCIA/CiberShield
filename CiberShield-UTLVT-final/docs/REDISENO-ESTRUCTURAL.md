# Rediseño Estructural — Composición y Layout

> Segunda intervención de diseño, fuera del roadmap de 10 fases. La
> primera (`REDISENO-VISUAL-CIBERSHIELD.md`) fue principalmente de
> paleta/tipografía/marca. Esta se enfoca en **composición y
> distribución**: estructura del navbar/footer/hero, tratamiento de
> tarjetas y animaciones de aparición — tal como pidió explícitamente
> el usuario ("no quiero solo cambiar colores").

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-04 | 2026-08-04 |

## Objetivo de la solicitud

Remodelación **estructural** (no solo cromática) de la interfaz:
distribución de secciones, header/navbar de dos niveles, hero
asimétrico, footer multicolumna, tarjetas con nuevo lenguaje visual,
animaciones de aparición al hacer scroll — conservando intacta toda la
lógica interna (Prisma, rutas, APIs, validaciones, Server Actions).

## Cambios de composición (no de color)

### Navbar → estructura de dos niveles
Antes: una sola franja con blur. Ahora: franja utilitaria superior
oscura ("Programa oficial UTLVT · Plataforma activa", visible en
escritorio) + franja de navegación principal con un botón de ayuda
(`¿Necesitas ayuda?`) añadido junto al selector de tema. La consulta a
`ItemMenu` vía `menuRepository` no cambió.

### Hero → banda oscura con panel flotante
Antes: hero claro de 2 columnas simple. Ahora: banda `bg-ink-900` de
ancho completo con resplandor decorativo, y una tarjeta de
estadísticas reales que **se superpone a la costura** entre el hero
oscuro y el contenido claro (`-mt-16`/`-mt-20`), fusionando ambas
secciones en vez de apilarlas como bloques independientes.

### Footer → multicolumna sobre fondo oscuro permanente
Antes: 2 columnas sobre fondo blanco. Ahora: 4 columnas (Marca /
Explorar / Aprende / —) sobre fondo `ink-900` fijo (no depende del
tema claro/oscuro del sitio), con una columna nueva "Aprende" con
enlaces curados a rutas reales ya existentes (`/amenazas`,
`/buenas-practicas`, `/glosario`, `/recursos`).

**Corrección necesaria:** como el footer ahora es oscuro
_permanentemente_ (no solo en modo oscuro del sitio), el componente
`Logo` habría quedado invisible en modo claro (su texto usa
`text-ink-900` por defecto, casi negro sobre el fondo oscuro del
footer). Se agregó una prop `variant="light"` a `Logo` para forzar
colores claros independientemente del tema del sitio. Ver
`components/ui/logo.tsx`.

### Tarjetas → nuevo lenguaje visual compartido
`CategoryCard`, `ArticleCard`, `ResourceCard` y las tarjetas de
Buenas Prácticas ahora comparten: barra de acento lateral (gris →
verde al pasar el cursor), ícono en insignia circular, flecha
`ArrowUpRight` que se anima al hover, y bordes menos redondeados
(`rounded-lg` en vez de `rounded-xl`), atendiendo el pedido explícito
de "evitar tarjetas excesivamente redondeadas".

### Encabezados de página → alineados a la izquierda con acento
`PageHeader` (usado en 9 páginas) pasó de un layout centrado genérico
a uno alineado a la izquierda, con una barra de acento vertical verde
y una rejilla de puntos de fondo — se siente como el panel de una
plataforma técnica en vez de una landing page genérica. El encabezado
personalizado de `/amenazas/[slug]` se actualizó al mismo lenguaje
visual.

### "Cómo funciona" → de grilla a línea de tiempo conectada
Antes: 3 columnas independientes. Ahora: los 3 pasos están unidos por
una línea horizontal conectora (oculta en móvil), con marcadores
circulares — refuerza la idea de una **ruta secuencial real**, no una
lista arbitraria.

### Animación de aparición al hacer scroll
Nuevo componente `components/shared/reveal.tsx`: usa
`IntersectionObserver` nativo (sin dependencias nuevas) para hacer
aparecer contenido con fundido + desplazamiento al entrar en el
viewport, con retraso escalonado por tarjeta. Aplicado en: hero, home
completa, `/amenazas`, `/amenazas/[slug]`, `/noticias`, `/recursos`,
`/buenas-practicas`, `/sobre-ciberseguridad`. Respeta
`prefers-reduced-motion` (muestra el contenido sin animar).

### Divisor de sección angular
Nuevo componente `components/shared/section-divider.tsx`: un SVG
angular decorativo (`aria-hidden`) usado entre la grilla de categorías
y "Cómo funciona" en la home, rompiendo la composición de "todo
apilado en rectángulos".

## Archivos nuevos

| Archivo | Propósito |
|---|---|
| `components/shared/reveal.tsx` | Animación de aparición al hacer scroll |
| `components/shared/section-divider.tsx` | Divisor angular decorativo |

## Archivos modificados

`components/shared/category-card.tsx`, `article-card.tsx`,
`resource-card.tsx`, `page-header.tsx`, `publicacion-detalle.tsx`,
`components/layout/navbar.tsx`, `footer.tsx`, `components/ui/logo.tsx`
(+ prop `variant`), `components/home/security-clearance-card.tsx`
(ajuste menor), `stats-strip.tsx`, `category-grid.tsx`,
`how-it-works.tsx`, `app/page.tsx`, `app/amenazas/page.tsx`,
`app/amenazas/[slug]/page.tsx`, `app/noticias/page.tsx`,
`app/recursos/page.tsx`, `app/buenas-practicas/page.tsx`,
`app/sobre-ciberseguridad/page.tsx`, `app/contacto/page.tsx`
(formulario ahora dentro de una tarjeta).

## Qué NO se tocó (verificado explícitamente)

- `prisma/schema.prisma`: **hash MD5 idéntico** antes y después de esta
  intervención — cero cambios.
- Los 9 repositorios: verificados uno por uno, ninguno fue modificado.
- Conteo de rutas (`page.tsx`/`route.ts`): 14 antes, 14 después.
- `app/api/contacto/route.ts`, esquemas Zod, `next.config.mjs`,
  `tsconfig.json`, variables de entorno: sin cambios.

## Decisiones técnicas tomadas

1. **`Reveal` con IntersectionObserver nativo en vez de una librería de
   animación** (ej. Framer Motion): cumple el pedido de "no agregar
   dependencias salvo que sea estrictamente necesario". El navegador ya
   provee todo lo necesario para este efecto.
2. **Footer con fondo oscuro fijo (no ligado al tema)**: es una
   decisión de composición deliberada (contraste fuerte al final de la
   página, común en plataformas tecnológicas profesionales) — por eso
   requirió la nueva prop `variant="light"` en `Logo`, documentada
   arriba como corrección necesaria detectada durante la propia
   implementación.
3. **Enlaces curados en la columna "Aprende" del footer usan rutas
   reales conocidas del proyecto** (no vienen de una tabla en la base
   de datos), a diferencia de la columna "Explorar" que sí usa
   `ItemMenu`. Se documenta la diferencia explícitamente para que quede
   claro que no se inventó una fuente de datos nueva.

## Problemas encontrados y corregidos durante esta intervención

- **Logo invisible en el footer en modo claro** (ver arriba) — detectado
  y corregido antes de la entrega, no después.
- Import no utilizado de `PageHeader` en `app/amenazas/[slug]/page.tsx`
  (arrastrado desde la Fase 4, nunca se usaba realmente ya que esa
  página siempre tuvo un encabezado personalizado) — se limpió al
  actualizar el archivo.

## Pruebas ejecutadas

- Verificación manual de balance de sintaxis en 52 archivos.
- Verificación de hash MD5 de `schema.prisma` (sin cambios) y de los 9
  repositorios (sin cambios).
- Conteo de rutas antes/después (14 = 14).
- Pendiente de ejecutar por el usuario: `npm run dev`, revisar
  especialmente el footer en modo claro y oscuro, el menú móvil, el
  formulario de contacto, y las animaciones de aparición al hacer
  scroll en `/amenazas`, `/noticias` y `/recursos`.

## Cómo verificar

```bash
scripts\iniciar_proyecto.bat
```

Revisar especialmente:
- Home: banda oscura del hero fusionándose con la tarjeta de
  estadísticas, tarjetas de categorías apareciendo escalonadamente al
  hacer scroll.
- Footer: legible en modo claro y oscuro (el logo debe verse blanco en
  ambos casos, ya que el footer es siempre oscuro).
- `/amenazas`, `/noticias`, `/recursos`: tarjetas con barra de acento
  lateral e insignia circular flotante.
- Menú móvil: sigue abriendo/cerrando correctamente (sin cambios de
  lógica, solo hereda los nuevos estilos de enlace).

## Pendientes

Ninguno específico de esta intervención. Los pendientes previos (envío
real de email, Fase 5 de autenticación) siguen vigentes.

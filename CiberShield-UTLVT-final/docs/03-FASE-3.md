# Fase 3 — Layout Público y Diseño

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-04 | 2026-08-04 |

## Objetivos

- Definir una identidad visual propia y deliberada (no genérica) para el
  proyecto, coherente con el brief de ciberseguridad estudiantil.
- Construir el layout público real: navbar responsive, footer, y menú
  móvil, alimentados por los datos ya sembrados en la Fase 2
  (`ItemMenu`).
- Completar el selector de modo oscuro/claro (la infraestructura ya
  existía desde la Fase 1 con `next-themes`).
- Conectar la página de inicio a los datos reales (`ContenidoInicio`,
  `Categoria`) en lugar de contenido de placeholder.
- Sentar las bases de accesibilidad (foco visible, `prefers-reduced-motion`).

## Identidad visual definida

**Concepto:** "Credencial de Seguridad Digital" — la idea de que
aprender ciberseguridad es como obtener una credencial de acceso
verificada. Se eligió deliberadamente para evitar los tres patrones
genéricos de diseño generado por IA (crema+serif+terracota,
negro+neón, broadsheet con reglas finas).

- **Paleta:** `#F7F8FC` fondo claro · `#0D1220` fondo oscuro · `#3B4CCA`
  "Índigo Escudo" (primario) · `#F2A93B` "Ámbar Alerta" (amenazas) ·
  `#16A394` "Verde Verificado" (aprobado/seguro) · `#12172B` (tinta/texto).
- **Tipografía:** Space Grotesk (titulares, carácter técnico-geométrico),
  Inter (cuerpo, legibilidad en contenido educativo largo), IBM Plex
  Mono (códigos, badges, elementos técnicos — nexo temático con
  ciberseguridad).
- **Elemento de firma:** una tarjeta de "credencial de acceso" en el
  hero, con una línea de escaneo animada y el estado "Acceso: Seguro",
  respetando `prefers-reduced-motion`.

## Funcionalidades implementadas

- Navbar sticky con blur, menú de escritorio y menú móvil desplegable,
  ambos alimentados dinámicamente desde `ItemMenu` (ubicación HEADER).
- Footer con los ítems de ubicación FOOTER, descripción del proyecto y
  aviso de copyright con año dinámico.
- Botón de cambio de tema claro/oscuro funcional, sin parpadeo (FOUC)
  gracias a `next-themes` + manejo de estado `mounted`.
- Home page conectada a `ContenidoInicio` (con valores de respaldo si
  aún no se ejecutó el seed) y a `Categoria` (grilla dinámica de
  temas/amenazas con íconos).
- Sección "Cómo funciona" con 3 pasos reales (Aprende → Practica →
  Obtén tu credencial) — numeración justificada porque es un proceso
  secuencial real, no decorativo.

## Arquitectura utilizada

Se mantiene Clean Architecture. Esta fase trabaja principalmente en la
capa de **UI** (`components/`, `app/`), consumiendo la capa de
**Infraestructura** ya existente (nuevos repositorios `menu`,
`contenido-inicio` y `banner`, siguiendo el patrón establecido en la
Fase 2).

```
UI (app/page.tsx, components/layout/, components/home/)  ← foco de esta fase
   ↓
Infrastructure (repository/menu, contenido-inicio, banner)  ← nuevo en esta fase
```

## Tecnologías empleadas

- `next/font/google` para Space Grotesk, Inter e IBM Plex Mono
  (optimización automática de fuentes, sin CDN externo).
- `lucide-react` (ya instalado en Fase 1) para los íconos de UI.
- Tailwind CSS: nuevos tokens de color (`primary`, `alerta`, `seguro`,
  `ink`, `surface`) y animaciones (`scan`, `fade-in-up`).

## Estructura de carpetas

Cambios respecto a la Fase 2:

```
cybersecurity-edu/
├── app/
│   ├── layout.tsx          (modificado: fuentes + Navbar/Footer)
│   ├── page.tsx            (reescrito: conectado a datos reales)
│   └── globals.css         (modificado: tokens de accesibilidad)
├── components/
│   ├── layout/
│   │   ├── navbar.tsx           (nuevo)
│   │   ├── footer.tsx           (nuevo)
│   │   ├── mobile-nav.tsx       (nuevo)
│   │   ├── theme-toggle.tsx     (nuevo)
│   │   └── theme-provider.tsx   (sin cambios, de Fase 1)
│   ├── home/
│   │   ├── security-clearance-card.tsx  (nuevo)
│   │   ├── category-grid.tsx            (nuevo)
│   │   └── how-it-works.tsx             (nuevo)
│   └── ui/
│       └── logo.tsx             (nuevo)
├── lib/
│   ├── fonts.ts              (nuevo)
│   └── iconos-categorias.ts  (nuevo)
├── repository/
│   ├── menu.repository.ts             (nuevo)
│   ├── contenido-inicio.repository.ts (nuevo)
│   └── banner.repository.ts           (nuevo)
├── tailwind.config.ts        (modificado: paleta y tipografía definitivas)
```

## Archivos creados

| Archivo | Propósito |
|---|---|
| `components/layout/navbar.tsx` | Navbar sticky, Server Component, lee `ItemMenu` |
| `components/layout/footer.tsx` | Footer, Server Component, lee `ItemMenu` |
| `components/layout/mobile-nav.tsx` | Menú móvil desplegable (Client Component) |
| `components/layout/theme-toggle.tsx` | Botón de cambio de tema claro/oscuro |
| `components/home/security-clearance-card.tsx` | Elemento de firma visual del hero |
| `components/home/category-grid.tsx` | Grilla dinámica de categorías/amenazas |
| `components/home/how-it-works.tsx` | Sección de 3 pasos del proceso |
| `components/ui/logo.tsx` | Logo SVG propio (escudo minimalista) |
| `lib/fonts.ts` | Configuración de Space Grotesk / Inter / IBM Plex Mono |
| `lib/iconos-categorias.ts` | Mapa slug → ícono para categorías |
| `repository/menu.repository.ts` | Repositorio de `ItemMenu` (header/footer) |
| `repository/contenido-inicio.repository.ts` | Repositorio singleton de `ContenidoInicio` |
| `repository/banner.repository.ts` | Repositorio de `Banner` |
| `docs/03-FASE-3.md` | Este documento |

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `tailwind.config.ts` | Paleta de colores definitiva (`primary`, `alerta`, `seguro`, `ink`, `surface`) y tipografía (`display`, `sans`, `mono`); animaciones `scan` y `fade-in-up` |
| `app/layout.tsx` | Se agregan las variables de fuente y se envuelve el contenido con `<Navbar />` y `<Footer />` |
| `app/page.tsx` | Reescritura completa: hero conectado a `ContenidoInicio`, grilla de categorías conectada a `Categoria`, sección de proceso |
| `app/globals.css` | Se usa `var(--font-body)` en vez de `var(--font-sans)`; se agregan estilos de foco visible y soporte de `prefers-reduced-motion` |
| `docs/00-INDICE.md` | Progreso actualizado a 3/10 fases (30%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.3.0 |

## Componentes desarrollados

- `Navbar` (Server Component, async, consulta `menuRepository`)
- `Footer` (Server Component, async, consulta `menuRepository`)
- `MobileNav` (Client Component, estado de apertura/cierre)
- `ThemeToggle` (Client Component, `next-themes`)
- `Logo` (Server Component, SVG puro)
- `SecurityClearanceCard` (Server Component, elemento de firma)
- `CategoryGrid` (Server Component, recibe `categorias` por props)
- `HowItWorks` (Server Component, contenido estático de 3 pasos)

## Base de datos

Sin cambios en el schema en esta fase. Se agregaron repositorios nuevos
(`menu`, `contenido-inicio`, `banner`) que consumen modelos ya definidos
en la Fase 2 (`ItemMenu`, `ContenidoInicio`, `Banner`).

## APIs implementadas

Ninguna todavía (la navbar/footer consultan la base de datos
directamente desde Server Components, sin pasar por una API Route).

## Hooks creados

Ninguno todavía (el estado del menú móvil usa `useState` local, sin
necesidad de un hook reutilizable por ahora).

## Utilidades creadas

- `lib/fonts.ts`: instancias de `next/font/google` reutilizadas en
  `app/layout.tsx`.
- `lib/iconos-categorias.ts`: función `getIconoCategoria(slug)` con
  fallback seguro (`ShieldQuestion`) para categorías sin ícono asignado.

## Dependencias instaladas

Ninguna nueva (se usan `lucide-react` y `next/font/google`, ya
disponibles desde Next.js y la Fase 1).

## Variables de entorno

Sin cambios respecto a la Fase 2.

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

- Tokens de color y tipografía definitivos en `tailwind.config.ts`
  (reemplazan la paleta provisional de la Fase 1).
- Variables CSS de fuente (`--font-display`, `--font-body`,
  `--font-mono`) inyectadas en la etiqueta `<html>` vía `next/font`.

## Capturas o diagramas

No aplica (sin herramienta de captura de pantalla en este entorno). Se
recomienda al usuario tomar capturas tras ejecutar `npm run dev` para
uso en el manual de usuario final (Fase 10).

## Decisiones técnicas tomadas

1. **Navbar y Footer como Server Components asíncronos** que consultan
   Prisma directamente (vía repositorios), en lugar de pasar los datos
   desde `layout.tsx`. Esto mantiene a cada componente autocontenido y
   evita tener que perforar props (prop drilling) del layout raíz hacia
   componentes anidados.
2. **Enlaces de `CategoryGrid` apuntan a `/amenazas/[slug]`**, una ruta
   que todavía no existe (se construye en la Fase 4). Se documenta aquí
   explícitamente para que no se interprete como un enlace roto por
   error: es intencional y quedará resuelto en la siguiente fase.
3. **Valores de respaldo (`HERO_POR_DEFECTO`) en `app/page.tsx`**: si el
   usuario ejecuta `npm run dev` sin haber corrido el seed todavía, la
   home sigue mostrando contenido coherente en vez de campos vacíos o
   un error de `null`.
4. **`next/font/google` en lugar de un `<link>` a Google Fonts**: evita
   una petición de red adicional en el navegador del visitante (Next.js
   descarga y auto-aloja las fuentes en tiempo de build), mejorando
   Core Web Vitals — relevante de cara a la Fase 9 (optimización).
5. **Paso de proceso numerado (01/02/03) en `HowItWorks`**, a diferencia
   de la advertencia general contra numeración decorativa: aquí sí
   corresponde, porque representa una secuencia real que el estudiante
   sigue (aprender → practicar → certificarse), no una lista arbitraria.

## Problemas encontrados

- Mismo límite de entorno que en fases anteriores: sin acceso a red no
  se pudo ejecutar `next build` ni `tsc --noEmit` para confirmar que el
  proyecto compila con los tipos reales de Prisma Client.

## Soluciones aplicadas

- Se verificó manualmente el balance de llaves, paréntesis y corchetes
  en los 23 archivos `.ts`/`.tsx` nuevos o modificados (todos
  balanceados).
- Se revisó cuidadosamente que los nombres de campos usados en los
  componentes (`ubicacion`, `padreId`, `orden`, `etiqueta`, `slug`,
  `nombre`, `descripcion`, `heroTitulo`, etc.) coincidan exactamente con
  los definidos en `prisma/schema.prisma` tras la corrección de la
  Fase 2.
- Se recomienda al usuario, tras descomprimir esta entrega, correr
  `npm run build` localmente antes de continuar con la Fase 4, y
  reportar cualquier error de tipos para corregirlo de inmediato (como
  se hizo con el error P1012 de la fase anterior).

## Mejoras realizadas

- Se estableció un sistema de diseño reutilizable (colores, tipografía,
  animaciones) que todas las fases siguientes deben respetar, en lugar
  de improvisar estilos página por página.

## Pruebas ejecutadas

- Verificación manual de sintaxis (balance de llaves/paréntesis/corchetes).
- Pendiente de ejecutar por el usuario:
  ```bash
  npm run dev
  ```
  y confirmar visualmente: navbar con los 6 ítems sembrados, footer con
  los 4 ítems sembrados, cambio de tema funcional, hero con el texto de
  `ContenidoInicio`, y grilla con las 7 categorías sembradas.

## Resultado esperado

Al ejecutar `npm run dev` y abrir `http://localhost:3000`, debe verse
una home completa: navbar sticky con blur y los 6 enlaces del header,
hero con la credencial de acceso animada, grilla de 7 categorías con
íconos, sección de 3 pasos, y footer con los 4 enlaces correspondientes.
El botón de sol/luna debe alternar el tema sin parpadeos.

## Cómo ejecutar esta fase

```bash
scripts\iniciar_proyecto.bat
```

O manualmente:

```bash
npm install
npm run dev
```

## Pendientes para la siguiente fase

- Construir las páginas de contenido educativo reales: Amenazas (con
  subpáginas por categoría, ya enlazadas desde `CategoryGrid`), Buenas
  Prácticas, Glosario (consumiendo `TerminoGlosario`) y FAQ (consumiendo
  `PreguntaFrecuente`).
- Construir las páginas Noticias, Recursos, Contacto y Acerca del
  Proyecto.
- Definir el layout de artículo/publicación individual
  (`/noticias/[slug]`, `/amenazas/[categoria]/[slug]` o similar).

# Rediseño Visual — CiberShield UTLVT

> Esta intervención no corresponde a ninguna de las 10 fases del
> roadmap original (esas siguen documentadas en `01-FASE-1.md` a
> `04-FASE-4.md`). Es un rediseño visual y rebranding solicitado
> explícitamente por el usuario, documentado aquí por separado para no
> alterar el registro histórico de las fases.

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-04 | 2026-08-04 |

## Objetivo de la solicitud

Remodelación visual completa del proyecto (ahora rebautizado
**CiberShield UTLVT**) sin modificar la lógica interna: base de datos,
Prisma, rutas, APIs, validaciones ni funcionalidades existentes.

## Estrategia técnica

Casi todos los componentes de la Fase 3 y 4 usan **nombres de tokens de
Tailwind** (`primary-500`, `seguro-500`, `ink-900`, `surface-dark`,
etc.) en vez de colores literales (`#3B4CCA`, `bg-blue-600`...). Esto
permitió lograr una identidad visual completamente distinta cambiando
únicamente los valores hexadecimales centralizados en
`tailwind.config.ts` y las fuentes en `lib/fonts.ts`, **sin tocar la
lógica de negocio de ningún componente**. Solo se editó la presentación
(clases, JSX decorativo, copy de marca) donde el brief lo pedía
explícitamente (ej. botones principales en verde).

## Cambios de identidad visual

### Paleta de colores (antes → después)

| Token | Antes ("Índigo Escudo") | Ahora ("Azul Escudo" — CiberShield) |
|---|---|---|
| `primary-500` | `#3B4CCA` (índigo-violeta) | `#123A66` (azul profundo) |
| `seguro-500` | `#16A394` (verde-teal) | `#1FA85C` (verde escudo, acento) |
| `alerta-500` | `#F2A93B` | `#EFA028` (ajuste sutil) |
| `ink-900` | `#12172B` | `#131C2B` (gris-azulado neutro) |
| `surface-light/dark` | `#F7F8FC` / `#0D1220` | `#F7F9FB` / `#0A1220` |

El verde (`seguro`) se usa ahora deliberadamente para: botones
principales (CTA del hero, envío del formulario de contacto), estados
activos (filtro seleccionado en `/recursos`), e indicadores de
seguridad (punto de estado en el logo y en el panel del hero) — tal
como pidió el brief, en vez de un uso decorativo genérico.

### Tipografía (antes → después)

| Uso | Antes | Ahora |
|---|---|---|
| Titulares (`--font-display`) | Space Grotesk | **Sora** |
| Cuerpo (`--font-body`) | Inter | Inter (sin cambios, ya cumplía bien) |
| Utilitaria (`--font-mono`) | IBM Plex Mono | **JetBrains Mono** |

### Marca

- Nombre del sitio: `CiberSeguridad Estudiantil` → **`CiberShield
  UTLVT`** (actualizado en `lib/constants.ts`, `Logo`, `seed.ts`
  (`Configuracion`), `README.md`, y en el contenido visible de
  `/acerca-del-proyecto`).
- Logo rediseñado: escudo sólido en azul profundo + indicador de
  estado en verde (punto con animación `pulse-ring`) + wordmark
  "CiberShield" (tinta) + "UTLVT" (verde, tipografía mono, estilo
  sello/badge).
- Elemento de firma del hero renombrado de "Credencial de Seguridad
  Digital" a **"Panel de Seguridad / Escudo Activo"**, con rejilla de
  puntos decorativa y la misma línea de escaneo de la Fase 3 (ahora en
  la nueva paleta).

## Cambios de composición (no solo de color)

- **Hero de la home completamente reestructurado**: se agregó una
  franja de estadísticas reales (`StatsStrip`) con conteos tomados en
  vivo de la base de datos (categorías, publicaciones, recursos,
  términos de glosario) — no son cifras inventadas. El panel de
  seguridad ahora tiene una ligera rotación (`md:rotate-1`) que se
  endereza al pasar el cursor, dando sensación de "panel flotante".
- **Navbar**: se agregó una línea de acento superior con gradiente
  azul→verde→azul, sin alterar la lógica de obtención de ítems desde
  `ItemMenu`.
- **Footer**: se agregó una insignia "Plataforma activa" en verde y se
  actualizó el copy institucional, sin tocar la consulta a `ItemMenu`.
- **Botones principales y estados activos → verde**: CTA del hero,
  botón de envío del formulario de contacto, CTA de
  `/sobre-ciberseguridad`, filtro activo de `/recursos`. El resto de la
  interfaz (enlaces de navegación, badges informativos) se mantiene en
  azul profundo, evitando el uso excesivo de un solo color de acento.

## Archivos modificados

| Archivo | Tipo de cambio |
|---|---|
| `tailwind.config.ts` | Paleta de colores completa + nuevo keyframe `pulse-ring` + utilidad `bg-dot-grid` |
| `lib/fonts.ts` | Cambio de fuentes de titulares y mono |
| `lib/constants.ts` | Nuevo `SITE_NAME` / `SITE_DESCRIPTION` |
| `app/layout.tsx` | `metadata.title` ahora usa `template` centralizado |
| `components/ui/logo.tsx` | Reescrito: nuevo wordmark + indicador de estado |
| `components/home/security-clearance-card.tsx` | Reescrito: nuevo copy y estilo ("Panel de Seguridad") |
| `components/home/stats-strip.tsx` | **Nuevo** componente de estadísticas reales |
| `app/page.tsx` | Hero reestructurado (rejilla decorativa, stats, CTA verde) |
| `components/layout/navbar.tsx` | Acento de marca superior |
| `components/layout/footer.tsx` | Insignia "Plataforma activa", copy actualizado |
| `components/contact/contact-form.tsx` | Botón de envío → verde |
| `app/recursos/page.tsx` | Filtro activo → verde |
| `app/sobre-ciberseguridad/page.tsx` | CTA principal → verde, mención de marca actualizada |
| `app/acerca-del-proyecto/page.tsx` | Mención de marca actualizada |
| `prisma/seed.ts` | `Configuracion` con nuevo nombre de marca; `upsert` corregido para actualizar (no solo crear) |
| `README.md` | Encabezado y descripción actualizados |
| Títulos de metadata (11 páginas) | Simplificados para usar el `template` del layout raíz en vez de repetir el nombre del sitio |

## Qué NO se tocó (verificado explícitamente)

- `prisma/schema.prisma`: sin cambios. Los 20 modelos y sus relaciones
  siguen intactos.
- Ninguna migración fue alterada.
- Ninguna ruta fue renombrada, movida ni eliminada.
- `app/api/contacto/route.ts`: sin cambios en la lógica de validación.
- Todos los repositorios (`repository/*.ts`): sin cambios.
- Todos los esquemas Zod (`lib/validations/*.ts`): sin cambios.
- Variables de entorno: sin cambios.
- `next.config.mjs`, `tsconfig.json`, `postcss.config.js`: sin cambios.
- Dependencias de `package.json`: sin cambios (no se agregó ninguna
  librería nueva; `next/font/google` ya estaba disponible desde la
  Fase 3, solo se cambió qué fuentes se solicitan).

## Decisiones técnicas tomadas

1. **Recolorear tokens en vez de renombrarlos**: permite un rediseño
   visual total tocando un solo archivo centralizado
   (`tailwind.config.ts`) en lugar de decenas de componentes,
   minimizando el riesgo de romper algo funcional — exactamente lo que
   pedía la regla más importante del brief.
2. **`title.template` en el layout raíz**: en vez de repetir
   `"... | CiberSeguridad Estudiantil"` en 11 archivos distintos (como
   se hizo en la Fase 4), se centralizó en una sola plantilla de
   Next.js. Esto es una mejora de mantenibilidad que además resuelve el
   rebranding en todas las páginas a la vez.
3. **Corrección del `upsert` de `Configuracion` en el seed**: el
   `upsert` original solo escribía datos en `create`, dejando
   `update: {}` vacío. Si el usuario ya había ejecutado el seed antes
   de este rediseño, volver a ejecutarlo no habría actualizado el
   nombre del sitio en su base de datos existente. Se corrigió para que
   `update` también aplique los nuevos valores.
4. **Stats con datos reales, no inventados**: el brief pedía
   indicadores "si los datos existentes lo permiten" y explícitamente
   prohibía introducir datos falsos. Se usaron conteos reales vía los
   repositorios ya existentes (`categoriaRepository`,
   `publicacionRepository`, `recursoRepository`,
   `glosarioRepository`).

## Problemas encontrados

- Mismo límite recurrente del entorno: sin acceso a red no se pudo
  ejecutar `next build` para confirmar que las nuevas fuentes de Google
  (`Sora`, `JetBrains_Mono`) se resuelven correctamente vía
  `next/font/google` (requiere red en tiempo de build, disponible en la
  máquina del usuario, no aquí).

## Soluciones aplicadas

- Se verificó manualmente el balance de llaves/paréntesis/corchetes en
  los 50 archivos `.ts`/`.tsx` del proyecto tras el rediseño.
- Se verificó que ningún archivo de código (`.ts`/`.tsx`/`.json`)
  contuviera ya el nombre de marca anterior.
- Se corrigió una clase de Tailwind duplicada sin efecto
  (`bg-dot-grid bg-dot-grid`) detectada durante la revisión final.
- Se recuerda al usuario ejecutar `npm run dev` (las fuentes de Google
  se descargan automáticamente en el primer build) y reportar cualquier
  error de inmediato, como en las fases anteriores.

## Pruebas ejecutadas

- Verificación manual de sintaxis y de ausencia de referencias al
  nombre de marca anterior.
- Pendiente de ejecutar por el usuario: `npm run dev` y revisar
  visualmente cada página, el modo oscuro, el menú móvil y el
  formulario de contacto.

## Resultado esperado

La aplicación debe verse notoriamente distinta a la entrega de la
Fase 4: paleta azul profundo + verde en vez de índigo-violeta + teal,
tipografía de titulares Sora en vez de Space Grotesk, logo y nombre
"CiberShield UTLVT" en navbar/footer/pestaña del navegador, y una home
con estadísticas reales visibles. Todas las rutas, formularios, el
modo oscuro/claro y la carga de datos desde Prisma deben seguir
funcionando exactamente igual que antes.

## Cómo verificar

```bash
scripts\iniciar_proyecto.bat
```

Revisar especialmente:
- Pestaña del navegador: debe decir "CiberShield UTLVT" en home, y
  "Nombre de página | CiberShield UTLVT" en las demás.
- Logo en navbar/footer con el punto verde de estado.
- Botones verdes: CTA del hero, envío de contacto, CTA de "Sobre la
  Ciberseguridad", filtro activo de Recursos.
- Estadísticas reales bajo el CTA del hero (deben coincidir con los
  datos sembrados: 7 categorías, 3 publicaciones, 1 recurso, 6
  términos de glosario aproximadamente, según lo que tengas en tu
  base de datos).

## Pendientes

Ninguno específico de este rediseño. Los pendientes de fases
anteriores (envío real de email desde `/api/contacto`, Fase 5 de
autenticación, etc.) siguen vigentes y no fueron afectados por este
cambio visual.

# Fase 4 — Contenido Educativo

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-04 | 2026-08-04 |

## Objetivos

- Construir todas las páginas públicas de contenido informativo listadas
  en el brief original: Sobre la Ciberseguridad, Amenazas, Buenas
  Prácticas, Recursos, Noticias, Glosario, FAQ, Contacto y Acerca del
  Proyecto.
- Conectar cada página a los modelos de datos reales definidos en la
  Fase 2 (nada de contenido hardcodeado salvo donde no existe un modelo
  dedicado, como Buenas Prácticas).
- Extender el Repository Pattern a las entidades de contenido
  (`Publicacion`, `Recurso`, `TerminoGlosario`, `PreguntaFrecuente`).
- Implementar un primer formulario funcional (Contacto) con validación
  Zod compartida entre cliente y servidor.

## Funcionalidades implementadas

- **`/amenazas`**: grilla de categorías (reutiliza `CategoryCard`).
- **`/amenazas/[slug]`**: detalle de categoría con sus artículos
  publicados.
- **`/articulos/[slug]`** y **`/noticias/[slug]`**: detalle de
  publicación, compartiendo el mismo componente `PublicacionDetalle`
  (ya que `Publicacion` unifica ambos tipos desde la Fase 2).
- **`/noticias`**: listado de noticias publicadas.
- **`/buenas-practicas`**: 8 prácticas curadas con ícono, título y
  descripción.
- **`/recursos`**: listado filtrable por tipo (PDF/Video/Enlace/Imagen)
  vía `searchParams`, sin JavaScript de cliente adicional.
- **`/glosario`**: términos agrupados alfabéticamente con índice de
  navegación rápida (A-Z).
- **`/faq`**: acordeón accesible usando `<details>`/`<summary>` nativos
  (sin JavaScript extra, funciona incluso sin hidratación).
- **`/contacto`**: formulario con validación Zod en cliente y servidor,
  estados de carga/éxito/error.
- **`/sobre-ciberseguridad`** y **`/acerca-del-proyecto`**: páginas
  informativas estáticas.
- Seed ampliado con contenido de ejemplo real: 2 artículos, 1 noticia y
  1 recurso, para que las páginas no se vean vacías en la primera
  ejecución.

## Arquitectura utilizada

Continúa Clean Architecture por capas. Esta fase completa la capa de
**Infraestructura** (4 repositorios nuevos) y construye extensamente la
capa de **UI** (12 páginas + 8 componentes compartidos).

```
UI (app/amenazas, app/noticias, app/glosario, app/faq, ...)
   ↓
Infrastructure (repository/publicacion, recurso, glosario, faq)
```

## Tecnologías empleadas

Sin nuevas dependencias — se reutiliza el stack ya instalado (Next.js
App Router, Zod, Tailwind, `lucide-react`).

## Estructura de carpetas

```
cybersecurity-edu/
├── app/
│   ├── amenazas/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── articulos/[slug]/page.tsx
│   ├── noticias/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── buenas-practicas/page.tsx
│   ├── recursos/page.tsx
│   ├── glosario/page.tsx
│   ├── faq/page.tsx
│   ├── contacto/page.tsx
│   ├── sobre-ciberseguridad/page.tsx
│   ├── acerca-del-proyecto/page.tsx
│   └── api/contacto/route.ts
├── components/
│   ├── shared/
│   │   ├── page-header.tsx
│   │   ├── empty-state.tsx
│   │   ├── category-card.tsx
│   │   ├── article-card.tsx
│   │   ├── resource-card.tsx
│   │   └── publicacion-detalle.tsx
│   └── contact/
│       └── contact-form.tsx
├── repository/
│   ├── publicacion.repository.ts
│   ├── recurso.repository.ts
│   ├── glosario.repository.ts
│   └── faq.repository.ts
├── lib/
│   └── validations/
│       └── contacto.schema.ts
```

## Archivos creados

| Archivo | Propósito |
|---|---|
| `app/amenazas/page.tsx` | Listado de categorías de amenazas |
| `app/amenazas/[slug]/page.tsx` | Detalle de categoría + sus artículos |
| `app/articulos/[slug]/page.tsx` | Detalle de artículo |
| `app/noticias/page.tsx` | Listado de noticias |
| `app/noticias/[slug]/page.tsx` | Detalle de noticia |
| `app/buenas-practicas/page.tsx` | Página de buenas prácticas |
| `app/recursos/page.tsx` | Listado de recursos con filtro |
| `app/glosario/page.tsx` | Glosario con índice A-Z |
| `app/faq/page.tsx` | Acordeón de preguntas frecuentes |
| `app/contacto/page.tsx` | Página de contacto |
| `app/sobre-ciberseguridad/page.tsx` | Página introductoria |
| `app/acerca-del-proyecto/page.tsx` | Página institucional |
| `app/api/contacto/route.ts` | Endpoint de validación del formulario |
| `components/shared/page-header.tsx` | Encabezado reutilizable |
| `components/shared/empty-state.tsx` | Estado vacío reutilizable |
| `components/shared/category-card.tsx` | Tarjeta de categoría (extraída de Fase 3) |
| `components/shared/article-card.tsx` | Tarjeta de artículo/noticia |
| `components/shared/resource-card.tsx` | Tarjeta de recurso |
| `components/shared/publicacion-detalle.tsx` | Detalle compartido artículo/noticia |
| `components/contact/contact-form.tsx` | Formulario de contacto (cliente) |
| `repository/publicacion.repository.ts` | Repositorio de artículos/noticias |
| `repository/recurso.repository.ts` | Repositorio de recursos |
| `repository/glosario.repository.ts` | Repositorio de glosario |
| `repository/faq.repository.ts` | Repositorio de FAQ |
| `lib/validations/contacto.schema.ts` | Validación Zod del formulario de contacto |
| `docs/04-FASE-4.md` | Este documento |

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `components/home/category-grid.tsx` | Refactorizado para usar `CategoryCard` compartido en vez de duplicar el markup |
| `prisma/seed.ts` | Se agregan `seedPublicaciones()` y `seedRecursos()`; categorías ahora incluyen `descripcion` |
| `lib/constants.ts` | Se elimina `NAV_LINKS` (código muerto desde que Fase 3 conectó la navegación a `ItemMenu`) |
| `docs/00-INDICE.md` | Progreso actualizado a 4/10 fases (40%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.4.0 |

## Componentes desarrollados

`PageHeader`, `EmptyState`, `CategoryCard` (extraído), `ArticleCard`,
`ResourceCard`, `PublicacionDetalle`, `ContactForm`.

## Base de datos

Sin cambios en el schema. Se amplió `prisma/seed.ts` para incluir datos
de ejemplo reales en `Publicacion` (2 artículos + 1 noticia) y `Recurso`
(1 recurso), de modo que las páginas de esta fase muestren contenido
real al probarlas por primera vez.

## APIs implementadas

- `POST /api/contacto`: valida el formulario de contacto con Zod y
  registra el mensaje en el log del servidor.
  **⚠️ Pendiente:** no envía un correo real todavía (ver "Pendientes").

## Hooks creados

Ninguno nuevo (el formulario de contacto usa `useState` local).

## Utilidades creadas

- `lib/validations/contacto.schema.ts`: esquema Zod compartido entre el
  componente cliente (`ContactForm`) y el endpoint del servidor
  (`api/contacto/route.ts`), evitando duplicar las reglas de validación.

## Dependencias instaladas

Ninguna nueva.

## Variables de entorno

Sin cambios (el envío real de email, cuando se implemente, requerirá
una nueva variable como `RESEND_API_KEY` o similar — ver pendientes).

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

Ninguna configuración de proyecto adicional.

## Capturas o diagramas

No aplica (sin herramienta de captura en este entorno).

## Decisiones técnicas tomadas

1. **`/articulos/[slug]` y `/noticias/[slug]` comparten el componente
   `PublicacionDetalle`** en lugar de duplicar el layout de detalle,
   consistente con la decisión de la Fase 2 de unificar ambos tipos en
   el modelo `Publicacion`.
2. **`/recursos` usa `searchParams` de Next.js para el filtro** en vez
   de un componente cliente con `useState` + `fetch`. Esto mantiene la
   página como Server Component puro (más rápida, indexable por
   buscadores) y el filtro funciona incluso con JavaScript
   deshabilitado, ya que son enlaces `<Link>` normales.
3. **FAQ usa `<details>`/`<summary>` nativos del navegador** en lugar de
   un componente de acordeón en React con estado. Es accesible por
   defecto, no requiere JavaScript de cliente, y reduce el bundle de la
   página.
4. **Formulario de Contacto sí es un Client Component** (a diferencia
   del resto de la fase): es la única página que necesita
   interactividad real (validación en tiempo real, estados de
   carga/éxito) que no puede lograrse solo con Server Components.
5. **El endpoint `/api/contacto` no envía email todavía** — se decidió
   entregar la validación y el flujo completo de UI ahora, dejando
   explícitamente documentado que la integración con un proveedor de
   email (Resend, SMTP, etc.) es un paso pendiente que requiere que el
   usuario decida qué proveedor usar y proporcione sus credenciales.

## Problemas encontrados

- Mismo límite de entorno recurrente: sin acceso a red no se pudo
  ejecutar `next build` para validar tipos contra el Prisma Client real.

## Soluciones aplicadas

- Se verificó manualmente el balance de llaves/paréntesis/corchetes en
  los 48 archivos `.ts`/`.tsx` relevantes del proyecto (todos
  balanceados).
- Se comparó cada nombre de campo usado en los nuevos componentes
  (`publicadoEn`, `metaTitulo`, `categoriaId`, `pregunta`, `respuesta`,
  `termino`, `definicion`, `letra`, etc.) contra `prisma/schema.prisma`
  línea por línea para confirmar coincidencia exacta.
- Se recuerda al usuario ejecutar `npm run build` (o
  `scripts\compilar_produccion.bat`) tras descomprimir esta entrega y
  reportar cualquier error de inmediato.

## Mejoras realizadas

- Se eliminó código muerto (`NAV_LINKS`) detectado durante esta fase.
- Se extrajo `CategoryCard` como componente compartido, eliminando
  duplicación entre la home (Fase 3) y `/amenazas` (Fase 4).

## Pruebas ejecutadas

- Verificación manual de sintaxis y de coincidencia de campos con el
  schema.
- Pendiente de ejecutar por el usuario: `npm run dev` y navegar cada
  una de las 12 páginas nuevas, confirmando que el contenido de ejemplo
  sembrado se muestra correctamente y que el formulario de contacto
  completa su flujo de éxito.

## Resultado esperado

Cada enlace del header/footer debe llevar a una página funcional con
contenido real (no un 404, salvo que el usuario navegue a una
categoría/artículo que no exista). El formulario de contacto debe
mostrar el mensaje de éxito y, al revisar la consola del servidor
(`npm run dev`), debe verse el log `📩 Nuevo mensaje de contacto...`.

## Cómo ejecutar esta fase

```bash
scripts\crear_base_datos.bat
scripts\iniciar_proyecto.bat
```

Luego navega a: `/amenazas`, `/amenazas/phishing`,
`/articulos/como-reconocer-un-correo-de-phishing`, `/noticias`,
`/buenas-practicas`, `/recursos`, `/glosario`, `/faq`, `/contacto`,
`/sobre-ciberseguridad`, `/acerca-del-proyecto`.

## Pendientes para la siguiente fase

- **Envío real de email desde `/api/contacto`**: se necesita elegir un
  proveedor (Resend, SMTP propio, etc.) y configurar su variable de
  entorno. No forma parte de las 10 fases originales del proyecto, por
  lo que se atenderá si el usuario lo solicita explícitamente.
- Implementar autenticación y roles (Fase 5), que es prerrequisito para
  que el panel administrativo (Fase 6) pueda gestionar todo este
  contenido desde una interfaz gráfica en vez de editarse solo por
  seed.

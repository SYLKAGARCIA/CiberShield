# Changelog

Todas las modificaciones importantes del proyecto se documentan en este
archivo, en orden cronológico descendente (más reciente primero).

---

## [0.1.0] — 2026-08-03

**Fase:** 1 — Setup base del proyecto

### Añadido

- Inicialización del proyecto con Next.js 14 (App Router) + TypeScript.
- Configuración de Tailwind CSS con soporte de modo oscuro/claro
  (`next-themes`).
- Configuración de Prisma ORM con base de datos SQLite local.
- Estructura de carpetas completa siguiendo Clean Architecture y
  Repository Pattern (`app/`, `components/`, `features/`, `hooks/`,
  `lib/`, `services/`, `repository/`, `prisma/`, `types/`, `public/`,
  `styles/`, `middleware/`, `config/`, `scripts/`, `docs/`).
- Modelo Prisma `HealthCheck` para verificar la conexión a base de datos.
- Cliente Prisma en patrón singleton (`lib/prisma.ts`).
- Utilidad `cn()` para combinar clases de Tailwind.
- Middleware placeholder para protección futura de rutas `/admin/*`.
- Headers de seguridad base en `next.config.mjs`.
- Página de inicio provisional de verificación de setup.
- `README.md` con instrucciones de instalación paso a paso.
- Documentación inicial: `docs/00-INDICE.md`, `docs/01-FASE-1.md`,
  `docs/CHANGELOG.md`.

### Archivos creados

`package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`,
`postcss.config.js`, `.eslintrc.json`, `.gitignore`, `.env.example`,
`prisma/schema.prisma`, `prisma/seed.ts`, `lib/prisma.ts`, `lib/utils.ts`,
`lib/constants.ts`, `types/index.ts`, `middleware.ts`, `app/globals.css`,
`app/layout.tsx`, `app/page.tsx`,
`components/layout/theme-provider.tsx`, `README.md`,
`docs/00-INDICE.md`, `docs/01-FASE-1.md`, `docs/CHANGELOG.md`.

### Archivos modificados

Ninguno (proyecto inicial).

### Errores corregidos

No aplica (primera fase).

### Mejoras implementadas

No aplica (primera fase).

### Notas

- Se usó SQLite en lugar de PostgreSQL/Supabase por decisión del usuario,
  para permitir desarrollo 100% local. Migración futura documentada en
  `docs/01-FASE-1.md`.
- El entorno de generación no tiene acceso a red, por lo que `npm install`
  y las migraciones deben ejecutarse localmente (instrucciones en
  `README.md`).

---

## [0.9.0] — 2026-08-05

**Fase:** 9 — SEO, accesibilidad y PWA

### Añadido

- SEO técnico completo: `lib/seo.ts` (`construirMetadata()`),
  `app/sitemap.ts` (dinámico), `app/robots.ts`, `app/opengraph-image.tsx`,
  y datos estructurados JSON-LD (`EducationalOrganization`, `WebSite`,
  `Article`, `FAQPage`).
- PWA: `app/manifest.ts`, íconos generados con `next/og`
  (`icon.tsx`, `apple-icon.tsx`, `icons/192`, `icons/512`), Service
  Worker (`public/sw.js`) con caché inteligente y página `/offline`.
- Accesibilidad: skip link, `aria-current` en navegación activa,
  `role="alert"`/`aria-live` en errores de Login/Registro/Contacto.
- `SITE_URL` en `lib/constants.ts`.

### Corregido — hallazgo de accesibilidad real

- **Contraste de color insuficiente (WCAG 1.4.3)** detectado mediante
  cálculo de luminancia relativa, no revisión visual: texto blanco
  sobre `bg-seguro-500` daba ~3.1:1 (usado en 15+ botones); texto
  `alerta-600` sobre blanco daba ~3.0:1 (usado en 37 archivos como
  mensajes de error). Ambos tokens se oscurecieron en
  `tailwind.config.ts` hasta superar 5:1 de margen seguro.
- 4 usos puntuales de `text-alerta-500` como texto con significado
  (asterisco de campo requerido, ícono de resultado reprobado)
  corregidos a `text-alerta-600`.
- Paneles admin reforzados con metadata `noindex` (además de
  `robots.ts`).

### Archivos modificados

`app/layout.tsx`, `app/page.tsx`,
`components/shared/publicacion-detalle.tsx`, 12 páginas de contenido,
`components/layout/navbar.tsx`/`mobile-nav.tsx`,
`components/auth/login-form.tsx`/`registro-form.tsx`,
`components/contact/contact-form.tsx`,
`components/admin/form-fields.tsx`, `tailwind.config.ts`,
`lib/certificado-pdf.ts`, `app/admin/layout.tsx`, `lib/constants.ts`.

### Notas

- **Hallazgo menor sin corregir, documentado explícitamente**: textos
  con opacidad reducida sobre `ink-700` (ej. `text-ink-700/70`) dan
  ~4.1:1, levemente por debajo de 4.5:1. Afecta solo texto
  secundario/terciario (fechas, copyright), no controles ni errores.
  Ver recomendación en `docs/09-FASE-9.md`.
- Cero dependencias nuevas — todo se resolvió con capacidades ya
  incluidas en Next.js 14 (`next/og`, metadata routes) y APIs nativas
  del navegador (Service Worker, Cache API).

---

## [0.8.0] — 2026-08-04

**Fase:** 8 — Evaluaciones y certificados

### Añadido

- Registro público de estudiantes (`/registro`, rol `ESTUDIANTE`).
- Flujo completo de evaluaciones: listado, introducción, quiz,
  resultado — con calificación calculada en el **servidor**, nunca
  confiando en el cliente.
- Emisión automática de certificados en PDF (`pdf-lib`, nueva
  dependencia) al aprobar, con código de verificación pública en
  `/certificados/[codigo]` y buscador en `/certificados/verificar`.
- Panel admin de Evaluaciones (CRUD + gestión anidada de preguntas de
  opción múltiple) y listado de solo lectura de Certificados emitidos.
- 4 repositorios nuevos: `evaluacion`, `pregunta`,
  `resultado-evaluacion`, `certificado`.
- Evaluación de ejemplo sembrada: "Fundamentos de Ciberseguridad" (5
  preguntas, 70% para aprobar).

### Archivos modificados

`app/login/page.tsx`, `app/api/auth/login/route.ts`,
`components/admin/admin-sidebar.tsx`, `app/admin/page.tsx`,
`repository/certificado.repository.ts` (+ `findAllParaAdmin`),
`prisma/seed.ts`, `components/layout/footer.tsx`, `package.json` (+
`pdf-lib`), `docs/00-INDICE.md`, `docs/CHANGELOG.md`.

### Corregido

- Tercera instancia detectada de llamada directa a Prisma en una
  página (`app/admin/certificados/page.tsx`), corregida para usar el
  repositorio correspondiente.

### Notas

- **Incidente de entorno**: el sandbox se reinició a mitad de esta
  fase, perdiendo el trabajo hecho hasta ese punto. Se detectó de
  inmediato y se restauró el proyecto desde el `.zip` de la Fase 7
  antes de continuar — ver detalle completo en `docs/08-FASE-8.md`.
- **Limitación de despliegue documentada**: el PDF se guarda en disco
  local (`public/certificados/`), lo cual no funciona en Vercel (solo
  lectura salvo `/tmp`). Requerirá almacenamiento externo si se
  despliega ahí — documentado en `lib/certificado-storage.ts`.
- Alcance ajustado deliberadamente: sin UI de Insignias, sin edición
  in-place de preguntas, sin soporte de `OPCION_MULTIPLE` en el
  formulario admin (se simplificó a 4 opciones con una correcta).

---

## [0.7.0] — 2026-08-04

**Fase:** 7 — Herramientas interactivas

### Añadido

- 5 herramientas de práctica (100% client-side, sin persistencia salvo
  el checklist en `localStorage`): generador de contraseñas,
  verificador de fortaleza, simulador de phishing, calculadora de
  seguridad, checklist de seguridad digital.
- Página índice `/herramientas`.
- Buscador real (`/buscar`) contra `Publicacion` y `TerminoGlosario`,
  con filtro por categoría.
- `repository/publicacion.repository.ts` y
  `repository/glosario.repository.ts`: método `buscar()` nuevo en
  ambos.
- Ícono de búsqueda en el Navbar; "Herramientas" agregado a la
  navegación (header, footer y seed).

### Archivos modificados

`prisma/seed.ts`, `components/layout/navbar.tsx`,
`components/layout/footer.tsx`, `docs/00-INDICE.md`,
`docs/CHANGELOG.md`.

### Corregido

- Bug de "closure obsoleto" en el generador de contraseñas: tildar una
  casilla de opciones regeneraba la contraseña con el valor **anterior**
  de esa misma casilla (un paso de retraso), por usar
  `setTimeout(regenerar, 0)` sobre una función memoizada con
  `useCallback`. Se reemplazó por una función que construye las
  opciones completas con el valor nuevo y regenera de inmediato.
- `useSearchParams()` en `SearchBar` envuelto en `<Suspense>` (requisito
  de Next.js App Router para no forzar un *bailout* a cliente en toda
  la página).

### Notas

- Ninguna contraseña generada o evaluada sale del navegador del
  usuario — verificado explícitamente, documentado en la UI de ambas
  herramientas.
- Se usa `crypto.getRandomValues`, no `Math.random()`, para generar
  contraseñas (única fuente criptográficamente segura disponible en el
  navegador).
- Evaluaciones formales, quiz con puntaje persistente y certificados
  quedan para la Fase 8, como estaba previsto en el roadmap.

---

## [0.6.0] — 2026-08-04

**Fase:** 6 — Panel administrativo

### Añadido

- CRUD completo vía Server Actions para: Categorías, Artículos y
  Noticias (unificados), Glosario, Preguntas Frecuentes, Recursos,
  Menús, Usuarios (solo rol ADMIN) y Configuración general (registro
  único, solo rol ADMIN).
- Sidebar de navegación del panel, con secciones ocultas según rol.
- Dashboard con conteos reales de cada sección.
- Componentes compartidos: `AdminSidebar`, `AdminPageHeader`,
  `DeleteButton`, campos de formulario reutilizables, `SubmitButton`.
- Guards `requerirSesionAdmin()` / `requerirSesionSuperAdmin()` en
  `lib/auth.ts`, usados al inicio de toda Server Action del panel.
- 6 esquemas de validación Zod nuevos y `usuarioEditSchema`
  (contraseña opcional al editar).
- `repository/role.repository.ts` y `repository/configuracion.repository.ts` nuevos.
- `types/admin-form.ts`: tipo `EstadoFormulario` centralizado.

### Archivos modificados

`app/admin/layout.tsx`, `app/admin/page.tsx`, `lib/auth.ts`,
`lib/validations/usuario.schema.ts`,
`repository/publicacion.repository.ts` (+ `findParaAdmin`),
`docs/00-INDICE.md`, `docs/CHANGELOG.md`.

### Corregido

- Un archivo `'use server'` no puede reexportar tipos (solo funciones
  `async`): se centralizó `EstadoFormulario` en `types/admin-form.ts`
  antes de que el problema se propagara a más de un `actions.ts`.
- Se corrigió una llamada directa a Prisma en
  `app/admin/publicaciones/page.tsx` que rompía la arquitectura por
  capas; ahora usa `publicacionRepository.findParaAdmin()`.

### Notas

- Alcance ajustado deliberadamente: Banners/Carruseles, Evaluaciones,
  Preguntas y Certificados se gestionan en las Fases 7 y 8, no aquí.
- Punto de mayor incertidumbre (sin poder verificar con un build real
  en este entorno): compatibilidad de `useFormState`/`react-dom` con
  React 18.3.1 + Next.js 14.2.5 — documentada como decisión técnica en
  `docs/06-FASE-6.md`, se pide al usuario confirmar con `npm run build`.

---

## [0.5.0] — 2026-08-04

**Fase:** 5 — Autenticación y roles

### Añadido

- Autenticación real por sesiones opacas guardadas en base de datos
  (tabla `Session` nueva, no JWT).
- `POST /api/auth/login` y `POST /api/auth/logout`.
- Página `/login` con formulario validado en cliente y servidor.
- `/admin` protegido en dos capas: `middleware.ts` (Edge, verifica
  cookie) + `app/admin/layout.tsx` (Node.js, verifica sesión y rol
  contra la base de datos).
- Dashboard mínimo en `/admin` que confirma el flujo de autenticación.
- Navbar integrado con el estado de sesión ("Acceder" / "Panel Admin").

### Archivos creados

`lib/auth.ts`, `lib/auth-constants.ts`, `lib/validations/login.schema.ts`,
`repository/session.repository.ts`, `app/api/auth/login/route.ts`,
`app/api/auth/logout/route.ts`, `app/login/page.tsx`,
`app/admin/layout.tsx`, `app/admin/page.tsx`,
`components/auth/login-form.tsx`, `components/admin/logout-button.tsx`,
`docs/05-FASE-5.md`.

### Archivos modificados

`prisma/schema.prisma` (nuevo modelo `Session`, 21 modelos en total),
`middleware.ts` (protección real de `/admin/*`),
`components/layout/navbar.tsx`, `repository/usuario.repository.ts`
(corrección de tipos, ver abajo), `.env.example` (se elimina
`AUTH_SECRET` sin uso), `docs/00-INDICE.md`, `docs/CHANGELOG.md`.

### Corregido

- **Bug de Edge Runtime evitado antes de la entrega**: `middleware.ts`
  no puede importar `lib/auth.ts` (usa Prisma/bcryptjs/`crypto`, no
  soportados en Edge). Se aisló `SESSION_COOKIE_NAME` en
  `lib/auth-constants.ts`.
- **Tipos de retorno corregidos en `usuario.repository.ts`**:
  `findAll`/`findById`/`findByEmail` declaraban `User`/`User[]` pero
  siempre incluían `role`; se introdujo el tipo `UsuarioConRol` para que
  el acceso a `usuario.role.name` compile correctamente en los cuatro
  puntos del código que lo necesitan.

### Notas

- Credenciales de prueba (sembradas en la Fase 2):
  `admin@ciberseguridad-edu.local` / `CambiarEstaClave123!`.
- El panel administrativo completo (CRUD de contenido) se construye en
  la Fase 6, sobre el layout protegido ya creado aquí.

---

## [0.4.2] — 2026-08-04

**Intervención especial (fuera del roadmap de 10 fases):** rediseño
estructural — composición y layout, complementando el rediseño visual
0.4.1. Ver detalle completo en
[docs/REDISENO-ESTRUCTURAL.md](./REDISENO-ESTRUCTURAL.md).

### Añadido

- `components/shared/reveal.tsx`: animación de aparición al hacer
  scroll (IntersectionObserver nativo, sin dependencias nuevas).
- `components/shared/section-divider.tsx`: divisor angular decorativo.
- Navbar de dos niveles (franja utilitaria + navegación principal).
- Footer multicolumna con fondo oscuro permanente y columna "Aprende".
- Hero de la home reestructurado: banda oscura + panel de estadísticas
  superpuesto a la costura con la sección siguiente.
- Línea de tiempo conectada en "Cómo funciona" (antes: grilla simple).
- Nuevo lenguaje visual de tarjetas: barra de acento lateral + insignia
  circular flotante, aplicado a `CategoryCard`, `ArticleCard`,
  `ResourceCard` y las tarjetas de Buenas Prácticas.
- `PageHeader` rediseñado: de centrado genérico a alineado a la
  izquierda con acento vertical.
- Prop `variant="light"` en `Logo`, para uso sobre fondos oscuros fijos.

### Corregido

- Logo hubiera quedado invisible en el footer (ahora oscuro
  permanentemente) en modo claro del sitio — corregido antes de la
  entrega con la nueva prop `variant`.
- Import no utilizado de `PageHeader` en `app/amenazas/[slug]/page.tsx`
  (arrastrado desde la Fase 4).

### Notas

- **Cero cambios en `prisma/schema.prisma`** (hash MD5 verificado
  idéntico) ni en los 9 repositorios (verificados uno por uno).
- Conteo de rutas antes/después: 14 = 14.

---

## [0.4.1] — 2026-08-04

**Intervención especial (fuera del roadmap de 10 fases):** rediseño
visual completo y rebranding a **CiberShield UTLVT**. Ver detalle
completo en
[docs/REDISENO-VISUAL-CIBERSHIELD.md](./REDISENO-VISUAL-CIBERSHIELD.md).

### Añadido

- Nueva paleta de colores ("Azul Escudo" + "Verde Escudo") en
  `tailwind.config.ts`.
- Nueva tipografía de titulares (Sora) y utilitaria (JetBrains Mono).
- Logo rediseñado con indicador de estado animado.
- `components/home/stats-strip.tsx`: estadísticas reales en el hero.
- `title.template` centralizado en `app/layout.tsx`.

### Modificado

- `lib/constants.ts`, `lib/fonts.ts`, `components/ui/logo.tsx`,
  `components/home/security-clearance-card.tsx`, `app/page.tsx`,
  `components/layout/navbar.tsx`, `components/layout/footer.tsx`,
  `components/contact/contact-form.tsx`, `app/recursos/page.tsx`,
  `app/sobre-ciberseguridad/page.tsx`,
  `app/acerca-del-proyecto/page.tsx`, `prisma/seed.ts`, `README.md`, y
  los títulos de metadata de 11 páginas.

### Corregido

- El `upsert` de `Configuracion` en `prisma/seed.ts` no actualizaba los
  datos si el registro ya existía (`update: {}` vacío). Se corrigió
  para que el rebranding se aplique aunque el seed ya se haya
  ejecutado antes.
- Clase de Tailwind duplicada sin efecto (`bg-dot-grid bg-dot-grid`).

### Notas

- **Cero cambios en `prisma/schema.prisma`, migraciones, rutas, APIs,
  repositorios o validaciones** — verificado explícitamente, ver
  checklist completo en el documento de detalle.
- Sin acceso a red en este entorno para confirmar que las nuevas
  fuentes de Google se resuelven correctamente en build; requiere
  verificación del usuario.

---

## [0.4.0] — 2026-08-04

**Fase:** 4 — Contenido educativo

### Añadido

- 12 páginas públicas nuevas: `/amenazas`, `/amenazas/[slug]`,
  `/articulos/[slug]`, `/noticias`, `/noticias/[slug]`,
  `/buenas-practicas`, `/recursos`, `/glosario`, `/faq`, `/contacto`,
  `/sobre-ciberseguridad`, `/acerca-del-proyecto`.
- Endpoint `POST /api/contacto` con validación Zod (aún sin envío real
  de email, documentado como pendiente).
- 4 repositorios nuevos: `publicacion`, `recurso`, `glosario`, `faq`.
- 7 componentes compartidos nuevos: `PageHeader`, `EmptyState`,
  `CategoryCard`, `ArticleCard`, `ResourceCard`, `PublicacionDetalle`,
  `ContactForm`.
- Seed ampliado con 2 artículos, 1 noticia y 1 recurso de ejemplo.

### Archivos creados

Ver detalle completo en `docs/04-FASE-4.md`.

### Archivos modificados

`components/home/category-grid.tsx` (refactor para reutilizar
`CategoryCard`), `prisma/seed.ts`, `lib/constants.ts` (se elimina
`NAV_LINKS`, código muerto), `docs/00-INDICE.md`, `docs/CHANGELOG.md`.

### Errores corregidos

No aplica en esta fase.

### Mejoras implementadas

- Eliminación de código muerto (`NAV_LINKS`).
- Extracción de `CategoryCard` como componente compartido, eliminando
  duplicación entre Home (Fase 3) y `/amenazas` (Fase 4).

### Notas

- El envío real de correo desde `/api/contacto` queda pendiente hasta
  que se configure un proveedor de email.
- Sin acceso a red en este entorno para ejecutar `next build`; se
  recomienda al usuario correrlo localmente y reportar cualquier error.

---

## [0.3.0] — 2026-08-04

**Fase:** 3 — Layout público y diseño

### Añadido

- Identidad visual definitiva ("Credencial de Seguridad Digital"):
  paleta de colores, tipografía (Space Grotesk + Inter + IBM Plex Mono)
  y animaciones (`scan`, `fade-in-up`) en `tailwind.config.ts`.
- Navbar sticky responsive con menú móvil, alimentada por `ItemMenu`.
- Footer alimentado por `ItemMenu`.
- Botón de cambio de tema claro/oscuro completamente funcional.
- Home page conectada a datos reales (`ContenidoInicio`, `Categoria`),
  con hero, grilla de categorías y sección "Cómo funciona".
- Repositorios nuevos: `menu.repository.ts`,
  `contenido-inicio.repository.ts`, `banner.repository.ts`.
- Estilos base de accesibilidad: foco visible y soporte de
  `prefers-reduced-motion`.

### Archivos creados

`components/layout/navbar.tsx`, `components/layout/footer.tsx`,
`components/layout/mobile-nav.tsx`, `components/layout/theme-toggle.tsx`,
`components/home/security-clearance-card.tsx`,
`components/home/category-grid.tsx`, `components/home/how-it-works.tsx`,
`components/ui/logo.tsx`, `lib/fonts.ts`, `lib/iconos-categorias.ts`,
`repository/menu.repository.ts`,
`repository/contenido-inicio.repository.ts`,
`repository/banner.repository.ts`, `docs/03-FASE-3.md`.

### Archivos modificados

`tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`,
`app/globals.css`, `docs/00-INDICE.md`, `docs/CHANGELOG.md`.

### Errores corregidos

No aplica en esta fase (ver versión 0.2.1 para la corrección de la
Fase 2).

### Mejoras implementadas

- Sistema de diseño reutilizable (colores, tipografía, animaciones)
  centralizado en `tailwind.config.ts`, para que las fases siguientes
  no improvisen estilos.

### Notas

- Los enlaces de la grilla de categorías apuntan a `/amenazas/[slug]`,
  ruta que se construye recién en la Fase 4 (es intencional, no un
  enlace roto).
- Sin acceso a red en este entorno para ejecutar `next build`; se
  recomienda al usuario correrlo localmente y reportar cualquier error
  de tipos.

---

## [0.2.1] — 2026-08-04

**Fase:** 2 — Corrección post-entrega (detectada por el usuario al ejecutar `crear_base_datos.bat`)

### Corregido

- **Error P1012 de Prisma** (`prisma migrate dev` fallaba con 6 errores
  de validación): el schema usaba `enum` (`TipoContenido`, `TipoRecurso`,
  `TipoPregunta`, `UbicacionMenu`) y `Json`
  (`ResultadoEvaluacion.respuestas`, `ContenidoInicio.seccionesJson`),
  ninguno de los cuales soporta el conector SQLite de Prisma.
- Los 4 `enum` se reemplazaron por campos `String` con los valores
  válidos documentados en comentario junto a cada campo.
- Los 2 campos `Json`/`Json?` se reemplazaron por `String`/`String?`,
  a serializar/deserializar manualmente con `JSON.stringify()` /
  `JSON.parse()` desde el código de aplicación.
- Se verificó que ningún archivo TypeScript ya escrito dependiera de los
  tipos enum eliminados (no fue necesario tocar `seed.ts` ni los
  repositorios).

### Archivos modificados

`prisma/schema.prisma`, `docs/02-FASE-2.md` (sección "Problemas
encontrados" / "Soluciones aplicadas" ampliada), `docs/CHANGELOG.md`.

### Notas

Esta corrección confirma por qué es importante ejecutar
`scripts\crear_base_datos.bat` y reportar cualquier error de vuelta: el
entorno de generación no tiene acceso a Prisma CLI para validar contra
el conector real antes de la entrega.

---

## [0.2.0] — 2026-08-03

**Fase:** 2 — Modelo de datos completo

### Añadido

- Modelo de datos completo en Prisma: 20 modelos y 4 enums (`Role`,
  `Permission`, `RolePermission`, `User`, `Categoria`, `Publicacion`,
  `TerminoGlosario`, `PreguntaFrecuente`, `Recurso`, `Evaluacion`,
  `Pregunta`, `OpcionRespuesta`, `ResultadoEvaluacion`, `Certificado`,
  `Insignia`, `UsuarioInsignia`, `Configuracion`, `Banner`, `ItemMenu`,
  `ContenidoInicio`).
- Seed con datos reales: roles y permisos base, usuario administrador,
  7 categorías, 1 término de glosario, 1 FAQ, configuración general del
  sitio, contenido de inicio y 10 ítems de menú.
- Repository Pattern: contrato genérico `Repository<T>` y dos
  implementaciones de referencia (`categoriaRepository`,
  `usuarioRepository`).
- Esquemas de validación Zod de referencia (`categoriaSchema`,
  `usuarioSchema`).
- Dependencia `bcryptjs` para hash de contraseñas.

### Archivos creados

`repository/categoria.repository.ts`, `repository/usuario.repository.ts`,
`lib/validations/categoria.schema.ts`, `lib/validations/usuario.schema.ts`,
`types/repository.ts`, `docs/02-FASE-2.md`.

### Archivos modificados

`prisma/schema.prisma` (reescrito por completo), `prisma/seed.ts`
(reescrito por completo), `package.json` (nuevas dependencias),
`docs/00-INDICE.md`, `docs/CHANGELOG.md`.

### Errores corregidos

No aplica.

### Mejoras implementadas

- Se estableció formalmente el patrón de repositorio como plantilla
  para el resto de entidades.

### Notas

- El entorno de generación no tiene acceso a red ni Prisma CLI
  preinstalado; el usuario debe ejecutar
  `npx prisma migrate dev --name modelo_completo` localmente (o usar
  `scripts\crear_base_datos.bat`) para aplicar las migraciones.

---

## [Unreleased]

Próxima fase: **Fase 3 — Layout público y diseño** (modo oscuro/claro,
navbar, footer, identidad visual definitiva).

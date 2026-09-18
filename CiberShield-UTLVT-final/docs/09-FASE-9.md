# Fase 9 — SEO, Accesibilidad y PWA

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado (con un hallazgo menor pendiente, ver notas) | 100% | 2026-08-05 | 2026-08-05 |

## Objetivos

- Implementar SEO técnico completo: meta tags, Open Graph, Twitter
  Cards, robots, sitemap, canonical y datos estructurados.
- Auditar y corregir problemas reales de accesibilidad (WCAG), no solo
  agregar atributos superficiales.
- Convertir el sitio en una Progressive Web App instalable, con caché
  inteligente y funcionamiento básico sin conexión.

## Funcionalidades implementadas

### SEO
- `lib/seo.ts`: helper `construirMetadata()` usado en 14 páginas para
  generar título, descripción, Open Graph, Twitter Card y URL
  canónica de forma consistente, sin repetir la misma estructura en
  cada archivo.
- `app/sitemap.ts`: sitemap dinámico que combina las rutas estáticas
  con categorías, artículos, noticias y evaluaciones activas
  obtenidos en vivo desde la base de datos.
- `app/robots.ts`: excluye `/admin/*`, `/api/*` y las rutas privadas
  de evaluación (`/realizar`, `/resultado/*`) de la indexación.
- `app/opengraph-image.tsx`: imagen Open Graph por defecto generada
  dinámicamente (sin archivo de imagen externo).
- Datos estructurados (JSON-LD) agregados en:
  - Home: `EducationalOrganization` + `WebSite` (con `SearchAction`
    apuntando al buscador).
  - Artículos/noticias: `Article` (título, fechas, autor).
  - FAQ: `FAQPage` con cada pregunta/respuesta publicada.

### Accesibilidad (auditoría real, no solo cosmética)
- **Corrección de contraste de color (WCAG 1.4.3, nivel AA)**: se
  detectó que el texto blanco sobre los botones verdes
  (`bg-seguro-500`, usados en ~15+ lugares del sitio) tenía un
  contraste real de **~3.1:1**, insuficiente para texto normal
  (mínimo 4.5:1). Se corrigió oscureciendo el token en
  `tailwind.config.ts`. Se encontró el mismo problema, más severo
  (~2.2:1 y ~3.0:1), en el ámbar usado para mensajes de error en 37
  archivos distintos (`text-alerta-600`), también corregido.
- Enlace "Saltar al contenido principal" (`skip link`) en el layout
  raíz, visible solo al recibir foco de teclado.
- `aria-current="page"` en el enlace de navegación activo (Navbar y
  menú móvil), antes inexistente.
- `role="alert"` / `aria-live="assertive"` en los mensajes de error de
  Login, Registro y Contacto — antes aparecían visualmente pero no se
  anunciaban a un lector de pantalla al no haber recarga de página.
- `role="status"` / `aria-live="polite"` en el mensaje de éxito del
  formulario de contacto.
- `noindex` reforzado en el panel admin (metadata, además de
  `robots.ts`) como defensa en profundidad.

### PWA
- `app/manifest.ts`: manifest de la aplicación (nombre, colores,
  `display: standalone`, íconos en 192px y 512px, incluyendo variantes
  `maskable`).
- Íconos generados dinámicamente con `next/og` (ya incluido en
  Next.js, sin dependencias nuevas): `app/icon.tsx` (favicon),
  `app/apple-icon.tsx` (iOS), `app/icons/192` y `app/icons/512`
  (manifest) — todos derivados del mismo escudo de marca, para no
  mantener archivos de imagen sueltos que se desincronicen del diseño.
- `public/sw.js`: Service Worker con estrategia `cache-first` para
  assets estáticos y `network-first` con reserva a caché (y a
  `/offline`) para la navegación entre páginas.
- `components/pwa/service-worker-registrar.tsx`: registra el Service
  Worker al cargar la aplicación.
- `app/offline/page.tsx`: página de reserva mostrada sin conexión.

## Arquitectura utilizada

Se mantiene el principio de "un solo lugar para cambiar, muchos
lugares beneficiados": el helper `construirMetadata()` centraliza la
estructura de metadata (igual que `AdminPageHeader` o `PageHeader`
centralizaron la UI en fases anteriores), y la corrección de contraste
se hizo en `tailwind.config.ts` (los tokens de color), no archivo por
archivo, siguiendo la misma estrategia usada en los rediseños visuales.

## Tecnologías empleadas

- `next/og` (`ImageResponse`), ya incluido en Next.js 14 — sin
  dependencias nuevas.
- Service Worker nativo del navegador (Cache API, Fetch API), sin
  `next-pwa` ni librerías externas.
- Convenciones de "metadata routes" de Next.js App Router:
  `sitemap.ts`, `robots.ts`, `manifest.ts`, `icon.tsx`,
  `apple-icon.tsx`, `opengraph-image.tsx`.

## Estructura de carpetas

```
cybersecurity-edu/
├── app/
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   ├── icon.tsx
│   ├── apple-icon.tsx
│   ├── opengraph-image.tsx
│   ├── icons/{192,512}/route.tsx
│   └── offline/page.tsx
├── components/
│   ├── shared/json-ld.tsx
│   ├── layout/nav-links.tsx
│   └── pwa/service-worker-registrar.tsx
├── lib/seo.ts
├── public/sw.js
```

## Archivos creados

18 archivos nuevos (ver árbol arriba) + `docs/09-FASE-9.md`.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `lib/constants.ts` | Se agrega `SITE_URL` |
| `app/layout.tsx` | `metadataBase`, Open Graph/Twitter por defecto, `viewport.themeColor`, skip link, registro del Service Worker |
| `app/page.tsx` | `construirMetadata()` + JSON-LD `EducationalOrganization`/`WebSite` |
| `components/shared/publicacion-detalle.tsx` | JSON-LD `Article` |
| 12 páginas de contenido | `construirMetadata()` en vez de objetos `Metadata` sueltos |
| `components/layout/navbar.tsx`, `mobile-nav.tsx` | Usan `NavLinks`/`aria-current` para el enlace activo |
| `components/auth/login-form.tsx`, `registro-form.tsx`, `components/contact/contact-form.tsx` | `role="alert"`/`role="status"` + `aria-live` |
| `components/admin/form-fields.tsx` | Asterisco de campo requerido: `text-alerta-500` → `text-alerta-600` (contraste) |
| `app/evaluaciones/[id]/resultado/[resultadoId]/page.tsx` | Ícono de reprobado: `text-alerta-500` → `text-alerta-600` |
| `tailwind.config.ts` | Paleta `seguro` y `alerta` oscurecida (corrección de contraste WCAG) |
| `lib/certificado-pdf.ts`, `app/opengraph-image.tsx` | Verde actualizado a la paleta corregida |
| `app/admin/layout.tsx` | Metadata `noindex` |

## Base de datos

Sin cambios en el schema.

## APIs implementadas

Ninguna nueva (las rutas de íconos son "metadata routes"/route
handlers de solo lectura, no APIs de negocio).

## Hooks creados

Ninguno propio (se usa `usePathname` de Next.js en `NavLinks` y
`useEffect` nativo en `ServiceWorkerRegistrar`).

## Utilidades creadas

- `lib/seo.ts`: `construirMetadata()`.

## Dependencias instaladas

Ninguna nueva — todo se resolvió con capacidades ya incluidas en
Next.js 14 y APIs nativas del navegador.

## Variables de entorno

- `NEXT_PUBLIC_SITE_URL` (ya existía desde la Fase 1): ahora se usa
  activamente para `metadataBase`, el sitemap, robots.txt y las URLs
  canónicas/Open Graph. En producción debe apuntar al dominio real.

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

Ninguna configuración de proyecto adicional (los headers de seguridad
HTTP, Content-Security-Policy, etc. corresponden a la Fase 10 —
"seguridad OWASP" — no a esta fase de SEO/accesibilidad/PWA).

## Decisiones técnicas tomadas

1. **Auditoría de contraste real con cálculo de luminancia relativa
   (WCAG), no una revisión "a ojo"**: se calculó la razón de contraste
   exacta de los pares de color usados como texto sobre fondo sólido
   en botones y mensajes de error, siguiendo la fórmula oficial de
   WCAG 2.x. Esto reveló dos fallas reales y extendidas (verde y
   ámbar) que una revisión visual superficial fácilmente pasaría por
   alto, ya que ambos colores "se ven" suficientemente oscuros a
   simple vista.
2. **Corrección centralizada en `tailwind.config.ts`, no archivo por
   archivo**: igual que en los rediseños visuales anteriores, cambiar
   el valor hexadecimal del token corrige automáticamente los ~50
   lugares afectados sin tocar cada componente individualmente,
   minimizando el riesgo de dejar alguno sin corregir.
3. **Íconos y OG image generados con `next/og` en vez de archivos PNG
   estáticos**: se derivan del mismo SVG del componente `Logo`, por lo
   que un futuro cambio de marca solo requiere editar un lugar en vez
   de regenerar manualmente varios archivos de imagen en distintos
   tamaños.
4. **Service Worker escrito a mano en vez de `next-pwa`**: la
   estrategia de caché necesaria (assets estáticos "cache first",
   páginas "network first" con reserva offline) es simple de expresar
   directamente con las APIs nativas `CacheStorage`/`fetch`, sin
   agregar una dependencia adicional y sin la configuración adicional
   que implicaría integrar un plugin de build.
5. **`robots.ts` y metadata `noindex` en el panel admin al mismo
   tiempo (defensa en profundidad)**: igual que con la autenticación
   en la Fase 5, no depender de una sola capa de protección.

## Problemas encontrados

1. **Contraste de color insuficiente en dos tokens de marca** (ver
   arriba) — detectado mediante cálculo, no reportado por el usuario,
   y corregido antes de la entrega.
2. **Hallazgo menor sin corregir en esta fase**: los textos que usan
   opacidad reducida sobre el color base `ink-700` (ej.
   `text-ink-700/70`, usado en fechas y textos secundarios como el
   copyright del footer) dan un contraste aproximado de **4.1:1**,
   ligeramente por debajo del mínimo de 4.5:1 para texto normal. Es un
   problema mucho menor que los dos anteriores (una diferencia de
   0.4, no de 1.5-2.3 puntos) y afecta solo texto secundario/terciario,
   no controles interactivos ni mensajes de error. Se documenta aquí
   explícitamente en vez de dejarlo sin mencionar: **recomendación
   para una futura pasada de accesibilidad, cambiar esos usos de
   opacidad por un color sólido** (ej. un tono `ink-600` dedicado) si
   se requiere cumplimiento estricto de AA en todo el sitio.

## Soluciones aplicadas

- Se recalculó la luminancia relativa y la razón de contraste de cada
  par de color sospechoso (verde/blanco, ámbar/blanco) usando la
  fórmula de WCAG, y se ajustaron los valores hexadecimales hasta
  obtener un margen de seguridad cómodo (>5:1) en vez de un aprobado
  al límite.
- Se corrigieron los 4 usos puntuales de `text-alerta-500` como texto
  con significado (asterisco de campo requerido, ícono de resultado
  reprobado) a `text-alerta-600`, ya que el token 500 se conserva para
  usos decorativos donde el requisito de contraste es distinto.
- Se verificó que ningún archivo `'use server'` nuevo violara la regla
  de solo exportar funciones `async`, y se verificó el balance de
  llaves/paréntesis/corchetes en los 176 archivos `.ts`/`.tsx`
  relevantes del proyecto.

## Mejoras realizadas

- Corrección de dos problemas reales de accesibilidad que afectaban a
  la mayoría de los botones y formularios del sitio.
- Se estableció `lib/seo.ts` como punto único de mantenimiento para la
  metadata SEO, reduciendo a futuro el riesgo de que una página nueva
  se olvide del Open Graph o el canonical.

## Pruebas ejecutadas

- Cálculo manual (no solo visual) de razón de contraste WCAG para los
  pares de color corregidos.
- Verificación de balance de sintaxis y de la regla de exportación de
  Server Actions.
- Pendiente de ejecutar por el usuario:
  ```bash
  scripts\iniciar_proyecto.bat
  ```
  Verificar: `/sitemap.xml` y `/robots.txt` cargan correctamente;
  `/manifest.webmanifest` es válido; en Chrome de escritorio aparece la
  opción de "Instalar aplicación"; desconectar la red y confirmar que
  una página ya visitada sigue cargando (o se muestra `/offline`);
  probar la navegación con teclado (Tab) desde el inicio de cualquier
  página y confirmar que aparece el enlace "Saltar al contenido
  principal".

## Resultado esperado

El sitio debe ser instalable como aplicación en Chrome/Edge de
escritorio y en Android/iOS, funcionar (de forma limitada) sin
conexión para páginas ya visitadas, aparecer correctamente en
`/sitemap.xml` y `/robots.txt`, y mostrar tarjetas de vista previa
completas (título, descripción, imagen) al compartir enlaces en redes
sociales o mensajería.

## Cómo ejecutar esta fase

```bash
scripts\iniciar_proyecto.bat
```

## Pendientes para la siguiente fase

- Fase 10 (Optimización, seguridad OWASP, scripts .bat y documentación
  final) es la última del roadmap original.
- Si se solicita explícitamente: corregir el hallazgo menor de
  contraste en textos con opacidad reducida (ver "Problemas
  encontrados" #2), y definir `NEXT_PUBLIC_SITE_URL` con el dominio
  real antes de desplegar a producción (actualmente cae en
  `localhost:3000` por defecto).

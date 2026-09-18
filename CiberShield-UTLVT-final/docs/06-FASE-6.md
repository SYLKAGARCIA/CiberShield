# Fase 6 — Panel Administrativo

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado (alcance ajustado, ver notas) | 100% | 2026-08-04 | 2026-08-04 |

## Objetivos

- Construir un panel administrativo real donde el administrador pueda
  gestionar el contenido del sitio sin tocar código, usando el layout
  protegido ya creado en la Fase 5.
- Implementar CRUD completo (crear, listar, editar, eliminar) para las
  entidades de contenido principales.
- Usar **Server Actions** (como indica el stack tecnológico original)
  en vez de API Routes para las mutaciones del panel.
- Cada Server Action debe reverificar sesión y rol de forma
  independiente, sin confiar en que el layout ya protegió la página.

## Alcance de esta fase (ajustado)

El brief original lista más de 15 entidades administrables. Se
priorizó CRUD completo para las que forman el contenido educativo
central del sitio; **Banners/Carruseles, Evaluaciones, Preguntas,
Resultados y Certificados** se dejan para las Fases 7 y 8, donde
tienen más sentido (van de la mano con las herramientas interactivas y
el sistema de evaluaciones). Ver "Pendientes" al final.

## Funcionalidades implementadas

CRUD completo (listar / crear / editar / eliminar) para:

| Entidad | Ruta admin | Notas |
|---|---|---|
| Categorías | `/admin/categorias` | Restricción de slug único con mensaje de error amigable |
| Artículos y Noticias | `/admin/publicaciones` | Modelo unificado `Publicacion`; filtro por tipo; SEO opcional; fecha de publicación automática |
| Glosario | `/admin/glosario` | La letra del índice A-Z se calcula automáticamente del término |
| Preguntas Frecuentes | `/admin/faq` | Orden y estado publicada/oculta |
| Recursos | `/admin/recursos` | Categoría opcional (select con "Sin categoría") |
| Menús | `/admin/menus` | Un solo formulario para ítems de header y footer |
| Usuarios | `/admin/usuarios` | Solo rol `ADMIN`; hash de contraseña; no permite auto-eliminarse |
| Configuración | `/admin/configuracion` | Registro único (singleton), solo rol `ADMIN` |

Además:
- **Dashboard** (`/admin`) con conteos reales de cada sección,
  enlazando directamente a su panel.
- **Sidebar de navegación** que oculta "Usuarios" y "Configuración"
  para usuarios con rol `EDITOR` (sin acceso a esas dos secciones).

## Arquitectura utilizada

**Server Actions** en vez de API Routes para las mutaciones (crear,
actualizar, eliminar), siguiendo el stack tecnológico definido en el
brief original ("Server Actions cuando sea conveniente"). Cada entidad
sigue el mismo patrón de 4 piezas:

```
app/admin/<entidad>/
├── actions.ts        ('use server' — crear, actualizar, eliminar)
├── <entidad>-form.tsx (Client Component, useFormState)
├── page.tsx           (listado, Server Component)
├── nueva|nuevo/page.tsx    (formulario de creación)
└── [id]/editar/page.tsx    (formulario de edición)
```

Las Server Actions llaman siempre al **repositorio** correspondiente
(nunca a Prisma directamente desde una action o un componente),
manteniendo la capa de Infraestructura intacta desde las fases
anteriores.

## Tecnologías empleadas

- `useFormState` y `useFormStatus` de `react-dom` (soportados en
  Next.js 14.2 + React 18.3, sin necesitar el canal `canary` —
  decisión relevante, ver más abajo).
- Sin librerías nuevas.

## Estructura de carpetas

```
cybersecurity-edu/
├── app/admin/
│   ├── layout.tsx              (modificado: + sidebar)
│   ├── page.tsx                (modificado: dashboard con conteos reales)
│   ├── categorias/{actions.ts, categoria-form.tsx, page.tsx, nueva/, [id]/editar/}
│   ├── publicaciones/{actions.ts, publicacion-form.tsx, page.tsx, nueva/, [id]/editar/}
│   ├── glosario/{actions.ts, glosario-form.tsx, page.tsx, nuevo/, [id]/editar/}
│   ├── faq/{actions.ts, faq-form.tsx, page.tsx, nueva/, [id]/editar/}
│   ├── recursos/{actions.ts, recurso-form.tsx, page.tsx, nuevo/, [id]/editar/}
│   ├── menus/{actions.ts, menu-form.tsx, page.tsx, nuevo/, [id]/editar/}
│   ├── usuarios/{actions.ts, usuario-form.tsx, page.tsx, nuevo/, [id]/editar/}
│   └── configuracion/{actions.ts, configuracion-form.tsx, page.tsx}
├── components/admin/
│   ├── admin-sidebar.tsx        (nuevo)
│   ├── admin-page-header.tsx    (nuevo)
│   ├── delete-button.tsx        (nuevo)
│   ├── form-fields.tsx          (nuevo)
│   ├── submit-button.tsx        (nuevo)
│   └── logout-button.tsx        (sin cambios, de Fase 5)
├── repository/
│   ├── role.repository.ts        (nuevo)
│   ├── configuracion.repository.ts (nuevo)
│   └── publicacion.repository.ts  (modificado: + findParaAdmin)
├── lib/
│   ├── auth.ts                   (modificado: + requerirSesionAdmin/SuperAdmin)
│   └── validations/
│       ├── glosario.schema.ts     (nuevo)
│       ├── faq.schema.ts          (nuevo)
│       ├── recurso.schema.ts      (nuevo)
│       ├── menu.schema.ts         (nuevo)
│       ├── configuracion.schema.ts (nuevo)
│       ├── publicacion.schema.ts   (nuevo)
│       └── usuario.schema.ts       (modificado: + usuarioEditSchema)
├── types/
│   └── admin-form.ts             (nuevo)
```

## Archivos creados

39 archivos nuevos bajo `app/admin/` (ver árbol arriba), más:
`components/admin/admin-sidebar.tsx`, `admin-page-header.tsx`,
`delete-button.tsx`, `form-fields.tsx`, `submit-button.tsx`,
`repository/role.repository.ts`, `repository/configuracion.repository.ts`,
`types/admin-form.ts`, 6 esquemas Zod nuevos, `docs/06-FASE-6.md`.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `app/admin/layout.tsx` | Se agrega `<AdminSidebar>`, layout de dos columnas |
| `app/admin/page.tsx` | De placeholder a dashboard con conteos reales |
| `lib/auth.ts` | Se agregan `requerirSesionAdmin()` y `requerirSesionSuperAdmin()` |
| `lib/validations/usuario.schema.ts` | Se agrega `usuarioEditSchema` (contraseña opcional) |
| `repository/publicacion.repository.ts` | Se agrega `findParaAdmin()` |
| `docs/00-INDICE.md` | Progreso actualizado a 6/10 fases (60%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.6.0 |

## Base de datos

Sin cambios en el schema en esta fase — se usan íntegramente los 21
modelos ya definidos en las Fases 2 y 5.

## APIs implementadas

Ninguna API Route nueva: todas las mutaciones del panel usan **Server
Actions** (`'use server'`), no `app/api/*`.

## Hooks creados

Ninguno propio — se usan `useFormState`/`useFormStatus` de `react-dom`
y `useTransition` de `react` (en `DeleteButton`).

## Utilidades creadas

- `lib/auth.ts`: `requerirSesionAdmin()`, `requerirSesionSuperAdmin()`.
- `types/admin-form.ts`: `EstadoFormulario`, `erroresDesdeZod()`.

## Dependencias instaladas

Ninguna nueva.

## Variables de entorno

Sin cambios.

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

Ninguna configuración de proyecto adicional.

## Decisiones técnicas tomadas

1. **Server Actions en vez de API Routes** para las mutaciones del
   panel: el brief original define "API Routes de Next.js" y "Server
   Actions cuando sea conveniente" como parte del stack. Un panel de
   administración con formularios que redirigen tras guardar es
   exactamente el caso de uso para el que se diseñaron las Server
   Actions en Next.js App Router — menos código repetitivo que crear
   una API Route por cada mutación.
2. **`useFormState`/`react-dom` requiere React 18.3+, no `canary`**: se
   verificó que Next.js 14.2 documenta soporte estable para estos hooks
   con React 18.3 (la versión ya fijada en `package.json` desde la
   Fase 1: `"react": "18.3.1"`). Esto evitó tener que cambiar la
   versión de React a mitad de proyecto.
3. **Cada Server Action reverifica sesión y rol** (`requerirSesionAdmin`
   / `requerirSesionSuperAdmin`) en vez de confiar en que
   `app/admin/layout.tsx` ya bloqueó el acceso: una Server Action es un
   endpoint de red por derecho propio, invocable directamente sin pasar
   por la página que la usa. Mismo principio de "defensa en
   profundidad" aplicado en la Fase 5.
4. **`EstadoFormulario` centralizado en `types/admin-form.ts`**, no en
   el primer `actions.ts` que lo necesitó: un archivo `'use server'`
   **solo puede exportar funciones `async`** — intentar reexportar un
   tipo desde ahí rompe el build (ver "Problemas encontrados").
5. **`Publicacion` (artículos y noticias) comparte un único formulario**
   con un selector de "Tipo", en vez de dos formularios casi idénticos
   — coherente con la decisión de unificar ambos en un solo modelo
   desde la Fase 2.
6. **Usuarios y Configuración restringidos a rol `ADMIN`** (no
   `EDITOR`): afectan el control de acceso del sistema y los metadatos
   globales del sitio, más sensibles que gestionar contenido educativo.
7. **`eliminarUsuario` impide que un admin se borre a sí mismo** con
   sesión activa, y **`eliminarCategoria`** atrapa el error de clave
   foránea (`Publicacion.categoriaId` es obligatorio, `Restrict` por
   defecto) para mostrar un mensaje claro en vez de un error crudo de
   Prisma.

## Problemas encontrados

1. **Un archivo `'use server'` no puede reexportar tipos.** Al escribir
   `app/admin/categorias/actions.ts` originalmente definí y exporté
   `interface EstadoFormulario` ahí mismo; funcionaba para ese archivo,
   pero al querer reutilizar el tipo desde `glosario/actions.ts` con
   `export type { EstadoFormulario }` desde un módulo `'use server'`,
   eso rompe la regla de Next.js de que **todo** lo exportado de un
   archivo con la directiva `'use server'` debe ser una función `async`
   invocable como Server Action.
2. Algunas páginas de listado (`publicaciones/page.tsx`) inicialmente
   llamaban a `prisma.publicacion.findMany(...)` directamente en vez de
   pasar por el repositorio, rompiendo la arquitectura por capas
   establecida desde la Fase 2.

## Soluciones aplicadas

1. Se creó `types/admin-form.ts` con `EstadoFormulario` y la función
   auxiliar `erroresDesdeZod()`, y **todos** los `actions.ts` importan
   desde ahí en vez de reexportar entre sí. Se corrigió el archivo de
   categorías antes de que el problema se propagara al resto.
2. Se agregó `publicacionRepository.findParaAdmin()` y se actualizó la
   página para usarlo, restaurando la regla de "nunca llamar a Prisma
   directamente fuera de un repositorio".
3. Se verificó, campo por campo, que cada esquema Zod nuevo
   (`glosarioSchema`, `faqSchema`, `recursoSchema`, `menuSchema`,
   `configuracionSchema`, `publicacionSchema`) coincida exactamente con
   los nombres de campo de `prisma/schema.prisma`.
4. Se verificó el balance de llaves/paréntesis/corchetes en los 117
   archivos `.ts`/`.tsx` relevantes del proyecto.

## Mejoras realizadas

- Se corrigió una segunda violación de la arquitectura por capas
  (llamada directa a Prisma) detectada durante esta misma fase, antes
  de que llegara al usuario.

## Pruebas ejecutadas

- Verificación manual de sintaxis y de coincidencia de campos con el
  schema.
- Pendiente de ejecutar por el usuario:
  ```bash
  scripts\iniciar_proyecto.bat
  ```
  Iniciar sesión como administrador y probar el ciclo completo
  (crear → editar → eliminar) en al menos: Categorías, una Publicación,
  un término de Glosario. Confirmar que `npm run build` no arroja
  errores relacionados con `useFormState` (ver decisión técnica #2) —
  es el punto de mayor incertidumbre de esta fase al no poder ejecutar
  un build real en este entorno.

## Resultado esperado

Desde `/admin`, el dashboard debe mostrar 6 tarjetas con conteos reales
(coincidentes con lo sembrado: 7 categorías, 3 publicaciones, 1
término de glosario, 1 FAQ, 1 recurso, 10 ítems de menú). Cada sección
del sidebar debe permitir crear, editar y eliminar registros, con los
cambios reflejándose de inmediato en el sitio público correspondiente
(gracias a `revalidatePath`).

## Cómo ejecutar esta fase

```bash
scripts\iniciar_proyecto.bat
```

Iniciar sesión en `/login` con el usuario administrador sembrado en la
Fase 2 y navegar por cada sección del sidebar en `/admin`.

## Pendientes para la siguiente fase

- Panel de **Banners/Carruseles** y **Contenido de Inicio** (editar el
  hero de la home desde el admin) — no se construyó en esta fase; se
  puede agregar si el usuario lo pide antes de continuar con el
  roadmap.
- Gestión granular de **Roles y Permisos** desde una interfaz (hoy los
  3 roles y sus permisos son fijos, sembrados en la Fase 2; el
  formulario de Usuario solo permite *asignar* un rol existente, no
  crear roles nuevos ni editar permisos).
- Campo `categoria` (texto libre) de `PreguntaFrecuente` no se expone
  todavía en el formulario de FAQ del admin (es opcional en el schema,
  no bloquea nada, pero queda sin usarse).
- Fase 7 (Herramientas interactivas) y Fase 8 (Evaluaciones y
  certificados) construirán sus propios paneles administrativos
  siguiendo el mismo patrón de 4 piezas usado en esta fase.

# Fase 5 — Autenticación y Roles

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-04 | 2026-08-04 |

## Objetivos

- Implementar inicio de sesión real (email + contraseña) contra los
  modelos `User`/`Role` definidos en la Fase 2.
- Implementar sesiones seguras del lado del servidor (revocables al
  instante, no solo un token que expira por sí solo).
- Proteger las rutas `/admin/*` en dos capas: middleware (rápido, Edge)
  + verificación real contra la base de datos (layout, Node.js).
- Integrar el estado de sesión en la navegación pública (Navbar).
- Sentar la base para el panel administrativo completo de la Fase 6.

## Funcionalidades implementadas

- **`POST /api/auth/login`**: valida credenciales con Zod, verifica
  email + contraseña (`bcrypt.compare`), crea una sesión en la base de
  datos y setea una cookie `httpOnly`.
- **`POST /api/auth/logout`**: elimina la sesión de la base de datos
  (no solo la cookie) y limpia la cookie del navegador.
- **`/login`**: página de acceso con formulario validado en cliente y
  servidor, mensajes de error genéricos (no revela si el email existe).
- **`/admin`**: layout protegido + dashboard mínimo que confirma que la
  sesión y el rol se verificaron correctamente contra la base de datos.
- **Navbar**: muestra "Acceder" si no hay sesión, o un enlace directo
  "Panel Admin" si el usuario tiene rol `ADMIN`/`EDITOR`.
- Middleware que redirige a `/login` con parámetro `?from=` a quien
  intenta entrar a `/admin/*` sin cookie de sesión.

## Arquitectura utilizada

Autenticación por **sesiones opacas del lado del servidor** (no JWT):
un token aleatorio de 32 bytes se guarda en la tabla `Session` y se
referencia desde una cookie `httpOnly`. Se eligió sobre JWT porque
permite revocar sesiones al instante (el logout borra la fila; con JWT
firmado habría que mantener una lista de revocación aparte) y no
depende de gestionar un secreto de firma.

**Defensa en profundidad, dos capas:**

```
Request a /admin/*
   ↓
middleware.ts (Edge) — ¿existe la cookie? → si no, redirige a /login
   ↓
app/admin/layout.tsx (Node.js) — ¿el token es válido en la DB?
                                   ¿el rol tiene permiso? → si no, redirige
   ↓
Contenido del panel
```

## Tecnologías empleadas

- `bcryptjs` (ya instalado desde la Fase 2) para verificar contraseñas.
- `crypto.randomBytes` (Node.js nativo) para generar tokens de sesión.
- Cookies `httpOnly` vía `next/headers`.
- Sin librerías nuevas (deliberadamente: no se agregó NextAuth/Auth.js
  para no introducir tablas adicionales — `Account`, `VerificationToken`
  — que no hacían falta para este alcance).

## Estructura de carpetas

```
cybersecurity-edu/
├── app/
│   ├── admin/
│   │   ├── layout.tsx        (nuevo — protección real)
│   │   └── page.tsx          (nuevo — dashboard mínimo)
│   ├── login/
│   │   └── page.tsx          (nuevo)
│   └── api/auth/
│       ├── login/route.ts    (nuevo)
│       └── logout/route.ts   (nuevo)
├── components/
│   ├── auth/
│   │   └── login-form.tsx    (nuevo)
│   └── admin/
│       └── logout-button.tsx (nuevo)
├── lib/
│   ├── auth.ts                (nuevo)
│   ├── auth-constants.ts      (nuevo — ver decisión técnica #1)
│   └── validations/
│       └── login.schema.ts    (nuevo)
├── repository/
│   └── session.repository.ts  (nuevo)
├── middleware.ts               (reescrito)
```

## Archivos creados

| Archivo | Propósito |
|---|---|
| `lib/auth.ts` | Lógica central: verificar credenciales, crear/leer/cerrar sesión |
| `lib/auth-constants.ts` | Constante `SESSION_COOKIE_NAME`, aislada para ser segura en Edge Runtime |
| `lib/validations/login.schema.ts` | Validación Zod del login |
| `repository/session.repository.ts` | Repositorio de `Session` |
| `app/api/auth/login/route.ts` | Endpoint de inicio de sesión |
| `app/api/auth/logout/route.ts` | Endpoint de cierre de sesión |
| `app/login/page.tsx` | Página de acceso |
| `app/admin/layout.tsx` | Layout protegido del panel |
| `app/admin/page.tsx` | Dashboard mínimo |
| `components/auth/login-form.tsx` | Formulario de login (cliente) |
| `components/admin/logout-button.tsx` | Botón de cerrar sesión (cliente) |
| `docs/05-FASE-5.md` | Este documento |

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `prisma/schema.prisma` | Se agrega el modelo `Session` (21 modelos en total) y la relación `sessions` en `User` |
| `middleware.ts` | Placeholder de Fase 1 → protección real de `/admin/*` (primera capa) |
| `components/layout/navbar.tsx` | Muestra "Acceder" o "Panel Admin" según el estado de sesión |
| `repository/usuario.repository.ts` | Se corrige el tipo de retorno de `findAll`/`findById`/`findByEmail` (ver "Problemas encontrados") |
| `.env.example` | Se elimina `AUTH_SECRET` (no se usa, ver decisión técnica) |
| `docs/00-INDICE.md` | Progreso actualizado a 5/10 fases (50%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.5.0 |

## Componentes desarrollados

`LoginForm` (cliente, validación + estados de carga/error), `LogoutButton`
(cliente), layout de `/admin` (Server Component protegido).

## Base de datos

**Tabla nueva:** `sessions` (`Session` en Prisma) — `id`, `token`
(único), `userId`, `expiresAt`, `createdAt`. Relación `User` 1:N
`Session`, con `onDelete: Cascade` (si se borra un usuario, se borran
sus sesiones).

**Migraciones:** no se generaron en este entorno (sin acceso a
Prisma CLI). El usuario debe ejecutar
`npx prisma migrate dev --name auth_sesiones` o
`scripts\crear_base_datos.bat`.

## APIs implementadas

- `POST /api/auth/login` — body `{ email, password }` → `{ ok, redirectTo, usuario }` o `401` con `{ error }`.
- `POST /api/auth/logout` — sin body → `{ ok: true }`.

## Hooks creados

Ninguno (los componentes cliente usan `useState`/`useRouter` directamente).

## Utilidades creadas

- `lib/auth.ts`: `verificarCredenciales`, `crearSesion`,
  `obtenerSesionActual`, `cerrarSesion`, `tieneAccesoAdmin`.

## Dependencias instaladas

Ninguna nueva — se reutilizan `bcryptjs` (Fase 2) y módulos nativos de
Node.js/Next.js.

## Variables de entorno

Se **elimina** `AUTH_SECRET` de `.env.example` (no se usa: las sesiones
son tokens opacos guardados en la base de datos, no JWT firmados).

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

Ninguna configuración de proyecto adicional.

## Decisiones técnicas tomadas

1. **`lib/auth-constants.ts` separado de `lib/auth.ts`**: `middleware.ts`
   corre en el **Edge Runtime** de Next.js, que no soporta Prisma,
   `bcryptjs` ni el módulo `crypto` de Node — los tres son usados por
   `lib/auth.ts`. Si el middleware importara `lib/auth.ts` directamente,
   el build fallaría o el middleware se rompería en producción. Se aisló
   la única constante que el middleware realmente necesita
   (`SESSION_COOKIE_NAME`) en un archivo sin ninguna otra dependencia.
   **Este fue un error que detecté y corregí yo mismo antes de la
   entrega**, no algo reportado por el usuario.
2. **Sesiones opacas en base de datos, no JWT**: permite revocar una
   sesión al instante con un simple `DELETE`, sin necesidad de mantener
   una lista de revocación aparte (problema clásico de JWT stateless).
   El costo es una consulta extra a la base de datos por request a
   `/admin/*`, aceptable para el tamaño de este proyecto.
3. **Defensa en profundidad (middleware + layout)** en lugar de confiar
   solo en el middleware: el middleware únicamente puede verificar que
   la cookie *exista* (no puede consultar la base de datos desde Edge),
   así que la verificación real del token y del rol ocurre en
   `app/admin/layout.tsx`. Confiar solo en el middleware habría dejado
   pasar a cualquiera con una cookie inventada del nombre correcto.
4. **Mensajes de error genéricos en el login** ("Credenciales
   inválidas" tanto si el email no existe como si la contraseña es
   incorrecta): evita que un atacante pueda enumerar qué correos están
   registrados probando uno por uno.
5. **Sin NextAuth/Auth.js**: hubiera requerido agregar tablas
   (`Account`, `VerificationToken`) no necesarias para este alcance
   (solo login con email/contraseña, sin proveedores OAuth) y una
   dependencia adicional pesada. La solución a medida es más simple de
   auditar y suficiente para los requisitos del proyecto.

## Problemas encontrados

1. **Bug de Edge Runtime** (ver decisión técnica #1) — detectado y
   corregido antes de la entrega.
2. **Tipos de retorno incorrectos en `usuario.repository.ts`**:
   `findAll`, `findById` y `findByEmail` declaraban devolver
   `Promise<User | null>` (o `User[]`), pero en tiempo de ejecución
   siempre incluían la relación `role` (`include: { role: true }`). Con
   la anotación de tipo estrecha, TypeScript no habría dejado acceder a
   `usuario.role.name` en `lib/auth.ts`, `app/admin/layout.tsx`,
   `app/login/page.tsx` ni `components/layout/navbar.tsx` — un error de
   compilación real, no cosmético.

## Soluciones aplicadas

- Se creó `lib/auth-constants.ts` y se actualizó `middleware.ts` para
  importar la constante desde ahí en vez de desde `lib/auth.ts`.
- Se introdujo el tipo `UsuarioConRol = User & { role: Role }` en
  `repository/usuario.repository.ts` y se corrigieron las firmas de los
  tres métodos afectados.
- Se verificó, con `grep`, cada punto del código que accede a
  `.role.name` para confirmar que ahora resuelve contra un tipo que
  realmente incluye esa propiedad.
- Se verificó el balance de llaves/paréntesis/corchetes en los 63
  archivos `.ts`/`.tsx` relevantes del proyecto.

## Mejoras realizadas

- Corrección de un problema de tipado preexistente en
  `usuario.repository.ts` que no se había manifestado hasta ahora
  porque ningún código anterior necesitaba leer `.role` de un usuario
  obtenido por `findByEmail`/`findById`.

## Pruebas ejecutadas

- Verificación manual de sintaxis y de balance en todo el proyecto.
- Verificación de que el modelo `Session` es compatible con SQLite (sin
  `enum` ni `Json`, siguiendo la lección aprendida en la Fase 2).
- Pendiente de ejecutar por el usuario:
  ```bash
  scripts\crear_base_datos.bat
  scripts\iniciar_proyecto.bat
  ```
  Luego, iniciar sesión en `/login` con:
  - Email: `admin@ciberseguridad-edu.local`
  - Contraseña: `CambiarEstaClave123!` (sembrada en la Fase 2)

  Confirmar: redirección a `/admin`, el Navbar muestra "Panel Admin", el
  botón "Cerrar sesión" funciona y vuelve a mostrar "Acceder".

## Resultado esperado

Ir a `/admin` sin sesión debe redirigir a `/login`. Iniciar sesión con
las credenciales del administrador sembrado debe redirigir a `/admin` y
mostrar el dashboard con el mensaje de bienvenida y la insignia de
"Sesión verificada". Cerrar sesión debe volver a bloquear el acceso a
`/admin`.

## Cómo ejecutar esta fase

```bash
scripts\crear_base_datos.bat
scripts\iniciar_proyecto.bat
```

Navegar a `/login` e ingresar con el usuario administrador sembrado en
la Fase 2.

## Pendientes para la siguiente fase

- Construir el panel administrativo completo (Fase 6): CRUD de
  noticias, artículos, categorías, usuarios, roles, evaluaciones, etc.,
  todo dentro del layout protegido ya creado en `app/admin/`.
- Considerar (no urgente): un job/script que limpie sesiones expiradas
  de la tabla `Session` periódicamente (`sessionRepository.deleteExpiradas()`
  ya existe, pero nada lo invoca todavía).
- Considerar un límite de intentos de login fallidos (rate limiting) si
  el proyecto se expone públicamente más allá del entorno académico.

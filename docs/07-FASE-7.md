# Fase 7 — Herramientas Interactivas

## Tabla de progreso

| Estado | Porcentaje | Fecha de creación | Última actualización |
|---|---|---|---|
| ✅ Completado | 100% | 2026-08-04 | 2026-08-04 |

## Objetivos

- Construir las herramientas interactivas listadas en el brief
  original: generador de contraseñas, verificador de fortaleza,
  simulador de phishing, buscador con filtros por categoría, y
  calculadora/checklist de seguridad digital.
- Garantizar que ninguna contraseña escrita o generada por el usuario
  salga del navegador.
- Extender el buscador a una consulta real contra la base de datos
  (no una simulación con datos de ejemplo).

## Alcance de esta fase

Del brief original, "Evaluaciones", "Quiz interactivos", "Sistema de
puntuación" formal (con persistencia y aprobación/reprobación) y
"Certificados automáticos" **no** se construyen aquí — corresponden a
la Fase 8, que ya tiene los modelos `Evaluacion`/`Pregunta`/
`ResultadoEvaluacion`/`Certificado` definidos desde la Fase 2. El
simulador de phishing y la calculadora de esta fase son herramientas
de práctica libre, sin puntaje persistente ni certificación.

## Funcionalidades implementadas

| Herramienta | Ruta | Persistencia |
|---|---|---|
| Generador de contraseñas | `/herramientas/generador-contrasenas` | Ninguna (solo en memoria del navegador) |
| Verificador de fortaleza | `/herramientas/verificador-contrasenas` | Ninguna |
| Simulador de phishing | `/herramientas/simulador-phishing` | Ninguna (puntaje se resetea al recargar) |
| Calculadora de seguridad | `/herramientas/calculadora-seguridad` | Ninguna |
| Checklist de seguridad | `/herramientas/checklist` | `localStorage` del navegador (no servidor) |
| Buscador | `/buscar` | Consulta real a `Publicacion` y `TerminoGlosario`, con filtro por categoría |

Además: `/herramientas` como página índice, acceso rápido de búsqueda
en el Navbar, y "Herramientas" agregado a la navegación (header) y al
footer.

## Arquitectura utilizada

Las 5 herramientas de práctica son **Client Components puros**, sin
tocar la base de datos — su lógica vive en `lib/tools/` (funciones
puras + datos estáticos), separada de la presentación, siguiendo el
mismo principio de capas del resto del proyecto. El buscador, en
cambio, es un Server Component que usa el Repository Pattern ya
establecido (`publicacionRepository.buscar()`,
`glosarioRepository.buscar()`, ambos nuevos en esta fase).

## Tecnologías empleadas

- `crypto.getRandomValues` (Web Crypto API nativa del navegador) para
  generar contraseñas — **no** `Math.random()`, que no es seguro para
  generar secretos.
- `localStorage` (solo para el checklist, con manejo de errores por si
  no está disponible).
- Sin librerías nuevas.

## Estructura de carpetas

```
cybersecurity-edu/
├── app/
│   ├── herramientas/
│   │   ├── page.tsx
│   │   ├── generador-contrasenas/page.tsx
│   │   ├── verificador-contrasenas/page.tsx
│   │   ├── simulador-phishing/page.tsx
│   │   ├── calculadora-seguridad/page.tsx
│   │   └── checklist/page.tsx
│   └── buscar/page.tsx
├── components/tools/
│   ├── tool-card.tsx
│   ├── password-generator.tsx
│   ├── password-strength-checker.tsx
│   ├── phishing-simulator.tsx
│   ├── security-calculator.tsx
│   ├── security-checklist.tsx
│   └── search-bar.tsx
├── lib/tools/
│   ├── password-utils.ts
│   ├── phishing-scenarios.ts
│   ├── security-calculator-data.ts
│   └── security-checklist-data.ts
```

## Archivos creados

23 archivos nuevos (ver árbol arriba) + `docs/07-FASE-7.md`.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `repository/publicacion.repository.ts` | Se agrega `buscar(query, categoriaSlug?)` |
| `repository/glosario.repository.ts` | Se agrega `buscar(query)` |
| `prisma/seed.ts` | Se agrega "Herramientas" a los ítems de menú del header |
| `components/layout/navbar.tsx` | Ícono de búsqueda agregado junto al selector de tema |
| `components/layout/footer.tsx` | "Herramientas" agregado a la columna "Aprende" |
| `docs/00-INDICE.md` | Progreso actualizado a 7/10 fases (70%) |
| `docs/CHANGELOG.md` | Nueva entrada de versión 0.7.0 |

## Componentes desarrollados

`ToolCard`, `PasswordGenerator`, `PasswordStrengthChecker`,
`PhishingSimulator`, `SecurityCalculator`, `SecurityChecklist`,
`SearchBar`.

## Base de datos

Sin cambios en el schema. El buscador consulta `Publicacion`
(`titulo`/`resumen`/`contenido` con `contains`) y `TerminoGlosario`
(`termino`/`definicion`).

## APIs implementadas

Ninguna — el buscador usa Server Components + `searchParams` (como
`/recursos` desde la Fase 4), sin API Route ni JavaScript de cliente
para la consulta en sí.

## Hooks creados

Ninguno propio — se usan hooks nativos de React (`useState`,
`useCallback`, `useEffect`) y de Next.js (`useRouter`,
`useSearchParams`).

## Utilidades creadas

- `lib/tools/password-utils.ts`: `generarContrasena()`,
  `evaluarFortaleza()`.
- `lib/tools/phishing-scenarios.ts`, `security-calculator-data.ts`,
  `security-checklist-data.ts`: datos estáticos de cada herramienta.

## Dependencias instaladas

Ninguna nueva.

## Variables de entorno

Sin cambios.

## Scripts .bat creados o modificados

Ninguno en esta fase.

## Configuración realizada

Ninguna configuración de proyecto adicional.

## Decisiones técnicas tomadas

1. **Ninguna contraseña sale del navegador**: tanto el generador como
   el verificador son Client Components que nunca hacen `fetch` ni
   envían su valor a ningún endpoint. Se documentó explícitamente en la
   UI de ambas herramientas para que el usuario final lo sepa, no solo
   en el código.
2. **`crypto.getRandomValues` en vez de `Math.random()`**: `Math.random`
   no es criptográficamente seguro (es predecible con suficientes
   muestras) y nunca debe usarse para generar contraseñas, tokens o
   claves — aunque sea "solo una demo educativa", enseñar la práctica
   correcta es parte del valor pedagógico de la herramienta.
3. **Simulador de phishing y calculadora sin persistencia**: son
   herramientas de práctica libre, repetibles cuantas veces se quiera.
   Guardar sus resultados requeriría el modelo `ResultadoEvaluacion` y
   pertenece conceptualmente a la Fase 8 (evaluaciones formales con
   aprobación y certificado).
4. **Checklist con `localStorage`, no con el modelo `User` en base de
   datos**: en esta fase todavía no hay una asociación clara entre
   "quién marcó qué" y una cuenta de estudiante autenticada (el sistema
   de auth actual es para `ADMIN`/`EDITOR`, sin rol `ESTUDIANTE` con
   login funcional todavía). Persistir en base de datos habría requerido
   diseño adicional fuera del alcance de "herramienta interactiva".
5. **Buscador con `contains` simple, no búsqueda de texto completo**:
   SQLite requiere la extensión FTS5 para búsqueda de texto completo
   real, que Prisma no habilita por defecto. Para el volumen de
   contenido de este sitio, `contains` es suficiente; se documenta como
   límite conocido si el contenido crece mucho.

## Problemas encontrados

1. **Bug de "closure obsoleto" en el generador de contraseñas**: al
   tildar una casilla (mayúsculas/minúsculas/números/símbolos), el
   código original hacía `opcion.set(valor); setTimeout(regenerar, 0)`.
   Como `regenerar` es una función memoizada con `useCallback` que
   captura los valores de las casillas *del render en que fue creada*,
   ejecutarla en un `setTimeout` posterior seguía usando el valor
   **anterior** de la casilla recién tildada — la contraseña se
   regeneraba "un paso atrás" del cambio real.
2. `useSearchParams()` en `SearchBar` (Client Component usado dentro de
   `BuscarPage`, un Server Component) requiere estar envuelto en
   `<Suspense>` en Next.js App Router; de lo contrario, el build puede
   fallar o forzar un *bailout* a renderizado 100% de cliente para toda
   la página.

## Soluciones aplicadas

1. Se reemplazó el patrón `set + setTimeout(regenerar)` por una función
   `alternarOpcion()` que construye el objeto de opciones completo
   (incluyendo el valor **nuevo** de la casilla recién tildada) y llama
   a `generarContrasena()` directamente, sin pasar por ningún closure
   desactualizado.
2. Se envolvió `<SearchBar />` en `<Suspense>` dentro de
   `app/buscar/page.tsx`, con un fallback simple (una barra gris del
   mismo alto) para evitar salto de layout.
3. Se verificó el balance de llaves/paréntesis/corchetes en los 134
   archivos `.ts`/`.tsx` relevantes del proyecto tras todos los cambios.

## Mejoras realizadas

- Corrección de un bug de estado obsoleto detectado y solucionado
  antes de la entrega, no reportado por el usuario.

## Pruebas ejecutadas

- Verificación manual de sintaxis y balance en todo el proyecto.
- Pendiente de ejecutar por el usuario:
  ```bash
  scripts\iniciar_proyecto.bat
  ```
  Probar: generar varias contraseñas y tildar/destildar casillas
  (confirmar que el resultado cambia de inmediato, sin retraso),
  completar el simulador de phishing, marcar ítems del checklist y
  recargar la página (deben seguir marcados), y buscar "phishing" en
  `/buscar` (debe encontrar el artículo sembrado en la Fase 4).

## Resultado esperado

Las 5 páginas de `/herramientas/*` deben funcionar completamente sin
conexión a internet una vez cargada la página (no dependen de ningún
servicio externo). `/buscar?q=phishing` debe devolver al menos el
artículo "Cómo reconocer un correo de phishing" sembrado en la
Fase 4 y el término "Phishing" del glosario.

## Cómo ejecutar esta fase

```bash
scripts\iniciar_proyecto.bat
```

Navegar a `/herramientas` y probar cada herramienta.

## Pendientes para la siguiente fase

- Fase 8 construirá el sistema formal de evaluaciones (con preguntas
  de opción múltiple guardadas en base de datos, puntaje mínimo para
  aprobar, y emisión de certificados en PDF), reutilizando los modelos
  `Evaluacion`, `Pregunta`, `OpcionRespuesta`, `ResultadoEvaluacion` y
  `Certificado` ya definidos desde la Fase 2.
- Considerar, si el usuario lo pide: una extensión ligera del buscador
  a `Recurso` (hoy solo busca en `Publicacion` y `TerminoGlosario`).

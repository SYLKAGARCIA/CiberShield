# Scripts de automatización (Windows)

Estos scripts `.bat` automatizan las tareas más comunes de desarrollo,
mantenimiento y despliegue del proyecto. **Ejecútalos siempre haciendo
doble clic desde el Explorador de Windows, o desde una terminal `cmd`
ubicada en cualquier carpeta del proyecto** — cada script se posiciona
automáticamente en la raíz del proyecto.

> **Importante:** estos scripts son para **desarrollo y administración
> local en Windows**. El despliegue real en producción ocurre en Vercel
> (Linux), que no ejecuta estos `.bat` — solo te ayudan a preparar y
> publicar el proyecto desde tu PC.

| Script | Qué hace |
|---|---|
| `instalar_dependencias.bat` | Verifica Node.js, npm, Git y Prisma; instala todas las dependencias del proyecto. **Ejecútalo primero, una sola vez** (o tras clonar el repo). |
| `crear_base_datos.bat` | Crea el archivo `.env` si no existe, ejecuta las migraciones de Prisma, genera el cliente y corre el seed inicial. |
| `abrir_base_datos.bat` | Abre Prisma Studio (interfaz visual) para ver y editar los datos directamente. |
| `iniciar_proyecto.bat` | Verifica dependencias y base de datos, y levanta el servidor de desarrollo, abriendo el navegador automáticamente. **El que más vas a usar día a día.** |
| `actualizar_proyecto.bat` | Actualiza dependencias del proyecto y de Prisma, y aplica migraciones pendientes. |
| `limpiar_cache.bat` | Borra `.next`, la caché de `node_modules` y la caché de npm. Útil cuando algo se comporta raro. |
| `compilar_produccion.bat` | Genera el build optimizado de producción (`npm run build`). |
| `publicar_vercel.bat` | Publica el proyecto en Vercel. Te advierte que SQLite no es apto para producción y pide confirmación. |
| `publicar_github.bat` | Inicializa Git si hace falta, hace commit de los cambios y los sube a tu repositorio remoto. |
| `verificar_proyecto.bat` | Chequeo de salud general: Node, dependencias, Prisma, base de datos, `.env` y lint. |
| `backup_base_datos.bat` | Crea una copia de `prisma/dev.db` con fecha y hora en la carpeta `backups/`. |
| `restaurar_base_datos.bat` | Lista los backups disponibles y restaura el que elijas. |
| `ejecutar_pruebas.bat` | Corre la suite de pruebas (o, si aún no existe, valida lint + build como chequeo mínimo). |

## Orden recomendado la primera vez

```
1. instalar_dependencias.bat
2. crear_base_datos.bat
3. iniciar_proyecto.bat
```

## Nota sobre SQLite y producción

Estos scripts asumen SQLite en desarrollo local (decisión tomada en la
Fase 1). Si en el futuro migras a PostgreSQL/Supabase para producción,
`backup_base_datos.bat` y `restaurar_base_datos.bat` dejarán de aplicar
tal cual están (SQLite es un archivo; Postgres no) — se actualizarán en
la fase correspondiente del proyecto.

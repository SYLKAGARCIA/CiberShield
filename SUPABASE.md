# Configuración de Supabase — CiberShield UTLVT

La aplicación usa PostgreSQL de Supabase como base de datos definitiva mediante Prisma.

1. Copia `.env.example` a `.env` y reemplaza `TU_PASSWORD` por la contraseña de PostgreSQL de tu proyecto Supabase.
2. Ejecuta `npm install`.
3. Ejecuta `npx prisma generate`.
4. Ejecuta `npx prisma migrate deploy` para crear las tablas.
5. Ejecuta `npm run prisma:seed` para cargar los datos iniciales.
6. Ejecuta `npm run dev` y abre `http://localhost:3000`.

No compartas el archivo `.env` ni la contraseña de PostgreSQL.

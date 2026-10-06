# CiberShield UTLVT — versión con chatbot IA

## Corrección realizada
Se corrigió el error de TypeScript en `components/admin/admin-sidebar.tsx`.
El arreglo tipa explícitamente las secciones del menú para que `soloAdmin` sea una propiedad opcional y TypeScript pueda manejarla correctamente.

## Chatbot IA
El proyecto incluye `components/chatbot/cybershield-chatbot.tsx` y `app/api/chat/route.ts`.
El chatbot usa Google Gemini mediante una llamada desde el servidor y no expone la clave en el navegador.

## Configuración
1. Instala Node.js 18.18 o superior.
2. Ejecuta `npm install`.
3. Copia `.env.example` como `.env`.
4. Coloca tu `GEMINI_API_KEY` en `.env`.
5. Ejecuta `npx prisma generate`.
6. Para desarrollo: `npm run dev`.
7. Para producción: `npm run build` y luego `npm start`.

## Comprobación
El proyecto pasa `npx tsc --noEmit` después de la corrección.

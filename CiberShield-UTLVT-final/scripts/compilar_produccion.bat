@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Compilar Produccion - CiberSeguridad Estudiantil
echo ====================================================
echo   COMPILANDO BUILD DE PRODUCCION
echo ====================================================
echo.

cd /d "%~dp0.."

echo [1/3] Generando Prisma Client actualizado...
call npx prisma generate
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo la generacion del cliente de Prisma.
    goto :error
)
echo   [OK] Prisma Client generado.

echo.
echo [2/3] Ejecutando build de Next.js...
call npm run build
if %errorlevel% neq 0 (
    echo   [ERROR] El build fallo. Revisa los errores de compilacion arriba.
    goto :error
)
echo   [OK] Build generado correctamente en la carpeta .next

echo.
echo [3/3] Build listo. Puedes probarlo localmente con: npm run start
echo.
echo ====================================================
echo   BUILD DE PRODUCCION COMPLETADO
echo ====================================================
pause
exit /b 0

:error
echo.
echo ====================================================
echo   EL BUILD DE PRODUCCION FALLO
echo ====================================================
pause
exit /b 1

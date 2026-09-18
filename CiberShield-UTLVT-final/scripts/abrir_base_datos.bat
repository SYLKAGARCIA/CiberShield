@echo off
chcp 65001 >nul
title Abrir Base de Datos - Prisma Studio
echo ====================================================
echo   ABRIENDO PRISMA STUDIO
echo ====================================================
echo.

cd /d "%~dp0.."

if not exist "prisma\dev.db" (
    echo [ADVERTENCIA] No se encontro prisma\dev.db
    echo Ejecuta primero crear_base_datos.bat
    echo.
    pause
    exit /b 1
)

echo Abriendo Prisma Studio en el navegador...
echo (Se abrira normalmente en http://localhost:5555)
echo Para detenerlo, cierra esta ventana o presiona Ctrl+C.
echo.
call npx prisma studio

pause

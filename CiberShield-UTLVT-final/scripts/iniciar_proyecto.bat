@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Iniciar Proyecto - CiberSeguridad Estudiantil
echo ====================================================
echo   INICIANDO PROYECTO
echo ====================================================
echo.

cd /d "%~dp0.."

echo [1/3] Verificando dependencias (node_modules)...
if not exist "node_modules" (
    echo   [AVISO] No se encontraron dependencias instaladas.
    echo   Ejecutando instalar_dependencias.bat primero...
    call scripts\instalar_dependencias.bat
)
echo   [OK] Dependencias presentes.

echo.
echo [2/3] Verificando base de datos...
if not exist "prisma\dev.db" (
    echo   [AVISO] No se encontro la base de datos.
    echo   Ejecutando crear_base_datos.bat primero...
    call scripts\crear_base_datos.bat
)
echo   [OK] Base de datos presente.

echo.
echo [3/3] Levantando el servidor de desarrollo...
echo   El sitio se abrira automaticamente en http://localhost:3000
echo   Presiona Ctrl+C en esta ventana para detener el servidor.
echo.

start "" http://localhost:3000
call npm run dev

pause

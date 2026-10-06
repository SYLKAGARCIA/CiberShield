@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Verificar Proyecto - CiberSeguridad Estudiantil
echo ====================================================
echo   VERIFICACION GENERAL DEL PROYECTO
echo ====================================================
echo.

cd /d "%~dp0.."
set ERRORES=0

echo [1/6] Verificando Node.js y npm...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo   [ERROR] Node.js no encontrado.
    set /a ERRORES+=1
) else (
    for /f "tokens=*" %%v in ('node -v') do echo   [OK] Node.js %%v
)

echo.
echo [2/6] Verificando dependencias instaladas...
if exist "node_modules" (
    echo   [OK] node_modules presente.
) else (
    echo   [ERROR] node_modules no existe. Ejecuta instalar_dependencias.bat
    set /a ERRORES+=1
)

echo.
echo [3/6] Verificando Prisma...
call npx prisma --version >nul 2>nul
if %errorlevel% neq 0 (
    echo   [ERROR] Prisma no disponible.
    set /a ERRORES+=1
) else (
    echo   [OK] Prisma disponible.
)

echo.
echo [4/6] Verificando base de datos...
if exist "prisma\dev.db" (
    echo   [OK] Base de datos SQLite encontrada.
) else (
    echo   [ADVERTENCIA] No existe prisma\dev.db. Ejecuta crear_base_datos.bat
)

echo.
echo [5/6] Verificando variables de entorno (.env)...
if exist ".env" (
    echo   [OK] Archivo .env presente.
    findstr /C:"DATABASE_URL" ".env" >nul 2>nul
    if %errorlevel% neq 0 (
        echo   [ADVERTENCIA] DATABASE_URL no encontrada en .env
    )
) else (
    echo   [ERROR] No existe archivo .env. Copia .env.example a .env
    set /a ERRORES+=1
)

echo.
echo [6/6] Verificando que el proyecto compila (lint)...
call npm run lint
if %errorlevel% neq 0 (
    echo   [ADVERTENCIA] Se encontraron problemas de lint. Revisa el detalle arriba.
) else (
    echo   [OK] Sin errores de lint.
)

echo.
echo ====================================================
if %ERRORES% equ 0 (
    echo   VERIFICACION COMPLETADA: PROYECTO EN BUEN ESTADO
) else (
    echo   VERIFICACION COMPLETADA CON %ERRORES% ERROR^(ES^)
    echo   Revisa los mensajes marcados como [ERROR] arriba.
)
echo ====================================================
pause
exit /b %ERRORES%

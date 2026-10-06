@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Publicar en Vercel - CiberSeguridad Estudiantil
echo ====================================================
echo   PUBLICANDO EN VERCEL
echo ====================================================
echo.

cd /d "%~dp0.."

echo [1/3] Verificando Vercel CLI...
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo   [AVISO] Vercel CLI no esta instalado. Instalando globalmente...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo   [ERROR] No se pudo instalar Vercel CLI.
        goto :error
    )
)
echo   [OK] Vercel CLI disponible.

echo.
echo [2/3] Iniciando sesion en Vercel (si es la primera vez, se abrira el navegador)...
call vercel login

echo.
echo [3/3] Publicando el proyecto...
echo   NOTA: Este proyecto usa SQLite en desarrollo. Vercel no soporta
echo   archivos SQLite persistentes en produccion; antes de publicar en
echo   serio, configura una base de datos PostgreSQL (ej. Supabase o
echo   Vercel Postgres) y actualiza DATABASE_URL en las variables de
echo   entorno del proyecto en Vercel.
echo.
set /p CONFIRMAR="Deseas continuar con el despliegue de todas formas? (S/N): "
if /i not "%CONFIRMAR%"=="S" (
    echo Despliegue cancelado por el usuario.
    goto :fin
)

call vercel --prod
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo el despliegue en Vercel.
    goto :error
)

echo.
echo ====================================================
echo   PROYECTO PUBLICADO EN VERCEL
echo ====================================================
:fin
pause
exit /b 0

:error
echo.
echo ====================================================
echo   OCURRIO UN ERROR PUBLICANDO EN VERCEL
echo ====================================================
pause
exit /b 1

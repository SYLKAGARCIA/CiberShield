@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Actualizar Proyecto - CiberSeguridad Estudiantil
echo ====================================================
echo   ACTUALIZANDO PROYECTO
echo ====================================================
echo.

cd /d "%~dp0.."

echo [1/4] Actualizando dependencias del proyecto...
call npm update
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo la actualizacion de dependencias.
    goto :error
)
echo   [OK] Dependencias actualizadas.

echo.
echo [2/4] Actualizando Prisma CLI y Client...
call npm install prisma@latest @prisma/client@latest
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo la actualizacion de Prisma.
    goto :error
)
echo   [OK] Prisma actualizado.

echo.
echo [3/4] Aplicando migraciones pendientes...
call npx prisma migrate dev
if %errorlevel% neq 0 (
    echo   [ERROR] Fallaron las migraciones.
    goto :error
)
echo   [OK] Migraciones al dia.

echo.
echo [4/4] Regenerando Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo la regeneracion del cliente de Prisma.
    goto :error
)
echo   [OK] Prisma Client regenerado.

echo.
echo ====================================================
echo   PROYECTO ACTUALIZADO CORRECTAMENTE
echo ====================================================
pause
exit /b 0

:error
echo.
echo ====================================================
echo   OCURRIO UN ERROR ACTUALIZANDO EL PROYECTO
echo ====================================================
pause
exit /b 1

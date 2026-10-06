@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Crear Base de Datos - CiberSeguridad Estudiantil
echo ====================================================
echo   CREACION DE BASE DE DATOS
echo ====================================================
echo.

cd /d "%~dp0.."

if not exist ".env" (
    echo [AVISO] No existe el archivo .env, se creara a partir de .env.example
    copy /y ".env.example" ".env" >nul
    echo   [OK] .env creado.
)

echo.
echo [1/4] Ejecutando migraciones de Prisma...
call npx prisma migrate dev --name init
if %errorlevel% neq 0 (
    echo   [ERROR] Fallaron las migraciones. Revisa prisma/schema.prisma y el .env
    goto :error
)
echo   [OK] Migraciones aplicadas.

echo.
echo [2/4] Generando Prisma Client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo la generacion del cliente de Prisma.
    goto :error
)
echo   [OK] Prisma Client generado.

echo.
echo [3/4] Ejecutando seed de datos iniciales...
call npm run prisma:seed
if %errorlevel% neq 0 (
    echo   [ADVERTENCIA] El seed no se ejecuto correctamente. Puedes reintentarlo luego.
) else (
    echo   [OK] Seed ejecutado correctamente.
)

echo.
echo [4/4] Verificando que el archivo de base de datos existe...
if exist "prisma\dev.db" (
    echo   [OK] Base de datos SQLite creada en prisma\dev.db
) else (
    echo   [ADVERTENCIA] No se encontro prisma\dev.db, revisa la configuracion de DATABASE_URL.
)

echo.
echo ====================================================
echo   BASE DE DATOS LISTA
echo ====================================================
echo   Puedes explorarla con: abrir_base_datos.bat
echo.
pause
exit /b 0

:error
echo.
echo ====================================================
echo   OCURRIO UN ERROR CREANDO LA BASE DE DATOS
echo ====================================================
pause
exit /b 1

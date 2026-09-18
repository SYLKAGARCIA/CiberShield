@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Restaurar Base de Datos - CiberSeguridad Estudiantil
echo ====================================================
echo   RESTAURAR BASE DE DATOS
echo ====================================================
echo.

cd /d "%~dp0.."

if not exist "backups" (
    echo [ERROR] No existe la carpeta de backups. Ejecuta backup_base_datos.bat primero.
    pause
    exit /b 1
)

echo Backups disponibles:
echo ----------------------------------------------------
set /a CONTADOR=0
for %%f in (backups\*.db) do (
    set /a CONTADOR+=1
    echo   !CONTADOR!^) %%~nxf
    set "ARCHIVO_!CONTADOR!=%%f"
)
echo ----------------------------------------------------

if %CONTADOR% equ 0 (
    echo [ERROR] No se encontraron archivos de backup en la carpeta backups\
    pause
    exit /b 1
)

echo.
set /p SELECCION="Escribe el numero del backup a restaurar: "
set "ARCHIVO_ELEGIDO=!ARCHIVO_%SELECCION%!"

if "%ARCHIVO_ELEGIDO%"=="" (
    echo [ERROR] Seleccion invalida.
    pause
    exit /b 1
)

echo.
echo [ADVERTENCIA] Esto reemplazara tu base de datos actual (prisma\dev.db)
echo Archivo a restaurar: %ARCHIVO_ELEGIDO%
set /p CONFIRMAR="Estas seguro? (S/N): "
if /i not "%CONFIRMAR%"=="S" (
    echo Operacion cancelada.
    pause
    exit /b 0
)

copy /y "%ARCHIVO_ELEGIDO%" "prisma\dev.db" >nul
if %errorlevel% neq 0 (
    echo [ERROR] No se pudo restaurar el backup.
    pause
    exit /b 1
)

echo.
echo [OK] Base de datos restaurada correctamente desde: %ARCHIVO_ELEGIDO%
echo.
echo ====================================================
echo   RESTAURACION COMPLETADA
echo ====================================================
pause
exit /b 0

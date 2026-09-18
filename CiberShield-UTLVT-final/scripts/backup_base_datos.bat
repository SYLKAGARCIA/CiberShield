@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Backup Base de Datos - CiberSeguridad Estudiantil
echo ====================================================
echo   BACKUP DE BASE DE DATOS
echo ====================================================
echo.

cd /d "%~dp0.."

if not exist "prisma\dev.db" (
    echo [ERROR] No se encontro prisma\dev.db para respaldar.
    pause
    exit /b 1
)

if not exist "backups" mkdir "backups"

for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "FECHA=%dt:~0,4%-%dt:~4,2%-%dt:~6,2%_%dt:~8,2%-%dt:~10,2%-%dt:~12,2%"

set "DESTINO=backups\dev_%FECHA%.db"

echo Copiando prisma\dev.db a %DESTINO% ...
copy /y "prisma\dev.db" "%DESTINO%" >nul

if %errorlevel% neq 0 (
    echo [ERROR] No se pudo crear el backup.
    pause
    exit /b 1
)

echo.
echo [OK] Backup creado correctamente: %DESTINO%
echo.
echo ====================================================
echo   BACKUP COMPLETADO
echo ====================================================
echo   Para restaurarlo, usa restaurar_base_datos.bat
echo.
pause
exit /b 0

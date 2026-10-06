@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Instalar Dependencias - CiberSeguridad Estudiantil
echo ====================================================
echo   INSTALADOR DE DEPENDENCIAS
echo ====================================================
echo.

echo [1/4] Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo   [ERROR] Node.js no esta instalado o no esta en el PATH.
    echo   Descargalo desde: https://nodejs.org
    goto :error
) else (
    for /f "tokens=*" %%v in ('node -v') do echo   [OK] Node.js %%v detectado.
)

echo.
echo [2/4] Verificando npm...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo   [ERROR] npm no esta disponible. Reinstala Node.js.
    goto :error
) else (
    for /f "tokens=*" %%v in ('npm -v') do echo   [OK] npm %%v detectado.
)

echo.
echo [3/4] Verificando Git...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo   [ADVERTENCIA] Git no esta instalado. No podras usar publicar_github.bat.
    echo   Descargalo desde: https://git-scm.com
) else (
    for /f "tokens=*" %%v in ('git --version') do echo   [OK] %%v detectado.
)

echo.
echo [4/4] Instalando dependencias del proyecto (npm install)...
echo   Esto puede tardar varios minutos, por favor espera...
call npm install
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo la instalacion de dependencias. Revisa el mensaje de arriba.
    goto :error
)

echo.
echo Verificando Prisma...
call npx prisma --version >nul 2>nul
if %errorlevel% neq 0 (
    echo   [ERROR] Prisma no se instalo correctamente.
    goto :error
) else (
    echo   [OK] Prisma disponible.
)

echo.
echo ====================================================
echo   INSTALACION COMPLETADA CORRECTAMENTE
echo ====================================================
echo   Siguiente paso: ejecuta crear_base_datos.bat
echo.
pause
exit /b 0

:error
echo.
echo ====================================================
echo   LA INSTALACION SE DETUVO POR UN ERROR
echo ====================================================
pause
exit /b 1

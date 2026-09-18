@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Publicar en GitHub - CiberSeguridad Estudiantil
echo ====================================================
echo   PUBLICANDO EN GITHUB
echo ====================================================
echo.

cd /d "%~dp0.."

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git no esta instalado. Descargalo desde https://git-scm.com
    goto :error
)

if not exist ".git" (
    echo [1/6] No existe repositorio Git. Inicializando...
    call git init
    echo   [OK] Repositorio inicializado.
    echo.
    set /p REPO_URL="Pega la URL de tu repositorio remoto de GitHub (ej. https://github.com/usuario/repo.git): "
    call git remote add origin "!REPO_URL!"
    echo   [OK] Remoto 'origin' configurado.
) else (
    echo [1/6] Repositorio Git ya inicializado.
)

echo.
echo [2/6] Agregando archivos al staging...
call git add .
echo   [OK] Archivos agregados.

echo.
echo [3/6] Verificando que no se suban credenciales (.env)...
set ENV_DETECTADO=0
for /f "delims=" %%f in ('git diff --cached --name-only') do (
    if /i "%%f"==".env" set ENV_DETECTADO=1
    echo %%f | findstr /i /r "\.env$ \.env\..*local" >nul
    if !errorlevel! equ 0 set ENV_DETECTADO=1
)
if !ENV_DETECTADO! equ 1 (
    echo.
    echo   [PELIGRO] Se detecto un archivo .env en el staging.
    echo   Este archivo contiene contrasenas y llaves reales.
    echo   Se ha detenido el proceso para proteger tus credenciales.
    call git reset
    echo   [OK] Staging revertido. Revisa tu .gitignore antes de continuar.
    goto :error
)
echo   [OK] No se detectaron archivos .env en el staging.

echo.
set /p MENSAJE="Escribe el mensaje del commit (Enter para usar uno por defecto): "
if "%MENSAJE%"=="" set MENSAJE=Actualizacion del proyecto

echo.
echo [4/6] Creando commit: "%MENSAJE%"
call git commit -m "%MENSAJE%"

echo.
echo [5/6] Verificando rama actual...
for /f "tokens=*" %%b in ('git branch --show-current') do set RAMA=%%b
if "%RAMA%"=="" (
    call git branch -M main
    set RAMA=main
)
echo   [OK] Rama actual: %RAMA%

echo.
echo [6/6] Enviando cambios a GitHub (git push)...
call git push -u origin %RAMA%
if %errorlevel% neq 0 (
    echo.
    echo   [ERROR] Fallo el push directo. Puede que el repositorio remoto
    echo   ya tenga commits (por ejemplo, si creaste el repo con un README).
    echo   Intentando traer esos cambios primero...
    call git pull origin %RAMA% --allow-unrelated-histories --no-rebase
    if !errorlevel! neq 0 (
        echo   [ERROR] No se pudo sincronizar automaticamente.
        echo   Revisa los conflictos manualmente con 'git status'.
        goto :error
    )
    call git push -u origin %RAMA%
    if !errorlevel! neq 0 (
        echo   [ERROR] Fallo el push. Verifica tus credenciales y el remoto configurado.
        goto :error
    )
)

echo.
echo ====================================================
echo   CAMBIOS PUBLICADOS EN GITHUB CORRECTAMENTE
echo ====================================================
pause
exit /b 0

:error
echo.
echo ====================================================
echo   OCURRIO UN ERROR PUBLICANDO EN GITHUB
echo ====================================================
pause
exit /b 1

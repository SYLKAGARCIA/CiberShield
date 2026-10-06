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
    echo [1/5] No existe repositorio Git. Inicializando...
    call git init
    echo   [OK] Repositorio inicializado.
    echo.
    set /p REPO_URL="Pega la URL de tu repositorio remoto de GitHub (ej. https://github.com/usuario/repo.git): "
    call git remote add origin "!REPO_URL!"
    echo   [OK] Remoto 'origin' configurado.
) else (
    echo [1/5] Repositorio Git ya inicializado.
)

echo.
echo [2/5] Agregando archivos al staging...
call git add .
echo   [OK] Archivos agregados.

echo.
set /p MENSAJE="Escribe el mensaje del commit (Enter para usar uno por defecto): "
if "%MENSAJE%"=="" set MENSAJE=Actualizacion del proyecto

echo.
echo [3/5] Creando commit: "%MENSAJE%"
call git commit -m "%MENSAJE%"

echo.
echo [4/5] Verificando rama actual...
for /f "tokens=*" %%b in ('git branch --show-current') do set RAMA=%%b
if "%RAMA%"=="" (
    call git branch -M main
    set RAMA=main
)
echo   [OK] Rama actual: %RAMA%

echo.
echo [5/5] Enviando cambios a GitHub (git push)...
call git push -u origin %RAMA%
if %errorlevel% neq 0 (
    echo   [ERROR] Fallo el push. Verifica tus credenciales y el remoto configurado.
    goto :error
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

@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Publicar en GitHub - CiberShield UTLVT
echo ====================================================
echo   PUBLICANDO EN GITHUB
echo ====================================================
echo.

rem Funciona tanto si el .bat esta en la raiz del proyecto como en la carpeta scripts
if exist "%~dp0package.json" (cd /d "%~dp0") else (cd /d "%~dp0..")

where git >nul 2>nul
if errorlevel 1 goto :sin_git

if exist ".git" goto :repo_ok
echo [1/7] No existe repositorio Git. Inicializando...
call git init
set /p REPO_URL="Pega la URL de tu repositorio de GitHub: "
call git remote add origin "!REPO_URL!"
goto :paso2
:repo_ok
echo [1/7] Repositorio Git ya inicializado.

:paso2
echo.
echo [2/7] Agregando archivos al staging...
call git add .
echo   [OK] Archivos agregados.

echo.
echo [3/7] Verificando que no se suban credenciales .env ...
git diff --cached --name-only | findstr /r /i "^\.env$ /\.env$ \.env\.local$" >nul
if not errorlevel 1 goto :hay_env
echo   [OK] No se detectaron archivos .env en el staging.

echo.
set "MENSAJE="
set /p MENSAJE="Escribe el mensaje del commit, Enter para usar uno por defecto: "
if "!MENSAJE!"=="" set "MENSAJE=Actualizacion del proyecto"
echo.
echo [4/7] Creando commit: "!MENSAJE!"
git diff --cached --quiet
if errorlevel 1 (
    call git commit -m "!MENSAJE!"
) else (
    echo   [INFO] No hay cambios nuevos para guardar. Se publicaran los commits pendientes.
)

echo.
echo [5/7] Verificando rama actual...
set "RAMA="
for /f "tokens=*" %%b in ('git branch --show-current') do set "RAMA=%%b"
if "!RAMA!"=="" set "RAMA=main"
echo   [OK] Rama actual: !RAMA!

echo.
echo [6/7] Trayendo cambios que ya estan en GitHub...
call git fetch origin
git rev-parse --verify --quiet origin/!RAMA! >nul
if errorlevel 1 goto :push
call git pull --rebase origin !RAMA!
if errorlevel 1 goto :conflicto
echo   [OK] Tu copia local ya incluye lo que habia en GitHub.

:push
echo.
echo [7/7] Enviando cambios a GitHub...
call git push -u origin !RAMA!
if errorlevel 1 goto :error_push

echo.
echo ====================================================
echo   CAMBIOS PUBLICADOS EN GITHUB CORRECTAMENTE
echo ====================================================
pause
exit /b 0

:sin_git
echo [ERROR] Git no esta instalado. Descargalo desde https://git-scm.com
goto :fin_error

:hay_env
echo   [ERROR] Hay un archivo .env en el staging. NO se subira nada.
echo   Revisa que .env este en .gitignore y ejecuta: git rm --cached .env
goto :fin_error

:conflicto
echo.
echo   [ERROR] Tus cambios y los de GitHub modifican las mismas lineas de algun archivo.
echo   Se deshace el intento para dejar todo como estaba. No se perdio nada.
call git rebase --abort >nul 2>nul
echo   Archivos en conflicto: revisa el mensaje de arriba. Pide ayuda antes de forzar el push.
goto :fin_error

:error_push
echo   [ERROR] Fallo el push. Verifica tu sesion de GitHub y la URL del remoto.
goto :fin_error

:fin_error
echo.
echo ====================================================
echo   OCURRIO UN ERROR PUBLICANDO EN GITHUB
echo ====================================================
pause
exit /b 1

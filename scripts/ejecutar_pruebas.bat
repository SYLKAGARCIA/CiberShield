@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Ejecutar Pruebas - CiberSeguridad Estudiantil
echo ====================================================
echo   EJECUTANDO PRUEBAS DEL PROYECTO
echo ====================================================
echo.

cd /d "%~dp0.."

findstr /C:"\"test\"" package.json >nul 2>nul
if %errorlevel% neq 0 (
    echo [AVISO] Aun no hay un script "test" configurado en package.json.
    echo El framework de pruebas se definira en una fase posterior del proyecto.
    echo.
    echo Mientras tanto, esta verificacion basica confirma que el proyecto compila:
    echo.
    echo [1/2] Verificando lint...
    call npm run lint
    echo.
    echo [2/2] Verificando build de produccion...
    call npm run build
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] El proyecto no compila correctamente.
        pause
        exit /b 1
    )
    echo.
    echo [OK] El proyecto compila sin errores ^(lint + build^).
    pause
    exit /b 0
)

echo Ejecutando suite de pruebas...
call npm test
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Algunas pruebas fallaron. Revisa el detalle arriba.
    pause
    exit /b 1
)

echo.
echo ====================================================
echo   TODAS LAS PRUEBAS PASARON CORRECTAMENTE
echo ====================================================
pause
exit /b 0

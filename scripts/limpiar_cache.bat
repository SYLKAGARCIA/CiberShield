@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Limpiar Cache - CiberSeguridad Estudiantil
echo ====================================================
echo   LIMPIANDO CACHE DEL PROYECTO
echo ====================================================
echo.

cd /d "%~dp0.."

echo [1/4] Eliminando carpeta .next...
if exist ".next" (
    rmdir /s /q ".next"
    echo   [OK] .next eliminada.
) else (
    echo   [INFO] .next no existia.
)

echo.
echo [2/4] Eliminando cache de node_modules (.cache)...
if exist "node_modules\.cache" (
    rmdir /s /q "node_modules\.cache"
    echo   [OK] node_modules\.cache eliminada.
) else (
    echo   [INFO] node_modules\.cache no existia.
)

echo.
echo [3/4] Limpiando cache de npm...
call npm cache clean --force
echo   [OK] Cache de npm limpiada.

echo.
echo [4/4] Eliminando archivos temporales (*.tsbuildinfo)...
del /s /q *.tsbuildinfo >nul 2>nul
echo   [OK] Temporales eliminados.

echo.
echo ====================================================
echo   CACHE LIMPIADA CORRECTAMENTE
echo ====================================================
echo   Si algo dejo de funcionar, ejecuta iniciar_proyecto.bat
echo   para reconstruir todo desde cero.
echo.
pause
exit /b 0

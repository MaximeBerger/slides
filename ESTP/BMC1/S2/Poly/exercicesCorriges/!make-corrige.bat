@echo off
setlocal enabledelayedexpansion

REM Script pour compiler un corrigé individuel
REM Usage: !make-corrige.bat exo-2.1.tex

if "%1"=="" (
    echo Usage: !make-corrige.bat nom_fichier.tex
    echo Exemple: !make-corrige.bat exo-2.1.tex
    pause
    exit /b 1
)

set FICHIER=%1

if not exist "%FICHIER%" (
    echo Erreur: Le fichier %FICHIER% n'existe pas.
    pause
    exit /b 1
)

echo Compilation de %FICHIER%...
pdflatex -interaction=nonstopmode "%FICHIER%"

REM Nettoyage des fichiers auxiliaires
del /q *.aux 2>nul
del /q *.log 2>nul
del /q *.out 2>nul

echo.
echo Compilation terminee.
pause

@echo off
REM Script pour compiler un chapitre individuel avec subfiles
REM Modifier la variable CHAPITRE ci-dessous pour choisir le chapitre a compiler

REM ============================================================
REM CHAPITRE A COMPILER (modifier cette ligne) :
set CHAPITRE=R-continuiteDerivabilite

REM ============================================================
REM Chapitres disponibles:
REM   R-continuiteDerivabilite
REM   R-Integrales
REM   K-IntegraleMultiple
REM   R-FonctionsTrigo
REM   R-EquadiffOrdre1
REM   K-EquadiffOrdre2
REM   K-PlusieursVariables
REM ============================================================

REM Definir TEXINPUTS pour inclure le dossier Config
set TEXINPUTS=c:\Users\mberge04\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%

REM Se placer dans le dossier chapitres pour que subfiles trouve main.tex
cd chapitres

REM Compilation du chapitre
echo Compilation de %CHAPITRE%.tex...
xelatex %CHAPITRE%.tex

REM Suppression des fichiers temporaires
del %CHAPITRE%.aux %CHAPITRE%.log %CHAPITRE%.toc %CHAPITRE%.thm %CHAPITRE%.out 2>nul

echo.
echo Compilation terminee: chapitres/%CHAPITRE%.pdf

REM Revenir au dossier parent
cd ..

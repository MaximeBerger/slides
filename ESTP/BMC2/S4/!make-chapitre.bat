@echo off
REM Script pour compiler un chapitre individuel avec subfiles
REM Modifier la variable CHAPITRE ci-dessous pour choisir le chapitre a compiler

REM ============================================================
REM CHAPITRE A COMPILER (modifier cette ligne) :
set CHAPITRE=K-combi

REM ============================================================
REM Chapitres disponibles:
REM   K-combi
REM   K-espProba
REM   K-exercices
REM   K-integralesGeneralisees
REM   K-proba
REM   K-stats
REM   R-AlgebreLineaire
REM   R-ReductionEndomorphisme
REM ============================================================

REM Definir TEXINPUTS pour inclure le dossier Config
set TEXINPUTS=c:\Users\mberge04\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%

REM Se placer dans le dossier chapitres pour que subfiles trouve PolyS1.tex
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

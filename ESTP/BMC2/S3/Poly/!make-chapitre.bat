@echo off
REM Script pour compiler un chapitre individuel avec subfiles
REM Modifier la variable CHAPITRE ci-dessous pour choisir le chapitre a compiler

REM ============================================================
REM CHAPITRE A COMPILER (modifier cette ligne) :
set CHAPITRE=K1-fractions

REM ============================================================
REM Chapitres disponibles:
REM   K1-fractions
REM   K2-expoln
REM   K3-systLin
REM   K4-trigo
REM   K5-complexe
REM   K6-barycentre
REM   R1-logique
REM   R1-sommes
REM   R2-vecteurs
REM   R3-suites
REM   R4-polynomes
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

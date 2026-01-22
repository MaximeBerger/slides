@echo off
REM Définir TEXINPUTS pour inclure la racine du projet (où se trouve config.tex)
set TEXINPUTS=c:\Users\mberge04\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%

REM Premiere passe en draftmode (pas de PDF, juste les fichiers auxiliaires)
xelatex PolyS4.tex

REM Deuxieme passe pour generer le PDF final
xelatex PolyS4.tex

REM Suppression des fichiers temporaires
del *.aux *.log *.toc *.thm *.out 2>nul

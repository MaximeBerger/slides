@echo off
REM Définir TEXINPUTS pour inclure la racine du projet (où se trouve config.tex)
set TEXINPUTS=c:\Users\mberge04\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%


xelatex PolyProb.tex

REM Deuxieme passe pour generer le PDF final
xelatex PolyProba.tex

REM Suppression des fichiers temporaires
del *.aux *.log *.toc *.thm *.out 2>nul

@echo off
setlocal

set "TEXINPUTS=c:\Users\mberge04\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%"


xelatex -jobname=corrige "exercices-sysdiff-btp.tex"
if errorlevel 1 exit /b 1

xelatex -jobname=enonce "exercices-sysdiff-btp.tex"
if errorlevel 1 exit /b 1


del /Q "corrige.aux" "corrige.log" "corrige.out" 2>nul
del /Q "enonce.aux" "enonce.log" "enonce.out" 2>nul
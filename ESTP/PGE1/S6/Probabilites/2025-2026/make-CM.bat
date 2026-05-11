@echo off
setlocal

set "TEXINPUTS=%USERPROFILE%\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%"
set "BASE=CM5"

echo Compilation du corrige...
xelatex -jobname=corrige "%BASE%.tex"
if errorlevel 1 (
    echo ERREUR lors de la compilation du corrige.
    exit /b 1
)

echo Compilation de l enonce...
xelatex -jobname=enonce "%BASE%.tex"
if errorlevel 1 (
    echo ERREUR lors de la compilation de l enonce.
    exit /b 1
)

move /Y "corrige.pdf" "%BASE%-corrige.pdf" >nul
move /Y "enonce.pdf" "%BASE%-enonce.pdf" >nul

del /Q "corrige.aux" "corrige.log" "corrige.out" 2>nul
del /Q "enonce.aux" "enonce.log" "enonce.out" 2>nul

echo.
echo OK : %BASE%-enonce.pdf  et  %BASE%-corrige.pdf

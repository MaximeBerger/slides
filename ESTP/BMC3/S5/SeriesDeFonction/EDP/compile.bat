@echo off
chcp 65001 >nul
echo ============================================
echo   Compilation du document LaTeX - EDP
echo ============================================
echo.

set FILENAME=96aab6d9-82da-4f6c-bb34-6412df4d61c5

REM Vérification de l'existence de pdflatex
where pdflatex >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] pdflatex n'est pas installé ou n'est pas dans le PATH.
    echo Veuillez installer une distribution LaTeX comme MiKTeX ou TeX Live.
    pause
    exit /b 1
)

echo [1/3] Première compilation...
pdflatex -interaction=nonstopmode "%FILENAME%.tex"
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] La compilation a échoué.
    echo Consultez le fichier %FILENAME%.log pour plus de détails.
    pause
    exit /b 1
)

echo.
echo [2/3] Deuxième compilation (pour les références)...
pdflatex -interaction=nonstopmode "%FILENAME%.tex"

echo.
echo [3/3] Troisième compilation (pour la table des matières)...
pdflatex -interaction=nonstopmode "%FILENAME%.tex"

echo.
echo ============================================
echo   Compilation terminée avec succès !
echo   Fichier généré : %FILENAME%.pdf
echo ============================================

REM Nettoyage des fichiers auxiliaires (optionnel)
set /p CLEAN="Voulez-vous nettoyer les fichiers auxiliaires ? (O/N) : "
if /i "%CLEAN%"=="O" (
    echo Nettoyage en cours...
    del /q "%FILENAME%.aux" 2>nul
    del /q "%FILENAME%.log" 2>nul
    del /q "%FILENAME%.out" 2>nul
    del /q "%FILENAME%.toc" 2>nul
    del /q "%FILENAME%.synctex.gz" 2>nul
    echo Fichiers auxiliaires supprimés.
)

echo.
set /p OPEN="Voulez-vous ouvrir le PDF ? (O/N) : "
if /i "%OPEN%"=="O" (
    start "" "%FILENAME%.pdf"
)

pause


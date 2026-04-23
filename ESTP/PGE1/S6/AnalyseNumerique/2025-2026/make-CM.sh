#!/bin/bash

export TEXINPUTS="/Users/max/Library/CloudStorage/Dropbox/Maths/Cours/ESTP/Projets/slides/ESTP/Config:$TEXINPUTS"
BASE="CM3"

echo "Compilation du corrigé..."
xelatex -jobname=corrige "$BASE.tex"
if [ $? -ne 0 ]; then
    echo "ERREUR lors de la compilation du corrigé."
    exit 1
fi

echo "Compilation de l'énoncé..."
xelatex -jobname=enonce "$BASE.tex"
if [ $? -ne 0 ]; then
    echo "ERREUR lors de la compilation de l'énoncé."
    exit 1
fi

mv -f "corrige.pdf" "$BASE-corrige.pdf"
mv -f "enonce.pdf" "$BASE-enonce.pdf"

rm -f corrige.aux corrige.log corrige.out
rm -f enonce.aux enonce.log enonce.out

echo ""
echo "OK : $BASE-enonce.pdf  et  $BASE-corrige.pdf"

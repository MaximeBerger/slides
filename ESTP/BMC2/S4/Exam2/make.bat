set TEXINPUTS=c:\Users\mberge04\OneDrive - association E.S.T.P\Documents\Projets\slides\ESTP\Config;%TEXINPUTS%

xelatex -jobname=corrige index.tex
xelatex -jobname=enonce index.tex


del *.aux
del *.log
del *.out

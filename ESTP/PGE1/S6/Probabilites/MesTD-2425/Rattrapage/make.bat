lualatex "\def\version{1} \input{index.tex}"
rename index.pdf sujet_V1.pdf

lualatex "\def\version{2} \input{index.tex}"
rename index.pdf sujet_V2.pdf

lualatex "\def\version{3} \input{index.tex}"
rename index.pdf sujet_V3.pdf

lualatex fusion.tex 
rename fusion.pdf examPar3.pdf
del fusion.pdf

del *.aux
del *.log
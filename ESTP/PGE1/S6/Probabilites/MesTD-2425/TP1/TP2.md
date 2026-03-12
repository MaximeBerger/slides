# Résolution de systèmes linéaires. 


## Systèmes triangulaires
```
x = np.zeros(n)
for i in range(n-1, -1, -1):
    x[i] =(b[i] - sum(u[i,j] * x[j] for j in range(i+1,n))) /u[i,i]
```



## Décomposition LU


Algo pour décomposition LU : 
$$
\begin{aligned}
& \mathrm{L}=\mathrm{np} \cdot \operatorname{zeros}((\mathrm{n}, \mathrm{n})) \\
& \mathrm{U}=\mathrm{np} \cdot \operatorname{zeros}((\mathrm{n}, \mathrm{n}))
\end{aligned}
$$


On peut alors appliquer les formules précédentes :
```
for i in range(n):
    for j in range(n):
        u[i,j] = a[i,j] - sum(l[i,k] * u[k,j] for k in range(j))
        l[j,i] = (a[j,i] - sum(l[j,k] * u[k,i] for k in range(j))) / u[i,i]
```

Pour résoudre un système linéaire, on peut utiliser la décomposition LU :
```
L, U = getLU(A)
Y = solveTriInf(L, b)
solveTriSup(U, Y)
```


## Calcul du déterminant

$\begin{aligned} & L, U=\operatorname{getLU}(A) \\ & \text { np.prod(np.diag(U)) }\end{aligned}$

## Calcul de l'inverse d'une matrice
```
N = np.zeros((n,n))
M = np.zeros((n,n)) for i in range(n):
    b = np.zeros(n)
    b[i] = 1 # b est la i-ième colonne de la matrice identité
    N[:,i] = solveTriInf(L, b)
    M[:,i] = solveTriSup(U, N[:,i]) # M est la matrice inverse de A
```


## Méthode de Jacobi.
```
x = np.zeros(n)
for k in range(100):
    x = L_inv @ (b - U@ x)
```


# Equations différentielles


On peut donc écrire l'algorithme suivant : $\mathrm{y}=\mathrm{np}$. zeros $(\mathrm{n}+1)$
```
y[0] = y0
for i in range(n):
    y[i+1] = y[i] / (1-q* (t[i+1] - t[i]))
```

```
y[0] = y0
for i in range(n):
    y[i+1]=y[i]*(1 +q*(t[i+1] - t[i]) / 2)/(1-q*(t[i+1]-t[i]) / 2)
```


On pourra reprendre 
Equation d'équilibre de la structure : 
$$-E\, \big(J(x)y'(x)\big)' = P\, y(x)$$
avec 
- $y(x)$ le déplacement transversal au point $x$
- $E$ le module d'Young (plus $E$ est grand, plus le matériau est rigide)
- $P$ la force exercée
- $J$ le moment d'inertie qui peut dépendre de $x$ ( caractérise la résistance à la flexion autour du point $x$)
le moment d'inertie $J$ est constant le long de la poutre, on obtient 
$$-y''(x) = \alpha^2 y(x)$$
avec $\alpha^2 = P/EJ$  

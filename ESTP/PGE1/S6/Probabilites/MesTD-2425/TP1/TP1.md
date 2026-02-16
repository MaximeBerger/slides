# TP 1 Analyse Numérique
## Point fixe, Dichotomie, Newton, Interpolation polynômiale, Calcul approché d'intégrales. 

But : 
Pratiquer les méthodes numériques et les implémenter dans logiciel de calcul (Python ou Matlab) 

Analyser les algorithmes représentatifs en matière de résolution numérique par ordinateur 
de problèmes scientifiques ou techniques  

Analyser, tester, critiquer les résultats d'un calcul numérique

# Consignes

ChatGPT interdit
Certitude - 0/20
Soupçons - Division de la note par 2

Vous rendrez un rapport de TP, avec les questions, les réponses, les codes, les graphes, les explications. 




# Section d'intro douce à Python. 

## Des bibliothèques utiles.

Pour tracer des fonctions, on peut utiliser numpy et matplotlib. 

On peut créer une fonction qu'il nous suffira d'appeler pour tracer un graphe. 
```python
def plot_function(f, a, b, n=100):
    x_plot = np.linspace(a, b, n) # tableau de n points entre a et b
    y_plot = f(x_plot)
    plt.plot(x_plot, y_plot)
```
Par exemple pour tracer la fonction $\sin$ : 
```python
plot_function(np.sin, 0, 2*np.pi)
```

On peut créer des fonctions à la main puis utiliser le code précédent pour les tracer. 
```python
def f(x):
    return x**2 - 2

plot_function(f, -1, 1)
``` 

Si on a besoin de sauvegarder un graphique, on peut le faire avec la fonction savefig. 
```python
plt.savefig('fonctions_trigo.png')
plt.close()
print("Graphique sauvegardé dans 'fonctions_trigo.png'")
```

## Chaînes de caractères et f-strings

Le f dans print(f"...") est utilisé pour créer ce qu'on appelle une "f-string" (chaîne de caractères formatée) en Python. C'est une fonctionnalité introduite dans Python 3.6 qui permet d'insérer facilement des variables ou des expressions dans une chaîne de caractères.


```python
nom = "Pierre"
age = 25
print("Bonjour " + nom + ", tu as " + str(age) + " ans.")

# Avec f-string (nouvelle méthode)
print(f"Bonjour {nom}, tu as {age} ans.")

# On peut même faire des calculs directement dans les f-strings
a = 5
b = 3
print(f"La somme de {a} et {b} est {a + b}")

# Formatage des nombres
pi = 3.14159265359
print(f"Pi avec 2 décimales : {pi:.2f}")
print(f"Pi avec 4 décimales : {pi:.4f}")

# Expressions complexes
print(f"Le carré de {a} est {a**2}")
print(f"La racine carrée de {a} est {a**0.5:.2f}")
```

Ecrivez le code pour afficher la valeur de $e^x$ en $x=1$ avec 5 décimales. 

# Utilisation de dictionnaires

Une structure de données plus utile que les tableaux : les **dictionnaires**. 

```python
point = {"abscisse": 1, "ordonnée": 2}
print(f"Ce point a une abscisse {point['abscisse']} et une ordonnée {point['ordonnée']}.")
```


# Des erreurs d'arrondi. 

```python
print(f"0.1 + 0.2 = {0.1 + 0.2}")  # Devrait être 0.3
print(f"0.1 + 0.2 == 0.3 ? {0.1 + 0.2 == 0.3}")

math.sqrt(2)**2 
```
Executez le code précédent et expliquez le résultat. 

Une fonction qui calcule et affiche l'erreur absolue et relative ? 


## Point fixe

```python
import numpy as np
import matplotlib.pyplot as plt

x0 = 0.5  
iterations = 50

def iterative_process(x0, iterations):
    x_exact = np.zeros(iterations)
    
    x_exact[0] = x0
    
    for i in range(1, iterations):
        x_exact[i] = np.cos(x_exact[i-1])
    
    return x_exact

x = iterative_process(x0, iterations)

plt.plot(x)
```
C'est une méthode itérative, l'étape $n$ se sert des résultats de l'étape $n-1$. 

```python
def iterative_process(x0, iterations):
    x_exact = np.zeros(iterations)
    x_approx = np.zeros(iterations)
    
    x_exact[0] = x0
    x_approx[0] = x0 + 1e-10 
    
    for i in range(1, iterations):
        x_exact[i] = 30*np.cos(x_exact[i-1])
        x_approx[i] = 30*np.cos(x_approx[i-1])
    
    return x_exact, x_approx

x0 = 0.2  
iterations = 50 

x_exact, x_approx = iterative_process(x0, iterations)

differences = np.abs(x_exact - x_approx)

plt.semilogy(differences, label="Erreur d'approximation")
```

TD0 : 
Pour calculer la valeur de $\sqrt{2}$, on utilise la suite récurrente :

$$
\left\{\begin{array}{l}
x_0=1 \\
x_{n+1}=\frac{x_n+\frac{2}{x_n}}{2}
\end{array}\right.
$$

$$
x=1
$$


Pour i allant de 1 à 100 :

$$
x=(x+2 / x) / 2
$$


Afficher $x$


## Dichotomie

```python
import math

def dichotomie(a, b, epsilon=1e-6):

	while (b - a) / 2 > epsilon:
		c = (a + b) / 2
        
		if c > math.cos(c):
			b = c
		else:
			a = c
    
	return (a + b) / 2 

print(dichotomie(0.1, 1))
```
TD 0 : 

Pour trouver la solution de l'équation $xe^x= 1$ par dichotomie. 

$$
\begin{aligned}
& a=0.2 \\
& b=0.8
\end{aligned}
$$


Tant que $\mathrm{b}-\mathrm{a}>1 \mathrm{e}-10$ :

$$
\begin{gathered}
m=(a+b) / 2 \\
\text { Si } f(m)<0 \\
a=m
\end{gathered}
$$


Sinon

$$
\mathrm{b}=\mathrm{m}
$$


Afficher m

## Méthode de Newton

$$
x=2
$$


Tant que $|f(x)|>1 e-10$ :

$$
x=x-f(x) / f^{\prime}(x)
$$


Afficher x

```python
import math
x0 = 0.5

def f(x):
    return x - math.cos(x)

def df(x):
    return 1 + math.sin(x)

def newton(x0, epsilon=1e-6):
    x = x0
    iter_count = 0
    
    while abs(f(x)) > epsilon:
        x = x - f(x) / df(x) 
        
    return x

print(newton(x0))
```

## Comparaison des méthodes 

Comment calculer $\sqrt{23}$. Comparer les méthodes. 
- Un même nombre d'étapes et comparaier la précision. 
- Mesurer le temps pour atteindre une précision fixée. 



1. Il faut en fait chercher le zéro de la fonction 
$$f(x) = x^2 - 23$$
2. Par méthode de Newton 
Fonctionne encore mieux avec 
$$f(x) = x - \frac{23}{x}$$



# Interpolation

## Manipulation de polynômes

Mesurer temps pour algorithme de Horner ? 

Donner un polynôme de degré $1000$ et un point $x$ et mesurer le temps d'évaluation avec les deux méthodes. 

## Tronquer le Développement de Taylor


La fonction $e^{-x}$ sur l'intervalle $[0, 10]$ approchée par son DL en 0. 
$$e^{-x} = \sum_{k\geq 0} \frac{(-x)^k}{k!}$$

Faire calculer le polynôme de Taylor en $x=10$ et comparer avec la valeur exacte. 



$$\frac{u_{n+1}}{u_n} = \frac{x}{n+1}$$


## Interpolation de Lagrange


Une fonction qui prend en paramètres $n$ points et une abscisse $x$ et renvoie la liste des $n$ polynômes de Lagrange $\ell_i$ associés. 
Par exemple, pour calculer le $k$-ième polynôme $\ell$ fonction $l_k$ :

$$
\text { base }=1
$$


Pour j qui prend toutes les valeurs de 0 à n :

$$
\begin{aligned}
& \text { Si } j \neq k: \\
& \quad \quad \text { base } *=(x-j) /(k-j)
\end{aligned}
$$

return base
on peut ensuite définir le polynôme $P_n$ :
fonction Pn :

$$
P=0
$$


Pour i qui prend toutes les valeurs de 0 à n :

$$
P+=\exp (i) * l_k
$$

return P

Ensuite utiliser cette fonction pour calculer le polynôme interpolateur de Lagrange en un point $x$ donné. 
Une fonction qui prend deux points [abs, ord] et une abscisse $x$ et renvoie la valeur du polynôme interpolateur. 

Degré 1, 2, 3, 4, 5, ..., n

Une fonction qui trace les polynômes interpolateurs, donner la fonction, des paramètres optionnels pour la largeur et la hauteur de la fenêtre. 




Calculer le polynôme de Lagrange qui coïncide avec cette fonction aux points d'abscisses $-1, 0, 1$  
$$f(x)=\frac{1}{1+x^2}, \quad-5 \leq x \leq 5$$


# Intégration numérique

## Méthode des rectangles

```python
def integrale(f, a, b, n):
    h = (b - a) / n
    extremites = np.linspace(a, b, n+1)
    somme = 0
    for i in range(n):
        AireRectangle = f(extremites[i]) * h
        somme += AireRectangle
    return somme

print(integrale(lambda x: x**2, 0, 1, 1000))

```

## Méthode des trapèzes

## Approcher par un polynôme. 

Approcher par un polynôme degré 2: Newton-Cotes 
```python
def newton_cotes(f, a, b):
    return (b - a) / 6 * (f(a) + 4*f((a+b)/2) + f(b))
```

Approcher par un polynôme de grand degré sur tout l'intervalle, ou découper l'intervalle et approcher par un polynôme de petit degré sur chaque sous-intervalle. 


Intégrer une fonction dont on ne connait pas l'expression mais seulement la valeur en certains points. 


Pour aller plus loin : implémenter les polynômes de hermite. 
Si $\ell_i$ est le polynôme de Lagrange associé au point $x_i$, on définit les polynômes

$$
H_i(x)=\left(1-2\left(x-x_i\right) \ell_i^{\prime}\left(x_i\right)\right) \ell_i^2(x)
$$

et

$$
G_i(x)=\left(x-x_i\right) \ell_i^2(x)
$$
$\left\{\begin{array}{l}H_i\left(x_j\right)=\delta_{i j} \\ H_i^{\prime}\left(x_j\right)=0\end{array}, \quad\left\{\begin{array}{l}G_i\left(x_j\right)=0 \\ G_i^{\prime}\left(x_j\right)=\delta_{i j}\end{array}\right.\right.$



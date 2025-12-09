# Les séries de Fourier
Si $F$ est un signal $T$-périodique, 
la série de Fourier complexe de $F$ est 
$$
S_n(f) = \sum_{n\in \mathbb{Z}} c_n(f) e^{2 i\pi n x /T}
$$
avec 
$$
c_n(f) = \frac{1}{T} \int_0^T F(x) e^{-2i\pi n x/T} dx
$$

## Pour analyser un signal
Décomposer en signaux sinusoïdaux

- Si $f$ est intégrable, les coefficients de Fourier tendent vers $0$
- Plus $f$ est régulière, plus les coefficients de Fourier tendent rapidement vers $0$. 
- Si $f$ est continue par morceaux, la série de Fourier converge vers $f$, sauf aux points de discontinuité. 
- 
## La série de Fourier converge-t-elle vers $F$ ? 
https://www.jezzamon.com/fourier/index.html


## Formule de Parseval
La série de Fourier conserve l'énergie d'un signal. 


## Résoudre des équations différentielles

# Pourquoi les ponts s'effondrent ?
<iframe width="560" height="315" src="https://www.youtube.com/embed/XggxeuFDaDU?si=jBYIcAIMSQk3YeT2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
Des millions de dollars, effondré 4 mois après son installation. 

Vent de 60 km/h

Le problème n'était pas la force du vent, mais la fréquence. 


# Modélisation du problème
Equation d'un système masse-ressort : 
$$
m y^{\prime \prime}(t)+c y^{\prime}(t)+k y(t)=F(t)
$$

- $y(t)$ : Le déplacement du pont (ce qu'on cherche).
- $m, c, k$ : Masse, amortissement, raideur (données matériaux).
- $F(t)$ : La force du vent (l'excitation).

Mais $F(t)$ est un signal chaotique. Non périodique ...  
L'équation est impossible à résoudre. 
![[Pasted image 20251014133121.png|100%]]
# Analyse en fréquence
Passer dans le monde des fréquences. 
$$
\hat{f}(\xi)=\int_{-\infty}^{+\infty} f(t) e^{-2 i \pi \xi t} d t
$$

C'est un produit scalaire dans $L^2$.
On multiplie le signal par $e^{-2i\pi \xi t}$ (une sinusoïde parfaite qui tourne). Et on somme le tout (l'intégrale).
- Si le résultat est grand : le signal contient cette fréquence.
- Si le résultat est zéro : le signal ne contient pas cette fréquence.

## Propriétés
La dérivation devient une multiplication 

$$
\text{Si } y(t) \xrightarrow{\mathcal{F}} \hat{y}(\xi) \quad \text{alors} \quad y'(t) \xrightarrow{\mathcal{F}} 2i\pi\xi \hat{y}(\xi)
$$

## Retour à l'équation
L'équation différentielle du pont devient une simple division algébrique :

$$
\hat{y}(\xi) = \frac{\hat{F}(\xi)}{-m(2\pi\xi)^2 + 2i\pi\xi c + k}
$$

Si ce dénominateur s'approche de zéro pour une certaine fréquence $\xi$, alors $\hat{y}(\xi)$ tend vers l'infini. Le pont casse. Cette fréquence qui annule le dénominateur, c'est la **Fréquence Propre** du pont. 

Il faut donc s'assurer que ces pics ne tombent jamais sur la fréquence propre de votre structure.

## L'énergie est conservée
Parseval :

$$
\int_{-\infty}^{+\infty} |f(t)|^2 dt = \int_{-\infty}^{+\infty} |\hat{f}(\xi)|^2 d\xi
$$

L'énergie est conservée, qu'on la regarde en temps ou en fréquence.


# Introduction à la Transformée de Laplace

La transformée de Laplace est un outil mathématique permettant de transformer des équations différentielles en équations algébriques, ce qui les rend plus faciles à résoudre.

Elle est définie par :

$$
\mathcal{L}\{f(t)\}(s) = F(s) = \int_0^{\infty} e^{-st} f(t)\, dt
$$

où $f(t)$ est une fonction de temps et $s$ un nombre complexe.  
La transformée de Laplace converge pour les valeurs de $s$ telles que l’intégrale existe, c’est-à-dire lorsque la partie réelle de $s$ dépasse l’**abscisse de convergence** de $f(t)$.

---

## Exemple de convergence

Soit $f(t) = e^{-2t}$ :

$$
\mathcal{L}\{e^{-2t}\}(s) = \int_0^{\infty} e^{-(s+2)t}\, dt = \frac{1}{s + 2}
$$

Elle converge pour $\text{Re}(s) > -2$.  
L’exponentielle décroît assez vite pour garantir la convergence.

---

## Exemple de non-convergence

Pour $f(t) = e^{2t}$ :

$$
\mathcal{L}\{e^{2t}\}(s) = \int_0^{\infty} e^{(2 - s)t}\, dt
$$

L’intégrale ne converge que si $\text{Re}(s) > 2$.  
Si $\text{Re}(s) \leq 2$, la transformée de Laplace est **non définie**.

---

## Propriétés principales

- **Linéarité :**
    $$
    \mathcal{L}\{a f(t) + b g(t)\} = a F(s) + b G(s)
    $$
- **Dérivation :**
    $$
    \mathcal{L}\{f'(t)\} = s F(s) - f(0)
    $$
- **Intégration :**
    $$
    \mathcal{L}\left\{\int_0^t f(\tau)\, d\tau \right\} = \frac{F(s)}{s}
    $$

---

## Exercices de base

## Exercice 1

Calculer les transformées de Laplace des fonctions suivantes :

1. $f(t) = 3$
2. $f(t) = t$
3. $f(t) = t^2$

**Corrigé :**

$$
\mathcal{L}\{3\} = \frac{3}{s}, \quad \mathcal{L}\{t\} = \frac{1}{s^2}, \quad \mathcal{L}\{t^2\} = \frac{2}{s^3}
$$

---

## Exercice 2

Calculer les transformées de Laplace de :

1. $e^{3t} \Rightarrow \dfrac{1}{s - 3}$
2. $\sin(2t) \Rightarrow \dfrac{2}{s^2 + 4}$
3. $\cos(4t) \Rightarrow \dfrac{s}{s^2 + 16}$

---

## Exercice 3

1. $t e^{2t} \Rightarrow \dfrac{1}{(s - 2)^2}$
2. $t \sin(t) \Rightarrow \dfrac{2s}{(s^2 + 1)^2}$
3. $3 \cos(2t) - 2 \sin(2t) \Rightarrow \dfrac{3s - 4}{s^2 + 4}$

---

## Table des transformées usuelles

|$f(t)$|$\mathcal{L}\{f(t)\} = F(s)$|Domaine de convergence|
|---|---|---|
|$1$|$\dfrac{1}{s}$|$\text{Re}(s) > 0$|
|$t^n$|$\dfrac{n!}{s^{n+1}}$|$\text{Re}(s) > 0$|
|$e^{at}$|$\dfrac{1}{s - a}$|$\text{Re}(s) > a$|
|$\sin(at)$|$\dfrac{a}{s^2 + a^2}$|$\text{Re}(s) > 0$|
|$\cos(at)$|$\dfrac{s}{s^2 + a^2}$|$\text{Re}(s) > 0$|
|$\sinh(at)$|$\dfrac{a}{s^2 - a^2}$|$\text{Re}(s) > |a|$|
|$\cosh(at)$|$\dfrac{s}{s^2 - a^2}$|$\text{Re}(s) > |a|$|

---

## Fonction échelon unité

La fonction échelon unité (ou fonction de Heaviside) est définie par :

$$
u(t) = \begin{cases} 0, & \text{si } t < 0 \\ 1, & \text{si } t \geq 0 \end{cases}
$$

Sa transformée de Laplace :

$$
\mathcal{L}\{u(t)\} = \frac{1}{s}
$$

Pour un décalage temporel $a$ :

$$
\mathcal{L}\{u(t - a)\} = \frac{e^{-as}}{s}
$$

---

## Équations différentielles et Laplace

Considérons :

$$
a_n y^{(n)} + a_{n-1} y^{(n-1)} + \cdots + a_1 y' + a_0 y = g(t)
$$

La transformée de Laplace donne :

$$
(a_n s^n + a_{n-1} s^{n-1} + \cdots + a_0) Y(s) = G(s) + \text{termes initiaux}
$$

Ce passage transforme l’équation différentielle en **équation algébrique** dans le domaine de Laplace.  
On résout pour $Y(s)$, puis on applique la **transformée inverse** pour retrouver $y(t)$.

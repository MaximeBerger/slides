# TP : Matrice de population

## Rappels sur les matrices

### Définition

Une matrice est représentée en Python par une liste de listes (ou : un tableau de tableaux), chaque sous-liste correspondant à une ligne de la matrice.

Par exemple, la matrice

$$M = \begin{pmatrix} 1 & 0 & 3\\ 2 & 2 & 1 \end{pmatrix}$$

est représentée par :

```python
M = [[1, 0, 3], [2, 2, 1]]
```

Ainsi, la première sous-liste `[1, 0, 3]` correspond à la première ligne de la matrice et `[2, 2, 1]` correspond à la deuxième ligne.

---

### Accéder et modifier un élément

On accède à l'élément sur la ligne `i`, colonne `j` de la matrice avec `M[i][j]`. Par exemple :

```python
M[0][2] # élément ligne 0, colonne 2
# Résultat : 3
```

> **Remarque** : Les lignes et colonnes commencent à $0$ (au lieu de $1$ en mathématiques).

On peut modifier l'élément ligne `i`, colonne `j` avec `M[i][j] = ...`. Par exemple :

```python
M[1][0] = 42
M # M a bien été modifiée
# Résultat : [[1, 0, 3], [42, 2, 1]]
```

---

### Taille d'une matrice

Le nombre de lignes de la matrice est le nombre de sous-listes, obtenu avec `len(M)` :

```python
len(M) # nombre de lignes de M
# Résultat : 2
```

Le nombre de colonnes est égal au nombre d'éléments sur une ligne, obtenu avec `len(M[0])` :

```python
len(M[0]) # la 1ère ligne contient 3 éléments, donc il y a 3 colonnes
# Résultat : 3
```

---

### Création d'une matrice de taille $n \times p$

Pour créer une matrice de taille $n \times p$ remplie de $0$, on peut :

- Utiliser `np.zeros((n, p))` du module `numpy` (`import numpy as np`).
- Définir une liste contenant $n$ listes de $p$ zéros :

```python
M = []
for i in range(3):
    L = []  # la ième ligne
    for j in range(5):
        L.append(0)
    M.append(L)
M  # matrice 3x5 remplie de 0
```

---

### Parcourir une matrice

Pour parcourir une matrice, on utilise deux indices (un pour la ligne, un pour la colonne), dans deux boucles `for`. Par exemple, pour mettre des $2$ partout dans $M$ :

```python
for i in range(3):   # i est le numéro de ligne
    for j in range(5):  # j est le numéro de colonne
        M[i][j] = 2
```

---

### Exercices sur les matrices

> Pensez à tester vos fonctions avec de petites matrices.

**Exercice 1**

Écrire une fonction `somme(M)` renvoyant la somme des éléments d'une matrice `M`.

---

**Exercice 2**

Écrire une fonction `nulle(M)` déterminant si une matrice est nulle (ne contient que des $0$). `nulle(M)` doit renvoyer `True` si `M` est nulle, `False` sinon.

---

**Exercice 3**

Écrire une fonction `identite(n)` renvoyant la matrice identité de taille $n$.

---

**Exercice 4**

Écrire une fonction `transpose(M)` renvoyant la transposée d'une matrice `M`.

---

**Exercice 5**

Écrire une fonction `produit(A, B)` renvoyant le produit matriciel de `A` et `B`.

On rappelle que $AB = (c_{i,j})$ où $c_{i,j} = \sum_{k=0}^{p} a_{i,k} \, b_{k,j}$, où $p$ est le nombre de colonnes de $A$ (qui doit être égal au nombre de lignes de $B$). On supposera $A$ et $B$ compatibles.

On pourra compléter le code suivant :

```python
def produit(A, B):
    n = ...  # nombre de lignes de A
    p = ...  # nombre de colonnes de A
    q = ...  # nombre de colonnes de B
    # définir une matrice C de taille n*q remplie de 0
    for i in range(n):
        for j in range(q):
            # ici on va calculer C[i][j] (c'est-à-dire une somme)
            for k in range(p):
                C[i][j] += ...
    return C
```

---

## Matrice de population

On souhaite étudier l'évolution d'une population de rongeurs à des stades d'âges différents. On ne s'intéresse qu'à la population d'individus femelles. On suppose qu'aucun rongeur ne vit au-delà de $3$ ans et on note $a_n$, $b_n$, $c_n$ le nombre de femelles âgées de $0$, $1$, $2$ ans à l'année $n$ (initialement $n = 0$).

- Chaque femelle donne en moyenne naissance à $6$ femelles lors de sa 2ème année et $10$ femelles lors de sa 3ème année.
- Seul un rongeur sur deux survit au-delà de sa première année.
- Seul 40 % de ceux qui survivent la deuxième année survivront jusqu'à la troisième année.

---

**Exercice 6** *(sans programmation)*

Exprimer $a_{n+1}$, $b_{n+1}$, $c_{n+1}$ en fonction de $a_n$, $b_n$, $c_n$.

---

On définit maintenant le vecteur $X_n = \begin{pmatrix} a_n\\ b_n\\ c_n \end{pmatrix}$, que l'on représentera sous forme de liste en Python.

**Exercice 7**

On prend initialement $a_0 = 10$, $b_0 = 0$, $c_0 = 0$. Définir $X_0$ en Python.

---

**Exercice 8**

Définir (sur papier puis en Python) une matrice $A$ telle que $X_{n+1} = A X_n$.

> $A$ est appelée une **matrice de Leslie**. On remarque que, par récurrence : $X_n = A^n X_0$.

---

**Exercice 9**

Écrire une fonction `puissance(A, n)` renvoyant $A^n$.

---

**Exercice 10**

Écrire une fonction `produit_vec(A, X)` renvoyant le produit de la matrice `A` par le vecteur `X`.

---

**Exercice 11**

Écrire une fonction `population(n)` renvoyant $X_n$.

---

**Exercice 12**

Que valent $X_1$, $X_2$, $X_3$, $X_4$ ?

---

**Exercice 13**

Utiliser la fonction suivante pour afficher les $n$ premières valeurs de $a_k$, $b_k$, $c_k$. Appeler par exemple `plot_population(10)`.

```python
import matplotlib.pyplot as plt

def plot_population(n):
    x = list(range(n))
    y = [population(i) for i in x]
    a, b, c = zip(*y)
    plt.plot(x, a, label="$a_n$")
    plt.plot(x, b, label="$b_n$")
    plt.plot(x, c, label="$c_n$")
    plt.legend()
```

Que constatez-vous sur l'évolution des trois classes ?

---

**Exercice 14**

Utiliser la fonction suivante pour afficher le taux d'accroissement $\frac{a_{n+1}}{a_n}$. Appeler par exemple `plot_accroissement(20)`.

```python
import matplotlib.pyplot as plt

def plot_accroissement(n):
    x = list(range(n))
    x_ = list(range(1, n - 1))
    y = [population(i) for i in x]
    X = list(zip(*y))
    X_ = [[]]*3
    for i in range(3):
        X_[i] = [0 if X[i][j] == 0 else X[i][j+1]/X[i][j] for j in x_]
    plt.plot(x_, X_[0], label=r"$\frac{a_{n+1}}{a_n}$")
    plt.plot(x_, X_[1], label=r"$\frac{b_{n+1}}{b_n}$")
    plt.plot(x_, X_[2], label=r"$\frac{c_{n+1}}{c_n}$")
    plt.legend()
```

Vers quelle valeur semble converger le taux d'accroissement ?

---

**Exercice 15**

D'après le théorème de Perron-Frobenius, le taux d'accroissement tend, quand $n \to \infty$, vers la **plus grande valeur propre** de $A$.

1. Calculer les valeurs propres de $A$ à la main (en utilisant le polynôme caractéristique).
2. Vérifier numériquement avec `np.linalg.eig(A)`, qui renvoie deux tableaux : le premier contenant les valeurs propres, le second les vecteurs propres associés.
3. Comparer avec la limite observée à l'exercice précédent. Que conclut-on ?

---

## Pour aller plus loin : variantes BTP

Le modèle de Leslie est très général et peut s'appliquer à de nombreuses situations issues du secteur BTP. Pour chacune des variantes suivantes, la démarche est identique à celle du TP : modéliser la situation par une matrice de Leslie, simuler l'évolution, puis interpréter la valeur propre dominante.

---

### Variante A — Main d'œuvre sur un chantier

On considère une entreprise de BTP dont le personnel est réparti en trois catégories : **apprentis** ($a_n$), **compagnons** ($b_n$) et **chefs d'équipe** ($c_n$) à l'année $n$.

- Chaque chef d'équipe forme en moyenne $4$ nouveaux apprentis par an (recrutement et alternance).
- Chaque compagnon a une probabilité de $0{,}3$ de devenir chef d'équipe l'année suivante.
- Chaque apprenti a une probabilité de $0{,}6$ de devenir compagnon l'année suivante.
- Les apprentis ne restant pas apprentis et les chefs d'équipe partant à la retraite ne sont pas comptés dans les effectifs l'année suivante.

**Questions :**

1. Écrire les relations de récurrence donnant $a_{n+1}$, $b_{n+1}$, $c_{n+1}$ en fonction de $a_n$, $b_n$, $c_n$.
2. Construire la matrice de Leslie $A$ associée.
3. En partant de $X_0 = (50, 20, 5)^T$, simuler l'évolution sur 20 ans et tracer les courbes.
4. Vers quelle structure de personnel tend-on à long terme ? La valeur propre dominante indique-t-elle une croissance ou une décroissance de l'effectif total ?
5. Combien faudrait-il recruter d'apprentis supplémentaires chaque année pour maintenir un effectif stable ?

---

### Variante B — Parc de logements

On considère un parc de $N$ logements répartis en trois états : **neuf** ($a_n$), **standard** ($b_n$) et **dégradé** ($c_n$) à l'année $n$.

- Chaque année, $20\%$ des logements neufs basculent en état standard.
- Chaque année, $15\%$ des logements standard basculent en état dégradé.
- Chaque année, $10\%$ des logements dégradés sont rénovés et repassent à l'état standard.
- Des programmes de construction produisent en moyenne $0{,}05$ logement neuf par logement dégradé (incitatif à la démolition-reconstruction).

**Questions :**

1. Construire la matrice de Leslie $A$ associée.
2. En partant de $X_0 = (200, 500, 100)^T$, simuler l'évolution sur 30 ans.
3. Quelle est la proportion de logements dégradés à long terme ? Est-ce préoccupant ?
4. Faire varier le taux de rénovation (actuellement $10\%$) et observer son impact sur la valeur propre dominante. À partir de quel taux le parc se stabilise-t-il ?

---

### Variante C — Matériel de chantier

On considère un parc de matériel (grues, engins de terrassement…) réparti en trois états : **neuf** ($a_n$), **en service** ($b_n$) et **en fin de vie** ($c_n$) à l'année $n$.

- Chaque année, tout le matériel neuf passe en service ($100\%$).
- Chaque année, $25\%$ du matériel en service bascule en fin de vie.
- Le matériel en fin de vie génère, via les budgets de remplacement, l'achat de $0{,}8$ engin neuf en moyenne.

**Questions :**

1. Construire la matrice de Leslie $A$ associée.
2. En partant de $X_0 = (5, 30, 8)^T$, simuler l'évolution sur 15 ans.
3. Le parc est-il en croissance ou en décroissance ? Interpréter la valeur propre dominante en termes de gestion de flotte.
4. Quel taux de remplacement (actuellement $0{,}8$) permettrait d'assurer un parc stable sur le long terme ?

---

### Variante D — Arbres en ville

Dans le cadre d'un projet d'urbanisme, on souhaite modéliser l'évolution d'un parc arboré urbain réparti en trois stades : **jeunes plants** ($a_n$), **arbres adultes** ($b_n$) et **arbres matures** ($c_n$) à l'année $n$ (pas de temps : 5 ans).

- Chaque arbre mature produit en moyenne $3$ jeunes plants (boutures, semis naturels, replantations associées).
- $40\%$ des jeunes plants survivent et deviennent adultes au pas de temps suivant.
- $70\%$ des arbres adultes survivent et deviennent matures au pas de temps suivant.
- Les arbres matures meurent ou sont abattus en fin de cycle (taux de survie nul).

**Questions :**

1. Construire la matrice de Leslie $A$ associée.
2. En partant de $X_0 = (100, 40, 10)^T$, simuler l'évolution sur 10 pas de temps (50 ans).
3. Tracer la composition du parc arboré dans le temps. Le parc est-il durable ?
4. La valeur propre dominante est-elle supérieure ou inférieure à $1$ ? Qu'est-ce que cela signifie pour la politique de plantation de la ville ?
5. Quel taux de production de jeunes plants par les arbres matures permettrait d'assurer un parc stable ?

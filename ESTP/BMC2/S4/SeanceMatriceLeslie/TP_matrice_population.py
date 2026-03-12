# =============================================================================
# TP : Matrice de population
# =============================================================================
# Complétez les fonctions en remplaçant les "..." par votre code.
# Des tests sont fournis après chaque fonction : exécutez-les pour vérifier.
# =============================================================================

import numpy as np
import matplotlib.pyplot as plt


# =============================================================================
# PARTIE 1 — OUTILS : manipulation de matrices
# =============================================================================

# -----------------------------------------------------------------------------
# Exercice 1 — Somme des éléments d'une matrice
# -----------------------------------------------------------------------------
# On veut parcourir toutes les lignes i et toutes les colonnes j,
# et accumuler les valeurs dans une variable s.

def somme(M):
    s = 0
    for i in range(len(M)):           # pour chaque ligne i
        for j in range(len(M[0])):    # pour chaque colonne j
            s = s + ...               # ajouter M[i][j] à s
    return s

# --- Test ---
M_test = [[1, 2], [3, 4]]
print("somme([[1,2],[3,4]]) =", somme(M_test))   # attendu : 10


# -----------------------------------------------------------------------------
# Exercice 2 — Tester si une matrice est nulle
# -----------------------------------------------------------------------------
# On parcourt tous les éléments. Dès qu'on trouve un élément != 0,
# on peut retourner False immédiatement. Si on finit la boucle sans
# avoir trouvé de non-zéro, on retourne True.

def nulle(M):
    for i in range(len(M)):
        for j in range(len(M[0])):
            if M[i][j] != ...:        # si l'élément n'est pas zéro
                return ...            # la matrice n'est pas nulle
    return ...                        # on a tout parcouru : elle est nulle

# --- Test ---
print("nulle([[0,0],[0,0]]) =", nulle([[0, 0], [0, 0]]))   # attendu : True
print("nulle([[0,1],[0,0]]) =", nulle([[0, 1], [0, 0]]))   # attendu : False


# -----------------------------------------------------------------------------
# Exercice 3 — Matrice identité de taille n
# -----------------------------------------------------------------------------
# La matrice identité I a des 1 sur la diagonale (i == j) et des 0 ailleurs.
# On crée d'abord une matrice de zéros, puis on met des 1 sur la diagonale.

def identite(n):
    I = []
    for i in range(n):
        ligne = []
        for j in range(n):
            if i == j:
                ligne.append(...)     # élément diagonal : mettre 1
            else:
                ligne.append(...)     # hors diagonale : mettre 0
        I.append(ligne)
    return I

# --- Test ---
print("identite(3) =", identite(3))
# attendu : [[1, 0, 0], [0, 1, 0], [0, 0, 1]]


# -----------------------------------------------------------------------------
# Exercice 4 — Produit matrice × vecteur
# -----------------------------------------------------------------------------
# On calcule Y = A * X où A est une matrice n×n et X est un vecteur de taille n.
# La formule est : Y[i] = somme sur j de A[i][j] * X[j]

def produit_vec(A, X):
    n = len(A)          # nombre de lignes de A
    Y = [0] * n         # vecteur résultat, initialisé à zéros
    for i in range(n):
        for j in range(len(X)):
            Y[i] = Y[i] + ... * ...   # ajouter A[i][j] * X[j]
    return Y

# --- Test ---
A_test = [[1, 2], [3, 4]]
X_test = [1, 0]
print("produit_vec([[1,2],[3,4]], [1,0]) =", produit_vec(A_test, X_test))
# attendu : [1, 3]


# -----------------------------------------------------------------------------
# Exercice 5 — Produit de deux matrices
# -----------------------------------------------------------------------------
# C = A * B où C[i][j] = somme sur k de A[i][k] * B[k][j]
# On a besoin de trois boucles imbriquées : i (lignes de A),
# j (colonnes de B), k (colonnes de A = lignes de B).

def produit(A, B):
    n = len(A)        # nombre de lignes de A
    p = len(A[0])     # nombre de colonnes de A (= nombre de lignes de B)
    q = len(B[0])     # nombre de colonnes de B

    # Créer la matrice résultat C de taille n × q remplie de zéros
    C = []
    for i in range(n):
        C.append([0] * q)

    for i in range(n):
        for j in range(q):
            for k in range(p):
                C[i][j] = C[i][j] + ... * ...   # ajouter A[i][k] * B[k][j]
    return C

# --- Test ---
A2 = [[1, 0], [0, 2]]
B2 = [[3, 1], [0, 4]]
print("produit([[1,0],[0,2]], [[3,1],[0,4]]) =", produit(A2, B2))
# attendu : [[3, 1], [0, 8]]


# -----------------------------------------------------------------------------
# Exercice 6 — Puissance d'une matrice : A^n
# -----------------------------------------------------------------------------
# On part de la matrice identité (= A^0), et on multiplie n fois par A.
# À chaque étape : An = produit(An, A)

def puissance(A, n):
    An = identite(len(A))    # An commence à l'identité (= A^0)
    for k in range(n):
        An = produit(..., ...)   # multiplier An par A
    return An

# --- Test ---
A3 = [[2, 0], [0, 3]]
print("puissance([[2,0],[0,3]], 2) =", puissance(A3, 2))
# attendu : [[4, 0], [0, 9]]


# =============================================================================
# PARTIE 2 — MODÈLE DE LESLIE : population de rongeurs
# =============================================================================
#
# On étudie une population de rongeurs femelles répartie en 3 classes d'âge :
#   a_n = nombre de femelles de 0-1 an à l'année n
#   b_n = nombre de femelles de 1-2 ans à l'année n
#   c_n = nombre de femelles de 2-3 ans à l'année n
#
# Règles biologiques :
#   - Chaque femelle de 1-2 ans produit en moyenne 6 femelles de 0-1 an
#   - Chaque femelle de 2-3 ans produit en moyenne 10 femelles de 0-1 an
#   - 1 rongeur sur 2 survit de la classe 0-1 an à la classe 1-2 ans
#   - 40% des rongeurs survivent de la classe 1-2 ans à la classe 2-3 ans
#
# =============================================================================

# -----------------------------------------------------------------------------
# Exercice 7 — Équations de récurrence (à faire sur papier d'abord)
# -----------------------------------------------------------------------------
# Complétez :
#   a_{n+1} = ... * b_n + ... * c_n
#   b_{n+1} = ... * a_n
#   c_{n+1} = ... * b_n


# -----------------------------------------------------------------------------
# Exercice 8 — Vecteur initial
# -----------------------------------------------------------------------------
# On part de 10 femelles dans la première classe, aucune dans les autres.

X0 = [...]   # à compléter : [a0, b0, c0]


# -----------------------------------------------------------------------------
# Exercice 9 — Matrice de Leslie
# -----------------------------------------------------------------------------
# On cherche A telle que X_{n+1} = A * X_n
# D'après les équations de l'exercice 7, la matrice A est :
#
#       [  0    6   10  ]
#   A = [ 0.5   0    0  ]
#       [  0   0.4   0  ]
#
# Définir A en Python :

A = [
    [..., ..., ...],   # première ligne  : coefficients de fécondité
    [..., ..., ...],   # deuxième ligne  : taux de survie classe 0->1
    [..., ..., ...],   # troisième ligne : taux de survie classe 1->2
]


# -----------------------------------------------------------------------------
# Exercice 10 — Fonction population(n)
# -----------------------------------------------------------------------------
# X_n = A^n * X0
# On utilise puissance() et produit_vec() déjà codés.

def population(n):
    An = puissance(..., ...)        # calculer A^n
    return produit_vec(..., ...)    # retourner A^n * X0

# --- Test ---
print("X0 =", population(0))   # attendu : [10, 0, 0]
print("X1 =", population(1))   # attendu : [0, 5.0, 0]
print("X2 =", population(2))   # attendu : [30.0, 0.0, 2.0]


# -----------------------------------------------------------------------------
# Exercice 11 — Valeurs de X_1, X_2, X_3, X_4
# -----------------------------------------------------------------------------
# Utilisez la fonction population() pour calculer et afficher X_1 à X_4.

for n in range(1, 5):
    print(f"X{n} =", ...)   # appeler population(n)


# -----------------------------------------------------------------------------
# Exercice 12 — Visualisation de l'évolution des classes
# -----------------------------------------------------------------------------
# La fonction plot_population(n) est fournie ci-dessous.
# Appelez-la avec n=15 et observez les courbes.
# Que remarquez-vous sur l'évolution des trois classes ?

def plot_population(n):
    x = list(range(n))
    y = [population(i) for i in x]
    a, b, c = zip(*y)
    plt.figure()
    plt.plot(x, a, label="$a_n$ (0-1 an)")
    plt.plot(x, b, label="$b_n$ (1-2 ans)")
    plt.plot(x, c, label="$c_n$ (2-3 ans)")
    plt.xlabel("Année n")
    plt.ylabel("Effectif")
    plt.title("Évolution de la population par classe d'âge")
    plt.legend()
    plt.show()

plot_population(...)   # remplacer ... par le nombre d'années souhaité


# -----------------------------------------------------------------------------
# Exercice 13 — Taux d'accroissement
# -----------------------------------------------------------------------------
# La fonction plot_accroissement(n) calcule et trace le rapport a_{n+1}/a_n.
# Appelez-la avec n=20 et observez vers quelle valeur le taux converge.

def plot_accroissement(n):
    x = list(range(n))
    x_ = list(range(1, n - 1))
    y = [population(i) for i in x]
    X = list(zip(*y))
    X_ = [[]] * 3
    for i in range(3):
        X_[i] = [0 if X[i][j] == 0 else X[i][j+1] / X[i][j] for j in x_]
    plt.figure()
    plt.plot(x_, X_[0], label=r"$a_{n+1}/a_n$")
    plt.plot(x_, X_[1], label=r"$b_{n+1}/b_n$")
    plt.plot(x_, X_[2], label=r"$c_{n+1}/c_n$")
    plt.xlabel("Année n")
    plt.ylabel("Taux d'accroissement")
    plt.title("Convergence du taux d'accroissement")
    plt.legend()
    plt.show()

plot_accroissement(...)   # remplacer ... par le nombre d'années souhaité

# Question : vers quelle valeur le taux semble-t-il converger ?
# Réponse : ...


# -----------------------------------------------------------------------------
# Exercice 14 — Lien avec les valeurs propres
# -----------------------------------------------------------------------------
# D'après le théorème de Perron-Frobenius, le taux d'accroissement converge
# vers la PLUS GRANDE valeur propre de A.
#
# 1. Calculer les valeurs propres de A à la main (polynôme caractéristique).
#    det(A - lambda*I) = 0  =>  -lambda^3 + 6*0.5*0.4 + 10*0.5 = 0
#    soit : lambda^3 = 1.2 + 5*lambda ... (à développer sur papier)
#
# 2. Vérifier numériquement avec numpy :

valeurs_propres, vecteurs_propres = np.linalg.eig(...)   # passer A en argument

print("Valeurs propres de A :", valeurs_propres)
print("Plus grande valeur propre :", max(valeurs_propres.real))

# 3. Comparer avec la limite observée sur le graphe à l'exercice 13.
#    Conclusion : ...

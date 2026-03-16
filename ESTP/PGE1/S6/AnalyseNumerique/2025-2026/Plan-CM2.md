# Plan de séance - CM2

## CM2 - Différences finies, systèmes linéaires, stabilité et convergence

### Informations générales

- Durée : `1h30`
- Position dans la progression : prolongement direct de `CM1`
- Objectif principal : montrer que la discrétisation dépasse le cadre d'Euler et conduit souvent à des systèmes linéaires

### Objectifs pédagogiques

À l'issue du cours, les étudiants doivent être capables de :

- comprendre qu'une dérivée peut être approximée par une différence ;
- relier discrétisation d'une équation différentielle et obtention d'un système linéaire ;
- reconnaître qualitativement une matrice tridiagonale issue d'un maillage 1D ;
- comprendre les idées de stabilité et de convergence à un niveau introductif ;
- faire le lien entre calcul numérique et interprétation physique du résultat.

### Idée de départ

Le cours repart de la question suivante :

"Euler est-il un cas isolé, ou bien l'exemple d'une idée plus générale ?"

La réponse à faire émerger est que l'analyse numérique repose souvent sur la même stratégie :

- on remplace des objets continus par des objets discrets ;
- on transforme une équation différentielle en relations algébriques ;
- on obtient finalement un problème calculable.

### Déroulé proposé

#### 1. Rappel actif de CM1 - 10 min

Objectif : réengager les étudiants sans résumé magistral.

Questions à poser :

- Qu'a-t-on remplacé dans la méthode d'Euler ?
- Pourquoi faut-il choisir un pas ?
- Qu'est-ce qui peut rendre une approximation peu fiable ?

Interaction :

- réponses courtes à l'oral ;
- éventuellement récapitulatif au tableau en trois mots : discrétisation, erreur, pas.

#### 2. Faire émerger les différences finies - 20 min

Objectif : généraliser l'idée de discrétisation.

Cheminement :

1. Partir de la définition du taux de variation.
2. Demander comment approcher une dérivée si la fonction n'est connue qu'en quelques points.
3. Faire proposer un quotient de différences.
4. Institutionnaliser les approximations de la dérivée première, puis de la dérivée seconde.

Questions à faire émerger :

- Si je ne connais une fonction qu'en des nœuds, comment approximer sa pente ?
- Pourquoi une dérivée seconde fait-elle intervenir le point précédent, le point courant et le point suivant ?

Interaction :

- laisser les étudiants proposer des écritures avant de formaliser ;
- faire vérifier le sens des formules par un schéma ou un dessin.

#### 3. Exemple central : un problème aux limites - 25 min

Objectif : montrer la naissance naturelle d'un système linéaire.

Exemple suggéré :

- `-y''(x) = f(x)` sur un intervalle avec conditions aux bords.

Étapes à faire apparaître :

1. Choix d'un maillage.
2. Définition des inconnues aux nœuds.
3. Approximation de la dérivée seconde.
4. Écriture d'une équation par nœud intérieur.
5. Obtention d'un système linéaire.

Questions à poser :

- Combien d'inconnues y a-t-il ?
- Combien d'équations faut-il ?
- Pourquoi la matrice obtenue est-elle tridiagonale ?

Interaction :

- faire construire une ligne du système par la classe ;
- demander à plusieurs étudiants de proposer la structure de la matrice.

#### 4. Ouverture vers l'EDP simple et la chaleur - 20 min

Objectif : montrer l'unité de la démarche sans surcharger le cours.

On peut évoquer la diffusion de chaleur dans une paroi pour illustrer que :

- les mêmes idées de discrétisation réapparaissent ;
- un maillage spatial mène à un système ;
- un pas de temps peut ensuite être ajouté si l'évolution temporelle intervient.

Question intéressante à faire discuter :

"À quoi reconnaît-on une solution numérique absurde dans un contexte physique ?"

Réponses attendues :

- oscillations non physiques ;
- explosion des valeurs ;
- incohérence avec les conditions aux bords ;
- comportement non compatible avec le phénomène.

#### 5. Introduction qualitative à la stabilité et à la convergence - 15 min

Objectif : donner une première intuition sans entrer dans un formalisme trop lourd.

Idées à fixer :

- convergence : quand le pas tend vers zéro, la solution numérique doit se rapprocher de la bonne solution ;
- stabilité : les petites erreurs ne doivent pas être amplifiées de façon catastrophique ;
- coût : raffiner le maillage améliore souvent l'approximation, mais augmente le travail de calcul.

Interaction :

- discussion rapide à partir de deux maillages différents ;
- demander quel compromis semblerait raisonnable dans un contexte d'ingénierie.

### Place de l'interactivité dans CM2

Moments d'interaction essentiels :

- rappel actif en début de séance ;
- émergence des différences finies à partir des propositions de la classe ;
- construction collective d'un système linéaire simple ;
- discussion sur le sens physique d'une solution numérique ;
- introduction intuitive de la stabilité et de la convergence.

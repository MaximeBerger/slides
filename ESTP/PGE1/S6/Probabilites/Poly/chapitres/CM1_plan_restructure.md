# CM1 — Événements, Variables aléatoires
## Plan restructuré avec fils rouges BTP

**Durée totale : 2h**
**Public : 1re année ESTP, semestre 2**

---

## Vue d'ensemble

| Phase | Contenu | Durée | Mode |
|-------|---------|-------|------|
| 1 | Accroche — Le problème du béton | 10 min | Interactif |
| 2 | Vocabulaire à partir du béton | 25 min | Cours + questions |
| 3 | Micro-pause active | 5 min | Wooclap / main levée |
| 4 | Probabilités conditionnelles et Bayes | 35 min | Cours + activité |
| 5 | Événements indépendants | 10 min | Cours |
| 6 | Variables aléatoires et lois — fil rouge météo | 25 min | Cours + exemples |
| 7 | Fermeture — retour aux deux problèmes | 5 min | Synthèse |

**Pause de 5 min** à placer entre la Phase 4 et la Phase 5 (≈ à la moitié du CM).

---

## Fil rouge n°1 — Contrôle qualité du béton

### Contexte à connaître

Sur un chantier, avant de couler une dalle ou un poteau en béton armé, on commande un béton d'une **classe de résistance** donnée. La classe la plus courante est **C25/30** :

- **25** = résistance caractéristique sur éprouvette **cylindrique** (11×22 cm), en MPa
- **30** = résistance caractéristique sur éprouvette **cubique**, en MPa
- La lettre **C** vient de *Concrete*
- La norme de référence est la **NF EN 206+A2/CN**

### Qu'est-ce que la résistance caractéristique ?

C'est la valeur **en dessous de laquelle on s'attend à trouver au plus 5% des résultats** (c'est un fractile à 5%). Ce n'est donc PAS la moyenne. Si la distribution suit une loi normale :

> **f_ck = f_cm − 1.645 × s**

où f_cm est la résistance moyenne et s l'écart-type.

### Le protocole d'essai

1. On prélève des éprouvettes cylindriques sur le chantier le jour du coulage
2. Elles sont conservées dans des conditions normalisées (eau à 20°C)
3. À **28 jours**, on les écrase dans une **presse de compression**
4. La pression au moment de la fissuration = résistance en MPa

### Données réalistes pour le CM

**Jeu de données à projeter — 6 éprouvettes d'un béton C25/30 :**

| Éprouvette | Force (kN) | Section (mm²) | Résistance (MPa) |
|:---:|:---:|:---:|:---:|
| 1 | 501.1 | 19 000 | 26.4 |
| 2 | 471.2 | 19 000 | 24.8 |
| 3 | 476.9 | 19 000 | 25.1 |
| 4 | 516.8 | 19 000 | 27.2 |
| 5 | 454.1 | 19 000 | 23.9 |
| 6 | 486.4 | 19 000 | 25.6 |

**Ordres de grandeur à avoir en tête :**

- Résistance moyenne typique pour un C25/30 : environ **33 MPa** (la norme simplifie avec f_cm = f_ck + 8 MPa)
- Écart-type d'un bon contrôle de production : **2 à 4 MPa**
- Écart-type préoccupant : **> 6 MPa**
- Dispersion normale dans un lot de 6 éprouvettes : quelques MPa autour de la moyenne

### Vocabulaire BTP utile

| Terme | Signification |
|-------|---------------|
| Éprouvette | Échantillon de béton cylindrique (11×22 cm ou 16×32 cm) |
| Résistance caractéristique (f_ck) | Fractile 5% de la distribution des résistances à 28 jours |
| Résistance moyenne (f_cm) | Moyenne des résistances mesurées |
| Presse de compression | Machine qui écrase l'éprouvette et mesure la force à rupture |
| Classe de résistance | Notation CX/Y (ex : C25/30) — cylindre/cube en MPa |
| Scléromètre | Appareil de test non destructif (rebond sur la surface durcie) |
| Gâchée | Volume de béton fabriqué en une seule opération de malaxage |

---

## Fil rouge n°2 — Météo et planification de chantier

### Contexte à connaître

Le coulage du béton est très sensible aux conditions météorologiques :

- **Pluie forte ou orage** : coulage interdit — l'excès d'eau modifie le rapport eau/ciment et diminue la résistance
- **Pluie fine** : coulage possible avec précautions (bâches, polyane)
- **Température < 5°C** : le durcissement ralentit fortement ; en dessous de 0°C, l'hydratation du ciment s'arrête et le gel peut détruire le béton
- **Température > 25°C** : dispositions particulières nécessaires ; au-dessus de 35°C, il vaut mieux reporter

Un chef de chantier doit donc **planifier ses coulages en fonction de la météo**, ce qui est un problème probabiliste concret.

### Données météo réelles — Dijon

**Nombre moyen de jours de pluie par mois à Dijon :**

| Mois | Jours de pluie (≈) | Jours sans pluie (≈) |
|:---:|:---:|:---:|
| Janvier | 12 | 19 |
| Février | 9 | 19-21 |
| Mars | 10 | 21 |
| Avril | 12 | 18 |
| Mai | 16 | 15 |
| Juin | 12 | 18 |
| Juillet | 13 | 18 |
| Août | 12 | 19 |
| Septembre | 9-10 | 21 |
| Octobre | 11 | 20 |
| Novembre | 10 | 20 |
| Décembre | 12 | 19 |

**Problème d'ouverture (Phase 6) :**

> *Un chef de chantier à Dijon doit couler une dalle en octobre. Il a besoin de 3 jours consécutifs sans pluie forte. Sur les 31 jours du mois, environ 11 sont des jours de pluie. Chaque jour, indépendamment des autres, la probabilité de pluie est d'environ p = 11/31 ≈ 0.35.*
>
> *Questions :*
> - *Quelle est la probabilité qu'un jour donné soit favorable au coulage ?* → 1 − p ≈ 0.65
> - *Quelle est la probabilité d'avoir 3 jours consécutifs favorables ?* → (0.65)³ ≈ 0.27 (si indépendance)
> - *Sur 20 jours ouvrés, combien de "fenêtres" de 3 jours favorables peut-on espérer ?*
> - *Le nombre de jours de pluie dans le mois, c'est quel type de variable ?* → discrète
> - *La quantité de pluie tombée un jour donné, c'est quel type de variable ?* → continue

### Ce que cet exemple permet d'introduire

- **Variable aléatoire discrète** : nombre de jours de pluie dans un mois (valeurs : 0, 1, 2, …, 31)
- **Variable aléatoire continue** : quantité de précipitations en mm un jour donné
- **Indépendance** : peut-on supposer que la pluie d'un jour est indépendante de celle de la veille ? (En réalité non — les fronts météo durent plusieurs jours. Bonne discussion à avoir avec les étudiants.)
- **Loi d'une variable** : la loi du nombre de jours de pluie, si on suppose l'indépendance, c'est une loi binomiale → transition vers le CM2

---

## Déroulé détaillé

### Phase 1 — Accroche (10 min) 🎯

**Projeter le tableau des 6 éprouvettes.**

> *"Sur un chantier, on coule une dalle en béton armé. Le bureau d'études a commandé un béton C25/30 — c'est le plus courant. On prélève 6 éprouvettes, on les écrase à 28 jours, et on obtient ces résultats."*

Laisser les étudiants regarder les chiffres.

> *"L'éprouvette n°5 donne 23.9 MPa. La résistance caractéristique est de 25 MPa. Est-ce qu'on doit s'inquiéter ? Est-ce que ce béton est conforme ? Comment décider ?"*

**Wooclap (sondage rapide) :** "À votre avis, ce béton est-il conforme ? Oui / Non / On ne peut pas savoir"

Ne pas répondre. Annoncer que le cours va fournir les outils pour trancher.

---

### Phase 2 — Vocabulaire fondamental (25 min) 📐

**Étape 2.1 — L'univers (3 min)**

> *"On a mesuré 6 valeurs. Mais si on testait 1000 éprouvettes, quelles valeurs pourrait-on observer ?"*

Réponse attendue : des réels positifs. → **Ω = [0, +∞[**

> *"L'ensemble de toutes les valeurs possibles, c'est l'univers."*

**Étape 2.2 — Les événements (5 min)**

> *"Le bureau d'études ne s'intéresse pas à chaque valeur. Il veut savoir : le béton est-il conforme ?"*

→ A = {ω ∈ Ω : ω ≥ 25}. **C'est un événement.**

Faire varier :
- B = {ω ∈ Ω : ω < 20} → "béton vraiment mauvais"
- C = {ω ∈ Ω : 24 ≤ ω ≤ 28} → "résistance dans la plage attendue"

Opérations : A∪B = ? A∩B = ? Complémentaire de A = ?

**Wooclap rapide :** "Si A = 'résistance ≥ 25' et B = 'résistance < 20', que représente A∪B en langage chantier ?"

**Étape 2.3 — La tribu (3 min)**

> *"On veut pouvoir mesurer la probabilité de n'importe quelle combinaison de ces événements. L'ensemble de toutes les questions auxquelles notre modèle sait répondre, c'est ce qu'on appelle une tribu."*

Pas de formalisme lourd ici. Juste l'idée de stabilité par réunion, intersection, complémentaire.

**Étape 2.4 — La mesure de probabilité (7 min)**

> *"Un béton C25/30 a une résistance moyenne autour de 33 MPa, avec un écart-type de 3 à 4 MPa. Si on teste des milliers d'éprouvettes, quelle proportion tombe en dessous de 25 ?"*

**Dessiner au tableau** une courbe en cloche centrée sur 33, hachurer la zone sous 25.

> *"Cette aire, c'est la probabilité. C'est une fonction qui associe un nombre entre 0 et 1 à chaque événement."*

Poser les propriétés naturellement :
- P(Ω) = 1 → la résistance prend forcément une valeur
- P(∅) = 0 → impossible qu'il n'y ait aucune valeur
- Sous-additivité → illustrer sur le béton

**Étape 2.5 — Espace probabilisé (2 min)**

> *"On a tout : l'univers Ω, la tribu, la probabilité P. Le triplet (Ω, tribu, P), c'est un espace probabilisé."*

**Étape 2.6 — Élargir (5 min)**

Dérouler rapidement les autres exemples — 1 minute chacun, toujours : quel univers, quel événement, quelle probabilité ?

1. **Fissure dans un matériau** → Ω = ensemble des fissures possibles, A = "la fissure traverse la plaque"
2. **Déformation d'un pont** → Ω = formes de déformation, A = "déformation dépasse le cahier des charges"
3. **Turbulences autour d'un avion** → Ω = champs de vitesse, A = "turbulence ressentie par les passagers"
4. **Chemin aléatoire dans Dijon** → Ω = trajectoires depuis l'ESTP, A = "l'ivrogne est à plus de 100m"
5. **Actifs financiers** → Ω = trajectoires de prix, A = "le cours atteint 10 000€"

---

### Phase 3 — Micro-pause active (5 min) 🎯

**Exercice (Wooclap ou main levée) :**

> *"Un ingénieur géotechnicien prélève 10 échantillons de sol avant de construire une fondation. Il mesure la capacité portante de chaque échantillon."*

Questions :
1. Quel est l'univers ?
2. Donnez un événement qui intéresserait l'ingénieur.
3. Cet événement est-il discret ou continu ?

---

### Phase 4 — Probabilités conditionnelles et Bayes (35 min) 📐

**Bloc 4.1 — Probabilité conditionnelle (10 min)**

> *"Deux chantiers A et B utilisent le même béton C25/30 mais avec des niveaux de contrôle qualité différents. Sachant qu'une éprouvette vient du chantier A, est-ce que ça change la probabilité qu'elle soit conforme ?"*

→ Oui. Formaliser P(Conforme | Chantier A).

Formule : P(A|B) = P(A∩B) / P(B)

Idée clé : **une information supplémentaire modifie la vraisemblance.**

**Bloc 4.2 — Probabilités totales (8 min)**

Exemple des 4 sites ESTP :

| Site | Étudiants | % brillants |
|:---:|:---:|:---:|
| Dijon | 100 | 100% |
| Cachan | 300 | 10% |
| Troyes | 100 | 50% |
| Orléans | 30 | 30% |

> *"Un étudiant sort de l'ESTP. Quelle est la probabilité qu'il soit brillant ?"*

Calcul avec la formule des probabilités totales. Les sites forment une partition de l'univers.

**Bloc 4.3 — Formule de Bayes (12 min)**

Inverser la question :

> *"Un étudiant brillant sort de l'ESTP. De quel site vient-il probablement ?"*

L'intuition dit Dijon (100% de brillants), le calcul nuance grâce aux effectifs. **Moment de surprise.**

Formule de Bayes → introduire le vocabulaire bayésien :
- P(H) = probabilité a priori
- P(données | H) = vraisemblance
- P(H | données) = probabilité a posteriori

**Ouverture philosophique :**

> *"Dans notre tête, chaque croyance est associée à une probabilité. Faut-il interdire le glyphosate ? Les extraterrestres existent-ils ? Vais-je avoir une bonne note ? À chaque nouvelle information, ces probabilités se mettent à jour. C'est exactement ce que fait la formule de Bayes."*

**Bloc 4.4 — Activité Bayes appliqué (5 min)** 🎯

> *"Un maître de jeu possède des dés de 2, 3, 6, 8 et 10 faces. Il lance un dé et obtient 6. Quel dé a-t-il lancé ?"*

Les étudiants le font en binômes (2-3 min), correction rapide.

Bonus si le temps le permet : l'exemple du loup-garou.

---

### ⏸️ Pause (5 min)

---

### Phase 5 — Événements indépendants (10 min) 📐

Retour au béton :

> *"On teste deux éprouvettes. Celle du matin et celle de l'après-midi, provenant de la même toupie de béton. Le résultat de la première influence-t-il celui de la deuxième ?"*

- Même gâchée → probablement **pas indépendants** (même mélange, mêmes conditions)
- Deux livraisons différentes → on peut raisonnablement supposer **l'indépendance**

→ L'indépendance est une **hypothèse de modélisation**, pas un fait automatique.

Formaliser : A et B indépendants si **P(A∩B) = P(A) × P(B)**

Insister : pour prouver l'indépendance, il faut calculer les trois termes séparément et vérifier l'égalité.

---

### Phase 6 — Variables aléatoires et lois (25 min) 📐

**Bloc 6.1 — Définition à partir du béton (5 min)**

> *"La résistance mesurée sur une éprouvette : c'est un nombre qui dépend du résultat de l'expérience. C'est ce qu'on appelle une variable aléatoire."*

> *"Ce n'est ni une variable, ni quelque chose d'aléatoire. C'est une fonction de Ω vers ℝ. (C'est la pire définition du 21e siècle.)"*

**Bloc 6.2 — Discret vs continu (5 min)**

Introduire le **fil rouge n°2 — la météo sur le chantier** :

> *"Un chef de chantier à Dijon planifie un coulage de dalle en octobre. Il ne peut pas couler sous forte pluie ni si la température descend sous 5°C. Il regarde la météo du mois."*

| Type de variable | Exemple BTP | Valeurs |
|:---|:---|:---|
| **Discrète** | Nombre de jours de pluie dans le mois | 0, 1, 2, …, 31 |
| **Discrète** | Nombre d'éprouvettes non conformes dans un lot de 6 | 0, 1, 2, …, 6 |
| **Continue** | Résistance d'une éprouvette en MPa | tout réel positif |
| **Continue** | Quantité de pluie tombée un jour donné (en mm) | tout réel ≥ 0 |

**Bloc 6.3 — Indépendance de variables aléatoires (3 min)**

> *"La pluie d'aujourd'hui est-elle indépendante de celle d'hier ?"*

En réalité non — les systèmes météo persistent. C'est un bon exemple pour montrer que **l'hypothèse d'indépendance est pratique mais pas toujours réaliste**.

Formaliser : X et Y indépendantes si pour tous intervalles I et J, P(X ∈ I et Y ∈ J) = P(X ∈ I) × P(Y ∈ J).

**Bloc 6.4 — Fonction indicatrice (2 min)**

A = "il pleut le jour j". On définit 1_A : vaut 1 si A est réalisé, 0 sinon.

> *"Compter le nombre de jours de pluie dans le mois, c'est sommer des fonctions indicatrices."*

**Bloc 6.5 — Loi d'une variable aléatoire (7 min)**

> *"Une variable aléatoire associe une valeur à chaque issue ω de l'univers Ω. Mais Ω peut être très compliqué. L'idée de la loi, c'est de résumer l'essentiel."*

Pour une variable discrète : la loi = ensemble des couples (valeur, probabilité).

Illustrer avec le nombre de jours de pluie :
- Ω = toutes les séquences possibles de météo sur 31 jours
- X = nombre de jours de pluie
- La loi de X résume tout ce qu'on a besoin de savoir, sans connaître le détail de chaque séquence

**Bloc 6.6 — Retour sur les exemples (3 min)**

Reprendre rapidement 2-3 exemples de la Phase 2 et identifier la variable aléatoire associée :
- Fissure → X = longueur maximale de la fissure (continue)
- Pont → X = flèche au centre du pont en mm (continue)
- Marche aléatoire → X = distance à l'ESTP après n pas (continue)

---

### Phase 7 — Fermeture (5 min) 🎯

Reprendre les deux fils rouges :

> *"Aujourd'hui on a construit la boîte à outils : univers, événements, probabilités, conditionnement, Bayes, indépendance, variables aléatoires, lois."*

**Projeter le tableau des éprouvettes :**

> *"On ne sait pas encore répondre à la question du début : ce béton est-il conforme ? Pour ça, il nous faut savoir quelle loi suit la résistance, comment calculer une espérance et un écart-type, et ce que signifie un fractile à 5%. C'est le CM2."*

**Projeter les données météo :**

> *"On ne sait pas encore calculer la probabilité d'avoir 3 jours consécutifs sans pluie. Pour ça, il nous faut la loi binomiale. C'est aussi le CM2."*

> *"À la semaine prochaine."*

---

## Résumé des moments interactifs

| Moment | Phase | Type | Durée |
|--------|-------|------|-------|
| Sondage "béton conforme ?" | 1 | Wooclap | 2 min |
| "A∪B en langage chantier ?" | 2 | Wooclap | 2 min |
| Exercice géotechnique | 3 | Main levée / Wooclap | 5 min |
| Exercice dés du maître de jeu | 4 | Binômes | 5 min |

**Total interactif : ≈ 14 min sur 120 min** (12% du temps — modeste mais régulier)

---

## Ce qui a changé par rapport au CM1 original

| Aspect | Avant | Après |
|--------|-------|-------|
| **Ouverture** | Définitions abstraites (univers, tribu, mesure) | Problème concret (éprouvettes de béton) |
| **Logique** | Définitions → exemples | Problème → besoin → définition |
| **Exemples BTP** | Présents mais peu exploités (3 lignes) | Deux fils rouges développés tout au long |
| **Moments actifs** | 1 Wooclap | 4 moments interactifs répartis |
| **Variété** | Un seul registre | Béton + météo + ESTP + ludique (dés, loup-garou) |
| **Fil conducteur** | Pas de question ouverte | Question posée en ouverture, répondue au CM2 |
| **Contenu mathématique** | Identique | Identique — rien n'a été supprimé |

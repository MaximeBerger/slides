# Wooclap CM6 — Choisir le bon outil

> 9 questions, ~30 min en classe (3 min par question : 1 min lecture / 1 min vote / 1 min débrief).
> Bonne réponse en **gras**. Petits notes de débrief en italique sous chaque question.

---

## Q0 — Première question à se poser (Word cloud)

**Type :** Question ouverte / Nuage de mots
**Énoncé :**
> Vous lisez un énoncé de probabilités que vous n'avez jamais vu. Quelle est LA toute première question que vous devez vous poser ?

*Réponses attendues : "quelle variable ?", "discret ou continu ?", "événement ou variable ?", "quelle expérience aléatoire ?". On retient : « parle-t-on d'événements, ou d'une variable aléatoire ? ». C'est le premier nœud de l'arbre.*

---

## Q1 — Test imparfait et inversion du conditionnement (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> Une livraison d'armatures contient en moyenne 2 % de pièces non conformes. Le contrôle qualité utilise un test imparfait : il marque "non conforme" 95 % des pièces vraiment non conformes, mais aussi 3 % des pièces conformes.
>
> Une pièce vient d'être marquée "non conforme". On veut savoir avec quelle probabilité elle est réellement non conforme. **Quel outil mobilisez-vous ?**

- a) Loi binomiale
- **b) Formule de Bayes**
- c) Intervalle de confiance
- d) Test du khi-deux

*Débrief : on cherche P(D | S) à partir de P(S | D), P(S | D̄), P(D). On "renverse" un conditionnement → Bayes. Aucun échantillon, donc ni IC ni test.*

---

## Q2 — Comptage de défauts indépendants (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> Un lot de 40 boulons. Chaque boulon est défectueux avec probabilité 0,05, indépendamment des autres. On note X le nombre de boulons défectueux dans le lot.
>
> **Quelle loi suit X ?**

- a) Bernoulli
- **b) Binomiale**
- c) Géométrique
- d) Poisson

*Débrief : n essais indépendants, même proba de succès, on compte les succès → Binomiale B(40, 0,05). Bernoulli = un seul essai. Géométrique = rang du premier succès. Poisson = comptage d'événements rares sur une durée.*

---

## Q3 — Comptage d'événements rares sur une durée (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> Sur un tronçon d'autoroute, on enregistre en moyenne 2,3 accidents par mois. On modélise le nombre d'accidents d'un mois donné.
>
> **Quelle loi convient ?**

- a) Bernoulli
- b) Binomiale
- c) Géométrique
- **d) Poisson**

*Débrief : événements rares, comptage sur une période de temps, taux moyen connu → Poisson de paramètre λ = 2,3. Pas de "n essais" identifiables → pas binomiale.*

---

## Q4 — Rang du premier succès (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> On teste des élingues une par une jusqu'à trouver la première défectueuse. Chaque élingue a une probabilité 0,02 d'être défectueuse, indépendamment des autres. Soit T le rang de la première élingue défectueuse.
>
> **Quelle loi suit T ?**

- a) Bernoulli
- b) Binomiale
- **c) Géométrique**
- d) Poisson

*Débrief : on attend le premier succès → Géométrique de paramètre 0,02. E(T) = 1/0,02 = 50. Confusion classique avec binomiale (qui fixerait n à l'avance et compterait les succès).*

---

## Q5 — Durée de vie sans mémoire (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> On modélise la durée avant la prochaine panne d'une grue. Le constructeur précise que la grue ne "se souvient pas" de son passé : qu'elle ait déjà tourné 100 h ou 1000 h, sa durée restante avant panne suit la même loi.
>
> **Quelle loi convient ?**

- a) Uniforme
- **b) Exponentielle**
- c) Normale
- d) Binomiale

*Débrief : "sans mémoire" est la signature de la loi exponentielle. Variable continue positive, modèle de durée → Exponentielle. Rappel : σ = μ = 1/λ.*

---

## Q6 — Moyenne d'un grand échantillon (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> On veut modéliser la moyenne de 50 mesures de résistance d'éprouvettes de béton. On ne connaît PAS la loi de la résistance individuelle, juste sa moyenne (33 MPa) et son écart-type (3 MPa).
>
> **Par quelle loi peut-on approcher la moyenne empirique ?**

- a) Uniforme
- b) Exponentielle
- **c) Normale, par le théorème central limite**
- d) Aucune, on ne peut rien dire sans connaître la loi individuelle

*Débrief : C'est exactement ce que dit le TCL. n = 50 ≥ 30 → l'approximation marche. X̄ ≈ N(33, 3²/50). Réponse (d) = piège classique : on confond la loi de la variable individuelle et la loi de la moyenne.*

---

## Q7 — IC, test, calcul direct ? (QCM)

**Type :** QCM (réponse unique)
**Énoncé :**
> Un fournisseur annonce une résistance moyenne d'AU MOINS 35 MPa pour son béton. Le client teste 64 éprouvettes et obtient une moyenne empirique de 33,8 MPa. Il veut savoir si l'annonce est crédible.
>
> **Quel outil ?**

- a) Calcul direct d'une probabilité
- b) Intervalle de confiance
- **c) Test d'hypothèse unilatéral à gauche**
- d) Calcul d'une espérance

*Débrief : on veut vérifier une affirmation sur le vrai paramètre → test. L'annonce dit "≥" → H₀ : μ ≥ 35 → unilatéral à gauche (seul un μ plus petit serait suspect). L'IC (b) marcherait aussi (dualité), mais le test colle mieux à la formulation "vérifier l'annonce".*

---

## Q8 — Tri : associer chaque contexte à sa loi (Match)

**Type :** Matching / Associer
**Énoncé :**
> Associez chaque situation à la loi qui convient le mieux.

**Items à associer :**

| Situation | Loi |
|---|---|
| Lancers d'un dé jusqu'au premier 6 | **Géométrique** |
| Nombre de SMS reçus dans la journée (35 en moyenne) | **Poisson** |
| Durée avant la prochaine panne d'un disque dur | **Exponentielle** |
| Position d'arrivée aléatoire sur un cercle de 360° | **Uniforme** |
| Note moyenne de 200 copies notées sur 20 | **Normale (TCL)** |
| Nombre de carrelages cassés dans une livraison de 50 | **Binomiale** |

*Débrief : on profite du tri pour repointer les 6 lois "à reconnaître" et leurs signatures distinctives. Si une erreur revient souvent (typiquement Géométrique ↔ Binomiale, ou Exponentielle ↔ Normale), insister.*

---

## Synthèse projetée après le Wooclap

À projeter à l'écran à la fin du bloc, pendant que les étudiants complètent l'arbre dans leur poly à trous.

```
┌─── ÉVÉNEMENTS ?  →  arbre / proba totales / Bayes / indépendance
│
DE QUOI ─┤
PARLE   │              ┌─ comptage parmi n essais indép.  →  BINOMIALE
L'ÉNONCÉ?│   ┌─ DISCRÈTE ─┤─ rang du 1er succès             →  GÉOMÉTRIQUE
│        │   │            └─ comptage rare sur durée/zone  →  POISSON
└── V.A. ┤
         │              ┌─ tirage uniforme dans intervalle →  UNIFORME
         └─ CONTINUE ───┤─ durée sans mémoire              →  EXPONENTIELLE
                        └─ mesure / moyenne d'échantillon  →  NORMALE (TCL)

PUIS, QUE DEMANDE-T-ON ?
  • Une probabilité          →  calcul direct (densité, table normale, formule de loi)
  • Une espérance / variance →  formules par cœur
  • Estimer un paramètre     →  IC :  X̄ ± t·σ/√n  ou  p̂ ± t·√(p̂(1-p̂)/n)
  • Vérifier une annonce     →  TEST :  Z = (X̄ - μ₀)/(σ/√n)
       - écart dans les deux sens  →  bilatéral   (rejet si |Z| > 1,96)
       - seul un côté est suspect  →  unilatéral  (rejet si Z dépasse ±1,645)
  • Taille d'échantillon     →  inverser la formule de l'IC
```

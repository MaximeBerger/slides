# Plan de séance — CM2

## Cadre général

Ce document propose une trame détaillée pour le deuxième cours magistral d'analyse numérique, en prolongement direct du CM1.

L'idée directrice : montrer que la discrétisation n'est pas propre à Euler ni aux problèmes en temps, mais constitue une démarche générale applicable dès qu'un phénomène se déploie aussi dans l'espace. On découvre au passage que le choix du schéma de discrétisation n'est pas anodin : un mauvais choix peut produire des résultats physiquement absurdes.

Trois idées structurantes guident la séance :

1. Une dérivée peut être remplacée par une différence, en espace comme en temps.
2. Combiner Euler (temps) et différences finies (espace) donne un schéma de calcul complet pour une EDP.
3. Le choix du schéma compte : stabilité et convergence ne sont pas automatiques.

## Fil directeur pédagogique

Le fil rouge du CM2 est le **transport d'un colorant dans un canal**. On verse un traceur dans un courant d'eau ; il est emporté par le courant. Comment la tache de colorant évolue-t-elle ?

Cet exemple prolonge naturellement le café du CM1 :

- au CM1, la température dépendait du temps seul ($T(t)$) ;
- ici, la concentration dépend de l'espace et du temps ($u(x,t)$) : c'est une **EDP**.

Ce choix permet de :

- passer naturellement de l'EDO à l'EDP sans saut conceptuel brutal ;
- obtenir l'équation directement à partir de l'intuition physique (« le colorant se translate »), sans bilan de tranche ni loi physique nouvelle ;
- montrer que la même idée (Euler + différences finies) s'applique à un problème à deux variables ;
- créer un moment marquant en cours : le même problème, discrétisé différemment, donne des résultats radicalement différents (oscillations parasites vs. translation correcte) ;
- préparer les notions de stabilité et de condition CFL sur un exemple concret.

La progression du cours suit le schéma suivant :

1. Réactiver les acquis du CM1 par des questions.
2. Généraliser l'idée de discrétisation : des différences finies en espace.
3. Partir d'une situation physique simple, en faire émerger l'EDP, puis construire un schéma de calcul complet.
4. Confronter deux schémas sur le même problème pour faire apparaître la notion de stabilité.
5. Poser les premières notions de fiabilité : convergence, stabilité, coût.

## CM2 — Différences finies, stabilité et convergence

### Informations générales

- Durée : `1h30`
- Date : `19 mars 2026` (deux jours après le CM1)
- Position dans la progression : prolongement direct du CM1, dernière séance avant le TP1
- Objectif principal : montrer que la discrétisation s'étend à l'espace, que le choix du schéma n'est pas anodin, et qu'elle peut conduire à des systèmes linéaires

### Objectifs pédagogiques

À l'issue du cours, les étudiants doivent être capables de :

- comprendre qu'une dérivée peut être approximée par un quotient de différences, en espace comme en temps ;
- écrire les formules de différences finies progressives, rétrogrades et centrées pour la dérivée première ;
- obtenir une EDP de transport à partir de l'intuition « le colorant se translate à vitesse $c$ » et d'un développement de Taylor ;
- combiner Euler (temps) et différences finies (espace) pour construire un schéma numérique complet ;
- constater qu'un choix de schéma inapproprié produit des résultats physiquement absurdes (oscillations, concentrations négatives) ;
- comprendre les idées de stabilité et de convergence à un niveau introductif ;
- savoir qu'un schéma implicite conduit à un système linéaire à résoudre à chaque pas de temps.

### Exemple directeur : transport d'un colorant dans un canal

On considère un canal rectiligne dans lequel l'eau s'écoule à vitesse constante $c$. On verse un colorant (ou un traceur) en un endroit du canal. La concentration $u(x,t)$ du colorant évolue dans l'espace et dans le temps.

Comme au CM1 avec le café, on ne donne pas l'équation directement : on la fait construire par les étudiants à partir de l'intuition physique. Le cheminement est plus court et plus direct que pour le café : pas de bilan de tranche, pas de loi de Fourier — seulement « le colorant se déplace à vitesse $c$ » et un développement de Taylor.

##### Étape 1 — Intuition avant le calcul

Première question à poser, avant toute formule :

> « On verse un colorant dans un canal. Le courant l'emporte. À quoi ressemble la tache de colorant 10 secondes plus tard ? »

Les étudiants doivent proposer un croquis : la tache s'est déplacée vers l'aval, à la vitesse du courant. Sa forme est à peu près la même, juste translatée. Cette étape ancre l'intuition physique : le colorant est emporté par le courant.

Questions complémentaires :

- « La tache change-t-elle de forme, ou se déplace-t-elle simplement ? »
  Réponse attendue : en première approximation, elle se translate sans déformation (on néglige la diffusion moléculaire et le mélange turbulent).

- « À quelle vitesse se déplace-t-elle ? »
  Réponse : à la vitesse du courant $c$.

##### Étape 2 — De l'intuition à l'équation

C'est le moment clé. Contrairement au café (où il fallait un bilan d'énergie), ici l'équation sort directement de l'intuition physique en trois questions.

**Question 1 :** « La tache en $x_0$ à $t = 0$ se retrouve où à $t = \Delta t$ ? »

Réponse : en $x_0 + c\,\Delta t$. Elle a avancé de $c\,\Delta t$ vers l'aval.

**Question 2 :** « Maintenant, postons-nous en un point fixe $x$ du canal. Ce qu'on y observe à $t + \Delta t$, ça vient d'où ? »

Réponse : ça vient du point $x - c\,\Delta t$, situé en amont. C'est le même raisonnement, mais retourné : au lieu de suivre la tache, on attend à un endroit fixe et on se demande ce qui arrive.

**Question 3 :** « Comment écrire ça mathématiquement ? »

Réponse :

$$
u(x,\; t + \Delta t) = u(x - c\,\Delta t,\; t).
$$

C'est tout. Le colorant se déplace à vitesse $c$, donc la concentration en $x$ à l'instant suivant est celle qui se trouvait en $x - c\,\Delta t$ à l'instant précédent.

**Obtenir l'EDP.** On développe chaque côté au premier ordre (Taylor) :

- à gauche : $u(x,\,t + \Delta t) \approx u + \Delta t\,\dfrac{\partial u}{\partial t}$ ;
- à droite : $u(x - c\,\Delta t,\,t) \approx u - c\,\Delta t\,\dfrac{\partial u}{\partial x}$ (le signe $-$ vient de ce qu'on recule de $c\,\Delta t$ vers l'amont).

En égalant et en simplifiant $u$ :

$$
\Delta t\,\frac{\partial u}{\partial t} = -c\,\Delta t\,\frac{\partial u}{\partial x} \qquad \Longrightarrow \qquad \frac{\partial u}{\partial t} + c\,\frac{\partial u}{\partial x} = 0.
$$

Faire remarquer :

- Le développement de Taylor utilise exactement les quotients de différences vus en section 2 — le lien est immédiat.
- L'équation dit simplement : la concentration en un point change parce que le courant apporte du colorant depuis l'amont.
- C'est une EDP : deux variables indépendantes ($x$ et $t$), deux dérivées partielles.
- Aucune loi physique complexe n'a été mobilisée — seulement « le colorant se déplace à vitesse $c$ ».

##### Parallèle avec le CM1

Le cheminement pédagogique est volontairement parallèle à celui du café :

| | CM1 (café) | CM2 (colorant) |
|--|------------|----------------|
| Situation | Café trop chaud | Colorant dans un courant |
| Question | « Quand peut-on le boire ? » | « Où va le colorant ? » |
| Grandeur | $T(t)$ — une variable | $u(x,t)$ — deux variables |
| Type | EDO | EDP |
| Raisonnement | Bilan d'énergie | « Le colorant se déplace à vitesse $c$ » |
| Équation | $\frac{dT}{dt} = -k(T - T_{\mathrm{amb}})$ | $\frac{\partial u}{\partial t} + c\,\frac{\partial u}{\partial x} = 0$ |
| Discrétisation | Euler en temps | Euler en temps + diff. finies en espace |

Les étudiants doivent sentir que c'est la même démarche (situation → intuition physique → équation → discrétisation) appliquée à un problème plus riche.

##### Solution exacte

La solution exacte de l'équation de transport est une translation pure :

$$
u(x,t) = u_0(x - ct),
$$

où $u_0$ est le profil initial. Le colorant se déplace à vitesse $c$ sans se déformer. Cette solution servira de référence pour vérifier les résultats numériques.

### Déroulé proposé

| Partie | Contenu | Durée |
|--------|---------|-------|
| 1 | Rappel actif du CM1 | 10 min |
| 2 | Des taux de variation aux différences finies | 14 min |
| 3 | Exemple central : du colorant au schéma numérique | 35 min |
| 4 | Stabilité et convergence : premières intuitions | 12 min |
| 5 | Bilan et ouverture | 6 min |
| | **Total** | **1h17** |

Treize minutes de marge sont prévues pour absorber les éventuels débordements liés aux interactions. La section 3, cœur du CM, dispose du temps le plus long.

---

#### 1. Rappel actif du CM1 — 10 min

Objectif : réengager les étudiants sans résumé magistral. On leur demande de reconstruire les idées du CM1 par eux-mêmes. Ce rappel actif est d'autant plus important que le CM2 a lieu seulement deux jours après le CM1 : les idées sont encore fraîches mais pas encore consolidées.

##### Questions à poser

Trois questions, posées une par une au rythme d'environ 2 minutes par question (réflexion + réponse orale) :

- « Qu'a-t-on remplacé dans la méthode d'Euler ? »
  Réponse attendue : la dérivée par un quotient de différences, le continu par le discret.

- « Pourquoi faut-il choisir un pas ? »
  Réponse attendue : le pas contrôle la précision ; plus il est petit, meilleur est le résultat, mais plus le calcul est long.

- « Qu'est-ce qui peut rendre une approximation peu fiable ? »
  Réponse attendue : un pas trop grand (résultat absurde), les erreurs d'arrondi, un modèle trop simplifié.

##### Interaction

- Poser chaque question à l'oral, laisser 20–30 secondes de silence pour la réflexion individuelle.
- Demander une réponse à un étudiant volontaire ou désigné.
- Noter éventuellement au tableau trois mots-clés : **discrétisation**, **erreur**, **pas**.

##### Transition

Une fois le rappel terminé, poser la question de transition :

> « Au CM1, on a discrétisé le temps pour suivre l'évolution d'un café. Mais dans la vie réelle, les phénomènes se déploient aussi dans l'espace. Peut-on appliquer la même idée ? »

Ne pas attendre de réponse développée ; laisser la question en suspens et annoncer que le CM2 va y répondre.

---

#### 2. Des taux de variation aux différences finies — 14 min

Objectif : montrer que l'idée de remplacer une dérivée par un quotient de différences est une technique générale, applicable en espace comme en temps, et pas seulement dans le cadre d'Euler.

##### Étape 1 — Relier Euler aux différences finies (4 min)

Commencer par un rappel explicite : au CM1, pour construire le schéma d'Euler, on a écrit

$$
\frac{dT}{dt} \approx \frac{T_{n+1} - T_n}{\Delta t}.
$$

Nommer cette opération : c'est une **différence finie**. Faire remarquer que rien dans cette idée n'est spécifique au temps : on peut faire la même chose en espace, avec une fonction $u(x)$ connue seulement en certains points.

##### Étape 2 — Faire émerger les formules de la dérivée première (8 min)

Poser la situation : une fonction $u$ n'est connue qu'en des points régulièrement espacés $x_{i-1}$, $x_i$, $x_{i+1}$, avec un pas $h$.

Questions à faire émerger, posées progressivement :

- « Si on ne connaît $u$ qu'en $x_i$ et $x_{i+1}$, comment approximer la pente en $x_i$ ? »
  Réponse attendue : $\frac{u_{i+1} - u_i}{h}$ (différence progressive).

- « Et si on utilisait plutôt $x_{i-1}$ et $x_i$ ? »
  Réponse attendue : $\frac{u_i - u_{i-1}}{h}$ (différence rétrograde).

- « Et si on utilisait les deux voisins $x_{i-1}$ et $x_{i+1}$ ? »
  Réponse attendue : $\frac{u_{i+1} - u_{i-1}}{2h}$ (différence centrée).

Interaction :

- Laisser les étudiants proposer les formules avant de les écrire au tableau.
- Si personne ne propose la différence centrée, la faire apparaître comme la moyenne des deux premières.
- Faire remarquer que ce sont des approximations, pas des égalités : la dérivée exacte correspondrait au passage à la limite $h \to 0$.

Erreur prévisible : certains étudiants pourraient proposer $(u_{i+1} - u_{i-1})/h$ au lieu de $/(2h)$. Faire vérifier sur un dessin ou en comptant l'écart entre $x_{i-1}$ et $x_{i+1}$, qui vaut $2h$.

##### Étape 3 — Croquis (2 min)

Faire un dessin au tableau :

- Tracer une courbe $u(x)$ avec quelques points marqués $x_{i-1}$, $x_i$, $x_{i+1}$.
- Illustrer la différence progressive (pente de la sécante à droite), la différence rétrograde (sécante à gauche), la différence centrée (sécante symétrique).
- Faire remarquer que la centrée passe « de part et d'autre » du point, tandis que les deux autres n'utilisent l'information que d'un seul côté.

---

#### 3. Exemple central : du colorant au schéma numérique — 35 min

Objectif : montrer, sur un exemple concret, comment on passe d'une situation physique à une EDP, puis à un schéma de calcul complet combinant Euler (temps) et différences finies (espace). C'est le moment central du CM2. Comme au CM1 avec le café, on part de la situation physique et on fait construire le modèle par les étudiants.

##### a. Accroche (3 min)

Présenter le problème sous forme de question concrète :

> « Un canal d'irrigation rectiligne ; l'eau y coule à vitesse constante. On verse un colorant à un endroit du canal. Que se passe-t-il ? »

**Intuition d'abord.** Avant toute formule :

- « Faites un croquis du profil de concentration 10 secondes plus tard. »
  Laisser 30 secondes de réflexion, puis demander une proposition orale.
  Réponse attendue : la tache de colorant s'est déplacée vers l'aval, à la vitesse du courant, en gardant à peu près sa forme.

- « À quelle vitesse se déplace la tache ? »
  Réponse : à la vitesse $c$ du courant.

Ce croquis servira de référence pour vérifier les résultats numériques à la fin de la section.

##### b. De l'intuition à l'EDP (5 min)

On enchaîne directement à partir du croquis de l'accroche, en trois questions.

**Question 1 :** « La tache en $x_0$ à $t = 0$ se retrouve où à $t = \Delta t$ ? »

Réponse attendue : en $x_0 + c\,\Delta t$. Elle a avancé de $c\,\Delta t$ vers l'aval. Tout le monde est d'accord.

**Question 2 :** « Maintenant, postons-nous en un point fixe $x$ du canal. Ce qu'on y observe à $t + \Delta t$, ça vient d'où ? »

Guider les étudiants vers la réponse : ça vient du point $x - c\,\Delta t$, situé en amont. C'est le même raisonnement retourné : au lieu de suivre la tache, on attend à un endroit fixe et on se demande ce qui arrive.

**Question 3 :** « Comment écrire ça mathématiquement ? »

Faire écrire ensemble :

$$
u(x,\; t + \Delta t) = u(x - c\,\Delta t,\; t).
$$

Le colorant se déplace à vitesse $c$, donc la concentration en $x$ à l'instant suivant est celle qui se trouvait en $x - c\,\Delta t$ à l'instant précédent.

**Obtenir l'EDP.** On développe chaque côté au premier ordre (Taylor, en faisant le lien avec les quotients de différences de la section 2) :

- à gauche : $u(x,\,t + \Delta t) \approx u + \Delta t\,\frac{\partial u}{\partial t}$ ;
- à droite : $u(x - c\,\Delta t,\,t) \approx u - c\,\Delta t\,\frac{\partial u}{\partial x}$ (le signe $-$ vient de ce qu'on recule de $c\,\Delta t$ vers l'amont).

En égalant et en simplifiant $u$ des deux côtés :

$$
\frac{\partial u}{\partial t} + c\,\frac{\partial u}{\partial x} = 0.
$$

Faire le lien explicite avec le CM1 : au CM1, on avait un bilan d'énergie sur le café qui donnait une EDO ; ici, l'intuition « le colorant se translate à vitesse $c$ » donne une EDP. La démarche est la même : situation physique → raisonnement → équation.

Interaction : réponses orales. La question 2 (retourner le point de vue) est le passage le plus délicat. Si les étudiants sont bloqués, proposer un exemple concret : « Si le courant va à 2 m/s et que j'attends 3 secondes, le colorant que je vois arriver a parcouru 6 m : il vient donc d'un point situé 6 m en amont. »

##### c. Maillage espace-temps (3 min)

Dessiner au tableau une grille à deux dimensions :

- En espace : des nœuds $x_0, x_1, \ldots, x_M$ avec un pas $\Delta x$.
- En temps : des instants $t^0, t^1, \ldots, t^N$ avec un pas $\Delta t$.
- Chaque point de la grille porte une valeur approchée $u_i^n \approx u(x_i, t^n)$.

Questions :

- « On a deux directions : l'espace et le temps. Comment les discrétiser ? »
  Réponse : découper l'espace en morceaux (pas $\Delta x$) et le temps en pas (pas $\Delta t$).

- « Au CM1, on avançait pas à pas en temps. Ici, qu'est-ce qui change ? »
  Réponse : à chaque pas de temps, on a toute une ligne de valeurs en espace à calculer.

Dessiner la grille $(x_i, t^n)$ et indiquer que l'on connaît la ligne $n = 0$ (condition initiale : le profil de colorant au départ) et que l'on cherche à calculer les lignes $n = 1, 2, \ldots$ successivement.

##### d. Construction du schéma explicite décentré amont (10 min)

Demander à la classe de combiner les outils du CM1 et de la section 2 pour discrétiser l'EDP.

Questions posées progressivement :

- « Comment approcher $\frac{\partial u}{\partial t}$ au point $(x_i, t^n)$ ? »
  Réponse : par Euler (CM1) → $\frac{u_i^{n+1} - u_i^n}{\Delta t}$.

- « Comment approcher $\frac{\partial u}{\partial x}$ au même point ? On a trois choix (section 2). Lequel prendre ? »
  Laisser les étudiants réfléchir. Guider vers la différence rétrograde : « D'où vient le colorant ? De l'amont, c'est-à-dire de la gauche. Il est naturel d'utiliser l'information qui vient de l'amont. »
  $\frac{u_i^n - u_{i-1}^n}{\Delta x}$.

- « En combinant les deux, qu'obtient-on ? »

Faire écrire :

$$
\frac{u_i^{n+1} - u_i^n}{\Delta t} + c\,\frac{u_i^n - u_{i-1}^n}{\Delta x} = 0.
$$

Isoler $u_i^{n+1}$ :

$$
u_i^{n+1} = u_i^n - r\,(u_i^n - u_{i-1}^n), \qquad r = \frac{c\,\Delta t}{\Delta x}.
$$

Faire remarquer :

- Cette formule ressemble beaucoup à Euler : on part de la valeur actuelle et on ajoute une correction.
- Le paramètre $r$ combine le pas de temps et le pas d'espace. Il joue un rôle central.
- La formule n'utilise que des valeurs au temps $n$ : on peut calculer toute la ligne $n+1$ directement. C'est un schéma **explicite**.

**Activité à la main (5 min dans les 10 min).** Fixer les données numériques :

- Canal de longueur $14$ m, vitesse du courant $c = 2\;\mathrm{m/s}$.
- $\Delta x = 2$ m, 8 nœuds ($x_0 = 0,\, x_1 = 2,\, \ldots,\, x_7 = 14$).
- $\Delta t = 0{,}5$ s, donc $r = \frac{2 \times 0{,}5}{2} = 0{,}5$.
- Condition initiale : concentration uniforme $u = 1\;\mathrm{g/L}$ entre $x = 4$ m et $x = 6$ m, nulle ailleurs.

$$
u^0 = (0,\; 0,\; 1,\; 1,\; 0,\; 0,\; 0,\; 0).
$$

Demander aux étudiants de calculer $u^1$ et $u^2$ (deux pas de temps). La formule se simplifie en $u_i^{n+1} = 0{,}5\,u_i^n + 0{,}5\,u_{i-1}^n$ : la moyenne de la valeur sur place et de la valeur en amont.

Interaction :

- Laisser 2 à 3 minutes de travail individuel ou en binôme.
- Circuler dans les rangs si l'amphi le permet, sinon demander l'avancement à voix haute.
- Mettre en commun en demandant les résultats nœud par nœud.

Résultat attendu :

| $n$ | $t$ (s) | $u_0$ | $u_1$ | $u_2$ | $u_3$ | $u_4$ | $u_5$ | $u_6$ | $u_7$ |
|-----|---------|-------|-------|-------|-------|-------|-------|-------|-------|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 1 | 0,5 | 0 | 0 | 0,5 | 1 | 0,5 | 0 | 0 | 0 |
| 2 | 1,0 | 0 | 0 | 0,25 | 0,75 | 0,75 | 0,25 | 0 | 0 |

Faire observer :

- La tache de colorant s'est déplacée vers la droite : le schéma capte bien le transport.
- La tache s'est un peu étalée : c'est la **diffusion numérique**, un artefact du schéma (le transport exact ne déforme pas le profil).
- La solution exacte à $t = 1$ s serait $u = (0,\, 0,\, 0,\, 1,\, 1,\, 0,\, 0,\, 0)$ (translation pure de $c \times 1 = 2$ m vers la droite). Le schéma diffuse parce que $r \neq 1$.

##### e. Et si on prend les différences centrées ? (5 min)

C'est le **moment clé** du CM2. Poser la question :

> « On a choisi la différence rétrograde pour approcher $\frac{\partial u}{\partial x}$. Que se passe-t-il si on prend la différence centrée, qui semblait pourtant plus symétrique et plus naturelle ? »

Écrire le schéma centré :

$$
u_i^{n+1} = u_i^n - \frac{r}{2}\,(u_{i+1}^n - u_{i-1}^n).
$$

Calculer $u^1$ à partir de la même condition initiale (le faire au tableau, pas en activité) :

| $i$ | $x_i$ (m) | $u_i^0$ | Calcul | $u_i^1$ |
|-----|-----------|---------|--------|---------|
| 0 | 0 | 0 | (bord) | 0 |
| 1 | 2 | 0 | $0 - 0{,}25 \times (1 - 0)$ | $-0{,}25$ |
| 2 | 4 | 1 | $1 - 0{,}25 \times (1 - 0)$ | $0{,}75$ |
| 3 | 6 | 1 | $1 - 0{,}25 \times (0 - 1)$ | $1{,}25$ |
| 4 | 8 | 0 | $0 - 0{,}25 \times (0 - 1)$ | $0{,}25$ |
| 5 | 10 | 0 | | 0 |
| 6 | 12 | 0 | | 0 |
| 7 | 14 | 0 | | 0 |

Laisser un silence, puis demander :

- « Une concentration de $-0{,}25\;\mathrm{g/L}$, c'est physiquement possible ? »
  Réponse : non, une concentration est toujours positive ou nulle.

- « Une concentration de $1{,}25$ alors que le maximum initial était $1$ ? »
  Réponse : non plus, le transport ne crée pas de colorant — il le déplace.

Faire remarquer : après **un seul pas de temps**, le schéma centré produit des valeurs physiquement impossibles. C'est le signe d'une **instabilité**. Si l'on continuait, les oscillations grandiraient et la solution deviendrait complètement aberrante.

Ce moment est important : il montre que deux schémas parfaitement raisonnables en apparence (l'un utilise la pente à gauche, l'autre la pente symétrique) donnent des résultats radicalement différents. Le choix du schéma de discrétisation n'est pas un détail technique — c'est une question fondamentale.

##### f. Vers le schéma implicite et le système linéaire (5 min)

Poser la question :

> « Dans le schéma explicite, on utilisait les valeurs au temps $n$ pour calculer celles au temps $n+1$. Que se passe-t-il si on évalue le terme d'espace au temps $n+1$ ? »

Écrire :

$$
\frac{u_i^{n+1} - u_i^n}{\Delta t} + c\,\frac{u_i^{n+1} - u_{i-1}^{n+1}}{\Delta x} = 0.
$$

Réorganiser :

$$
(1 + r)\,u_i^{n+1} - r\,u_{i-1}^{n+1} = u_i^n.
$$

Question : « Peut-on calculer $u_i^{n+1}$ directement, comme avant ? »

Réponse : non, car $u_i^{n+1}$ dépend de $u_{i-1}^{n+1}$, qui est aussi une inconnue. Les inconnues au temps $n+1$ sont **couplées** entre elles.

Écrire le système pour 4 nœuds intérieurs et montrer la matrice :

$$
\begin{pmatrix}
1+r & 0 & 0 & 0 \\
-r & 1+r & 0 & 0 \\
0 & -r & 1+r & 0 \\
0 & 0 & -r & 1+r
\end{pmatrix}
\begin{pmatrix} u_1^{n+1} \\ u_2^{n+1} \\ u_3^{n+1} \\ u_4^{n+1} \end{pmatrix}
=
\begin{pmatrix} u_1^n + r\,u_0^{n+1} \\ u_2^n \\ u_3^n \\ u_4^n \end{pmatrix}.
$$

Faire observer :

- La discrétisation implicite produit un **système linéaire** à résoudre à chaque pas de temps.
- La matrice est bidiagonale (deux diagonales non nulles) : sa structure vient du stencil à deux points du schéma décentré.
- On verra en fin de séance que pour des problèmes faisant intervenir la dérivée seconde (diffusion, flexion), la matrice devient **tridiagonale**.

L'objectif ici n'est pas de résoudre le système (c'est l'objet du TD2) mais de montrer que la discrétisation peut **produire** un système linéaire.

##### g. Vérification et discussion (4 min)

Rappeler la solution exacte : $u(x,t) = u_0(x - ct)$, translation pure à vitesse $c$.

Faire vérifier sur l'activité : à $t = 1$ s, le colorant devrait s'être déplacé de $c \times 1 = 2$ m vers la droite. La solution exacte est donc $(0,\, 0,\, 0,\, 1,\, 1,\, 0,\, 0,\, 0)$.

Comparer avec les deux schémas :

| Schéma | Résultat à $t = 1$ s | Défaut | Gravité |
|--------|---------------------|--------|---------|
| Décentré amont | $(0,\, 0,\, 0{,}25,\, 0{,}75,\, 0{,}75,\, 0{,}25,\, 0,\, 0)$ | Diffusion numérique (étalement) | Bénin : la solution reste physiquement raisonnable |
| Centré explicite | $(-0{,}25$ après un seul pas) | Oscillations, valeurs négatives | Grave : la solution est physiquement absurde |
| Solution exacte | $(0,\, 0,\, 0,\, 1,\, 1,\, 0,\, 0,\, 0)$ | — | — |

---

#### 4. Stabilité et convergence : premières intuitions — 12 min

Objectif : donner une première intuition de deux notions fondamentales sans entrer dans le formalisme. Les étudiants doivent repartir avec une idée claire de ce que signifient « convergence » et « stabilité », illustrées par des exemples concrets.

##### Convergence (3 min)

Poser la question sous forme encadrée :

> « Quand on raffine le maillage (plus de nœuds, pas plus petits), la solution numérique se rapproche-t-elle de la solution exacte ? »

Réponse : si oui, la méthode est **convergente**.

Illustrer : pour le schéma décentré amont avec $r = 0{,}5$, si on double le nombre de nœuds (et qu'on adapte $\Delta t$ pour garder $r$ constant), la diffusion numérique diminue et le profil se rapproche de la translation exacte. En faisant tendre $\Delta x$ et $\Delta t$ vers zéro, on retrouverait la solution exacte.

Rappeler le CM1 : on avait déjà observé que diminuer $\Delta t$ améliorait l'approximation sur le café. C'est le même principe, avec deux pas à contrôler au lieu d'un.

##### Stabilité (5 min)

Poser la question :

> « Les petites erreurs de calcul restent-elles sous contrôle, ou explosent-elles ? »

Réponse : si les erreurs restent bornées, la méthode est **stable** ; sinon, elle est instable.

Illustrer par trois exemples, du plus ancien au plus récent :

1. **CM1, café** : avec $\Delta t = 15$ min, Euler donne $T_1 = -15\;\degC$. L'erreur a explosé : instabilité.

2. **Schéma centré** (section 3e) : après un seul pas, la concentration est négative. L'erreur grandit à chaque pas : instabilité.

3. **Schéma décentré amont** (section 3d) : la solution reste physiquement raisonnable, mais seulement si $r \leq 1$. Si on prend $r > 1$ (pas de temps trop grand par rapport au pas d'espace), le schéma explose aussi.

La **condition CFL** ($r \leq 1$ pour le schéma décentré amont) exprime un équilibre nécessaire entre le pas de temps et le pas d'espace. Ce n'est pas seulement « un pas petit suffit » : c'est un **rapport** entre les deux pas qui doit être respecté.

Interaction : « Que se passe-t-il si on raffine l'espace (plus de nœuds) sans adapter le temps ? » Réponse : $\Delta x$ diminue, donc $r = c\,\Delta t / \Delta x$ augmente et le schéma peut devenir instable. Il faut diminuer $\Delta t$ en même temps.

##### Compromis précision / coût (2 min)

Résumer rapidement : raffiner le maillage améliore la précision mais augmente le coût.

Mentionner les ordres de grandeur :

- Doubler le nombre de nœuds en espace ET diviser le pas de temps par 2 (pour garder $r$ constant) → 4 fois plus de calculs.
- En 2D, le coût explose encore plus vite.

Question rapide : « En ingénierie, choisirait-on toujours le maillage le plus fin possible ? »

Réponse attendue : non, c'est un compromis. En conception préliminaire, un calcul grossier suffit. En dimensionnement final, on raffine.

Interaction : vote rapide à main levée ou réponse orale.

##### Point d'attention

Cette section est volontairement courte (12 min). L'objectif est de planter les mots et les intuitions. Le formalisme (ordre de convergence, condition CFL exacte, théorème de Lax) viendra en TD4 et CM3.

---

#### 5. Bilan et ouverture — 6 min

Objectif : stabiliser quatre idées que les étudiants doivent retenir.

Faire formuler par la classe (en demandant « qu'a-t-on vu aujourd'hui ? ») puis institutionnaliser :

1. Les **différences finies** généralisent l'idée d'Euler : on remplace des dérivées par des quotients de différences, en espace comme en temps.
2. En combinant Euler (temps) et différences finies (espace), on obtient un **schéma numérique complet** pour une EDP.
3. Le **choix du schéma compte** : deux discrétisations d'apparence similaire peuvent donner des résultats radicalement différents (diffusion numérique vs. oscillations).
4. La fiabilité d'un calcul repose sur la **convergence**, la **stabilité** et un **compromis entre précision et coût**. Un schéma implicite produit un système linéaire mais peut être plus stable.

##### Ouverture : et la dérivée seconde ?

Terminer par une question ouverte :

> « Aujourd'hui, on a approché la dérivée première. Mais certains problèmes (diffusion de chaleur, flexion d'une poutre) font intervenir la dérivée seconde. Comment l'approcher ? »

Laisser les étudiants réfléchir 15 secondes. Si personne ne propose, donner la formule :

$$
u''(x_i) \approx \frac{u_{i+1} - 2u_i + u_{i-1}}{h^2}.
$$

Faire remarquer que ce stencil utilise **trois points** voisins (au lieu de deux pour la dérivée première). Conséquence : la matrice du système linéaire devient **tridiagonale** — c'est ce qu'on verra en TD2.

Ne pas développer davantage : c'est une ouverture, pas un contenu du CM2. Au TP1, on codera les schémas de transport en Python. En TD2, on apprendra à résoudre les systèmes linéaires tridiagonaux.

---

## Articulation avec le CM1

L'enchaînement entre les deux CM :

- **CM1** installe le besoin d'approximer et construit un premier schéma numérique sur une EDO (Euler, café). Les étudiants comprennent l'idée de discrétisation, d'erreur, et de compromis pas/précision.
- **CM2** généralise cette logique à une EDP : on discrétise aussi l'espace, on combine Euler et différences finies, et on découvre que le choix du schéma n'est pas anodin (stabilité).

Le lien concret entre les deux séances :

| Élément | CM1 | CM2 |
|---------|-----|-----|
| Problème | EDO en temps | EDP en espace et temps |
| Exemple | Café qui refroidit | Colorant dans un canal |
| Raisonnement | Bilan d'énergie | « Le colorant se translate à vitesse $c$ » |
| Équation | $\frac{dT}{dt} = -k(T - T_\mathrm{amb})$ | $\frac{\partial u}{\partial t} + c\,\frac{\partial u}{\partial x} = 0$ |
| Discrétisation | Euler en temps | Euler + diff. finies en espace |
| Résultat | Suite $T_0, T_1, \ldots$ | Grille $u_i^n$ |
| Notion de qualité | Influence du pas $\Delta t$ | Stabilité, convergence, condition CFL |

Les étudiants doivent comprendre que l'analyse numérique n'est pas une juxtaposition de recettes, mais une même démarche appliquée à plusieurs types de problèmes.

## Articulation avec la suite du module

- **TP1** (24 ou 31 mars) : les étudiants codent Euler en Python sur le café et le pendule. Le transport pourrait être proposé en exercice complémentaire. Le TP mobilise le CM1 et le vocabulaire du CM2 (stabilité, convergence).
- **TD1** (1er ou 2 avril) : interpolation et intégration numérique. Nouveau contexte, même logique d'approximation.
- **TD2** (3 ou 7 avril) : pivot de Gauss, factorisation LU, systèmes linéaires. Les étudiants apprennent à résoudre les systèmes issus des schémas implicites vus au CM2 et ceux provenant de la discrétisation de problèmes du second ordre.
- **TD4** et **CM3** : formalisation des notions de convergence, stabilité, condition CFL, comparaison de schémas.

## Formats d'interactivité à privilégier

Le CM2 est court (1h30) et dense. L'interactivité doit être ciblée et rapide :

- **Questions orales directes** : poser une question, laisser 20–30 secondes, demander une réponse. C'est le format dominant dans ce CM.
- **Micro-activité en binôme** (section 3d) : 2–3 minutes pour calculer deux pas de temps du schéma décentré amont. C'est le seul moment de travail écrit individuel du CM.
- **Construction collective au tableau** : faire émerger l'EDP par le raisonnement intuitif, construire le schéma, et comparer les résultats.
- **Moment de surprise** (section 3e) : le schéma centré produit des concentrations négatives — laisser les étudiants réagir avant de formaliser.
- **Questions de transition** : chaque section commence par une question qui relie au contenu précédent.

Le principe est de ne jamais passer plus de 5 minutes sans poser une question ou demander une contribution.

## Points de vigilance pédagogique

### Risque principal : la densité

Le CM2 couvre beaucoup de terrain en peu de temps. Le risque est de basculer dans un cours magistral classique si le timing dérape. Trois garde-fous :

1. **Ne pas développer ce qui n'est pas nécessaire.** Le schéma implicite (section 3f) est une ouverture, pas un développement complet. Il ne faut pas se laisser entraîner dans la résolution du système ni dans la comparaison détaillée explicite/implicite.
2. **Ne pas anticiper le TD2.** La résolution du système linéaire (pivot de Gauss, LU) n'est pas l'objet du CM2. On montre que la discrétisation *produit* un système, pas comment le *résoudre*.
3. **Ne pas formaliser la stabilité.** Le théorème de Lax, la condition CFL exacte, l'analyse de von Neumann sont pour plus tard. Ici, on donne des intuitions et des exemples.

### Niveau d'abstraction

Le passage de $T(t)$ (une variable) à $u(x,t)$ (deux variables) est un saut conceptuel. Le canal et le colorant atténuent ce saut en donnant un contexte physique immédiat, mais il faut rester vigilant :

- Toujours nommer les grandeurs physiques, pas seulement les variables mathématiques (« la concentration au nœud $i$ à l'instant $n$ »).
- Revenir régulièrement au dessin du canal avec ses nœuds.
- Quand on écrit le schéma, faire le lien avec le canal : chaque calcul correspond à un nœud physique à un instant donné.

### Erreurs prévisibles des étudiants

- Confondre le pas d'espace $\Delta x$ et le pas de temps $\Delta t$.
- Oublier que la différence centrée divise par $2h$ et non par $h$.
- Ne pas voir pourquoi la différence rétrograde est le bon choix pour le transport (notion d'amont).
- Confondre schéma explicite et schéma implicite.
- Croire que le schéma centré, « plus symétrique », est forcément meilleur.

Ces erreurs sont normales et même utiles pédagogiquement : elles montrent que la compréhension est en construction.

### Moment clé à ne pas rater

La comparaison entre le schéma décentré amont et le schéma centré (sections 3d–3e) est **le** moment fort du CM2. Il faut lui laisser le temps de produire son effet :

- Ne pas annoncer à l'avance que le schéma centré va échouer.
- Laisser un silence après l'apparition de la concentration négative.
- Laisser les étudiants réagir avant de formaliser.
- Ce moment doit rester en mémoire comme un exemple concret de l'importance du choix de schéma.

## Suite du travail

Ce plan sert de base pour :

- le poly à trous `CM2.tex` (à réécrire pour s'adapter au nouveau plan) ;
- les figures (profils de concentration à différents instants, grille espace-temps, comparaison des deux schémas) ;
- la date de séance (19 mars 2026) ;
- la préparation du TP1, qui pourra inclure le transport comme exercice complémentaire.

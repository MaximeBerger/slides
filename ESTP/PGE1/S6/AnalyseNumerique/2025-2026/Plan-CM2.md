# Plan de séance — CM2

## Cadre général

Ce document propose une trame détaillée pour le deuxième cours magistral d'analyse numérique, en prolongement direct du CM1.

L'idée directrice : montrer que la discrétisation n'est pas propre à Euler ni aux problèmes en temps, mais constitue une démarche générale qui conduit naturellement à des systèmes linéaires et à des questions de fiabilité.

Trois idées structurantes guident la séance :

1. Une dérivée peut être remplacée par une différence, en espace comme en temps.
2. Discrétiser un problème aux limites produit un système linéaire dont la matrice a une structure particulière.
3. La qualité d'un calcul numérique se juge par sa convergence, sa stabilité et le compromis précision/coût.

## Fil directeur pédagogique

Le fil rouge du CM2 est la **température dans une barre métallique chauffée**. Cet exemple prolonge naturellement le café du CM1 : on reste dans le domaine thermique, mais on passe d'une trajectoire temporelle (EDO) à un profil spatial (problème aux limites), puis à l'équation de la chaleur qui combine les deux.

Ce choix permet de :

- maintenir la continuité thématique avec le CM1 ;
- donner un contexte physique concret aux étudiants d'une école d'ingénieurs ;
- illustrer que les mêmes outils (différences finies) s'appliquent à des problèmes de natures différentes ;
- préparer les applications ultérieures (matrice de rigidité, diffusion thermique) mentionnées dans la progression.

La progression du cours suit le schéma suivant :

1. Réactiver les acquis du CM1 par des questions.
2. Généraliser l'idée de discrétisation : des différences finies en espace.
3. Appliquer sur un problème concret et faire émerger le système linéaire.
4. Montrer que la même démarche s'étend aux problèmes en espace et en temps.
5. Poser les premières notions de fiabilité : convergence, stabilité, coût.

L'objectif n'est pas de formaliser ces notions (ce sera fait en TD4 et CM3), mais de donner des intuitions solides et des exemples concrets auxquels les étudiants pourront se raccrocher.

## CM2 — Différences finies, systèmes linéaires, stabilité et convergence

### Informations générales

- Durée : `1h30`
- Date : `19 mars 2026` (deux jours après le CM1)
- Position dans la progression : prolongement direct du CM1, dernière séance avant le TP1
- Objectif principal : montrer que la discrétisation dépasse le cadre d'Euler et conduit souvent à des systèmes linéaires

### Objectifs pédagogiques

À l'issue du cours, les étudiants doivent être capables de :

- comprendre qu'une dérivée peut être approximée par un quotient de différences, en espace comme en temps ;
- écrire les formules de différences finies pour la dérivée première et la dérivée seconde ;
- relier la discrétisation d'un problème aux limites à l'obtention d'un système linéaire ;
- reconnaître qualitativement une matrice tridiagonale issue d'un maillage 1D et expliquer pourquoi elle est tridiagonale ;
- comprendre les idées de stabilité et de convergence à un niveau introductif ;
- faire le lien entre calcul numérique et interprétation physique du résultat.

### Exemple directeur : la barre métallique chauffée

On considère une barre métallique de longueur $L$, chauffée uniformément par un courant électrique ou une source de chaleur interne, et maintenue à température fixe à ses deux extrémités (par exemple dans un bain de glace).

Comme au CM1 avec le café, on ne donne pas l'équation directement : on la fait construire par les étudiants à partir de la situation physique. Le cheminement est analogue à celui du CM1, mais en espace au lieu du temps.

##### Étape 1 — Intuition avant le calcul

Première question à poser, avant toute formule :

> « Avant tout calcul, à quoi ressemble le profil de température dans la barre ? »

Les étudiants doivent proposer un croquis : la température est nulle aux deux bouts (bains de glace), maximale au milieu (par symétrie), et le profil est lisse et arrondi. Cette étape est importante : elle ancre la physique avant le formalisme.

Questions complémentaires :

- « La barre est-elle plus chaude au milieu ou aux extrémités ? Pourquoi ? »
  Réponse : au milieu, car la chaleur générée au centre doit parcourir le plus de distance pour atteindre les bords froids.

- « Si l'on chauffait deux fois plus fort, la forme du profil changerait-elle ? »
  Réponse : non, seulement l'amplitude (le profil serait deux fois plus chaud partout). Cela suggère une relation linéaire.

##### Étape 2 — Bilan d'énergie sur une tranche

C'est le moment clé, analogue au bilan thermique du café en CM1. On isole une petite tranche de barre entre $x$ et $x + dx$.

Question : « Cette tranche reçoit de la chaleur de trois sources. Lesquelles ? »

Réponse attendue (à faire émerger progressivement) :

1. **Flux de chaleur entrant par la gauche** (conduction depuis la partie gauche de la barre).
2. **Flux de chaleur sortant par la droite** (conduction vers la partie droite).
3. **Chaleur générée à l'intérieur** de la tranche (source de chauffage).

Question : « À l'équilibre, que vaut le bilan total ? »

Réponse : zéro. Toute la chaleur générée dans la tranche est évacuée par conduction vers les bords.

##### Étape 3 — Loi de Fourier et mise en équation

Rappeler (ou faire retrouver) la loi de Fourier : le flux de chaleur par conduction est proportionnel au gradient de température :

$$
\varphi(x) = -\lambda\,\frac{du}{dx}(x) \qquad [\mathrm{W/m^2}].
$$

Le signe négatif traduit le fait que la chaleur va des zones chaudes vers les zones froides.

Le bilan d'énergie sur la tranche $[x,\, x+dx]$ s'écrit :

$$
\underbrace{\varphi(x)\,A}_{\text{flux entrant}} - \underbrace{\varphi(x+dx)\,A}_{\text{flux sortant}} + \underbrace{q\,A\,dx}_{\text{chaleur générée}} = 0,
$$

où $A$ est la section de la barre et $q$ la puissance volumique $[\mathrm{W/m^3}]$.

En divisant par $A\,dx$ et en passant à la limite :

$$
-\frac{d\varphi}{dx} + q = 0 \qquad \Longrightarrow \qquad -\lambda\,\frac{d^2 u}{dx^2} = q.
$$

Avec les conditions aux bords ($u(0) = 0$, $u(L) = 0$), on obtient le problème complet.

##### Étape 4 — Forme adimensionnée

Après adimensionnement ($L = 1$, division par $\lambda$, notation $f = q/\lambda$), on obtient le problème modèle :

$$
-u''(x) = f(x), \qquad x \in {]0,\,1[}, \qquad u(0) = 0, \quad u(1) = 0.
$$

Pour l'activité en classe, on prend $f(x) = 1$ (chauffage uniforme). La solution exacte est alors $u(x) = \frac{x(1-x)}{2}$, un profil parabolique avec un maximum de $\frac{1}{8}$ au centre de la barre — cohérent avec l'intuition du croquis initial.

##### Parallèle avec le CM1

Le cheminement pédagogique est volontairement parallèle à celui du café :

| | CM1 (café) | CM2 (barre) |
|--|------------|-------------|
| Situation | Café trop chaud | Barre chauffée, bouts froids |
| Intuition d'abord | « Comment évolue la température ? » | « À quoi ressemble le profil ? » |
| Bilan physique | $m c_p \frac{dT}{dt} = -h_{\mathrm{eff}} A (T - T_{\mathrm{amb}})$ | $-\lambda u'' = q$ |
| Type de problème | Évolution en temps (EDO) | Profil en espace (problème aux limites) |
| Ce qu'on connaît | Condition initiale $T(0) = T_0$ | Conditions aux bords $u(0) = u(1) = 0$ |
| Ce qu'on cherche | Trajectoire $T(t)$ | Profil $u(x)$ |

Les étudiants doivent sentir que c'est la même démarche (situation → bilan → équation → discrétisation) appliquée à un problème de nature différente.

##### Extension vers l'équation de la chaleur

Si la barre n'est pas encore à l'équilibre, la température $T(x,t)$ vérifie l'équation de la chaleur :

$$
\frac{\partial T}{\partial t} = \alpha\,\frac{\partial^2 T}{\partial x^2}.
$$

Cette équation combine une dérivée en temps (comme le café) et une dérivée en espace (comme le problème stationnaire). Elle sert d'ouverture en section 4.

### Déroulé proposé

| Partie | Contenu | Durée |
|--------|---------|-------|
| 1 | Rappel actif du CM1 | 10 min |
| 2 | Des taux de variation aux différences finies | 20 min |
| 3 | Exemple central : de la physique au système linéaire | 28 min |
| 4 | Ouverture : diffusion de chaleur dans une paroi | 12 min |
| 5 | Stabilité et convergence : premières intuitions | 10 min |
| 6 | Bilan | 5 min |
| | **Total** | **1h25** |

Cinq minutes de marge sont prévues pour absorber les éventuels débordements liés aux interactions. La section 3, qui inclut maintenant la construction du modèle à partir de la physique, est le cœur du CM et dispose du temps le plus long.

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

> « La méthode d'Euler est-elle un cas isolé, ou bien l'exemple d'une idée plus générale ? »

Ne pas attendre de réponse développée ; laisser la question en suspens et annoncer que le CM2 va y répondre. Énoncer la stratégie générale qui sera construite dans la séance :

1. On remplace des objets continus par des objets discrets.
2. On transforme une équation en relations algébriques.
3. On obtient un problème calculable.

---

#### 2. Des taux de variation aux différences finies — 20 min

Objectif : montrer que l'idée de remplacer une dérivée par un quotient de différences est une technique générale, applicable en espace comme en temps, et pas seulement dans le cadre d'Euler.

##### Étape 1 — Relier Euler aux différences finies (5 min)

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

##### Étape 3 — La dérivée seconde (5 min)

Transition : « On sait maintenant approcher la pente. Mais certains problèmes font intervenir la dérivée seconde — la courbure. Comment l'approcher ? »

Écrire au tableau que la dérivée seconde est la dérivée de la dérivée :

$$
u''(x) = \lim_{h \to 0} \frac{u(x+h) - 2u(x) + u(x-h)}{h^2}.
$$

Question : « En supprimant le passage à la limite, quelle formule obtient-on ? »

Réponse attendue :

$$
u''(x_i) \approx \frac{u_{i+1} - 2u_i + u_{i-1}}{h^2}.
$$

Faire remarquer que cette formule fait intervenir trois points voisins : c'est un **stencil à trois points**. Ce vocabulaire sera utile pour comprendre la structure de la matrice en section 3.

Question de vérification : « Pourquoi y a-t-il un $-2u_i$ au milieu ? »

Réponse intuitive : si $u$ est une droite (courbure nulle), les trois points sont alignés et $u_{i+1} - 2u_i + u_{i-1} = 0$. Le $-2$ assure que la formule donne bien zéro pour une fonction sans courbure.

##### Étape 4 — Croquis (2 min)

Faire un dessin au tableau (ou laisser l'espace de croquis dans le poly) :

- Tracer une courbe $u(x)$ avec quelques points marqués $x_{i-1}$, $x_i$, $x_{i+1}$.
- Illustrer la différence progressive (pente de la sécante à droite), la différence rétrograde (sécante à gauche), la différence centrée (sécante symétrique).
- Pour la dérivée seconde : montrer que la formule mesure si la courbe est concave ou convexe.

---

#### 3. Exemple central : de la physique au système linéaire — 28 min

Objectif : montrer, sur un exemple concret, que la discrétisation d'un problème aux limites par différences finies conduit naturellement à un système linéaire. C'est le moment central du CM2. Comme au CM1 avec le café, on part de la situation physique et on fait construire le modèle par les étudiants.

##### Accroche et construction du modèle (7 min)

Présenter le problème sous forme de question concrète :

> « Une barre métallique est chauffée uniformément par un courant électrique. Ses deux extrémités sont maintenues à 0°C dans un bain de glace. Quel est le profil de température à l'équilibre ? »

**Intuition d'abord (2 min).** Avant toute formule, demander :

- « À quoi ressemble le profil de température ? Faites un croquis. »
  Laisser 30 secondes de réflexion individuelle, puis demander une proposition orale.
  Réponse attendue : zéro aux deux bouts, maximum au milieu, profil arrondi et symétrique.

- « Pourquoi le milieu est-il plus chaud ? »
  Réponse : la chaleur générée au centre doit parcourir la plus grande distance pour atteindre les bords froids.

Ce croquis servira de référence pour vérifier la solution numérique à la fin de la section.

**Bilan d'énergie sur une tranche (3 min).** Dessiner au tableau la barre et isoler une petite tranche $[x,\, x+dx]$.

- « Cette tranche reçoit de la chaleur de trois manières. Lesquelles ? »
  Guider vers : flux de conduction entrant par la gauche, flux sortant par la droite, chaleur générée à l'intérieur.

- « À l'équilibre, que vaut le bilan total ? »
  Réponse : zéro. Ce qui est généré doit être évacué par conduction.

Interaction : réponses orales. Si les étudiants sont bloqués, rappeler le bilan du CM1 sur le café ($m c_p \frac{dT}{dt} = \ldots$) et demander quel serait l'analogue en espace et à l'équilibre ($\frac{dT}{dt} = 0$).

**Mise en équation (2 min).** Rappeler la loi de Fourier ($\varphi = -\lambda\,du/dx$) et écrire le bilan :

$$
\varphi(x)\,A - \varphi(x+dx)\,A + q\,A\,dx = 0.
$$

Diviser par $A\,dx$, passer à la limite, et obtenir :

$$
-\lambda\,u''(x) = q.
$$

Après adimensionnement, écrire le problème modèle :

$$
-u''(x) = 1, \qquad x \in {]0,\,1[}, \qquad u(0) = 0, \quad u(1) = 0.
$$

Faire le lien explicite avec le CM1 : au CM1, on avait un problème en temps (le café refroidit, on avance pas à pas) ; ici, le problème est en espace (on connaît les bords, on cherche le profil). La démarche est la même : situation physique → bilan → équation → discrétisation.

##### Étape 1 — Maillage (3 min)

Dessiner au tableau une barre de longueur 1, découpée en $N$ morceaux. Marquer les nœuds $x_0, x_1, \ldots, x_N$, avec $h = 1/N$.

Questions :

- « On cherche la température en chaque nœud. Lesquels connaît-on déjà ? »
  Réponse : $u_0 = 0$ et $u_N = 0$ (conditions aux limites).

- « Combien reste-t-il d'inconnues ? »
  Réponse : $N - 1$ (les nœuds intérieurs $u_1, \ldots, u_{N-1}$).

- « Combien faut-il d'équations ? »
  Réponse : $N - 1$ aussi.

Interaction : réponses orales rapides. Faire reformuler par un étudiant : « On a $N - 1$ inconnues, il faut $N - 1$ équations. »

##### Étape 2 — Écriture d'une équation (5 min)

Demander à la classe d'écrire l'équation au nœud $x_i$ en utilisant la formule de la dérivée seconde vue en section 2.

Question : « En remplaçant $-u''(x_i)$ par la formule de différences finies, qu'obtient-on ? »

Laisser 1 minute de réflexion individuelle, puis demander une proposition.

Réponse attendue :

$$
-\frac{u_{i+1} - 2u_i + u_{i-1}}{h^2} = 1.
$$

Faire multiplier par $h^2$ pour simplifier :

$$
-u_{i-1} + 2u_i - u_{i+1} = h^2.
$$

Faire vérifier : « Chaque équation fait intervenir combien d'inconnues ? » Réponse : trois ($u_{i-1}$, $u_i$, $u_{i+1}$). Ce point est essentiel pour comprendre la structure tridiagonale.

##### Étape 3 — Construction du système sur un exemple (10 min)

Fixer $N = 5$ (donc $h = 0{,}2$, $h^2 = 0{,}04$, et 4 inconnues $u_1, u_2, u_3, u_4$).

C'est le moment d'activité à la main du CM2. Demander aux étudiants d'écrire les 4 équations, en utilisant $u_0 = u_5 = 0$.

Interaction :

- Laisser 2 à 3 minutes de travail individuel (ou en binôme).
- Circuler dans les rangs si l'amphi le permet, sinon demander l'avancement à voix haute.
- Mettre en commun en demandant à 4 étudiants différents de proposer chacun une ligne.

Résultat attendu :

$$
\begin{aligned}
i=1 &: \quad 2u_1 - u_2 = 0{,}04 \qquad (\text{car } u_0 = 0) \\
i=2 &: \quad -u_1 + 2u_2 - u_3 = 0{,}04 \\
i=3 &: \quad -u_2 + 2u_3 - u_4 = 0{,}04 \\
i=4 &: \quad -u_3 + 2u_4 = 0{,}04 \qquad (\text{car } u_5 = 0)
\end{aligned}
$$

Faire remarquer comment les conditions aux limites éliminent $u_0$ dans la première ligne et $u_5$ dans la dernière.

Demander ensuite : « Peut-on écrire ce système sous forme matricielle $A\mathbf{u} = \mathbf{b}$ ? »

Faire construire collectivement la matrice :

$$
\begin{pmatrix}
2 & -1 & 0 & 0 \\
-1 & 2 & -1 & 0 \\
0 & -1 & 2 & -1 \\
0 & 0 & -1 & 2
\end{pmatrix}
\begin{pmatrix} u_1 \\ u_2 \\ u_3 \\ u_4 \end{pmatrix}
=
\begin{pmatrix} 0{,}04 \\ 0{,}04 \\ 0{,}04 \\ 0{,}04 \end{pmatrix}.
$$

##### Étape 4 — Observer la structure (3 min)

Questions à poser une fois la matrice écrite :

- « Que remarquez-vous dans la matrice ? Où sont les zéros ? »
  Réponse : seules trois diagonales sont non nulles.

- « Ce type de matrice a un nom : c'est une matrice **tridiagonale**. Pourquoi a-t-elle cette forme ? »
  Réponse : le stencil à trois points fait que chaque équation ne relie que trois inconnues voisines.

- « Si on raffinait le maillage à $N = 100$, quelle serait la taille du système ? La matrice resterait-elle tridiagonale ? »
  Réponse : $99 \times 99$, et oui, elle resterait tridiagonale — très creuse.

Interaction : ces trois questions peuvent être posées rapidement à l'oral. Insister sur le lien stencil → structure de la matrice, car c'est une idée centrale du module.

##### Étape 5 — Vérification rapide (2 min)

Mentionner que la solution exacte est $u(x) = \frac{x(1-x)}{2}$ et faire vérifier un ou deux points du tableau. Par exemple, demander : « Que vaut $u(0{,}4)$ avec la formule exacte ? » Réponse : $\frac{0{,}4 \times 0{,}6}{2} = 0{,}12$.

Préciser que la coïncidence exacte entre solution numérique et solution exacte est un cas particulier (la solution est un polynôme de degré 2, et le schéma est exact pour ceux-ci). Pour une source $f(x)$ plus complexe, on observerait un écart.

---

#### 4. Ouverture : diffusion de chaleur dans une paroi — 12 min

Objectif : montrer l'unité de la démarche en combinant les idées du CM1 (avancer en temps) et de la section 3 (discrétiser en espace). Ne pas chercher à tout formaliser : l'idée est de montrer que les outils sont les mêmes et d'ouvrir sur les applications futures.

##### Présentation de l'équation de la chaleur (2 min)

Reprendre le contexte de la barre, mais cette fois hors équilibre : la barre est initialement froide et on allume le chauffage. La température $T(x,t)$ évolue dans le temps et dans l'espace.

Écrire l'équation de la chaleur :

$$
\frac{\partial T}{\partial t} = \alpha\,\frac{\partial^2 T}{\partial x^2}.
$$

Faire le lien avec ce qui précède :

- Le terme $\frac{\partial^2 T}{\partial x^2}$ a été discrétisé en section 3 par différences finies.
- Le terme $\frac{\partial T}{\partial t}$ a été traité au CM1 par Euler.

Question : « Si on combine les deux, comment obtient-on un schéma de calcul ? »

##### Faire émerger le schéma (4 min)

Laisser les étudiants proposer. Réponse attendue :

1. Discrétiser en espace : $\frac{\partial^2 T}{\partial x^2} \approx \frac{T_{i+1} - 2T_i + T_{i-1}}{h^2}$.
2. Avancer en temps par Euler : $\frac{T_i^{n+1} - T_i^n}{\Delta t} \approx \frac{\partial T_i}{\partial t}$.
3. Combiner : $T_i^{n+1} = T_i^n + \frac{\alpha\,\Delta t}{h^2}(T_{i+1}^n - 2T_i^n + T_{i-1}^n)$.

Interaction : demander à un étudiant de proposer l'étape 1, à un autre l'étape 2, puis faire la combinaison ensemble.

Faire remarquer : ce schéma contient un paramètre $r = \frac{\alpha\,\Delta t}{h^2}$ qui combine le pas de temps et le pas d'espace. Ce paramètre joue un rôle central dans la stabilité.

##### Discussion sur la plausibilité physique (4 min)

Question ouverte :

> « À quoi reconnaît-on qu'une solution numérique est absurde dans un contexte physique ? »

Laisser les étudiants proposer. Guider vers quatre signaux d'alerte :

- Des **oscillations non physiques** : la température alterne entre chaud et froid d'un nœud à l'autre.
- Une **explosion des valeurs** : la température diverge vers l'infini.
- Une **incohérence avec les conditions aux bords** : la solution ne respecte pas les températures imposées.
- Un **comportement incompatible avec le phénomène** : la chaleur se propage dans le mauvais sens.

Interaction :

- Demander des propositions orales, noter au tableau les bonnes réponses.
- Faire le lien avec le CM1 : on avait déjà vu un résultat absurde (température de $-15\;\degC$ pour un café avec $\Delta t = 15$). Le problème est le même ici, mais les mécanismes de divergence sont plus variés.
- Annoncer que le prochain point (section 5) explique pourquoi ces problèmes surviennent.

##### Lien avec la progression

Mentionner brièvement que l'équation de la chaleur dans une paroi est l'une des applications centrales du module (TD2, TP2). Le CM2 n'en donne qu'un aperçu.

---

#### 5. Stabilité et convergence : premières intuitions — 10 min

Objectif : donner une première intuition de deux notions fondamentales sans entrer dans le formalisme. Les étudiants doivent repartir avec une idée claire de ce que signifient « convergence » et « stabilité », illustrées par des exemples concrets.

##### Convergence (3 min)

Poser la question sous forme encadrée :

> « Quand le pas tend vers zéro, la solution numérique se rapproche-t-elle de la solution exacte ? »

Réponse : si oui, la méthode est **convergente**.

Illustrer par le CM1 : sur le café, l'erreur avec $\Delta t = 5$ était de $8{,}3\;\degC$ ; avec $\Delta t = 2$, elle tombait à $2{,}8\;\degC$. En diminuant le pas, on se rapproche de la solution exacte. C'est un comportement convergent.

Interaction : demander à la classe si le résultat du CM1 était cohérent avec cette définition. Réponse attendue : oui.

##### Stabilité (4 min)

Poser la question :

> « Les petites erreurs de calcul restent-elles sous contrôle, ou explosent-elles ? »

Réponse : si les erreurs restent bornées, la méthode est **stable** ; sinon, elle est instable.

Illustrer par deux exemples :

- CM1 : Euler sur le café avec $\Delta t = 15$ donne $T_1 = -15\;\degC$. L'erreur a explosé : instabilité.
- Équation de la chaleur : le paramètre $r = \frac{\alpha\,\Delta t}{h^2}$ doit vérifier $r \leq \frac{1}{2}$ pour que le schéma soit stable. Si on raffine l'espace ($h$ petit) sans adapter le temps ($\Delta t$ fixe), on peut rendre le schéma instable.

Ce deuxième exemple est important pour l'intuition : la stabilité n'est pas seulement une question de « pas trop grand » mais d'**équilibre entre les pas** dans les différentes directions.

Interaction : demander si un pas très petit (en temps) peut poser des problèmes. Réponse : non pour la stabilité, mais oui pour le coût.

##### Compromis précision / coût (2 min)

Résumer rapidement : raffiner le maillage améliore la précision mais augmente le coût.

Mentionner les ordres de grandeur :

- En 1D avec $N$ nœuds : système de taille $N - 1$.
- En 2D sur un maillage $N \times N$ : de l'ordre de $N^2$ inconnues.

Question rapide : « En ingénierie, choisirait-on toujours le maillage le plus fin possible ? »

Réponse attendue : non, c'est un compromis. En conception préliminaire, un calcul grossier suffit. En dimensionnement final, on raffine.

Interaction : vote rapide à main levée ou réponse orale.

##### Point d'attention

Cette section est volontairement courte (10 min). L'objectif est de planter les mots et les intuitions. Le formalisme (ordre de convergence, condition CFL, théorème de Lax) viendra en TD4 et CM3.

---

#### 6. Bilan — 5 min

Objectif : stabiliser quatre idées que les étudiants doivent retenir.

Faire formuler par la classe (en demandant « qu'a-t-on vu aujourd'hui ? ») puis institutionnaliser :

1. L'idée de **différences finies** est une généralisation de ce qu'on a fait avec Euler : on remplace des dérivées par des quotients de différences.
2. La discrétisation d'un problème aux limites conduit naturellement à un **système linéaire** $A\mathbf{u} = \mathbf{b}$.
3. La matrice obtenue a une structure particulière (**tridiagonale** en 1D) qui reflète le caractère local du stencil.
4. La fiabilité d'un calcul numérique repose sur trois propriétés : **convergence**, **stabilité**, et un **compromis entre précision et coût**.

Ouverture vers la suite : au TP1, on va coder Euler en Python et voir les courbes en vrai. En TD1 et TD2, on apprendra à résoudre les systèmes linéaires qui apparaissent ici.

---

## Articulation avec le CM1

L'enchaînement entre les deux CM :

- **CM1** installe le besoin d'approximer et construit un premier schéma numérique sur une EDO (Euler, café). Les étudiants comprennent l'idée de discrétisation, d'erreur, et de compromis pas/précision.
- **CM2** généralise cette logique : la même idée (remplacer une dérivée par une différence) s'applique en espace, conduit à des systèmes linéaires, et soulève des questions de stabilité et de convergence.

Le lien concret entre les deux séances :

| Élément | CM1 | CM2 |
|---------|-----|-----|
| Problème | EDO en temps | Problème aux limites en espace |
| Exemple | Café qui refroidit | Barre métallique chauffée |
| Dérivée approchée | $\frac{T_{n+1} - T_n}{\Delta t}$ | $\frac{u_{i+1} - 2u_i + u_{i-1}}{h^2}$ |
| Résultat | Suite de valeurs $T_0, T_1, \ldots$ | Système linéaire $A\mathbf{u} = \mathbf{b}$ |
| Notion de qualité | Influence du pas | Convergence, stabilité, coût |

Les étudiants doivent comprendre que l'analyse numérique n'est pas une juxtaposition de recettes, mais une même démarche appliquée à plusieurs types de problèmes.

## Articulation avec la suite du module

- **TP1** (24 ou 31 mars) : les étudiants codent Euler en Python sur le café et le pendule. Ils voient les courbes et les effets du pas en direct. Le TP mobilise le CM1 et le vocabulaire du CM2 (stabilité, convergence).
- **TD1** (1er ou 2 avril) : interpolation et intégration numérique. Nouveau contexte, même logique d'approximation.
- **TD2** (3 ou 7 avril) : pivot de Gauss, factorisation LU, systèmes linéaires. C'est ici que les étudiants apprennent à résoudre les systèmes construits au CM2.
- **TD4** et **CM3** : formalisation des notions de convergence, stabilité, comparaison de schémas.

## Formats d'interactivité à privilégier

Le CM2 est court (1h30) et dense. L'interactivité doit être ciblée et rapide :

- **Questions orales directes** : poser une question, laisser 20–30 secondes, demander une réponse. C'est le format dominant dans ce CM.
- **Micro-activité en binôme** (section 3, étape 3) : 2–3 minutes pour écrire les 4 lignes du système. C'est le seul moment de travail écrit individuel du CM.
- **Construction collective au tableau** : faire proposer les lignes de la matrice par différents étudiants.
- **Vote rapide** (section 5) : « est-ce que ce résultat vous semble crédible ? »
- **Questions de transition** : chaque section commence par une question qui relie au contenu précédent.

Le principe est de ne jamais passer plus de 5 minutes sans poser une question ou demander une contribution.

## Points de vigilance pédagogique

### Risque principal : la densité

Le CM2 couvre beaucoup de terrain en peu de temps. Le risque est de basculer dans un cours magistral classique si le timing dérape. Trois garde-fous :

1. **Ne pas développer ce qui n'est pas nécessaire.** La section 4 (équation de la chaleur) est une ouverture, pas un développement complet. Il ne faut pas se laisser entraîner dans les détails du schéma explicite.
2. **Ne pas anticiper le TD2.** La résolution du système linéaire (pivot de Gauss, LU) n'est pas l'objet du CM2. On montre que la discrétisation *produit* un système, pas comment le *résoudre*.
3. **Ne pas formaliser la stabilité.** Le théorème de Lax, la condition CFL, l'analyse de von Neumann sont pour plus tard. Ici, on donne des intuitions et des exemples.

### Niveau d'abstraction

Le passage du café (très concret) à $-u''(x) = f(x)$ (plus abstrait) est un saut conceptuel. La barre métallique chauffée atténue ce saut en donnant un contexte physique, mais il faut rester vigilant :

- Toujours nommer les grandeurs physiques, pas seulement les variables mathématiques.
- Revenir régulièrement au dessin de la barre avec ses nœuds.
- Quand on écrit la matrice, faire le lien avec la barre : chaque ligne correspond à un nœud physique.

### Erreurs prévisibles des étudiants

- Confondre $N$ (nombre de sous-intervalles) et $N - 1$ (nombre d'inconnues).
- Oublier d'utiliser les conditions aux limites pour éliminer $u_0$ et $u_N$.
- Ne pas diviser par $2h$ dans la différence centrée (écrire $(u_{i+1} - u_{i-1})/h$).
- Confondre problème en temps (Euler) et problème en espace (problème aux limites).

Ces erreurs sont normales et même utiles pédagogiquement : elles montrent que la compréhension est en construction.

## Suite du travail

Ce plan sert de base pour :

- le poly à trous `CM2.tex` (déjà rédigé, à ajuster si le plan évolue) ;
- la date de séance (corriger dans `CM2.tex` : 19 mars 2026, pas 24 mars) ;
- la préparation du TP1, qui mobilisera le vocabulaire installé dans les deux CM.

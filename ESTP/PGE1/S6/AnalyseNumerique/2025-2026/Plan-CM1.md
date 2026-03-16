# Plan de séance — CM1

## Cadre général

Ce document propose une trame de travail pour le premier cours magistral d'analyse numérique, en suivant la progression 2025-2026.

L'idée directrice : partir d'un problème concret, faire émerger la nécessité d'un modèle puis d'une discrétisation, et enfin discuter la fiabilité du résultat numérique obtenu.

Trois idées structurantes guident la séance :

1. Un problème continu n'est pas toujours résoluble directement.
2. On le transforme en calcul exploitable par discrétisation.
3. Toute méthode numérique doit être discutée en termes de précision, de coût et de robustesse.

## Fil directeur pédagogique

Le fil rouge du CM1 est le **refroidissement d'un café**. Cet exemple unique traverse toute la séance : il sert à motiver le besoin de méthodes numériques, à construire la méthode d'Euler et à en discuter la qualité.

Des **généralisations** issues de domaines variés (hydraulique, mécanique, thermique du bâtiment, dynamique des populations) sont proposées aux moments clés pour montrer que la même démarche s'applique à de nombreux problèmes d'ingénierie.

La progression du cours suit le schéma suivant :

1. Partir d'une situation concrète.
2. Faire formuler le besoin d'un modèle mathématique.
3. Montrer que la résolution exacte n'est pas toujours possible ; illustrer par des généralisations.
4. Faire émerger l'idée d'approximation et de discrétisation.
5. Construire la méthode d'Euler.
6. Appliquer la méthode à la main.
7. Confronter le résultat aux limites du calcul numérique.
8. Prendre du recul sur la qualité du schéma.

L'objectif n'est pas de faire un cours uniquement magistral, mais de faire naître les idées à partir de questions bien choisies, de micro-calculs et de discussions courtes en classe.

## CM1 — De l'erreur numérique à la méthode d'Euler

### Informations générales

- Durée : `2h30`
- Position dans la progression : installation des idées de discrétisation, d'erreur numérique et de schéma d'Euler
- Objectif principal : comprendre pourquoi on a besoin de méthodes numériques, puis construire la méthode d'Euler à partir d'une EDO simple

### Objectifs pédagogiques

À l'issue du cours, les étudiants doivent être capables de :

- expliquer pourquoi un résultat numérique est une approximation et non une vérité exacte ;
- distinguer erreur absolue, erreur relative et idée de chiffres significatifs ;
- comprendre qu'une EDO donne une information locale sur l'évolution d'un système ;
- reconstruire l'idée de la méthode d'Euler à partir d'une pente connue ;
- discuter qualitativement l'influence du pas sur la qualité de l'approximation.

### Exemple directeur : le café qui refroidit

On considère un café de température $T(t)$ placé dans une pièce à température ambiante constante $T_{\mathrm{amb}}$.

##### Bilan thermique

Le café échange de la chaleur avec son environnement par convection, rayonnement et évaporation. En supposant la température uniforme dans la tasse (modèle à paramètres localisés), le bilan d'énergie s'écrit

$$
m\,c_p\,\frac{dT}{dt} = -h_{\mathrm{eff}}\,A\,\bigl(T(t) - T_{\mathrm{amb}}\bigr),
$$

où les paramètres physiques sont les suivants :

| Grandeur | Symbole | Valeur typique | Unité |
|----------|---------|----------------|-------|
| Masse de café | $m$ | $0{,}25$ | $\mathrm{kg}$ |
| Capacité thermique massique | $c_p$ | $4180$ | $\mathrm{J\,kg^{-1}\,K^{-1}}$ |
| Coefficient d'échange global | $h_{\mathrm{eff}}$ | $\approx 50$ | $\mathrm{W\,m^{-2}\,K^{-1}}$ |
| Surface d'échange de la tasse | $A$ | $\approx 0{,}035$ | $\mathrm{m^2}$ |

Le coefficient $h_{\mathrm{eff}}$ regroupe les contributions de la convection naturelle ($\approx 5$–$15\;\mathrm{W\,m^{-2}\,K^{-1}}$), du rayonnement et surtout de l'évaporation en surface, qui domine largement pour un café chaud non couvert.

##### Forme simplifiée

En divisant par $m\,c_p$, on obtient l'EDO

$$
\frac{dT}{dt} = -k\bigl(T(t) - T_{\mathrm{amb}}\bigr), \qquad k = \frac{h_{\mathrm{eff}}\,A}{m\,c_p} > 0,
$$

avec la condition initiale $T(0) = T_0$.

L'application numérique donne

$$
k = \frac{50 \times 0{,}035}{0{,}25 \times 4180} = \frac{1{,}75}{1045} \approx 0{,}0017\;\mathrm{s^{-1}} \approx 0{,}10\;\mathrm{min^{-1}}.
$$

C'est ce coefficient $k \approx 0{,}1\;\mathrm{min^{-1}}$ qui sera utilisé dans toute la suite du cours et dans l'activité à la main.

##### Forme abstraite

Cet exemple sera généralisé au cours de la séance sous la forme

$$
\frac{dy}{dt} = f(t, y),
$$

ce qui permettra de montrer que de nombreux phénomènes obéissent à la même logique de calcul.

### Déroulé proposé

| Partie | Contenu | Durée |
|--------|---------|-------|
| 1 | Accroche et problématisation | 15 min |
| 2 | Pourquoi pas la résolution exacte ? Généralisations | 20 min |
| 3 | De la variation locale au modèle différentiel | 20 min |
| 4 | Faire émerger la méthode d'Euler | 25 min |
| 5 | Activité courte à la main | 20 min |
| 6 | Résultat numérique et erreurs | 15 min |
| 7 | Lecture qualitative d'un schéma numérique | 20 min |
| 8 | Bilan de fin de séance | 10 min |
| | **Total** | **2h25** |

Cinq minutes de marge sont prévues pour absorber les éventuels débordements liés aux interactions.

---

#### 1. Accroche et problématisation — 15 min

Objectif : faire sentir l'utilité de l'analyse numérique avant toute formule.

Le cours commence par une situation immédiatement compréhensible :

> "Voici un café trop chaud. Combien de temps faut-il attendre pour pouvoir le boire ?"

Cette question ne demande pas d'abord une formule, mais une stratégie. Elle oblige les étudiants à passer d'une intuition physique à une démarche de modélisation.

Questions à faire émerger progressivement :

- De quelle grandeur dépend le problème ?
- Quelle quantité varie au cours du temps ?
- Qu'est-ce qu'on cherche exactement : une valeur, un instant, une courbe d'évolution ?
- Peut-on répondre directement, juste avec le bon sens ?
- Si l'on écrit une équation, cela suffit-il à donner la réponse ?
- Comment un ordinateur pourrait-il s'y prendre pour approcher la solution ?

La dernière question est essentielle : l'ordinateur ne "devine" pas la solution, il applique une procédure de calcul.

Interaction :

- laisser une minute de réflexion individuelle ;
- demander quelques propositions orales ;
- faire identifier au tableau les inconnues, les données et la question posée ;
- faire reformuler ce que devrait produire un ordinateur : non pas une explication générale, mais une suite d'étapes de calcul ;
- conclure sur l'idée qu'entre le phénomène réel et la réponse numérique, il faut construire un modèle puis une méthode.

---

#### 2. Pourquoi pas la résolution exacte ? Généralisations — 20 min

Objectif : montrer que le modèle du café est volontairement simple, et que l'analyse numérique devient indispensable dès que le contexte se rapproche d'une situation réaliste. Illustrer par des exemples issus de domaines variés.

##### Complexification du modèle du café

Le modèle de base est

$$
\frac{dT}{dt} = -k\bigl(T(t) - T_{\mathrm{amb}}\bigr).
$$

Ce modèle repose sur des hypothèses fortes : température ambiante constante, coefficient d'échange $h_{\mathrm{eff}}$ constant, température uniforme dans le café, pas de couvercle.

On peut demander à la classe, en revenant aux paramètres physiques du bilan $m\,c_p\,\frac{dT}{dt} = -h_{\mathrm{eff}}\,A\,\bigl(T - T_{\mathrm{amb}}\bigr)$ :

- Que se passe-t-il si la température ambiante varie au cours du temps (fenêtre ouverte, climatisation) ?
- L'évaporation est plus forte quand le café est très chaud : que devient $h_{\mathrm{eff}}$ si on le fait dépendre de $T$ ?
- Que se passe-t-il si l'on ajoute du lait froid à un instant donné (discontinuité dans $T$) ?

On obtient par exemple

$$
m\,c_p\,\frac{dT}{dt} = -h_{\mathrm{eff}}(T)\,A\,\bigl(T(t) - T_{\mathrm{amb}}(t)\bigr),
$$

soit, sous forme simplifiée,

$$
\frac{dT}{dt} = -k(T)\bigl(T(t) - T_{\mathrm{amb}}(t)\bigr)
\qquad \text{avec} \quad k(T) = \frac{h_{\mathrm{eff}}(T)\,A}{m\,c_p}.
$$

Ces modèles restent compréhensibles physiquement, mais on ne dispose plus d'une formule explicite dès que $h_{\mathrm{eff}}$ ou $T_{\mathrm{amb}}$ varient.

##### Autres phénomènes, même besoin

L'intérêt de l'analyse numérique ne se limite pas au refroidissement. On peut montrer rapidement que des phénomènes très différents conduisent à des EDO qu'on ne sait pas toujours résoudre à la main.

**Vidange d'un réservoir (loi de Torricelli).** La hauteur d'eau $h(t)$ dans un réservoir vérifie

$$
\frac{dh}{dt} = -\alpha\,\sqrt{h(t)}, \qquad h(t) \geq 0.
$$

Si la section du réservoir varie avec la hauteur, on obtient

$$
S\bigl(h(t)\bigr)\,\frac{dh}{dt} = -\alpha\,\sqrt{h(t)},
$$

qui n'admet en général pas de solution explicite.

**Dynamique des populations (modèle logistique avec prélèvement).** Une population $P(t)$ soumise à une capacité limite $K$ et à un prélèvement variable $H(t)$ vérifie

$$
\frac{dP}{dt} = r\,P(t)\left(1 - \frac{P(t)}{K}\right) - H(t).
$$

Dès que le prélèvement varie dans le temps, la résolution analytique devient inaccessible.

**Pendule simple en grandes oscillations.** L'angle $\theta(t)$ vérifie

$$
\theta''(t) = -\frac{g}{L}\sin\bigl(\theta(t)\bigr).
$$

Pour de petits angles, $\sin(\theta) \approx \theta$ donne un oscillateur harmonique résoluble. Pour de grandes amplitudes, le $\sin$ empêche toute solution en termes de fonctions élémentaires.

**Chute libre avec frottement quadratique.** La vitesse d'un objet en chute dans un fluide vérifie

$$
\frac{dv}{dt} = g - \frac{c}{m}\,v(t)^2.
$$

La non-linéarité en $v^2$ rend la résolution exacte délicate ; l'ajout d'un vent variable ou d'une masse variable supprime toute formule simple.

**Diffusion thermique dans une paroi (aperçu du CM2).** La température $T(x,t)$ dans une paroi vérifie l'équation aux dérivées partielles

$$
\frac{\partial T}{\partial t} = \alpha\,\frac{\partial^2 T}{\partial x^2}.
$$

Ce modèle, central en thermique du bâtiment, ne peut être résolu numériquement qu'après discrétisation en espace et en temps — ce qui sera l'objet du CM2.

##### Message à stabiliser

Tous ces exemples partagent un point commun : une loi d'évolution locale (une dérivée, un taux de variation) est connue, mais la solution globale n'est pas accessible par une formule. L'analyse numérique fournit une méthode générale de calcul approché pour tous ces problèmes.

Interaction :

- faire dire aux étudiants que le modèle initial du café est simplifié ;
- demander quelles hypothèses ont été faites ;
- présenter rapidement chaque généralisation en demandant si les étudiants voient le point commun ;
- conclure : l'ordinateur n'apporte pas seulement de la rapidité, mais une méthode applicable là où le calcul exact échoue.

---

#### 3. De la variation locale au modèle différentiel — 20 min

Objectif : faire comprendre qu'une EDO relie une grandeur inconnue à sa vitesse de variation, et que cette information est locale.

On revient au modèle du café :

$$
\frac{dT}{dt} = -k\bigl(T(t) - T_{\mathrm{amb}}\bigr).
$$

Le message à faire émerger est :

- la dérivée donne un taux de variation ;
- ce taux dépend de l'état courant du système ;
- l'information fournie par l'équation est locale ;
- elle permet de prédire à court terme, mais pas directement toute la trajectoire.

##### Questions-guides

- Si le café est beaucoup plus chaud que la pièce, la température baisse-t-elle vite ou lentement ?
- Quand le café se rapproche de la température ambiante, que devient la vitesse de refroidissement ?
- Si à l'instant $t$ on connaît $T(t)$, que nous dit exactement l'équation sur l'instant suivant ?
- L'équation donne-t-elle directement la température à $t + 10$ minutes, ou seulement la manière dont la température évolue à l'instant $t$ ?

Les étudiants doivent progressivement verbaliser que l'équation ne donne pas la valeur future, mais seulement une pente — une information locale.

##### Question centrale

> "Si je connais la valeur actuelle d'une grandeur et sa vitesse de variation à cet instant, comment puis-je approcher sa valeur un peu plus tard ?"

C'est cette question qui prépare naturellement l'idée d'un calcul pas à pas.

Interaction :

- faire comparer le signe et l'ordre de grandeur de $\frac{dT}{dt}$ dans différentes situations ;
- faire distinguer "connaître une valeur" et "connaître une vitesse de variation" ;
- demander ce qu'on pourrait faire si l'on voulait avancer d'un très petit intervalle de temps ;
- faire émerger l'idée qu'à très court terme, on peut utiliser la pente actuelle pour prévoir l'évolution.

---

#### 4. Faire émerger la méthode d'Euler — 25 min

Objectif : ne pas donner la formule trop tôt. L'idée d'Euler doit apparaître comme une réponse naturelle à la question :

> "Si je connais la valeur actuelle et la pente actuelle, comment avancer d'un petit pas ?"

##### Étape 1 — Construire le schéma sur le café

On repart du modèle

$$
\frac{dT}{dt} = -k\bigl(T(t) - T_{\mathrm{amb}}\bigr).
$$

On suppose qu'à l'instant $t_n$, on connaît la température $T_n$.

Questions à poser :

- Si je connais $T_n$, puis-je calculer la pente à cet instant ?
- Que vaut cette pente en fonction de $T_n$ et de $T_{\mathrm{amb}}$ ?
- Si je prends un petit pas de temps $\Delta t$, comment approximer la température à l'instant $t_n + \Delta t$ ?
- Si la pente restait presque constante sur ce petit intervalle, de combien la température varierait-elle ?

On fait alors émerger :

$$
T_{n+1} \approx T_n + \Delta t \left[-k\bigl(T_n - T_{\mathrm{amb}}\bigr)\right].
$$

La nouvelle température est obtenue en ajoutant à la température actuelle une correction : pas de temps × pente actuelle.

##### Étape 2 — Généraliser

On fait remarquer que la même logique s'appliquerait au réservoir, au pendule ou à n'importe lequel des exemples vus en section 2. La formule générale est

$$
y_{n+1} = y_n + \Delta t\,f(t_n, y_n).
$$

Il est utile de faire expliciter les termes :

- $y_n$ : valeur approchée au temps $t_n$ ;
- $\Delta t$ : le pas de temps ;
- $f(t_n, y_n)$ : la pente fournie par le modèle à l'instant courant.

##### Note pédagogique : croquis géométrique

> **Faire un dessin au tableau.** Tracer une courbe représentant la solution exacte $T(t)$. Au point $(t_n, T_n)$, tracer la tangente à la courbe. Montrer que la méthode d'Euler revient à suivre cette tangente sur un intervalle $\Delta t$ pour atteindre le point $(t_{n+1}, T_{n+1})$.
>
> Ce croquis permet de visualiser immédiatement :
>
> - pourquoi un pas plus petit donne un meilleur suivi de la courbe ;
> - pourquoi l'erreur s'accumule d'un pas à l'autre ;
> - pourquoi la méthode utilise la pente au **début** de l'intervalle (ce qui prépare la comparaison avec d'autres schémas plus tard).
>
> Superposer deux ou trois pas d'Euler pour montrer la construction pas à pas de la solution approchée, et faire apparaître l'écart croissant avec la courbe exacte.

##### Interaction

- demander à un étudiant d'expliquer la formule d'Euler avec des mots, sans écrire de symbole ;
- faire redire comment on passerait concrètement de $T_n$ à $T_{n+1}$ pour le café ;
- insister sur le fait qu'on utilise la pente au début de l'intervalle ;
- faire le lien avec le dessin : chaque pas d'Euler est un segment de tangente.

---

#### 5. Activité courte à la main — 20 min

Objectif : faire ressentir le lien entre calcul manuel, pas de discrétisation et qualité du résultat.

##### Données numériques

On reprend les paramètres physiques introduits en début de séance :

| Paramètre | Valeur | Origine |
|-----------|--------|---------|
| $T_0$ (température initiale) | $90\,°\mathrm{C}$ | café fraîchement servi |
| $T_{\mathrm{amb}}$ (température ambiante) | $20\,°\mathrm{C}$ | pièce à température ordinaire |
| $k = \dfrac{h_{\mathrm{eff}}\,A}{m\,c_p}$ | $0{,}1\;\mathrm{min}^{-1}$ | $m = 0{,}25\;\mathrm{kg}$, $c_p = 4180\;\mathrm{J/(kg \cdot K)}$, $h_{\mathrm{eff}} = 50\;\mathrm{W/(m^2 \cdot K)}$, $A = 0{,}035\;\mathrm{m^2}$ |

La formule d'Euler s'écrit

$$
T_{n+1} = T_n + \Delta t\left[-0{,}1\bigl(T_n - 20\bigr)\right] = T_n - 0{,}1\,\Delta t\,(T_n - 20).
$$

##### Calcul avec $\Delta t = 2\;\mathrm{min}$

On demande de calculer $T_1, T_2, T_3, T_4, T_5$ (soit 10 minutes de simulation).

| $n$ | $t_n$ | $T_n$ | Pente $-0{,}1(T_n-20)$ | $T_{n+1}$ |
|-----|--------|--------|--------------------------|------------|
| 0 | 0 | 90 | $-7{,}0$ | $76$ |
| 1 | 2 | 76 | $-5{,}6$ | $64{,}8$ |
| 2 | 4 | 64,8 | $-4{,}48$ | $55{,}84$ |
| 3 | 6 | 55,84 | $-3{,}584$ | $48{,}67$ |
| 4 | 8 | 48,67 | $-2{,}867$ | $42{,}94$ |

##### Calcul avec $\Delta t = 5\;\mathrm{min}$

On demande de calculer $T_1, T_2$ (soit 10 minutes de simulation).

| $n$ | $t_n$ | $T_n$ | Pente $-0{,}1(T_n-20)$ | $T_{n+1}$ |
|-----|--------|--------|--------------------------|------------|
| 0 | 0 | 90 | $-7{,}0$ | $55$ |
| 1 | 5 | 55 | $-3{,}5$ | $37{,}5$ |

La solution exacte à $t = 10$ est $T(10) = 20 + 70\,e^{-1} \approx 45{,}75\,°\mathrm{C}$.

On constate : avec $\Delta t = 2$, l'approximation donne $42{,}94$ (écart de $2{,}81$) ; avec $\Delta t = 5$, elle donne $37{,}5$ (écart de $8{,}25$).

##### Questions pendant l'activité

- La température calculée baisse-t-elle bien au cours du temps ?
- La correction ajoutée à chaque étape diminue-t-elle ? Pourquoi ?
- Quel pas de temps semble produire un résultat plus proche de la solution exacte ?
- Le pas $\Delta t = 5$ demande moins de calculs : que perd-on en échange ?

##### Généralisation rapide (si le temps le permet)

Pour les plus rapides, proposer une itération d'Euler sur le modèle de Torricelli avec $h_0 = 4\;\mathrm{m}$, $\alpha = 0{,}5\;\mathrm{m}^{1/2}\cdot\mathrm{min}^{-1}$, $\Delta t = 1\;\mathrm{min}$ :

$$
h_{n+1} = h_n + \Delta t\bigl(-0{,}5\sqrt{h_n}\bigr).
$$

| $n$ | $t_n$ | $h_n$ | Pente $-0{,}5\sqrt{h_n}$ | $h_{n+1}$ |
|-----|--------|--------|----------------------------|------------|
| 0 | 0 | 4 | $-1{,}0$ | $3{,}0$ |
| 1 | 1 | 3,0 | $-0{,}866$ | $2{,}134$ |
| 2 | 2 | 2,134 | $-0{,}731$ | $1{,}403$ |

Ce calcul fait apparaître une dynamique différente de celle du café : la vitesse de variation dépend de $\sqrt{h}$ et non de $h$, mais la méthode de calcul reste identique.

---

#### 6. Résultat numérique et erreurs — 15 min

Objectif : faire comprendre que, même lorsqu'on utilise un ordinateur, le résultat obtenu n'est pas exact.

Cette section arrive intentionnellement après l'activité à la main. Les étudiants viennent de calculer des valeurs approchées et de constater des écarts avec la solution exacte. La question se pose donc naturellement :

> "Si l'ordinateur calcule à notre place, peut-on faire confiance au résultat affiché ?"

##### Petit quiz

- Que vaut $0{,}1 + 0{,}2$ sur un ordinateur ?
- Est-ce que $\sqrt{2}^{\,2}$ vaut exactement $2$ ?
- Si l'on répète un grand nombre de petites opérations, une erreur peut-elle s'accumuler ?

##### Retour au café

On vient de calculer $T(10) \approx 42{,}94$ avec $\Delta t = 2$ et $T(10) \approx 37{,}5$ avec $\Delta t = 5$, alors que la valeur exacte est $45{,}75\,°\mathrm{C}$. Cela soulève des questions concrètes :

- Si l'ordinateur affiche $59{,}9999998\,°\mathrm{C}$, considère-t-on que le café est à $60\,°\mathrm{C}$ ?
- L'écart observé vient-il du calcul machine ou de la méthode elle-même ?

##### Trois niveaux d'erreur à distinguer

- **Erreur de modèle** : le café réel ne suit jamais parfaitement le modèle de Newton.
- **Erreur de méthode** : le schéma d'Euler remplace une dérivée par une différence finie.
- **Erreur d'arrondi** : les nombres stockés par la machine sont approchés.

##### Notions à formaliser

- Représentation finie des nombres sur machine.
- Erreur absolue : $|T_{\mathrm{exact}} - T_{\mathrm{calculé}}|$.
- Erreur relative : $\dfrac{|T_{\mathrm{exact}} - T_{\mathrm{calculé}}|}{|T_{\mathrm{exact}}|}$.
- Chiffres significatifs.
- Idée de propagation des erreurs.

##### Interaction

- mini-quiz collectif en début de partie ;
- retour aux valeurs calculées à la main : combien de chiffres significatifs peut-on garantir ?
- discussion : quelle précision est réellement utile pour décider si l'on peut boire le café ?

---

#### 7. Lecture qualitative d'un schéma numérique — 20 min

Objectif : faire apparaître les premières notions de qualité d'une méthode.

Les étudiants ont maintenant vu la méthode d'Euler, l'ont appliquée à la main et ont discuté des erreurs. Il faut maintenant prendre du recul sur la qualité du résultat.

##### Comparaison de plusieurs pas

On présente (au tableau ou en projection) les courbes obtenues sur le café avec $\Delta t = 1$, $\Delta t = 2$, $\Delta t = 5$ et $\Delta t = 10$, superposées à la solution exacte $T(t) = 20 + 70\,e^{-0{,}1\,t}$.

Questions :

- Quelle courbe suit le mieux la solution exacte ?
- Une courbe qui passerait sous la température ambiante serait-elle crédible ?
- Avec $\Delta t = 10$ : $T_1 = 90 + 10 \times (-7) = 20$. Le café atteint la température ambiante en une seule étape. Est-ce réaliste ?
- Avec $\Delta t = 15$ : $T_1 = 90 + 15 \times (-7) = -15\,°\mathrm{C}$. Une température négative pour un café ?

##### Lien avec les généralisations

On peut évoquer brièvement ce que donnerait un pas trop grand sur les autres problèmes :

- un réservoir dont la hauteur deviendrait négative ;
- un pendule dont l'énergie augmenterait au lieu de se conserver ;
- une population qui prendrait des valeurs négatives.

L'idée est de montrer que le phénomène de dégradation lié à un mauvais pas n'est pas propre au café : c'est un enjeu universel du calcul numérique.

##### Idées à faire émerger

- Plus le pas est petit, plus le calcul est en général fidèle.
- Un pas trop grand peut produire une approximation grossière, voire un résultat physiquement absurde.
- La méthode numérique doit toujours être interprétée à la lumière du phénomène étudié.

Cette lecture qualitative prépare les notions qui seront précisées au CM2 :

- précision ;
- stabilité ;
- convergence ;
- compromis entre coût de calcul et fiabilité.

##### Interaction

- vote rapide : "cette courbe est-elle crédible ? oui / non" ;
- faire verbaliser le compromis précision / coût ;
- conclure : un calcul numérique ne se juge pas seulement à sa possibilité de calcul, mais à sa pertinence.

---

#### 8. Bilan de fin de séance — 10 min

Trois idées à stabiliser :

1. Un calcul numérique est une approximation.
2. Une EDO peut être transformée en procédure de calcul par discrétisation (méthode d'Euler).
3. Le choix du pas $\Delta t$ est un compromis entre précision et coût.

Ouverture vers le CM2 : la même logique de discrétisation va être appliquée à des problèmes plus complexes (différences finies, systèmes linéaires, stabilité).

---

## Articulation avec le CM2

Le contenu détaillé du CM2 est dans `Plan-CM2.md`.

L'enchaînement :

- **CM1** installe le besoin d'approximer et construit un premier schéma numérique sur une EDO ;
- **CM2** généralise cette logique de discrétisation et montre qu'elle conduit à des systèmes linéaires et à des questions de stabilité.

Les étudiants doivent comprendre que l'analyse numérique n'est pas une juxtaposition de recettes, mais une même démarche appliquée à plusieurs types de problèmes.

## Formats d'interactivité à privilégier

- Question ouverte sans formule au début d'une notion.
- Temps de réflexion individuelle très court.
- Échange en binôme.
- Mise en commun orale.
- Mini-calcul à la main.
- Vote rapide sur la plausibilité d'un résultat.
- Interprétation physique d'une courbe ou d'un tableau.

Le principe est de demander régulièrement :

- "Comment feriez-vous ?"
- "Qu'est-ce qui vous paraît plausible ?"
- "Qu'est-ce qui vous ferait douter du résultat ?"
- "Que gagne-t-on et que perd-on avec cette approximation ?"

## Point de vigilance pédagogique

Le risque principal serait de rendre le début du module trop technique trop vite. Il faut donc :

- conserver l'exemple directeur du café tout au long de la séance ;
- limiter le nombre de méthodes introduites ;
- faire passer les intuitions avant les définitions abstraites ;
- revenir souvent au sens physique ;
- faire verbaliser les idées par les étudiants avant d'institutionnaliser les formules.

## Suite du travail

Ce document sert de base. Chaque section pourra être reprise pour :

- affiner les exemples numériques ;
- préparer les slides ;
- construire des activités d'interaction plus précises.

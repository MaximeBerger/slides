# Plan de séance — CM3

## Cadre général

Ce document propose une trame détaillée pour le troisième cours magistral d'analyse numérique, dans la continuité des CM1–CM2 et des TD1–TD4.

L'idée directrice : **faire dialoguer les briques du semestre autour d'un problème d'ingénieur unique**. Les étudiants ont désormais tous les outils de base (Euler, différences finies, quadrature, systèmes linéaires, Newton). Le CM3 les met en scène dans un fil rouge cohérent, et introduit une dernière pierre — Runge-Kutta — qui montre qu'Euler n'est pas la seule façon de franchir un pas de temps.

Trois idées structurantes guident la séance :

1. Euler est un choix parmi d'autres ; on peut faire nettement mieux avec le même effort conceptuel.
2. Résoudre une EDO n'est souvent qu'une étape : on veut aussi **identifier** des paramètres physiques à partir de mesures.
3. Newton, vu en TD4 sur une équation scalaire, devient l'outil central pour caler un modèle sur des données — et ouvre sur les moindres carrés et les méthodes quasi-Newton.

Le CM3 prépare directement le CM4 (examen blanc) en faisant tourner, sur un cas unique, la quasi-totalité des méthodes du module.

## Fil directeur pédagogique

Le fil rouge du CM3 est le **refroidissement d'une dalle de béton instrumentée après coulage**. Une dalle vient d'être coulée sur un chantier ; des capteurs mesurent sa température à intervalles réguliers. Le bureau d'études doit identifier le coefficient d'échange thermique entre la dalle et l'air ambiant pour prédire le moment où la dalle pourra être mise en charge.

Ce choix prolonge explicitement les deux fils rouges précédents :

- le **café du CM1** devient une **dalle de béton** : même équation, échelle et enjeu d'ingénieur différents ;
- le **colorant du CM2** a montré que le choix du schéma compte ; on pousse la logique en montrant qu'on peut **construire un meilleur schéma** que celui obtenu par discrétisation brute d'une dérivée.

Cet exemple permet de :

- relier explicitement les CM entre eux (le café revient, grandi) ;
- motiver Runge-Kutta par un cas où Euler est clairement insuffisant (le pendule comme démonstration) ;
- faire apparaître un **problème inverse** : les étudiants ont toujours résolu dans le sens équation → solution ; ici, ils partent de mesures et retrouvent un paramètre ;
- réutiliser Newton vu en TD4, dans un contexte très différent (non plus « résoudre $f(x)=0$ », mais « caler $k$ ») ;
- ouvrir proprement sur les moindres carrés et les méthodes quasi-Newton, culture utile pour le CM4 et l'examen.

La progression du cours suit le schéma suivant :

1. Réactiver les acquis du semestre par des questions rapides.
2. Exhiber un défaut d'Euler sur un cas spectaculaire (pendule) pour motiver RK.
3. Construire RK2 (méthode de Heun) pas à pas, en partant de l'idée « moyenner deux pentes ».
4. Vérifier que RK2 corrige effectivement ce défaut et introduire l'**ordre** d'une méthode.
5. Appliquer RK2 au fil rouge : identifier un paramètre physique par Newton à partir d'une mesure.
6. Ouvrir vers le cas réaliste (plusieurs mesures) : moindres carrés et méthodes quasi-Newton.
7. Institutionnaliser et préparer l'examen blanc du CM4.

## CM3 — Runge-Kutta, problème inverse et ajustement de paramètres

### Informations générales

- Durée : `2h00`
- Date : `23 avril 2026`
- Position dans la progression : dernière séance avant l'examen blanc (CM4) ; synthèse et ouverture
- Objectif principal : ajouter Runge-Kutta à la boîte à outils, et faire coopérer Euler/RK + Newton sur un problème inverse d'ingénieur

### Objectifs pédagogiques

À l'issue du cours, les étudiants doivent être capables de :

- justifier pourquoi Euler peut être insuffisant et identifier la nature de son défaut (erreur d'ordre un, mauvaise conservation d'énergie sur les systèmes oscillants) ;
- construire et mettre en œuvre la méthode de Heun (RK2) à la main sur un pas ;
- énoncer ce qu'on entend par **ordre** d'une méthode et le constater numériquement par raffinement du pas ;
- reconnaître un **problème inverse** et le reformuler comme la résolution d'une équation $g(k) = 0$ ;
- appliquer Newton à ce problème inverse en utilisant une approximation numérique de la dérivée (différence finie) ;
- comprendre que, avec plusieurs mesures, on passe naturellement à une **fonction coût** et aux **moindres carrés** ;
- situer les méthodes quasi-Newton et Levenberg-Marquardt comme extensions culturelles de Newton.

### Exemple directeur : identification thermique d'une dalle de béton

Une dalle de béton vient d'être coulée ; sa température initiale (prise en compte de la chaleur d'hydratation) est $T_0 = 45\ \degC$. La température ambiante est $T_{\mathrm{amb}} = 15\ \degC$. Un capteur noyé dans la dalle enregistre la température à intervalles réguliers.

On modélise l'échange thermique par la même EDO que pour le café :

$$
\frac{dT}{dt} = -k\,\bigl(T(t) - T_{\mathrm{amb}}\bigr), \qquad T(0) = T_0.
$$

La différence fondamentale avec le CM1 : **on ne connaît pas $k$**. Ce coefficient dépend de la géométrie de la dalle, de l'humidité, du vent, de la présence d'une bâche de protection, etc. L'ingénieur doit le retrouver à partir des mesures.

Données simulées pour le cours (jeu minimal, cohérent avec $k = 0{,}02\ \mathrm{min}^{-1}$) :

| $t$ (min) |  0 | 30 | 60 | 90 | 120 |
|-----------|----|----|----|----|-----|
| $T$ (°C)  | 45 | 31{,}46 | 24{,}03 | 19{,}95 | 17{,}71 |

Au début de la séance, on n'utilisera qu'une seule mesure (typiquement $T(60) = 24{,}03\ \degC$) pour présenter Newton sur un problème scalaire. Le jeu complet servira pour l'ouverture moindres carrés.

### Déroulé proposé

| Partie | Contenu | Durée |
|--------|---------|-------|
| 1 | Rappel actif du semestre | 10 min |
| 2 | Le défaut d'Euler : démonstration pendule | 10 min |
| 3 | Construction de RK2 (Heun) | 20 min |
| 4 | Ordre d'une méthode et validation numérique | 15 min |
| 5 | Fil rouge : identification thermique par Newton | 35 min |
| 6 | Ouverture : moindres carrés et quasi-Newton | 15 min |
| 7 | Bilan et préparation de l'examen blanc | 5 min |
|   | **Total** | **1h50** |

Dix minutes de marge sont prévues pour absorber les interactions. La section 5, cœur du CM, dispose du temps le plus long ; elle est le moment où les outils du semestre convergent.

---

#### 1. Rappel actif du semestre — 10 min

Objectif : remettre en mémoire, par questions orales, les quatre outils qui vont servir dans le CM3 : Euler, différences finies, Newton, et l'idée d'approximation avec erreur contrôlable.

##### Questions à poser

Quatre questions très courtes, une à deux minutes chacune, à poser à la cantonade :

- « En une phrase, c'est quoi la méthode d'Euler ? »
  Réponse attendue : on remplace la dérivée par un quotient de différences et on avance pas à pas : $T_{n+1} = T_n + \Delta t\,f(t_n, T_n)$.

- « Comment approcher $f'(x)$ quand on ne connaît $f$ qu'en quelques points ? »
  Réponse attendue : différence progressive, rétrograde, centrée (CM2).

- « Qu'est-ce que la méthode de Newton, et à quoi ça sert ? »
  Réponse attendue : trouver un zéro de $g(x)=0$ en itérant $x_{n+1} = x_n - g(x_n)/g'(x_n)$ (TD4).

- « Pourquoi fait-on de l'analyse numérique ? »
  Réponse attendue : parce qu'on ne sait pas toujours résoudre un problème à la main, et qu'un calcul approché bien maîtrisé vaut mieux qu'une solution exacte inaccessible.

##### Transition

Annoncer le programme :

> « Aujourd'hui, on va faire deux choses. D'abord, améliorer Euler. Ensuite, s'en servir avec Newton pour faire quelque chose de nouveau : partir de mesures et retrouver un paramètre physique. Et tout ça tournera autour d'une dalle de béton sur un chantier. »

Garder la dalle de béton comme promesse : on y reviendra explicitement en section 5.

---

#### 2. Le défaut d'Euler — 10 min

Objectif : faire voir, sur un cas physique simple et parlant, qu'Euler peut produire des résultats qualitativement faux, même avec un pas « raisonnable ». Motiver ainsi la construction d'une meilleure méthode.

##### Choix du contre-exemple : le pendule simple

Le contre-exemple n'est pas la dalle de béton — sur laquelle Euler se comporte très bien — mais un **pendule simple non amorti**. C'est un choix pédagogique :

- la dalle de béton est le fil rouge ingénieur, à garder « propre » pour la section 5 ;
- le pendule expose un défaut d'Euler beaucoup plus visible : l'amplitude des oscillations augmente artificiellement à chaque période.

Équation du pendule sous forme de système :

$$
\frac{d\theta}{dt} = \omega, \qquad \frac{d\omega}{dt} = -\frac{g}{L}\sin\theta.
$$

Pour le cours, on peut linéariser en $\sin\theta \approx \theta$ sans perdre l'effet (c'est un oscillateur harmonique).

##### Démonstration

Présenter (au tableau ou sur une figure préparée) le résultat du schéma d'Euler explicite appliqué au pendule sur une dizaine de périodes :

- l'amplitude des oscillations **augmente à chaque période** ;
- l'énergie mécanique, qui devrait être constante, **croît sans borne** ;
- pourtant, le pas de temps est tout à fait raisonnable (quelques dizaines de points par période).

Questions à poser :

- « Physiquement, un pendule non amorti, ça fait quoi ? »
  Réponse : oscillations d'amplitude constante (énergie conservée).

- « Est-ce que réduire le pas de temps pourrait sauver Euler ? »
  Réponse : oui, mais il faut $\Delta t$ très petit, donc beaucoup plus de calculs — et le défaut ne disparaît qu'asymptotiquement.

##### Diagnostic

Écrire au tableau le diagnostic clé :

> Euler fait **une erreur d'ordre $(\Delta t)^2$ par pas** ; accumulée sur $N$ pas, l'erreur globale est d'ordre $\Delta t$. On dit qu'Euler est d'ordre **un**. Tout ce qui a une courbure (une dérivée seconde non nulle) est mal capturé.

Formuler la question qui motive la section suivante :

> « Peut-on, avec un tout petit peu plus de travail par pas, faire beaucoup mieux ? »

---

#### 3. Construction de RK2 (méthode de Heun) — 20 min

Objectif : construire RK2 non pas comme une formule tombée du ciel, mais comme la réponse naturelle à un défaut identifié d'Euler. Le fil conducteur : « Euler utilise la pente au **début** du pas ; et si on essayait de la corriger ? »

##### Étape 1 — Relecture d'Euler (3 min)

Rappeler au tableau :

$$
T_{n+1} = T_n + \Delta t\,f(t_n, T_n).
$$

Poser la question centrale :

- « Quelle pente utilise-t-on pour avancer du temps $t_n$ au temps $t_{n+1}$ ? »
  Réponse : uniquement celle au point de départ, $f(t_n, T_n)$.

- « Est-ce que cette pente est la bonne pour représenter tout le pas ? »
  Réponse : non. La pente change entre $t_n$ et $t_{n+1}$ ; utiliser seulement celle de départ sous-estime ou surestime systématiquement.

Dessiner : sur une courbe croissante concave, la pente en $t_n$ est plus grande que la pente moyenne ; Euler « dépasse ». Sur une courbe convexe, Euler « retarde ».

##### Étape 2 — L'idée : moyenner deux pentes (5 min)

Faire émerger l'idée par question :

> « Si la pente au début du pas n'est pas représentative, quelle pente serait plus juste ? »

Guider vers une pente « moyenne » entre le début et la fin du pas :

$$
T_{n+1} \approx T_n + \Delta t \cdot \frac{f_{\text{début}} + f_{\text{fin}}}{2}.
$$

Faire remarquer le problème :

- « Pour calculer la pente à la fin, il faudrait connaître $T_{n+1}$… qu'on cherche justement ! »

Deux issues possibles :

- soit on résout implicitement (schéma implicite, vu en CM2 sur le colorant) ;
- soit on **estime** $T_{n+1}$ avec Euler, puis on corrige.

C'est cette seconde idée qui donne RK2.

##### Étape 3 — Écriture de la méthode de Heun (7 min)

Faire écrire ensemble :

**Prédicteur (Euler explicite) :**

$$
k_1 = f(t_n, T_n), \qquad \tilde{T}_{n+1} = T_n + \Delta t\,k_1.
$$

**Pente estimée à la fin du pas :**

$$
k_2 = f(t_n + \Delta t,\; \tilde{T}_{n+1}).
$$

**Correcteur (moyenne des deux pentes) :**

$$
\boxed{\;T_{n+1} = T_n + \frac{\Delta t}{2}\,(k_1 + k_2).\;}
$$

Insister sur la nature de la méthode :

- Ce n'est pas une « nouvelle » discrétisation abstraite ; c'est **Euler corrigé par Euler**.
- Le coût est le double d'Euler (deux évaluations de $f$ par pas), mais c'est un petit prix.
- La formule ressemble à la **règle des trapèzes** pour une intégrale : moyenne des valeurs aux deux extrémités. Ce n'est pas un hasard ; c'est littéralement trapèzes appliqués à l'intégrale de $f$ sur $[t_n, t_{n+1}]$.

Faire le parallèle explicitement au tableau :

| CM1–TD1 | CM3 |
|---------|-----|
| Règle des rectangles à gauche pour $\int f\,dt$ | Euler explicite |
| Règle des trapèzes pour $\int f\,dt$ | Heun (RK2) |

C'est un moment de satisfaction intellectuelle : une méthode d'intégration numérique déjà connue (trapèzes) donne spontanément un schéma amélioré pour les EDO. Les briques du semestre se relient.

##### Étape 4 — Application à la main (5 min)

Une micro-activité pour ancrer la formule. On la fait sur la **dalle de béton**, qui reparaît à ce moment pour la première fois.

Données : $T_0 = 45$, $T_{\mathrm{amb}} = 15$, $k = 0{,}02\ \mathrm{min}^{-1}$, $\Delta t = 30$ min. On calcule $T_1$ par Heun.

$$
f(t, T) = -0{,}02\,(T - 15).
$$

- $k_1 = -0{,}02 \times (45 - 15) = -0{,}6$.
- $\tilde{T}_1 = 45 + 30 \times (-0{,}6) = 27$.
- $k_2 = -0{,}02 \times (27 - 15) = -0{,}24$.
- $T_1 = 45 + \frac{30}{2}\,(-0{,}6 - 0{,}24) = 45 - 12{,}6 = 32{,}4$.

Comparaison :

| Méthode      | $T_1$ calculé | Solution exacte $T(30) = 15 + 30\,e^{-0{,}6}$ |
|--------------|---------------|----------------------------------------------|
| Euler explicite | $27{,}0$   | $31{,}46$ |
| Heun (RK2)   | $32{,}4$      | $31{,}46$ |

Heun est **nettement plus proche** de la solution exacte qu'Euler, avec seulement une évaluation supplémentaire de $f$.

Activité : laisser les étudiants faire le calcul en 2–3 minutes en binôme, puis afficher les valeurs. Faire verbaliser la conclusion : « même pas, deux fois plus d'évaluations, une erreur divisée par bien plus que deux ».

---

#### 4. Ordre d'une méthode et validation — 15 min

Objectif : donner un sens précis au mot « meilleur », et faire le pont avec ce qui a été dit en TD4 sur l'estimation d'erreurs.

##### Étape 1 — Définition informelle de l'ordre (4 min)

Écrire au tableau :

> Une méthode est d'**ordre $p$** si l'erreur globale (après avoir intégré sur un intervalle fixe) se comporte comme $C\,(\Delta t)^p$ quand $\Delta t \to 0$.

- Euler explicite : ordre 1. Diviser $\Delta t$ par 2 divise l'erreur par 2.
- Heun (RK2) : ordre 2. Diviser $\Delta t$ par 2 divise l'erreur par 4.
- RK4 (évoqué) : ordre 4. Diviser $\Delta t$ par 2 divise l'erreur par 16.

Message à faire passer :

> L'ordre gouverne **le rendement** de la méthode. Avec RK2, quand on s'endette de 2× en coût par pas, on récupère une précision qui s'améliore beaucoup plus vite quand on raffine. C'est le rapport qualité/prix.

##### Étape 2 — Validation numérique (8 min)

Présenter (figure préparée) les résultats d'une expérience : on résout l'EDO de la dalle sur $[0, 120]$ min, solution exacte connue, et on trace l'erreur maximale en fonction du pas $\Delta t$, en échelle log-log.

| $\Delta t$ (min) | Erreur max Euler | Erreur max Heun |
|------------------|------------------|-----------------|
| 30               | 4{,}5            | 0{,}9           |
| 15               | 2{,}3            | 0{,}23          |
| 7{,}5            | 1{,}15           | 0{,}057         |
| 3{,}75           | 0{,}58           | 0{,}014         |

Questions :

- « Quand on divise $\Delta t$ par 2, par combien l'erreur d'Euler est-elle divisée ? »
  Réponse : par environ 2 → pente 1 en log-log.

- « Et celle de Heun ? »
  Réponse : par environ 4 → pente 2 en log-log.

C'est la signature graphique de l'ordre. Faire remarquer que l'on peut **mesurer** l'ordre d'une méthode dans un code : raffiner le pas et regarder la pente log-log de l'erreur. C'est une compétence utile en examen et en TP.

##### Étape 3 — Retour sur le pendule (3 min)

Annoncer, sans refaire les calculs : « Si on applique Heun au pendule, l'amplitude n'augmente presque plus sur 10 périodes — le défaut vu en section 2 est essentiellement éliminé pour un pas raisonnable. »

Préciser pour la culture : il existe des schémas encore mieux adaptés aux problèmes conservatifs (schémas symplectiques), mais c'est hors programme. L'essentiel : monter en ordre résout beaucoup de choses.

---

#### 5. Fil rouge : identification thermique par Newton — 35 min

Objectif : faire vivre un **problème inverse** de bout en bout. Les étudiants ont toujours été du côté « équation → solution ». Ici, on a une mesure et on cherche un paramètre. C'est le moment où Newton (TD4), Euler/RK (CM1, maintenant), et la notion d'erreur se rencontrent sur un exemple d'ingénieur réaliste.

##### a. Mise en situation (3 min)

Présenter :

> « Sur le chantier, la dalle vient d'être coulée. Sa température initiale est de $45\,\degC$. Un capteur lit $T(60) = 24{,}03\,\degC$ au bout d'une heure. On veut prédire dans combien de temps la dalle aura atteint $18\,\degC$ — condition pour y circuler en sécurité. »

Questions :

- « De quoi a-t-on besoin pour faire cette prédiction ? »
  Réponse attendue : du coefficient $k$ dans l'équation $\dfrac{dT}{dt} = -k(T - T_{\mathrm{amb}})$.

- « Peut-on le mesurer directement ? »
  Réponse : non, c'est un coefficient effectif qui dépend du chantier réel (vent, bâche, humidité).

- « Donc qu'est-ce qu'on peut faire ? »
  Guider vers : ajuster $k$ pour que le modèle reproduise la mesure.

C'est la définition d'un **problème inverse**.

##### b. Formulation mathématique (5 min)

Écrire au tableau. Pour un $k$ donné, on peut calculer une température numérique $T_{\mathrm{num}}(60; k)$ (avec Heun, par exemple). On définit le **résidu** :

$$
g(k) = T_{\mathrm{num}}(60; k) - T_{\mathrm{mesuré}}.
$$

Le bon $k$ est celui qui annule $g$ :

$$
g(k) = 0.
$$

Questions :

- « C'est une équation de quelle nature ? »
  Réponse attendue : non linéaire en $k$ — car $T_{\mathrm{num}}(60; k)$ dépend de $k$ via toute une intégration numérique.

- « On a vu une méthode pour résoudre $g(k) = 0$ quand on n'a pas de formule explicite ? »
  Réponse : Newton (TD4).

##### c. Newton avec un $g$ calculé numériquement (8 min)

Rappel de la formule :

$$
k_{n+1} = k_n - \frac{g(k_n)}{g'(k_n)}.
$$

Question clé :

- « Comment calcule-t-on $g'(k)$ ? On n'a pas de formule explicite pour $g$ ! »

Laisser les étudiants réfléchir. Deux pistes à faire émerger :

1. Approcher $g'(k)$ par une **différence finie** (CM2) :
   $$
   g'(k) \approx \frac{g(k + \delta k) - g(k)}{\delta k}.
   $$
   C'est exactement une méthode **quasi-Newton** (on y revient en section 6).

2. Approcher $g'(k)$ par le calcul : ici, comme la solution exacte de l'EDO est connue analytiquement ($T(t) = T_{\mathrm{amb}} + (T_0 - T_{\mathrm{amb}})e^{-kt}$), on peut dériver directement par rapport à $k$. Mais c'est un cas particulier.

Faire remarquer qu'en ingénierie on ne dispose presque jamais d'une formule fermée : la variante par différences finies est la plus générale et la plus utile.

##### d. Itération à la main (10 min)

On initialise $k_0 = 0{,}03\ \mathrm{min}^{-1}$ (mauvaise estimation a priori) et on vise $T_{\mathrm{mesuré}} = 24{,}03$ à $t = 60$ min.

Pour simplifier les calculs en cours, on utilise la solution exacte $T(60; k) = 15 + 30\,e^{-60k}$, donc :

$$
g(k) = 15 + 30\,e^{-60k} - 24{,}03.
$$

Premier pas :

- $T_{\mathrm{num}}(60; 0{,}03) = 15 + 30\,e^{-1{,}8} \approx 15 + 4{,}96 = 19{,}96$.
- $g(0{,}03) = 19{,}96 - 24{,}03 = -4{,}07$.
- $g'(0{,}03)$ par différence finie avec $\delta k = 10^{-3}$ :
  - $T_{\mathrm{num}}(60; 0{,}031) = 15 + 30\,e^{-1{,}86} \approx 19{,}67$.
  - $g(0{,}031) \approx -4{,}36$, d'où $g'(0{,}03) \approx (-4{,}36 + 4{,}07)/0{,}001 \approx -290$.
- $k_1 = 0{,}03 - (-4{,}07)/(-290) \approx 0{,}03 - 0{,}014 = 0{,}016$.

Deuxième pas :

- $T_{\mathrm{num}}(60; 0{,}016) = 15 + 30\,e^{-0{,}96} \approx 15 + 11{,}48 = 26{,}48$.
- $g(0{,}016) \approx 2{,}45$.
- Nouvelle dérivée par différence finie, même principe. On obtient $k_2 \approx 0{,}0198$.

Troisième pas : $k_3 \approx 0{,}0200$. Convergence atteinte.

Faire remarquer :

- Trois itérations de Newton pour retrouver $k = 0{,}02$ à mieux que $1\ \%$ près.
- À chaque itération, on a résolu (virtuellement) une EDO complète. Dans un code réel, avec Heun, l'ordre de grandeur est le même.
- La convergence est **quadratique** : le nombre de chiffres corrects double à chaque itération.

Activité : faire réaliser **un** pas par les étudiants en binôme (le deuxième ou le troisième, au choix), après que le premier a été fait au tableau. Budget : 4 min.

##### e. Prédiction (3 min)

Avec $k = 0{,}02$, on peut répondre à la question initiale :

$$
T(t) = 18 \iff 15 + 30\,e^{-0{,}02 t} = 18 \iff t = -\frac{1}{0{,}02}\ln\frac{3}{30} \approx 115\ \mathrm{min}.
$$

La dalle pourra être mise en service environ 1h55 après le coulage. Faire remarquer : c'est un résultat d'ingénieur, utilisable, bâti sur une suite de méthodes numériques chaînées.

##### f. Discussion (6 min)

Trois points de recul :

1. **Le problème inverse n'est pas symétrique du problème direct.** Calculer $T$ sachant $k$ est facile (une EDO). Retrouver $k$ sachant $T$ demande une boucle extérieure (Newton) autour d'une résolution d'EDO. C'est pourquoi l'identification est coûteuse en pratique.

2. **Sensibilité.** Si la mesure est bruitée — par exemple $T_{\mathrm{mesuré}} = 24{,}03 \pm 0{,}5$ — quel est l'impact sur $k$ ? Question posée aux étudiants ; on attend une réponse qualitative (« d'autant plus sensible que la dérivée $g'$ est petite »). C'est le lien avec le **conditionnement** vu en TD2/TD4.

3. **Une seule mesure n'est pas réaliste.** En pratique, on a une série de mesures. Comment les utiliser toutes ? C'est la transition vers la section 6.

---

#### 6. Ouverture : moindres carrés et quasi-Newton — 15 min

Objectif : présenter, comme **ouverture culturelle**, ce qui se passe quand la situation est plus réaliste. Ces notions ne sont pas exigibles à l'examen (cf. progression), mais leur évocation donne de la profondeur et prépare le TP éventuel et le monde professionnel.

##### Étape 1 — Plusieurs mesures (5 min)

Présenter le jeu complet :

| $t$ (min) |  0 | 30 | 60 | 90 | 120 |
|-----------|----|----|----|----|-----|
| $T$ mesuré  | 45 | 31{,}5 | 24{,}0 | 20{,}0 | 17{,}7 |

Question :

- « Avec une seule mesure, on avait une équation en $k$. Avec cinq mesures, on en a… cinq. Que faire ? »

Les cinq équations n'ont en général pas de solution commune (bruit de mesure, modèle imparfait). On **ne cherche plus à annuler chaque résidu**, mais à minimiser leur somme des carrés.

Écrire la **fonction coût** :

$$
J(k) = \sum_{i=1}^{N} \bigl(T_{\mathrm{num}}(t_i; k) - T_{\mathrm{mesuré},\,i}\bigr)^2.
$$

Le bon $k$ est celui qui **minimise** $J$. On est passé d'un problème d'équation à un problème d'**optimisation**.

##### Étape 2 — Condition d'optimalité et Newton (5 min)

Lien avec ce qu'on vient de voir :

- Minimiser $J(k)$, c'est résoudre $J'(k) = 0$.
- On a donc ramené un problème d'optimisation à une **équation non linéaire** — ce qu'on sait faire.
- Newton sur $J'$ : il faut $J''$. Coûteux si plusieurs paramètres.

Annoncer proprement le vocabulaire :

- **Newton** : utilise la dérivée seconde (Hessienne en dimension > 1). Convergence quadratique mais coûteux.
- **Quasi-Newton** (BFGS) : approche la Hessienne par différences finies ou par mise à jour successive. Moins de calculs, presque aussi bon.
- **Levenberg-Marquardt** : variante adaptée spécifiquement aux moindres carrés non linéaires (ajustement de paramètres de modèle). Standard en ingénierie.
- En pratique, on appelle `scipy.optimize.curve_fit` ou `scipy.optimize.least_squares` — mais ces outils, sous le capot, font exactement ce qu'on vient de décrire.

Message à faire passer :

> Les méthodes avancées ne sont pas magiques. Ce sont des combinaisons astucieuses de ce qu'on a vu cette année : différences finies + Newton + systèmes linéaires.

##### Étape 3 — Illustration visuelle (5 min)

Montrer (figure préparée) le tracé de $J(k)$ pour $k \in [0{,}005, 0{,}05]$ :

- une courbe en cuvette avec un minimum en $k \approx 0{,}02$ ;
- la pente $J'(k)$ en dessous, qui traverse zéro au même endroit ;
- une ou deux itérations de Newton sur $J'(k) = 0$, montrant la convergence vers le minimum.

Conclure visuellement : chercher le zéro de la pente d'une fonction coût, c'est ça l'optimisation de base. Le reste, c'est de l'accélération et de la généralisation.

---

#### 7. Bilan et préparation du CM4 — 5 min

Objectif : cristalliser les acquis et annoncer l'examen blanc.

##### Institutionnalisation (3 min)

Faire formuler par la classe, puis inscrire au tableau :

1. **RK2 (Heun)** : en doublant le coût d'Euler par pas, on passe d'un schéma d'ordre 1 à un schéma d'ordre 2. L'erreur décroît en $(\Delta t)^2$ au lieu de $\Delta t$.
2. **Ordre d'une méthode** : se constate en raffinant le pas et en regardant la pente log-log de l'erreur.
3. **Problème inverse** : partir de mesures, retrouver un paramètre. Se formule comme $g(k) = 0$ et se résout par Newton, quitte à approcher $g'$ par différence finie.
4. **Fonction coût et moindres carrés** : quand il y a plusieurs mesures, on minimise une somme de carrés — l'optimisation devient un zéro de gradient.

Ces quatre points sont le cœur à emporter.

##### Annonce du CM4 (2 min)

Annoncer que le CM4 sera **un examen blanc** dans les conditions réelles :

- sujet couvrant système linéaire, EDO/EDP, interpolation ou intégration numérique ;
- questions mêlant calcul à la main (1–2 itérations) et analyse critique (choix de méthode, perturbation, conditionnement) ;
- durée et format proches de l'examen final du 26 mai.

Inviter les étudiants à réviser :

- les **formules** des différences finies, d'Euler et maintenant de Heun ;
- les **mécanismes** de Newton et de la résolution d'un système linéaire par pivot ;
- les **intuitions** sur stabilité, convergence, conditionnement — pas les démonstrations.

Clore sur la dalle de béton :

> « Aujourd'hui, on a mis sur la même dalle : une EDO, un schéma d'ordre 2, un problème inverse, une méthode de Newton et une ouverture sur les moindres carrés. Le module entier tourne autour de ce type d'enchaînement. L'examen ne sera pas plus compliqué que ça. »

---

## Articulation avec les séances précédentes

L'enchaînement sur tout le semestre :

- **CM1** — café : besoin de discrétiser une EDO, Euler.
- **CM2** — colorant : généraliser en espace, le choix du schéma compte, apparition de systèmes linéaires.
- **TD1–TD2** — interpolation/quadrature et systèmes linéaires en pratique.
- **TD3–TP2** — itératives, PageRank, conditionnement.
- **TD4** — Newton, estimations d'erreur.
- **CM3** — tout se croise : RK2 est un trapèze déguisé, Newton attaque un problème inverse, les moindres carrés ouvrent vers l'optimisation.
- **CM4** — examen blanc sur un sujet intégré.

Reprise explicite des fils rouges :

| | CM1 | CM2 | CM3 |
|--|-----|-----|-----|
| Situation | Café | Colorant | Dalle de béton |
| Équation | EDO refroidissement | EDP transport | EDO refroidissement, param. inconnu |
| Outil central | Euler | Différences finies + Euler | RK2 + Newton |
| Question clé | Quand boire ? | Où va le colorant ? | Quand circuler dessus ? |

Les étudiants doivent reconnaître que les trois CM répondent à trois versions croissantes du même type de question d'ingénieur.

## Articulation avec la suite

- **CM4** (29 avril) : examen blanc, sujet intégré. Ce CM3 fournit un modèle de sujet possible (dalle de béton + identification) qu'on peut reprendre en variant les méthodes demandées.
- **Examen final** (26 mai) : les compétences attendues sont couvertes. Le CM3 a servi à les faire dialoguer.
- Un prolongement possible en TP (si créneau libre) : coder la section 5 en Python, avec `scipy.optimize` pour valider la convergence de Newton à la main.

## Formats d'interactivité à privilégier

Le CM3 est un cours de synthèse, long et riche. L'interactivité évite qu'il bascule en magistral pur :

- **Questions orales rapides** : chaque début de section pose une question ouverte (20–30 s de silence, puis réponse).
- **Deux micro-activités écrites** :
  - un pas de Heun sur la dalle (section 3d, 3 min) ;
  - un pas de Newton sur $g(k) = 0$ (section 5d, 4 min).
- **Démonstrations visuelles** : trajectoire du pendule, courbe d'erreur log-log, courbe $J(k)$. Ce sont des figures préparées à l'avance ; les commenter en posant des questions sur ce qu'on voit.
- **Construction collective au tableau** : la formule de Heun et la reformulation en $g(k) = 0$ se construisent en dialogue, pas en dictée.
- **Moments de satisfaction** à ne pas écraser :
  - la reconnaissance que Heun = Euler + trapèzes ;
  - la résolution réussie du problème inverse en 3 itérations ;
  - le lien final entre moindres carrés et zéro de gradient.

Le principe : ne jamais passer plus de 5–7 minutes sans question, contribution ou calcul.

## Points de vigilance pédagogique

### Ne pas surcharger

Le CM3 est dense. Plusieurs options de soulagement si le timing dérape :

- **Section 2 (pendule)** : si nécessaire, se contenter d'une figure et d'une phrase (« Euler explose l'énergie »), sans dériver l'équation du pendule. C'est le défaut qu'on veut faire sentir, pas la dynamique.
- **Section 4 (ordre)** : le tableau d'erreurs peut être commenté sans calcul ; le message est qualitatif.
- **Section 6 (ouverture)** : culturelle, peut être réduite à 5 min sans dommage majeur. L'important est que les mots « moindres carrés » et « quasi-Newton » aient été prononcés.

**Section à ne jamais sacrifier** : la section 5 (fil rouge inverse). C'est le sens pédagogique du CM.

### Éviter le formalisme

- Ne pas démontrer l'ordre de Heun par Taylor — le faire constater, pas prouver.
- Ne pas introduire RK4 en détail, seulement le mentionner (« même idée, plus de pentes moyennées »).
- Ne pas entrer dans la théorie de l'optimisation (Hessienne, gradient) en dimension > 1 sauf si le niveau de la classe le permet clairement.

### Erreurs prévisibles des étudiants

- Confondre $k_1, k_2$ de Heun avec les itérés $k_0, k_1, \ldots$ de Newton (les notations se télescopent). Utiliser éventuellement $p_1, p_2$ pour les pentes de Heun, ou bien expliciter à chaque fois.
- Oublier que $g'$ doit être approché numériquement dans le cas général. Certains essaieront de dériver l'expression analytique et conclueront que « c'est facile ». Rappeler que c'est un cas particulier dû à la forme fermée disponible ici.
- Penser que le problème inverse est « juste Newton » sans réaliser que chaque appel à $g$ contient une résolution d'EDO.

### Moments clés à ne pas rater

1. **Heun = trapèzes** (section 3, étape 3) : c'est un moment de satisfaction intellectuelle. Laisser quelques secondes après l'annonce.
2. **Itérations Newton qui convergent en 3 pas** (section 5d) : la vitesse de convergence quadratique est impressionnante ; faire remarquer explicitement que les chiffres corrects doublent.
3. **Le gradient qui s'annule au minimum** (section 6, étape 3) : le pont entre « résoudre » et « optimiser » doit être rendu évident par la figure.

## Suite du travail

Ce plan sert de base pour :

- la rédaction du poly à trous `CM3.tex` (suivre la même mise en page que CM1/CM2) ;
- la préparation des figures : trajectoire pendule Euler vs. Heun, erreur log-log, courbe $J(k)$, cuvette de la fonction coût ;
- la préparation d'une mini-démo Python (optionnelle) montrant Newton convergeant en direct ;
- la conception du sujet d'examen blanc du CM4, qui pourra reprendre la dalle de béton en variant les méthodes demandées (interpolation des mesures, trapèzes pour un flux de chaleur moyen, etc.).

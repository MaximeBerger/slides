# Progression 2025-2026 - Probabilités et statistiques

## Positionnement du module

- Public : `PGE1`, semestre 6, étudiants de première année d'école d'ingénieurs de la construction.
- Volume horaire enseignant : `12 h de CM` et `5 TD` par groupe.
- Logique pédagogique : partir de situations d'ingénierie, introduire uniquement les outils utiles pour modéliser, calculer et conclure.
- Choix didactique : pas de démonstrations dans le poly ; définitions, outils, méthodes, exemples, interprétation.

## Principes pédagogiques de référence

- `Autonomie cadrée` : l'étudiant doit être actif, mais le cours doit donner des objectifs explicites, des méthodes stables et des jalons clairs.
- `Méthode transférable` : chaque notion doit déboucher sur une manière de raisonner réutilisable dans d'autres situations.
- `Rigueur sans abstraction gratuite` : on conserve l'exigence intellectuelle, mais on évite les détours trop formels qui masquent l'outil utile.
- `Esprit critique` : les étudiants doivent apprendre à discuter les hypothèses d'un modèle, pas seulement à appliquer des formules.
- `Ancrage métier` : chaque chapitre doit faire sentir à quoi sert l'outil pour un futur ingénieur du BTP.
- `Faible dépendance au numérique` : les dispositifs interactifs doivent rester facultatifs et remplaçables par des versions papier, tableau ou main levée.

## Compétences visées

1. Identifier une expérience aléatoire pertinente dans un contexte de chantier, de contrôle ou de mesure.
2. Choisir un modèle probabiliste simple et expliciter ses hypothèses.
3. Calculer une probabilité, une espérance, une variance ou une fonction de répartition.
4. Relier un résultat probabiliste à une décision d'ingénierie.
5. Utiliser les lois classiques pour un problème de conformité, de fiabilité ou de planification.
6. Passer d'un modèle probabiliste à un raisonnement statistique sur échantillon.
7. Construire et interpréter un intervalle de confiance sur une moyenne ou une proportion.
8. Rédiger une conclusion technique courte et correcte.
9. Critiquer un modèle : hypothèses, limites, interprétation et plausibilité du résultat.

## Fils rouges proposés

- `Contrôle qualité du béton` : conformité d'un lot, résistance à 28 jours, éprouvettes, risque de non-conformité.
- `Météo et planification de chantier` : fenêtres de coulage, jours favorables, aléa météo, aide à la décision.
- `Contrôle de production` : boulons, pieux, capteurs, incidents sur engins, livraisons non conformes.
- `Mesures de terrain` : résistance, délai, longueur de fissure, pluie, temps d'attente, épaisseur d'enrobé.

## Traduction concrète dans les séances

- Chaque CM doit contenir au moins un `problème d'ouverture`, un `moment de reformulation` par les étudiants et une `conclusion méthode`.
- Les TD doivent commencer par la question de terrain et non par le nom de la loi à utiliser.
- Les interactions ne doivent pas dépendre exclusivement de Wooclap : chaque activité doit aussi pouvoir se faire sur feuille, à l'oral ou au tableau.
- Les parties les plus abstraites doivent être ramenées à leur utilité pratique. Exemple : on n'insiste pas sur la tribu comme objet théorique ; on insiste sur ce qu'un modèle permet ou non de calculer.
- La dernière question d'un exercice doit souvent être : `que signifie ce résultat pour l'ingénieur ?`

## Vue d'ensemble des séances

| Séance | Date | Nature | Durée | Objectif principal |
|---|---:|---|---:|---|
| TD0 | 17/03 ou 19/03 | TD diagnostic | 2h30 | Poser le vocabulaire, lire des données chantier, faire émerger le besoin de modéliser |
| CM1 | 30/03 | CM | 1h00 | Modéliser l'aléa : univers, événements, opérations, variables |
| TD1 | 31/03 | TD | 2h30 | Manipuler événements, arbres, conditionnement simple |
| CM2 | 07/04 | CM | 1h30 | Conditionnement, probabilités totales, Bayes, indépendance |
| CM3 | 21/04 | CM | 2h30 | Variables discrètes, lois classiques, espérance, variance |
| TD2 | 22/04 ou 28/04 | TD | 2h30 | Lois discrètes en contrôle qualité et aide à la décision |
| CM4 | 05/05 | CM | 2h30 | Variables continues, densités, répartition, loi normale |
| TD3 | 06/05 | TD | 2h30 | Densités, probabilités sur intervalles, loi normale |
| CM5 | 12/05 | CM | 2h30 | Échantillonnage, moyenne, proportion, TCL |
| CM6 | 19/05 | CM | 2h00 | Estimation, intervalles de confiance, synthèse méthode |
| TD4 | 20/05 | TD | 2h30 | Révision guidée par compétences, mini sujet blanc |
| Examen | 27/05 | Évaluation | 2h00 | Mobiliser l'ensemble des outils sur 4 exercices appliqués |

## Matrice competences x seances

| Competence | TD0 | CM1 | TD1 | CM2 | CM3 | TD2 | CM4 | TD3 | CM5 | CM6 | TD4 | Exam |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Identifier l'experience aleatoire | X | X | X | X |  |  |  |  |  |  | X | X |
| Definir evenements et operations | X | X | X | X |  |  |  |  |  |  | X | X |
| Utiliser le conditionnement |  |  | X | X |  |  |  |  |  |  | X | X |
| Discuter l'independance |  | X | X | X | X | X | X |  |  |  | X | X |
| Choisir une loi discrete |  |  |  |  | X | X |  |  |  |  | X | X |
| Calculer esperance et variance |  |  |  |  | X | X |  |  |  |  | X | X |
| Choisir une loi continue |  | X |  |  |  |  | X | X |  |  | X | X |
| Lire une fonction de repartition |  |  |  |  | X | X | X | X |  |  | X | X |
| Passer a l'echantillonnage |  |  |  |  |  |  |  |  | X | X | X | X |
| Construire un IC |  |  |  |  |  |  |  |  | X | X | X | X |
| Interpretrer pour decider | X | X | X | X | X | X | X | X | X | X | X | X |

## Detail de chaque seance

### TD0 - Diagnostic applique

- Objectif : faire verbaliser les notions avant tout formalisme.
- Support : tableaux de resistance, releves meteo, nombre de pieces defectueuses.
- Sorties attendues :
  - distinguer resultat observe et question de decision ;
  - identifier ce qui releve du discret et du continu ;
  - comprendre qu'une frequence observee n'est pas une garantie.

### CM1 - Modeliser l'alea en ingenierie

- Notions : univers, evenements, complementaire, union, intersection, variable discrete ou continue.
- Fil rouge : beton C25/30 et donnees de chantier.
- Message cle : le modele n'est pas la realite ; il sert a rendre la decision calculable.

### TD1 - Evenements, arbres, conditionnement simple

- Savoir-faire :
  - traduire un enonce en evenements ;
  - remplir un arbre pondere ;
  - calculer une probabilite conditionnelle elementaire ;
  - rediger une conclusion concise.

### CM2 - Conditionner l'information

- Notions : `P(A|B)`, probabilites totales, Bayes, independance.
- Fil rouge : capteur de non-conformite, chantier A ou B, information partielle.
- Message cle : une information supplementaire change le calcul et parfois la decision.

### CM3 - Variables discretes et lois classiques

- Notions : loi, esperance, variance, Bernoulli, binomiale, geometrique, Poisson, indicatrices.
- Fil rouge : lots non conformes, incidents journaliers, controle de pieces.
- Message cle : la loi permet de passer d'un recit a un calcul reproductible.

### TD2 - Controle qualite et risque

- Savoir-faire :
  - reconnaitre la bonne loi discrete ;
  - justifier les hypotheses ;
  - calculer un cout moyen et un risque de perte ;
  - comparer deux strategies de controle ;
  - modeliser un temps d'attente discret par une loi geometrique.

### CM4 - Variables continues et mesures

- Notions : densite, fonction de repartition, uniforme, exponentielle, normale.
- Fil rouge : resistance, duree de livraison, temps d'attente d'une toupie, precision de capteurs.
- Message cle : avec une grandeur mesuree, on travaille sur des intervalles et non sur une valeur isolee.

### TD3 - Densites et loi normale

- Savoir-faire :
  - verifier qu'une fonction est une densite ;
  - calculer une probabilite par integration ou via la repartition ;
  - centrer-reduire ;
  - exploiter une table normale.

### CM5 - De la probabilite a la statistique

- Notions : echantillon, moyenne empirique, proportion empirique, dispersion, TCL.
- Fil rouge : campagne d'essais sur eprouvettes, sondage technique, controle de production.
- Message cle : on n'observe pas la population entiere ; on raisonne a partir d'un echantillon.

### CM6 - Estimation et intervalles de confiance

- Notions : estimateur, intervalle de confiance d'une moyenne et d'une proportion, marge d'erreur, interpretation.
- Fil rouge : verifier une conformite moyenne, estimer une part de pieces defectueuses.
- Message cle : un intervalle de confiance n'est pas une certitude, mais un outil d'aide a la decision.

### TD4 - Revision et sujet blanc

- Organisation :
  - une premiere partie par competences ;
  - une seconde partie en mini sujet d'examen ;
  - un dernier temps sur les erreurs frequentes.

## Outils explicitement presentes aux etudiants

### Outils probabilistes

- Vocabulaire : univers, evenements, variable aleatoire.
- Calcul sur les evenements : union, intersection, complementaire.
- Probabilite conditionnelle et arbre.
- Probabilites totales.
- Formule de Bayes.
- Independance comme hypothese de modelisation.

### Lois discretes

- Bernoulli.
- Binomiale.
- Geometrique, pour un rang du premier succes ou du premier defaut.
- Poisson, comme modele de comptage d'evenements rares sur une duree ou une zone.

### Lois continues

- Uniforme.
- Exponentielle.
- Normale.

### Outils statistiques

- Moyenne empirique.
- Variance et ecart-type empiriques.
- Proportion empirique.
- Theoreme central limite comme outil de calcul.
- Intervalles de confiance usuels.

## Principes de redaction du poly

- Une notion = une definition courte + un encadre methode + un mini-exemple BTP.
- Les hypotheses doivent etre ecrites en francais simple avant la formule.
- Les calculs types doivent etre presentes sous forme de procedure.
- Chaque chapitre doit finir par `ce qu'il faut savoir faire`.
- Les erreurs frequentes doivent etre signalees explicitement.

## Ligne directrice pour les TD

- Partir d'un contexte lisible avant toute formule.
- Exiger le choix du modele avant le calcul.
- Finir par une interpretation technique.
- Varier les contextes sans changer inutilement les structures mathematiques.

## Format cible de l'examen

- Duree : `2 h`.
- Sans calculatrice, sans document.
- `4 exercices` courts a moyens, independants.
- Barreme cible :
  - exercice 1 : evenements, arbre, conditionnement ;
  - exercice 2 : loi discrete appliquee ;
  - exercice 3 : densite ou loi normale ;
  - exercice 4 : estimation, TCL, IC et conclusion.

## Risques pedagogiques a eviter

- Formalisme trop precoce sur la tribu ou les preuves.
- Exemples hors metier, peu memorisables pour des PGE1 construction.
- Usage mecanique des formules sans justification du modele.
- Confusion entre probabilite theorique et frequence observee.
- Confusion entre moyenne individuelle et moyenne d'echantillon.

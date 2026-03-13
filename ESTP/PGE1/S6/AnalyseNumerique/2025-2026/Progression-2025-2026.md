# Progression 2025-2026 - Analyse numérique

Eplorer https://cpge-itc.github.io/bcpst2/dl/bcpst/4_euler/euler.html

## Positionnement du module

- Public : `PGE1`, semestre 6.
- Volume horaire : `4 CM`, `4 TD` et `2 TP` avant l'examen.
- Fil directeur : passer d'un modèle continu à un calcul exploitable, puis discuter la précision, le coût et la robustesse numérique.

## Compétences visées

1. Transformer un problème d'ingénierie simple en problème numérique.
2. Choisir une méthode d'approximation adaptée : interpolation, quadrature, résolution de systèmes linéaires, schéma pour EDO.
3. Mettre en oeuvre une méthode sur un exemple à la main puis avec Python.
4. Comparer plusieurs approches selon la précision, la stabilité, le temps de calcul et la sensibilité aux données.
5. Interpréter un résultat numérique dans un contexte de construction, de mesure ou de modélisation.
6. Identifier les limites d'une méthode : divergence, mauvais conditionnement, pas trop grand, modèle trop simplifié.

## Axes du cours

- `EDO et EDP` : rappels, méthode d'Euler, différences finies, équation de la chaleur.
- `Interpolation et intégration numérique` : polynômes de Lagrange, rectangles, trapèzes, Simpson.
- `Systèmes linéaires` : pivot de Gauss, factorisation `LU`, méthodes itératives, conditionnement.
- `Applications` : éléments finis 1D, matrices stochastiques, PageRank, sensibilité des calculs.
- `Ouverture optimisation` : méthode de Newton pour une équation non linéaire, idée des méthodes quasi-Newton et de Levenberg-Marquardt pour l'ajustement de paramètres.

## Applications proposées

- Profil de façade, surface à peindre, quantité d'isolant.
- Flèche d'une poutre ou déformation d'un élément discrétisé.
- Équilibre d'une structure simplifiée et calibration d'un paramètre par Newton.
- Diffusion de chaleur dans une paroi.
- Matrice de rigidité tridiagonale issue d'un maillage 1D.
- Classement d'importance par `PageRank`.
- Matrices stochastiques pour l'évolution de classes de risque en assurance.

## Progression des séances

| Séance | Date | Nature | Durée | Contenu principal |
| ------ | ---- | ------ | ----- | ----------------- |
| CM1 | 17/03/2026 | CM | 2h30 | Rappels sur les erreurs numériques, modélisation par EDO, méthode d'Euler explicite, lecture qualitative d'un schéma numérique. |
| CM2 | 19/03/2026 | CM | 1h30 | Différences finies pour EDO et EDP simples, lien entre discrétisation et systèmes linéaires, introduction à la stabilité et à la convergence. |
| TP1 | 24/03/2026 ou 31/03/2026 | TP | 2h30 | Notebook Python : Euler sur une EDO simple, visualisation temporelle, pendule, ajout de frottements, première animation. |
| TD1 | 01/04/2026 ou 02/04/2026 | TD | 2h30 | Interpolation de Lagrange et intégration numérique avec applications à une façade et à des mesures expérimentales. |
| TD2 | 03/04/2026 ou 07/04/2026 | TD | 2h30 | Pivot de Gauss, `LU`, systèmes linéaires issus d'un modèle discrétisé, perturbation du second membre et conditionnement. |
| TD3 | 08/04/2026 ou 14/04/2026 | TD | 2h30 | Méthodes itératives, convergence, matrices stochastiques, PageRank, interprétation de solutions stationnaires. |
| TP2 | 15/04/2026 | TP | 2h30 | Python : comparaison méthodes directes / itératives, temps de calcul, convergence, perturbations, nombre de condition. |
| TD4 | 17/04/2026 | TD | 2h30 | Estimation d'erreurs sur Euler, quadrature et différences finies, méthode de Newton pour une équation non linéaire issue d'un modèle simplifié. |
| CM3 | 23/04/2026 | CM | 2h00 | Synthèse sur les schémas de résolution d'EDO, comparaison Euler / Runge-Kutta, introduction à Newton, quasi-Newton et à l'ajustement de paramètres. |
| CM4 | 29/04/2026 | CM | 3h00 | Révisions et ouvertures : éléments finis 1D, conditionnement, optimisation, usages de bibliothèques Python et coût algorithmique. |
| Examen | 26/05/2026 | Evaluation | 2h00 | Mobiliser les outils du module sur un sujet mêlant système linéaire, approximation d'EDO/EDP, interpolation ou intégration numérique. |

## Répartition pédagogique

- `CM1-CM2` installent les idées structurantes : discrétiser, approximer, estimer l'erreur.
- `TD1-TD2` consolident les outils de base les plus calculatoires.
- `TD3-TP2` mettent l'accent sur les systèmes linéaires et leurs applications.
- `TD4-CM3-CM4` servent de synthèse, de recul théorique et d'ouverture.

## Ce qui est volontairement hors du coeur du module

- Les `moindres carrés` sont plutôt évoqués comme ouverture vers la régression et le traitement de données.
- Les méthodes `BFGS`, `Levenberg-Marquardt` et plus généralement le calcul scientifique avancé sont présentées comme culture et prolongement, pas comme techniques à maîtriser à la main à l'examen.
- La `dichotomie` n'est pas retenue comme méthode centrale du module.

## Examen - compétences attendues

- Interpoler une fonction à partir d'un petit jeu de données et discuter la pertinence du résultat.
- Approcher une intégrale par une formule classique et comparer plusieurs approximations.
- Résoudre un système linéaire par une méthode directe et justifier le choix d'une méthode itérative dans un autre contexte.
- Commenter l'effet d'une perturbation sur le second membre ou sur les données du problème.
- Appliquer un schéma simple de résolution d'EDO ou de différences finies et évaluer l'erreur.
- Réaliser une ou deux itérations d'une méthode de Newton et interpréter leur intérêt.

# POC — TD interactif piloté par IA (Probabilités TD1)

Ce document fait le point sur l'état du POC à la fin de la session du **24 avril 2026**. On reprendra à partir d'ici.

## Contexte rapide

Objectif global : transformer les TD PDF en ressources interactives. Le PDF reste la passerelle (énoncé + QR code par exercice), la SPA hébergée sur Cloudflare affiche l'énoncé, le corrigé, et 6 boutons d'exploration pilotés par IA (indices progressifs, pas-à-pas, chat, variantes, visualisations, pistes d'approfondissement) toujours sourcés sur les contenus rédigés en LaTeX.

Choix architecturaux confirmés lors de la session :

- **Source de vérité** : fichiers `.tex` (pas de Markdown), un fichier par exercice.
- **MVP** : Probabilités PGE1/S6 2025-2026 TD1 (corrigés déjà rédigés).
- **Compat PDF** : `\jobname.adr` (`enonce.adr` / `corrige.adr`) reste le mécanisme canonique de bascule énoncé/corrigé, via `make-TD.bat`.

Le plan complet est dans `.cursor/plans/td_ia_interactive_8a4c36d9.plan.md`.

## Fichiers créés pendant la session

- **`ESTP/Config/estp-ia.sty`** — package LaTeX qui expose :
  - `\ExoMeta{slug=..., titre=..., td=..., niveau=...}` : affiche le titre + un QR code (1.8 cm, coin sup-droit) pointant vers `\ExoIABaseURL\<slug>`.
  - `\begin{Enonce}...\end{Enonce}` : toujours rendu.
  - `\begin{Corrige}...\end{Corrige}` : rendu uniquement si `showSolutions=true` (mdframed en teal clair, inline sans passer par `solution` pour éviter les boucles `environ`).
  - `\begin{Indices}...\end{Indices}` et `\begin{PlusLoin}...\end{PlusLoin}` : **jamais** rendus dans le PDF, réservés à l'extraction IA.
  - `\inclureExo{slug}` : fait `\input{\ExoRoot/<slug>.tex}` puis trace un filet de séparation.
  - Configurables : `\ExoIABaseURL` (URL SPA) et `\ExoRoot` (dossier des exos, défaut `exercices`).
- **`ESTP/PGE1/S6/Probabilites/exercices/proba-td1-evenements.tex`** — première conversion : section 1 du TD1 (« Manipulation d'événements »). Énoncé + corrigé repris verbatim de `TD1.tex`. Blocs `Indices` (3 niveaux) et `PlusLoin` (limsup/liminf, indépendance mutuelle, schéma de Bernoulli) **rédigés à titre d'exemple** — à relire/affiner.
- **`ESTP/PGE1/S6/Probabilites/2025-2026/TD1-poc.tex`** — TD de test qui n'importe qu'un seul exo. `\renewcommand{\ExoRoot}{../exercices}` pour pointer sur le dossier mutualisé.

## Résultat de la compile

Deux passes `xelatex -jobname=enonce TD1-poc.tex` puis `-jobname=corrige` (TEXINPUTS pointant sur `ESTP/Config`) :

- `TD1-poc-enonce.pdf` — **1 page, 26 Ko** : titre + QR code + énoncé, pas de corrigé.
- `TD1-poc-corrige.pdf` — **2 pages, 32 Ko** : énoncé + cadre teal contenant le corrigé.

Pas d'erreur LaTeX ; seuls warnings bénins (inputenc ignoré par xelatex, rerun pour les bookmarks).

## Bugs rencontrés et corrigés

1. **`\jobname.adr`** impose un jobname exact (`enonce` ou `corrige`) — sinon `\input \jobname.adr` échoue. Conclusion : rester sur le `make-TD.bat` pour compiler.
2. **Imbrication de deux `\NewEnviron`** (`Corrige` qui appelait `\begin{solution}`) : le package `environ` partage `\BODY` entre les environnements, ce qui fait **boucler xelatex à l'infini** (observé : 180 s CPU sans progression). Corrigé en inlinant le rendu `mdframed` directement dans `Corrige`, sans passer par `solution`.
3. **Détection de `showSolutions`** : `\newboolean{foo}` crée `\iffoo`, pas `\thefoo`. Le test est `\ifcsname ifshowSolutions\endcsname\else ... \fi`.

## Points de décision à trancher au prochain lancement

À vérifier en ouvrant `TD1-poc-enonce.pdf` et `TD1-poc-corrige.pdf` :

- **(a) QR code** — placement (actuellement 1.8 cm, coin sup-droit, avec slug en dessous en petit). Options : virer le slug, virer le niveau, déplacer dans la marge, changer la taille.
- **(b) Hiérarchie du titre** — j'ai remplacé `\section*{N - Titre}` par un titre en `\Large\bfseries` à l'intérieur de `\ExoMeta`. Conséquence : plus d'entrée dans la TOC / les bookmarks PDF. À ré-ajouter dans `\ExoMeta` si tu veux garder la hiérarchie.
- **(c) Interleaving question/solution** — stratégie actuelle : un seul bloc `Enonce` (toutes les questions) + un seul bloc `Corrige` (toutes les solutions regroupées). Le TD1 actuel fait l'inverse (solution inline après chaque `\item`). À trancher :
  - garder la séparation nette (plus propre conceptuellement, plus facile à parser côté SPA) ;
  - ou ajouter une variante `\EnonceEtCorrige` qui fait l'interleaving pour le PDF prof uniquement.
- **(d) Contenu des `Indices` et `PlusLoin`** du POC — j'ai rédigé une ébauche, à relire/corriger.

## Prochaines étapes (dans l'ordre)

1. Valider les 4 points ci-dessus (ouvrir les 2 PDF, retours).
2. Convertir les 8 autres sections du TD1 dans `ESTP/PGE1/S6/Probabilites/exercices/` :
   - `proba-td1-mesure-probabilite.tex`
   - `proba-td1-independance.tex`
   - ... jusqu'à `proba-td1-estimation.tex`.
3. Refondre `TD1.tex` pour qu'il appelle uniquement `\inclureExo{...}` × 9 ; archiver l'ancien.
4. Vérifier visuellement que le PDF résultant est proche de `TD1-enonce.pdf` / `TD1-corrige.pdf` actuels.
5. Écrire `scripts/extract-exos.mjs` (Node) qui parse les fichiers `.tex` et produit `data/exercises.json` (slug, titre, énoncé brut, corrigé brut, indices, plus-loin).
6. Passer à la phase backend (Workers + KV + Vectorize + AI Gateway).

## Rappel commandes utiles

```bash
cd ESTP/PGE1/S6/Probabilites/2025-2026

# Compile POC (modifier BASE=TD1-poc dans make-TD.bat, ou invocation directe) :
# TEXINPUTS doit inclure ESTP/Config pour que estp-ia.sty soit trouvé.
$env:TEXINPUTS = "...\ESTP\Config;" + $env:TEXINPUTS
xelatex -jobname=enonce  TD1-poc.tex
xelatex -jobname=corrige TD1-poc.tex
```

## Todos en cours

- [x] Phase 0 : `estp-ia.sty` (macros + QR) — **POC validé**
- [x] Phase 0 bis : POC sur 1 exo TD1 — **compilé en 1p/2p**
- [ ] Script Node `extract-exos.mjs` → `exercises.json`
- [ ] Phase 1 : Worker API (chat/hint/verify) + Vectorize RAG + KV + DO + D1
- [ ] Phase 2 : SPA Pages (Vite + React + KaTeX) avec les 6 boutons
- [ ] Intégration pilote TD1 complet + déploiement Cloudflare
- [ ] Phase 3 : extension autres TDs proba, puis AnaNum (tikz → SVG), puis BMC Poly + analytics prof

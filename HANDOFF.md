# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 14 octobre 2026, après le lot 2bis (v1.4.2). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). États détaillés : [lot 1](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md), [lot 2](./docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md), [lot 2bis](./docs/ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md).

## État

- **Lot 1 (socle et avis réel) : livré en v1.4.0.** Avis réel vers Notion actif en production (variables sur l’API Coolify uniquement). Un avis texte de test est arrivé ; restent à tester un avis vocal et un avis avec e-mail.
- **Lot 2 (parcours Claire v1) : livré en v1.4.1**, relu par Ulrich le 14 octobre 2026 : le concept des scripts change pour les trois personas.
- **Annexe v2 validée par Ulrich le 14 octobre 2026** : sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) » (`3f9511682fc38129a3f6c4224c22f62c`, sous le PRD). Elle remplace l’annexe « Scripts des 3 parcours » du PRD. Points de la section 7 retenus tels que proposés.
- **Lot 2bis (refonte de Claire, échelle, regard replié, micro-démos) : livré en v1.4.2.** À relire en ligne par Ulrich avant le lot 3.
- **Lot 3 (Marc, Nadia, comparaison, v1.4.3)** : à faire, après les retours sur Claire v2.
- Non vérifié : `docker build` / `docker run` (Docker absent de la machine) ; appareils iOS et Android réels.

## Décisions issues de la relecture (14 octobre 2026), appliquées au lot 2bis

- **Principes** : photographier des pratiques, pas des anecdotes (concret → général) ; ne jamais juger ni être paternaliste ; écouter ce qui pèse ; viser la redondance des informations et la source de vérité, la collaboration et la transmission des processus, la place de chaque nature d’information (base structurée, documents, suivi de tâches), l’IA utile quand elle a du contexte ; réponses et restitution un peu plus développées. Le nommage de fichiers n’est plus un sujet.
- **Échelle** : Exploration · Improvisation · Organisé · Orchestré, avec une définition affichée par niveau.
- **Trame d’une dimension** : concret → général → ce qui pèse, 2 à 3 échanges par dimension, 10 à 12 au total.
- **Points d’étape** : « Un premier regard », replié par défaut ; ouverture mesurée (`demo_regard_ouvert`).
- **Restitution** : « Ce qui pourrait être plus léger » remplace « Ce qui peut s’améliorer ».
- **Pistes** : liens limités aux pages Ressources existantes ; une ressource pratique sur la source unique n’entre pas dans les lots 2bis et 3.
- **Méthode** : scripts d’abord dans Notion, validés par Ulrich, puis code.

## Points d’appui pour le lot 3

- **Contenu** : `client/src/data/demo-parcours.json`, schéma d’une étape inchangé depuis le lot 2 (`type`, `question`, `questionSuite`, `options`, `reponse.choix`, `reponse.transcription`, `retenu.extrait` passage exact, `retenu.tags`, `retenu.curseurs[{libelle, valeur, corrigeA}]`, `rebond{etape, rappel}` où le rappel est un extrait ou un tag retenu à cette étape, `numeriqueResponsable`, `pointEtape{texte, ordreDeGrandeur}`), plus **`pese: true`** sur l’échange « ce qui pèse ». Passer un persona à `"statut": "pret"` active tous ses contrôles.
- **Contrôles imposés par `verify-demo-content`** : 2 à 3 échanges par dimension ; un seul `pointEtape` par dimension, sur son dernier échange ; au moins un `pese` par dimension, jamais sur l’entrée concrète (premier échange de la dimension), et retenu. L’annexe ne marque pas « ce qui pèse » partout (Marc : Données ; Nadia : Données, Outils, Compétences) : choisir l’échange dont la réponse dit ce qui pèse et le signaler à Ulrich, comme pour Claire (Compétences, échange 9).
- **Échelle** : `niveauxRadar` et `niveauxDefinitions` (JSON) ; curseurs, jauges, radar et aide les lisent tous. L’ancienne échelle est refusée par le contrôle.
- **Premier regard** : `MilestoneCard` (repliable, mesuré) ; rien à changer pour Marc et Nadia.
- **Micro-démos** (`MicroDemos.tsx`, 3 par persona, gabarits distincts) : `convergence` (une info à plusieurs endroits → une source qui fait foi), `tri` (où va quoi), `validation`, `fiche` (une source alimente plusieurs sorties), `source-unique` (des pièces éparses convergent). Correspondance proposée : Marc « Une source pour la tournée » → `fiche`, « Une info, plusieurs copies » → `convergence`, « Une décision, une trace » → nouveau gabarit (trois phrases dictées → note de répétition structurée) ; Nadia « Inventaire → portfolio, page web et dossier » → `fiche`, « Où va quoi » → `tri`, « Les textes rejoignent l’inventaire » → `source-unique`.
- **Comparaison** : `getStepSequence` (`client/src/lib/demoContent.ts`) va de `futur` à `avis` ; insérer `comparaison` entre les deux. `StepView` (`client/src/pages/ExperienceDemo.tsx`) affiche pour l’instant un écran « en préparation » dédié (`preparation.comparaisonTexte`). `demo_comparaison_vue` est déjà émis. Les trois radars peuvent réutiliser `QualitativeRadar` (`Restitution.tsx`) ; la phrase et les trois formulations sont dans la section 5 de l’annexe v2.
- **Moteur** : `useStepPlayback` (phases), `StepPlayer` (rendu d’un échange, panneau, commandes, clavier), `MemoryPanel`, `useDemoKeyboard` (ignore champs, boutons, liens, `summary`, tiroir). Couleurs de dimension via `dimensionVar()` (`demoTheme.ts`) : ne pas mettre de `border-color` ou `background-color` de charte en style en ligne opaque, les règles globales de `index.css` recolorent alors le texte.
- **Contrôle qualité** : `pnpm check:demo-playback <url> [dossier-captures]` (Playwright, 105 contrôles sur Claire v2). Les constantes `MILESTONES`, `REBONDS` et `CORRECTION` en tête du script sont propres à Claire : les généraliser par persona pour Marc et Nadia, et ajouter la comparaison. Si Playwright réclame un navigateur absent, utiliser `CHROME_BIN` (voir l’en-tête du script).
- **Nginx** : tester avec Homebrew (`nginx -p <dossier> -c <conf>`), `root` vers `dist/public`, port libre ; procédure dans l’état du lot 2.
- **Avis réels de test** : deux avis marqués « TEST » (un vocal, un avec e-mail), avec accord explicite d’Ulrich avant d’écrire dans la base.
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`).

## Prompt de reprise du lot 3 (après la relecture de Claire v2)

À coller dans une session fraîche, en mode Worktree (Sonnet 5.5, effort moyen ; le moteur est stabilisé au lot 2bis).

```text
Repo memoways/boussole-numerique-recherche. Exécute le LOT 3 « Marc, Nadia, comparaison et finitions » (v1.4.3)
de la démo playback. Lis d'abord HANDOFF.md (section « Points d'appui pour le lot 3 »), docs/PLAN_DEMO_PLAYBACK_2026-10-14.md,
docs/ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md et AGENTS.md. Les lots 1, 2 et 2bis sont mergés sur main ; Claire v2 est en ligne.
Source fonctionnelle : la sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) »
(3f9511682fc38129a3f6c4224c22f62c, sous le PRD 87b186ac43774c24b787c5f24738dbc6), validée par Ulrich le 14.10.2026,
connecteur Notion, workspace 377e8583-7838-4c05-9f76-8833a450f304 : sections 3 (Marc), 4 (Nadia) et 5 (comparaison),
à reprendre telles quelles.
Retours d'Ulrich sur Claire v2 : [COLLER ICI LES RETOURS].
Décisions déjà prises : principes de l'annexe v2 (pratiques plutôt qu'anecdotes, aucun jugement, écouter ce qui pèse,
redondance et source de vérité, transmission des processus, place de chaque information, IA avec contexte) ;
échelle Exploration · Improvisation · Organisé · Orchestré ; « Un premier regard » replié ; « Ce qui pourrait être plus léger » ;
liens des pistes limités aux pages Ressources existantes ; mode immersif ; aucune écriture PostgreSQL.
Outillage : Docker n'est pas installé, teste infra/nginx/default.conf avec nginx via brew (déjà installé ; demande
confirmation avant tout nouveau brew install). git-ship : chemin réel /Users/ulrich/CodeProjects/_shared/scripts/git-ship.
Playwright : si le navigateur attendu manque, CHROME_BIN vers ~/Library/Caches/ms-playwright/chromium_headless_shell-1228.
1) Applique d'abord les retours sur Claire v2, puis : scripts Marc et Nadia dans demo-parcours.json (statut « pret »,
   marqueurs « pese » par dimension), leurs micro-démos (gabarits existants, plus un gabarit « note » pour
   « Une décision, une trace »), ComparisonView (3 radars, même question formulée trois fois, insérée entre futur et avis),
   verify-demo-content sur les 3 personas. Signale-moi les trous de contenu que tu complètes.
2) pnpm verify + pnpm test:demo-feedback + pnpm check:demo-playback étendu aux 3 personas et à la comparaison
   (1280/390, clavier, reduced-motion, tiroir, regards repliés, débordement, console) + scripts/check-contrast.mjs
   + test Nginx des routes directes (/experience/demo/*, /projet, /timeline, /references).
3) Avec mon accord explicite avant d'écrire dans la base : 2 avis de test réels marqués « TEST » (un vocal, un avec e-mail),
   vérifiés dans « Retours démo Boussole ».
4) CHANGELOG v1.4.3, STORY, README, docs/ (état du lot 3), HANDOFF.md, puis git-ship (squash-merge sur main).
5) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Mets à jour la tâche Notion liée
   (branche, PR, statut) et donne-moi la clôture.
```

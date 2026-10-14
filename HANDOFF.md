# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 14 octobre 2026, après la relecture du lot 2 (v1.4.1). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). États détaillés : [lot 1](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md), [lot 2](./docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md).

## État

- **Lot 1 (socle et avis réel) : livré en v1.4.0.** Avis réel vers Notion actif en production (variables sur l’API Coolify uniquement). Un avis texte de test est arrivé ; restent à tester un avis vocal et un avis avec e-mail.
- **Lot 2 (parcours Claire de bout en bout) : livré en v1.4.1** et relu par Ulrich le 14 octobre 2026.
- **Relecture du lot 2 : le concept des scripts change pour les trois personas.** Principes, nouvelle échelle et scripts réécrits dans la sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) » (`3f9511682fc38129a3f6c4224c22f62c`, sous le PRD). **En attente de validation par Ulrich** : rien n’est codé avant.
- **Lot 2bis (refonte Claire et moteur, v1.4.2)** puis **lot 3 (Marc, Nadia, comparaison, v1.4.3)** : à faire, à partir de l’annexe v2 validée.
- Non vérifié : `docker build` / `docker run` (Docker absent de la machine) ; appareils iOS et Android réels.

## Décisions issues de la relecture (14 octobre 2026)

- **Principes** : photographier des pratiques, pas des anecdotes (concret → général) ; ne jamais juger ni être paternaliste ; écouter ce qui pèse ; viser la redondance des informations et la source de vérité, la collaboration et la transmission des processus, la place de chaque nature d’information (base structurée, documents, suivi de tâches), l’IA utile quand elle a du contexte ; réponses et restitution un peu plus développées. Le nommage de fichiers n’est plus un sujet.
- **Échelle** : Exploration · Improvisation · Organisé · Orchestré (« Bricolage », « Structuré » et « Fluide » disparaissent), avec une définition affichée par niveau.
- **Trame d’une dimension** : concret → général → ce qui pèse, 2 à 3 échanges par dimension, 10 à 12 au total.
- **Points d’étape** : « Un premier regard », replié par défaut ; ouverture mesurée.
- **Micro-démos de Claire** : « Une info, cinq endroits », « Où va quoi », « Valider sans allers-retours ».
- **Méthode** : scripts d’abord dans Notion, validés par Ulrich, puis code.

## Points d’appui pour les lots 2bis et 3

- **Échelle** : les niveaux sont dans `niveauxRadar` (JSON), contrôlés par `scripts/verify-demo-content.mjs` ; les curseurs, jauges et radar les lisent tous depuis là. Ajouter une définition par niveau dans le JSON.
- **Regard replié** : `MilestoneCard` (`client/src/components/demo/MilestoneCard.tsx`) devient un bloc repliable (fermé par défaut, ouverture mesurée par un nouvel événement dans `client/src/lib/analytics.ts`) ; adapter `scripts/check-demo-playback.mjs`, qui cherche « Premier constat ».
- **Contenu** : `client/src/data/demo-parcours.json`. Le schéma d’une étape est celui de Claire : `type` (`cases`, `question`, `scenario`, `curseurs`, `relance`), `question`, `questionSuite` (curseurs proposés avant la réponse), `options`, `reponse.choix`, `reponse.transcription`, `retenu.extrait` (passage exact de la transcription), `retenu.tags`, `retenu.curseurs[{libelle, valeur, corrigeA}]` (niveaux nommés, jamais de chiffre), `rebond{etape, rappel}` (le rappel doit être un extrait ou un tag retenu à cette étape), `numeriqueResponsable`, `pointEtape{texte, ordreDeGrandeur}`. Puis `ideal`, `restitution` (`lettre`, `radar`, `fonctionne`/`ameliorer` avec `etape` et `citation` exacte, `pistes` avec `lien` et `libelleLien`), `demos`. Passer un persona à `"statut": "pret"` active tous ses contrôles dans `scripts/verify-demo-content.mjs`.
- **Micro-démos** : trois gabarits (`arborescence`, `fiche`, `source-unique`) dans `client/src/components/demo/MicroDemos.tsx`. Ceux de l’annexe v2 portent sur les données (une info à plusieurs endroits, où va quoi, validation à plusieurs, note de répétition, inventaire → portfolio) : réutiliser `fiche` et `source-unique` quand ils suffisent, ajouter un gabarit sinon ; `arborescence` (nommage) n’est plus utilisé.
- **Comparaison** : `getStepSequence` (`client/src/lib/demoContent.ts`) va de `futur` à `avis` ; insérer `comparaison` entre les deux. `StepView` (`client/src/pages/ExperienceDemo.tsx`) affiche pour l’instant un écran « en préparation » dédié (`preparation.comparaisonTexte`). `demo_comparaison_vue` est déjà émis. Les trois radars peuvent réutiliser `QualitativeRadar` (`Restitution.tsx`) ; la phrase et les trois formulations sont dans la section 5 de l’annexe v2.
- **Moteur** : `useStepPlayback` (phases), `StepPlayer` (rendu d’un échange, panneau, commandes, clavier), `MemoryPanel`, `useDemoKeyboard`. Couleurs de dimension via `dimensionVar()` (`demoTheme.ts`) : ne pas mettre de `border-color` ou `background-color` de charte en style en ligne, les règles globales de `index.css` recolorent alors le texte.
- **Contrôle qualité** : `pnpm check:demo-playback <url> [dossier-captures]` (Playwright, 75 contrôles sur Claire). L’étendre à Marc et Nadia et à l’écran de comparaison. Si Playwright réclame un navigateur absent, utiliser `CHROME_BIN` vers un Chromium déjà installé (voir l’en-tête du script).
- **Nginx** : tester avec Homebrew (`nginx -p <dossier> -c <conf>`), `root` vers `dist/public`, port libre ; procédure dans l’état du lot 2.
- **Avis réels de test** : deux avis marqués « TEST » (un vocal, un avec e-mail), avec accord explicite d’Ulrich avant d’écrire dans la base.
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`).

## Prompt de reprise du lot 2bis (après validation de l’annexe v2)

À coller dans une session fraîche, en mode Worktree (Opus 5.5, effort élevé : refonte du contenu et du moteur).

```text
Repo memoways/boussole-numerique-recherche. Exécute le LOT 2bis « Refonte du parcours Claire » (v1.4.2) de la démo
playback. Lis d'abord HANDOFF.md (section « Décisions issues de la relecture »), docs/PLAN_DEMO_PLAYBACK_2026-10-14.md,
docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md et AGENTS.md.
Source fonctionnelle : la sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) »
(3f9511682fc38129a3f6c4224c22f62c, sous le PRD 87b186ac43774c24b787c5f24738dbc6), validée par Ulrich, connecteur Notion,
workspace 377e8583-7838-4c05-9f76-8833a450f304. Reprends ses scripts tels quels ; intègre les réponses d'Ulrich
aux « Points à trancher » de la section 7 : [COLLER ICI LES RÉPONSES].
Décisions déjà prises : mode immersif ; libellés de dimensions du PRD ; aucune écriture PostgreSQL pour les avis ;
échelle Exploration · Improvisation · Organisé · Orchestré ; points d'étape repliés par défaut ; trame concret → général →
ce qui pèse.
Outillage : Docker n'est pas installé, teste infra/nginx/default.conf avec nginx via brew (déjà installé ; demande
confirmation avant tout nouveau brew install). git-ship : chemin réel /Users/ulrich/CodeProjects/_shared/scripts/git-ship.
Playwright : si le navigateur attendu manque, CHROME_BIN vers ~/Library/Caches/ms-playwright/chromium_headless_shell-1228.
1) Périmètre : nouvelle échelle et définitions par niveau (JSON, radar, curseurs, jauges, verify-demo-content) ;
   « Un premier regard » repliable et mesuré ; libellés de restitution ; script Claire v2 complet ; ses 3 micro-démos
   (« Une info, cinq endroits », « Où va quoi », « Valider sans allers-retours ») ; contrôle « ce qui pèse » par dimension.
   Marc et Nadia restent « en préparation ». Signale-moi les trous de contenu que tu complètes.
2) pnpm verify + pnpm test:demo-feedback + pnpm check:demo-playback adapté (1280/390, clavier, reduced-motion, tiroir,
   débordement, console, regard replié) + scripts/check-contrast.mjs + test Nginx des routes directes
   (/experience/demo/*, /projet, /timeline, /references).
3) CHANGELOG v1.4.2, STORY, README, docs/ (état du lot 2bis), HANDOFF.md (prompt du lot 3 à jour), puis git-ship.
4) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Puis demande-moi de relire Claire v2 en ligne.
```

## Prompt de reprise du lot 3 (après le lot 2bis)

À coller dans une session fraîche, en mode Worktree (Sonnet 5.5, effort moyen ; le moteur est stabilisé au lot 2bis).

```text
Repo memoways/boussole-numerique-recherche. Exécute le LOT 3 « Marc, Nadia, comparaison et finitions » (v1.4.3)
de la démo playback. Lis d'abord HANDOFF.md, docs/PLAN_DEMO_PLAYBACK_2026-10-14.md, l'état du lot 2bis dans docs/
et AGENTS.md. Les lots 1, 2 et 2bis sont mergés sur main ; Claire v2 est en ligne.
Source fonctionnelle : la sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) »
(3f9511682fc38129a3f6c4224c22f62c, sous le PRD 87b186ac43774c24b787c5f24738dbc6), connecteur Notion, workspace
377e8583-7838-4c05-9f76-8833a450f304 : sections 3 (Marc), 4 (Nadia) et 5 (comparaison), à reprendre telles quelles.
Retours d'Ulrich sur Claire v2 : [COLLER ICI LES RETOURS].
Décisions déjà prises : principes de l'annexe v2 (pratiques plutôt qu'anecdotes, aucun jugement, écouter ce qui pèse,
redondance et source de vérité, transmission des processus, place de chaque information, IA avec contexte) ;
échelle Exploration · Improvisation · Organisé · Orchestré ; regards repliés ; mode immersif ; aucune écriture PostgreSQL.
Outillage : Docker n'est pas installé, teste infra/nginx/default.conf avec nginx via brew (déjà installé ; demande
confirmation avant tout nouveau brew install). git-ship : chemin réel /Users/ulrich/CodeProjects/_shared/scripts/git-ship.
Playwright : si le navigateur attendu manque, CHROME_BIN vers ~/Library/Caches/ms-playwright/chromium_headless_shell-1228.
1) Applique d'abord les retours sur Claire v2, puis : scripts Marc et Nadia dans demo-parcours.json (statut « pret »),
   leurs micro-démos, ComparisonView (3 radars, même question formulée trois fois, insérée entre futur et avis),
   verify-demo-content sur les 3 personas. Signale-moi les trous de contenu que tu complètes.
2) pnpm verify + pnpm test:demo-feedback + pnpm check:demo-playback étendu aux 3 personas et à la comparaison
   (1280/390, clavier, reduced-motion, tiroir, débordement, console) + scripts/check-contrast.mjs + test Nginx
   des routes directes (/experience/demo/*, /projet, /timeline, /references).
3) Avec mon accord explicite avant d'écrire dans la base : 2 avis de test réels marqués « TEST » (un vocal, un avec e-mail),
   vérifiés dans « Retours démo Boussole ».
4) CHANGELOG v1.4.3, STORY, README, docs/ (état du lot 3), HANDOFF.md, puis git-ship (squash-merge sur main).
5) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Mets à jour la tâche Notion liée
   (branche, PR, statut) et donne-moi la clôture.
```

# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 14 octobre 2026, après le lot 3 (v1.4.3). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). États détaillés : [lot 1](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md), [lot 2](./docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md), [lot 2bis](./docs/ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md), [lot 3](./docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md).

## État

- **Lot 1 (socle et avis réel) : livré en v1.4.0.** Avis réel vers Notion actif en production (variables sur l’API Coolify uniquement). Un avis texte de test est arrivé.
- **Lot 2 (Claire v1) : livré en v1.4.1.** **Lot 2bis (Claire v2, échelle, regard replié) : livré en v1.4.2.**
- **Lot 3 (Marc, Nadia, comparaison) : livré en v1.4.3.** Les trois parcours sont jouables, suivis de la comparaison avant l’avis. Claire v2 inchangée : Ulrich n’a pas transmis de retours et a confirmé de poursuivre.
- **Reporté par Ulrich** : les deux avis de test réels (un vocal, un avec e-mail), marqués « TEST ».
- **À relire par Ulrich** : Marc, Nadia et la comparaison en ligne, avec la liste du contenu complété dans l’[état du lot 3](./docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md#contenu-complété-pour-relecture).
- Non vérifié : `docker build` / `docker run` (Docker absent de la machine) ; appareils iOS et Android réels.

## Décisions en vigueur

- **Principes (annexe v2)** : pratiques plutôt qu’anecdotes, aucun jugement, écouter ce qui pèse, redondance et source de vérité, transmission des processus, place de chaque information, IA utile avec du contexte.
- **Échelle** : Exploration · Improvisation · Organisé · Orchestré, une définition par niveau.
- **Trame** : concret → général → ce qui pèse, 2 à 3 échanges par dimension, 10 à 12 au total ; « Un premier regard » replié sous le dernier échange de chaque dimension.
- **Restitution** : « Ce qui pourrait être plus léger » ; pistes liées aux seules pages Ressources existantes.
- **Comparaison** : la dimension Données & archivage, formulée par chaque persona (première question de la dimension dans son script), et les trois radars sur le même ordre d’axes.
- Mode immersif ; aucune écriture PostgreSQL pour les avis.

## Points d’appui pour la suite

- **Contenu** : `client/src/data/demo-parcours.json` (trois personas `pret`, bloc `comparaison`). Toute retouche de script passe par `pnpm verify:demo-content`, qui contrôle les trois parcours (trame, `pese`, premiers regards, rebonds, correction, numérique responsable, citations exactes, liens des pistes, gabarits des micro-démos, comparaison).
- **Micro-démos** (`MicroDemos.tsx`) : `convergence`, `tri`, `validation`, `fiche`, `source-unique`, `note`.
- **Comparaison** : `ComparisonView.tsx` ; insérée par `getStepSequence` (`demoContent.ts`) seulement si les trois personas sont `pret` (`isComparisonReady`).
- **Contrôle qualité** : `pnpm check:demo-playback <url> [dossier-captures]` (330 contrôles) ; repères par persona dans la constante `PERSONAS` en tête du script, à ajuster si un script change (premiers regards, rebonds, correction, note du tiroir). Si Playwright réclame un navigateur absent : `CHROME_BIN=~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`.
- **Nginx** : Homebrew, `nginx -p <dossier> -c <conf>` avec `infra/nginx/default.conf` réécrit (port libre, `root` vers `dist/public`) ; procédure dans l’état du lot 3.
- **Avis de test** : passer par l’API de production (`POST /api/public/demo/transcribe` pour le vocal, puis `POST /api/public/demo-feedback` avec `mode: "voix"`), avec l’accord explicite d’Ulrich avant toute écriture, puis vérifier Persona, Mode, E-mail et Suivi = Nouveau dans « Retours démo Boussole ».
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`).

## Prompt de reprise (relecture du lot 3 et avis de test)

À coller dans une session fraîche, en mode Worktree (Sonnet 5.5, effort moyen).

```text
Repo memoways/boussole-numerique-recherche. Démo playback /experience/demo : finitions après relecture du lot 3 (v1.4.4).
Lis d'abord HANDOFF.md, docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md (section « Contenu complété pour relecture ») et AGENTS.md.
Les lots 1, 2, 2bis et 3 sont mergés sur main ; Claire, Marc, Nadia et la comparaison sont en ligne.
Source fonctionnelle : sous-page Notion « Annexe v2 — scripts des 3 parcours » (3f9511682fc38129a3f6c4224c22f62c),
connecteur Notion, workspace 377e8583-7838-4c05-9f76-8833a450f304.
Retours d'Ulrich sur Marc, Nadia, la comparaison (et Claire si besoin) : [COLLER ICI LES RETOURS].
1) Applique les retours dans demo-parcours.json (et les composants si nécessaire) ; garde verify-demo-content vert
   et ajuste la constante PERSONAS de scripts/check-demo-playback.mjs si les repères changent.
2) pnpm verify + pnpm test:demo-feedback + pnpm check:demo-playback (dev puis build servi par nginx via brew)
   + scripts/check-contrast.mjs + routes directes Nginx (/experience/demo/*, /projet, /timeline, /references).
3) Avec mon accord explicite avant d'écrire dans la base : 2 avis de test réels marqués « TEST » (un vocal, un avec e-mail)
   via l'API de production, vérifiés dans « Retours démo Boussole ».
4) CHANGELOG v1.4.4, STORY, README, docs/ (état), HANDOFF.md, puis git-ship
   (/Users/ulrich/CodeProjects/_shared/scripts/git-ship, squash-merge sur main).
5) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Mets à jour la tâche Notion liée
   (branche, PR, statut) et donne-moi la clôture.
```

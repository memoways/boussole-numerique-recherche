# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 14 octobre 2026, après le lot 3 (v1.4.3). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). États détaillés : [lot 1](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md), [lot 2](./docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md), [lot 2bis](./docs/ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md), [lot 3](./docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md).

## État

- **Lot 1 (socle et avis réel) : livré en v1.4.0.** Avis réel vers Notion actif en production (variables sur l’API Coolify uniquement). Un avis texte de test est arrivé.
- **Lot 2 (Claire v1) : livré en v1.4.1.** **Lot 2bis (Claire v2, échelle, regard replié) : livré en v1.4.2.**
- **Lot 3 (Marc, Nadia, comparaison) : livré en v1.4.3.** Les trois parcours sont jouables, suivis de la comparaison avant l’avis. Claire v2 inchangée : Ulrich n’a pas transmis de retours et a confirmé de poursuivre.
- **Reporté par Ulrich** : les deux avis de test réels (un vocal, un avec e-mail), marqués « TEST ».
- **À relire par Ulrich** : Marc, Nadia et la comparaison en ligne, avec la liste du contenu complété dans l’[état du lot 3](./docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md#contenu-complété-pour-relecture).
- **Lot 4 ajouté le 15 octobre 2026 (v1.5.0) : ressources liées.** Retour d’Ulrich sur l’échange 1 de Marc. Le bloc « La Boussole retient » sous la réponse est redondant avec le panneau. Il est remplacé par une ou deux citations courtes tirées des « Ressources web MW » liées au projet, avec un lien cliquable vers la source, pour ancrer la conversation dans un corpus de recherche traçable et ouvrir sur de la nuance. Les curseurs induits et leur validation restent. Spécification complète : section « Lot 4 » du [plan](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). Le contenu est validé dans une sous-page Notion « Annexe v3 » avant le code.
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
- **Lot 4, bloc à retirer** : dans `StepPlayer.tsx`, le bloc `receptionPlayed && retainedItems.length > 0` (bordure pointillée, titre `lecture.retenuTitre`). Il contient aussi les curseurs induits (`InducedSliders`, `lecture.valide`) et la phrase de correction (`lecture.corrige`) : les déplacer, ne pas les supprimer. Le surlignage de l’extrait (`TypedTranscript`), l’annonce `aria-live` et le rebond (`MemoryEcho`) restent.
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`).

## Prompt de reprise du lot 4 (ressources liées et finitions)

À coller dans une session fraîche, en mode Worktree (Opus 5.5, effort élevé : la curation éditoriale demande du jugement).

```text
Repo memoways/boussole-numerique-recherche. Exécute le LOT 4 « Ressources liées et finitions » (v1.5.0) de la démo playback
/experience/demo. Lis d'abord HANDOFF.md, docs/PLAN_DEMO_PLAYBACK_2026-10-14.md (section « Lot 4 »),
docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md et AGENTS.md. Les lots 1 à 3 sont mergés sur main ; les trois parcours et la
comparaison sont en ligne. Connecteur Notion, workspace 377e8583-7838-4c05-9f76-8833a450f304.
Fonctionnalité nouvelle (retour d'Ulrich du 15.10.2026) : retirer le bloc « La Boussole retient » sous la réponse
(redondant avec le panneau) en gardant les curseurs induits, la validation et la correction ; le remplacer, quand ça
fait sens, par 1 ou 2 citations courtes tirées des « Ressources web MW » liées au projet Boussole
(collection://2be51168-2fc3-81f1-89a4-000b12cbfbb4, relation Projets Memoways → 302511682fc38000a31cf63089c76477),
avec auteur, média et lien cliquable vers la source. But : ancrer la conversation dans un corpus de recherche traçable,
apporter de la nuance (un regard pratique et une ouverture philosophique, éthique, sociétale ou artistique, ou un
contrepoint), titiller la curiosité. Exemple d'Ulrich : le travail en équipe n'est pas toujours efficace, mais exister
ensemble est presque un but en soi. Pour les trois parcours.
Retours d'Ulrich sur Marc, Nadia et la comparaison : [COLLER ICI LES RETOURS].
1) Présélection : pour chaque échange des 3 parcours, cherche les ressources liées pertinentes, lis la page pour une
   citation exacte (≤ 30 mots), préfère les sources accessibles, nettoie les URL (sans utm ni redirection de newsletter).
   Rédige la sous-page Notion « Annexe v3 — ressources liées par échange » sous le PRD 87b186ac43774c24b787c5f24738dbc6
   (tableau par parcours : échange, ressource, citation, traduction si anglais, rôle, raison ; candidates de réserve).
   ARRÊTE-TOI et demande-moi de la valider avant d'écrire du code (statuts éligibles, traduction, libellé du bloc).
2) Après validation : demo-ressources.json (catalogue), champ ressources des étapes, bloc dans StepPlayer, curseurs
   gardés hors du bloc retiré, signal du tiroir mobile, événement demo_ressource_ouverte, verify-demo-content et
   check-demo-playback étendus (règles de la section « Lot 4 » du plan), puis les retours sur Marc, Nadia et la comparaison.
3) pnpm verify + pnpm test:demo-feedback + pnpm check:demo-playback (dev puis build servi par nginx via brew ;
   CHROME_BIN vers ~/Library/Caches/ms-playwright/chromium_headless_shell-1228 si besoin) + scripts/check-contrast.mjs
   + routes directes Nginx (/experience/demo/*, /projet, /timeline, /references).
4) Avec mon accord explicite avant d'écrire dans la base : 2 avis de test réels marqués « TEST » (un vocal, un avec
   e-mail) via l'API de production, vérifiés dans « Retours démo Boussole ».
5) CHANGELOG v1.5.0, STORY, README, docs/ (état du lot 4), HANDOFF.md, puis git-ship
   (/Users/ulrich/CodeProjects/_shared/scripts/git-ship, squash-merge sur main). Vérifie la prod ; si Coolify n'a pas
   redéployé, donne-moi une seule action. Mets à jour la tâche Notion liée (branche, PR, statut) et donne-moi la clôture.
```

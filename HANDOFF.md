# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 14 octobre 2026, fin du lot 1 (v1.4.0). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). État détaillé : [`docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md`](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md).

## État

- **Lot 1 (socle et avis réel) : livré en v1.4.0.** Routage `/experience/demo/:persona/:etape`, mode immersif, `DemoShell`, `PersonaPicker`, `TrustNotice`, `FeedbackForm`, API Notion et transcription, SEO `noindex`, règle Nginx, `verify-demo-content`, `test:demo-feedback`.
- **Activation Notion : à confirmer.** `NOTION_TOKEN` et `NOTION_FEEDBACK_DB_ID` doivent être configurés dans le service API sur Coolify ; sans eux, l’avis répond 503.
- **Lot 2 (parcours Claire de bout en bout, v1.4.1) : à faire.** Lot 3 (Marc, Nadia, comparaison, finitions, v1.4.2) : à faire.
- Non vérifié au lot 1 : `docker build` / `docker run` (Docker absent de la machine). Nginx a été testé avec la même configuration hors conteneur.

## Points d’appui pour le lot 2

- Les personas sont dans `client/src/data/demo-parcours.json` avec `statut: "en-preparation"` et `etapes: []`. Passer Claire à `"pret"` active les contrôles de contenu de `scripts/verify-demo-content.mjs` (10 à 12 interactions, 5 dimensions dans l’ordre, un point d’étape par dimension, une correction de curseur, deux rebonds, une question de numérique responsable, radar sans chiffre, mention « illustratif », liens de pistes vers des routes existantes). Ce script lit `type: "rebond"` ou une clé `rebond`, `numeriqueResponsable`, `pointEtape.ordreDeGrandeur`, `retenu.curseurs[].corrigeA`, `restitution.radar` et `restitution.pistes[].lien` : respecter ces noms ou adapter le script.
- `client/src/lib/demoContent.ts` : le type `DemoStep` est volontairement minimal ; l’étendre (types de réponse, `retenu`, `pointEtape`, `ideal`, `restitution`, `demos`) avec le contenu de Claire. `firstStepOfDimension` et `getProgressSegments` alimentent déjà la barre de progression : dès que `etapes` est rempli, les segments deviennent cliquables.
- `client/src/pages/ExperienceDemo.tsx` : `StepView` renvoie `StepPlaceholder` pour tout sauf `accueil` et `avis` ; c’est le point d’insertion des écrans d’interaction, `ideal`, `restitution`, `demos`, `futur`.
- `DemoShell` fournit déjà bandeau, en-tête, barre de progression, focus après changement d’étape, `DemoActions` (barre collante sur mobile) et les classes de boutons `demoPrimaryButton` / `demoSecondaryButton`. Les contrôles « Passer l’animation », « Aller à la restitution » et les raccourcis clavier restent à ajouter.
- `client/src/lib/analytics.ts` expose `trackDemoEvent` ; `demo_etape_vue`, `demo_restitution_vue` et `demo_comparaison_vue` sont déjà émis par `StepView`.
- Le script de Claire est dans le PRD Notion `87b186ac43774c24b787c5f24738dbc6`, annexe A (repris tel quel). Les trous à compléter et à signaler pour relecture : contenu « retenu » des étapes sans retenu, noms des micro-démos, liens des pistes (uniquement `/ressources` et ses sous-pages).
- Le lot 2 rend la démo publique avec Claire : ajouter le bloc « Voir une démonstration du parcours → » sur `/experience` ; Marc et Nadia mènent à l’écran « en préparation ». Penser à mettre à jour `CHANGELOG.md`, `STORY.md`, `README.md`, `docs/` et ce fichier.

## Prompt de reprise du lot 2

À coller dans une session fraîche, en mode Worktree (Opus 5.5, effort élevé).

```text
Repo memoways/boussole-numerique-recherche. Exécute le LOT 2 « Parcours Claire de bout en bout » (v1.4.1)
du plan validé docs/PLAN_DEMO_PLAYBACK_2026-10-14.md (lis-le en entier, puis HANDOFF.md,
docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md et AGENTS.md). Le lot 1 est mergé sur main (v1.4.0).
Source fonctionnelle : PRD Notion 87b186ac43774c24b787c5f24738dbc6 (connecteur Notion, workspace
377e8583-7838-4c05-9f76-8833a450f304), annexe A pour le script de Claire, à reprendre tel quel.
Décisions déjà prises : mode immersif ; libellés de dimensions du PRD ; aucune écriture PostgreSQL pour les avis ;
Docker n'est pas disponible localement, installer ou utiliser nginx via brew pour tester infra/nginx/default.conf
(demander confirmation avant tout brew install).
1) Implémente uniquement le périmètre du lot 2 : useStepPlayback (machine à états), Waveform, TypedTranscript, rendus
   de réponse (cases, scénario, curseurs induits avec correction, rebond), MilestoneCard, MemoryPanel (colonne desktop,
   tiroir mobile), raccourcis clavier, écrans ideal / restitution (lettre, radar recharts, ce qui fonctionne, ce qui peut
   s'améliorer, 3 pistes) / demos (3 micro-démos) / futur, le script Claire complet dans demo-parcours.json
   (statut « pret »), et les blocs d'appel sur /experience. Marc et Nadia restent « en préparation » (lot 3).
2) pnpm verify + pnpm test:demo-feedback + contrôle Playwright 1280/390 (parcours de bout en bout sans erreur console,
   sauts de chapitre, rechargement direct d'une étape, bouton retour, clavier, reduced-motion, tiroir mobile, aucun
   débordement horizontal, scripts/check-contrast.mjs) + test Nginx des routes directes.
3) CHANGELOG v1.4.1, STORY, README, docs/, HANDOFF.md (avec le prompt de reprise du lot 3), puis git-ship (squash-merge sur main).
4) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Puis demande-moi de relire le parcours
   Claire en ligne et de te donner mes retours.
```

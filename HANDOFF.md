# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 14 octobre 2026, fin du lot 2 (v1.4.1). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). États détaillés : [lot 1](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md), [lot 2](./docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md).

## État

- **Lot 1 (socle et avis réel) : livré en v1.4.0.** Avis réel vers Notion actif en production (variables sur l’API Coolify uniquement). Un avis texte de test est arrivé ; restent à tester un avis vocal et un avis avec e-mail.
- **Lot 2 (parcours Claire de bout en bout) : livré en v1.4.1.** Claire est `pret` : 11 échanges, numérique idéal, restitution, trois micro-démos, fonctions futures, avis. La démo est annoncée depuis `/experience`. Marc et Nadia sont « en préparation ».
- **En attente d’Ulrich** : relecture du parcours Claire en ligne (contenu complété listé dans l’état du lot 2) et retours.
- **Lot 3 (Marc, Nadia, comparaison, finitions, v1.4.2) : à faire.**
- Non vérifié : `docker build` / `docker run` (Docker absent de la machine) ; appareils iOS et Android réels.

## Points d’appui pour le lot 3

- **Contenu** : `client/src/data/demo-parcours.json`. Le schéma d’une étape est celui de Claire : `type` (`cases`, `question`, `scenario`, `curseurs`, `relance`), `question`, `questionSuite` (curseurs proposés avant la réponse), `options`, `reponse.choix`, `reponse.transcription`, `retenu.extrait` (passage exact de la transcription), `retenu.tags`, `retenu.curseurs[{libelle, valeur, corrigeA}]` (niveaux nommés, jamais de chiffre), `rebond{etape, rappel}` (le rappel doit être un extrait ou un tag retenu à cette étape), `numeriqueResponsable`, `pointEtape{texte, ordreDeGrandeur}`. Puis `ideal`, `restitution` (`lettre`, `radar`, `fonctionne`/`ameliorer` avec `etape` et `citation` exacte, `pistes` avec `lien` et `libelleLien`), `demos`. Passer un persona à `"statut": "pret"` active tous ses contrôles dans `scripts/verify-demo-content.mjs`.
- **Micro-démos** : trois gabarits (`arborescence`, `fiche`, `source-unique`) dans `client/src/components/demo/MicroDemos.tsx`. Marc a une démo « trois phrases dictées → note de répétition » et Nadia « inventaire → portfolio PDF + page web » : soit les exprimer avec le gabarit `fiche`, soit ajouter un gabarit.
- **Comparaison** : `getStepSequence` (`client/src/lib/demoContent.ts`) va de `futur` à `avis` ; insérer `comparaison` entre les deux. `StepView` (`client/src/pages/ExperienceDemo.tsx`) affiche pour l’instant un écran « en préparation » dédié (`preparation.comparaisonTexte`). `demo_comparaison_vue` est déjà émis. Les trois radars peuvent réutiliser `QualitativeRadar` (`Restitution.tsx`) ; la phrase et les trois formulations sont dans l’annexe D du PRD.
- **Moteur** : `useStepPlayback` (phases), `StepPlayer` (rendu d’un échange, panneau, commandes, clavier), `MemoryPanel`, `useDemoKeyboard`. Dimension colors via `dimensionVar()` (`demoTheme.ts`) : ne pas mettre de `border-color` ou `background-color` de charte en style en ligne, les règles globales de `index.css` recolorent alors le texte.
- **Contrôle qualité** : `pnpm check:demo-playback <url> [dossier-captures]` (Playwright, 75 contrôles sur Claire). L’étendre à Marc et Nadia et à l’écran de comparaison. Si Playwright réclame un navigateur absent, utiliser `CHROME_BIN` vers un Chromium déjà installé (voir l’en-tête du script).
- **Nginx** : tester avec Homebrew (`nginx -p <dossier> -c <conf>`), `root` vers `dist/public`, port libre ; procédure dans l’état du lot 2.
- **Avis réels de test** : deux avis marqués « TEST » (un vocal, un avec e-mail), avec accord explicite d’Ulrich avant d’écrire dans la base.
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`).

## Prompt de reprise du lot 3

À coller dans une session fraîche, en mode Worktree (Sonnet 5.5, effort moyen ; Opus seulement si la relecture du lot 2 demande de refondre le moteur).

```text
Repo memoways/boussole-numerique-recherche. Exécute le LOT 3 « Marc, Nadia, comparaison et finitions » (v1.4.2)
du plan validé docs/PLAN_DEMO_PLAYBACK_2026-10-14.md (lis-le en entier, puis HANDOFF.md,
docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md et AGENTS.md). Les lots 1 et 2 sont mergés sur main (v1.4.0, v1.4.1) ;
le parcours Claire est en ligne et l'avis réel vers Notion est actif en production.
Source fonctionnelle : PRD Notion 87b186ac43774c24b787c5f24738dbc6 (connecteur Notion, workspace
377e8583-7838-4c05-9f76-8833a450f304), annexes B (Marc), C (Nadia) et D (comparaison), à reprendre tels quels.
Retours d'Ulrich sur le parcours Claire : [COLLER ICI LES RETOURS].
Décisions déjà prises : mode immersif ; libellés de dimensions du PRD ; aucune écriture PostgreSQL pour les avis.
Outillage : Docker n'est pas installé en local, teste infra/nginx/default.conf avec nginx via brew (déjà installé ;
demande confirmation avant tout nouveau brew install). git-ship : appelle-le par son chemin réel
/Users/ulrich/CodeProjects/_shared/scripts/git-ship (le symlink ~/.local/bin/git-ship échoue).
1) Applique d'abord les retours sur Claire, puis : scripts Marc et Nadia dans demo-parcours.json (statut « pret »),
   leurs micro-démos, ComparisonView (3 radars, même question formulée trois fois, insérée entre futur et avis),
   verify-demo-content sur les 3 personas. Signale-moi les trous de contenu que tu complètes.
2) pnpm verify + pnpm test:demo-feedback + pnpm check:demo-playback étendu aux 3 personas et à la comparaison
   (1280/390, clavier, reduced-motion, tiroir, débordement, console) + scripts/check-contrast.mjs + test Nginx
   des routes directes (/experience/demo/*, /projet, /timeline, /references).
3) Avec mon accord explicite avant d'écrire dans la base : 2 avis de test réels marqués « TEST » (un vocal, un avec e-mail),
   vérifiés dans « Retours démo Boussole ».
4) CHANGELOG v1.4.2, STORY, README, docs/ (état du lot 3), HANDOFF.md, puis git-ship (squash-merge sur main).
5) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Mets à jour la tâche Notion liée
   (branche, PR, statut) et donne-moi la clôture.
```

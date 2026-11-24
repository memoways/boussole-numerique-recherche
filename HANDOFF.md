# HANDOFF — Refonte visuelle « spectre » (direction non choisie, concept en réflexion dans Notion)

> Mis à jour le 17 novembre 2026. Plan validé : [`docs/PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md`](./docs/PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md). États : [lot 0](./docs/ETAT_REFONTE_VISUELLE_LOT0_2026-11-17.md), [lot 1](./docs/ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md), [lot 1 bis](./docs/ETAT_REFONTE_VISUELLE_LOT1BIS_2026-11-17.md).

- **État** : lot 0 livré (PR #33). **Lot 1 non terminé : aucune direction visuelle n'est choisie.** `PRODUCT.md` (« Brand Commitments ») et la règle de palette d'`AGENTS.md` décrivent désormais la nouvelle identité. Deux mains d'esquisses ont été jugées **inutilisables** par Ulrich (bonnes idées, exécution insuffisante, pas d'histoire). Aucun « Direction contract » dans le surface brief. Production non publiée.
- **Lot 1 bis (17 novembre)** : histoire A « Le panneau au départ » retenue, noms des cinq chemins fixés (Outils & workflows, Compétences & IA, Données & archivage, Publics & communication, Partage & collaboration), nord posé à la fin. Les trois esquisses dessinées sur cette histoire sont **écartées** (« ce n'est toujours pas ça »).
- **Prochain pas** : Ulrich poursuit le concept, l'UI/UX et le storytelling dans la tâche Notion [Boussole : concept design UI/UX et storytelling](https://app.notion.com/p/41b511682fc380d99d1dd33383f8bca1), qui rassemble toutes les pistes, prototypes et captures. Le lot 1 ter part de ce qu'il y décide. Matériel : [`docs/refonte-visuelle-lot1bis/`](./docs/refonte-visuelle-lot1bis/) et [`docs/refonte-visuelle-lot1-esquisses/`](./docs/refonte-visuelle-lot1-esquisses/README.md) (ne rien copier dans `client/`).
- **Règles épinglées par Ulrich** : titre « Boussole » jamais coupé ; rien de rétro ; éléments de boussole (rondeurs, directions) sans effet de cible ; cohérence réelle ; une histoire de bout en bout.
- **Décisions du plan** : couleurs de memoways.com, spectre arc-en-ciel vif comme engagement de marque, blocs bruts et hiérarchie contrastée, grotesque libre auto-hébergée, chiffres non validés étiquetés « objectifs visés » dans une page Dossier (lot 5).
- **Tranché au lot 0** : « 1 500 tests » et « 600 utilisateurs… 30 % » retirés de `/projet` (origine non confirmée). À rétablir au lot 5 seulement si l'origine est établie.
- **Ouvert** : concept et direction visuelle (lot 1 ter, après la réflexion dans Notion), « tu » ou « vous » et parcours « Raconter une situation » (lot 4). `DescriptionProjet.tsx` (non routée) contient encore des chiffres à nettoyer.
- **Contraste** : blanc sur `autumn` (3,15) et sur `pizazz` (2,72) interdits ; cyan `#3a7fc1` seulement en grand texte ou à ajuster (lot 2).

---

# HANDOFF — Démo playback `/experience/demo`

> Mis à jour le 16 octobre 2026 (v1.9.0, accueil sans titre et trois parcours à égalité). Plan complet : [`docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`](./docs/PLAN_DEMO_PLAYBACK_2026-10-14.md). États détaillés : [lot 1](./docs/ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md), [lot 2](./docs/ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md), [lot 2bis](./docs/ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md), [lot 3](./docs/ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md), [lot 4](./docs/ETAT_LOT4_DEMO_PLAYBACK_2026-10-15.md).

## État

- **Retours du 24 novembre 2026 (principes, trois parcours)** : questions de la Boussole en grand (`QuestionCard`) ; « Synthèse de la Boussole » après chaque réponse (une fiche `retenu.fiche`, de 2 à 4 lignes, sans citation absente de la page) ; précision à la voix (`retenu.precision`, six au total) ; niveaux validés une seule fois, en fin de dimension, à la voix (`validation.voix`, page propre au dernier échange) ; plus d’échange « curseurs » ; niveaux écrits sur le radar, une couleur par niveau (`LEVEL_COLORS`) ; lettre courte en paragraphes. Détail et questions ouvertes : [`docs/ETAT_RETOURS_DEMO_PRINCIPES_2026-11-24.md`](./docs/ETAT_RETOURS_DEMO_PRINCIPES_2026-11-24.md). À relire par Ulrich : les 36 fiches, les six précisions, les quatre échanges réécrits (Claire 4, Marc 8, Nadia 4 et 7), les trois lettres.
- **Navigation v1.10.0 (16 octobre)** : menu du haut réduit (Projet, Expérience, Partenaires, Calendrier + « Participer au projet »), page `/participer` (ateliers puis questionnaire), `/partenaires` simplifiée, cartes d’atelier réécrites, `/ateliers` redirigé. Détail : [`docs/ETAT_NAVIGATION_PARTICIPER_2026-10-16.md`](./docs/ETAT_NAVIGATION_PARTICIPER_2026-10-16.md). **À faire côté Notion** : raccourcir « Infos pratiques » (doublons avec la date et les places) et corriger l’option « Professionel du cinéma ».

- **Lots 1 à 3 : livrés** (v1.4.0 à v1.4.3). Les trois parcours et la comparaison sont jouables.
- **Retouches v1.5.1 (15 octobre)** : parole et transcription simultanées, curseurs avec résumé et indices tirés des mots de la personne, « La question de la Boussole », typographie allégée, citation d’Okafor retirée chez Claire. **En attente d’Ulrich** : deux liens vers ses billets sur les enjeux de la création culturelle, à placer dans « D’autres regards ».
- **Retouches v1.7.0 (15 octobre)** : Okafor retiré du catalogue ; Marc recentré sur préparation, médiation et tournée (création hors écran) ; Nadia part de ses outils puis de ses besoins (11 échanges, ordre outils → données → publics → compétences → partage). Détail : [`docs/ETAT_RETOUCHES_MARC_NADIA_2026-10-15.md`](./docs/ETAT_RETOUCHES_MARC_NADIA_2026-10-15.md).
- **Retouches v1.9.0 (16 octobre)** : accueil sans titre d’accroche, réduit à « Tu es Marc, metteur en scène » et trois blocs (ni âge ni contexte) ; Marc et Nadia passent à 12 échanges avec les mêmes exigences que Claire (curseurs, ordres de grandeur illustratifs, restitutions plus fournies). Détail : [`docs/ETAT_ACCUEIL_ET_PARITE_PARCOURS_2026-10-16.md`](./docs/ETAT_ACCUEIL_ET_PARITE_PARCOURS_2026-10-16.md). À relire par Ulrich : accueil allégé, répliques nouvelles.
- **Lot 4 (ressources liées et finitions) : livré en v1.5.0.**
  - « D’autres regards » sous 13 échanges : 17 citations tirées de 12 ressources du corpus « Ressources web MW », selon l’annexe v3 validée par Ulrich (Notion `3fa511682fc381de8faefae21f4bc741`).
  - Le bloc « La Boussole retient » sous la réponse est retiré. (Remplacé le 24 novembre : les niveaux se valident en fin de dimension, voir ci-dessus.)
  - Le bouton du tiroir mobile pulse quand des éléments s’ajoutent.
  - Marc, Nadia et la comparaison sont réécrits (retours d’Ulrich du 15 octobre). « Concret » et « ce n’est pas X, c’est Y » sont bannis partout et contrôlés.
- **Avis de test réels : envoyés et vérifiés** le 15 octobre 2026, avec l’accord d’Ulrich. Un vocal (Marc), un écrit avec e-mail (Nadia), marqués « TEST — » dans « Retours démo Boussole », à supprimer quand Ulrich le souhaite.
- **À relire par Ulrich** : les citations en ligne et la liste « Écriture reprise » de l’[état du lot 4](./docs/ETAT_LOT4_DEMO_PLAYBACK_2026-10-15.md#écriture-reprise-retours-dulrich-du-15-octobre-2026).
- Non vérifié : `docker build` / `docker run` (Docker absent de la machine) ; appareils iOS et Android réels.

## Décisions en vigueur

- **Principes (annexe v2)** : pratiques plutôt qu’anecdotes, aucun jugement, écouter ce qui pèse, redondance et source de vérité, transmission des processus, place de chaque information, IA utile avec du contexte.
- **Échelle** : Exploration · Improvisation · Organisé · Orchestré ; phrase « Ni bien ni mal. Un point de départ. » sous les trois radars de la comparaison seulement (retirée sous le radar de la restitution le 24 novembre)
- **Ressources liées (annexe v3)** :
  - toutes les ressources liées au projet sont éligibles, quel que soit leur statut ; aucune ressource technique ;
  - les citations sont toujours présentées comme inspiration, jamais comme preuve ;
  - quatre à sept échanges par parcours, jamais deux de suite, au moins une ouverture ;
  - deux citations au plus par échange : un regard pratique, puis une ouverture ou un contrepoint.
- **Écriture** : phrases courtes, sans remplissage, sans « concret » ni « ce n’est pas X, c’est Y ».
- Mode immersif ; aucune écriture PostgreSQL pour les avis ; aucun appel à Notion au runtime.

## Points d’appui pour la suite

- **Contenu** : `client/src/data/demo-parcours.json` (champ `ressources` des étapes ; `retenu.resume` et, par curseur, `dit` ou `nonAborde`) et `client/src/data/demo-ressources.json` (catalogue). Toute retouche passe par `pnpm verify:demo-content`.
- **Ajouter une citation** :
  1. Choisir la ressource dans Notion et lire la page pour une citation exacte (30 mots au plus).
  2. Prendre l’URL publique dans le corps de la page si le champ URL est une redirection de newsletter.
  3. Vérifier la page publique avec un en-tête de navigateur (Medium refuse `curl`).
  4. Ajouter la ressource au catalogue (`notionId`), puis `{ ref, citation, citationOriginale?, role }` à l’étape.
- **Composants** : `RelatedResources.tsx` (bloc et mesure `demo_ressource_ouverte`), `StepPlayer.tsx` (ordre sous la réponse : curseurs induits, correction, « D’autres regards », premier regard), `MemoryPanel.tsx` (signal `data-pulses` du tiroir).
- **Contrôle qualité** : `pnpm check:demo-playback <url> [dossier-captures]`. Les échanges avec ressources et curseurs induits sont lus dans le JSON, les autres repères dans la constante `PERSONAS`. Si Playwright réclame un navigateur absent : `CHROME_BIN=~/Library/Caches/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-mac-arm64/chrome-headless-shell`.
- **Nginx** : Homebrew, `nginx -p <dossier> -c <conf>` avec `infra/nginx/default.conf` réécrit (port libre, `root` vers `dist/public`) ; procédure dans l’état du lot 3.
- **Avis de test** : passer par l’API de production (`POST /api/public/demo/transcribe` pour le vocal, puis `POST /api/public/demo-feedback` avec `mode: "voix"`), avec l’accord explicite d’Ulrich avant toute écriture, puis vérifier Persona, Mode, E-mail et Suivi = Nouveau dans « Retours démo Boussole ».
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`).

## Suite possible

Aucun lot n’est planifié. Pistes à confirmer avec Ulrich :
- enrichir le corpus sur la sobriété numérique et la souveraineté des données, puis compléter les échanges « numérique responsable » ;
- mesurer `demo_ressource_ouverte` et `demo_regard_ouvert` après quelques semaines pour garder ou alléger ces blocs ;
- corriger l’avertissement du fil d’Ariane.

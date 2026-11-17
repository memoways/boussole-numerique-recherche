# Plan de refonte visuelle « spectre » — 17 novembre 2026

> Statut : **plan validé par Ulrich le 17 novembre 2026**. Aucun lot n'est encore réalisé. Ce document part d'une critique Impeccable menée en double évaluation (revue design et détecteur automatique, sur le site en production à 1440 et 390 px). Il fixe les décisions d'Ulrich et découpe la refonte en sept lots livrables.

## 1. Pourquoi

Ulrich demande un site plus original, moins « IA générique », tourné vers les artistes et ancré dans une culture visuelle suisse et artistique.

La critique note le site **24/40** (heuristiques de Nielsen, niveau « Acceptable »). Le fond est sain : honnêteté sur l'état du projet, accessibilité de base, démo playback réussie. Mais le système visuel est interchangeable avec n'importe quel site civic-tech :

- Poppins + Open Sans servis par Google Fonts. Les titres demandent des graisses 800/900 qui ne sont pas chargées, le gras est donc simulé.
- Un dégradé pastel posé sur le titre de l'accueil (`Home.tsx:438`, `Projet.tsx:266`), un héros lilas, pêche et menthe, un bouton orange en pilule avec un halo.
- 194 coins arrondis `xl/2xl/3xl` et 283 icônes Lucide, souvent dans des pastilles colorées. Des emoji, y compris 🇨🇭 🇪🇺 (`Projet.tsx:27-31`, `:734-735`).
- Le jeton `--primary` est commenté « Electric blue for AI » (`index.css:46`), alors que `#515792` est écrit en dur 383 fois.
- Des surcharges `[style*=…]` recolorent des boutons de façon invisible (`index.css:158-178`).
- 15 encadrés à barre latérale épaisse (constat « side-tab » du détecteur).

Défauts mesurés à corriger quelle que soit la direction choisie :

- **Contraste.** Texte blanc sur l'orange `#E07428` : environ 3,1:1, sous le seuil AA. Tous les petits boutons orange sont concernés, y compris « Participer » dans le menu.
- **Animation.** Le radar `AnimatedRadarGraphic.tsx:42-62` tourne sans fin, sans pause ni prise en compte de `prefers-reduced-motion` (critère WCAG 2.2.2).
- **Chiffres non validés**, contraires à `PRODUCT.md` :
  - « 1 500 tests », « 600 utilisateurs… 30 % » (`Projet.tsx:79-81`) ;
  - « 3 à 7 heures par semaine » (`Projet.tsx:23`) ;
  - pourcentages 72/54/38 (`InteractiveNarrativeIllustration.tsx:122`) ;
  - coches vertes pour des fonctions non construites (`Projet.tsx:592`).
- **Longueur et mobile.** /projet atteint 13,5k px sur mobile. Un tableau y défile à l'horizontale (`Projet.tsx:431`) et le menu collant est décalé (`top-16` contre une navigation de 56 px de haut, `h-14`).
- **Le public artiste au second plan.** Le profil artiste est présenté en second. Les CTA de fin renvoient au « questionnaire partenaire » (`Experience.tsx:209`, `Participer.tsx:30`). Il existe six façons de participer qui se recoupent.

## 2. Décisions d'Ulrich (17 novembre 2026)

1. **Nouvelle identité**, avec une filiation Memoways par les **mêmes couleurs principales que memoways.com**. Jetons relevés sur le site :

   | Jeton Memoways | Valeur | Rôle |
   |---|---|---|
   | `--mw-whale-skin` | `#515792` | primaire, structure, liens |
   | `--mw-dark-knight` | `#171a2f` | encre |
   | `--mw-royal-curtsy` | `#262845` | encre secondaire, fonds sombres |
   | `--mw-autumn` | `#e27227` | accent, action principale |
   | `--mw-pizazz` | `#e58441` | accent doux |
   | `--mw-skyline` | `#989ab8` | atténué |
   | `--mw-desert-field` | `#efcfb7` | bordure, sable |
   | `--mw-coast-cream` | `#f7e7db` | fond chaud |
   | `positive` | `#447b66` | vert |
   | `attention` | `#d8b544` | ocre |
   | `--mw-radius` | `.125rem` | rayon de 2 px |

2. **L'arc-en-ciel est un engagement de marque explicite** (« important »). Il s'agit d'une palette vive en spectre, avec un dégradé arc-en-ciel là où il a du sens. Il doit montrer la multiplicité (multi, trans, hétéroclite) sans tomber dans le fourre-tout : la lisibilité reste garantie.
3. **Une hiérarchie forte.** Contrastes et variations d'échelle, des **blocs**, quelque chose de plus **brut** et original. Rien à plat.
4. **Police grotesque libre et auto-hébergée.**
5. **Chiffres non validés** : présentés comme « objectifs visés » et déplacés vers une page Dossier destinée aux financeurs. « 3 à 7 h » et les pourcentages 72/54/38 sont retirés.
6. **Matériel typographique et diagrammatique seul**, sans image inventée. Des photos réelles pourront s'ajouter plus tard.

Le constat « dégradé arc-en-ciel = tic IA » de la critique change donc de sens. **Le problème n'est pas l'arc-en-ciel, mais son usage :**

- **À éviter :** un dégradé pastel posé sur un titre, comme décor.
- **À faire :** le spectre devient la matière structurelle du site : blocs de couleur pleine, bandes, un champ de couleur par dimension, une signature en dégradé assumée.
- **Lisibilité :** le texte posé sur ces blocs reste AA, en encre `#171a2f` sur les teintes claires et en blanc sur les teintes foncées.

Ce qui reste fixé :
- AA, ton sobre, rien d'inventé ;
- français uniquement ;
- logo Memoways et mention de soutien de la Ville de Genève ;
- distinction entre le portail existant et l'outil futur.

## 3. Lots

Chaque lot suit le contrat du dépôt :
- branche dédiée ;
- `pnpm verify` ;
- contrôle desktop et mobile ;
- PR, squash vers main, vérification sur origin/main ;
- `CHANGELOG.md`, `STORY.md`, `README.md` et `HANDOFF.md` mis à jour dans la branche ;
- un état factuel `docs/ETAT_REFONTE_VISUELLE_LOT<n>_<date>.md` référencé dans `docs/README.md`.

La fusion ne vaut pas publication : la production Coolify reste une étape distincte.

### Lot 0 — Correctifs immédiats (indépendants de la direction)

- **Boutons orange.** Remplacer la surcharge `client/src/index.css:157-165` (fond `#E07428`, texte blanc forcé) par un fond `#B8531A` avec texte blanc (environ 4,9:1), ou un texte encre `#171a2f` sur l'orange. Mesurer chaque bouton orange, dont le « Participer » du menu.
- **Radar.** Dans `client/src/components/AnimatedRadarGraphic.tsx`, le radar devient statique par défaut ou joue une seule fois, s'arrête sous `matchMedia('(prefers-reduced-motion: reduce)')` et reçoit un bouton pause accessible si l'animation est conservée.
- **Chiffres.** Dans `client/src/pages/Projet.tsx` :
  - « 1 500 tests » et « 600 utilisateurs… 30 % » sont présentés comme « objectifs visés (dossier de soutien) », sans coche ;
  - la ligne « 3 à 7 heures par semaine » est retirée ;
  - dans le comparatif (`:592`), les coches des fonctions non construites sont remplacées par un statut honnête : « prévu » ou « à tester ».

  Les pourcentages de `client/src/components/InteractiveNarrativeIllustration.tsx:122` sont retirés ou remplacés par une représentation sans chiffre. Le déplacement vers une page Dossier se fait au lot 5.
- **Graisses fantômes.** Aligner les classes `font-extrabold`, `font-black` et `font-semibold` sur les graisses réellement chargées : Poppins 400/600/700, Open Sans 400/500. Le changement de police ne vient qu'au lot 2.

### Lot 1 — Direction visuelle (Impeccable new-work, remplacement de l'identité)

> **Statut (17 novembre 2026) : non terminé.** Brand commitments et règle de palette réécrits ; deux mains d'esquisses jugées inutilisables par Ulrich, aucune direction choisie. Voir [`ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md`](./ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md) et le prompt de reprise [`PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md`](./PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md). Les lots 2 à 6 restent bloqués.

- **Mises à jour préalables.**
  - Réécrire la section « Brand Commitments » de `PRODUCT.md` : couleurs Memoways ci-dessus, spectre arc-en-ciel vif comme engagement, multiplicité lisible, blocs bruts et hiérarchie contrastée, grotesque libre auto-hébergée, aucune image inventée. Retirer « l'identité actuelle est l'incumbent ».
  - Mettre à jour la règle de palette de `AGENTS.md`, qui dit aujourd'hui « bleu-cyan-vert-orange ».
- **Tirage de direction.**
  - Lancer `impeccable concept-seed --scope direction --mode persuade` sur l'accueil.
  - Les éléments épinglés par Ulrich priment champ par champ : spectre ancré sur les couleurs Memoways, blocs bruts, hiérarchie contrastée, grotesque libre.
  - Le tirage décide de la composition, de la topologie et de l'expérience du premier écran.
  - Présenter la page de décision (direction assignée, challengers, sortie standard) et attendre le choix d'Ulrich.
- **Matériau culturel de départ** (liste de dérivation, non tranchée) :
  - affiches suisses en aplats de couleur ;
  - programme de saison de théâtre genevois (Comédie, Grütli) ;
  - affiche de Kunsthalle et style typographique international ;
  - publications Pro Helvetia ;
  - signalétique CFF et cartographie swisstopo, la boussole comme vraie carte ;
  - livrets de festival (Black Movie, La Bâtie, Fête de la musique) ;
  - nuancier ou charte d'imprimeur, le spectre comme échantillons ;
  - feuille de salle annotée.
- **Consignation.** Le contrat de direction va dans le surface brief Impeccable.

### Lot 2 — Fondations du système

- **Jetons réels** dans `client/src/index.css`, repris des `--mw-*` de Memoways :
  - fond blanc ou `coast-cream` ;
  - encre `dark-knight` ;
  - `whale-skin` pour la structure et les liens ;
  - `autumn` pour l'action principale.
- **Le spectre.** Il part des couleurs Memoways (`autumn`/`pizazz`, ocre `attention`, vert `positive`, bleu `whale-skin`). Il est complété par les teintes déjà présentes dans la Boussole (cyan `#3a7fc1`, vert `#3aab8a`, lime `#7ab648`) et par un rouge-magenta et un violet à définir, pour boucler l'arc-en-ciel.
  - Chaque teinte reçoit un rôle, par exemple une dimension sur cinq ou un type de public.
  - Chaque teinte reçoit une paire de texte vérifiée AA.
  - Un dégradé signature `--spectrum` est réservé à quelques usages : bande d'en-tête, mot-symbole, transitions de section. Il ne s'applique jamais à du petit texte.
- **Nettoyage.** Supprimer les surcharges `[style*=…]` (`index.css:158-178`) et migrer les `#515792` inline vers les jetons.
- **Police grotesque libre auto-hébergée.** Choix final mesuré lors de la direction. Candidates hors liste des « défauts IA » :
  - Bricolage Grotesque, au caractère brut et hétéroclite ;
  - Schibsted Grotesk ;
  - Hanken Grotesk ;
  - Familjen Grotesk ;
  - Public Sans.

  Chargement par `@font-face` depuis `client/public/fonts`. Retirer Google Fonts de `client/index.html:10-12`.
- **Langage de forme :**
  - blocs de couleur pleine bord à bord, sans ombres ;
  - rayon de 2 px ou 0 ;
  - filets d'encre épais ou fins ;
  - forts écarts d'échelle typographique ;
  - sections numérotées 01–05 reprenant les cinq dimensions ;
  - ni verre, ni pastille d'icône, ni dégradé pastel.

  Les primitives `client/src/components/ui/` (bouton, input, accordéon) passent dans ce vocabulaire.

### Lot 3 — Accueil, navigation, pied de page

- **`Home.tsx`.** Premier écran construit selon le contrat de direction :
  - mot-symbole très grand, avec le spectre en blocs ou en bande comme signature ;
  - multiplicité lisible comme une juxtaposition ordonnée ;
  - entrée artiste en premier ;
  - une seule action principale par écran ;
  - profil artiste réécrit pour reconnaître la personne ;
  - dates fermes (`:334`, `:480`) remplacées par des jalons non numérotés.
- **`Navigation.tsx`.** Afficher le nom « Boussole », remplacer les survols en JavaScript par du CSS, cibles d'au moins 44 px.
- **`Footer.tsx`.** Une hiérarchie de titres sans saut de niveau.

### Lot 4 — Participer et Expérience, côté artistes

- **`/participer`.** Présenté comme un programme de saison : date, lieu et discipline en grand.
- **Parcours artiste « Raconter une situation ».** Créé seulement après décision d'Ulrich : nouveau recueil de données, donc consentement et stockage à valider.
- **CTA finaux.** Ils dépendent du profil (`Experience.tsx:209`, `Participer.tsx:30`). Le site adopte « tu » ou « vous » partout, selon la décision d'Ulrich.
- **`/experience`.** Retirer la rangée de trois cartes « Pour X » et raccourcir la page sur mobile.

### Lot 5 — Projet : lecture courte et dossier

- **Scinder `/projet`.** Une vue d'ensemble courte pour tous, et une page « Dossier » pour les financeurs qui accueille les objectifs visés. La route est déclarée dans `client/src/App.tsx`, avec rechargement direct, fallback Nginx et SEO vérifiés.
- **Nettoyage de la page.**
  - retirer les emoji ;
  - corriger le tableau qui défile à l'horizontale (`:431`), le décalage du menu collant (`:282`) et l'en-tête rouge alarmiste (`:437`) ;
  - remplacer « dimensions évaluées » et « modèle de scoring » par le vocabulaire « repérer, pas évaluer ».

### Lot 6 — Pages restantes et finition

- **Migration vers la nouvelle identité :**
  - Recherche, Méthode, Références, Ressources ;
  - Nouvelles, Calendrier ;
  - démo, en alignant sa typographie calme sur la nouvelle référence ;
  - présentation et questionnaire partenaires ;
  - NotFound.

  `/admin` reste en mode « Operate » : seuls ses jetons changent.
- **Encadrés.** Remplacer les 15 encadrés « side-tab » par des filets ou des marges typographiques.
- **Contrôle final :**
  - `impeccable detect --json client/src` ;
  - captures 1440 et 390 dans `.impeccable/review/` ;
  - revue de finition (`impeccable-finish-reviewer`) ;
  - `DESIGN.md` et `.impeccable/design.json` produits par le documenteur.

## 4. Vérification commune

- `pnpm verify`, `pnpm audit:mobile` et `pnpm audit:mobile:interactions` : aucun débordement à 320–390 px.
- **Contraste AA mesuré** sur chaque bouton et lien d'accent, et sur chaque paire texte/bloc du spectre. Le tableau est ajouté à `accessibility-audit.md`.
- **Radar** arrêté sous reduced-motion.
- **Détecteur Impeccable** : aucun constat « slop » sur les fichiers modifiés.
- **Captures 1440 et 390** de `/`, `/?public=artiste`, `/projet`, `/experience`, `/participer`, `/experience/demo`.
- **Rechargement direct** des nouvelles routes.

## 5. Décisions ouvertes (à poser au lot concerné)

- **Lot 0** : confirmer que « 1 500 tests » et « 600 utilisateurs… 30 % » viennent bien du dossier de soutien, avant de les étiqueter « objectifs visés ».
- **Lot 1** : choisir la direction sur la page de décision.
- **Lot 4** : tutoiement ou vouvoiement pour tout le site ; création du parcours « Raconter une situation ».

## 6. Prompt de reprise — Lot 0

À copier tel quel dans une nouvelle session, Claude Code ou Codex, ouverte sur le dépôt.

```markdown
# Lot 0 — Refonte visuelle « spectre » : correctifs immédiats

## Objectif
Corriger les défauts mesurés par la critique Impeccable du 17 novembre 2026, sans changer encore d'identité visuelle : contraste AA des boutons orange, radar animé sans fin, chiffres non validés sur /projet, graisses de police non chargées.

## État vérifié
- Plan validé par Ulrich le 17 novembre 2026 : docs/PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md (lire les sections 1, 2 et « Lot 0 »).
- Aucun lot réalisé. main contient le plan (PR « docs: plan de refonte visuelle spectre »).
- Site en production : https://boussole-culture-recherche.memoways.com (Coolify, publication distincte de la fusion).

## Dépôt et branche
- Dépôt : /Users/ulrich/CodeProjects/memoways/boussole-numerique-recherche (remote memoways/boussole-numerique-recherche).
- Partir de origin/main à jour. Créer la branche `fix/refonte-lot0-correctifs`. Vérifier `git status` (aucune modification étrangère à écraser).

## Sources à lire
- CLAUDE.md, AGENTS.md, PRODUCT.md, HANDOFF.md.
- accessibility-audit.md (variantes d'accent AA documentées).
- Fichiers : client/src/index.css (157-178), client/src/components/AnimatedRadarGraphic.tsx (40-64), client/src/pages/Projet.tsx (18-24, 76-83, ~592), client/src/components/InteractiveNarrativeIllustration.tsx (~122), client/index.html (12).

## Périmètre
1. Boutons orange AA : remplacer le `color:#fff` forcé sur `#E07428` (index.css:157-165) par un fond `#B8531A` avec texte blanc (≈4,9:1), ou un texte encre `#171a2f` sur l'orange. Mesurer le contraste de chaque bouton orange (menu « Participer », « Voir les ateliers », « Répondre au questionnaire », boutons de la démo) et le noter dans accessibility-audit.md.
2. Radar : statique par défaut ou une seule lecture, arrêt sous `matchMedia('(prefers-reduced-motion: reduce)')` (écouter les changements), bouton pause accessible si une animation est conservée. Garder les contrôles clavier existants.
3. Chiffres :
   - « 1 500 tests » et « 600 utilisateurs… 30 % » deviennent « objectifs visés (dossier de soutien) », sans icône de coche ; demander d'abord à Ulrich de confirmer qu'ils viennent bien du dossier de soutien, sinon les retirer ;
   - retirer « 3 à 7 heures par semaine » ;
   - remplacer les coches des fonctions non construites du comparatif par « prévu » ou « à tester » ;
   - retirer ou rendre non chiffrés les pourcentages 72/54/38 de InteractiveNarrativeIllustration.
4. Graisses : aligner `font-extrabold`, `font-black` et `font-semibold` sur les graisses chargées (Poppins 400/600/700, Open Sans 400/500). Ne pas changer de police (lot 2).

## Hors périmètre
Nouvelle palette, spectre, police, page Dossier, PRODUCT.md, refonte de layout : lots 1 à 6.

## Limites d'autorisation
- Aucune publication en production ni modification Coolify, DNS ou secrets.
- Aucune écriture Notion ni appel API en écriture.
- Ne pas inventer de chiffre ; demander avant de remplacer un texte factuel hors des cas listés.

## Validations
- `pnpm verify` vert.
- `pnpm audit:mobile` sans débordement à 320 et 390 px.
- Contrastes mesurés (avant/après) pour chaque bouton orange.
- Radar arrêté sous reduced-motion (Playwright `emulateMedia({ reducedMotion: 'reduce' })` ou navigateur intégré).
- Captures desktop 1440 et mobile 390 de /, /?public=artiste, /projet, /experience, /participer.
- `/Users/ulrich/.claude/skills/impeccable/scripts/impeccable detect --json` sur les fichiers modifiés.

## Livraison
- Mettre à jour CHANGELOG.md, STORY.md, README.md si concerné, HANDOFF.md, et créer docs/ETAT_REFONTE_VISUELLE_LOT0_<date>.md référencé dans docs/README.md, dans la branche.
- `git add -A` puis `/Users/ulrich/CodeProjects/_shared/scripts/git-ship -m "fix: ..."` (commit, push, PR, squash vers main), puis vérifier le SHA et le contenu sur origin/main et synchroniser le checkout local.
- Distinguer dans le compte rendu : local, GitHub, staging, production (non publié).

## Clôture
Avant de rendre la main, livrer dans le compte rendu le prompt autonome du lot 1 (direction visuelle, voir le plan), prêt à copier, avec son lien s'il est conservé dans un fichier.
```

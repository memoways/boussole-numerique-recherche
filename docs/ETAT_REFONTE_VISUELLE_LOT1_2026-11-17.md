# État — Refonte visuelle « spectre », lot 1 (direction visuelle) — 17 novembre 2026

> **Statut : lot 1 non terminé. Aucune direction n'est choisie.** Deux mains d'esquisses ont été produites et présentées à Ulrich. Il les a jugées **inutilisables** : de bonnes idées de principe, une exécution « lamentable ». Il arrête ici avec ce modèle (Sonnet 5.5) et reprendra avec un modèle plus fort (Opus ou Fable) ou un autre outil. Ce document consigne ce verdict, sauve le matériel et prépare la reprise.

Lot 1 du [plan de refonte visuelle « spectre »](./PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md). Prompt de reprise : [`PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md`](./PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md). Matériel : [`refonte-visuelle-lot1-esquisses/`](./refonte-visuelle-lot1-esquisses/README.md).

## Ce qui est fait

- **`PRODUCT.md` — « Brand Commitments » réécrit.** Les jetons Memoways (`whale-skin`, `dark-knight`, `royal-curtsy`, `autumn`, `pizazz`, `skyline`, `desert-field`, `coast-cream`, vert `#447b66`, ocre `#d8b544`, rayon de 2 px), le spectre arc-en-ciel vif comme engagement de marque, la multiplicité lisible, les blocs bruts et la hiérarchie contrastée, la grotesque libre auto-hébergée et l'absence d'image inventée y sont inscrits. « L'identité actuelle est l'incumbent » est retiré. Ces points viennent des décisions d'Ulrich du 17 novembre (plan, section 2), pas du choix de direction, qui reste ouvert.
- **`AGENTS.md` — règle de palette remplacée** (l'ancienne disait « bleu-cyan-vert-orange »). Les composants gardent leurs valeurs actuelles jusqu'au lot 2.
- **Contrastes mesurés** (script [`donnees/mesure-contraste.py`](./refonte-visuelle-lot1-esquisses/donnees/mesure-contraste.py)) et inscrits dans `PRODUCT.md` : encre `#171a2f` sur blanc 17,14, sur `coast-cream` 14,21, sur `autumn` 5,44, sur `pizazz` 6,29, sur ocre 8,66, sur `skyline` 6,24 ; blanc sur `whale-skin` 6,71, sur `royal-curtsy` 14,27, sur le vert `#447b66` 4,92, sur `#b8531a` 4,89. **Interdits** : blanc sur `autumn` (3,15) et sur `pizazz` (2,72). **Cyan `#3a7fc1`** : 4,07 avec l'encre, 4,21 avec le blanc, donc grand texte seulement ou teinte à ajuster au lot 2.
- **Deux tirages Impeccable** (`concept-seed --scope direction --mode persuade`, référence `seed:3b1755551a240509`, puis un re-tirage) et sept esquisses HTML au premier écran (1440 × 900), plus la sortie standard.
- **Surface brief : rien n'est consigné.** Aucun « Direction contract » n'a été écrit, puisqu'aucune direction n'a été choisie.

## Verdict d'Ulrich

- Aucune des directions de la première main n'est retenue. Le télétexte est « dégueulasse » : **rien de rétro**. Le nuancier d'imprimeur a une idée acceptable mais des détails mauvais. L'affiche suisse en aplats est cohérente en principe mais ses choix sont « hasardeux ».
- Deuxième main, après correction : « très, très mauvais, inutilisable ». Les principes sont bons, l'exécution ne l'est pas, et rien ne se joue « de A à Z ».
  - **La carte et sa légende** : « la carte, elle est où ? ». Ce n'est pas une carte, le trajet entre Diffusion et Compétences est mal réalisé, tout est hasardeux.
  - **Le poteau de randonnée** : l'idée est intéressante, mais « la boussole, elle est où ? ». Il n'y a pas d'histoire. Il faut se raconter une histoire, c'est du storytelling.
  - **Le disque doublé** : « ça ne veut rien dire ». L'horizon et la graduation sont des idées, pas menées jusqu'au bout.
- Conclusion d'Ulrich : l'ensemble est superficiel. Il n'avance pas avec ces esquisses. Il préfère garder l'existant plutôt que de partir sur elles, ou reprendre avec un modèle plus costaud.

## Règles épinglées par Ulrich (à respecter sans les redemander)

1. **Le titre « Boussole » (et « Boussole numérique culture ») n'est jamais coupé.** Aucune césure, aucun mot cassé, aucun texte coupé n'importe comment. Le titre tient sur une ligne et la taille s'adapte.
2. **Rien de rétro** (télétexte, pastiche d'époque, carte au trésor).
3. **Des éléments de boussole, en plus du spectre** : rondeurs, directions, aiguille, graduation. **Pas d'effet de cible** (cercles concentriques) : « c'est une boussole, pas une cible ».
4. **Une cohérence réelle.** Chaque choix de couleur, de forme et de composition a une règle. Rien d'arbitraire.
5. **Une histoire.** Chaque direction raconte ce que le visiteur comprend et fait, et chaque élément de boussole porte un sens produit.
6. Restent valables les décisions du plan : couleurs Memoways, spectre comme matière structurelle, blocs bruts, hiérarchie forte, grotesque libre auto-hébergée, aucune image inventée.

## Diagnostic de l'exécution

Constats faits en relisant les esquisses avec les retours d'Ulrich. Ils expliquent pourquoi les idées étaient bonnes et le rendu non.

**Défauts communs**
- **Composition avant récit.** Les compositions ont été dessinées avant d'écrire l'histoire du visiteur. Les éléments de boussole (rose des vents, graduation, disque, flèches) sont des décors, reliés à aucun geste du produit (« situer », « voir ce qui compte », « choisir une prochaine étape »).
- **Esquisses faites vite**, en HTML, à un seul format (1440 px). Aucune vérification à 390 px alors que la lecture mobile est fréquente (`PRODUCT.md`). Pas de comps image. Peu d'itérations visuelles.
- **Hauteurs, tailles et positions sans règle**, donc l'effet « hasardeux » relevé par Ulrich.

**Première main** (`ronde1/`)
- Nuancier : titre coupé en « Bous-sole » (césure forcée), « Compé-tences » et « Colla-boration » coupés aussi ; hauteurs d'échantillons croissantes qui se lisent comme un classement (contraire à « sans note ») ; neuf encres de bande choisies sans rôle ; aucune boussole.
- Affiche : un compas à cercles concentriques (une cible) chevauche le titre ; les aplats n'ont pas de règle de découpe.
- Télétexte : rétro, refusé.
- Partition de danse : la hauteur des blocs suggère une durée ou un niveau ; pas de boussole.

**Deuxième main** (`ronde2/`)
- Carte et légende : cinq rectangles juxtaposés, sans géographie, sans échelle, sans lien entre la rose des vents et la carte (elle n'est pas son nord). Le trajet pointillé relie Diffusion à Compétences sans raison et suggère un parcours imposé ou ordonné.
- Poteau : bonne idée (la randonnée suisse, une flèche par destination). Mais le poteau n'a ni point de départ ni destination, les flèches ne sont qu'un menu, et la boussole n'y apparaît pas.
- Disque doublé : horizon et graduation sans signification établie (que représente le disque ?). Les deux moitiés sont deux boutons, et le spectre y est sous-employé.

## Idées à garder (principes, pas l'exécution)

- **Vocabulaire de boussole sans cible** : aiguille, nord, cap, graduation sur un seul anneau de repères, rose des vents à pointes. La rose à huit pointes aux huit teintes du spectre est une signature possible : le spectre comme directions.
- **Lecture de carte** (swisstopo, CFF) : « vous êtes ici », légende, échelle, quadrillage, courbes de niveau. Le geste « situer » devient le point, et la « prochaine étape » le cap.
- **Randonnée suisse** : un poteau, des flèches par destination, un balisage. La flèche dit où aller, pas combien l'on vaut.
- **Miroir et horizon** : artiste et partenaire vus l'un de l'autre, à égalité. Reste à trouver ce que le disque représente.
- **Légende comme nuancier numéroté** 01 à 05 : un code qui sert aussi d'adresse (menu, pied de page).
- **Règles de lisibilité** : une seule teinte allumée à la fois dans un geste de navigation ; chaque teinte un rôle nommé ; aucune hauteur ni taille qui suggère un niveau.
- **Titre sur une ligne, très grand**, « numérique culture » dessous, entrée artiste en premier, mention de la Ville de Genève.

## Matériel sauvegardé

[`refonte-visuelle-lot1-esquisses/`](./refonte-visuelle-lot1-esquisses/README.md) : huit esquisses HTML autonomes avec leurs captures 1440 × 900 (cinq de la première main, trois de la seconde), les deux charges utiles de la page de décision, les deux sorties du tirage, le script de mesure de contraste et le générateur des esquisses de la seconde main. **Rien de cela n'est un livrable** : ce sont des pièces de travail jugées inutilisables, gardées pour ne pas repartir de zéro.

## Contrôles

- `pnpm verify` : **vert** (sortie 0, 17 novembre 2026, installation `--frozen-lockfile` préalable).
- `impeccable detect` sur `PRODUCT.md`, `AGENTS.md` et les trois esquisses de la seconde main : **aucun constat** sur `PRODUCT.md` et `AGENTS.md` ; dix constats, tous sur les esquisses (interlignage serré, marges serrées, palette crème, pastille d'accroche), que leur statut d'esquisse inutilisable laisse en l'état. Les esquisses de la première main n'ont pas été passées au détecteur.
- Aucun fichier de `client/` modifié. Aucune publication, aucune modification Coolify, DNS ou secret, aucune écriture Notion.

## Local, GitHub, staging, production

- **Local** : documents et esquisses dans la branche `docs/refonte-lot1-direction`.
- **GitHub** : PR vers `main`, fusion en squash (documentaire uniquement).
- **Staging** : non concerné.
- **Production** (Coolify) : **non publiée**. La fusion ne vaut pas publication, et le site visible n'a pas changé.

## Suite

Lot 1 bis : refaire la direction avec un modèle plus fort, en commençant par **l'histoire** de chaque direction, validée avec Ulrich avant tout dessin. Prompt prêt à copier : [`PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md`](./PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md). Les lots 2 à 6 restent bloqués tant qu'aucune direction n'est choisie.

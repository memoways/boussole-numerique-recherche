# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Public prioritaire : les **partenaires culturels** (institutions, structures, associations, réseaux et collectifs capables de relier l'outil aux artistes), puis les **artistes et personnes actives dans la culture**, qui vivent les frictions numériques au quotidien (fichiers dispersés, outils de partage mal ajustés, procédures de collaboration opaques). Les interlocuteurs institutionnels qui évaluent le projet (soutien culturel) lisent le site en second plan : il doit rester sobre, documenté et cohérent pour eux, sans devenir son public de conception. L'équipe de projet (Memoways) maintient le site et la console d'administration.

Les partenaires invités répondent à un questionnaire qualitatif par lien personnel ; l'équipe administre invitations, réponses et manifestations d'intérêt via `/admin`.

## Product Purpose

**Boussole Numérique Culture** est un outil en co-conception destiné aux actrices, acteurs et structures culturelles, et son site compagnon. La future Boussole aidera à situer des pratiques numériques, reconnaître des priorités et choisir une prochaine étape compréhensible. Elle n'existe pas encore comme outil utilisable : le site existe aujourd'hui, l'outil reste à construire.

Le site rend la démarche lisible (projet, calendrier, méthode, recherche, références), propose une expérience illustrative de la Boussole (démonstration playback avec parcours fictifs), mobilise les partenaires (présentation, questionnaire, inscription aux ateliers) et recueille des situations réelles pour nourrir l'atelier de co-conception et le prototype. Succès : des partenaires et artistes qui comprennent la démarche, y contribuent et alimentent le prototype à tester.

## Positioning

Une ressource de repérage et de dialogue pour le secteur culturel : elle ne produit pas de note unique et ne recommande pas automatiquement d'outil commercial. Elle privilégie des prochaines étapes adaptées plutôt qu'une évaluation ou une prescription. Engagements actuels du projet : gratuité, neutralité, code ouvert, hébergement maîtrisé, co-conception avec le secteur.

## Operating Context

- Jalons actuels : atelier et cadrage à l'automne 2026, prototype à tester visé fin 2026, ouverture publique visée début 2027. Les jalons restent volontairement non numérotés et sans projection ferme.
- Parcours d'entrée à deux profils sur l'accueil (`?public=partenaire`, `?public=artiste`), puis pages Projet, Expérience (dont démonstration `/experience/demo`), Partenaires, Calendrier, Participer (`/participer`, ateliers et questionnaire), Nouvelles de la Boussole (`/nouvelles`), avec Méthode, Recherche, Références et Ressources accessibles par le pied de page et des liens contextuels.
- Module partenaire séparé : `/partenaires/presentation` (slides avec contexte conservé dans `?slide=<n>&detail=<id>`), `/partenaires/questionnaire[/:token]`, `/admin` (alias `/partenaires/admin`).
- Lecture fréquente sur mobile ; le portail est une application React statique (Vite) servie par Nginx, déployée via Coolify ; l'API partenaire est un service Express distinct avec PostgreSQL.
- Soutien institutionnel à mentionner de façon sobre (capsule de soutien et lien vers la démarche de subvention correspondante).

## Capabilities and Constraints

- Français uniquement ; textes visibles en français.
- Aucun secret côté client ; l'API n'est atteinte que via `VITE_PARTNER_API_URL`. Les jetons d'invitation ne sont stockés que sous forme d'empreinte ; ne jamais journaliser les URL personnelles ni les réponses qualitatives.
- Les routes client doivent fonctionner au rechargement direct (fallback Nginx) ; une nouvelle page est déclarée dans `client/src/App.tsx` et reste accessible depuis une navigation adaptée.
- Distinguer toujours le portail existant du futur outil : engagements actuels au présent, fonctions de l'outil public au futur.
- Démonstration playback : parcours fictifs (Claire, Marc, Nadia), indexation `noindex`, avis final envoyé vers Notion.
- Newsletter « Nouvelles de la Boussole » : abonnement propre au projet, consentement explicite, retrait limité à cet abonnement ; le backend partagé Memoways et son activation restent à confirmer.
- Choix de conception non tranchés (à tester avec les partenaires) : parcours individuels et collectifs, restitution, comparaisons, architecture de l'outil public.

## Brand Commitments

Décisions d'Ulrich du 17 novembre 2026 (plan : `docs/PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md`). La nouvelle identité remplace l'ancienne : l'ancien look (Poppins et Open Sans, dégradé pastel, pilules à halo, pastilles d'icônes) est une preuve de ce qu'il faut quitter, pas un point de départ.

- **Ton sobre et institutionnel** ; aucune promesse chiffrée non validée. La sobriété tient au ton et à la lisibilité, pas à la pâleur.
- **Filiation Memoways.** Les couleurs principales sont celles de memoways.com :

  | Jeton | Valeur | Rôle |
  |---|---|---|
  | `whale-skin` | `#515792` | primaire, structure, liens |
  | `dark-knight` | `#171a2f` | encre |
  | `royal-curtsy` | `#262845` | encre secondaire, fonds sombres |
  | `autumn` | `#e27227` | accent, action principale |
  | `pizazz` | `#e58441` | accent doux |
  | `skyline` | `#989ab8` | atténué |
  | `desert-field` | `#efcfb7` | sable, bordure |
  | `coast-cream` | `#f7e7db` | fond chaud |
  | vert | `#447b66` | positif |
  | ocre | `#d8b544` | attention |
  | rayon | 2 px | coins quasi droits |

- **Le spectre arc-en-ciel est un engagement de marque.** Palette vive en spectre, avec un dégradé arc-en-ciel là où il a du sens, pour montrer la multiplicité (multi, trans, hétéroclite). Il n'est pas un décor : il sert de matière structurelle (blocs de couleur pleine, bandes, un champ de couleur par dimension, une signature en dégradé assumée). Jamais de dégradé pastel posé sur un titre, jamais d'arc-en-ciel sur du petit texte.
- **Multiplicité lisible.** Plusieurs couleurs, plusieurs voix, mais une juxtaposition ordonnée : chaque teinte a un rôle nommé, une seule teinte est active à la fois dans un même geste de navigation, aucun fourre-tout.
- **Blocs bruts et hiérarchie contrastée.** Aplats bord à bord, filets d'encre, forts écarts d'échelle typographique, rayon de 2 px ou 0, ni ombres portées, ni verre, ni pastilles d'icônes. Rien à plat au sens de « tout au même niveau ».
- **Typographie.** Grotesque libre et auto-hébergée (aucun service de polices tiers). Le choix de la famille est mesuré au lot 2.
- **Aucune image inventée.** Matériel typographique et diagrammatique seulement (aplats, filets, chiffres, schémas) ; de vraies photos pourront s'ajouter plus tard. Pas d'emoji ni de drapeaux décoratifs.
- **Lisibilité AA non négociable.** Texte posé sur un bloc : encre `#171a2f` sur les teintes claires, blanc sur les teintes foncées. Paires mesurées (rapport de contraste) : encre sur blanc 17,14 ; encre sur `coast-cream` 14,21 ; encre sur `autumn` 5,44 ; encre sur `pizazz` 6,29 ; encre sur ocre 8,66 ; encre sur `skyline` 6,24 ; blanc sur `whale-skin` 6,71 ; blanc sur `royal-curtsy` 14,27 ; blanc sur vert `#447b66` 4,92 ; blanc sur orange de bouton `#b8531a` 4,89. Interdits : blanc sur `autumn` (3,15), blanc sur `pizazz` (2,72). Le cyan `#3a7fc1` n'atteint 4,5 ni avec l'encre (4,07) ni avec le blanc (4,21) : grand texte seulement, ou teinte à ajuster au lot 2. Les teintes ajoutées au spectre (rouge-magenta, violet) reçoivent leur paire AA mesurée au lot 2.
- Logo Memoways et mention de soutien institutionnel (ville de Genève) comme assets existants.
- **Direction visuelle de l'accueil** : choisie par Ulrich au lot 1 et consignée dans le surface brief Impeccable (`Direction contract`), pas dans ce fichier.

## Evidence on Hand

- Études, synthèses et sources dans `client/public/*.md` et PDF (transformation numérique de la culture, UNESCO, Europe, Québec) ; quinze constats documentés sur la page Recherche ; comparatif de références ; contrôle des liens d'archives (152 URL, 14 août 2026).
- Documentation d'exploitation dans `docs/` ; audits d'accessibilité et vérifications mobiles à la racine.
- Absences à ne pas combler : aucun témoignage, avis, note, client, chiffre d'usage ou métrique d'impact réels n'existent. Ne jamais en inventer. La Boussole n'a pas encore d'utilisateurs ; la démonstration repose sur des personas fictifs clairement présentés comme tels.

## Product Principles

1. **Dire l'état réel.** Le site existe, l'outil est en préparation ; chaque page distingue ce qui est engagé de ce qui est à tester.
2. **Repérer et dialoguer, pas évaluer.** Aucune note unique, aucune prescription d'outil commercial ; les prochaines étapes sont compréhensibles et adaptées.
3. **Co-construire avec le secteur.** Chaque parcours (partenaire, artiste) ouvre une manière concrète de contribuer ; les retours sont expliqués dans leur devenir.
4. **Preuve sobre, rien d'inventé.** Constats sourcés, distingués des pistes de conception ; pas de faux avis, de métriques décoratives ni de statuts d'apparence tableau de bord.
5. **Respect des personnes et des données.** Consentement explicite, confidentialité des réponses et des invitations, retrait possible à tout moment.

## Accessibility & Inclusion

Cible WCAG AA : focus visible au clavier, lien d'évitement « Aller au contenu principal », langue de page `fr`, libellés accessibles, hiérarchie de titres sans saut, contrastes AA sur le texte et les contrôles, radars et cartes dépliables utilisables au clavier, aucun débordement horizontal à 320–390 px. Public non technique : vocabulaire clair, lecture mobile soignée.

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

- Ton sobre et institutionnel ; aucune promesse chiffrée non validée.
- Palette de marque bleu-cyan-vert-orange (bleu Memoways `#515792`, orange de marque `#E27227`) ; les variantes d'accent portant du texte ou une fonction interactive doivent rester conformes AA (documentées dans `accessibility-audit.md`).
- Logo Memoways et mention de soutien institutionnel (ville de Genève) comme assets existants.
- Les évolutions visuelles restent alignées avec les règles documentées dans les composants concernés ; l'identité actuelle est l'incumbent, pas un point de départ à remplacer.

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

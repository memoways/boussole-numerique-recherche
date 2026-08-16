# Plan de réécriture éditoriale de l’accueil — 16 août 2026

## Objectif

Réécrire l’accueil pour expliquer immédiatement **pourquoi la Boussole existe**, pour qui elle est conçue et où la démarche en est. L’accueil doit faire comprendre que l’outil reste à co-concevoir, que les artistes en sont les premiers bénéficiaires et que les structures ainsi que les personnes ressources contribuent à partir de rôles distincts.

## Décisions éditoriales appliquées

| Sujet | Décision appliquée |
|---|---|
| Raison d’être | Partir de difficultés concrètes : fichiers dispersés, outils mal ajustés, procédures opaques et coordination coûteuse. |
| Bénéfice recherché | Expliquer l’intérêt d’un état des lieux non jugeant qui aide à choisir une première amélioration progressive. |
| Statut | La phase actuelle recueille des idées et propositions pour préparer un atelier de co-conception visé à l’automne ; le prototype reste à décider. |
| Institutionnel | Rôle de relais : rendre visibles les priorités des artistes et préparer les conditions d’un test. |
| Artiste | Bénéfice direct : repérer ce qui prend du temps et ce qu’il serait utile de faire évoluer, sans évaluation ni culpabilisation. |
| Enjeux du numérique | Apport attendu : ressources, méthodes, alertes et critères de vigilance, sans décider à la place des artistes. |
| Actions | Deux actions principales par profil et un lien de profondeur expliqué dans le récit ou la FAQ. |

## Séquence de mise en œuvre réalisée

1. Diagnostiquer les formulations abstraites, répétitives ou imprécises de l’accueil.
2. Réécrire le hero, le bloc « pourquoi » et les objets éditoriaux des trois profils dans `client/src/pages/Home.tsx`.
3. Aligner les CTA, liens de profondeur, FAQ, état actuel et prochaines étapes avec le rôle de chaque profil.
4. Mettre à jour `shared/seo-pages.json`, le pré-rendu HTML et le manifeste conversationnel afin que la promesse publique reste cohérente avant et après hydratation React.
5. Contrôler les parcours Institutionnel, Artiste et Enjeux du numérique, puis consigner les résultats dans le document de contrôle dédié.

## Critères de validation

| Critère | État recherché |
|---|---|
| Compréhension | Le premier écran répond à ce qu’est la Boussole, à qui elle sert et au stade de la démarche. |
| Exactitude | Aucun texte ne décrit un diagnostic ou un prototype déjà disponible. |
| Cohérence par profil | Chaque récit contient une situation, un apport ou bénéfice concret, trois questions, deux actions et un lien de profondeur. |
| Style | Les situations concrètes remplacent les abstractions inutiles, sans ton culpabilisant ni promesse excessive. |
| SEO-GEO | Meta description, HTML pré-rendu, données structurées et manifeste conversationnel décrivent la même promesse. |

## Documents associés

- [`DIAGNOSTIC_REECRITURE_ACCUEIL_PROFILS_2026-08-16.md`](./DIAGNOSTIC_REECRITURE_ACCUEIL_PROFILS_2026-08-16.md)
- [`CONTROLE_REECRITURE_ACCUEIL_2026-08-16.md`](./CONTROLE_REECRITURE_ACCUEIL_2026-08-16.md)

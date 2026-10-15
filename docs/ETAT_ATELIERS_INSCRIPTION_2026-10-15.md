# État — page Ateliers et inscription (15 octobre 2026)

Archive factuelle de ce qui est livré dans la version 1.8.0. Elle décrit le code présent dans le dépôt ; l’activation en production dépend des étapes de la dernière section.

## Périmètre livré

- Page publique `/ateliers` : grille des ateliers à venir, lue dans Notion par l’API partenaire, avec un formulaire d’inscription par atelier.
- Liens vers `/ateliers` depuis l’accueil (avant le bloc « Rejoindre la co-conception »), depuis `/partenaires`, depuis la navigation principale et le footer.
- Stockage uniquement dans Notion : aucune table PostgreSQL, aucune migration, aucun e-mail envoyé.

## Bases Notion

Les deux bases sont lues et écrites avec le jeton de l’intégration « Boussole démo » (variable `NOTION_TOKEN`, déjà utilisée pour les retours du démonstrateur). Les identifiants sont ceux des **data sources** :

| Variable | Valeur | Base |
|---|---|---|
| `NOTION_ATELIERS_DS_ID` | `070a5d73-0636-4c77-b3bc-8ba2ac05cd6c` | 🗓️ Ateliers Boussole |
| `NOTION_INSCRIPTIONS_DS_ID` | `793208d0-7dc2-4946-b5e4-5b0a98bf8b59` | ✍️ Inscriptions ateliers Boussole |

Le code utilise la version d’API Notion `2025-09-03` (`POST /v1/data_sources/{id}/query`, création de page avec un parent `data_source_id`). Les retours du démonstrateur gardent leur version `2022-06-28` : le code existant n’a pas été modifié.

Propriétés lues dans **Ateliers Boussole** : Titre, Statut, Date, Lieu, Adresse, Organisateur, Objectifs, Programme, Infos pratiques, Type d’atelier, Public cible, Capacité, Date limite d’inscription, Slug. « Nb inscriptions » n’est pas utilisé : il compte aussi les inscriptions annulées.

Propriétés écrites dans **Inscriptions ateliers Boussole** : Nom complet (`Prénom Nom`), Prénom, Nom, Structure, Remarque (si renseignée), Email, Statut = `Inscrit`, Consentement = coché, Atelier (relation). « Date d’inscription » est remplie par Notion.

## API (`services/partner-feedback-api/src/ateliers.ts`)

- `GET /api/ateliers` : ateliers dont le Statut est `Publié` ou `Complet` et dont le jour de début (fuseau Europe/Zurich) est aujourd’hui ou plus tard, triés par date. Champs publics uniquement, plus :
  - `placesRestantes` = Capacité (15 si vide) − inscriptions dont le Statut n’est pas `Annulé` ;
  - `inscriptionsOuvertes` = Statut `Publié`, atelier pas encore commencé, date limite non dépassée (une date limite sans heure court jusqu’à minuit à Zurich), au moins une place.
  - Cache mémoire de 5 minutes, invalidé après chaque inscription ; réponse `Cache-Control: no-store`.
- `POST /api/ateliers/:id/inscriptions` : validation Zod (prénom, nom, e-mail, structure obligatoires ; `consentement` = `true` ; remarque facultative), champ caché anti-robots (`website`, réponse neutre sans écriture), limite de 10 demandes par heure et par IP. Relecture sans cache avant écriture : atelier encore public, inscriptions ouvertes, places restantes, absence de doublon (même e-mail, comparaison insensible à la casse, hors inscriptions annulées). Un verrou par atelier évite que deux demandes simultanées dépassent la capacité (instance unique).
- Codes de réponse : `201` enregistré ; `400` invalide ; `404` atelier introuvable ; `409` avec `code` = `duplicate`, `full` ou `closed` ; `429` trop de tentatives ; `502` erreur Notion (message générique) ; `503` configuration absente. La réponse ne contient aucune donnée personnelle.
- Le jeton ne quitte jamais l’API. Les erreurs Notion sont journalisées avec leur seul statut et leur code, sans le message (qui peut citer des valeurs saisies).

## Interface

- `client/src/pages/Ateliers.tsx` : cartes (titre, date et horaires en fr-CH heure de Genève, lieu, adresse, type, public, objectifs), Programme et Informations pratiques dépliables, places restantes, badges « Complet » et « Inscriptions closes », ancre `/ateliers#slug` (défilement et focus sur la carte une fois la liste chargée).
- `client/src/components/ateliers/InscriptionDialog.tsx` : dialog shadcn, validation côté client avec focus sur le premier champ en erreur, états envoi, succès (« Inscription enregistrée », sans promesse d’e-mail), erreur technique, doublon, complet et clos.
- État vide : « Dates en cours de confirmation » et lien vers `/partenaires`. État d’erreur : message générique et bouton « Réessayer ».
- `client/src/components/AteliersCallout.tsx` : bloc d’appel partagé par l’accueil et `/partenaires`.
- SEO : entrée `/ateliers` dans `shared/seo-pages.json` et dans `scripts/generate-seo.mjs` (page statique, sitemap, `llms.txt`), libellé de fil d’Ariane, redirection Nginx `/ateliers/` → `/ateliers`.

## Contrôles réalisés

- `pnpm verify` : TypeScript client et API, contenu de la démo, `pnpm test:ateliers`, build, SEO-GEO (11 pages indexables), build de l’API.
- `pnpm test:ateliers` (ajouté à `verify`) : normalisation des propriétés Notion, fuseaux et changements d’heure, places, date limite, doublon insensible à la casse, refus complet/clos, deux demandes simultanées pour la dernière place, cache puis invalidation, requêtes Notion envoyées (filtres, version, jeton), erreur Notion sans fuite de valeurs.
- `pnpm audit:mobile` à 320 et 390 px sur 21 routes dont `/ateliers` : 0 échec, 0 débordement. Les 3 cases de 13 px signalées sur l’accueil sont celles du formulaire d’intérêt existant.
- Lecture visuelle sur desktop, 1024 px et 320 px avec une API simulée : liste, carte « Complet », date sans heure, ancre, dialog (validation, doublon, succès), état vide, état d’erreur, blocs d’appel, navigation à six entrées.

## Non vérifié

- Aucune requête n’a été envoyée aux vraies bases Notion : le jeton n’est disponible que dans Coolify. Le test d’intégration réel reste à faire après activation (voir ci-dessous).
- `docker build` (Docker absent de cette machine) ; appareils iOS et Android réels.

## Activation

1. Dans Notion, partager les deux bases avec l’intégration « Boussole démo ». L’intégration doit aussi pouvoir **lire le contenu** : jusqu’ici elle n’avait que « insérer du contenu », ce qui suffit aux retours du démonstrateur mais pas à la liste des ateliers ni au comptage des places.
2. Dans Coolify, sur l’API : ajouter `NOTION_ATELIERS_DS_ID` et `NOTION_INSCRIPTIONS_DS_ID`, puis redéployer l’API. `NOTION_TOKEN` et `VITE_PARTNER_API_URL` sont déjà en place.
3. Créer un atelier de test (Statut `Publié`, date future) dans Notion, vérifier `/ateliers`, s’inscrire avec une adresse de test, contrôler la ligne créée et le décompte des places, puis supprimer l’atelier et l’inscription de test.

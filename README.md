# Boussole Numérique Culture

## Aperçu

**Boussole Numérique Culture** est le dépôt du portail institutionnel et du module partenaire qui préparent un futur outil de diagnostic numérique destiné aux actrices, acteurs et structures culturelles. Le portail explique le projet, le calendrier, l’expérience Boussole, la méthode, la recherche et les modalités de co-construction. Le module partenaire ajoute une présentation dédiée, des invitations personnelles, un questionnaire qualitatif, une console d’administration et l’envoi de récapitulatifs contrôlés.

Le projet est conçu pour être déployé et maintenu hors plateforme : le portail est une application statique servie par Nginx ; l’API partenaire est une application Express distincte ; PostgreSQL, l’API et Dreamlit sont activés dans Coolify lorsque le pilote démarre.

> **Principe produit.** La future Boussole aidera à situer des pratiques et à choisir une prochaine étape. Elle ne produira pas une note unique et ne recommandera pas automatiquement un outil commercial.

Le portail présente un **projet** de Boussole Numérique Culture, et non le diagnostic public déjà disponible. La co-conception est en cours ; le questionnaire visible concerne uniquement les partenaires invités. Les pages éditoriales distinguent donc les engagements actuels du projet, comme la gratuité, la neutralité, le code ouvert et l’hébergement, des fonctionnalités prévues pour la future version publique.

Une première passe de révision rédactionnelle a clarifié cet état d’avancement sur l’Accueil, le Projet, l’Expérience et le Calendrier. Elle a aussi retiré les revendications d’exclusivité non étayées de la page Références et resserré les répétitions sur Méthode et Partenaires. Le diagnostic, les réécritures appliquées et les questions de la prochaine passe sont conservés dans [`docs/PLAN_OPTIMISATION_REDACTIONNELLE.md`](./docs/PLAN_OPTIMISATION_REDACTIONNELLE.md).

Une seconde passe a distingué, sur la page Recherche, les constats sourcés des pistes de conception du projet. Elle a précisé, sur la page Partenaires, les étapes possibles de contribution et ce que le projet prévoit de partager. Le footer reprend ce même état de co-conception.

Une troisième passe a clarifié la page Ressources, désormais centrée sur les documents et sources qui éclairent la co-conception. Elle a également harmonisé les microtextes transversaux : les CTA indiquent l’action et le contenu de la destination, les liens externes distinguent PDF et source web, et la demande d’invitation partenaire est formulée explicitement.

Une quatrième passe a resserré les pages Projet et Méthode. Les parcours individuels et collectifs, la restitution, les comparaisons et l’architecture y sont présentés comme des choix à tester avec les partenaires. Les engagements du projet restent visibles, mais les éléments techniques à confirmer avant le déploiement public sont désormais signalés comme tels.

Une cinquième passe a consolidé les pages historiques. Les anciennes URLs de projet et de gouvernance redirigent vers les pages actives ; les études, sources et synthèses historiques restent accessibles dans l’arborescence `/ressources/*`. Les redirections sont prévues à la fois dans l’application et dans Nginx pour le déploiement Coolify. Voir [`docs/ARCHIVE_PAGES_HISTORIQUES.md`](./docs/ARCHIVE_PAGES_HISTORIQUES.md).

## Ce que contient le portail

| Ensemble | Rôle | Routes ou emplacement |
|---|---|---|
| Récit institutionnel | Projet, calendrier, méthode, gouvernance, partenaires et soutien institutionnel | `/projet`, `/timeline`, `/methode`, `/partenaires` |
| Expérience Boussole | Démonstration des cinq dimensions, radars et parcours | `/experience` |
| Recherche | Méthode de recherche, références comparables et ressources | `/recherche`, `/references`, `/ressources` |
| Présentation partenaire | Neuf slides avec détails dépliables, contexte conservé dans l’URL et navigation fixe | `/partenaires/presentation` |
| Questionnaire partenaire | Demande d’invitation publique ou questionnaire privé par lien personnel | `/partenaires/questionnaire`, `/partenaires/questionnaire/:token` |
| Administration | Organisations, contacts, invitations, réponses, export CSV et boîte Dreamlit | `/admin` et `/partenaires/admin` |

La navigation publique principale reste limitée à **Projet, Calendrier, Expérience, Méthode et Partenaires**. Recherche et Ressources restent accessibles par le footer et des liens contextuels. Les sous-pages utilisent le fil d’Ariane global plutôt que des retours dupliqués dans le contenu.

## Architecture

```text
Navigateur
  └─ Portail React/Vite statique ── Nginx ── domaine public
       └─ VITE_PARTNER_API_URL ── API partenaire Express
                                      ├─ PostgreSQL privé
                                      ├─ Deepgram (transcription optionnelle)
                                      ├─ SMTP (invitations optionnelles)
                                      └─ Dreamlit (récapitulatifs depuis boîte d’envoi limitée)
```

| Dossier ou fichier | Responsabilité |
|---|---|
| `client/src/pages/` | Pages publiques, présentation, questionnaire et console |
| `client/src/components/` | Navigation, fil d’Ariane, primitives UI et radar animé partagé |
| `client/src/lib/seo.ts` | Registre SEO, Open Graph, URLs canoniques et indexabilité |
| `services/partner-feedback-api/` | API Express, schéma SQL, invitations, réponses, session admin et récapitulatifs |
| `Dockerfile` | Image Nginx du portail avec fallback SPA |
| `services/partner-feedback-api/Dockerfile` | Image de l’API partenaire |
| `infra/nginx/default.conf` | Cache des actifs et réécriture des routes Wouter |
| `config/ENVIRONMENT.md` | Variables de build publiques et secrets runtime |
| `docs/` | Guides d’exploitation, migration, activation et archives |

## Démarrage local

Utilisez **Node.js 22** et **pnpm 10**.

| Besoin | Commande |
|---|---|
| Installer les dépendances | `corepack enable && pnpm install --frozen-lockfile` |
| Démarrer le portail | `pnpm dev` |
| Vérifier TypeScript du portail | `pnpm check` |
| Vérifier portail + API partenaire | `pnpm verify` |
| Prévisualiser le build statique | `pnpm preview` |
| Tester le formateur Dreamlit | `pnpm --filter @boussole/partner-feedback-api test:response-recap` |
| Lancer API + PostgreSQL localement | `docker compose -f docker-compose.partner-feedback.yml up --build` |

Le portail public ne requiert aucun secret. `SITE_URL` et `VITE_PARTNER_API_URL` sont des variables de build publiques. Les chaînes de connexion, mots de passe et clés de services sont uniquement chargés dans l’environnement runtime de l’API. Le registre complet est disponible dans [`config/ENVIRONMENT.md`](./config/ENVIRONMENT.md).

## Module partenaire

### Présentation et questionnaire

La page Partenaires fournit deux CTA indépendants : **Découvrir la Boussole** et **Partager mes idées et feedbacks**. La présentation contient neuf slides ; les panneaux de détail s’ouvrent dans le flux de lecture et l’URL conserve la slide et le détail ouverts. Sur desktop, le deck occupe un gabarit intérieur de 900 px avec une bande de navigation fixe. La première slide reprend l’animation radar de l’accueil ; les illustrations des suivantes sont choisies selon leur pertinence narrative.

Le questionnaire accepte les liens personnels sécurisés, conserve les brouillons et propose une transcription vocale optionnelle. La personne répondante peut relire et modifier le texte avant sa sauvegarde ; les fichiers audio sont supprimés après transcription. Les réponses restent disponibles jusqu’à la fin du développement de la version publique, selon le texte de consentement affiché.

### API, données et sécurité

Le schéma PostgreSQL crée des organisations, contacts, demandes, invitations, versions de questionnaire, réponses, réponses détaillées, événements et une boîte d’envoi de récapitulatifs. Une invitation est générée de manière aléatoire ; seule son empreinte SHA-256 renforcée par un secret serveur est persistée. L’administration utilise une session JWT signée, stockée dans un cookie `httpOnly` de huit heures.

La console est disponible à `/admin`. L’identifiant initial doit être défini par `ADMIN_EMAIL` — prévu pour `ulrich.fischer@memoways.com` — et son mot de passe par `ADMIN_PASSWORD` dans Coolify. La console ne doit jamais être indexée par les moteurs de recherche.

### Récapitulatifs Dreamlit

Après une soumission, l’API prépare un texte de récapitulatif déterministe dans `notifications.partner_response_recap_outbox`. Dreamlit doit se connecter avec un utilisateur PostgreSQL limité à cette boîte, puis déclencher un e-mail lors d’une insertion ou d’une mise à jour de `updated_at`. La console affiche les messages préparés, leur destinataire, leur contenu et le nombre de régénérations ; l’action de régénération met à jour la même ligne et ne crée pas de doublon.

Le fonctionnement complet, les droits SQL minimaux et le workflow Dreamlit sont documentés dans [`docs/PARTNER_FEEDBACK_OPERATIONS.md`](./docs/PARTNER_FEEDBACK_OPERATIONS.md) et [`docs/DREAMLIT_EMAIL_INTEGRATION_OPTIONS.md`](./docs/DREAMLIT_EMAIL_INTEGRATION_OPTIONS.md).

## Déploiement Coolify

Le déploiement final utilise trois ressources : le portail Nginx, une base PostgreSQL privée et l’API partenaire. Un quatrième élément, le workflow Dreamlit, délivre les e-mails après connexion à la boîte d’envoi. La procédure pas à pas est documentée ; elle comprend les domaines, les variables, les droits PostgreSQL, les tests de pilote et les sauvegardes.

Le domaine public de référence est `https://boussole-culture-recherche.memoways.com`. Il est défini comme valeur par défaut de `SITE_URL` dans le Dockerfile et doit être repris comme variable de build dans Coolify. La valeur peut être surchargée explicitement au build si l’environnement de préproduction utilise un domaine distinct.

Le 14 août 2026, le domaine a été validé en IPv4 avec HTTP 200 et un certificat TLS valide. Son CNAME publie toutefois une IPv6 qui ne répond pas. La correction consiste à remplacer ce CNAME par l’A record `185.131.204.133` et à ne pas publier d’AAAA avant une configuration IPv6 complète du serveur. La procédure complète est dans [`docs/DIAGNOSTIC_DOMAINE_BOUSSOLE_2026-08-14.md`](./docs/DIAGNOSTIC_DOMAINE_BOUSSOLE_2026-08-14.md).

| Composant | Déploiement | Documentation |
|---|---|---|
| Portail | Image du `Dockerfile` racine | [`docs/COOLIFY_MIGRATION.md`](./docs/COOLIFY_MIGRATION.md) |
| PostgreSQL | Service privé Coolify | [`docs/PARTNER_FEEDBACK_OPERATIONS.md`](./docs/PARTNER_FEEDBACK_OPERATIONS.md) |
| API partenaire | `services/partner-feedback-api/Dockerfile` | [`docs/PARTNER_FEEDBACK_OPERATIONS.md`](./docs/PARTNER_FEEDBACK_OPERATIONS.md) |
| Dreamlit | Workflow PostgreSQL transactionnel | [`docs/DREAMLIT_EMAIL_INTEGRATION_OPTIONS.md`](./docs/DREAMLIT_EMAIL_INTEGRATION_OPTIONS.md) |

Exemple de construction du portail :

```bash
docker build \
  --build-arg SITE_URL=https://boussole-culture-recherche.memoways.com \
  --build-arg VITE_PARTNER_API_URL=https://api.boussole-culture-recherche.memoways.com \
  -t boussole-numerique-culture .

docker run --rm -p 8080:8080 boussole-numerique-culture
```

## Qualité et règles de contribution

Avant un checkpoint, exécutez `pnpm verify`. Toute évolution visuelle doit rester responsive, conserver le focus clavier, éviter les débordements horizontaux et respecter les contrastes. Les modifications de routes doivent mettre à jour le registre SEO, le fil d’Ariane si nécessaire et les tests de navigation concernés.

Les aperçus de partage disposent d’un socle Open Graph dans `client/index.html`, enrichi dynamiquement par `SeoMeta` et injecté de façon statique pour chaque page indexable par `scripts/generate-seo.mjs`. Chaque page publiée reçoit le titre, la description, l’URL canonique, l’image, l’URL sécurisée de l’image, le texte alternatif et les métadonnées Twitter correspondantes. Le même script produit `sitemap.xml` avec les routes indexables, la date de build, une fréquence et une priorité, ainsi que `robots.txt` qui référence le sitemap et exclut `/admin`, `/partenaires/admin` et `/partenaires/questionnaire`.

Toute modification effectivement livrée doit mettre à jour `CHANGELOG.md`, `STORY.md`, `README.md` lorsqu’elle modifie le fonctionnement ou le contexte, et l’archive appropriée dans `docs/`. Les règles détaillées, notamment pour les secrets, l’administration et les migrations, sont dans [`AGENTS.md`](./AGENTS.md).

## Documentation de référence

| Document | Finalité |
|---|---|
| [`STORY.md`](./STORY.md) | Contexte, périmètre, décisions, état et limites du projet |
| [`CHANGELOG.md`](./CHANGELOG.md) | Historique consolidé des versions et changements réellement livrés |
| [`docs/README.md`](./docs/README.md) | Index des documents opérationnels |
| [`docs/COOLIFY_MIGRATION.md`](./docs/COOLIFY_MIGRATION.md) | Migration et déploiement du portail hors plateforme |
| [`docs/PARTNER_FEEDBACK_OPERATIONS.md`](./docs/PARTNER_FEEDBACK_OPERATIONS.md) | Activation du module partenaire et du pilote |
| [`docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md`](./docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md) | Décisions de conception du module partenaire |
| [`docs/IMPLEMENTATION_ARCHIVE_PARTNER_MODULE_2026-08-13.md`](./docs/IMPLEMENTATION_ARCHIVE_PARTNER_MODULE_2026-08-13.md) | Archive factuelle des fonctionnalités partenaire livrées |
| [`docs/PLAN_OPTIMISATION_REDACTIONNELLE.md`](./docs/PLAN_OPTIMISATION_REDACTIONNELLE.md) | Diagnostic rédactionnel et plan d’amélioration à valider avant réécriture |

## Licence

© 2026 Memoways. Tous droits réservés.

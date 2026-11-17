# Guide de travail des agents

Ce dépôt contient le site institutionnel **Boussole Numérique Culture**. Il est conçu comme une application React statique, compilée par Vite et servie en production par Nginx dans un conteneur Docker. Les textes visibles sont en français.

## Démarrage fiable

Utilisez Node.js 22 et pnpm 10. Les commandes de référence sont les suivantes.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
pnpm verify
docker build -t boussole-numerique-culture .
docker run --rm -p 8080:8080 boussole-numerique-culture
```

`pnpm verify` exécute le contrôle TypeScript et le build Vite. Toute modification doit réussir cette commande avant ouverture d'une pull request ou déploiement.

## Architecture utile

| Zone | Rôle |
|---|---|
| `client/src/pages/` | Pages et contenus éditoriaux du site. |
| `client/src/components/` | Navigation, footer et composants réutilisables. |
| `client/src/index.css` | Tokens, styles globaux, focus et règles responsive. |
| `client/public/` | Ressources statiques publiées à la racine, dont les PDF et le favicon. |
| `Dockerfile` | Build multi-étapes et image Nginx de production. |
| `infra/nginx/default.conf` | Cache des actifs et fallback SPA pour les routes Wouter. |
| `docs/` | Exploitation, migration Coolify et décisions de déploiement. |
| `services/partner-feedback-api/` | API Express/TypeScript, invitations, réponses et administration partenaire. |
| `docker-compose.partner-feedback.yml` | Référence locale de l’API et PostgreSQL ; en production, créer ces services dans Coolify. |

## Règles de modification

Préservez les routes côté client : une nouvelle page doit être déclarée dans `client/src/App.tsx`, rester accessible depuis une navigation adaptée et fonctionner au rechargement direct grâce au fallback Nginx. Préservez l’accessibilité existante, notamment les focus visibles, le lien d’évitement, les libellés accessibles et les comportements mobiles.

Les évolutions de contenu suivent le cadre institutionnel : français uniquement, ton sobre, pas de données inventées, et aucune promesse chiffrée non validée. Ne créez pas de faux avis, témoignages ou notes. Les changements visuels suivent la nouvelle identité décrite dans `PRODUCT.md` (« Brand Commitments ») : couleurs de Memoways (`whale-skin` `#515792`, `dark-knight` `#171a2f`, `royal-curtsy` `#262845`, `autumn` `#e27227`, `pizazz` `#e58441`, `skyline` `#989ab8`, `desert-field` `#efcfb7`, `coast-cream` `#f7e7db`, vert `#447b66`, ocre `#d8b544`, rayon de 2 px), spectre arc-en-ciel vif comme engagement de marque (matière structurelle en blocs et bandes, jamais un dégradé pastel posé sur un titre ni sur du petit texte), blocs bruts et hiérarchie contrastée, grotesque libre auto-hébergée, aucune image inventée. Tout texte ou contrôle posé sur une couleur reste conforme AA (encre sur teintes claires, blanc sur teintes foncées, paires mesurées dans `PRODUCT.md` puis `accessibility-audit.md`). Les jetons réels arrivent au lot 2 de la refonte (`docs/PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md`) ; d'ici là, les composants gardent leurs valeurs actuelles et les règles documentées dans les composants concernés.

## Sécurité et variables

Le portail n'a besoin d’aucun secret côté client. Le module partenaire utilise des secrets serveur : PostgreSQL, jeton d’invitation, session admin, Deepgram et SMTP. Ne créez jamais de clé privée, mot de passe ou token avec un préfixe `VITE_`, car ces valeurs sont publiées dans le JavaScript côté navigateur. Consultez `config/ENVIRONMENT.md` et `docs/PARTNER_FEEDBACK_OPERATIONS.md` avant d’ajouter une intégration.

## Expérience partenaire

Les parcours `/partenaires/presentation`, `/partenaires/questionnaire` et `/admin` forment un module séparé. `/partenaires/admin` demeure un alias de compatibilité. Le frontend n’accède à l’API que via `VITE_PARTNER_API_URL`. Les secrets et la base de données restent dans `services/partner-feedback-api`. Les jetons d’invitation sont stockés uniquement sous forme d’empreinte ; ne journalisez jamais les URL personnelles ni les réponses qualitatives.

La présentation conserve son contexte avec `?slide=<n>&detail=<id>`. Préservez ces paramètres lors de toute évolution des liens contextuels, afin que le bouton précédent du navigateur ramène à la même slide et au même panneau ouvert. Consultez `docs/README.md` avant de modifier l’exploitation Coolify ou les variables d’environnement.

## Documentation à chaque itération

Après chaque tour de changements effectivement livré, mettez à jour `CHANGELOG.md`, `STORY.md` et `README.md` à partir des modifications réelles, sans recopier un plan non implémenté. Ajoutez ou actualisez une archive factuelle dans `docs/` lorsque le périmètre est significatif, puis référencez-la depuis `docs/README.md`.

## Livraison

Travaillez sur une branche dédiée. Avant de proposer une fusion, exécutez `pnpm verify`, vérifiez au minimum la page modifiée sur desktop et mobile, puis décrivez les fichiers modifiés et les impacts dans la pull request. Ne modifiez ni les secrets de Coolify ni la configuration DNS à partir du code.

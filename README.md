# Boussole Numérique Culture

Site institutionnel du projet **Boussole Numérique Culture**. Le portail utilise React 19, TypeScript, Vite et Tailwind CSS 4. Il est compilé en site statique puis servi par Nginx, avec un fallback pour les routes côté client. Une API Express/TypeScript distincte prend en charge les invitations, le questionnaire partenaire, l’administration et PostgreSQL lors de l’activation dans Coolify.

## Démarrage

| Besoin | Commande |
|---|---|
| Installer | `corepack enable && pnpm install --frozen-lockfile` |
| Développer | `pnpm dev` |
| Vérifier | `pnpm verify` |
| Prévisualiser le build | `pnpm preview` |
| Construire l'image du portail | `docker build --build-arg SITE_URL=https://votre-domaine.example --build-arg VITE_PARTNER_API_URL=https://api.votre-domaine.example -t boussole-numerique-culture .` |
| Lancer l'image | `docker run --rm -p 8080:8080 boussole-numerique-culture` |

Utilisez Node.js 22 et pnpm 10. Le portail public ne requiert pas de secret. `SITE_URL` et `VITE_PARTNER_API_URL` sont des variables de build publiques ; toutes les clés, mots de passe et chaînes de connexion du module partenaire restent exclusivement dans l’environnement runtime de l’API. Voir [`config/ENVIRONMENT.md`](./config/ENVIRONMENT.md).

## Fonctions partenaire livrées

La page Partenaires propose deux accès autonomes : la présentation à `/partenaires/presentation` et le questionnaire à `/partenaires/questionnaire`. La présentation comporte neuf slides défilables avec compositions visuelles, panneaux de détail accessibles et liens contextuels. L’état de lecture est conservé par `?slide=<n>&detail=<id>`, ce qui permet au bouton précédent du navigateur de retrouver la slide et le détail ouverts.

La console d’administration est accessible directement à `/admin`; `/partenaires/admin` est conservé comme alias. Son accès fonctionnera après déploiement de l’API et de PostgreSQL, avec l’identifiant initial `ulrich.fischer@memoways.com` et un mot de passe stocké uniquement dans `ADMIN_PASSWORD` côté Coolify.

## Déploiement et maintenance

Le déploiement self-hosted s’appuie sur le `Dockerfile` racine et `infra/nginx/default.conf`. L’API partenaire utilise `services/partner-feedback-api/Dockerfile`. Le point d’entrée de toute la documentation est [`docs/README.md`](./docs/README.md), qui relie le guide général de migration et le tutoriel d’activation de PostgreSQL, de l’API, des secrets et de `/admin`.

Les agents de code et les développeurs doivent suivre [`AGENTS.md`](./AGENTS.md). Les instructions sont relayées vers Claude Code et Cursor via `CLAUDE.md` et `.cursor/rules/project.mdc`.

## Architecture

| Dossier ou fichier | Responsabilité |
|---|---|
| `client/src/pages/` | Pages éditoriales et interactions spécifiques. |
| `client/src/components/` | Composants globaux et primitives UI. |
| `client/src/index.css` | Styles globaux, design tokens et règles d'accessibilité. |
| `client/public/` | Fichiers publics : documents, favicon, logo. |
| `Dockerfile` | Image de production autonome. |
| `infra/nginx/default.conf` | Cache des actifs et réécriture SPA. |
| `services/partner-feedback-api/` | API Express/TypeScript, schéma PostgreSQL, invitations, transcription et administration. |
| `docs/` | Guide de déploiement, archive d’implémentation et validation des parcours. |

## Licence

© 2026 Memoways. Tous droits réservés.

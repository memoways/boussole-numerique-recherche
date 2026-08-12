# Boussole Numérique Culture

Site institutionnel du projet **Boussole Numérique Culture**. L'application est un frontend React 19, TypeScript, Vite et Tailwind CSS 4. Elle est compilée en site statique puis servie par Nginx, avec un fallback pour les routes côté client.

## Démarrage

| Besoin | Commande |
|---|---|
| Installer | `corepack enable && pnpm install --frozen-lockfile` |
| Développer | `pnpm dev` |
| Vérifier | `pnpm verify` |
| Prévisualiser le build | `pnpm preview` |
| Construire l'image | `docker build -t boussole-numerique-culture .` |
| Lancer l'image | `docker run --rm -p 8080:8080 boussole-numerique-culture` |

Utilisez Node.js 22 et pnpm 10. Le projet ne requiert aucun secret ni variable d'environnement dans sa version actuelle ; voir [`config/ENVIRONMENT.md`](./config/ENVIRONMENT.md).

## Déploiement et maintenance

Le déploiement self-hosted s'appuie sur le `Dockerfile` racine et `infra/nginx/default.conf`. Le guide complet est disponible dans [`docs/COOLIFY_MIGRATION.md`](./docs/COOLIFY_MIGRATION.md), tandis que les consignes d'exploitation quotidienne sont dans [`docs/OPERATIONS.md`](./docs/OPERATIONS.md).

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

## Licence

© 2026 Memoways. Tous droits réservés.

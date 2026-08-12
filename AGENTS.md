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

## Règles de modification

Préservez les routes côté client : une nouvelle page doit être déclarée dans `client/src/App.tsx`, rester accessible depuis une navigation adaptée et fonctionner au rechargement direct grâce au fallback Nginx. Préservez l’accessibilité existante, notamment les focus visibles, le lien d’évitement, les libellés accessibles et les comportements mobiles.

Les évolutions de contenu suivent le cadre institutionnel : français uniquement, ton sobre, pas de données inventées, et aucune promesse chiffrée non validée. Ne créez pas de faux avis, témoignages ou notes. Les changements visuels doivent rester alignés avec la palette bleu-cyan-vert-orange et les règles documentées dans les composants concernés.

## Sécurité et variables

Le site actuel n'a besoin d'aucun secret. Ne créez jamais de clé privée, mot de passe ou token avec un préfixe `VITE_`, car ces valeurs sont publiées dans le JavaScript côté navigateur. Toute future intégration sensible doit être isolée dans un backend et configurée comme variable runtime dans Coolify. Consultez `config/ENVIRONMENT.md` avant d'ajouter une intégration.

## Livraison

Travaillez sur une branche dédiée. Avant de proposer une fusion, exécutez `pnpm verify`, vérifiez au minimum la page modifiée sur desktop et mobile, puis décrivez les fichiers modifiés et les impacts dans la pull request. Ne modifiez ni les secrets de Coolify ni la configuration DNS à partir du code.

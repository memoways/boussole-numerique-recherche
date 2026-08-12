# Migration vers Coolify self-hosted

## Objectif et résultat attendu

Ce dépôt est maintenant **autonome** : il compile une application React/Vite statique puis la sert avec Nginx dans une image Docker. Il ne requiert plus de runtime, d'analytics, de proxy ou de secret liés à Manus. Le `Dockerfile` est retenu plutôt qu'un build pack statique générique afin de maîtriser explicitement le cache HTTP et le fallback SPA nécessaire aux routes `/projet`, `/timeline` et `/references`.[1] [2]

> Le site actuel n'appelle aucune API privée et ne demande aucun secret. Ajoutez uniquement `SITE_URL` comme variable de build afin de générer des URL canoniques, Open Graph, `sitemap.xml` et `robots.txt` cohérents avec le domaine final.

## Pré-requis

Vous devez disposer d'une instance Coolify self-hosted opérationnelle, d'un serveur de destination Docker connecté à Coolify et d'un accès à un dépôt Git. Coolify se connecte à un dépôt public ou privé via GitHub App ou clé de déploiement, puis peut déployer directement le Dockerfile du dépôt.[1] Un nom de domaine doit pointer vers l'adresse IP du serveur Coolify avant la mise en production.

| Élément | Valeur recommandée | Motif |
|---|---|---|
| Dépôt | Git privé, branche `main` | Contrôle des accès et traçabilité des mises à jour. |
| Build pack Coolify | **Dockerfile** | Reproductibilité exacte de l'image définie dans le dépôt. |
| Base directory | `/` | Le `Dockerfile` et `package.json` sont à la racine. |
| Port exposé | `8080` | Port Nginx défini dans le `Dockerfile`. |
| Variable de build | `SITE_URL=https://votre-domaine.example` | Génère les URL SEO finales ; ce n'est pas un secret. |
| Stockage persistant | Aucun | L'application n'écrit aucune donnée. |

## Première mise en ligne

### 1. Préparer le dépôt

Poussez la branche `main` vers GitHub, GitLab, Gitea ou votre forge Git habituelle. Vérifiez que `pnpm-lock.yaml`, `Dockerfile`, `infra/nginx/default.conf`, `AGENTS.md` et le dossier `docs/` font partie du commit. Les fichiers `.env` restent exclus du dépôt.

### 2. Créer la ressource Coolify

Dans Coolify, créez un projet puis une nouvelle ressource applicative. Sélectionnez le dépôt Git, choisissez **Dockerfile** au lieu de Nixpacks, gardez `/` comme base directory et conservez le chemin `Dockerfile`. Cette configuration donne à l'image le contrôle complet de son build et de son exécution.[1]

Dans **Network**, définissez le port exposé sur `8080`. Ajoutez le ou les noms de domaine souhaités dans le champ FQDN, par exemple `boussole.example.org` et `www.boussole.example.org`. Coolify gère les certificats TLS pour les domaines de la ressource lorsque le DNS est correctement orienté vers le serveur.[4]

### 3. Variables et secrets

N'ajoutez aucune ancienne variable de Manus. Ajoutez `SITE_URL=https://votre-domaine.example` comme variable de build pour les métadonnées SEO ; elle est publique et ne constitue pas un secret. Le site ne requiert aucune variable runtime. Si vous activez ultérieurement un backend, stockez les secrets uniquement dans la ressource backend ; les variables runtime ne sont nécessaires qu'au conteneur qui les consomme.[3]

Les variables de build sont injectées comme `ARG` pour les applications Dockerfile et peuvent être retrouvées dans les métadonnées de l'image. Pour une future clé réellement requise au build, activez les Docker Build Secrets dans Coolify ; cette option évite de l'inscrire dans les couches de l'image.[3]

### 4. Déployer et valider

Lancez **Deploy**. Après un déploiement réussi, ouvrez la racine puis les routes profondes dans une fenêtre privée : `/`, `/projet`, `/timeline`, `/references` et `/partenaires`. Le rechargement direct de chacune de ces routes doit afficher l'application, pas une page 404. Vérifiez aussi le menu mobile, le tableau comparatif et le téléchargement des ressources PDF.

## Mises à jour après migration

Le code est destiné à être modifié indifféremment par un développeur humain, Cursor, Codex ou Claude Code. `AGENTS.md` est le guide commun ; `CLAUDE.md` et `.cursor/rules/project.mdc` relaient les mêmes contraintes aux outils qui les reconnaissent.

Avant chaque fusion, exécutez `pnpm verify`. La vérification GitHub Actions exécute cette commande et construit l'image Docker à chaque push sur `main` ou pull request. Coolify peut ensuite redéployer le nouveau commit depuis sa connexion Git. Pour une mise à jour sans automatisation, utilisez simplement **Redeploy** dans la ressource Coolify après avoir poussé le commit validé.

## Gestion des incidents et retour arrière

Le retour arrière doit toujours partir du dépôt Git. Identifiez le dernier commit connu comme fonctionnel, redeployez ce commit depuis Coolify ou créez un commit de réversion, puis redéployez `main`. Évitez toute modification manuelle dans le conteneur : elle serait perdue à la reconstruction suivante.

## Évolutions avec données ou IA

La version actuelle est volontairement sans backend. Une future fonctionnalité qui traite des réponses de questionnaire, envoie des e-mails ou appelle un modèle IA doit être ajoutée comme service backend distinct. Le frontend communique avec ce service via une URL publique non sensible ; le backend conserve ses propres variables runtime et ses secrets dans Coolify. Cette séparation évite d'exposer des clés dans le bundle Vite.[3]

## Checklist de bascule

- [ ] Le dépôt Git contient le kit Docker et la documentation actuelle.
- [ ] `pnpm verify` est vert localement et dans GitHub Actions.
- [ ] La ressource Coolify utilise le build pack Dockerfile, la base `/` et le port `8080`.
- [ ] La variable de build publique `SITE_URL` correspond exactement au domaine final en HTTPS, sans slash final.
- [ ] Le DNS du domaine cible pointe sur le serveur Coolify.
- [ ] La racine et les routes profondes sont validées après déploiement.
- [ ] Les anciennes URL Manus sont retirées des documents et liens de production après validation du nouveau domaine.
- [ ] Aucun secret n'est présent dans le dépôt ou dans une variable `VITE_*`.
- [ ] `pnpm audit --prod` ne signale aucune vulnérabilité critique ou élevée.

## Références

[1] [Coolify — Dockerfile Build Pack](https://coolify.io/docs/applications/build-packs/dockerfile)

[2] [Coolify — Static Build Packs](https://coolify.io/docs/applications/build-packs/static)

[3] [Coolify — Environment Variables](https://coolify.io/docs/knowledge-base/environment-variables)

[4] [Coolify — Introduction au self-hosting](https://coolify.io/docs/get-started/introduction)

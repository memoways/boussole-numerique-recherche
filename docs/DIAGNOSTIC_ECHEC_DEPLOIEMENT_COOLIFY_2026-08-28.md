# Diagnostic — Échec de déploiement Coolify du portail

**Date :** 28 août 2026  
**Statut :** correction intégrée au dépôt ; redéploiement Coolify requis pour la valider dans l’image de production.

## Cause identifiée

Le conteneur Nginx démarrait correctement. Le journal indique l’initialisation normale de Nginx, suivie de quatre appels sur `/` qui reçoivent chacun une réponse `308`. L’ancien healthcheck Docker appelait `http://127.0.0.1:8080/`. La règle Nginx destinée à supprimer les URL publiques contenant `:8080` redirigeait cette requête locale vers HTTPS. `wget` suivait ensuite le FQDN public qui n’était pas encore routé/certifié, obtenait `503`, puis Coolify annulait le rolling update.

> Il ne s’agit pas d’une erreur de build : le journal affiche « New container started » et « Configuration complete; ready for start up ». Le rollback est déclenché seulement après les trois healthchecks qui suivent une redirection externe.

## Correction intégrée

| Fichier | Correction | Effet |
|---|---|---|
| `infra/nginx/default.conf` | Ajout de `GET /healthz`, réponse locale `200 ok`, sans redirection ni dépendance DNS/TLS. | L’état interne de Nginx est vérifié indépendamment des FQDN publics. |
| `Dockerfile` | Healthcheck remplacé par `wget … http://127.0.0.1:8080/healthz`. | Coolify ne suit plus l’URL HTTPS publique pendant le démarrage du conteneur. |
| Règle de normalisation du port | Elle cible maintenant seulement le FQDN public canonique portant `:8080`, jamais `127.0.0.1:8080`. | Les anciennes URL publiques restent nettoyées sans perturber le contrôle local. |

`pnpm verify` passe après cette correction. Docker n’est pas disponible dans l’environnement de contrôle local : la validation finale de l’image doit donc être réalisée par le prochain redeploy Coolify.

## Ce que vous devez faire maintenant

1. Attendre que le dépôt synchronisé dans Coolify affiche le nouveau commit contenant le healthcheck `/healthz`.
2. Dans la ressource **portail**, conserver `8080` comme port exposé et laisser le champ Healthcheck Coolify vide : le `HEALTHCHECK` du Dockerfile sera détecté automatiquement.
3. Retirer le slash final éventuel du FQDN pour garder exactement `https://boussole-culture-recherche.memoways.com`.
4. Cliquer sur **Redeploy** ; la construction ne doit plus être ignorée si le commit a changé.
5. Attendre l’état Healthy, puis seulement ouvrir l’URL publique du portail.

## Vérifications macOS

`getent` est un utilitaire Linux, absent de macOS. Utilisez :

```bash
dig +short CNAME boussole-culture-recherche.memoways.com
dig +short CNAME api.boussole-culture-recherche.memoways.com
dig +short A boussole-culture-recherche.memoways.com
dig +short A api.boussole-culture-recherche.memoways.com
dig +short A lime.1024b.net
```

Les deux commandes `CNAME` doivent afficher `lime.1024b.net`. En DNS only, les commandes `A` doivent aboutir à l’IPv4 de ce target. Ne testez l’API `/health` qu’après le déploiement de la ressource API partenaire ; elle n’est pas fournie par le conteneur portail.

## Références associées

- [Tutoriel Cloudflare, CNAME, Coolify et questionnaire](./TUTORIEL_CLOUDFLARE_CNAME_COOLIFY_QUESTIONNAIRE_2026-08-27.md)
- [Migration Coolify](./COOLIFY_MIGRATION.md)

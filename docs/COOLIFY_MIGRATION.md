# Migration vers Coolify self-hosted

## Objectif et périmètre actuel

Le dépôt est autonome : le portail React/Vite est servi par Nginx dans une image Docker et le questionnaire repose sur une API Express distincte, une base PostgreSQL privée et des intégrations optionnelles. La migration ne consiste donc plus seulement à publier un site statique : elle doit mettre en place trois ressources Coolify cohérentes — **portail**, **API partenaire** et **PostgreSQL** — sans faire remonter de ports internes dans les URL publiques.

La configuration DNS retenue pour `memoways.com` utilise Cloudflare et des **CNAME vers `lime.1024b.net`**, sans enregistrement A dans la zone de la Boussole. Avec ces CNAME DNS only, le challenge HTTP par défaut de Coolify est le chemin initial recommandé : le DNS challenge Cloudflare est une option réservée aux wildcards, aux serveurs sans port 80 public ou à un échec HTTP-01 confirmé. Le guide détaillé, étape par étape, est disponible dans [`TUTORIEL_CLOUDFLARE_CNAME_COOLIFY_QUESTIONNAIRE_2026-08-27.md`](./TUTORIEL_CLOUDFLARE_CNAME_COOLIFY_QUESTIONNAIRE_2026-08-27.md).

> **Statut au 27 août 2026.** Le code du portail, de l’API, de la console `/admin`, des invitations, du questionnaire et des migrations est prêt dans le dépôt. La production reste à activer : les CNAME, la base, l’API, les secrets, le build du portail et le pilote sont les prochaines étapes.

## Architecture de déploiement

| Ressource Coolify | Dockerfile | Port interne | FQDN public | Stockage |
|---|---|---:|---|---|
| `boussole-portal` | `Dockerfile` à la racine | `8080` | `https://boussole-culture-recherche.memoways.com` | Aucun |
| `boussole-partner-api` | `services/partner-feedback-api/Dockerfile` | `3001` | `https://api.boussole-culture-recherche.memoways.com` | Aucun hors PostgreSQL |
| `boussole-postgres` | Service PostgreSQL Coolify | Aucun FQDN | Privé | Volume persistant et sauvegardes |

Dans Cloudflare, les deux FQDN publics sont des CNAME **DNS only** vers `lime.1024b.net` pendant la première activation. Le proxy Coolify émet les certificats des FQDN publics via son challenge HTTP par défaut, si les ports 80 et 443 du serveur sont accessibles. Le DNS challenge Cloudflare n’est requis que dans les cas particuliers décrits dans le tutoriel complet.

## Variables essentielles

| Ressource | Variables | Portée |
|---|---|---|
| Portail | `SITE_URL`, `VITE_SITE_URL`, `VITE_PARTNER_API_URL` | Build uniquement ; valeurs HTTPS publiques sans slash final ni port. |
| API | `DATABASE_URL`, `PUBLIC_APP_URL`, `ALLOWED_ORIGIN`, secrets d’invitation et de session, compte admin, `RUN_MIGRATIONS` | Runtime uniquement ; aucune variable ne porte le préfixe `VITE_`. |
| Proxy Coolify | Aucune variable pour le parcours HTTP-01 standard ; `CF_DNS_API_TOKEN` seulement si le DNS challenge devient nécessaire. | Le token Cloudflare n’est pas requis pour deux FQDN précis en DNS only et ports 80/443 ouverts. |

## Ordre de déploiement

1. Créer les CNAME DNS only et vérifier leur résolution.
2. Vérifier les ports publics 80/443 et conserver le challenge HTTP standard du proxy Coolify.
3. Créer PostgreSQL privé avec volume, sauvegarde et test de restauration.
4. Déployer l’API avec `RUN_MIGRATIONS=true`, vérifier `/health`, puis désactiver cette variable et redéployer.
5. Rebâtir le portail avec `VITE_PARTNER_API_URL`.
6. Valider `/admin`, invitation, brouillon, consentement, soumission, CSV et suppression des données de test.
7. Décider ensuite si Deepgram, SMTP, Dreamlit ou le proxy Cloudflare orange doivent être activés.

## Garde-fous de migration

- Le target `lime.1024b.net` n’est jamais une URL affichée, une variable publique ou un FQDN de ressource Coolify : il sert uniquement de destination DNS.
- Les FQDN Coolify ne contiennent jamais `:8080` ni `:3001`.
- La base n’a aucun FQDN public et aucun secret ne se trouve dans une variable `VITE_*`.
- Toute modification est effectuée dans Git, vérifiée avec `pnpm verify`, puis redéployée depuis Coolify ; aucune modification manuelle du conteneur ne doit être conservée comme source de vérité.
- L’activation du nuage orange reste une optimisation ultérieure. Elle exige des certificats valides pour les noms publics et le mode Cloudflare **Full (strict)** ; revenir à DNS only si elle crée une erreur 526 ou 1014.

## Checklist courte

- [ ] CNAME portail et API créés vers `lime.1024b.net`, en DNS only.
- [ ] Ports 80/443 accessibles et challenge HTTP standard du proxy Coolify conservé.
- [ ] PostgreSQL privé, persistant et sauvegardé.
- [ ] API saine sur `/health` après migration.
- [ ] Portail reconstruit avec l’URL API.
- [ ] Pilote questionnaire effectué avec suppression des données de test.
- [ ] Seules les intégrations utiles au pilote sont activées.

## Références

- [Tutoriel complet Cloudflare CNAME, Coolify et questionnaire](./TUTORIEL_CLOUDFLARE_CNAME_COOLIFY_QUESTIONNAIRE_2026-08-27.md)
- [État des lieux d’activation du questionnaire](./ETAT_LIEUX_ACTIVATION_QUESTIONNAIRE_COOLIFY_2026-08-25.md)
- [Coolify — DNS Challenge avec Cloudflare](https://coolify.io/docs/knowledge-base/proxy/traefik/dns-challenge)
- [Cloudflare — Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)

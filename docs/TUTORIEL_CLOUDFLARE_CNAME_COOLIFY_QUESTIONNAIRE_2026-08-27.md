# Tutoriel — Cloudflare, CNAME et Coolify pour le questionnaire partenaire

**Version :** 27 août 2026  
**Objectif :** publier le portail, l’API du questionnaire et la console d’administration derrière Cloudflare, sans exposer d’adresse IP dans votre zone DNS et en utilisant `lime.1024b.net` comme target unique.

> **Décision recommandée pour le premier déploiement.** Créez deux **CNAME DNS only** (nuage gris) vers `lime.1024b.net`, activez le challenge DNS de Cloudflare dans le proxy Coolify, puis utilisez des certificats Let’s Encrypt sur Coolify. Cette méthode évite de dépendre du certificat actuellement présenté par `lime.1024b.net`, qui n’est pas destiné aux domaines publics de la Boussole. Elle conserve Cloudflare comme DNS autoritatif et ne requiert aucun enregistrement A dans la zone `memoways.com`.

## 1. Architecture cible

```text
Visiteur
   │ HTTPS : boussole-culture-recherche.memoways.com
   │ HTTPS : api.boussole-culture-recherche.memoways.com
   ▼
Cloudflare DNS
   │ CNAME DNS only vers lime.1024b.net
   ▼
lime.1024b.net → serveur Coolify
   ├── Proxy Coolify / Traefik : certificats Let's Encrypt via DNS challenge Cloudflare
   ├── boussole-portal : Nginx interne, port 8080
   ├── boussole-partner-api : Express interne, port 3001
   └── boussole-postgres : privé, sans domaine public
```

Les visiteurs ne doivent jamais voir `lime.1024b.net`, `:8080` ou `:3001`. Le target CNAME identifie l’origine ; les deux noms publics de la Boussole sont ceux configurés dans les FQDN Coolify et dans les variables applicatives.

## 2. Ce qui est prêt et ce qui ne l’est pas

| Élément | État au 27 août 2026 | Votre action |
|---|---|---|
| Portail React/Nginx | Prêt à être construit par son Dockerfile racine. | Créer la ressource Coolify et la rebâtir avec les variables de build. |
| API Express du questionnaire | Prête au déploiement ; endpoint `/health`, invitations, brouillons, consentement, administration et export déjà présents. | Créer une ressource API avec le Dockerfile dédié et les secrets runtime. |
| Schéma PostgreSQL | Prêt ; migrations contrôlées par `RUN_MIGRATIONS`. | Créer PostgreSQL privé et lancer une seule migration initiale. |
| Console `/admin` | Prête, mais volontairement inactive sans API configurée. | Activer l’API, rebâtir le portail, puis créer l’administrateur via les variables. |
| Réponse vocale Deepgram | Optionnelle. | Décider après le pilote et ajouter la clé seulement si nécessaire. |
| SMTP et Dreamlit | Optionnels. | Les configurer après le flux de pilote de base. |

## 3. Préparer Cloudflare : les deux CNAME

Dans **Cloudflare → DNS → Records**, créez exactement les enregistrements suivants dans la zone `memoways.com`.

| Type | Nom | Target | Proxy status | TTL | Rôle |
|---|---|---|---|---|---|
| `CNAME` | `boussole-culture-recherche` | `lime.1024b.net` | **DNS only** | Auto | Portail public. |
| `CNAME` | `api.boussole-culture-recherche` | `lime.1024b.net` | **DNS only** | Auto | API du questionnaire. |

Les CNAME de sous-domaines sont compatibles avec cette configuration. N’ajoutez pas d’enregistrement A pour ces deux noms et ne publiez pas d’AAAA pour eux. Les CNAME en mode DNS only permettent aux clients d’atteindre directement l’origine Coolify tout en laissant Cloudflare gérer votre zone DNS.

### Vérification DNS avant Coolify

Attendez que les deux noms soient résolus. Depuis un terminal, les commandes suivantes doivent aboutir à la même destination que `lime.1024b.net` :

```bash
getent ahostsv4 boussole-culture-recherche.memoways.com
getent ahostsv4 api.boussole-culture-recherche.memoways.com
```

Ne testez pas encore HTTPS : les certificats des deux noms publics seront demandés par le proxy Coolify aux étapes suivantes.

## 4. Permettre à Coolify d’émettre les certificats par DNS challenge

Le proxy Coolify peut demander les certificats Let’s Encrypt lui-même. Comme les noms publics reposent sur des CNAME et que vous utilisez Cloudflare, utilisez le **DNS challenge** plutôt que le HTTP challenge. Coolify créera temporairement les TXT `_acme-challenge` requis dans Cloudflare.[1]

### 4.1 Créer un jeton Cloudflare limité

Dans **Cloudflare → My Profile → API Tokens → Create Token**, créez un jeton intitulé, par exemple, `coolify-acme-memoways` avec :

| Élément | Valeur |
|---|---|
| Permission | `Zone` → `DNS` → `Edit` |
| Zone resources | `Include` → `Specific zone` → `memoways.com` |
| Autres permissions | Aucune |
| Durée | Sans expiration uniquement si vous avez une procédure de rotation ; sinon, documenter la date de renouvellement. |

Copiez ce jeton dans votre gestionnaire de mots de passe. Il permet de modifier les enregistrements DNS de la zone sélectionnée : **ne le placez ni dans Git, ni dans les variables de build du portail, ni dans les variables de l’API.**

### 4.2 Configurer le proxy Coolify

Dans **Coolify → Servers → [votre serveur] → Proxy**, conservez votre proxy actuel et ajoutez le secret `CF_DNS_API_TOKEN` au service proxy. Dans la configuration Traefik, utilisez le résolveur Let’s Encrypt avec :

```text
--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare
--certificatesresolvers.letsencrypt.acme.dnschallenge.delaybeforecheck=30
```

Conservez également le stockage ACME déjà configuré dans Coolify. Redémarrez le proxy après enregistrement. La documentation Coolify contient l’exemple complet de proxy Traefik pour Cloudflare.[1]

> **Point important.** Si vous utilisez une délégation CNAME pour les challenges ACME et que le renouvellement échoue, Coolify indique l’option `LEGO_DISABLE_CNAME_SUPPORT=true`. **Ne l’ajoutez pas par défaut** : commencez avec la configuration standard et appliquez-la seulement si le journal ACME montre précisément un échec de suivi de CNAME.[1]

## 5. Créer les trois ressources dans Coolify

Créez les ressources dans cet ordre, dans le même projet Coolify et le même environnement de production.

### 5.1 PostgreSQL privé : `boussole-postgres`

1. Créez un service PostgreSQL maintenu par Coolify.
2. Activez un volume persistant, sans FQDN et sans port publié sur Internet.
3. Conservez la chaîne de connexion **interne** fournie par Coolify ; elle deviendra `DATABASE_URL` de l’API.
4. Configurez une sauvegarde et testez une restauration sur une base ou un environnement isolé avant la première vraie invitation.

La base reste une dépendance privée. Elle n’a ni domaine public, ni variable `VITE_*`, ni accès navigateur.

### 5.2 API : `boussole-partner-api`

1. Créez une nouvelle application depuis le dépôt Git.
2. Choisissez le build pack **Dockerfile** et le chemin :

   ```text
   services/partner-feedback-api/Dockerfile
   ```

3. Définissez le port interne de l’application sur `3001`.
4. Dans **Domains / FQDN**, indiquez seulement :

   ```text
   https://api.boussole-culture-recherche.memoways.com
   ```

5. N’indiquez ni `lime.1024b.net`, ni `:3001` dans le FQDN.
6. Ajoutez ces variables **Runtime** :

| Variable | Valeur | Nature |
|---|---|---|
| `DATABASE_URL` | Chaîne interne de `boussole-postgres` | Secret requis |
| `PUBLIC_APP_URL` | `https://boussole-culture-recherche.memoways.com` | Requise |
| `ALLOWED_ORIGIN` | `https://boussole-culture-recherche.memoways.com` | Requise |
| `INVITATION_TOKEN_PEPPER` | Secret aléatoire de 32 caractères ou plus | Secret requis |
| `ADMIN_SESSION_SECRET` | Secret aléatoire différent de 32 caractères ou plus | Secret requis |
| `ADMIN_EMAIL` | `ulrich.fischer@memoways.com` | Requise |
| `ADMIN_PASSWORD` | Mot de passe unique de 16 caractères ou plus, géré dans votre coffre-fort | Secret requis |
| `RUN_MIGRATIONS` | `true` au premier déploiement seulement | Temporaire |
| `DEEPGRAM_API_KEY` | Clé Deepgram | Optionnelle |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM` | Paramètres transactionnels | Optionnels |

7. Déployez. Dès que l’API est saine, ouvrez :

   ```text
   https://api.boussole-culture-recherche.memoways.com/health
   ```

   La réponse attendue est exactement :

   ```json
   {"status":"ok"}
   ```

8. Une fois la migration réussie, retirez `RUN_MIGRATIONS` ou définissez-la à `false`, puis faites un nouveau déploiement.

### 5.3 Portail : `boussole-portal`

1. Créez une application depuis le même dépôt, avec le build pack **Dockerfile** et le chemin `Dockerfile` à la racine.
2. Définissez le port interne sur `8080`.
3. Dans le FQDN, indiquez seulement :

   ```text
   https://boussole-culture-recherche.memoways.com
   ```

4. Ajoutez ces variables **de build** publiques :

| Variable | Valeur |
|---|---|
| `SITE_URL` | `https://boussole-culture-recherche.memoways.com` |
| `VITE_SITE_URL` | `https://boussole-culture-recherche.memoways.com` |
| `VITE_PARTNER_API_URL` | `https://api.boussole-culture-recherche.memoways.com` |

5. Lancez un **nouveau build complet** du portail. Les variables `VITE_*` sont intégrées au JavaScript à la compilation ; un simple redémarrage ne suffit pas.

## 6. Premier test complet du questionnaire

Effectuez ces tests dans cet ordre. Utilisez des données de test et supprimez-les après la validation.

1. Ouvrez `https://boussole-culture-recherche.memoways.com/admin`.
2. Connectez-vous avec `ADMIN_EMAIL` et `ADMIN_PASSWORD`.
3. Créez une organisation de test, puis un contact de test et une invitation personnelle.
4. Ouvrez le lien d’invitation dans une fenêtre privée.
5. Enregistrez un brouillon, vérifiez le consentement, soumettez la réponse et contrôlez que l’invitation ne peut plus être réutilisée.
6. Vérifiez la réponse, l’export CSV, la révocation d’invitation et la manifestation d’intérêt dans `/admin`.
7. Contrôlez que la soumission a créé une seule ligne de récapitulatif dans la boîte Dreamlit de l’administration.
8. Supprimez les données de test.

## 7. Utiliser éventuellement le proxy Cloudflare (nuage orange)

La configuration initiale en DNS only est la plus prévisible avec un origin CNAME et des certificats Coolify. Si vous souhaitez ensuite activer le WAF, les protections et l’analytics HTTP de Cloudflare, vous pouvez tester le nuage orange **après** avoir validé les deux URLs en DNS only.

Avant ce changement :

1. Dans **Cloudflare → SSL/TLS → Overview**, sélectionnez **Full (strict)**. Ce mode exige un certificat d’origine non expiré qui correspond au FQDN demandé.[2]
2. Vérifiez que Coolify a bien émis un certificat contenant chacun des deux noms publics.
3. Passez **un seul** CNAME en Proxied, testez le portail puis l’API, et seulement ensuite passez le second.
4. Si une erreur 526 ou 1014 apparaît, revenez immédiatement à DNS only et vérifiez les journaux du proxy Coolify. N’utilisez jamais le mode SSL/TLS Flexible.

Cloudflare peut proxifier les enregistrements A, AAAA et CNAME qui servent le trafic HTTP/HTTPS ; l’origine verra alors les IP Cloudflare et non celles des visiteurs.[3] Pour ce projet, la limitation locale de tentatives ne doit donc pas être considérée comme un contrôle anti-abus exhaustif une fois le proxy activé ; ajoutez une règle WAF/Rate Limiting Cloudflare pour les routes de l’API si le pilote devient public.

## 8. Deepgram, SMTP et Dreamlit : après le pilote de base

| Fonction | À activer quand | Action |
|---|---|---|
| Deepgram | Lorsque vous voulez tester une réponse ouverte à la voix. | Ajouter `DEEPGRAM_API_KEY` uniquement à l’API, tester la transcription française, la correction écrite et la suppression de l’audio après transcription. |
| SMTP | Lorsque les invitations ne seront plus envoyées manuellement. | Choisir un service transactionnel et ajouter les cinq variables SMTP à l’API. |
| Dreamlit | Lorsque l’e-mail récapitulatif doit partir automatiquement. | Créer l’utilisateur PostgreSQL minimal, activer SSL, connecter uniquement la table `notifications.partner_response_recap_outbox`, publier le workflow et tester une régénération depuis `/admin`. |

## 9. Diagnostic des incidents les plus probables

| Symptôme | Cause probable | Action |
|---|---|---|
| `ERR_NAME_NOT_RESOLVED` sur l’API | CNAME absent, mal orthographié ou non propagé. | Vérifier les deux enregistrements Cloudflare et attendre la propagation. |
| Avertissement de certificat sur le domaine public | Certificat Coolify non émis ou DNS challenge non configuré. | Vérifier `CF_DNS_API_TOKEN`, les logs ACME du proxy et que le FQDN est exact. |
| `503` sur `lime.1024b.net` | Aucun routeur Coolify ne correspond à ce hostname générique. | Attendu tant que `lime.1024b.net` n’est pas un FQDN d’application ; tester uniquement les FQDN publics de la Boussole. |
| `526` après activation du nuage orange | Cloudflare Full (strict) ne valide pas le certificat origine. | Revenir à DNS only, corriger le certificat Coolify pour le domaine public, puis retester. |
| `1014 CNAME Cross-User Banned` après activation du nuage orange | La chaîne CNAME traverse deux comptes Cloudflare incompatibles. | Revenir à DNS only. Ne réactiver le proxy qu’après vérification que la chaîne est compatible ou après adoption d’un Cloudflare Tunnel. |
| `/admin` affiche l’état d’activation | Portail construit sans `VITE_PARTNER_API_URL` ou API indisponible. | Vérifier `/health`, corriger la variable de build et reconstruire le portail. |
| Erreur CORS du questionnaire | Origine publique non identique à `ALLOWED_ORIGIN`. | Comparer exactement les URLs HTTPS, sans slash final et sans port interne. |

## 10. Checklist de clôture

- [ ] Deux CNAME DNS only vers `lime.1024b.net` sont créés et résolus.
- [ ] Le proxy Coolify utilise un jeton Cloudflare DNS limité et le DNS challenge.
- [ ] `boussole-postgres` est privé, persistant, sauvegardé et son test de restauration est documenté.
- [ ] L’API tourne au port interne `3001`, `/health` répond `{"status":"ok"}`, et `RUN_MIGRATIONS` n’est plus actif après initialisation.
- [ ] Le portail est rebâti avec `SITE_URL`, `VITE_SITE_URL` et `VITE_PARTNER_API_URL`.
- [ ] `/admin` affiche la connexion ; le cycle invitation → brouillon → consentement → soumission → CSV est vérifié puis les données de test supprimées.
- [ ] Toute URL publique utilise HTTPS sans `:8080`, `:3001` ni `lime.1024b.net`.
- [ ] Deepgram, SMTP et Dreamlit ne sont activés que lorsqu’ils ont une finalité validée et testée.

## Références

[1] [Coolify — DNS Challenge avec Cloudflare](https://coolify.io/docs/knowledge-base/proxy/traefik/dns-challenge)

[2] [Cloudflare — Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/)

[3] [Cloudflare — Proxy status](https://developers.cloudflare.com/dns/proxy-status/)

[4] [Cloudflare — Cas d’usage du proxy DNS](https://developers.cloudflare.com/dns/proxy-status/use-cases/)

[5] [Coolify — Domains](https://coolify.io/docs/knowledge-base/domains)

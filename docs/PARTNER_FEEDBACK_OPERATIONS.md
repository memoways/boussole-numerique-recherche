# Tutoriel Coolify — présentation, questionnaire et administration partenaire

## 1. Ce qui est déployé

Le portail Boussole Numérique Culture reste une application statique React servie par Nginx. Le questionnaire partenaire et son administration reposent sur un second service Node.js/Express, relié à une base PostgreSQL privée. La présentation à `/partenaires/presentation` reste publique ; le questionnaire utilise des invitations individuelles ; l’administration est accessible directement à l’adresse publique du portail suivie de `/admin`.

| Ressource Coolify | Nom suggéré | Domaine | Exposition |
|---|---|---|---|
| Portail React/Nginx | `boussole-portal` | `https://boussole-culture-recherche.memoways.com` | Public HTTPS |
| API questionnaire | `boussole-partner-api` | `https://api.boussole-culture-recherche.memoways.com` | Public HTTPS, CORS limité au portail |
| PostgreSQL | `boussole-postgres` | Aucun | Privé pour l’API ; port TCP public chiffré requis uniquement par Dreamlit |

Le sous-domaine API est recommandé car il partage le même site `memoways.com` que le portail. Les cookies de session administrateur restent alors envoyés à l’API lors des requêtes `credentials: include`, sans être lisibles par le JavaScript du portail. L’API ne doit pas être listée dans la navigation publique.

> Les applications Coolify sont déployées dans des conteneurs Docker et peuvent être configurées à partir d’un Dockerfile du dépôt.[4]

## 2. Préparer le DNS et les domaines

Dans le fournisseur DNS, vérifiez que le domaine du portail pointe vers l’adresse IPv4 du serveur Coolify et qu’il n’existe pas d’enregistrement AAAA non fonctionnel. Ajoutez ensuite un enregistrement pour `api.boussole-culture-recherche.memoways.com` vers le même serveur. Utilisez le mode DNS direct si un proxy externe empêche l’émission du certificat.

Dans Coolify, saisissez les domaines avec le préfixe `https://`. Coolify configure alors son proxy et demande le certificat TLS ; il renouvelle ensuite ce certificat automatiquement.[3] Ne configurez aucun domaine sur la ressource PostgreSQL : la documentation Coolify indique que les bases de données ne prennent pas en charge la configuration de domaine.[3]

## 3. Créer PostgreSQL privé

Créez une nouvelle ressource **PostgreSQL** dans le même projet et le même environnement Coolify que l’API. Choisissez une version PostgreSQL maintenue et donnez un nom explicite à la base, à l’utilisateur et au volume persistant. L’API utilise la chaîne interne ; ne configurez aucun domaine sur cette ressource.

Une fois la base démarrée, copiez la chaîne de connexion **interne** fournie par Coolify. Elle servira uniquement à `DATABASE_URL` dans la ressource API. Ne copiez jamais cette valeur dans le portail, un dépôt Git, un document partagé ou une variable commençant par `VITE_`.

| Contrôle PostgreSQL | Résultat attendu |
|---|---|
| Volume persistant | Les données survivent à un redéploiement de l’API et à un redémarrage de la base. |
| Réseau | L’API joint la base par réseau privé. Le port public nécessaire à Dreamlit est chiffré, limité par pare-feu lorsque le serveur le permet et n’est pas utilisé par le portail. |
| Sauvegarde | Une sauvegarde est planifiée avant l’ouverture du pilote. |
| Restauration | Une restauration est testée dans un environnement non public avant la première collecte. |

Coolify permet d’importer une sauvegarde dans PostgreSQL depuis la configuration de l’instance ; sa documentation décrit notamment l’usage de `pg_dump` en format personnalisé pour ce flux.[1]

## 4. Créer l’API partenaire

Dans Coolify, créez une nouvelle **Application** depuis le dépôt GitHub connecté. Sélectionnez un déploiement basé sur Dockerfile, conservez la racine du dépôt comme contexte de build et définissez le chemin Dockerfile suivant :

```text
services/partner-feedback-api/Dockerfile
```

Exposez le port `3001` et attribuez le domaine `https://api.boussole-culture-recherche.memoways.com`. Activez le HTTPS forcé. Le conteneur reçoit une sonde simple ; après déploiement, l’URL suivante doit répondre avec `{"status":"ok"}` :

```text
https://api.boussole-culture-recherche.memoways.com/health
```

La réponse de santé vérifie également la disponibilité de PostgreSQL. Si elle échoue, contrôlez d’abord `DATABASE_URL`, le réseau privé de la base et les journaux de l’application.

## 5. Définir les variables de l’API

Dans la ressource `boussole-partner-api`, ouvrez **Environment Variables**. Utilisez la vue normale pour ajouter les secrets un par un et verrouillez les valeurs sensibles. Les variables d’exécution sont disponibles dans le conteneur au démarrage ; les valeurs utilisées seulement à l’exécution ne doivent pas être définies comme variables de build.[2]

| Variable | Valeur ou format | Secret | Moment | Rôle |
|---|---|---:|---|---|
| `DATABASE_URL` | Chaîne interne fournie par PostgreSQL Coolify | Oui | Runtime | Connexion privée à la base. |
| `PUBLIC_APP_URL` | `https://boussole-culture-recherche.memoways.com` | Non | Runtime | Génère les liens personnels du questionnaire. |
| `ALLOWED_ORIGIN` | `https://boussole-culture-recherche.memoways.com` | Non | Runtime | Origine unique autorisée par CORS. |
| `INVITATION_TOKEN_PEPPER` | Secret aléatoire de 32 caractères minimum | Oui | Runtime | Hache les jetons d’invitation avant stockage. |
| `ADMIN_SESSION_SECRET` | Secret aléatoire de 32 caractères minimum | Oui | Runtime | Signe les sessions d’administration. |
| `ADMIN_EMAIL` | `ulrich.fischer@memoways.com` | Non | Runtime | Identifiant du premier administrateur. |
| `ADMIN_PASSWORD` | Mot de passe unique de 16 caractères ou plus | Oui | Runtime | Mot de passe de connexion à `/admin`. |
| `RUN_MIGRATIONS` | `true` uniquement à la première initialisation | Non | Runtime | Crée le schéma et la version initiale du questionnaire. |
| `DEEPGRAM_API_KEY` | Clé Deepgram | Oui | Runtime | Active les transcriptions vocales. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM` | Selon le prestataire choisi | Partiellement | Runtime | Reste facultatif pour les invitations personnelles pendant la transition. Les récapitulatifs de réponses sont préparés pour Dreamlit. |

Coolify permet de marquer distinctement une variable comme disponible au build ou au runtime ; les deux options sont activées par défaut.[2] Pour toutes les variables de l’API, désactivez **Build Variable** et laissez **Runtime Variable** activé. Si un mot de passe contient le caractère `$`, activez l’option **Literal** afin que Coolify ne tente pas d’interpoler la valeur.[2]

Pour obtenir les deux secrets aléatoires, utilisez directement le générateur de secrets de Coolify ou un gestionnaire de mots de passe. Ne les transmettez pas dans un message, un ticket ou un fichier de projet.

## 6. Première initialisation, puis verrouillage

Déployez l’API avec `RUN_MIGRATIONS=true`. L’API exécute une initialisation idempotente : elle crée les tables si nécessaire et inscrit la version publiée du questionnaire sans dupliquer les données existantes. Attendez la réponse positive de `/health` avant de continuer.

Ensuite, retirez `RUN_MIGRATIONS` ou définissez-le à `false`, puis redéployez l’API. Toute évolution future du schéma doit être préparée, sauvegardée, testée et documentée avant que cette variable ne soit de nouveau utilisée.

## 7. Déployer le portail avec l’URL de l’API

Dans la ressource Coolify du portail, conservez le Dockerfile de la racine du dépôt. Le Dockerfile accepte deux variables publiques au build :

| Variable | Valeur | Type Coolify | Pourquoi |
|---|---|---|---|
| `SITE_URL` | `https://boussole-culture-recherche.memoways.com` | Build | Génère les métadonnées, URL canoniques et sitemap. |
| `VITE_PARTNER_API_URL` | `https://api.boussole-culture-recherche.memoways.com` | Build | Intègre l’URL publique de l’API dans le JavaScript du portail. |

`VITE_PARTNER_API_URL` est volontairement publique. Elle ne doit contenir ni clé, ni mot de passe, ni jeton. Après modification d’une variable Vite, rebâtissez le portail : elle est intégrée à la compilation et ne peut pas être modifiée par un simple redémarrage du conteneur.

## 8. Première connexion à `/admin`

Ouvrez l’URL suivante depuis un navigateur de confiance :

```text
https://boussole-culture-recherche.memoways.com/admin
```

Saisissez l’adresse `ulrich.fischer@memoways.com` et le mot de passe configuré dans `ADMIN_PASSWORD`. Une connexion réussie crée un cookie `httpOnly`, `Secure`, limité au chemin `/api/admin` et valable huit heures. Le navigateur envoie ce cookie à l’API, mais le JavaScript du portail ne peut pas le lire.

| Test de contrôle | Résultat attendu |
|---|---|
| URL `/admin` sans session | Formulaire de connexion. |
| Mauvais mot de passe | Message générique, sans précision sur l’identifiant. |
| Huit tentatives sur quinze minutes | Réponse temporairement limitée. |
| Connexion correcte | Tableau de gestion des organisations, contacts, invitations, réponses et export CSV. |
| Déconnexion | Cookie supprimé et retour au formulaire. |
| Redémarrage de l’API | Les sessions signées existantes restent valides tant que `ADMIN_SESSION_SECRET` ne change pas et que leur durée n’est pas écoulée. |

Pour changer le mot de passe, modifiez uniquement `ADMIN_PASSWORD` dans Coolify, redéployez l’API et reconnectez-vous. Pour invalider immédiatement toutes les sessions administrateur, remplacez aussi `ADMIN_SESSION_SECRET`, puis redéployez l’API.

## 9. Activer Dreamlit pour les récapitulatifs

L’API crée, dans la même transaction que la soumission, une ligne dans `notifications.partner_response_recap_outbox`. Cette ligne ne contient que le destinataire, son prénom, le nom de l’organisation, l’objet et un récapitulatif déterministe déjà préparé. Dreamlit ne reçoit ni les tables `partner_response_answers` ni les jetons d’invitation.

Dans Coolify, activez SSL sur PostgreSQL. Un client externe tel que Dreamlit ne peut pas monter le certificat d’autorité interne de Coolify ; utilisez donc le niveau `require` afin de chiffrer le transport, puis vérifiez avec Dreamlit sa compatibilité avec un certificat interne avant de renforcer le contrôle de certificat. Coolify distingue les ports mappés et les ports publics : le second crée un proxy TCP pour une connexion externe.[5] [6]

Créez un **port public** pour PostgreSQL et protégez-le au niveau du pare-feu du serveur avec les plages publiées par Dreamlit si cette option est disponible dans votre infrastructure. Ne le publiez pas par un domaine web. Copiez dans Dreamlit l’hôte public, le port, le nom de base, le nom d’utilisateur dédié et son mot de passe ; ne placez aucun de ces éléments dans les variables de l’API ou dans le dépôt.

Créez ensuite l’utilisateur Dreamlit avec les privilèges minimaux suivants, en exécutant le SQL avec l’utilisateur propriétaire de la base. Remplacez les valeurs entre chevrons par celles de votre environnement, sans conserver le mot de passe dans un fichier :

```sql
CREATE ROLE dreamlit_app LOGIN PASSWORD '<mot-de-passe-unique>' INHERIT;
GRANT CONNECT, CREATE, TEMP ON DATABASE <nom_base> TO dreamlit_app;
GRANT USAGE ON SCHEMA notifications TO dreamlit_app;
GRANT SELECT, TRIGGER ON ALL TABLES IN SCHEMA notifications TO dreamlit_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA notifications TO dreamlit_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA notifications
  GRANT SELECT, TRIGGER ON TABLES TO dreamlit_app;
ALTER DEFAULT PRIVILEGES IN SCHEMA notifications
  GRANT USAGE, SELECT ON SEQUENCES TO dreamlit_app;
```

Dans Dreamlit, connectez cette base puis créez le workflow suivant :

| Étape | Réglage |
|---|---|
| Déclencheur | Insertion dans `notifications.partner_response_recap_outbox`. |
| Données | Utiliser directement les champs de la ligne déclenchante ; aucune requête sur les réponses brutes n’est nécessaire. |
| Destinataire | `{{ recipient_email }}`. |
| Objet | `{{ subject }}`. |
| Contenu | Salutation avec `{{ recipient_name }}`, nom de l’organisation et `{{ summary_text }}` ; ajouter l’adresse de contact de l’équipe de projet. |
| Désabonnement | Désactivé : il s’agit d’un accusé de réception transactionnel lié à une soumission. |
| Expéditeur | Domaine d’envoi vérifié dans Dreamlit, idéalement un sous-domaine dédié tel que `mail.memoways.com`. |

Prévisualisez le workflow avec une ligne réelle de test, envoyez l’e-mail à l’adresse de test, puis publiez seulement après validation du rendu et du destinataire. Dreamlit déclenche ses workflows sur les lignes ajoutées ou mises à jour et peut personnaliser l’envoi au moyen de variables Liquid.[7] [8]

## 10. Activer Deepgram et SMTP après le contrôle de base

Sans `DEEPGRAM_API_KEY`, les questions ouvertes restent disponibles à l’écrit. Lorsqu’elle est configurée, l’audio est transmis temporairement à l’API puis à Deepgram ; le fichier audio n’est pas écrit dans PostgreSQL et seule la transcription corrigée est enregistrée. Testez la lecture, la correction et la soumission avant d’inviter un partenaire.

Sans SMTP, l’administration génère toujours les liens personnels et les copie dans le presse-papiers. Configurez SMTP seulement après avoir choisi un prestataire compatible avec la politique d’envoi de l’équipe de projet. Dreamlit prend en charge les récapitulatifs de réponses ; l’envoi des invitations peut rester temporairement sur SMTP ou être transféré ultérieurement dans une seconde boîte d’envoi dédiée.

## 11. Contrôle pilote et exploitation régulière

Avant toute invitation réelle, créez une organisation de test et un contact de test. Générez un lien, enregistrez un brouillon, testez une transcription si elle est active, soumettez une réponse, vérifiez dans PostgreSQL qu’une seule ligne est créée dans `notifications.partner_response_recap_outbox`, prévisualisez puis recevez l’e-mail Dreamlit, exportez le CSV et révoquez l’invitation. Supprimez ensuite les données de test selon la procédure de l’équipe.

L’export CSV contient des données nominatives. Téléchargez-le seulement depuis un poste de confiance, conservez-le dans un espace de travail protégé et produisez tout partage collectif à partir de données anonymisées. Réalisez une sauvegarde PostgreSQL avant toute modification de structure et vérifiez périodiquement qu’une restauration est possible.

## Références

[1] [Coolify — PostgreSQL](https://coolify.io/docs/databases/postgresql)

[2] [Coolify — Variables d’environnement](https://coolify.io/docs/knowledge-base/environment-variables)

[3] [Coolify — Domaines](https://coolify.io/docs/knowledge-base/domains)

[4] [Coolify — Applications](https://coolify.io/docs/applications)

[5] [Coolify — Bases de données](https://coolify.io/docs/databases)

[6] [Coolify — SSL de base de données](https://coolify.io/docs/databases/ssl)

[7] [Dreamlit — Déclencheur PostgreSQL](https://notikaai.mintlify.app/docs/steps/database-trigger.md)

[8] [Dreamlit — Étape d’envoi d’e-mail](https://notikaai.mintlify.app/docs/steps/send-email.md)

# État des lieux — Activation Coolify du questionnaire partenaire

**Date de contrôle :** 25 août 2026  
**Statut global :** le module est développé, contrôlé au build et prêt à être déployé ; il n’est **pas encore activé en production**.

## Résumé opérationnel

Le portail public est autonome et peut être servi par Nginx. Le questionnaire, la console `/admin`, les invitations individuelles, les brouillons, la soumission, l’export CSV, la révocation et la boîte de récapitulatifs sont déjà implémentés dans une API Express distincte. Leur activation dépend maintenant de trois ressources Coolify — portail, API et PostgreSQL — ainsi que de la configuration de secrets et des tests de pilote.

L’URL envisagée `https://api.boussole-culture-recherche.memoways.com/health` ne résolvait pas au moment du contrôle. Cette absence de DNS confirme qu’aucune API publique opérationnelle ne peut encore recevoir de réponses. Tant que `VITE_PARTNER_API_URL` n’est pas injectée au build du portail et que l’API/PostgreSQL ne sont pas déployés, `/admin` présente volontairement l’état d’activation plutôt que le formulaire de connexion.

## État détaillé du développement

| Élément | État | Ce qui est déjà disponible | Ce qui manque pour le pilote |
|---|---|---|---|
| Portail public | Prêt | Pages partenaire, questionnaire, manifestation d’intérêt et fallback honnête vers `mailto:` tant que l’API est absente. | Déployer/rebâtir avec l’URL publique de l’API. |
| API partenaire | Prête au déploiement | Dockerfile dédié, endpoint `/health`, CORS à origine unique, Helmet, limitation de tentatives, JWT admin `httpOnly`, invitations hashées. | Ressource Coolify, secrets runtime, domaine API et première migration. |
| PostgreSQL | Schéma prêt | Tables d’organisations, contacts, invitations, réponses, brouillons, événements, intérêts publics et boîte Dreamlit. | Ressource privée persistante, sauvegarde et test de restauration. |
| Questionnaire | Prêt au pilote | Invitation individuelle, sauvegarde de brouillon, consentement, réponses ouvertes/choix, soumission unique et fin d’invitation. | Créer des organisations et invitations de test via `/admin`. |
| Console `/admin` | Prête | Connexion, organisations, contacts, invitations, export CSV, intérêts publics, boîte d’envoi et régénération de récapitulatif. | Définir `ADMIN_PASSWORD`, se connecter puis tester le flux réel. |
| Réponse vocale | Option prête | Transcription serveur Deepgram ; le fichier audio n’est pas stocké, seule la transcription corrigée l’est. | Obtenir/configurer `DEEPGRAM_API_KEY` et tester avec un enregistrement réel. |
| Invitations e-mail | Option prête | SMTP facultatif ; sans SMTP, l’admin copie les liens personnels. | Choisir/configurer un prestataire SMTP si les liens ne sont pas envoyés manuellement. |
| Récapitulatif Dreamlit | Préparé | La soumission crée une ligne déterministe dans `notifications.partner_response_recap_outbox`. | Exposer PostgreSQL de manière contrôlée, créer l’utilisateur minimal, connecter et publier le workflow Dreamlit. |

## Ordre recommandé des tâches côté Coolify

### 1. Corriger les domaines avant tout déploiement

- Vérifier que `boussole-culture-recherche.memoways.com` pointe directement sur l’IPv4 du serveur Coolify ; retirer tout AAAA défaillant et ne pas conserver de CNAME incompatible avec l’hébergement cible.
- Créer un enregistrement `A` pour `api.boussole-culture-recherche.memoways.com` vers la même IPv4.
- Dans Coolify, déclarer uniquement des FQDN HTTPS sans `:8080` ni `:3001` : le proxy Coolify joint les ports internes.
- Attendre la résolution DNS et la délivrance des certificats TLS avant d’essayer les endpoints publics.

### 2. Créer PostgreSQL privé

Dans le même projet et environnement Coolify que l’API, créer `boussole-postgres` avec une version PostgreSQL maintenue et un **volume persistant**. Ne définir aucun domaine web pour cette ressource. Copier uniquement la chaîne interne fournie par Coolify ; elle sera la valeur de `DATABASE_URL` dans l’API.

Avant le pilote, configurer une sauvegarde et réaliser une restauration sur un environnement non public. La base doit rester privée ; aucun navigateur et aucun code frontend ne doit disposer de son URL ou de ses identifiants.

### 3. Créer et initialiser l’API du questionnaire

Créer une application `boussole-partner-api` depuis le dépôt Git, avec le build Dockerfile suivant :

```text
services/partner-feedback-api/Dockerfile
```

Définir le port interne `3001`, le domaine `https://api.boussole-culture-recherche.memoways.com` et le HTTPS forcé. Ajouter les variables suivantes comme **variables Runtime uniquement** : désactiver l’option Build Variable pour elles.

| Variable | Valeur attendue | Statut |
|---|---|---|
| `DATABASE_URL` | Chaîne interne PostgreSQL Coolify | Requise, secrète |
| `PUBLIC_APP_URL` | `https://boussole-culture-recherche.memoways.com` | Requise |
| `ALLOWED_ORIGIN` | `https://boussole-culture-recherche.memoways.com` | Requise |
| `INVITATION_TOKEN_PEPPER` | Secret aléatoire d’au moins 32 caractères | Requise, secrète |
| `ADMIN_SESSION_SECRET` | Secret aléatoire d’au moins 32 caractères | Requise, secrète |
| `ADMIN_EMAIL` | `ulrich.fischer@memoways.com` | Requise |
| `ADMIN_PASSWORD` | Mot de passe unique d’au moins 16 caractères, dans le gestionnaire de mots de passe | Requise, secrète |
| `RUN_MIGRATIONS` | `true`, uniquement pour le premier déploiement | Requise une fois |
| `DEEPGRAM_API_KEY` | Clé Deepgram | Optionnelle |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM` | Selon le prestataire d’envoi | Optionnelles |

Déployer une première fois avec `RUN_MIGRATIONS=true`. Vérifier ensuite `https://api.boussole-culture-recherche.memoways.com/health` : la réponse attendue est `{"status":"ok"}`. Enfin, retirer `RUN_MIGRATIONS` ou le passer à `false`, puis redéployer. Cette dernière étape évite que l’initialisation ne reste active sans nécessité.

### 4. Rebâtir le portail avec l’API activée

Dans `boussole-portal`, conserver le Dockerfile racine et ajouter les variables de **build** suivantes :

| Variable | Valeur |
|---|---|
| `SITE_URL` | `https://boussole-culture-recherche.memoways.com` |
| `VITE_SITE_URL` | `https://boussole-culture-recherche.memoways.com` |
| `VITE_PARTNER_API_URL` | `https://api.boussole-culture-recherche.memoways.com` |

Lancer un **nouveau build** du portail, et non un simple redémarrage : les variables `VITE_*` sont intégrées au JavaScript lors de la compilation. Ne mettre aucun secret dans une variable `VITE_*`.

### 5. Vérifier la console et le flux de pilote

1. Ouvrir `https://boussole-culture-recherche.memoways.com/admin` et se connecter avec l’adresse administrateur configurée.
2. Créer une organisation et un contact de test, puis une invitation personnelle.
3. Ouvrir le lien, enregistrer un brouillon, donner le consentement et soumettre une réponse.
4. Vérifier la réponse dans `/admin`, exporter le CSV et révoquer une invitation de test.
5. Supprimer les données de test après validation, conformément à votre procédure de traitement des données.

## Fonctions optionnelles à activer après le pilote de base

| Fonction | Décision à prendre | Action de finalisation |
|---|---|---|
| Deepgram | Activer la réponse vocale dès le pilote ou plus tard ? | Ajouter `DEEPGRAM_API_KEY`, tester en français la transcription, la correction manuelle et la soumission. Sans clé, les réponses écrites fonctionnent. |
| SMTP | Envoyer les invitations automatiquement ou copier les liens depuis l’admin ? | Choisir le prestataire puis ajouter les cinq variables SMTP. Dreamlit ne remplace pas encore cet envoi d’invitations. |
| Dreamlit | Envoyer un récapitulatif transactionnel à chaque réponse ? | Activer SSL PostgreSQL, ouvrir un port TCP public strictement protégé, créer l’utilisateur `dreamlit_app` aux droits minimaux documentés, connecter la table outbox et publier le workflow. |

## Checklist de clôture avant vraies invitations

- [ ] DNS du portail et du sous-domaine API résolus, TLS valide et aucune URL publique avec un port interne.
- [ ] PostgreSQL privé, volume persistant, sauvegarde planifiée et restauration testée.
- [ ] API déployée, `/health` vert et migrations désactivées après l’initialisation.
- [ ] Portail rebâti avec `VITE_PARTNER_API_URL` ; `/admin` affiche la connexion plutôt que l’état d’activation.
- [ ] Connexion administrateur, invitation, brouillon, consentement, soumission, export CSV et révocation testés avec des données supprimées ensuite.
- [ ] Décision prise sur Deepgram et SMTP ; les clés optionnelles sont testées si activées.
- [ ] Workflow Dreamlit publié et testé avec une seule ligne de boîte d’envoi, puis régénération depuis `/admin` si ce récapitulatif est activé.
- [ ] Règles internes établies pour l’accès à `/admin`, les exports CSV, les sauvegardes et la suppression des données de test.

## Sources internes

- [Tutoriel Coolify — présentation, questionnaire et administration partenaire](./PARTNER_FEEDBACK_OPERATIONS.md)
- [Configuration des environnements](../config/ENVIRONMENT.md)
- [Validation de la présentation partenaire et de l’administration](./VALIDATION_PRESENTATION_ADMIN.md)
- [API partenaire — configuration](../services/partner-feedback-api/src/config.ts)
- [API partenaire — routes et initialisation](../services/partner-feedback-api/src/index.ts)

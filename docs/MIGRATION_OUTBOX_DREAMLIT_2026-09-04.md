# Migration de l’outbox Dreamlit — 4 septembre 2026

## Objet

Ce document décrit la dernière étape avant l’activation du workflow Dreamlit : le suivi de livraison versionné de la boîte `notifications.partner_response_recap_outbox` dans la base dédiée `dreamlit_boussole`.

> La base `postgres` n’est plus la cible du module partenaire. L’API et Dreamlit doivent utiliser `dreamlit_boussole`. Les données de test de l’ancienne base ne sont pas migrées.

## Contrat d’envoi retenu

Une soumission crée une ligne d’outbox avec `send_version = 1` et `delivery_status = 'pending'`. Dreamlit pourra envoyer cette version initiale après publication du workflow.

Il n’y a **aucune relance automatique**. Depuis la console `/admin`, l’action **Nouvel envoi** régénère le récapitulatif, augmente `send_version`, remet l’état à `pending` et efface les traces de la tentative précédente. Dreamlit doit seulement réagir à cette nouvelle version. Une actualisation d’interface ou la mise à jour d’un statut ne doit jamais créer un nouvel envoi.

| Colonne | Rôle |
|---|---|
| `send_version` | Version de l’envoi autorisé ; elle augmente uniquement lors d’un renvoi administratif explicite. |
| `delivery_status` | État `pending`, `sent` ou `failed`. |
| `sent_at` | Horodatage du succès de livraison. |
| `last_attempt_at` | Horodatage de la dernière tentative. |
| `provider_message_id` | Identifiant de message retourné par Dreamlit, s’il existe. |
| `last_error` | Dernière erreur technique, sans réponse de questionnaire ni secret. |

## Déploiement de la migration

Le dépôt contient les ajouts SQL idempotents dans `services/partner-feedback-api/src/schema.sql`. Pour les appliquer dans la base dédiée :

1. Déployer l’artefact API contenant ce correctif avec `DATABASE_URL` pointant vers `dreamlit_boussole`.
2. Régler temporairement `RUN_MIGRATIONS=true` et redéployer l’API une fois.
3. Lorsque l’API est saine, remettre `RUN_MIGRATIONS=false` et redéployer une seconde fois.
4. Vérifier les colonnes avec la commande suivante dans le terminal PostgreSQL Coolify :

```sh
psql -U postgres -d dreamlit_boussole -c "
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'notifications'
  AND table_name = 'partner_response_recap_outbox'
ORDER BY ordinal_position;
"
```

## Droits Dreamlit supplémentaires

Les droits déjà validés restent limités à l’outbox. Après la migration, Dreamlit doit aussi pouvoir écrire uniquement les colonnes de suivi de livraison :

```sql
GRANT UPDATE (
  delivery_status,
  sent_at,
  last_attempt_at,
  provider_message_id,
  last_error
) ON notifications.partner_response_recap_outbox TO dreamlit_boussole;
```

Ne pas accorder `UPDATE` sur `send_version`, `summary_text`, les destinataires ni les tables de réponses. Cette séparation réserve le renvoi explicite à l’API d’administration.

## Brouillon Dreamlit attendu

Le workflow doit utiliser la base `dreamlit_boussole` et la seule table `notifications.partner_response_recap_outbox`.

Le déclencheur doit réagir :

1. à une insertion avec `delivery_status = 'pending'` ;
2. à une mise à jour où `send_version` est strictement supérieure à la version précédente et où le nouvel état est `pending`.

Après succès, Dreamlit renseigne au minimum `delivery_status = 'sent'`, `sent_at`, `last_attempt_at` et l’identifiant fournisseur disponible. Après échec, il renseigne `delivery_status = 'failed'`, `last_attempt_at` et un message technique concis dans `last_error`. Il ne relance rien automatiquement.

L’expéditeur proposé est `Boussole Numérique Culture <boussole@hello.memoways.com>` avec `ulrich.fischer@memoways.com` en `Reply-To`. L’expéditeur doit être vérifié dans Dreamlit avant tout envoi de test.

## Validations distinctes

1. Valider la migration SQL et l’API redéployée.
2. Valider la création du brouillon Dreamlit.
3. Valider séparément la publication du workflow.
4. Valider séparément un unique envoi de test à `ulrich.fischer@memoways.com`.

La publication et l’envoi de test sont des actions distinctes. Aucun e-mail ne doit être envoyé avant leur validation explicite.

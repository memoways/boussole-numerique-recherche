# Étude d’intégration — synthèse partenaire et Dreamlit

## Objet

Cette note examine comment envoyer automatiquement un e-mail récapitulatif lorsqu’une réponse partenaire passe à l’état `submitted` dans PostgreSQL. Elle ne correspond pas à une fonctionnalité active : aucune connexion Dreamlit, aucun accès externe à PostgreSQL et aucun envoi Dreamlit ne sont encore configurés.

## Ce que Dreamlit permet

Dreamlit se connecte directement à PostgreSQL, installe un déclencheur sur une table et exécute un workflow lorsque la ligne est insérée ou mise à jour. Le workflow peut enrichir la ligne d’entrée via une requête SQL, puis personnaliser un e-mail avec les données obtenues.[1] [2] [3]

Dreamlit demande une connexion au serveur PostgreSQL accessible depuis l’extérieur, avec un utilisateur dédié et des privilèges limités. Sa documentation prévoit notamment un utilisateur `dreamlit_app`, l’accès `SELECT` et `TRIGGER` sur les tables concernées, ainsi que des objets propres dans le schéma `dreamlit`.[1] Coolify permet d’exposer un port public pour une base et d’activer SSL ; pour une connexion externe, le mode SSL `verify-full` est le niveau conseillé lorsque le client peut valider le certificat.[4] [5]

> La documentation Dreamlit décrit l’IA comme un assistant de conception de workflow et de modèle e-mail. Elle ne documente pas explicitement une génération sémantique distincte, à chaque envoi, d’une synthèse qualitative d’un ensemble de réponses. Il faut donc distinguer un **récapitulatif structuré** d’une **analyse personnalisée par IA**.

## Options réalisables

| Option | Flux | Données accessibles à Dreamlit | Résultat de l’e-mail | Complexité |
|---|---|---|---|---|
| A — Accès direct aux réponses | Mise à jour de `partner_responses.status` → déclencheur Dreamlit → requête SQL sur les réponses et contacts → e-mail. | Réponses ouvertes, choix, identité et organisation. | Récapitulatif complet formaté dans l’e-mail. | Faible côté code, exposition de données plus large. |
| B — Boîte d’envoi limitée | L’API écrit une ligne préparée dans un schéma `notifications` après la soumission → Dreamlit observe seulement cette ligne → e-mail. | Destinataire, nom, organisation, récapitulatif déjà préparé, lien éventuel. | Récapitulatif structuré et contrôlé. | Modérée côté code, exposition minimisée. |
| C — Boîte d’envoi + synthèse IA | L’API prépare une synthèse par un modèle de langage approuvé, l’écrit dans la boîte d’envoi, puis Dreamlit délivre l’e-mail. | Même périmètre limité que B ; le fournisseur IA reçoit les réponses nécessaires à la synthèse. | Synthèse narrative adaptée aux réponses ouvertes. | Plus élevée ; exige un second service IA, une information de consentement et une revue qualité. |

## Option B : structure proposée

L’option B limite le périmètre de Dreamlit à un schéma dédié. L’API partenaire reste le seul composant qui lit les tables `partner_responses` et `partner_response_answers`. À la soumission, elle crée une ligne `notifications.partner_response_recap_outbox` contenant : `id`, `response_id`, `recipient_email`, `recipient_name`, `organization_name`, `subject`, `summary_markdown`, `created_at`, `sent_at` et `delivery_status`.

Dreamlit est configuré pour surveiller les insertions dans cette table. Le workflow utilise la ligne comme source, envoie l’e-mail à `recipient_email` et, après validation fonctionnelle, peut renseigner un état de livraison si cette opération est supportée par sa configuration. Le contenu de `summary_markdown` est généré de manière déterministe par l’API avec les libellés de questionnaire et les réponses fournies. Cette première version produit un récapitulatif fidèle, sans inférer de diagnostic.

Le modèle d’e-mail doit être traité comme un e-mail opérationnel : la personne vient de soumettre sa contribution et reçoit une trace de ce qu’elle a validé. L’option de désabonnement doit rester désactivée pour ce type de message transactionnel ; la documentation Dreamlit réserve ce mécanisme aux contenus auxquels la personne peut renoncer.[3]

## Préconditions techniques et protection des données

Avant toute activation, l’équipe de projet devra créer un utilisateur PostgreSQL Dreamlit distinct, limiter ses droits au schéma `notifications` et au schéma technique Dreamlit, activer SSL, et exposer seulement le port nécessaire avec une règle réseau restreinte aux plages officielles indiquées par Dreamlit.[1] [4] Le compte applicatif de l’API conserve les droits d’écriture dans les tables de réponse et dans la boîte d’envoi.

Les réponses incluent des données qualitatives potentiellement sensibles pour une organisation. Si Dreamlit reçoit le contenu des réponses ou une synthèse les révélant, la notice de consentement doit nommer Dreamlit comme sous-traitant d’envoi et préciser la nature des données transmises. L’option B réduit ce périmètre, car le résumé peut exclure des réponses que l’équipe ne souhaite pas envoyer par e-mail.

## Décision retenue

L’option **B** est retenue. Le dépôt contient maintenant la table `notifications.partner_response_recap_outbox` et l’API y écrit un récapitulatif déterministe lors d’une soumission. La connexion PostgreSQL à Dreamlit, la vérification du domaine d’envoi et la publication du workflow restent à effectuer dans les interfaces Coolify et Dreamlit ; elles ne peuvent pas être réalisées sans les accès de l’équipe de projet.

## Références

[1] [Dreamlit — Connexion PostgreSQL](https://notikaai.mintlify.app/docs/configuration/data-sources/postgres.md)

[2] [Dreamlit — Déclencheur de base de données](https://notikaai.mintlify.app/docs/steps/database-trigger.md)

[3] [Dreamlit — Étape d’envoi d’e-mail](https://notikaai.mintlify.app/docs/steps/send-email.md)

[4] [Dreamlit — Sécurité](https://notikaai.mintlify.app/docs/resources/security.md)

[5] [Coolify — SSL de base de données](https://coolify.io/docs/databases/ssl)

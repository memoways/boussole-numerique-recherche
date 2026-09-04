# Prompts Codex et DreamLead — récapitulatifs du questionnaire partenaire

> **Objectif.** Ces deux prompts servent à terminer la configuration de DreamLead avec une proposition contrôlée avant tout envoi. Ils suivent l’architecture retenue : DreamLead ne reçoit que les données déjà préparées pour l’e-mail, jamais les réponses brutes au questionnaire.

## 1. Prompt à coller dans Codex

```text
Tu travailles sur le projet Boussole Numérique Culture. Tu as accès à DreamLead via MCP. Ton rôle est de préparer, vérifier et proposer une configuration de workflow transactionnel ; ne publie aucun workflow, ne modifie pas le schéma de production et n’envoie aucun e-mail sans une confirmation explicite de ma part.

Avant toute action, inspecte les outils MCP DreamLead disponibles et utilise uniquement leurs paramètres documentés. Vérifie que tu travailles dans le projet DreamLead dédié à la Boussole, pas dans un projet Memoways existant.

## Contexte fonctionnel

Une personne partenaire reçoit un lien d’invitation personnel, sauvegarde éventuellement un brouillon, donne son consentement puis soumet son questionnaire. L’API Boussole écrit alors un récapitulatif déterministe dans une boîte d’envoi PostgreSQL. Le but de DreamLead est d’envoyer à cette même personne une copie fidèle et lisible de ce qu’elle a validé.

Il s’agit d’un e-mail transactionnel individuel, et non d’une newsletter, d’un diagnostic automatisé ou d’une analyse IA. L’envoi doit être en français, sobre, utile et respectueux. Il ne doit jamais attribuer de score, déduire un profil, interpréter des réponses ou promettre une fonctionnalité future.

## Architecture et principe de minimisation

La source est PostgreSQL 18, exposé en TLS sur lime.1024b.net:5432. Le compte de connexion DreamLead est un compte PostgreSQL dédié, dreamlit_boussole. Ne demande ni n’affiche aucun mot de passe ou secret dans les comptes rendus.

DreamLead ne doit accéder ni à partner_responses ni à partner_response_answers. Il doit exclusivement observer et exploiter :

notifications.partner_response_recap_outbox

Les colonnes disponibles à ce jour sont :
- id
- response_id
- recipient_email
- recipient_name
- organization_name
- subject
- summary_text
- summary_version
- created_at
- updated_at
- regenerated_at
- regeneration_count

Le compte DreamLead doit avoir des droits limités au schéma notifications et aux objets techniques qu’il doit créer dans son propre schéma dreamlit. N’élargis pas son accès à des réponses brutes, à des contacts, à des invitations ou à toute autre table.

## Prévol à exécuter et à rapporter

1. Vérifie que la connexion PostgreSQL DreamLead passe les trois contrôles : connexion, gestion du schéma dreamlit et gestion des triggers.
2. Confirme les droits effectifs du compte DreamLead uniquement sur notifications.partner_response_recap_outbox et le schéma technique dreamlit.
3. Vérifie les déclencheurs que DreamLead prévoit de créer, leurs événements et leur condition. Ne les active pas encore.
4. Contrôle que le domaine et l’expéditeur de DreamLead sont vérifiés. Propose l’expéditeur transactionnel le plus clair ; ne l’invente pas s’il n’est pas vérifié. Utilise ulrich.fischer@memoways.com comme adresse Reply-To proposée.
5. Ne contourne jamais une erreur de certificat TLS en désactivant TLS, en acceptant silencieusement un certificat non fiable ou en utilisant un compte PostgreSQL plus privilégié.

## Garde-fou essentiel : éviter les doublons

La table actuelle ne contient pas encore delivery_status, sent_at ni provider_message_id. Ne suppose donc pas qu’un déclencheur sur chaque mise à jour soit idempotent.

Prépare d’abord une proposition qui compare au moins ces deux approches :

A. Déclenchement uniquement à l’insertion de la ligne d’outbox ; la régénération manuelle reste enregistrée mais ne renvoie pas automatiquement d’e-mail.

B. Ajout minimal d’un état de livraison et d’une version d’envoi, afin qu’une régénération explicitement marquée « à envoyer » crée exactement un nouvel envoi, tandis que les changements techniques ne créent aucun doublon.

Pour chaque approche, indique les conséquences pour l’action admin « Régénérer », l’idempotence, le suivi d’erreur et le rollback. Ne propose pas de DDL ou de migration sans donner le SQL complet et attendre ma validation.

## Modèle d’e-mail à proposer

Prépare un modèle transactionnel français utilisant uniquement recipient_name, organization_name, subject et summary_text. Le corps doit :

- commencer par « Bonjour {recipient_name}, » ;
- remercier la personne pour sa contribution à la co-conception de la Boussole Numérique Culture ;
- préciser que le message est une copie du contenu qu’elle a validé ;
- afficher summary_text sans le réécrire, le résumer par IA ni ajouter de diagnostic ;
- indiquer que les retours seront examinés dans la phase de co-conception ;
- se conclure sobrement avec « L’équipe de projet Boussole Numérique Culture » ;
- proposer ulrich.fischer@memoways.com comme Reply-To ;
- ne contenir ni bouton marketing, ni suivi commercial, ni option de désabonnement pour cet e-mail transactionnel.

Prévois une version texte brut accessible et, si DreamLead le gère, une version HTML minimaliste et responsive. Évite les phrases promotionnelles ou les promesses concernant une Boussole déjà disponible.

## Livrable attendu avant validation

Ne publie rien. Retourne une proposition structurée avec :

1. le statut de la connexion et les trois contrôles techniques ;
2. les tables et colonnes réellement accessibles à DreamLead ;
3. le type de déclencheur proposé, sa condition précise et la stratégie anti-doublon ;
4. les droits SQL strictement nécessaires et, si besoin, le SQL de migration séparé ;
5. l’expéditeur proposé, le Reply-To et le modèle d’e-mail complet ;
6. le traitement d’un échec d’envoi, sans nouvelle tentative automatique non bornée ;
7. un plan de test en trois étapes : test de connexion, test sans envoi, puis un unique envoi à ulrich.fischer@memoways.com après confirmation explicite ;
8. les actions irréversibles ou susceptibles d’envoyer un e-mail, clairement signalées.

Attends ma réponse « VALIDER LA PUBLICATION » avant toute publication de workflow et ma réponse « VALIDER L’ENVOI DE TEST » avant tout envoi d’e-mail.
```

## 2. Prompt à coller dans DreamLead

```text
Tu prépares un workflow transactionnel pour Boussole Numérique Culture. Ne publie pas le workflow, ne modifie pas le schéma PostgreSQL et n’envoie aucun e-mail tant qu’une validation explicite n’a pas été donnée.

## Mission

Lorsqu’un questionnaire partenaire est soumis, l’API Boussole prépare une ligne dans la boîte PostgreSQL :

notifications.partner_response_recap_outbox

Ta mission est de proposer le workflow qui permettra d’envoyer à la personne répondante une copie fidèle du récapitulatif déjà préparé. Ce message doit être purement transactionnel et ne doit pas analyser, noter, classer ou interpréter les réponses.

## Données autorisées

Utilise uniquement les colonnes suivantes de notifications.partner_response_recap_outbox :

- recipient_email
- recipient_name
- organization_name
- subject
- summary_text
- summary_version
- created_at
- regenerated_at
- regeneration_count

N’accède pas aux tables de réponses brutes, aux réponses vocales, aux invitations, aux contacts ou aux autres données de la base. N’ajoute pas de données externes.

## Sécurité et déclenchement

La connexion PostgreSQL doit rester chiffrée. N’accepte pas de certificat non fiable et ne suggère pas de désactiver TLS.

Le schéma d’outbox actuel ne contient pas encore d’état « envoyé » ou d’identifiant fournisseur. Ne crée donc pas un workflow qui envoie un e-mail à chaque mise à jour de la ligne : une régénération manuelle ou une mise à jour technique pourrait sinon provoquer un doublon.

Avant de construire le workflow, propose et compare :

1. un déclenchement uniquement à l’insertion de la ligne ;
2. un mécanisme d’envoi versionné, avec un état explicite à ajouter à la table pour permettre une régénération volontaire sans doublon.

Indique quel changement SQL minimal serait nécessaire pour l’option 2. Ne l’exécute pas.

## Contenu de l’e-mail

Rédige une proposition en français, avec ce cadre :

Objet : utiliser exactement {subject}.

Bonjour {recipient_name},

Merci pour votre contribution à la co-conception de la Boussole Numérique Culture. Vous trouverez ci-dessous une copie du contenu que vous avez validé.

{summary_text}

Vos retours contribueront à préparer les prochaines étapes de la co-conception. Pour toute question relative à votre contribution, vous pouvez répondre à cet e-mail.

Bien cordialement,
L’équipe de projet Boussole Numérique Culture

Propose ulrich.fischer@memoways.com comme Reply-To. Utilise seulement un expéditeur dont le domaine est déjà vérifié dans DreamLead ; si aucun expéditeur approprié n’est prêt, signale-le au lieu d’en inventer un.

Prépare une version texte brut et une version HTML simple, accessible et responsive. N’ajoute ni tracking commercial, ni contenu promotionnel, ni désabonnement à cet e-mail transactionnel.

## Réponse attendue

Retourne une proposition, sans l’activer, avec :

- la source PostgreSQL et la table exacte à surveiller ;
- la condition de déclenchement proposée ;
- la stratégie anti-doublon ;
- les droits nécessaires ;
- le modèle d’e-mail complet ;
- le comportement en cas d’échec d’envoi ;
- les prérequis non remplis ;
- la séquence de test : connexion, simulation sans envoi, puis un seul envoi de test après validation explicite.

Marque explicitement les étapes qui publieraient le workflow, créeraient un trigger, modifieraient la base ou enverraient un e-mail.
```

## Utilisation recommandée

1. Coller d’abord le prompt Codex dans Codex et demander uniquement la **proposition**.
2. Une fois la proposition affichée, copier le second prompt dans DreamLead pour obtenir son cadrage métier et son modèle d’e-mail.
3. Comparer les deux propositions, valider explicitement la stratégie anti-doublon et l’expéditeur.
4. Publier ensuite le workflow et autoriser séparément un unique envoi de test vers `ulrich.fischer@memoways.com`.

La décision concernant un éventuel ajout d’état de livraison à la table doit être prise avant l’activation : le schéma actuel ne permet pas à lui seul de prouver qu’un envoi a été réalisé une seule fois.

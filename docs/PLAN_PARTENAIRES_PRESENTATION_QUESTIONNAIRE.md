# Plan de travail — Présentation partenaire et questionnaire

**Statut :** implémentation déposée ; activation pilote conditionnée au déploiement Coolify, aux secrets et au choix du SMTP.  
**Dernière mise à jour :** 13 août 2026.

> **État d’implémentation.** La présentation autonome, les deux CTA, le modèle PostgreSQL, les invitations personnelles, l’administration, le questionnaire multi-format, les brouillons, la transcription Deepgram et les récapitulatifs SMTP optionnels sont présents dans le dépôt. Lire `docs/PARTNER_FEEDBACK_OPERATIONS.md` avant le premier déploiement.

## Objectif

Créer deux expériences **autonomes** depuis la page **Partenaires & premiers utilisateurs**. La première est une présentation qui aide à comprendre la Boussole et la valeur qu’elle apporte aux missions des partenaires. La seconde est un questionnaire sécurisé qui recueille des retours qualitatifs et structurés pour préparer un atelier de co-conception avec les partenaires et les utilisateurs finaux.

> Une personne qui connaît déjà le projet par un échange, une réunion ou un autre support doit pouvoir accéder directement au questionnaire. La présentation peut proposer le questionnaire à sa dernière slide, mais ce passage reste entièrement facultatif.

| Paramètre | Décision de cadrage |
|---|---|
| Public pilote | Environ dix organisations, avec une à deux personnes invitées par organisation |
| Accès répondant | Lien individuel sécurisé, lié à une personne et à son organisation, sans compte ni mot de passe |
| Questionnaire | Dix à quinze minutes, multi-étapes, brouillon récupérable et possibilité d’entretien accompagné |
| Données | PostgreSQL auto-hébergé dans Coolify, accès privé au réseau du serveur |
| Restitution | Récapitulatif individuel par e-mail et rapport collectif anonymisé |
| Responsable des réponses | Ulrich Fischer — `ulrich.fischer@memoways.com` |

## 1. Deux accès autonomes sur la page Partenaires

La page Partenaires accueillera une zone explicite **« Deux façons de participer »**. Les actions sont séparées visuellement et fonctionnellement afin que chaque personne puisse choisir le parcours adapté à son niveau d’information.

| Section | CTA validé | Route cible | Rôle |
|---|---|---|---|
| Découvrir le projet | **« Découvrir la Boussole »** | `/partenaires/presentation` | Ouvre une présentation libre, sans identification. |
| Contribuer au projet | **« Partager mes idées et feedbacks »** | `/partenaires/questionnaire` ou `/partenaires/questionnaire/:token` | Ouvre l’accès au questionnaire sans imposer le diaporama. |

Le CTA de questionnaire ouvre d’abord une page d’accès. Une personne disposant déjà d’une invitation arrive directement par son lien personnel. Une personne qui n’a pas de lien peut remplir une courte demande d’invitation ; elle ne reçoit pas automatiquement l’accès tant que l’équipe n’a pas validé son rattachement à une organisation partenaire.

Le bouton **« Signaler mon intérêt »** reste distinct. Il s’adresse aux organisations non encore invitées et ne remplace ni la présentation ni le questionnaire.

## 2. Phase 1 — Présentation partenaire dédiée

La présentation est une expérience slide par slide, pensée comme un support de dialogue plutôt qu’une brochure. Elle est responsive, utilisable au clavier et au tactile, et donne une idée principale par écran. Les contenus « En savoir plus » restent fermés par défaut et renvoient vers les pages et ancres existantes sans interrompre définitivement la présentation.

| Slide | Sujet | Question partenaire traitée |
|---|---|---|
| 1 | Bienvenue et raison d’être | De quoi s’agit-il ? |
| 2 | Besoins du terrain | Quels besoins de mes membres ou publics sont concernés ? |
| 3 | La Boussole | Quel est l’outil proposé ? |
| 4 | Publics concernés | À qui cela se destine-t-il ? |
| 5 | Fonctionnement | Comment le diagnostic, la restitution et les pistes d’action s’articulent-ils ? |
| 6 | Principes | En quoi le projet est-il compatible avec ma mission ? |
| 7 | Valeur partenaire | Qu’est-ce que mon organisation et ses membres y gagnent-ils ? |
| 8 | Co-design | Comment puis-je influencer l’expérience et le questionnaire ? |
| 9 | Prochaine étape | Puis-je répondre maintenant ou demander une invitation ? |

La dernière slide contient un bouton facultatif **« Partager mes idées et feedbacks »** qui rejoint l’expérience questionnaire. Aucun état de lecture de la présentation ne conditionne l’ouverture du questionnaire.

## 3. Phase 2 — Questionnaire partenaire et socle de données

Le questionnaire a pour vocation de dégrossir les besoins, les opportunités, les attentes et les freins. Il ne cherche pas encore à mesurer définitivement la maturité numérique. Ses résultats permettent de préparer un atelier où les partenaires et les utilisateurs finaux prototyperont les fondations de la Boussole, ses questions et les principes de son accompagnement conversationnel.

### 3.1 Axes de collecte, dans l’ordre validé

| Ordre | Axe | Exemples d’informations à recueillir |
|---|---|---|
| 1 | Besoins des membres ou publics | Besoins urgents, enjeux à résoudre, publics concernés, situations vécues. |
| 2 | Intérêt de l’organisation | Mission, valeur possible de la Boussole, priorités et critères de réussite. |
| 3 | Capacité à distribuer l’outil | Canaux, événements, relais, accompagnements et modalités de diffusion. |
| 4 | Contribution au co-design | Hypothèses à tester, idées, craintes, besoins non couverts et attentes liées à l’accompagnement conversationnel. |

Les réponses ouvertes doivent permettre de recueillir un retour sur le projet et ses hypothèses, les objectifs possibles de la Boussole, les besoins des membres ou du public, les idées, les réserves, les critères de réussite et les éléments stratégiquement importants pour l’organisation.

### 3.2 Formats de questions et règles de conception

| Format | Utilisation |
|---|---|
| Échelle Likert à cinq positions | Accord, importance, confiance, fréquence ou niveau de priorité. Les libellés seront adaptés à la question. |
| Sélection unique | Choix d’un profil, d’une priorité, d’une situation ou d’une modalité. |
| Sélection multiple | Identification de plusieurs besoins, publics, canaux, freins ou formes de contribution. |
| Réponse ouverte courte | Exemple, outil, formulation ou fait précis. |
| Réponse ouverte longue | Analyse, attente, réserve, idée de partenariat ou condition de réussite. |
| Réponse vocale transcrite | Réponse orale sur une question ouverte où la nuance est utile. |

La V1 suit une structure courte : accueil et consentement ; organisation et publics ; besoins et enjeux ; hypothèses de la Boussole ; valeur et distribution ; co-design et accompagnement conversationnel ; conclusion. Les questions conditionnelles devront limiter les écrans non pertinents pour chaque profil.

| Étape | Finalité | Formats privilégiés |
|---|---|---|
| 0. Accueil et consentement | Présenter l’usage des données, confirmer la personne et recueillir le consentement | Case de consentement, texte court |
| 1. Organisation et publics | Situer le rôle du partenaire et les communautés servies | Sélection unique, multiple, réponse courte |
| 2. Besoins et enjeux | Identifier les difficultés et besoins prioritaires | Likert contextualisé, multiple, réponse ouverte ou vocale |
| 3. Hypothèses de la Boussole | Tester pertinence, priorités et craintes | Likert contextualisé, sélection unique, réponse ouverte |
| 4. Valeur et distribution | Identifier les bénéfices et leviers de diffusion | Sélection multiple, Likert, réponse ouverte |
| 5. Co-design et accompagnement | Définir l’implication et les attentes liées au dialogue guidé | Multiple, classement léger, réponse ouverte ou vocale |
| 6. Conclusion | Recueillir une dernière idée et les conditions de réussite | Réponse longue ou vocale, accord de recontact |

Le questionnaire enregistre un brouillon après chaque étape. Une personne peut revenir sur toutes ses réponses avant soumission définitive.

## 4. Invitations, accès direct et administration

Une organisation partenaire peut avoir plusieurs contacts. Chaque contact reçoit une invitation personnelle liée à l’organisation, avec token long, aléatoire, non devinable, hashé côté serveur, révocable et expirant.

La page publique de demande d’invitation collecte quatre champs : **nom de la structure**, **prénom**, **nom** et **e-mail**. Une demande est traitée manuellement : l’administration rattache le contact à une organisation existante ou crée l’organisation, puis émet l’invitation après vérification.

L’administration V1 est réservée à l’équipe autorisée. L’accès initial est limité à **ulrich.fischer@memoways.com**, avec extension possible à d’autres administrateurs. Elle doit permettre de gérer les organisations et contacts, traiter les demandes, générer ou révoquer les invitations, lire les réponses nominatives et exporter les données au format CSV.

## 5. Réponses vocales et Deepgram

La réponse vocale est optionnelle. La recommandation retenue est l’**enregistrement court puis transcription côté serveur** plutôt qu’une transcription en direct : l’expérience est plus robuste, plus simple à reprendre et laisse une place claire à la relecture avant envoi.

Le flux répondant est : **enregistrer → transcrire → relire/corriger → valider la transcription → sauvegarder le brouillon → soumettre**. Une transcription ne devient jamais une réponse finale sans confirmation de la personne répondante.

L’API reçoit temporairement l’audio, le transmet à Deepgram et retourne une transcription éditable. La clé Deepgram reste exclusivement côté serveur. Après validation de la transcription, le fichier audio est supprimé ; seule la transcription soumise est conservée. Les capacités de transcription d’audio préenregistré et de streaming sont documentées par Deepgram.[1]

## 6. Architecture Coolify et données

Le portail existant reste l’application web de présentation. La collecte partenaire ajoute une API et une base de données isolées dans Coolify.

| Service | Rôle | Exposition |
|---|---|---|
| `boussole-web` | Site, diaporama et interfaces questionnaire | Domaine public principal |
| `partner-feedback-api` | Invitations, brouillons, soumissions, transcription, e-mails et exports | Derrière reverse proxy ou sous-domaine API restreint |
| `partner-feedback-db` | PostgreSQL, volume persistant et sauvegardes | Réseau Coolify privé uniquement |

PostgreSQL sera créé comme service privé dans Coolify. L’API TypeScript utilise une initialisation de schéma idempotente, une version de questionnaire figée en base, une validation serveur des données et une couche d’accès typée.

| Table | Finalité |
|---|---|
| `partner_organizations` | Organisation partenaire, statut et informations de gestion. |
| `partner_contacts` | Personnes invitées, rôle et coordonnées. |
| `partner_invitation_requests` | Demandes publiques à traiter manuellement. |
| `partner_invitations` | Tokens hashés, expiration, révocation et statut de lecture. |
| `questionnaire_versions` | Version figée de chaque itération de questionnaire, avec sa définition JSON de questions, formats et aides. |
| `partner_responses` | Réponse liée à une invitation et à une version. |
| `partner_response_answers` | Réponses structurées, textes validés et métadonnées vocales minimales. |
| `response_events` | Événements de parcours sans contenu sensible. |

Les secrets restent exclusivement dans Coolify : `DATABASE_URL`, `INVITATION_TOKEN_PEPPER`, `DEEPGRAM_API_KEY`, configuration e-mail transactionnel, URL publique de l’application et liste CORS éventuelle. Aucun secret ne doit être commité, transmis au navigateur ou exposé dans une variable `VITE_*`.

## 7. Données, confidentialité et restitution

Avant la première réponse, le questionnaire affiche une information claire : finalité de co-conception, données recueillies, responsable du traitement, durée de conservation, possibilité de retrait et moyen de contact. Le responsable indiqué est **Ulrich Fischer** (`ulrich.fischer@memoways.com`).

Les réponses sont conservées jusqu’à la fin du développement de la version publique de la Boussole. Cette échéance doit être définie ou révisée avant l’ouverture de la collecte. Les fichiers audio sont supprimés après validation de la transcription ; seule la transcription soumise est conservée.

Après soumission, chaque partenaire reçoit par e-mail un récapitulatif de ses réponses ou de ses transcriptions validées. L’administration produit en parallèle un rapport collectif anonymisé pour les partenaires. Le rapport collectif ne contient aucun élément nominatif ; le récapitulatif individuel ne révèle aucune réponse tierce.

## 8. Mise en œuvre en deux phases

### Phase 1 — Présentation partenaire dédiée

1. Concevoir la zone « Deux façons de participer » et ses CTA : **« Découvrir la Boussole »** et **« Partager mes idées et feedbacks »**.
2. Créer la route du diaporama, sa progression, ses toggles, ses liens contextuels et son CTA facultatif vers le questionnaire.
3. Tester la présentation avec au moins deux partenaires, en mesurant compréhension, intérêt et valeur perçue.
4. Ajuster les messages de présentation avant de démarrer la collecte.

### Phase 2 — Questionnaire, données et pilote

1. Finaliser les questions, leurs types, les libellés contextuels des échelles Likert, les règles conditionnelles et le consentement.
2. Déployer PostgreSQL, l’API, les volumes persistants, les sauvegardes, les secrets et les migrations dans Coolify.
3. Créer l’administration d’organisations, contacts, demandes d’invitation, invitations personnelles, réponses et export CSV.
4. Créer le questionnaire multi-étapes, la sauvegarde de brouillon, la soumission et l’e-mail récapitulatif individuel.
5. Intégrer Deepgram pour les réponses vocales, avec validation écrite obligatoire avant enregistrement définitif et suppression audio.
6. Préparer le rapport collectif anonymisé, lancer le pilote et organiser l’atelier de co-design à partir des résultats.

## 9. Critères de réussite

| Dimension | Critère vérifiable |
|---|---|
| Compréhension | Un partenaire peut résumer le projet, la valeur pour ses membres et son rôle de co-design après le diaporama. |
| Autonomie | Une personne peut accéder directement au questionnaire avec son invitation, sans parcourir la présentation. |
| Simplicité | Le questionnaire est rempli ou repris sur smartphone en moins de quinze minutes. |
| Qualité qualitative | Les réponses ouvertes et vocales apportent des éléments exploitables pour l’atelier. |
| Sécurité | Les tokens sont révoqués ou expirés, les secrets restent serveur et l’audio validé est supprimé. |
| Exploitation | L’administration gère les invitations et exporte les réponses ; les partenaires reçoivent une restitution adaptée. |

## 10. Derniers paramètres à arbitrer avant implémentation

| Sujet | Décision attendue |
|---|---|
| Expiration d’invitation | Durée initiale proposée : 45 jours, avec réémission manuelle. |
| Fin de conservation | Définir le jalon précis qui marque la fin du développement de la version publique. |
| E-mail transactionnel | Choisir le service SMTP ou transactionnel utilisé par Coolify pour invitations et récapitulatifs. |
| API | Choisir entre reverse proxy sous le domaine principal ou sous-domaine API dédié. |
| Droits administrateurs | Définir les personnes supplémentaires pouvant gérer les invitations et voir les réponses nominatives. |

## Références

[1] [Deepgram — Getting Started with Speech-to-Text](https://developers.deepgram.com/docs/stt/getting-started)

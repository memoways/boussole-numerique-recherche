# Archive d’implémentation — module partenaire

**Périmètre archivé :** fonctionnalités ajoutées au portail et à l’API partenaire jusqu’au 13 août 2026. Ce document décrit uniquement les éléments présents dans le dépôt et les contrôles déjà effectués.

## Présentation partenaire

La route `/partenaires/presentation` propose neuf slides, chacune avec une composition visuelle liée à son sujet et deux panneaux de détail. Les panneaux sont accessibles au clavier, se développent dans le flux de la page et permettent de lire des informations complémentaires avant de suivre un lien vers une autre page.

La composition a été resserrée pour travailler en largeur : texte et visualisation sont disposés en deux colonnes sur desktop, les deux panneaux de détail peuvent être présentés côte à côte et la carte utilise une hauteur maximale de 800 px avant l’ouverture d’un détail. Sur mobile, la grille revient à une colonne. La première slide reprend le radar-boussole à cinq dimensions et les repères cardinaux de la page Expérience. Les slides suivantes utilisent une illustration propre à leur sujet seulement lorsqu’elle clarifie réellement le récit ; les autres restent volontairement sans visuel.

Les contrôles Précédent et Suivant sont placés dans une zone dédiée entre le contenu principal et les toggles. Ils restent ainsi au même emplacement lorsque les panneaux de détail se déplient, sans perturber le chemin de navigation.

L’URL encode la slide et le détail ouverts avec `?slide=<n>&detail=<id>`. Lorsqu’une personne suit un lien contextuel puis utilise le bouton précédent du navigateur, l’historique retrouve l’URL de présentation et l’interface restaure la même slide avec le même panneau déplié. Les touches gauche et droite naviguent entre les slides en dehors des contrôles interactifs.

| Fichier | Élément livré |
|---|---|
| `client/src/pages/PartnerPresentation.tsx` | Slides, compositions SVG/React, accordéons, navigation, raccourcis clavier et contexte d’URL. |
| `client/src/components/ui/accordion.tsx` | Primitive accessible réemployée pour les panneaux de détail. |
| `client/src/App.tsx` | Route publique de la présentation. |

## Questionnaire, invitations et réponses

Le portail propose deux accès distincts depuis la page Partenaires : « Découvrir la Boussole » et « Partager mes idées et feedbacks ». Le questionnaire accepte des invitations personnelles liées à une organisation et à un contact. Il gère les brouillons, le consentement, les réponses à choix, les réponses ouvertes et la transcription vocale optionnelle.

Les jetons d’invitation sont générés aléatoirement puis conservés seulement sous forme d’empreinte SHA-256 associée à un secret serveur. Les fichiers audio sont envoyés temporairement vers la transcription et ne sont pas écrits dans PostgreSQL ; la transcription relue par la personne répondante constitue la donnée enregistrable.

| Fichier | Élément livré |
|---|---|
| `client/src/pages/PartnerQuestionnaire.tsx` | Parcours multi-étapes, brouillons, consentement et réponses vocales éditables. |
| `client/src/lib/partnerApi.ts` | Client API avec cookies de session inclus dans les requêtes. |
| `services/partner-feedback-api/src/schema.sql` | Tables organisations, contacts, invitations, versions, réponses et événements. |
| `services/partner-feedback-api/src/questionnaire.ts` | Définition figée du questionnaire partenaire V1. |
| `services/partner-feedback-api/src/index.ts` | API publique, gestion des brouillons, soumission et transcription Deepgram. |

## Administration

La console est disponible à `/admin`; `/partenaires/admin` reste une adresse compatible. Les deux routes rendent la même interface. Elles ne figurent ni dans la navigation publique ni dans les pages indexables.

L’accès est assuré par l’API avec l’adresse initiale `ulrich.fischer@memoways.com` définie dans `ADMIN_EMAIL` et un mot de passe fourni par `ADMIN_PASSWORD` au runtime. Après connexion, l’API crée une session signée dans un cookie `httpOnly`, `Secure` en HTTPS et limité au chemin `/api/admin`. La session expire après huit heures.

Une limitation de tentatives en mémoire a été ajoutée : huit tentatives de connexion par quart d’heure pour une même adresse IP et dix demandes publiques d’invitation par heure. L’interface permet de créer organisations et contacts, d’approuver des demandes, de générer des invitations, de consulter l’aperçu des réponses et d’exporter un CSV.

| Fichier | Élément livré |
|---|---|
| `client/src/pages/PartnerAdmin.tsx` | Connexion, gestion des organisations et contacts, invitations, demandes et export. |
| `client/src/App.tsx` | Alias `/admin`. |
| `client/src/lib/seo.ts` | Métadonnées de `/admin` avec `noindex`. |
| `services/partner-feedback-api/src/index.ts` | Session JWT, cookie restreint, CORS et limitation de tentatives. |

## Déploiement Coolify et documentation

Le dépôt contient les éléments nécessaires à un déploiement séparé du portail, de l’API et de PostgreSQL. Le Dockerfile du portail accepte maintenant `SITE_URL` et `VITE_PARTNER_API_URL` comme arguments de build publics. L’API possède son Dockerfile et le fichier `docker-compose.partner-feedback.yml` fournit une référence locale API/PostgreSQL.

| Document | Contenu livré |
|---|---|
| `docs/PARTNER_FEEDBACK_OPERATIONS.md` | Tutoriel Coolify : domaines, PostgreSQL privé, API, secrets, `/admin`, SMTP, Deepgram, sauvegarde et tests pilote. |
| `docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md` | Décisions de conception et état d’implémentation du module. |
| `docs/VALIDATION_PRESENTATION_ADMIN.md` | Contrôles locaux effectués et contrôles à réaliser après l’activation Coolify. |
| `docs/README.md` | Index permanent de la documentation. |
| `config/ENVIRONMENT.md` | Distingue les variables de build publiques et les secrets runtime. |

## Boîte d’envoi Dreamlit pour les récapitulatifs

L’option retenue pour les récapitulatifs de réponses est une boîte d’envoi PostgreSQL dédiée. À l’intérieur de la transaction de soumission, l’API crée une ligne unique dans `notifications.partner_response_recap_outbox`. Cette ligne contient uniquement l’adresse de destination, le prénom, l’organisation, l’objet et le texte de récapitulatif. Elle ne contient ni jeton d’invitation ni données d’administration.

Le texte est construit de façon déterministe à partir des libellés du questionnaire et des réponses effectivement enregistrées. Il sert de trace fidèle à la personne répondante ; il ne produit pas de diagnostic ni d’inférence. Dreamlit doit être configuré pour surveiller la boîte d’envoi, et non les tables `partner_responses` ou `partner_response_answers`.

| Fichier | Élément livré |
|---|---|
| `services/partner-feedback-api/src/schema.sql` | Schéma `notifications` et table de boîte d’envoi avec une ligne unique par réponse. |
| `services/partner-feedback-api/src/response-recap.ts` | Formatage déterministe et réutilisable du récapitulatif. |
| `services/partner-feedback-api/src/index.ts` | Création atomique de la boîte d’envoi durant la soumission. |
| `services/partner-feedback-api/scripts/verify-response-recap.ts` | Test du formatage et du cas sans réponse. |
| `docs/PARTNER_FEEDBACK_OPERATIONS.md` | Procédure Dreamlit/Coolify, privilèges limités et réglages du workflow. |

La console `/admin` affiche les lignes de la boîte, dont le destinataire, l’organisation, la date, le récapitulatif et le nombre de régénérations. L’action de régénération reste réservée à une réponse soumise. Elle reconstruit le texte depuis les réponses conservées, met à jour la même ligne et incrémente `regeneration_count`; elle ne crée pas de doublon de boîte d’envoi. Dreamlit doit surveiller les insertions et les mises à jour de `updated_at` pour que cette action déclenche un nouvel e-mail.

## Contrôles effectués

| Contrôle | Résultat |
|---|---|
| `pnpm verify` | Contrôle TypeScript, build frontend et build de l’API réussis. |
| Routes de production statique | `/partenaires/presentation?slide=5&detail=dimensions`, `/admin` et `/partenaires/admin` répondent toutes en HTTP 200. |
| Présentation enrichie | Affichage contrôlé sur la slide 5 avec panneau ouvert, schéma visuel et lien contextuel. |
| Alias administration | `/admin` rend l’état d’activation attendu avant configuration de l’API. |
| Docker local | Non exécuté : Docker n’est pas installé dans l’environnement de validation. Le premier build Coolify doit confirmer l’image. |
| Récapitulatif Dreamlit | Test automatisé du formatage réussi. L’envoi réel attend la connexion PostgreSQL et la publication du workflow Dreamlit. |
| Régénération Dreamlit | Contrôles TypeScript et build réussis. Le test d’envoi reste à effectuer avec un workflow Dreamlit publié. |

## Éléments dépendant encore de Coolify

L’activation réelle du questionnaire et de la console nécessite une instance PostgreSQL privée, une application API, un domaine API HTTPS et les variables runtime. Le mot de passe administrateur, les clés Deepgram et SMTP ne sont présents dans aucun fichier du dépôt.

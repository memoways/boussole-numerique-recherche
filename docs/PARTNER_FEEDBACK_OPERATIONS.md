# Exploitation — Présentation & questionnaire partenaire

## Objet et frontières

L’expérience partenaire comprend deux parcours autonomes. La présentation est publique à `/partenaires/presentation` et ne collecte aucune donnée. Le questionnaire est accessible à `/partenaires/questionnaire` par demande d’invitation, puis à `/partenaires/questionnaire/:token` avec un lien personnel. L’administration est disponible à `/partenaires/admin` et ne doit jamais être exposée dans la navigation publique.

Le portail React reste statique. La collecte utilise un second service, `@boussole/partner-feedback-api`, relié à PostgreSQL privé dans Coolify. Aucun secret n’est transmis au navigateur.

## Déploiement Coolify

Créez trois ressources sur le même serveur Coolify : le portail, une base PostgreSQL privée et l’API partenaire. L’API utilise `services/partner-feedback-api/Dockerfile`. PostgreSQL ne reçoit aucun domaine public ; seul le service API a un sous-domaine HTTPS, de préférence sous le même domaine parent que le portail afin de préserver les sessions d’administration.

| Ressource | Rôle | Exposition |
|---|---|---|
| `boussole-portal` | Portail React/Nginx | HTTPS public |
| `boussole-postgres` | Invitations, réponses et audits | Réseau privé Coolify uniquement |
| `boussole-partner-api` | API, transcription et administration | HTTPS public, CORS limité au portail |

Le portail doit être rebâti avec `VITE_PARTNER_API_URL=https://api.votre-domaine.example`. L’API doit recevoir `PUBLIC_APP_URL=https://votre-domaine.example` et `ALLOWED_ORIGIN=https://votre-domaine.example`.

> Utilisez les mécanismes de base de données et de variables d’environnement de Coolify plutôt qu’un PostgreSQL exposé sur Internet. La documentation Coolify précise que les services peuvent communiquer via le réseau interne de la plateforme.[1]

## Variables API

| Variable | Obligatoire | Usage |
|---|---:|---|
| `DATABASE_URL` | Oui | URL PostgreSQL privée Coolify. |
| `PUBLIC_APP_URL` | Oui | URL du portail, utilisée dans les liens d’invitation. |
| `ALLOWED_ORIGIN` | Oui | Unique origine frontend autorisée par CORS. |
| `INVITATION_TOKEN_PEPPER` | Oui | Secret aléatoire d’au moins 32 caractères, utilisé pour hacher les jetons. |
| `ADMIN_SESSION_SECRET` | Oui | Secret aléatoire d’au moins 32 caractères, utilisé pour les sessions admin. |
| `ADMIN_EMAIL` et `ADMIN_PASSWORD` | Oui | Premier accès d’administration. |
| `RUN_MIGRATIONS=true` | Premier démarrage | Initialise les tables et la version de questionnaire. |
| `DEEPGRAM_API_KEY` | Optionnel | Active les réponses vocales transcrites. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM` | Optionnels | Envoi des invitations et récapitulatifs individuels. |

Après la première initialisation, retirez `RUN_MIGRATIONS=true` ou conservez-le seulement si les migrations restent idempotentes et contrôlées. Les tables actuelles le sont ; toute migration destructive future doit être effectuée avec une sauvegarde vérifiée.

## Parcours d’administration

L’administrateur ajoute une organisation, puis un ou plusieurs contacts. L’action « Générer un lien » crée un jeton individuel, dont seule l’empreinte est conservée en base. Si SMTP est configuré, le lien est envoyé automatiquement ; sinon, il est copié dans le presse-papiers pour transmission manuelle. Une demande d’invitation issue du formulaire public peut être approuvée pour créer l’organisation, le contact et le lien en une seule action.

L’export CSV contient les réponses nominatives. Il doit être téléchargé uniquement depuis un poste de confiance et stocké dans un espace de travail protégé. Le rapport collectif destiné aux partenaires doit être produit à partir de données anonymisées, sans adresse e-mail ni verbatim attribuable à une petite structure.

## Réponses vocales et Deepgram

Pour une question ouverte autorisant la voix, le navigateur enregistre temporairement un flux audio, l’envoie à l’API, puis reçoit une transcription modifiable. Le fichier audio n’est ni écrit dans PostgreSQL ni sauvegardé par l’API ; seule la transcription corrigée est enregistrée au prochain brouillon. La clé Deepgram reste exclusivement côté serveur.

La route utilise l’API de transcription asynchrone de Deepgram pour des fichiers audio préenregistrés et précise `language=fr` pour les réponses francophones.[2] Si `DEEPGRAM_API_KEY` est absente ou si la transcription échoue, le champ écrit reste disponible.

## Contrôle avant pilote

Avant de transmettre une première invitation, vérifiez la santé de l’API via `GET /health`, puis créez une organisation test, un contact test et un lien test. Vérifiez dans cet ordre l’enregistrement d’un brouillon, l’édition de la transcription, la soumission, le récapitulatif e-mail et l’export CSV. Enfin, effectuez une sauvegarde PostgreSQL et vérifiez sa restauration dans un environnement non public.

La durée de conservation est exprimée dans le consentement : jusqu’à la fin du développement de la version publique de la Boussole. Le jalon exact de suppression ou d’anonymisation doit être consigné avant le démarrage du pilote.

## Références

[1] [Coolify — Docker Compose et réseau interne](https://coolify.io/docs/knowledge-base/docker/compose/)

[2] [Deepgram — Transcription d’audio préenregistré](https://developers.deepgram.com/docs/pre-recorded-audio)

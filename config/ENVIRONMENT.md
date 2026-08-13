# Environnements et secrets

## État actuel

La version actuelle de **Boussole Numérique Culture** est un portail statique accompagné d’une API partenaire optionnelle. Les réglages de build publics sont `SITE_URL`, l’URL publique finale utilisée pour les URL canoniques, Open Graph, `sitemap.xml` et `robots.txt`, ainsi que `VITE_PARTNER_API_URL`, l’URL publique de l’API partenaire.

> Ne créez pas de variable `VITE_*` pour un secret : Vite l'intègre au JavaScript distribué au navigateur.

## Règle pour les évolutions futures

Si une fonctionnalité a besoin d'un secret — clé IA, API externe, envoi d'e-mail, base de données ou authentification — elle doit être exécutée par un backend distinct. Le secret est alors créé dans Coolify comme variable d'exécution du backend, sans préfixe `VITE_`.

| Type de valeur | Où la stocker | Exposition au navigateur |
|---|---|---|
| URL publique du site (`SITE_URL`) | Variable de build Coolify | Oui, dans les métadonnées générées |
| Réglage purement public côté interface | Variable `VITE_*` au build, si nécessaire | Oui |
| Clé API, token, mot de passe, clé privée | Variable runtime du backend dans Coolify | Non |
| Certificat ou secret multiligne | Variable multiligne verrouillée dans Coolify | Non |

Dans Coolify, ajoutez `SITE_URL=https://votre-domaine.example` et `VITE_PARTNER_API_URL=https://api.votre-domaine.example` comme variables de **build**, sans slash final. Ces valeurs sont publiques. Les anciennes variables propres à Manus ne doivent pas être copiées vers Coolify.

## Questionnaire partenaire

Le questionnaire partenaire ajoute un backend distinct déployé comme une seconde application Coolify. La page statique reçoit uniquement l’URL publique de cette API via `VITE_PARTNER_API_URL` au **build**. Cette URL est publique et ne contient aucun secret.

| Variable backend | Type | Règle |
|---|---|---|
| `DATABASE_URL` | Secret | Connexion PostgreSQL privée fournie par Coolify. |
| `PUBLIC_APP_URL` | Configuration | URL HTTPS du portail partenaire. |
| `ALLOWED_ORIGIN` | Configuration | Origine HTTPS exacte du portail. |
| `INVITATION_TOKEN_PEPPER` | Secret | Chaîne aléatoire de 32 caractères minimum. |
| `ADMIN_SESSION_SECRET` | Secret | Chaîne aléatoire de 32 caractères minimum. |
| `ADMIN_EMAIL` | Configuration | E-mail administrateur initial : `ulrich.fischer@memoways.com`. |
| `ADMIN_PASSWORD` | Secret | Mot de passe long, unique et stocké uniquement dans Coolify. |
| `DEEPGRAM_API_KEY` | Secret optionnel | Active la transcription des réponses vocales ; absente, la réponse écrite reste disponible. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM` | Secrets et configuration optionnels | Activent l’envoi de l’invitation personnelle et du récapitulatif individuel après soumission. |
| `RUN_MIGRATIONS` | Configuration | `true` au premier déploiement ou après une migration contrôlée. |

Ne créez jamais ces secrets dans le frontend ni dans un fichier d’environnement commité. La liste complète et la procédure d’activation figurent dans [le tutoriel partenaire](../docs/PARTNER_FEEDBACK_OPERATIONS.md).

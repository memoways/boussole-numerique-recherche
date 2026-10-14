# État du lot 1 — démo playback, socle et avis réel (v1.4.0)

> 14 octobre 2026. Source de vérité du plan : [`PLAN_DEMO_PLAYBACK_2026-10-14.md`](./PLAN_DEMO_PLAYBACK_2026-10-14.md). Source fonctionnelle : PRD Notion « Boussole — prototype démo playback ».

## Livré

| Zone | Contenu |
|---|---|
| API | Variables `NOTION_TOKEN` et `NOTION_FEEDBACK_DB_ID` (facultatives, 503 si absentes) ; `src/deepgram.ts` extrait et réutilisé par l’invitation ; `src/demo-feedback.ts` (titre `AAAA-MM-JJ HH:mm — Persona` en heure de Zurich, mapping Persona/Mode, segments `rich_text` de 2000 caractères, plafond de 5000, e-mail seulement s’il est valide, Suivi = Nouveau) ; routes `POST /api/public/demo/transcribe` (10 Mo, 10/h/IP) et `POST /api/public/demo-feedback` (5/h/IP, champ caché → 202 sans écriture). Aucune écriture PostgreSQL. |
| Routage | `/experience/demo` et `/experience/demo/:persona/:etape`, chargés en différé ; persona `cinema`, `scene`, `arts-visuels` ; étapes `accueil`, `1`…`12`, `ideal`, `restitution`, `demos`, `futur`, `comparaison`, `avis`. Toute valeur invalide redirige vers `/experience/demo`. |
| Mode immersif | Sur ces routes, ni menu, ni fil d’Ariane, ni pied de page, ni retour en haut : bandeau « Démonstration — parcours fictif », en-tête minimal avec « Quitter la démo », barre de progression à 5 segments nommés dans l’ordre du persona plus « Restitution ». |
| Écrans | Choix du persona, accueil avec message de confiance, avis final complet (texte, dictée, réécoute, transcription modifiable, e-mail facultatif, champ caché). Les autres étapes affichent « Cette étape est en préparation ». |
| Contenu | `client/src/data/demo-parcours.json` : textes communs et fiches des trois personas (parcours à rédiger au lot 2). `client/src/lib/demoContent.ts` : types et fonctions dérivées. |
| SEO et Nginx | Entrée `/experience/demo` en `noindex`, hors sitemap et `llms.txt` ; règle Nginx dédiée avec repli vers `/experience/demo/index.html` et en-tête `X-Robots-Tag`. |
| Mesure | `client/src/lib/analytics.ts` : `window.GrainTag.track(nom, props)` (API confirmée dans le script GrainQL v4.6.2) ; sans script, aucun effet ; l’e-mail est réduit à un booléen. |
| Contrôles | `scripts/verify-demo-content.mjs` dans `pnpm verify` ; `pnpm test:demo-feedback`. |

## Décisions

- Avis vocal : enregistrer, réécouter, transcrire, relire puis envoyer en JSON (`mode` = `voix`). L’audio est supprimé du navigateur dès que la transcription est insérée.
- Libellés des dimensions : ceux du PRD (Outils & workflows, Compétences & IA, Données & archivage, Publics & communication, Partage & cohérence).
- Pas de lien depuis `/experience` : la démo n’est accessible que par son URL directe jusqu’au lot 2.

## Contenu complété pour relecture

Le PRD ne fournit pas l’accroche de Marc et de Nadia : « Une création en répétitions, une tournée à organiser. » et « Un inventaire rigoureux, et des portfolios refaits à la main. » Les engagements du message de confiance sont repris du PRD sous la formule « ce que la future Boussole prévoit de respecter ».

## Contrôles réalisés

- `pnpm verify` : TypeScript portail et API, contenu de la démo, build, SEO-GEO (4 parcours privés) et bundle API.
- `pnpm test:demo-feedback` : titre, mapping, e-mail, découpage, validation et appel Notion (fetch simulé).
- Navigateur à 1280 px et 390 px : choix du persona, accueil, avis, étape « en préparation », redirections d’URL invalides, aucun débordement horizontal, aucune erreur console. Flux de dictée simulé (micro, transcription et envoi interceptés) : transcription insérée, e-mail invalide bloqué, erreur d’envoi avec texte conservé, succès avec `mode: voix`.
- Nginx (installé via Homebrew, même fichier `infra/nginx/default.conf`, racine sur `dist/public`) : `/experience/demo`, `/experience/demo/cinema/5` et `/experience/demo/cinema/avis` répondent 200 avec `X-Robots-Tag: noindex, follow` ; `/experience/demo/` redirige en 308 ; `/projet`, `/timeline`, `/references`, `/partenaires` et `/experience` restent en 200 ; une route inconnue reste en 404.
- Non réalisé : `docker build` et `docker run` (Docker n’est pas installé sur la machine de développement).

## Activation Notion (14 octobre 2026)

- L’intégration interne « Boussole démo » (capacité « Insérer du contenu » seule) est connectée à la base « Retours démo Boussole ».
- `NOTION_TOKEN` et `NOTION_FEEDBACK_DB_ID` sont définis dans l’application API de Coolify (Runtime). Ils avaient d’abord été ajoutés par erreur à l’application du portail, puis retirés : le jeton n’existe que côté API. Tant qu’ils manquaient côté API, l’endpoint répondait 503 et rien n’était écrit.
- Production après redéploiement : `/experience/demo`, `/experience/demo/cinema/5` et `/experience/demo/cinema/avis` en 200 avec `X-Robots-Tag: noindex, follow`, absents du sitemap ; `/projet`, `/timeline`, `/references` en 200 ; `/health` de l’API ok ; CORS conforme.
- Avis de test réel (texte, Cinéma, sans e-mail) : une page créée avec le titre `2026-10-14 16:58 — Cinéma`, Persona Cinéma, Mode Texte, Suivi Nouveau, commentaire complet. La page est à supprimer manuellement.

## Reste à faire

1. Tester en conditions réelles un avis vocal et un avis avec e-mail, marqués « TEST » (accord explicite avant d’écrire dans la base).
2. Lots 2 et 3 du plan.

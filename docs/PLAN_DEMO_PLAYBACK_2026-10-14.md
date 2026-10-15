# Plan — Démo playback de la Boussole (`/experience/demo`)

## Contexte

Source : PRD Notion « 🧭 Boussole — prototype démo playback » (État : En cours, échéance **6 novembre 2026**) et tâche liée « Boussole : vibe coder un prototype démonstration ».

Le site compagnon (v1.3.23) dit clairement que la Boussole n'existe pas encore. La page `/experience` montre 4 écrans statiques. Le PRD demande une suite vivante : un parcours **100 % playback** (rien n'est saisi, rien n'appelle l'IA) avec 3 personas, Claire (cinéma), Marc (scène) et Nadia (arts visuels). Après 4 à 6 minutes, la personne doit se dire : « j'ai compris, je suis rassuré·e, j'ai envie de m'y projeter ». **Seul l'avis final est réellement envoyé**, vers la base Notion « 💬 Retours démo Boussole » (`b706f947bc904ab9827b2cca81af8b09`). Rien ne passe par PostgreSQL.

Décisions validées avec toi le 14.10.2026 :
- **Avis vocal** : on enregistre, on réécoute, Deepgram transcrit, tu vois et corriges le texte, puis on envoie en JSON avec Mode = Voix. Ce n'est pas l'envoi multipart prévu dans le PRD.
- **Mode immersif** : sur `/experience/demo/*`, pas de menu, de fil d'Ariane ni de pied de page du site. À la place, un en-tête minimal, le bandeau permanent et un lien « Quitter la démo ».
- **Libellés des dimensions** : ceux du PRD, à savoir Outils & workflows · Compétences & IA · Données & archivage · Publics & communication · Partage & cohérence.
- **Livraison en 3 lots**, chacun sur sa propre branche, avec un squash-merge sur `main` via `git-ship` et un prompt de reprise. Il n'y a pas de `develop` dans ce repo. Le détail est dans la section « Découpage en 3 lots ».

## Constats sur le repo, et ce que j'en réutilise

- Stack : React 19, Vite 7, Wouter (patché), Tailwind 4, shadcn/ui (y compris `drawer` via vaul et `slider`), framer-motion 12, recharts 2. Aucune nouvelle dépendance.
- Routes déclarées dans `client/src/App.tsx`. Le gabarit global (Navigation, PageBreadcrumbs, Footer, BackToTop) est aussi monté dans `App.tsx`. C'est là qu'on le masquera en mode immersif.
- SEO : `shared/seo-pages.json`, `client/src/lib/seo.ts` et `scripts/generate-seo.mjs`. Une route absente du registre est déjà en `noindex`. Le sitemap et `llms.txt` sont générés.
- **Piège Nginx** (`infra/nginx/default.conf:69`) : `try_files … =404`, sans repli SPA. Charger directement `/experience/demo/cinema/3` renverrait aujourd'hui une 404. Il faut donc ajouter une règle dédiée et une page statique.
- API : `services/partner-feedback-api/src/index.ts` (Express 5).
  - On réutilise `consumeRateLimit()` (l. 95), CORS limité à `ALLOWED_ORIGIN` (l. 217) et le modèle `express.raw` + appel Deepgram nova-3 en français (l. 353-371).
  - Ce dernier est aujourd'hui réservé aux invitations : on l'extrait dans une fonction partagée.
  - Config validée par zod dans `src/config.ts`.
- Front API : `client/src/lib/partnerApi.ts` (`PARTNER_API_URL`, `partnerApi<T>()`). Pour l'enregistrement audio, on suit le modèle `VoiceInput` de `client/src/pages/PartnerQuestionnaire.tsx:40-92`.
- Charte : `#515792`, `#E07428`, `#3aab8a`, `#3a7fc1`, `#7ab648`. `PrototypeFrame` dans `client/src/pages/Experience.tsx` sert de référence visuelle.
- L'API de production est en ligne : `/health` répond 200 et Deepgram a été testé (`docs/ETAT_PILOTE_QUESTIONNAIRE_2026-09-03.md`).
- Le script GrainQL est chargé dans `client/index.html`. Son API d'événements personnalisés reste à confirmer dans la documentation GrainQL au moment de l'implémentation.

## Architecture front

### Routage
- Dans `App.tsx`, une seule route `/experience/demo/:rest*` (ou deux routes, `/experience/demo` et `/experience/demo/:persona/:etape`). Elle charge **en différé** `pages/ExperienceDemo.tsx` avec `React.lazy`, pour que recharts et les animations ne pèsent pas sur le reste du site.
- `isDemo = location.startsWith("/experience/demo")` masque Navigation, PageBreadcrumbs, Footer et BackToTop. On garde le lien d'évitement, `SeoMeta` et `ScrollToTop`.
- Valeurs acceptées :
  - `persona` : `cinema` · `scene` · `arts-visuels`.
  - `etape` : `accueil` · `1…N` · `ideal` · `restitution` · `demos` · `futur` · `comparaison` · `avis`.
  - Toute valeur invalide redirige vers `/experience/demo`.
  - Le bouton retour du navigateur fonctionne, puisque chaque étape est une entrée d'historique.
- L'état est **entièrement déduit de l'URL et du JSON**. Le panneau « Ce que la Boussole retient » est la somme de ce qui a été retenu aux étapes précédentes. Une URL partagée ou rechargée s'affiche donc correctement, sans aucun stockage.

### Contenu
- `client/src/data/demo-parcours.json` : tous les textes, conformément au schéma indicatif du PRD.
  - Textes communs : message de confiance, accueil, libellés, fonctions futures, comparaison, écran d'avis.
  - Pour chaque persona : `ordreDimensions`, `etapes[]` avec `type`, `question`, `options`, `reponse`, `retenu.tags` et `retenu.curseurs[{libelle, valeur, corrigeA}]`, `rebond`, `numeriqueResponsable`, `pointEtape{texte, ordreDeGrandeur}`, puis `ideal`, `restitution` et `demos`.
  - Les scripts de l'annexe du PRD sont repris **tels quels**.
- Je complète moi-même les rares trous, que je te signalerai pour relecture :
  - le contenu « retenu » des étapes qui n'en ont pas ;
  - les noms de fichiers des micro-démos ;
  - les liens des pistes, qui pointent uniquement vers des routes existantes (`/ressources` et ses sous-pages).
- `client/src/lib/demoContent.ts` : types TypeScript, chargement du JSON typé et fonctions dérivées. Ces fonctions calculent le cumul retenu jusqu'à une étape, la jauge par dimension et la première étape de chaque dimension pour la barre de progression.

### Composants (`client/src/components/demo/`)
- **`DemoShell`** : bandeau « Démonstration — parcours fictif », en-tête minimal avec « Quitter la démo », et barre de progression.
  - La barre a 5 segments nommés, dans l'ordre du persona, plus « Restitution ». Les segments sont cliquables et le segment courant est mis en avant.
  - Contrôles : Retour, Continuer, « Passer l'animation », « Aller à la restitution ». Sur mobile, ils sont en bas d'écran.
  - Raccourcis clavier : Entrée et Espace font avancer selon la phase, les flèches changent d'étape. Ils sont ignorés quand le focus est dans un champ.
- **`PersonaPicker`** : 3 cartes avec un pictogramme lucide (ligne, pas de photo), le prénom, le métier et l'accroche.
- **`TrustNotice`** : le message de confiance, affiché au début (`accueil`) et repris à l'écran `avis`.
- **`useStepPlayback`** : machine à états d'une interaction. Elle s'enchaîne ainsi :
  1. `question` : la question apparaît en fondu.
  2. `ready` : le bouton « Réponse de [prénom] » est affiché.
  3. `speaking` : la forme d'onde s'anime 1,5 à 3 s.
  4. `transcribing` : le texte s'écrit mot par mot, à environ 30 mots/s ; un clic accélère.
  5. `digesting` : une pulsation de 0,8 s.
  6. `retained` : ce qui est retenu apparaît.
  7. `done`.

  Avec `useReducedMotion` (framer-motion), tout s'affiche d'un coup et l'onde reste statique.
- **Rendu des réponses**, selon le type d'interaction :
  - `ChecklistAnswer` : les cases se cochent une à une.
  - `ScenarioAnswer` : choix A/B/C/D, puis précision à la voix.
  - `InducedSliders` : curseurs qualitatifs à 4 crans (Exploration, Bricolage, Structuré, Fluide), avec une animation visible quand la personne corrige un curseur.
  - `MemoryEcho` : le rebond mémoire, qui met en évidence l'élément cité plus tôt.
- **`Waveform`** (décorative, `aria-hidden`) et **`TypedTranscript`** (accessible : le texte complet est lisible par les lecteurs d'écran).
- **`MilestoneCard`** : le point d'étape, avec la mention « ordre de grandeur illustratif ».
- **`MemoryPanel`** : « Ce que la Boussole retient ». Sur desktop, c'est une colonne droite rétractable. Sur mobile, un bouton flottant « Ce que je retiens (n) » ouvre un tiroir `ui/drawer`. Il a 3 niveaux, de l'extrait surligné à la note taguée puis à la jauge qualitative, et ne s'anime qu'aux étapes marquées.
- **Restitution** :
  - `RestitutionLetter`.
  - `QualitativeRadar` (recharts `RadarChart`) : aucun chiffre affiché, des libellés qualitatifs, un dessin axe par axe, et la phrase « Ce n'est ni bien ni mal… ».
  - `WorksImproves` : chaque point est relié à une phrase citée.
  - `ThreePaths` : les pistes à 2 semaines, 1 mois et 3 à 6 mois.
- **Écrans de fin** :
  - `MicroDemos` : 3 animations de 5 à 10 s, déclenchées au clic (arborescence, tags vers une base, source unique).
  - `FutureFeatures` : grisées, avec un badge « bientôt ».
  - `ComparisonView` : les 3 radars, plus la même question formulée trois fois.
  - `FeedbackForm`.
- **`FeedbackForm`** :
  - Une zone de texte et un micro réel. On passe par `MediaRecorder`, avec 3 min au maximum, arrêt manuel et réécoute via un `<audio>` sur l'URL du blob.
  - Puis on passe par `/transcribe` : la transcription s'affiche dans la zone de texte et reste modifiable.
  - E-mail facultatif et champ caché anti-robots.
  - Si le micro est refusé, la saisie de texte reste possible, sans erreur bloquante.
  - En cas d'erreur d'envoi, le texte est conservé et le message est « L'envoi n'a pas abouti, tu peux réessayer. ».
  - Si `hasPartnerApi()` est faux, un message neutre s'affiche.
- **`client/src/lib/analytics.ts`** : `trackDemoEvent(name, props)` passe par GrainQL si le script est présent et ne fait rien sinon. Il émet les 9 événements du PRD. L'adresse e-mail n'est jamais transmise, seulement un booléen « e-mail : oui/non ».

### Point d'entrée depuis `/experience`
- On ajoute un bloc « Voir une démonstration du parcours → » sous les 4 écrans et en bas de page.
- Le reste de `Experience.tsx` et le menu principal ne changent pas.

### SEO et Nginx
- `shared/seo-pages.json` : on ajoute une entrée `/experience/demo` en `index: false`, avec un titre et une description. `generate-seo.mjs` génère alors `experience/demo/index.html` en `noindex`, hors sitemap et hors `llms.txt`. Il faudra vérifier que le générateur exclut bien les pages `index:false` du sitemap.
- Dans `infra/nginx/default.conf`, on ajoute `location ^~ /experience/demo/ { add_header X-Robots-Tag "noindex" always; try_files $uri /experience/demo/index.html; }`, plus la redirection avec slash final.
- On vérifie ensuite que `/projet`, `/timeline` et `/references` se chargent toujours directement, comme l'exige `CLAUDE.md`.

## API (`services/partner-feedback-api`)

- **`src/config.ts`** : on ajoute `NOTION_TOKEN` et `NOTION_FEEDBACK_DB_ID`, tous deux facultatifs. S'ils manquent, l'endpoint répond 503 avec un message lisible.
- **`src/deepgram.ts`** : on extrait `transcribeAudio(buffer, contentType)` depuis `index.ts:353-371`, que la route d'invitation réutilise sans changer de comportement.
- **`src/demo-feedback.ts`** : fonctions pures, testables.
  - `buildNotionFeedbackPage({persona, mode, comment, email, now})` :
    - titre `AAAA-MM-JJ HH:mm — <Persona>`, en heure Europe/Zurich ;
    - Persona : `cinema` devient Cinéma, `scene` Scène, `arts-visuels` Arts visuels ;
    - Mode : Texte ou Voix ;
    - Commentaire découpé en segments `rich_text` de 2000 caractères au plus, avec un plafond de 5000 ;
    - E-mail seulement s'il est valide ;
    - Suivi = Nouveau.
  - `createNotionPage()` : un `fetch` direct vers `POST https://api.notion.com/v1/pages`, avec l'en-tête `Notion-Version` et le parent `database_id`. Aucun SDK.
- **Routes**, dans le préfixe `/api/public/*` existant :
  - `POST /api/public/demo/transcribe` :
    - `express.raw` avec un plafond de 10 Mo ;
    - limite de 10 envois par heure et par IP ;
    - l'audio ne transite qu'en mémoire et n'est ni journalisé ni stocké.
  - `POST /api/public/demo-feedback` :
    - JSON validé par zod : `{persona, mode, comment (1–5000), email?, website (champ caché)}` ;
    - limite de 5 envois par heure et par IP ;
    - si le champ caché est rempli, on répond 202 sans rien écrire ;
    - aucune écriture PostgreSQL ;
    - réponse : `{message: "Merci, ton avis est bien arrivé."}`.
- **Test** : `scripts/verify-demo-feedback.ts` et un script `test:demo-feedback`, sur le modèle de `verify-response-recap.ts`. Il couvre le découpage, le plafond, le titre, le mapping des personas et l'omission de l'e-mail invalide.

## Contrôle automatique du contenu

`scripts/verify-demo-content.mjs` est ajouté à `pnpm verify`. Pour chaque persona, il vérifie :
- les 5 dimensions, dans l'ordre déclaré ;
- 10 à 12 interactions ;
- un point d'étape par dimension ;
- au moins une correction de curseur (`corrigeA`) ;
- au moins 2 rebonds mémoire ;
- exactement une question sur le numérique responsable ;
- aucun chiffre dans les niveaux du radar, et la mention « illustratif » sur chaque ordre de grandeur ;
- des liens de pistes qui pointent vers des routes existantes.

En PR 1, il ne vérifie que les personas déjà présents.

## Découpage en 3 lots

Chaque lot se déroule ainsi :
- **une session fraîche** en mode Worktree, donc 1 lot = 1 branche = 1 worktree ;
- un livrable déployable ;
- `pnpm verify` au vert ;
- CHANGELOG, STORY, README et `HANDOFF.md` mis à jour dans la branche ;
- puis `git-ship` (commit, push, PR, squash-merge sur `main`).

Après le merge, on vérifie la production. On regarde si Coolify a redéployé en appelant la nouvelle route et `/health` de l'API. Sinon, ce sera ta seule action : « Redeploy » dans Coolify.

En fin de session, l'agent écrit dans `HANDOFF.md` le **prompt de reprise du lot suivant** et te le donne.

**Première tâche du lot 1** : copier ce plan dans `docs/PLAN_DEMO_PLAYBACK_2026-10-14.md`. Cette copie sert de source de vérité versionnée pour les lots suivants, lisible par Claude, Codex et Cursor.

### Lot 1 — Socle et avis réel (v1.4.0) · environ 25 % de l'effort
Contenu :
- **API** :
  - variables Notion dans `config.ts` ;
  - extraction de `deepgram.ts` ;
  - `demo-feedback.ts` ;
  - routes `/api/public/demo/transcribe` et `/api/public/demo-feedback` ;
  - `test:demo-feedback`.
- **Front, socle** :
  - route `/experience/demo/*` chargée en différé et mode immersif dans `App.tsx` ;
  - règle Nginx et entrée SEO en `noindex` ;
  - types `demoContent.ts` et squelette du JSON (textes communs et fiches des 3 personas) ;
  - `verify-demo-content.mjs` branché sur `pnpm verify` ;
  - `analytics.ts`.
- **Écrans** :
  - `DemoShell`, avec la barre de progression déjà alimentée par l'ordre des dimensions ;
  - `PersonaPicker` et `TrustNotice` (`accueil`) ;
  - **`FeedbackForm`** complet (`avis`), avec texte, micro, transcription et e-mail.
  - Les autres étapes affichent un écran « en préparation » propre.
- **Pas de lien depuis `/experience`** pour l'instant. La démo n'est accessible que par son URL directe.
- **Docs** : `config/ENVIRONMENT.md`, `docs/PARTNER_FEEDBACK_OPERATIONS.md` et une archive dans `docs/`.

Ce qu'on vérifie en production :
- `/experience/demo` se charge directement ;
- le choix d'un persona mène à l'accueil puis à l'avis ;
- `/projet`, `/timeline` et `/references` restent intacts.

Tes actions humaines, une à la fois et après le merge :
1. Créer l'intégration Notion « Boussole démo » et la connecter à la base.
2. Ajouter `NOTION_TOKEN` et `NOTION_FEEDBACK_DB_ID` dans le service API sur Coolify.

Ensuite, je fais un envoi de test, avec ton accord.

### Lot 2 — Parcours Claire de bout en bout (v1.4.1) · environ 50 % de l'effort, le plus délicat
Contenu :
- `useStepPlayback`, `Waveform` et `TypedTranscript` ;
- les rendus de réponse : cases, scénario, curseurs induits avec correction, rebond ;
- `MilestoneCard`, `MemoryPanel` (colonne sur desktop, tiroir sur mobile) et les raccourcis clavier ;
- les écrans `ideal`, `restitution` (lettre, radar recharts, ce qui fonctionne, ce qui peut s'améliorer, 3 pistes), `demos` (3 micro-démos) et `futur` ;
- **le script Claire complet dans le JSON** ;
- **les blocs d'appel sur `/experience`** : la démo devient publique avec Claire. Les cartes Marc et Nadia restent visibles et mènent à l'écran « en préparation ».

Ce qu'on vérifie en production : le parcours Claire à 1280 et à 390 px, le clavier et le mode réduit des animations.

Ton action humaine : relire le parcours Claire en ligne et me donner tes retours.

### Révision après la relecture du lot 2 (14 octobre 2026)

La relecture du parcours Claire (v1.4.1) change le concept des scripts pour les trois personas. Les principes, l’échelle (Exploration · Improvisation · Organisé · Orchestré), la trame concret → général → ce qui pèse, les points d’étape repliés et les scripts réécrits sont dans la sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) », qui remplace l’annexe du PRD une fois validée. Le découpage devient : **lot 2bis** (refonte de Claire, de l’échelle et des points d’étape, v1.4.2), puis **lot 3** (Marc, Nadia, comparaison, finitions, v1.4.3). Détail et prompts de reprise dans `HANDOFF.md`.

L’annexe v2 a été validée par Ulrich le 14 octobre 2026 ; le lot 2bis est livré en v1.4.2 (voir [`ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md`](./ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md)), le lot 3 en v1.4.3 (voir [`ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md`](./ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md)) ; les deux avis de test réels sont reportés.

### Lot 3 — Marc, Nadia, comparaison et finitions (v1.4.3 après révision) · environ 25 % de l'effort
Contenu :
- les scripts Marc et Nadia dans le JSON ;
- `ComparisonView` ;
- les corrections issues de ta relecture du parcours Claire ;
- `verify-demo-content` étendu aux 3 personas ;
- le contrôle qualité Playwright complet ;
- l'envoi réel de 2 avis de test ;
- la clôture : documentation finale et mise à jour de la tâche Notion liée.

### Lot 4 — Ressources liées et finitions (v1.5.0) · ajouté le 15 octobre 2026

**Origine** : retour d’Ulrich du 15 octobre 2026 sur l’échange 1 de Marc (capture annotée). Le bloc « La Boussole retient » sous la réponse répète le panneau de droite. Il faut le remplacer par des ressources liées : la conversation ne doit pas « tomber du ciel ». Ce qui est dit s’ancre dans un corpus de recherche traçable, la veille curée par Ulrich depuis un an. Le but est d’apporter de la nuance, d’ouvrir et de donner envie d’en savoir plus, y compris par des pistes de réflexion à creuser.

**Source** : base Notion « Ressources web MW » (`collection://2be51168-2fc3-81f1-89a4-000b12cbfbb4`), relation `Projets Memoways` vers le projet « Boussole Numérique Culture » (`302511682fc38000a31cf63089c76477`). État au 15 octobre 2026 : 321 ressources liées, dont 34 « En ligne », 41 « Interne MW » et 246 « À définir ».

Champs utiles :
- `Titre de la ressource` et `Auteur` ;
- `URL`, la source publique ;
- `Description courte` et `AI summary` ;
- `Labels`, par exemple Philosophie, Société, Artistique, Bonnes pratiques ;
- le corps de la page, qui contient en général le texte de l’article et permet de vérifier une citation exacte.

Les ressources mêlent français et anglais. Beaucoup sont techniques (RAG, agents, Claude Code), et plusieurs URL portent des traceurs de newsletter (`utm_*`, redirections de type `sp1-brevo`).

#### Ce qui change à l’écran

1. **Retrait du bloc « La Boussole retient »** sous la réponse : notes et extrait sont déjà dans le panneau « Ce que la Boussole retient » et surlignés dans la transcription.
   - **On garde, hors de ce bloc**, les curseurs induits avec « {prénom} valide » et la correction animée : c’est la validation humaine (*human in the loop*) du parcours, pas une redite. Ils passent dans un encadré compact « D’après ce que tu dis… », sous la réponse.
   - Sur smartphone, le panneau est dans un tiroir : le bouton « Ce que je retiens (n) » doit signaler visiblement l’ajout (pulsation brève, désactivée en mouvement réduit). L’annonce `aria-live` existante reste.
2. **Nouveau bloc de ressources liées**, sous la réponse, après la réception et avant « Un premier regard ».
   - Libellé à valider : « Pour aller plus loin », « Ressources liées » ou « D’autres regards ».
   - Une ou deux citations courtes, chacune avec son auteur, le titre de la ressource, le média et un lien cliquable « Lire l’article », qui s’ouvre dans un nouvel onglet avec `rel="noopener noreferrer"` et la mention « (nouvel onglet) » pour les lecteurs d’écran.
   - Quand il y a deux citations, elles se répondent : un regard pratique ou factuel, puis une ouverture (philosophique, éthique, sociétale ou artistique) ou un contrepoint qui nuance.
   - Exemple donné par Ulrich : le travail en équipe n’est pas toujours efficace, mais exister ensemble est presque un but en soi, indépendamment du résultat.
3. **Pas à chaque échange** : seulement quand ça fait sens. Proposition : quatre à sept échanges par parcours, jamais deux échanges de suite, au moins une ouverture par parcours.
4. **Restitution** (proposition) : une ligne discrète sous les pistes, « Les citations de ce parcours viennent du corpus de veille du projet », avec un lien vers la page Ressources du site. Les liens des pistes restent limités aux pages Ressources existantes : décision inchangée.

#### Données et contrôles

- **Aucun appel à Notion au runtime** : la démo reste 100 % playback, sans jeton côté client.
- **Catalogue** : un fichier `client/src/data/demo-ressources.json` contient, pour chaque ressource retenue :
  - `id` (identifiant de la page Notion, pour la traçabilité) ;
  - `titre`, `auteur`, `media` ;
  - `url` publique et nettoyée ;
  - `langue`.
- **Étapes** : chaque étape concernée reçoit `ressources: [{ ref, citation, citationOriginale?, role: "pratique" | "ouverture" | "contrepoint" }]`.
- **Citations** :
  - courtes (30 mots au plus), exactes, attribuées et liées à leur source : droit de citation ;
  - une citation d’une source anglaise s’affiche en français avec la mention « traduit de l’anglais », et l’original est conservé dans `citationOriginale` pour vérification.
- **`verify-demo-content`** contrôle :
  - les références existantes ;
  - les URL en `https` sans paramètres de suivi ni redirection de newsletter ;
  - la longueur des citations et `citationOriginale` pour toute langue autre que le français ;
  - au plus deux citations par échange et au plus une ressource par échange ;
  - quatre à sept échanges avec des ressources par parcours, jamais deux de suite, au moins une ouverture ;
  - aucune ressource répétée dans un même parcours.
- **Mesure** : `demo_ressource_ouverte` (persona, échange, ressource), sans donnée personnelle.
- **Playwright** :
  - ancien bloc absent ;
  - curseurs et correction toujours visibles ;
  - ressources aux bons échanges, liens avec `target` et `rel` ;
  - signal du tiroir sur smartphone ;
  - débordement et contraste du nouveau bloc à 1280 et 390 px.

#### Méthode (comme pour l’annexe v2 : contenu validé avant le code)

1. **Présélection par l’agent** avec le connecteur Notion. Pour chaque échange des trois parcours, chercher dans les ressources liées au projet celles qui touchent son enjeu :
   - redondance et source de vérité ;
   - transmission des processus et collaboration ;
   - place de chaque information ;
   - IA utile avec du contexte ;
   - numérique responsable et souveraineté ;
   - médiation et publics ;
   - création artistique.
   
   Puis lire la page pour en extraire une citation exacte, et préférer les sources accessibles (sans paywall).
2. **Sous-page Notion « Annexe v3 — ressources liées par échange »**, sous le PRD : un tableau par parcours avec l’échange, la ressource (lien vers la page Notion et vers la source), la citation, sa traduction, le rôle et la raison du choix, plus deux ou trois candidates de réserve par dimension.
3. **Validation par Ulrich**, qui tranche aussi :
   - les statuts éligibles (proposition : toute ressource liée au projet, la sélection valant validation ; passage de la ressource en « En ligne » dans Notion seulement avec son accord) ;
   - la traduction des citations ;
   - le libellé du bloc ;
   - la ligne de la restitution.
4. **Code**, puis contrôles et livraison.

Le lot 4 intègre aussi les retours d’Ulrich sur Marc, Nadia et la comparaison, et les deux avis de test réels (avec accord). Prompt de reprise dans `HANDOFF.md`.

### Prompt de démarrage du lot 1, à coller dans une session fraîche (Sonnet 5.5, Worktree)

```
Repo memoways/boussole-numerique-recherche. Exécute le LOT 1 « Socle et avis réel » du plan validé
/Users/ulrich/.claude/plans/il-faut-lire-le-functional-abelson.md (lis-le en entier, ainsi que AGENTS.md).
Source fonctionnelle : PRD Notion 87b186ac43774c24b787c5f24738dbc6 (connecteur Notion, workspace 377e8583-…).
Décisions déjà prises : avis vocal = transcrire → relire → envoyer ; mode immersif ; libellés de dimensions du PRD ;
aucune écriture PostgreSQL pour les avis.
1) Copie le plan dans docs/PLAN_DEMO_PLAYBACK_2026-10-14.md.
2) Implémente uniquement le périmètre du lot 1 (ne fais pas les lots 2-3).
3) pnpm verify + test:demo-feedback + contrôle Playwright 1280/390 + docker build/run (accès direct à /experience/demo/*,
   /projet, /timeline, /references).
4) CHANGELOG v1.4.0, STORY, README, HANDOFF.md (avec le prompt de reprise du lot 2), puis git-ship (squash-merge sur main).
5) Vérifie la prod ; si Coolify n'a pas redéployé, donne-moi une seule action. Puis guide-moi pour l'intégration Notion
   et les variables Coolify, une action à la fois.
```

## Modèle et mode recommandés

| Lot | Modèle | Effort | Pourquoi |
|---|---|---|---|
| 1 Socle et avis | **Sonnet 5.5** | medium | Infrastructure et API bien spécifiées, motifs existants à recopier. |
| 2 Claire | **Opus 5.5** | high | Machine à états, animations, accessibilité, fidélité au ton du PRD : c'est là que la qualité se joue. |
| 3 Marc, Nadia, finitions | **Sonnet 5.5** | medium | Surtout du contenu JSON repris de l'annexe et la réutilisation du moteur. Repasser sur Opus seulement si la relecture du lot 2 demande des refontes du moteur. |
| 4 Ressources liées et finitions | **Opus 5.5** | high | Curation éditoriale (choisir, citer, traduire, nuancer) dans un corpus de 321 ressources, puis retouche du moteur de lecture : le jugement compte plus que le volume de code. |

Mode : session Claude Code en **Worktree**, avec permissions **Accepter les modifications automatiquement** (acceptEdits). Pas de mode Plan, puisque le plan est déjà validé et versionné. Fast mode inutile.

## Vérification

- `pnpm verify` : TypeScript portail et API, build, SEO, bundle API et `verify-demo-content`. Plus `pnpm --filter @boussole/partner-feedback-api test:demo-feedback`.
- En local, avec `pnpm dev` et `dev:partner-api` (docker-compose pour PostgreSQL, requis au démarrage de l'API), contrôles Playwright à 1280 et à 390 px :
  - le parcours de bout en bout, sans erreur console ;
  - les sauts de chapitre, le rechargement direct d'une étape et le bouton retour du navigateur ;
  - la navigation au clavier ;
  - le mode réduit des animations avec `emulateMedia({reducedMotion})` ;
  - le tiroir mobile ;
  - aucun débordement horizontal ;
  - les contrastes, avec `scripts/check-contrast.mjs`.
- Docker local (`docker build` et `docker run`) : un chargement direct de `/experience/demo/cinema/5` renvoie 200 avec `noindex`, et `/projet`, `/timeline` et `/references` restent intacts.
- Envoi réel, après la configuration Notion et avec ton accord avant d'écrire dans la base :
  - 1 avis texte sans e-mail et 1 avis vocal avec e-mail, marqués « TEST » ;
  - on vérifie Persona, Mode, le découpage et Suivi = Nouveau dans « Retours démo Boussole » ;
  - on confirme que rien n'est écrit dans PostgreSQL et que le jeton n'apparaît ni dans le bundle front ni dans le repo.
- Pour clore : mise à jour de la tâche Notion liée (branche, PR, statut) via le connecteur Notion.

## Risques

- **Volume de contenu** : c'est pour cela qu'on livre le parcours Cinéma en premier.
- **Micro sur iOS** : le texte reste toujours possible.
- **API d'événements GrainQL** : à confirmer. À défaut, le wrapper ne fait rien et la démo fonctionne quand même.

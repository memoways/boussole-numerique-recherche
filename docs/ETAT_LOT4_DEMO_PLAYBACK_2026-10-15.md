# État du lot 4 — démo playback : ressources liées et finitions (v1.5.0)

> 15 octobre 2026. Plan : section « Lot 4 » de [`PLAN_DEMO_PLAYBACK_2026-10-14.md`](./PLAN_DEMO_PLAYBACK_2026-10-14.md). Lot précédent : [`ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md`](./ETAT_LOT3_DEMO_PLAYBACK_2026-10-14.md). Source fonctionnelle : sous-page Notion « Annexe v3 — ressources liées par échange » (`3fa511682fc381de8faefae21f4bc741`), validée par Ulrich le 15 octobre 2026 (sélection, traductions, libellé « D’autres regards », ligne de restitution).

## Livré

| Zone | Contenu |
|---|---|
| « D’autres regards » | `RelatedResources.tsx`, affiché sous la réponse une fois l’échange joué, avant « Un premier regard ». Une ou deux citations : citation entre guillemets tenus par des espaces insécables, auteur, média, mention « traduit de l’anglais » si besoin, titre de la source, lien « Lire l’article » (`target="_blank"`, `rel="noopener noreferrer"`, « (nouvel onglet) » pour les lecteurs d’écran). |
| Sélection | Claire : échanges 2, 6, 8 (deux citations), 10, 12. Marc : 1 (deux), 3, 5, 10 (deux). Nadia : 4, 6, 8 (deux), 10. Soit 13 échanges et 17 citations, 12 ressources. |
| Données | `client/src/data/demo-ressources.json` (catalogue : `id`, `notionId`, titre, auteur, média, URL publique nettoyée, langue, statut éditorial pour mémoire) et champ `ressources` des étapes (`ref`, `citation`, `citationOriginale` pour les sources anglaises, `role` : `pratique`, `ouverture` ou `contrepoint`). Aucun appel à Notion au runtime. |
| Bloc retiré | « La Boussole retient » sous la réponse disparaît, avec son libellé `retenuTitre`. Notes et extrait restent dans le panneau et surlignés dans la transcription ; l’annonce `aria-live` est inchangée. |
| Validation humaine | Les curseurs induits et « {prénom} valide. » passent dans un encadré « D’après ce que tu dis… » sous la réponse ; la correction de curseur des étapes `curseurs` reste affichée. |
| Tiroir mobile | Le bouton « Ce que je retiens (n) » pulse brièvement quand des éléments s’ajoutent (`data-pulses` pour le contrôle) ; rien en mouvement réduit. |
| Restitution | Sous les pistes : « Les citations de ce parcours viennent du corpus de veille du projet. » et lien « Voir les ressources » vers `/ressources`. Les pistes restent liées aux seules pages Ressources. |
| Mesure | `demo_ressource_ouverte` : persona, échange, identifiant de la ressource. |

## Écriture reprise (retours d’Ulrich du 15 octobre 2026)

Consigne : bannir « concret » et les tournures « ce n’est pas X, c’est Y » ; phrases courtes, sans remplissage ni répétition, dans l’esprit d’un quotidien. Réplique des personas modifiée seulement là où la tournure apparaissait.

### Marc

- Premier regard « Partage » : « Ton équipe se parle beaucoup, et ça marche. Il manque des traces pour les absents. Aujourd’hui, toute la transmission repose sur toi. »
- Premier regard « Publics » : « Tes programmateurs, tu les connais et tu leur écris. Les répétitions, les essais et les choix, eux, ne laissent aucune trace. Or c’est ce qu’on te demande de raconter. »
- Premier regard « Données » : « La fiche de ta régisseuse fait foi. Elle peut servir de modèle aux autres documents. Le souci vient des copies qui s’en éloignent. »
- Premier regard « Outils » : « Le Sheets partagé tient la route. WhatsApp sert d’outil de suivi, mais il oublie tout. Horaires, besoins techniques et contacts gagneraient à vivre au même endroit. »
- Premier regard « Compétences » : « Cette tâche revient chaque semaine, et ses informations existent déjà. Un outil peut s’en charger. Une IA rédigerait ce mail en quelques secondes, si elle sait où chercher. »
- Réplique de l’échange 9 : « Mais ce qui me pèse le plus, c’est qu’une info importante se noie entre deux blagues. » (au lieu de « ce n’est même pas ça : c’est… »).
- Notes : « processus de création, matière de médiation », « WhatsApp, une coordination sans mémoire ».
- Lettre de restitution réécrite en phrases courtes, même contenu, fil rouge conservé.
- Pistes et textes des trois micro-démos raccourcis, sans changement de sens.

### Nadia

- Échange 4 : « Tu dis que c’est politique. Un numérique responsable, pour toi, ça veut dire quoi ? »
- Premiers regards : « Ton inventaire fait référence. Bien des institutions n’en ont pas d’aussi rigoureux. Il lui manque les textes qui accompagnent les œuvres. » ; « Tes choix sont cohérents, et tu sais où sont tes données. Peu de gens peuvent en dire autant. Ta question sur leur effet réel reste ouverte, et il existe des façons d’y répondre. » ; « Ton inventaire contient déjà tout ce qu’il faut pour un portfolio. Ce qui te coûte, c’est de le recopier à chaque demande. » ; « Ta prudence se comprend. Certaines solutions respectent tes critères, et ton inventaire leur donnerait le contexte qui leur manque. » ; « Pour les œuvres, ton système est assez clair pour qu’un proche s’en serve. C’est rare. Il manque les textes. »
- Note : « ouverte à l’IA, si tout reste chez elle ».
- Lettre de restitution : « trésor », « exactement l’idée » et « non par manque d’envie, mais par manque de temps » disparaissent.
- Micro-démo « Où va quoi » : la légende courte reste dans l’inventaire (nouvel élément « Légendes courtes »), les textes longs vont dans des documents liés aux numéros. Cela lève la nuance signalée au lot 3.

### Comparaison et textes communs

- Titre : « Une Boussole, trois conversations. » Texte : « Elle part de ton métier et de tes mots. Elle commence là où tu as le plus à dire. » Sous-titre : « {dimension} : une même dimension, trois questions ».
- Phrase sous les radars (restitution et comparaison) : « Ni bien ni mal. Un point de départ. »
- Accueil : « très concrètement » retiré.
- Claire (v2 validée, retouches minimales) : premiers regards « Outils » (« La difficulté tient aux copies qui circulent. ») et « Données » (« Reste à décider quel endroit fait foi. ») ; réplique de l’échange 7 (« Le plus pénible, c’est de reconstituer qui a validé quoi. »).

## Contrôles réalisés

- `pnpm verify` (TypeScript portail et API, contenu de la démo, build, SEO-GEO, bundle API) et `pnpm test:demo-feedback` : au vert.
- `verify-demo-content` vérifié par 17 mutations, chacune refusée avec un message explicite : ressource inconnue, citation de plus de 30 mots, source anglaise sans original, source française avec original, deux échanges consécutifs, trois citations, ressource répétée, rôles inversés, moins de quatre échanges, aucune ouverture, mot « concret », tournure « ce n’est pas X, c’est Y », ancien libellé, URL avec traceur, redirection de newsletter, URL en `http`, ressource orpheline.
- `scripts/check-contrast.mjs` : nouvelles paires en AA sur blanc (`#3F4475` 9,15 ; `#0F172A` 17,85 ; bleu, gris 700 et 600 déjà couverts).
- Playwright (`pnpm check:demo-playback`), sur le build servi par Nginx (622 contrôles, 0 échec) et sur le serveur de développement (628, 0 échec ; les 6 de plus sont les notes sur l’avertissement préexistant du fil d’Ariane) :
  - les trois parcours à 1280 et 390 px, sans erreur console ni débordement ;
  - à chaque échange : ancien bloc absent, encadré des curseurs induits aux seuls échanges concernés, « D’autres regards » aux seuls échanges prévus, autant de citations que de liens, liens en `https` avec `target` et `rel`, titre du bloc ;
  - un clic sur « Lire l’article » ouvre la source dans un nouvel onglet sans quitter l’échange, et émet `demo_ressource_ouverte` avec trois propriétés seulement ;
  - signal du tiroir sur smartphone ; en mouvement réduit, compteur mis à jour sans pulsation et citations affichées dès la fin de la réponse ;
  - restitution : phrase sous le radar et ligne sur l’origine des citations avec le lien vers `/ressources`.
- Nginx (Homebrew, même `infra/nginx/default.conf`, racine sur `dist/public`, port 18095) : `/experience/demo`, échanges, comparaison, restitution et avis en 200 avec `X-Robots-Tag: noindex, follow` ; `/experience/demo/` en 308 ; `/experience`, `/projet`, `/timeline`, `/references`, `/ressources` en 200 ; route inconnue en 404.
- Avis de test réels, envoyés avec l’accord d’Ulrich le 15 octobre 2026 à l’API de production, puis vérifiés dans « Retours démo Boussole » :
  - vocal, parcours de Marc : audio de synthèse transcrit par `POST /api/public/demo/transcribe` (200), puis avis envoyé (200). Dans Notion : Persona Scène, Mode Voix, transcription complète, Suivi Nouveau (`3fa511682fc381318700c01a096f86b3`) ;
  - écrit avec e-mail, parcours de Nadia (200). Dans Notion : Persona Arts visuels, Mode Texte, e-mail renseigné, Suivi Nouveau (`3fa511682fc381ca97b4edfbc915b394`).
  - Les deux commentaires commencent par « TEST — » et peuvent être supprimés.
- Sources : chaque citation retrouvée mot pour mot sur la page publique le 15 octobre 2026 ; les quatre articles Medium et UX Collective refusent `curl` (protection anti-robots) mais s’ouvrent dans un navigateur, sans réserve aux membres.

## Écarts et points connus

- Le contrôle Playwright ne charge pas les sources externes : il intercepte leurs domaines et vérifie l’ouverture de l’onglet. La disponibilité des URL publiques est vérifiée à la main lors de la sélection.
- Le corpus ne contient presque rien sur la sobriété numérique ou la souveraineté des données au sens strict ; les échanges sur le numérique responsable s’appuient sur Marie Dollé et 7 Gold Agency.
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`) sur `/experience` en développement.
- Non réalisé : `docker build` / `docker run` (Docker absent) ; tests sur iOS Safari et Android Chrome réels.
- Le contrôle Playwright a utilisé `CHROME_BIN` vers `chromium_headless_shell-1228`.

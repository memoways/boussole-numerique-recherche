# État du lot 2bis — démo playback, refonte du parcours Claire (v1.4.2)

> 14 octobre 2026. Plan : [`PLAN_DEMO_PLAYBACK_2026-10-14.md`](./PLAN_DEMO_PLAYBACK_2026-10-14.md). Lot précédent : [`ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md`](./ETAT_LOT2_DEMO_PLAYBACK_2026-10-14.md). Source fonctionnelle : sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) » (`3f9511682fc38129a3f6c4224c22f62c`), validée par Ulrich le 14 octobre 2026, section 2 (Claire) et sections 0, 1, 6 et 7.

## Livré

| Zone | Contenu |
|---|---|
| Script de Claire | 12 échanges dans `demo-parcours.json`, repris tels quels de l’annexe v2 : Outils (2), Données (3), Partage (2), Compétences (3), Publics (2), puis numérique idéal et restitution. Trame concret → général → ce qui pèse ; correction de curseur à l’échange 4 (Sauvegarde des médias : Improvisation → Organisé) ; rebonds aux échanges 7 et 12 ; numérique responsable à l’échange 10. |
| Échelle | `niveauxRadar` : Exploration · Improvisation · Organisé · Orchestré. `niveauxDefinitions` : une définition par niveau, affichée sous le radar (« Ce que veulent dire les niveaux »), en aide repliable sous les curseurs et au survol des jauges du panneau. |
| Un premier regard | `MilestoneCard` devient un bloc repliable, fermé par défaut, sous le dernier échange de chaque dimension (échanges 2, 5, 7, 10, 12). Bouton avec `aria-expanded` et `aria-controls`, libellé « Lire » / « Replier ». Une fois ouvert, il défile au-dessus de la barre de commandes du smartphone. Chaque ouverture émet `demo_regard_ouvert` (`persona`, `etape`, `dimension`). |
| Restitution | Lettre de 9 phrases, radar (Outils Organisé, les autres Improvisation sauf Compétences Exploration), « Ce qui fonctionne », « Ce qui pourrait être plus léger » (chaque point relié à une phrase dite), trois pistes sur la source de vérité, la transmission des processus et une base film structurée. |
| Micro-démos | Trois nouveaux gabarits dans `MicroDemos.tsx` : `convergence` (« Une info, cinq endroits »), `tri` (« Où va quoi »), `validation` (« Valider sans allers-retours »). `fiche` et `source-unique` restent disponibles pour Marc et Nadia ; `arborescence` (nommage) est retiré. |
| Marqueur « ce qui pèse » | `"pese": true` sur l’échange où la personne dit ce qui lui pèse, au moins un par dimension. Non affiché : il sert au contrôle du contenu et à la relecture des scripts. |
| Clavier | `summary` rejoint la liste des éléments interactifs ignorés par les raccourcis : ouvrir l’aide des niveaux au clavier ne lance pas la réponse. Le bouton du premier regard s’ouvre et se replie avec Entrée ou Espace sans changer d’étape. |
| Typographie | Guillemets des transcriptions et points-virgules tenus par des espaces insécables (plus de « » » seul en début de ligne). |

## Contenu complété pour relecture

Le script de l’annexe v2 est repris mot pour mot (typographie du site). Ce que j’ai complété ou interprété :

1. **« Ce qui pèse » en Compétences** : l’annexe ne marque aucun échange « ce qui pèse » dans cette dimension. J’ai marqué l’échange 9, dont la réponse le dit (« Du coup je ne délègue pas, ou je délègue et je refais derrière. »). Les autres : échanges 2, 5, 7 et 12, marqués « ce qui pèse » dans l’annexe.
2. **Cibles des rebonds** : l’échange 7 (« Tu parlais de la fiche technique qui existe en plusieurs versions ») cite la note « même information à plusieurs endroits » de l’échange 3 ; l’échange 12 (« chaque correction se fait à la main ») cite la note « correction à la main dans chaque document » de l’échange 5.
3. **Panneau à chaque échange** : l’annexe donne un « retenu » pour chacun des 12 échanges ; le panneau s’anime donc à chaque étape. Le contrôle « jamais à chaque étape » du lot 2 est retiré ; « au moins une étape sur deux » reste.
4. **Extraits surlignés** : uniquement ceux de l’annexe (échanges 1, 3, 5, 6, 8, 12). Les échanges 2, 4, 7, 9, 10 et 11 retiennent des curseurs ou des notes, sans extrait, comme dans l’annexe.
5. **Cases de l’échange 11** : « Dossier de presse » et « Festivals » de l’annexe correspondent aux options « Dossier de presse PDF » et « Festivals et marchés ».
6. **Citations de la restitution** : passages exacts des réponses (échanges 4, 9 et 2 pour ce qui fonctionne ; 3, 7 et 6 pour ce qui pourrait être plus léger). L’ordre de grandeur « une fiche recopiée dans quatre à six documents » accompagne le premier point.
7. **Liens des pistes** (section 7 : pages Ressources existantes uniquement) : 2 semaines → `/ressources` ; 1 mois → `/ressources/etude-complete` (repères sur l’IA) ; 3–6 mois → `/ressources/references-inspirantes`.
8. **Valeurs fictives des micro-démos**, de ma main : durées (14 min, 15 min 30, 16 min), « générique de janvier / mars / juin », « synopsis de mars / juin / du dépôt », la fiche de référence « Fiche film — le court » ; objets des cinq mails visibles et les trois lignes d’historique de la démo de validation ; textes d’introduction des trois micro-démos.
9. **Libellés d’interface** : « Lire » / « Replier » pour le premier regard ; « Ce que veulent dire les niveaux » pour les définitions.
10. **Non modifiés, à relire** : l’accroche de Claire (« Deux films en parallèle, et des pièces jointes partout. ») et le texte d’accueil commun (« tes outils, tes fichiers, ta façon de faire »), que l’annexe ne réécrit pas.

## Contrôles réalisés

- `pnpm verify` (TypeScript portail et API, contenu de la démo, build, SEO-GEO, bundle API) et `pnpm test:demo-feedback` : au vert.
- `verify-demo-content` vérifié par mutations : retirer « ce qui pèse » d’une dimension, déplacer un premier regard, réintroduire « Bricolage », marquer l’entrée concrète comme « ce qui pèse » ou casser la micro-démo de convergence fait échouer le contrôle avec un message explicite.
- `scripts/check-contrast.mjs` : nouvelles paires en AA (bleu `#515792` sur `#F8FAFC` 6,42 ; gris `#334155` sur `#F8FAFC` 9,90 ; gris `#475569` sur blanc 7,58 et sur `#F8FAFC` 7,24).
- Playwright (`pnpm check:demo-playback`, 105 contrôles), sur le serveur de développement puis sur le build servi par Nginx :
  - parcours complet à 1280 et 390 px, sans erreur console ni débordement horizontal ;
  - premier regard présent aux échanges 2, 5, 7, 10 et 12 seulement, replié par défaut (aucun ordre de grandeur visible) ; ouvert au clic, Entrée et Espace le replient et le rouvrent sans changer d’étape ; `demo_regard_ouvert` émis à chaque ouverture, pas aux replis (GrainQL remplacé par un enregistreur dans ce test) ;
  - correction de curseur à l’échange 4, libellés de l’échelle sans chevauchement à 390 px, rebonds aux échanges 7 et 12 ;
  - aide des niveaux repliée sous les curseurs, ouverte au clavier sans lancer la réponse ;
  - restitution : radar sans chiffre, définitions des quatre niveaux, « Ce qui pourrait être plus léger », trois pistes ; trois micro-démos jouées ; cinq fonctions futures ;
  - sauts de chapitre, rechargement direct de l’échange 7 (panneau cumulé, curseur corrigé, élément cité mis en évidence, jauges), bouton retour, clavier, `reducedMotion: reduce`, tiroir mobile ;
  - redirections : étape 13 vers le choix du persona, persona inconnu, comparaison (écran dédié en attendant le lot 3), Marc et Nadia en préparation.
- Nginx (Homebrew, même `infra/nginx/default.conf`, racine sur `dist/public`, port 18093) : accueil, échanges 1 à 12, `ideal`, `restitution`, `demos`, `futur`, `comparaison`, `avis` de Claire et `/experience/demo/scene/3`, `/experience/demo/arts-visuels/accueil` en 200 avec `X-Robots-Tag: noindex, follow` ; `/experience/demo/` en 308 ; `/experience`, `/projet`, `/timeline`, `/references` en 200 ; route inconnue en 404 ; démo absente du sitemap.

## Écarts et points connus

- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`) sur `/experience` en développement.
- Non réalisé : `docker build` / `docker run` (Docker absent de la machine de développement).
- Test sur iOS Safari et Android Chrome réels : à faire lors de la relecture de Claire v2.

## Reste à faire (lot 3)

Retours d’Ulrich sur Claire v2, scripts de Marc et de Nadia (annexe v2, sections 3 et 4) avec leurs micro-démos, `ComparisonView` (section 5), contrôles sur les trois personas, deux avis de test réels (avec accord), clôture documentaire et tâche Notion liée.

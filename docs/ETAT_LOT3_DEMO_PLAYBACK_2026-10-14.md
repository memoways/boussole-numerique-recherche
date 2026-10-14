# État du lot 3 — démo playback : Marc, Nadia, comparaison (v1.4.3)

> 14 octobre 2026. Plan : [`PLAN_DEMO_PLAYBACK_2026-10-14.md`](./PLAN_DEMO_PLAYBACK_2026-10-14.md). Lot précédent : [`ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md`](./ETAT_LOT2BIS_DEMO_PLAYBACK_2026-10-14.md). Source fonctionnelle : sous-page Notion « Annexe v2 — scripts des 3 parcours (principes révisés) » (`3f9511682fc38129a3f6c4224c22f62c`), validée par Ulrich le 14 octobre 2026, sections 3 (Marc), 4 (Nadia) et 5 (comparaison).

## Livré

| Zone | Contenu |
|---|---|
| Parcours de Marc | 11 échanges dans `demo-parcours.json`, repris de l’annexe v2 : Partage (3), Publics (2), Données (2), Outils (2), Compétences (2), puis numérique idéal et restitution. Correction de curseur à l’échange 7 (Fiches techniques : Improvisation → Organisé), rebonds aux échanges 5 et 11, numérique responsable à l’échange 9. Statut `pret`. |
| Parcours de Nadia | 10 échanges, repris de l’annexe v2 : Données (2), Outils (2), Publics (2), Compétences (2), Partage (2). Correction de curseur à l’échange 6 (Présence en ligne : Exploration → Improvisation), rebonds aux échanges 4 et 8, numérique responsable à l’échange 4. Statut `pret`. |
| Micro-démos | Marc : « Une décision, une trace » (nouveau gabarit `note` : trois phrases dictées deviennent une note de répétition structurée, puis partagée), « Une source pour la tournée » (`fiche`), « Une info, plusieurs copies » (`convergence`). Nadia : « Inventaire → portfolio, page web et dossier » (`fiche`), « Où va quoi » (`tri`), « Les textes rejoignent l’inventaire » (`source-unique`). |
| Comparaison | `ComparisonView` entre `futur` et `avis` : titre et texte de la section 5, puis une carte par persona avec sa question d’entrée sur Données & archivage (tirée du script, avec lien vers l’échange), son radar et ses cinq niveaux. Les trois radars suivent le même ordre d’axes. Le parcours suivi est signalé ; les deux autres ont un bouton « Voir le parcours de… ». Sur grand écran, les cartes partagent leurs lignes (subgrid) : questions, radars et boutons s’alignent. |
| Navigation | `getStepSequence` insère `comparaison` quand les trois parcours sont jouables ; le bouton de l’écran « futur » devient « Comparer les trois parcours ». L’écran « en préparation » de la comparaison reste en repli si un persona repasse « en-preparation ». |
| Contrôles du contenu | `verify-demo-content` s’applique aux trois personas ; nouveaux contrôles des gabarits `note`, `fiche` (les éléments ne visent que les sorties déclarées) et `source-unique`, des textes de la comparaison, d’une question d’entrée distincte par persona sur la dimension comparée et du bouton de l’écran « futur ». |
| Contrôle Playwright | `check-demo-playback` rejoue les trois parcours à 1280 et 390 px avec des repères par persona (premiers regards, rebonds, correction, tiroir), puis la comparaison ; ajoute le rechargement direct sur les rebonds de Marc et Nadia, un saut de chapitre chez Nadia, les liens et le clavier de la comparaison, le mouvement réduit sur la note dictée et les radars, et les redirections des étapes absentes. |

## Contenu complété pour relecture

L’annexe v2 est reprise mot pour mot (typographie du site). Ce que j’ai complété ou interprété :

### Marc

1. **« Ce qui pèse » en Données** : l’annexe n’en marque pas ; j’ai marqué l’échange 7 (« Le problème, ce sont les copies qui ne la suivent pas. »). Les autres suivent l’annexe : échanges 3, 5, 9 et 11.
2. **Rebond de l’échange 11** (« Tu parlais du planning dans le Sheets ») : il cite l’extrait « un Google Sheets, partagé avec l’administratrice », que j’ai ajouté au « retenu » de l’échange 8 (l’annexe n’y donne que des notes ; la note « Sheets partagé ✓ » est conservée). Le rebond de l’échange 5 cite la note « processus de création non raconté » de l’échange 3.
3. **Échange 10** (IA, choix B) : l’annexe ne donne pas de « retenu ». Ajout : extrait « je ne sais même pas quoi lui demander », note « curiosité pour l’IA, sans point d’entrée ».
4. **Échange 9** : la note « tension valeurs / pratique (sans jugement) » devient « tension entre valeurs et pratique » ; la parenthèse est une consigne de ton, pas un texte à afficher.
5. **Options du scénario IA** : celles de Claire, au masculin (« sans être sûr de bien m’en servir »).
6. **Citations de la restitution** : passages exacts des échanges 1, 4 et 7 pour ce qui fonctionne, 1, 6 et 11 pour ce qui pourrait être plus léger. L’ordre de grandeur « deux dates de tournée pour intégrer une nouvelle personne » accompagne « Des décisions sans trace ».
7. **Liens des pistes** (pages Ressources existantes) : 2 semaines → `/ressources` ; 1 mois → `/ressources/etude-complete` (IA) ; 3–6 mois → `/ressources/references-inspirantes`.
8. **Valeurs fictives des micro-démos**, de ma main : les trois phrases dictées (« Scène quatre : on coupe la fin du monologue… », noir après la dernière réplique, prévenir l’éclairagiste et la régisseuse), les champs de la note (Décision, Pour qui, Scène 4) et la mention « Note partagée avec l’équipe » ; les cinq lignes du tableau de tournée (dates et lieux, horaires d’arrivée, besoins techniques, nombre de personnes, hôtels) ; les valeurs de la fiche technique (ouverture 8 ou 10 m, montage 2 ou 3 services, 18, 20 ou 24 projecteurs) ; les textes d’introduction des trois micro-démos.

### Nadia

1. **« Ce qui pèse »** : l’annexe en marque deux (Publics, échange 6 ; Partage, échange 10). J’ai choisi l’échange 2 en Données (« ils sont un peu partout »), l’échange 4 en Outils (« je ne sais pas toujours si mes choix ont vraiment l’effet que je crois ») et l’échange 8 en Compétences (« il faudrait que mes textes soient au même endroit que l’inventaire »).
2. **Rebonds** : ajout des extraits « C’est politique. » (échange 3) et « Ne pas dépendre. » (échange 4), que citent les rebonds des échanges 4 et 8.
3. **« Retenu » complétés** (l’annexe n’en donne pas) : échange 5 (extrait « je recopie les légendes depuis le tableur », note « portfolio refait à chaque demande ») ; 6 (extrait « refaire toujours la même chose à la main », en plus des curseurs) ; 7 (extrait « Et mes images partent où ? », note « prudence sur la circulation des images ») ; 8 (extrait ci-dessus) ; 9 (extrait « avec le tableur, il saurait », note « textes introuvables sans elle ») ; 10 (extrait « je n’ai pas le temps de refaire un site, ni de tout recopier encore une fois », note « envies claires, temps manquant »).
4. **Échange 6** : les deux répliques de l’annexe (la correction, puis « Instagram, non… ») forment une seule transcription.
5. **Options du scénario IA** (« options A–D » dans l’annexe) : celles de Claire.
6. **Citations de la restitution** : échanges 1, 2 et 3 pour ce qui fonctionne, 2, 5 et 7 pour ce qui pourrait être plus léger ; l’ordre de grandeur « une soirée par portfolio » accompagne « Des portfolios refaits à la main ».
7. **Liens des pistes** : 2 semaines → `/ressources` ; 1 mois (portfolio depuis le tableur, outil libre) → `/ressources/analyse-outils` ; 3–6 mois (IA locale) → `/ressources/etude-complete`.
8. **Valeurs fictives des micro-démos** : colonnes de l’inventaire et sorties (Portfolio PDF, Page web, Dossier de résidence ; le prix ne part que dans le portfolio) ; éléments du tri (« Textes de présentation », « Textes de dossier ») ; les quatre pièces éparses et la destination « Inventaire · œuvre n° 2014-07 » ; textes d’introduction.
9. **À relire** : la micro-démo « Où va quoi » range les textes dans des documents liés aux numéros (annexe), alors que la piste à 2 semaines ajoute une colonne Légende à l’inventaire (annexe aussi). Les deux restent cohérents (la légende courte dans l’inventaire, les textes longs à côté), mais la nuance n’est pas dite à l’écran.

### Communs

1. **Question du numérique idéal** : l’annexe ne donne que les réponses de Marc et de Nadia ; la question est celle de Claire.
2. **Comparaison** : le texte de la section 5 est coupé en titre (« Même Boussole, trois conversations différentes. ») et texte d’introduction. Libellés ajoutés : « Comparaison » (surtitre), « Données & archivage : la même dimension, formulée trois fois », « Sa photo », « Le parcours que tu as suivi », « Voir le parcours de {prénom} », « échange {n} », et le bouton « Comparer les trois parcours » sur l’écran « futur ». La phrase « Ce n’est ni bien ni mal : c’est ton point de départ. » est reprise sous les radars.
3. **Claire v2** : aucune modification. Les retours d’Ulrich n’ont pas été transmis ; il a confirmé de poursuivre sans retour.

## Contrôles réalisés

- `pnpm verify` (TypeScript portail et API, contenu de la démo, build, SEO-GEO, bundle API) et `pnpm test:demo-feedback` : au vert.
- `verify-demo-content` vérifié par mutations : retirer « ce qui pèse » d’une dimension de Marc, marquer l’entrée concrète de Nadia comme « ce qui pèse », réduire la note dictée à une phrase, viser une sortie inconnue dans la fiche de Nadia, fausser un rappel de rebond, ajouter une seconde question de numérique responsable, changer la dimension comparée, remettre « Donner mon avis » sur l’écran « futur » ou altérer une citation font échouer le contrôle avec un message explicite.
- `scripts/check-contrast.mjs` : nouvelles paires en AA (badge `#515792` sur `#EEEEF4` 5,81 ; contours `#A8440D` 6,00 et `#167A5E` 5,28 sur blanc).
- Playwright (`pnpm check:demo-playback`), sur le serveur de développement puis sur le build servi par Nginx : 330 contrôles, 0 échec.
  - les trois parcours complets à 1280 et 390 px, sans erreur console ni débordement horizontal ;
  - premiers regards présents uniquement en fin de dimension et repliés par défaut, rebonds aux bons échanges et seulement là, correction de curseur et libellés de l’échelle sans chevauchement, tiroir mobile ;
  - restitution, trois micro-démos jouées par persona, fonctions futures ;
  - comparaison : trois radars, trois formulations, aucun chiffre, parcours suivi signalé, liens vers les deux autres parcours ; accès direct, lien « Voir le parcours de Nadia », flèches futur ← comparaison → avis ;
  - Claire (inchangée) : sauts de chapitre, rechargement direct, bouton retour, clavier, mesure `demo_regard_ouvert`, aide des niveaux ;
  - mouvement réduit : note dictée complète dès le clic, radars de la comparaison immédiats ;
  - redirections : étape 13 de Claire, étape 12 de Marc et 11 de Nadia (absentes) vers l’accueil du parcours, persona inconnu.
- Nginx (Homebrew, même `infra/nginx/default.conf`, racine sur `dist/public`, port 18094) : `/experience/demo`, accueil et échanges de Marc et Nadia, `ideal`, `restitution`, `demos`, `futur`, `comparaison` des trois personas et `avis` en 200 avec `X-Robots-Tag: noindex, follow` ; `/experience/demo/` en 308 ; `/experience`, `/projet`, `/timeline`, `/references`, `/ressources/analyse-outils` en 200 ; route inconnue en 404 ; démo absente du sitemap.

## Écarts et points connus

- **Avis de test réels non envoyés** : Ulrich a choisi de les reporter. Restent à envoyer, avec son accord : un avis vocal et un avis avec e-mail, marqués « TEST », vérifiés dans « Retours démo Boussole ».
- Préexistant, hors démo : avertissement React du fil d’Ariane (`<li>` dans `<li>`, `PageBreadcrumbs.tsx`) sur `/experience` en développement.
- Non réalisé : `docker build` / `docker run` (Docker absent de la machine de développement) ; tests sur iOS Safari et Android Chrome réels.
- Le contrôle Playwright a utilisé `CHROME_BIN` vers `chromium_headless_shell-1228` (Playwright attend la révision 1234, absente).

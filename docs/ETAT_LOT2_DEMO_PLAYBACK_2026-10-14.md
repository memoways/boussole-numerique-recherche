# État du lot 2 — démo playback, parcours Claire de bout en bout (v1.4.1)

> 14 octobre 2026. Plan : [`PLAN_DEMO_PLAYBACK_2026-10-14.md`](./PLAN_DEMO_PLAYBACK_2026-10-14.md). Lot précédent : [`ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md`](./ETAT_LOT1_DEMO_PLAYBACK_2026-10-14.md). Source fonctionnelle : PRD Notion « Boussole — prototype démo playback », annexe A.

## Livré

| Zone | Contenu |
|---|---|
| Lecture d’une étape | `useStepPlayback` : question en fondu → prêt → sélection (cases ou scénario) → parole (onde 1,5 à 3 s) → transcription mot par mot (environ 30 mots/s, un clic l’affiche en entier) → digestion (0,8 s) → retenu → terminé. « Passer l’animation » va directement à la fin. |
| Rendus | `Waveform` (décorative, `aria-hidden`), `TypedTranscript` (texte complet pour les lecteurs d’écran, passage retenu surligné), cases cochées une à une, micro-scénario A/B/C/D, curseurs qualitatifs à quatre crans avec correction animée, rebond mémoire, `MilestoneCard` (« Premier constat » et ordre de grandeur illustratif). |
| Panneau | « Ce que la Boussole retient » : extraits surlignés, notes par dimension, repères par dimension (jauge remplie une fois le point d’étape passé). Colonne droite rétractable sur ordinateur ; bouton « Ce que je retiens (n) » et tiroir du bas sur smartphone. Cumul déduit de l’URL : une étape rechargée affiche le même panneau. |
| Écrans de fin | `ideal` (même grammaire que les échanges), `restitution` (lettre, radar Recharts sans chiffre dessiné axe par axe, ce qui fonctionne, ce qui peut s’améliorer, trois pistes), `demos` (trois micro-démos au clic), `futur` (cinq fonctions grisées « Bientôt »), puis `avis`. |
| Commandes | Retour, bouton principal unique (« Réponse de Claire », « Passer l’animation », « Continuer » : le focus clavier n’est jamais perdu), « Aller à la restitution », segments de progression cliquables. Barre compacte en bas d’écran sur smartphone. |
| Clavier | Sur les échanges et l’accueil : Entrée ou Espace avance selon la phase. Partout sauf l’avis : flèches gauche/droite pour changer d’étape. Ignorés dans un champ, sur un bouton ou un lien, dans le tiroir ou avec une touche de modification. Entrée et Espace ne sont pas détournés sur la restitution et les micro-démos, pour laisser le défilement au clavier. |
| Mouvement réduit | Question affichée d’un coup ; un clic sur « Réponse de Claire » affiche la réponse complète ; onde statique ; radar complet immédiatement ; micro-démos à l’état final. |
| Contenu | Script de Claire (annexe A) dans `demo-parcours.json`, statut `pret` : 11 échanges + numérique idéal, restitution, trois micro-démos. Marc et Nadia restent « en préparation » (badge sur leur carte). |
| `/experience` | Deux blocs « Voir une démonstration du parcours » : sous les quatre écrans et en bas de page. La démo devient publique. |
| Contrôles | `verify-demo-content` étendu : types d’étape, choix parmi les options, niveaux de curseurs, extraits présents dans la transcription, rebonds vers une étape antérieure et un élément retenu, panneau animé au moins une étape sur deux sans l’être à chaque étape, citations de la restitution présentes dans les transcriptions, mention « illustratif », fil rouge de la lettre, horizons des pistes, micro-démos connues, phrase du radar, cinq fonctions futures. |

## Contenu complété pour relecture

Le script de l’annexe A est repris tel quel (seule la typographie suit celle du site : apostrophes courbes). Ce que j’ai complété :

1. **Retenu des étapes qui n’en avaient pas** : échange 6, un extrait seul (« Ça prend une demi-journée. ») ; échange 10, l’extrait « je le fais parce qu’il faut » et la note « Instagram par obligation ». Les échanges 3 et 8 n’ajoutent volontairement rien : leur contenu est repris par les curseurs des échanges 4 et 9, et le panneau ne s’anime pas à chaque étape (9 sur 11).
2. **Extraits surlignés** (niveau 1 du panneau) : un passage exact de la réponse de Claire pour chaque étape qui retient quelque chose.
3. **Cible des rebonds** : l’échange 7 cite le passage de l’échange 2 sur les versions envoyées à la télé et à Cinéforom ; l’échange 11 cite la note « e-mail au centre » de l’échange 1.
4. **Citation de chaque point de la restitution** : chaque élément de « Ce qui fonctionne » et « Ce qui peut s’améliorer » est relié à une phrase de Claire (échanges 1, 2, 4, 5, 9). La métrique concrète est celle du point d’étape Outils (1 à 2 h par semaine, illustratif).
5. **Micro-démos** : le PRD en cite deux pour Claire (arborescence, fiche film) ; la troisième (« source unique ») reprend la description générique du PRD (§ 8.5). Noms de fichiers avant/après, dossiers et pièces jointes sont fictifs et de ma main.
6. **Liens des pistes**, uniquement vers des routes existantes : `/ressources` (« Ressources du projet »), `/ressources/etude-complete` (« Étude complète : repères sur l’IA dans la culture »), `/ressources/references-inspirantes`. Ce sont des documents de recherche, pas des guides pratiques : à remplacer quand des ressources plus opérationnelles seront publiées.
7. **Fonctions futures** : une phrase de description par fonction, au conditionnel.
8. **Libellés d’interface** : titres des écrans (« La photo de tes pratiques », « En quelques mots », « Tes cinq dimensions », « À quoi ça pourrait ressembler », « Ce que la Boussole pourrait faire ensuite »), boutons et aides de lecture, texte des blocs d’appel sur `/experience`.
9. **Points d’étape sans ordre de grandeur** (Données, Compétences) : le script n’en donne pas, aucun chiffre n’a été inventé.

Mise en forme de l’échange 4 : « D’après ce que tu dis : » puis les trois curseurs positionnés, puis « C’est juste ? ». Les mots sont ceux du script ; les flèches du texte deviennent des curseurs.

## Contrôles réalisés

- `pnpm verify` (TypeScript portail et API, contenu de la démo, build, SEO-GEO, bundle API) et `pnpm test:demo-feedback` : au vert.
- `scripts/check-contrast.mjs` : nouvelles paires de la démo en AA (bleu accessible `#2B619D` 6,36, gris `#334155` sur blanc 10,35 et sur `#F1F5F9` 9,45). Les teintes de charte non accessibles ne servent qu’aux bordures, fonds et jauges, jamais au texte.
- Playwright (Chromium), 75 contrôles versionnés dans `scripts/check-demo-playback.mjs` (`pnpm check:demo-playback <url>`), sur le serveur de développement puis sur le build de production servi par Nginx :
  - parcours complet à 1280 px et à 390 px, de `/experience` à l’avis, sans erreur console ni débordement horizontal (contrôle élément par élément) ;
  - points d’étape aux échanges 2, 5, 7, 9 et 11 ; correction de curseur à l’échange 4 ; rebond à l’échange 7 ; radar sans chiffre ; trois pistes ; trois micro-démos jouées ; cinq fonctions futures ;
  - sauts de chapitre par la barre de progression ; rechargement direct de l’échange 7 (panneau cumulé, curseur corrigé, élément cité mis en évidence, jauges) ; bouton retour du navigateur ;
  - clavier : Entrée lance la réponse, Espace passe l’animation, Entrée continue, flèches ; le focus reste sur le bouton principal ;
  - `reducedMotion: reduce` ; tiroir mobile (ouverture, contenu, fermeture, bouton au-dessus de la barre de commandes) ;
  - redirections : étape inexistante, persona inconnu, comparaison (écran dédié en attendant le lot 3), Marc et Nadia en préparation.
- Nginx (Homebrew, même `infra/nginx/default.conf`, racine sur `dist/public`) : toutes les étapes de Claire et `/experience/demo/scene/3` en 200 avec `X-Robots-Tag: noindex, follow` ; `/experience/demo/` en 308 ; `/experience`, `/projet`, `/timeline`, `/references` en 200 ; route inconnue en 404 ; démo absente du sitemap.
- Recharts reste dans le chunk différé de la démo, hors du bundle principal.

## Écarts et points connus

- Préexistant, hors démo : sur les pages du site, le fil d’Ariane imbrique un `<li>` séparateur dans un `<li>` (`PageBreadcrumbs.tsx`), ce qui produit un avertissement React en développement. Non corrigé dans ce lot.
- Non réalisé : `docker build` / `docker run` (Docker absent de la machine de développement).
- Test sur iOS Safari et Android Chrome réels : à faire lors de la relecture.

## Reste à faire (lot 3)

Scripts de Marc et de Nadia, `ComparisonView`, corrections issues de la relecture du parcours Claire, `verify-demo-content` sur les trois personas, envoi réel de deux avis de test (avec accord), clôture documentaire et mise à jour de la tâche Notion liée.

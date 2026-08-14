# Diagnostic et plan d’optimisation rédactionnelle

**Périmètre audité :** routes publiques actives du portail, en particulier Accueil, Projet, Expérience, Méthode, Calendrier, Partenaires et Références. Les anciennes pages `DescriptionProjet.tsx` et `Gouvernance.tsx` ne sont pas prises en compte : les routes actives renvoient respectivement vers `/projet` et `/methode`.

**Statut :** proposition de travail. Aucun contenu public n’est modifié par ce document.

## Diagnostic

Le site possède déjà une ligne éditoriale nette : les difficultés sont décrites sans reproche, les exemples restent concrets et les limites de l’outil sont présentes. L’essentiel du travail consiste à **rendre l’état de co-conception visible dès les premiers écrans**, puis à réduire quelques répétitions et formulations qui donnent au projet un ton plus affirmatif qu’il ne peut l’être à ce stade.

### Bloquant

| Priorité | Passage cité | Problème | Pourquoi c’est important | Correction visée |
|---|---|---|---|---|
| P0 | Accueil : « **Un outil gratuit conçu** pour les actrices et acteurs culturels de Genève — **pour comprendre** leurs pratiques numériques, identifier ce qui freine leur travail et choisir des pistes d’amélioration adaptées à leur situation. » | Le premier écran décrit un outil qui agit déjà. | La Boussole publique est encore en co-conception. La précision n’apparaît plus tard, alors que le premier écran fixe l’interprétation du site. | Faire porter le présent sur le projet et employer le futur ou le conditionnel pour le diagnostic : « Un projet en co-conception… La future Boussole aidera… » |
| P0 | Projet : « La Boussole Numérique Culture **est une application web interactive et gratuite qui permet**… » | Même glissement du projet vers un produit actif. | La page de projet sert de référence institutionnelle et doit être irréprochable sur l’état d’avancement. | Distinguer le prototype présenté, le questionnaire partenaire déjà actif et la version publique future. |
| P0 | Accueil : « La Boussole aide à les nommer… », « La Boussole explore cinq grandes dimensions… » | Les visualisations explicatives sont formulées comme un service en fonctionnement. | Les exemples sont utiles, mais doivent être annoncés comme une démonstration ou un aperçu du futur parcours. | Introduire une phrase de cadrage avant les blocs : « Cette démonstration montre comment la future Boussole pourra… » |
| P0 | Calendrier : « La Boussole est lancée, observée et ajustée » ; « La Boussole est utilisée, enrichie et documentée. » | Les phases futures sont écrites au présent. | Un calendrier peut être lu comme un état réalisé. | Employer le futur : « la Boussole sera mise à disposition… », « le projet suivra les premiers usages… ». Les objectifs chiffrés restent tels quels, avec leur caractère indicatif. |
| P0 | Références : « **Seul outil 100% culturel francophone** » ; « la Boussole est la première initiative de ce type… » | Deux revendications d’unicité ne sont pas étayées par une source dans le passage. | Une page documentaire gagne en crédibilité lorsqu’elle distingue une intention de conception d’un fait vérifiable. | Remplacer par une formulation attribuée à la veille ou signaler `[FAIT À FOURNIR : source qui établit cette exclusivité]`. |

### Gênant

| Priorité | Passage cité | Problème | Pourquoi | Correction visée |
|---|---|---|---|---|
| P1 | Accueil : « trop technique, trop général ou trop éloigné du quotidien » ; Méthode : même formule dans le texte puis dans la citation. | Une même formule est reprise à l’identique sur plusieurs pages. | La répétition alourdit le parcours et donne l’impression que chaque page redémarre le même argument. | Conserver la version développée sur Méthode. Sur l’accueil, la remplacer par une phrase brève et un lien vers la méthode. |
| P1 | Méthode : « engagements fondateurs » ; accueil : « Principe fondateur du projet » ; documentation historique : six libellés voisins. | Les six mêmes garanties changent de nom selon la page. | La gouvernance devient plus facile à retenir avec une désignation stable. | Adopter **« les six principes de gouvernance »** comme terme de référence et l’utiliser dans les titres, renvois et CTA. |
| P1 | Méthode : « — Principe fondateur du projet Boussole » ; accueil : « Équipe de projet / Principe fondateur du projet ». | Attribution à l’équipe de phrases produites par le site lui-même. | L’effet d’autorité n’apporte pas de preuve supplémentaire. | Mettre la phrase dans le corps du texte ou l’attribuer à une personne identifiée si une citation est nécessaire. |
| P1 | Partenaires : « Ce site compagnon est conçu pour évoluer avec le projet » puis « Ce site compagnon est conçu pour évoluer avec le projet, au rythme des partenaires… ». | La même idée est répétée à une phrase d’écart. | La section perd de la force sans apporter de contexte supplémentaire. | Garder le premier paragraphe, enrichi d’un exemple concret, puis supprimer le second. |
| P1 | Accueil et Expérience : « adaptées à votre situation », « contexte réel », « usages réels », « sans jargon technique ». | Les mots *adapté*, *réel* et la promesse « sans jargon » reviennent souvent. | Ils finissent par déclarer une qualité que les exemples concrets démontrent déjà. | Les remplacer seulement là où un complément précis existe : « adapté à une association de trois personnes », par exemple. Ailleurs, supprimer ou donner un exemple. |
| P1 | Accueil : « Découvrir le projet », « Voir l’expérience » ; Méthode : « Voir la méthode ». | Plusieurs CTA nomment une destination, sans annoncer ce que la personne y trouvera. | Le lecteur sait mieux choisir la prochaine étape lorsqu’il connaît le bénéfice attendu. | Employer un verbe, un objet et un résultat : « Comprendre le projet et son calendrier », « Explorer une démonstration des cinq dimensions ». |

### Cosmétique

| Point | Observation | Correction visée |
|---|---|---|
| Tirets cadratins | Ils apportent parfois une vraie rupture, mais sont très présents dans les accroches et les descriptions. | Les conserver dans les contrastes forts ; préférer le point ou les deux-points dans les explications. |
| Triades | « Observer, comprendre, agir » fonctionne comme structure de l’accueil. D’autres listes de trois sont moins nécessaires. | Conserver les triades qui organisent le parcours ; ne pas en ajouter pour donner une forme artificielle à une phrase. |
| Typographie | Des apostrophes droites et courbes coexistent dans les fichiers. | Appliquer la forme courbe dans tout texte réécrit, sans modifier les citations, URL ou chaînes d’interface. |

## Réécriture de cadrage proposée

Ces deux passages servent de modèle. Ils ne sont pas encore appliqués au site.

### Accueil — sous-titre et état d’avancement

> Un projet en co-conception avec les actrices et acteurs culturels de Genève. La future Boussole aidera les structures à faire le point sur leurs pratiques numériques et à choisir des pistes d’action utiles. Une première démonstration permet d’en comprendre le principe.

Cette version répond au premier écran à trois questions : ce qui est présenté, pour qui, et où le projet en est. Elle ne modifie ni la gratuité, ni l’ouverture du code, ni l’hébergement, qui sont des engagements du projet et peuvent rester au présent.

### Projet — note d’intention

> La Boussole Numérique Culture est un projet d’application web gratuite. Sa version publique proposera un état des lieux des usages numériques, suivi d’une restitution visuelle et d’un dialogue guidé. Les partenaires contribuent aujourd’hui à préciser les questions, les dimensions et les formes de restitution.

Cette version garde la promesse d’usage, sans présenter comme active une expérience qui est encore en cours de conception.

## Plan d’optimisation

### Phase 1 — Rétablir le temps juste dans les pages d’entrée

| Pages | Ce qui sera amélioré | Pourquoi | Comment |
|---|---|---|---|
| Accueil | Hero, promesse en trois gestes, introduction des cinq dimensions et de la démonstration. | Le premier écran doit annoncer le statut de co-conception avant de décrire les bénéfices attendus. | Ajouter une ligne d’état sous le sous-titre. Passer les effets de l’outil au futur. Présenter le radar comme démonstration explicative. |
| Projet | Hero, note d’intention, proposition et parcours utilisateur. | Cette page porte le récit institutionnel le plus détaillé. | Séparer systématiquement « le projet fait déjà » de « la version publique fera ». Préserver les faits historiques, partenaires et soutien au présent. |
| Expérience | Introduction, étapes et CTA. | La note importante est juste, mais elle arrive après plusieurs promesses au présent. | Faire remonter une phrase courte de co-conception dans l’introduction. Garder l’encadré détaillé pour expliquer les visualisations. |
| Calendrier | Descriptions des phases 3 et 4. | Le futur calendrier ne doit pas être lu comme une réalisation. | Passer les verbes de mise à disposition et d’exploitation au futur ; garder les chiffres comme objectifs indicatifs. |

**Critère de sortie :** aucun premier écran ne laisse croire que le diagnostic public collecte déjà des réponses ou délivre déjà des recommandations.

### Phase 2 — Supprimer les répétitions structurelles

| Pages | Ce qui sera amélioré | Pourquoi | Comment |
|---|---|---|---|
| Accueil et Méthode | Formule « trop technique, trop général ou trop éloigné du quotidien ». | Le site ne doit pas répéter sa preuve de co-conception dans chaque page. | Conserver l’explication longue sur Méthode. Sur l’accueil, garder une phrase d’introduction et un lien contextuel. |
| Méthode et Partenaires | Principes de gouvernance et participation. | Les mêmes engagements doivent être mémorisables sans être recopiés. | Définir la page Méthode comme source longue. Employer ailleurs un résumé d’une phrase plus un lien. |
| Partenaires | Bloc « Comment le portail pourra évoluer ». | Une répétition interne est immédiatement supprimable. | Fusionner les deux paragraphes en un seul, avec un exemple précis d’évolution possible. |

**Critère de sortie :** chaque idée longue possède une page de référence ; les autres pages la résument et y renvoient.

### Phase 3 — Rendre les appels à l’action plus explicites

| Emplacement | Correction | Pourquoi | Méthode |
|---|---|---|---|
| Accueil | « Découvrir le projet » et « Voir l’expérience ». | Les libellés actuels sont compréhensibles mais peu informatifs. | Tester des formulations qui indiquent le contenu attendu : « Comprendre le projet et son calendrier » et « Explorer une démonstration des cinq dimensions ». |
| Méthode | « Voir la méthode », « Devenir partenaire ». | Le second CTA suppose une décision qui peut être prématurée. | Remplacer par « Comprendre les étapes de co-conception » et « Découvrir comment contribuer ». |
| Partenaires | Cartes d’entrée et CTA final. | Le parcours est déjà clair ; il faut conserver cette précision. | Conserver « Partager mes idées et feedbacks » et expliciter le résultat de « Découvrir la Boussole ». |

**Critère de sortie :** chaque CTA indique une action, un objet et le résultat de la page de destination.

### Phase 4 — Resserer sans homogénéiser la voix

| Zone | Ce qui sera amélioré | Pourquoi | Méthode |
|---|---|---|---|
| Accueil, Expérience, Partenaires | Occurrences de *adapté*, *réel*, *permettre*, *sans jargon* et tirets cadratins. | Le site est déjà clair ; un resserrage limité évite une prose uniforme ou promotionnelle. | Remplacer seulement les occurrences qui n’ajoutent pas de précision. Donner un exemple concret lorsqu’un adjectif est nécessaire. Limiter les tirets à une vraie rupture de ton. |
| Méthode | Citations auto-attribuées et abstractions. | La page est crédible lorsqu’elle nomme des mécanismes. | Enlever l’attribution générique. Faire suivre les principes par la règle concrète qui en découle. |
| Références et Recherche | Formules d’unicité, comparaisons et promesses de différenciation. | Les pages documentaires doivent séparer faits sourcés, interprétations et hypothèses de produit. | Remplacer toute exclusivité non sourcée par une formulation prudente ou un marqueur `[FAIT À FOURNIR]`. Préserver les sources et les dates existantes. |

**Critère de sortie :** chaque affirmation abstraite est soit précisée par un exemple, soit retirée ; les limites et déclarations de neutralité restent intactes.

## Ordre de mise en œuvre recommandé

| Séquence | Intervention | Risque éditorial | Validation attendue |
|---|---|---|---|
| 1 | Accueil, Projet, Expérience et Calendrier | Élevé : statut du produit | Relecture par l’équipe de projet et concordance avec le dossier de subvention. |
| 2 | Méthode et Partenaires | Moyen : duplication et CTA | Vérification des renvois, cohérence du terme « six principes de gouvernance ». |
| 3 | Références et Recherche | Moyen : affirmations documentaires | Vérification de chaque source avant toute réécriture d’une donnée ou d’une affirmation comparative. |
| 4 | Passes de style transversales | Faible : resserrage | Compter les tirets et les antithèses, sans lisser les exemples ni l’écriture inclusive. |

## Révisions appliquées — première passe

Les arbitrages de l’équipe de projet ont validé les quatre axes prioritaires. Les textes publics ont été corrigés le 14 août 2026 ; les faits, chiffres, noms propres et références n’ont pas été modifiés.

| Pages | Diagnostic traité | Révision appliquée |
|---|---|---|
| Accueil | Le hero et les démonstrations décrivaient le futur outil au présent. | Le premier écran annonce désormais un projet en co-conception. Les actions de la future Boussole sont formulées au futur. |
| Projet | La note d’intention présentait une application et un diagnostic comme déjà opérationnels. | La page distingue le projet, le travail actuel avec les partenaires et la version publique future. |
| Expérience | Les étapes, le radar et les CTA pouvaient être lus comme un parcours disponible. | L’introduction, les étapes et le radar sont explicitement décrits comme démonstration du futur parcours. Les CTA indiquent ce que la personne trouvera. |
| Calendrier | Les phases futures 2 à 4 utilisaient le présent. | Les descriptions sont passées au futur et les objectifs de phase 4 sont présentés comme indicatifs. |
| Références | Les cartes revendiquaient une exclusivité et une première non sourcées. | La section devient « Ce que la veille oriente dans la Boussole » et présente des choix de conception sans revendication d’unicité. |
| Méthode et Partenaires | Citations auto-attribuées, répétitions et CTA peu informatifs. | Les six principes de gouvernance sont nommés de façon stable, le bloc auto-attribué est remplacé par un contenu factuel, et les CTA précisent l’action attendue. |

## Questions pour la prochaine passe

1. La section « Ce que la veille oriente dans la Boussole » doit-elle conserver six cartes, ou être réduite aux trois choix les plus déterminants pour raccourcir la page Références ?
2. Souhaitez-vous conserver l’expression « agent intelligent » sur la page Projet, ou préférer une formulation plus directe telle que « dialogue guidé par IA », expliquée à la première occurrence ?
3. La prochaine passe doit-elle traiter d’abord la page Recherche, plus documentaire, ou la page Partenaires, plus orientée vers la contribution ?

## À compléter

- [FAIT À FOURNIR : source établissant que la Boussole est « le seul outil 100% culturel francophone » et « la première initiative de ce type »] — nécessaire avant de conserver ces deux revendications sur la page Références.
- [DONNÉE À TRANCHER : lieu et statut exact de l’hébergement de la future version publique] — les pages historiques encore présentes dans le dépôt évoquent Infomaniak, tandis que la documentation de déploiement décrit Coolify self-hosted. Les routes actives doivent conserver une formulation exacte et cohérente.

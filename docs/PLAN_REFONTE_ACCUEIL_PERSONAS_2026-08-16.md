# Plan de refonte de l’accueil par persona

## Objectif

Transformer l’accueil de **Boussole Numérique Culture** en un **lanceur de parcours**. Le hero restera volontairement bref et situera l’outil comme étant en création et en co-conception. Juste après le hero, un sélecteur permettra à chaque visiteur de choisir son profil et d’ouvrir une version contextualisée de la page, sans masquer les menus publics existants ni créer une impression de produit déjà disponible.

La page devra répondre à deux questions dès les premiers écrans : **« Est-ce que ce site s’adresse à moi ? »** et **« Que puis-je faire maintenant ? »**. L’expérience neutre restera visible lorsque aucun profil n’est sélectionné ; l’adaptation commencera uniquement après un choix explicite de persona.

| Persona | Rôle dans la démarche | Parcours prioritaire | Action attendue |
|---|---|---|---|
| Partenaires relais | Institutions, structures, associations, réseaux et collectifs qui regroupent ou accompagnent des artistes | Comprendre la démarche, le rôle de relais et les étapes de co-conception | Ouvrir la présentation partenaire, puis demander une invitation ou répondre au questionnaire selon l’état d’activation |
| Artistes et personnes actives dans la culture | Utilisateurs finaux individuels de l’outil à venir, souvent en relation avec des structures partenaires | Comprendre les questions auxquelles l’outil cherchera à répondre et les futurs ateliers | Déclarer un intérêt pour un atelier et/ou une notification à l’ouverture de l’outil |
| Personnes intéressées par la transformation numérique | Personnes qui souhaitent suivre, documenter ou enrichir la réflexion sur les pratiques numériques culturelles | Comprendre l’enjeu, consulter la méthode et les ressources documentaires | Explorer les ressources et choisir de recevoir les actualités ou opportunités de contribution |

## Principes de conception retenus

L’accueil ne deviendra pas trois mini-sites concurrents. Il conservera une structure, une identité visuelle et un socle documentaire communs, tandis que le sélecteur adaptera le récit, les questions mises en avant, les preuves utiles et les appels à l’action. Le choix devra être réversible et accessible au clavier. Il sera conservé dans l’URL sous la forme d’un paramètre lisible, par exemple `?public=partenaire`, pour permettre le partage d’un parcours sans introduire de compte, de cookie obligatoire ou de personnalisation opaque.

> Le choix d’un persona oriente le contenu ; il ne classe pas la personne ni ne limite l’accès aux autres pages du site.

Les contenus existants seront réemployés en priorité : radar et expérience Boussole, présentation partenaire, calendrier, méthode, références, ressources et module partenaire. La refonte portera donc sur leur **hiérarchisation, leur contextualisation et leurs liens**, non sur une duplication des informations déjà entretenues ailleurs.

## Phase 1 — Cadrage éditorial et inventaire des composants

La première phase établira une matrice de réemploi. Elle recenssera les sections actuelles de l’accueil, leurs composants visuels et leurs équivalents dans Projet, Partenaires, Expérience, Méthode, Calendrier et Ressources. Chaque élément sera classé comme contenu commun, contenu propre à un persona, ou contenu à retirer de l’accueil parce qu’il appartient mieux à une page de profondeur.

Un référentiel éditorial sera ensuite préparé pour les trois parcours. Il fixera, pour chaque persona, la question d’entrée, le problème auquel la Boussole répond progressivement, la valeur de la contribution, le prochain geste réaliste, la formulation au futur des fonctionnalités non disponibles et le lien vers la page de profondeur pertinente. La mention géographique restera limitée à une occurrence par page, conformément aux règles existantes.

| Livrable de cadrage | Contenu | Critère de validation |
|---|---|---|
| Matrice « contenu existant → persona » | Composants à conserver, déplacer, reformuler ou retirer de l’accueil | Aucun contenu clé n’est dupliqué sans fonction différente |
| Carte des questions par persona | Questions concrètes auxquelles la page doit répondre avant et après la sélection | Chaque personne sait pourquoi le site lui est utile et quelle action est possible maintenant |
| Hiérarchie des CTA | Une action principale et une alternative par persona | Aucun CTA ne promet un accès actif à un service futur |

## Phase 2 — Architecture de l’accueil lanceur

Le hero sera resserré à trois éléments : une indication claire que la Boussole est un outil en co-conception, une phrase de portée et une invitation à choisir son profil. Les boutons actuels « Répondre au questionnaire partenaire » et « Découvrir la Boussole » quitteront le hero ; ils réapparaîtront seulement dans le parcours où ils sont pertinents.

Le sélecteur prendra la forme de trois cartes-boutons ou onglets accessibles, situés immédiatement après le hero. Chaque choix contiendra un intitulé explicite, une phrase de reconnaissance et un repère visuel cohérent avec la palette du portail. Le choix actif utilisera `aria-pressed` ou le modèle sémantique d’onglets approprié, un focus visible et une annonce accessible du changement de contenu.

Après la sélection, la page déroulera quatre blocs personnalisés, rendus par des composants réutilisables : le point de départ, ce que l’outil cherche à améliorer, ce qui se construit maintenant et la manière de prendre part à la prochaine étape. Le contenu neutre avant sélection conservera un aperçu court des trois publics, le contexte du site compagnon et les accès de navigation habituels. Il ne poussera pas un questionnaire destiné à un seul public.

## Phase 3 — Implémentation frontend et réemploi des composants

La page `Home.tsx` sera refactorée autour d’un état de persona typé, avec une configuration de contenu séparée du JSX. Les sections partagées deviendront des composants de page réutilisables, afin d’éviter trois branches de code quasi identiques et de permettre l’évolution des phases de vie du site.

| Élément | Réemploi ou création | Mise en œuvre prévue |
|---|---|---|
| Hero | Réemploi et réduction | Conserver le titre et le langage visuel ; retirer les CTA publics spécifiques au persona partenaire |
| Sélecteur de public | Nouveau composant | Cartes-boutons accessibles, état dans l’URL, réinitialisation possible et comportement mobile en pile |
| Bloc partenaires | Réemploi | Réutiliser la présentation partenaire, le rôle de relais, le calendrier et l’accès au questionnaire ou à la demande d’invitation |
| Bloc artistes | Nouveau récit à partir de contenus existants | Réutiliser l’expérience, les dimensions de la Boussole et les futures étapes de test sans faire croire que l’outil est ouvert |
| Bloc enjeux numériques | Réemploi éditorial | Relier méthode, recherche, références et ressources ; distinguer la réflexion culturelle actuelle d’une généralisation future |
| Illustrations | Réemploi prioritaire | Réutiliser radar, schémas et couleurs du site ; ne pas ajouter d’assets lourds ni de visuels décoratifs sans rôle narratif |
| Animations | Ajustement ciblé | Transitions CSS de moins de 300 ms, limitées à l’opacité et à la transformation ; désactivation avec `prefers-reduced-motion` |

Les liens internes seront vérifiés pour arriver en haut de la page cible. Le design restera mobile-first, sans hauteur forcée de page ni débordement horizontal.

## Phase 4 — Formulaires d’intérêt et parcours de données

Le parcours partenaires existant ne sera pas détourné pour les artistes sans clarification des finalités. Un petit formulaire public distinct sera conçu pour les artistes et les personnes intéressées par les enjeux numériques. Il proposera deux cases indépendantes : intérêt pour un atelier et souhait d’être notifié lors de l’ouverture de l’outil. Le formulaire pourra également demander une adresse e-mail, un prénom facultatif, le statut de contribution et un consentement explicite.

La solution recommandée est d’étendre l’API partenaire et PostgreSQL déjà prévus, avec une table dédiée aux manifestations d’intérêt, plutôt que de transmettre des coordonnées par e-mail ou de les mélanger aux réponses qualitatives partenaires. Le plan d’implémentation devra inclure une route publique limitée contre les abus, une validation Zod, une durée de conservation, une interface d’administration et un export conforme à la finalité affichée.

| Décision technique | Proposition | Point à confirmer avant activation |
|---|---|---|
| Stockage | Nouvelle table PostgreSQL de manifestations d’intérêt | Responsable du traitement et durée exacte de conservation |
| Publics | Artistes et personnes intéressées par les enjeux numériques, avec origine déclarée | Segmentation dans les pratiques d’administration |
| Consentement | Deux préférences séparées : ateliers et notification | Formulation juridique et canal d’envoi futur |
| Activation | Formulaire actif seulement quand l’API est déployée ; relais e-mail honnête sinon | Condition d’ouverture de la collecte |

## Phase 5 — Alignement des pages, du SEO et des phases de vie

Les pages Partenaires, Expérience, Méthode, Calendrier, Projet et Ressources seront vérifiées après la refonte afin que leurs entrées depuis les trois personas soient cohérentes. Les CTA devront employer le même vocabulaire : mobilisation, écoute, atelier, définition du prototype, tests et diffusion. Les pages ne devront pas annoncer l’ouverture de l’outil, la tenue d’un atelier ou l’envoi de notifications avant décision effective.

Le registre partagé SEO sera complété avec la promesse de l’accueil lanceur et les données structurées conserveront uniquement les informations déjà visibles. Le pré-rendu HTML de l’accueil devra inclure le contenu neutre et une synthèse non trompeuse des trois publics, sans simuler une personnalisation serveur. `llms.txt` sera mis à jour afin de refléter les nouveaux parcours, leurs statuts et les sources documentaires. Sitemap, robots, canonique et pré-rendu seront contrôlés après la modification.

## Phase 6 — Contrôle qualité, tests et documentation

La validation portera sur les trois parcours, la version neutre et les comportements de retour. Les scénarios suivants seront testés au clavier, à la souris, sur mobile étroit et dans la sortie HTML statique : sélection, remplacement du contenu, URL partageable, retour à l’état neutre, CTA, formulaire d’intérêt, focus, préférence de mouvement réduit, liens internes et fallback sans API activée.

`CHANGELOG.md`, `STORY.md`, `README.md`, `docs/README.md` et le document de plan seront mis à jour seulement après l’implémentation effective.

## Hypothèses, risques et décisions ouvertes

Ce plan suppose que l’accueil reste une seule route publique et que les trois personas ne nécessitent ni connexion ni contenu caché. Il suppose également que le module partenaire PostgreSQL et API sera la base d’un futur formulaire d’intérêt, mais qu’aucune donnée personnelle ne sera collectée avant validation de la finalité, du consentement et de la conservation.

Le risque principal est la surcharge : trois parcours ne doivent pas allonger la page au point de masquer l’essentiel. La réponse prévue consiste à ne développer qu’un parcours à la fois après sélection, avec des blocs courts et des pages de profondeur pour les détails. Le second risque est la divergence éditoriale avec les futures phases ; il sera réduit par une configuration de contenu centralisée, les mises à jour de continuité et le contrôle des formulations au futur.

Les décisions à confirmer avant l’activation de la collecte sont : la date ou condition d’ouverture, la durée de conservation, le canal de notification, la possibilité pour un artiste de demander aussi à devenir partenaire et l’usage des deux préférences distinctes pour atelier et notification.

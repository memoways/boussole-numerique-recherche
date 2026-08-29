# CHANGELOG — Boussole Numérique Culture

Ce journal consolide les modifications **effectivement livrées** dans le dépôt. Il suit l’esprit de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) : chaque version décrit les fonctions, corrections et décisions qui ont modifié le portail ou son exploitation.

## [1.3.14] — 2026-08-28 — Parcours de certificat Coolify simplifié

### Corrigé

- Le tutoriel ne présente plus le DNS challenge Cloudflare comme obligatoire avec les deux CNAME DNS only vers `lime.1024b.net`.
- Le chemin initial est désormais le challenge HTTP standard de Coolify, sous réserve que les ports publics 80 et 443 soient accessibles ; le DNS challenge reste réservé aux wildcards, au port 80 inaccessible ou à un échec HTTP-01 confirmé.

### Ajouté

- Tableau décisionnel HTTP-01/DNS-01, garde-fous de sécurité sur le token Cloudflare et références officielles Coolify/Let’s Encrypt corrigées.

## [1.3.13] — 2026-08-28 — Healthcheck Coolify indépendant du routage public

### Corrigé

- Le healthcheck Docker du portail ne demande plus la racine sur `127.0.0.1:8080`, qui suivait une redirection HTTPS vers le FQDN public et pouvait provoquer un rollback `503` avant la fin du routage Coolify.
- Nginx expose maintenant `/healthz`, endpoint interne qui répond `200 ok` sans redirection ; le healthcheck Docker cible exclusivement cet endpoint local.
- La normalisation des anciennes URL publiques contenant `:8080` reste active pour le FQDN canonique, mais ne s’applique plus aux requêtes locales de healthcheck.

### Ajouté

- Diagnostic de déploiement [`docs/DIAGNOSTIC_ECHEC_DEPLOIEMENT_COOLIFY_2026-08-28.md`](./docs/DIAGNOSTIC_ECHEC_DEPLOIEMENT_COOLIFY_2026-08-28.md) et commandes `dig` macOS dans le tutoriel de migration.

### Vérifié

- `pnpm verify` passe avec le pré-rendu, le contrôle SEO-GEO et le build de l’API. La validation Docker finale sera effectuée par le prochain redeploy Coolify, Docker n’étant pas présent dans l’environnement local de contrôle.

## [1.3.12] — 2026-08-27 — Continuité documentaire Cloudflare et Coolify

### Modifié

- README et STORY distinguent désormais explicitement ce qui est livré dans le dépôt de ce qui reste à activer dans Coolify : PostgreSQL privé, API partenaire, secrets runtime, migration, rebuild du portail et pilote.
- L’architecture du README représente Cloudflare, les CNAME DNS only vers `lime.1024b.net`, le proxy Coolify, les deux ports internes et la séparation des services optionnels.
- Les références d’exploitation renvoient au tutoriel Cloudflare/CNAME applicable, qui remplace les anciennes indications basées sur des enregistrements A.

## [1.3.11] — 2026-08-27 — Migration Coolify adaptée à Cloudflare

### Modifié

- Le plan de migration Coolify couvre désormais le portail, l’API partenaire et PostgreSQL, au lieu de décrire uniquement la publication statique initiale.
- La stratégie DNS du projet est adaptée à Cloudflare : les sous-domaines publics reposent sur des CNAME DNS only vers `lime.1024b.net`, et le proxy Coolify demande les certificats via le DNS challenge Cloudflare.

### Ajouté

- Tutoriel téléchargeable [`docs/TUTORIEL_CLOUDFLARE_CNAME_COOLIFY_QUESTIONNAIRE_2026-08-27.md`](./docs/TUTORIEL_CLOUDFLARE_CNAME_COOLIFY_QUESTIONNAIRE_2026-08-27.md) : DNS, token Cloudflare minimal, proxy, ressources, secrets, migration, pilote, options et diagnostic d’incidents.

### Documenté

- Le target `lime.1024b.net` résout vers `185.131.204.133`, mais retourne actuellement 503 en HTTPS et 404 en HTTP lorsqu’il est appelé directement. Ce comportement est attendu tant qu’aucune ressource Coolify n’est routée pour ce hostname ; les contrôles doivent viser les deux FQDN publics de la Boussole après déploiement.

## [1.3.10] — 2026-08-25 — État des lieux d’activation du questionnaire

### Ajouté

- Tutoriel opérationnel [`docs/ETAT_LIEUX_ACTIVATION_QUESTIONNAIRE_COOLIFY_2026-08-25.md`](./docs/ETAT_LIEUX_ACTIVATION_QUESTIONNAIRE_COOLIFY_2026-08-25.md), qui distingue le module prêt au déploiement des ressources encore non activées en production.
- Checklist ordonnée pour le DNS, PostgreSQL privé, l’API partenaire, les secrets runtime, les migrations initiales, le rebuild du portail, le test pilote et les options Deepgram, SMTP et Dreamlit.

### Documenté

- L’API publique `api.boussole-culture-recherche.memoways.com` ne résout pas encore ; elle ne peut donc pas recevoir de réponses de questionnaire tant que le DNS, PostgreSQL et le service API ne sont pas mis en place.
- La console `/admin` reste volontairement dans son état d’activation tant que `VITE_PARTNER_API_URL` n’est pas injectée au build du portail et que l’API/PostgreSQL ne sont pas déployés.

## [1.3.9] — 2026-08-22 — FAQ complémentaires aux récits de profils

### Modifié

- Les FAQ ne répètent plus le pourquoi, le quoi, le comment ou les bénéfices déjà exposés dans les récits Partenaire culturel et Artiste.
- Le parcours Partenaire culturel répond désormais aux rôles dans les arbitrages, à la participation d’équipe, au devenir des retours, aux écarts de perception et aux garde-fous de neutralité et de données.
- Le parcours Artiste répond désormais à la participation sans expertise, aux situations ponctuelles, au devenir d’une manifestation d’intérêt, à la confidentialité et à la place encore à tester de l’IA.
- Le titre et l’introduction de la section FAQ précisent qu’il s’agit de détails pratiques, de règles de participation et de garde-fous complémentaires.

### Vérifié

- L’ouverture d’une FAQ complémentaire dans chacun des deux profils est couverte par l’audit smartphone ; les dix interactions prioritaires passent à 320 px.

## [1.3.8] — 2026-08-22 — FAQ approfondies par profil

### Modifié

- Les FAQ Partenaire culturel et Artiste passent de trois à cinq réponses ciblées, articulées autour du pourquoi, du quoi, de la phase actuelle, du comment et des bénéfices attendus.
- La phase actuelle est explicitée dans les deux parcours : site compagnon actif, atelier et cadrage à l’automne 2026, prototype à tester visé fin 2026 et ouverture publique visée début 2027.
- Les réponses précisent que la Boussole sera un outil non jugeant, sans note, classement ou solution imposée ; elles donnent un rôle concret aux retours de terrain.

### Ajouté

- Plan de référence [`docs/PLAN_ENRICHISSEMENT_FAQ_PROFILS_2026-08-22.md`](./docs/PLAN_ENRICHISSEMENT_FAQ_PROFILS_2026-08-22.md).

### Vérifié

- Les deux FAQ enrichies restent lisibles à 390 px ; les interactions mobiles prioritaires passent après leur intégration.

## [1.3.7] — 2026-08-22 — Mention collaborative de footer

### Modifié

- La mention de bas de page devient : « © 2026 Memoways — Genève. Projet collaboratif en cours. »

## [1.3.6] — 2026-08-22 — Soutien institutionnel sur l’accueil

### Ajouté

- La capsule « Avec le soutien de — Ville de Genève », déjà présente sur la page Partenaires, est désormais placée en bas du bloc sombre « Vous souhaitez participer au projet ? » de l’accueil.
- La capsule reprend le logo, le lien vers la démarche de subvention et une version adaptée au fond sombre, contrôlée à 390 px.

## [1.3.5] — 2026-08-22 — Récits de profils centrés sur le pourquoi

### Modifié

- Les parcours Partenaire culturel et Artiste suivent désormais le même fil de lecture : **Pourquoi agir maintenant**, **Quoi prépare la future Boussole**, **Comment la co-conception se déroule**, puis **Bénéfices attendus**.
- Les raisons d’agir explicitent les conséquences concrètes de pratiques numériques mal ajustées : besoins invisibles, outils qui créent de la friction, coordination difficile et choix subis.
- La partie « Quoi » décrit une application web en préparation, un état des lieux non jugeant et les cinq dimensions à discuter ; le radar interactif y est conservé comme représentation illustrative, jamais comme score.
- La partie « Comment » relie situations réelles, questionnaire, atelier, cadrage et prototype à une décision concertée avec les partenaires et les artistes.

### Ajouté

- Plan de référence [`docs/PLAN_RECOMPOSITION_RECITS_PROFILS_2026-08-22.md`](./docs/PLAN_RECOMPOSITION_RECITS_PROFILS_2026-08-22.md).

### Vérifié

- Les deux parcours sont contrôlés à 390 px : la lecture suit Pourquoi, Quoi, Comment, bénéfices ; le radar reste dans « Quoi ». `pnpm verify` passe avec le build statique, le contrôle SEO-GEO et l’API partenaire.

## [1.3.4] — 2026-08-20 — Hero allégé

### Modifié

- Les quatre jalons de l’accueil conservent leur date et leur intention, sans numérotation décorative.
- La phrase redondante sous « Entrée dans le site par profil » est retirée.
- La capsule Artiste commence directement par le bénéfice de la contribution, sans énumération préalable des pratiques culturelles.

### Vérifié

- Le hero simplifié reste lisible à 390 px ; l’audit mobile repasse sans débordement, erreur JavaScript ni cible tactile sous-dimensionnée.

## [1.3.3] — 2026-08-20 — Retour en haut pour les lectures longues

### Ajouté

- Bouton global « Retour en haut » : il apparaît après 480 px de défilement, reste fixe en bas à droite et présente une cible tactile d’au moins 48 px sur smartphone.
- Remontée fluide vers le sommet, avec retour immédiat lorsque la préférence système de réduction des mouvements est active.
- Contrôle automatique de l’apparition et de la remontée dans l’audit mobile reproductible ; le scénario d’interactions vérifie désormais neuf gestes prioritaires.

### Vérifié

- Le bouton apparaît, reste lisible au-dessus des cartes de Ressources à 320 px et remonte effectivement au sommet après activation au clavier ou au toucher simulé.

## [1.3.2] — 2026-08-20 — Audit et corrections smartphone

### Modifié

- Les actions compactes de l’accueil, les filtres de Recherche et Ressources, la recherche 404 et les liens de cartes Ressources atteignent désormais une cible tactile adaptée aux petits écrans.
- Les documents historiques replient leur structure en une colonne sur smartphone ; leurs tableaux utilisent un défilement horizontal local et les URL longues se coupent sans élargir la page.
- Les en-têtes, boutons et actions de téléchargement des documents historiques sont adaptés aux largeurs étroites ; les actions de bas de page se superposent sur mobile.
- Le conteneur global cesse d’imposer une hauteur minimale d’écran, conformément aux règles de mise en page du projet.

### Ajouté

- Audits reproductibles `pnpm audit:mobile` et `pnpm audit:mobile:interactions`, basés sur Playwright et couvrant vingt routes à 320 px et 390 px, ainsi que huit interactions mobiles prioritaires.
- Document de contrôle [`docs/CONTROLE_RESPONSIVE_SMARTPHONE_2026-08-20.md`](./docs/CONTROLE_RESPONSIVE_SMARTPHONE_2026-08-20.md).

### Vérifié

- Les 40 rendus audités répondent sans erreur JavaScript, sans débordement horizontal du document et sans contrôle visible sous 36 px. Le burger, les parcours de l’accueil, les écrans Expérience, les recherches, les filtres et la pagination partenaire passent à 320 px.
- `pnpm verify` passe après les corrections : TypeScript, build statique, pré-rendu SEO-GEO et build de l’API partenaire.

## [1.3.1] — 2026-08-20 — Prévisualisation concrète de l’expérience Boussole

### Modifié

- La page Expérience devient une démonstration en quatre écrans cohérents avec les wireframes de référence : **Se situer**, **Décrire**, **Comprendre** et **Agir**.
- Chaque étape comporte désormais un cadre applicatif, une indication de progression, des contrôles illustratifs et une explication de ce que le futur prototype devra permettre.
- L’écran de conversation rend visibles une question en langage ordinaire, des réponses rapides et les modes écrit ou vocal, sans sauvegarde ni envoi de données.
- L’écran de panorama relie le radar interactif partagé à des repères par dimension, explicitement formulés comme des points à discuter et non comme des scores personnels.
- L’écran d’action propose trois premières améliorations illustratives et rappelle que les ressources ou recommandations resteront à co-concevoir, sans décision automatisée.
- Titre, description SEO et pré-rendu HTML de `/experience` sont alignés sur cette prévisualisation de quatre écrans.

### Ajouté

- Plan de conception [`docs/PLAN_PREVISUALISATION_EXPERIENCE_2026-08-20.md`](./docs/PLAN_PREVISUALISATION_EXPERIENCE_2026-08-20.md) et contrôle associé [`docs/CONTROLE_PREVISUALISATION_EXPERIENCE_2026-08-20.md`](./docs/CONTROLE_PREVISUALISATION_EXPERIENCE_2026-08-20.md).

### Vérifié

- Les quatre écrans, le radar à icônes périphériques, les choix illustratifs et les actions de navigation ont été contrôlés dans le navigateur. `pnpm verify` passe après génération du pré-rendu, contrôle SEO-GEO et build de l’API partenaire.

## [1.3.0] — 2026-08-16 — Site compagnon et Boussole en préparation

### Modifié

- Premier écran de l’accueil reformulé pour distinguer sans ambiguïté le site compagnon existant de la Boussole, qui reste en préparation et n’est pas encore utilisable.
- Statut visible ajouté sur l’accueil et Partenaires : recueil des retours aujourd’hui, atelier et cadrage entre septembre et octobre 2026, prototype à tester visé fin 2026, ouverture publique visée début 2027.
- Entrée de l’accueil simplifiée à deux profils : **Partenaire culturel** et **Artiste**. Le profil « Enjeux du numérique » et son récit, ses visualisations, sa FAQ et son choix dans le sous-menu sont retirés.
- Sous-menu sticky, URL partageable et retour à l’entrée adaptés aux deux profils ; l’ancienne valeur `?public=enjeux-numeriques` revient désormais proprement à l’accueil neutre.
- Récits Partenaire culturel et Artiste réécrits autour d’un état des lieux non jugeant et de conseils d’optimisation actionnables portant sur les outils, les procédures et les pratiques de collaboration.
- Page Partenaires alignée sur le rôle de co-conception avant développement : questionnaire, atelier, cadrage, prototype puis ajustements avant l’ouverture publique visée.
- Calendrier aligné sur les jalons validés tout en conservant un horizon de vingt-quatre mois indicatifs et quatre phases de développement.
- Registre SEO, pré-rendu HTML et `llms.txt` de l’accueil, Partenaires et Calendrier mis à jour pour déclarer explicitement que la Boussole n’existe pas encore.

### Ajouté

- Archive de décision [`docs/PLAN_CLARIFICATION_SITE_COMPAGNON_2026-08-16.md`](./docs/PLAN_CLARIFICATION_SITE_COMPAGNON_2026-08-16.md), qui fixe le calendrier, les deux profils, la ligne éditoriale et le périmètre de cette passe.

## [1.2.1] — 2026-08-16 — Refonte de l’accueil et continuité de parcours

### Modifié

- Accueil entièrement réécrit autour de la raison d’être de la Boussole : difficultés concrètes des pratiques numériques, amélioration progressive recherchée et priorité donnée aux artistes, sans présenter le futur outil comme déjà disponible.
- Hero et entrée par profils clarifiés : trois capsules colorées et accessibles — Institutionnel, Artiste, Enjeux du numérique — permettent de reconnaître son rôle avant d’ouvrir un récit dédié.
- Trois récits alignés sur une structure commune, mais différenciés dans leur contenu : situation concrète, contribution ou bénéfice attendu, trois questions utiles, deux actions hiérarchisées et lien de profondeur explicitement annoncé.
- Sous-menu de profils conservé dès le clic et pendant tout le récit ; le profil actif reste coloré, le changement de persona est immédiat et le menu disparaît seulement au retour effectif dans le hero.
- Ancrage du récit harmonisé avec les barres fixes : 7 rem sur mobile et 8 rem à partir de `sm`, afin que le séparateur, le radar et ses contrôles restent visibles après un défilement de profil.
- FAQ, radar et boussole narrative adaptés à chaque persona ; les radars partagés et celui de la page Expérience réservent l’interaction aux icônes périphériques, les points restant graphiques.
- Pré-rendu de l’accueil, description SEO, données structurées et `llms.txt` alignés sur la nouvelle promesse, les rôles des publics et le statut de co-conception.

### Corrigé

- Contrôle de `llms.txt` rendu insensible à la casse, pour vérifier le rôle du site compagnon sans imposer une capitalisation précise au manifeste conversationnel.
- Documentation de continuité complétée : plan de réécriture, diagnostic par profils et contrôle de l’accueil sont désormais référencés dans `docs/`, `README.md`, `STORY.md` et le suivi des tâches.

### Vérifié

- `pnpm verify` repasse après la réécriture : TypeScript du portail et de l’API, build statique, génération des dix routes indexables, contrôle SEO-GEO et build de l’API partenaire.
- Les trois parcours expliquent une situation, un apport ou bénéfice, l’étape actuelle et des liens cohérents ; la page hydratée conserve une canonique sans paramètre et un unique graphe JSON-LD.

## [1.2.0] — 2026-08-13 — Module partenaire et préparation du pilote

### Ajouté

- Deux parcours autonomes depuis la page **Partenaires** : une présentation libre à `/partenaires/presentation` et un accès indépendant au questionnaire à `/partenaires/questionnaire`.
- Présentation partenaire en neuf slides, avec détails dépliables accessibles, liens contextuels, conservation de la slide et du détail dans l’URL, raccourcis clavier et retour navigateur cohérent.
- Compositions visuelles spécifiques au propos des slides : radar animé à l’ouverture, parcours, communauté, cycle, principes, réseau de contribution et atelier ; les slides qui n’ont pas besoin d’illustration restent volontairement sobres.
- API partenaire Express/TypeScript distincte du portail, schéma PostgreSQL, invitations personnelles liées aux organisations et contacts, demandes publiques d’invitation, brouillons et questionnaires versionnés.
- Questionnaire multi-étapes avec questions Likert, choix simples et multiples, réponses ouvertes, consentement, sauvegarde de brouillon et transcription Deepgram optionnelle avec suppression de l’audio après transcription.
- Console `/admin`, avec l’alias historique `/partenaires/admin`, pour les organisations, contacts, invitations, demandes, réponses et export CSV.
- Sessions d’administration par cookie `httpOnly`, jetons d’invitation hashés, limitation locale des tentatives de connexion et des demandes d’invitation.
- Boîte d’envoi PostgreSQL `notifications.partner_response_recap_outbox`, récapitulatif déterministe créé lors de la soumission et test automatisé du formateur.
- Intégration Dreamlit de type « boîte d’envoi restreinte » : Dreamlit ne lit que le destinataire et le récapitulatif préparé, sans accès aux tables de réponses brutes.
- Vue d’administration des e-mails prêts, aperçu du récapitulatif et régénération manuelle sans doublon, avec compteur et trace d’événement.
- Documentation d’exploitation de l’API, de PostgreSQL, de Dreamlit, de Coolify, de l’environnement et du contrôle pilote.
- Page **404** française, intégrée au layout du portail, avec recherche locale tolérante aux accents dans les documents et sources, suggestions, résultats immédiats et cinq raccourcis de réorientation.
- Composant partagé `InteractiveNarrativeIllustration` pour les huit schémas de présentation non radar : signaux, parcours, communauté, cycle, principes, passerelle, atelier et contribution.
- Accueil entièrement transformé en lanceur de parcours : sélection réversible entre partenaires relais, artistes ou personnes actives dans la culture, et personnes intéressées par les enjeux numériques ; chaque choix déploie un récit, des questions de contribution, des actions et une illustration appropriée.
- Formulaire de manifestation d’intérêt prêt à être activé : consentement explicite, intérêt dissocié pour les ateliers et les notifications, source de la demande, fallback e-mail honnête sans API et retour de confirmation après enregistrement.
- Stockage PostgreSQL `public_interest_submissions`, route publique limitée `/api/public/interests`, export CSV protégé et section dédiée dans la console d’administration partenaire.
- Document de contrôle de l’accueil par personas et documentation d’activation de la collecte d’intérêt ajoutés dans `docs/` et `config/`.
- FAQ dynamique ajoutée aux trois parcours de l’accueil : trois questions et réponses adaptées par persona, une réponse ouverte à la fois, libellés et états accessibles, ainsi que des liens vers les pages d’approfondissement utiles.
- Deux visualisations interactives restaurées sur chacun des parcours : un radar contextualisé et une boussole narrative complémentaire. Les dimensions et étapes varient selon le rôle sélectionné.
- Composant radar corrigé : son commentaire contextuel se place désormais hors du conteneur SVG, évitant tout chevauchement avec le radar sur petit écran.
- Récit par persona resserré à un CTA primaire et un CTA secondaire ; le troisième lien d’action a été retiré.
- Hero de l’accueil allégé selon les annotations : suppression du sur-titre de statut et de la phrase d’orientation, afin de concentrer l’entrée sur le nom de l’outil et sa promesse.
- Entrée par personas renommée « Entrée dans le site par profil » ; le libellé redondant, la ligne décorative et la note de réversibilité ont été retirés.
- Sous-menu de profils sticky ajouté après sélection : « Institutionnel », « Artiste » et « Enjeux du numérique » restent disponibles sous la navigation principale, avec le profil actif mis en évidence par sa couleur.
- Radar de la page Expérience clarifié : les icônes périphériques, fixes et accessibles, deviennent les seuls contrôles des dimensions ; les points du tracé sont désormais purement visuels.
- Convention appliquée au radar partagé de l’accueil et de la présentation partenaire : les points restent graphiques, les cinq icônes périphériques portent les contrôles, les états et les retours de survol.
- Boussole narrative optimisée pour mobile : ses étapes sont empilées sous `sm`, conservent des cibles de 92 px et des libellés de taille lisible ; elles retrouvent leur grille sur écrans plus larges.
- Sous-menu sticky de profils ajouté après sélection : Institutionnel, Artiste et Enjeux du numérique restent disponibles sous la navigation principale, avec le profil actif mis en évidence par sa couleur et un changement direct de récit.
- Hero et entrée de l’accueil simplifiés selon annotations : le hero ne conserve que le titre et la promesse ; la section s’intitule « Entrée dans le site par profil » sans libellés ni décorations redondantes.
- Traits verticaux décoratifs retirés des questions, du message de contribution et du résumé de la boussole dans les trois parcours de profils.
- Ancrage du récit de profil rendu responsive : 7 rem sur mobile et 8 rem à partir de `sm`, correspondant aux hauteurs respectives de navigation et de sous-menu ; le séparateur arrive sous les barres fixes sans masquer le radar.
- Sélecteur unique de profils intégré au hero : trois capsules colorées Institutionnel, Artiste et Enjeux du numérique remplacent les boutons orange et les cartes redondantes, avec icône, périmètre et état sélectionné.
- Sous-menu de profils conditionné au dépassement complet du hero : il disparaît dès que le sélecteur unique redevient visible et réapparaît seulement dans le récit personnalisé.
- Séparateur retiré avant « Ce qui se construit maintenant » afin de relier plus naturellement le hero et le contenu de contexte.
- Transition de profil renforcée : le sous-menu sticky apparaît immédiatement au clic sur une capsule, reste visible pendant le défilement vers le récit puis reprend son comportement contextuel après l’arrivée.
- Seuil de maintien recalibré sur le bas de la rangée de capsules : le sous-menu persiste dans l’ensemble du récit tant que les capsules restent derrière les barres fixes, et ne se masque qu’à leur retour effectif sous la navigation.

### Modifié

- Deck partenaire stabilisé sur desktop : gabarit interne de 950 px, zone narrative de 580 px sans défilement interne, titre compact, navigation fixe de 72 px et approfondissements réservés à la partie basse.
- Boutons **Précédent** et **Suivant** stabilisés avant les toggles afin qu’ils ne changent plus de position à l’ouverture d’un détail.
- Radar-boussole réservé à la première slide ; le radar animé de l’accueil est désormais fourni par le composant partagé `AnimatedRadarGraphic`.
- Radar de la première slide rendu exploratoire : repères et dimensions lisibles, activation à la souris ou au clavier, résumé contextuel et absence de panneau glassmorphism.
- Éléments de navigation redondants retirés de la présentation et du questionnaire : le fil d’Ariane global porte seul le chemin Accueil → Partenaires → sous-page.
- README, STORY, archive d’implémentation, opérations et index documentaire restructurés pour refléter la réalité livrée.
- Open Graph renforcé dans le layout de secours, le composant de métadonnées et le générateur statique : titre, description, URL, image sécurisée, texte alternatif et carte Twitter enrichie.
- `SITE_URL` fixé par défaut dans le Dockerfile et la documentation sur `https://boussole-culture-recherche.memoways.com`, avec vérification des URL canoniques et Open Graph générées.
- Sitemap généré au build avec domaine final, date de génération, fréquence et priorité par route indexable ; `robots.txt` référence ce sitemap et exclut les parcours administratifs et de questionnaire.
- Radar de l’accueil extrait dans `AnimatedRadarGraphic`, puis réemployé dans la première slide partenaire ; les autres slides utilisent des illustrations limitées à leur rôle narratif.
- Aide textuelle redondante de navigation retirée du deck afin de dégager la bande de commandes ; le compteur de slide accompagne désormais la barre de progression.
- Origine des métadonnées dynamiques stabilisée sur `VITE_SITE_URL`, avec repli sur le domaine public final, pour empêcher la reprise d’un éventuel port interne Coolify dans les URL canoniques et Open Graph.
- Nginx configuré pour ne jamais propager `:8080` dans une redirection (`absolute_redirect off`, `port_in_redirect off`) ; les chemins partenaires avec slash terminal sont canonisés par redirection relative 308.
- Canonisation des trois parcours partenaires sans slash terminal, avec conservation explicite des paramètres de requête, notamment `?slide=` et `?detail=` de la présentation.
- Navigation du deck consolidée sur le chemin relatif `/partenaires/presentation` : la pagination produit des URL internes canoniques, sans origine reconstruite ni port de service.
- Contenu des neuf slides partenaire recomposé : explication, mise en contexte, trois effets attendus et valeur de contribution structurent une colonne narrative majoritaire ; la zone d’illustration, élargie à droite, accueille des schémas narratifs sans panneau ni effet glassmorphism.
- La phrase d’instruction « Ouvrez les repères ci-dessous… » est retirée du deck ; les accordéons restent disponibles comme approfondissement facultatif.
- Schémas narratifs rendus exploratoires : chaque repère répond au survol, au focus ou au clic, modifie l’élément actif et affiche une explication complémentaire ; le radar de la première slide adopte aussi l’activation au survol.
- Entrées directionnelles de 260 ms ajoutées aux slides lors d’une navigation par commande, sans animation pour les flèches clavier ni pour les préférences de mouvement réduit.
- Illustrations du deck recomposées dans un système commun : étapes contenues dans leurs tuiles, explication contextuelle séparée, zone de schéma élargie et colonne textuelle resserrée pour éliminer les chevauchements ; le cycle utilise une matrice à quatre temps et les signaux des barres progressives.
- Accueil repositionné comme site compagnon d’un outil en co-conception : partenaires institutionnels, structures, associations, réseaux, collectifs et contributeurs individuels sont identifiés dès le hero ; le questionnaire partenaire devient l’action principale.
- Page Partenaires recentrée sur la phase 1 : rôle de réflexion, co-conception, prototypage et relais explicité ; le questionnaire, la demande d’invitation et la préparation de l’atelier deviennent le chemin d’engagement prioritaire.
- Chemin de vie du site rendu explicite : mobilisation et écoute, travail collectif, prototype et tests, puis diffusion et accompagnement, sans annoncer comme actifs les contenus des phases futures.
- Pages Projet, Méthode, Expérience et Calendrier alignées sur ce déroulé : les partenaires relient l’outil aux artistes, le questionnaire prépare l’atelier et les phases suivantes restent formulées comme des étapes à venir.
- Métadonnées SEO actualisées pour présenter le site comme le compagnon d’un outil en co-conception et préciser le rôle des partenaires dans les aperçus de partage.
- Parcours Accueil → Page Partenaires → Questionnaire et calendrier de phase 1 contrôlés visuellement : l’action principale mène au point d’entrée qui propose une invitation tant que la collecte sécurisée n’est pas activée.
- Accueil et métadonnées de partage contrôlés dans le navigateur : titre, description et Open Graph identifient bien le site compagnon d’un outil en co-conception destiné aux partenaires culturels.
- Plan d’optimisation rédactionnelle ajouté dans `docs/`, avec diagnostic des promesses au présent, répétitions, CTA et affirmations documentaires à vérifier avant réécriture.
- Première passe éditoriale appliquée : Accueil, Projet, Expérience et Calendrier distinguent la co-conception du futur outil ; Références renonce aux revendications d’exclusivité non étayées ; Méthode et Partenaires resserrent leurs répétitions et CTA.
- Seconde passe éditoriale appliquée : Recherche distingue les constats sourcés des pistes de conception ; Partenaires clarifie les étapes et contreparties de contribution ; le footer décrit le projet au stade de co-conception.
- Troisième passe éditoriale appliquée : Ressources devient « Documents et sources », les fiches et liens précisent le type d’accès, et les microtextes de navigation, footer, accueil, méthode et questionnaire annoncent l’action attendue.
- Quatrième passe éditoriale appliquée : Projet et Méthode distinguent les engagements actuels, les choix à confirmer et les fonctions futures ; le parcours, les comparaisons, l’architecture et les CTA sont resserrés.
- Cinquième passe éditoriale appliquée : les pages historiques sont archivées sous Ressources ou redirigées vers leur page canonique, avec redirections applicatives et HTTP 301 prévues dans Nginx.
- Diagnostic du domaine public : chemin IPv4, TLS et certificat validés ; CNAME/IPv6 défaillant identifié et procédure de remplacement par A record documentée.
- Sixième passe éditoriale appliquée : Ressources filtre désormais par catégorie et période ; les archives Markdown affichent leur statut, leur date connue et le contexte de leurs affirmations datées.
- Contrôle des liens d’archives : 152 URL externes uniques vérifiées, rapport de qualification des 404 et accès protégés, et icône accessible ajoutée aux liens sortants.
- Liens d’archives actualisés : les destinations officielles identifiées remplacent les 404 ; Diag-numerique et une référence ScienceDirect sont archivés sans lien actif ; les fiches d’archive affichent le dernier contrôle.
- Ressources : recherche par mot-clé ajoutée avec suggestions accessibles, prise en charge des accents et combinaison avec les filtres existants de catégorie et de période.
- Les données et fonctions de recherche Ressources sont rendues réutilisables par la page 404 afin que les deux parcours proposent les mêmes résultats et suggestions.
- Registre SEO complété par l’itinéraire `/404`, explicitement non indexable.
- Référentiel SEO unique ajouté dans `shared/seo-pages.json` : l’interface React, les aperçus de partage et la génération statique utilisent désormais les mêmes titres, descriptions, canoniques, directives d’indexation et fils d’Ariane.
- Génération post-build de pages HTML complètes : les dix routes indexables contiennent désormais leur titre, description, canonique, `h1`, navigation, liens de parcours et graphe JSON-LD avant toute exécution de JavaScript.
- Graphe JSON-LD consolidé par page avec `WebSite`, `Organization`, `WebPage` et `BreadcrumbList` lorsque pertinent ; les données décrivent uniquement le contenu visible et les relations réellement établies.
- Fichiers `llms.txt`, `robots.txt`, `sitemap.xml` et `404.html` produits dans la sortie de build ; `llms.txt` explicite le statut de co-conception, les publics prioritaires et les parcours sans prétendre garantir une citation par un assistant tiers.
- Nginx sert les index HTML compilés et retourne une vraie 404 pour les routes inconnues au lieu d’un fallback SPA assimilable à une soft 404.
- Commande `pnpm verify:seo` ajoutée puis intégrée à `pnpm verify` : elle contrôle les pages HTML, titres, descriptions, canoniques, graphes JSON-LD, assets, sitemap, robots, llms.txt et parcours non indexables.
- Pré-rendu HTML de l’accueil, description SEO et `llms.txt` alignés sur les trois parcours ; les paramètres `?public=` restent des états de lecture partageables et ne modifient pas la canonique de la page.
- Réécriture éditoriale complète de l’accueil : le hero répond désormais à la raison d’être de la Boussole, à ses bénéficiaires premiers et à son statut de co-conception ; le tronc commun nomme des difficultés concrètes et l’opportunité d’une amélioration progressive.
- Parcours Institutionnel, Artiste et Enjeux du numérique reconstruits sur une même logique : situation spécifique, apport ou bénéfice concret, trois questions utiles, deux actions hiérarchisées et un lien de profondeur explicitement annoncé.
- Liens, pré-rendu HTML, meta description et manifeste conversationnel de l’accueil alignés sur la nouvelle promesse, les rôles et le statut réel du projet.

### Vérifié

- Vérifications TypeScript, build du portail et build de l’API partenaire via `pnpm verify`.
- Routes profondes de présentation, questionnaire et administration contrôlées dans le build statique.
- Navigation du deck, ouverture des détails, retour navigateur, gabarit desktop et absence de débordement horizontal contrôlés visuellement.
- Pages Recherche et Partenaires contrôlées visuellement après la seconde passe ; premier écran, deux parcours d’entrée, CTA de contribution et hiérarchie documentaire validés.
- Fallback `/liaison-introuvable` contrôlé visuellement : hiérarchie, contraste, raccourcis et CTA de retour lisibles ; la requête « UNESCO » fait apparaître la source correspondante.
- Route `/404` contrôlée : titre « Page introuvable », canonique dédiée et directive `noindex,follow` rendus dans le navigateur.
- Slide partenaire 7 contrôlée visuellement : le titre tient sur une ligne à largeur desktop, la barre est située entre Précédent et Suivant, et le contenu utile gagne 50 px de hauteur ; les canoniques et Open Graph n’exposent pas le port interne.
- Première slide contrôlée visuellement : le radar sans overlay affiche les cinq dimensions, et le choix de « Compétences » met à jour son résumé contextuel.
- Slide 3 contrôlée visuellement : le texte occupe la colonne principale, la valeur partenaire ancre la lecture vers le bas, et le schéma Décrire → Situer → Agir est rendu sans capsule extérieure.
- Zone narrative desktop portée à 580 px et contrôlée sans défilement interne avant la navigation, afin de conserver le récit, le schéma et les commandes dans un même gabarit de lecture.
- Schéma de la slide 3 contrôlé : l’activation de « Situer » sélectionne le repère central et met à jour l’explication narrative correspondante.
- Passage commandé de la slide 3 à la slide 4 et schéma « Les réalités à relier » contrôlés : la sélection de « Besoins » modifie l’élément actif et son explication sans perturber les commandes de navigation.
- Animation de transition contrôlée dans le navigateur : la slide appelée par une commande porte une entrée directionnelle de 0,26 s ; TypeScript et le build final sont validés.
- Slides 2 et 5 contrôlées visuellement : les barres de signaux et les quatre temps du cycle occupent la zone d’illustration sans libellé flottant, ni superposition avec l’explication narrative.
- Slides 1 et 9 contrôlées visuellement : le radar reste contenu et lisible dans sa zone élargie ; les étapes Invitation, Brouillon et Contribution sont alignées, contenues et accompagnées de leur lecture narrative.
- Compilation TypeScript et build final validés après l’application systématique de cette composition aux neuf slides.
- Audit SEO-GEO contrôlé : les dix pages indexables générées ont chacune une meta description, une URL canonique, un `h1`, un graphe JSON-LD valide et des assets compilés ; les trois parcours privés et la 404 sont non indexables.
- Contrôle navigateur de la page Partenaires : après hydratation React, une seule meta description, une seule canonique et un seul graphe JSON-LD à quatre entités subsistent.
- Présentation partenaire contrôlée sur les slides 3 puis 4 : le bouton Suivant met à jour uniquement `?slide=`, le compteur correspond au contenu et l’URL reste relative au domaine public.
- Vérification complète `pnpm verify` validée : TypeScript du portail et de l’API, build statique, `pnpm verify:seo` et build de l’API partenaire passent.
- Accueil neutre, parcours Partenaire, Artiste et Enjeux numériques contrôlés visuellement ; les URLs partageables activent le bon récit, le retour vers les trois choix est disponible et le fallback e-mail apparaît tant que l’API n’est pas configurée.
- Contrôle DOM du parcours Enjeux numériques : états `aria-pressed` cohérents, titre de récit focalisable, une canonique sans paramètre et un seul graphe JSON-LD après hydratation.
- Validation finale : TypeScript du portail et de l’API, build statique, vérification SEO-GEO et build de l’API partenaire passent après l’ajout des parcours par persona et de la collecte d’intérêt.
- FAQ partenaire, Artiste et Enjeux numériques contrôlées visuellement : les réponses se remplacent correctement, les questions restent adaptées au parcours actif et les liens contextuels vers les phases, l’expérience et les sources sont accessibles.
- Les trois parcours contrôlés après restauration des visuels : radars activables et boussoles interactives présents, commentaires mis à jour au clic et deux CTA seulement dans chaque récit. Le contrôle DOM confirme une séparation de 16 px entre le radar et son commentaire.
- Vérification complète `pnpm verify` validée après ces corrections : TypeScript, build statique, vérification SEO-GEO et build de l’API partenaire passent.
- Rendu de l’accueil contrôlé après relance du serveur : les éléments annotés ont disparu, le nouvel intitulé est correctement hiérarchisé et les trois profils restent accessibles.
- Vérification complète `pnpm verify` validée après la simplification : TypeScript, build statique, vérification SEO-GEO et build de l’API partenaire passent.
- Changement direct de profil et maintien du sous-menu au défilement contrôlés : une seule entrée est active, le menu reste fixé sous la navigation globale et l’URL ainsi que le récit sont actualisés.
- Page Expérience contrôlée : l’icône Outils met à jour sa lecture contextuelle, tandis que les points du radar ne sont plus exposés comme contrôles ni accessibles au focus.
- Parcours Artiste contrôlé : l’icône Compétences met à jour le radar partagé, l’étape Situer met à jour la boussole et les contrôles restent distincts des points du tracé.
- Contrôles récents consolidés : les profils actifs, les cinq icônes radar, les boussoles, les CTA limités à deux et la lecture mobile des étapes sont validés ; TypeScript, build statique, vérification SEO-GEO et API partenaire passent.
- Sélection Artiste contrôlée : le sous-menu sticky reste visible tandis que la totalité du radar est dégagée sous son ancre.
- Sélection Artiste affinée : le séparateur du récit s’aligne exactement sous le sous-menu, sans espace blanc excessif avant le contenu.
- Défilement fluide contrôlé sur Institutionnel et Enjeux du numérique : les deux récits atteignent leur séparateur, radars et boussoles entièrement visibles ; l’animation est automatiquement désactivée si `prefers-reduced-motion` est activé.
- Accueil contrôlé : les CTA orange sont présents en état neutre ; le CTA Artiste ouvre son récit et le sous-menu actif apparaît après les cartes, puis disparaît au retour dans le hero.
- Accueil final contrôlé : une seule rangée de capsules colorées est présente dans le hero ; le parcours Institutionnel ouvre correctement le récit et le sous-menu contextuel persiste après le dépassement du hero.
- Transition Artiste contrôlée : le sous-menu est disponible dès l’amorce du défilement, puis le récit, les deux CTA, le radar et la boussole arrivent avec le profil actif conservé.
- Défilement aller-retour Artiste contrôlé : le sous-menu reste visible après le dépassement des capsules et disparaît seulement lorsqu’elles reviennent dans le hero.
- Réécriture contrôlée sur les trois parcours : Institutionnel, Artiste et Enjeux du numérique expliquent chacun une situation, une contribution ou un bénéfice, l’étape actuelle et des liens cohérents ; la page hydratée conserve une canonique sans paramètre et un unique graphe JSON-LD.

## [1.1.0] — 2026-08-09 au 2026-08-12 — Alignement institutionnel, accessibilité et diffusion

### Ajouté

- Contenu du portail aligné sur le dossier de subvention : principes, évaluation continue, neutralité de l’annuaire, partenaires confirmés et calendrier de 24 mois en quatre phases.
- Encarts de soutien de la Ville de Genève avec logo fourni et lien vers la démarche publique, sur les pages Projet et Partenaires.
- Partenaires confirmés : Fonction:Cinéma, Pôle de création numérique, XN Swiss et Observatoire Romand de la Culture, avec leurs liens respectifs.
- Référence **Digitale Transformatie Scan** de DEN intégrée au tableau comparatif et à sa fiche détaillée.
- Sommaire actif de la page Projet, barre de progression de lecture et sélecteur mobile fixe.
- Fil d’Ariane centralisé, compact sur écrans étroits et prêt à accueillir un troisième niveau.
- SEO complet par route : titres, descriptions, balises Open Graph et Twitter, URL canoniques, JSON-LD, sitemap, robots et pages statiques pour les robots sociaux.
- Scripts de vérification du menu mobile, de l’accessibilité, du contraste et du tableau comparatif responsive.
- Kit de déploiement autonome : Dockerfile Nginx, configuration SPA, CI GitHub, guides Coolify et règles pour Cursor, Codex et Claude Code.
- Documents de continuité `CHANGELOG.md`, `STORY.md`, `AGENTS.md`, `docs/README.md` et diagnostics de domaine.

### Modifié

- Navigation principale resserrée à **Projet, Calendrier, Expérience, Méthode, Partenaires**. Recherche et Ressources sont conservées dans le footer et reliées depuis les pages pertinentes.
- Méthode et Gouvernance réunies afin d’éviter deux récits concurrents de la même démarche.
- Hero d’accueil et hero Partenaires allégés, avec davantage d’espace, des CTA hiérarchisés et une lecture mobile plus nette.
- Spectre visuel des partenaires harmonisé de bleu à cyan, vert puis orange ; CTA orange et contenus de pastilles blancs.
- Tableau de références repensé pour mobile : défilement tactile, colonne de noms figée, en-têtes raccourcis, pictogrammes et largeur optimisée.
- Boussole interactive simplifiée par suppression de ses traits de construction internes.

### Corrigé

- Débordements horizontaux, libellés dépassant sur mobile, menu burger et navigation clavier sur les pages publiques.
- Contrastes, hiérarchie de titres, lien d’évitement, préférences de mouvement réduit et libellés ARIA.
- Fil d’Ariane dupliqué sur la page Projet et comportement sticky du sommaire desktop.
- Cohérence des liens partenaires, des CTA et des libellés blancs sur les fonds colorés.

## [1.0.0] — 2026-03-04 au 2026-08-08 — Portail institutionnel et base documentaire

### Ajouté

- Pages publiques de présentation du projet, calendrier, expérience Boussole, méthode, partenaires, recherche, références et ressources.
- Page de projet longue avec note d’intention, contexte, cinq dimensions, parcours en trois temps, principes, architecture et calendrier.
- Expérience Boussole avec radar, parcours de diagnostic, restitution pédagogique et interactions au clavier.
- Recherche et contexte : insights structurés, sources, documents, liens vers les sections pertinentes et références comparables.
- Tableau de positionnement puis comparatif interactif avec filtres, tri, réinitialisation et variantes responsives.
- Composants de navigation et de lecture : retour automatique en haut à chaque route, logo cliquable, menu adapté aux tablettes et schémas convertis en accordéons sur mobile.
- Table des matières interactive sur la page projet, avec suivi de section par `IntersectionObserver` et commande mobile.
- Premières intégrations d’analytique et scripts de contrôle du projet.

### Modifié

- Contenus, structure éditoriale, intitulés et CTA affinés au fil de la recherche documentaire et des retours de lecture.
- Dépendances minimales mises à jour et composants responsive consolidés.

## [0.1.0] — 2026-02-09 — Initialisation

### Ajouté

- Initialisation du dépôt avec React 19, TypeScript, Vite, Tailwind CSS 4, Wouter et shadcn/ui.
- Première structure de navigation, thèmes, composants et pages éditoriales.

# STORY.md — Boussole Numérique Culture

## 1. Raison d’être du projet

**Boussole Numérique Culture** est un outil en co-conception et son site compagnon. La future version aidera les actrices, acteurs et structures culturelles à situer leurs pratiques numériques, à reconnaître leurs priorités et à choisir des pistes d’action compréhensibles. Le site rend l’outil, son contexte, ses références, ses principes de gouvernance et les manières de contribuer lisibles au fil de son développement.

Le site n’est pas le diagnostic public lui-même. Il s’adresse d’abord aux institutions, structures, associations, réseaux et collectifs culturels capables de relier l’outil aux artistes et aux personnes actives dans la culture. Il rend l’intention lisible, matérialise une première expérience de Boussole et prépare le pilote partenaire. Il doit pouvoir être maintenu et déployé indépendamment de Manus, par l’équipe de projet ou par des agents de code compatibles.

> **Positionnement.** Une ressource de repérage et de dialogue destinée au secteur culturel, qui privilégie des prochaines étapes adaptées plutôt qu’une évaluation unique ou une prescription d’outils.

## 2. Contexte institutionnel et produit

Le projet est présenté dans le cadre d’une demande de soutien culturel. Le site doit donc rester sobre, documenté et cohérent avec une lecture institutionnelle : il décrit la méthode, les références comparables, les principes de neutralité, l’évaluation continue et le calendrier sans présenter de projections fermes.

La version actuelle distingue quatre couches complémentaires : le récit institutionnel, l’expérience Boussole illustrée, la recherche documentée et le parcours partenaire. L’expérience permet de comprendre la logique du diagnostic ; le parcours partenaire prépare la collecte qualitative qui nourrira l’atelier de co-conception et le prototype public.

| Couche | Rôle | État actuel |
|---|---|---|
| Site compagnon | Identifier les partenaires, présenter l’outil, organiser les contributions et documenter les décisions | Livré ; phase de mobilisation en cours |
| Expérience Boussole | Rendre les cinq dimensions et le parcours perceptibles | Livrée sous forme de démonstration interactive |
| Module partenaire | Présentation, invitations, questionnaire, administration et synthèses | Code livré ; activation Coolify à réaliser |
| Recherche et ressources | Montrer l’apprentissage à partir de l’existant | Livré et relié au portail |

La recherche ne sert pas à prouver par avance l’utilité de la future Boussole. Elle rassemble des constats sourcés et des références qui éclairent les questions à tester avec les partenaires. Les pages éditoriales ont été relues selon cette même distinction : les engagements actuels du projet restent au présent ; les fonctions de l’outil public sont formulées au futur.

## 3. Publics et parcours

| Public | Question à laquelle le portail répond | Parcours principal |
|---|---|---|
| Partenaires culturels | « Comment relier la conception de l’outil aux réalités des artistes et contribuer au prototype ? » | Accueil → `?public=partenaire` → Présentation ou Questionnaire |
| Artistes et personnes actives dans la culture | « Quelles situations de mon quotidien l’outil devrait-il mieux comprendre et quelles améliorations seraient utiles ? » | Accueil → `?public=artiste` → Expérience ou manifestation d’intérêt |
| Interlocuteurs institutionnels | « Le projet est-il cohérent, documenté et gouverné ? » | Projet → Calendrier → Méthode → Références |
| Équipe de projet | « Comment activer, maintenir et faire évoluer le dispositif ? » | README → docs → AGENTS → Coolify |

Le menu public reste volontairement court : **Projet, Calendrier, Expérience, Méthode, Partenaires**. L’accueil est le lanceur de deux parcours : il ne présuppose pas le rôle de la personne, explique que le site existe alors que l’outil reste à construire, puis déploie un contenu adapté après sélection. La page Partenaires conserve l’entrée détaillée des organisations. Les contenus de recherche et de ressources sont accessibles depuis le footer et les liens contextuels. Le fil d’Ariane fournit un repère unique dans les sous-pages ; les retours redondants dans le contenu ont été retirés.

Le premier écran de l’accueil répond à la confusion relevée lors des retours de lecture. Il annonce que le portail est le **site compagnon** d’une Boussole Numérique Culture en préparation et que la Boussole n’existe pas encore comme outil utilisable. Il expose ensuite quatre jalons visibles : recueil des retours aujourd’hui, atelier et cadrage entre septembre et octobre 2026, prototype à tester visé fin 2026, puis ouverture publique visée début 2027. Deux capsules colorées, Partenaire culturel et Artiste, réunissent l’icône, l’intitulé et le périmètre de chaque public.

La promesse de l’accueil part désormais de la raison d’être de la Boussole : les difficultés numériques ordinaires — fichiers dispersés, outils de partage mal ajustés, procédures de collaboration opaques — coûtent du temps, compliquent les choix et peuvent isoler les artistes. Le projet cherche à rendre ces situations discutables sans les transformer en note ou en jugement. La future Boussole devra permettre de choisir une première amélioration compréhensible, puis d’avancer progressivement avec les personnes concernées.

La consolidation du 16 août 2026 fixe le fonctionnement de cette entrée : un clic sur une capsule rend immédiatement visible le sous-menu de deux profils et lance le défilement vers le récit correspondant. Ce sous-menu reste disponible pendant toute la lecture du récit, conserve le profil actif en couleur et ne disparaît qu’au retour effectif des capsules dans le hero. La marge d’ancrage s’adapte à la hauteur des barres fixes — 7 rem sur mobile et 8 rem à partir de `sm` — afin que le début du récit, le radar et ses icônes ne soient pas masqués. L’ancienne URL `?public=enjeux-numeriques` revient à l’accueil neutre, sans afficher de parcours devenu obsolète.

## 4. Ce qui est effectivement livré

### Portail et expérience

Le portail comporte un hero éditorial, la présentation détaillée du projet, le calendrier en quatre phases sur vingt-quatre mois, l’expérience interactive, la méthode enrichie des principes de gouvernance, les partenaires et les références. La page Projet propose un sommaire sticky sur desktop, un sélecteur mobile et une progression de lecture. La page Références fournit un comparatif adapté aux petits écrans : défilement horizontal, colonne de noms fixée et intitulés compacts. La page Recherche présente quinze constats documentés et distingue les données sources des pistes de conception qui restent à tester.

La page Ressources rassemble les documents internes, les études externes et les sources qui accompagnent la co-conception. Ses fiches distinguent le document interne à lire, le PDF externe à ouvrir et la source web à consulter. Les CTA transversaux emploient le même principe : ils annoncent l’action et le contenu de la destination, sans supposer qu’un diagnostic public est déjà actif.

Toute URL inconnue ouvre une page 404 en français, sans impasse : elle reprend la recherche locale des documents et sources, ses suggestions et son filtrage tolérant aux accents. Les premiers résultats apparaissent directement dans la page, tandis que les accès vers Projet, Expérience, Méthode, Partenaires, Ressources et Accueil offrent des chemins de reprise explicites. La route `/404` est non indexable. En production, Nginx sert aussi un document `404.html` avec statut HTTP 404 pour éviter qu’une adresse inconnue ne devienne une soft 404 indexable.

Les routes publiques indexables sont pré-rendues après Vite. Leurs fichiers HTML portent une synthèse sémantique fidèle de la page, avec un `h1`, des sections de contexte et des liens de parcours ; React remplace ensuite cette première couche par l’interface complète. Cette architecture conserve la navigation interactive tout en donnant aux moteurs, robots sociaux et outils qui n’exécutent pas JavaScript un contenu, un titre, une description, une canonique et un graphe JSON-LD déjà présents dans la réponse HTML.

La phase actuelle du site compagnon informe et recueille les retours. Le questionnaire partenaire recueille besoins, priorités, idées et points de vigilance ; les contributions prépareront un atelier, puis une séance de cadrage, entre septembre et octobre 2026. Le prototype à tester est visé fin 2026 et l’ouverture publique début 2027. Le calendrier conserve ensuite ses phases indicatives de test, diffusion et accompagnement, sans présenter les jalons comme acquis avant les décisions collectives.

L’accueil traduit cette mobilisation par deux parcours : partenaires culturels et artistes. Le choix est réversible et mémorisé dans `?public=partenaire` ou `?public=artiste` pour partager un état de lecture, sans créer de variante SEO : la canonique reste celle de l’accueil. Chaque parcours déploie une intention, trois questions, une proposition de contribution et une représentation explicative du futur outil.

Le parcours Partenaire culturel explique comment une structure ou un réseau peut rendre visibles les situations que les artistes rencontrent, contribuer au cadrage et préparer les conditions d’un test, sans valider un outil déjà décidé. Le parcours Artiste établit que l’on n’a pas à devenir spécialiste du numérique pour exprimer une friction, un besoin ou une amélioration souhaitée. Les deux récits présentent la Boussole comme un état des lieux non jugeant, accompagné à terme de conseils actionnables sur les outils, les procédures et la collaboration. Ils renvoient vers le questionnaire, la présentation, l’expérience illustrative ou la manifestation d’intérêt selon le rôle choisi.

La cohérence éditoriale de l’accueil est également portée par les sorties non visuelles : le pré-rendu HTML, la description SEO, les données structurées et `llms.txt` reprennent la même promesse, les mêmes publics et le même statut de co-conception. Les états `?public=` restent partageables pour ouvrir le bon récit, sans créer de variante indexable : la canonique de l’accueil ne porte pas de paramètre.

Chaque parcours déploie ensuite une FAQ de trois réponses utiles à sa situation. Les réponses ne répètent pas le récit : elles rappellent que la Boussole n’est pas encore disponible, précisent l’engagement attendu, la non-évaluation et les façons de contribuer. Une seule réponse est ouverte à la fois ; le contrôle expose son état et son panneau associé, puis propose les liens d’approfondissement utiles sans sortir prématurément du parcours.

Les deux parcours disposent aussi de deux repères interactifs plutôt que d’une illustration décorative isolée. Le premier est un radar dont les cinq dimensions sont adaptées à la personne sélectionnée : gestes de relais pour les partenaires, dimensions de pratiques pour les artistes. Ses points restent graphiques ; les cinq icônes périphériques fixes portent les gestes de survol, focus, clic et clavier, puis actualisent le commentaire. Le second est une boussole en trois étapes — « Écouter → Traduire → Relier » ou « Décrire → Situer → Agir ». Ces visualisations sont des représentations explicatives du futur prototype, non un diagnostic actif. Le commentaire du radar appartient au flux du document, sous le SVG, afin de rester lisible sur mobile.

La boussole conserve une grille sur écran moyen et large, mais devient une colonne de grandes cibles tactiles sous le breakpoint `sm`. Chaque étape mesure au moins 92 px de haut et porte un libellé de 12 px minimum ; cette bascule empêche que trois formulations et leurs sous-titres se retrouvent comprimés dans une même ligne mobile. Les traits verticaux décoratifs du récit, du message de contribution et du résumé de la boussole sont retirés afin de laisser la hiérarchie typographique porter la lecture.

Le récit principal conserve exactement deux actions : une action primaire orange et une action secondaire liée au profil. Les liens d’approfondissement restent dans les réponses de FAQ ou la navigation globale, afin de ne pas diluer la décision demandée au moment du choix de parcours. Dès le clic sur une capsule, le sous-menu contextuel affiche Partenaire culturel et Artiste sous la navigation principale, avant même la fin du défilement vers le récit : le choix en cours est coloré, l’autre reste immédiatement disponible et l’URL, le récit, la FAQ et les visualisations se synchronisent au changement. Après l’arrivée, le sous-menu est maintenu dans tout le récit : son seuil observe le bas de la rangée de capsules par rapport à 112 px sur mobile et 128 px à partir de `sm`, soit la hauteur des barres fixes. Il ne se masque donc que lorsque les capsules reviennent effectivement dans le hero sous ces barres. Les libellés conservent leur forme complète sur petits écrans. Le récit ciblé possède une marge d’ancrage de 7 rem sur mobile et 8 rem à partir de `sm`, égale aux hauteurs respectives des barres fixes : le séparateur du récit arrive sous le sous-menu, tandis que le radar et ses icônes restent dégagés.

Le clic sur une carte de profil utilise un défilement fluide jusqu’au récit, puis place le focus sans modifier la position de lecture. Lorsque la préférence `prefers-reduced-motion` est active, ce déplacement est immédiat. Institutionnel, Artiste et Enjeux du numérique partagent ce même comportement, avec leur propre radar et leur boussole intégralement visibles au terme du déplacement.

Les manifestations d’intérêt sont distinctes du questionnaire partenaire. Après activation de l’API, le formulaire public conserve dans `public_interest_submissions` le consentement, le public déclaré, le souhait d’être invité·e à un atelier et/ou d’être informé·e d’une ouverture, ainsi que la page d’origine. Sans `VITE_PARTNER_API_URL`, aucun faux formulaire ne s’affiche : un relais e-mail honnête reste disponible. La console `/admin` prévoit la consultation et l’export CSV dédiés.

L’expérience Boussole utilise cinq dimensions pour rendre le diagnostic tangible. Le radar animé de l’accueil est fourni par le composant partagé `AnimatedRadarGraphic`. Il ouvre la présentation partenaire comme visualisation exploratoire, sans overlay glassmorphism : les points du tracé restent graphiques, tandis que les cinq icônes périphériques fixes répondent au survol, au focus, au clic et au clavier puis mettent à jour une lecture contextuelle. Les autres slides n’emploient pas de radar afin que chaque illustration conserve un rôle propre.

La page Expérience conserve son propre radar explicatif. Ses cinq points visualisent le tracé animé, mais ne sont pas des contrôles : les cinq icônes périphériques fixes sont les seules à pouvoir être activées au clic ou au clavier. Elles sélectionnent une dimension, mettent leur propre état en évidence et ouvrent la lecture associée sous le graphique. Cette séparation évite de suggérer que le point du radar serait la cible interactive.

### Présentation partenaire

La route `/partenaires/presentation` contient neuf slides. Les détails sont dépliables au clavier, les liens contextuels ouvrent les pages utiles et l’URL conserve `slide` et `detail` pour que le bouton précédent du navigateur retrouve le contexte de lecture. Le deck produit uniquement des chemins relatifs de la forme `/partenaires/presentation?slide=3` : aucune navigation ne reconstruit une origine ou ne peut exposer le port interne. Les URLs avec slash terminal sont redirigées vers ce chemin canonique par Nginx, en préservant les paramètres de slide et de détail. Le deck desktop utilise un gabarit interne de 950 px : titre compact, navigation fixe et panneaux défilables dans l’espace restant. La barre de progression est placée entre les commandes Précédent et Suivant, avec un compteur de slide ; l’aide textuelle redondante est retirée. Sur mobile, les colonnes se replient et les commandes restent accessibles.

La première slide utilise le radar animé ; les huit autres s’appuient sur `InteractiveNarrativeIllustration`. Chaque composant relie un schéma à une idée précise : signaux du terrain, parcours, réalités à relier, lecture sans note unique, conditions de confiance, écoute, atelier ou contribution. Les retours de navigation redondants et les icônes décoratives inutiles ont été supprimés lors des derniers ajustements visuels.

Les neuf slides sont construites comme un récit partenaire. La colonne de gauche reste majoritaire et réunit l’intention, le contexte, trois effets attendus et la valeur concrète de la contribution. La zone d’illustration de droite est volontairement plus large qu’auparavant : elle accueille un schéma propre à chaque propos, sans carte extérieure, bordure décorative ou glassmorphism qui le dissocierait du récit. Les accordéons prolongent la lecture sans être annoncés par un texte d’instruction redondant.

Le haut de chaque slide conserve une zone narrative de 580 px sur desktop. Cette hauteur évite un défilement interne avant les commandes tout en laissant le texte et son illustration dans le même champ de lecture. Les accordéons restent dans la partie basse, séparés par la navigation fixe.

Les schémas du tiers droit ne sont pas décoratifs : chacun présente une séquence ou une relation propre au propos de la slide et expose une phrase de lecture lorsque l’un de ses repères est survolé, focalisé ou activé. Les étapes sont contenues dans des tuiles alignées, sans libellé flottant ni croisement avec l’explication. Le cycle à quatre temps s’affiche en matrice lisible ; les signaux se lisent comme des barres progressives. Les transitions entre slides sont directionnelles et limitées à 260 ms lors des actions de navigation ; les raccourcis clavier restent instantanés et les animations sont coupées lorsque la préférence système de mouvement réduit est active.

### Questionnaire, données et administration

Le module partenaire est présent dans `services/partner-feedback-api/`. Il gère les organisations, contacts, invitations, demandes d’invitation, versions du questionnaire, réponses, événements et boîte d’envoi. Les réponses peuvent être enregistrées comme brouillons, soumises après consentement, complétées à l’oral si Deepgram est activé puis relues avant enregistrement.

Les liens personnels utilisent un jeton aléatoire qui n’est conservé qu’après empreinte SHA-256 et ajout d’un secret serveur. L’administration est rendue à `/admin` et `/partenaires/admin`, mais ne devient fonctionnelle qu’après activation de l’API, de PostgreSQL et des secrets dans Coolify. Les sessions d’administration sont signées et conservées dans un cookie `httpOnly` limité à l’API.

Après chaque soumission, l’API prépare un e-mail de récapitulatif déterministe dans `notifications.partner_response_recap_outbox`. Dreamlit doit surveiller uniquement cette boîte d’envoi, à laquelle elle reçoit des droits limités. La console affiche ces messages prêts, leur contenu et leur compteur de régénération ; une régénération met à jour la même ligne sans créer de doublon.

## 5. Décisions structurantes

| Décision | Raison | Effet pratique |
|---|---|---|
| Portail et API séparés | Les pages publiques n’ont pas besoin de secrets | Le frontend reste déployable statiquement ; les données restent dans l’API privée |
| Docker + Nginx | Déploiement reproductible hors plateforme | Fallback SPA, cache des actifs et compatibilité Coolify |
| PostgreSQL privé | Invitations et réponses ne sont pas des données de contenu public | Base non exposée au portail ; accès contrôlé pour l’API et Dreamlit |
| Questionnaire versionné | Les résultats doivent être interprétables dans le temps | La définition du questionnaire est figée avec la réponse |
| Synthèse déterministe | Une personne reçoit une trace fidèle de sa contribution | Pas de diagnostic ou d’inférence automatique dans l’e-mail |
| Boîte Dreamlit restreinte | L’outil d’e-mail ne doit pas lire les réponses brutes | Dreamlit consomme uniquement destinataire, objet et texte préparé |
| Fil d’Ariane unique | Éviter les parcours redondants | Les sous-pages n’affichent pas un second retour concurrent |
| Direction bleu → cyan → vert → orange | Conserver un langage visuel commun | Les contributions, étapes et CTA restent immédiatement identifiables |
| Schémas partenaires alignés | Une illustration doit expliquer le récit, sans empiéter sur lui | Chaque slide associe un schéma interactif, des repères contenus et une phrase contextuelle séparée |
| Animation de navigation mesurée | Une transition doit orienter sans ralentir la consultation | Les commandes produisent une entrée directionnelle de 260 ms ; clavier et mouvement réduit évitent l’animation |
| Open Graph statique et dynamique | Les robots sociaux ne dépendent pas de JavaScript | Les balises de partage sont injectées au build et mises à jour à chaque route SPA |
| URL SEO ancrées au domaine public | Le proxy ne doit jamais faire remonter son port interne dans les métadonnées | `VITE_SITE_URL`, ou le domaine final en repli, construit les canoniques, Open Graph et JSON-LD côté interface |
| Redirections relatives sans port interne | Coolify utilise le port 8080 derrière son proxy HTTPS, qui ne doit jamais devenir une URL publique | Nginx désactive les redirections absolues et la réécriture du port ; les routes partenaires sont canonisées sans supprimer `slide` ni `detail` |
| Sitemap et robots générés au build | Le domaine final doit se propager sans édition manuelle | Les seules routes indexables entrent dans le sitemap ; les parcours privés sont exclus |
| Registre SEO unique | Le rendu HTML, la navigation SPA et les aperçus de partage ne doivent pas se contredire | `shared/seo-pages.json` porte les titres, descriptions, canoniques, directives et fils d’Ariane consommés par React et le générateur |
| HTML statique après Vite | Certains moteurs, prévisualiseurs et lecteurs ne rendent pas JavaScript | Chaque route indexable reçoit une page HTML avec son contenu de contexte, des liens et les assets compilés avant hydratation |
| Graphes JSON-LD fidèles | Une donnée structurée imprécise peut nuire à la compréhension plutôt qu’aider | Les graphes limitent les types à `WebSite`, `Organization`, `WebPage` et `BreadcrumbList` selon le contenu réellement visible |
| llms.txt descriptif | Le GEO ne garantit ni indexation ni citation par une IA | Le fichier présente le statut, le public, les parcours et le contact, tandis que le HTML éditorial reste la source principale |
| Vérification SEO automatisée | Une modification de route ou de build peut dégrader silencieusement l’indexation | `pnpm verify:seo` contrôle les sorties ; `pnpm verify` l’exécute avant le build de l’API |
| Outil en co-conception | Le site public ne doit pas annoncer un diagnostic déjà disponible | Les pages d’entrée, le calendrier et les démonstrations décrivent la future version au futur |
| Recherche documentaire distincte des promesses produit | Les sources servent à éclairer les choix, sans faire preuve de l’utilité future | La page Recherche parle de constats documentés et de questions à tester ; les pistes de conception sont nommées comme telles |
| Parcours partenaire explicite | La contribution ne doit pas être confondue avec l’accès déjà actif au diagnostic | Les entrées Présentation et Questionnaire sont séparées ; les étapes de test et les contreparties sont formulées au futur |
| CTA explicites | Une destination seule ne dit pas ce que la personne y trouvera | Les libellés indiquent l’action et l’objet : comprendre le projet, explorer une démonstration, consulter des constats ou demander une invitation |
| Engagements distincts des fonctions futures | Le projet doit présenter ses principes sans annoncer un service déjà actif | Gratuité, neutralité, code ouvert, hébergement et consentement sont formulés comme exigences de la future version ou choix à confirmer |
| Une URL historique, une destination canonique | Les anciennes pages ne doivent pas concurrencer les contenus actifs ni perdre les documents de recherche | Les documents restent sous Ressources ; Nginx et l’application redirigent les anciennes URLs |
| IPv4 avant IPv6 non configuré | Un AAAA publié doit répondre réellement, sinon le navigateur peut expirer | Le domaine final doit utiliser l’A record fonctionnel et ne publier aucun AAAA avant configuration IPv6 du serveur |
| Une archive porte sa date | Un document de recherche ne décrit pas forcément le présent | Les pages d’archive signalent leur version et le contexte des affirmations datées, sans modifier les sources originales |
| Les liens sortants sont explicitement signalés | Les archives renvoient vers des sites tiers dont le statut peut évoluer | Une icône et un texte accessible annoncent l’ouverture externe ; le rapport distingue 404 et accès protégés |
| Le contrôle d’une archive est daté | Une URL fonctionnelle un jour peut disparaître ensuite | Chaque fiche d’archive indique le dernier contrôle et les références sans remplacement restent archivées sans lien actif |
| La recherche reste guidée et locale | Les ressources sont peu nombreuses, mais leurs thèmes se recoupent | Les suggestions, le filtrage sans accent et les filtres de catégorie et date facilitent l’exploration sans service externe |
| Une page 404 réoriente plutôt qu’elle ne bloque | Une ancienne URL ou un lien externe peut rester en circulation | La page de secours propose la recherche documentaire et des accès vers les parcours publics, sans ajouter de dépendance externe |
| Le site compagnon s’adresse d’abord aux partenaires relais | L’outil doit être défini avec des organisations capables de le connecter aux artistes | Accueil, Partenaires, CTA, pages de contexte et métadonnées guident vers la découverte puis le questionnaire |
| Les phases futures sont visibles, mais non annoncées comme réalisées | La contribution actuelle doit préparer le prototype sans créer de promesse prématurée | Le déroulé distingue mobilisation, prototype, tests et diffusion ; l’atelier reste formulé comme une étape à confirmer |
| Accueil à deux profils, canonique unique | Les publics prioritaires doivent se reconnaître sans fragmenter l’indexation ni suggérer que l’outil est actif | `?public=partenaire` et `?public=artiste` partagent un état de lecture ; la page conserve une même canonique et un même graphe JSON-LD |
| Manifestation d’intérêt séparée du questionnaire | Une personne non invitée doit pouvoir rester liée à la démarche sans être assimilée à un partenaire pilote | Le formulaire stocke seulement le consentement, le public, les préférences d’information et l’origine ; l’admin et l’export restent protégés |
| FAQ propre au profil | Les questions d’un partenaire culturel et d’un artiste ne sont pas identiques | Trois réponses courtes se substituent après la sélection, avec un seul panneau ouvert et des liens de profondeur contextualisés |
| Deux repères interactifs par profil | Un seul visuel ne suffit pas à expliquer à la fois les dimensions et le geste de contribution | Le radar porte les cinq repères adaptés au rôle ; la boussole raconte ensuite le mouvement de contribution en trois étapes |
| Deux CTA dans le récit personnalisé | Des actions concurrentes affaiblissent le choix de parcours | Chaque récit expose un CTA primaire et un CTA secondaire ; les liens de profondeur migrent dans les contenus de contexte |
| Contrôles radars harmonisés | Le même geste doit avoir la même signification sur les pages et le deck | Les radars partagés et Expérience réservent leurs actions aux cinq icônes périphériques, avec une réaction de survol et de focus |
| Boussole mobile en colonne | Trois tuiles horizontales compriment les cibles et leurs libellés sur petit écran | Les étapes sont empilées avant `sm`, avec des cibles de 92 px et une grille conservée sur les écrans plus larges |
| Hero et entrée par profil allégés | Trop de microtextes peuvent retarder la reconnaissance de la promesse et des publics visés | Le hero ne garde que le nom et la promesse ; l’entrée nommée sert directement les trois cartes de profil |
| Sous-menu sticky de deux profils | Le contexte du récit peut se perdre lorsque la personne fait défiler l’accueil | Partenaire culturel et Artiste restent visibles sous la navigation, le profil actif est coloré et le basculement reste direct |
| Icônes périphériques pour le radar Expérience | La cible interactive doit être identifiable sans ambiguïté | Les points restent graphiques ; les icônes, fixes, portent les rôles, focus et états de sélection |
| Raison d’être concrète au centre de l’accueil | Une promesse abstraite efface le coût des difficultés ordinaires et l’utilité de la démarche | Le hero et le tronc commun partent des situations coûteuses, expliquent l’amélioration progressive recherchée et rappellent que les artistes restent les premiers bénéficiaires |
| Même logique, apport propre par profil | Les personas deviennent du décor s’ils répètent la même promesse | Chaque récit suit la séquence situation, apport ou bénéfice, questions, deux actions et lien de profondeur, avec un rôle distinct pour chaque public |

## 6. Stack et structure du dépôt

```text
Portail public     React 19 · TypeScript · Vite · Wouter · Tailwind CSS 4 · shadcn/ui
API partenaire     Express · TypeScript · pg · Zod · jose · nodemailer · esbuild
Base de données    PostgreSQL, déployée en service privé dans Coolify
E-mail             Dreamlit, via une boîte PostgreSQL à périmètre limité
Transcription      Deepgram, optionnelle et utilisée uniquement côté API
Hébergement        Docker · Nginx · Coolify self-hosted
Qualité            pnpm verify · TypeScript · builds · scripts mobile/contraste/SEO
```

| Emplacement | Contenu |
|---|---|
| `client/src/pages/` | Pages éditoriales, expérience et interfaces partenaires |
| `client/src/components/` | Navigation, fil d’Ariane, composants UI, `AnimatedRadarGraphic` et `InteractiveNarrativeIllustration` |
| `shared/seo-pages.json` | Source unique des métadonnées, canoniques, indexabilité et fils d’Ariane SEO |
| `client/src/lib/` | Accès au registre SEO, client API partenaire et utilitaires |
| `scripts/generate-seo.mjs` | Pré-rendu HTML, JSON-LD, sitemap, robots, llms.txt et 404 statique après Vite |
| `scripts/verify-seo.mjs` | Contrôle déterministe des sorties HTML, données structurées et fichiers de découvrabilité |
| `services/partner-feedback-api/` | API, schéma SQL idempotent, e-mail et tests de récapitulatif |
| `docs/` | Migration, opérations, activation Dreamlit, validation et archives |
| `config/ENVIRONMENT.md` | Registre des variables publiques et des secrets runtime |
| `AGENTS.md` | Règles de contribution et de synchronisation documentaire |

## 7. Jalons de développement

| Période | Résultat livré |
|---|---|
| Février 2026 | Initialisation React/Vite/Tailwind et premières pages publiques |
| Mars 2026 | Projet détaillé, expérience, navigation responsive, sommaire, recherche et comparatifs interactifs |
| Avril 2026 | Mises à jour de dépendances et durcissement minimal de la chaîne de développement |
| Été 2026 | Alignement institutionnel, calendrier, partenaires, références, accessibilité, SEO, mobile et déploiement autonome |
| 13 août 2026 | Module partenaire, console `/admin`, boîte Dreamlit, présentation interactive et documentation complète |
| 14 août 2026 | Domaine final, Open Graph, sitemap et robots générés ; deux passes de révision éditoriale ; simplification et validation des parcours Recherche et Partenaires |
| 14 août 2026 | Troisième passe éditoriale : Ressources et microtextes de navigation, footer, accueil, méthode et questionnaire alignés sur la co-conception |
| 14 août 2026 | Quatrième passe éditoriale : Projet et Méthode resserrés, parcours et comparaisons formulés comme pistes à tester, engagements et architecture clarifiés |
| 14 août 2026 | Cinquième passe éditoriale : anciennes pages consolidées, documents préservés sous Ressources, redirections canoniques documentées |
| 14 août 2026 | Diagnostic IPv6 du domaine : IPv4 et TLS valides, CNAME remplacé à prévoir par un A record sans AAAA |
| 14 août 2026 | Sixième passe éditoriale : filtres de période Ressources, métadonnées de date et bandeaux de contexte sur les archives Markdown |
| 14 août 2026 | Contrôle passif des liens des archives : rapport de 152 URL uniques et repère visuel accessible des liens sortants |
| 14 août 2026 | Traitement des 404 : destinations officielles actualisées, références sans équivalent archivées et badge de dernier contrôle ajouté aux fiches d’archive |
| 14 août 2026 | Recherche guidée ajoutée sur Ressources : suggestions thématiques, combinaison des filtres et recherche tolérante aux accents |
| 14 août 2026 | Page 404 de réorientation ajoutée : recherche locale Ressources, résultats immédiats, raccourcis publics et métadonnées non indexables |
| 15 août 2026 | Deck partenaire ajusté d’après retour visuel : 950 px, titre compact, progression entre les commandes et suppression du texte de navigation ; URL SEO sans port interne stabilisées |
| 15 août 2026 | Radar de première slide remplacé : visualisation interactive issue du langage de l’accueil, dimensions sélectionnables et suppression du panneau glassmorphism |
| 15 août 2026 | Récit partenaire recomposé : contenu dense en colonne 2/3, schémas narratifs sans cadre dans le tiers droit, phrase d’instruction retirée et valeur de contribution explicitée slide par slide |
| 15 août 2026 | Illustrations partenaires consolidées : composants exploratoires, transitions directionnelles accessibles, zone graphique élargie, étapes contenues et contrôles visuels des slides 1, 2, 5 et 9 |
| 15 août 2026 | Adressage du site compagnon clarifié : outil en co-conception, partenaires relais prioritaires, questionnaire comme action de phase 1, parcours de vie en quatre étapes et SEO aligné |
| 15 août 2026 | SEO-GEO renforcé : registre partagé, pré-rendu HTML de dix routes indexables, graphe JSON-LD consolidé, llms.txt, vraie 404 Nginx et vérification automatisée intégrée à `pnpm verify` |
| 16 août 2026 | Accueil par persona livré : trois parcours réversibles et partageables, récits et illustrations adaptés, collecte d’intérêt consentie prête côté API, console et export préparés |
| 16 août 2026 | FAQ contextuelles ajoutées aux trois parcours : réponses accessibles, accordéon à panneau unique et approfondissements liés à chaque rôle |
| 16 août 2026 | Visualisations par persona restaurées : radar et boussole interactifs adaptés, correction mobile du commentaire radar et récits limités à deux CTA |
| 16 août 2026 | Accueil simplifié selon annotations : hero ramené au titre et à la promesse, entrée par profils renommée et éléments décoratifs retirés |
| 16 août 2026 | Sous-menu sticky de profils : état actif coloré, bascule directe entre Institutionnel, Artiste et Enjeux du numérique, libellés complets sur mobile |
| 16 août 2026 | Radar de la page Expérience clarifié : icônes périphériques interactives et points du tracé rendus purement visuels |
| 16 août 2026 | Navigation partenaire sécurisée : redirections relatives sans port interne, routes canoniques sans slash terminal et conservation de `slide` et `detail` dans la pagination |
| 16 août 2026 | Accueil réécrit : raison d’être concrète, problèmes et opportunité explicités, trois parcours différenciés, statut de co-conception et liens de profondeur alignés avec le SEO-GEO |
| 16 août 2026 | Consolidation de l’accueil : sous-menu maintenu dans tout récit sélectionné, ancrage responsive, radars contrôlés par icônes, boussoles tactiles et contrôle `pnpm verify` complet après alignement du manifeste conversationnel |
| 16 août 2026 | Clarification du site compagnon : Boussole explicitement présentée comme en préparation, deux profils prioritaires, jalons automne 2026 à début 2027 et pré-rendu SEO-GEO aligné |

## 8. État d’activation et limites connues

Le portail statique peut être déployé immédiatement. Le module partenaire est implémenté et vérifié dans le dépôt, mais il n’est pas encore actif en production parce que les ressources Coolify, PostgreSQL, les secrets API, SMTP, Deepgram et le workflow Dreamlit doivent encore être configurés.

| Élément | État | Action restante |
|---|---|---|
| Portail public | IPv4 valide, IPv6 défaillant | Remplacer le CNAME par l’A record `185.131.204.133` et ne pas publier d’AAAA |
| SEO et GEO | Sorties HTML et contrôles automatisés prêts | Soumettre sitemap et domaine dans Google Search Console et Bing Webmaster Tools après publication ; fournir une image Open Graph dédiée si souhaité |
| API partenaire | Prête | Créer l’application Coolify et ses secrets |
| PostgreSQL | Prêt à initialiser | Créer le service privé et appliquer le schéma idempotent |
| Console `/admin` | Interface livrée | Définir `ADMIN_EMAIL` et `ADMIN_PASSWORD`, puis déployer l’API |
| Transcription Deepgram | Intégration livrée | Fournir `DEEPGRAM_API_KEY` |
| E-mails Dreamlit | Boîte d’envoi livrée | Créer l’utilisateur DB restreint, connecter Dreamlit et publier le workflow |
| Manifestations d’intérêt | Frontend et API livrés | Activer l’API, PostgreSQL et `RUN_MIGRATIONS=true`, puis contrôler la première soumission et l’export dans `/admin` |

Le domaine public de référence est **https://boussole-culture-recherche.memoways.com**. Cette valeur est le défaut du Dockerfile et doit aussi être renseignée comme variables de build `SITE_URL` et `VITE_SITE_URL` dans Coolify afin que les URL canoniques, Open Graph, le sitemap, `robots.txt`, `llms.txt` et les données structurées restent cohérents lors du déploiement. Le 14 août 2026, le chemin IPv4 et le certificat ont été validés, tandis que l’IPv6 héritée du CNAME ne répondait pas. La correction DNS est documentée dans [`docs/DIAGNOSTIC_DOMAINE_BOUSSOLE_2026-08-14.md`](docs/DIAGNOSTIC_DOMAINE_BOUSSOLE_2026-08-14.md).

Les contenus éditoriaux restent principalement dans les composants React. Une synthèse statique par route est maintenue dans le générateur SEO ; elle doit être revue lorsqu’un changement de fond modifie le message public d’une page. Une source de contenu structurée pourra être envisagée si les mises à jour deviennent fréquentes. Le bundle principal dépasse l’avertissement de taille Vite ; une optimisation par import dynamique est envisageable après mesure sur le domaine de production.

## 9. Documentation de référence

| Document | Usage |
|---|---|
| [`README.md`](README.md) | Démarrage, architecture et déploiement général |
| [`CHANGELOG.md`](CHANGELOG.md) | Historique des changements livrés |
| [`AGENTS.md`](AGENTS.md) | Règles de maintenance, tests et documentation |
| [`docs/README.md`](docs/README.md) | Index de tous les guides opérationnels |
| [`docs/COOLIFY_MIGRATION.md`](docs/COOLIFY_MIGRATION.md) | Déploiement autonome du portail |
| [`docs/PARTNER_FEEDBACK_OPERATIONS.md`](docs/PARTNER_FEEDBACK_OPERATIONS.md) | Activation API, PostgreSQL, administration, Deepgram et Dreamlit |
| [`docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md`](docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md) | Cadrage et décisions du module partenaire |
| [`docs/IMPLEMENTATION_ARCHIVE_PARTNER_MODULE_2026-08-13.md`](docs/IMPLEMENTATION_ARCHIVE_PARTNER_MODULE_2026-08-13.md) | Trace factuelle des fonctionnalités partenaire effectivement livrées |
| [`docs/PLAN_OPTIMISATION_REDACTIONNELLE.md`](docs/PLAN_OPTIMISATION_REDACTIONNELLE.md) | Diagnostic éditorial et séquence de réécriture à valider avant toute modification de contenu |
| [`docs/CONTROLE_ACCUEIL_PERSONAS_2026-08-16.md`](docs/CONTROLE_ACCUEIL_PERSONAS_2026-08-16.md) | Contrôle visuel, parcours, accessibilité et activation de la collecte d’intérêt |
| [`docs/PLAN_REFONTE_EDITORIALE_ACCUEIL_2026-08-16.md`](docs/PLAN_REFONTE_EDITORIALE_ACCUEIL_2026-08-16.md) | Décisions de la réécriture de l’accueil, centrée sur le pourquoi, les rôles et le statut de co-conception |
| [`docs/DIAGNOSTIC_REECRITURE_ACCUEIL_PROFILS_2026-08-16.md`](docs/DIAGNOSTIC_REECRITURE_ACCUEIL_PROFILS_2026-08-16.md) | Diagnostic des formulations et textes de référence appliqués aux trois parcours |
| [`docs/CONTROLE_REECRITURE_ACCUEIL_2026-08-16.md`](docs/CONTROLE_REECRITURE_ACCUEIL_2026-08-16.md) | Contrôle de cohérence éditoriale, SEO-GEO et point de test restant sur appareil mobile réel |
| [`docs/PLAN_CLARIFICATION_SITE_COMPAGNON_2026-08-16.md`](docs/PLAN_CLARIFICATION_SITE_COMPAGNON_2026-08-16.md) | Décisions validées sur le statut du site compagnon, les deux profils et les jalons de co-conception |

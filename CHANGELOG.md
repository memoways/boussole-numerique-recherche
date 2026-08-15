# CHANGELOG — Boussole Numérique Culture

Ce journal consolide les modifications **effectivement livrées** dans le dépôt. Il suit l’esprit de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) : chaque version décrit les fonctions, corrections et décisions qui ont modifié le portail ou son exploitation.

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

### Modifié

- Deck partenaire recomposé en largeur sur desktop : gabarit interne de 950 px, titre compact sur grand écran, zone de navigation de 72 px fixe et détails défilables dans l’espace restant.
- Boutons **Précédent** et **Suivant** stabilisés avant les toggles afin qu’ils ne changent plus de position à l’ouverture d’un détail.
- Radar-boussole réservé à la première slide ; le radar animé de l’accueil est désormais fourni par le composant partagé `AnimatedRadarGraphic`.
- Radar de la première slide rendu exploratoire : repères et dimensions lisibles, activation à la souris ou au clavier, résumé contextuel et absence de panneau glassmorphism.
- Éléments de navigation redondants retirés de la présentation et du questionnaire : le fil d’Ariane global porte seul le chemin Accueil → Partenaires → sous-page.
- README, STORY, archive d’implémentation, opérations et index documentaire restructurés pour refléter la réalité livrée.
- Open Graph renforcé dans le layout de secours, le composant de métadonnées et le générateur statique : titre, description, URL, image sécurisée, texte alternatif et carte Twitter enrichie.
- `SITE_URL` fixé par défaut dans le Dockerfile et la documentation sur `https://boussole-culture-recherche.memoways.com`, avec vérification des URL canoniques et Open Graph générées.
- Sitemap généré au build avec domaine final, date de génération, fréquence et priorité par route indexable ; `robots.txt` référence ce sitemap et exclut les parcours administratifs et de questionnaire.
- Radar de l’accueil extrait dans `AnimatedRadarGraphic`, puis réemployé dans la première slide partenaire ; les autres slides utilisent des illustrations limitées à leur rôle narratif.
- Gabarit de la présentation partenaire fixé à 950 px sur desktop, navigation placée dans une bande immobile avec la progression entre les boutons, et fil d’Ariane conservé comme seul repère de retour.
- Aide textuelle redondante de navigation retirée du deck afin de dégager la bande de commandes ; le compteur de slide accompagne désormais la barre de progression.
- Origine des métadonnées dynamiques stabilisée sur `VITE_SITE_URL`, avec repli sur le domaine public final, pour empêcher la reprise d’un éventuel port interne Coolify dans les URL canoniques et Open Graph.
- Contenu des neuf slides partenaire recomposé : explication, mise en contexte, trois effets attendus et valeur de contribution structurent les deux tiers de lecture à gauche ; les illustrations à droite deviennent des schémas narratifs sans panneau ni effet glassmorphism.
- La phrase d’instruction « Ouvrez les repères ci-dessous… » est retirée du deck ; les accordéons restent disponibles comme approfondissement facultatif.
- Schémas narratifs rendus exploratoires : chaque repère répond au survol, au focus ou au clic, modifie l’élément actif et affiche une explication complémentaire ; le radar de la première slide adopte aussi l’activation au survol.
- Entrées directionnelles de 260 ms ajoutées aux slides lors d’une navigation par commande, sans animation pour les flèches clavier ni pour les préférences de mouvement réduit.
- Illustrations du deck recomposées dans un système commun : étapes contenues dans leurs tuiles, explication contextuelle séparée, zone de schéma élargie et colonne textuelle resserrée pour éliminer les chevauchements.
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

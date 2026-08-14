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

### Modifié

- Deck partenaire recomposé en largeur sur desktop : gabarit interne de 900 px, titre pleine largeur, zone de navigation de 72 px fixe et détails défilables dans l’espace restant.
- Boutons **Précédent** et **Suivant** stabilisés avant les toggles afin qu’ils ne changent plus de position à l’ouverture d’un détail.
- Radar-boussole réservé à la première slide ; le radar animé de l’accueil est désormais fourni par le composant partagé `AnimatedRadarGraphic`.
- Éléments de navigation redondants retirés de la présentation et du questionnaire : le fil d’Ariane global porte seul le chemin Accueil → Partenaires → sous-page.
- README, STORY, archive d’implémentation, opérations et index documentaire restructurés pour refléter la réalité livrée.
- Open Graph renforcé dans le layout de secours, le composant de métadonnées et le générateur statique : titre, description, URL, image sécurisée, texte alternatif et carte Twitter enrichie.
- `SITE_URL` fixé par défaut dans le Dockerfile et la documentation sur `https://boussole-culture-recherche.memoways.com`, avec vérification des URL canoniques et Open Graph générées.

### Vérifié

- Vérifications TypeScript, build du portail et build de l’API partenaire via `pnpm verify`.
- Routes profondes de présentation, questionnaire et administration contrôlées dans le build statique.
- Navigation du deck, ouverture des détails, retour navigateur, gabarit desktop et absence de débordement horizontal contrôlés visuellement.

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

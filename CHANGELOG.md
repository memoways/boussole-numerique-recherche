# CHANGELOG — Boussole Numérique Culture

Ce fichier suit le format [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) et les versions suivent [Semantic Versioning](https://semver.org/lang/fr/).

## [Unreleased]

### Added
- Deux CTA autonomes sur la page Partenaires : une présentation dédiée et un accès distinct au questionnaire partenaire.
- Présentation partenaire slide par slide à la route `/partenaires/presentation`, avec neuf écrans et un passage facultatif vers le questionnaire.
- Module partenaire portable : API Express/TypeScript, schéma PostgreSQL, invitations personnelles hashées, demande d’invitation, administration, export CSV, brouillons et transcription Deepgram optionnelle.
- Questionnaire multi-étapes à la route `/partenaires/questionnaire`, réservé aux liens personnels et prêt pour l’activation Coolify.
- Présentation partenaire enrichie : neuf slides défilables, compositions visuelles par sujet, panneaux de détail intégrés et conservation du contexte de lecture dans l’URL.
- Alias privé `/admin`, limitation des tentatives de connexion et tutoriel Coolify complet indexé dans `docs/README.md`.
- Archive d’implémentation du module partenaire dans `docs/`, fondée sur les fichiers et contrôles réellement livrés.
- Intégration Dreamlit option B : boîte d’envoi PostgreSQL `notifications.partner_response_recap_outbox`, récapitulatif déterministe créé dans la transaction de soumission et test automatisé du formatage.
- Documentation opérationnelle complétée pour la connexion Dreamlit restreinte, le workflow transactionnel et l’exposition PostgreSQL chiffrée dans Coolify.
- Console partenaire : liste des e-mails prêts pour Dreamlit, aperçu du récapitulatif et régénération manuelle sécurisée par réponse soumise.
- Présentation partenaire corrigée : toggles et navigation Suivant opérationnels, gabarit desktop compact et radar-boussole cohérent avec l’expérience Boussole.
- Présentation partenaire affinée : navigation fixée avant les détails, radar réservé à la slide d’ouverture et illustrations spécifiques ou volontairement absentes sur les slides suivantes.
- Encarts de soutien de la Ville de Genève, avec logo, lien vers la démarche de subvention et formulation institutionnelle sur les pages Projet et Partenaires.

---

## [1.0.0] — 2026-08-12

### Added
- Portail institutionnel complet : Projet, Calendrier, Expérience, Méthode, Partenaires, Recherche, Références et Ressources.
- Boussole interactive, radar animé, parcours de diagnostic et restitution des cinq dimensions.
- Tableau comparatif mobile de neuf lignes : colonne des références figée, défilement horizontal, en-têtes compacts et pictogrammes.
- Page Références enrichie de huit démarches comparables, dont la *Digitale Transformatie Scan* de DEN.
- Sommaire actif de la page Projet, barre de progression de lecture et sélecteur de section mobile fixe.
- Fil d’Ariane accessible, compact sur écran étroit et prêt pour trois niveaux de profondeur.
- Métadonnées SEO par route : titres, descriptions, URL canoniques, Open Graph, cartes Twitter, données structurées, sitemap et robots.
- Kit de déploiement autonome : `Dockerfile`, Nginx, `.env.example`, documentation Coolify, CI GitHub et guides Cursor, Codex et Claude Code.
- Audit d’accessibilité mobile : lien d’évitement, focus clavier, repères sémantiques, préférences de mouvement réduit et interactions clavier.

### Changed
- Hero de la page Partenaires resserré ; capsule de soutien optimisée pour l’affichage mobile.
- Calendrier aligné sur le dossier de subvention : 24 mois et quatre phases.
- Page Méthode enrichie des principes de gouvernance ; ancienne page Gouvernance redirigée vers Méthode.
- Navigation principale simplifiée : Projet, Calendrier, Expérience, Méthode et Partenaires ; Recherche et Ressources restent accessibles depuis les pages et le footer.
- Hero allégé : deux actions principales, libellés sobres et meilleure respiration visuelle.
- Page Partenaires harmonisée avec le spectre bleu → cyan → vert → orange ; contenus des pastilles en blanc.
- Documents publics et configuration de build rendus indépendants des services Manus.

### Removed
- Dépendances, scripts d’analyse et ressources publiques liés à Manus.
- Références AICred et Diag-numerique.fr, remplacées par des comparaisons plus proches du projet.
- Traits internes de construction de la boussole interactive.

### Fixed
- Débordements horizontaux et grilles non adaptées sur smartphone.
- Sommaire de Projet désormais réellement sticky sur desktop, sans conflit avec le défilement global.
- Double fil d’Ariane retiré du hero Projet.
- Lisibilité des CTA, pastilles et icônes sur les variations colorées.
- Cohérence des partenariats confirmés et des liens associés.

### Security
- Aucune vulnérabilité critique ou élevée dans les dépendances de production après suppression des dépendances inutilisées.
- Aucun secret requis par la version statique ; les anciennes variables spécifiques à Manus ne sont pas conservées.

---

## [0.1.0] — 2026-02-09

### Added
- Initialisation du portail Boussole Numérique Culture avec React, Vite, Tailwind CSS et Wouter.
- Première structure éditoriale et navigation publique.

---

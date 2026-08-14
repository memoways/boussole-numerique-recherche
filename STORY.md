# STORY.md — Boussole Numérique Culture

## 1. Raison d’être du projet

**Boussole Numérique Culture** est un portail institutionnel et un projet de futur outil de diagnostic. La version publique aidera les actrices, acteurs et structures culturelles à situer leurs pratiques numériques, à reconnaître leurs priorités et à choisir des pistes d’action compréhensibles. Le portail présente le projet, son contexte, ses références, ses principes de gouvernance et les manières de participer à sa co-construction.

Le site n’est pas le diagnostic public lui-même. Il rend l’intention du projet lisible, matérialise une première expérience de Boussole et prépare le pilote partenaire. Il doit pouvoir être maintenu et déployé indépendamment de Manus, par l’équipe de projet ou par des agents de code compatibles.

> **Positionnement.** Une ressource de repérage et de dialogue destinée au secteur culturel, qui privilégie des prochaines étapes adaptées plutôt qu’une évaluation unique ou une prescription d’outils.

## 2. Contexte institutionnel et produit

Le projet est présenté dans le cadre d’une demande de soutien culturel. Le site doit donc rester sobre, documenté et cohérent avec une lecture institutionnelle : il décrit la méthode, les références comparables, les principes de neutralité, l’évaluation continue et le calendrier sans présenter de projections fermes.

La version actuelle distingue quatre couches complémentaires : le récit institutionnel, l’expérience Boussole illustrée, la recherche documentée et le parcours partenaire. L’expérience permet de comprendre la logique du diagnostic ; le parcours partenaire prépare la collecte qualitative qui nourrira l’atelier de co-conception et le prototype public.

| Couche | Rôle | État actuel |
|---|---|---|
| Portail public | Présenter projet, méthode, calendrier, références et partenaires | Livré et vérifié |
| Expérience Boussole | Rendre les cinq dimensions et le parcours perceptibles | Livrée sous forme de démonstration interactive |
| Module partenaire | Présentation, invitations, questionnaire, administration et synthèses | Code livré ; activation Coolify à réaliser |
| Recherche et ressources | Montrer l’apprentissage à partir de l’existant | Livré et relié au portail |

La recherche ne sert pas à prouver par avance l’utilité de la future Boussole. Elle rassemble des constats sourcés et des références qui éclairent les questions à tester avec les partenaires. Les pages éditoriales ont été relues selon cette même distinction : les engagements actuels du projet restent au présent ; les fonctions de l’outil public sont formulées au futur.

## 3. Publics et parcours

| Public | Question à laquelle le portail répond | Parcours principal |
|---|---|---|
| Actrices, acteurs et structures culturelles | « De quoi s’agit-il et en quoi cela peut-il m’être utile ? » | Accueil → Projet → Expérience |
| Partenaires et futurs contributeurs | « Comment participer et ce qui sera fait de mes retours ? » | Partenaires → Présentation ou Questionnaire |
| Interlocuteurs institutionnels | « Le projet est-il cohérent, documenté et gouverné ? » | Projet → Calendrier → Méthode → Références |
| Équipe de projet | « Comment activer, maintenir et faire évoluer le dispositif ? » | README → docs → AGENTS → Coolify |

Le menu public reste volontairement court : **Projet, Calendrier, Expérience, Méthode, Partenaires**. Les contenus de recherche et de ressources sont accessibles depuis le footer et les liens contextuels. Le fil d’Ariane fournit un repère unique dans les sous-pages ; les retours redondants dans le contenu ont été retirés.

## 4. Ce qui est effectivement livré

### Portail et expérience

Le portail comporte un hero éditorial, la présentation détaillée du projet, le calendrier en quatre phases sur vingt-quatre mois, l’expérience interactive, la méthode enrichie des principes de gouvernance, les partenaires et les références. La page Projet propose un sommaire sticky sur desktop, un sélecteur mobile et une progression de lecture. La page Références fournit un comparatif adapté aux petits écrans : défilement horizontal, colonne de noms fixée et intitulés compacts. La page Recherche présente quinze constats documentés et distingue les données sources des pistes de conception qui restent à tester.

La page Ressources rassemble les documents internes, les études externes et les sources qui accompagnent la co-conception. Ses fiches distinguent le document interne à lire, le PDF externe à ouvrir et la source web à consulter. Les CTA transversaux emploient le même principe : ils annoncent l’action et le contenu de la destination, sans supposer qu’un diagnostic public est déjà actif.

L’expérience Boussole utilise cinq dimensions pour rendre le diagnostic tangible. Le radar animé de l’accueil est maintenant fourni par le composant partagé `AnimatedRadarGraphic`. Il est repris dans la première slide de la présentation partenaire, sans surcharger les autres slides.

### Présentation partenaire

La route `/partenaires/presentation` contient neuf slides. Les détails sont dépliables au clavier, les liens contextuels ouvrent les pages utiles et l’URL conserve `slide` et `detail` pour que le bouton précédent du navigateur retrouve le contexte de lecture. Le deck desktop utilise un gabarit interne de 900 px : titre pleine largeur, navigation fixe et panneaux défilables dans l’espace restant. Sur mobile, les colonnes se replient et les commandes restent accessibles.

La première slide utilise le radar animé ; les autres n’emploient une illustration que lorsqu’elle explicite réellement le récit. Les retours de navigation redondants, les labels sous le radar et les icônes décoratives inutiles ont été supprimés lors des derniers ajustements visuels.

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
| Open Graph statique et dynamique | Les robots sociaux ne dépendent pas de JavaScript | Les balises de partage sont injectées au build et mises à jour à chaque route SPA |
| Sitemap et robots générés au build | Le domaine final doit se propager sans édition manuelle | Les seules routes indexables entrent dans le sitemap ; les parcours privés sont exclus |
| Outil en co-conception | Le site public ne doit pas annoncer un diagnostic déjà disponible | Les pages d’entrée, le calendrier et les démonstrations décrivent la future version au futur |
| Recherche documentaire distincte des promesses produit | Les sources servent à éclairer les choix, sans faire preuve de l’utilité future | La page Recherche parle de constats documentés et de questions à tester ; les pistes de conception sont nommées comme telles |
| Parcours partenaire explicite | La contribution ne doit pas être confondue avec l’accès déjà actif au diagnostic | Les entrées Présentation et Questionnaire sont séparées ; les étapes de test et les contreparties sont formulées au futur |
| CTA explicites | Une destination seule ne dit pas ce que la personne y trouvera | Les libellés indiquent l’action et l’objet : comprendre le projet, explorer une démonstration, consulter des constats ou demander une invitation |
| Engagements distincts des fonctions futures | Le projet doit présenter ses principes sans annoncer un service déjà actif | Gratuité, neutralité, code ouvert, hébergement et consentement sont formulés comme exigences de la future version ou choix à confirmer |
| Une URL historique, une destination canonique | Les anciennes pages ne doivent pas concurrencer les contenus actifs ni perdre les documents de recherche | Les documents restent sous Ressources ; Nginx et l’application redirigent les anciennes URLs |
| IPv4 avant IPv6 non configuré | Un AAAA publié doit répondre réellement, sinon le navigateur peut expirer | Le domaine final doit utiliser l’A record fonctionnel et ne publier aucun AAAA avant configuration IPv6 du serveur |

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
| `client/src/components/` | Navigation, fil d’Ariane, composants UI et `AnimatedRadarGraphic` |
| `client/src/lib/` | SEO, client API partenaire et utilitaires |
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

## 8. État d’activation et limites connues

Le portail statique peut être déployé immédiatement. Le module partenaire est implémenté et vérifié dans le dépôt, mais il n’est pas encore actif en production parce que les ressources Coolify, PostgreSQL, les secrets API, SMTP, Deepgram et le workflow Dreamlit doivent encore être configurés.

| Élément | État | Action restante |
|---|---|---|
| Portail public | IPv4 valide, IPv6 défaillant | Remplacer le CNAME par l’A record `185.131.204.133` et ne pas publier d’AAAA |
| SEO | Prêt | Fournir une image Open Graph dédiée si souhaité |
| API partenaire | Prête | Créer l’application Coolify et ses secrets |
| PostgreSQL | Prêt à initialiser | Créer le service privé et appliquer le schéma idempotent |
| Console `/admin` | Interface livrée | Définir `ADMIN_EMAIL` et `ADMIN_PASSWORD`, puis déployer l’API |
| Transcription Deepgram | Intégration livrée | Fournir `DEEPGRAM_API_KEY` |
| E-mails Dreamlit | Boîte d’envoi livrée | Créer l’utilisateur DB restreint, connecter Dreamlit et publier le workflow |

Le domaine public de référence est **https://boussole-culture-recherche.memoways.com**. Cette valeur est le défaut du Dockerfile et doit aussi être renseignée comme variable de build `SITE_URL` dans Coolify afin que les URL canoniques, Open Graph, le sitemap et `robots.txt` restent cohérents lors du déploiement. Le 14 août 2026, le chemin IPv4 et le certificat ont été validés, tandis que l’IPv6 héritée du CNAME ne répondait pas. La correction DNS est documentée dans [`docs/DIAGNOSTIC_DOMAINE_BOUSSOLE_2026-08-14.md`](docs/DIAGNOSTIC_DOMAINE_BOUSSOLE_2026-08-14.md).

Les contenus éditoriaux restent principalement dans les composants React. Cette approche est adaptée au rythme actuel, mais une source de contenu structurée pourra être envisagée si les mises à jour deviennent fréquentes. Le bundle principal dépasse l’avertissement de taille Vite ; une optimisation par import dynamique est envisageable après mesure sur le domaine de production.

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

# STORY.md — Boussole Numérique Culture

## Contexte

**Boussole Numérique Culture** est un portail institutionnel et documentaire destiné à présenter un projet de diagnostic numérique pour les actrices, acteurs et structures culturelles. Il rend le projet lisible pour les partenaires, les personnes appelées à co-construire l’outil et les interlocuteurs institutionnels. Le site explique la démarche, les principes de service public, le calendrier, les références comparables et les modalités de participation.

Le portail est volontairement distinct de la future application de diagnostic. Aujourd’hui, il informe, documente et oriente ; demain, il peut servir de point d’entrée vers l’expérience Boussole et ses premiers usages.

## Utilisateurs cibles

| Public | Besoin principal | Moment d’usage |
|---|---|---|
| Structures culturelles et professionnelles indépendantes | Comprendre le projet et décider d’y contribuer | Découverte ou prise de contact ponctuelle |
| Partenaires confirmés et futurs partenaires | Situer le calendrier, les engagements et les modalités de co-conception | Suivi du projet et préparation des échanges |
| Interlocuteurs institutionnels | Évaluer la cohérence, la méthode, les références et la gouvernance | Lecture de dossier ou instruction de subvention |
| Équipe de projet et agents IA | Maintenir le portail, les contenus et la configuration de déploiement | Évolutions continues |

## Fonctionnalités clés

1. **Présenter le projet.** Les pages Projet, Calendrier, Méthode et Partenaires donnent un récit cohérent de la démarche, de ses principes et de son avancement.
2. **Faire comprendre l’expérience.** Les radars, la boussole interactive et les cinq dimensions rendent le diagnostic concret sans exiger de compétence technique.
3. **Documenter la recherche.** Les pages Recherche, Références et Ressources relient la proposition aux pratiques et outils comparables étudiés.
4. **Faciliter la navigation.** La navigation globale, le fil d’Ariane, le sommaire Projet et les adaptations mobile permettent de parcourir un contenu dense.
5. **Préserver l’autonomie technique.** Le dépôt se construit sans service applicatif propriétaire et se déploie dans Coolify avec un conteneur Nginx.

## Stack

```text
Frontend        : React 19, TypeScript, Vite, Wouter, Tailwind CSS 4, shadcn/ui
Backend         : Aucun ; application statique monopage
Base de données : Aucune
Hébergement     : Docker + Nginx, prêt pour Coolify self-hosted
Services tiers  : Google Fonts ; aucune API applicative, aucun secret requis
Qualité         : TypeScript, build Vite, GitHub Actions, scripts de contrôle mobile
```

## Décisions importantes

| Décision | Pourquoi |
|---|---|
| Portail statique sans backend | Le site actuel ne collecte pas de données et reste simple à héberger, auditer et maintenir. |
| Dockerfile Nginx pour Coolify | Le build, le cache HTTP et le fallback des routes Wouter sont reproductibles hors plateforme. |
| `SITE_URL` au build | Les URL canoniques, Open Graph, sitemap et robots reflètent le domaine final sans embarquer de secret. |
| Métadonnées à la fois statiques et dynamiques | Les robots de partage reçoivent les balises avant JavaScript ; la navigation SPA reste correcte après changement de route. |
| Fil d’Ariane centralisé | Un seul composant accessible est rendu sur les pages internes et peut gérer trois niveaux futurs. |
| Sommaire Projet indépendant | La page Projet est longue ; son sommaire sticky desktop et son sélecteur mobile suivent la section active. |
| Références détaillées sur une page unique | Projet et Recherche orientent vers Références afin d’éviter la répétition de l’analyse comparative. |
| Design bleu → cyan → vert → orange | Le spectre visuel identifie le projet tout en hiérarchisant les étapes et les contributions. |

## État courant

**Dernière mise à jour** : 2026-08-12

- ✅ **Fait** : contenu institutionnel aligné sur le dossier de subvention, avec calendrier sur 24 mois et quatre phases.
- ✅ **Fait** : partenaires confirmés présentés avec leurs liens ; la liste peut évoluer au fil de la co-conception.
- ✅ **Fait** : parcours mobile, contraste, navigation clavier, SEO, Open Graph et fil d’Ariane vérifiés.
- ✅ **Fait** : préparation au déploiement autonome vers Coolify et documentation multi-agents.
- 🔄 **En cours** : aucune fonctionnalité applicative n’est en développement dans ce dépôt ; la prochaine bascule opérationnelle est le déploiement Coolify.
- 📋 **Reste à faire** : renseigner le domaine final dans `SITE_URL`, connecter le dépôt à Coolify, vérifier les aperçus sociaux et tester le site sur des appareils réels.

## Questions ouvertes

- [ ] Quel domaine HTTPS final sera utilisé pour le déploiement Coolify, et qui gère sa zone DNS ?
- [ ] Quelle image Open Graph dédiée, au format 1200 × 630 px, doit remplacer le logo utilisé actuellement pour les aperçus sociaux ?
- [ ] Quelle solution backend ou formulaire de retour sera retenue si le portail doit recueillir des inscriptions, retours d’usage ou demandes d’ajout à l’annuaire ?
- [ ] Quelle première sous-page détaillée justifiera l’usage concret du fil d’Ariane à trois niveaux ?

## Limitations connues

- Le site est statique : les appels à l’action ouvrent un e-mail et ne créent aucune inscription ou donnée en base.
- Les contenus éditoriaux sont encore principalement codés dans les composants React ; toute évolution fréquente devrait envisager une source de contenu structurée.
- L’aperçu Open Graph réutilise le logo actuel ; une image de partage dédiée reste à produire.
- Le bundle initial inclut des modules de visualisation et dépasse le seuil d’avertissement Vite ; une optimisation par chargement différé pourra être envisagée si les performances mesurées l’exigent.
- La publication actuelle est encore disponible sur les domaines existants ; la bascule vers Coolify requiert le paramétrage du domaine final et une validation HTTPS.

## Liens

- **Notion (spec / PRD)** : non renseigné dans le dépôt.
- **Figma** : non applicable.
- **GitHub** : [memoways/boussole-numerique-recherche](https://github.com/memoways/boussole-numerique-recherche)
- **Production actuelle** : [boussole-culture-recherche.memoways.com](https://boussole-culture-recherche.memoways.com/)
- **Prévisualisation actuelle** : [boussole-numerique.manus.space](https://boussole-numerique.manus.space/)
- **Migration Coolify** : [`docs/COOLIFY_MIGRATION.md`](docs/COOLIFY_MIGRATION.md)
- **Opérations** : [`docs/OPERATIONS.md`](docs/OPERATIONS.md)
- **SEO** : [`docs/SEO.md`](docs/SEO.md)

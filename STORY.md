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
5. **Préserver l’autonomie technique.** Le dépôt se construit sans service applicatif propriétaire et se déploie dans Coolify avec un conteneur Nginx et une API partenaire dédiée.
6. **Organiser la contribution partenaire.** La présentation dépliable, les liens contextuels, les invitations et la console `/admin` structurent les échanges avant le pilote.
7. **Distinguer données de réponse et e-mail.** L’API prépare une boîte d’envoi limitée pour Dreamlit, afin que le fournisseur d’e-mail ne lise pas les tables de réponses brutes.

## Stack

```text
Frontend        : React 19, TypeScript, Vite, Wouter, Tailwind CSS 4, shadcn/ui
Backend         : API partenaire Express/TypeScript, prête à être déployée dans Coolify
Base de données : PostgreSQL privé dans Coolify, prévu pour invitations et réponses lors de l’activation
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
| État de présentation dans l’URL | La slide et le panneau de détail restent accessibles après un retour navigateur. |
| API partenaire séparée | Les secrets, l’administration et les données de réponse restent hors du portail statique. |
| Boîte d’envoi Dreamlit limitée | Seul le récapitulatif préparé et le destinataire sont transmis au workflow d’e-mail. |

## État courant

**Dernière mise à jour** : 2026-08-13

- ✅ **Fait** : contenu institutionnel aligné sur le dossier de subvention, avec calendrier sur 24 mois et quatre phases.
- ✅ **Fait** : partenaires confirmés présentés avec leurs liens ; la liste peut évoluer au fil de la co-conception.
- ✅ **Fait** : encarts de soutien de la Ville de Genève ajoutés sous la présentation de Memoways sur Projet et avant le CTA final de Partenaires.
- ✅ **Fait** : parcours mobile, contraste, navigation clavier, SEO, Open Graph et fil d’Ariane vérifiés.
- ✅ **Fait** : préparation au déploiement autonome vers Coolify et documentation multi-agents.
- ✅ **Fait** : deux parcours partenaires autonomes sont en place ; la présentation est accessible librement et le questionnaire reste un accès indépendant.
- ✅ **Fait** : le module partenaire inclut les invitations liées aux organisations, l’administration, les brouillons, les réponses vocales transcrites et les exports.
- ✅ **Fait** : la présentation partenaire contient des détails dépliables, des schémas visuels et des liens qui conservent la slide ouverte dans l’historique du navigateur.
- ✅ **Fait** : l’administration est disponible à `/admin` après configuration de l’API, de PostgreSQL et des secrets dans Coolify.
- ✅ **Fait** : documentation de continuité synchronisée dans `CHANGELOG.md`, `STORY.md`, `README.md` et `docs/`, avec une archive des fonctionnalités réellement livrées.
- ✅ **Fait** : à la soumission, l’API génère une ligne de boîte d’envoi dédiée à Dreamlit avec un récapitulatif déterministe ; l’activation du workflow Dreamlit reste à effectuer dans son interface.
- ✅ **Fait** : `/admin` permet de consulter chaque récapitulatif prêt pour Dreamlit et de le régénérer, avec un compteur visible et une trace d’événement côté API.
- 📋 **Reste à faire** : créer les ressources Coolify, renseigner le domaine final dans `SITE_URL`, configurer le SMTP et les secrets, puis lancer le pilote partenaire.

## Questions ouvertes

- [ ] Quel domaine HTTPS final sera utilisé pour le déploiement Coolify, et qui gère sa zone DNS ?
- [ ] Quelle image Open Graph dédiée, au format 1200 × 630 px, doit remplacer le logo utilisé actuellement pour les aperçus sociaux ?
- [ ] Quel service SMTP ou transactionnel sera utilisé pour les invitations et les récapitulatifs individuels ?
- [ ] Quelle date ou quel jalon précis marque la fin de conservation des réponses du questionnaire ?
- [ ] Quelles personnes supplémentaires pourront accéder aux réponses nominatives dans l’administration ?

## Limitations connues

- Le questionnaire partenaire n’est pas encore relié à une instance PostgreSQL/Coolify de production ; les CTA n’ouvrent pas encore de collecte réelle.
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
- **Documentation indexée** : [`docs/README.md`](docs/README.md)
- **Opérations partenaire** : [`docs/PARTNER_FEEDBACK_OPERATIONS.md`](docs/PARTNER_FEEDBACK_OPERATIONS.md)
- **Plan partenaire** : [`docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md`](docs/PLAN_PARTENAIRES_PRESENTATION_QUESTIONNAIRE.md)
- **Archive d’implémentation partenaire** : [`docs/IMPLEMENTATION_ARCHIVE_PARTNER_MODULE_2026-08-13.md`](docs/IMPLEMENTATION_ARCHIVE_PARTNER_MODULE_2026-08-13.md)
- **Dreamlit — décision et activation** : [`docs/DREAMLIT_EMAIL_INTEGRATION_OPTIONS.md`](docs/DREAMLIT_EMAIL_INTEGRATION_OPTIONS.md)
- **SEO** : [`docs/SEO.md`](docs/SEO.md)

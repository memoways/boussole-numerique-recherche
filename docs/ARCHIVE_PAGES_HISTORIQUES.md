# Archive des pages historiques et redirections

Les anciennes pages éditoriales sont conservées dans le dépôt pour préserver l’historique de recherche, mais elles ne sont plus exposées sous leur arborescence initiale. Les documents utiles restent accessibles sous `/ressources/*`. Les anciennes URLs redirigent de manière permanente vers une destination canonique à la fois dans l’application et dans Nginx.

| Ancienne URL | Destination canonique | Traitement | Raison |
|---|---|---|---|
| `/description-projet` | `/projet` | Redirection permanente | La page Projet active reprend et met à jour l’ancien récit institutionnel. |
| `/gouvernance` | `/methode` | Redirection permanente | Méthode réunit désormais co-conception et six principes de gouvernance. |
| `/references-inspirantes` | `/ressources/references-inspirantes` | Redirection permanente | Le document de recherche initial reste disponible comme archive, distincte des Références actives. |
| `/etude-complete` | `/ressources/etude-complete` | Redirection permanente | L’étude complète demeure consultable dans les ressources. |
| `/etat-des-lieux` | `/ressources/etat-des-lieux` | Redirection permanente | Le rapport reste consultable dans les ressources. |
| `/analyse-outils` | `/ressources/analyse-outils` | Redirection permanente | L’analyse initiale est conservée comme archive documentaire ; elle ne constitue pas le tableau comparatif actif. |
| `/sources` | `/ressources/sources` | Redirection permanente | La bibliographie reste consultable dans les ressources. |
| `/synthese-documents` | `/ressources/synthese-documents` | Redirection permanente | La synthèse reste consultable dans les ressources. |

## Règles de maintenance

Les composants historiques `DescriptionProjet.tsx`, `Gouvernance.tsx`, `EtudeComplete.tsx`, `EtatDesLieux.tsx`, `AnalyseOutils.tsx`, `Sources.tsx`, `SyntheseDocuments.tsx` et `ReferencesInspirantes.tsx` ne sont plus importés par le routeur. Ils restent dans le dépôt comme sources d’archive. Les documents Markdown et PDF associés restent servis depuis `client/public`.

Avant de supprimer l’un de ces fichiers, vérifier que la destination canonique conserve soit le document, soit les faits et sources nécessaires. Toute nouvelle ancienne URL doit recevoir une destination canonique, une redirection Nginx et une règle `noindex` dans `client/src/lib/seo.ts`.

Les affirmations datées relevées dans les documents Markdown et leur contexte d’affichage sont consignés dans [`CONTEXTE_ARCHIVES_MARKDOWN.md`](./CONTEXTE_ARCHIVES_MARKDOWN.md).

## Contrôles effectués

Le 14 août 2026, l’ancienne URL `/description-projet` a été testée dans l’application et a abouti à `/projet`. L’URL canonique `/ressources/etude-complete` a aussi été contrôlée : le document Markdown, sa table des matières, son fil d’Ariane, ses actions de téléchargement et le retour vers les documents restent disponibles.

Les redirections Nginx sont présentes dans `infra/nginx/default.conf` pour les huit anciennes URLs. Leur statut HTTP 301 devra être vérifié après le premier déploiement Coolify, car l’aperçu de développement applique la redirection côté client et ne sert pas la configuration Nginx de production.

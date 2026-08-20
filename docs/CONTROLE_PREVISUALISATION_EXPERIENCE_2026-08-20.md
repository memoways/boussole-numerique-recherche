# Contrôle — Prévisualisation de l’expérience Boussole

## Contrôles effectués

| Élément | Résultat |
|---|---|
| Statut de la page | Le hero indique que la Boussole n’existe pas encore et que la démonstration ne collecte aucune donnée. |
| Parcours | Les quatre étapes sont visibles : Se situer, Décrire, Comprendre et Agir. |
| Écran 1 | Le choix Artiste ou Structure est interactif et décrit comme un exemple non évaluatif. |
| Écran 2 | La question conversationnelle, les trois réponses rapides et les modes écrit/vocal sont visibles et manipulables sans envoi de données. |
| Écran 3 | Le panorama combine un radar contrôlé par ses cinq icônes et des repères à discuter ; la lecture indique explicitement qu’il ne s’agit pas d’un verdict. |
| Écran 4 | Les trois pistes de première amélioration sont sélectionnables et restent identifiées comme des exemples à co-concevoir. |
| Accessibilité de base | Les étapes utilisent des boutons avec état de sélection ; les choix de chaque écran sont activables au clavier. |
| TypeScript | `pnpm check` passe après l’intégration des écrans. |
| Vérification complète | `pnpm verify` passe : build statique, pré-rendu de dix routes indexables, contrôle SEO-GEO et build de l’API partenaire. |

## Contrôles restant

- Vérifier le rendu mobile réel, en particulier l’empilement des quatre étapes et la largeur du cadre applicatif.

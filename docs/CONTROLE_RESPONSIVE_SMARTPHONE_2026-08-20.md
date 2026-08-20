# Contrôle responsive smartphone — 20 août 2026

## Méthode

L’audit automatise les vingt routes publiques aux largeurs **320 px** et **390 px**, avec un contrôle du chargement, des erreurs JavaScript, de la largeur de défilement du document et des cibles tactiles. Un second scénario vérifie les interactions essentielles à 320 px : menu mobile, navigation, choix de profil, expérience, filtres de ressources, recherche 404 et pagination de la présentation partenaire.

## Résultats contrôlés

| Élément | Résultat |
|---|---|
| Routes publiques | 40 rendus contrôlés : toutes les routes répondent avec un statut 200, sans erreur JavaScript ni débordement horizontal du document. |
| Cibles tactiles | Aucun contrôle visible sous 36 px après correction des filtres, suggestions, recherches et actions de retour. |
| Accueil à 390 px | Les quatre jalons, les deux profils et les CTA s’empilent sans coupure ; le menu reste compact et accessible. |
| Expérience à 390 px | Les quatre étapes du prototype, le panneau d’explication et le cadre applicatif se replient dans une colonne lisible. |
| Références à 390 px | Le tableau comparatif reste dans son conteneur horizontal ; les fiches détaillées et la liste d’idées conservent une colonne de lecture continue. |
| Présentation partenaire à 390 px | La slide, son radar, la navigation Précédent/Suivant et les accordéons restent contenus dans la largeur de l’écran. |
| Retour en haut à 320 px | Le bouton apparaît après 480 px, reste au-dessus du contenu en bas à droite et remonte vers le sommet après activation. |
| Historique documentaire | Les longues URL se coupent et les tableaux utilisent désormais un défilement horizontal local, sans étendre la page entière. |
| Interactions critiques | Burger, navigation mobile, deux profils de l’accueil, onglets de l’Expérience, filtres de ressources, recherche 404, retour en haut et pagination partenaire passent à 320 px. |

## Point de vigilance

Les contrôles automatisés utilisent les largeurs 320 px et 390 px avec simulation tactile. Une revue sur appareils physiques reste recommandée avant l’ouverture publique, en particulier pour le confort de lecture, le navigateur iOS et les gestes de défilement des tableaux historiques.

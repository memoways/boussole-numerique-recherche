# Contrôle — Clarification du site compagnon

## Contrôles effectués

| Élément | Résultat |
|---|---|
| Hero de l’accueil | Le libellé « Site compagnon · Boussole en préparation », la phrase explicite « La Boussole n’existe pas encore » et les quatre jalons sont visibles avant le choix de profil. |
| Entrée de l’accueil | Deux cartes seulement : Partenaire culturel et Artiste. Le troisième profil a disparu du sélecteur. |
| Parcours partenaire | Le clic ajoute `?public=partenaire`, déclenche le défilement, affiche un sous-menu fixe à deux profils et présente deux actions cohérentes. |
| Récit partenaire | Le contenu indique que le site organise la co-conception et que le futur outil devra encore être décidé avant développement. |
| Ancienne URL du troisième profil | `?public=enjeux-numeriques` est nettoyée par remplacement d’historique et revient à l’accueil neutre, sans sous-menu ni récit obsolète. |
| Page Partenaires | Le hero déclare que la Boussole n’existe pas encore, expose les quatre jalons et conserve les actions distinctes de présentation et questionnaire. |
| Étapes partenaire | La séquence est lisible : répondre, co-concevoir, tester puis devenir relais, avec les jalons automne 2026, fin 2026 et début 2027. |
| Calendrier | Le hero annonce le statut de Boussole en préparation ; la phase 1 présente l’atelier et le cadrage de septembre–octobre 2026. |
| Prototype | L’ouverture de la phase 2 affiche « Fin 2026 », la première version à tester et les conseils d’optimisation actionnables à éprouver. |
| TypeScript | `pnpm check` passe après le remplacement du modèle à trois profils. |
| Build complet | `pnpm verify` passe : TypeScript portail et API, build statique, génération HTML, contrôle SEO-GEO et build API partenaire. |

## Contrôles restants

- Vérifier le rendu de l’accueil à 320 px et 390 px, notamment les quatre jalons et le sous-menu à deux profils.
- Vérifier sur appareil mobile réel, aux largeurs 320 px et 390 px, la lecture des quatre jalons du hero et la hauteur du sous-menu à deux profils.

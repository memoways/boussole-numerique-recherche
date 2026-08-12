# SEO et partage social

Le site génère des titres, descriptions, URL canoniques, balises Open Graph, cartes de partage et données structurées pour chaque route publique. Le script de build produit également un `sitemap.xml`, un `robots.txt` et des pages HTML statiques par route afin que les robots et les aperçus sociaux reçoivent les métadonnées avant l'exécution de JavaScript.

La validation de production a confirmé la présence des métadonnées dans toutes les pages générées. Lors de la vérification de l'aperçu de développement, le nouveau sous-domaine de prévisualisation Vite a été bloqué par sa liste d'hôtes ; ce comportement de développement sera ajusté sans introduire de dépendance à une plateforme spécifique.

La prévisualisation autorise désormais les hôtes de développement sans lier le projet à un domaine précis. Le contrôle de la route `/partenaires` confirme que le titre, la description, l'URL canonique, `og:title`, `og:url` et les données structurées `WebPage` sont mis à jour par l'application au changement de route.

# SEO et partage social

Le site génère des titres, descriptions, URL canoniques, balises Open Graph, cartes de partage et données structurées pour chaque route publique. Le script de build produit également un `sitemap.xml`, un `robots.txt` et des pages HTML statiques par route afin que les robots et les aperçus sociaux reçoivent les métadonnées avant l'exécution de JavaScript. Les métadonnées Open Graph comprennent le type, la locale, le nom du site, le titre, la description, l’URL, l’image, l’URL sécurisée de l’image et son texte alternatif ; les cartes Twitter reprennent ces éléments avec `summary_large_image`.

Le sitemap est régénéré à chaque build avec `SITE_URL`, une date de génération, `changefreq` et une priorité adaptée à chaque route indexable. Il inclut notamment la présentation partenaire, mais pas le questionnaire ni l’administration. Le fichier `robots.txt` publie le lien vers ce sitemap et bloque explicitement `/admin`, `/partenaires/admin` et `/partenaires/questionnaire`. Les pages privées générées reçoivent également `noindex,follow`.

Les documents historiques sont accessibles sous `/ressources/*` avec `noindex`. Leurs anciennes URLs reçoivent une redirection permanente vers la destination canonique et ne doivent pas être ajoutées au sitemap. La liste de ces mappings est conservée dans [`ARCHIVE_PAGES_HISTORIQUES.md`](./ARCHIVE_PAGES_HISTORIQUES.md).

La validation de production a confirmé la présence des métadonnées dans toutes les pages générées. Lors de la vérification de l'aperçu de développement, le nouveau sous-domaine de prévisualisation Vite a été bloqué par sa liste d'hôtes ; ce comportement de développement sera ajusté sans introduire de dépendance à une plateforme spécifique.

La prévisualisation autorise désormais les hôtes de développement sans lier le projet à un domaine précis. Le contrôle de la route `/partenaires` confirme que le titre, la description, l'URL canonique, `og:title`, `og:url` et les données structurées `WebPage` sont mis à jour par l'application au changement de route.

Les pages internes affichent également un fil d’Ariane accessible (`Accueil › Page`) et publient le schéma `BreadcrumbList` correspondant, généré à la fois dans les pages HTML statiques et au changement de route dans le navigateur.

Le fil d’Ariane est positionné sous la navigation fixe, avec une barre discrète et un état de page courante. La vérification visuelle de `/partenaires` confirme son affichage sans recouvrement du hero.

La page `/projet` utilise le même fil d’Ariane global et son ancien repère statique du hero a été retiré afin d’éviter un doublon. Le sommaire desktop et sa progression de lecture restent intacts.

## Ajouter une sous-page détaillée

Le type `SeoPage` accepte désormais un tableau `breadcrumbs`. Pour une future route détaillée, fournissez les trois niveaux, par exemple `Accueil → Projet → Nom de la sous-page`. Le composant affiche ces trois niveaux sur desktop et, sur mobile étroit, conserve `Accueil`, une ellipse et la page courante afin d’éviter tout retour à la ligne. Le générateur SEO statique accepte la même propriété `breadcrumbs` et crée automatiquement le `BreadcrumbList` correspondant.

Le contrôle visuel à 320 px confirme que le fil d’Ariane actuel reste sur une seule ligne, avec un libellé courant tronqué si nécessaire plutôt qu’un retour à la ligne.

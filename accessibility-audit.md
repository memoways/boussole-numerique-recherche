# Audit d'accessibilité mobile — constats initiaux

Le périmètre couvre les neuf pages publiques : Accueil, Projet, Expérience, Méthode, Calendrier, Recherche, Références, Partenaires et Ressources. Chaque page dispose d'un titre `h1`, tandis que la structure globale fournit déjà les repères `nav`, `main` et `footer`.

Les corrections prioritaires identifiées sont les suivantes : la langue de page est déclarée en anglais alors que le contenu est français ; aucun lien d'évitement n'est proposé ; les liens textuels ne disposent pas d'un indicateur de focus robuste ; plusieurs couleurs de texte sont sous le seuil WCAG AA sur fond clair ; les points interactifs des radars SVG ne sont pas accessibles au clavier ; les cartes dépliables des pages Recherche et Références sont cliquables mais ne sont pas sémantiques.

Les mesures de contraste réalisées sur fond blanc indiquent : bleu Memoways `#515792` (6,71:1) et gris 500 (4,83:1) conformes pour le texte normal ; orange de marque `#E27227` (3,15:1), vert `#3AAB8A` (2,85:1), vert olive `#7AB648` (2,44:1), gris 400 (2,54:1) et gris 300 (1,47:1) insuffisants lorsqu'ils portent une information textuelle ou une bordure de contrôle.

## Correctifs appliqués et contrôle final

La déclaration de langue est maintenant `fr` et le titre de document a été aligné avec le projet. Un lien d'évitement « Aller au contenu principal » précède la navigation, tandis que le contenu principal est une cible explicite. Un indicateur de focus bleu, visible au clavier, couvre les liens, boutons et contrôles interactifs.

Les couleurs d'accent qui portent du texte ou une fonction interactive sont rendues dans des variantes conformes : orange `#A8440D` (6,00:1), vert `#167A5E` (5,28:1) et vert olive `#4C741B` (5,50:1) sur blanc. Le contrôle automatisé a confirmé le rendu calculé de l'orange accessible pour les libellés et boutons concernés.

L'audit mobile final, mené à 390 px sur les neuf pages publiques, confirme pour chaque page : un seul `h1` dans le contenu principal, une hiérarchie de titres sans saut, les repères `nav`, `main` et `footer`, aucune image sans alternative, aucun bouton sans nom accessible et aucun débordement horizontal du document. Le parcours clavier confirme le focus initial sur le lien d'évitement, l'ouverture du menu burger avec un état annoncé, et la bascule au clavier du radar, des phases du calendrier et des insights de recherche.

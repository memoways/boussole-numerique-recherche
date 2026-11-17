# Esquisses de direction visuelle — lot 1 (17 novembre 2026)

> **Pièces de travail jugées inutilisables par Ulrich.** Elles sont gardées pour ne pas repartir de zéro : les principes sont bons, l'exécution ne l'est pas. Ne rien en reprendre tel quel. Contexte, verdict et diagnostic : [`../ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md`](../ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md).

Chaque esquisse est un fichier HTML autonome (1440 × 900, premier écran de l'accueil) avec sa capture PNG de même nom. Les couleurs hors jetons Memoways (magenta `#c2185b`, violet `#7a3fa0`, rouge `#e0475b`) sont des propositions à mesurer au lot 2. Les textes de dimension viennent de `Home.tsx` ; rien n'est chiffré. Les mentions « exemple illustratif » signalent l'absence de données réelles.

## Première main (tirage `seed:3b1755551a240509`)

| Fichier | Direction | Idée à garder | Défaut principal |
|---|---|---|---|
| [`01-nuancier-imprimeur`](./ronde1/01-nuancier-imprimeur.html) | Nuancier d'imprimeur (assignée par le tirage) | Cinq encres numérotées 01 à 05, bande de contrôle de couleur | Titre coupé en « Bous-sole » (césure forcée) et mots coupés ; hauteurs qui se lisent comme un classement |
| [`02-affiche-suisse`](./ronde1/02-affiche-suisse.html) | Affiche suisse en aplats (choix de l'assistant) | Titre géant sur grands aplats Memoways | Compas en cercles concentriques (une cible) ; découpe des aplats sans règle |
| [`03-teletexte`](./ronde1/03-teletexte.html) | Magazine télétexte | Adresses à trois chiffres | **Rétro, refusé** |
| [`04-partition-danse`](./ronde1/04-partition-danse.html) | Partition de danse | Artiste et partenaire à égalité, symétrie | La hauteur des blocs suggère un niveau ; pas de boussole |
| [`05-standard-categorie`](./ronde1/05-standard-categorie.html) | Sortie standard (site institutionnel sobre) | Référence de contraste | Indiscernable des sites civic-tech |

## Seconde main (re-tirage, après les règles épinglées)

| Fichier | Direction | Idée à garder | Défaut principal |
|---|---|---|---|
| [`01-carte-et-legende`](./ronde2/01-carte-et-legende.html) | Carte et légende (swisstopo, CFF ; assignée) | « Vous êtes ici », prochaine étape, rose des vents à huit pointes aux huit teintes du spectre | Ce n'est pas une carte : rectangles sans géographie ni échelle ; trajet Diffusion → Compétences arbitraire ; rose sans lien avec la carte |
| [`02-poteau-randonnee`](./ronde2/02-poteau-randonnee.html) | Poteau de randonnée (choix de l'assistant) | Une flèche par dimension, qui indique une direction | Pas d'histoire : la boussole n'apparaît pas, les flèches ne sont qu'un menu |
| [`03-disque-double`](./ronde2/03-disque-double.html) | Disque doublé (alternative) | Horizon, graduation d'un seul anneau, artiste et partenaire face à face | Le disque ne représente rien ; deux boutons ; spectre sous-employé |

## Données

- [`donnees/ronde1-payload.json`](./donnees/ronde1-payload.json) et [`donnees/ronde2-payload.json`](./donnees/ronde2-payload.json) : les cartes présentées sur la page de décision (thèse, palette, matières, risque, raffinements issus des challengers).
- [`donnees/ronde1-concept-seed.txt`](./donnees/ronde1-concept-seed.txt) et [`donnees/ronde2-concept-seed.txt`](./donnees/ronde2-concept-seed.txt) : sorties brutes de `impeccable concept-seed` (challengers, grammaires de système, indices dealt).
- [`donnees/mesure-contraste.py`](./donnees/mesure-contraste.py) : rapport de contraste des jetons Memoways et du spectre (`python3 -I donnees/mesure-contraste.py '#hex' ...`).
- [`donnees/genere-esquisses-ronde2.py`](./donnees/genere-esquisses-ronde2.py) : génère les trois esquisses de la seconde main dans `ronde2/` (`python3 -I donnees/genere-esquisses-ronde2.py`). La rose des vents et sa graduation y sont calculées ; c'est la seule pièce à réutiliser si la rose est conservée.

## Prendre ces pièces comme points de départ

Les pièces ont été produites sans récit préalable. Pour les reprendre : écrire d'abord l'histoire du visiteur et la correspondance entre chaque élément de boussole et un geste du produit, valider avec Ulrich, puis redessiner. Voir [le prompt de reprise](../PROMPT_REPRISE_REFONTE_LOT1BIS_2026-11-17.md).

Aucune de ces pièces ne doit être copiée dans `client/` : la direction n'est pas choisie.

# Prompt de reprise — Lot 1 bis (direction visuelle, à refaire avec un modèle plus fort)

À copier tel quel dans une nouvelle session, avec **Claude Opus ou Fable** (ou un autre outil de design choisi par Ulrich), ouverte sur le dépôt. Contexte : [`ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md`](./ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md).

```markdown
# Lot 1 bis — Refonte visuelle « spectre » : direction visuelle, reprise avec un modèle plus fort

## Objectif
Trouver une direction visuelle utilisable pour l'accueil de la Boussole et la faire choisir par Ulrich, sans encore modifier les composants. Le premier essai (Sonnet 5.5, deux mains d'esquisses) a été jugé « inutilisable » par Ulrich : les idées de principe étaient bonnes, l'exécution ne l'était pas, et il n'y avait pas d'histoire. Ce lot refait le travail en commençant par le récit, puis le dessin, avec une exigence d'exécution complète.

## État vérifié
- Plan validé par Ulrich le 17 novembre 2026 : docs/PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md (sections 1, 2 et « Lot 1 »).
- Lot 0 fusionné (PR #33, squash b497f36). Lot 1 : PRODUCT.md (« Brand Commitments ») et la règle de palette d'AGENTS.md sont déjà réécrits ; aucune direction n'est choisie ; aucun « Direction contract » n'est consigné.
- Verdict, règles épinglées, diagnostic et matériel : docs/ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md et docs/refonte-visuelle-lot1-esquisses/ (esquisses HTML, captures, données). Ces esquisses sont des pièces de travail inutilisables telles quelles.
- Production (Coolify) non publiée ; la fusion ne vaut pas publication.

## Dépôt et branche
- Dépôt : /Users/ulrich/CodeProjects/memoways/boussole-numerique-recherche (remote memoways/boussole-numerique-recherche).
- Partir de origin/main à jour (contient la PR du lot 1). Créer la branche `docs/refonte-lot1bis-direction`. Vérifier `git status`. Un seul dossier visible par repo : travailler dans le checkout déjà ouvert ou dans un worktree sous ~/.claude/worktrees ou ~/.codex/worktrees, jamais de nouveau dossier sous ~/CodeProjects.

## Sources à lire
- CLAUDE.md, AGENTS.md, PRODUCT.md, HANDOFF.md, accessibility-audit.md.
- Plan (sections 2 et « Lot 1 »), état du lot 1 et son README d'esquisses.
- client/src/pages/Home.tsx (contenu réel de l'accueil : deux profils, cinq dimensions, libellés), Experience.tsx, Participer.tsx pour les gestes du produit.
- Skill impeccable (/Users/ulrich/.claude/skills/impeccable) : new-work, new-work-world, mode-persuade ; surface brief ; concept-seed.

## Règles épinglées par Ulrich (aucune ne se rediscute)
1. « Boussole » et « Boussole numérique culture » ne sont jamais coupés : aucune césure, aucun mot cassé (ni `hyphens`, ni `&shy;`), titre sur une ligne, taille adaptée. Ne coupez aucun texte n'importe comment.
2. Rien de rétro : ni télétexte, ni carte au trésor, ni pastiche d'époque.
3. Des éléments de boussole en plus du spectre : rondeurs, directions, aiguille, graduation, cap. Aucun cercle concentrique : pas d'effet de cible.
4. Cohérence réelle : chaque choix de couleur, de forme, de taille et de position obéit à une règle énoncée. Rien d'arbitraire.
5. Une histoire de bout en bout (storytelling) : ce que le visiteur comprend et fait ; chaque élément de boussole porte un sens produit.
6. Décisions du plan : couleurs Memoways (whale-skin #515792, dark-knight #171a2f, royal-curtsy #262845, autumn #e27227, pizazz #e58441, skyline #989ab8, desert-field #efcfb7, coast-cream #f7e7db, vert #447b66, ocre #d8b544, rayon 2 px), spectre arc-en-ciel vif comme matière structurelle (jamais un dégradé pastel sur un titre ni sur du petit texte), blocs bruts, hiérarchie contrastée, grotesque libre auto-hébergée, aucune image inventée, AA, français, ton sobre, rien de chiffré non validé.

## Méthode (dans cet ordre)
1. **Histoire d'abord, sans dessiner.** Rédiger 3 histoires courtes et distinctes (une page chacune) : qui arrive, ce qu'il comprend en une seconde, ce qu'il fait, ce que la boussole est dans l'histoire. Chaque histoire contient un tableau « élément de boussole → geste du produit » (par exemple : le point « vous êtes ici » = l'état des lieux sans note ; le cap = la prochaine étape ; le nord = ce qui compte pour la personne). Piste à tester, pas une consigne : relier artiste et partenaire à deux lectures d'une même carte. Pistes de matière issues du premier essai : lecture de carte swisstopo ou CFF (point, légende, échelle, quadrillage), poteau de randonnée suisse (flèches par destination), miroir et horizon, rose des vents aux huit teintes du spectre (sans anneaux concentriques), légende numérotée 01 à 05. Aucune n'est acquise.
2. **Faire valider les 3 histoires par Ulrich** (outil de question structuré) avant tout dessin. Poser deux ou trois questions précises, pas un menu de looks.
3. **Tirage Impeccable** sur l'histoire retenue : `impeccable concept-seed --scope direction --mode persuade` (le tirage `seed:3b1755551a240509` et son re-tirage 1 sont épuisés ; continuer avec `--from 3b1755551a240509 --reroll 2` ou lancer un tirage neuf). Les règles épinglées priment champ par champ.
4. **Dessiner à fidélité complète.** Si un outil de génération d'image existe, produire de vrais comps et les faire figurer sur la page de décision ; sinon des esquisses HTML de qualité de production : vraie hiérarchie, vrais textes de Home.tsx, vraie police (même provisoire), rendu soigné. Vérifier **1440 px et 390 px** (la lecture mobile est fréquente ; le premier essai ne l'a pas fait). Itérer au moins trois rounds de capture et d'autocritique avant de présenter.
5. **Autocritique obligatoire avant de présenter**, grille écrite dans le compte rendu : titre jamais coupé (vérifier en rendu) ; aucun cercle concentrique ; rien de rétro ; chaque élément de boussole relié à un geste du produit ; aucune hauteur ni taille qui suggère un niveau ou un classement ; une seule teinte active à la fois dans un geste de navigation ; paires texte/fond AA mesurées (encre #171a2f sur teintes claires, blanc sur teintes foncées ; blanc sur autumn et pizazz interdits ; le cyan #3a7fc1 n'atteint 4,5 ni avec l'encre ni avec le blanc) ; entrée artiste en premier ; un seul appel à l'action principal.
6. **Présenter la page de décision** (`impeccable serve-question`), et ATTENDRE le choix d'Ulrich. Un re-tirage compte pour une seule main de plus, pas pour un échec.
7. **Après le choix seulement :** consigner le « Direction contract » dans le surface brief Impeccable (six blocs : THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM avec la référence de tirage, FINISH).

## Hors périmètre
Jetons réels dans index.css, police, composants, pages : lots 2 à 6. Aucune image inventée. Ne rien copier des esquisses de docs/refonte-visuelle-lot1-esquisses/ dans client/.

## Limites d'autorisation
- Aucune publication en production ni modification Coolify, DNS ou secrets. Aucune écriture Notion ni appel API en écriture.
- Ne pas inventer de chiffre. Le choix de direction appartient à Ulrich ; ne le déduire d'aucun silence ni d'aucune notification automatique.
- Si Ulrich décide de garder l'identité existante ou de reprendre avec un autre outil, le consigner et arrêter.

## Validations
- `pnpm verify` vert (changements documentaires).
- Contrastes AA mesurés pour toute paire texte/fond annoncée dans le contrat (script docs/refonte-visuelle-lot1-esquisses/donnees/mesure-contraste.py).
- `impeccable detect` sans nouveau constat sur les fichiers touchés.

## Livraison
- Mettre à jour CHANGELOG.md, STORY.md, HANDOFF.md et créer docs/ETAT_REFONTE_VISUELLE_LOT1BIS_<date>.md référencé dans docs/README.md, dans la branche.
- Commit, push sur la branche de lot, PR, squash vers main via /Users/ulrich/CodeProjects/_shared/scripts/github-delivery-exec (git push, gh pr create, gh pr merge --squash), puis vérifier le SHA et le contenu sur origin/main et synchroniser le checkout local.
- Distinguer dans le compte rendu : local, GitHub, staging, production (non publié).

## Clôture
Si une direction est choisie : livrer dans le compte rendu le prompt autonome du lot 2 (fondations du système : jetons, spectre, police auto-hébergée, nettoyage des surcharges `[style*=…]`), prêt à copier, avec son lien s'il est conservé dans un fichier. Sinon, livrer le prompt du lot 1 ter avec l'état vérifié.
```

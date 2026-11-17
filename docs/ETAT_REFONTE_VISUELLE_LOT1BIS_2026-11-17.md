# État — Refonte visuelle « spectre », lot 1 bis (direction visuelle) — 17 novembre 2026

> **Statut : lot 1 bis arrêté. Aucune direction n'est choisie.** Ulrich a retenu l'histoire A, « Le panneau au départ ». Il a ensuite écarté les trois directions dessinées sur cette histoire (« ce n'est toujours pas ça »). Il poursuit la réflexion sur le concept, l'UI/UX et le storytelling dans Notion, à partir des pistes rassemblées dans la tâche [Boussole : concept design UI/UX et storytelling](https://app.notion.com/p/41b511682fc380d99d1dd33383f8bca1). Aucun « Direction contract » n'est écrit. Les lots 2 à 6 restent bloqués.

Fait suite au [lot 1](./ETAT_REFONTE_VISUELLE_LOT1_2026-11-17.md) et au [plan de refonte](./PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md). Matériel : [`refonte-visuelle-lot1bis/`](./refonte-visuelle-lot1bis/).

## Ce qui est fait

1. **Trois histoires avant tout dessin** : [`HISTOIRES_2026-11-17.md`](./refonte-visuelle-lot1bis/HISTOIRES_2026-11-17.md).
   - Une grammaire commune en huit règles (G1 à G8) : un chemin égale une dimension, une teinte et une direction. Le nord est laissé libre. Il n'y a pas de cible. La fin reprend le début.
   - Trois récits : A « Le panneau au départ », B « La carte qui se dessine », C « La boussole en main ».
2. **Décisions d'Ulrich** (outil de question) :
   - histoire A ;
   - noms des cinq chemins : Outils & workflows, Compétences & IA, Données & archivage, Publics & communication, **Partage & collaboration** ;
   - **le nord se pose à la fin**. Pendant la marche, c'est une marque vide ; à l'arrivée, la question de l'idéal remplit le nord.
3. **Tirage Impeccable** `concept-seed --scope direction --mode persuade` :
   - référence `seed:6f4964004aa131b4` ;
   - liste ancrée de sept mondes, indice 6 attribué (signalétique CFF) ;
   - un challenger compétitif (maison Rietveld Schröder) ;
   - cinq challengers écartés, chacun avec l'idée qu'on en garde.
4. **Trois esquisses HTML** à pleine fidélité, toutes sur l'histoire A et la même grammaire. Elles ont été vérifiées à 1440 et 390 px en six tours de capture et de critique : titre sur une ligne, aucun débordement, contrastes AA.
   - A : Signalétique de quai.
   - B : Balisage de randonnée.
   - C : Plans coulissants.
5. **Page de décision** présentée. Elle est restée sans réponse pendant deux heures. Ulrich a ensuite répondu dans la conversation : aucune des trois directions n'est retenue.

## Verdict d'Ulrich

« Ce n'est toujours pas ça. » Ulrich ne choisit ni A, ni B, ni C, et ne demande pas de nouveau tirage. Il veut que toutes les pistes et idées soient rassemblées dans une tâche Notion, avec les prototypes et les captures, pour continuer lui-même le travail de réflexion et de concept.

## Ce qui reste valable

Ces points sont des décisions d'Ulrich ou des règles déjà épinglées. Ils ne sont pas remis en cause par le refus des esquisses.

- Le récit de l'expérience : conversation, chemins et panneaux, boussole fournie par Memoways, carte et radar à la fin, chemin personnalisé.
- Les noms des cinq chemins (ci-dessus). L'alignement des textes de `Home.tsx` et de la démonstration reste à faire dans un lot de composants.
- Le nord posé à la fin.
- Les règles épinglées du lot 1 : titre jamais coupé, rien de rétro, pas d'effet de cible, cohérence, une histoire de bout en bout.

## Matériel

Rien de ce matériel n'est un livrable. Ne rien en copier dans `client/`.

- [`refonte-visuelle-lot1bis/esquisses/`](./refonte-visuelle-lot1bis/esquisses/) : les trois esquisses HTML autonomes et la charge utile de la page de décision (`lot1bis-payload.json`, avec les challengers écartés).
- [`refonte-visuelle-lot1bis/captures/`](./refonte-visuelle-lot1bis/captures/) : premier écran et page entière, à 1440 et 390 px.
- [`refonte-visuelle-lot1bis/genere-esquisses.py`](./refonte-visuelle-lot1bis/genere-esquisses.py) : générateur des trois esquisses. On y trouve la boussole à graduation unique, le radar sans anneaux, avec les niveaux en bornes le long des axes, et les panneaux à pictogramme orienté. Commande : `python3 -I docs/refonte-visuelle-lot1bis/genere-esquisses.py <dossier>`.
- [`refonte-visuelle-lot1bis/capture.mjs`](./refonte-visuelle-lot1bis/capture.mjs) : captures Playwright et mesure du titre et du débordement.

Teintes provisoires des chemins, mesurées AA :

| Chemin | Teinte | Texte sur la teinte | Contraste |
|---|---|---|---|
| Outils & workflows | `#e27227` | encre | 5,44 |
| Données & archivage | `#d8b544` | encre | 8,66 |
| Partage & collaboration | `#447b66` | blanc | 4,92 |
| Publics & communication | `#2f6aa8` | blanc | 5,60 |
| Compétences & IA | `#7a3fa0` | blanc | 6,89 |

Le nord est en `#c2185b` : 5,87 sur blanc.

## Contrôles

- `pnpm verify` : résultat consigné dans la PR de ce lot (documentaire seulement).
- `impeccable detect` sur les trois esquisses : les constats restants (interlignage serré du titre sur une ligne, pictogrammes et pointes sans marge) sont voulus. Ils sont ignorés fichier par fichier, avec leur raison, dans la configuration locale du détecteur.
- Aucun fichier de `client/` modifié. Aucune publication, ni modification Coolify, DNS ou secret.
- Une écriture Notion, demandée par Ulrich le 17 novembre 2026 : le contenu de la tâche ci-dessus.

## Local, GitHub, staging, production

- **Local** : branche `docs/refonte-lot1bis-direction`.
- **GitHub** : PR vers `main`, fusion en squash (documentaire uniquement).
- **Staging** : non concerné.
- **Production** (Coolify) : **non publiée**. Le site visible n'a pas changé.

## Suite

Ulrich travaille le concept dans Notion. Le prochain lot de direction (lot 1 ter) part de ce qu'il y aura décidé. Il ne refait pas un tirage à l'aveugle.

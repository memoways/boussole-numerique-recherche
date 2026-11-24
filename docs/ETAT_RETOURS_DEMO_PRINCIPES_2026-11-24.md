# État — Retours de démo du 24 novembre 2026 (principes valables pour les trois parcours)

> Archive factuelle de ce qui a été livré dans la branche `claude/demo-multi-persona-improvements-6e3efa`. Ulrich a relu la démo `/experience/demo` sur captures annotées (Claire) et a demandé que chaque correction soit un **principe**, appliqué à Claire, Marc et Nadia.

## Retours et traitement

| Retour sur capture | Principe appliqué aux trois parcours |
|---|---|
| « Plus court, moins gros bloc pâté » (lettre de restitution) | Lettre de 101 à 120 mots (154 à 173 avant), en trois paragraphes courts, le fil rouge « Ce qu’on peut évaluer, on peut l’améliorer. » seul dans le dernier. Contrôlé : 3 à 4 paragraphes, 130 mots au plus. |
| « Mettre les qualifications avec les dimensions sur le radar » | Le niveau s’écrit sous chaque dimension du radar (restitution et comparaison). La liste latérale disparaît du visuel ; une liste équivalente reste pour les lecteurs d’écran. |
| « Mettre les mêmes couleurs » | Une couleur par niveau (`LEVEL_COLORS`, `demoTheme.ts`) : Exploration `#8A5A00`, Improvisation `#A8440D`, Organisé `#515792`, Orchestré `#167A5E` (5,3 à 6,7 de contraste sur blanc). Même teinte dans le radar, la légende, les curseurs et les jauges du panneau. La couleur de dimension reste pour l’en-tête d’échange et les notes. |
| « : légende » | La section sous le radar s’intitule « Légende : ce que veulent dire les niveaux » (le lien repliable sous les curseurs garde « Ce que veulent dire les niveaux »). |
| Phrase « Ni bien ni mal. Un point de départ. » barrée | Retirée sous le radar de la restitution. Conservée sous les trois radars de la comparaison. |
| « Plus mettre en avant les questions » | `QuestionCard` : toute question de la Boussole a le même bloc, titre de 20 à 24 px. Le rappel de la question de l’échange sur la page 2 passe à 18-20 px. |
| « Ce bloc n’a pas de playback… toutes les réponses en playback, par-dessus » | La parole se joue toujours avant ce qu’elle déclenche (bulle au-dessus des boutons d’outils). Précision et validation s’écrivent mot à mot avec l’onde, comme la première réponse. Le contrôle mesure l’onde et l’écriture progressive. |
| « Cette synthèse doit venir après la réponse, en indiquant que c’est une synthèse » | « Ce qui fonctionne » et « ce qui pèse » (échanges « outils ») n’arrivent plus pendant la parole : ils entrent dans la « Synthèse de la Boussole », qui suit la réponse. |
| « Il manque extraction → transformation » | Chaque échange (36 sur 36) a une synthèse étiquetée : une fiche de 2 à 4 lignes champ / valeur (`retenu.fiche`), reformulées, qui n’apportent que de l’information structurée. Le passage clé est surligné dans la réponse. |
| « Mettre ce bloc de validation intermédiaire à la fin d’une dimension, avec possibilité de corriger et préciser par la voix » | Plus aucun niveau sous une réponse. Le dernier échange de chaque dimension a une 2ᵉ ou 3ᵉ page « La Boussole vérifie » : tous les niveaux de la dimension, la réponse à la voix (`validation.voix`), puis le curseur glisse si la personne corrige. Le panneau et les jauges ne se remplissent qu’à ce moment. |
| « Surligné et extrait, mais on ne sait pas pourquoi, à quoi ça sert, comment c’est interprété. Peut-être une question de relance » | La phrase de la synthèse dit que la Boussole surligne le passage et le range en fiche. Six questions de précision à la voix (Claire 3 et 6, Marc 3 et 5, Nadia 2 et 11) ajoutent une note quand un passage reste ambigu. |

## Données et code

- `client/src/data/demo-parcours.json` : `retenu.fiche` (obligatoire, 2 à 4 lignes), `retenu.precision` (`question`, `transcription`, `note`), `validation.voix` sur le dernier échange de chaque dimension. `retenu.resume`, `retenu.lecture`, `retenu.sert`, le type d’étape `curseurs` et `questionSuite` disparaissent.
- Quatre échanges « curseurs » deviennent des questions ordinaires, avec nouvelle question et réponse : Claire 4 (retrouver un ancien devis), Marc 8 (ce qui pèse dans le rangement des documents), Nadia 4 (statut d’une œuvre vendue ou prêtée) et Nadia 7 (ce qui pèse dans la présentation du travail). Leur ancienne réponse, qui portait la correction du curseur, devient la `validation.voix` de la dimension ; les citations « dit à l’échange » de la restitution suivent (Claire et Nadia : échange 5).
- Trois dimensions n’avaient aucun niveau et en reçoivent : Claire et Marc (publics), Nadia (outils). Quelques niveaux sont ajoutés ailleurs (Claire 8, Marc 9 et 11, Nadia 11) pour que chaque validation en compte au moins deux quand le parcours s’y prête.
- `client/src/components/demo/` : nouveaux `QuestionCard.tsx` et `SyntheseCard.tsx` (fiche) ; `useStepPlayback.ts` (phases `synthesizing`, `precising`, `validating`, pages : voix et repérage → classement et synthèse → validation) ; `StepPlayer.tsx` ; `ToolsAnswer.tsx` (`ToolFocusCards`) ; `Restitution.tsx` ; `ComparisonView.tsx` ; `MemoryPanel.tsx` ; `DemoAnswers.tsx` ; `demoTheme.ts`.
- `client/src/lib/demoContent.ts` : `isDimensionEnd`, `getDimensionSliders`, éléments retenus par étape de lecture (`extraction`, `precision`, `validation`).

## Contrôles

- `pnpm verify:demo-content` : lecture et `sert` sur chaque échange, 1 à 3 précisions par parcours, validation unique par dimension (8 à 45 mots), 1 à 5 niveaux par dimension, lettre courte, libellés de synthèse, de précision et de validation.
- `pnpm check:demo-playback <url>` : sur chaque échange des trois parcours, à 1280 et 390 px, questions en grand, synthèse après la réponse et étiquetée, précision, niveaux seulement en fin de dimension (nombre et corrections affichés), capsules d’outils seulement dans la synthèse, niveaux sur le radar dans la couleur de la légende, lettre courte.

## Correction après relecture (25 novembre 2026)

La première livraison (PR #37) a été jugée de mauvaise qualité par Ulrich. Défauts constatés sur captures et corrigés :

- une synthèse citait un « passage retenu » venu de la page 1 alors qu’il n’était pas visible sur la page 2 : la synthèse ne cite plus rien, le passage est surligné dans la réponse quand elle est sur la même page ;
- la page 2 d’un échange « outils » reprenait la question de la page 1 au-dessus de sa propre question : chaque page n’affiche plus que sa question ;
- la synthèse reformulait la réponse, recopiait les notes déjà affichées dans le panneau et ajoutait un « à quoi ça sert » vague : elle est réduite à la fiche de données structurées ; les légendes ajoutées sous les extraits du panneau sont retirées.

## Restitution : radar explicatif et pistes justifiées (25 novembre 2026)

| Retour d’Ulrich | Traitement (trois parcours) |
|---|---|
| Ne plus mettre « Ce qu’on peut évaluer, on peut l’améliorer » | Retirée des trois lettres (trois paragraphes). Elle reste sur la page Projet du site, hors démo. |
| Au survol des cinq dimensions : pourquoi ce niveau, quels critères | Panneau à droite du radar (sous lui sur mobile) : synthèse « pourquoi ce niveau » (`restitution.detail`), niveaux relevés avec les mots dits et l’échange, critères (`restitution.criteres` : ce que la Boussole regarde et l’échelle des quatre niveaux appliquée à la dimension, niveau du parcours marqué). Survol par secteur, pastilles pour clavier et toucher. |
| Pistes : liens incompréhensibles | Chaque piste indique la dimension qu’elle fait avancer et son lien est précédé d’une raison. Six renvoient à l’animation correspondante (page « À quoi ça pourrait ressembler », ancre `#demo-micro-<id>`), trois à un article du corpus déjà cité dans la démo. Le lien générique vers `/ressources` est retiré. |

Textes écrits pour l’occasion, à relire : 15 synthèses « pourquoi ce niveau », 20 critères d’échelle (5 dimensions × 4 niveaux) et 5 phrases « ce que la Boussole regarde », 9 raisons de lien. Les synthèses reprennent ce que chaque parcours a dit ; les critères prolongent les définitions des niveaux sans les contredire. Les trois articles liés (Maccarone, Neeman, Raphaël) sont paraphrasés d’après les citations déjà validées dans la démo.

## Questions ouvertes pour Ulrich

1. **« D’où vient “Orchestré” ? »** Décision d’Ulrich le 24 novembre : le mot est conservé. Origine : le mot vient de l’échelle de l’annexe v2 (Exploration · Improvisation · Organisé · Orchestré), validée le 14 octobre 2026 : l’orchestre figure une source unique (la partition) qui coordonne des outils et des personnes qui jouent chacun leur partie. Aucun texte de la démo ne l’explique ; seule la définition le décrit (« Une source fait foi… »). À décider : garder le mot, ajouter une image dans la définition, ou changer de mot.
2. **Phrase barrée.** Le trait jaune sur « Ni bien ni mal. Un point de départ. » a été lu comme « supprimer ». Elle reste sous les radars de la comparaison. À confirmer ou à rétablir.
3. **Légende.** Titre posé en « Légende : ce que veulent dire les niveaux ». L’annotation d’Ulrich (« : légende » placé après le titre) pouvait aussi se lire comme un suffixe.
4. **Contenu écrit pour l’occasion.** Les 36 fiches, les six précisions, les quatre échanges réécrits, les quinze réponses de validation et les trois lettres sont à relire : ce sont des textes de scénario fictifs, sans chiffre inventé.

## Non vérifié

Appareils iOS et Android réels, Docker, production (aucune publication).

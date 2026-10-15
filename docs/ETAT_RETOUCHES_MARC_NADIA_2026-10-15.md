# État des retouches de Marc et de Nadia — démo playback (v1.7.0)

> 15 octobre 2026. Retours d’Ulrich sur les parcours de Marc et de Nadia, après la v1.6.8. Contenu : `client/src/data/demo-parcours.json` ; contrôle : `scripts/verify-demo-content.mjs` et `scripts/check-demo-playback.mjs`.

## Retours et réalisation

| Retour | Réalisation |
|---|---|
| Retirer la référence Nadia Okafor des liens | La ressource `okafor-second-brain` quitte le catalogue `demo-ressources.json` et l’échange 1 de Marc. Plus aucune citation d’Okafor dans la démo ; 11 ressources restent au catalogue, toutes citées au moins une fois. |
| Marc : ne pas outiller le processus de création | Les répétitions restent un moment humain, sans écran. Marc le dit dès l’échange 1 (« je ne veux aucun écran »), et la Boussole le retient (« création vivante, hors numérique »). Disparaissent : la décision de répétition à tracer, le « pourquoi on a changé la scène », le journal de création dicté, la micro-démo `note`. |
| Marc : plus de préparation, de logistique, de médiation, puis la tournée | Parcours en cinq temps : le déroulé du spectacle (1), la préparation avec la scénographe et la costumière, références et plans éparpillés (2, 3), la médiation et la communication aux programmateurs et médiateurs (4, 5), les documents de tournée (6, 7), la logistique de tournée (8, 9), l’IA sur les tâches qui reviennent (10, 11). |
| Nadia : trop de détail au départ | Le parcours commence par les outils de tous les jours, de façon générale (échange 1, avec l’approfondissement conservé), puis le numérique responsable (2). L’inventaire vient ensuite (3), comme besoin précis. Ordre des dimensions : outils, données, publics, compétences, partage. |
| Nadia : ouvrir vers l’exploration, la valorisation de l’existant, la médiation | Échange 4 : au-delà des textes dispersés, trente ans de carnets, de croquis et de photos d’expositions qui dorment (nouveau curseur « Archives d’atelier »). Échange 7 : comment montrer le travail autrement qu’un portfolio ou un site de galerie (se promener par séries, expliquer à une classe). Échange 9 : l’IA locale pourrait aussi aider à retrouver des liens entre les œuvres. |

## Marc, échange par échange

| # | Dimension | Échange |
|---|---|---|
| 1 | Partage | Le spectacle de la première idée à la dernière date ; création hors écran. « D’autres regards » : Guillaud. |
| 2 | Partage | Scénario : la costumière arrive en cours de route ; documents et liens pas toujours à jour. |
| 3 | Partage | Ce qui pèse : retrouver les références, raconter le projet à chaque arrivée. Premier regard. Maccarone. |
| 4 | Publics | Outils pour présenter le spectacle aux programmateurs, aux médiateurs et au public (contenu de la liste inchangé). |
| 5 | Publics | Rebond sur l’échange 3 ; la médiation (note d’intention, dossier pour les scolaires, visuels) refaite à chaque demande. Premier regard. Fischer. |
| 6–11 | Données, outils, compétences | Inchangés (fiche technique et captations, outils de tournée avec approfondissement, WhatsApp, IA). |

Micro-démos : « Les références rejoignent le dossier du spectacle » (`source-unique`), « Un socle, plusieurs documents » (`fiche`, de la médiation), « Une info, plusieurs copies » (`convergence`, conservée). Pistes : dossier par spectacle et fiche de référence, tableau de tournée, socle commun de médiation.

## Nadia, échange par échange

| # | Dimension | Échange |
|---|---|---|
| 1 | Outils | Outils de tous les jours, liste à la voix, relance, classement et approfondissement (Proton Mail, kDrive, LibreOffice). |
| 2 | Outils | Numérique responsable, rebond sur « C’est politique. ». Premier regard. Dollé. |
| 3 | Données | Ce qu’elle garde de son travail : inventaire numéroté depuis 1998, photos reliées par le numéro. |
| 4 | Données | Textes dispersés et archives d’atelier. Quatre curseurs. Premier regard. |
| 5 | Publics | Portfolio demandé pour demain. |
| 6 | Publics | Curseurs ; correction de « Présence en ligne ». |
| 7 | Publics | Montrer le travail autrement. Premier regard. Kelly. |
| 8 | Compétences | Réaction à une IA qui classe des photos. |
| 9 | Compétences | Rebond sur « Ne pas dépendre. » ; IA locale. Premier regard. Raphaël, Dollé. |
| 10–11 | Partage | Qui peut préparer un dossier ; écart entre envies et contraintes. Fischer. |

Micro-démos conservées. « Où va quoi » gagne une place « Archives d’atelier ». Pistes : colonnes Texte, Légende et Prix ; portfolio généré depuis le tableur ; site vivant et IA locale pour explorer l’existant.

## Contrôles

- `verify-demo-content` : ordre des dimensions de Nadia mis à jour ; mêmes règles de trame (2 à 3 échanges par dimension, un seul premier regard, rebonds, citations exactes, écriture bannie).
- `check-demo-playback` : repères de Marc (drawer, ressource) et de Nadia (11 échanges, premiers regards 2, 4, 7, 9, 11, rebonds 2 et 9) alignés sur le nouveau contenu.

## À relire par Ulrich

- Les répliques de Marc aux échanges 1 à 5 et de Nadia aux échanges 3, 4, 7 et 9 sont de nouveaux textes fictifs.
- Les citations « D’autres regards » de Marc et de Nadia sont déplacées sans être modifiées.
- Les deux liens annoncés vers ses billets sur les enjeux de la création culturelle restent à placer.

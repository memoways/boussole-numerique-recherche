# État — outils à la voix d’abord (v1.5.2)

> 15 octobre 2026. Demande d’Ulrich : les listes à choix multiples ne doivent plus exister avant que la personne ait parlé.

## Déroulé d’un échange « cases »

1. Question de la Boussole, sans liste.
2. La personne répond à la voix (transcription en direct).
3. **Repérage** : la Boussole affiche les outils nommés, chacun avec les mots exacts dits.
4. **Propositions** : outils du même registre (les autres `options` de l’étape). La personne en ajoute, souvent un oubli, et le dit.
5. **Classement** : « Du plus important au moins important », avec la parole qui l’explique.
6. **Approfondissement** (Claire, échange 1 seulement) : question sur les trois premiers, réponse, puis cartes « Ce qui fonctionne » / « Ce qui pèse ».
7. Prise de note et panneau « Ce que la Boussole retient », comme avant.

## Fichiers

| Fichier | Changement |
|---|---|
| `client/src/components/demo/ToolsAnswer.tsx` | Nouveau : rendu des cinq temps ci-dessus. |
| `client/src/components/demo/useStepPlayback.ts` | Phases `detecting`, `proposing`, `ranking`, `probing`. |
| `client/src/components/demo/StepPlayer.tsx` | Utilise `ToolsAnswer` quand l’étape a un champ `outils`. |
| `client/src/lib/demoContent.ts`, `client/src/data/demo-parcours.json` | Type `DemoTools`, libellés `outils*`, contenu des 4 échanges. |
| `scripts/verify-demo-content.mjs`, `scripts/check-demo-playback.mjs` | Nouvelles règles ; délai d’attente porté à 45 s. |

## À relire

Les répliques d’ajout, de classement et l’approfondissement de Claire sont des écritures de persona fictive, à valider par Ulrich. Elles s’appuient sur ce que les parcours disent déjà (validations par mail, crédits recopiés, WeTransfer imposé par les partenaires).

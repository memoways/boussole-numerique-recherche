# État — Refonte visuelle « spectre », lot 0 (correctifs immédiats) — 17 novembre 2026

Premier lot du [plan de refonte visuelle « spectre »](./PLAN_REFONTE_VISUELLE_SPECTRE_2026-11-17.md). Il corrige les défauts mesurés par la critique Impeccable sans changer l'identité visuelle : pas de nouvelle palette, de nouvelle police ni de refonte de layout (lots 1 à 6).

## Ce qui est livré

### 1. Boutons orange accessibles (AA)

- Fond `#B8531A` avec texte blanc : **4,89:1**. L'ancien couple `#E07428` + blanc n'atteignait que **3,14:1**.
- La surcharge `client/src/index.css` (anciennes lignes 157-165) est remplacée par une règle unique : les fonds orange posés en `style` inline (`#E07428`, `#E27227`) et les liens à fond bleu inline prennent `#B8531A` et un texte blanc.
- Les boutons à classes Tailwind (`bg-[#E07428] … text-white`) passent à `bg-[#B8531A]`, survol `#9A4414`, focus `#B8531A` : accueil, Expérience, Participer, Partenaires, ateliers (liste, appel, inscription), questionnaire partenaire, présentation, Méthode, Timeline, 404, démo (bouton principal et pastille de lettre).
- Les surfaces orange sans texte blanc (surlignages `/10`, bordures, points décoratifs) ne changent pas.
- Mesures avant/après : voir [`accessibility-audit.md`](../accessibility-audit.md), section « Boutons orange — lot 0 ».

### 2. Radar

`client/src/components/AnimatedRadarGraphic.tsx` (accueil, Expérience, présentation partenaire) :

- l'animation infinie est remplacée par **une seule lecture de 4 s** (profil A vers profil B), puis le radar reste immobile ;
- sous `prefers-reduced-motion: reduce`, il reste **statique** sur le profil A ; la préférence est écoutée (`matchMedia(...).addEventListener('change')`) et une lecture en cours s'arrête si elle passe à « réduit » ;
- aucun bouton pause : l'animation dure moins de 5 s et ne boucle pas (WCAG 2.2.2) ;
- contrôles clavier, `aria-pressed` et zone de texte `aria-live` inchangés.

### 3. Chiffres non validés

- `/projet` : « 1 500 tests réalisés » et « 600 utilisateurs inscrits, dont 30 % utilisant l'outil de manière régulière » sont **retirés**. Ulrich n'a pas confirmé qu'ils viennent du dossier de soutien (question posée le 17 novembre ; réponse : « Non / pas sûr »). Ils pourront revenir au lot 5 (page Dossier) si l'origine est établie.
- Les quatre objectifs restants gardent leur texte ; leurs coches deviennent des puces neutres et le titre devient « Objectifs visés à deux ans ».
- `/projet` : la ligne « 3 à 7 heures par semaine perdues… » est retirée du tableau des problématiques.
- `/projet`, comparatif : la coche verte de la colonne « Piste Boussole » est remplacée par un statut, **« à tester »** (culture, accessibilité, restitution visuelle) ou **« prévu »** (gratuité, hébergement suisse, lecture collective, ressources locales). Le texte d'explication reste.
- `InteractiveNarrativeIllustration.tsx` : les barres et pourcentages 72/54/38 du visuel « signaux » sont remplacés par trois lignes numérotées sans valeur, avec le même comportement d'activation.

### 4. Graisses de police

- `font-extrabold` et `font-black` (800/900, simulées) s'alignent sur **700** via `--font-weight-extrabold` et `--font-weight-black` dans `@theme` (`index.css`). Aucune classe n'est modifiée dans les pages.
- Open Sans est chargé en 400/500/**600/700** et Roboto Mono en 500/**700** (`client/index.html`) : `font-semibold` et `font-bold` sur du texte courant utilisent désormais de vraies graisses au lieu d'un gras simulé. Poppins reste en 400/600/700.
- Aucun changement de police (lot 2).

## Contrôles réalisés

| Contrôle | Résultat |
|---|---|
| `pnpm verify` | vert (tsc, API partenaire, contenu démo, tests ateliers, build, SEO) |
| `pnpm audit:mobile` (320 et 390 px, 21 routes) | 42 contrôles, 0 débordement, 0 erreur de page, 0 contrôle trop petit |
| `pnpm audit:mobile:interactions` | 10 scénarios sur 10 |
| Contraste des boutons orange | 4,89:1 partout (navigateur Playwright, styles calculés) ; détail dans `accessibility-audit.md` |
| Radar sous `reduced-motion: reduce` | statique ; arrêt confirmé à la bascule en cours de lecture ; une seule lecture sinon |
| `impeccable detect --json` sur les fichiers modifiés | 9 constats, tous antérieurs au lot (7 « side-tab », polices Open Sans/Roboto) ; aucun nouveau |
| Captures 1440 et 390 px de `/`, `/?public=artiste`, `/projet`, `/experience`, `/participer` | réalisées localement (non versionnées) |

## Ce qui reste hors périmètre

- Le comparatif conserve les croix rouges des colonnes concurrentes ; leur validation relève du lot 5.
- L'en-tête rouge « Situation actuelle fréquente » (blanc sur `#ef4444`, 3,76:1) relève du lot 5.
- `DescriptionProjet.tsx` n'est plus routée mais contient encore « 3 à 7 heures par semaine » et « 300 utilisateurs » ; à supprimer ou nettoyer lors du lot 5 ou 6.
- Les pourcentages de `Recherche.tsx` sont des chiffres de sources externes, non touchés.
- Open Sans, Poppins et les surcharges `[style*=…]` subsistent jusqu'au lot 2.

## Distinction des environnements

- **Local** : vérifié (voir ci-dessus).
- **GitHub** : PR squash vers `main`.
- **Staging** : aucun environnement dédié utilisé.
- **Production** (Coolify) : **non publiée**. La fusion ne vaut pas publication.

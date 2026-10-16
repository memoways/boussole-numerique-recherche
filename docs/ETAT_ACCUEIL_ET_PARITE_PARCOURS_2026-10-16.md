# État — accueil sans titre et parcours de Marc et de Nadia au niveau de Claire (v1.9.0)

> 16 octobre 2026. Retours d’Ulrich sur le démonstrateur « parcours fictif ». Contenu : `client/src/data/demo-parcours.json` ; contrôles : `scripts/verify-demo-content.mjs` et `scripts/check-demo-playback.mjs`.

## Retours et réalisation

| Retour | Réalisation |
|---|---|
| Le titre donné à chaque personne perturbe : il juge les pratiques avant le questionnaire | Le champ `accroche` disparaît (JSON, type, carte de choix, accueil), sans remplaçant. Le contrôle refuse toute `accroche`. |
| Redire clairement « tu es Marc » et l’enjeu | L’accueil s’ouvre sur « Tu es Marc, metteur en scène ». Première version trop verbeuse (âge, contexte, paragraphe d’objectif qui répétait les blocs) : retirée le jour même sur retour d’Ulrich. |
| Dire que c’est fictif et que ce serait différent pour soi | Accueil final : le titre et trois blocs. « Imagine que tu es Marc » (tu réponds à sa place ; pour toi, ce serait différent ; la démo montre la mécanique et les principes), « Tu fais avancer la conversation » (playback) et « Avant de commencer » (confiance). Ni âge, ni contexte, ni sur-titre : la personne reste ouverte à la projection. |
| Choix de la personne | Titre « Choisis la personne dont tu prends la place », deux phrases d’introduction, bouton « Être Claire / Marc / Nadia ». Chaque carte ne montre que le prénom et le métier. |
| Marc et Nadia manquent de richesse par rapport à Claire | Mêmes exigences que Claire, contrôlées désormais pour les trois parcours (voir ci-dessous). |

## Exigences communes aux trois parcours

`verify-demo-content` impose maintenant, pour chaque personne : 12 échanges, au moins quatre échanges avec des curseurs induits, au moins trois « premiers regards » avec un ordre de grandeur illustratif. Les règles déjà en place restent : 2 à 3 échanges par dimension, un « ce qui pèse » après l’entrée, un seul premier regard par dimension, au moins une correction de curseur, deux rebonds, une question sur le numérique responsable, citations exactes, écriture sans « concret » ni « ce n’est pas X, c’est Y ».

## Marc : 11 → 12 échanges

- Nouvel **échange 7** (données, scénario) : un lieu propose de reprendre un spectacle d’il y a quelques années ; Marc retrouve des morceaux après avoir fouillé plusieurs endroits (« c’est toujours un peu de chance »). Il ouvre l’archivage des spectacles passés, jusque-là absent.
- Échange 8 (ancien 7) : nouveau curseur « Reprise d’un ancien spectacle » ; le premier regard mentionne les spectacles passés.
- Ordres de grandeur illustratifs ajoutés aux premiers regards 3 (retrouver un croquis) et 12 (mail aux lieux d’accueil).
- Micro-démo « Une info, plusieurs copies » : une copie de plus (dossier pour les scolaires).
- Lettre allongée (de 113 à 154 mots), idéal et première piste complétés. Les références de la restitution suivent la renumérotation (échange 8 pour la fiche de référence).
- Rebond de l’échange 12 : il cite maintenant l’échange 9.

## Nadia : 11 → 12 échanges

- Nouvel **échange 4** (données, curseurs) : « D’après ce que tu dis ». L’inventaire et les photos y sont validés ; la Boussole propose « Sauvegarde des images : Improvisation » sans que Nadia en ait parlé, et elle corrige (« Organisé », copie sur un disque externe). Même mécanique que la correction de Claire.
- Échange 5 (ancien 4) : curseurs réduits aux textes et aux archives ; premier regard avec un ordre de grandeur illustratif.
- Réponses plus riches : échanges 2 (hébergeur suisse, confiance sans vérification), 9 (où partent les images), 11 (la galerie qui attend le dossier). Échange 11 : un curseur induit, « Préparer un dossier en son absence ».
- Ordre de grandeur illustratif au premier regard de l’échange 12.
- Restitution : « Des images sauvegardées en double » remplace « Des images reliées aux numéros » dans ce qui fonctionne ; lettre allongée (de 130 à 162 mots) ; idéal complété.
- Rebond de l’échange 10 (ancien 9), saut de chapitre Publics vers l’échange 6.

## Contrôles

- `pnpm verify` réussi (TypeScript, build, SEO, API, contenu de la démo).
- `pnpm check:demo-playback http://127.0.0.1:4173` : 758 vérifications réussies, 0 échec, sur ordinateur (1280 px) et mobile (390 px), pour les trois parcours, la comparaison et les redirections. Contrôles d’accueil : titre « Tu es {prénom}, {métier} », ni âge ni contexte, encadré fictif, « à sa place ».
- Repères du script mis à jour : Marc 12 échanges (premiers regards 3, 5, 8, 10, 12 ; rebonds 5 et 12 ; correction à l’échange 8) ; Nadia 12 échanges (premiers regards 2, 5, 8, 10, 12 ; rebonds 2 et 10 ; correction à l’échange 7). Les redirections « étape 12 absente » deviennent « étape 13 absente ».
- Non vérifié : `docker build` (Docker absent), appareils iOS et Android réels.

## À relire par Ulrich

- Le texte d’accueil allégé (`accueil` dans le JSON) et l’introduction du choix de la personne.
- Les répliques nouvelles ou allongées de Marc (échange 7) et de Nadia (échanges 2, 4, 9, 11), qui sont des textes fictifs.
- Les trois ordres de grandeur ajoutés pour Marc et Nadia, tous marqués « illustratif ».
- Les « D’autres regards » de Marc et de Nadia sont inchangés : aucune citation nouvelle n’a été ajoutée sans lecture de la source.

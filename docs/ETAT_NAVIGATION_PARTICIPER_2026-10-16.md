# État — Menu simplifié et page « Participer au projet » — 16 octobre 2026

Version 1.10.0. Demande d’Ulrich Fischer du 16 octobre 2026 : faire des ateliers le premier appel à l’action, alléger le menu du haut, séparer « participer » (actions concrètes) de « partenaires » (présentation), rendre les cartes d’atelier lisibles.

## Ce qui a changé

| Zone | Avant | Après |
|---|---|---|
| Menu du haut | Projet, Calendrier, Expérience, Méthode, Partenaires, Ateliers + bouton « Participer au projet » vers `/partenaires` | Projet, Expérience, Partenaires, Calendrier + bouton orange « Participer au projet » vers `/participer` |
| Pied de page | Colonne « Engagement » : Partenaires, Ateliers, Données & gouvernance | Colonne « Engagement » : Participer au projet, Ateliers (`/participer#ateliers`), Partenaires, Données & gouvernance. « Méthode & co-conception » reste dans « Le projet ». |
| `/participer` (nouvelle) | — | Ateliers en premier (format d’un atelier, puis cartes avec inscription), questionnaire partenaire et demande d’invitation en dessous |
| `/ateliers` | Page des ateliers | Redirection : 301 Nginx vers `/participer` ; côté client, redirection qui conserve `#<slug>` |
| `/partenaires` | Mini-chronologie de quatre moments, parcours en quatre étapes, bloc d’appel aux ateliers, bloc dégradé « site compagnon », double CTA | Présentation seule : rôle, public, partenaires confirmés, apports. Un seul CTA vers `/participer` en haut, un seul bouton « Voir le calendrier » en bas. |

Les liens « Découvrir comment contribuer » (`/projet`) et « Signaler mon intérêt » (`/methode`) pointent vers `/participer`. Le bloc d’appel aux ateliers de l’accueil pointe vers `/participer#ateliers`.

## Cartes d’atelier

Ordre : type et statut, titre, « À qui s’adresse cet atelier » (puces de public), **informations pratiques visibles sans clic** (date, lieu, adresse, texte « Infos pratiques » en puces, places restantes, date limite, bouton « S’inscrire »), puis objectifs et programme en puces, côte à côte sur grand écran.

- Plus de dépliants : programme et informations pratiques sont toujours affichés.
- La ligne « Organisateur » n’est plus affichée (la valeur reste dans Notion).
- Les textes Notion sont découpés en puces : une ligne par puce, ou une phrase par puce quand le texte est un seul bloc.
- Libellés de public : « Professionel du cinéma » (faute dans l’option Notion) s’affiche « Professionnel·les du cinéma ».
- Texte d’introduction commun, au-dessus des cartes, sur le format : atelier informel et horizontal, discussion ouverte pour co-concevoir l’outil, premiers besoins traités sur place, pistes utiles à l’arrivée.

## SEO et infrastructure

- `shared/seo-pages.json` et `scripts/generate-seo.mjs` : `/participer` indexable ; `/ateliers` canonisée vers `/participer`, non indexable, sans page statique (comme les autres anciennes URL).
- `llms.txt` et navigation statique : « Participer au projet ».
- `infra/nginx/default.conf` : `/ateliers` et `/ateliers/` en 301 vers `/participer` ; `/participer/` en 308 vers `/participer`.
- `pnpm audit:mobile` : `/participer` remplace `/ateliers`.

## Contrôles réalisés

- `pnpm verify` : réussi (TypeScript, API, contenu démo, test des ateliers, build, SEO-GEO, build API).
- Navigateur, avec une API simulée qui sert les deux vrais ateliers de Notion : `/participer` (desktop et 375 px, sans défilement horizontal), `/ateliers#fonction-cinema-14-janvier-2027` redirigé vers `/participer#…` avec la carte ciblée au focus, `/partenaires` (un seul lien vers `/timeline`), menu mobile.
- Non vérifié : Nginx et `docker build` (Docker absent) ; appareils réels ; `pnpm audit:mobile`.

## À savoir pour Notion

Le champ « Infos pratiques » répète la date et le nombre de places déjà affichés sur la carte. Un texte plus court (gratuit, sur inscription ; rien à apporter ; venir avec une ou deux situations de travail ; snacks et boissons) évite les doublons. Les champs « Objectifs » et « Programme » gagnent à être écrits en phrases courtes ou en lignes séparées.

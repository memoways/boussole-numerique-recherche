# Audit SEO et GEO — 15 août 2026

## Référentiel de travail

L’optimisation vise d’abord une **découvrabilité vérifiable**. Le terme GEO est employé ici pour désigner la lisibilité du contenu par les moteurs et les assistants génératifs, sans promettre de résultat ou de citation par un système tiers. Les mêmes exigences servent le SEO et les usages génératifs : pages HTML publiques, informations factuelles explicites, titres cohérents, liens explorables, données structurées fidèles au contenu et sources identifiables.

Google recommande JSON-LD lorsqu’il est adapté à l’architecture du site, mais exige que les données structurées décrivent le contenu effectivement visible ; quelques propriétés exactes sont préférables à une couverture exhaustive ou incertaine.[1] Pour les applications JavaScript, Google indique que le pré-rendu peut aider, attend des titres, descriptions et canoniques uniques, et recommande des liens HTML avec attribut `href` ainsi que des codes HTTP significatifs.[2]

| Axe | Critère vérifiable | Décision d’audit |
|---|---|---|
| HTML public | Chaque route indexable doit produire un fichier HTML contenant titre, description, canonique et contenu principal | Contrôler le générateur statique et les sorties `dist/public` |
| Données structurées | Le JSON-LD doit être fidèle au contenu visible et employé uniquement quand ses propriétés sont complètes | Vérifier les graphes `WebSite`, `Organization`, `WebPage`, `BreadcrumbList` et les éventuels graphes de pages de recherche |
| Indexation | Sitemap, robots, canoniques, noindex et routes de secours doivent converger | Contrôler les fichiers générés et les trajectoires d’URL historiques |
| GEO | Le propos, les publics, le statut de co-conception, les phases et les sources doivent être formulés sans ambiguïté | Renforcer les blocs de contexte réutilisables, les auteurs/éditeurs et les références documentaires sans inventer de faits |
| Déploiement | Le serveur doit fournir les bons statuts HTTP et le domaine public sans port | Vérifier la configuration de production Coolify séparément du build statique |

## Constats techniques et corrections retenues

| Constat | Risque | Correction retenue |
|---|---|---|
| Le registre React `seo.ts` et le générateur statique portaient des titres et descriptions différents | Les aperçus de partage, le build et la navigation SPA pouvaient exposer des messages contradictoires | Employer un seul registre de pages publiques partagé par le rendu React et le générateur post-build |
| Les pages sous `client/public` étaient des copies de gabarit avec un chemin de module de développement | Elles ne constituaient ni des pages HTML complètes ni des entrées compatibles avec les assets compilés | Générer les pages après Vite, à partir de l’HTML compilé et de ses assets définitifs |
| Le HTML initial ne contenait pas de contenu éditorial de page dans `#root` | Les robots ou outils qui n’exécutent pas JavaScript ne recevaient pas le contexte principal de la route | Injecter une version HTML concise, sémantique et fidèle de chaque route publique ; React la remplace ensuite par l’interface interactive |
| Le fallback SPA renvoyait l’index pour une URL inconnue | Un moteur pouvait voir une « soft 404 » et indexer une adresse sans contenu correspondant | Servir les routes publiques par fichiers HTML générés et retourner une page 404 statique avec statut HTTP 404 pour les autres chemins |
| Les graphes JSON-LD étaient limités à `WebSite` ou `WebPage` | Les relations entre site, éditrice, page et fil d’Ariane étaient peu explicites | Émettre un graphe JSON-LD exact avec `WebSite`, `Organization`, `WebPage` et `BreadcrumbList` lorsque pertinent |
| Aucun repère explicite ne résumait le site pour les lecteurs génératifs | L’information est disponible, mais dispersée entre les pages | Publier un `llms.txt` descriptif, non présenté comme un standard de classement, et renforcer le HTML éditorial source |

Les corrections ne marquent pas les pages comme articles, FAQ ou événements lorsqu’elles ne possèdent pas les propriétés nécessaires. Cette retenue suit la recommandation de privilégier des propriétés peu nombreuses, exactes et maintenables.[1]

## Validation effectuée

Le build produit désormais dix pages indexables en HTML statique, avec leur titre, meta description, canonique, `h1`, navigation sémantique, liens de parcours, graphe JSON-LD et assets compilés. `robots.txt`, `sitemap.xml`, `llms.txt`, les trois parcours privés non indexables et `404.html` sont inclus dans la vérification automatisée `pnpm verify:seo`.

Le contrôle du navigateur sur la page Partenaires confirme qu’après hydratation React, le document conserve une seule meta description, une seule URL canonique et un seul graphe JSON-LD contenant quatre entités : `WebSite`, `Organization`, `WebPage` et `BreadcrumbList`. Le résultat est vérifié lors de la construction ; la soumission et le suivi d’indexation réels restent à effectuer depuis Google Search Console et Bing Webmaster Tools après le déploiement public.

## Sources

[1] [Google Search Central — Structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

[2] [Google Search Central — JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

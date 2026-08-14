# Contrôle des liens externes des archives

**Date du contrôle :** 14 août 2026  
**Périmètre :** tous les liens externes relevés dans les six archives Markdown publiques sous `client/public/`.  
**Méthode :** contrôle HTTP passif avec Lychee 0.24.2, sans authentification, sans soumission de formulaire et sans exécution de contenu tiers.[1]

## Résultat global

| Indicateur | Résultat | Lecture |
|---|---:|---|
| Liens relevés | 172 occurrences | Les mêmes URL peuvent apparaître dans plusieurs archives. |
| Liens uniques | 152 | URL distinctes contrôlées. |
| Réponses réussies | 115 | Ce total comprend 27 URL suivies après redirection. |
| E-mails exclus | 2 | Les adresses `mailto:` ne sont pas contrôlées par HTTP. |
| Résultats signalés | 55 | À qualifier : une erreur HTTP ne démontre pas toujours qu’un document est supprimé. |

> Les 403, 405 et certains 400 peuvent résulter d’une protection anti-robot, d’une page qui refuse `HEAD`, ou d’un accès institutionnel. Ils restent **à vérifier dans un navigateur** avant toute suppression ou substitution de source.

## Liens à traiter en priorité

Les 22 erreurs 404 correspondent à 21 URL distinctes, dont l’ancienne URL Diag-numerique répétée dans l’archive Analyse d’outils. Elles demandent une recherche de destination de remplacement ou un retrait de lien de l’archive, avec conservation de la mention historique si elle est utile.

| URL signalée en 404 | Archive concernée | Action recommandée |
|---|---|---|
| `http://www.diag-numerique.fr/` | Analyse d’outils | Retirer le lien direct ou retrouver une archive fiable ; le service est déjà présenté comme historique. |
| `http://tmc.diag-numerique.fr/` | Analyse d’outils | Même traitement ; ne pas le confondre avec les références actives. |
| `https://competenceculture.ca/publications/lia-en-culture/` | Étude complète | Chercher la publication actuelle sur le site de l’organisme. |
| `https://conseildesarts.ca/financement/lignes-directrices-ia` | Étude complète | Chercher la nouvelle page de lignes directrices. |
| `https://culture.ec.europa.eu/cultural-heritage/initiatives-and-success-stories/eu-policies-and-funding-for-cultural-heritage/common-european-data-space-for-cultural-heritage` | Étude complète | Rechercher la page actualisée de l’espace européen de données. |
| `https://cuseum.com/blog/2025/9/3/implementing-ai-for-cultural-institutions-part-1` | Étude complète | Vérifier si l’article a changé de chemin ou a été dépublié. |
| `https://prohelvetia.ch/en/news/2026-changes-to-innovation-society-support-formats/` | Étude complète | Chercher l’annonce active de Pro Helvetia. |
| `https://reseauadn.ca/a-propos/` | Étude complète | Privilégier, si elle reste active, la page wiki du Réseau ADN déjà citée dans l’archive. |
| `https://www.artcena.fr/actualites/intelligence-artificielle-et-creation-artistique` | Étude complète | Rechercher l’article dans les actualités ART CENA. |
| `https://www.atelierdesevres.com/blog/impact-intelligence-artificielle-art/` | Étude complète | Vérifier le chemin actuel de l’article ou conserver une formulation sans lien. |
| `https://www.bak.admin.ch/bak/de/home/aktuelles/nsb-news.msg-id-103806.html` | Étude complète | Chercher l’annonce correspondante dans la base d’actualités de l’OFC. |
| `https://www.caissedesdepots.fr/blog/article/france-2030-lia-au-service-de-la-culture-une-synergie-prometteuse` | Étude complète | Conserver la variante déjà citée sous `http://` seulement après vérification manuelle de la page HTTPS actuelle. |
| `https://www.cooperativecomputing.com/insights/how-to-build-digital-culture-before-technology/` | Étude complète | Vérifier le nouvel emplacement ou retirer l’appui non essentiel. |
| `https://www.culture.gouv.fr/Thematiques/Numerique` | Étude complète | Remplacer par la page officielle actuelle du Ministère. |
| `https://www.meltingspot.io/blog/digital-transformation-failure-rate` | Étude complète | Vérifier le nouvel article ou retirer la source d’opinion. |
| `https://www.mic.ul.ie/news-events/news/using-generative-artificial-intelligence-support-creativity-arts-education` | Étude complète | Vérifier si l’étude de cas associée reste accessible. |
| `https://www.prosci.com/fr/blog/7-strategies-dadoption-du-numerique-qui-favorisent-la-reussite-des-entreprises` | Étude complète | Vérifier la variante d’URL avec tiret déjà présente dans l’archive. |
| `https://www.sciencedirect.com/science/article/pii/S2666603024000551` | Étude complète | Vérifier la référence DOI ou l’accès via une bibliothèque. |
| `https://www.unesco.org/sites/default/files/medias/fichiers/2025/09/CULTAI_Report` | Étude complète | Remplacer par le PDF complet déjà référencé dans l’archive, après vérification. |
| `https://www.unige.ch/formcont/cours/innovation-changement-culturel` | Étude complète | Vérifier la page de formation actuelle de l’Université de Genève. |
| `https://www.bak.admin.ch/bak/de/home/aktuelles/medieninformation.html` | Sources trouvées | Chercher l’annonce archivistique appropriée sur le site de l’OFC. |

## Résultats à vérifier manuellement

| Statut observé | Occurrences | Interprétation prudente |
|---|---:|---|
| 403 | 21 | Souvent une protection anti-robot ou une restriction de l’éditeur ; ne pas conclure à un lien cassé. |
| 405 | 3 | Le serveur refuse la méthode utilisée ; ouvrir la page dans un navigateur avant décision. |
| 400 | 6 | Cas concentrés sur ScienceDirect, probablement liés au parcours d’authentification de l’éditeur. |
| Erreur réseau ou format | 3 | Vérifier ultérieurement, depuis un navigateur, les URL CEIMIA, Culture.gouv et L’Appui. |

Les 27 redirections suivies restent accessibles dans le cadre du contrôle. Elles peuvent être remplacées plus tard par leur destination finale, après une vérification de contenu, afin de réduire les chaînes de redirection.

## Repère visuel des liens sortants

Les archives Markdown affichent désormais l’icône `↗` à côté de chaque lien HTTP(S). L’icône est accompagnée d’un texte accessible qui annonce « ouvre un site externe dans un nouvel onglet » ; ces liens appliquent `target="_blank"` et `rel="noopener noreferrer"`. Le même pictogramme identifie les sources externes dans les fiches de la page Ressources.

## Procédure de correction

La prochaine intervention doit traiter les 404 un par un : retrouver une page officielle, une publication stable ou un DOI ; remplacer ensuite le lien dans l’archive sans réécrire l’analyse d’origine. Les liens protégés nécessitent une vérification humaine avant toute modification. Le rapport ne recommande pas de supprimer automatiquement les références scientifiques ou institutionnelles.

## Référence

[1] [Lychee — vérificateur de liens open source](https://github.com/lycheeverse/lychee)

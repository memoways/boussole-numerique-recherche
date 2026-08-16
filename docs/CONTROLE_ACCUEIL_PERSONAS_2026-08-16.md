# Contrôle de l’accueil par personas — 16 août 2026

## Premier contrôle visuel

L’état neutre de l’accueil présente un hero concis, le sélecteur des trois publics et un bloc de contexte commun sans pousser un seul parcours particulier. Les trois choix visibles sont : partenaire relais, artiste ou personne active dans la culture, et personne intéressée par les enjeux numériques.

La sélection du parcours partenaire ajoute `?public=partenaire` à l’URL, déploie le récit spécifique, rend visibles les actions vers la présentation et le questionnaire, puis conserve une commande de retour vers l’état neutre. Le contenu personnalisé est atteint après le choix, sans masquer la navigation globale.

Le parcours Artiste est également accessible directement avec `?public=artiste`. Il met en avant les situations de travail à faire émerger, un radar exploratoire des cinq dimensions et le relais de manifestation d’intérêt. Le parcours Enjeux numériques, accessible avec `?public=enjeux-numeriques`, présente une lecture reliant pratiques, questions, ressources et choix partagés ; ses liens mènent vers la recherche, la méthode et la suite de la démarche.

Lorsque `VITE_PARTNER_API_URL` n’est pas configurée, les deux parcours affichent explicitement le relais e-mail sans présenter de pseudo-formulaire. Lorsque l’API est activée, ce bloc devient un formulaire de consentement à des ateliers et/ou à une notification de lancement.

Le contrôle DOM du parcours Enjeux numériques confirme que les trois choix exposent un état `aria-pressed`, que seul le choix actif est annoncé comme sélectionné, que le titre du récit peut recevoir le focus, et que l’hydratation maintient une canonique sans paramètre de persona ainsi qu’un unique graphe JSON-LD. Les paramètres `?public=` servent donc au partage d’un état de lecture, sans créer de variante SEO concurrente.

La FAQ partenaire a été contrôlée sur le parcours `?public=partenaire`. Elle affiche trois questions propres aux organisations relais, déplie initialement la première réponse, puis referme cette réponse lorsqu’une seconde est activée. Les boutons exposent l’état ouvert ou fermé, les panneaux sont associés par `aria-controls` et les liens d’approfondissement restent accessibles dans la réponse dépliée.

Le parcours `?public=artiste` remplace bien cette FAQ par les questions propres aux futurs utilisateurs individuels. L’ouverture de la question sur l’évaluation numérique referme la première réponse, rappelle l’absence de note ou de jugement, puis rend accessible le lien vers les cinq dimensions de l’expérience Boussole.

Le parcours `?public=enjeux-numeriques` affiche sa propre FAQ, dont la première réponse confirme que le diagnostic public n’est pas encore ouvert. L’ouverture de la question sur la contribution sans rôle pilote dévoile le relais vers les documents et sources ; elle remplace correctement la réponse initiale sans chevauchement de contenu.

Le parcours partenaire affiche désormais deux visualisations interactives : un radar adapté aux gestes d’écoute, relais, priorisation, test et transmission, puis une boussole « Écouter → Traduire → Relier ». L’activation de « Prioriser » actualise bien la lecture sous le radar. Le récit ne propose plus que deux CTA : comprendre le rôle des partenaires et partager besoins et idées.

Le parcours Artiste présente de nouveau le radar des cinq dimensions et la boussole « Décrire → Situer → Agir ». Le texte d’explication du radar est maintenant situé hors de la zone de taille du SVG : il ne chevauche plus l’illustration sur petit écran. L’activation de « Situer » met à jour la lecture narrative de la boussole, tandis que le récit conserve uniquement les CTA vers la manifestation d’intérêt et l’expérience Boussole.

Le parcours Enjeux numériques présente son radar adapté aux pratiques, à la littératie, aux ressources, à la responsabilité et aux communs, accompagné de la boussole « Utile → Neutre → Souveraine ». L’activation de « Neutre » met à jour le commentaire associé. Le récit n’expose que deux CTA : consulter la recherche et les ressources, puis suivre la démarche.

Un contrôle DOM sur le parcours Enjeux numériques confirme que le récit personnalisé contient exactement deux liens d’action. La vérification de géométrie confirme également que le texte contextuel du radar est placé 16 px sous le SVG : il ne partage plus la zone de rendu du graphique et ne peut donc plus produire le chevauchement observé.

Après la restauration du sandbox, l’aperçu de développement a temporairement affiché une page blanche sans erreur console, alors que la compilation TypeScript restait valide. La relance du serveur a résolu cet incident ; le contrôle visuel final confirme le hero réduit au titre et à la promesse, ainsi que l’entrée « Entrée dans le site par profil » sans éléments décoratifs signalés.

Lorsqu’un profil est sélectionné, un sous-menu fixe apparaît sous la navigation principale. Il expose les trois raccourcis attendus : « Institutionnel », « Artiste » et « Enjeux du numérique ». Le profil actif adopte sa couleur propre ; le clic sur « Artiste » met à jour l’URL vers `?public=artiste`, le récit, les visualisations et les CTA, sans imposer de retour au sélecteur initial.

Le défilement du parcours Artiste conserve le sous-menu sous la navigation globale. Un contrôle DOM confirme un positionnement `fixed`, une hauteur de 49 px, un ancrage à 64 px du haut et un seul état actif, « Artiste ».

## Contrôles restant à effectuer

- Vérifier le comportement clavier, les préférences de mouvement réduit et la largeur mobile.
- Vérifier l’enregistrement réel et l’export administratif après l’activation de l’API et de PostgreSQL dans Coolify.

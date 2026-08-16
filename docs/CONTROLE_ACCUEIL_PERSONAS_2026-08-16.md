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

La page Expérience a aussi été contrôlée après clarification du radar : les cinq icônes périphériques sont les seuls éléments exposés comme boutons. Le clic sur l’icône Outils ouvre sa lecture contextuelle ; les cinq points du tracé ne portent plus de rôle, de focus ni de contrôle interactif.

Le radar partagé du parcours Artiste applique désormais la même règle. Il expose cinq icônes périphériques comme contrôles, tandis que les cinq points du tracé restent graphiques. Le clic sur l’icône Compétences met à jour le résumé associé. La boussole interactive conserve ses trois grandes cibles de contribution, qui deviennent une colonne de boutons tactiles sur petit écran pour éviter les libellés comprimés.

Le clic sur l’étape « Situer » de la boussole Artiste met à jour sa lecture contextuelle. Les trois cibles sont des boutons complets, avec une hauteur minimale de 92 px et un empilement prévu avant le breakpoint `sm`, ce qui maintient des cibles confortables et des libellés entiers sur mobile.

La présentation partenaire a été contrôlée sur `/partenaires/presentation?slide=3`, puis avec la commande Suivant. La pagination produit `/partenaires/presentation?slide=4` : elle ne fabrique ni URL absolue, ni port interne, et le compteur comme le contenu correspondent à la slide active.

Après sélection du profil Artiste, le récit est maintenant ancré avec une marge de 15 rem sous les barres fixes. Le sous-menu reste visible et le radar, ses cinq icônes ainsi que son libellé d’exploration sont entièrement contenus dans le premier écran du récit, sans découpe supérieure.

Le réglage final ramène cette marge à 8 rem, correspondant à la hauteur cumulée de la navigation globale et du sous-menu de profils. Après un clic sur la carte Artiste, le séparateur du récit arrive exactement sous ces deux barres fixes ; le radar et ses icônes restent entièrement visibles, sans espace blanc excessif au-dessus du contenu.

Le même comportement est confirmé pour Institutionnel : le clic sur sa carte déclenche un défilement fluide vers le séparateur, conserve les deux barres fixes visibles et affiche entièrement le radar de relais ainsi que sa boussole de contribution.

Le parcours Enjeux du numérique adopte le même alignement : la sélection déclenche le défilement fluide, le séparateur arrive sous le sous-menu et le radar Pratiques ainsi que les étapes Utile, Neutre et Souveraine restent entièrement visibles.

Sur l’accueil neutre, les trois CTA orange de profils sont visibles sous la promesse et le sous-menu sticky est absent. Le clic sur le CTA Artiste ajoute `?public=artiste`, déclenche le récit et, une fois les cartes dépassées, affiche le sous-menu contextuel avec le profil actif et les deux alternatives.

Le sélecteur est désormais unique : les trois profils prennent la forme de capsules colorées dans le hero, chacune avec son icône, son intitulé et son périmètre. Les anciennes cartes séparées n’apparaissent plus. Le clic sur Institutionnel confirme que le récit, les deux actions et les visualisations se chargent correctement, tandis que le sous-menu contextuel reste disponible après le dépassement du hero.

Le clic sur la capsule Artiste déclenche désormais simultanément le récit, le défilement fluide et l’affichage immédiat du sous-menu contextuel. Pendant l’arrivée sur le contenu, le profil actif et les deux alternatives sont déjà disponibles sous la navigation principale ; après le déplacement, le récit Artiste, ses deux CTA, le radar et la boussole restent visibles et cohérents.

## Contrôles restant à effectuer

- Vérifier le comportement clavier, les préférences de mouvement réduit et la largeur mobile.
- Vérifier l’enregistrement réel et l’export administratif après l’activation de l’API et de PostgreSQL dans Coolify.

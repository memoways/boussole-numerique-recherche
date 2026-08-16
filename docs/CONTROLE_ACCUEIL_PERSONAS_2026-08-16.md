# Contrôle de l’accueil par personas — 16 août 2026

## Premier contrôle visuel

L’état neutre de l’accueil présente un hero concis, le sélecteur des trois publics et un bloc de contexte commun sans pousser un seul parcours particulier. Les trois choix visibles sont : partenaire relais, artiste ou personne active dans la culture, et personne intéressée par les enjeux numériques.

La sélection du parcours partenaire ajoute `?public=partenaire` à l’URL, déploie le récit spécifique, rend visibles les actions vers la présentation et le questionnaire, puis conserve une commande de retour vers l’état neutre. Le contenu personnalisé est atteint après le choix, sans masquer la navigation globale.

Le parcours Artiste est également accessible directement avec `?public=artiste`. Il met en avant les situations de travail à faire émerger, un radar exploratoire des cinq dimensions et le relais de manifestation d’intérêt. Le parcours Enjeux numériques, accessible avec `?public=enjeux-numeriques`, présente une lecture reliant pratiques, questions, ressources et choix partagés ; ses liens mènent vers la recherche, la méthode et la suite de la démarche.

Lorsque `VITE_PARTNER_API_URL` n’est pas configurée, les deux parcours affichent explicitement le relais e-mail sans présenter de pseudo-formulaire. Lorsque l’API est activée, ce bloc devient un formulaire de consentement à des ateliers et/ou à une notification de lancement.

Le contrôle DOM du parcours Enjeux numériques confirme que les trois choix exposent un état `aria-pressed`, que seul le choix actif est annoncé comme sélectionné, que le titre du récit peut recevoir le focus, et que l’hydratation maintient une canonique sans paramètre de persona ainsi qu’un unique graphe JSON-LD. Les paramètres `?public=` servent donc au partage d’un état de lecture, sans créer de variante SEO concurrente.

## Contrôles restant à effectuer

- Vérifier le comportement clavier, les préférences de mouvement réduit et la largeur mobile.
- Vérifier l’enregistrement réel et l’export administratif après l’activation de l’API et de PostgreSQL dans Coolify.

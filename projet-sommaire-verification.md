# Vérification — sommaire latéral Projet

Au chargement de `/projet` sur desktop, les dix entrées du sommaire sont visibles dans la colonne gauche, avec « Note d'intention » active. Après le premier défilement, le rendu du navigateur ne permet pas de confirmer visuellement la position sticky : une vérification DOM complémentaire est nécessaire avant de conclure.

La vérification DOM a ensuite établi que le conteneur `aside` ne mesurait que la hauteur du sommaire : la règle sticky était donc contrainte dès que cette zone quittait l'écran. Le conteneur a été étiré à la hauteur du contenu principal afin de permettre au sommaire de rester fixé pendant le défilement.

Le contrôle des ancêtres a également mis en évidence que `overflow-x: hidden` sur `html` et `body` créait un conteneur de défilement vertical implicite, incompatible avec le comportement sticky attendu. Cette règle est remplacée par `overflow-x: clip`, qui conserve le blocage des débordements horizontaux sans interférer avec le sticky.

Contrôle final après défilement à 962 px : le conteneur latéral mesure 7 376 px, le sommaire est en `position: sticky` et reste exactement à 96 px du haut de viewport. Le sommaire peut donc rester disponible à gauche jusqu'à la fin du contenu principal.

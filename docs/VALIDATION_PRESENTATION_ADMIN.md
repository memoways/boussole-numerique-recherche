# Validation — présentation partenaire et administration

## Contrôles réalisés le 13 août 2026

La présentation a été contrôlée avec l’URL contextualisée `/partenaires/presentation?slide=5&detail=dimensions`. La cinquième slide affiche sa composition visuelle, le premier panneau de détail ouvert, le lien contextuel et les contrôles de navigation. L’URL contient bien l’index de slide et le détail actif ; ce contexte permet au navigateur de retrouver l’état de lecture après un retour d’historique.

Le lien contextuel « Explorer les cinq dimensions » ouvre la page Expérience depuis le panneau. L’alias `/admin` rend correctement l’interface d’administration et ses métadonnées privées. Tant que `VITE_PARTNER_API_URL` n’est pas injectée au build du portail et que l’API/PostgreSQL ne sont pas déployés, `/admin` affiche volontairement l’état d’activation plutôt que le formulaire de connexion.

Le contrôle TypeScript et les builds frontend/API passent avec `pnpm verify`. La construction Docker complète n’a pas pu être exécutée dans cet environnement, car la commande `docker` n’y est pas installée. Elle reste à vérifier au premier build Coolify ; le Dockerfile a néanmoins été mis à jour pour déclarer explicitement `VITE_PARTNER_API_URL` comme argument et variable de build.

Le 13 août 2026, la présentation partenaire a été recontrôlée sur desktop après sa recomposition en deux colonnes : le premier panneau de détail s’ouvre, son état est inscrit dans l’URL et le radar-boussole reste visible dans le format compact. Le bouton Suivant passe à la slide 2 et met à jour l’URL. À 1 280 px de large, la carte mesure 612 px de haut sans débordement horizontal ; elle reste donc sous le seuil de 800 px avant ouverture d’un détail.

Le même contrôle a confirmé que les boutons Précédent et Suivant sont placés avant les panneaux de détail : leur position ne dépend plus de l’ouverture d’un toggle. Le radar-boussole est réservé à la première slide ; la seconde slide n’affiche pas d’illustration superflue et conserve une mise en page compacte.

Après l’alignement sur la référence annotée, la slide 7 a été contrôlée dans le gabarit interne de 900 px. La carte mesure 900 px, les contrôles de navigation commencent à 481 px depuis son sommet, occupent 72 px et les panneaux de détail commencent à 573 px. Les contrôles restent donc au même emplacement entre les slides et hors du contenu dépliable. Aucun débordement horizontal n’a été détecté.

| Contrôle restant après Coolify | Résultat attendu |
|---|---|
| `GET /health` de l’API | `{"status":"ok"}` avec PostgreSQL connecté. |
| Connexion `/admin` | Connexion avec `ulrich.fischer@memoways.com` et le mot de passe défini dans `ADMIN_PASSWORD`. |
| Session | Cookie httpOnly présent sur les routes `/api/admin`, puis suppression à la déconnexion. |
| Pilotage | Invitation, brouillon, soumission, export CSV, révocation, liste de boîte Dreamlit et régénération testés avec des données de test supprimées ensuite. |
| Boîte Dreamlit | Une soumission crée une seule ligne ; la régénération depuis `/admin` met à jour le récapitulatif, incrémente le compteur et déclenche le workflow sur `updated_at`. |

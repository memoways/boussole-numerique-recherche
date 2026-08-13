# Validation — présentation partenaire et administration

## Contrôles réalisés le 13 août 2026

La présentation a été contrôlée avec l’URL contextualisée `/partenaires/presentation?slide=5&detail=dimensions`. La cinquième slide affiche sa composition visuelle, le premier panneau de détail ouvert, le lien contextuel et les contrôles de navigation. L’URL contient bien l’index de slide et le détail actif ; ce contexte permet au navigateur de retrouver l’état de lecture après un retour d’historique.

Le lien contextuel « Explorer les cinq dimensions » ouvre la page Expérience depuis le panneau. L’alias `/admin` rend correctement l’interface d’administration et ses métadonnées privées. Tant que `VITE_PARTNER_API_URL` n’est pas injectée au build du portail et que l’API/PostgreSQL ne sont pas déployés, `/admin` affiche volontairement l’état d’activation plutôt que le formulaire de connexion.

Le contrôle TypeScript et les builds frontend/API passent avec `pnpm verify`. La construction Docker complète n’a pas pu être exécutée dans cet environnement, car la commande `docker` n’y est pas installée. Elle reste à vérifier au premier build Coolify ; le Dockerfile a néanmoins été mis à jour pour déclarer explicitement `VITE_PARTNER_API_URL` comme argument et variable de build.

| Contrôle restant après Coolify | Résultat attendu |
|---|---|
| `GET /health` de l’API | `{"status":"ok"}` avec PostgreSQL connecté. |
| Connexion `/admin` | Connexion avec `ulrich.fischer@memoways.com` et le mot de passe défini dans `ADMIN_PASSWORD`. |
| Session | Cookie httpOnly présent sur les routes `/api/admin`, puis suppression à la déconnexion. |
| Pilotage | Invitation, brouillon, soumission, export CSV et révocation testés avec des données de test supprimées ensuite. |

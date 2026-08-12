# Exploitation locale et production

## Contrôles avant livraison

Toute modification est validée localement avec la séquence ci-dessous. Elle reproduit le build qui sera exécuté dans l'image de production.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm verify
docker build -t boussole-numerique-culture .
docker run --rm -p 8080:8080 boussole-numerique-culture
```

Après le lancement du conteneur, contrôlez au minimum les routes suivantes dans un navigateur : `http://localhost:8080/`, `http://localhost:8080/projet`, `http://localhost:8080/timeline` et `http://localhost:8080/references`. Le fallback Nginx doit toujours rendre l'application sur une route ouverte directement.

## Cycle de mise à jour

Le flux recommandé est volontairement simple. Une personne ou un agent IA crée une branche, effectue les changements, exécute `pnpm verify`, puis ouvre une pull request. La vérification GitHub Actions reconstruit aussi l'image Docker. Une fois la branche `main` fusionnée, Coolify peut être configuré pour déployer le nouveau commit automatiquement depuis le dépôt.

| Étape | Responsable | Critère de sortie |
|---|---|---|
| Modification | Développeur ou agent IA | Changements limités et documentés. |
| Contrôle local | Développeur ou agent IA | `pnpm verify` réussi. |
| Revue | Responsable du projet | Contenu, responsive et accessibilité validés. |
| Intégration | Git | CI verte sur `main`. |
| Déploiement | Coolify | Domaine, routes et certificat HTTPS fonctionnels. |

## Exploitation courante

Le conteneur n'écrit aucun état persistant. Il n'a donc ni volume applicatif, ni base de données, ni sauvegarde de données à gérer dans sa forme actuelle. Les éléments à sauvegarder restent le dépôt Git, la configuration de domaine DNS et la configuration de la ressource Coolify.

En cas de régression en production, sélectionnez dans Coolify le dernier commit fonctionnel, ou revenez à ce commit dans Git puis relancez un déploiement. Gardez les modifications de configuration séparées des modifications éditoriales afin de rendre ce retour simple à auditer.

## Suivi de sécurité des dépendances

Le contrôle `pnpm audit --prod` fait partie de la revue régulière avant une évolution majeure. Lors de la préparation de ce kit, l'audit ne signalait aucune vulnérabilité critique ou élevée, tout en conservant des alertes modérées et faibles transitives à surveiller. Ces alertes ne doivent pas être ignorées : mettez à jour les dépendances directes inutilisées ou vulnérables, puis relancez `pnpm verify` avant toute mise en production.

Le site livré est statique et ne possède ni API privée, ni compte utilisateur, ni secret. Toute future fonctionnalité serveur doit déclencher une revue de dépendances et une validation de sécurité distincte.

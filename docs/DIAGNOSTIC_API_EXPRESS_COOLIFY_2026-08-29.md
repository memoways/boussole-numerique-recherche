# Diagnostic — Redémarrages de Boussole API dans Coolify

**Date :** 29 août 2026  
**Statut :** correctif validé localement ; redeploy Coolify requis.

## Symptôme observé

La ressource **Boussole API** redémarrait en boucle. Le journal ne signalait ni une variable manquante ni PostgreSQL, mais l’erreur suivante au chargement d’Express :

```text
Error: Dynamic require of "tty" is not supported
```

Après un premier correctif de format CommonJS, le routeur Express signalait ensuite :

```text
TypeError: pathRegexp.match is not a function
```

## Cause et correctif

| Cause | Correctif livré |
|---|---|
| Le bundle ESM encapsulait les dépendances CommonJS d’Express ; un `require` dynamique de `tty` devenait indisponible au runtime. | L’API est compilée en CommonJS dans `dist/index.cjs` avec les dépendances Node externalisées. |
| Le bundle CommonJS devait résoudre le schéma SQL sans `import.meta.url`. | Le chemin de `schema.sql` est calculé à partir du répertoire de travail en production et de `src/` en développement. |
| Une surcharge pnpm globale forçait `path-to-regexp` 0.1.13 alors que `router` d’Express 5 exige une version 8. | La surcharge est limitée à `router>path-to-regexp: 8.3.0`. |
| L’image runtime ne contenait auparavant que le bundle. | Le Dockerfile utilise `pnpm deploy --legacy --prod` afin de copier les dépendances runtime réellement requises. |

Le bundle et l’artefact runtime ont été démarrés localement avec l’ensemble des variables obligatoires. Le journal de contrôle contient :

```text
Partner feedback API listening on 3999
```

## Ce que vous devez faire dans Coolify

1. Ne modifiez plus les variables d’environnement ni le domaine : les captures reçues montrent que la structure est en place.
2. Vérifiez que la source Git de **Boussole API** pointe sur `main` et récupère le commit qui contient ce diagnostic.
3. Cliquez sur **Redeploy** dans Boussole API. Ne cliquez pas seulement sur Restart : le Dockerfile et les dépendances doivent être reconstruits.
4. Attendez la fin du build, puis consultez les logs. Le message `Partner feedback API listening on 3001` doit apparaître et le statut ne doit plus afficher `Restarting`.
5. Attendez quelques minutes l’émission du certificat, puis ouvrez `https://api.boussole-culture-recherche.memoways.com/health`. La réponse attendue est `{"status":"ok"}`.
6. Une fois le premier démarrage sain confirmé, revenez dans les variables et retirez `RUN_MIGRATIONS` ou fixez-le à `false`, puis lancez un second **Redeploy**.

Ne contournez pas l’avertissement de certificat tant que le statut de l’application n’est pas Healthy. Le certificat par défaut Traefik est normal lorsqu’aucune instance API saine n’est encore disponible derrière le FQDN.

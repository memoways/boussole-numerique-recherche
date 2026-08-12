# Environnements et secrets

## État actuel

La version actuelle de **Boussole Numérique Culture** est un site statique. Son exécution ne nécessite aucun token, aucune clé API et aucun secret. Le seul réglage de build recommandé est `SITE_URL`, l'URL publique finale utilisée pour les URL canoniques, Open Graph, `sitemap.xml` et `robots.txt`.

> Ne créez pas de variable `VITE_*` pour un secret : Vite l'intègre au JavaScript distribué au navigateur.

## Règle pour les évolutions futures

Si une fonctionnalité a besoin d'un secret — clé IA, API externe, envoi d'e-mail, base de données ou authentification — elle doit être exécutée par un backend distinct. Le secret est alors créé dans Coolify comme variable d'exécution du backend, sans préfixe `VITE_`.

| Type de valeur | Où la stocker | Exposition au navigateur |
|---|---|---|
| URL publique du site (`SITE_URL`) | Variable de build Coolify | Oui, dans les métadonnées générées |
| Réglage purement public côté interface | Variable `VITE_*` au build, si nécessaire | Oui |
| Clé API, token, mot de passe, clé privée | Variable runtime du backend dans Coolify | Non |
| Certificat ou secret multiligne | Variable multiligne verrouillée dans Coolify | Non |

Dans Coolify, ajoutez `SITE_URL=https://votre-domaine.example` comme variable de **build**, sans slash final. Ce n'est pas un secret. Les anciennes variables propres à Manus ne doivent pas être copiées vers Coolify.

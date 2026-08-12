# Environnements et secrets

## État actuel

La version actuelle de **Boussole Numérique Culture** est un site statique. Son build et son exécution ne nécessitent **aucune variable d'environnement**, aucun token et aucune clé API.

> Ne créez pas de variable `VITE_*` pour un secret : Vite l'intègre au JavaScript distribué au navigateur.

## Règle pour les évolutions futures

Si une fonctionnalité a besoin d'un secret — clé IA, API externe, envoi d'e-mail, base de données ou authentification — elle doit être exécutée par un backend distinct. Le secret est alors créé dans Coolify comme variable d'exécution du backend, sans préfixe `VITE_`.

| Type de valeur | Où la stocker | Exposition au navigateur |
|---|---|---|
| Réglage purement public, par exemple une URL de contenu public | Variable `VITE_*` au build, si nécessaire | Oui |
| Clé API, token, mot de passe, clé privée | Variable runtime du backend dans Coolify | Non |
| Certificat ou secret multiligne | Variable multiligne verrouillée dans Coolify | Non |

Pour ce dépôt, l'écran des variables de Coolify peut donc rester vide. Les anciennes variables propres à Manus ne doivent pas être copiées vers Coolify.

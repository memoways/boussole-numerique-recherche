# Diagnostic de domaine — 2026-08-13

## Domaine contrôlé

`boussole-culture-recherche.memoways.com`

## Constat technique

| Élément | Résultat |
|---|---|
| Enregistrement observé | CNAME vers `lime.1024b.net`, en mode DNS only |
| IPv4 résolue | `185.131.204.133` |
| Réponse HTTPS IPv4 | HTTP 200, serveur Nginx |
| Certificat TLS | Let’s Encrypt valide pour le sous-domaine, jusqu’au 11 novembre 2026 |
| IPv6 résolue | `2a12:bfc0:0:1004::5:1` |
| Réponse HTTPS IPv6 | Échec de connexion sur le port 443 |

## Diagnostic

Le déploiement Coolify répond correctement en IPv4 et le certificat HTTPS est prêt. Le délai d’attente vu dans le navigateur est très probablement causé par la résolution IPv6 héritée du CNAME : le serveur cible publie une adresse IPv6 qui ne sert pas HTTPS. Selon le réseau du visiteur, le navigateur peut privilégier cette adresse ou attendre son échec avant de revenir à IPv4.

## Correction recommandée

Dans Cloudflare, remplacer le CNAME actuel par un enregistrement **A** de nom `boussole-culture-recherche`, pointant vers `185.131.204.133`, en mode **DNS only**. Vérifier qu’aucun enregistrement AAAA ne reste pour ce sous-domaine. Cela conserve l’accès direct à Coolify en IPv4 et évite la destination IPv6 non fonctionnelle.

Le mode proxy Cloudflare peut être envisagé dans un second temps, après vérification du réglage SSL « Full (strict) » et de la configuration du domaine dans Coolify. Il ne doit pas être utilisé comme substitut à la correction IPv6.

## Contrôles à refaire après modification

```bash
curl -4 -I https://boussole-culture-recherche.memoways.com
curl -6 -I https://boussole-culture-recherche.memoways.com
```

Le premier doit retourner HTTP 200 ; le second doit échouer par absence de résolution IPv6, et non par connexion au serveur. Tester ensuite depuis un réseau mobile et un réseau fixe.

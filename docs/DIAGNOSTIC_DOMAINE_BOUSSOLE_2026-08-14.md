# Diagnostic du domaine public

**Domaine concerné :** `boussole-culture-recherche.memoways.com`  
**Date du contrôle :** 14 août 2026  
**Statut :** correction DNS requise ; certificat et application IPv4 fonctionnels.

## Conclusion

Le problème observé dans le navigateur n’est **pas** un défaut de certificat, de sécurité HTTPS ou d’application Coolify. Le domaine publie un enregistrement CNAME vers `lime.1024b.net.`, qui fournit à la fois l’IPv4 `185.131.204.133` et l’IPv6 `2a12:bfc0:0:1004::5:1`. L’IPv4 répond correctement en HTTPS ; l’IPv6 ne répond pas sur le port 443.

| Contrôle | Résultat | Interprétation |
|---|---|---|
| DNS CNAME | `lime.1024b.net.` | Le sous-domaine dépend de la zone DNS de cette cible. |
| DNS IPv4 | `185.131.204.133` | Chemin applicatif fonctionnel. |
| HTTPS IPv4 | HTTP 200 | Le portail Nginx répond. |
| TLS IPv4 | Certificat valide pour le domaine, TLS 1.3 | Le certificat est correctement présenté. |
| DNS IPv6 | `2a12:bfc0:0:1004::5:1` | Le navigateur peut tenter ce chemin. |
| HTTPS IPv6 | Échec de connexion | Cause probable du délai observé. |

> Le navigateur peut privilégier ou tenter IPv6 lorsqu’un enregistrement AAAA est publié. Comme cette adresse ne répond pas, il peut afficher un délai de connexion, même si le chemin IPv4 et le certificat sont valides.

## Correction DNS recommandée

Remplacez le CNAME du sous-domaine par un enregistrement IPv4 direct. Cette opération conserve le serveur qui fonctionne tout en supprimant l’IPv6 défaillante héritée du CNAME.

| Action dans la zone DNS de `memoways.com` | Valeur recommandée |
|---|---|
| Supprimer | CNAME `boussole-culture-recherche` → `lime.1024b.net.` |
| Ajouter | A `boussole-culture-recherche` → `185.131.204.133` |
| Ne pas ajouter | Aucun enregistrement AAAA pour ce sous-domaine tant que l’IPv6 n’est pas configurée et testée sur le serveur. |
| TTL | Automatique, ou 300 secondes pendant la correction. |
| Proxy CDN éventuel | Mode **DNS only** pendant le diagnostic et la validation. Réactiver un proxy seulement après tests complets et configuration adaptée de Coolify. |

Si la zone est gérée dans Cloudflare ou un autre fournisseur, la suppression du CNAME est indispensable : un CNAME propage les enregistrements A et AAAA de sa cible. Supprimer seulement un AAAA local ne résoudrait donc pas ce cas, puisqu’il n’existe pas comme entrée indépendante dans la zone du sous-domaine.

## Contrôle Coolify

La configuration Coolify semble déjà correcte sur le chemin IPv4, puisque Nginx répond en 200 et présente un certificat valide. Aucun renouvellement manuel de certificat n’est nécessaire à ce stade. Vérifiez néanmoins les points suivants dans Coolify après la modification DNS.

| Réglage | Valeur ou contrôle attendu |
|---|---|
| Domaine de l’application portail | `https://boussole-culture-recherche.memoways.com` sans chemin ni port. |
| Port interne de l’image portail | `8080`, conformément au Dockerfile Nginx. |
| Ports publics du serveur | 80 et 443 accessibles pour le proxy Coolify. |
| `SITE_URL` au build | `https://boussole-culture-recherche.memoways.com` ; cette valeur est déjà la valeur par défaut du projet. |
| Déploiement | Redéployer seulement si le domaine n’est pas déjà enregistré dans l’application ou si Coolify demande une régénération de configuration. |

Coolify peut obtenir et renouveler automatiquement des certificats Let’s Encrypt pour les domaines personnalisés lorsque la configuration de domaine et la connectivité sont correctes.[1]

## Procédure de validation

Après l’enregistrement DNS, attendez la propagation selon le TTL. Ouvrez ensuite le domaine depuis un navigateur en réseau IPv4 et depuis un réseau disposant d’IPv6. Les deux doivent aboutir à la même page ou, dans cette correction temporaire sans AAAA, le navigateur doit basculer uniquement sur IPv4 sans délai.

Les commandes suivantes peuvent être lancées depuis un poste de contrôle :

```bash
curl -4 -I https://boussole-culture-recherche.memoways.com
curl -6 -I https://boussole-culture-recherche.memoways.com
```

La première doit répondre en HTTP 200. La seconde doit échouer à la résolution tant qu’aucun AAAA n’est publié ; c’est l’état attendu pendant cette phase. Avant de réintroduire IPv6, configurez l’adresse sur le serveur, ouvrez les ports 80/443 en IPv6 et vérifiez les deux commandes.

## Éléments à ne pas modifier

Ne changez pas le domaine de `SITE_URL`, les métadonnées Open Graph ni le certificat actuellement associé au portail. Ils correspondent déjà au domaine final et fonctionnent via IPv4. La correction porte sur le routage DNS IPv6, pas sur l’identité du site.

## Référence

[1] [Coolify — domaines personnalisés et certificats SSL](https://coolify.io/docs/applications/domains)

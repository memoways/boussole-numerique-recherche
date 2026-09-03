# État du pilote — questionnaire partenaire et parcours artiste

**Date de mise à jour :** 3 septembre 2026  
**Périmètre :** éléments utilisables ou vérifiables avant l’activation du workflow de récapitulatifs Dreamlit.

## 1. État actuel

Le module partenaire est opérationnel pour la collecte de base. L’API publique répond à son contrôle de santé, PostgreSQL est disponible, l’administration conserve désormais sa session au rafraîchissement et la réponse vocale Deepgram a été testée. Dreamlit est le seul élément bloqué : l’outbox PostgreSQL est déjà créée, mais la connexion externe attend une résolution de la confiance du certificat TLS présenté par Coolify.

| Domaine | État | Ce qui est disponible maintenant |
|---|---|---|
| Questionnaire partenaire | Prêt pour pilote contrôlé | Invitation personnelle, quatre étapes, dix questions, consentement, brouillon, soumission unique et message de confirmation. |
| Réponse vocale | Testée | Trois questions ouvertes acceptent l’oral ; la personne relit la transcription et l’audio n’est pas enregistré dans PostgreSQL. |
| Administration | Prête avec contrôles à réaliser | Organisations, contacts, liens personnels, demandes spontanées, réponses, export CSV, outbox, régénération et révocation. |
| Parcours artiste | Prêt pour l’expression d’intérêt | Formulaire de consentement pour l’atelier et/ou une notification ; export CSV dédié. Il ne s’agit pas encore d’un questionnaire artiste. |
| E-mails de récapitulatif | En attente de Dreamlit | Une ligne unique est préparée dans l’outbox après chaque soumission ; aucun envoi n’est réalisé tant que le workflow n’est pas activé. |

## 2. Questionnaire partenaire déjà finalisé

La version publiée `partner-discovery-v1` dure environ douze minutes. Elle couvre le rôle et les publics de l’organisation, l’urgence des enjeux, l’utilité attendue de la Boussole, les réserves et conditions de réussite, les canaux de relais et les formes possibles de co-conception. Elle associe sélections simples, sélections multiples, échelles à cinq degrés et questions ouvertes avec réponse vocale facultative.

Le flux protège les invitations par un jeton aléatoire stocké sous forme de hash, limite les tentatives de connexion et de demandes publiques, demande le consentement avant soumission et bloque toute modification après une soumission effective. Les réponses sont versionnées par questionnaire. Une soumission crée une seule ligne dans `notifications.partner_response_recap_outbox` : la régénération met à jour cette même ligne et incrémente son compteur au lieu de produire un doublon.

La console affiche désormais les **invitations actives** et permet de les révoquer. La révocation rend immédiatement un lien inutilisable ; elle ne supprime pas les données déjà soumises, afin de distinguer clairement arrêt d’accès et suppression des données.

## 3. Ce qui peut être terminé maintenant

Après le redéploiement du portail et de l’API qui accompagne cette mise à jour, les contrôles suivants ne dépendent d’aucun e-mail.

| Contrôle | Geste à effectuer dans `/admin` | Résultat attendu |
|---|---|---|
| Export des réponses | Télécharger **Réponses CSV** après une contribution de test. | Fichier contenant organisation, e-mail, statut, date, question et réponse. |
| Export artiste | Envoyer une manifestation d’intérêt de test puis télécharger **Intérêts CSV**. | Ligne avec audience `artist`, choix atelier/notification et consentement. |
| Régénération | Dans **Récapitulatifs préparés**, cliquer **Régénérer** sur une réponse de test. | Une seule ligne reste visible ; la date de régénération et le compteur sont mis à jour. Aucun e-mail ne part. |
| Révocation | Générer une invitation de test, puis cliquer **Révoquer** dans **Invitations actives**. | Le lien répond ensuite que l’invitation n’est plus active. |
| Suppression test | Une fois les contrôles terminés, supprimer les données de test conformément à la procédure interne. | Aucun contact, invitation, réponse ou intérêt de test ne demeure en production. |

> Les actions de régénération et de révocation doivent être réalisées uniquement sur une invitation créée pour le test. Elles ne doivent pas être appliquées à une contribution partenaire réelle.

## 4. Parcours artiste : périmètre clair

Le parcours artiste ne collecte pas encore une série de réponses comparable au questionnaire partenaire. Il permet aujourd’hui à une personne de donner son prénom et son e-mail, de choisir si elle souhaite être informée de l’atelier et/ou de l’ouverture future, puis d’accorder son consentement. Ces informations sont visibles dans `/admin` et exportables dans `Intérêts CSV`.

Cette distinction est volontairement affichée : une manifestation d’intérêt permet de constituer le groupe de co-conception sans faire croire que la future Boussole, ou son questionnaire artiste, existe déjà. Avant de créer un questionnaire artiste distinct, il faudra valider son objectif précis, ses questions, les personnes éligibles et le traitement des retours.

## 5. Ce qui reste bloqué par Dreamlit

Le transport PostgreSQL public répond maintenant en TLS sur `lime.1024b.net:5432`. Le certificat est toutefois signé par l’autorité interne Coolify, qui n’est pas reconnue par Dreamlit. Tant que Dreamlit n’accepte pas cette autorité ou qu’un certificat publiquement vérifiable n’est pas installé, le workflow transactionnel ne doit pas être publié.

Le blocage ne remet pas en cause la collecte : les récapitulatifs existent déjà dans la boîte d’envoi et peuvent être contrôlés depuis l’administration. Il retarde uniquement leur distribution automatique par e-mail.

## 6. Ordre recommandé

1. Redéployer le portail et l’API avec la console de révocation et les libellés de transition.
2. Exécuter les cinq contrôles du tableau de la section 3 avec des données dédiées au test.
3. Archiver le résultat de ces contrôles, puis supprimer les données de test.
4. Attendre la décision de l’administration système ou de Dreamlit sur le certificat TLS, sans publier de workflow entre-temps.
5. Décider séparément si un questionnaire artiste individuel doit être ajouté après l’atelier de co-conception.

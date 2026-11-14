# Nouvelles de la Boussole — état du 14 novembre 2026

## Livré dans le code

L’accueil, Participer et le footer ouvrent `/nouvelles`. Le formulaire demande un accord propre à la newsletter Boussole et ne coche aucun choix par défaut. Une inscription Memoways se fait sur son propre formulaire et se confirme séparément. La manifestation d’intérêt ateliers/ouverture publique reste indépendante ; aucune reprise de ses contacts.

Le site statique utilise les API du dépôt Memoways ; l’API partenaire, PostgreSQL Boussole et SMTP ne sont pas modifiés. Le backend journalise choix/confirmation par sujet dans Supabase et Notion. Plunk diffuse les campagnes et conserve les exclusions globales prioritaires. L’identité affichée est Boussole Numérique Culture ; la réponse va à Ulrich, avec l’adresse Plunk vérifiée `hello@memoways.ch` pour le transport.

`/nouvelles/confirmation` et `/nouvelles/preferences` retirent le fragment de l’URL et attendent un clic POST. Un scanner GET ne confirme ni ne désinscrit. Les routes sont générées comme HTML réel pour Nginx, sans indexation des deux contrôles privés. Le retrait ne vise que Boussole ; le lien global Plunk arrête tous les emails de ce compte.

## Vérifié localement

- `pnpm verify` : TypeScript web/API, tests ateliers, contenu démo, build Vite, génération/contrôle HTML et build API.
- Navigateur à 1440 et 390 px : formulaire, confirmation en attente et clic explicite, retrait isolé, aucun débordement horizontal. Réponses newsletter simulées ; adresses `example.test` uniquement.
- Refus d’accord implicite : case décochée et validation native requise. Les liens vers la newsletter Memoways sont séparés.
- Les tests des six cas métier et des preuves sont dans le lot compagnon du backend Memoways, avec PostgreSQL temporaire et doubles de fournisseurs.

## État opérationnel

Aucun email réel envoyé. Aucun nouveau workflow ou séquence transactionnelle. Le code fusionné ne prouve pas une publication. L’inscription Boussole reste indisponible tant que le backend n’annonce pas cette capacité. Migration Memoways `20261114163214_newsletter_topics.sql` : **code merged — database pending**, gate Staging obligatoire avant application ; Production exclue.

Le défaut public de `VITE_NEWSLETTER_API_ORIGIN` est `https://memoways.com`. Pour la recette, utiliser un build avec l’origine Staging autorisée et activée. Ne pas ouvrir les interrupteurs de confirmation : ils pourraient envoyer les confirmations en attente. Une vérification de réception email attend une instruction explicite.

## Invitation et suites possibles

Notion/Mesh comporte deux vues d’invitation, chacune avec son identité et son lien, sans inscription ni relance. La liste d’abonnés Boussole commence vide et reçoit uniquement les confirmations de ce formulaire. Aucun fichier de contacts ni liste de collaborateurs ajouté ici.

Plus tard, Plunk peut porter des campagnes et automatismes fondés sur des événements ; Dreamlit peut porter des notifications transactionnelles liées à une étape de service. Aucune de ces séquences n’est créée ou déclenchée par ce lot.

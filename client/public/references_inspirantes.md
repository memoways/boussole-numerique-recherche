# Références inspirantes pour la Boussole Numérique Culture

## Analyse comparative de deux modèles d'auto-évaluation citoyenne et professionnelle

*Memoways Research — Février 2026*

---

## Introduction

La conception d'un outil d'auto-évaluation de la maturité numérique pour le secteur culturel genevois ne s'effectue pas dans un vide méthodologique. Deux références internationales méritent une attention particulière, non pas pour être reproduites, mais pour les principes qu'elles incarnent et les limites qu'elles révèlent : **Nos Gestes Climat** (ADEME, France) et le **Skill Builder** de DeepLearning.AI. Ces deux outils, issus de domaines distincts — la transition écologique et la formation aux compétences en intelligence artificielle —, partagent une ambition commune : rendre accessible et actionnable une évaluation complexe pour un public large, sans expertise préalable requise.

Une troisième référence, **AICred.ai**, est mentionnée séparément en tant qu'outil professionnel avancé d'évaluation de la fluidité IA, dont la sophistication méthodologique offre des perspectives utiles pour le positionnement de la Boussole.

---

## 1. Nos Gestes Climat (ADEME, France)

### Présentation générale

Lancé par l'ADEME (Agence de la Transition Écologique) en partenariat avec l'association Datagir, **Nos Gestes Climat** est un calculateur d'empreinte carbone individuelle entièrement gratuit, open source et contributif. Depuis son lancement, plus de **2,7 millions de personnes** ont réalisé leur bilan carbone via cette plateforme, ce qui en fait l'un des outils de sensibilisation environnementale les plus utilisés en France.

### Logique d'évaluation et méthodologie

L'outil repose sur un modèle de calcul hybride combinant une approche *bottom-up* (modèles micro pour les consommations quotidiennes : transport, alimentation, logement, consommation) et une approche *top-down* dérivée des travaux du SDES pour estimer l'empreinte des services sociétaux. Le modèle est entièrement documenté et publié en open source via le langage **Publicodes**, conçu par l'État français pour exprimer des algorithmes d'intérêt public.

Le parcours de test s'organise autour de **cinq grandes catégories** de comportements : transport, alimentation, logement, consommation et services publics. Chaque catégorie est subdivisée en questions adaptatives — la réponse à une question conditionne les suivantes — permettant à la fois une personnalisation du parcours et une précision accrue des résultats. La durée estimée est de **10 à 15 minutes**, sans inscription préalable.

### Expérience utilisateur et design

L'interface de Nos Gestes Climat se distingue par plusieurs choix de conception remarquables :

**Accessibilité radicale.** L'outil ne requiert aucune inscription, aucune connaissance préalable en matière d'empreinte carbone. Les résultats sont immédiats et présentés sous forme visuelle (graphiques comparatifs, ordres de grandeur). Le calcul s'effectue entièrement côté client (dans le navigateur), sans transmission de données sensibles aux serveurs — un choix délibéré de protection de la vie privée.

**Pédagogie par les ordres de grandeur.** Plutôt que de culpabiliser l'utilisateur, l'outil situe son empreinte dans un contexte national et planétaire, en comparant le résultat individuel à la moyenne française et à l'objectif de 2 tonnes de CO₂ par an. Cette mise en perspective transforme une donnée abstraite en information actionnable.

**Recommandations personnalisées et chiffrées.** À l'issue du test, des actions concrètes sont proposées avec leur impact chiffré en tonnes de CO₂ évitées. L'utilisateur peut simuler l'effet de chaque changement de comportement, ce qui renforce l'agentivité et la motivation à agir.

**Dimension collective.** Depuis 2024, une fonctionnalité *organisations* permet à des entreprises, associations, collectivités ou écoles de créer des groupes de simulation avec un tableau de bord agrégé. Les membres d'un groupe peuvent se comparer anonymement, ce qui constitue un levier motivationnel puissant. L'anonymat individuel est strictement préservé : seules les moyennes collectives sont visibles.

**Approche contributive.** Le modèle de calcul est entièrement ouvert, documenté et amendable par la communauté. Des personas d'utilisateurs types (10 profils représentant la diversité des situations de vie) sont publiés et maintenus pour tester le calculateur sous toutes ses coutures.

### Limites identifiées

Malgré ses qualités, Nos Gestes Climat présente des limites instructives pour la conception de la Boussole :

- L'outil est conçu pour un usage individuel et une population généraliste française ; il n'est pas adapté à des secteurs professionnels spécifiques ni à des contextes géographiques particuliers (la version suisse n'existe pas).
- Le modèle de calcul, bien que rigoureux, repose sur des données françaises qui ne reflètent pas les spécificités du mix énergétique suisse ni du tissu culturel genevois.
- L'outil mesure des comportements et des consommations, non des compétences ou des postures organisationnelles. La transposition à l'évaluation de la maturité numérique requiert une adaptation conceptuelle significative.
- Le format exclusivement textuel et formulaire (questions-réponses) ne mobilise pas d'autres modalités d'interaction (voix, jeu, narration) qui pourraient enrichir l'expérience pour des publics créatifs.

---

## 2. DeepLearning.AI Skill Builder

### Présentation générale

Développé par DeepLearning.AI, la plateforme de formation en intelligence artificielle fondée par Andrew Ng, le **Skill Builder** est un outil d'évaluation des compétences IA par conversation vocale. Il s'inscrit dans une offre de formation professionnelle continue destinée à un public international d'apprenants souhaitant développer ou valider leurs compétences en IA.

### Logique d'évaluation et parcours

Le Skill Builder propose un **parcours en cinq étapes** structuré autour d'une conversation vocale avec un agent IA :

1. **Évaluation initiale** : conversation libre sur les usages actuels de l'IA, les outils utilisés, les contextes professionnels. L'agent adapte ses questions en fonction des réponses.
2. **Identification des lacunes** : analyse des points forts et des angles morts dans la pratique de l'IA.
3. **Profil de compétences** : synthèse des compétences identifiées, organisée selon plusieurs dimensions (prompting, compréhension technique, intégration dans les flux de travail, évaluation critique).
4. **Recommandations d'apprentissage** : proposition de cours, ressources et projets pratiques personnalisés selon le profil.
5. **Suivi de progression** : possibilité de revenir régulièrement pour mesurer l'évolution des compétences.

### Expérience utilisateur et design

**Interaction vocale naturelle.** L'interface repose sur une conversation vocale en temps réel, ce qui réduit la friction cognitive liée aux formulaires et crée une expérience plus proche d'un entretien professionnel. Cette modalité favorise des réponses plus nuancées et contextualisées qu'un questionnaire à choix multiples.

**Personnalisation dynamique.** L'agent adapte ses questions en fonction du profil émergent de l'utilisateur, créant un parcours unique pour chaque personne. Cette adaptabilité contraste avec les questionnaires statiques à questions identiques pour tous.

**Résultats actionnables.** Les recommandations sont directement connectées au catalogue de cours de DeepLearning.AI, ce qui crée un parcours d'apprentissage cohérent entre l'évaluation et la formation.

**Ton conversationnel et bienveillant.** L'outil adopte une posture d'accompagnement plutôt que d'évaluation normative, ce qui réduit l'anxiété liée à la performance et encourage l'honnêteté dans les réponses.

### Limites identifiées

- L'outil est entièrement en anglais et conçu pour un public international de professionnels de la tech ou de la data. Il n'existe pas de version francophone ni d'adaptation sectorielle.
- Les recommandations sont exclusivement orientées vers le catalogue de formation de DeepLearning.AI, ce qui crée un biais commercial inhérent à la logique de la plateforme.
- L'outil évalue des compétences techniques en IA, non la maturité numérique organisationnelle d'une structure culturelle dans son ensemble.
- La dimension collective et territoriale est absente : l'outil ne permet pas de situer un utilisateur dans un écosystème local ni de générer des recommandations d'orientation vers des ressources de proximité.
- Les données sont hébergées sur des serveurs américains, ce qui soulève des questions de souveraineté des données incompatibles avec les exigences de certaines institutions publiques suisses.

---

## 3. AICred.ai — Outil professionnel avancé (mention complémentaire)

**AICred.ai** se présente comme « le standard pour l'évaluation de la fluidité IA » (*The Standard for AI Fluency Assessment*). Conçu par Jonathan Edwards et Nate Jones, cet outil propose une évaluation conversationnelle approfondie de **35 à 45 minutes** organisée en **6 sections** couvrant cinq dimensions de compétence : maîtrise du prompting, compréhension technique, application pratique, évaluation critique et conception de flux de travail. Les résultats sont exprimés sur une échelle de 1 à 10 (avec une catégorie *Elite* au-delà), assortis d'un plan d'apprentissage personnalisé et d'un profil public partageable.

AICred.ai se distingue par sa rigueur méthodologique (validation externe PAICE), sa dimension communautaire (classement public, comparaison entre pairs) et sa capacité à générer des plans d'apprentissage évolutifs qui s'adaptent à la progression de l'utilisateur. Il constitue une référence pertinente pour le positionnement de la Boussole, non pas comme modèle à reproduire, mais comme illustration de ce que peut être une évaluation professionnelle sérieuse dans le domaine de l'IA.

La Boussole Numérique Culture ne vise pas ce niveau de sophistication technique ni ce public de professionnels de l'IA. Elle s'adresse à des structures culturelles dont la priorité n'est pas de certifier des compétences individuelles en IA, mais d'appréhender collectivement les enjeux de la transformation numérique et d'identifier les leviers d'action adaptés à leur réalité.

---

## 4. Analyse comparative synthétique

| Dimension | Nos Gestes Climat | DeepLearning.AI Skill Builder | AICred.ai |
|-----------|------------------|-------------------------------|-----------|
| **Public cible** | Citoyens francophones | Professionnels IA anglophones | Professionnels IA avancés |
| **Durée** | 10-15 min | 20-30 min | 35-45 min |
| **Modalité** | Formulaire adaptatif | Conversation vocale | Conversation textuelle |
| **Langue** | Français | Anglais | Anglais |
| **Résultats** | Empreinte carbone + actions | Profil compétences + cours | Score 1-10 + plan apprentissage |
| **Dimension collective** | Oui (groupes organisations) | Non | Partiel (classement) |
| **Open source** | Oui (modèle + code) | Non | Non |
| **Hébergement données** | France (ADEME) | États-Unis | États-Unis |
| **Orientation commerciale** | Non (bien commun) | Oui (catalogue DL.AI) | Oui (crédits payants) |
| **Adaptation sectorielle** | Non | Non | Non |
| **Suivi longitudinal** | Partiel | Oui | Oui |

---

## 5. Ce que la Boussole Numérique Culture apporte de différent

L'analyse de ces trois références permet de formuler avec précision la **proposition originale** de la Boussole Numérique Culture, qui ne se positionne pas en concurrence avec ces outils mais dans un espace qu'aucun d'eux n'occupe.

### 5.1 Ancrage sectoriel et territorial

Contrairement aux outils existants qui s'adressent à des publics généralistes ou à des professionnels de la tech, la Boussole est conçue **pour et avec** le secteur culturel genevois. Les questions, les indicateurs et les recommandations sont calibrés sur les réalités des structures culturelles : petites équipes, ressources limitées, missions de service public, enjeux de médiation et d'accessibilité, spécificités du droit d'auteur, relations avec les institutions de financement. Cette spécificité sectorielle n'est pas un rétrécissement du champ, mais une condition de la pertinence et de l'utilité de l'outil.

### 5.2 Approche multimodale et hybride

Là où Nos Gestes Climat propose un formulaire adaptatif et le Skill Builder une conversation vocale, la Boussole envisage une **expérience hybride** combinant plusieurs modalités selon les préférences et les contextes des utilisateurs : questionnaire structuré (échelle de Likert), conversation guidée (inspirée du modèle typebot), éléments ludiques et narratifs, et potentiellement interaction vocale. Cette multimodalité n'est pas un gadget technologique : elle répond à la diversité des profils au sein du secteur culturel, où coexistent des profils très différents en termes d'aisance numérique et de rapport à l'évaluation.

### 5.3 Souveraineté des données et modèle non commercial

À l'instar de Nos Gestes Climat, la Boussole est conçue comme un **bien commun numérique** : gratuite, sans inscription obligatoire, hébergée sur des serveurs suisses ou européens, sans monétisation des données. Ce positionnement est une condition de confiance pour les institutions culturelles publiques et para-publiques, qui ne peuvent pas confier leurs données organisationnelles à des plateformes commerciales étrangères.

### 5.4 Orientation écosystémique et recommandations locales

Contrairement aux outils existants qui orientent vers des ressources génériques (cours en ligne, articles), la Boussole a vocation à orienter les structures vers **l'écosystème genevois de soutien à la transformation numérique** : formations locales, consultants spécialisés, réseaux pairs, dispositifs de financement cantonaux et fédéraux. Cette dimension territoriale transforme l'outil d'auto-évaluation en véritable boussole d'orientation, justifiant pleinement son nom.

### 5.5 Approche contributive et évolutive

Inspirée du modèle de développement de Nos Gestes Climat, la Boussole est conçue selon une **méthodologie contributive** : les structures culturelles participent à la définition des indicateurs, à la validation des questions et à l'enrichissement des recommandations. Cette co-construction garantit la pertinence de l'outil dans la durée et renforce l'appropriation collective des enjeux numériques par le secteur.

### 5.6 Suivi longitudinal et points d'étape

Contrairement à un audit ponctuel, la Boussole est pensée comme un **outil de suivi dans le temps**, permettant à une structure de mesurer sa progression entre deux évaluations (avant/après une formation, avant/après un projet numérique). Cette dimension temporelle est absente de la plupart des outils existants et constitue l'une des valeurs ajoutées les plus significatives pour les structures souhaitant inscrire leur transformation numérique dans une démarche continue.

---

## 6. Prototype existant et trajectoire de développement

Un **prototype fonctionnel** de la Boussole a été développé en 2024 sous forme de chatbot conversationnel (typebot). Ce prototype a permis de valider plusieurs hypothèses de conception : la pertinence d'une approche conversationnelle pour ce public, la faisabilité technique d'un parcours adaptatif, et l'intérêt des structures culturelles pour ce type d'outil. Il constitue une base d'expertise précieuse pour la phase de développement à venir.

La phase actuelle — dont ce site de recherche est le principal livrable — vise à consolider les fondements conceptuels et empiriques de la Boussole : état des lieux de la transformation numérique dans le secteur culturel, analyse des outils existants, identification des références inspirantes. Elle prépare une phase de développement plus ambitieuse, intégrant les enseignements des outils analysés et les spécificités du contexte genevois.

---

## Conclusion

Nos Gestes Climat et le Skill Builder de DeepLearning.AI représentent deux modèles d'excellence dans leurs domaines respectifs. Le premier démontre qu'un outil gratuit, open source et pédagogiquement rigoureux peut atteindre des millions d'utilisateurs et générer un impact réel sur les comportements. Le second illustre la puissance de l'interaction vocale pour rendre accessible une évaluation complexe et personnalisée. AICred.ai, quant à lui, établit un standard de sophistication pour l'évaluation professionnelle des compétences IA.

La Boussole Numérique Culture ne cherche pas à reproduire ces outils, mais à s'en inspirer pour concevoir quelque chose qui n'existe pas encore : un outil d'auto-évaluation de la maturité numérique **en français, gratuit, souverain, sectoriel, multimodal et écosystémique**, conçu spécifiquement pour les structures culturelles de Genève et, par extension, de la Suisse romande.

---

## Références

1. Nos Gestes Climat — Page d'accueil et présentation générale : https://nosgestesclimat.fr/
2. Nos Gestes Climat — Modèle de données et documentation technique : https://nosgestesclimat.fr/modele
3. Nos Gestes Climat — Parcours organisations (mars 2024) : https://nosgestesclimat.fr/blog/actualites-et-fonctionnalites/nouveau-parcours-organisations
4. Nos Gestes Climat — Personas d'utilisateurs types : https://nosgestesclimat.fr/personas
5. ADEME / Datagir — Présentation sur beta.gouv.fr : https://beta.gouv.fr/startups/nosgestesclimat.html
6. DeepLearning.AI — Skill Builder (plateforme d'apprentissage) : https://learn.deeplearning.ai/
7. DeepLearning.AI — Présentation générale : https://www.deeplearning.ai/
8. AICred.ai — Page principale : https://www.aicred.ai/
9. AICred.ai — Présentation de la méthodologie : https://www.aicred.ai/help/getting-started/what-is-aicred
10. Nate Jones — "Nobody Could Measure AI Skills, So I Built the First..." (Substack, 2025) : https://natesnewsletter.substack.com/p/nobody-could-measure-ai-skills-so

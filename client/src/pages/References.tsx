import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ChevronDown, ChevronUp, Lightbulb, Check, X, Minus } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /references — Références inspirantes
 * Tableau comparatif détaillé + fiches approfondies + idées et concepts
 * Couleurs Memoways : bleu #515792, orange #E27227
 *
 * Outils analysés (Niveau 1 — directement comparables) :
 * 1. Nos Gestes Climat (ADEME / beta.gouv.fr)
 * 2. Digital Culture Compass (Arts Council England)
 * 3. Zelfevaluatietool meemoo (Flandre)
 * 4. Baromètre numérique FWB (UCLouvain / Wallonie-Bruxelles)
 * 5. TMNlab État des lieux (France)
 * 6. Culture Compass for Europe (Commission européenne)
 * 7. Observatoire du numérique genevois (État de Genève)
 */

// ─── Données ───────────────────────────────────────────────────────────────────

const REFERENCES = [
  {
    id: 1,
    nom: "Nos Gestes Climat",
    url: "https://nosgestesclimat.fr",
    badge: "Diagnostic ouvert · ADEME / beta.gouv.fr · France",
    couleur: "#3aab8a",
    annee: "2019–",
    porteur: "ADEME / beta.gouv.fr (France)",
    chiffre_cle: "> 3 millions de tests réalisés (mai 2026)",
    source_chiffre: "beta.gouv.fr",
    url_source_chiffre: "https://beta.gouv.fr/startups/nosgestesclimat.html",
    ce_que_fait: "Simulateur de bilan carbone personnel, gratuit, open source, hébergé par beta.gouv.fr. Propose un questionnaire accessible en ~10 minutes, une restitution visuelle claire sous forme de graphique et des pistes d'action concrètes. Disponible en mode individuel et en mode organisation.",
    ce_que_boussole_apprend: "La gratuité et l'open source ne sont pas des contraintes : ce sont des leviers d'adoption massive. Un outil pédagogue, sans jargon, peut toucher des millions de personnes et modifier durablement les comportements. La restitution visuelle immédiate est clé.",
    ce_que_boussole_fait_differemment: "La Boussole s'adresse à un secteur spécifique (la culture genevoise) et explore des pratiques numériques plutôt que l'empreinte carbone. Elle intègre une dimension multimodale (voix, texte, questionnaire) et un ancrage local fort.",
    limites: "Très centré sur l'individu et le foyer. Le mode organisation est récent et moins développé. La dimension professionnelle et sectorielle y est absente. Pas de comparaison avec des pairs du même secteur.",
    liens: [
      { label: "Site officiel", url: "https://nosgestesclimat.fr" },
      { label: "Page beta.gouv.fr (stats & budget)", url: "https://beta.gouv.fr/startups/nosgestesclimat.html" },
      { label: "Code source (GitHub)", url: "https://github.com/incubateur-ademe/nosgestesclimat" },
    ],
  },
  {
    id: 2,
    nom: "Digital Culture Compass",
    url: "https://digitalculturecompass.org.uk",
    badge: "Outil de maturité numérique · Arts Council England · Royaume-Uni",
    couleur: "#1a6fb5",
    annee: "2020–",
    porteur: "Arts Council England + National Lottery Heritage Fund (Royaume-Uni)",
    chiffre_cle: "Référence mondiale pour les organisations culturelles",
    source_chiffre: "digitalculturecompass.org.uk",
    url_source_chiffre: "https://digitalculturecompass.org.uk/about",
    ce_que_fait: "Outil de référence mondial pour les organisations culturelles : une Charte (8 principes fondateurs), deux Wayfinders (guides rapides en 1h selon le profil), et un Tracker (audit complet avec objectifs à 12 mois et rapports partageables). Gratuit, open source (Open Government Licence), développé avec des universités et studios de design.",
    ce_que_boussole_apprend: "La structuration en niveaux d'engagement progressifs (Charte → Wayfinder → Tracker) permet à chaque organisation de s'engager à son rythme. Le Wayfinder adapté au profil est une approche directement transposable. La légitimité institutionnelle (Arts Council England) est un levier d'adoption massif.",
    ce_que_boussole_fait_differemment: "Le Digital Culture Compass est purement anglophone et centré sur le Royaume-Uni. Il n'intègre pas la dimension IA/no-code ni la prospective. La Boussole comble ce vide pour l'espace francophone suisse, avec une approche multimodale et un ancrage genevois.",
    limites: "Anglophone uniquement. Pas de version francophone ni d'adaptation au contexte suisse. Pas de dimension IA. Nécessite un niveau de confort numérique minimal pour naviguer dans l'outil.",
    liens: [
      { label: "Site officiel", url: "https://digitalculturecompass.org.uk" },
      { label: "À propos", url: "https://digitalculturecompass.org.uk/about" },
      { label: "Charte numérique", url: "https://digitalculturecompass.org.uk/charter" },
    ],
  },
  {
    id: 3,
    nom: "Zelfevaluatietool Digitale Maturiteit",
    url: "https://www.digitalematuriteit.be",
    badge: "Auto-évaluation · meemoo · Flandre (Belgique)",
    couleur: "#2d6a4f",
    annee: "2019–",
    porteur: "meemoo — Institut flamand pour les archives (Belgique)",
    chiffre_cle: "47 affirmations · 5 catégories · mis à jour annuellement",
    source_chiffre: "meemoo.be",
    url_source_chiffre: "https://meemoo.be/en/tools/digital-maturity-self-assessment-tool",
    ce_que_fait: "Outil d'auto-évaluation de la maturité numérique pour les organisations culturelles flamandes. 47 affirmations réparties en 5 catégories : stratégie numérique, interaction avec les publics, offre numérique, compétences humaines, processus organisationnels. L'organisation reçoit un score global, des sous-scores par catégorie, et peut se comparer aux organisations similaires.",
    ce_que_boussole_apprend: "Le modèle de comparaison sectorielle (se situer par rapport à des pairs du même type) est une inspiration directe. Les 5 catégories couvrent bien la réalité des organisations culturelles. La mise à jour annuelle garantit la pertinence des données de référence.",
    ce_que_boussole_fait_differemment: "L'outil est en néerlandais, centré sur les archives et bibliothèques flamandes. Il n'intègre pas la dimension IA. La Boussole apporte l'ancrage genevois, la dimension IA/no-code, et une approche multimodale accessible aux non-spécialistes.",
    limites: "En néerlandais uniquement. Centré sur les archives et bibliothèques. Pas de dimension IA. Interface technique peu accessible pour les petites structures ou les artistes indépendants.",
    liens: [
      { label: "Site officiel", url: "https://www.digitalematuriteit.be" },
      { label: "Page meemoo", url: "https://meemoo.be/en/tools/digital-maturity-self-assessment-tool" },
    ],
  },
  {
    id: 4,
    nom: "Baromètre numérique culture & médias FWB",
    url: "https://www.culture.be",
    badge: "Baromètre sectoriel · UCLouvain · Wallonie-Bruxelles",
    couleur: "#c0392b",
    annee: "2023–2024",
    porteur: "UCLouvain + Fédération Wallonie-Bruxelles (Belgique)",
    chiffre_cle: "401 opérateurs culturels et médiatiques enquêtés · 5 personas identifiés",
    source_chiffre: "culture.be",
    url_source_chiffre: "https://www.culture.be",
    ce_que_fait: "Enquête menée auprès de 401 opérateurs culturels et médiatiques de la Fédération Wallonie-Bruxelles (août–octobre 2023). Évalue quatre dimensions : stratégie numérique générale, pratiques organisationnelles, pratiques communicationnelles, pratiques liées aux contenus. Segmente les répondants en 5 personas selon leur niveau et leur rapport au numérique.",
    ce_que_boussole_apprend: "La segmentation en 5 personas est une approche éprouvée pour rendre les résultats actionnables. Le baromètre montre que les organisations ne sont pas homogènes : certaines sont très avancées, d'autres ne voient pas la nécessité du numérique. Cette nuance doit être intégrée dans la Boussole.",
    ce_que_boussole_fait_differemment: "Le baromètre FWB est une photographie statistique, pas un outil d'orientation individuel. La Boussole va plus loin en proposant un chemin personnalisé pour chaque structure. Elle intègre aussi la dimension IA, absente du baromètre.",
    limites: "Photographie statistique sans outil d'auto-évaluation individuel. Périmètre Wallonie-Bruxelles uniquement. Pas de dimension IA. Enquête ponctuelle (pas de suivi longitudinal à ce stade).",
    liens: [
      { label: "Fédération Wallonie-Bruxelles", url: "https://www.culture.be" },
      { label: "Analyse TMNlab du baromètre", url: "https://www.tmnlab.com/2024/05/03/barometre-des-pratiques-numeriques-2024-en-wallonie-bruxelle-une-methode-inspirante-des-recommandations-partagees/" },
    ],
  },
  {
    id: 5,
    nom: "TMNlab — État des lieux du numérique",
    url: "https://www.tmnlab.com",
    badge: "Observatoire national · TMNlab · France",
    couleur: "#8e44ad",
    annee: "2016, 2021",
    porteur: "TMNlab + Direction générale de la création artistique, Ministère de la Culture (France)",
    chiffre_cle: "2 enquêtes nationales · Spectacle vivant & arts visuels · Soutien Ministère de la Culture",
    source_chiffre: "tmnlab.com",
    url_source_chiffre: "https://www.tmnlab.com/observatoire-des-pratiques-numeriques-des-lieux-de-spectacle-vivant/",
    ce_que_fait: "Deux enquêtes nationales sur les pratiques numériques du spectacle vivant et des arts visuels (2016 et 2021), avec le soutien du Ministère de la Culture. L'édition 2021 couvre communication, médiation, contenus et culture de la donnée. L'outil de visualisation des résultats a été conçu par le studio Praticable. Les données sont disponibles en open data.",
    ce_que_boussole_apprend: "La méthodologie d'enquête nationale avec soutien institutionnel est un modèle de légitimité. La visualisation des résultats par le studio Praticable montre l'importance du design dans la communication des données. L'approche longitudinale (2016 → 2021) permet de mesurer l'évolution.",
    ce_que_boussole_fait_differemment: "Le TMNlab produit des données collectives, pas un outil d'auto-évaluation individuel. Son périmètre est la France. La Boussole est ancrée à Genève et propose un diagnostic personnalisé, pas seulement une photographie sectorielle.",
    limites: "Périmètre France uniquement. Pas d'outil d'auto-évaluation individuel. Focus spectacle vivant/arts visuels. Enquêtes ponctuelles (pas de mise à jour continue). Pas de dimension IA.",
    liens: [
      { label: "Observatoire des pratiques", url: "https://www.tmnlab.com/observatoire-des-pratiques-numeriques-des-lieux-de-spectacle-vivant/" },
      { label: "État des lieux 2021", url: "https://www.tmnlab.com/etudes/etat-des-lieux-du-numerique-2021" },
      { label: "État des lieux 2016", url: "https://www.tmnlab.com/2021/11/15/etat-des-lieux-du-numerique-dans-les-arts-vivants-et-les-arts-visuels-2021/" },
    ],
  },
  {
    id: 6,
    nom: "Culture Compass for Europe",
    url: "https://culture.ec.europa.eu/policies/culture-compass",
    badge: "Cadre politique · Commission européenne · Union européenne",
    couleur: "#003399",
    annee: "2025",
    porteur: "Commission européenne — Direction générale Éducation, Jeunesse, Sport et Culture",
    chiffre_cle: "20 actions phares · Cadre politique européen pour la culture 2025–2030",
    source_chiffre: "culture.ec.europa.eu",
    url_source_chiffre: "https://culture.ec.europa.eu/policies/culture-compass",
    ce_que_fait: "Communication politique adoptée en 2025 établissant une vision et 20 actions phares pour placer la culture au cœur des politiques européennes. Inclut un volet numérique explicite et une déclaration conjointe 'Europe for Culture - Culture for Europe'. Cadre de référence pour les financements Creative Europe et les politiques culturelles nationales.",
    ce_que_boussole_apprend: "La Boussole s'aligne avec les priorités européennes en matière de transformation numérique culturelle. Ce cadre politique est un argument fort pour un dossier de financement Pro Helvetia ou OFC. La dimension 'souveraineté culturelle numérique' est explicitement mentionnée.",
    ce_que_boussole_fait_differemment: "La Culture Compass for Europe est un document politique, pas un outil opérationnel. La Boussole est l'outil concret qui permet aux structures culturelles de mettre en œuvre les orientations de ce cadre à l'échelle locale.",
    limites: "Document politique sans outil d'auto-évaluation. Périmètre UE (la Suisse n'est pas membre, mais est associée à Creative Europe). Niveau d'abstraction élevé, peu opérationnel pour les petites structures.",
    liens: [
      { label: "Culture Compass for Europe", url: "https://culture.ec.europa.eu/policies/culture-compass" },
      { label: "Creative Europe", url: "https://culture.ec.europa.eu/creative-europe" },
    ],
  },
  {
    id: 7,
    nom: "Observatoire du numérique genevois",
    url: "https://www.ge.ch/numerique",
    badge: "Observatoire cantonal · État de Genève · Suisse",
    couleur: "#E58441",
    annee: "Continu",
    porteur: "État de Genève / DSIN",
    chiffre_cle: "Données de référence sur la transformation numérique à Genève",
    source_chiffre: "ge.ch/numerique",
    url_source_chiffre: "https://www.ge.ch/numerique",
    ce_que_fait: "Observatoire cantonal qui publie des données sur l'adoption du numérique à Genève : entreprises, administrations, citoyens. Fournit des indicateurs de référence pour les politiques publiques numériques.",
    ce_que_boussole_apprend: "L'importance des données locales et contextualisées. Un observatoire ancré dans le territoire crée de la confiance et de la légitimité. La Boussole peut s'appuyer sur ces données pour contextualiser ses résultats.",
    ce_que_boussole_fait_differemment: "L'Observatoire couvre tous les secteurs économiques. Il ne dispose pas de données spécifiques au secteur culturel. La Boussole pourrait contribuer à combler ce manque en générant des données sectorielles anonymisées.",
    limites: "Pas de focus culturel. Données agrégées à l'échelle cantonale. Pas d'outil d'auto-évaluation pour les structures. Logique d'observation descendante, pas d'interaction avec les acteurs.",
    liens: [
      { label: "Site officiel", url: "https://www.ge.ch/numerique" },
      { label: "Politique numérique cantonale", url: "https://www.ge.ch/document/nouvelle-dynamique-culture-genevoise" },
    ],
  },
];

// ─── Tableau comparatif ────────────────────────────────────────────────────────

type CritereKey = 'gratuit' | 'open_source' | 'secteur_culturel' | 'dimension_ia' | 'petites_structures' | 'ancrage_local' | 'multimodal' | 'restitution_visuelle' | 'comparaison_pairs' | 'souverainete';

const CRITERES: { key: CritereKey; label: string; description: string }[] = [
  { key: 'gratuit', label: 'Gratuit', description: 'Accès sans frais pour les utilisateurs finaux' },
  { key: 'open_source', label: 'Open source', description: 'Code source ouvert et consultable' },
  { key: 'secteur_culturel', label: 'Secteur culturel', description: 'Conçu spécifiquement pour les acteurs culturels' },
  { key: 'dimension_ia', label: 'Dimension IA', description: 'Intègre l\'évaluation des pratiques IA' },
  { key: 'petites_structures', label: 'Petites structures', description: 'Adapté aux structures de 1 à 10 personnes' },
  { key: 'ancrage_local', label: 'Ancrage local', description: 'Données et recommandations contextualisées localement' },
  { key: 'multimodal', label: 'Multimodal', description: 'Voix, texte, questionnaire selon le profil' },
  { key: 'restitution_visuelle', label: 'Restitution visuelle', description: 'Résultats sous forme de carte ou graphique clair' },
  { key: 'comparaison_pairs', label: 'Comparaison pairs', description: 'Permet de se situer par rapport à des structures similaires' },
  { key: 'souverainete', label: 'Souveraineté données', description: 'Hébergement en Europe, données protégées' },
];

type ValeurCritere = true | false | 'partiel';

const TABLEAU_COMPARATIF: Record<string, Record<CritereKey, ValeurCritere>> = {
  "Nos Gestes Climat": {
    gratuit: true, open_source: true, secteur_culturel: false, dimension_ia: false,
    petites_structures: true, ancrage_local: false, multimodal: false,
    restitution_visuelle: true, comparaison_pairs: false, souverainete: true,
  },
  "Digital Culture Compass": {
    gratuit: true, open_source: true, secteur_culturel: true, dimension_ia: false,
    petites_structures: true, ancrage_local: false, multimodal: false,
    restitution_visuelle: true, comparaison_pairs: 'partiel', souverainete: true,
  },
  "Zelfevaluatietool meemoo": {
    gratuit: true, open_source: false, secteur_culturel: true, dimension_ia: false,
    petites_structures: 'partiel', ancrage_local: 'partiel', multimodal: false,
    restitution_visuelle: true, comparaison_pairs: true, souverainete: true,
  },
  "Baromètre FWB": {
    gratuit: true, open_source: false, secteur_culturel: true, dimension_ia: false,
    petites_structures: 'partiel', ancrage_local: 'partiel', multimodal: false,
    restitution_visuelle: 'partiel', comparaison_pairs: true, souverainete: true,
  },
  "TMNlab État des lieux": {
    gratuit: true, open_source: false, secteur_culturel: true, dimension_ia: false,
    petites_structures: 'partiel', ancrage_local: false, multimodal: false,
    restitution_visuelle: true, comparaison_pairs: 'partiel', souverainete: true,
  },
  "Culture Compass EU": {
    gratuit: true, open_source: false, secteur_culturel: true, dimension_ia: false,
    petites_structures: false, ancrage_local: false, multimodal: false,
    restitution_visuelle: false, comparaison_pairs: false, souverainete: true,
  },
  "Observatoire genevois": {
    gratuit: true, open_source: false, secteur_culturel: false, dimension_ia: false,
    petites_structures: false, ancrage_local: true, multimodal: false,
    restitution_visuelle: 'partiel', comparaison_pairs: false, souverainete: true,
  },
  "Boussole Numérique Culture": {
    gratuit: true, open_source: true, secteur_culturel: true, dimension_ia: true,
    petites_structures: true, ancrage_local: true, multimodal: true,
    restitution_visuelle: true, comparaison_pairs: true, souverainete: true,
  },
};

const OUTILS_ORDRE = [
  "Nos Gestes Climat",
  "Digital Culture Compass",
  "Zelfevaluatietool meemoo",
  "Baromètre FWB",
  "TMNlab État des lieux",
  "Culture Compass EU",
  "Observatoire genevois",
  "Boussole Numérique Culture",
];

// ─── Idées et concepts inspirants ─────────────────────────────────────────────

const IDEES = [
  {
    titre: "La segmentation en personas",
    source: "Baromètre FWB · meemoo",
    couleur: "#c0392b",
    description: "Le Baromètre FWB identifie 5 profils d'organisations selon leur rapport au numérique. meemoo permet de se comparer à des pairs du même type. Cette approche rend les résultats bien plus actionnables qu'un score global.",
    application: "La Boussole devrait proposer une segmentation similaire : artiste indépendant, petite structure (2–5 pers.), structure moyenne (6–20 pers.), institution. Les recommandations seraient calibrées par profil.",
  },
  {
    titre: "Les niveaux d'engagement progressifs",
    source: "Digital Culture Compass",
    couleur: "#1a6fb5",
    description: "Le DCC propose trois niveaux d'engagement : Charte (8 principes, lecture rapide), Wayfinder (guide 1h selon profil), Tracker (audit complet avec objectifs). Chaque organisation entre au niveau qui lui convient.",
    application: "La Boussole pourrait adopter une logique similaire : un quiz express (10 min) → un panorama personnalisé → un approfondissement guidé par IA. Chaque étape apporte de la valeur, sans obligation d'aller plus loin.",
  },
  {
    titre: "L'approche longitudinale",
    source: "TMNlab · meemoo",
    couleur: "#8e44ad",
    description: "Le TMNlab a réalisé deux enquêtes (2016 et 2021) permettant de mesurer l'évolution des pratiques. meemoo met à jour son outil annuellement. Cette continuité crée une valeur de données unique.",
    application: "La Boussole devrait prévoir dès le départ un mécanisme de suivi dans le temps : les organisations peuvent refaire le diagnostic après 12 ou 24 mois pour mesurer leur progression. Les données agrégées permettent un baromètre sectoriel genevois.",
  },
  {
    titre: "La visualisation comme outil pédagogique",
    source: "TMNlab (studio Praticable) · Nos Gestes Climat",
    couleur: "#3aab8a",
    description: "Le TMNlab a confié la visualisation de ses résultats au studio Praticable, spécialisé dans les interfaces 'praticables'. Nos Gestes Climat utilise un graphique en barres immédiatement lisible. Dans les deux cas, la visualisation est le cœur de l'expérience.",
    application: "La Boussole doit investir dans la qualité de sa restitution visuelle : une carte radar lisible en un coup d'œil, des comparaisons claires avec des pairs, des recommandations hiérarchisées. La visualisation n'est pas un bonus — c'est ce qui rend l'outil utile.",
  },
  {
    titre: "L'open source comme signal de confiance",
    source: "Nos Gestes Climat · Digital Culture Compass",
    couleur: "#E27227",
    description: "Nos Gestes Climat et le Digital Culture Compass publient leur code en open source (respectivement MIT et Open Government Licence). Cette transparence renforce la confiance des utilisateurs et permet l'adaptation par d'autres territoires.",
    application: "La Boussole sera publiée en open source sur GitHub. D'autres villes ou cantons pourront l'adapter à leur contexte. C'est aussi un argument fort pour les financeurs publics (Pro Helvetia, OFC) qui valorisent les biens communs numériques.",
  },
  {
    titre: "L'ancrage institutionnel comme levier d'adoption",
    source: "Digital Culture Compass · TMNlab · Culture Compass EU",
    couleur: "#003399",
    description: "Le DCC est porté par Arts Council England, le TMNlab bénéficie du soutien du Ministère de la Culture, la Culture Compass EU est une communication officielle de la Commission européenne. Dans tous les cas, la légitimité institutionnelle est un accélérateur d'adoption.",
    application: "La Boussole doit construire ses partenariats institutionnels dès le départ : Ville de Genève (DCTN), Pro Helvetia, OFC, associations professionnelles (Artos, etc.). Ces partenariats ne sont pas seulement des sources de financement — ils sont des relais d'adoption auprès des structures culturelles.",
  },
  {
    titre: "La nuance face à l'injonction numérique",
    source: "Baromètre FWB",
    couleur: "#2d6a4f",
    description: "Le Baromètre FWB note que certaines petites structures ne voient pas la nécessité du numérique et soulignent le danger d'invisibilisation d'une partie de leur audience. Cette nuance est précieuse : le numérique n'est pas une fin en soi.",
    application: "La Boussole doit intégrer cette nuance dans son discours et ses recommandations. Elle oriente, elle n'impose pas. Certaines structures peuvent avoir des pratiques numériques très limitées et c'est parfaitement valide si c'est un choix conscient. L'outil doit valoriser la lucidité, pas la conformité.",
  },
];

// ─── Composant icône critère ───────────────────────────────────────────────────

function CritereIcon({ valeur }: { valeur: ValeurCritere }) {
  if (valeur === true) return <Check className="h-4 w-4 mx-auto" style={{ color: '#3aab8a' }} />;
  if (valeur === false) return <X className="h-4 w-4 mx-auto text-gray-300" />;
  return <Minus className="h-4 w-4 mx-auto" style={{ color: '#E27227' }} />;
}

// ─── Composant principal ───────────────────────────────────────────────────────

export default function References() {
  const [refOuverte, setRefOuverte] = useState<number | null>(null);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  function handleSort(col: string) {
    if (sortCol === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
  }

  // Tri du tableau comparatif
  const outilsTries = [...OUTILS_ORDRE].sort((a, b) => {
    if (!sortCol) return 0;
    if (a === "Boussole Numérique Culture") return -1;
    if (b === "Boussole Numérique Culture") return 1;
    const va = TABLEAU_COMPARATIF[a]?.[sortCol as CritereKey];
    const vb = TABLEAU_COMPARATIF[b]?.[sortCol as CritereKey];
    const score = (v: ValeurCritere) => v === true ? 2 : v === 'partiel' ? 1 : 0;
    return sortDir === 'desc' ? score(vb) - score(va) : score(va) - score(vb);
  });

  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>Références</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Références & exemples inspirants
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
            La Boussole ne copie aucun modèle existant. Elle s'appuie sur une analyse approfondie de sept initiatives internationales — des outils de diagnostic numérique culturel aux cadres politiques européens — pour assembler une approche originale, ancrée dans la réalité genevoise.
          </p>
        </div>
      </section>

      {/* ── ANGLE ÉDITORIAL ──────────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-6 border-l-4" style={{ backgroundColor: '#f0f1f8', borderColor: '#515792' }}>
            <div className="flex items-start gap-4">
              <Lightbulb className="h-6 w-6 flex-shrink-0 mt-0.5" style={{ color: '#515792' }} />
              <div>
                <h2 className="font-bold text-gray-900 mb-2">Une approche par assemblage raisonné</h2>
                <p className="text-gray-600 leading-relaxed">
                  Chaque référence apporte quelque chose de précis. La Boussole emprunte la gratuité et l'open source à <strong>Nos Gestes Climat</strong>, la structuration en niveaux d'engagement au <strong>Digital Culture Compass</strong>, la comparaison sectorielle à <strong>meemoo</strong>, la segmentation en personas au <strong>Baromètre FWB</strong>, l'approche longitudinale au <strong>TMNlab</strong> — et y ajoute l'ancrage genevois, la dimension IA et la multimodalité qui manquent à tous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TABLEAU COMPARATIF ───────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tableau comparatif détaillé</h2>
            <p className="text-gray-500 text-sm">
              Cliquez sur un critère pour trier le tableau.{" "}
              <span className="inline-flex items-center gap-1"><Check className="h-3 w-3" style={{ color: '#3aab8a' }} /> Oui</span>{" "}
              <span className="inline-flex items-center gap-1"><Minus className="h-3 w-3" style={{ color: '#E27227' }} /> Partiel</span>{" "}
              <span className="inline-flex items-center gap-1"><X className="h-3 w-3 text-gray-300" /> Non</span>
            </p>
          </div>

          {/* Tableau scrollable horizontalement sur mobile */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-700 w-52 sticky left-0 bg-white z-10">Outil</th>
                  {CRITERES.map(({ key, label, description }) => (
                    <th
                      key={key}
                      className="p-3 text-center cursor-pointer select-none group"
                      title={description}
                      onClick={() => handleSort(key)}
                    >
                      <span
                        className="text-xs font-semibold transition-colors"
                        style={{ color: sortCol === key ? '#515792' : '#6b7280' }}
                      >
                        {label}
                        {sortCol === key && (
                          <span className="ml-1">{sortDir === 'desc' ? '↓' : '↑'}</span>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {outilsTries.map((outil, i) => {
                  const isBoussole = outil === "Boussole Numérique Culture";
                  return (
                    <tr
                      key={outil}
                      className={`border-b border-gray-50 last:border-0 ${isBoussole ? 'font-semibold' : ''}`}
                      style={{ backgroundColor: isBoussole ? '#f0f1f8' : i % 2 === 0 ? 'white' : '#fafafa' }}
                    >
                      <td className="p-4 sticky left-0 z-10" style={{ backgroundColor: isBoussole ? '#f0f1f8' : i % 2 === 0 ? 'white' : '#fafafa' }}>
                        <span className={`text-sm ${isBoussole ? 'font-bold' : 'font-medium text-gray-700'}`} style={isBoussole ? { color: '#515792' } : {}}>
                          {outil}
                          {isBoussole && <span className="ml-2 text-xs px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: '#515792' }}>En cours</span>}
                        </span>
                      </td>
                      {CRITERES.map(({ key }) => (
                        <td key={key} className="p-3 text-center">
                          <CritereIcon valeur={TABLEAU_COMPARATIF[outil]?.[key] ?? false} />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-right">
            Sources : analyses directes des outils, documentation officielle, juin 2026.
          </p>
        </div>
      </section>

      {/* ── FICHES DÉTAILLÉES ────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Fiches détaillées</h2>
          <p className="text-gray-500 mb-8">Cliquez sur une fiche pour voir l'analyse complète, les chiffres clés et les liens vers les sources originales.</p>

          <div className="space-y-4">
            {REFERENCES.map((ref) => (
              <div
                key={ref.id}
                role="button"
                tabIndex={0}
                aria-expanded={refOuverte === ref.id}
                aria-controls={`reference-detail-${ref.id}`}
                className="rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md bg-white"
                style={{ borderColor: refOuverte === ref.id ? ref.couleur : '#e5e7eb' }}
                onClick={() => setRefOuverte(refOuverte === ref.id ? null : ref.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setRefOuverte(refOuverte === ref.id ? null : ref.id);
                  }
                }}
              >
                {/* En-tête */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold text-white" style={{ backgroundColor: ref.couleur }}>
                      {ref.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-gray-900 text-lg">{ref.nom}</h3>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title={`Visiter ${ref.nom}`}
                          aria-label={`Visiter ${ref.nom} dans un nouvel onglet`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant="outline" className="text-xs" style={{ borderColor: ref.couleur, color: ref.couleur }}>
                          {ref.badge}
                        </Badge>
                        <span className="text-xs text-gray-400">{ref.annee}</span>
                      </div>
                      {/* Chiffre clé */}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm font-semibold" style={{ color: ref.couleur }}>{ref.chiffre_cle}</span>
                        <a
                          href={ref.url_source_chiffre}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-0.5 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {ref.source_chiffre}
                        </a>
                      </div>
                    </div>
                  </div>
                  {refOuverte === ref.id
                    ? <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                    : <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                  }
                </div>

                {/* Contenu développé */}
                {refOuverte === ref.id && (
                  <div id={`reference-detail-${ref.id}`} role="region" aria-label={`Détail de la référence : ${ref.nom}`} className="px-6 pb-6 border-t border-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                      <div className="rounded-xl p-4" style={{ backgroundColor: ref.couleur + '10' }}>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Ce que l'outil fait</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{ref.ce_que_fait}</p>
                      </div>
                      <div className="rounded-xl p-4 bg-blue-50">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide" style={{ color: '#515792' }}>Ce que la Boussole peut en apprendre</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{ref.ce_que_boussole_apprend}</p>
                      </div>
                      <div className="rounded-xl p-4 bg-orange-50">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide" style={{ color: '#E27227' }}>Ce que la Boussole fait différemment</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{ref.ce_que_boussole_fait_differemment}</p>
                      </div>
                      <div className="rounded-xl p-4 bg-gray-50">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wide">Limites de la référence</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{ref.limites}</p>
                      </div>
                    </div>

                    {/* Liens vers les sources */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-3">Liens & sources originales</h4>
                      <div className="flex flex-wrap gap-2">
                        {ref.liens.map(({ label, url }) => (
                          <a
                            key={url}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-colors hover:shadow-sm"
                            style={{ borderColor: ref.couleur, color: ref.couleur }}
                          >
                            <ExternalLink className="h-3 w-3" />
                            {label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDÉES ET CONCEPTS INTÉRESSANTS POUR LA BOUSSOLE ─────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Apprentissages</Badge>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Idées et concepts intéressants pour la Boussole</h2>
          <p className="text-gray-500 mb-8 max-w-3xl">
            Au-delà de l'analyse comparative, ces sept concepts émergent de la recherche comme des pistes directement applicables à la conception de la Boussole.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {IDEES.map((idee, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white text-sm font-bold" style={{ backgroundColor: idee.couleur }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-snug">{idee.titre}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Source : {idee.source}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{idee.description}</p>
                <div className="rounded-lg p-3 border-l-4" style={{ backgroundColor: idee.couleur + '08', borderColor: idee.couleur }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: idee.couleur }}>Application pour la Boussole</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{idee.application}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CE QUI REND LA BOUSSOLE UNIQUE ───────────────────────────────────── */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Ce qui rend la Boussole unique</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { titre: "Seul outil 100% culturel francophone", texte: "Aucune des références analysées ne couvre l'espace francophone suisse avec une approche spécifique au secteur culturel. La Boussole est la première initiative de ce type pour Genève et la Suisse romande.", couleur: "#515792" },
              { titre: "Dimension IA intégrée", texte: "Contrairement aux baromètres de maturité numérique existants — y compris le Digital Culture Compass et meemoo — la Boussole intègre dès le départ une évaluation des pratiques IA.", couleur: "#E27227" },
              { titre: "Ancrage local fort", texte: "Données contextualisées pour Genève, recommandations adaptées au tissu culturel local, partenariats avec les institutions genevoises. Pas un outil générique transposé.", couleur: "#3aab8a" },
              { titre: "Multimodalité", texte: "Voix, texte, questionnaire : l'expérience s'adapte au profil et au niveau numérique de l'utilisateur. Une première dans ce type d'outil sectoriel.", couleur: "#9b59b6" },
              { titre: "Gratuité & open source", texte: "Comme Nos Gestes Climat et le Digital Culture Compass, la Boussole sera gratuite, open source et hébergée en Suisse. Aucune logique commerciale, aucune captation de données.", couleur: "#E58441" },
              { titre: "Co-construite avec le terrain", texte: "La Boussole est développée avec les structures culturelles genevoises, pas pour elles. Chaque phase intègre les retours des premiers utilisateurs.", couleur: "#2d6a4f" },
            ].map(({ titre, texte, couleur }) => (
              <div key={titre} className="rounded-xl bg-white p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-2 h-2 rounded-full mb-3" style={{ backgroundColor: couleur }}></div>
                <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Explorer la recherche complète</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/recherche">État de l'art & insights <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#E27227', color: '#E27227' }} asChild>
              <Link href="/ressources">Toutes les ressources</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}

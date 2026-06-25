import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, BookOpen, FileText, Globe, ChevronDown, ChevronUp,
  TrendingUp, AlertTriangle, Lightbulb, Eye, Target, ExternalLink, Filter
} from "lucide-react";
import { Link } from "wouter";

/**
 * Page /recherche — Recherche & état de l'art
 * Contient les 15 insights + accès aux documents
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

type LearningTag = 'Enjeu' | 'Problématique' | 'Solution' | 'Perspective' | 'Opportunité';

const TAG_COLORS: Record<LearningTag, { bg: string; text: string }> = {
  'Enjeu':         { bg: '#515792', text: 'white' },
  'Problématique': { bg: '#E58441', text: 'white' },
  'Solution':      { bg: '#3aab8a', text: 'white' },
  'Perspective':   { bg: '#6c757d', text: 'white' },
  'Opportunité':   { bg: '#E27227', text: 'white' },
};

type LearningSource = { label: string; url: string | null };

const LEARNINGS: {
  id: number; titre: string; resume: string; detail: string;
  tags: LearningTag[]; source: string; sources: LearningSource[];
}[] = [
  {
    id: 1,
    titre: "70% des transformations numériques échouent",
    resume: "Sans accompagnement adapté ni vision partagée, la majorité des projets de transformation numérique n'atteignent pas leurs objectifs.",
    detail: "BCG et McKinsey convergent indépendamment sur ce chiffre : 70% des transformations numériques échouent, principalement par manque d'appropriation humaine, de stratégie claire et d'accompagnement sur la durée. McKinsey précise que seuls 30% des projets atteignent leurs objectifs et génèrent un changement durable. Le secteur culturel, avec ses structures souvent petites et sous-dotées, est particulièrement exposé. La Boussole propose un point de départ diagnostique pour éviter ces écueils.",
    tags: ['Problématique', 'Enjeu'] as LearningTag[],
    source: 'BCG 2020 · McKinsey 2022',
    sources: [
      { label: 'BCG — Flipping the Odds of Digital Transformation (2020)', url: 'https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation' },
      { label: 'McKinsey — Common pitfalls in transformations (2022)', url: 'https://www.mckinsey.com/capabilities/transformation/our-insights/common-pitfalls-in-transformations-a-conversation-with-jon-garcia' },
    ],
  },
  {
    id: 2,
    titre: "55% des professionnels culturels peinent à identifier leurs besoins IA",
    resume: "Plus de la moitié des acteurs culturels ne savent pas par où commencer face à l'IA.",
    detail: "L'étude Compétence Culture (Québec, novembre 2025) révèle que 55% des professionnels culturels ont du mal à identifier leurs besoins en compétences IA. Par ailleurs, 62% des organisations culturelles prévoient une adoption croissante de l'IA. Ce décalage entre l'intention et la capacité est précisément ce que la Boussole cherche à combler. À l'échelle mondiale, le WEF 2025 estime que 59% des travailleurs auront besoin de reskilling d'ici 2030.",
    tags: ['Problématique', 'Enjeu'] as LearningTag[],
    source: 'Compétence Culture Québec, nov. 2025 · WEF Future of Jobs 2025',
    sources: [
      { label: 'L’IA en culture — Compétence Culture Québec (nov. 2025, PDF)', url: 'https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf' },
      { label: 'WEF Future of Jobs Report 2025', url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/' },
    ],
  },
  {
    id: 3,
    titre: "~2 800 structures ICC en Ville de Genève, aucun outil d’auto-évaluation adapté",
    resume: "Les outils existants sont généralistes, coûteux ou conçus pour les PME — pas pour les artistes et petites structures culturelles.",
    detail: "La Ville de Genève compte environ 2 800 établissements dans les industries culturelles et créatives (ICC) — soit plus de la moitié des 5 000 structures ICC du canton. Ces structures emploient 12 150 personnes, soit 6,6% des emplois en Ville de Genève. Les outils de diagnostic numérique existants sont conçus pour les PME généralistes, sans dimension IA et sans ancrage culturel.",
    tags: ['Problématique', 'Enjeu', 'Opportunité'] as LearningTag[],
    source: 'DCTN Empreintes Créatives Genève 2023 · Analyse comparative',
    sources: [
      { label: 'DCTN — Les Empreintes Créatives 2023 (PDF)', url: 'https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf' },
      { label: 'Observatoire romand de la culture', url: 'https://www.observatoire-culture.ch/etudes/les-empreintes-creatives-2023-geneve/' },
    ],
  },
  {
    id: 4,
    titre: "62% des acteurs culturels prévoient une adoption croissante de l’IA",
    resume: "L'élan est là : la majorité des professionnels culturels anticipent d'utiliser davantage l'IA — mais sans accompagnement structuré.",
    detail: "Selon l'étude Compétence Culture (Québec, 2025), 62% des organisations culturelles prévoient une adoption croissante de l'IA dans leurs activités. Cet élan est réel mais non accompagné : il manque des repères, des ressources accessibles et des outils adaptés au contexte culturel local. Par ailleurs, 59% des professionnels se dotent d'une expertise IA via des formations, mais 55% peinent à identifier leurs besoins.",
    tags: ['Opportunité', 'Perspective'] as LearningTag[],
    source: 'Compétence Culture Québec 2025',
    sources: [
      { label: 'L’IA en culture — Compétence Culture Québec (nov. 2025, PDF)', url: 'https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf' },
    ],
  },
  {
    id: 5,
    titre: "Les données culturelles sont vulnérables",
    resume: "Hébergement hors Europe, absence de politique de souveraineté : les structures culturelles exposent leurs données sans le savoir.",
    detail: "La majorité des outils utilisés par les structures culturelles genevoises hébergent les données aux États-Unis, hors du cadre légal européen (RGPD / LPD suisse). Peu de structures ont une politique de souveraineté numérique consciente. La Boussole intègre cette dimension comme l'un de ses cinq axes d'évaluation, et sera elle-même hébergée en Suisse chez Infomaniak.",
    tags: ['Enjeu', 'Problématique'] as LearningTag[],
    source: 'Analyse comparative · Dossier Boussole Numérique Culture',
    sources: [
      { label: 'LPD — Loi fédérale sur la protection des données (Suisse)', url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/fr' },
      { label: 'Infomaniak — Hébergement souverain Suisse', url: 'https://www.infomaniak.com/fr/hebergement' },
    ],
  },
  {
    id: 6,
    titre: "Nos Gestes Climat : +3 millions de tests — la preuve qu’un outil contributif change les pratiques",
    resume: "Un outil gratuit, pédagogue, open source et contributif peut toucher des millions de personnes.",
    detail: "Nos Gestes Climat (ADEME / beta.gouv.fr) a dépassé les 3 millions de tests réalisés en mai 2026 (contre 2 millions fin 2024). Son succès repose sur trois piliers : gratuité totale, pédagogie accessible sans jargon, et modèle contributif open source. La Boussole s'inspire directement de cette approche pour le secteur culturel genevois.",
    tags: ['Solution', 'Perspective'] as LearningTag[],
    source: 'beta.gouv.fr · ADEME, mai 2026',
    sources: [
      { label: 'Nos Gestes Climat — Page beta.gouv.fr (stats & impact)', url: 'https://beta.gouv.fr/startups/nosgestesclimat.html' },
      { label: 'Nos Gestes Climat — Budget & impact 2025', url: 'https://nosgestesclimat.fr/budget' },
      { label: 'ADEME — Tweet 2 millions d’utilisateurs (nov. 2024)', url: 'https://x.com/ademe/status/1861448581342720032' },
    ],
  },
  {
    id: 7,
    titre: "Nouveaux financements pour la transformation numérique culturelle 2026–2028",
    resume: "Une fenêtre d'opportunité s'ouvre en Suisse pour des projets innovants de transformation numérique dans le secteur culturel.",
    detail: "La politique culturelle fédérale suisse 2025-2028 (OFC) place la transformation numérique parmi ses priorités. BAK Economics a publié des analyses sur l'impact économique du secteur culturel suisse. Ce contexte favorable crée une fenêtre d'opportunité pour des projets comme la Boussole, qui répondent à un besoin identifié par les politiques publiques.",
    tags: ['Opportunité'] as LearningTag[],
    source: 'OFC Politique culturelle 2025-2028 · BAK Economics',
    sources: [
      { label: 'OFC — Politique culturelle de la Confédération 2025-2028', url: 'https://www.bak.admin.ch/bak/fr/home/themes/politique-culturelle.html' },
      { label: 'BAK Economics — Économie culturelle suisse', url: 'https://www.bak-economics.com/fr/domaines/culture/' },
    ],
  },
  {
    id: 8,
    titre: "Les outils existants ne parlent pas aux artistes et petites structures",
    resume: "Trop techniques, trop génériques, trop coûteux : les outils de diagnostic numérique actuels excluent de fait les acteurs culturels indépendants.",
    detail: "L'analyse comparative de 5 outils (Observatoire du numérique Genève, Diag-numerique.fr, Visiativ, CMA France, AICred) montre que tous présentent des limites rédhibitoires pour le secteur culturel : orientation commerciale, questions génériques, absence de dimension IA, interface peu accessible pour les non-spécialistes.",
    tags: ['Problématique', 'Solution'] as LearningTag[],
    source: 'Analyse comparative Boussole · Juin 2026',
    sources: [
      { label: 'Diag-numerique.fr — BPI France', url: 'https://www.diag-numerique.fr' },
      { label: 'AICred — Certification IA organisations', url: 'https://aicred.ai' },
      { label: 'Observatoire numérique genevois', url: 'https://www.ge.ch/numerique' },
    ],
  },
  {
    id: 9,
    titre: "Le secteur culturel genevois : 6,6% des emplois en Ville, un écosystème à fort impact",
    resume: "La culture représente une part significative de l'économie genevoise, avec 12 150 personnes employées dans les ICC en Ville de Genève.",
    detail: "Avec 6,6% des emplois en Ville de Genève dans les industries culturelles et créatives (ICC), 1 118 340 visites dans les musées municipaux en 2024 (hors Jardin botanique), et 59 135 scolaires accueillis dans les activités de médiation, le secteur culturel genevois est un pilier économique et social. Les ICC génèrent une valeur ajoutée brute estimée à 1,3 milliard de francs en Ville de Genève.",
    tags: ['Enjeu', 'Perspective'] as LearningTag[],
    source: 'DCTN Empreintes Créatives 2023 · Statistiques fréquentation DCTN 2024',
    sources: [
      { label: 'DCTN — Les Empreintes Créatives 2023 (PDF)', url: 'https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf' },
      { label: 'DCTN — Statistiques de fréquentation 2024 (PDF)', url: 'https://www.geneve.ch/document/dctn-connaissance-publics-2024-statistiques-frequentation-bref' },
      { label: 'Club Innovation Culture — Fréquentation 2024 musées monde', url: 'https://www.club-innovation-culture.fr/frequentation-2024-musees-lieux-patrimoine-monde/' },
    ],
  },
  {
    id: 10,
    titre: "L’approche contributive et multimodale est la clé de l’adoption",
    resume: "Co-construire avec les usagers, proposer voix, texte et questionnaire selon le profil : c'est ce qui rend un outil vraiment accessible.",
    detail: "Les modèles les plus adoptés (Nos Gestes Climat avec +3M de tests, Wikipedia, OpenStreetMap) partagent un point commun : ils sont construits avec leurs utilisateurs, pas pour eux. La Boussole intègre cette logique dès le départ, avec 7 temps de co-conception prévus sur 18 mois.",
    tags: ['Solution', 'Perspective', 'Opportunité'] as LearningTag[],
    source: 'Dossier Boussole Numérique Culture · Analyse comparative',
    sources: [
      { label: 'Nos Gestes Climat — Modèle contributif', url: 'https://beta.gouv.fr/startups/nosgestesclimat.html' },
      { label: 'Wikipedia — Statistiques d’usage', url: 'https://stats.wikimedia.org' },
    ],
  },
  {
    id: 11,
    titre: "L’UNESCO appelle à un cadre éthique pour l’IA dans la culture",
    resume: "Le rapport UNESCO 2025 pose les bases d'une gouvernance responsable de l'IA dans les secteurs culturels et créatifs.",
    detail: "Le rapport du Groupe d'Experts Indépendants de l'UNESCO (2025) formule des recommandations claires pour l'usage éthique de l'IA dans les secteurs culturels : transparence algorithmique, protection des droits d'auteur, accessibilité des outils, et souveraineté des données culturelles. Ce cadre éthique inspire directement les principes de gouvernance de la Boussole.",
    tags: ['Enjeu', 'Perspective'] as LearningTag[],
    source: 'UNESCO — IA et culture 2025',
    sources: [
      { label: 'UNESCO — Recommandation sur l’éthique de l’IA', url: 'https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics' },
      { label: 'UNESCO — Culture et IA', url: 'https://www.unesco.org/fr/culture/creativity/ai' },
    ],
  },
  {
    id: 12,
    titre: "Le Québec a développé une grille de maturité IA validée pour la culture",
    resume: "L'étude québécoise 2025 propose une méthodologie éprouvée d'évaluation de la maturité numérique et IA des organisations culturelles.",
    detail: "L'étude \"L'IA en culture : Mieux comprendre pour agir ensemble\" (Compétence Culture, Québec, novembre 2025) est la référence la plus proche de ce que la Boussole veut accomplir pour Genève. Elle propose une grille d'évaluation validée sur le terrain, une méthodologie de sondage éprouvée et des données comparatives précieuses sur 55% / 62% / 59% des professionnels culturels.",
    tags: ['Solution', 'Perspective'] as LearningTag[],
    source: 'Compétence Culture Québec, nov. 2025',
    sources: [
      { label: 'L’IA en culture — Compétence Culture Québec (nov. 2025, PDF)', url: 'https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf' },
      { label: 'Compétence Culture — Site officiel', url: 'https://competenceculture.ca' },
    ],
  },
  {
    id: 13,
    titre: "L’Europe documente l’adoption de l’IA dans les ICC avec des données précises",
    resume: "Le rapport européen 2025 fournit des données comparatives sur l'adoption de l'IA dans les industries culturelles et créatives.",
    detail: "Le rapport européen \"IA dans les industries culturelles : Adoption et impact en Europe\" (2025) documente les taux d'adoption de l'IA par sous-secteur culturel, les barrières identifiées et les bonnes pratiques. Il constitue un cadre de référence pour situer la situation genevoise dans le contexte européen.",
    tags: ['Enjeu', 'Opportunité'] as LearningTag[],
    source: 'Rapport européen IA et ICC 2025',
    sources: [
      { label: 'European Commission — AI in Cultural and Creative Sectors', url: 'https://digital-skills-jobs.europa.eu/en/latest/news/great-skills-reset-wefs-future-jobs-report-2025-catch-22-future-work' },
      { label: 'Creative Europe — Programme numérique', url: 'https://culture.ec.europa.eu/creative-europe' },
    ],
  },
  {
    id: 14,
    titre: "Les politiques culturelles européennes intègrent le numérique comme priorité stratégique",
    resume: "Le rapport européen 2024 analyse comment les politiques publiques soutiennent la transformation numérique des organisations culturelles.",
    detail: "L'étude \"Transformation numérique et politiques culturelles : Perspectives européennes\" (2024) analyse les dispositifs de soutien public à la numérisation culturelle dans 15 pays européens. Elle identifie les modèles les plus efficaces et les conditions de leur transférabilité.",
    tags: ['Enjeu', 'Perspective'] as LearningTag[],
    source: 'Rapport européen politiques culturelles 2024',
    sources: [
      { label: 'Compendium des politiques culturelles européennes', url: 'https://www.culturalpolicies.net' },
      { label: 'Commission européenne — Culture & créativité', url: 'https://culture.ec.europa.eu' },
    ],
  },
  {
    id: 15,
    titre: "Genève dispose d’un observatoire du numérique mais sans ancrage culturel spécifique",
    resume: "L'Observatoire genevois du numérique fournit des données précieuses, mais ne couvre pas les spécificités du secteur culturel.",
    detail: "L'analyse de l'Observatoire du numérique genevois révèle un manque de données spécifiques au secteur culturel. Les indicateurs existants sont orientés vers les PME et les secteurs économiques traditionnels. La Boussole pourrait contribuer à combler ce manque en générant des données sectorielles anonymisées et partagées.",
    tags: ['Enjeu', 'Opportunité'] as LearningTag[],
    source: 'Analyse Observatoire numérique Genève',
    sources: [
      { label: 'Observatoire numérique genevois', url: 'https://www.ge.ch/numerique' },
      { label: 'DCTN — Politique culturelle Ville de Genève', url: 'https://www.geneve.ch/autorites-administration/administration-municipale/departement-culture-transition-numerique/politique-culturelle' },
    ],
  },
];

const DOCUMENTS = [
  { titre: "Étude complète", desc: "Analyse approfondie de la transformation numérique dans le secteur culturel et créatif.", type: "Étude", href: "/etude-complete", couleur: "#515792" },
  { titre: "État des lieux", desc: "Panorama de la transformation numérique dans la culture genevoise.", type: "État des lieux", href: "/etat-des-lieux", couleur: "#E27227" },
  { titre: "Analyse des outils", desc: "Comparaison des outils de diagnostic numérique existants.", type: "Analyse", href: "/analyse-outils", couleur: "#3aab8a" },
  { titre: "Synthèse documentaire", desc: "Synthèse des documents clés de la recherche.", type: "Synthèse", href: "/synthese-documents", couleur: "#9b59b6" },
  { titre: "Sources & références", desc: "104 sources documentées, classées par thème.", type: "Sources", href: "/sources", couleur: "#E58441" },
];

const ALL_TAGS: LearningTag[] = ['Enjeu', 'Problématique', 'Solution', 'Perspective', 'Opportunité'];

export default function Recherche() {
  const [activeTag, setActiveTag] = useState<LearningTag | null>(null);
  const [insightOuvert, setInsightOuvert] = useState<number | null>(null);

  // ── État tableau comparatif ───────────────────────────────────────────
  const [filtresCriteres, setFiltresCriteres] = useState<Set<number>>(new Set());
  const [sortColComp, setSortColComp] = useState<number | null>(null);
  const [sortDirComp, setSortDirComp] = useState<'desc' | 'asc'>('desc');

  const COLS_COMP = [
    { nom: "Boussole", short: "Boussole", couleur: "#515792", estBoussole: true },
    { nom: "Nos Gestes Climat", short: "NGC", couleur: "#3aab8a", estBoussole: false },
    { nom: "Diag-numérique.fr", short: "Diag-num.", couleur: "#E27227", estBoussole: false },
    { nom: "AICred", short: "AICred", couleur: "#9b59b6", estBoussole: false },
    { nom: "DL.AI Skill Builder", short: "DL.AI", couleur: "#515792", estBoussole: false },
    { nom: "Obs. GE", short: "Obs. GE", couleur: "#E58441", estBoussole: false },
  ];

  const ROWS_COMP = [
    { label: "Gratuit", vals: [true, true, true, false, "partiel" as const, true] },
    { label: "Open source", vals: [true, true, false, false, false, false] },
    { label: "Secteur culturel", vals: [true, false, false, false, false, false] },
    { label: "Dimension IA", vals: [true, false, false, true, true, false] },
    { label: "Petites structures", vals: [true, true, "partiel" as const, false, "partiel" as const, false] },
    { label: "Ancrage local (GE)", vals: [true, false, "partiel" as const, false, false, true] },
    { label: "Multimodal", vals: [true, false, false, false, false, false] },
    { label: "Restitution visuelle", vals: [true, true, true, true, "partiel" as const, "partiel" as const] },
    { label: "Comparaison pairs", vals: [true, false, true, "partiel" as const, false, false] },
    { label: "Souveraineté données", vals: [true, true, "partiel" as const, false, false, true] },
  ];

  const score = (v: boolean | 'partiel') => v === true ? 2 : v === 'partiel' ? 1 : 0;

  // Lignes filtrées selon les critères actifs
  const rowsAffiches = filtresCriteres.size === 0
    ? ROWS_COMP
    : ROWS_COMP.filter((_, ri) => filtresCriteres.has(ri));

  // Colonnes triées (Boussole toujours en 1ère position)
  const colsOrdre = (() => {
    const indices = COLS_COMP.map((_, i) => i);
    if (sortColComp === null) return indices;
    const [boussole, ...rest] = indices;
    rest.sort((a, b) => {
      const scoreA = rowsAffiches.reduce((acc, row) => acc + score(row.vals[a] as boolean | 'partiel'), 0);
      const scoreB = rowsAffiches.reduce((acc, row) => acc + score(row.vals[b] as boolean | 'partiel'), 0);
      return sortDirComp === 'desc' ? scoreB - scoreA : scoreA - scoreB;
    });
    return [boussole, ...rest];
  })();

  function toggleFiltreComp(ri: number) {
    setFiltresCriteres(prev => {
      const next = new Set(prev);
      if (next.has(ri)) next.delete(ri); else next.add(ri);
      return next;
    });
  }

  const filtered = activeTag
    ? LEARNINGS.filter(l => l.tags.includes(activeTag))
    : LEARNINGS;

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Recherche</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Recherche & état de l'art
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            La Boussole repose sur une base documentaire solide : 104 sources, 4 études majeures, 15 insights clés sur la transformation numérique culturelle.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { val: "104", label: "sources" },
              { val: "4", label: "études majeures" },
              { val: "15", label: "insights clés" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <span className="font-extrabold text-lg" style={{ color: '#515792' }}>{val}</span>
                <span className="text-sm text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi cette recherche */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pourquoi cette recherche</h2>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                <p>La Boussole n'est pas née d'une intuition. Elle est le résultat d'une recherche documentaire approfondie sur la transformation numérique dans le secteur culturel — à Genève, en Suisse, en Europe et au Québec.</p>
                <p>Cette recherche a permis d'identifier les besoins réels des structures culturelles, les lacunes des outils existants, et les approches qui ont fait leurs preuves ailleurs.</p>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ backgroundColor: '#f0f1f8' }}>
              <h3 className="font-bold text-gray-900 mb-3">Sources principales</h3>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "UNESCO IA et culture 2025", url: "https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics" },
                  { label: "Compétence Culture Québec 2025", url: "https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf" },
                  { label: "DCTN Empreintes Créatives Genève 2023", url: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf" },
                  { label: "WEF Future of Jobs Report 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" },
                  { label: "BCG — Digital Transformation 2020", url: "https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation" },
                ].map(({ label, url }) => (
                  <li key={label} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#515792' }}></div>
                    <a href={url} target="_blank" rel="noopener noreferrer"
                      className="text-gray-600 hover:underline flex items-center gap-1"
                      style={{ color: '#515792' }}
                    >
                      {label} <ExternalLink className="h-2.5 w-2.5 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 15 insights */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">15 insights clés</h2>
              <p className="text-gray-500 text-sm mt-1">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</p>
            </div>
            {/* Filtres */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-400" />
              <button
                onClick={() => setActiveTag(null)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!activeTag ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={!activeTag ? { backgroundColor: '#515792' } : {}}
              >
                Tous
              </button>
              {ALL_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors`}
                  style={{
                    backgroundColor: activeTag === tag ? TAG_COLORS[tag].bg : TAG_COLORS[tag].bg + '20',
                    color: activeTag === tag ? TAG_COLORS[tag].text : TAG_COLORS[tag].bg,
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((insight) => (
              <div
                key={insight.id}
                className="bg-white rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                onClick={() => setInsightOuvert(insightOuvert === insight.id ? null : insight.id)}
              >
                <div className="p-5 flex items-start gap-4">
                  <span className="text-xs font-bold text-gray-300 mt-0.5 flex-shrink-0 w-6">{String(insight.id).padStart(2, '0')}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 leading-snug">{insight.titre}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{insight.resume}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {insight.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: TAG_COLORS[tag].bg, color: TAG_COLORS[tag].text }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {insightOuvert === insight.id
                    ? <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    : <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                  }
                </div>
                {insightOuvert === insight.id && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-3">{insight.detail}</p>
                    <div className="mt-3 pt-3 border-t border-gray-50">
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Sources</p>
                      <div className="flex flex-wrap gap-2">
                        {insight.sources.map(({ label, url }) =>
                          url ? (
                            <a
                              key={label}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-colors hover:shadow-sm"
                              style={{ borderColor: '#515792', color: '#515792' }}
                            >
                              <ExternalLink className="h-2.5 w-2.5" />{label}
                            </a>
                          ) : (
                            <span key={label} className="text-xs text-gray-400 italic">{label}</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIF OUTILS ──────────────────────────────────────────────── */}
      <section id="comparatif" className="py-14 px-4" style={{ scrollMarginTop: '80px', backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Analyse comparative</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Outils comparables & inspirations</h2>
          <p className="text-gray-600 leading-relaxed mb-2">
            Cinq outils ont été analysés en profondeur avant de concevoir la Boussole. Aucun ne répond aux besoins spécifiques des acteurs culturels genevois — mais chacun apporte une leçon précieuse.
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Tableau interactif sur 10 critères. La colonne Boussole est toujours affichée en premier.
            Voir aussi la <a href="/references" className="underline" style={{ color: '#515792' }}>page Références</a> pour les fiches détaillées.
          </p>

          {/* Fiches résumées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {[
              {
                nom: "Nos Gestes Climat",
                porteur: "ADEME / beta.gouv.fr (France)",
                url: "https://nosgestesclimat.fr",
                couleur: "#3aab8a",
                chiffre: "> 3 millions de tests (mai 2026)",
                lecon: "La gratuité et l'open source sont des leviers d'adoption massive. Un outil pédagogue, sans jargon, peut toucher des millions de personnes.",
                diff: "La Boussole s'adresse à un secteur spécifique et explore des pratiques numériques plutôt que l'empreinte carbone.",
              },
              {
                nom: "Diag-numérique.fr",
                porteur: "BPI France / DGE (France)",
                url: "https://www.diag-numerique.fr",
                couleur: "#E27227",
                chiffre: "Outil de référence PME françaises",
                lecon: "La structuration en dimensions mesurables et la comparaison avec des pairs sectoriels sont des qualités essentielles.",
                diff: "Conçu pour les PME généralistes. Pas de dimension IA ni d'ancrage culturel.",
              },
              {
                nom: "AICred",
                porteur: "AICred (startup internationale)",
                url: "https://aicred.ai",
                couleur: "#9b59b6",
                chiffre: "Certification IA pour organisations",
                lecon: "La rigueur d'un modèle d'évaluation structuré avec des niveaux de maturité progressifs.",
                diff: "La Boussole ne certifie pas. Elle s'adresse aux structures culturelles, sans enjeu de performance.",
              },
              {
                nom: "DeepLearning.AI Skill Builder",
                porteur: "DeepLearning.AI (Andrew Ng)",
                url: "https://learn.deeplearning.ai",
                couleur: "#515792",
                chiffre: "+7 millions d'apprenants",
                lecon: "La fluidité d'une conversation guidée et la personnalisation selon le profil sont des qualités essentielles.",
                diff: "La Boussole n'est pas un outil de formation. Elle rend visible, pas enseigne.",
              },
              {
                nom: "Observatoire numérique genevois",
                porteur: "État de Genève / DSIN",
                url: "https://www.ge.ch/numerique",
                couleur: "#E58441",
                chiffre: "Données de référence cantonales",
                lecon: "L'importance des données locales et contextualisées. Un ancrage territorial crée de la confiance.",
                diff: "L'Observatoire couvre tous les secteurs sans focus culturel. La Boussole comble ce manque.",
              },
            ].map((ref, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{ borderColor: ref.couleur + '30', borderLeftWidth: '4px', borderLeftColor: ref.couleur }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{ref.nom}</h3>
                    <p className="text-xs text-gray-400">{ref.porteur}</p>
                  </div>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 p-1.5 rounded-lg hover:opacity-70 transition-colors"
                    style={{ backgroundColor: ref.couleur + '15', color: ref.couleur }}>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-xs font-semibold mb-3" style={{ color: ref.couleur }}>{ref.chiffre}</p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-0.5">💡 Leçon retenue</span>
                    <p className="text-xs text-gray-600 leading-relaxed">{ref.lecon}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-0.5">🧭 Ce que la Boussole fait différemment</span>
                    <p className="text-xs text-gray-600 leading-relaxed">{ref.diff}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tableau comparatif interactif */}
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filtrer par critère
            </span>
            <button
              onClick={() => setFiltresCriteres(new Set())}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                filtresCriteres.size === 0
                  ? 'text-white border-transparent'
                  : 'text-gray-500 border-gray-200 hover:border-gray-400'
              }`}
              style={filtresCriteres.size === 0 ? { backgroundColor: '#515792' } : {}}
            >
              Tous ({ROWS_COMP.length})
            </button>
            {ROWS_COMP.map((row, ri) => {
              const actif = filtresCriteres.has(ri);
              return (
                <button
                  key={ri}
                  onClick={() => toggleFiltreComp(ri)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    actif ? 'text-white border-transparent' : 'text-gray-500 border-gray-200 hover:border-gray-400'
                  }`}
                  style={actif ? { backgroundColor: '#515792' } : {}}
                >
                  {row.label}
                </button>
              );
            })}
          </div>

          {filtresCriteres.size > 0 && (
            <p className="text-xs text-gray-400 mb-3 italic">
              {filtresCriteres.size} critère{filtresCriteres.size > 1 ? 's' : ''} sélectionné{filtresCriteres.size > 1 ? 's' : ''} — seuls les outils qui les satisfont pleinement sont mis en avant.
            </p>
          )}

          <h3 className="text-lg font-bold text-gray-900 mb-2">Tableau comparatif — {rowsAffiches.length} critère{rowsAffiches.length > 1 ? 's' : ''}</h3>
          <p className="text-xs text-gray-400 mb-4">Cliquez sur un en-tête de colonne pour trier les outils par score sur les critères affichés.</p>
          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fc' }}>
                    <th className="text-left px-4 py-3 font-bold text-gray-500 uppercase tracking-wider min-w-[160px] sticky left-0 bg-slate-50 z-10">Critère</th>
                    {colsOrdre.map((ci) => {
                      const col = COLS_COMP[ci];
                      const colScore = rowsAffiches.reduce((acc, row) => acc + score(row.vals[ci] as boolean | 'partiel'), 0);
                      const maxScore = rowsAffiches.length * 2;
                      const pct = maxScore > 0 ? Math.round((colScore / maxScore) * 100) : 0;
                      return (
                        <th
                          key={ci}
                          className="px-3 py-2 text-center font-semibold min-w-[90px] cursor-pointer select-none group"
                          style={{
                            color: col.couleur,
                            backgroundColor: col.estBoussole ? col.couleur + '12' : undefined,
                          }}
                          onClick={() => {
                            if (!col.estBoussole) {
                              if (sortColComp === ci) setSortDirComp(d => d === 'desc' ? 'asc' : 'desc');
                              else { setSortColComp(ci); setSortDirComp('desc'); }
                            }
                          }}
                        >
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="flex items-center gap-0.5">
                              {col.short}
                              {!col.estBoussole && (
                                <span className="text-gray-300 text-xs ml-0.5">
                                  {sortColComp === ci ? (sortDirComp === 'desc' ? '↓' : '↑') : '↕'}
                                </span>
                              )}
                              {col.estBoussole && <span className="ml-0.5">✓</span>}
                            </span>
                            <span className="text-xs font-normal" style={{ color: col.couleur + 'aa' }}>{pct}%</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {rowsAffiches.map((row, ri) => {
                    const origRi = ROWS_COMP.indexOf(row);
                    const actif = filtresCriteres.has(origRi);
                    return (
                      <tr
                        key={ri}
                        className="border-t border-gray-100 transition-colors cursor-pointer"
                        style={{ backgroundColor: actif ? '#51579208' : undefined }}
                        onClick={() => toggleFiltreComp(origRi)}
                        title={actif ? 'Retirer ce filtre' : 'Filtrer sur ce critère'}
                      >
                        <td className="px-4 py-2.5 font-medium sticky left-0 bg-white z-10" style={{ color: actif ? '#515792' : '#374151' }}>
                          <span className="flex items-center gap-1.5">
                            {actif && <span className="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style={{ backgroundColor: '#515792' }} />}
                            {row.label}
                          </span>
                        </td>
                        {colsOrdre.map((ci) => {
                          const v = row.vals[ci];
                          const col = COLS_COMP[ci];
                          return (
                            <td key={ci} className="px-3 py-2.5 text-center" style={{ backgroundColor: col.estBoussole ? '#51579208' : undefined }}>
                              {v === true
                                ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full" style={{ backgroundColor: '#3aab8a20' }}>
                                    <span style={{ color: '#3aab8a', fontSize: '11px', fontWeight: 'bold' }}>✓</span>
                                  </span>
                                : v === 'partiel'
                                ? <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50">
                                    <span className="text-amber-400 text-xs font-bold">~</span>
                                  </span>
                                : <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-50">
                                    <span className="text-gray-300 text-xs">✕</span>
                                  </span>
                              }
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-200" style={{ backgroundColor: '#f8f9fc' }}>
                    <td className="px-4 py-2.5 text-xs font-bold text-gray-500 uppercase tracking-wide sticky left-0" style={{ backgroundColor: '#f8f9fc' }}>Score total</td>
                    {colsOrdre.map((ci) => {
                      const col = COLS_COMP[ci];
                      const colScore = rowsAffiches.reduce((acc, row) => acc + score(row.vals[ci] as boolean | 'partiel'), 0);
                      const maxScore = rowsAffiches.length * 2;
                      return (
                        <td key={ci} className="px-3 py-2.5 text-center" style={{ backgroundColor: col.estBoussole ? col.couleur + '12' : undefined }}>
                          <span className="text-xs font-bold" style={{ color: col.couleur }}>
                            {colScore}/{maxScore}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="px-4 py-2 text-xs text-gray-400 italic border-t border-gray-100 flex items-center justify-between flex-wrap gap-2" style={{ backgroundColor: '#f8f9fc' }}>
              <span>Analyse comparative réalisée en juin 2026 · ✓ = oui · ~ = partiel · ✕ = non</span>
              <a href="/references" className="underline" style={{ color: '#515792' }}>Fiches détaillées →</a>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" size="sm" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/references">Fiches détaillées par outil <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Accès aux documents complets</h2>
          <p className="text-gray-500 mb-8">Tous les documents de recherche sont accessibles en lecture libre.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTS.map(({ titre, desc, type, href, couleur }) => (
              <Link key={href} href={href} className="block group">
                <div className="rounded-xl border border-gray-100 p-5 h-full hover:shadow-md transition-all hover:-translate-y-0.5 bg-white">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge className="text-xs" style={{ backgroundColor: couleur }}>{type}</Badge>
                    <ExternalLink className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PDFs */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Études & rapports PDF</h2>
          <p className="text-gray-500 mb-8">Les quatre études majeures qui ont nourri la recherche.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                titre: "UNESCO — Recommandation sur l'éthique de l'IA",
                desc: "Recommandation de l'UNESCO sur l'éthique de l'IA, incluant les secteurs culturels et créatifs.",
                href: "https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics",
                couleur: "#515792",
                external: true,
              },
              {
                titre: "L'IA en culture — Compétence Culture Québec 2025",
                desc: "Mieux comprendre pour agir ensemble. Grille de maturité IA pour les organisations culturelles. PDF officiel.",
                href: "https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf",
                couleur: "#E27227",
                external: true,
              },
              {
                titre: "DCTN — Empreintes Créatives Genève 2023",
                desc: "Analyse des industries culturelles et créatives en Ville de Genève. Données 2020. PDF officiel.",
                href: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf",
                couleur: "#3aab8a",
                external: true,
              },
              {
                titre: "WEF — Future of Jobs Report 2025",
                desc: "Rapport du Forum économique mondial sur l'avenir du travail et les besoins de reskilling d'ici 2030.",
                href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
                couleur: "#9b59b6",
                external: true,
              },
              {
                titre: "BCG — Flipping the Odds of Digital Transformation (2020)",
                desc: "Analyse BCG sur les facteurs de succès et d'échec des transformations numériques. Source du chiffre 70%.",
                href: "https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation",
                couleur: "#E58441",
                external: true,
              },
              {
                titre: "DCTN — Statistiques de fréquentation 2024",
                desc: "Bilan de fréquentation des musées et bibliothèques de la Ville de Genève en 2024.",
                href: "https://www.geneve.ch/document/dctn-connaissance-publics-2024-statistiques-frequentation-bref",
                couleur: "#515792",
                external: true,
              },
            ].map(({ titre, desc, href, couleur, external }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="block group">
                <div className="rounded-xl bg-white border border-gray-100 p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: couleur }}>
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{titre}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-2">{desc}</p>
                      <span className="text-xs font-semibold flex items-center gap-1" style={{ color: couleur }}>
                        Accéder à la source <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aller plus loin</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/references">Références inspirantes <ArrowRight className="ml-2 h-4 w-4" /></Link>
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

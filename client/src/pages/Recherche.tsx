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
    detail: "BCG et McKinsey convergent indépendamment sur ce chiffre : 70% des transformations numériques échouent, principalement par manque d'appropriation humaine, de stratégie claire et d'accompagnement sur la durée. McKinsey précise que seuls 30% des projets atteignent leurs objectifs et génèrent un changement durable. Le secteur culturel, avec ses structures souvent petites et sous-dotées, demande une attention particulière. Ce constat guidera les questions que la future Boussole mettra à l’essai.",
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
    detail: "L'étude Compétence Culture (Québec, novembre 2025) révèle que 55% des professionnels culturels ont du mal à identifier leurs besoins en compétences IA. Par ailleurs, 62% des organisations culturelles prévoient une adoption croissante de l'IA. Ce décalage entre l’intention et la capacité éclaire les questions que le projet doit tester. À l'échelle mondiale, le WEF 2025 estime que 59% des travailleurs auront besoin de nouvelles compétences d'ici 2030.",
    tags: ['Problématique', 'Enjeu'] as LearningTag[],
    source: 'Compétence Culture Québec, nov. 2025 · WEF Future of Jobs 2025',
    sources: [
      { label: 'L’IA en culture — Compétence Culture Québec (nov. 2025, PDF)', url: 'https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf' },
      { label: 'WEF Future of Jobs Report 2025', url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/' },
    ],
  },
  {
    id: 3,
    titre: "~2 800 structures ICC en Ville de Genève : un besoin à documenter",
    resume: "Les outils examinés visent souvent les PME généralistes ou un autre contexte culturel. Le projet doit vérifier leur pertinence pour les artistes et petites structures.",
    detail: "La Ville de Genève compte environ 2 800 établissements dans les industries culturelles et créatives (ICC) — soit plus de la moitié des 5 000 structures ICC du canton. Ces structures emploient 12 150 personnes, soit 6,6% des emplois en Ville de Genève. L’analyse comparative invite à tester si les outils de diagnostic existants répondent aux pratiques des petites structures culturelles, aux usages de l’IA et au contexte local.",
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
    detail: "Selon l'étude Compétence Culture (Québec, 2025), 62% des organisations culturelles prévoient une adoption croissante de l'IA dans leurs activités. Cette évolution soulève des questions de repères, de ressources accessibles et de formation. Par ailleurs, 59% des professionnels se dotent d'une expertise IA via des formations, mais 55% peinent à identifier leurs besoins.",
    tags: ['Opportunité', 'Perspective'] as LearningTag[],
    source: 'Compétence Culture Québec 2025',
    sources: [
      { label: 'L’IA en culture — Compétence Culture Québec (nov. 2025, PDF)', url: 'https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf' },
    ],
  },
  {
    id: 5,
    titre: "Les données culturelles demandent des repères de gouvernance",
    resume: "L’hébergement, les accès et les règles de partage des données font partie des questions à examiner avec les structures.",
    detail: "Le cadre suisse et européen de protection des données rend nécessaires des choix explicites sur l’hébergement, les accès et les usages. La future Boussole intégrera cette dimension parmi les questions à tester. Son hébergement et ses modalités de gouvernance seront documentés au fil du projet.",
    tags: ['Enjeu', 'Problématique'] as LearningTag[],
    source: 'Analyse comparative · Dossier Boussole Numérique Culture',
    sources: [
      { label: 'LPD — Loi fédérale sur la protection des données (Suisse)', url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/fr' },
      { label: 'Infomaniak — Hébergement souverain Suisse', url: 'https://www.infomaniak.com/fr/hebergement' },
    ],
  },
  {
    id: 6,
    titre: "Nos Gestes Climat : +3 millions de tests, un repère contributif",
    resume: "Un outil gratuit et ouvert peut toucher un large public. Son modèle apporte des éléments à examiner pour le secteur culturel.",
    detail: "Nos Gestes Climat (ADEME / beta.gouv.fr) a dépassé les 3 millions de tests réalisés en mai 2026 (contre 2 millions fin 2024). Sa gratuité, sa pédagogie accessible et son modèle contributif offrent des éléments de comparaison pour la future Boussole.",
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
    titre: "Les outils existants : des écarts à examiner",
    resume: "Les initiatives comparées proposent des angles utiles, tout en laissant ouvertes des questions sur le contexte local, l’IA, la langue et les petites structures.",
    detail: "L'analyse comparative de sept initiatives internationales, du Digital Culture Compass au Baromètre FWB en passant par l'Observatoire du numérique genevois, met en évidence des écarts à examiner : ancrage local, place de l’IA, langue et couverture des petites structures. La co-conception permettra de vérifier lesquels comptent le plus pour les partenaires.",
    tags: ['Problématique', 'Solution'] as LearningTag[],
    source: 'Analyse comparative Boussole · Juin 2026',
    sources: [
      { label: 'Digital Culture Compass — Arts Council England', url: 'https://digitalculturecompass.org.uk' },
      { label: 'Zelfevaluatietool meemoo — Flandre', url: 'https://meemoo.be/en/tools/digital-maturity-self-assessment-tool' },
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
    titre: "Une approche contributive et multimodale à tester",
    resume: "Co-conception, voix, texte et questionnaire sont des modalités que le projet testera avec ses partenaires.",
    detail: "Nos Gestes Climat, Wikipedia et OpenStreetMap montrent des manières différentes d’associer les personnes qui utilisent un service à son évolution. Le projet Boussole testera cette logique avec ses partenaires, à travers des temps de co-conception et des modalités de contribution à préciser.",
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
    detail: "Le rapport du Groupe d'Experts Indépendants de l'UNESCO (2025) formule des recommandations pour l'usage éthique de l'IA dans les secteurs culturels : transparence algorithmique, protection des droits d'auteur, accessibilité des outils et souveraineté des données culturelles. Ce cadre sert de référence pour les principes de gouvernance du projet.",
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
    detail: "L'étude \"L'IA en culture : Mieux comprendre pour agir ensemble\" (Compétence Culture, Québec, novembre 2025) offre une référence proche des questions que le projet souhaite explorer. Elle propose une grille d'évaluation, une méthodologie de sondage et des données comparatives sur 55% / 62% / 59% des professionnels culturels.",
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
    detail: "L'analyse de l'Observatoire du numérique genevois met en évidence le besoin de données plus fines sur le secteur culturel. Les indicateurs existants sont orientés vers les PME et les secteurs économiques traditionnels. À terme, le projet pourrait documenter des tendances sectorielles à partir de données agrégées et anonymisées, sous réserve des choix de gouvernance et de consentement.",
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

  const filtered = activeTag
    ? LEARNINGS.filter(l => l.tags.includes(activeTag))
    : LEARNINGS;

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Recherche</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Recherche & état de l'art
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            La recherche rassemble 104 sources, 4 études majeures et 15 constats documentés sur la transformation numérique culturelle.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { val: "104", label: "sources" },
              { val: "4", label: "études majeures" },
              { val: "15", label: "constats documentés" },
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
                <p>Le projet s’appuie sur une recherche documentaire consacrée à la transformation numérique dans le secteur culturel, à Genève, en Suisse, en Europe et au Québec.</p>
                <p>Cette recherche met en regard des données, des outils existants et des méthodes de contribution. Elle aide l’équipe de projet à formuler les questions qui seront mises à l’essai avec les partenaires.</p>
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
              <h2 className="text-2xl font-bold text-gray-900">15 constats documentés</h2>
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
                role="button"
                tabIndex={0}
                aria-expanded={insightOuvert === insight.id}
                aria-controls={`insight-detail-${insight.id}`}
                className="bg-white rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                onClick={() => setInsightOuvert(insightOuvert === insight.id ? null : insight.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setInsightOuvert(insightOuvert === insight.id ? null : insight.id);
                  }
                }}
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
                  <div id={`insight-detail-${insight.id}`} role="region" aria-label={`Détail de l'insight : ${insight.titre}`} className="px-5 pb-5 border-t border-gray-50">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Outils comparables & inspirations</h2>

          <p className="text-gray-600 leading-relaxed mb-8 max-w-3xl">
            Sept initiatives internationales ont été examinées, du Royaume-Uni à la Belgique, de la France à l’Union européenne. Cette comparaison aide l’équipe de projet à étayer les choix de conception de la future Boussole.
          </p>

          {/* Grille synthétique */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {[
              { nom: "Nos Gestes Climat", porteur: "ADEME / beta.gouv.fr · France", url: "https://nosgestesclimat.fr", couleur: "#3aab8a", lecon: "Gratuité + open source = adoption massive. La restitution visuelle immédiate est la clé." },
              { nom: "Digital Culture Compass", porteur: "Arts Council England · Royaume-Uni", url: "https://digitalculturecompass.org.uk", couleur: "#1a6fb5", lecon: "Niveaux d'engagement progressifs : chaque organisation entre à son rythme." },
              { nom: "Zelfevaluatietool meemoo", porteur: "meemoo · Flandre (Belgique)", url: "https://www.digitalematuriteit.be", couleur: "#2d6a4f", lecon: "La comparaison avec des pairs du même type rend les résultats vraiment actionnables." },
              { nom: "Baromètre numérique FWB", porteur: "UCLouvain · Wallonie-Bruxelles", url: "https://www.culture.be", couleur: "#c0392b", lecon: "La segmentation en personas rend les recommandations bien plus pertinentes qu'un score global." },
              { nom: "TMNlab État des lieux", porteur: "TMNlab · Ministère de la Culture · France", url: "https://www.tmnlab.com", couleur: "#8e44ad", lecon: "L'approche longitudinale (avant/après) permet de mesurer l'évolution et de créer un baromètre sectoriel." },
              { nom: "Culture Compass for Europe", porteur: "Commission européenne · UE", url: "https://culture.ec.europa.eu/policies/culture-compass", couleur: "#003399", lecon: "La Boussole s'inscrit dans les priorités européennes — un argument fort pour les financeurs." },
              { nom: "Observatoire numérique genevois", porteur: "État de Genève / DSIN", url: "https://www.ge.ch/numerique", couleur: "#E58441", lecon: "Les données locales et contextualisées créent de la confiance et de la légitimité." },
            ].map((ref, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border p-4 hover:shadow-sm transition-all"
                style={{ borderColor: ref.couleur + '30', borderLeftWidth: '3px', borderLeftColor: ref.couleur }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug">{ref.nom}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{ref.porteur}</p>
                  </div>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 p-1.5 rounded-lg hover:opacity-70 transition-colors"
                    style={{ backgroundColor: ref.couleur + '15', color: ref.couleur }}>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{ref.lecon}</p>
              </div>
            ))}
          </div>

          {/* Encart renvoi vers page Références */}
          <div className="rounded-2xl p-6 border-l-4 mb-6" style={{ backgroundColor: '#f0f1f8', borderColor: '#515792' }}>
            <h3 className="font-bold text-gray-900 mb-2">Analyse complète sur la page Références</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Chaque fiche présente la référence, ses chiffres clés, ses limites et les éléments que l’équipe de projet souhaite examiner. La page comprend aussi un tableau comparatif sur 10 critères et une section consacrée aux idées à tester pour la Boussole.
            </p>
            <Button style={{ backgroundColor: '#515792' }} asChild>
              <Link href="/references">Consulter les fiches et le tableau comparatif <ArrowRight className="ml-2 h-4 w-4" /></Link>
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

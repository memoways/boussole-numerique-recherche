import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, BookOpen, ExternalLink, Download, Filter, CalendarDays } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /ressources — Ressources documentaires
 * Accès aux documents existants, PDFs, sources
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

type ResourceType = 'Étude' | 'État des lieux' | 'Analyse' | 'Synthèse' | 'Sources' | 'PDF';
type ResourceDateGroup = '2026' | '2025' | '2024 et avant' | 'Date non indiquée';

const RESSOURCES = [
  {
    titre: "Étude complète — Transformation numérique dans la culture",
    desc: "Analyse de la transformation numérique dans le secteur culturel et créatif genevois : méthodologie, constats et questions à examiner.",
    type: "Étude" as ResourceType,
    href: "/ressources/etude-complete",
    interne: true,
    couleur: "#515792",
    temps: "15 min",
    dateGroup: "2026" as ResourceDateGroup,
    dateLabel: "Version février 2026",
  },
  {
    titre: "État des lieux — Transformation numérique dans la culture",
    desc: "Panorama de la transformation numérique dans le secteur culturel genevois : données, tendances et enjeux.",
    type: "État des lieux" as ResourceType,
    href: "/ressources/etat-des-lieux",
    interne: true,
    couleur: "#E27227",
    temps: "10 min",
    dateGroup: "Date non indiquée" as ResourceDateGroup,
    dateLabel: "Date de version non indiquée",
  },
  {
    titre: "Analyse des outils de diagnostic numérique",
    desc: "Comparaison d’outils de diagnostic numérique et des éléments qu’ils apportent à la réflexion du projet.",
    type: "Analyse" as ResourceType,
    href: "/ressources/analyse-outils",
    interne: true,
    couleur: "#3aab8a",
    temps: "8 min",
    dateGroup: "2026" as ResourceDateGroup,
    dateLabel: "Version février 2026",
  },
  {
    titre: "Synthèse des documents clés",
    desc: "Synthèse des principaux documents qui éclairent les choix de conception du projet Boussole Numérique Culture.",
    type: "Synthèse" as ResourceType,
    href: "/ressources/synthese-documents",
    interne: true,
    couleur: "#9b59b6",
    temps: "12 min",
    dateGroup: "Date non indiquée" as ResourceDateGroup,
    dateLabel: "Date de version non indiquée",
  },
  {
    titre: "Sources & références bibliographiques",
    desc: "104 sources classées par thème : transformation numérique, IA dans la culture, politiques culturelles et outils de diagnostic.",
    type: "Sources" as ResourceType,
    href: "/ressources/sources",
    interne: true,
    couleur: "#E58441",
    temps: "5 min",
    dateGroup: "Date non indiquée" as ResourceDateGroup,
    dateLabel: "Date de version non indiquée",
  },
  {
    titre: "UNESCO — Recommandation sur l'éthique de l'IA",
    desc: "Recommandation de l’UNESCO sur l’éthique de l’IA, incluant les secteurs culturels et créatifs.",
    type: "PDF" as ResourceType,
    href: "https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics",
    interne: false,
    couleur: "#515792",
    temps: "Source web",
    dateGroup: "Date non indiquée" as ResourceDateGroup,
    dateLabel: "Date non indiquée",
  },
  {
    titre: "Compétence Culture Québec — L'IA en culture 2025 (PDF officiel)",
    desc: "Étude sur l’IA en culture et grille de maturité destinée aux organisations culturelles.",
    type: "PDF" as ResourceType,
    href: "https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf",
    interne: false,
    couleur: "#E27227",
    temps: "PDF",
    dateGroup: "2025" as ResourceDateGroup,
    dateLabel: "2025",
  },
  {
    titre: "DCTN Genève — Empreintes Créatives 2023 (PDF officiel)",
    desc: "Analyse des industries culturelles et créatives en Ville de Genève : 2 800 structures, 12 150 emplois et 6,6 % des emplois.",
    type: "PDF" as ResourceType,
    href: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf",
    interne: false,
    couleur: "#3aab8a",
    temps: "PDF",
    dateGroup: "2024 et avant" as ResourceDateGroup,
    dateLabel: "2023",
  },
  {
    titre: "WEF — Future of Jobs Report 2025",
    desc: "Rapport du Forum économique mondial sur l’avenir du travail et les besoins de nouvelles compétences d’ici 2030.",
    type: "PDF" as ResourceType,
    href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
    interne: false,
    couleur: "#9b59b6",
    temps: "Source web",
    dateGroup: "2025" as ResourceDateGroup,
    dateLabel: "2025",
  },
  {
    titre: "BCG — Flipping the Odds of Digital Transformation (2020)",
    desc: "Analyse BCG sur les facteurs qui influencent les résultats des transformations numériques.",
    type: "PDF" as ResourceType,
    href: "https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation",
    interne: false,
    couleur: "#E58441",
    temps: "Source web",
    dateGroup: "2024 et avant" as ResourceDateGroup,
    dateLabel: "2020",
  },
  {
    titre: "DCTN Genève — Statistiques de fréquentation 2024",
    desc: "Bilan de fréquentation 2024 des musées et bibliothèques de la Ville de Genève, dont 1 118 340 visites dans les musées municipaux.",
    type: "PDF" as ResourceType,
    href: "https://www.geneve.ch/document/dctn-connaissance-publics-2024-statistiques-frequentation-bref",
    interne: false,
    couleur: "#515792",
    temps: "PDF",
    dateGroup: "2024 et avant" as ResourceDateGroup,
    dateLabel: "2024",
  },
];

const ALL_TYPES: ResourceType[] = ['Étude', 'État des lieux', 'Analyse', 'Synthèse', 'Sources', 'PDF'];
const ALL_DATE_GROUPS: ResourceDateGroup[] = ['2026', '2025', '2024 et avant', 'Date non indiquée'];

const TYPE_COLORS: Record<ResourceType, string> = {
  'Étude': '#515792',
  'État des lieux': '#E27227',
  'Analyse': '#3aab8a',
  'Synthèse': '#9b59b6',
  'Sources': '#E58441',
  'PDF': '#6c757d',
};

export default function Ressources() {
  const [activeType, setActiveType] = useState<ResourceType | null>(null);
  const [activeDateGroup, setActiveDateGroup] = useState<ResourceDateGroup | null>(null);

  const filtered = activeType
    ? RESSOURCES.filter(r => r.type === activeType)
    : RESSOURCES;
  const dateFiltered = activeDateGroup
    ? filtered.filter(r => r.dateGroup === activeDateGroup)
    : filtered;

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#6c757d' }}>Ressources</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Documents et sources
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            Une sélection de documents, d’études, d’analyses et de sources qui éclairent la co-conception de la Boussole.
          </p>
          <p className="text-sm text-gray-500 max-w-2xl leading-relaxed mb-6">
            Les dates correspondent à la version ou à la publication indiquée par chaque document. Lorsqu’aucune date n’est donnée dans la source, la fiche le signale.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { val: "11", label: "documents" },
              { val: "104", label: "sources" },
              { val: "6", label: "sources externes" },
            ].map(({ val, label }) => (
              <div key={label} className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
                <span className="font-extrabold text-lg" style={{ color: '#515792' }}>{val}</span>
                <span className="text-sm text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtres + liste */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="sr-only">Documents et sources</h2>
          {/* Filtres */}
          <div className="space-y-4 mb-8" aria-label="Filtres des ressources">
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">Catégorie</span>
              <button
                onClick={() => setActiveType(null)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!activeType ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={!activeType ? { backgroundColor: '#515792' } : {}}
              >
                Toutes ({RESSOURCES.length})
              </button>
              {ALL_TYPES.map(type => {
                const count = RESSOURCES.filter(r => r.type === type).length;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(activeType === type ? null : type)}
                    className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                    style={{
                      backgroundColor: activeType === type ? TYPE_COLORS[type] : TYPE_COLORS[type] + '20',
                      color: activeType === type ? 'white' : TYPE_COLORS[type],
                    }}
                  >
                    {type} ({count})
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <CalendarDays className="h-4 w-4 text-gray-400" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">Date</span>
              <button
                onClick={() => setActiveDateGroup(null)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!activeDateGroup ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                style={!activeDateGroup ? { backgroundColor: '#515792' } : {}}
              >
                Toutes les dates
              </button>
              {ALL_DATE_GROUPS.map(group => {
                const count = RESSOURCES.filter(r => r.dateGroup === group).length;
                return (
                  <button
                    key={group}
                    onClick={() => setActiveDateGroup(activeDateGroup === group ? null : group)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${activeDateGroup === group ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    style={activeDateGroup === group ? { backgroundColor: '#515792' } : {}}
                  >
                    {group} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grille de ressources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dateFiltered.map(({ titre, desc, type, href, interne, couleur, temps, dateLabel }) => (
              <div key={href} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge className="text-xs" style={{ backgroundColor: TYPE_COLORS[type] }}>{type}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{temps}</span>
                    {!interne && <ExternalLink className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                <p className="text-xs text-gray-400 mb-4">{dateLabel}</p>
                {interne ? (
                  <Link href={href} className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: couleur }}>
                    Lire le document <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: couleur }}>
                    {temps === "PDF" ? "Ouvrir le PDF" : "Ouvrir la source"} <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
            {dateFiltered.length === 0 && (
              <div className="sm:col-span-2 rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
                <p className="font-semibold text-gray-800 mb-2">Aucune ressource ne correspond à ces filtres.</p>
                <button
                  onClick={() => { setActiveType(null); setActiveDateGroup(null); }}
                  className="text-sm font-semibold text-[#515792] underline underline-offset-4"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Liens vers les pages de recherche */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explorer par thème</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/recherche", icon: BookOpen, titre: "État de l’art", desc: "15 constats documentés sur la transformation numérique culturelle.", couleur: "#515792" },
              { href: "/references", icon: FileText, titre: "Références inspirantes", desc: "Outils et démarches comparés, avec leurs apports et leurs limites.", couleur: "#E27227" },
              { href: "/methode", icon: FileText, titre: "Gouvernance et données", desc: "Principes de neutralité, code ouvert et conditions de gestion des données.", couleur: "#3aab8a" },
            ].map(({ href, icon: Icon, titre, desc, couleur }) => (
              <Link key={href} href={href} className="block group">
                <div className="rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: couleur }}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                  <span className="text-sm font-semibold flex items-center gap-1" style={{ color: couleur }}>
                    Consulter <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

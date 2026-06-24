import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, BookOpen, ExternalLink, Download, Filter } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

/**
 * Page /ressources — Ressources documentaires
 * Accès aux documents existants, PDFs, sources
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

type ResourceType = 'Étude' | 'État des lieux' | 'Analyse' | 'Synthèse' | 'Sources' | 'PDF';

const RESSOURCES = [
  {
    titre: "Étude complète — Transformation numérique dans la culture",
    desc: "Analyse approfondie de la transformation numérique dans le secteur culturel et créatif genevois. Méthodologie, constats, recommandations.",
    type: "Étude" as ResourceType,
    href: "/etude-complete",
    interne: true,
    couleur: "#515792",
    temps: "15 min",
  },
  {
    titre: "État des lieux — Transformation numérique dans la culture",
    desc: "Panorama de la transformation numérique dans le secteur culturel genevois. Données, tendances, enjeux.",
    type: "État des lieux" as ResourceType,
    href: "/etat-des-lieux",
    interne: true,
    couleur: "#E27227",
    temps: "10 min",
  },
  {
    titre: "Analyse des outils de diagnostic numérique",
    desc: "Comparaison des outils de diagnostic numérique existants : Observatoire genevois, Diag-numerique.fr, Visiativ, CMA France.",
    type: "Analyse" as ResourceType,
    href: "/analyse-outils",
    interne: true,
    couleur: "#3aab8a",
    temps: "8 min",
  },
  {
    titre: "Synthèse des documents clés",
    desc: "Synthèse des principaux documents de recherche utilisés dans le cadre du projet Boussole Numérique Culture.",
    type: "Synthèse" as ResourceType,
    href: "/synthese-documents",
    interne: true,
    couleur: "#9b59b6",
    temps: "12 min",
  },
  {
    titre: "Sources & références bibliographiques",
    desc: "104 sources documentées, classées par thème : transformation numérique, IA dans la culture, politiques culturelles, outils de diagnostic.",
    type: "Sources" as ResourceType,
    href: "/sources",
    interne: true,
    couleur: "#E58441",
    temps: "5 min",
  },
  {
    titre: "UNESCO — Recommandation sur l'éthique de l'IA",
    desc: "Recommandation de l'UNESCO sur l'éthique de l'IA, incluant les secteurs culturels et créatifs. Source officielle UNESCO.",
    type: "PDF" as ResourceType,
    href: "https://www.unesco.org/fr/artificial-intelligence/recommendation-ethics",
    interne: false,
    couleur: "#515792",
    temps: "Source web",
  },
  {
    titre: "Compétence Culture Québec — L'IA en culture 2025 (PDF officiel)",
    desc: "Mieux comprendre pour agir ensemble. Grille de maturité IA pour les organisations culturelles. Source : competenceculture.ca",
    type: "PDF" as ResourceType,
    href: "https://competenceculture.ca/wp-content/uploads/sites/2/2025/11/ia-etude-21-novembre-2025_competence_culture.pdf",
    interne: false,
    couleur: "#E27227",
    temps: "PDF",
  },
  {
    titre: "DCTN Genève — Empreintes Créatives 2023 (PDF officiel)",
    desc: "Analyse des industries culturelles et créatives en Ville de Genève. 2 800 structures, 12 150 emplois, 6,6% des emplois. Source : geneve.ch",
    type: "PDF" as ResourceType,
    href: "https://www.geneve.ch/sites/default/files/2023-06/DCTN-etude-les-empreintes-creatives-2023-geneve.pdf",
    interne: false,
    couleur: "#3aab8a",
    temps: "PDF",
  },
  {
    titre: "WEF — Future of Jobs Report 2025",
    desc: "Rapport du Forum économique mondial sur l'avenir du travail. 59% des travailleurs auront besoin de reskilling d'ici 2030.",
    type: "PDF" as ResourceType,
    href: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/",
    interne: false,
    couleur: "#9b59b6",
    temps: "Source web",
  },
  {
    titre: "BCG — Flipping the Odds of Digital Transformation (2020)",
    desc: "Source du chiffre 70% d'échec des transformations numériques. Analyse BCG sur les facteurs de succès.",
    type: "PDF" as ResourceType,
    href: "https://www.bcg.com/publications/2020/increasing-odds-of-success-in-digital-transformation",
    interne: false,
    couleur: "#E58441",
    temps: "Source web",
  },
  {
    titre: "DCTN Genève — Statistiques de fréquentation 2024",
    desc: "Bilan de fréquentation des musées et bibliothèques de la Ville de Genève en 2024. 1 118 340 visites dans les musées municipaux.",
    type: "PDF" as ResourceType,
    href: "https://www.geneve.ch/document/dctn-connaissance-publics-2024-statistiques-frequentation-bref",
    interne: false,
    couleur: "#515792",
    temps: "PDF",
  },
];

const ALL_TYPES: ResourceType[] = ['Étude', 'État des lieux', 'Analyse', 'Synthèse', 'Sources', 'PDF'];

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

  const filtered = activeType
    ? RESSOURCES.filter(r => r.type === activeType)
    : RESSOURCES;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#6c757d' }}>Ressources</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Ressources
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-6">
            Accès à l'ensemble des documents, études, analyses et sources qui nourrissent le projet Boussole Numérique Culture.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { val: "11", label: "documents" },
              { val: "104", label: "sources" },
              { val: "6", label: "sources externes vérifiées" },
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
          {/* Filtres */}
          <div className="flex flex-wrap gap-2 items-center mb-8">
            <Filter className="h-4 w-4 text-gray-400" />
            <button
              onClick={() => setActiveType(null)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${!activeType ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              style={!activeType ? { backgroundColor: '#515792' } : {}}
            >
              Tous ({RESSOURCES.length})
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

          {/* Grille de ressources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(({ titre, desc, type, href, interne, couleur, temps }) => (
              <div key={href} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge className="text-xs" style={{ backgroundColor: TYPE_COLORS[type] }}>{type}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{temps}</span>
                    {!interne && <Download className="h-3.5 w-3.5 text-gray-300" />}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 leading-snug">{titre}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{desc}</p>
                {interne ? (
                  <Link href={href} className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: couleur }}>
                    Lire <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: couleur }}>
                    Télécharger <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liens vers les pages de recherche */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Explorer par thème</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/recherche", icon: BookOpen, titre: "État de l'art", desc: "15 insights clés sur la transformation numérique culturelle.", couleur: "#515792" },
              { href: "/references", icon: FileText, titre: "Références inspirantes", desc: "Nos Gestes Climat, Skill Builder, AICred et baromètres.", couleur: "#E27227" },
              { href: "/gouvernance", icon: FileText, titre: "Gouvernance & données", desc: "Principes de neutralité, open source et hébergement souverain.", couleur: "#3aab8a" },
            ].map(({ href, icon: Icon, titre, desc, couleur }) => (
              <Link key={href} href={href} className="block group">
                <div className="rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: couleur }}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                  <span className="text-sm font-semibold flex items-center gap-1" style={{ color: couleur }}>
                    Explorer <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/logo-memoways.png" alt="Memoways" className="h-7 w-auto" />
            <span>Memoways Research · Juin 2026</span>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-600">Accueil</Link>
            <Link href="/recherche" className="hover:text-gray-600">Recherche</Link>
            <Link href="/references" className="hover:text-gray-600">Références</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

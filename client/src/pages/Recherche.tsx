import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight, BookOpen, FileText, Globe, ChevronDown, ChevronUp,
  TrendingUp, AlertTriangle, Lightbulb, Eye, Target, ExternalLink, Filter
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

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

const LEARNINGS = [
  { id: 1, titre: "70% des transformations numériques échouent", resume: "Sans accompagnement adapté ni vision partagée, la majorité des projets de transformation numérique n'atteignent pas leurs objectifs.", detail: "Les études BCG et McKinsey convergent : 70% des transformations numériques échouent, principalement par manque d'appropriation humaine, de stratégie claire et d'accompagnement sur la durée. Le secteur culturel, avec ses structures souvent petites et sous-dotées en ressources numériques, est particulièrement exposé à ce risque. La Boussole propose un point de départ diagnostique pour éviter ces écueils.", tags: ['Problématique', 'Enjeu'] as LearningTag[], source: 'BCG / McKinsey (via synthèse recherche)' },
  { id: 2, titre: "55–59% des professionnels culturels peinent à identifier leurs besoins IA", resume: "Plus de la moitié des acteurs culturels ne savent pas par où commencer face à l'IA.", detail: "L'étude Compétence Culture (Québec, 2025) révèle que 55% des professionnels culturels ont du mal à identifier leurs besoins en compétences IA. Le WEF 2025 estime que 59% des travailleurs auront besoin de reskilling d'ici 2030. Ce manque de repères est précisément ce que la Boussole cherche à combler.", tags: ['Problématique', 'Enjeu'] as LearningTag[], source: 'Compétence Culture 2025 · WEF Future of Jobs 2025' },
  { id: 3, titre: "~5 000 structures ICC à Genève, aucun outil d'auto-évaluation adapté", resume: "Les outils existants sont généralistes, coûteux ou conçus pour les PME — pas pour les artistes et petites structures culturelles.", detail: "Genève compte environ 5 000 établissements dans les industries culturelles et créatives (DCTN, 2023), dont une grande majorité de très petites structures. Les outils de diagnostic numérique existants sont conçus pour les PME généralistes, sans dimension IA et sans ancrage culturel.", tags: ['Problématique', 'Enjeu', 'Opportunité'] as LearningTag[], source: 'DCTN Empreintes Créatives 2023 · Analyse comparative' },
  { id: 4, titre: "62% des acteurs culturels prévoient une adoption croissante de l'IA", resume: "L'élan est là : la majorité des professionnels culturels anticipent d'utiliser davantage l'IA — mais sans accompagnement structuré.", detail: "Selon l'étude Compétence Culture (Québec, 2025), 62% des organisations culturelles prévoient une adoption croissante de l'IA dans leurs activités. Cet élan est réel mais non accompagné : il manque des repères, des ressources accessibles et des outils adaptés au contexte culturel local.", tags: ['Opportunité', 'Perspective'] as LearningTag[], source: 'Compétence Culture Québec 2025' },
  { id: 5, titre: "Les données culturelles sont vulnérables", resume: "Hébergement hors Europe, absence de politique de souveraineté : les structures culturelles exposent leurs données sans le savoir.", detail: "La majorité des outils utilisés par les structures culturelles genevoises hébergent les données aux États-Unis, hors du cadre légal européen. Peu de structures ont une politique de souveraineté numérique consciente. La Boussole intègre cette dimension comme l'un de ses axes d'évaluation.", tags: ['Enjeu', 'Problématique'] as LearningTag[], source: 'Analyse comparative · Dossier Boussole Numérique Culture' },
  { id: 6, titre: "Nos Gestes Climat : 2,7M tests — la preuve qu'un outil contributif change les pratiques", resume: "Un outil gratuit, pédagogue, open source et contributif peut toucher des millions de personnes.", detail: "Nos Gestes Climat (ADEME) a été réalisé 2,7 millions de fois en 3 ans. Son succès repose sur trois piliers : gratuité, pédagogie accessible et modèle contributif open source. La Boussole s'inspire directement de cette approche pour le secteur culturel genevois.", tags: ['Solution', 'Perspective'] as LearningTag[], source: 'Nos Gestes Climat · ADEME 2024' },
  { id: 7, titre: "Nouveaux financements pour la transformation numérique culturelle 2026–2028", resume: "Une fenêtre d'opportunité s'ouvre en Suisse pour des projets innovants de transformation numérique dans le secteur culturel.", detail: "L'Office fédéral de la culture (OFC) et BAK Economics ont annoncé de nouveaux financements pour la période 2026-2028 dédiés à la transformation numérique des organisations culturelles. Ce contexte favorable crée une fenêtre d'opportunité pour des projets comme la Boussole.", tags: ['Opportunité'] as LearningTag[], source: 'OFC / BAK Economics · Politique culturelle suisse 2025-2028' },
  { id: 8, titre: "Les outils existants ne parlent pas aux artistes et petites structures", resume: "Trop techniques, trop génériques, trop coûteux : les outils de diagnostic numérique actuels excluent de fait les acteurs culturels indépendants.", detail: "L'analyse comparative de 4 outils (Observatoire du numérique Genève, Diag-numerique.fr, Visiativ, CMA France) montre que tous présentent des limites rédhibitoires pour le secteur culturel : orientation commerciale, questions génériques, absence de dimension IA, interface peu accessible.", tags: ['Problématique', 'Solution'] as LearningTag[], source: 'Analyse comparative' },
  { id: 9, titre: "Le secteur culturel genevois : 6,2% des emplois, un écosystème à fort impact", resume: "La culture représente une part significative de l'économie genevoise.", detail: "Avec 6,2% des emplois genevois dans les industries culturelles et créatives, 1,5 million de visiteurs dans les musées en 2024 et 135 000 participants aux activités de médiation en 2023, le secteur culturel genevois est un pilier économique et social.", tags: ['Enjeu', 'Perspective'] as LearningTag[], source: 'Bilan 2025 · Ville de Genève 2024 · RTS 2023' },
  { id: 10, titre: "L'approche contributive et multimodale est la clé de l'adoption", resume: "Co-construire avec les usagers, proposer voix, texte et questionnaire selon le profil : c'est ce qui rend un outil vraiment accessible.", detail: "Les modèles les plus adoptés (Nos Gestes Climat, Wikipedia, OpenStreetMap) partagent un point commun : ils sont construits avec leurs utilisateurs, pas pour eux. La Boussole intègre cette logique dès le départ.", tags: ['Solution', 'Perspective', 'Opportunité'] as LearningTag[], source: 'Dossier Boussole Numérique Culture · Analyse comparative' },
  { id: 11, titre: "L'UNESCO appelle à un cadre éthique pour l'IA dans la culture", resume: "Le rapport UNESCO 2025 pose les bases d'une gouvernance responsable de l'IA dans les secteurs culturels et créatifs.", detail: "Le rapport du Groupe d'Experts Indépendants de l'UNESCO (2025) formule des recommandations claires pour l'usage éthique de l'IA dans les secteurs culturels : transparence algorithmique, protection des droits d'auteur, accessibilité des outils, et souveraineté des données culturelles.", tags: ['Enjeu', 'Perspective'] as LearningTag[], source: 'UNESCO IA et culture 2025' },
  { id: 12, titre: "Le Québec a développé une grille de maturité IA validée pour la culture", resume: "L'étude québécoise 2025 propose une méthodologie éprouvée d'évaluation de la maturité numérique et IA des organisations culturelles.", detail: "L'étude \"L'IA en culture : Mieux comprendre pour agir ensemble\" (Québec, 2025) est la référence la plus proche de ce que la Boussole veut accomplir pour Genève. Elle propose une grille d'évaluation validée sur le terrain, une méthodologie de sondage éprouvée et des données comparatives précieuses.", tags: ['Solution', 'Perspective'] as LearningTag[], source: 'Compétence Culture Québec 2025' },
  { id: 13, titre: "L'Europe documente l'adoption de l'IA dans les ICC avec des données précises", resume: "Le rapport européen 2025 fournit des données comparatives sur l'adoption de l'IA dans les industries culturelles et créatives.", detail: "Le rapport européen \"IA dans les industries culturelles : Adoption et impact en Europe\" (2025) documente les taux d'adoption de l'IA par sous-secteur culturel, les barrières identifiées et les bonnes pratiques.", tags: ['Enjeu', 'Opportunité'] as LearningTag[], source: 'Rapport européen IA et ICC 2025' },
  { id: 14, titre: "Les politiques culturelles européennes intègrent le numérique comme priorité stratégique", resume: "Le rapport européen 2024 analyse comment les politiques publiques soutiennent la transformation numérique des organisations culturelles.", detail: "L'étude \"Transformation numérique et politiques culturelles : Perspectives européennes\" (2024) analyse les dispositifs de soutien public à la numérisation culturelle dans 15 pays européens. Elle identifie les modèles les plus efficaces.", tags: ['Enjeu', 'Perspective'] as LearningTag[], source: 'Rapport européen politiques culturelles 2024' },
  { id: 15, titre: "Genève dispose d'un observatoire du numérique mais sans ancrage culturel spécifique", resume: "L'Observatoire genevois du numérique fournit des données précieuses, mais ne couvre pas les spécificités du secteur culturel.", detail: "L'analyse de l'Observatoire du numérique genevois révèle un manque de données spécifiques au secteur culturel. Les indicateurs existants sont orientés vers les PME et les secteurs économiques traditionnels. La Boussole pourrait contribuer à combler ce manque de données sectorielles.", tags: ['Enjeu', 'Opportunité'] as LearningTag[], source: 'Analyse Observatoire numérique Genève' },
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
    <div className="min-h-screen bg-white">
      <Navigation />

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
              <ul className="space-y-2 text-sm text-gray-600">
                {["UNESCO IA et culture 2025", "Compétence Culture Québec 2025", "Rapport européen ICC 2025", "Politiques culturelles Europe 2024"].map(s => (
                  <li key={s} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#515792' }}></div>
                    {s}
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
                    <p className="text-xs text-gray-400 italic">Source : {insight.source}</p>
                  </div>
                )}
              </div>
            ))}
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
              { titre: "UNESCO IA et culture 2025", desc: "Rapport du Groupe d'Experts Indépendants sur l'usage éthique de l'IA dans les secteurs culturels.", href: "/UNESCO_AI_Culture_2025.pdf", couleur: "#515792" },
              { titre: "L'IA en culture — Québec 2025", desc: "Mieux comprendre pour agir ensemble. Grille de maturité IA pour les organisations culturelles.", href: "/Quebec_IA_Culture_2025.pdf", couleur: "#E27227" },
              { titre: "IA dans les ICC — Europe 2025", desc: "Adoption et impact de l'IA dans les industries culturelles et créatives européennes.", href: "/Europe_AI_Cultural_Industries_2025.pdf", couleur: "#3aab8a" },
              { titre: "Politiques culturelles — Europe 2024", desc: "Transformation numérique et politiques culturelles : perspectives européennes.", href: "/Digital_Transformation_Cultural_Policies_Europe_2024.pdf", couleur: "#9b59b6" },
            ].map(({ titre, desc, href, couleur }) => (
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
                        Télécharger le PDF <ExternalLink className="h-3 w-3" />
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

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/logo-memoways.png" alt="Memoways" className="h-7 w-auto" />
            <span>Memoways Research · Juin 2026</span>
          </div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-gray-600">Accueil</Link>
            <Link href="/references" className="hover:text-gray-600">Références</Link>
            <Link href="/ressources" className="hover:text-gray-600">Ressources</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

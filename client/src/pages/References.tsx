import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, ChevronDown, ChevronUp, Lightbulb, Check, X, Minus } from "lucide-react";
import { Link } from "wouter";

/**
 * Page /references — Références inspirantes
 * Tableau comparatif détaillé + fiches approfondies
 * Couleurs Memoways : bleu #515792, orange #E27227
 */

// ─── Données ───────────────────────────────────────────────────────────────────

const REFERENCES = [
  {
    id: 1,
    nom: "Nos Gestes Climat",
    url: "https://nosgestesclimat.fr",
    urlBeta: "https://beta.gouv.fr/startups/nosgestesclimat.html",
    urlStats: "https://nosgestesclimat.fr/budget",
    badge: "Diagnostic ouvert · ADEME / beta.gouv.fr",
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
      { label: "Budget & impact 2025", url: "https://nosgestesclimat.fr/budget" },
      { label: "Code source (GitHub)", url: "https://github.com/incubateur-ademe/nosgestesclimat" },
    ],
  },
  {
    id: 2,
    nom: "DeepLearning.AI Skill Builder",
    url: "https://learn.deeplearning.ai",
    urlBeta: null,
    urlStats: null,
    badge: "Parcours guidé · Évaluation IA",
    couleur: "#515792",
    annee: "2023–",
    porteur: "DeepLearning.AI (Andrew Ng)",
    chiffre_cle: "Plus de 7 millions d'apprenants dans l'écosystème DeepLearning.AI",
    source_chiffre: "deeplearning.ai/about",
    url_source_chiffre: "https://www.deeplearning.ai/about/",
    ce_que_fait: "Outil d'évaluation des compétences IA pour les professionnels, avec des parcours d'apprentissage personnalisés selon le profil et le niveau. Interface fluide, progression claire, recommandations adaptées. Propose des micro-cours courts (1–2h) accessibles sans prérequis techniques.",
    ce_que_boussole_apprend: "La fluidité d'une conversation guidée, la personnalisation selon le profil, et la clarté de la progression sont des qualités essentielles. L'expérience doit donner envie de continuer. La modularité (petites étapes) réduit la friction d'entrée.",
    ce_que_boussole_fait_differemment: "La Boussole n'est pas un outil de formation. Elle ne cherche pas à enseigner, mais à rendre visible. Elle s'adresse à des non-spécialistes du numérique, pas à des professionnels de l'IA en quête de montée en compétences.",
    limites: "Orienté vers les compétences techniques en IA. Ne prend pas en compte les pratiques numériques ordinaires ni les enjeux de souveraineté ou de données. Nécessite un niveau d'anglais et de confort numérique élevé.",
    liens: [
      { label: "Site officiel", url: "https://learn.deeplearning.ai" },
      { label: "À propos de DeepLearning.AI", url: "https://www.deeplearning.ai/about/" },
      { label: "Cours courts gratuits", url: "https://www.deeplearning.ai/short-courses/" },
    ],
  },
  {
    id: 3,
    nom: "AICred",
    url: "https://aicred.ai",
    urlBeta: null,
    urlStats: null,
    badge: "Évaluation IA · Certification organisationnelle",
    couleur: "#9b59b6",
    annee: "2024–",
    porteur: "AICred (startup internationale)",
    chiffre_cle: "Outil de certification IA pour organisations — en phase de déploiement",
    source_chiffre: "aicred.ai",
    url_source_chiffre: "https://aicred.ai",
    ce_que_fait: "Outil d'évaluation de la maturité IA des organisations, avec un système de certification et de recommandations structurées. Propose un modèle d'évaluation en plusieurs dimensions (gouvernance, données, compétences, usage). Orienté vers les entreprises et les équipes techniques.",
    ce_que_boussole_apprend: "La rigueur d'un modèle d'évaluation structuré, avec des dimensions claires et des niveaux de maturité progressifs. La restitution sous forme de certification donne de la valeur au résultat et crée un référentiel partagé.",
    ce_que_boussole_fait_differemment: "La Boussole ne certifie pas. Elle ne classe pas. Elle ne vise pas les entreprises technologiques. Elle s'adresse aux structures culturelles, avec un ton bienveillant et sans enjeu de performance ou de compétition.",
    limites: "Orienté vers les organisations qui veulent valoriser leur maturité IA commercialement. Pas adapté aux petites structures culturelles, aux artistes indépendants ou aux non-spécialistes. Approche top-down.",
    liens: [
      { label: "Site officiel", url: "https://aicred.ai" },
    ],
  },
  {
    id: 4,
    nom: "Diag-numerique.fr",
    url: "https://www.diag-numerique.fr",
    urlBeta: null,
    urlStats: null,
    badge: "Baromètre · Diagnostic PME · France",
    couleur: "#E27227",
    annee: "2019–",
    porteur: "BPI France / DGE (France)",
    chiffre_cle: "Outil de référence pour les PME françaises — plusieurs dizaines de milliers d'utilisateurs",
    source_chiffre: "diag-numerique.fr",
    url_source_chiffre: "https://www.diag-numerique.fr",
    ce_que_fait: "Diagnostic numérique gratuit pour les PME françaises, en partenariat avec BPI France. Évalue le niveau de maturité numérique selon 6 thématiques (stratégie, expérience client, opérations, données, RH, cybersécurité). Restitution sous forme de score et de recommandations.",
    ce_que_boussole_apprend: "La structuration en dimensions mesurables, la comparaison avec des pairs sectoriels, et la lisibilité des résultats sont des qualités à retenir. La gratuité et le soutien institutionnel favorisent l'adoption.",
    ce_que_boussole_fait_differemment: "Diag-numerique est conçu pour les PME généralistes. Il n'intègre pas la dimension culturelle, ni les enjeux spécifiques des artistes et des petites structures. Pas de dimension IA. La Boussole comble ce vide pour le secteur culturel.",
    limites: "Orientation PME commerciale. Questions génériques non adaptées au secteur culturel. Absence de dimension IA. Interface peu engageante. Logique de lead generation.",
    liens: [
      { label: "Site officiel", url: "https://www.diag-numerique.fr" },
      { label: "Présentation BPI France", url: "https://www.bpifrance.fr/nos-solutions/accompagnement/diagnostic-numerique" },
    ],
  },
  {
    id: 5,
    nom: "Observatoire du numérique genevois",
    url: "https://www.ge.ch/numerique",
    urlBeta: null,
    urlStats: null,
    badge: "Observatoire · Données locales · Genève",
    couleur: "#E58441",
    annee: "Continu",
    porteur: "État de Genève / DSIN",
    chiffre_cle: "Données de référence sur la transformation numérique à Genève",
    source_chiffre: "ge.ch/numerique",
    url_source_chiffre: "https://www.ge.ch/numerique",
    ce_que_fait: "Observatoire cantonal qui publie des données sur l'adoption du numérique à Genève : entreprises, administrations, citoyens. Fournit des indicateurs de référence pour les politiques publiques numériques.",
    ce_que_boussole_apprend: "L'importance des données locales et contextualisées. Un observatoire ancré dans le territoire crée de la confiance et de la légitimité. La Boussole peut s'appuyer sur ces données pour contextualiser ses résultats.",
    ce_que_boussole_fait_differemment: "L'Observatoire couvre tous les secteurs économiques. Il ne dispose pas de données spécifiques au secteur culturel. La Boussole pourrait contribuer à combler ce manque en générant des données sectorielles.",
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
  "DeepLearning.AI Skill Builder": {
    gratuit: 'partiel', open_source: false, secteur_culturel: false, dimension_ia: true,
    petites_structures: 'partiel', ancrage_local: false, multimodal: false,
    restitution_visuelle: 'partiel', comparaison_pairs: false, souverainete: false,
  },
  "AICred": {
    gratuit: false, open_source: false, secteur_culturel: false, dimension_ia: true,
    petites_structures: false, ancrage_local: false, multimodal: false,
    restitution_visuelle: true, comparaison_pairs: 'partiel', souverainete: false,
  },
  "Diag-numerique.fr": {
    gratuit: true, open_source: false, secteur_culturel: false, dimension_ia: false,
    petites_structures: 'partiel', ancrage_local: 'partiel', multimodal: false,
    restitution_visuelle: true, comparaison_pairs: true, souverainete: 'partiel',
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

const OUTILS_ORDRE = ["Nos Gestes Climat", "DeepLearning.AI Skill Builder", "AICred", "Diag-numerique.fr", "Observatoire genevois", "Boussole Numérique Culture"];

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
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-12 px-4 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>Références</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Références & exemples inspirants
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl leading-relaxed">
            La Boussole ne copie aucun modèle existant. Elle assemble plusieurs inspirations : la simplicité d'un diagnostic ouvert, la fluidité d'une conversation guidée, la rigueur d'un modèle d'évaluation et l'ancrage local d'un outil conçu avec son terrain. Cette page présente les cinq références analysées, leurs forces, leurs limites — et ce qui rend la Boussole différente.
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
                <h3 className="font-bold text-gray-900 mb-2">Une approche par assemblage raisonné</h3>
                <p className="text-gray-600 leading-relaxed">Chaque référence apporte quelque chose de précis. Aucune n'est copiée. La Boussole emprunte la gratuité et l'open source à <strong>Nos Gestes Climat</strong>, la fluidité conversationnelle à <strong>Skill Builder</strong>, la rigueur structurelle à <strong>AICred</strong>, les données locales à l'<strong>Observatoire genevois</strong> — et y ajoute l'ancrage culturel sectoriel qui manque à tous.</p>
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
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-700 w-44 sticky left-0 bg-white z-10">Outil</th>
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
                className="rounded-2xl border-2 cursor-pointer transition-all hover:shadow-md bg-white"
                style={{ borderColor: refOuverte === ref.id ? ref.couleur : '#e5e7eb' }}
                onClick={() => setRefOuverte(refOuverte === ref.id ? null : ref.id)}
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
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant="outline" className="text-xs" style={{ borderColor: ref.couleur, color: ref.couleur }}>
                          {ref.badge}
                        </Badge>
                        <span className="text-xs text-gray-400">{ref.porteur} · {ref.annee}</span>
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
                  <div className="px-6 pb-6 border-t border-gray-50">
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

      {/* ── CE QUI REND LA BOUSSOLE UNIQUE ───────────────────────────────────── */}
      <section className="py-14 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Ce qui rend la Boussole unique</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { titre: "Seul outil 100% culturel", texte: "Aucune des références analysées n'est conçue spécifiquement pour les acteurs culturels. La Boussole est le premier outil de ce type pour le secteur culturel genevois.", couleur: "#515792" },
              { titre: "Dimension IA intégrée", texte: "Contrairement aux baromètres de maturité numérique existants, la Boussole intègre dès le départ une évaluation des pratiques IA — un angle absent de tous les outils sectoriels actuels.", couleur: "#E27227" },
              { titre: "Ancrage local fort", texte: "Données contextualisées pour Genève, recommandations adaptées au tissu culturel local, partenariats avec les institutions genevoises.", couleur: "#3aab8a" },
              { titre: "Multimodalité", texte: "Voix, texte, questionnaire : l'expérience s'adapte au profil et au niveau numérique de l'utilisateur. Une première dans ce type d'outil.", couleur: "#9b59b6" },
              { titre: "Gratuité & open source", texte: "Comme Nos Gestes Climat, la Boussole sera gratuite, open source et hébergée en Suisse. Aucune logique commerciale, aucune captation de données.", couleur: "#E58441" },
              { titre: "Co-construite avec le terrain", texte: "La Boussole est développée avec les structures culturelles genevoises, pas pour elles. Chaque phase intègre les retours des premiers utilisateurs.", couleur: "#515792" },
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
      <section className="py-14 px-4 bg-white">
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

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
    </div>
  );
}

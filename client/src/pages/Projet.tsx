import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ChevronDown, CheckCircle, XCircle,
  Users, Wrench, Globe, BookOpen, Shield, Lock, Zap, GitBranch,
  Heart, Database, Eye, Compass, ExternalLink, ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";

/**
 * Page /projet — Description du projet Boussole Numérique Culture
 * Structure restaurée depuis la capture d'écran (juin 2026)
 * Couleurs Memoways : bleu #515792, orange #E27227, vert #3aab8a
 */

const PROBLEMATIQUES = [
  { probleme: "Documents Word envoyés par email, 7 versions qui circulent", solution: "Un seul fichier partagé, toujours à jour, accessible à tous" },
  { probleme: "Stress de retrouver la bonne version d'un fichier", solution: "Recherche instantanée, historique des modifications visible" },
  { probleme: "Processus manuels répétitifs et fastidieux", solution: "Automatisations qui font le travail répétitif à votre place" },
  { probleme: "Communication interne fragmentée, informations perdues", solution: "Un espace de travail commun, discussions liées aux projets" },
  { probleme: "Difficulté à savoir par où commencer la transformation", solution: "Un diagnostic personnalisé qui identifie les priorités concrètes" },
  { probleme: "3 à 7 heures par semaine perdues en coordination inefficace", solution: "Ces heures rendues à la création et à la collaboration" },
];

const DIMENSIONS = [
  { icon: "🛠️", titre: "Outils & méthodes de travail", desc: "Les logiciels et méthodes utilisés au quotidien : la collaboration se fait-elle dans les fichiers ? Comment circulent les fichiers, comment sont suivis les projets ?" },
  { icon: "🎓", titre: "Compétences & culture numérique", desc: "Quel est le niveau de confiance avec les outils du numérique ? Comment les compétences internes ? L'IA a-t-elle été expérimentée ?" },
  { icon: "🗄️", titre: "Données, archivage & documentation", desc: "Est-il possible de retrouver les fichiers d'un projet d'il y a 3 ans ? Y a-t-il une politique de sauvegarde ? L'accès est-il contrôlé ?" },
  { icon: "📡", titre: "Médiation, publics & communication", desc: "Comment le numérique est-il utilisé pour rejoindre les publics ? Y a-t-il un site, une lettre d'info, une newsletter ? Les outils numériques ?" },
  { icon: "🔗", titre: "Partage & cohérence des pratiques", desc: "Les informations circulent-elles facilement au sein de la structure ? Y a-t-il un démarrage similaire ou chacun fait ce qui lui convient ?" },
];

const ETAPES_EXPERIENCE = [
  {
    num: 1,
    couleur: "#515792",
    titre: "La Photo",
    duree: "10–15 min · Quiz d'exploration",
    desc: "Un questionnaire adaptatif qui explore vos pratiques numériques en 5 dimensions. Pas de jargon, pas de piège. Juste des situations concrètes du quotidien.",
  },
  {
    num: 2,
    couleur: "#3aab8a",
    titre: "Le Panorama",
    duree: "Restitution visuelle immersive",
    desc: "Une carte radar de vos pratiques, lisible en un coup d'œil. Vous voyez immédiatement où vous êtes à l'aise, où se trouvent les frictions, et ce qui mérite attention.",
  },
  {
    num: 3,
    couleur: "#E27227",
    titre: "L'Approfondissement",
    duree: "Avec compte détaillé · Suivi dans le temps",
    desc: "Un dialogue guidé par IA pour explorer les priorités identifiées. Des ressources concrètes, calibrées à votre contexte. Un suivi dans le temps pour mesurer les progrès.",
  },
];

const COMPARATIF_CRITERES = [
  { label: "Adapté au secteur culturel", chatgpt: false as const, audit: "partial" as const, formation: false as const, boussole: "Conçu pour la réalité genevoise" },
  { label: "Accessible sans expertise technique", chatgpt: false as const, audit: "partial" as const, formation: "partial" as const, boussole: "Aucun prérequis numérique" },
  { label: "Gratuit", chatgpt: false as const, audit: false as const, formation: false as const, boussole: "Gratuit à vie" },
  { label: "Données hébergées en Suisse", chatgpt: false as const, audit: "partial" as const, formation: "partial" as const, boussole: "Infomaniak, Suisse" },
  { label: "Restitution visuelle personnalisée", chatgpt: false as const, audit: "partial" as const, formation: false as const, boussole: "Radar + synthèse" },
  { label: "Mode collaboratif", chatgpt: false as const, audit: false as const, formation: false as const, boussole: "Agrégation collective" },
  { label: "Recommandations vers l'écosystème local", chatgpt: false as const, audit: false as const, formation: false as const, boussole: "Ressources genevoises" },
];

const PRINCIPES = [
  { icon: Heart, titre: "Gratuit", desc: "L'outil restera gratuit pendant à moins trois premières années d'exploitation.", couleur: "#515792" },
  { icon: Database, titre: "Données souveraines", desc: "Hébergement en Suisse (Infomaniak), base de données en Europe. Vos données ne quittent pas le cadre légal européen.", couleur: "#3aab8a" },
  { icon: Lock, titre: "Confidentialité", desc: "Les informations saisies ne peuvent être lues que par la personne qui remplit les cases.", couleur: "#E27227" },
  { icon: Shield, titre: "Neutralité", desc: "Les recommandations ne pointent jamais vers aucun service lié à une prestation commerciale particulière.", couleur: "#9b59b6" },
  { icon: GitBranch, titre: "Open source", desc: "Le code est publié sur GitHub. D'autres villes ou cantons peuvent le reprendre et l'adapter à leur contexte.", couleur: "#7ab648" },
  { icon: Users, titre: "Approche contributive", desc: "Les structures culturelles genevoises participent dès la définition des indicateurs et à l'enrichissement des recommandations.", couleur: "#E58441" },
];

const PHASES_CALENDRIER = [
  { num: "A", mois: "Mois 1–3", titre: "MVP", couleur: "#515792", items: ["Questionnaire adaptatif (5 dimensions)", "Saisie vocale", "Restitution visuelle (radar + synthèse)", "Export PDF", "Mode conversationnel guidé"] },
  { num: "B", mois: "Mois 4", titre: "Beta test", couleur: "#3aab8a", items: ["Tests avec structures culturelles pilotes genevoises", "Ajustements UX et formulations", "Mise en place de l'annuaire de ressources"] },
  { num: "C", mois: "Mois 5–8", titre: "Version 2", couleur: "#E27227", items: ["Mode structure collaboratif (multi-répondants + synthèse collective)", "Upload de documents", "Enrichissement de la base de ressources"] },
  { num: "D", mois: "Mois 9–24", titre: "Exploitation & amélioration continue", couleur: "#9b59b6", items: ["Comparaison anonymisée avec la moyenne des répondants", "Optimisations continues", "Extension des partenariats", "Objectif : 500 utilisateurs inscrits"] },
];

const OBJECTIFS = [
  "500 utilisateurs inscrits, dont 50% utilisent l'outil régulièrement",
  "Un relai actif par les partenaires institutionnels genevois",
  "Une base de connaissances enrichie par la communauté et les retours d'usage",
  "Des données anonymisées permettant un diagnostic de l'écosystème culturel genevois",
];

const SECTIONS = [
  { id: "intention", label: "Note d'intention" },
  { id: "contexte", label: "Le contexte" },
  { id: "proposition", label: "La proposition" },
  { id: "collaboratif", label: "Mode collaboratif" },
  { id: "positionnement", label: "Positionnement" },
  { id: "principes", label: "Principes fondateurs" },
  { id: "architecture", label: "Architecture technique" },
  { id: "calendrier", label: "Calendrier" },
  { id: "objectifs", label: "Objectifs à 2 ans" },
];

type CellVal = boolean | "partial";

function CellIcon({ val }: { val: CellVal }) {
  if (val === true) return <CheckCircle className="h-4 w-4 mx-auto" style={{ color: '#3aab8a' }} />;
  if (val === "partial") return <span className="text-gray-400 text-xs block text-center">—</span>;
  return <XCircle className="h-4 w-4 mx-auto" style={{ color: '#ef4444' }} />;
}

export default function Projet() {
  const [etapeOuverte, setEtapeOuverte] = useState<number | null>(0);
  const [phaseOuverte, setPhaseOuverte] = useState<number | null>(null);
  const [archOpen, setArchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("intention");

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-10 px-4" style={{ background: 'linear-gradient(160deg, #f4f5fb 0%, #fdf6f0 60%, #f4f5fb 100%)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-gray-600 flex items-center gap-1">
              <ArrowLeft className="h-3 w-3" />Retour à l'accueil
            </Link>
            <span>/</span>
            <Badge className="text-xs" style={{ backgroundColor: '#515792' }}>Dossier de projet</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            <span className="text-gray-500 font-normal text-xl sm:text-2xl block mb-1">Description du projet</span>
            <span style={{
              background: 'linear-gradient(90deg, #515792 0%, #3a7fc1 25%, #3aab8a 50%, #7ab648 70%, #E27227 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Boussole Numérique Culture
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Un outil web gratuit pour aider les acteurs culturels genevois à évaluer leurs pratiques numériques, identifier leurs priorités et cheminer vers de meilleures façons de travailler — sans expertise technique préalable.
          </p>
        </div>
      </section>

      {/* ── LAYOUT PRINCIPAL : sidebar + contenu ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-10 flex gap-10">

        {/* Sidebar sommaire (desktop) */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="sticky top-24">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Sommaire</p>
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="block w-full text-left text-xs px-3 py-1.5 rounded-lg transition-all duration-150"
                  style={{
                    backgroundColor: activeSection === s.id ? '#51579215' : 'transparent',
                    color: activeSection === s.id ? '#515792' : '#6b7280',
                    fontWeight: activeSection === s.id ? 600 : 400,
                    borderLeft: activeSection === s.id ? '3px solid #515792' : '3px solid transparent',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 min-w-0 space-y-20">

          {/* ── 1. NOTE D'INTENTION ─────────────────────────────────────────── */}
          <section id="intention">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Note d'intention</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Un outil pour voir où l'on en est</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La <strong className="text-gray-900">Boussole Numérique Culture</strong> est une application web interactive et gratuite qui permet aux actrices et acteurs culturels genevois de faire un état des lieux de leurs usages numériques — ce qui fonctionne, ce qui coince, les envies, les besoins, les questionnements — puis de recevoir un accompagnement conversationnel personnalisé pour cheminer vers de meilleures pratiques numériques.
              </p>
              <p>
                L'outil repose sur un questionnaire adaptatif d'une dizaine de minutes, suivi d'une restitution visuelle et d'un dialogue guidé par une intelligence artificielle spécialement conçue pour la réalité du secteur culturel. Ce n'est ni un audit, ni un cours, ni un chatbot généraliste : c'est un <strong className="text-gray-900">miroir lucide et bienveillant</strong>, conçu pour aider chacun et chacune à identifier les endroits précis où un petit changement pourrait avoir un vrai impact sur leur quotidien de travail.
              </p>
              <p>
                Le projet émane de <strong className="text-gray-900">Memoways</strong>, agence genevoise spécialisée dans la transformation numérique des organisations culturelles et créatives, forte de plus de trente ans de pratique professionnelle au cœur de l'écosystème culturel genevois et suisse.
              </p>
            </div>
            <blockquote className="mt-6 pl-4 border-l-4 italic text-gray-500" style={{ borderColor: '#515792' }}>
              "Ce qu'on peut évaluer, on peut l'améliorer — et l'amélioration se mesure."
            </blockquote>
          </section>

          {/* ── 2. CONTEXTE ─────────────────────────────────────────────────── */}
          <section id="contexte">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>Le contexte</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Des pratiques numériques qui coûtent cher en énergie créative</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Dans de nombreuses structures culturelles, une part importante de l'énergie créative se dissipe dans des pratiques numériques inadéquates. Des fichiers qui circulent par email en plusieurs versions, des projets suivis sur des tableaux bricolés, des équipes qui passent plus de temps à se coordonner qu'à créer. Ce n'est pas la faute de personne — c'est un angle mort collectif.
              </p>
              <p>
                Ce qui a changé, c'est qu'aujourd'hui, les conditions sont réunies pour agir. L'intelligence artificielle conversationnelle a atteint un niveau de maturité qui permet de créer des outils d'accompagnement véritablement personnalisés, à un coût accessible.
              </p>
            </div>

            {/* Schéma interactif : problématiques */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: '#f8f9fc' }}>
                <Compass className="h-4 w-4" style={{ color: '#515792' }} />
                <span className="text-sm font-semibold text-gray-700">Schéma : Problématiques fréquentes et leur résolution</span>
              </div>
              <div className="grid grid-cols-2 text-xs font-bold uppercase tracking-widest">
                <div className="px-5 py-2.5 text-white" style={{ backgroundColor: '#ef4444' }}>Situation actuelle fréquente</div>
                <div className="px-5 py-2.5 text-white" style={{ backgroundColor: '#3aab8a' }}>✓ Avec les bons outils et pratiques</div>
              </div>
              {PROBLEMATIQUES.map((p, i) => (
                <div key={i} className="grid grid-cols-2 border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="px-5 py-3 text-sm text-gray-600 flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#ef444460' }}>✕</span>
                    {p.probleme}
                  </div>
                  <div className="px-5 py-3 text-sm text-gray-700 flex items-start gap-2 border-l border-gray-100">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#3aab8a' }}>→</span>
                    {p.solution}
                  </div>
                </div>
              ))}
              <div className="px-5 py-3 text-xs text-gray-400 italic border-t border-gray-100" style={{ backgroundColor: '#f8f9fc' }}>
                Les problématiques ont été identifiées lors d'entretiens menés avec des structures culturelles genevoises. La Boussole aide à les diagnostiquer et à prioriser les améliorations.
              </div>
            </div>
          </section>

          {/* ── 3. LA PROPOSITION ───────────────────────────────────────────── */}
          <section id="proposition">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#3aab8a' }}>La proposition</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Ce que fait la Boussole, concrètement</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              La Boussole Numérique Culture est une application web gratuite qui propose une <strong className="text-gray-900">expérience conversationnelle guidée</strong> — pas un formulaire classique, mais un dialogue structuré avec un agent intelligent spécialement conçu pour le secteur culturel. L'application finale évoluera au fil des discussions avec les partenaires, des expérimentations techniques et des retours des premières structures pilotes. C'est dans la nature même du projet — un outil vivant, qui se construit en dialogue avec ses futurs utilisateurs.
            </p>

            {/* Les 5 dimensions */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">Les 5 dimensions évaluées</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {DIMENSIONS.map((d, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{d.icon}</span>
                    <h4 className="font-semibold text-sm text-gray-900 group-hover:text-[#515792] transition-colors">{d.titre}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-gray-200 p-4 flex items-center justify-center text-center">
                <p className="text-xs text-gray-400 italic leading-relaxed">Les questions s'appuient sur des micro-scénarios réalistes du "quotidien culturel" — pas de jargon technique.</p>
              </div>
            </div>

            {/* Les 3 temps de l'expérience */}
            <h3 className="text-lg font-bold text-gray-900 mb-2">Les 3 temps de l'expérience — Parcours utilisateur</h3>
            <p className="text-xs text-gray-400 mb-5">De la première saisie à l'accompagnement dans la durée</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { label: "Mode individuel", sub: "Artiste, freelance, créateur·trice", couleur: "#515792" },
                { label: "Mode structure", sub: "Compagnie, association, fondation", couleur: "#E27227" },
              ].map((m) => (
                <div key={m.label} className="rounded-xl border-2 p-4 text-center" style={{ borderColor: m.couleur + '40', backgroundColor: m.couleur + '08' }}>
                  <p className="font-bold text-sm" style={{ color: m.couleur }}>{m.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{m.sub}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {ETAPES_EXPERIENCE.map((e, i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 overflow-hidden transition-all duration-200 cursor-pointer"
                  style={{ borderColor: etapeOuverte === i ? e.couleur : '#e5e7eb' }}
                  onClick={() => setEtapeOuverte(etapeOuverte === i ? null : i)}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: e.couleur }}>
                      {e.num}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{e.titre}</p>
                      <p className="text-xs text-gray-400">{e.duree}</p>
                    </div>
                    <div className="transition-transform duration-200" style={{ transform: etapeOuverte === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {etapeOuverte === i && (
                    <div className="px-5 pb-4 border-t" style={{ borderColor: e.couleur + '20', backgroundColor: e.couleur + '05' }}>
                      <p className="text-sm text-gray-600 leading-relaxed pt-3">{e.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 italic">Depuis la première étape, l'expérience est conçue pour être accessible sans aucune compétence technique préalable.</p>
          </section>

          {/* ── 4. MODE COLLABORATIF ────────────────────────────────────────── */}
          <section id="collaboratif">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#9b59b6' }}>Mode collaboratif</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Donner la parole à toute une équipe</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Pour les compagnies, associations et collectifs, la Boussole propose un <strong className="text-gray-900">mode collaboratif</strong>. Plusieurs personnes de la même structure répondent individuellement au questionnaire.
                </p>
                <p>
                  L'IA synthétise l'ensemble de manière structurée et actionnable — une <strong className="text-gray-900">carte des perceptions croisées</strong> qui révèle les consensus au sein de la structure ainsi que les points de friction. Des priorités partagées émergent pour guider les décisions qu'aucun entretien individuel n'aurait fait émerger seul.
                </p>
              </div>
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fdf3ec', borderLeft: '4px solid #E27227' }}>
                <p className="text-sm font-bold mb-4" style={{ color: '#E27227' }}>Comment ça marche en mode structure</p>
                <ol className="space-y-3">
                  {[
                    "Chaque membre de l'équipe répond individuellement (10–15 min)",
                    "Les réponses sont agrégées et analysées par IA",
                    "Une synthèse collective est générée : consensus et points de friction",
                    "Des priorités partagées émergent pour guider les décisions",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#E27227' }}>{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* ── 5. POSITIONNEMENT ───────────────────────────────────────────── */}
          <section id="positionnement">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Positionnement</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">La Boussole face aux autres solutions</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Pourquoi créer un nouvel outil alors qu'il en existe déjà ? Parce qu'aucun ne répond aux besoins spécifiques des acteurs culturels genevois.
            </p>

            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fc' }}>
                      <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Critère</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">ChatGPT / IA généraliste</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Audit externe</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Formation en ligne</th>
                      <th className="px-4 py-3 text-center text-xs font-bold" style={{ color: '#515792', backgroundColor: '#51579210' }}>Boussole ✓</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARATIF_CRITERES.map((c, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-700 font-medium text-xs">{c.label}</td>
                        <td className="px-4 py-3 text-center"><CellIcon val={c.chatgpt} /></td>
                        <td className="px-4 py-3 text-center"><CellIcon val={c.audit} /></td>
                        <td className="px-4 py-3 text-center"><CellIcon val={c.formation} /></td>
                        <td className="px-4 py-3 text-center" style={{ backgroundColor: '#51579208' }}>
                          <div className="flex flex-col items-center gap-0.5">
                            <CheckCircle className="h-4 w-4" style={{ color: '#3aab8a' }} />
                            <span className="text-xs text-gray-400">{c.boussole}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-2 text-xs text-gray-400 italic border-t border-gray-100" style={{ backgroundColor: '#f8f9fc' }}>
                — Tableau basé sur une analyse de février 2026.
              </div>
            </div>
          </section>

          {/* ── 6. PRINCIPES FONDATEURS ─────────────────────────────────────── */}
          <section id="principes">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#7ab648' }}>Un projet de service public</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Nos principes fondateurs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRINCIPES.map(({ icon: Icon, titre, desc, couleur }) => (
                <div key={titre} className="rounded-xl border border-gray-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ backgroundColor: couleur + '15' }}>
                    <Icon className="h-5 w-5" style={{ color: couleur }} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{titre}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 7. ARCHITECTURE TECHNIQUE ───────────────────────────────────── */}
          <section id="architecture">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E58441' }}>Architecture technique</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Comment la Boussole est construite</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              La Boussole repose sur une architecture technique moderne, choisie pour garantir la <strong className="text-gray-900">souveraineté des données</strong>, la <strong className="text-gray-900">transparence</strong> du modèle d'évaluation et la <strong className="text-gray-900">pérennité</strong> de l'outil. Chaque composant a été sélectionné pour ses qualités en matière de confidentialité et d'hébergement européen ou suisse.
            </p>

            <button
              className="w-full rounded-xl border-2 border-dashed p-4 flex items-center justify-between hover:border-gray-300 transition-colors"
              style={{ borderColor: archOpen ? '#515792' : '#e5e7eb', backgroundColor: archOpen ? '#51579208' : 'white' }}
              onClick={() => setArchOpen(!archOpen)}
            >
              <div className="flex items-center gap-3 flex-wrap">
                <Badge className="text-xs" style={{ backgroundColor: '#515792' }}>Technique</Badge>
                <span className="text-sm font-semibold text-gray-700">Architecture de la Boussole — Vue d'ensemble</span>
                <span className="text-xs text-gray-400 hidden sm:inline">Appuyez sur chaque composant pour comprendre son rôle en langage simple</span>
              </div>
              <div className="transition-transform duration-200 flex-shrink-0" style={{ transform: archOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </button>

            {archOpen && (
              <div className="mt-4 rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100" style={{ backgroundColor: '#f0f1f8' }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: '#515792' }}>Interface utilisateur (ce que vous voyez)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { titre: "Interface web", sub: "React + Tailwind" },
                      { titre: "Saisie vocale", sub: "Futur · 1 minute" },
                      { titre: "Design adaptatif", sub: "Mobile & desktop" },
                    ].map((c) => (
                      <div key={c.titre} className="bg-white rounded-lg p-3 text-center border border-gray-100">
                        <p className="text-xs font-bold text-gray-800">{c.titre}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-b border-gray-100" style={{ backgroundColor: '#fdf3ec' }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: '#E27227' }}>Intelligence artificielle (le cerveau)</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { titre: "Agent IA", sub: "Conversation guidée" },
                      { titre: "Base de ressources", sub: "FAQ · recommandations" },
                      { titre: "Modèle de scoring", sub: "Pondéré · transparent" },
                    ].map((c) => (
                      <div key={c.titre} className="bg-white rounded-lg p-3 text-center border border-orange-100">
                        <p className="text-xs font-bold text-gray-800">{c.titre}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-b border-gray-100" style={{ backgroundColor: '#f0faf6' }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-center mb-3" style={{ color: '#3aab8a' }}>Données & hébergement (Suisse)</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { titre: "Serveur Infomaniak", sub: "Hébergé en Suisse 🇨🇭" },
                      { titre: "Base de données", sub: "Suisse · Europe 🇪🇺" },
                    ].map((c) => (
                      <div key={c.titre} className="bg-white rounded-lg p-3 text-center border border-green-100">
                        <p className="text-xs font-bold text-gray-800">{c.titre}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{c.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4" style={{ backgroundColor: '#f8f9fc' }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-center mb-3 text-gray-500">Transparence & partage</p>
                  <div className="bg-white rounded-lg p-3 text-center border border-gray-100">
                    <p className="text-xs font-bold text-gray-800">Code open source sur GitHub</p>
                    <p className="text-xs text-gray-400 mt-0.5">Vérifiable · Forquable · Améliorable par tous</p>
                  </div>
                  <p className="text-xs text-gray-400 italic mt-3 text-center">Toutes les données personnelles restent en Suisse ou en Europe. Aucune donnée ne sera vendue ni transmise à des commerciaux.</p>
                </div>
              </div>
            )}
          </section>

          {/* ── 8. CALENDRIER ───────────────────────────────────────────────── */}
          <section id="calendrier">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#9b59b6' }}>Calendrier</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Développement en 4 phases sur 2 ans</h2>
            <div className="space-y-3">
              {PHASES_CALENDRIER.map((phase, i) => (
                <div
                  key={i}
                  className="rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-200"
                  style={{ borderColor: phaseOuverte === i ? phase.couleur : '#e5e7eb' }}
                  onClick={() => setPhaseOuverte(phaseOuverte === i ? null : i)}
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ backgroundColor: phase.couleur }}>
                      {phase.num}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-medium" style={{ color: phase.couleur }}>{phase.mois}</span>
                      <p className="font-bold text-gray-900 text-sm">{phase.titre}</p>
                    </div>
                    <div className="transition-transform duration-200 flex-shrink-0" style={{ transform: phaseOuverte === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  {phaseOuverte === i && (
                    <div className="px-5 pb-4 border-t" style={{ borderColor: phase.couleur + '20', backgroundColor: phase.couleur + '05' }}>
                      <ul className="mt-3 space-y-1.5">
                        {phase.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: phase.couleur }}></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Button variant="outline" size="sm" className="text-xs" style={{ borderColor: '#515792', color: '#515792' }} asChild>
                <Link href="/timeline">Voir le calendrier détaillé <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </section>

          {/* ── 9. OBJECTIFS À 2 ANS ────────────────────────────────────────── */}
          <section id="objectifs">
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>Impact</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Objectifs à deux ans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#f0f1f8' }}>
                <ul className="space-y-3">
                  {OBJECTIFS.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#515792' }} />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6" style={{ backgroundColor: '#fdf3ec', borderLeft: '4px solid #E27227' }}>
                <p className="text-sm font-bold mb-3" style={{ color: '#E27227' }}>Et au-delà de Genève</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Si les retours sont positifs, des financements complémentaires permettront d'étendre l'outil en Suisse romande.</p>
                  <p>Le code étant open source, d'autres villes ou cantons pourront le reprendre et l'adapter à leur contexte.</p>
                  <p className="italic text-gray-500">Servir un portail de service public qui investit sur le long terme dans l'outillage des acteurs culturels sous cette forme.</p>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4" style={{ backgroundColor: '#f8f9fc' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Vous souhaitez en savoir plus ou participer ?</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            La Boussole se construit en dialogue avec ses futurs utilisateurs. Structures culturelles genevoises, partenaires institutionnels, acteurs de l'écosystème numérique — toutes les contributions sont bienvenues.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#E27227' }} asChild>
              <Link href="/partenaires">Nous contacter <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

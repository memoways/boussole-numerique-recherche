import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, ChevronDown, CheckCircle, XCircle,
  Shield, Lock, GitBranch, Users,
  Heart, Database, Compass, ExternalLink
} from "lucide-react";
import { Link } from "wouter";

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
  { icon: "🛠️", titre: "Outils et manières de travailler", desc: "Les logiciels et méthodes utilisés au quotidien : la collaboration se fait-elle dans les fichiers ? Comment circulent les fichiers, comment sont suivis les projets ?" },
  { icon: "🎓", titre: "Compétences et culture numérique", desc: "Quel est le niveau de confiance avec les outils du numérique ? Comment les compétences internes ? L'IA a-t-elle été expérimentée ?" },
  { icon: "🗄️", titre: "Données, archivage et documentation", desc: "Est-il possible de retrouver les fichiers d'un projet d'il y a 3 ans ? Y a-t-il une politique de sauvegarde ? L'accès est-il contrôlé ?" },
  { icon: "📡", titre: "Médiation, publics et communication numérique", desc: "Comment le numérique est-il utilisé pour rejoindre les publics ? Y a-t-il un site, une lettre d'info, une newsletter ? Les outils numériques ?" },
  { icon: "🔗", titre: "Partage, circulation et cohérence des pratiques", desc: "Les informations circulent-elles facilement au sein de la structure ? Y a-t-il un démarrage similaire ou chacun fait ce qui lui convient ?" },
];

const ETAPES_EXPERIENCE = [
  {
    num: 1,
    couleur: "#515792",
    titre: "La Photo",
    duree: "10–15 min · Questionnaire adaptatif",
    desc: "Un questionnaire adaptatif qui explore vos pratiques numériques en 5 dimensions. Les questions s'ajustent selon vos réponses précédentes. Pas de jargon, pas de piège — juste des situations concrètes du quotidien.",
  },
  {
    num: 2,
    couleur: "#3aab8a",
    titre: "Le Panorama",
    duree: "Restitution visuelle immersive",
    desc: "Une carte radar de vos pratiques, lisible en un coup d'œil. Vous voyez immédiatement où vous êtes à l'aise, où se trouvent les frictions, et ce qui mérite attention. Les pistes d'action sont organisées en trois horizons : gestes rapides à mettre en place en quelques jours, chantiers de fond à ouvrir sur quelques mois, et ambitions à plus long terme.",
  },
  {
    num: 3,
    couleur: "#E27227",
    titre: "L'Approfondissement",
    duree: "Avec inscription · Suivi dans le temps",
    desc: "Un dialogue guidé par IA pour explorer les priorités identifiées. Des ressources concrètes, calibrées à votre contexte et à l'écosystème genevois. Un suivi dans le temps pour mesurer les progrès.",
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



const OBJECTIFS = [
  "1 500 tests réalisés",
  "600 utilisateurs inscrits, dont 30 % utilisant l'outil de manière régulière",
  "Un relai actif par les partenaires institutionnels genevois",
  "Une base de connaissances enrichie par la communauté et les retours d'usage",
  "Des données anonymisées permettant de mesurer l'état réel des pratiques numériques du secteur culturel genevois",
  "Un diagnostic d'écosystème qui n'existe nulle part aujourd'hui",
];

const INSPIRATIONS = [
  {
    id: 1,
    nom: "Nos Gestes Climat",
    url: "https://nosgestesclimat.fr",
    porteur: "ADEME / beta.gouv.fr · France",
    couleur: "#3aab8a",
    chiffre: "> 3 millions de tests",
    lecon: "Gratuité + open source = adoption massive. La restitution visuelle immédiate est la clé de l'engagement.",
  },
  {
    id: 2,
    nom: "Digital Culture Compass",
    url: "https://digitalculturecompass.org.uk",
    porteur: "Arts Council England · Royaume-Uni",
    couleur: "#1a6fb5",
    chiffre: "Référence mondiale pour la culture",
    lecon: "Niveaux d'engagement progressifs (Charte → Wayfinder → Tracker) : chaque organisation entre à son rythme.",
  },
  {
    id: 3,
    nom: "Zelfevaluatietool meemoo",
    url: "https://www.digitalematuriteit.be",
    porteur: "meemoo · Flandre (Belgique)",
    couleur: "#2d6a4f",
    chiffre: "47 affirmations · 5 catégories",
    lecon: "La comparaison avec des pairs du même type est ce qui rend les résultats vraiment actionnables.",
  },
  {
    id: 4,
    nom: "Baromètre numérique FWB",
    url: "https://www.culture.be",
    porteur: "UCLouvain · Wallonie-Bruxelles",
    couleur: "#c0392b",
    chiffre: "401 opérateurs enquêtés · 5 personas",
    lecon: "La segmentation en personas rend les recommandations bien plus pertinentes qu'un score global.",
  },
  {
    id: 5,
    nom: "TMNlab État des lieux",
    url: "https://www.tmnlab.com",
    porteur: "TMNlab · Ministère de la Culture · France",
    couleur: "#8e44ad",
    chiffre: "2 enquêtes nationales (2016 & 2021)",
    lecon: "L'approche longitudinale (avant/après) permet de mesurer l'évolution et de créer un baromètre sectoriel.",
  },
  {
    id: 6,
    nom: "Culture Compass for Europe",
    url: "https://culture.ec.europa.eu/policies/culture-compass",
    porteur: "Commission européenne · UE",
    couleur: "#003399",
    chiffre: "20 actions phares · Cadre 2025–2030",
    lecon: "La Boussole s'inscrit dans les priorités européennes de transformation numérique culturelle — un argument fort pour les financeurs.",
  },
];

const SECTIONS = [
  { id: "intention", label: "Note d'intention" },
  { id: "contexte", label: "Le contexte" },
  { id: "proposition", label: "La proposition" },
  { id: "collaboratif", label: "Mode collaboratif" },
  { id: "positionnement", label: "Positionnement" },
  { id: "inspirations", label: "Exemples comparables" },
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
  const [archOpen, setArchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("intention");
  const [readingProgress, setReadingProgress] = useState(0);
  // Ref pour bloquer temporairement l'observer après un clic (évite le flash)
  const scrollingRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // IntersectionObserver : met à jour activeSection quand une section entre dans le viewport
  useEffect(() => {
    const sectionIds = SECTIONS.map((s) => s.id);
    const observers: IntersectionObserver[] = [];

    // On garde une map de visibilité pour choisir la section la plus haute visible
    const visibilityMap: Record<string, boolean> = {};

    const pickActive = () => {
      if (scrollingRef.current) return;
      // Parcourir les sections dans l'ordre du document et prendre la première visible
      for (const id of sectionIds) {
        if (visibilityMap[id]) {
          setActiveSection(id);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap[entry.target.id] = entry.isIntersecting;
        });
        pickActive();
      },
      {
        // rootMargin : on déclenche quand la section entre dans la zone 80px–50% du viewport
        rootMargin: "-80px 0px -50% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  // Progression de lecture basée sur le début et la fin du contenu du projet.
  useEffect(() => {
    const updateProgress = () => {
      const first = document.getElementById(SECTIONS[0].id);
      const last = document.getElementById(SECTIONS[SECTIONS.length - 1].id);
      if (!first || !last) return;

      const start = first.getBoundingClientRect().top + window.scrollY - 160;
      const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 160;
      const ratio = end > start ? ((window.scrollY - start) / (end - start)) * 100 : 0;
      setReadingProgress(Math.max(0, Math.min(100, Math.round(ratio))));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // Bloquer l'observer pendant le scroll animé pour éviter les sauts
      scrollingRef.current = true;
      setActiveSection(id);
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const offset = isMobile ? 136 : 96;
      const targetY = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        scrollingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="pt-20 sm:pt-24 pb-10 px-4" style={{ background: 'linear-gradient(160deg, #f4f5fb 0%, #fdf6f0 60%, #f4f5fb 100%)' }}>
        <div className="max-w-5xl mx-auto">
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
            Un projet en co-conception pour concevoir un outil web gratuit qui aidera les actrices et acteurs culturels à situer leurs pratiques numériques et à choisir leurs priorités.
          </p>
        </div>
      </section>

      {/* Sommaire mobile : reste sous la navigation lorsque l'on parcourt le contenu. */}
      <div className="lg:hidden sticky top-16 z-30 border-y border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-2">
          <div className="relative">
            <label htmlFor="projet-sections" className="sr-only">Aller à une section du projet</label>
            <select
              id="projet-sections"
              value={activeSection}
              onChange={(event) => scrollTo(event.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-9 text-sm font-semibold text-[#515792] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#515792]"
            >
              {SECTIONS.map((section) => (
                <option key={section.id} value={section.id}>{section.label}</option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#515792]" />
          </div>
        </div>
      </div>

      {/* ── LAYOUT PRINCIPAL : sidebar + contenu ─────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 py-10 flex gap-10">

        {/* Sidebar sommaire (desktop) */}
        <aside className="hidden lg:block w-52 flex-shrink-0 self-stretch">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Sommaire</p>
            <nav className="space-y-1" aria-label="Sommaire du projet">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  aria-current={activeSection === s.id ? "location" : undefined}
                  className="block w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150"
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
            <div className="mt-5 border-t border-slate-200 pt-4">
              <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                <span>Lecture</span>
                <span aria-live="polite">{readingProgress}%</span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label="Progression de lecture du projet"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={readingProgress}
              >
                <div className="h-full rounded-full bg-[#515792] transition-[width] duration-200" style={{ width: `${readingProgress}%` }} />
              </div>
            </div>
          </div>
        </aside>

        {/* Contenu principal */}
        <main className="flex-1 min-w-0 space-y-20" style={{ scrollPaddingTop: '80px' }}>

          {/* ── 1. NOTE D'INTENTION ─────────────────────────────────────────── */}
          <section id="intention" style={{ scrollMarginTop: '80px' }}>
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#515792' }}>Note d'intention</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Un outil pour voir où l'on en est</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                La <strong className="text-gray-900">Boussole Numérique Culture</strong> est un projet d’application web gratuite. Sa version publique proposera un état des lieux des usages numériques, suivi d’une restitution visuelle et d’un dialogue guidé.
              </p>
              <p>
                Les partenaires précisent aujourd’hui les questions, les dimensions et les formes de restitution. La version publique s’appuiera sur un questionnaire adaptatif d’une dizaine de minutes, puis proposera une restitution visuelle et un dialogue guidé. Elle visera un <strong className="text-gray-900">diagnostic structuré et personnalisé</strong>, pour aider chacun et chacune à repérer les changements utiles dans leur quotidien de travail.
              </p>
              <p>
                Le projet est porté par une équipe spécialisée dans la transformation numérique des organisations culturelles et créatives, avec une pratique professionnelle ancrée dans le secteur culturel suisse.
              </p>
            </div>
            <blockquote className="mt-6 pl-4 border-l-4 italic text-gray-500" style={{ borderColor: '#515792' }}>
              "Ce qu'on peut évaluer, on peut l'améliorer — et l'amélioration se mesure."
            </blockquote>

            {/* Encadré Memoways */}
            <div className="mt-8 rounded-2xl p-5 flex items-start gap-4" style={{ backgroundColor: '#f0f1f8', border: '1px solid #d0d3ea' }}>
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#515792' }}>
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                  <path d="M5 30 L13 10 L20 24 L27 10 L35 30" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#515792' }}>Qui est Memoways ?</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Memoways est une agence fondée à Genève en 2011 par Ulrich Fischer, spécialisée dans la transformation numérique des organisations culturelles et créatives. Elle accompagne musées, théâtres, associations et institutions dans leurs transitions numériques — avec une approche ancrée dans les réalités du terrain.
                </p>
                <a
                  href="https://memoways.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold transition-opacity hover:opacity-70"
                  style={{ color: '#515792' }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  memoways.com
                </a>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3.5 sm:flex sm:items-center sm:gap-4">
              <a
                href="https://www.geneve.ch/demarches/subvention-projets-ponctuels-culturels-scientifiques"
                target="_blank"
                rel="noopener noreferrer"
                className="mb-3 inline-flex shrink-0 rounded-lg bg-slate-50 p-1.5 transition-colors hover:bg-slate-100 sm:mb-0"
                aria-label="Consulter la démarche de subvention de la Ville de Genève"
              >
                <img
                  src="/ville-geneve-soutien.8334b29d.png"
                  alt="Ville de Genève"
                  className="h-14 w-14 object-contain"
                />
              </a>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#515792' }}>Avec le soutien de</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-900">Ville de Genève</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Ce projet bénéficie du soutien de la Ville de Genève dans le cadre de sa démarche de subvention pour projets ponctuels, culturels ou scientifiques.
                </p>
              </div>
            </div>
          </section>

          {/* ── 2. CONTEXTE ─────────────────────────────────────────────────── */}
          <section id="contexte" style={{ scrollMarginTop: '80px' }}>
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#E27227' }}>Le contexte</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Des pratiques numériques qui coûtent cher en énergie créative</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>
                Dans de nombreuses structures culturelles, une part du temps de travail est absorbée par des pratiques numériques inadéquates : fichiers qui circulent par email en plusieurs versions, projets suivis sur des tableaux bricolés, équipes qui passent plus de temps à se coordonner qu'à créer. Ces situations sont fréquentes et souvent invisibles.
              </p>
              <p>
                Ce qui a changé, c'est qu'aujourd'hui, les conditions sont réunies pour agir. L'intelligence artificielle conversationnelle a atteint un niveau de maturité qui permet de créer des outils d'accompagnement véritablement personnalisés, à un coût accessible.
              </p>
            </div>

            {/* Schéma interactif : problématiques */}
            <div className="rounded-2xl border border-gray-100 shadow-sm overflow-x-auto">
              <div className="min-w-[480px]">
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
                Les problématiques ont été identifiées lors d'entretiens menés avec des structures culturelles genevoises. La future Boussole aidera à les diagnostiquer et à prioriser les améliorations.
              </div>
              </div>
            </div>
          </section>

          {/* ── 3. LA PROPOSITION ───────────────────────────────────────────── */}
          <section id="proposition" style={{ scrollMarginTop: '80px' }}>
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#3aab8a' }}>La proposition</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">Ce que fait la Boussole, concrètement</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              La version publique de la Boussole proposera une <strong className="text-gray-900">expérience conversationnelle guidée</strong> : un dialogue structuré avec un agent intelligent conçu pour le secteur culturel. Le concept, les questions et les promesses sont soumis à des utilisatrices et utilisateurs potentiels afin de recueillir réactions, attentes et doutes. L’application évoluera au fil des discussions avec les partenaires, des expérimentations techniques et des retours des premières structures pilotes.
            </p>

            {/* Les 5 dimensions */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">Les 5 dimensions évaluées</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {DIMENSIONS.map((d, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-sm transition-all group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl">{d.icon}</span>
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-[#515792] transition-colors">{d.titre}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{d.desc}</p>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-gray-200 p-4 flex items-center justify-center text-center">
                <p className="text-xs text-gray-400 italic leading-relaxed">La future version s’appuiera sur des micro-scénarios issus du quotidien culturel.</p>
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
          <section id="collaboratif" style={{ scrollMarginTop: '80px' }}>
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
          <section id="positionnement" style={{ scrollMarginTop: '80px' }}>
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


          {/* ── 5b. EXEMPLES COMPARABLES & INSPIRATIONS ─────────────────────────── */}
          <section id="inspirations" style={{ scrollMarginTop: '80px' }}>
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#3aab8a' }}>Exemples comparables</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Ce qui nous a inspirés</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Six initiatives internationales ont été analysées en profondeur — du Royaume-Uni à la Belgique, de la France à l'Union européenne. Aucune ne répond aux besoins spécifiques des acteurs culturels genevois, mais chacune apporte une leçon précieuse. La Boussole en tire le meilleur pour proposer quelque chose d'original et d'ancré localement.
            </p>

            {/* Grille des références */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {INSPIRATIONS.map((ref) => (
                <div
                  key={ref.id}
                  className="rounded-xl border p-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  style={{ borderColor: ref.couleur + '30', borderLeftWidth: '4px', borderLeftColor: ref.couleur }}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug">{ref.nom}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">{ref.porteur}</p>
                    </div>
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 p-1.5 rounded-lg transition-colors hover:opacity-70"
                      style={{ backgroundColor: ref.couleur + '15', color: ref.couleur }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <p className="text-xs font-semibold mb-2" style={{ color: ref.couleur }}>{ref.chiffre}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{ref.lecon}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 border border-gray-100 bg-slate-50 mb-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                Pour chaque référence : analyse complète, chiffres clés, ce que la Boussole en apprend, ce qu'elle fait différemment, et liens vers les sources originales.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button style={{ backgroundColor: '#3aab8a' }} size="sm" asChild>
                <Link href="/references">Fiches détaillées & tableau comparatif <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </section>

          {/* ── 6. PRINCIPES FONDATEURS ─────────────────────────────────────── */}
          <section id="principes" style={{ scrollMarginTop: '80px' }}>
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
          <section id="architecture" style={{ scrollMarginTop: '80px' }}>
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
          <section id="calendrier" style={{ scrollMarginTop: '80px' }}>
            <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: '#9b59b6' }}>Calendrier</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Un projet de 24 mois en 4 phases</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Le développement de la Boussole est organisé en quatre phases progressives — de la conception participative avec les partenaires culturels genevois jusqu'à l'exploitation et l'amélioration continue. La phase 1 (conception participative) est actuellement en cours.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { num: '01', titre: 'Conception participative', mois: 'Mois 1–3', couleur: '#515792', statut: 'En cours' },
                { num: '02', titre: 'Tests et ajustements', mois: 'Mois 4–5', couleur: '#E27227', statut: 'À venir' },
                { num: '03', titre: 'Version publique', mois: 'Mois 6–8', couleur: '#3aab8a', statut: 'À venir' },
                { num: '04', titre: 'Exploitation et amélioration continue', mois: 'Mois 9–24', couleur: '#9b59b6', statut: 'À venir' },
              ].map((p) => (
                <div key={p.num} className="rounded-xl p-3 text-center border" style={{ borderColor: p.couleur + '30', backgroundColor: p.couleur + '08' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs mx-auto mb-2" style={{ backgroundColor: p.couleur }}>{p.num}</div>
                  <p className="text-xs font-semibold text-gray-700 leading-tight mb-1">{p.titre}</p>
                  <p className="text-xs text-gray-400">{p.mois}</p>
                  {p.statut === 'En cours' && (
                    <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#3aab8a20', color: '#3aab8a' }}>En cours</span>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ backgroundColor: '#f0f1f8' }}>
                  <p className="text-sm text-gray-600">Le calendrier détaillé présente les livrables, activités et jalons de chaque phase. La phase 4 (Mois 9–24) couvre l'hébergement, le support, la diffusion et l'appropriation progressive par le secteur.</p>
              <Button style={{ backgroundColor: '#515792', flexShrink: 0 }} size="sm" asChild>
                <Link href="/timeline">Voir le calendrier <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </section>

          {/* ── 9. OBJECTIFS À 2 ANS ────────────────────────────────────────── */}
          <section id="objectifs" style={{ scrollMarginTop: '80px' }}>
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
            La Boussole se construit en dialogue avec ses futurs utilisateurs. Structures culturelles, partenaires institutionnels, professionnels du secteur — toutes les contributions sont bienvenues.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button style={{ backgroundColor: '#E27227' }} asChild>
              <Link href="/partenaires">Nous contacter <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/recherche">Recherche & état de l'art</Link>
            </Button>
            <Button variant="outline" style={{ borderColor: '#3aab8a', color: '#3aab8a' }} asChild>
              <Link href="/ressources">Ressources documentaires</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

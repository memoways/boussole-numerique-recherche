import { useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Info, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "@/components/Navigation";

/**
 * Design Philosophy: Data-Driven Infographic with Memoways Branding
 * - Memoways colors: #515792 (blue), #E27227 (orange), #E58441 (light orange), #EFCFB7 (beige)
 * - Voix institutionnelle "nous"
 * - Public non-technique, pédagogue, tooltips explicatifs
 */

// ─── Tooltip Component ───────────────────────────────────────────────────────
function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        className="cursor-help border-b border-dashed border-current"
        tabIndex={0}
      >
        {children}
      </span>
      {visible && (
        <span className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg bg-[#262845] text-white text-xs p-3 shadow-xl leading-relaxed">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#262845]" />
        </span>
      )}
    </span>
  );
}

// ─── Schéma 1 : Avant / Après ─────────────────────────────────────────────────
function SchemaAvantApres() {
  const problems = [
    {
      icon: "📄",
      avant: "Documents Word/Excel envoyés par email en 7 versions",
      apres: "Un seul fichier partagé, toujours à jour, accessible à tous",
    },
    {
      icon: "🔍",
      avant: "Stress de retrouver la bonne version d'un fichier",
      apres: "Recherche instantanée, historique des modifications visible",
    },
    {
      icon: "🔄",
      avant: "Processus manuels répétitifs et fastidieux",
      apres: "Automatisations qui font le travail répétitif à votre place",
    },
    {
      icon: "💬",
      avant: "Communication interne fragmentée, informations perdues",
      apres: "Un espace de travail commun, discussions liées aux projets",
    },
    {
      icon: "🧭",
      avant: "Difficulté à savoir par où commencer la transformation",
      apres: "Un diagnostic personnalisé qui identifie les priorités concrètes",
    },
    {
      icon: "⏱️",
      avant: "3 à 7 heures par semaine perdues en coordination inefficace",
      apres: "Ces heures rendues à la création et à la collaboration",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-0 mb-4 text-center">
        <div className="rounded-tl-xl rounded-bl-xl py-3 font-bold text-white text-sm" style={{ backgroundColor: '#c0392b' }}>
          ❌ Situation actuelle fréquente
        </div>
        <div className="rounded-tr-xl rounded-br-xl py-3 font-bold text-white text-sm" style={{ backgroundColor: '#27ae60' }}>
          ✓ Avec les bons outils et pratiques
        </div>
      </div>
      <div className="space-y-2">
        {problems.map((p, i) => (
          <div key={i} className="grid grid-cols-[1fr_40px_1fr] items-center gap-2">
            <div className="rounded-lg p-3 text-sm text-white leading-snug" style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
              <span className="mr-2">{p.icon}</span>{p.avant}
            </div>
            <div className="text-center text-xl font-bold" style={{ color: '#515792' }}>→</div>
            <div className="rounded-lg p-3 text-sm leading-snug" style={{ backgroundColor: '#d4edda', color: '#155724' }}>
              <span className="mr-2">✓</span>{p.apres}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground italic mt-4 text-center">
        Ces problématiques ont été identifiées lors d'ateliers menés avec des structures culturelles genevoises.
        La Boussole aide à les diagnostiquer et à prioriser les améliorations.
      </p>
    </div>
  );
}

// ─── Schéma 2 : Parcours utilisateur en 3 temps ───────────────────────────────
function SchemaParcours() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      num: "1",
      title: "La Photo",
      subtitle: "10–15 min · Sans inscription",
      color: "#515792",
      bg: "#eef0f8",
      description: "L'utilisateur choisit son mode (individuel ou structure), puis répond à une série de questions conversationnelles couvrant 5 dimensions de ses usages numériques. Les réponses peuvent être saisies par écrit ou à la voix.",
      dimensions: ["Outils & méthodes de travail", "Compétences & culture numérique", "Données & archivage", "Médiation & communication", "Partage & cohérence des pratiques"],
      output: "Accès immédiat au panorama visuel",
    },
    {
      num: "2",
      title: "Le Panorama",
      subtitle: "Restitution visuelle immédiate",
      color: "#E27227",
      bg: "#fef3ea",
      description: "L'agent restitue les résultats sous forme d'un radar à 5 branches, un score par dimension, et une synthèse rédigée en langage humain. Des pistes d'action concrètes et hiérarchisées sont proposées.",
      dimensions: ["Radar visuel à 5 branches", "Score par dimension", "Synthèse en langage clair", "Pistes d'action hiérarchisées", "Export PDF · Envoi par email"],
      output: "Possibilité d'aller plus loin avec un compte gratuit",
    },
    {
      num: "3",
      title: "L'Approfondissement",
      subtitle: "Avec compte gratuit · Suivi dans le temps",
      color: "#3aab8a",
      bg: "#e8f8f3",
      description: "Avec un compte gratuit, l'utilisateur accède à un mode conversationnel approfondi, peut uploader ses propres documents pour personnaliser les recommandations, et revenir mesurer ses progrès au fil du temps.",
      dimensions: ["Questions approfondies par dimension", "Upload de documents personnels", "Recommandations contextualisées", "Suivi des progrès dans le temps", "Mode collaboratif pour les structures"],
      output: "Un outil vivant qui évolue avec vous",
    },
  ];

  return (
    <div className="w-full">
      {/* Entrée */}
      <div className="flex justify-center mb-6">
        <div className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md" style={{ backgroundColor: '#262845' }}>
          🎭 Acteur·trice culturel·le genevois·e
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <div className="w-0.5 h-6" style={{ backgroundColor: '#515792' }} />
      </div>

      {/* Choix du mode */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
        <div className="rounded-lg border-2 p-3 text-center text-sm font-medium" style={{ borderColor: '#515792', color: '#515792' }}>
          👤 Mode individuel<br /><span className="text-xs font-normal text-muted-foreground">Artiste, freelance, créateur·trice</span>
        </div>
        <div className="rounded-lg border-2 p-3 text-center text-sm font-medium" style={{ borderColor: '#E27227', color: '#E27227' }}>
          🏛️ Mode structure<br /><span className="text-xs font-normal text-muted-foreground">Compagnie, association, fondation</span>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <div className="w-0.5 h-6" style={{ backgroundColor: '#515792' }} />
      </div>

      {/* 3 temps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i}>
            <button
              className="w-full text-left rounded-xl border-2 p-4 transition-all hover:shadow-md"
              style={{ borderColor: step.color, backgroundColor: activeStep === i ? step.bg : 'transparent' }}
              onClick={() => setActiveStep(activeStep === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: step.color }}>
                    {step.num}
                  </div>
                  <div>
                    <div className="font-bold text-base" style={{ color: step.color }}>{step.title}</div>
                    <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                  </div>
                </div>
                {activeStep === i ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
              </div>
              {activeStep === i && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {step.dimensions.map((d, j) => (
                      <div key={j} className="text-xs rounded px-2 py-1 font-medium" style={{ backgroundColor: step.color + '20', color: step.color }}>
                        • {d}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs italic text-muted-foreground border-t pt-2 mt-2">
                    ↓ {step.output}
                  </div>
                </div>
              )}
            </button>
            {i < steps.length - 1 && (
              <div className="flex justify-center my-2">
                <div className="w-0.5 h-5" style={{ backgroundColor: '#ccc' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground italic mt-6 text-center">
        Cliquez sur chaque étape pour en savoir plus. L'expérience est conçue pour être accessible sans aucune compétence technique préalable.
      </p>
    </div>
  );
}

// ─── Schéma 3 : Architecture technique ────────────────────────────────────────
function SchemaArchitecture() {
  const [hovered, setHovered] = useState<string | null>(null);

  const tooltips: Record<string, string> = {
    react: "React est un outil de développement web qui permet de créer des interfaces interactives. C'est la même technologie utilisée par Facebook, Instagram ou Airbnb.",
    tailwind: "Tailwind est un outil qui permet de styliser l'interface (couleurs, polices, espacements) de façon cohérente et rapide.",
    infomaniak: "Infomaniak est un hébergeur suisse basé à Genève. Choisir Infomaniak garantit que vos données restent en Suisse, sous la législation suisse.",
    supabase: "Supabase est une base de données sécurisée hébergée en Europe (Francfort). C'est là que sont stockées les réponses des utilisateurs, de façon chiffrée et isolée par compte.",
    ia: "L'intelligence artificielle conversationnelle est le 'cerveau' de la Boussole. Elle analyse vos réponses, génère le radar visuel et rédige les recommandations personnalisées.",
    rag: "Le RAG (Retrieval-Augmented Generation) est une technique qui permet à l'IA de s'appuyer sur une base de ressources curatées (bonnes pratiques, outils, formations) pour donner des recommandations précises et contextualisées.",
    publicodes: "Publicodes est un langage de règles transparent et lisible, développé par l'État français. Il permet de documenter et d'expliquer exactement comment chaque score est calculé — rien n'est une boîte noire.",
    github: "GitHub est la plateforme où le code de la Boussole est publié en open source. N'importe qui peut le consulter, le vérifier, le réutiliser ou proposer des améliorations.",
    vocal: "La saisie vocale permet de répondre aux questions en parlant, comme dans une conversation. Le système retranscrit et structure automatiquement les réponses.",
  };

  const Block = ({ id, label, sublabel, color, bg }: { id: string; label: string; sublabel?: string; color: string; bg: string }) => (
    <div
      className="relative rounded-lg border-2 px-3 py-2 text-center cursor-help transition-all text-sm font-medium"
      style={{ borderColor: color, backgroundColor: hovered === id ? bg : 'white', color }}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {label}
      {sublabel && <div className="text-xs font-normal text-muted-foreground">{sublabel}</div>}
      {hovered === id && tooltips[id] && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 rounded-xl bg-[#262845] text-white text-xs p-3 shadow-2xl leading-relaxed text-left font-normal">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#E27227]" />
            {tooltips[id]}
          </div>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#262845]" />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full">
      <p className="text-sm text-muted-foreground text-center mb-6 italic">
        Survolez chaque composant pour comprendre son rôle en langage simple.
      </p>

      {/* Couche utilisateur */}
      <div className="rounded-xl border-2 border-dashed p-4 mb-4" style={{ borderColor: '#515792' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-center" style={{ color: '#515792' }}>Interface utilisateur (ce que vous voyez)</div>
        <div className="grid grid-cols-3 gap-3">
          <Block id="react" label="Interface web" sublabel="React + Tailwind" color="#515792" bg="#eef0f8" />
          <Block id="vocal" label="Saisie vocale" sublabel="Parole → texte" color="#515792" bg="#eef0f8" />
          <Block id="tailwind" label="Design adaptatif" sublabel="Mobile & desktop" color="#515792" bg="#eef0f8" />
        </div>
      </div>

      <div className="flex justify-center my-2">
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">↕ Échanges sécurisés</div>
      </div>

      {/* Couche IA */}
      <div className="rounded-xl border-2 border-dashed p-4 mb-4" style={{ borderColor: '#E27227' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-center" style={{ color: '#E27227' }}>Intelligence artificielle (le cerveau)</div>
        <div className="grid grid-cols-3 gap-3">
          <Block id="ia" label="Agent IA" sublabel="Conversation guidée" color="#E27227" bg="#fef3ea" />
          <Block id="rag" label="Base de ressources" sublabel="RAG — recommandations" color="#E27227" bg="#fef3ea" />
          <Block id="publicodes" label="Modèle de scoring" sublabel="Publicodes — transparent" color="#E27227" bg="#fef3ea" />
        </div>
      </div>

      <div className="flex justify-center my-2">
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">↕ Données chiffrées</div>
      </div>

      {/* Couche données */}
      <div className="rounded-xl border-2 border-dashed p-4 mb-4" style={{ borderColor: '#3aab8a' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-3 text-center" style={{ color: '#3aab8a' }}>Données & hébergement (souveraineté suisse)</div>
        <div className="grid grid-cols-2 gap-3">
          <Block id="infomaniak" label="Serveur Infomaniak" sublabel="Hébergé en Suisse 🇨🇭" color="#3aab8a" bg="#e8f8f3" />
          <Block id="supabase" label="Base de données" sublabel="Supabase — Europe 🇪🇺" color="#3aab8a" bg="#e8f8f3" />
        </div>
      </div>

      <div className="flex justify-center my-2">
        <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">↕ Code ouvert et vérifiable</div>
      </div>

      {/* Open source */}
      <div className="rounded-xl border-2 border-dashed p-3" style={{ borderColor: '#6c757d' }}>
        <div className="text-xs font-bold uppercase tracking-wider mb-2 text-center text-muted-foreground">Transparence & partage</div>
        <Block id="github" label="Code open source sur GitHub" sublabel="Vérifiable, réutilisable, améliorable par tous" color="#6c757d" bg="#f8f9fa" />
      </div>

      <p className="text-xs text-muted-foreground italic mt-4 text-center">
        Toutes les données personnelles restent en Suisse ou en Europe. Aucune donnée n'est vendue ni exploitée à des fins commerciales.
      </p>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function DescriptionProjet() {
  const dimensions = [
    { icon: "🛠️", title: "Outils & méthodes de travail", desc: "Les logiciels et méthodes utilisés soutiennent-ils la collaboration ou créent-ils de la friction ? Comment circulent les fichiers, comment sont suivis les projets ?" },
    { icon: "🧠", title: "Compétences & culture numérique", desc: "Quel est le niveau de confiance avec les outils du quotidien ? Y a-t-il eu des formations récentes ? L'IA a-t-elle été expérimentée ?" },
    { icon: "🗄️", title: "Données, archivage & documentation", desc: "Est-il possible de retrouver les fichiers d'un projet d'il y a deux ans ? Existe-t-il une politique de sauvegarde ? Les contacts sont-ils centralisés ?" },
    { icon: "📣", title: "Médiation, publics & communication", desc: "Comment le numérique est-il utilisé pour rejoindre les publics ? Y a-t-il un site à jour, une newsletter, un suivi des statistiques ?" },
    { icon: "🔗", title: "Partage & cohérence des pratiques", desc: "Les informations circulent-elles facilement au sein de la structure ? Y a-t-il un décalage entre ce qu'on aimerait faire et ce qu'on fait réellement ?" },
  ];

  const principes = [
    { icon: "🆓", title: "Gratuit", desc: "L'outil est entièrement gratuit pendant les deux premières années d'exploitation." },
    { icon: "🇨🇭", title: "Données souveraines", desc: "Hébergement en Suisse (Infomaniak), base de données en Europe. Vos données ne quittent pas le cadre légal européen." },
    { icon: "🔒", title: "Confidentialité", desc: "Les informations saisies sont sécurisées et ne peuvent être vues que par la personne ou l'entité qui les saisit." },
    { icon: "⚖️", title: "Neutralité", desc: "Les recommandations pointent vers l'écosystème genevois sans favoriser aucun prestataire commercial en particulier." },
    { icon: "🌐", title: "Open source", desc: "Le code est publié sur GitHub. D'autres villes ou cantons pourront le reprendre et l'adapter à leur contexte." },
    { icon: "🤝", title: "Approche contributive", desc: "Les structures culturelles genevoises participent dès le départ à la définition des indicateurs et à l'enrichissement des recommandations." },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#eef0f8] to-background">
        <div className="container max-w-4xl">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <Badge className="mb-4" style={{ backgroundColor: '#515792', color: 'white' }}>Dossier de projet</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#262845' }}>
            Description du projet<br />
            <span style={{ color: '#515792' }}>Boussole Numérique Culture</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Un outil web gratuit pour aider les acteurs culturels genevois à évaluer leurs pratiques numériques, identifier leurs priorités et cheminer vers de meilleures façons de travailler — sans expertise technique préalable.
          </p>
        </div>
      </section>

      {/* Note d'intention */}
      <section id="intention" className="py-16 bg-background">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#E27227', color: 'white' }}>Note d'intention</Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#262845' }}>Un outil pour voir où l'on en est</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
            <p className="text-lg leading-relaxed">
              La <strong className="text-foreground">Boussole Numérique Culture</strong> est une application web interactive et gratuite qui permet aux actrices et acteurs culturels genevois de faire un état des lieux de leurs usages numériques — ce qui fonctionne, ce qui coince, les envies, les besoins, les questionnements — puis de recevoir un accompagnement conversationnel personnalisé pour cheminer vers de meilleures pratiques numériques.
            </p>
            <p className="leading-relaxed">
              L'outil repose sur un questionnaire adaptatif d'une dizaine de minutes, suivi d'une restitution visuelle et d'un dialogue guidé par une intelligence artificielle spécialement contextualisée pour la réalité du secteur culturel. Ce n'est ni un audit, ni un cours, ni un chatbot généraliste : c'est un <strong className="text-foreground">miroir lucide et bienveillant</strong>, conçu pour aider chacune et chacun à identifier les endroits précis où un petit changement pourrait avoir un vrai impact sur son quotidien de travail.
            </p>
            <p className="leading-relaxed">
              Le projet émane de <strong className="text-foreground">Memoways</strong>, agence genevoise spécialisée dans la transformation numérique des organisations culturelles et créatives, forte de plus de trente ans de pratique professionnelle au cœur de l'écosystème culturel genevois et suisse.
            </p>
            <blockquote className="border-l-4 pl-6 py-2 italic text-lg" style={{ borderColor: '#515792', color: '#515792' }}>
              "Ce qu'on peut évaluer, on peut l'améliorer — et l'amélioration se mesure."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Constat + Schéma Avant/Après */}
      <section id="constat" className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#c0392b', color: 'white' }}>Le constat</Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#262845' }}>Des pratiques numériques qui coûtent cher en énergie créative</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-4">
            Dans de nombreuses structures culturelles, une part importante de l'énergie créative se dissipe dans des pratiques numériques inadaptées. Des fichiers qui circulent par email en plusieurs versions, des projets suivis sur des tableurs bricolés, des équipes qui passent plus de temps à se coordonner qu'à créer. Ce n'est la faute de personne — c'est un angle mort collectif.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Ce qui a changé, c'est qu'aujourd'hui, les conditions sont réunies pour agir. L'intelligence artificielle conversationnelle a atteint un niveau de maturité qui permet de créer des outils d'accompagnement véritablement personnalisés, à un coût accessible.
          </p>

          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: '#262845' }}>
              Schéma : Problématiques fréquentes et leur résolution
            </h3>
            <SchemaAvantApres />
          </div>
        </div>
      </section>

      {/* La proposition */}
      <section id="proposition" className="py-16 bg-background">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#515792', color: 'white' }}>La proposition</Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#262845' }}>Ce que fait la Boussole, concrètement</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            La Boussole Numérique Culture est une application web gratuite qui propose une <strong className="text-foreground">expérience conversationnelle guidée</strong> — pas un formulaire classique, mais un dialogue structuré avec un agent intelligent spécialement conçu pour le secteur culturel. L'application finale évoluera au fil des discussions avec les partenaires, des expérimentations techniques et des retours des premières structures pilotes. C'est dans la nature même du projet — un outil vivant, qui se construit en dialogue avec ses futurs utilisateurs.
          </p>

          {/* 5 dimensions */}
          <h3 className="text-xl font-bold mb-4" style={{ color: '#515792' }}>Les 5 dimensions évaluées</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {dimensions.map((d, i) => (
              <Card key={i} className="border hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{d.icon}</span>
                    <div>
                      <div className="font-semibold text-sm mb-1" style={{ color: '#262845' }}>{d.title}</div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border border-dashed bg-muted/30">
              <CardContent className="pt-4 flex items-center justify-center h-full">
                <p className="text-xs text-muted-foreground italic text-center leading-relaxed">
                  Les questions s'appuient sur des micro-scénarios réalistes du quotidien culturel — pas de jargon technique.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Schéma parcours */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-center" style={{ color: '#262845' }}>
              Les 3 temps de l'expérience — Parcours utilisateur
            </h3>
            <p className="text-sm text-muted-foreground text-center mb-6">
              De la première visite à l'accompagnement dans la durée
            </p>
            <SchemaParcours />
          </div>
        </div>
      </section>

      {/* Mode structure */}
      <section id="mode-structure" className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#E27227', color: 'white' }}>Mode collaboratif</Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#262845' }}>Donner la parole à toute une équipe</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Pour les compagnies, associations et collectifs, la Boussole propose un <strong className="text-foreground">mode collaboratif</strong>. Plusieurs personnes au sein de la même structure répondent individuellement au questionnaire.
              </p>
              <p className="leading-relaxed">
                L'IA synthétise ensuite l'ensemble de manière structurée et actionnable — une <strong className="text-foreground">carte des perceptions croisées</strong> qui révèle les consensus comme les points de friction.
              </p>
              <p className="leading-relaxed">
                Ce modèle permet de dégager des priorités partagées qu'aucun entretien individuel n'aurait fait émerger seul.
              </p>
            </div>
            <div className="rounded-xl border-2 p-6 space-y-3" style={{ borderColor: '#E27227' }}>
              <div className="font-bold text-center mb-4" style={{ color: '#E27227' }}>Comment ça marche en mode structure</div>
              {["Chaque membre de l'équipe répond individuellement (10–15 min)", "Les réponses sont agrégées et analysées par l'IA", "Une synthèse collective est générée : consensus et points de friction", "Des priorités partagées émergent pour guider les décisions"].map((s, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: '#E27227' }}>{i + 1}</div>
                  <span className="text-muted-foreground">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ce que la Boussole n'est pas */}
      <section id="distinction" className="py-16 bg-background">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#6c757d', color: 'white' }}>Positionnement</Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#262845' }}>Ce que la Boussole n'est pas</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Pas un chatbot généraliste", desc: "Des outils comme ChatGPT ou Claude sont puissants, mais ils exigent un niveau de compétences numériques élevé pour être utiles dans ce contexte. La Boussole prend le contre-pied : toute la puissance de l'IA est pré-contextualisée pour les besoins spécifiques des acteurs culturels.", icon: "🤖" },
              { title: "Pas un audit", desc: "La Boussole n'est pas un audit formel ou un diagnostic externe. C'est un outil d'auto-évaluation bienveillant, conçu pour que chacun puisse avancer à son propre rythme, sans jugement.", icon: "📋" },
              { title: "Pas un cours en ligne", desc: "La Boussole ne dispense pas de formation. Elle identifie les priorités et oriente vers les ressources et formations existantes dans l'écosystème genevois.", icon: "🎓" },
            ].map((item, i) => (
              <Card key={i} className="border-2" style={{ borderColor: '#e9ecef' }}>
                <CardHeader>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <CardTitle className="text-base" style={{ color: '#262845' }}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Principes */}
      <section id="principes" className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#515792', color: 'white' }}>Un projet de service public</Badge>
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#262845' }}>Nos principes fondateurs</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {principes.map((p, i) => (
              <Card key={i} className="border hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <div className="font-bold text-sm mb-2" style={{ color: '#262845' }}>{p.title}</div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture technique */}
      <section id="architecture" className="py-16 bg-background">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#3aab8a', color: 'white' }}>Architecture technique</Badge>
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#262845' }}>Comment la Boussole est construite</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            La Boussole repose sur une architecture technique moderne, choisie pour garantir la <strong className="text-foreground">souveraineté des données</strong>, la <strong className="text-foreground">transparence</strong> du modèle d'évaluation et la <strong className="text-foreground">pérennité</strong> de l'outil. Chaque composant a été sélectionné pour ses qualités en matière de confidentialité et d'hébergement européen ou suisse.
          </p>
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-center" style={{ color: '#262845' }}>
              Architecture de la Boussole — Vue d'ensemble
            </h3>
            <SchemaArchitecture />
          </div>
        </div>
      </section>

      {/* Calendrier sommaire */}
      <section id="calendrier" className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#E58441', color: 'white' }}>Calendrier</Badge>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#262845' }}>Développement en 4 phases sur 2 ans</h2>
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#E58441' }} />
            <div className="space-y-6 pl-16">
              {[
                { period: "Mois 1–3", title: "MVP", desc: "Questionnaire adaptatif (5 dimensions), saisie vocale, restitution visuelle (radar + synthèse), export PDF, mode conversationnel guidé." },
                { period: "Mois 4", title: "Beta test", desc: "Tests avec les structures culturelles pilotes genevoises, ajustements de l'expérience utilisateur, mise en place de l'annuaire de ressources." },
                { period: "Mois 6–8", title: "Version 2", desc: "Mode structure collaboratif (multi-répondants + synthèse collective), upload de documents, enrichissement de la base de ressources." },
                { period: "Mois 5–24", title: "Exploitation & amélioration continue", desc: "Comparaison anonymisée avec la moyenne des répondants, optimisations, extension des partenariats. Objectif : 300 utilisateurs inscrits." },
              ].map((phase, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-10 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: '#E58441' }}>
                    {i + 1}
                  </div>
                  <div className="rounded-xl border p-4 bg-white">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#E58441' }}>{phase.period}</div>
                    <div className="font-bold text-base mb-2" style={{ color: '#262845' }}>{phase.title}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectifs à 2 ans */}
      <section id="objectifs" className="py-16 bg-background">
        <div className="container max-w-4xl">
          <Badge className="mb-4" style={{ backgroundColor: '#515792', color: 'white' }}>Horizon</Badge>
          <h2 className="text-3xl font-bold mb-8" style={{ color: '#262845' }}>Objectifs à deux ans</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2" style={{ borderColor: '#515792' }}>
              <CardContent className="pt-6 space-y-3">
                {[
                  "300 utilisateurs inscrits, dont 30% utilisant l'outil régulièrement",
                  "Un relai actif par les partenaires institutionnels genevois",
                  "Une base de connaissances enrichie par la communauté et les retours d'usage",
                  "Des données anonymisées permettant un diagnostic de l'écosystème culturel genevois",
                ].map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0 mt-0.5" style={{ backgroundColor: '#515792' }}>✓</div>
                    <span className="text-muted-foreground">{obj}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-2" style={{ borderColor: '#E27227' }}>
              <CardHeader>
                <CardTitle className="text-base" style={{ color: '#E27227' }}>Et au-delà de Genève</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Si les retours sont positifs, des financements complémentaires permettront d'étendre l'outil en Suisse romande.</p>
                <p>Le code étant open source, d'autres villes ou cantons pourront le reprendre et l'adapter à leur contexte.</p>
                <p className="font-medium" style={{ color: '#E27227' }}>Genève se positionnerait ainsi comme pionnière d'un outil de service public qui n'existe nulle part ailleurs sous cette forme.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#262845' }}>Vous souhaitez en savoir plus ou participer ?</h2>
          <p className="text-muted-foreground mb-8">
            La Boussole se construit en dialogue avec ses futurs utilisateurs. Structures culturelles genevoises, partenaires institutionnels, acteurs de l'écosystème numérique — toutes les contributions sont bienvenues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" style={{ backgroundColor: '#E27227', borderColor: '#E27227' }} asChild>
              <a href="https://memoways.com/contact" target="_blank" rel="noopener noreferrer">
                Nous contacter
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" style={{ borderColor: '#515792', color: '#515792' }} asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 w-5 h-5" />
                Retour à l'accueil
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

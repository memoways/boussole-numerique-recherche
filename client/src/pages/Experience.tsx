/**
 * Expérience — prévisualisation interactive et non fonctionnelle du futur prototype.
 * Design : une suite de quatre écrans applicatifs inspirés des wireframes, toujours explicitement présentés comme une démonstration sans collecte.
 */
import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Compass,
  FileText,
  Lightbulb,
  Mic,
  MessageSquareText,
  Sparkles,
  User,
  Users,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedRadarGraphic, type RadarDimension } from "@/components/AnimatedRadarGraphic";

const STEPS = [
  { id: "profil", num: "01", label: "Se situer", title: "Choisir le point de départ", detail: "Le futur prototype pourra adapter ses questions à la situation décrite, sans produire de profil évaluatif.", color: "#515792", icon: User },
  { id: "conversation", num: "02", label: "Décrire", title: "Parler de ce qui se passe vraiment", detail: "Une question à la fois, formulée en langage ordinaire, avec une réponse écrite ou vocale à relire.", color: "#E07428", icon: MessageSquareText },
  { id: "panorama", num: "03", label: "Comprendre", title: "Lire un panorama à discuter", detail: "Le radar et les repères sont une manière de préparer une conversation, jamais une note personnelle.", color: "#3aab8a", icon: Compass },
  { id: "agir", num: "04", label: "Agir", title: "Choisir une première amélioration", detail: "Les pistes et ressources devront être actionnables, contextualisées et laissées à la décision des personnes concernées.", color: "#3a7fc1", icon: Lightbulb },
] as const;

const DIMENSIONS: RadarDimension[] = [
  { label: "Outils", couleur: "#515792", emoji: "⌁", resume: "Des outils cohérents avec les usages et le collectif." },
  { label: "Compétences", couleur: "#E07428", emoji: "↗", resume: "Des repères partagés, sans jugement de niveau." },
  { label: "Données", couleur: "#3aab8a", emoji: "◌", resume: "Des informations mieux classées et plus faciles à retrouver." },
  { label: "Diffusion", couleur: "#3a7fc1", emoji: "◒", resume: "Des canaux choisis selon les projets et les publics." },
  { label: "Collaboration", couleur: "#7ab648", emoji: "↔", resume: "Des procédures de travail plus simples à partager." },
];

const PREVIEW_BARS = [
  { label: "Outils", color: "#515792", width: "66%", note: "à explorer" },
  { label: "Compétences", color: "#E07428", width: "78%", note: "repère solide" },
  { label: "Données", color: "#3aab8a", width: "43%", note: "priorité à discuter" },
  { label: "Diffusion", color: "#3a7fc1", width: "61%", note: "à préciser" },
  { label: "Collaboration", color: "#7ab648", width: "52%", note: "à relier" },
];

function PrototypeFrame({ step, children }: { step: number; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_20px_55px_rgba(31,41,55,0.12)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-[#515792]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#515792] text-white"><Compass className="h-4 w-4" /></span>
          <span className="truncate">Boussole Numérique Culture</span>
        </div>
        <p className="hidden text-xs font-bold text-slate-500 sm:block">Démonstration · écran {step} sur 4</p>
        <div className="flex gap-1.5" aria-label={`Progression : écran ${step} sur 4`}>
          {STEPS.map((item, index) => <span key={item.id} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: index < step ? item.color : "#d8dce7" }} />)}
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
      <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs leading-relaxed text-slate-500 sm:px-6">
        Prévisualisation du futur prototype. Aucun choix, texte ou résultat n’est enregistré depuis cet écran.
      </div>
    </div>
  );
}

function ProfileScreen() {
  const [selection, setSelection] = useState<"artiste" | "structure">("artiste");
  const options = [
    { id: "artiste" as const, title: "Je suis artiste", desc: "Création, médiation, diffusion ou pratique culturelle.", icon: User, color: "#E07428" },
    { id: "structure" as const, title: "Je représente une structure", desc: "Association, lieu, collectif ou réseau qui accompagne des artistes.", icon: Building2, color: "#515792" },
  ];
  return (
    <PrototypeFrame step={1}>
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#515792]">Étape de démonstration</p>
      <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Quel point de départ vous ressemble le plus ?</h3>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Le futur outil utilisera cette indication pour proposer des questions compréhensibles depuis votre situation, sans vous classer.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {options.map(({ id, title, desc, icon: Icon, color }) => {
          const active = selection === id;
          return <button key={id} type="button" aria-pressed={active} onClick={() => setSelection(id)} className="rounded-2xl border-2 p-5 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-4" style={{ borderColor: active ? color : "#e2e8f0", backgroundColor: active ? `${color}10` : "#fff", boxShadow: active ? `inset 0 0 0 1px ${color}` : "none", outlineColor: color }}><span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: color }}><Icon className="h-5 w-5" /></span><span className="mt-4 block font-extrabold text-slate-950">{title}</span><span className="mt-1 block text-sm leading-relaxed text-slate-600">{desc}</span>{active && <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color }}><Check className="h-4 w-4" /> Exemple sélectionné</span>}</button>;
        })}
      </div>
    </PrototypeFrame>
  );
}

function ConversationScreen() {
  const [mode, setMode] = useState<"ecrit" | "vocal">("ecrit");
  const [choice, setChoice] = useState("partage");
  const choices = [
    { id: "partage", label: "Retrouver et partager les fichiers" },
    { id: "coordination", label: "Coordonner un projet à plusieurs" },
    { id: "outils", label: "Choisir ou simplifier les outils" },
  ];
  return (
    <PrototypeFrame step={2}>
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#E07428]">Question conversationnelle</p><h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Qu’est-ce qui rend votre travail numérique plus difficile aujourd’hui ?</h3></div><span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#a94d14]">Exemple de question</span></div>
      <div className="mt-5 rounded-2xl border-l-4 border-[#515792] bg-slate-50 p-4 text-sm leading-relaxed text-slate-700 sm:p-5">Vous préparez un projet avec plusieurs personnes. Certaines cherchent les fichiers, d’autres attendent une réponse ou ne savent plus quelle version est la bonne. Quelle situation souhaitez-vous décrire en premier ?</div>
      <div className="mt-5 grid gap-2 sm:grid-cols-3">{choices.map((item) => <button key={item.id} type="button" aria-pressed={choice === item.id} onClick={() => setChoice(item.id)} className="rounded-xl border px-3 py-3 text-left text-sm font-semibold leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2" style={{ borderColor: choice === item.id ? "#E07428" : "#e2e8f0", color: choice === item.id ? "#a94d14" : "#475569", backgroundColor: choice === item.id ? "#fff3ec" : "#fff", outlineColor: "#E07428" }}>{item.label}</button>)}</div>
      <div className="mt-5 flex flex-wrap items-center gap-3"><button type="button" onClick={() => setMode("ecrit")} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold" style={{ backgroundColor: mode === "ecrit" ? "#515792" : "#f1f3f8", color: mode === "ecrit" ? "#fff" : "#515792" }}><MessageSquareText className="h-4 w-4" /> Répondre par écrit</button><button type="button" onClick={() => setMode("vocal")} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold" style={{ backgroundColor: mode === "vocal" ? "#515792" : "#f1f3f8", color: mode === "vocal" ? "#fff" : "#515792" }}><Mic className="h-4 w-4" /> Répondre à la voix</button><span className="text-xs text-slate-500">{mode === "vocal" ? "La transcription resterait modifiable avant validation." : "La réponse pourrait être complétée à votre rythme."}</span></div>
    </PrototypeFrame>
  );
}

function PanoramaScreen() {
  const [activeBar, setActiveBar] = useState("Données");
  return (
    <PrototypeFrame step={3}>
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#3aab8a]">Restitution illustrative</p><h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Votre panorama numérique</h3></div><span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-[#18755e]">Aucun score personnel</span></div>
      <div className="mt-6 grid items-center gap-7 lg:grid-cols-[minmax(220px,0.78fr)_minmax(0,1.22fr)]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-2 py-4"><p className="text-center text-xs font-black uppercase tracking-[0.14em] text-slate-500">Carte des cinq dimensions</p><AnimatedRadarGraphic dimensions={DIMENSIONS} interactive className="mx-auto h-56 w-56 sm:h-64 sm:w-64" ariaLabel="Radar illustratif des cinq dimensions du futur prototype" /></div>
        <div><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">Repères à discuter</p><div className="mt-3 space-y-3">{PREVIEW_BARS.map((bar) => <button key={bar.label} type="button" onClick={() => setActiveBar(bar.label)} aria-pressed={activeBar === bar.label} className="block w-full rounded-xl p-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2" style={{ backgroundColor: activeBar === bar.label ? `${bar.color}10` : "transparent", outlineColor: bar.color }}><span className="flex items-center justify-between gap-3 text-sm"><span className="font-bold text-slate-800">{bar.label}</span><span className="text-xs font-semibold" style={{ color: bar.color }}>{bar.note}</span></span><span className="mt-2 block h-2.5 overflow-hidden rounded-full bg-slate-200"><span className="block h-full rounded-full transition-all duration-300" style={{ width: bar.width, backgroundColor: bar.color }} /></span></button>)}</div><p className="mt-4 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">Lecture illustrative :</strong> ici, {activeBar.toLowerCase()} devient un point de départ à explorer avec les personnes concernées, pas un verdict.</p></div>
      </div>
    </PrototypeFrame>
  );
}

function ActionScreen() {
  const [priority, setPriority] = useState("partage");
  const actions = [
    { id: "partage", title: "Clarifier le partage de fichiers", desc: "Choisir un espace commun, nommer les versions et définir une règle simple d’archivage.", icon: FileText, color: "#515792" },
    { id: "collaboration", title: "Mettre à plat une procédure collective", desc: "Décrire qui fait quoi, où l’information circule et comment une décision est retrouvée.", icon: Users, color: "#3aab8a" },
    { id: "outils", title: "Réexaminer un outil devenu contraignant", desc: "Comparer les besoins concrets avant de changer, simplifier ou mieux paramétrer un outil.", icon: Wrench, color: "#E07428" },
  ];
  return (
    <PrototypeFrame step={4}>
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-[#3a7fc1]">Première piste à choisir</p><h3 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Qu’aimeriez-vous améliorer en premier ?</h3></div><span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#2b619d]">Exemples à co-concevoir</span></div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">Le futur prototype devra relier un repère discuté à une action praticable. Les suggestions restent à ajuster selon le contexte, les moyens et les préférences de chaque personne ou équipe.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">{actions.map(({ id, title, desc, icon: Icon, color }) => { const active = priority === id; return <button key={id} type="button" aria-pressed={active} onClick={() => setPriority(id)} className="rounded-2xl border-2 p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-4" style={{ borderColor: active ? color : "#e2e8f0", backgroundColor: active ? `${color}10` : "#fff", outlineColor: color }}><span className="flex h-9 w-9 items-center justify-center rounded-xl text-white" style={{ backgroundColor: color }}><Icon className="h-4 w-4" /></span><span className="mt-4 block font-extrabold text-slate-950">{title}</span><span className="mt-2 block text-sm leading-relaxed text-slate-600">{desc}</span>{active && <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color }}><Check className="h-4 w-4" /> Piste illustrée</span>}</button>; })}</div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4"><p className="text-sm leading-relaxed text-slate-600"><strong className="text-slate-900">Ensuite :</strong> le prototype pourrait suggérer une ressource, une méthode ou une conversation à organiser, sans décider à votre place.</p><span className="inline-flex items-center gap-2 text-sm font-bold text-[#515792]"><Sparkles className="h-4 w-4" /> Ressources à préciser</span></div>
    </PrototypeFrame>
  );
}

function ScreenPreview({ activeStep }: { activeStep: number }) {
  if (activeStep === 0) return <ProfileScreen />;
  if (activeStep === 1) return <ConversationScreen />;
  if (activeStep === 2) return <PanoramaScreen />;
  return <ActionScreen />;
}

export default function Experience() {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 pb-12 pt-20 sm:pt-24">
        <div className="mx-auto max-w-5xl">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "#E07428", color: "#fff" }}>Prévisualisation du futur prototype</Badge>
          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl lg:text-5xl">Imaginer l’expérience Boussole, écran par écran</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">Cette page rend tangible le futur parcours : se situer, décrire une situation, lire un panorama, puis choisir une première amélioration. <strong>La Boussole n’existe pas encore et cette démonstration ne collecte aucune donnée.</strong></p>
          <div className="mt-7 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-[#515792]/10 px-4 py-2 font-bold text-[#515792]">4 écrans à discuter</span><span className="rounded-full bg-[#3aab8a]/10 px-4 py-2 font-bold text-[#18755e]">État des lieux non jugeant</span><span className="rounded-full bg-[#E07428]/10 px-4 py-2 font-bold text-[#a94d14]">Pistes actionnables à co-concevoir</span></div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12 sm:py-16" aria-labelledby="experience-steps-title">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl"><p className="text-xs font-black uppercase tracking-[0.15em] text-[#515792]">Parcours illustratif</p><h2 id="experience-steps-title" className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Chaque étape propose un écran à mettre à l’épreuve</h2><p className="mt-3 text-base leading-relaxed text-slate-600">Les interfaces ci-dessous reprennent la logique des wireframes fournis, tout en restant cohérentes avec le statut actuel du projet et la charte de la Boussole.</p></div>
          <div className="mt-8 grid gap-2 sm:grid-cols-4" role="tablist" aria-label="Étapes de la démonstration">
            {STEPS.map((step, index) => { const Icon = step.icon; const active = activeStep === index; return <button key={step.id} type="button" role="tab" aria-selected={active} aria-controls="prototype-preview" onClick={() => setActiveStep(index)} className="group rounded-2xl border-2 p-4 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-4" style={{ borderColor: active ? step.color : "#e2e8f0", backgroundColor: active ? `${step.color}10` : "#fff", outlineColor: step.color }}><span className="flex items-center justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-full text-white" style={{ backgroundColor: step.color }}><Icon className="h-4 w-4" /></span><span className="text-xs font-black" style={{ color: step.color }}>{step.num}</span></span><span className="mt-4 block font-extrabold text-slate-950">{step.label}</span><span className="mt-1 block text-xs leading-relaxed text-slate-500">{step.title}</span></button>; })}
          </div>
          <div id="prototype-preview" role="tabpanel" className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start">
            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5 lg:sticky lg:top-24"><span className="text-xs font-black uppercase tracking-[0.14em]" style={{ color: current.color }}>{current.num} · {current.label}</span><h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">{current.title}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{current.detail}</p><div className="mt-6 border-t border-slate-200 pt-5"><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Ce que la démo montre</p><p className="mt-2 text-sm leading-relaxed text-slate-600">Une interface peut être concrète sans promettre un résultat déjà produit. Les éléments interactifs servent ici à discuter la forme future du prototype.</p></div><div className="mt-6 flex gap-2"><button type="button" onClick={() => setActiveStep(Math.max(0, activeStep - 1))} disabled={activeStep === 0} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40">Précédent</button><button type="button" onClick={() => setActiveStep(Math.min(STEPS.length - 1, activeStep + 1))} disabled={activeStep === STEPS.length - 1} className="rounded-lg px-3 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40" style={{ backgroundColor: current.color }}>Suivant</button></div></aside>
            <ScreenPreview activeStep={activeStep} />
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:py-16"><div className="mx-auto max-w-6xl"><div className="grid gap-5 md:grid-cols-3"><div className="border-t-4 bg-white p-6 shadow-sm" style={{ borderColor: "#515792" }}><User className="h-7 w-7 text-[#515792]" /><h2 className="mt-4 text-lg font-extrabold text-slate-950">Pour les artistes</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Partir d’une pratique vécue et choisir une amélioration qui ne demande pas de devenir spécialiste du numérique.</p></div><div className="border-t-4 bg-white p-6 shadow-sm" style={{ borderColor: "#3aab8a" }}><Users className="h-7 w-7 text-[#18755e]" /><h2 className="mt-4 text-lg font-extrabold text-slate-950">Pour les structures</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Faire émerger des regards croisés, des priorités communes et les conditions d’un changement collaboratif.</p></div><div className="border-t-4 bg-white p-6 shadow-sm" style={{ borderColor: "#E07428" }}><FileText className="h-7 w-7 text-[#a94d14]" /><h2 className="mt-4 text-lg font-extrabold text-slate-950">Pour le prototype</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Tester les mots, les écrans, les restitutions et les pistes d’action avant de proposer une ouverture publique.</p></div></div></div></section>

      <section className="px-4 py-10"><div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8"><div className="flex items-start gap-4"><FileText className="mt-0.5 h-6 w-6 shrink-0 text-[#515792]" /><div><h2 className="font-extrabold text-slate-950">Ce que ces écrans ne font pas encore</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Ils ne lancent pas de diagnostic, ne calculent pas de score, ne sauvegardent pas de réponse et ne recommandent pas automatiquement un outil. Ils rendent simplement discutables les écrans et les gestes que le prototype devra confirmer avec les partenaires et les artistes.</p></div></div></div></section>

      <section className="bg-white px-4 pb-16 pt-8 text-center"><div className="mx-auto max-w-4xl"><h2 className="text-2xl font-extrabold text-slate-950">Votre réaction peut aider à définir ces écrans</h2><p className="mx-auto mt-3 max-w-2xl text-slate-600">Les partenaires peuvent partager ce qui semble juste, ce qui manque et ce qui devrait rester simple avant l’atelier et le cadrage du prototype.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Button className="text-white" style={{ backgroundColor: "#E07428" }} asChild><Link href="/partenaires/questionnaire">Répondre au questionnaire partenaire <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button variant="outline" className="border-[#515792] text-[#515792]" asChild><Link href="/partenaires">Comprendre la co-conception <ChevronRight className="ml-1 h-4 w-4" /></Link></Button></div></div></section>
    </div>
  );
}

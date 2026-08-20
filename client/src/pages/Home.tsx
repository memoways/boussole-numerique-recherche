/**
 * Accueil — site compagnon de la Boussole Numérique Culture en préparation.
 * Design : le premier écran distingue explicitement le site existant du futur outil ; deux profils ouvrent des récits et visuels de co-conception.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Brush,
  CalendarDays,
  Check,
  Compass,
  RotateCcw,
  Send,
  Users,
} from "lucide-react";
import { AnimatedRadarGraphic, type RadarDimension } from "@/components/AnimatedRadarGraphic";
import { InteractiveNarrativeIllustration, type NarrativeVisualKind } from "@/components/InteractiveNarrativeIllustration";
import { hasPartnerApi, partnerApi } from "@/lib/partnerApi";
import { Button } from "@/components/ui/button";

type PersonaId = "partenaire" | "artiste";

type FaqItem = {
  question: string;
  answer: string;
  link?: { label: string; href: string };
};

type Persona = {
  id: PersonaId;
  label: string;
  shortLabel: string;
  stickyLabel: string;
  recognition: string;
  eyebrow: string;
  title: string;
  introduction: string;
  questions: string[];
  contribution: string;
  faq: FaqItem[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  resourceLink?: { label: string; href: string };
  color: string;
  softColor: string;
  icon: typeof Users;
};

const RADAR_DIMENSIONS: RadarDimension[] = [
  { label: "Outils", couleur: "#515792", emoji: "⌁", resume: "Des outils plus cohérents avec les besoins et les usages." },
  { label: "Compétences", couleur: "#E07428", emoji: "↗", resume: "Des savoir-faire partagés, sans jugement ni classement." },
  { label: "Données", couleur: "#3aab8a", emoji: "◌", resume: "Des données plus lisibles et mieux maîtrisées." },
  { label: "Diffusion", couleur: "#3a7fc1", emoji: "◒", resume: "Des canaux choisis pour les publics et les projets." },
  { label: "Collaboration", couleur: "#7ab648", emoji: "↔", resume: "Des méthodes de travail qui soutiennent les personnes." },
];

const PERSONA_RADAR_DIMENSIONS: Record<PersonaId, RadarDimension[]> = {
  partenaire: [
    { label: "Écouter", couleur: "#515792", emoji: "◌", resume: "Faire remonter les situations vécues par les artistes." },
    { label: "Relayer", couleur: "#3a7fc1", emoji: "↗", resume: "Relier les besoins aux artistes, équipes et communautés." },
    { label: "Cadrer", couleur: "#E07428", emoji: "◆", resume: "Choisir ce qu’il faut préciser avant de concevoir." },
    { label: "Tester", couleur: "#3aab8a", emoji: "✓", resume: "Mettre les hypothèses à l’épreuve des usages." },
    { label: "Transmettre", couleur: "#7ab648", emoji: "↔", resume: "Partager les apprentissages, sans classement." },
  ],
  artiste: RADAR_DIMENSIONS,
};

const PERSONA_COMPASS_KIND: Record<PersonaId, NarrativeVisualKind> = {
  partenaire: "bridge",
  artiste: "journey",
};

const PERSONAS: Persona[] = [
  {
    id: "partenaire",
    label: "Je représente un partenaire culturel",
    shortLabel: "Partenaire culturel",
    stickyLabel: "Partenaire culturel",
    recognition: "Institution, association, réseau ou collectif qui accompagne des artistes et peut contribuer à définir l’outil.",
    eyebrow: "Parcours partenaire culturel",
    title: "Faire entrer les besoins des artistes dans les décisions qui construiront la Boussole.",
    introduction: "La Boussole n’existe pas encore. Les partenaires culturels peuvent aider à préciser ce qui doit être compris avant de développer un prototype : pratiques difficiles à faire évoluer, outils peu adaptés, procédures qui freinent la collaboration et conditions d’un test utile.",
    questions: [
      "Quelles pratiques numériques pèsent le plus sur les artistes et les équipes que vous accompagnez ?",
      "Quels conseils, améliorations ou repères devraient être directement actionnables après un état des lieux ?",
      "Quelles conditions rendraient le futur prototype utile, juste et praticable dans votre structure ou réseau ?",
    ],
    contribution: "Le questionnaire, l’atelier et le cadrage serviront à décider ensemble quel prototype développer. Il ne s’agit pas de valider un outil déjà construit.",
    faq: [
      { question: "La Boussole est-elle déjà disponible pour nos membres ?", answer: "Non. Le site compagnon existe pour informer et organiser la co-conception. L’atelier et le cadrage prévus entre septembre et octobre doivent préciser le prototype ; une version à tester est visée pour la fin 2026." },
      { question: "Quel engagement est attendu de notre structure ?", answer: "Vous pouvez répondre au questionnaire, signaler des situations concrètes et participer aux échanges de co-conception. Les tests se décideront ensuite avec les organisations et les artistes qui souhaitent s’y associer.", link: { label: "Voir le calendrier indicatif", href: "/timeline" } },
      { question: "Que deviendront nos retours ?", answer: "Ils serviront à définir les questions, les priorités et les critères de réussite du prototype. Ils ne produiront pas de note ni de classement public des organisations.", link: { label: "Lire les principes de la démarche", href: "/methode" } },
    ],
    primary: { label: "Répondre au questionnaire partenaire", href: "/partenaires/questionnaire" },
    secondary: { label: "Comprendre la co-conception", href: "/partenaires/presentation" },
    resourceLink: { label: "Voir les recherches et exemples mobilisés", href: "/references" },
    color: "#515792",
    softColor: "#f0f1f8",
    icon: Users,
  },
  {
    id: "artiste",
    label: "Je suis artiste ou actif·ve dans la culture",
    shortLabel: "Artiste",
    stickyLabel: "Artiste",
    recognition: "Création, médiation, diffusion ou pratique culturelle. Votre expérience aidera à définir un outil qui apporte des conseils utiles.",
    eyebrow: "Parcours artiste",
    title: "Vers des pratiques numériques plus simples, plus collaboratives et plus agréables à faire évoluer.",
    introduction: "Le futur prototype devra partir de situations concrètes : outils qui ne soutiennent pas le travail, procédures difficiles à partager, pratiques numériques qui créent de la friction. Il ne s’agira pas d’auditer ni de noter, mais de produire un état des lieux et des conseils actionnables pour mieux choisir quoi améliorer.",
    questions: [
      "Quelle situation numérique vous pèse le plus dans votre pratique culturelle ?",
      "Quel conseil ou quelle amélioration vous aiderait à mieux travailler avec vos outils et vos collaborations ?",
      "Qu’est-ce qu’un prototype destiné aux artistes devrait comprendre avant de proposer une piste d’action ?",
    ],
    contribution: "Vous pouvez signaler votre intérêt, partager une situation ou rejoindre les étapes de co-conception. Ces retours prépareront l’atelier, le prototype à tester et son ouverture publique visée début 2027.",
    faq: [
      { question: "Puis-je utiliser la Boussole dès maintenant ?", answer: "Non. La Boussole est en préparation. Ce site compagnon recueille les retours qui aideront à la co-concevoir avec les partenaires et les artistes, avant le développement d’un prototype." },
      { question: "Le futur outil évaluera-t-il mon niveau numérique ?", answer: "Non. Le prototype devra aider à comprendre des pratiques, des contraintes et des priorités. Il ne donnera pas de note et ne jugera pas vos compétences.", link: { label: "Voir les dimensions envisagées", href: "/experience" } },
      { question: "Comment participer avant l’atelier ?", answer: "Vous pouvez signaler un intérêt, décrire une situation ou contacter l’équipe de projet. Participer maintenant ne vous engage pas à rejoindre toutes les étapes à venir." },
    ],
    primary: { label: "Signaler mon intérêt pour le projet", href: "#interet" },
    secondary: { label: "Voir les dimensions du futur prototype", href: "/experience" },
    resourceLink: { label: "Lire les recherches et exemples qui fondent le projet", href: "/recherche" },
    color: "#E07428",
    softColor: "#fdf3ec",
    icon: Brush,
  },
];

function getPersonaFromUrl(): PersonaId | null {
  const value = new URLSearchParams(window.location.search).get("public");
  return value === "partenaire" || value === "artiste" ? value : null;
}

function PersonaVisualizations({ persona }: { persona: Persona }) {
  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col gap-10" aria-label={`Représentations explicatives du futur outil pour ${persona.shortLabel}`}>
      <div>
        <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Repères du futur outil</p>
        <AnimatedRadarGraphic key={`${persona.id}-radar`} dimensions={PERSONA_RADAR_DIMENSIONS[persona.id]} interactive className="mx-auto h-60 w-60 sm:h-64 sm:w-64" ariaLabel={`Radar illustratif : ${persona.shortLabel}`} />
      </div>
      <div>
        <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Chemin de co-conception</p>
        <InteractiveNarrativeIllustration key={`${persona.id}-compass`} kind={PERSONA_COMPASS_KIND[persona.id]} accent={persona.color} plainSummary />
      </div>
    </div>
  );
}

function StickyPersonaMenu({ activePersona, onSelect, visible }: { activePersona: PersonaId | null; onSelect: (personaId: PersonaId) => void; visible: boolean }) {
  if (!activePersona || !visible) return null;

  return (
    <nav className="fixed inset-x-0 top-14 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md sm:top-16" aria-label="Profil sélectionné">
      <div className="mx-auto flex min-h-12 max-w-6xl items-center gap-2 px-3 py-1.5 sm:px-5">
        <span className="hidden shrink-0 text-xs font-black uppercase tracking-[0.13em] text-slate-500 lg:inline">Profil</span>
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-1.5">
          {PERSONAS.map((persona) => {
            const isActive = persona.id === activePersona;
            const Icon = persona.icon;
            return (
              <button
                key={persona.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(persona.id)}
                className="flex min-w-0 items-center justify-center gap-1.5 rounded-md px-2 py-2 text-center text-[11px] font-bold leading-tight transition-[transform,background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-xs"
                style={{ backgroundColor: isActive ? persona.color : persona.softColor, color: isActive ? "#fff" : persona.color, boxShadow: isActive ? `inset 0 0 0 1px ${persona.color}` : "inset 0 0 0 1px transparent", outlineColor: persona.color }}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span className="whitespace-normal">{persona.stickyLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

function PersonaStory({ persona }: { persona: Persona }) {
  const Icon = persona.icon;
  const isInternal = (href: string) => href.startsWith("/");

  return (
    <section id="parcours-personnalise" className="scroll-mt-32 border-y border-slate-200 bg-white px-4 py-16 sm:py-20" aria-labelledby="persona-story-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: persona.color }}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>{persona.eyebrow}</p>
            </div>
            <h2 id="persona-story-title" tabIndex={-1} className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{persona.title}</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{persona.introduction}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {persona.questions.map((question, index) => <div key={question} className="px-4 py-1"><span className="text-xs font-black" style={{ color: persona.color }}>0{index + 1}</span><p className="mt-1 text-sm font-medium leading-snug text-slate-700">{question}</p></div>)}
            </div>

            <p className="mt-8 max-w-3xl py-1 text-base font-semibold leading-relaxed text-slate-800">{persona.contribution}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button className="font-semibold text-white" style={{ backgroundColor: "#E07428" }} asChild>
                {isInternal(persona.primary.href) ? <Link href={persona.primary.href}>{persona.primary.label} <ArrowRight className="ml-2 h-4 w-4" /></Link> : <a href={persona.primary.href}>{persona.primary.label} <ArrowRight className="ml-2 h-4 w-4" /></a>}
              </Button>
              <Button variant="outline" className="border-2 font-semibold" style={{ borderColor: persona.color, color: persona.color }} asChild>
                {isInternal(persona.secondary.href) ? <Link href={persona.secondary.href}>{persona.secondary.label} <ArrowUpRight className="ml-2 h-4 w-4" /></Link> : <a href={persona.secondary.href}>{persona.secondary.label} <ArrowUpRight className="ml-2 h-4 w-4" /></a>}
              </Button>
            </div>
            {persona.resourceLink && <Link href={persona.resourceLink.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: persona.color }}>{persona.resourceLink.label} <ArrowUpRight className="h-4 w-4" /></Link>}
          </div>

          <aside className="lg:pl-3"><PersonaVisualizations persona={persona} /></aside>
        </div>
      </div>
    </section>
  );
}

function PersonaFaq({ persona }: { persona: Persona }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="border-b border-slate-200 bg-slate-50 px-4 py-14 sm:py-16" aria-labelledby={`faq-${persona.id}-title`}>
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Questions fréquentes</p>
          <h2 id={`faq-${persona.id}-title`} className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Ce que vous pouvez vouloir savoir maintenant</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">Ces réponses précisent ce que le site compagnon propose aujourd’hui et ce que le futur outil doit encore définir.</p>
        </div>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 bg-white">
          {persona.faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-${persona.id}-${index}`;
            return <div key={item.question}><h3><button type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-bold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px]" style={{ outlineColor: persona.color }}><span>{item.question}</span><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-normal" style={{ backgroundColor: isOpen ? persona.color : persona.softColor, color: isOpen ? "#fff" : persona.color }} aria-hidden="true">{isOpen ? "−" : "+"}</span></button></h3><div id={panelId} role="region" aria-label={`Réponse : ${item.question}`} hidden={!isOpen} className="px-5 pb-6"><p className="max-w-3xl text-base leading-relaxed text-slate-600">{item.answer}</p>{item.link && <Link href={item.link.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: persona.color }}>{item.link.label} <ArrowRight className="h-4 w-4" /></Link>}</div></div>;
          })}
        </div>
      </div>
    </section>
  );
}

function NeutralOverview() {
  return (
    <section className="bg-white px-4 py-14 sm:py-16" aria-labelledby="why-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#515792]">Ce que le futur prototype devra apporter</p>
            <h2 id="why-title" className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Mieux choisir les outils, les méthodes et les améliorations qui rendent le numérique plus praticable.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">Des outils peu adaptés, des consignes difficiles à partager ou des pratiques isolées peuvent rendre le numérique pesant. Cela ne traduit pas un manque de compétence. Cela montre qu’il faut des repères pour comprendre quoi faire évoluer ensemble.</p>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">Le prototype visé devra produire un état des lieux non jugeant et des conseils actionnables. Il devra aider à améliorer les outils, les procédures et les manières de collaborer, sans imposer une solution unique.</p>
          </div>
          <div className="space-y-3 border-l-2 border-[#3aab8a] pl-5 text-sm leading-relaxed text-slate-600">
            <p><span className="font-bold text-slate-900">Aujourd’hui :</span> le site informe, recueille les retours et permet de rejoindre la co-conception.</p>
            <p><span className="font-bold text-slate-900">Après le cadrage :</span> un prototype à tester est visé fin 2026, puis une ouverture publique début 2027.</p>
            <Link href="/timeline" className="inline-flex items-center gap-2 font-bold text-[#3a7fc1] underline underline-offset-4">Voir le calendrier indicatif <CalendarDays className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InterestForm() {
  const [form, setForm] = useState({ firstName: "", email: "", audience: "artist" as const, workshopInterest: true, notificationInterest: true, consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hasPartnerApi()) return;
    setError("");
    setStatus("sending");
    try {
      await partnerApi("/api/public/interests", { method: "POST", body: JSON.stringify({ ...form, sourcePath: `${window.location.pathname}${window.location.search}` }) });
      setStatus("sent");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Votre intérêt n’a pas pu être enregistré.");
      setStatus("idle");
    }
  };

  if (!hasPartnerApi()) return <div className="border border-white/20 bg-white/5 p-6"><p className="text-lg font-bold">Participer au projet</p><p className="mt-2 text-sm leading-relaxed text-slate-300">La collecte sécurisée sera ouverte avec le module partenaire. En attendant, vous pouvez écrire à l’équipe de projet pour signaler votre intérêt, participer à l’atelier, tester le prototype ou être informé·e de l’ouverture publique.</p><Button className="mt-5 w-full font-semibold text-white" style={{ backgroundColor: "#E07428" }} asChild><a href="mailto:ulrich.fischer@memoways.com?subject=Boussole%20Num%C3%A9rique%20Culture%20%E2%80%94%20Participer%20au%20projet">Contacter l’équipe de projet <ArrowRight className="ml-2 h-4 w-4" /></a></Button><p className="mt-3 text-xs leading-relaxed text-slate-400">Aucune donnée n’est envoyée depuis cette page tant que la collecte sécurisée n’est pas activée.</p></div>;
  if (status === "sent") return <div className="border border-emerald-300/50 bg-emerald-400/10 p-6"><Check className="h-8 w-8 text-[#7ed3be]" /><p className="mt-4 text-lg font-bold">Votre intérêt est enregistré</p><p className="mt-2 text-sm leading-relaxed text-slate-200">Nous vous contacterons uniquement pour les étapes que vous avez choisies. Vous pourrez retirer votre accord en écrivant à l’équipe de projet.</p></div>;

  return <form onSubmit={submit} className="border border-white/20 bg-white/5 p-6"><p className="text-lg font-bold">Participer au projet</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Choisissez librement les étapes auxquelles vous souhaitez rester relié·e.</p><label className="mt-5 block text-sm font-semibold">Prénom <span className="font-normal text-slate-400">(facultatif)</span><input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="mt-2 w-full border border-white/20 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-[#7ed3be] focus:ring-2 focus:ring-[#7ed3be]/25" /></label><label className="mt-4 block text-sm font-semibold">Adresse e-mail<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full border border-white/20 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-[#7ed3be] focus:ring-2 focus:ring-[#7ed3be]/25" /></label><fieldset className="mt-5 space-y-3"><legend className="text-sm font-semibold">Je souhaite :</legend><label className="flex items-start gap-3 text-sm leading-relaxed text-slate-200"><input type="checkbox" checked={form.workshopInterest} onChange={(event) => setForm({ ...form, workshopInterest: event.target.checked })} className="mt-1 accent-[#E07428]" />Être informé·e de l’atelier et des étapes de co-conception</label><label className="flex items-start gap-3 text-sm leading-relaxed text-slate-200"><input type="checkbox" checked={form.notificationInterest} onChange={(event) => setForm({ ...form, notificationInterest: event.target.checked })} className="mt-1 accent-[#E07428]" />Être informé·e lorsqu’une ouverture publique sera proposée</label></fieldset><label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-slate-300"><input type="checkbox" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-0.5 accent-[#E07428]" />J’accepte que l’équipe de projet conserve mon adresse e-mail afin de me contacter uniquement pour les étapes sélectionnées. Je peux retirer cet accord à tout moment en écrivant à ulrich.fischer@memoways.com.</label>{error && <p className="mt-4 text-sm font-medium text-[#ffd0b0]">{error}</p>}<Button type="submit" disabled={status === "sending"} className="mt-5 w-full font-semibold text-white" style={{ backgroundColor: "#E07428" }}>{status === "sending" ? "Enregistrement…" : "Enregistrer mon intérêt"}<ArrowRight className="ml-2 h-4 w-4" /></Button></form>;
}

export default function Home() {
  const [activePersona, setActivePersona] = useState<PersonaId | null>(null);
  const [hasPassedPersonaSelector, setHasPassedPersonaSelector] = useState(false);
  const [isProfileTransition, setIsProfileTransition] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const personaSelectorRef = useRef<HTMLDivElement>(null);
  const profileTransitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const syncPersona = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("public") === "enjeux-numeriques") {
        params.delete("public");
        const query = params.toString();
        window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
      }
      setActivePersona(getPersonaFromUrl());
    };
    syncPersona();
    window.addEventListener("popstate", syncPersona);
    return () => window.removeEventListener("popstate", syncPersona);
  }, []);

  useEffect(() => {
    const target = personaSelectorRef.current;
    if (!target || !activePersona) { setHasPassedPersonaSelector(false); return; }
    const updateStickyThreshold = () => {
      const fixedBarsHeight = window.matchMedia("(min-width: 640px)").matches ? 128 : 112;
      setHasPassedPersonaSelector(target.getBoundingClientRect().bottom <= fixedBarsHeight);
    };
    updateStickyThreshold();
    window.addEventListener("scroll", updateStickyThreshold, { passive: true });
    window.addEventListener("resize", updateStickyThreshold);
    return () => { window.removeEventListener("scroll", updateStickyThreshold); window.removeEventListener("resize", updateStickyThreshold); };
  }, [activePersona]);

  useEffect(() => () => { if (profileTransitionTimeoutRef.current) window.clearTimeout(profileTransitionTimeoutRef.current); }, []);

  const selectPersona = (personaId: PersonaId) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("public", personaId);
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    if (profileTransitionTimeoutRef.current) window.clearTimeout(profileTransitionTimeoutRef.current);
    setIsProfileTransition(true);
    setActivePersona(personaId);
    window.requestAnimationFrame(() => {
      const target = storyRef.current;
      if (!target) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
      target.focus({ preventScroll: true });
      profileTransitionTimeoutRef.current = window.setTimeout(() => setIsProfileTransition(false), reducedMotion ? 0 : 500);
    });
  };

  const resetPersona = () => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("public");
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    if (profileTransitionTimeoutRef.current) window.clearTimeout(profileTransitionTimeoutRef.current);
    setIsProfileTransition(false);
    setActivePersona(null);
  };

  const active = PERSONAS.find((persona) => persona.id === activePersona) ?? null;

  return (
    <div className="bg-white">
      <section className="px-4 pb-16 pt-28 sm:pb-20 sm:pt-36" style={{ background: "linear-gradient(155deg, #f4f5fb 0%, #fff8f2 52%, #f2faf7 100%)" }} aria-labelledby="persona-selector-title">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#515792]">Site compagnon · Boussole en préparation</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"><span className="block bg-[linear-gradient(90deg,#515792_0%,#3a7fc1_20%,#3aab8a_43%,#7ab648_60%,#E07428_80%)] bg-clip-text text-transparent">Boussole Numérique Culture</span></h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">Ce site accompagne la préparation d’une Boussole pour les artistes des milieux culturels genevois. <strong>La Boussole n’existe pas encore.</strong> Le site informe, recueille les retours et prépare sa co-conception avec les partenaires et les artistes.</p>

          <ol className="mx-auto mt-8 grid max-w-5xl gap-3 text-left sm:grid-cols-2 lg:grid-cols-4" aria-label="Étapes indicatives du projet">
            {[{ moment: "Aujourd’hui", detail: "Informer et recueillir les retours", color: "#515792" }, { moment: "Sept.–oct. 2026", detail: "Atelier et cadrage de co-conception", color: "#3a7fc1" }, { moment: "Fin 2026", detail: "Prototype à tester visé", color: "#3aab8a" }, { moment: "Début 2027", detail: "Ouverture publique visée", color: "#E07428" }].map((step, index) => <li key={step.moment} className="border border-slate-200 bg-white/85 p-4 shadow-sm"><span className="text-xs font-black uppercase tracking-[0.12em]" style={{ color: step.color }}>0{index + 1} · {step.moment}</span><span className="mt-1.5 block text-sm font-semibold leading-snug text-slate-800">{step.detail}</span></li>)}
          </ol>

          <div className="mt-11"><h2 id="persona-selector-title" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Entrée dans le site par profil</h2><p className="mx-auto mt-2 max-w-2xl text-base leading-relaxed text-slate-600">Choisissez le rôle depuis lequel vous souhaitez contribuer à la co-conception.</p></div>
          <div ref={personaSelectorRef} className="mx-auto mt-6 grid max-w-4xl gap-4 sm:grid-cols-2" role="group" aria-label="Sélection du type de public">
            {PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const selected = activePersona === persona.id;
              return <button key={persona.id} type="button" aria-pressed={selected} onClick={() => selectPersona(persona.id)} className="group relative min-h-36 rounded-2xl border-2 p-5 text-left shadow-sm transition-[transform,background-color,color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4" style={{ backgroundColor: selected ? persona.color : persona.softColor, borderColor: persona.color, color: selected ? "#fff" : "#17223b", boxShadow: selected ? `0 12px 24px ${persona.color}33` : "0 4px 12px rgba(15, 23, 42, 0.05)", outlineColor: persona.color }}><span className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: selected ? "rgba(255,255,255,0.92)" : persona.color, color: selected ? persona.color : "#fff" }}><Icon className="h-5 w-5" aria-hidden="true" /></span>{selected && <Check className="h-5 w-5" aria-label="Profil sélectionné" />}</span><span className="mt-4 block text-base font-extrabold leading-snug">{persona.stickyLabel}</span><span className="mt-1.5 block text-sm leading-snug" style={{ color: selected ? "rgba(255,255,255,0.88)" : "#64748b" }}>{persona.recognition}</span></button>;
            })}
          </div>
        </div>
      </section>

      <StickyPersonaMenu activePersona={activePersona} onSelect={selectPersona} visible={Boolean(activePersona && (isProfileTransition || hasPassedPersonaSelector))} />

      {active ? <div ref={storyRef} tabIndex={-1} className="scroll-mt-28 outline-none sm:scroll-mt-32"><PersonaStory persona={active} /><PersonaFaq key={active.id} persona={active} /><div className="border-b border-slate-200 bg-slate-50 px-4 py-6 text-center"><button type="button" onClick={resetPersona} className="inline-flex items-center gap-2 text-sm font-bold text-[#515792] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"><RotateCcw className="h-4 w-4" /> Revenir aux deux profils</button></div></div> : <NeutralOverview />}

      <section id="interet" className="scroll-mt-24 bg-slate-950 px-4 py-16 text-white sm:py-20" aria-labelledby="interest-title">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#7ed3be]">Rejoindre la co-conception</p><h2 id="interest-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Vous souhaitez participer au projet ?</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Les retours recueillis aujourd’hui prépareront l’atelier et le cadrage de l’automne. Vous pouvez vous signaler pour contribuer, tester le prototype ou être informé·e de l’ouverture publique visée début 2027.</p><div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200"><span className="inline-flex items-center gap-2"><Compass className="h-4 w-4 text-[#7ed3be]" /> Atelier et cadrage</span><span className="inline-flex items-center gap-2"><Send className="h-4 w-4 text-[#7ed3be]" /> Information sur l’ouverture</span></div></div>
          <InterestForm />
        </div>
      </section>
    </div>
  );
}

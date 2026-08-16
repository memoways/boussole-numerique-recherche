/**
 * Accueil — lanceur de parcours Boussole Numérique Culture.
 * Design : le hero reste neutre et bref ; le choix explicite d’un persona déplie un récit 2/3 contenu, 1/3 illustration.
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
  Lightbulb,
  Network,
  RotateCcw,
  Send,
  Users,
} from "lucide-react";
import { AnimatedRadarGraphic, type RadarDimension } from "@/components/AnimatedRadarGraphic";
import { hasPartnerApi, partnerApi } from "@/lib/partnerApi";
import { Button } from "@/components/ui/button";

type PersonaId = "partenaire" | "artiste" | "enjeux-numeriques";

type Persona = {
  id: PersonaId;
  label: string;
  shortLabel: string;
  recognition: string;
  eyebrow: string;
  title: string;
  introduction: string;
  questions: string[];
  contribution: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  deepLink: { label: string; href: string };
  color: string;
  softColor: string;
  icon: typeof Users;
};

const RADAR_DIMENSIONS: RadarDimension[] = [
  { label: "Outils", couleur: "#515792", emoji: "⌁", resume: "Des outils cohérents avec les usages réels." },
  { label: "Compétences", couleur: "#E07428", emoji: "↗", resume: "Des savoir-faire partagés, sans jugement." },
  { label: "Données", couleur: "#3aab8a", emoji: "◌", resume: "Des données lisibles et mieux maîtrisées." },
  { label: "Diffusion", couleur: "#3a7fc1", emoji: "◒", resume: "Des canaux choisis pour les publics." },
  { label: "Collaboration", couleur: "#7ab648", emoji: "↔", resume: "Des pratiques de travail qui circulent." },
];

const PERSONAS: Persona[] = [
  {
    id: "partenaire",
    label: "Je représente une structure ou un réseau culturel",
    shortLabel: "Partenaire relais",
    recognition: "Institution, association, structure, réseau ou collectif qui relie des artistes",
    eyebrow: "Parcours partenaire",
    title: "Relier le prototype aux réalités des artistes",
    introduction: "Votre organisation connaît les usages, les contraintes et les priorités de personnes actives dans la culture. Elle peut aider à formuler les bonnes questions, mettre les hypothèses à l’épreuve et préparer les conditions d’un test utile.",
    questions: [
      "Quelles frictions numériques vos membres rencontrent-ils aujourd’hui ?",
      "Quelles questions la Boussole devrait-elle poser pour être vraiment utile ?",
      "Comment votre structure pourrait-elle devenir un relais pendant les tests ?",
    ],
    contribution: "La phase actuelle recueille les retours qui prépareront l’atelier de co-conception et le choix du prototype.",
    primary: { label: "Comprendre le rôle des partenaires", href: "/partenaires/presentation" },
    secondary: { label: "Partager besoins et idées", href: "/partenaires/questionnaire" },
    deepLink: { label: "Voir le parcours partenaire", href: "/partenaires" },
    color: "#515792",
    softColor: "#f0f1f8",
    icon: Users,
  },
  {
    id: "artiste",
    label: "Je suis artiste ou actif·ve dans la culture",
    shortLabel: "Artiste et futur utilisateur",
    recognition: "Création, médiation, diffusion ou pratique culturelle à titre individuel",
    eyebrow: "Parcours artistes",
    title: "Faire émerger les questions qui comptent dans votre quotidien",
    introduction: "La future Boussole doit aider à rendre les pratiques numériques plus discutables et moins solitaires. Avant de définir le prototype, l’équipe de projet cherche à comprendre ce qui vous fait gagner du temps, ce qui vous fatigue et ce qui mérite un vrai accompagnement.",
    questions: [
      "Quels outils ou usages vous compliquent la vie sans réellement vous aider ?",
      "Sur quels sujets aimeriez-vous pouvoir faire le point sans être évalué·e ?",
      "Qu’aimeriez-vous apporter à un atelier qui définira un outil destiné aux artistes ?",
    ],
    contribution: "Vous pouvez signaler votre intérêt pour un atelier, pour les futurs tests ou pour être informé·e quand une première version sera prête.",
    primary: { label: "Signaler mon intérêt", href: "#interet" },
    secondary: { label: "Explorer l’expérience Boussole", href: "/experience" },
    deepLink: { label: "Comprendre les cinq dimensions", href: "/projet#proposition" },
    color: "#E07428",
    softColor: "#fdf3ec",
    icon: Brush,
  },
  {
    id: "enjeux-numeriques",
    label: "Je m’intéresse aux enjeux du numérique dans la culture",
    shortLabel: "Enjeux numériques",
    recognition: "Recherche, littératie numérique, pratiques responsables et apprentissages collectifs",
    eyebrow: "Parcours ressources",
    title: "Documenter un enjeu culturel qui dépasse les outils",
    introduction: "La Boussole part d’une situation précise : des pratiques numériques qui pèsent sur le travail culturel sans toujours donner les moyens de choisir, partager ou progresser. Le site rassemble des enseignements, des références et une méthode pour traiter cet écart de manière collaborative.",
    questions: [
      "Comment rendre la littératie numérique plus concrète pour des pratiques culturelles variées ?",
      "Quelles conditions rendent une démarche de diagnostic réellement appropriable ?",
      "Quelles ressources, exemples ou alertes devraient nourrir la co-conception ?",
    ],
    contribution: "Vous pouvez suivre la démarche, consulter les sources et indiquer si vous souhaitez contribuer à la réflexion ou recevoir ses prochaines étapes.",
    primary: { label: "Consulter la recherche et les ressources", href: "/recherche" },
    secondary: { label: "Suivre la démarche", href: "#interet" },
    deepLink: { label: "Lire la méthode de co-conception", href: "/methode" },
    color: "#3aab8a",
    softColor: "#eef9f5",
    icon: Lightbulb,
  },
];

function getPersonaFromUrl(): PersonaId | null {
  const value = new URLSearchParams(window.location.search).get("public");
  return PERSONAS.some((persona) => persona.id === value) ? value as PersonaId : null;
}

function PersonaIllustration({ persona }: { persona: Persona }) {
  if (persona.id === "artiste") {
    return (
      <div className="relative mx-auto flex w-full max-w-[320px] flex-col items-center">
        <AnimatedRadarGraphic
          dimensions={RADAR_DIMENSIONS}
          interactive
          className="h-64 w-64 sm:h-72 sm:w-72"
          ariaLabel="Cinq dimensions à explorer dans la future Boussole"
        />
        <p className="mt-2 max-w-[270px] text-center text-sm leading-relaxed text-slate-500">
          Il ne s’agit pas d’attribuer une note, mais de repérer ce qui mérite une attention.
        </p>
      </div>
    );
  }

  if (persona.id === "partenaire") {
    const steps = ["Relayer", "Mettre à l’épreuve", "Faire circuler"];
    return (
      <div className="mx-auto flex w-full max-w-[330px] flex-col gap-4" aria-label="Le rôle partenaire en trois gestes">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3" style={{ color: persona.color }}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-black text-white" style={{ backgroundColor: persona.color }}>
              0{index + 1}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-slate-900">{step}</p>
              <p className="text-sm leading-snug text-slate-500">
                {index === 0 ? "Faire remonter les situations et les questions du terrain." : index === 1 ? "Tester les formulations et les priorités du prototype." : "Préparer un lien utile vers les personnes concernées."}
              </p>
            </div>
          </div>
        ))}
        <div className="ml-5 h-8 border-l-2 border-dashed" style={{ borderColor: `${persona.color}80` }} aria-hidden="true" />
        <p className="ml-8 text-sm font-semibold" style={{ color: persona.color }}>Un prototype défini avec le terrain, étape par étape.</p>
      </div>
    );
  }

  const nodes = ["Pratiques", "Questions", "Ressources", "Choix partagés"];
  return (
    <div className="relative mx-auto grid w-full max-w-[330px] grid-cols-2 gap-3" aria-label="Les éléments reliés par la démarche">
      {nodes.map((node, index) => (
        <div
          key={node}
          className={`min-h-24 rounded-2xl px-4 py-4 ${index === 3 ? "col-span-2" : ""}`}
          style={{ backgroundColor: index === 3 ? persona.color : `${persona.color}12`, color: index === 3 ? "#fff" : persona.color }}
        >
          <Network className="mb-2 h-5 w-5" aria-hidden="true" />
          <p className="text-sm font-bold leading-tight">{node}</p>
        </div>
      ))}
      <p className="col-span-2 mt-1 text-center text-sm leading-relaxed text-slate-500">Comprendre les liens, plutôt que chercher une solution universelle.</p>
    </div>
  );
}

function PersonaStory({ persona }: { persona: Persona }) {
  const Icon = persona.icon;
  const isInternal = (href: string) => href.startsWith("/");

  return (
    <section id="parcours-personnalise" className="scroll-mt-24 border-y border-slate-200 bg-white px-4 py-16 sm:py-20" aria-labelledby="persona-story-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(250px,1fr)] lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: persona.color }}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>{persona.eyebrow}</p>
            </div>
            <h2 id="persona-story-title" tabIndex={-1} className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              {persona.title}
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">{persona.introduction}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {persona.questions.map((question, index) => (
                <div key={question} className="border-l-2 px-4 py-1" style={{ borderColor: persona.color }}>
                  <span className="text-xs font-black" style={{ color: persona.color }}>0{index + 1}</span>
                  <p className="mt-1 text-sm font-medium leading-snug text-slate-700">{question}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl border-l-4 py-1 pl-4 text-base font-semibold leading-relaxed text-slate-800" style={{ borderColor: persona.color }}>
              {persona.contribution}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button className="font-semibold text-white" style={{ backgroundColor: "#E07428" }} asChild>
                {isInternal(persona.primary.href) ? <Link href={persona.primary.href}>{persona.primary.label} <ArrowRight className="ml-2 h-4 w-4" /></Link> : <a href={persona.primary.href}>{persona.primary.label} <ArrowRight className="ml-2 h-4 w-4" /></a>}
              </Button>
              <Button variant="outline" className="border-2 font-semibold" style={{ borderColor: persona.color, color: persona.color }} asChild>
                {isInternal(persona.secondary.href) ? <Link href={persona.secondary.href}>{persona.secondary.label} <ArrowUpRight className="ml-2 h-4 w-4" /></Link> : <a href={persona.secondary.href}>{persona.secondary.label} <ArrowUpRight className="ml-2 h-4 w-4" /></a>}
              </Button>
            </div>
            <Link href={persona.deepLink.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: persona.color }}>
              {persona.deepLink.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <aside className="lg:pl-3">
            <PersonaIllustration persona={persona} />
          </aside>
        </div>
      </div>
    </section>
  );
}

function NeutralOverview() {
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-14 sm:py-16" aria-labelledby="why-title">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#515792]">Ce qui se construit maintenant</p>
            <h2 id="why-title" className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Un outil pour transformer des questions diffuses en prochaines étapes discutables.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">La Boussole ne cherche pas à classer les personnes, ni à prescrire un outil commercial. Elle devra aider à comprendre des pratiques, à situer des priorités et à ouvrir une conversation entre artistes, structures et personnes qui les accompagnent.</p>
          </div>
          <div className="space-y-3 border-l-2 border-[#3aab8a] pl-5 text-sm leading-relaxed text-slate-600">
            <p><span className="font-bold text-slate-900">Phase actuelle :</span> écouter, mobiliser et préciser le problème avec les personnes concernées.</p>
            <p><span className="font-bold text-slate-900">Étapes suivantes :</span> choisir un prototype, le tester, puis préparer une diffusion et un accompagnement adaptés.</p>
            <Link href="/timeline" className="inline-flex items-center gap-2 font-bold text-[#3a7fc1] underline underline-offset-4">Voir les phases de l’outil <CalendarDays className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function InterestForm({ activePersona }: { activePersona: PersonaId | null }) {
  const defaultAudience = activePersona === "enjeux-numeriques" ? "digital_interest" : "artist";
  const [form, setForm] = useState({ firstName: "", email: "", audience: defaultAudience as "artist" | "digital_interest", workshopInterest: true, notificationInterest: true, consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((current) => ({ ...current, audience: activePersona === "enjeux-numeriques" ? "digital_interest" : "artist" }));
  }, [activePersona]);

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

  if (!hasPartnerApi()) {
    return <div className="border border-white/20 bg-white/5 p-6"><p className="text-lg font-bold">Inscription d’intérêt</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Le formulaire sécurisé sera ouvert avec le module de collecte. En attendant son activation, vous pouvez écrire à l’équipe de projet en précisant si vous souhaitez participer à un atelier, tester le prototype ou être informé·e de son ouverture.</p><Button className="mt-5 w-full font-semibold text-white" style={{ backgroundColor: "#E07428" }} asChild><a href="mailto:ulrich.fischer@memoways.com?subject=Boussole%20Num%C3%A9rique%20Culture%20%E2%80%94%20Manifestation%20d%E2%80%99int%C3%A9r%C3%AAt">Signaler mon intérêt <ArrowRight className="ml-2 h-4 w-4" /></a></Button><p className="mt-3 text-xs leading-relaxed text-slate-400">Aucune donnée n’est envoyée depuis cette page tant que la collecte sécurisée n’est pas activée.</p></div>;
  }
  if (status === "sent") {
    return <div className="border border-emerald-300/50 bg-emerald-400/10 p-6"><Check className="h-8 w-8 text-[#7ed3be]" /><p className="mt-4 text-lg font-bold">Votre intérêt est enregistré</p><p className="mt-2 text-sm leading-relaxed text-slate-200">Nous vous contacterons uniquement pour les étapes que vous avez choisies. Vous pourrez retirer votre accord en écrivant à l’équipe de projet.</p></div>;
  }
  return <form onSubmit={submit} className="border border-white/20 bg-white/5 p-6"><p className="text-lg font-bold">Inscription d’intérêt</p><p className="mt-2 text-sm leading-relaxed text-slate-300">Choisissez librement ce que vous souhaitez suivre. Les deux choix sont indépendants.</p><label className="mt-5 block text-sm font-semibold">Prénom <span className="font-normal text-slate-400">(facultatif)</span><input value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="mt-2 w-full border border-white/20 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-[#7ed3be] focus:ring-2 focus:ring-[#7ed3be]/25" /></label><label className="mt-4 block text-sm font-semibold">Adresse e-mail<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full border border-white/20 bg-white px-3 py-2.5 text-slate-950 outline-none focus:border-[#7ed3be] focus:ring-2 focus:ring-[#7ed3be]/25" /></label><fieldset className="mt-5 space-y-3"><legend className="text-sm font-semibold">Je souhaite :</legend><label className="flex items-start gap-3 text-sm leading-relaxed text-slate-200"><input type="checkbox" checked={form.workshopInterest} onChange={(event) => setForm({ ...form, workshopInterest: event.target.checked })} className="mt-1 accent-[#E07428]" />Être informé·e des ateliers de co-conception</label><label className="flex items-start gap-3 text-sm leading-relaxed text-slate-200"><input type="checkbox" checked={form.notificationInterest} onChange={(event) => setForm({ ...form, notificationInterest: event.target.checked })} className="mt-1 accent-[#E07428]" />Être informé·e lorsqu’une première version de l’outil sera ouverte</label></fieldset><label className="mt-5 flex items-start gap-3 text-xs leading-relaxed text-slate-300"><input type="checkbox" required checked={form.consent} onChange={(event) => setForm({ ...form, consent: event.target.checked })} className="mt-0.5 accent-[#E07428]" />J’accepte que l’équipe de projet conserve mon adresse e-mail afin de me contacter uniquement pour les étapes sélectionnées. Je peux retirer cet accord à tout moment en écrivant à ulrich.fischer@memoways.com.</label>{error && <p className="mt-4 text-sm font-medium text-[#ffd0b0]">{error}</p>}<Button type="submit" disabled={status === "sending"} className="mt-5 w-full font-semibold text-white" style={{ backgroundColor: "#E07428" }}>{status === "sending" ? "Enregistrement…" : "Enregistrer mon intérêt"}<ArrowRight className="ml-2 h-4 w-4" /></Button></form>;
}

export default function Home() {
  const [activePersona, setActivePersona] = useState<PersonaId | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPersona = () => setActivePersona(getPersonaFromUrl());
    syncPersona();
    window.addEventListener("popstate", syncPersona);
    return () => window.removeEventListener("popstate", syncPersona);
  }, []);

  const selectPersona = (personaId: PersonaId) => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("public", personaId);
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setActivePersona(personaId);
    window.requestAnimationFrame(() => storyRef.current?.focus({ preventScroll: false }));
  };

  const resetPersona = () => {
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("public");
    window.history.pushState({}, "", `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`);
    setActivePersona(null);
  };

  const active = PERSONAS.find((persona) => persona.id === activePersona) ?? null;

  return (
    <div className="bg-white">
      <section className="px-4 pb-12 pt-28 sm:pb-16 sm:pt-36" style={{ background: "linear-gradient(155deg, #f4f5fb 0%, #fff8f2 52%, #f2faf7 100%)" }}>
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Site compagnon · outil en co-conception · avec le terrain</p>
          <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block bg-[linear-gradient(90deg,#515792_0%,#3a7fc1_20%,#3aab8a_43%,#7ab648_60%,#E07428_80%)] bg-clip-text text-transparent">Boussole Numérique Culture</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">Un outil en création pour aider les artistes et les personnes qui les accompagnent à mieux comprendre leurs pratiques numériques, choisir des priorités et ouvrir des pistes d’action utiles.</p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">Choisissez le point de départ qui correspond à votre rôle pour découvrir ce que le site peut vous apporter aujourd’hui.</p>
        </div>
      </section>

      <section className="relative z-10 -mt-2 px-4 pb-14" aria-labelledby="persona-selector-title">
        <div className="mx-auto max-w-6xl">
          <div className="border-b border-slate-200 pb-5 text-center">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#515792]">Choisir son parcours</p>
            <h2 id="persona-selector-title" className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">À qui vous adressez-vous ici ?</h2>
          </div>
          <div className="mt-6 grid gap-3 lg:grid-cols-3" role="group" aria-label="Sélection du type de public">
            {PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const selected = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectPersona(persona.id)}
                  className="group min-h-40 border-2 p-5 text-left transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{ borderColor: selected ? persona.color : "#e2e8f0", backgroundColor: selected ? persona.softColor : "#fff", outlineColor: persona.color }}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-200 group-hover:scale-105" style={{ backgroundColor: persona.color }}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {selected && <Check className="h-5 w-5" style={{ color: persona.color }} aria-label="Parcours sélectionné" />}
                  </span>
                  <span className="mt-4 block text-base font-extrabold leading-snug text-slate-900">{persona.label}</span>
                  <span className="mt-2 block text-sm leading-snug text-slate-500">{persona.recognition}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">Le choix est réversible et n’empêche pas d’explorer les autres parcours.</p>
        </div>
      </section>

      {active ? (
        <div ref={storyRef} tabIndex={-1} className="outline-none">
          <PersonaStory persona={active} />
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-6 text-center">
            <button type="button" onClick={resetPersona} className="inline-flex items-center gap-2 text-sm font-bold text-[#515792] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
              <RotateCcw className="h-4 w-4" /> Revenir aux trois parcours
            </button>
          </div>
        </div>
      ) : <NeutralOverview />}

      <section id="interet" className="scroll-mt-24 bg-slate-950 px-4 py-16 text-white sm:py-20" aria-labelledby="interest-title">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#7ed3be]">Rester relié·e à la démarche</p>
            <h2 id="interest-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Vous souhaitez participer à la suite ?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Les ateliers, les tests et la première version de l’outil seront annoncés au fil de la co-conception. Vous pouvez signaler un intérêt sans vous engager à participer à toutes les étapes.</p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-2"><Compass className="h-4 w-4 text-[#7ed3be]" /> Ateliers à venir</span>
              <span className="inline-flex items-center gap-2"><Send className="h-4 w-4 text-[#7ed3be]" /> Information à l’ouverture</span>
            </div>
          </div>
          <InterestForm activePersona={activePersona} />
        </div>
      </section>
    </div>
  );
}

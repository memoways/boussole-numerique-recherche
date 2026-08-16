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
  RotateCcw,
  Send,
  Users,
} from "lucide-react";
import { AnimatedRadarGraphic, type RadarDimension } from "@/components/AnimatedRadarGraphic";
import { InteractiveNarrativeIllustration, type NarrativeVisualKind } from "@/components/InteractiveNarrativeIllustration";
import { hasPartnerApi, partnerApi } from "@/lib/partnerApi";
import { Button } from "@/components/ui/button";

type PersonaId = "partenaire" | "artiste" | "enjeux-numeriques";

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

const PERSONA_RADAR_DIMENSIONS: Record<PersonaId, RadarDimension[]> = {
  partenaire: [
    { label: "Écouter", couleur: "#515792", emoji: "◌", resume: "Faire remonter les réalités du terrain." },
    { label: "Relayer", couleur: "#3a7fc1", emoji: "↗", resume: "Relier les questions aux artistes et aux équipes." },
    { label: "Prioriser", couleur: "#E07428", emoji: "◆", resume: "Distinguer ce qui mérite une réponse." },
    { label: "Tester", couleur: "#3aab8a", emoji: "✓", resume: "Mettre les hypothèses à l’épreuve du contexte." },
    { label: "Transmettre", couleur: "#7ab648", emoji: "↔", resume: "Partager les apprentissages sans classement." },
  ],
  artiste: RADAR_DIMENSIONS,
  "enjeux-numeriques": [
    { label: "Pratiques", couleur: "#3aab8a", emoji: "◌", resume: "Partir des situations concrètes plutôt que des outils." },
    { label: "Littératie", couleur: "#3a7fc1", emoji: "↗", resume: "Rendre les choix numériques plus discutables." },
    { label: "Ressources", couleur: "#515792", emoji: "⌁", resume: "Relier les sources fiables aux besoins du terrain." },
    { label: "Responsabilité", couleur: "#E07428", emoji: "◆", resume: "Identifier les conditions d’un usage soutenable." },
    { label: "Communs", couleur: "#7ab648", emoji: "↔", resume: "Faire circuler des repères utiles dans la culture." },
  ],
};

const PERSONA_COMPASS_KIND: Record<PersonaId, NarrativeVisualKind> = {
  partenaire: "bridge",
  artiste: "journey",
  "enjeux-numeriques": "principles",
};

const PERSONAS: Persona[] = [
  {
    id: "partenaire",
    label: "Je représente une structure ou un réseau culturel",
    shortLabel: "Partenaire relais",
    stickyLabel: "Institutionnel",
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
    faq: [
      { question: "Quel engagement est attendu de notre structure ?", answer: "Vous pouvez d’abord partager des situations de terrain et réagir aux hypothèses. La participation aux ateliers ou aux tests se décidera ensuite selon vos disponibilités et la forme retenue pour le pilote.", link: { label: "Voir les phases de la démarche", href: "/timeline" } },
      { question: "Le questionnaire est-il déjà ouvert à toutes les organisations ?", answer: "Le questionnaire qualitatif est préparé pour des partenaires invités. Si votre structure souhaite contribuer, vous pouvez demander une invitation ; l’équipe vérifiera alors le cadre le plus approprié." },
      { question: "Que deviendront nos retours ?", answer: "Ils serviront à préciser les questions, les priorités et les critères de réussite du prototype. Ils ne produisent pas de classement public des organisations.", link: { label: "Lire la méthode et les principes", href: "/methode" } },
    ],
    primary: { label: "Comprendre le rôle des partenaires", href: "/partenaires/presentation" },
    secondary: { label: "Partager besoins et idées", href: "/partenaires/questionnaire" },
    color: "#515792",
    softColor: "#f0f1f8",
    icon: Users,
  },
  {
    id: "artiste",
    label: "Je suis artiste ou actif·ve dans la culture",
    shortLabel: "Artiste et futur utilisateur",
    stickyLabel: "Artiste",
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
    faq: [
      { question: "Puis-je participer même si je ne représente pas une organisation ?", answer: "Oui. Les artistes et personnes actives dans la culture peuvent signaler un intérêt individuel pour les ateliers, les tests ou les informations liées à l’ouverture d’une première version." },
      { question: "La Boussole va-t-elle évaluer mon niveau numérique ?", answer: "Non. Le prototype cherchera à faire apparaître des pratiques, des contraintes et des priorités. Il ne vise pas à attribuer une note, ni à juger vos compétences.", link: { label: "Explorer les cinq dimensions", href: "/experience" } },
      { question: "Puis-je proposer un problème ou une idée avant un atelier ?", answer: "Oui. Vous pouvez signaler votre intérêt, puis l’équipe de projet vous recontactera selon les étapes que vous avez choisies. Les sujets remontés alimenteront la préparation des ateliers." },
    ],
    primary: { label: "Signaler mon intérêt", href: "#interet" },
    secondary: { label: "Explorer l’expérience Boussole", href: "/experience" },
    color: "#E07428",
    softColor: "#fdf3ec",
    icon: Brush,
  },
  {
    id: "enjeux-numeriques",
    label: "Je m’intéresse aux enjeux du numérique dans la culture",
    shortLabel: "Enjeux numériques",
    stickyLabel: "Enjeux du numérique",
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
    faq: [
      { question: "Le site propose-t-il déjà un diagnostic utilisable ?", answer: "Non. La Boussole est en co-conception. Le site présente les questions, les références et les formes de prototype qui seront discutées avec le terrain." },
      { question: "Comment contribuer sans devenir partenaire pilote ?", answer: "Vous pouvez partager des ressources ou des points de vigilance, suivre les prochaines étapes et choisir de recevoir les informations concernant les ateliers ou une première ouverture.", link: { label: "Consulter les documents et sources", href: "/ressources" } },
      { question: "Sur quoi s’appuie la démarche ?", answer: "Elle relie des enseignements de recherche, des références comparables et des retours de terrain. Ces éléments orientent les questions de conception sans décider à la place des personnes concernées.", link: { label: "Lire la recherche et les enseignements", href: "/recherche" } },
    ],
    primary: { label: "Consulter la recherche et les ressources", href: "/recherche" },
    secondary: { label: "Suivre la démarche", href: "#interet" },
    color: "#3aab8a",
    softColor: "#eef9f5",
    icon: Lightbulb,
  },
];

function getPersonaFromUrl(): PersonaId | null {
  const value = new URLSearchParams(window.location.search).get("public");
  return PERSONAS.some((persona) => persona.id === value) ? value as PersonaId : null;
}

function PersonaVisualizations({ persona }: { persona: Persona }) {
  return (
    <div className="mx-auto flex w-full max-w-[360px] flex-col gap-10" aria-label={`Visualisations interactives du parcours ${persona.shortLabel}`}>
      <div>
        <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Repères à explorer</p>
        <AnimatedRadarGraphic
          key={`${persona.id}-radar`}
          dimensions={PERSONA_RADAR_DIMENSIONS[persona.id]}
          interactive
          className="mx-auto h-60 w-60 sm:h-64 sm:w-64"
          ariaLabel={`Radar interactif : ${persona.shortLabel}`}
        />
      </div>
      <div>
        <p className="mb-3 text-center text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Boussole de contribution</p>
        <InteractiveNarrativeIllustration key={`${persona.id}-compass`} kind={PERSONA_COMPASS_KIND[persona.id]} accent={persona.color} plainSummary />
      </div>
    </div>
  );
}

function StickyPersonaMenu({ activePersona, onSelect, visible }: { activePersona: PersonaId | null; onSelect: (personaId: PersonaId) => void; visible: boolean }) {
  if (!activePersona || !visible) return null;

  return (
    <nav className="fixed inset-x-0 top-14 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-md sm:top-16" aria-label="Profil sélectionné">
      <div className="mx-auto flex min-h-12 max-w-7xl items-center gap-2 px-3 py-1.5 sm:px-5">
        <span className="hidden shrink-0 text-xs font-black uppercase tracking-[0.13em] text-slate-500 lg:inline">Profil</span>
        <div className="grid min-w-0 flex-1 grid-cols-3 gap-1.5">
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
                style={{
                  backgroundColor: isActive ? persona.color : persona.softColor,
                  color: isActive ? "#fff" : persona.color,
                  boxShadow: isActive ? `inset 0 0 0 1px ${persona.color}` : "inset 0 0 0 1px transparent",
                  outlineColor: persona.color,
                }}
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
                <div key={question} className="px-4 py-1">
                  <span className="text-xs font-black" style={{ color: persona.color }}>0{index + 1}</span>
                  <p className="mt-1 text-sm font-medium leading-snug text-slate-700">{question}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 max-w-3xl py-1 text-base font-semibold leading-relaxed text-slate-800">
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
          </div>

          <aside className="lg:pl-3">
            <PersonaVisualizations persona={persona} />
          </aside>
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
          <p className="mt-3 text-base leading-relaxed text-slate-600">Ces réponses évoluent avec la co-conception. Elles précisent ce qui est déjà possible et ce qui reste à décider ensemble.</p>
        </div>
        <div className="mt-8 divide-y divide-slate-200 border-y border-slate-200 bg-white">
          {persona.faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-${persona.id}-${index}`;
            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-bold text-slate-900 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
                    style={{ outlineColor: persona.color }}
                  >
                    <span>{item.question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-normal" style={{ backgroundColor: isOpen ? persona.color : persona.softColor, color: isOpen ? "#fff" : persona.color }} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-label={`Réponse : ${item.question}`} hidden={!isOpen} className="px-5 pb-6">
                  <p className="max-w-3xl text-base leading-relaxed text-slate-600">{item.answer}</p>
                  {item.link && <Link href={item.link.href} className="mt-4 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: persona.color }}>{item.link.label} <ArrowRight className="h-4 w-4" /></Link>}
                </div>
              </div>
            );
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
  const [hasPassedPersonaSelector, setHasPassedPersonaSelector] = useState(false);
  const [isProfileTransition, setIsProfileTransition] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const personaSelectorRef = useRef<HTMLElement>(null);
  const profileTransitionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const syncPersona = () => setActivePersona(getPersonaFromUrl());
    syncPersona();
    window.addEventListener("popstate", syncPersona);
    return () => window.removeEventListener("popstate", syncPersona);
  }, []);

  useEffect(() => {
    const target = personaSelectorRef.current;
    if (!target || !activePersona) {
      setHasPassedPersonaSelector(false);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setHasPassedPersonaSelector(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    }, { threshold: 0 });

    observer.observe(target);
    return () => observer.disconnect();
  }, [activePersona]);

  useEffect(() => () => {
    if (profileTransitionTimeoutRef.current) window.clearTimeout(profileTransitionTimeoutRef.current);
  }, []);

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
      <section ref={personaSelectorRef} className="px-4 pb-16 pt-28 sm:pb-20 sm:pt-36" style={{ background: "linear-gradient(155deg, #f4f5fb 0%, #fff8f2 52%, #f2faf7 100%)" }} aria-labelledby="persona-selector-title">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block bg-[linear-gradient(90deg,#515792_0%,#3a7fc1_20%,#3aab8a_43%,#7ab648_60%,#E07428_80%)] bg-clip-text text-transparent">Boussole Numérique Culture</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">Un outil en création pour aider les artistes et les personnes qui les accompagnent à mieux comprendre leurs pratiques numériques, choisir des priorités et ouvrir des pistes d’action utiles.</p>
          <div className="mt-11">
            <h2 id="persona-selector-title" className="text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Entrée dans le site par profil</h2>
          </div>
          <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-3" role="group" aria-label="Sélection du type de public">
            {PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const selected = activePersona === persona.id;
              return (
                <button
                  key={persona.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectPersona(persona.id)}
                  className="group relative min-h-32 rounded-2xl border-2 p-5 text-left shadow-sm transition-[transform,background-color,color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4"
                  style={{
                    backgroundColor: selected ? persona.color : persona.softColor,
                    borderColor: persona.color,
                    color: selected ? "#fff" : "#17223b",
                    boxShadow: selected ? `0 12px 24px ${persona.color}33` : "0 4px 12px rgba(15, 23, 42, 0.05)",
                    outlineColor: persona.color,
                  }}
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: selected ? "rgba(255,255,255,0.92)" : persona.color, color: selected ? persona.color : "#fff" }}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {selected && <Check className="h-5 w-5" aria-label="Profil sélectionné" />}
                  </span>
                  <span className="mt-4 block text-base font-extrabold leading-snug">{persona.stickyLabel}</span>
                  <span className="mt-1.5 block text-sm leading-snug" style={{ color: selected ? "rgba(255,255,255,0.88)" : "#64748b" }}>{persona.recognition}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <StickyPersonaMenu activePersona={activePersona} onSelect={selectPersona} visible={Boolean(activePersona && (isProfileTransition || hasPassedPersonaSelector))} />

      {active ? (
        <div ref={storyRef} tabIndex={-1} className="scroll-mt-28 outline-none sm:scroll-mt-32">
          <PersonaStory persona={active} />
          <PersonaFaq key={active.id} persona={active} />
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

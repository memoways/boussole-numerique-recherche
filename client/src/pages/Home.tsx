/**
 * Accueil — site compagnon de la Boussole Numérique Culture en préparation.
 * Design : tableau de cadrage « Data-Driven Infographic » — les repères opérationnels structurent l’entrée, avec une palette sémantique et deux profils de co-conception.
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
  why: string;
  what: string;
  how: string;
  benefits: string[];
  questions: string[];
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
    title: "Les besoins des artistes doivent pouvoir guider les décisions numériques qui les concernent.",
    why: "Lorsque les outils, procédures et choix numériques se décident loin des situations de terrain, les difficultés des artistes restent invisibles. Il devient plus difficile de relayer ce qui freine réellement le travail, de préparer des améliorations collectives et de choisir ce qui mérite d’être testé maintenant.",
    what: "La Boussole sera une application web à co-concevoir : un état des lieux non jugeant pour rendre visibles des pratiques, des contraintes et des priorités. Elle devra aider à ouvrir une conversation commune sur les outils, les compétences, les données, la diffusion et la collaboration — sans classer les personnes ni imposer une solution.",
    how: "Les partenaires apportent des situations concrètes, répondent au questionnaire et participent à l’atelier de l’automne 2026. Avec les artistes, ils aideront à cadrer les questions, sélectionner les premiers cas d’usage et mettre un prototype à l’épreuve de manière concertée.",
    benefits: ["Faire remonter des besoins souvent dispersés ou difficiles à formuler.", "Préparer des tests utiles plutôt que choisir un outil à distance.", "Partager un repère commun entre artistes, équipes et réseaux."],
    questions: [
      "Quelles pratiques numériques pèsent le plus sur les artistes et les équipes que vous accompagnez ?",
      "Quels conseils, améliorations ou repères devraient être directement actionnables après un état des lieux ?",
      "Quelles conditions rendraient le futur prototype utile, juste et praticable dans votre structure ou réseau ?",
    ],
    faq: [
      { question: "Qui décidera des orientations du prototype ?", answer: "L’équipe de projet anime la démarche, mais ne décide pas seule des usages à retenir. Les partenaires et les artistes apportent les situations, les doutes et les critères de réussite. L’atelier doit permettre d’arbitrer ce qui mérite d’être testé en premier, puis les retours d’usage guideront les ajustements du prototype.", link: { label: "Voir le rôle des partenaires dans la co-conception", href: "/partenaires/presentation" } },
      { question: "Notre structure doit-elle mobiliser toute son équipe pour contribuer ?", answer: "Non. Une personne peut d’abord relayer des situations, répondre au questionnaire ou participer à l’atelier. Le projet doit aussi examiner, avec les structures qui le souhaitent, un mode collectif où plusieurs membres répondraient individuellement pour mettre en regard les accords et écarts de perception. Cette lecture collective resterait une aide au dialogue, pas une décision automatique." },
      { question: "Comment les retours seront-ils transformés en décisions concrètes ?", answer: "Les retours serviront d’abord à définir les micro-scénarios du questionnaire et les priorités du prototype. Ils aideront ensuite à formuler des critères de test : ce qui doit être compréhensible, utile et praticable dans des contextes culturels variés. Le passage du retour au prototype sera rendu explicite lors de l’atelier et des étapes de suivi.", link: { label: "Consulter le calendrier de co-conception", href: "/timeline" } },
      { question: "Que se passe-t-il si les personnes d’une même structure ne voient pas la situation de la même manière ?", answer: "Cet écart est une information utile, pas un problème à corriger. Le futur mode collaboratif pourrait faire apparaître des points d’accord et des perceptions différentes afin que l’équipe choisisse elle-même ce qu’elle souhaite approfondir. La Boussole ne doit pas remplacer la discussion entre collègues ni désigner une bonne réponse." },
      { question: "Comment la neutralité, les données et les recommandations seront-elles protégées ?", answer: "Les principes à confirmer avant l’ouverture publique sont la confidentialité, un cadre d’hébergement suisse ou européen, des critères de recommandation compréhensibles et une séparation nette avec toute prestation commerciale. Les informations saisies ne doivent pas servir à classer publiquement les organisations ni à mettre en avant un prestataire contre paiement.", link: { label: "Lire les principes de gouvernance", href: "/methode" } },
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
    recognition: "Votre expérience aidera à définir un outil qui apporte des conseils utiles.",
    eyebrow: "Parcours artiste",
    title: "Le numérique doit soutenir votre pratique, pas créer davantage de friction autour d’elle.",
    why: "Quand les outils ne suivent pas les façons de travailler, que les fichiers se perdent ou que les consignes restent floues, collaborer devient plus lourd et les choix numériques sont subis. Améliorer ces pratiques est important maintenant : cela peut rendre le travail plus lisible, plus serein et plus agréable, sans demander de devenir spécialiste.",
    what: "La Boussole sera une application web à co-concevoir. Elle devra proposer un état des lieux sans note, pour mettre des mots sur une situation, situer ce qui compte et recevoir des conseils ou premières pistes d’amélioration. Son radar représente cinq dimensions à discuter, non un score personnel.",
    how: "Vos situations vécues serviront au questionnaire, à l’atelier de co-conception et au cadrage du prototype. Avec les partenaires, vous aiderez à décider quelles questions poser, quelles aides proposer et comment tester une première version de manière collaborative.",
    benefits: ["Comprendre quelle amélioration choisir en premier, sans être évalué·e.", "Accéder à des conseils plus proches de vos outils, projets et collaborations.", "Faire entendre votre expérience dans un outil destiné aux artistes."],
    questions: [
      "Quelle situation numérique vous pèse le plus dans votre pratique culturelle ?",
      "Quel conseil ou quelle amélioration vous aiderait à mieux travailler avec vos outils et vos collaborations ?",
      "Qu’est-ce qu’un prototype destiné aux artistes devrait comprendre avant de proposer une piste d’action ?",
    ],
    faq: [
      { question: "Faut-il bien connaître les outils numériques pour contribuer ?", answer: "Non. Le projet cherche précisément à partir de ce qui se passe dans votre pratique, pas de votre niveau technique. Une situation très simple — retrouver un document, partager une information, coordonner une collaboration ou choisir un outil — peut aider à définir une question utile. La future expérience devra rester accessible sans expertise préalable." },
      { question: "Puis-je parler d’une difficulté ponctuelle plutôt que de toute ma pratique ?", answer: "Oui. Les micro-scénarios envisagés doivent permettre de partir d’un moment concret du quotidien culturel, sans devoir faire un inventaire complet. C’est à partir de plusieurs situations de ce type que le questionnaire et les premières pistes d’aide pourront être construits et testés.", link: { label: "Voir les écrans illustratifs du futur outil", href: "/experience" } },
      { question: "Que se passe-t-il après avoir signalé mon intérêt ?", answer: "Vous choisissez librement si vous souhaitez être informé·e de l’atelier, du prototype ou de l’ouverture publique. L’équipe de projet utilisera les retours volontaires pour préparer l’atelier et le cadrage ; il ne s’agit pas encore d’un accès à la Boussole ni d’un engagement à participer aux tests. Les prochaines étapes seront communiquées au fil de leur préparation." },
      { question: "Mes réponses pourront-elles être vues par une structure ou utilisées pour me comparer ?", answer: "Ce n’est pas l’objectif. Le futur outil devra recueillir le consentement nécessaire, limiter l’accès aux informations et éviter toute note ou comparaison individuelle imposée. Si une lecture collective est un jour proposée à une structure, ses règles devront être explicites et validées avec les personnes concernées.", link: { label: "Lire les principes de données et gouvernance", href: "/methode" } },
      { question: "Quelle place l’IA pourrait-elle prendre dans l’expérience ?", answer: "Un dialogue guidé par IA est une piste à tester, pas une décision arrêtée. Il pourrait aider à explorer une priorité et orienter vers des ressources adaptées, mais ses questions, ses limites et ses formes de restitution doivent d’abord être discutées avec les artistes et partenaires. Il ne doit pas remplacer votre jugement ni une discussion avec les personnes concernées." },
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

function PersonaRadar({ persona }: { persona: Persona }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-5 sm:px-5" aria-label={`Radar illustratif du futur outil pour ${persona.shortLabel}`}>
      <p className="mb-2 text-center text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Cinq dimensions à discuter</p>
      <AnimatedRadarGraphic key={`${persona.id}-radar`} dimensions={PERSONA_RADAR_DIMENSIONS[persona.id]} interactive className="mx-auto h-60 w-60 sm:h-64 sm:w-64" ariaLabel={`Radar illustratif : ${persona.shortLabel}`} />
      <p className="mx-auto mt-2 max-w-xs text-center text-xs leading-relaxed text-slate-500">Une représentation illustrative du futur état des lieux, pas un score personnel.</p>
    </div>
  );
}

function PersonaCoDesignPath({ persona }: { persona: Persona }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5" aria-label={`Chemin de co-conception pour ${persona.shortLabel}`}>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>D’une situation à un prototype</p>
      <InteractiveNarrativeIllustration key={`${persona.id}-compass`} kind={PERSONA_COMPASS_KIND[persona.id]} accent={persona.color} plainSummary />
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
        <div className="mb-10 max-w-4xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ backgroundColor: persona.color }}><Icon className="h-5 w-5" aria-hidden="true" /></span>
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>{persona.eyebrow}</p>
          </div>
          <h2 id="persona-story-title" tabIndex={-1} className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{persona.title}</h2>
        </div>

        <article className="max-w-4xl border-l-4 bg-slate-50 p-6 sm:p-7" style={{ borderColor: persona.color }}>
          <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Pourquoi agir maintenant</p>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">Améliorer les pratiques numériques est une condition de travail plus juste.</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{persona.why}</p>
        </article>

        <div className="mt-12 grid gap-8 border-y border-slate-200 py-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Quoi : la future application web</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Une Boussole pour comprendre une situation et choisir un premier pas utile.</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{persona.what}</p>
          </div>
          <PersonaRadar persona={persona} />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <PersonaCoDesignPath persona={persona} />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Comment : co-construire sans décider à votre place</p>
            <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950">Des situations réelles, un atelier, puis un prototype à éprouver ensemble.</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{persona.how}</p>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {persona.questions.map((question, index) => <li key={question} className="border-t border-slate-200 pt-3"><span className="text-xs font-black" style={{ color: persona.color }}>Point à préciser {index + 1}</span><p className="mt-1 text-sm font-medium leading-snug text-slate-700">{question}</p></li>)}
            </ol>
          </div>
        </div>

        <section className="mt-12 max-w-4xl border-l-4 bg-slate-50 p-6 sm:p-7" style={{ borderColor: persona.color }} aria-labelledby={`benefits-${persona.id}`}>
          <p className="text-xs font-black uppercase tracking-[0.16em]" style={{ color: persona.color }}>Bénéfices attendus</p>
          <h3 id={`benefits-${persona.id}`} className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">Ce que cette démarche doit rendre possible.</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {persona.benefits.map((benefit) => <li key={benefit} className="flex gap-3 text-sm leading-relaxed text-slate-700"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: persona.color }} aria-hidden="true" />{benefit}</li>)}
          </ul>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button className="font-semibold text-white" style={{ backgroundColor: "#E07428" }} asChild>
            {isInternal(persona.primary.href) ? <Link href={persona.primary.href}>{persona.primary.label} <ArrowRight className="ml-2 h-4 w-4" /></Link> : <a href={persona.primary.href}>{persona.primary.label} <ArrowRight className="ml-2 h-4 w-4" /></a>}
          </Button>
          <Button variant="outline" className="border-2 font-semibold" style={{ borderColor: persona.color, color: persona.color }} asChild>
            {isInternal(persona.secondary.href) ? <Link href={persona.secondary.href}>{persona.secondary.label} <ArrowUpRight className="ml-2 h-4 w-4" /></Link> : <a href={persona.secondary.href}>{persona.secondary.label} <ArrowUpRight className="ml-2 h-4 w-4" /></a>}
          </Button>
        </div>
        {persona.resourceLink && <Link href={persona.resourceLink.href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold underline decoration-2 underline-offset-4" style={{ color: persona.color }}>{persona.resourceLink.label} <ArrowUpRight className="h-4 w-4" /></Link>}
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
          <h2 id={`faq-${persona.id}-title`} className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Les détails pratiques à connaître avant de contribuer</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600">Ces réponses complètent le récit : elles précisent les rôles, les règles de participation, le devenir des retours et les garde-fous du projet.</p>
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
      <section className="overflow-hidden border-b border-[#515792]/15 bg-[#f6f7fb] px-4 pb-14 pt-24 sm:pb-20 sm:pt-32" aria-labelledby="persona-selector-title">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-stretch">
          <div className="min-w-0 lg:pt-4">
            <div className="inline-flex items-center gap-2 border-l-4 border-[#515792] bg-white px-3 py-2 shadow-sm"><span className="font-mono text-[11px] font-bold tracking-[0.12em] text-[#515792]">ÉTAT / 01</span><span className="text-xs font-bold text-slate-700">Site compagnon · outil en préparation</span></div>
            <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Boussole <span className="text-[#515792]">Numérique</span><br />Culture</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-700 sm:text-xl">Ce site accompagne la préparation d’une Boussole pour les artistes des milieux culturels genevois. <strong>La Boussole n’existe pas encore.</strong> Il rend la démarche lisible, recueille les retours et prépare sa co-conception avec les partenaires et les artistes.</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3" aria-label="Repères de cadrage">
              {[{ value: "02", label: "publics", detail: "partenaires et artistes", color: "#515792" }, { value: "05", label: "dimensions", detail: "à mettre en discussion", color: "#3a7fc1" }, { value: "04", label: "jalons", detail: "jusqu’à l’ouverture visée", color: "#3aab8a" }].map((metric) => <div key={metric.label} className="border-l-4 bg-white px-4 py-3 shadow-sm" style={{ borderColor: metric.color }}><span className="font-mono text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</span><span className="ml-2 text-xs font-black uppercase tracking-[0.12em] text-slate-800">{metric.label}</span><span className="mt-1 block text-xs leading-relaxed text-slate-500">{metric.detail}</span></div>)}
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6"><div className="flex items-end justify-between gap-4"><div><p className="font-mono text-[11px] font-bold tracking-[0.12em] text-[#E07428]">CHOISIR UN POINT D’ENTRÉE</p><h2 id="persona-selector-title" className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Depuis quel rôle souhaitez-vous contribuer ?</h2></div><span className="hidden shrink-0 border border-[#E07428]/30 bg-[#fdf3ec] px-2 py-1 font-mono text-[11px] font-bold text-[#E07428] sm:inline">ACTION / 02</span></div></div>
            <div ref={personaSelectorRef} className="mt-5 grid gap-3 sm:grid-cols-2" role="group" aria-label="Sélection du type de public">
              {PERSONAS.map((persona, index) => {
                const Icon = persona.icon;
                const selected = activePersona === persona.id;
                return <button key={persona.id} type="button" aria-pressed={selected} onClick={() => selectPersona(persona.id)} className="group relative min-h-36 border-2 p-5 text-left shadow-sm transition-[transform,background-color,color,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4" style={{ backgroundColor: selected ? persona.color : persona.softColor, borderColor: persona.color, color: selected ? "#fff" : "#17223b", boxShadow: selected ? `0 12px 24px ${persona.color}33` : "0 4px 12px rgba(15, 23, 42, 0.05)", outlineColor: persona.color }}><span className="flex items-start justify-between gap-4"><span className="flex items-center gap-2"><span className="font-mono text-xs font-bold" style={{ color: selected ? "rgba(255,255,255,0.82)" : persona.color }}>0{index + 1}</span><span className="flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110" style={{ backgroundColor: selected ? "rgba(255,255,255,0.92)" : persona.color, color: selected ? persona.color : "#fff" }}><Icon className="h-4 w-4" aria-hidden="true" /></span></span>{selected && <Check className="h-5 w-5" aria-label="Profil sélectionné" />}</span><span className="mt-4 block text-base font-extrabold leading-snug">{persona.stickyLabel}</span><span className="mt-1.5 block text-sm leading-snug" style={{ color: selected ? "rgba(255,255,255,0.88)" : "#64748b" }}>{persona.recognition}</span></button>;
              })}
            </div>
          </div>

          <aside className="relative overflow-hidden border border-slate-900 bg-slate-950 p-5 text-white shadow-xl sm:p-7" aria-label="Tableau de bord de la co-conception">
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full border border-[#3a7fc1]/30" /><div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full border border-[#3aab8a]/25" />
            <div className="relative"><div className="flex items-center justify-between gap-3 border-b border-white/15 pb-4"><p className="font-mono text-[11px] font-bold tracking-[0.14em] text-[#7ed3be]">TABLEAU DE CADRAGE</p><span className="border border-[#3a7fc1]/60 bg-[#3a7fc1]/15 px-2 py-1 font-mono text-[10px] font-bold text-[#9ed0ff]">2026 → 2027</span></div><h2 className="mt-6 max-w-sm text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">Mettre les situations vécues au centre des prochaines décisions.</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">La démarche avance par étapes : écouter, cadrer, tester, puis partager une première version. Chaque couleur désigne une fonction dans ce parcours.</p>
              <ol className="mt-7 space-y-0" aria-label="Chemin de co-conception">
                {[{ code: "01", title: "Écouter", detail: "recueillir les situations et priorités", color: "#3a7fc1" }, { code: "02", title: "Cadrer", detail: "choisir ce qui mérite un premier test", color: "#E07428" }, { code: "03", title: "Tester", detail: "mettre le prototype à l’épreuve", color: "#3aab8a" }, { code: "04", title: "Partager", detail: "préparer l’ouverture publique", color: "#515792" }].map((step, index) => <li key={step.code} className="relative grid grid-cols-[2.75rem_1fr] gap-3 py-3"><div className="relative"><span className="flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs font-bold" style={{ borderColor: step.color, color: step.color, backgroundColor: `${step.color}22` }}>{step.code}</span>{index < 3 && <span className="absolute left-4 top-8 h-7 border-l border-dashed border-slate-600" aria-hidden="true" />}</div><div><p className="text-sm font-extrabold" style={{ color: step.color }}>{step.title}</p><p className="mt-0.5 text-xs leading-relaxed text-slate-300">{step.detail}</p></div></li>)}
              </ol>
              <div className="mt-5 grid grid-cols-4 gap-1" aria-label="Avancement indicatif de la démarche">{["#515792", "#3a7fc1", "#3aab8a", "#E07428"].map((color, index) => <span key={color} className="h-1.5" style={{ backgroundColor: color, opacity: index === 0 ? 1 : 0.45 }} />)}</div><p className="mt-2 font-mono text-[10px] font-bold tracking-[0.1em] text-slate-400">PHASE ACTIVE / ÉCOUTE ET CADRAGE</p>
            </div>
          </aside>
        </div>
      </section>

      <StickyPersonaMenu activePersona={activePersona} onSelect={selectPersona} visible={Boolean(activePersona && (isProfileTransition || hasPassedPersonaSelector))} />

      {active ? <div ref={storyRef} tabIndex={-1} className="scroll-mt-28 outline-none sm:scroll-mt-32"><PersonaStory persona={active} /><PersonaFaq key={active.id} persona={active} /><div className="border-b border-slate-200 bg-slate-50 px-4 py-6 text-center"><button type="button" onClick={resetPersona} className="inline-flex min-h-11 items-center gap-2 px-2 text-sm font-bold text-[#515792] underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"><RotateCcw className="h-4 w-4" /> Revenir aux deux profils</button></div></div> : <NeutralOverview />}

      <section id="interet" className="scroll-mt-24 bg-slate-950 px-4 py-16 text-white sm:py-20" aria-labelledby="interest-title">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div><p className="text-xs font-black uppercase tracking-[0.16em] text-[#7ed3be]">Rejoindre la co-conception</p><h2 id="interest-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Vous souhaitez participer au projet ?</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">Les retours recueillis aujourd’hui prépareront l’atelier et le cadrage de l’automne. Vous pouvez vous signaler pour contribuer, tester le prototype ou être informé·e de l’ouverture publique visée début 2027.</p><div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-200"><span className="inline-flex items-center gap-2"><Compass className="h-4 w-4 text-[#7ed3be]" /> Atelier et cadrage</span><span className="inline-flex items-center gap-2"><Send className="h-4 w-4 text-[#7ed3be]" /> Information sur l’ouverture</span></div><div className="mt-8 flex max-w-2xl items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-3 py-3 sm:gap-4 sm:px-4 sm:py-3.5"><a href="https://www.geneve.ch/demarches/subvention-projets-ponctuels-culturels-scientifiques" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 rounded-lg bg-white p-1.5 transition-colors hover:bg-slate-100" aria-label="Consulter la démarche de subvention de la Ville de Genève"><img src="/ville-geneve-soutien.8334b29d.png" alt="Logo du soutien institutionnel" className="h-11 w-11 object-contain sm:h-14 sm:w-14" /></a><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7ed3be] sm:text-xs sm:tracking-widest">Avec le soutien de</p><p className="mt-0.5 text-sm font-semibold text-white">Ville de Genève</p><p className="mt-0.5 text-xs leading-relaxed text-slate-300 sm:mt-1 sm:text-sm">Soutien obtenu dans le cadre d’une démarche de subvention pour projets ponctuels, culturels ou scientifiques.</p></div></div></div>
          <InterestForm />
        </div>
      </section>
    </div>
  );
}

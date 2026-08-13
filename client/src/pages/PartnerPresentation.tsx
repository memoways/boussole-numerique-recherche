import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleHelp,
  Compass,
  Lightbulb,
  Network,
  Route,
  Sparkles,
  Users,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/**
 * Présentation partenaire — direction visuelle : progression bleu → cyan → vert → orange.
 * Les détails se déploient dans le flux de lecture ; l’état slide/détail reste dans l’URL.
 */

type Detail = {
  id: string;
  title: string;
  summary: string;
  content: string;
  links: Array<{ href: string; label: string }>;
};

type VisualKind = "compass" | "signals" | "journey" | "community" | "cycle" | "principles" | "bridge" | "workshop" | "next";

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  accent: string;
  icon: typeof CircleHelp;
  visual: VisualKind;
  details: Detail[];
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Présentation partenaire",
    title: "Une Boussole pour mieux situer les pratiques numériques",
    text: "La Boussole Numérique Culture aide les actrices, acteurs et structures culturelles à faire le point, choisir des pistes utiles et avancer à leur rythme.",
    accent: "#515792",
    icon: Compass,
    visual: "compass",
    details: [
      {
        id: "intention",
        title: "Une orientation plutôt qu’une évaluation",
        summary: "Un point de départ clair pour identifier ce qui mérite de l’attention.",
        content: "Le diagnostic fait émerger les pratiques, les contraintes et les objectifs déjà présents. La restitution offre une lecture progressive et ouvre des pistes adaptées au contexte de chaque personne ou structure.",
        links: [{ href: "/projet", label: "Lire la note d’intention" }, { href: "/experience", label: "Découvrir l’expérience" }],
      },
      {
        id: "utilite",
        title: "Une ressource concrète pour avancer",
        summary: "Faire émerger les priorités avant de choisir des outils ou un accompagnement.",
        content: "La démarche aide à préparer une discussion interne, à formuler un besoin ou à choisir une prochaine étape réaliste. Elle met l’accent sur l’autonomie et sur des décisions compréhensibles.",
        links: [{ href: "/methode", label: "Voir les principes de la démarche" }],
      },
    ],
  },
  {
    eyebrow: "Le point de départ",
    title: "Les besoins du terrain ne suivent pas tous le même chemin",
    text: "Les usages, les ressources et les enjeux numériques varient fortement. Une réponse utile commence par écouter les situations réelles plutôt que par prescrire un modèle unique.",
    accent: "#3a7fc1",
    icon: Users,
    visual: "signals",
    details: [
      {
        id: "realites",
        title: "Des réalités qui se croisent",
        summary: "Compétences, ressources, organisation, publics et priorités façonnent chaque situation.",
        content: "Une même pratique peut être simple dans une structure et difficile dans une autre. La Boussole sert à rendre ces différences visibles afin de relier une recommandation à une situation réellement vécue.",
        links: [{ href: "/recherche", label: "Consulter les enseignements de recherche" }, { href: "/references", label: "Voir les références inspirantes" }],
      },
      {
        id: "ecoute",
        title: "Partir de ce qui compte maintenant",
        summary: "Les besoins urgents et les ambitions de long terme trouvent leur place dans le parcours.",
        content: "Le diagnostic ne demande pas de tout transformer d’un seul coup. Il aide à distinguer ce qui freine le travail quotidien, ce qui mérite une exploration et ce qui peut attendre.",
        links: [{ href: "/experience", label: "Explorer les dimensions" }],
      },
    ],
  },
  {
    eyebrow: "L’outil proposé",
    title: "Un diagnostic court, puis des pistes adaptées",
    text: "Un questionnaire adaptatif ouvre une restitution visuelle et un dialogue guidé. L’objectif est de repérer les leviers concrets, les priorités et les appuis possibles.",
    accent: "#3aab8a",
    icon: Lightbulb,
    visual: "journey",
    details: [
      {
        id: "parcours",
        title: "Un parcours en trois temps",
        summary: "Décrire sa situation, la situer, puis identifier une prochaine étape.",
        content: "Les questions sont courtes et contextualisées. La restitution transforme les réponses en repères visuels, puis le dialogue guidé peut aider à mettre les priorités en mots et à envisager des actions.",
        links: [{ href: "/experience", label: "Voir le parcours proposé" }],
      },
      {
        id: "dialogue",
        title: "Un accompagnement conversationnel à préciser avec le terrain",
        summary: "Une possibilité de poursuivre la réflexion à son rythme, sans remplacer l’expertise humaine.",
        content: "Le projet explore une aide conversationnelle qui reformule, aide à prioriser et oriente vers des ressources. Ses limites, son ton et ses conditions d’usage feront partie du travail de co-conception.",
        links: [{ href: "/methode", label: "Comprendre la co-conception" }],
      },
    ],
  },
  {
    eyebrow: "Pour qui ?",
    title: "Pour les personnes et structures qui font vivre la culture",
    text: "La démarche s’adresse aux artistes, professionnelles et professionnels, lieux, associations, réseaux et institutions qui souhaitent avancer avec leurs publics et leurs membres.",
    accent: "#7ab648",
    icon: Users,
    visual: "community",
    details: [
      {
        id: "profils",
        title: "Des profils multiples, une même exigence de clarté",
        summary: "La Boussole doit rester utile autant à une personne indépendante qu’à une organisation établie.",
        content: "Les formulations, les exemples et les pistes proposées doivent s’adapter au rôle de la personne, à ses publics et à son environnement de travail. Les partenaires permettent de vérifier cette lisibilité.",
        links: [{ href: "/partenaires", label: "Voir les formes de contribution" }],
      },
      {
        id: "publics",
        title: "Relier les pratiques aux personnes accompagnées",
        summary: "Les effets attendus concernent aussi les membres, les équipes et les publics.",
        content: "La réflexion ne s’arrête pas au fonctionnement interne. Elle prend en compte la médiation, l’accès, la circulation de l’information et la capacité à accompagner un écosystème.",
        links: [{ href: "/projet", label: "Lire le contexte du projet" }],
      },
    ],
  },
  {
    eyebrow: "Comment cela fonctionne ?",
    title: "Comprendre, situer, prioriser, agir",
    text: "La Boussole part des situations décrites, propose une lecture visuelle et ouvre des pistes d’action. Elle peut ensuite nourrir un accompagnement conversationnel adapté au contexte.",
    accent: "#E07428",
    icon: Route,
    visual: "cycle",
    details: [
      {
        id: "dimensions",
        title: "Des dimensions reliées entre elles",
        summary: "Les pratiques ne se résument pas à l’usage d’un outil isolé.",
        content: "La Boussole observe plusieurs dimensions complémentaires : les usages, les compétences, l’organisation, les ressources, les publics et les intentions. Le résultat ne cherche pas une note unique.",
        links: [{ href: "/experience", label: "Explorer les cinq dimensions" }],
      },
      {
        id: "action",
        title: "Des pistes adaptées, sans promesse standardisée",
        summary: "Chaque restitution privilégie une action compréhensible et réalisable.",
        content: "Les pistes peuvent concerner une compétence à renforcer, une pratique à clarifier, une ressource à mobiliser ou une discussion à ouvrir. Elles restent des propositions que la personne peut discuter et adapter.",
        links: [{ href: "/ressources", label: "Accéder aux ressources documentaires" }],
      },
    ],
  },
  {
    eyebrow: "Un cadre partagé",
    title: "Une démarche gratuite, neutre et souveraine",
    text: "Le projet défend un service utile, sans mise en avant payante, avec une attention forte au consentement, à la lisibilité et à l’autonomie des participantes et participants.",
    accent: "#515792",
    icon: CheckCircle2,
    visual: "principles",
    details: [
      {
        id: "neutralite",
        title: "Une information présentée sans classement commercial",
        summary: "Les orientations doivent rester lisibles, ouvertes et non discriminantes.",
        content: "L’outil et son futur annuaire visent à permettre une découverte équitable de ressources et de prestataires pertinents. Les règles de référencement et d’évolution doivent rester transparentes.",
        links: [{ href: "/methode", label: "Voir les principes de gouvernance" }],
      },
      {
        id: "donnees",
        title: "Des données collectées avec une finalité claire",
        summary: "La personne comprend ce qui est demandé, pourquoi et pendant combien de temps.",
        content: "Le consentement, la minimisation des données et la possibilité de signaler un problème font partie de la conception. La phase partenaire permet aussi de tester la compréhension de ces informations.",
        links: [{ href: "/methode", label: "Lire les engagements de confidentialité" }],
      },
    ],
  },
  {
    eyebrow: "Valeur partenaire",
    title: "Relier les besoins des membres à une réponse collective",
    text: "Les partenaires peuvent faire remonter les réalités de leurs communautés, tester les formulations et contribuer à une ressource qui enrichit leur mission de médiation et d’accompagnement.",
    accent: "#3a7fc1",
    icon: Network,
    visual: "bridge",
    details: [
      {
        id: "apports",
        title: "Transformer les retours du terrain en choix de conception",
        summary: "Les partenaires apportent des situations, des termes justes et des critères de réussite.",
        content: "Le questionnaire recueille les besoins, les opportunités, les craintes et les idées. Ces éléments servent à préparer un atelier où les fondations de l’expérience pourront être discutées avec des exemples concrets.",
        links: [{ href: "/partenaires#contribution", label: "Comprendre les apports possibles" }],
      },
      {
        id: "diffusion",
        title: "Imaginer les conditions d’une diffusion utile",
        summary: "Canaux, accompagnements et moments de médiation font partie de la réflexion.",
        content: "Les organisations connaissent les conditions qui facilitent ou freinent l’appropriation par leurs membres. Leur contribution aide à concevoir des manières réalistes de présenter et d’accompagner la Boussole.",
        links: [{ href: "/timeline", label: "Voir les phases du projet" }],
      },
    ],
  },
  {
    eyebrow: "Co-construction",
    title: "Vos retours participent aux fondations de la Boussole",
    text: "Le questionnaire partenaire prépare un atelier avec les partenaires et les utilisateurs finaux. Il sert à clarifier les besoins, les priorités, les idées et les craintes avant le prototypage.",
    accent: "#3aab8a",
    icon: Sparkles,
    visual: "workshop",
    details: [
      {
        id: "questionnaire",
        title: "Un questionnaire pour dégrossir les sujets importants",
        summary: "Quelques minutes pour poser un premier regard sur les besoins et les conditions de réussite.",
        content: "Les réponses associent des questions à choix, des échelles contextualisées et des questions ouvertes. Lorsque la voix est activée, la personne peut relire et corriger sa transcription avant l’enregistrement.",
        links: [{ href: "/partenaires/questionnaire", label: "Accéder au questionnaire" }],
      },
      {
        id: "atelier",
        title: "Un atelier pour donner une forme aux apprentissages",
        summary: "Les réponses n’aboutissent pas à une décision automatique.",
        content: "Leur analyse prépare une rencontre de co-conception. Les partenaires et les utilisateurs finaux pourront y prioriser des hypothèses, discuter des formulations et tester les fondations de l’outil.",
        links: [{ href: "/methode", label: "Voir la démarche de co-conception" }],
      },
    ],
  },
  {
    eyebrow: "Prochaine étape",
    title: "Partager vos idées, maintenant ou plus tard",
    text: "Si vous avez reçu une invitation, le questionnaire est accessible directement. Sinon, vous pouvez demander un lien personnel pour contribuer au moment qui vous convient.",
    accent: "#E07428",
    icon: CheckCircle2,
    visual: "next",
    details: [
      {
        id: "invitation",
        title: "Un accès lié à une invitation personnelle",
        summary: "Chaque personne répond avec son propre lien, relié à son organisation.",
        content: "Le lien permet de reprendre un brouillon et protège l’accès aux réponses. Une personne intéressée sans invitation peut transmettre son nom, sa structure et son adresse pour demander un accès.",
        links: [{ href: "/partenaires/questionnaire", label: "Partager mes idées et feedbacks" }],
      },
      {
        id: "temps",
        title: "Une contribution qui reste à votre rythme",
        summary: "Le questionnaire peut être commencé, sauvegardé et terminé plus tard.",
        content: "La contribution partenaire est un temps de réflexion. Les réponses peuvent être ajustées avant l’envoi définitif afin de respecter les nuances et les priorités de chaque personne.",
        links: [{ href: "/partenaires", label: "Revenir aux partenaires" }],
      },
    ],
  },
];

function getPresentationState() {
  const params = new URLSearchParams(window.location.search);
  const parsedIndex = Number.parseInt(params.get("slide") ?? "1", 10);
  const currentIndex = Number.isFinite(parsedIndex) ? Math.min(Math.max(parsedIndex - 1, 0), SLIDES.length - 1) : 0;
  const detail = params.get("detail") ?? "";
  const validDetail = SLIDES[currentIndex].details.some((item) => item.id === detail) ? detail : "";
  return { currentIndex, detail: validDetail };
}

function createPresentationUrl(currentIndex: number, detail = "") {
  const params = new URLSearchParams({ slide: String(currentIndex + 1) });
  if (detail) params.set("detail", detail);
  return `/partenaires/presentation?${params.toString()}`;
}

function SlideVisual({ kind, accent }: { kind: VisualKind; accent: string }) {
  const pale = `${accent}14`;
  const paleStrong = `${accent}24`;

  if (kind === "compass") {
    return <div aria-hidden="true" className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64">
      <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: paleStrong }} />
      <div className="absolute inset-6 rounded-full border" style={{ borderColor: paleStrong }} />
      <div className="absolute inset-14 rounded-full" style={{ backgroundColor: pale }} />
      <div className="absolute left-1/2 top-5 h-28 w-1 -translate-x-1/2 rounded-full" style={{ backgroundColor: accent }} />
      <div className="absolute left-1/2 top-8 h-20 w-20 -translate-x-1/2 rotate-45 rounded-tl-[100%] rounded-tr-[12%] rounded-br-[100%] rounded-bl-[12%]" style={{ backgroundColor: accent }} />
      <div className="absolute inset-0 grid place-items-center"><Compass className="h-10 w-10 text-white" style={{ color: "#fff", filter: `drop-shadow(0 4px 8px ${accent}55)` }} /></div>
    </div>;
  }

  if (kind === "signals") {
    return <div aria-hidden="true" className="mx-auto grid max-w-xs grid-cols-4 items-end gap-3 px-3 py-8">
      {[42, 76, 58, 92].map((height, index) => <div key={height} className="rounded-t-2xl" style={{ height: `${height}px`, backgroundColor: index === 3 ? accent : paleStrong }} />)}
      <div className="col-span-4 mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400"><span>usages</span><span>ressources</span><span>priorités</span></div>
    </div>;
  }

  if (kind === "journey") {
    return <div aria-hidden="true" className="mx-auto flex max-w-sm items-center gap-2 py-10">
      {["Décrire", "Situer", "Agir"].map((label, index) => <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
        <div className="grid h-20 w-full place-items-center rounded-2xl px-2 text-center text-xs font-bold" style={{ backgroundColor: index === 1 ? accent : pale, color: index === 1 ? "#fff" : accent }}>{label}</div>
        {index < 2 && <ArrowRight className="h-4 w-4 shrink-0" style={{ color: accent }} />}
      </div>)}
    </div>;
  }

  if (kind === "community") {
    return <div aria-hidden="true" className="mx-auto grid w-60 grid-cols-3 gap-3 py-8 sm:w-72">
      {[0, 1, 2, 3, 4, 5].map((index) => <div key={index} className={`grid h-16 place-items-center rounded-2xl text-xs font-bold ${index === 1 || index === 4 ? "translate-y-4" : ""}`} style={{ backgroundColor: index === 2 ? accent : pale, color: index === 2 ? "#fff" : accent }}>
        {index === 2 ? "outil" : ["artistes", "lieux", "réseaux", "équipes", "publics"][index > 2 ? index - 1 : index]}
      </div>)}
    </div>;
  }

  if (kind === "cycle") {
    return <div aria-hidden="true" className="relative mx-auto h-60 w-60 sm:h-64 sm:w-64">
      <div className="absolute inset-6 rounded-full border-[18px] border-transparent" style={{ borderTopColor: accent, borderRightColor: paleStrong, borderBottomColor: accent, borderLeftColor: paleStrong }} />
      {["Comprendre", "Situer", "Prioriser", "Agir"].map((label, index) => <span key={label} className="absolute grid h-16 w-16 place-items-center rounded-full px-1 text-center text-[10px] font-bold leading-tight" style={{ backgroundColor: index % 2 === 0 ? accent : pale, color: index % 2 === 0 ? "#fff" : accent, left: index === 1 || index === 2 ? "calc(100% - 4rem)" : "0", top: index > 1 ? "calc(100% - 4rem)" : "0" }}>{label}</span>)}
      <div className="absolute inset-0 grid place-items-center"><Route className="h-9 w-9" style={{ color: accent }} /></div>
    </div>;
  }

  if (kind === "principles") {
    return <div aria-hidden="true" className="mx-auto grid max-w-sm grid-cols-3 gap-3 py-10">
      {["utile", "neutre", "souveraine"].map((label, index) => <div key={label} className="flex h-24 items-end rounded-2xl p-3 text-xs font-bold" style={{ backgroundColor: index === 1 ? accent : pale, color: index === 1 ? "#fff" : accent }}>{label}</div>)}
    </div>;
  }

  if (kind === "bridge") {
    return <div aria-hidden="true" className="mx-auto flex max-w-sm items-center justify-center gap-4 py-12">
      <div className="grid h-24 w-24 place-items-center rounded-3xl p-3 text-center text-xs font-bold" style={{ backgroundColor: pale, color: accent }}>membres<br />& publics</div>
      <div className="h-1 flex-1 rounded-full" style={{ background: `linear-gradient(90deg, ${accent}55, ${accent})` }} />
      <div className="grid h-24 w-24 place-items-center rounded-3xl p-3 text-center text-xs font-bold text-white" style={{ backgroundColor: accent }}>projet<br />partagé</div>
    </div>;
  }

  if (kind === "workshop") {
    return <div aria-hidden="true" className="relative mx-auto h-56 max-w-sm py-8">
      {[{ label: "retours", left: "6%", top: "18%" }, { label: "atelier", left: "37%", top: "2%" }, { label: "prototype", left: "66%", top: "38%" }].map((item, index) => <div key={item.label} className="absolute grid h-24 w-24 place-items-center rounded-full p-3 text-center text-xs font-bold" style={{ left: item.left, top: item.top, backgroundColor: index === 1 ? accent : pale, color: index === 1 ? "#fff" : accent }}>{item.label}</div>)}
      <div className="absolute left-[25%] top-[48%] h-px w-[46%] rotate-[21deg]" style={{ backgroundColor: paleStrong }} />
      <div className="absolute left-[32%] top-[37%] h-px w-[33%] -rotate-[30deg]" style={{ backgroundColor: paleStrong }} />
    </div>;
  }

  return <div aria-hidden="true" className="mx-auto flex max-w-sm items-center gap-4 py-12">
    <div className="grid h-24 w-24 place-items-center rounded-3xl text-white" style={{ backgroundColor: accent }}><CheckCircle2 className="h-10 w-10" /></div>
    <div className="min-w-0 flex-1 space-y-3"><div className="h-3 rounded-full" style={{ backgroundColor: paleStrong }} /><div className="h-3 w-3/4 rounded-full" style={{ backgroundColor: pale }} /><div className="h-3 w-2/5 rounded-full" style={{ backgroundColor: paleStrong }} /></div>
  </div>;
}

export default function PartnerPresentation() {
  const [location, setLocation] = useLocation();
  const initialState = useMemo(() => getPresentationState(), []);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [openDetail, setOpenDetail] = useState(initialState.detail);
  const previousIndexRef = useRef(initialState.currentIndex);
  const slide = SLIDES[currentIndex];
  const Icon = slide.icon;
  const isLast = currentIndex === SLIDES.length - 1;

  useEffect(() => {
    const nextState = getPresentationState();
    const indexChanged = nextState.currentIndex !== previousIndexRef.current;
    previousIndexRef.current = nextState.currentIndex;
    setCurrentIndex(nextState.currentIndex);
    setOpenDetail(nextState.detail);
    if (indexChanged) window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }, [location]);

  const setPresentationState = (nextIndex: number, detail = "") => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), SLIDES.length - 1);
    setLocation(createPresentationUrl(safeIndex, detail));
    if (detail) {
      window.requestAnimationFrame(() => document.getElementById(`presentation-detail-${detail}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.altKey || event.ctrlKey || event.metaKey || target?.matches("input, textarea, select, button, a, [role=button]")) return;
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        event.preventDefault();
        setPresentationState(currentIndex - 1);
      }
      if (event.key === "ArrowRight" && currentIndex < SLIDES.length - 1) {
        event.preventDefault();
        setPresentationState(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex]);

  return (
    <div className="bg-white px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/partenaires" className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[#515792]">
            <ArrowLeft className="h-4 w-4" /> Partenaires
          </Link>
          <span aria-live="polite">{currentIndex + 1} / {SLIDES.length}</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100" aria-label={`Progression : ${currentIndex + 1} sur ${SLIDES.length}`} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={SLIDES.length}>
          <div className="h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%`, backgroundColor: slide.accent }} />
        </div>

        <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white shadow-[0_20px_70px_rgba(42,54,90,0.08)]">
          <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.75fr)] lg:items-center lg:gap-14 lg:p-14">
            <div>
              <div className="flex items-start justify-between gap-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: slide.accent }}>{slide.eyebrow}</p>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm sm:h-14 sm:w-14" style={{ backgroundColor: slide.accent }}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-12">
                <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-5xl">{slide.title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{slide.text}</p>
                <p className="mt-6 text-sm font-medium text-slate-500">Ouvrez les repères ci-dessous pour approfondir sans quitter cette présentation.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white bg-white/70 p-3 shadow-inner sm:p-5"><SlideVisual kind={slide.visual} accent={slide.accent} /></div>
          </div>

          <div className="border-t border-slate-200 bg-white px-7 py-6 sm:px-10 lg:px-14">
            <Accordion type="single" collapsible value={openDetail} onValueChange={(value) => setPresentationState(currentIndex, value)} className="space-y-3">
              {slide.details.map((detail) => <AccordionItem id={`presentation-detail-${detail.id}`} key={detail.id} value={detail.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 px-4 last:border-b sm:px-5" style={{ borderColor: openDetail === detail.id ? `${slide.accent}55` : undefined }}>
                <AccordionTrigger className="py-4 no-underline hover:no-underline">
                  <span className="min-w-0 pr-2">
                    <span className="block text-base font-bold text-slate-900">{detail.title}</span>
                    <span className="mt-1 block text-sm font-normal leading-relaxed text-slate-500">{detail.summary}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="border-t pt-4" style={{ borderColor: `${slide.accent}22` }}>
                    <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{detail.content}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {detail.links.map((link) => <Link key={link.href} href={link.href} className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-semibold transition-transform duration-150 hover:-translate-y-0.5 motion-reduce:transition-none" style={{ borderColor: `${slide.accent}44`, backgroundColor: `${slide.accent}12`, color: slide.accent }}>
                        {link.label} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>)}
                    </div>
                    <p className="mt-4 text-xs text-slate-400">Utilisez le bouton précédent du navigateur pour revenir à cette slide et à ce détail.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>)}
            </Accordion>
          </div>
        </article>

        <nav className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Navigation de la présentation">
          <Button variant="outline" disabled={currentIndex === 0} onClick={() => setPresentationState(currentIndex - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
          </Button>
          <p className="text-center text-xs text-slate-400 sm:order-none">Flèches gauche et droite disponibles hors des contrôles interactifs.</p>
          {isLast ? (
            <Button asChild style={{ backgroundColor: "#E07428", color: "#fff" }}>
              <Link href="/partenaires/questionnaire">Partager mes idées et feedbacks <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          ) : (
            <Button onClick={() => setPresentationState(currentIndex + 1)} style={{ backgroundColor: slide.accent, color: "#fff" }}>
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </nav>
      </section>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
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

const RADAR_DIMENSIONS = ["Outils", "Compétences", "Données", "Diffusion", "Collaboration"];
const RADAR_PROFILES: Record<VisualKind, number[]> = {
  compass: [0.76, 0.52, 0.7, 0.58, 0.68],
  signals: [0.48, 0.72, 0.54, 0.82, 0.42],
  journey: [0.66, 0.62, 0.8, 0.48, 0.7],
  community: [0.58, 0.52, 0.64, 0.78, 0.84],
  cycle: [0.7, 0.58, 0.76, 0.6, 0.68],
  principles: [0.62, 0.7, 0.86, 0.48, 0.7],
  bridge: [0.58, 0.66, 0.62, 0.82, 0.8],
  workshop: [0.64, 0.76, 0.58, 0.54, 0.86],
  next: [0.72, 0.64, 0.7, 0.62, 0.78],
};

function SlideVisual({ kind, accent, icon: Icon }: { kind: VisualKind; accent: string; icon: typeof CircleHelp }) {
  const cx = 150;
  const cy = 132;
  const radius = 88;
  const values = RADAR_PROFILES[kind];
  const point = (index: number, factor: number) => {
    const angle = (index * 72 - 90) * Math.PI / 180;
    return { x: cx + radius * factor * Math.cos(angle), y: cy + radius * factor * Math.sin(angle) };
  };
  const polygon = (factor: number) => RADAR_DIMENSIONS.map((_, index) => {
    const value = point(index, factor);
    return `${value.x.toFixed(1)},${value.y.toFixed(1)}`;
  }).join(" ");
  const shape = values.map((value, index) => {
    const coordinate = point(index, value);
    return `${index ? "L" : "M"}${coordinate.x.toFixed(1)},${coordinate.y.toFixed(1)}`;
  }).join(" ") + " Z";

  return <div aria-hidden="true" className="mx-auto w-full max-w-[330px]">
    <div className="relative h-[220px] sm:h-[250px]">
      <svg viewBox="0 0 300 260" className="h-full w-full overflow-visible">
        <circle cx={cx} cy={cy} r="112" fill="none" stroke={`${accent}22`} strokeWidth="1" />
        {[1, 0.75, 0.5, 0.25].map((scale) => <polygon key={scale} points={polygon(scale)} fill="none" stroke="#d8dee9" strokeWidth="1" />)}
        {RADAR_DIMENSIONS.map((_, index) => {
          const outer = point(index, 1);
          return <line key={index} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="#d8dee9" strokeWidth="1" />;
        })}
        <path d={shape} fill={accent} fillOpacity="0.17" stroke={accent} strokeWidth="2.4" strokeLinejoin="round" />
        {values.map((value, index) => {
          const node = point(index, value);
          return <circle key={index} cx={node.x} cy={node.y} r="4.5" fill={accent} stroke="#fff" strokeWidth="1.5" />;
        })}
        <text x={cx} y="13" textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>N</text>
        <text x="290" y={cy + 3} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>E</text>
        <text x={cx} y="252" textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>S</text>
        <text x="10" y={cy + 3} textAnchor="middle" fontSize="10" fontWeight="700" fill={accent}>O</text>
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-white shadow-lg" style={{ backgroundColor: accent }}><Icon className="h-6 w-6 text-white" /></div>
      </div>
    </div>
    <div className="grid grid-cols-5 gap-1 text-center text-[9px] font-bold uppercase tracking-[0.05em] text-slate-500 sm:text-[10px]">
      {RADAR_DIMENSIONS.map((label) => <span key={label} className="leading-tight">{label}</span>)}
    </div>
  </div>;
}

export default function PartnerPresentation() {
  const [location, setLocation] = useLocation();
  const initialState = useMemo(() => getPresentationState(), []);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [openDetail, setOpenDetail] = useState(initialState.detail);
  const slide = SLIDES[currentIndex];
  const Icon = slide.icon;
  const isLast = currentIndex === SLIDES.length - 1;

  useEffect(() => {
    const nextState = getPresentationState();
    setCurrentIndex(nextState.currentIndex);
    setOpenDetail(nextState.detail);
  }, [location]);

  const setPresentationState = (nextIndex: number, detail = "") => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), SLIDES.length - 1);
    setCurrentIndex(safeIndex);
    setOpenDetail(detail);
    setLocation(createPresentationUrl(safeIndex, detail));
    if (detail) {
      window.requestAnimationFrame(() => document.getElementById(`presentation-detail-${detail}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  };

  const goToSlide = (nextIndex: number) => {
    setPresentationState(nextIndex);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.altKey || event.ctrlKey || event.metaKey || target?.matches("input, textarea, select, button, a, [role=button]")) return;
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        event.preventDefault();
        goToSlide(currentIndex - 1);
      }
      if (event.key === "ArrowRight" && currentIndex < SLIDES.length - 1) {
        event.preventDefault();
        goToSlide(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex]);

  return (
    <div className="bg-white px-4 py-8 sm:py-12">
      <section className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 text-sm text-slate-500">
          <Link href="/partenaires" className="inline-flex items-center gap-2 font-medium transition-colors hover:text-[#515792]">
            <ArrowLeft className="h-4 w-4" /> Partenaires
          </Link>
          <span aria-live="polite">{currentIndex + 1} / {SLIDES.length}</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100" aria-label={`Progression : ${currentIndex + 1} sur ${SLIDES.length}`} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={SLIDES.length}>
          <div className="h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%`, backgroundColor: slide.accent }} />
        </div>

        <article className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white shadow-[0_20px_70px_rgba(42,54,90,0.08)] lg:max-h-[800px] lg:overflow-y-auto">
          <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center lg:gap-8 lg:p-9 xl:p-10">
            <div>
              <div className="flex items-start justify-between gap-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: slide.accent }}>{slide.eyebrow}</p>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm sm:h-14 sm:w-14" style={{ backgroundColor: slide.accent }}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-6">
                <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl xl:text-[2.7rem]">{slide.title}</h1>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{slide.text}</p>
                <p className="mt-4 text-sm font-medium text-slate-500">Ouvrez les repères ci-dessous pour approfondir sans quitter cette présentation.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-white bg-white/70 p-3 shadow-inner sm:p-4"><SlideVisual kind={slide.visual} accent={slide.accent} icon={Icon} /></div>
          </div>

          <div className="border-t border-slate-200 bg-white px-5 py-5 sm:px-7 lg:px-9 xl:px-10">
            <Accordion type="single" collapsible value={openDetail} onValueChange={(value) => setPresentationState(currentIndex, value)} className="grid gap-3 lg:grid-cols-2">
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

        <nav className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Navigation de la présentation">
          <Button variant="outline" disabled={currentIndex === 0} onClick={() => goToSlide(currentIndex - 1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
          </Button>
          <p className="text-center text-xs text-slate-400 sm:order-none">Flèches gauche et droite disponibles hors des contrôles interactifs.</p>
          {isLast ? (
            <Button asChild style={{ backgroundColor: "#E07428", color: "#fff" }}>
              <Link href="/partenaires/questionnaire">Partager mes idées et feedbacks <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          ) : (
            <Button onClick={() => goToSlide(currentIndex + 1)} style={{ backgroundColor: slide.accent, color: "#fff" }}>
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </nav>
      </section>
    </div>
  );
}

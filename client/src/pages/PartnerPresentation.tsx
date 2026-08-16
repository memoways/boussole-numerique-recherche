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
import { AnimatedRadarGraphic } from "@/components/AnimatedRadarGraphic";
import { InteractiveNarrativeIllustration, type NarrativeVisualKind } from "@/components/InteractiveNarrativeIllustration";

/**
 * Présentation partenaire — direction visuelle : progression bleu → cyan → vert → orange.
 * Le deck privilégie une lecture horizontale, une navigation immobile et des titres compacts sur desktop.
 * Les détails se déploient dans le flux de lecture ; l’état slide/détail reste dans l’URL.
 */

type Detail = {
  id: string;
  title: string;
  summary: string;
  content: string;
  links: Array<{ href: string; label: string }>;
};

type VisualKind = "compass" | "signals" | "journey" | "community" | "cycle" | "principles" | "bridge" | "workshop" | "next" | "none";

type Slide = {
  eyebrow: string;
  title: string;
  text: string;
  narrative: string;
  outcomes: string[];
  partnerValue: string;
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
    narrative: "Elle ne compare pas les personnes à un modèle idéal. Elle part de ce qui fonctionne déjà, des contraintes réelles et des priorités que chaque structure souhaite rendre possibles.",
    outcomes: ["Mettre des mots sur les pratiques plutôt que sur les outils.", "Rendre visibles les points d’appui comme les sujets à examiner.", "Transformer un constat en prochaine étape compréhensible."],
    partnerValue: "L’enjeu est de donner un repère commun pour ouvrir une conversation utile, sans simplifier les réalités du terrain.",
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
    narrative: "Une équipe peut être freinée par la circulation de l’information, une autre par la transmission des compétences ou par la relation à ses publics. La même solution ne convient donc pas à toutes les situations.",
    outcomes: ["Faire remonter les difficultés et les ambitions telles qu’elles sont vécues.", "Distinguer ce qui demande une décision, un appui ou un temps d’exploration.", "Éviter les recommandations génériques qui déplacent le problème."],
    partnerValue: "Les partenaires apportent les nuances qui permettront à la Boussole de parler juste à des profils, des métiers et des communautés différentes.",
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
    narrative: "Le futur parcours reste volontairement léger : il recueille quelques repères, les restitue dans une carte lisible, puis aide à formuler ce qui pourrait être tenté, discuté ou approfondi.",
    outcomes: ["Décrire une situation sans mobiliser de vocabulaire technique.", "Situer les priorités dans un panorama à cinq dimensions.", "Agir à partir de pistes reliées au contexte, pas d’une liste standard."],
    partnerValue: "Pour vos membres, la valeur se mesure à la qualité du premier pas : réaliste, appropriable et facile à partager avec une équipe.",
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
    narrative: "La Boussole devra pouvoir servir une personne indépendante comme une organisation structurée, sans effacer leurs différences de moyens, de temps disponible ou de responsabilité.",
    outcomes: ["Adapter les formulations au rôle et à la réalité de la personne qui répond.", "Relier les pratiques internes aux besoins des membres, équipes et publics.", "Proposer des repères qui restent utiles lorsqu’une structure évolue."],
    partnerValue: "Votre retour permet de tester qui se reconnaît dans le parcours, ce qui manque et ce qui doit être simplifié pour rester inclusif.",
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
    narrative: "Le résultat ne cherche pas à attribuer une note. Il compose une lecture de plusieurs dimensions qui invite à choisir ce qui mérite une attention immédiate, puis ce qui peut devenir un chantier collectif.",
    outcomes: ["Comprendre les liens entre usages, compétences, organisation et publics.", "Prioriser sans réduire une situation complexe à un score unique.", "Conserver une trace claire des décisions et des pistes explorées."],
    partnerValue: "La Boussole doit aider à passer d’un ressenti diffus à une discussion structurée, sans transformer le diagnostic en prescription.",
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
    narrative: "Les choix de conception doivent pouvoir être expliqués. Les données recueillies ont une finalité précise, les ressources sont présentées sans hiérarchisation commerciale et les règles d’évolution restent discutables publiquement.",
    outcomes: ["Donner accès à des informations et des ressources sans logique de mise en avant payante.", "Rendre visibles les conditions de collecte, d’usage et de conservation des données.", "Préserver la capacité de chaque personne à comprendre et à décider."],
    partnerValue: "Ce cadre est une condition de confiance : il se vérifie avec les partenaires avant de devenir un engagement de la version publique.",
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
    narrative: "La Boussole ne sera utile que si ses questions, ses résultats et ses modes de diffusion prennent appui sur les situations que vous observez au quotidien. Votre rôle dépasse le test d’interface : il oriente les choix de fond.",
    outcomes: ["Faire remonter les enjeux que vos membres rencontrent maintenant.", "Vérifier les mots, exemples et repères qui favorisent l’appropriation.", "Imaginer les conditions d’une diffusion et d’un accompagnement réalistes."],
    partnerValue: "La contribution partenaire transforme des besoins dispersés en base de travail collective pour la suite du projet.",
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
    narrative: "Les réponses ne sont ni une enquête de satisfaction ni un vote. Elles permettent d’arriver à l’atelier avec des situations concrètes, des désaccords utiles et des critères de réussite déjà formulés.",
    outcomes: ["Poser un premier regard à travers des choix, des échelles et des réponses ouvertes.", "Exprimer une idée, une crainte ou un besoin non couvert avec ses propres mots.", "Préparer un atelier qui priorise les hypothèses avant de prototyper."],
    partnerValue: "Votre contribution contribue directement à définir ce que la première version devra faire, expliquer et ne pas faire.",
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
    narrative: "Chaque réponse reste liée à une invitation personnelle, peut être enregistrée comme brouillon et relue avant l’envoi. Le temps de contribution doit s’adapter à votre disponibilité, pas l’inverse.",
    outcomes: ["Répondre seul·e ou préparer sa contribution avec son équipe.", "Reprendre le questionnaire plus tard sans perdre son travail.", "Conserver les nuances nécessaires avant de valider une réponse."],
    partnerValue: "Une contribution attentive, même courte, apporte des éléments décisifs pour concevoir une Boussole pertinente et praticable.",
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

const PARTNER_RADAR_DIMENSIONS = [
  { label: "Outils", couleur: "#515792", emoji: "🛠️", resume: "outils et pratiques de travail." },
  { label: "Compétences", couleur: "#E27227", emoji: "🎓", resume: "savoir-faire et culture numérique." },
  { label: "Données", couleur: "#3aab8a", emoji: "🗄️", resume: "collecte, archivage et documentation." },
  { label: "Diffusion", couleur: "#9b59b6", emoji: "📡", resume: "relation numérique avec les publics." },
  { label: "Collaboration", couleur: "#E58441", emoji: "🔗", resume: "partage et cohérence d’équipe." },
];

const PRESENTATION_PATH = "/partenaires/presentation";

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
  return `${PRESENTATION_PATH}?${params.toString()}`;
}

function StoryIllustration({ kind, accent }: { kind: Exclude<VisualKind, "compass" | "none">; accent: string }) {
  const pale = `${accent}14`;
  const soft = `${accent}2b`;

  if (kind === "journey") return <div aria-hidden="true" className="relative mx-auto w-full max-w-[320px] py-5">
    <span className="absolute left-[14%] right-[14%] top-1/2 h-px -translate-y-1/2" style={{ backgroundColor: soft }} />
    <div className="relative grid grid-cols-3 gap-2">{[["01", "Décrire"], ["02", "Situer"], ["03", "Agir"]].map(([number, label], index) => <div key={label} className="text-center"><span className="mx-auto grid h-12 w-12 place-items-center rounded-full text-xs font-extrabold" style={{ backgroundColor: index === 1 ? accent : pale, color: index === 1 ? "#fff" : accent }}>{number}</span><span className="mt-3 block text-xs font-bold" style={{ color: accent }}>{label}</span></div>)}</div>
    <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">Une lecture courte pour passer d’une situation à une décision praticable.</p>
  </div>;

  if (kind === "signals") return <div aria-hidden="true" className="mx-auto w-full max-w-[310px]">
    <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>Ce qui mérite attention</p>
    <div className="space-y-4">{[["Temps perdu", "72%"], ["Compétences à partager", "54%"], ["Publics à mieux connaître", "38%"]].map(([label, value], index) => <div key={label}><div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-600"><span>{label}</span><span style={{ color: accent }}>{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full" style={{ width: value, backgroundColor: index === 1 ? "#E07428" : accent }} /></div></div>)}</div>
    <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">Chaque communauté fait émerger ses propres priorités.</p>
  </div>;

  if (kind === "community") return <div aria-hidden="true" className="relative mx-auto h-48 w-full max-w-[320px]">
    {[["Artistes", "6%", "15%"], ["Lieux", "70%", "8%"], ["Réseaux", "4%", "73%"], ["Équipes", "70%", "78%"]].map(([label, left, top]) => <span key={label} className="absolute text-xs font-bold" style={{ left, top, color: accent }}>{label}</span>)}
    <span className="absolute left-[18%] top-[34%] h-px w-[64%] -rotate-[20deg]" style={{ backgroundColor: soft }} /><span className="absolute left-[18%] top-[62%] h-px w-[64%] rotate-[20deg]" style={{ backgroundColor: soft }} />
    <span className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-center text-xs font-bold text-white shadow-lg" style={{ backgroundColor: accent }}>Un repère<br />commun</span>
    {[["24%", "29%"], ["75%", "32%"], ["24%", "65%"], ["74%", "67%"]].map(([left, top], index) => <span key={`${left}-${top}`} className="absolute h-3.5 w-3.5 rounded-full border-2 border-white" style={{ left, top, backgroundColor: index === 1 ? "#E07428" : accent }} />)}
  </div>;

  if (kind === "cycle") return <div aria-hidden="true" className="relative mx-auto h-48 w-full max-w-[310px]">
    <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-transparent" style={{ borderTopColor: accent, borderRightColor: soft, borderBottomColor: accent, borderLeftColor: soft }} />
    {["Comprendre", "Situer", "Prioriser", "Agir"].map((label, index) => <span key={label} className="absolute text-xs font-bold" style={{ color: index % 2 ? accent : "#64748b", left: index === 1 || index === 2 ? "calc(100% - 4.6rem)" : "0", top: index > 1 ? "calc(100% - 1.25rem)" : "0" }}>{label}</span>)}
    <p className="absolute inset-x-10 top-1/2 -translate-y-1/2 text-center text-xs font-bold" style={{ color: accent }}>Pas de note unique</p>
  </div>;

  if (kind === "principles") return <div aria-hidden="true" className="mx-auto grid w-full max-w-[320px] grid-cols-3 gap-3 pt-5">
    {[["Utile", "Ce qui aide"], ["Neutre", "Sans classement"], ["Souveraine", "Choix compris"]].map(([label, detail], index) => <div key={label} className="text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full text-xs font-extrabold" style={{ backgroundColor: index === 1 ? accent : pale, color: index === 1 ? "#fff" : accent }}>{index + 1}</span><span className="mt-3 block text-xs font-bold" style={{ color: accent }}>{label}</span><span className="mt-1 block text-[11px] leading-snug text-slate-500">{detail}</span></div>)}
  </div>;

  if (kind === "bridge") return <div aria-hidden="true" className="relative mx-auto h-48 w-full max-w-[320px]">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold" style={{ color: accent }}>Besoins<br />des membres</span><span className="absolute right-3 top-1/2 -translate-y-1/2 text-right text-xs font-bold" style={{ color: accent }}>Projet<br />partagé</span>
    <span className="absolute left-[25%] right-[25%] top-1/2 h-1 -translate-y-1/2 rounded-full" style={{ background: `linear-gradient(90deg, ${soft}, ${accent}, ${soft})` }} />
    {["Formulations", "Priorités", "Diffusion"].map((label, index) => <span key={label} className="absolute grid h-16 w-16 place-items-center rounded-full p-2 text-center text-[10px] font-bold text-white shadow-md" style={{ backgroundColor: index === 1 ? accent : "#3a7fc1", left: index === 0 ? "31%" : index === 1 ? "calc(50% - 2rem)" : "calc(69% - 4rem)", top: index === 1 ? "15%" : "58%" }}>{label}</span>)}
  </div>;

  if (kind === "next") return <div aria-hidden="true" className="relative mx-auto w-full max-w-[320px] py-6">
    <span className="absolute left-[12%] right-[12%] top-[3.9rem] h-px" style={{ backgroundColor: soft }} />
    <div className="relative grid grid-cols-3 gap-3">{[["1", "Invitation"], ["2", "Brouillon"], ["3", "Contribution"]].map(([number, label], index) => <div key={label} className="text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full text-lg font-extrabold" style={{ backgroundColor: index === 2 ? accent : pale, color: index === 2 ? "#fff" : accent }}>{number}</span><span className="mt-3 block text-xs font-bold" style={{ color: accent }}>{label}</span></div>)}</div>
    <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">Un rythme de réponse qui laisse la place à la réflexion.</p>
  </div>;

  return <div aria-hidden="true" className="relative mx-auto h-48 w-full max-w-[320px]">
    <span className="absolute left-[19%] top-[50%] h-px w-[62%] -rotate-[25deg]" style={{ backgroundColor: soft }} /><span className="absolute left-[18%] top-[49%] h-px w-[62%] rotate-[25deg]" style={{ backgroundColor: soft }} />
    {[{ label: "Retours", left: "4%", top: "50%" }, { label: "Atelier", left: "38%", top: "7%" }, { label: "Prototype", left: "69%", top: "54%" }].map((item, index) => <span key={item.label} className="absolute grid h-20 w-20 place-items-center rounded-full p-2 text-center text-xs font-bold" style={{ left: item.left, top: item.top, backgroundColor: index === 1 ? accent : pale, color: index === 1 ? "#fff" : accent }}>{item.label}</span>)}
    <p className="absolute inset-x-6 bottom-0 text-center text-xs leading-relaxed text-slate-500">Des retours concrets deviennent une matière de conception partagée.</p>
  </div>;
}

export default function PartnerPresentation() {
  const [location, setLocation] = useLocation();
  const initialState = useMemo(() => getPresentationState(), []);
  const [currentIndex, setCurrentIndex] = useState(initialState.currentIndex);
  const [openDetail, setOpenDetail] = useState(initialState.detail);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward" | "instant">("instant");
  const slide = SLIDES[currentIndex];
  const isLast = currentIndex === SLIDES.length - 1;

  useEffect(() => {
    const nextState = getPresentationState();
    setCurrentIndex(nextState.currentIndex);
    setOpenDetail(nextState.detail);
  }, [location]);

  useEffect(() => {
    if (window.location.pathname !== `${PRESENTATION_PATH}/`) return;
    window.history.replaceState({}, "", `${PRESENTATION_PATH}${window.location.search}${window.location.hash}`);
  }, []);

  const setPresentationState = (nextIndex: number, detail = "") => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), SLIDES.length - 1);
    setCurrentIndex(safeIndex);
    setOpenDetail(detail);
    setLocation(createPresentationUrl(safeIndex, detail));
    if (detail) {
      window.requestAnimationFrame(() => document.getElementById(`presentation-detail-${detail}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  };

  const goToSlide = (nextIndex: number, instant = false) => {
    setTransitionDirection(instant ? "instant" : nextIndex > currentIndex ? "forward" : "backward");
    setPresentationState(nextIndex);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: instant ? "auto" : "smooth" }));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.altKey || event.ctrlKey || event.metaKey || target?.matches("input, textarea, select, button, a, [role=button]")) return;
      if (event.key === "ArrowLeft" && currentIndex > 0) {
        event.preventDefault();
        goToSlide(currentIndex - 1, true);
      }
      if (event.key === "ArrowRight" && currentIndex < SLIDES.length - 1) {
        event.preventDefault();
        goToSlide(currentIndex + 1, true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [currentIndex]);

  return (
    <div className="bg-white px-4 py-4 sm:py-6">
      <section className="mx-auto max-w-7xl">
        <article className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-white shadow-[0_20px_70px_rgba(42,54,90,0.08)] lg:flex lg:h-[950px] lg:max-h-[950px] lg:flex-col">
          <div className="p-5 sm:p-6 lg:h-[580px] lg:shrink-0 lg:overflow-hidden lg:p-7 xl:p-8">
            <div key={currentIndex} className={`partner-slide-enter partner-slide-enter--${transitionDirection} h-full`}>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: slide.accent }}>{slide.eyebrow}</p>
            <h1 className="mt-3 max-w-none text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-4xl lg:text-[2rem] xl:text-[2.25rem] xl:whitespace-nowrap">{slide.title}</h1>
            <div className="mt-4 grid gap-8 lg:min-h-[455px] lg:grid-cols-[minmax(0,3fr)_minmax(350px,2fr)] lg:items-stretch lg:gap-12">
              <div className="flex min-w-0 flex-col lg:min-h-[455px]">
                <p className="max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg">{slide.text}</p>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{slide.narrative}</p>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                  {slide.outcomes.map((outcome, index) => <div key={outcome} className="border-l-2 pl-3 text-sm leading-snug text-slate-600" style={{ borderColor: index === 1 ? "#E07428" : slide.accent }}>{outcome}</div>)}
                </div>
                <p className="mt-5 border-l-2 pl-4 text-sm font-semibold leading-relaxed text-slate-700 lg:mt-auto" style={{ borderColor: slide.accent }}>{slide.partnerValue}</p>
              </div>
              <div className="flex min-w-0 items-center justify-center lg:pl-0">
                {slide.visual === "compass" ? <AnimatedRadarGraphic interactive dimensions={PARTNER_RADAR_DIMENSIONS} ariaLabel="Radar interactif des cinq dimensions de la Boussole" className="mx-auto h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]" /> : <InteractiveNarrativeIllustration kind={slide.visual as NarrativeVisualKind} accent={slide.accent} />}
              </div>
            </div>
            </div>
          </div>

          <nav className="shrink-0 border-y border-slate-200 bg-white px-5 py-4 sm:px-7 lg:h-[72px] lg:px-9 xl:px-10" aria-label="Navigation de la présentation">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-5">
              <Button variant="outline" disabled={currentIndex === 0} onClick={() => goToSlide(currentIndex - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
              </Button>
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100" aria-label={`Progression : ${currentIndex + 1} sur ${SLIDES.length}`} role="progressbar" aria-valuenow={currentIndex + 1} aria-valuemin={1} aria-valuemax={SLIDES.length}>
                  <div className="h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((currentIndex + 1) / SLIDES.length) * 100}%`, backgroundColor: slide.accent }} />
                </div>
                <span className="shrink-0 text-xs font-semibold tabular-nums text-slate-500" aria-live="polite">{currentIndex + 1} / {SLIDES.length}</span>
              </div>
              {isLast ? (
                <Button asChild style={{ backgroundColor: "#E07428", color: "#fff" }}>
                  <Link href="/partenaires/questionnaire">Partager mes idées et feedbacks <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              ) : (
                <Button onClick={() => goToSlide(currentIndex + 1)} style={{ backgroundColor: slide.accent, color: "#fff" }}>
                  Suivant <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </nav>

          <div className="bg-white px-5 py-5 sm:px-7 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:px-9 xl:px-10">
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

      </section>
    </div>
  );
}

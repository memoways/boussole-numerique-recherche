/**
 * Illustrations partenaires — direction visuelle : schémas sans cadre, activables au survol, au focus et au clic.
 * Chaque élément fait évoluer une phrase de lecture complémentaire au récit de la slide.
 */
import { useState, type KeyboardEvent } from "react";

export type NarrativeVisualKind = "signals" | "journey" | "community" | "cycle" | "principles" | "bridge" | "workshop" | "next";

type StoryStep = {
  label: string;
  short: string;
  summary: string;
};

const STORIES: Record<NarrativeVisualKind, { title: string; steps: StoryStep[] }> = {
  signals: {
    title: "Les signaux à relier",
    steps: [
      { label: "Temps", short: "Temps", summary: "Repérer les frictions qui prennent de la place dans le quotidien." },
      { label: "Compétences", short: "Compétences", summary: "Identifier ce qui doit circuler plutôt que reposer sur une seule personne." },
      { label: "Publics", short: "Publics", summary: "Relier les décisions numériques à l’expérience des personnes accompagnées." },
    ],
  },
  journey: {
    title: "Le mouvement du parcours",
    steps: [
      { label: "Décrire", short: "01", summary: "Partir d’une situation réelle, exprimée sans vocabulaire technique." },
      { label: "Situer", short: "02", summary: "Mettre cette situation en relation avec plusieurs dimensions de pratique." },
      { label: "Agir", short: "03", summary: "Choisir une prochaine étape qui reste proportionnée au contexte." },
    ],
  },
  community: {
    title: "Les réalités à relier",
    steps: [
      { label: "Profils", short: "Profils", summary: "Reconnaître des rôles, des rythmes et des responsabilités différents." },
      { label: "Communautés", short: "Communautés", summary: "Faire tenir ensemble les réalités des équipes, des membres et des publics." },
      { label: "Besoins", short: "Besoins", summary: "Faire émerger le besoin qui mérite une réponse partagée." },
    ],
  },
  cycle: {
    title: "Une lecture sans note unique",
    steps: [
      { label: "Comprendre", short: "Comprendre", summary: "Rassembler les éléments qui expliquent la situation." },
      { label: "Situer", short: "Situer", summary: "Voir les liens entre usages, compétences, organisation et publics." },
      { label: "Prioriser", short: "Prioriser", summary: "Distinguer ce qui est urgent, important ou simplement à explorer." },
      { label: "Agir", short: "Agir", summary: "Transformer la lecture en décision, en échange ou en premier geste." },
    ],
  },
  principles: {
    title: "Les conditions de confiance",
    steps: [
      { label: "Utile", short: "Utile", summary: "Chaque repère doit soutenir une décision concrète, pas ajouter de complexité." },
      { label: "Neutre", short: "Neutre", summary: "Les ressources restent accessibles sans mise en avant commerciale." },
      { label: "Souveraine", short: "Souveraine", summary: "Les personnes comprennent les choix, les données et les règles du service." },
    ],
  },
  bridge: {
    title: "De l’écoute à la réponse",
    steps: [
      { label: "Écouter", short: "Écouter", summary: "Recueillir les situations et formulations qui reviennent dans les communautés." },
      { label: "Traduire", short: "Traduire", summary: "Transformer ces retours en priorités de conception compréhensibles." },
      { label: "Relier", short: "Relier", summary: "Faire de la Boussole une ressource que les partenaires peuvent réellement mobiliser." },
    ],
  },
  workshop: {
    title: "La boucle de co-conception",
    steps: [
      { label: "Retours", short: "Retours", summary: "Faire apparaître les besoins, idées et inquiétudes avec les mots du terrain." },
      { label: "Atelier", short: "Atelier", summary: "Mettre les expériences en discussion pour clarifier ce qui compte vraiment." },
      { label: "Prototype", short: "Prototype", summary: "Tester une réponse, apprendre puis ajuster avant de généraliser." },
    ],
  },
  next: {
    title: "Votre contribution, à votre rythme",
    steps: [
      { label: "Invitation", short: "1", summary: "Un lien personnel identifie le cadre de contribution sans vous imposer de rythme." },
      { label: "Brouillon", short: "2", summary: "Les réponses peuvent être relues, complétées et reprises plus tard." },
      { label: "Contribution", short: "3", summary: "Les nuances partagées deviennent une matière de conception pour la suite." },
    ],
  },
};

type Props = {
  kind: NarrativeVisualKind;
  accent: string;
};

export function InteractiveNarrativeIllustration({ kind, accent }: Props) {
  const story = STORIES[kind];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = story.steps[activeIndex];
  const pale = `${accent}14`;
  const soft = `${accent}2b`;

  const activate = (index: number) => setActiveIndex(index);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(index);
    }
  };
  const nodeClass = "relative z-10 grid place-items-center text-center font-bold outline-none transition-[transform,box-shadow,background-color,color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none motion-reduce:transition-none";
  const nodeStyle = (index: number) => ({
    backgroundColor: activeIndex === index ? accent : pale,
    color: activeIndex === index ? "#fff" : accent,
    boxShadow: activeIndex === index ? `0 12px 24px ${accent}2f` : "none",
    outlineColor: accent,
  });
  const nodeEvents = (index: number) => ({
    onMouseEnter: () => activate(index),
    onFocus: () => activate(index),
    onClick: () => activate(index),
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => onKeyDown(event, index),
    "aria-pressed": activeIndex === index,
  });

  const LinearIllustration = () => <div className="relative grid grid-cols-3 gap-3 pt-6">
    <span className="absolute left-[12%] right-[12%] top-[3.5rem] h-px" style={{ backgroundColor: soft }} />
    {story.steps.map((step, index) => <button key={step.label} type="button" {...nodeEvents(index)} className={`${nodeClass} mx-auto h-14 w-14 rounded-full text-xs`} style={nodeStyle(index)}><span>{step.short}</span><span className="absolute -bottom-6 w-24 text-xs font-bold" style={{ color: accent }}>{step.label}</span></button>)}
  </div>;

  const SignalsIllustration = () => <div className="space-y-4 pt-2">
    {story.steps.map((step, index) => <button key={step.label} type="button" {...nodeEvents(index)} className="group w-full text-left outline-none" aria-label={`Afficher : ${step.label}`}><span className="mb-1.5 flex justify-between text-xs font-bold text-slate-600"><span>{step.label}</span><span style={{ color: accent }}>{["72%", "54%", "38%"][index]}</span></span><span className="block h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full origin-left rounded-full transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-150 group-focus-visible:scale-y-150 motion-reduce:transition-none" style={{ width: ["72%", "54%", "38%"][index], backgroundColor: activeIndex === index ? accent : soft }} /></span></button>)}
  </div>;

  const RadialIllustration = () => <div className="relative mx-auto h-44 w-full max-w-[310px]">
    <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-[10px] border-transparent" style={{ borderTopColor: accent, borderRightColor: soft, borderBottomColor: accent, borderLeftColor: soft }} />
    {story.steps.map((step, index) => <button key={step.label} type="button" {...nodeEvents(index)} className={`${nodeClass} absolute h-16 w-16 rounded-full p-2 text-[10px]`} style={{ ...nodeStyle(index), left: index === 1 ? "calc(100% - 4rem)" : index === 2 ? "calc(50% - 2rem)" : "0", top: index === 0 ? "calc(50% - 2rem)" : index === 1 ? "0" : "calc(100% - 4rem)" }}>{step.short}</button>)}
    <span className="absolute inset-x-14 top-1/2 -translate-y-1/2 text-center text-[11px] font-bold" style={{ color: accent }}>{kind === "community" ? "Un repère commun" : kind === "bridge" ? "Un projet partagé" : "Du terrain au test"}</span>
  </div>;

  const CycleIllustration = () => <div className="relative mx-auto h-44 w-full max-w-[310px]">
    <span className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-[12px] border-transparent" style={{ borderTopColor: accent, borderRightColor: soft, borderBottomColor: accent, borderLeftColor: soft }} />
    {story.steps.map((step, index) => <button key={step.label} type="button" {...nodeEvents(index)} className={`${nodeClass} absolute rounded-full px-2 py-1 text-[10px]`} style={{ ...nodeStyle(index), left: index === 1 || index === 2 ? "calc(100% - 5.25rem)" : "0", top: index > 1 ? "calc(100% - 1.9rem)" : "0" }}>{step.short}</button>)}
    <span className="absolute inset-x-12 top-1/2 -translate-y-1/2 text-center text-[11px] font-bold" style={{ color: accent }}>Pas de note unique</span>
  </div>;

  const PrinciplesIllustration = () => <div className="grid grid-cols-3 gap-3 pt-4">
    {story.steps.map((step, index) => <button key={step.label} type="button" {...nodeEvents(index)} className={`${nodeClass} min-h-28 rounded-full p-2 text-xs`} style={nodeStyle(index)}><span>{step.short}</span><span className="mt-2 text-[10px] font-medium leading-snug" style={{ color: activeIndex === index ? "#fff" : "#64748b" }}>{index === 0 ? "Ce qui aide" : index === 1 ? "Sans classement" : "Choix compris"}</span></button>)}
  </div>;

  const graphic = kind === "signals" ? <SignalsIllustration /> : kind === "journey" || kind === "next" ? <LinearIllustration /> : kind === "cycle" ? <CycleIllustration /> : kind === "principles" ? <PrinciplesIllustration /> : <RadialIllustration />;

  return <section className="mx-auto w-full max-w-[320px]" aria-label={story.title}>
    <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.15em]" style={{ color: accent }}>{story.title}</p>
    {graphic}
    <p className="mt-7 min-h-10 text-center text-xs leading-relaxed text-slate-500" aria-live="polite"><span className="font-bold" style={{ color: accent }}>{active.label}</span> — {active.summary}</p>
  </section>;
}

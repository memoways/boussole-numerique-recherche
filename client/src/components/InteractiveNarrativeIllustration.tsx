/**
 * Illustrations partenaires — direction visuelle : parcours lisibles, sans panneau décoratif ni libellé flottant.
 * Chaque schéma complète le texte de la slide et répond au survol, au focus et au clic.
 */
import { useState, type KeyboardEvent } from "react";

export type NarrativeVisualKind = "signals" | "journey" | "community" | "cycle" | "principles" | "bridge" | "workshop" | "next";

type StoryStep = {
  label: string;
  summary: string;
};

const STORIES: Record<NarrativeVisualKind, { title: string; steps: StoryStep[] }> = {
  signals: {
    title: "Les signaux à relier",
    steps: [
      { label: "Temps", summary: "Repérer les frictions qui prennent de la place dans le quotidien." },
      { label: "Compétences", summary: "Identifier ce qui doit circuler plutôt que reposer sur une seule personne." },
      { label: "Publics", summary: "Relier les décisions numériques à l’expérience des personnes accompagnées." },
    ],
  },
  journey: {
    title: "Le mouvement du parcours",
    steps: [
      { label: "Décrire", summary: "Partir d’une situation réelle, exprimée sans vocabulaire technique." },
      { label: "Situer", summary: "Mettre cette situation en relation avec plusieurs dimensions de pratique." },
      { label: "Agir", summary: "Choisir une prochaine étape qui reste proportionnée au contexte." },
    ],
  },
  community: {
    title: "Les réalités à relier",
    steps: [
      { label: "Profils", summary: "Reconnaître des rôles, des rythmes et des responsabilités différents." },
      { label: "Communautés", summary: "Faire tenir ensemble les réalités des équipes, des membres et des publics." },
      { label: "Besoins", summary: "Faire émerger le besoin qui mérite une réponse partagée." },
    ],
  },
  cycle: {
    title: "Une lecture sans note unique",
    steps: [
      { label: "Comprendre", summary: "Rassembler les éléments qui expliquent la situation." },
      { label: "Situer", summary: "Voir les liens entre usages, compétences, organisation et publics." },
      { label: "Prioriser", summary: "Distinguer ce qui est urgent, important ou simplement à explorer." },
      { label: "Agir", summary: "Transformer la lecture en décision, en échange ou en premier geste." },
    ],
  },
  principles: {
    title: "Les conditions de confiance",
    steps: [
      { label: "Utile", summary: "Chaque repère doit soutenir une décision concrète, pas ajouter de complexité." },
      { label: "Neutre", summary: "Les ressources restent accessibles sans mise en avant commerciale." },
      { label: "Souveraine", summary: "Les personnes comprennent les choix, les données et les règles du service." },
    ],
  },
  bridge: {
    title: "De l’écoute à la réponse",
    steps: [
      { label: "Écouter", summary: "Recueillir les situations et formulations qui reviennent dans les communautés." },
      { label: "Traduire", summary: "Transformer ces retours en priorités de conception compréhensibles." },
      { label: "Relier", summary: "Faire de la Boussole une ressource que les partenaires peuvent réellement mobiliser." },
    ],
  },
  workshop: {
    title: "La boucle de co-conception",
    steps: [
      { label: "Retours", summary: "Faire apparaître les besoins, idées et inquiétudes avec les mots du terrain." },
      { label: "Atelier", summary: "Mettre les expériences en discussion pour clarifier ce qui compte vraiment." },
      { label: "Prototype", summary: "Tester une réponse, apprendre puis ajuster avant de généraliser." },
    ],
  },
  next: {
    title: "Votre contribution, à votre rythme",
    steps: [
      { label: "Invitation", summary: "Un lien personnel identifie le cadre de contribution sans vous imposer de rythme." },
      { label: "Brouillon", summary: "Les réponses peuvent être relues, complétées et reprises plus tard." },
      { label: "Contribution", summary: "Les nuances partagées deviennent une matière de conception pour la suite." },
    ],
  },
};

type Props = {
  kind: NarrativeVisualKind;
  accent: string;
  plainSummary?: boolean;
};

export function InteractiveNarrativeIllustration({ kind, accent, plainSummary = false }: Props) {
  const story = STORIES[kind];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = story.steps[activeIndex];
  const pale = `${accent}12`;
  const soft = `${accent}2b`;
  const isCycle = kind === "cycle";
  const isSignals = kind === "signals";

  const activate = (index: number) => setActiveIndex(index);
  const keyboardActivate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate(index);
    }
  };
  const interaction = (index: number) => ({
    onMouseEnter: () => activate(index),
    onFocus: () => activate(index),
    onClick: () => activate(index),
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => keyboardActivate(event, index),
    "aria-pressed": activeIndex === index,
  });
  const tileClass = "relative flex min-h-[92px] min-w-0 flex-col items-start justify-between rounded-2xl border px-4 py-3 text-left outline-none transition-[transform,box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transform-none motion-reduce:transition-none";
  const tileStyle = (index: number) => ({
    backgroundColor: activeIndex === index ? accent : pale,
    borderColor: activeIndex === index ? accent : soft,
    color: activeIndex === index ? "#fff" : accent,
    boxShadow: activeIndex === index ? `0 12px 24px ${accent}2b` : "none",
    outlineColor: accent,
  });

  // Représentation sans valeur chiffrée : trois signaux à relier, sans longueur ni pourcentage suggérant une mesure.
  const SignalGraphic = () => <div className="space-y-3">
    {story.steps.map((step, index) => {
      const selected = activeIndex === index;
      return <button key={step.label} type="button" {...interaction(index)} className="group flex min-h-11 w-full items-center gap-3 border-b-2 px-1 py-2 text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-2" style={{ borderColor: selected ? accent : soft, outlineColor: accent }} aria-label={`Explorer le signal : ${step.label}`}>
        <span className="grid h-6 min-w-6 place-items-center rounded-full text-[11px] font-bold" style={{ backgroundColor: selected ? accent : soft, color: selected ? "#fff" : accent }}>{String(index + 1).padStart(2, "0")}</span>
        <span className="text-sm font-bold" style={{ color: selected ? accent : "#475569" }}>{step.label}</span>
      </button>;
    })}
  </div>;

  const StepGraphic = () => <div className={`grid gap-3 ${isCycle ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
    {story.steps.map((step, index) => <button key={step.label} type="button" {...interaction(index)} className={tileClass} style={tileStyle(index)}>
      <span className="grid h-6 min-w-6 place-items-center rounded-full text-[11px] font-extrabold" style={{ backgroundColor: activeIndex === index ? "rgba(255,255,255,0.22)" : soft, color: activeIndex === index ? "#fff" : accent }}>{String(index + 1).padStart(2, "0")}</span>
      <span className="mt-4 text-sm font-extrabold leading-tight">{step.label}</span>
      <span className="mt-2 text-xs font-medium leading-snug" style={{ color: activeIndex === index ? "rgba(255,255,255,0.85)" : "#64748b" }}>{isCycle ? ["La situation", "Les liens", "Le choix", "Le geste"][index] : index === 0 ? "Point de départ" : index === story.steps.length - 1 ? "Point d’arrivée" : "Temps de lecture"}</span>
    </button>)}
  </div>;

  return <section className="mx-auto w-full max-w-[440px]" aria-label={story.title}>
    <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>{story.title}</p>
    {isSignals ? <SignalGraphic /> : <StepGraphic />}
    <div className={`mt-5 text-sm leading-relaxed text-slate-600 ${plainSummary ? "" : "border-l-2 pl-3"}`} style={plainSummary ? undefined : { borderColor: accent }} aria-live="polite"><span className="font-bold" style={{ color: accent }}>{active.label}</span> — {active.summary}</div>
  </section>;
}

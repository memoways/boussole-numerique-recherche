/**
 * Démonstration playback `/experience/demo/*` : routage par URL, chaque étape est partageable.
 * L’état affiché est entièrement déduit de l’URL et du JSON : une étape rechargée s’affiche à l’identique.
 * Lot 3 : les trois parcours (annexe v2) sont jouables de bout en bout, suivis de la comparaison des trois parcours.
 */
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import ComparisonView from "@/components/demo/ComparisonView";
import FeedbackForm from "@/components/demo/FeedbackForm";
import DemoShell, { DemoActions, demoPrimaryButton, demoSecondaryButton } from "@/components/demo/DemoShell";
import FutureFeatures from "@/components/demo/FutureFeatures";
import MicroDemos from "@/components/demo/MicroDemos";
import PersonaPicker from "@/components/demo/PersonaPicker";
import Restitution from "@/components/demo/Restitution";
import StepPlaceholder from "@/components/demo/StepPlaceholder";
import StepPlayer from "@/components/demo/StepPlayer";
import TrustNotice from "@/components/demo/TrustNotice";
import { useDemoKeyboard } from "@/components/demo/useDemoKeyboard";
import { trackDemoEvent } from "@/lib/analytics";
import {
  DEMO_CONTENT,
  DEMO_ROOT,
  fillTemplate,
  getNeighbours,
  getPersona,
  isComparisonReady,
  parseStep,
  stepPath,
  type DemoPersona,
  type StepRef,
} from "@/lib/demoContent";

function Redirect({ to }: { to: string }) {
  const [, navigate] = useLocation();
  useEffect(() => { navigate(to, { replace: true }); }, [navigate, to]);
  return null;
}

function Welcome({ persona }: { persona: DemoPersona }) {
  const { accueil } = DEMO_CONTENT;
  const ready = persona.statut === "pret";
  return (
    <>
      <section aria-labelledby="demo-accueil-titre">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#515792]">{persona.prenom} · {persona.metier}</p>
        <h1 id="demo-accueil-titre" className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{persona.accroche}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-800">{accueil.texte}</p>
        <div className="mt-8"><TrustNotice variant="debut" /></div>
        {ready ? (
          <p className="mt-6 text-sm leading-relaxed text-slate-700">{accueil.aideLecture}</p>
        ) : (
          <p role="note" className="mt-6 rounded-2xl border border-[#E07428]/40 bg-white p-4 text-sm leading-relaxed text-slate-800">
            {fillTemplate(accueil.avertissementPreparation, { prenom: persona.prenom })}
          </p>
        )}
      </section>
      <DemoActions>
        <Link href={DEMO_ROOT} className={demoSecondaryButton}>{accueil.boutonChangerPersona}</Link>
        {ready ? (
          <Link href={stepPath(persona.id, 1)} className={demoPrimaryButton}>
            {accueil.boutonCommencer}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        ) : (
          <Link href={stepPath(persona.id, "avis")} className={demoPrimaryButton}>{accueil.boutonAvis}</Link>
        )}
      </DemoActions>
    </>
  );
}

function Opinion({ persona }: { persona: DemoPersona }) {
  const { avis } = DEMO_CONTENT;
  return (
    <section aria-labelledby="demo-avis-titre" className="space-y-6">
      <div>
        <h1 id="demo-avis-titre" className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{avis.titre}</h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-slate-800">{avis.intro}</p>
      </div>
      <TrustNotice variant="fin" />
      <FeedbackForm persona={persona.id} />
    </section>
  );
}

/** Étapes jouées (échanges numérotés et numérique idéal) : elles gèrent elles-mêmes leurs raccourcis. */
const isPlayable = (persona: DemoPersona, step: StepRef) => persona.statut === "pret" && (step.kind === "numbered" || step.name === "ideal");

function StepView({ persona, step, panelOpen, onTogglePanel }: { persona: DemoPersona; step: StepRef; panelOpen: boolean; onTogglePanel: () => void }) {
  const [, navigate] = useLocation();
  const ready = persona.statut === "pret";
  const { previous, next } = getNeighbours(persona, step);

  useEffect(() => {
    const etape = step.kind === "named" ? step.name : String(step.index);
    trackDemoEvent("demo_etape_vue", { persona: persona.id, etape });
    if (step.kind === "named" && step.name === "restitution") trackDemoEvent("demo_restitution_vue", { persona: persona.id });
    if (step.kind === "named" && step.name === "comparaison") trackDemoEvent("demo_comparaison_vue", { persona: persona.id });
  }, [persona.id, step]);

  // Écrans non joués : les flèches changent d’étape ; Entrée et Espace ne font avancer que depuis l’accueil,
  // pour ne pas détourner le défilement au clavier des pages longues (restitution, micro-démos).
  const keyboardActive = ready && !isPlayable(persona, step) && !(step.kind === "named" && step.name === "avis");
  const goTo = (target: typeof next) => { if (target !== null) navigate(stepPath(persona.id, target)); };
  useDemoKeyboard(keyboardActive ? {
    onAdvance: step.kind === "named" && step.name === "accueil" ? () => goTo(next) : undefined,
    onNext: () => goTo(next),
    onPrevious: () => goTo(previous),
  } : {});

  if (step.kind === "named" && step.name === "accueil") return <Welcome persona={persona} />;
  if (step.kind === "named" && step.name === "avis") return <Opinion persona={persona} />;
  if (!ready) return <StepPlaceholder persona={persona} />;

  if (step.kind === "numbered") {
    const current = persona.etapes.find((item) => item.id === step.index);
    if (!current) return <Redirect to={stepPath(persona.id, "accueil")} />;
    return <StepPlayer key={current.id} persona={persona} step={current} previous={previous} next={next} panelOpen={panelOpen} onTogglePanel={onTogglePanel} />;
  }

  switch (step.name) {
    case "ideal":
      return persona.ideal ? (
        <StepPlayer
          key="ideal"
          persona={persona}
          step={{ id: null, dimension: null, type: "question", question: persona.ideal.question, reponse: { transcription: persona.ideal.transcription } }}
          previous={previous}
          next={next}
          continueLabel={DEMO_CONTENT.ideal.boutonSuite}
          panelOpen={panelOpen}
          onTogglePanel={onTogglePanel}
        />
      ) : <StepPlaceholder persona={persona} />;
    case "restitution":
      return persona.restitution ? <Restitution persona={persona} /> : <StepPlaceholder persona={persona} />;
    case "demos":
      return <MicroDemos persona={persona} />;
    case "futur":
      return <FutureFeatures persona={persona} />;
    default:
      return isComparisonReady() ? <ComparisonView persona={persona} /> : <StepPlaceholder persona={persona} texte={DEMO_CONTENT.preparation.comparaisonTexte} />;
  }
}

export default function ExperienceDemo() {
  const [location] = useLocation();
  // Le panneau « Ce que la Boussole retient » reste ouvert ou replié d’une étape à l’autre.
  const [panelOpen, setPanelOpen] = useState(true);
  const segments = location.replace(/\/+$/, "").slice(DEMO_ROOT.length).split("/").filter(Boolean);

  if (segments.length === 0) {
    return <DemoShell><PersonaPicker /></DemoShell>;
  }

  const persona = getPersona(segments[0]);
  if (!persona || segments.length > 2) return <Redirect to={DEMO_ROOT} />;
  if (segments.length === 1) return <Redirect to={stepPath(persona.id, "accueil")} />;

  const step = parseStep(segments[1]);
  if (!step) return <Redirect to={DEMO_ROOT} />;

  const wide = isPlayable(persona, step) || (persona.statut === "pret" && step.kind === "named" && ["restitution", "demos", "comparaison"].includes(step.name));
  return (
    <DemoShell persona={persona} step={step} wide={wide}>
      <StepView persona={persona} step={step} panelOpen={panelOpen} onTogglePanel={() => setPanelOpen((open) => !open)} />
    </DemoShell>
  );
}

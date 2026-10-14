/**
 * Démonstration playback `/experience/demo/*` : routage par URL, chaque étape est partageable.
 * Lot 1 : choix du persona, accueil avec message de confiance et avis final réel.
 * Les autres étapes affichent un écran « en préparation ».
 */
import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import FeedbackForm from "@/components/demo/FeedbackForm";
import DemoShell, { DemoActions, demoPrimaryButton, demoSecondaryButton } from "@/components/demo/DemoShell";
import PersonaPicker from "@/components/demo/PersonaPicker";
import StepPlaceholder from "@/components/demo/StepPlaceholder";
import TrustNotice from "@/components/demo/TrustNotice";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, DEMO_ROOT, fillTemplate, getPersona, parseStep, stepPath, type DemoPersona, type StepRef } from "@/lib/demoContent";

function Redirect({ to }: { to: string }) {
  const [, navigate] = useLocation();
  useEffect(() => { navigate(to, { replace: true }); }, [navigate, to]);
  return null;
}

function Welcome({ persona }: { persona: DemoPersona }) {
  const { accueil } = DEMO_CONTENT;
  return (
    <>
      <section aria-labelledby="demo-accueil-titre">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#515792]">{persona.prenom} · {persona.metier}</p>
        <h1 id="demo-accueil-titre" className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{persona.accroche}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-800">{accueil.texte}</p>
        <div className="mt-8"><TrustNotice variant="debut" /></div>
        {persona.statut !== "pret" && (
          <p role="note" className="mt-6 rounded-2xl border border-[#E07428]/40 bg-white p-4 text-sm leading-relaxed text-slate-800">
            {fillTemplate(accueil.avertissementPreparation, { prenom: persona.prenom })}
          </p>
        )}
      </section>
      <DemoActions>
        <Link href={DEMO_ROOT} className={demoSecondaryButton}>{accueil.boutonChangerPersona}</Link>
        <Link href={stepPath(persona.id, "avis")} className={demoPrimaryButton}>{accueil.boutonAvis}</Link>
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

function StepView({ persona, step }: { persona: DemoPersona; step: StepRef }) {
  useEffect(() => {
    const etape = step.kind === "named" ? step.name : String(step.index);
    trackDemoEvent("demo_etape_vue", { persona: persona.id, etape });
    if (step.kind === "named" && step.name === "restitution") trackDemoEvent("demo_restitution_vue", { persona: persona.id });
    if (step.kind === "named" && step.name === "comparaison") trackDemoEvent("demo_comparaison_vue", { persona: persona.id });
  }, [persona.id, step]);

  if (step.kind === "named" && step.name === "accueil") return <Welcome persona={persona} />;
  if (step.kind === "named" && step.name === "avis") return <Opinion persona={persona} />;
  return <StepPlaceholder persona={persona} />;
}

export default function ExperienceDemo() {
  const [location] = useLocation();
  const segments = location.replace(/\/+$/, "").slice(DEMO_ROOT.length).split("/").filter(Boolean);

  if (segments.length === 0) {
    return <DemoShell><PersonaPicker /></DemoShell>;
  }

  const persona = getPersona(segments[0]);
  if (!persona || segments.length > 2) return <Redirect to={DEMO_ROOT} />;
  if (segments.length === 1) return <Redirect to={stepPath(persona.id, "accueil")} />;

  const step = parseStep(segments[1]);
  if (!step) return <Redirect to={DEMO_ROOT} />;

  return (
    <DemoShell persona={persona} step={step}>
      <StepView persona={persona} step={step} />
    </DemoShell>
  );
}

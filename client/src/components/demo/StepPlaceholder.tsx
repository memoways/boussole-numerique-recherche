/** Écran « en préparation » pour les étapes du parcours qui ne sont pas encore jouables. */
import { Hourglass } from "lucide-react";
import { Link } from "wouter";
import { DEMO_CONTENT, fillTemplate, stepPath, type DemoPersona } from "@/lib/demoContent";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";

export default function StepPlaceholder({ persona }: { persona: DemoPersona }) {
  const { preparation } = DEMO_CONTENT;
  return (
    <section aria-labelledby="demo-preparation-titre" className="rounded-3xl border border-slate-200 bg-white p-6 text-center sm:p-10">
      <Hourglass className="mx-auto h-10 w-10 text-[#515792]" aria-hidden="true" />
      <h1 id="demo-preparation-titre" className="mt-4 text-2xl font-extrabold text-slate-950">{preparation.titre}</h1>
      <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-700">{fillTemplate(preparation.texte, { prenom: persona.prenom })}</p>
      <DemoActions>
        <Link href={stepPath(persona.id, "accueil")} className={demoSecondaryButton}>{preparation.boutonAccueil}</Link>
        <Link href={stepPath(persona.id, "avis")} className={demoPrimaryButton}>{preparation.boutonAvis}</Link>
      </DemoActions>
    </section>
  );
}

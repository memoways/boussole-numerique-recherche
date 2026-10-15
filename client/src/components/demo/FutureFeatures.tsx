/** Fonctions futures, grisées avec un badge « bientôt » : rien n’est cliquable, rien n’est promis comme livré. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { DEMO_CONTENT, isComparisonReady, stepPath, type DemoPersona } from "@/lib/demoContent";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";

export default function FutureFeatures({ persona }: { persona: DemoPersona }) {
  const { futur, lecture } = DEMO_CONTENT;
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-normal leading-tight text-slate-950 sm:text-[2.6rem]">{futur.titre}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">{futur.intro}</p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {futur.fonctions.map((fonction) => (
          <li key={fonction.titre} className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="font-semibold text-slate-700">{fonction.titre}</p>
              <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-slate-700">{futur.badge}</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{fonction.texte}</p>
          </li>
        ))}
      </ul>
      <DemoActions>
        <Link href={stepPath(persona.id, "demos")} className={demoSecondaryButton}>{lecture.retour}</Link>
        {/* Suite : la comparaison des trois parcours quand ils sont tous jouables, sinon l’avis. */}
        <Link href={stepPath(persona.id, isComparisonReady() ? "comparaison" : "avis")} className={demoPrimaryButton}>
          {isComparisonReady() ? futur.boutonSuite : DEMO_CONTENT.preparation.boutonAvis}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </DemoActions>
    </div>
  );
}

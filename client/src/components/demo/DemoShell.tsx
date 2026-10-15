/**
 * Gabarit immersif de la démonstration : bandeau permanent, en-tête minimal avec « Quitter la démo »
 * et barre de progression à cinq segments (ordre propre au persona) plus la restitution.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { LogOut } from "lucide-react";
import { Link } from "wouter";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, getProgressSegments, stepPath, type DemoPersona, type StepRef } from "@/lib/demoContent";

type DemoShellProps = {
  persona?: DemoPersona;
  step?: StepRef;
  /** Largeur étendue pour la conversation et son panneau « Ce que la Boussole retient ». */
  wide?: boolean;
  children: ReactNode;
};

function ProgressBar({ persona, step }: { persona: DemoPersona; step: StepRef }) {
  const segments = getProgressSegments(persona, step);
  const current = segments.find((segment) => segment.current);

  return (
    <nav aria-label="Progression du parcours" className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-2 sm:py-3">
        <p className="mb-1 text-xs font-semibold text-slate-700 sm:hidden" aria-hidden="true">
          {current ? current.label : `Parcours de ${persona.prenom}`}
        </p>
        <ol className="grid grid-cols-6 gap-1.5 sm:gap-2">
          {segments.map((segment) => {
            const bar = (
              <span
                className={`block h-1.5 rounded-full ${segment.current ? "bg-[#E07428]" : segment.target === null ? "bg-slate-200" : "bg-[#515792]/40"}`}
                aria-hidden="true"
              />
            );
            const label = <span className={`mt-1.5 hidden text-[11px] leading-tight sm:block ${segment.current ? "font-semibold text-slate-900" : "text-slate-600"}`}>{segment.label}</span>;
            return (
              <li key={segment.key} aria-current={segment.current ? "step" : undefined}>
                {segment.target === null ? (
                  <span className="block" title="Cette partie du parcours est en préparation">
                    {bar}
                    {label}
                    <span className="sr-only">{segment.label} (en préparation)</span>
                  </span>
                ) : (
                  <Link
                    href={stepPath(persona.id, segment.target === "restitution" ? "restitution" : segment.target)}
                    onClick={() => trackDemoEvent("demo_saut_chapitre", { persona: persona.id, chapitre: segment.key })}
                    className="block rounded-sm"
                  >
                    {bar}
                    {label}
                    <span className="sr-only">{segment.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default function DemoShell({ persona, step, wide = false, children }: DemoShellProps) {
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);
  const stepKey = step ? (step.kind === "named" ? step.name : String(step.index)) : "";

  // Après un changement d’étape, le focus revient au contenu pour les lecteurs d’écran et le clavier.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [persona?.id, stepKey]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FC]">
      <div className="bg-[#515792] px-4 py-1 text-center text-[11px] font-semibold tracking-wide sm:text-xs text-white">{DEMO_CONTENT.bandeau}</div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-1 sm:py-2">
          <span className="text-sm font-semibold text-[#515792]">Boussole Numérique Culture</span>
          <Link href="/experience" className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {DEMO_CONTENT.quitter}
          </Link>
        </div>
      </header>
      {persona && step && <ProgressBar persona={persona} step={step} />}
      <main id="contenu-principal" ref={mainRef} tabIndex={-1} className={`mx-auto w-full flex-1 px-4 py-4 sm:py-10 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        {children}
      </main>
    </div>
  );
}

/**
 * Zone de commandes : en bas de l’écran sur smartphone, dans le flux sur ordinateur.
 * `compact` garde les boutons sur une ligne sur smartphone (lecture du parcours, où chaque pixel compte)
 * et laisse au-dessus la place du bouton « Ce que je retiens », ancré à la barre pour ne jamais la recouvrir.
 */
export function DemoActions({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <div className={`sticky bottom-0 z-20 -mx-4 flex gap-3 border-t border-slate-200 bg-[#F8F9FC]/95 px-4 py-2.5 backdrop-blur sm:relative sm:mx-0 sm:flex-row sm:justify-between sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 ${compact ? "mt-12 flex-row lg:mt-6" : "mt-6 flex-col-reverse"}`}>
      {children}
    </div>
  );
}

export const demoPrimaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#E07428] px-6 text-base font-semibold text-[#1F2937] transition-colors hover:bg-[#d06a22] disabled:pointer-events-none disabled:opacity-50";
export const demoSecondaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-base font-semibold text-slate-800 transition-colors hover:border-[#515792]";

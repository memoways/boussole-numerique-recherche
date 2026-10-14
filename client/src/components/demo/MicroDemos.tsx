/**
 * Micro-démos après la restitution : trois animations courtes (5 à 10 s), lancées au clic.
 * Arborescence avant/après, fiche → dossiers, source unique. Avec `prefers-reduced-motion`,
 * le clic affiche directement l’état final.
 */
import { useEffect, useState, type ReactNode } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Folder, Paperclip, Play, RotateCcw, Tag } from "lucide-react";
import { Link } from "wouter";
import { DEMO_CONTENT, stepPath, type DemoMicro, type DemoPersona } from "@/lib/demoContent";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";

/** Avancement d’une animation : 0 = état initial, puis une étape toutes les `interval` ms jusqu’à `last`. */
function useStages(last: number, interval: number) {
  const reducedMotion = useReducedMotion() ?? false;
  const [stage, setStage] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (stage >= last) { setRunning(false); return; }
    const timer = window.setTimeout(() => setStage((value) => value + 1), interval);
    return () => window.clearTimeout(timer);
  }, [running, stage, last, interval]);

  const play = () => {
    if (reducedMotion) { setStage(last); return; }
    setStage(0);
    setRunning(true);
  };
  return { stage, running, played: stage > 0, finished: stage >= last, play, reducedMotion };
}

function DemoCard({ demo, controls, children, status }: { demo: DemoMicro; controls: ReturnType<typeof useStages>; children: ReactNode; status: string }) {
  const copy = DEMO_CONTENT.demos;
  return (
    <section aria-labelledby={`demo-micro-${demo.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-xl">
          <h2 id={`demo-micro-${demo.id}`} className="text-lg font-bold text-slate-950">{demo.titre}</h2>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">{demo.texte}</p>
        </div>
        <button type="button" onClick={controls.running ? undefined : controls.play} aria-disabled={controls.running} className={`${demoSecondaryButton} min-h-11 px-4 text-sm aria-disabled:opacity-60`}>
          {controls.played ? <RotateCcw className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          {controls.played ? copy.rejouer : copy.lancer}
        </button>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-600" aria-live="polite">{status}</p>
      <div className="mt-2 min-w-0 rounded-xl bg-slate-50 p-3 sm:p-4">{children}</div>
    </section>
  );
}

function TreeDemo({ demo }: { demo: Extract<DemoMicro, { id: "arborescence" }> }) {
  const controls = useStages(2, 2600);
  const renamed = controls.stage >= 1;
  const sorted = controls.stage >= 2;
  const folders = demo.fichiers.map((file) => file.dossier).filter((folder, index, all) => all.indexOf(folder) === index);
  const transition = { duration: controls.reducedMotion ? 0 : 0.7, ease: "easeInOut" as const };
  const file = (item: (typeof demo.fichiers)[number], index: number) => (
    <motion.li key={index} layoutId={`fichier-${index}`} layout transition={transition} className="flex min-w-0 items-center gap-2 rounded-md bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm">
      <FileText className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
      <span className="truncate font-mono">{renamed ? item.apres : item.avant}</span>
    </motion.li>
  );
  return (
    <DemoCard demo={demo} controls={controls} status={sorted ? DEMO_CONTENT.demos.apres : DEMO_CONTENT.demos.avant}>
      <LayoutGroup>
        {sorted ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {folders.map((folder) => (
              <div key={folder} className="min-w-0">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-800"><Folder className="h-4 w-4 text-[#515792]" aria-hidden="true" />{folder}</p>
                <ul className="space-y-1.5 pl-3">{demo.fichiers.map((item, index) => (item.dossier === folder ? file(item, index) : null))}</ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">{demo.fichiers.map(file)}</ul>
        )}
      </LayoutGroup>
    </DemoCard>
  );
}

function SheetDemo({ demo }: { demo: Extract<DemoMicro, { id: "fiche" }> }) {
  const last = demo.elements.length * 2;
  const controls = useStages(last, 650);
  const tagged = Math.min(demo.elements.length, controls.stage);
  const delivered = Math.max(0, controls.stage - demo.elements.length);
  const fade = { initial: controls.reducedMotion ? false : { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 } };
  return (
    <DemoCard demo={demo} controls={controls} status={controls.finished ? DEMO_CONTENT.demos.apres : DEMO_CONTENT.demos.avant}>
      <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="text-sm font-bold text-slate-900">{demo.source}</p>
          <ul className="mt-2 space-y-2">
            {demo.elements.map((element, index) => (
              <li key={element.libelle} className="text-sm text-slate-800">
                {element.libelle}
                {index < tagged && (
                  <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
                    {element.cibles.map((cible) => (
                      <motion.span key={cible} {...fade} className="inline-flex items-center gap-1 rounded-full bg-[#515792]/10 px-2 py-0.5 text-[11px] font-semibold text-[#515792]">
                        <Tag className="h-3 w-3" aria-hidden="true" />{cible}
                      </motion.span>
                    ))}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <ArrowRight className="mx-auto hidden h-5 w-5 self-center text-slate-500 md:block" aria-hidden="true" />
        <div className="grid gap-3">
          {demo.sorties.map((sortie) => (
            <div key={sortie} className="rounded-lg border border-dashed border-slate-300 bg-white p-3">
              <p className="text-sm font-bold text-slate-900">{sortie}</p>
              <ul className="mt-1.5 flex flex-wrap gap-1.5">
                {demo.elements.slice(0, delivered).filter((element) => element.cibles.includes(sortie)).map((element) => (
                  <motion.li key={element.libelle} {...fade} className="rounded-md bg-[#3aab8a]/15 px-2 py-0.5 text-xs font-semibold text-[#167A5E]">{element.libelle}</motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DemoCard>
  );
}

function SourceDemo({ demo }: { demo: Extract<DemoMicro, { id: "source-unique" }> }) {
  const controls = useStages(demo.pieces.length, 1000);
  const moved = controls.stage;
  const transition = { duration: controls.reducedMotion ? 0 : 0.6, ease: "easeInOut" as const };
  const piece = (label: string, index: number) => (
    <motion.li key={label} layoutId={`piece-${index}`} layout transition={transition} className="flex min-w-0 items-center gap-2 rounded-md bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm">
      <Paperclip className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
      <span className="truncate">{label}</span>
    </motion.li>
  );
  return (
    <DemoCard demo={demo} controls={controls} status={controls.finished ? DEMO_CONTENT.demos.apres : DEMO_CONTENT.demos.avant}>
      <LayoutGroup>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ul className="min-h-12 min-w-0 space-y-1.5">{demo.pieces.map((label, index) => (index >= moved ? piece(label, index) : null))}</ul>
          <div className="min-w-0 rounded-lg border-2 border-[#515792]/40 bg-white p-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-[#515792]"><Folder className="h-4 w-4" aria-hidden="true" />{demo.destination}</p>
            <ul className="mt-2 space-y-1.5">{demo.pieces.map((label, index) => (index < moved ? piece(label, index) : null))}</ul>
          </div>
        </div>
      </LayoutGroup>
    </DemoCard>
  );
}

export default function MicroDemos({ persona }: { persona: DemoPersona }) {
  const copy = DEMO_CONTENT.demos;
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{copy.titre}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-700">{copy.intro}</p>
      </header>
      {(persona.demos ?? []).map((demo) => {
        if (demo.id === "arborescence") return <TreeDemo key={demo.id} demo={demo} />;
        if (demo.id === "fiche") return <SheetDemo key={demo.id} demo={demo} />;
        return <SourceDemo key={demo.id} demo={demo} />;
      })}
      <DemoActions>
        <Link href={stepPath(persona.id, "restitution")} className={demoSecondaryButton}>{DEMO_CONTENT.lecture.retour}</Link>
        <Link href={stepPath(persona.id, "futur")} className={demoPrimaryButton}>
          {copy.boutonSuite}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </DemoActions>
    </div>
  );
}

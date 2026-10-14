/**
 * Micro-démos après la restitution : trois animations courtes (5 à 10 s), lancées au clic, centrées sur
 * les données. Gabarits : convergence (une info à plusieurs endroits → une fiche qui fait foi), tri (où va
 * quoi), validation (un document, une liste de validation, un historique), fiche (une source alimente
 * plusieurs sorties) et source unique (des pièces éparses convergent). Avec `prefers-reduced-motion`,
 * le clic affiche directement l’état final.
 */
import { useEffect, useState, type ReactNode } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Clock, Database, FileText, Folder, History, Mail, Paperclip, Play, RotateCcw, Tag } from "lucide-react";
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

/** Une info, cinq endroits : des valeurs qui divergent, une fiche qui fait foi, puis des supports identiques. */
function ConvergenceDemo({ demo }: { demo: Extract<DemoMicro, { id: "convergence" }> }) {
  const controls = useStages(2, 2200);
  const referenced = controls.stage >= 1;
  const aligned = controls.stage >= 2;
  const fade = { initial: controls.reducedMotion ? false : { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };
  return (
    <DemoCard demo={demo} controls={controls} status={aligned ? DEMO_CONTENT.demos.apres : DEMO_CONTENT.demos.avant}>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ul className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
          {demo.endroits.map((endroit) => (
            <li key={endroit.nom} className={`min-w-0 rounded-lg border bg-white p-2.5 transition-colors duration-500 ${aligned ? "border-[#3aab8a]/60" : "border-slate-200"}`}>
              <p className="flex items-center justify-between gap-2 text-xs font-bold text-slate-900">
                <span className="truncate">{endroit.nom}</span>
                {aligned && <motion.span {...fade} className="shrink-0 text-[#167A5E]"><Check className="h-3.5 w-3.5" aria-label="à jour" /></motion.span>}
              </p>
              <dl className="mt-1.5 space-y-0.5 text-xs">
                {demo.champs.map((champ, index) => {
                  const value = aligned ? demo.reference[index] : endroit.valeurs[index];
                  const differs = !aligned && value !== demo.reference[index];
                  return (
                    <div key={champ} className="flex min-w-0 gap-1.5">
                      <dt className="shrink-0 text-slate-600">{champ} :</dt>
                      <dd className={`min-w-0 truncate font-semibold ${differs && referenced ? "text-[#A8440D] line-through decoration-1" : differs ? "text-[#A8440D]" : "text-slate-800"}`}>{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </li>
          ))}
        </ul>
        <div className={`min-w-0 self-start rounded-lg border-2 p-3 transition-colors duration-500 ${referenced ? "border-[#515792] bg-white" : "border-dashed border-slate-300 bg-white"}`}>
          <p className="flex items-center gap-1.5 text-sm font-bold text-[#515792]"><Database className="h-4 w-4" aria-hidden="true" />{demo.source}</p>
          <dl className="mt-2 space-y-1 text-sm">
            {demo.champs.map((champ, index) => (
              <div key={champ} className="flex min-w-0 gap-1.5">
                <dt className="shrink-0 text-slate-600">{champ} :</dt>
                <dd className="min-w-0 font-semibold text-slate-900">{referenced ? <motion.span {...fade}>{demo.reference[index]}</motion.span> : "…"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </DemoCard>
  );
}

/** Où va quoi : chaque nature d’information rejoint sa place, une à une. */
function SortDemo({ demo }: { demo: Extract<DemoMicro, { id: "tri" }> }) {
  // Pile de départ mélangée de façon fixe : un élément de chaque place à tour de rôle.
  const longest = Math.max(...demo.places.map((place) => place.elements.length));
  const pile = Array.from({ length: longest }, (_, row) => demo.places.flatMap((place) => (place.elements[row] ? [{ libelle: place.elements[row], place: place.nom }] : []))).flat();
  const controls = useStages(pile.length, 450);
  const moved = controls.stage;
  const transition = { duration: controls.reducedMotion ? 0 : 0.5, ease: "easeInOut" as const };
  const chip = (item: (typeof pile)[number], index: number) => (
    <motion.li key={item.libelle} layoutId={`tri-${index}`} layout transition={transition} className="rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm">
      {item.libelle}
    </motion.li>
  );
  return (
    <DemoCard demo={demo} controls={controls} status={controls.finished ? DEMO_CONTENT.demos.apres : DEMO_CONTENT.demos.avant}>
      <LayoutGroup>
        {/* La pile disparaît une fois vidée : l’état final ne garde que les places. */}
        {!controls.finished && <ul className="mb-3 flex min-h-8 flex-wrap gap-1.5">{pile.map((item, index) => (index >= moved ? chip(item, index) : null))}</ul>}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {demo.places.map((place) => (
            <div key={place.nom} className="min-w-0 rounded-lg border-2 border-[#515792]/30 bg-white p-3">
              <p className="flex items-center gap-1.5 text-sm font-bold text-[#515792]"><Folder className="h-4 w-4" aria-hidden="true" />{place.nom}</p>
              <ul className="mt-2 flex min-h-7 flex-wrap gap-1.5">
                {pile.map((item, index) => (index < moved && item.place === place.nom ? chip(item, index) : null))}
              </ul>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </DemoCard>
  );
}

/** Valider sans allers-retours : les mails deviennent un document unique, sa liste de validation et son historique. */
function ValidationDemo({ demo }: { demo: Extract<DemoMicro, { id: "validation" }> }) {
  const controls = useStages(1 + demo.validations.length, 1300);
  const gathered = controls.stage >= 1;
  const decided = Math.max(0, controls.stage - 1);
  const history = demo.historique.slice(0, controls.stage);
  const fade = { initial: controls.reducedMotion ? false : { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } };
  return (
    <DemoCard demo={demo} controls={controls} status={controls.finished ? DEMO_CONTENT.demos.apres : DEMO_CONTENT.demos.avant}>
      {!gathered ? (
        <div>
          <ul className="space-y-1.5">
            {demo.avant.messages.map((message) => (
              <li key={message} className="flex min-w-0 items-center gap-2 rounded-md bg-white px-2 py-1.5 text-xs text-slate-800 shadow-sm">
                <Mail className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
                <span className="truncate">{message}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs font-semibold text-slate-700">{demo.avant.resume}</p>
        </div>
      ) : (
        <motion.div {...fade} className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="min-w-0 rounded-lg border-2 border-[#515792] bg-white p-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-[#515792]"><FileText className="h-4 w-4" aria-hidden="true" />{demo.document}</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {demo.validations.map((validation, index) => {
                const status = index < decided ? validation.statut : null;
                return (
                  <li key={validation.qui} className="flex items-center justify-between gap-2">
                    <span className="text-slate-800">{validation.qui}</span>
                    {status === "valide" && <motion.span {...fade} className="inline-flex items-center gap-1 font-semibold text-[#167A5E]"><Check className="h-4 w-4" aria-hidden="true" />{demo.libelles.valide}</motion.span>}
                    {status === "attente" && <motion.span {...fade} className="inline-flex items-center gap-1 font-semibold text-[#A8440D]"><Clock className="h-4 w-4" aria-hidden="true" />{demo.libelles.attente}</motion.span>}
                    {status === null && <span className="text-slate-500" aria-hidden="true">…</span>}
                  </li>
                );
              })}
            </ul>
          </div>
          <ol className="min-w-0 space-y-1.5 border-l-2 border-slate-200 pl-3 text-xs text-slate-700">
            {history.map((line) => (
              <motion.li key={line} {...fade} className="flex items-center gap-1.5">
                <History className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-hidden="true" />
                {line}
              </motion.li>
            ))}
          </ol>
        </motion.div>
      )}
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
        switch (demo.id) {
          case "convergence": return <ConvergenceDemo key={demo.id} demo={demo} />;
          case "tri": return <SortDemo key={demo.id} demo={demo} />;
          case "validation": return <ValidationDemo key={demo.id} demo={demo} />;
          case "fiche": return <SheetDemo key={demo.id} demo={demo} />;
          default: return <SourceDemo key={demo.id} demo={demo} />;
        }
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

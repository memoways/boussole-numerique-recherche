/**
 * Restitution : lettre, radar qualitatif (aucun chiffre affiché, dessiné axe par axe) suivi de la définition
 * de chaque niveau, ce qui fonctionne et ce qui pourrait être plus léger (chaque point relié à une phrase dite),
 * puis trois pistes.
 */
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sprout } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { Link } from "wouter";
import { DEMO_CONTENT, fillTemplate, levelValue, stepPath, type DemoCitation, type DemoPersona } from "@/lib/demoContent";
import { LevelDefinitions } from "./DemoAnswers";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";
import { DIMENSION_COLORS } from "./demoTheme";

const AXIS_REVEAL_MS = 350;

type TickProps = { x?: number; y?: number; cy?: number; textAnchor?: string; payload?: { value: string } };

/** Libellé d’axe sur deux lignes (« Outils & / workflows ») pour tenir à 390 px. */
export function AxisTick({ x = 0, y = 0, cy = 150, textAnchor = "middle", payload }: TickProps) {
  const [first, ...rest] = (payload?.value ?? "").split(" & ");
  const lines = rest.length ? [`${first} &`, rest.join(" & ")] : [first];
  // Au-dessus du centre, le libellé monte ; en dessous, il descend : il ne recouvre jamais le dessin.
  const firstOffset = y < cy - 4 ? -(lines.length - 1) * 14 - 2 : y > cy + 4 ? 12 : 4 - (lines.length - 1) * 7;
  return (
    <text x={x} y={y} textAnchor={textAnchor as "middle"} fill="#334155" fontSize={11.5} fontWeight={600}>
      {lines.map((line, index) => <tspan key={line} x={x} dy={index === 0 ? firstOffset : 14}>{line}</tspan>)}
    </text>
  );
}

function QualitativeRadar({ persona }: { persona: DemoPersona }) {
  const reducedMotion = useReducedMotion() ?? false;
  const radar = persona.restitution!.radar;
  const [revealed, setRevealed] = useState(reducedMotion ? persona.ordreDimensions.length : 0);

  // Le radar se dessine depuis le centre, un axe après l’autre.
  useEffect(() => {
    if (reducedMotion || revealed >= persona.ordreDimensions.length) return;
    const timer = window.setTimeout(() => setRevealed((value) => value + 1), revealed === 0 ? 400 : AXIS_REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, revealed, persona.ordreDimensions.length]);

  const data = persona.ordreDimensions.map((dimension, index) => ({
    label: DEMO_CONTENT.dimensions[dimension],
    value: index < revealed ? levelValue(radar[dimension]) : 0,
  }));

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <figcaption className="text-lg font-bold text-slate-950">{DEMO_CONTENT.restitution.radarTitre}</figcaption>
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_14rem]">
        <div aria-hidden="true" className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="58%" margin={{ top: 24, right: 44, bottom: 24, left: 44 }}>
              <PolarGrid stroke="#CBD5E1" />
              <PolarAngleAxis dataKey="label" tick={<AxisTick />} />
              <PolarRadiusAxis domain={[0, 4]} tickCount={5} tick={false} axisLine={false} />
              {/* L’animation interne de Recharts se décale quand les données changent axe par axe : le dessin progressif vient de l’état `revealed`. */}
              <Radar dataKey="value" stroke="#515792" strokeWidth={2} fill="#515792" fillOpacity={0.25} isAnimationActive={false} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2 text-sm">
          {persona.ordreDimensions.map((dimension) => (
            <li key={dimension} className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
              <span className="text-slate-800">{DEMO_CONTENT.dimensions[dimension]}</span>
              <span className="font-bold" style={{ color: DIMENSION_COLORS[dimension].text }}>{radar[dimension]}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-center text-base font-semibold text-slate-800">{DEMO_CONTENT.restitution.radarPhrase}</p>
      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-sm font-bold text-slate-900">{DEMO_CONTENT.niveauxTitre}</p>
        <LevelDefinitions className="mt-2" />
      </div>
    </figure>
  );
}

function CitationList({ title, items, tone, personaId }: { title: string; items: DemoCitation[]; tone: "fonctionne" | "ameliorer"; personaId: DemoPersona["id"] }) {
  const Icon = tone === "fonctionne" ? Check : Sprout;
  const accent = tone === "fonctionne" ? "#167A5E" : "#A8440D";
  return (
    <section aria-labelledby={`demo-${tone}`} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 id={`demo-${tone}`} className="flex items-center gap-2 text-lg font-bold text-slate-950">
        <Icon className="h-5 w-5" style={{ color: accent }} aria-hidden="true" />
        {title}
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.texte}>
            <p className="font-semibold text-slate-900">{item.texte}</p>
            <blockquote className="mt-1 border-l-2 pl-3 text-sm italic leading-relaxed text-slate-700" style={{ borderColor: accent }}>
              « {item.citation} »{" "}
              <Link href={stepPath(personaId, item.etape)} className="not-italic text-xs font-semibold text-[#515792] underline underline-offset-2">
                {fillTemplate(DEMO_CONTENT.restitution.citationLien, { n: String(item.etape) })}
              </Link>
            </blockquote>
            {item.ordreDeGrandeur && <p className="mt-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">{item.ordreDeGrandeur}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Restitution({ persona }: { persona: DemoPersona }) {
  const copy = DEMO_CONTENT.restitution;
  const restitution = persona.restitution!;
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#515792]">{copy.surtitre} · {persona.prenom}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{copy.titre}</h1>
      </header>

      <section aria-labelledby="demo-lettre" className="rounded-2xl border-l-4 border-[#515792] bg-white p-5 shadow-sm sm:p-8">
        <h2 id="demo-lettre" className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">{copy.lettreTitre}</h2>
        <p className="mt-3 font-serif text-lg leading-relaxed text-slate-900 sm:text-xl">{restitution.lettre}</p>
      </section>

      <QualitativeRadar persona={persona} />

      <div className="grid gap-6 md:grid-cols-2">
        <CitationList title={copy.fonctionneTitre} items={restitution.fonctionne} tone="fonctionne" personaId={persona.id} />
        <CitationList title={copy.ameliorerTitre} items={restitution.ameliorer} tone="ameliorer" personaId={persona.id} />
      </div>

      <section aria-labelledby="demo-pistes">
        <h2 id="demo-pistes" className="text-2xl font-extrabold text-slate-950">{copy.pistesTitre}</h2>
        <p className="mt-1 text-slate-700">{copy.pistesIntro}</p>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {restitution.pistes.map((piste) => (
            <li key={piste.horizon} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
              <span className="self-start rounded-full bg-[#515792]/10 px-3 py-1 text-xs font-bold text-[#515792]">{piste.horizon}</span>
              <p className="mt-3 flex-1 leading-relaxed text-slate-800">{piste.texte}</p>
              <Link href={piste.lien} className="mt-4 text-sm font-semibold text-[#515792] underline underline-offset-4">{piste.libelleLien} →</Link>
            </li>
          ))}
        </ol>
        {/* Les citations de « D’autres regards » viennent du corpus de veille ; les pistes restent liées aux seules pages Ressources. */}
        <p className="mt-4 text-sm text-slate-700">
          {copy.corpus}{" "}
          <Link href="/ressources" className="font-semibold text-[#515792] underline underline-offset-4">{copy.corpusLien}</Link>
        </p>
      </section>

      <DemoActions>
        <Link href={stepPath(persona.id, "ideal")} className={demoSecondaryButton}>{DEMO_CONTENT.lecture.retour}</Link>
        <Link href={stepPath(persona.id, "demos")} className={demoPrimaryButton}>
          {copy.boutonSuite}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </DemoActions>
    </div>
  );
}

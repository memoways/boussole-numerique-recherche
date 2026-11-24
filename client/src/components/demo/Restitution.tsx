/**
 * Restitution : lettre en courts paragraphes, radar qualitatif (aucun chiffre affiché, dessiné axe par axe, le niveau écrit sous chaque
 * dimension dans sa couleur) avec, à droite, le détail de la dimension survolée : pourquoi ce niveau, ce que la Boussole a relevé,
 * les critères de l’échelle. Suivent la légende des niveaux, ce qui fonctionne et ce qui pourrait être plus léger
 * (chaque point relié à une phrase dite), puis trois pistes : chacune dit quelle dimension elle fait avancer et pourquoi son lien est là.
 */
import { useEffect, useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ExternalLink, Sprout } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { Link } from "wouter";
import { trackDemoEvent } from "@/lib/analytics";
import {
  DEMO_CONTENT,
  fillTemplate,
  getDimensionReadings,
  getResource,
  levelValue,
  stepPath,
  type DemoCitation,
  type DemoPersona,
  type DemoPiste,
  type DimensionId,
  type RadarLevel,
} from "@/lib/demoContent";
import { LevelDefinitions } from "./DemoAnswers";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";
import { LEVEL_COLORS, dimensionVar, DIMENSION_COLORS } from "./demoTheme";

const AXIS_REVEAL_MS = 350;

type TickProps = { x?: number; y?: number; cy?: number; textAnchor?: string; payload?: { value: string }; levels?: Record<string, RadarLevel>; active?: string };

/**
 * Libellé d’axe (souligné quand c’est la dimension affichée à côté) sur deux lignes (« Outils & / workflows ») pour tenir à 390 px, suivi du niveau dans sa couleur quand `levels` le donne :
 * la qualification se lit sur le radar, sans chercher dans une liste à côté.
 */
export function AxisTick({ x = 0, y = 0, cy = 150, textAnchor = "middle", payload, levels, active }: TickProps) {
  const [first, ...rest] = (payload?.value ?? "").split(" & ");
  const lines = rest.length ? [`${first} &`, rest.join(" & ")] : [first];
  const level = levels?.[payload?.value ?? ""];
  const count = lines.length + (level ? 1 : 0);
  // Au-dessus du centre, le libellé monte ; en dessous, il descend : il ne recouvre jamais le dessin.
  const firstOffset = y < cy - 4 ? -(count - 1) * 14 - 2 : y > cy + 4 ? 12 : 4 - (count - 1) * 7;
  const isActive = Boolean(active) && active === payload?.value;
  return (
    <text x={x} y={y} textAnchor={textAnchor as "middle"} fill={isActive ? "#0F172A" : "#334155"} fontSize={11.5} fontWeight={isActive ? 800 : 600} textDecoration={isActive ? "underline" : undefined}>
      {lines.map((line, index) => <tspan key={line} x={x} dy={index === 0 ? firstOffset : 14}>{line}</tspan>)}
      {level && <tspan x={x} dy={14} fill={LEVEL_COLORS[level]} fontSize={12.5} fontWeight={700}>{level}</tspan>}
    </text>
  );
}

/** Détail d’une dimension : pourquoi ce niveau, ce que la Boussole a relevé dans le parcours, puis les critères de l’échelle. */
function DimensionDetail({ persona, dimension, reducedMotion }: { persona: DemoPersona; dimension: DimensionId; reducedMotion: boolean }) {
  const copy = DEMO_CONTENT.restitution;
  const level = persona.restitution!.radar[dimension];
  const criteria = copy.criteres[dimension];
  const readings = getDimensionReadings(persona, dimension);
  const color = DIMENSION_COLORS[dimension];
  return (
    <motion.div
      key={dimension}
      data-demo-detail={dimension}
      initial={reducedMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-slate-200 border-l-4 bg-white p-4 [border-left-color:var(--dim)] sm:p-5"
      style={dimensionVar(color.base)}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-lg font-semibold text-slate-950">{DEMO_CONTENT.dimensions[dimension]}</h3>
        <p className="flex items-center gap-2 text-base font-bold" style={{ color: LEVEL_COLORS[level] }}>
          <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: LEVEL_COLORS[level] }} />
          {level}
        </p>
      </div>
      <p className="mt-1 text-sm leading-snug text-slate-600">{criteria.regarde}</p>

      <section aria-labelledby={`demo-detail-pourquoi-${dimension}`} className="mt-4">
        <h4 id={`demo-detail-pourquoi-${dimension}`} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">{copy.detailPourquoi}</h4>
        <p className="mt-1 text-base leading-snug text-slate-900">{persona.restitution!.detail[dimension].pourquoi}</p>
      </section>

      <section aria-labelledby={`demo-detail-releve-${dimension}`} className="mt-4">
        <h4 id={`demo-detail-releve-${dimension}`} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">{copy.detailReleve}</h4>
        <ul className="mt-1 divide-y divide-slate-100">
          {readings.map((reading) => (
            <li key={`${reading.etape}-${reading.libelle}`} className="py-2 text-sm leading-snug">
              <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="font-semibold text-slate-900">{reading.libelle}</span>
                <span className="font-semibold" style={{ color: LEVEL_COLORS[reading.niveau] }}>{reading.niveau}</span>
              </p>
              <p className="mt-0.5 text-slate-700">
                {reading.dit ? <>{"«\u00a0"}<span className="italic">{reading.dit}</span>{"\u00a0»"}</> : reading.nonAborde && !reading.propose ? copy.detailNonAborde : null}
                {reading.propose && <span className="block text-slate-600">{fillTemplate(copy.detailCorrige, { avant: reading.propose })}</span>}
                {reading.dit && (
                  <>
                    {" "}
                    <Link href={stepPath(persona.id, reading.etape)} className="text-xs font-semibold text-[#515792] underline underline-offset-2">
                      {fillTemplate(copy.detailLienEchange, { n: String(reading.etape) })}
                    </Link>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`demo-detail-criteres-${dimension}`} className="mt-4">
        <h4 id={`demo-detail-criteres-${dimension}`} className="text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">{copy.detailCriteres}</h4>
        <ol className="mt-2 space-y-1.5">
          {DEMO_CONTENT.niveauxRadar.map((item) => {
            const current = item === level;
            return (
              <li
                key={item}
                aria-current={current ? "true" : undefined}
                className={`rounded-lg border px-3 py-2 text-sm leading-snug ${current ? "bg-slate-50" : "border-transparent"}`}
                style={current ? { borderColor: LEVEL_COLORS[item] } : undefined}
              >
                <span className="font-semibold" style={{ color: LEVEL_COLORS[item] }}>{item}</span>
                {current && <span className="ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold text-white" style={{ backgroundColor: LEVEL_COLORS[item] }}>{copy.detailTonNiveau}</span>}
                <span className="mt-0.5 block text-slate-700">{criteria.echelle[item]}</span>
              </li>
            );
          })}
        </ol>
      </section>
    </motion.div>
  );
}

function QualitativeRadar({ persona }: { persona: DemoPersona }) {
  const reducedMotion = useReducedMotion() ?? false;
  const radar = persona.restitution!.radar;
  const order = persona.ordreDimensions;
  const [revealed, setRevealed] = useState(reducedMotion ? order.length : 0);
  const [selected, setSelected] = useState<DimensionId>(order[0]);

  // Le radar se dessine depuis le centre, un axe après l’autre.
  useEffect(() => {
    if (reducedMotion || revealed >= order.length) return;
    const timer = window.setTimeout(() => setRevealed((value) => value + 1), revealed === 0 ? 400 : AXIS_REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, revealed, order.length]);

  const data = order.map((dimension, index) => ({
    label: DEMO_CONTENT.dimensions[dimension],
    value: index < revealed ? levelValue(radar[dimension]) : 0,
  }));

  const levels = Object.fromEntries(order.map((dimension) => [DEMO_CONTENT.dimensions[dimension], radar[dimension]])) as Record<string, RadarLevel>;
  const selectedIndex = order.indexOf(selected);

  // Le survol se lit par secteur : toute la zone du radar autour d’un axe compte, pas seulement son libellé.
  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    if (Math.hypot(dx, dy) < 14) return;
    const angle = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360;
    setSelected(order[Math.round(angle / (360 / order.length)) % order.length]);
  };

  return (
    <figure className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <figcaption className="text-xl font-normal text-slate-950">{DEMO_CONTENT.restitution.radarTitre}</figcaption>
      <p className="mt-1 text-sm text-slate-700">{DEMO_CONTENT.restitution.radarAide}</p>
      <div className="mt-3 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <div
            aria-hidden="true"
            data-demo-radar
            onPointerMove={(event) => { if (event.pointerType !== "touch") pick(event); }}
            onPointerDown={pick}
            className="mx-auto h-[380px] w-full max-w-xl cursor-pointer touch-pan-y"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={data} outerRadius="84%" margin={{ top: 52, right: 70, bottom: 52, left: 70 }}>
                <PolarGrid stroke="#CBD5E1" />
                <PolarAngleAxis dataKey="label" tick={<AxisTick levels={levels} active={DEMO_CONTENT.dimensions[selected]} />} />
                <PolarRadiusAxis domain={[0, 4]} tickCount={5} tick={false} axisLine={false} />
                {/* L’animation interne de Recharts se décale quand les données changent axe par axe : le dessin progressif vient de l’état `revealed`. */}
                <Radar
                  dataKey="value"
                  stroke="#515792"
                  strokeWidth={2}
                  fill="#515792"
                  fillOpacity={0.25}
                  isAnimationActive={false}
                  dot={(props: { cx?: number; cy?: number; index?: number; key?: string }) => {
                    const index = props.index ?? 0;
                    if (index >= revealed) return <g key={`dot-${index}`} />;
                    const isSelected = index === selectedIndex;
                    return <circle key={`dot-${index}`} cx={props.cx} cy={props.cy} r={isSelected ? 7 : 4} fill={LEVEL_COLORS[radar[order[index]]]} stroke="#fff" strokeWidth={2} />;
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div role="group" aria-label={DEMO_CONTENT.restitution.radarChoix} className="mt-2 flex flex-wrap justify-center gap-2">
            {order.map((dimension) => {
              const active = dimension === selected;
              return (
                <button
                  key={dimension}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(dimension)}
                  onFocus={() => setSelected(dimension)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-sm font-semibold transition-colors ${active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 bg-white text-slate-800 hover:border-slate-500"}`}
                >
                  <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white" style={{ backgroundColor: LEVEL_COLORS[radar[dimension]] }} />
                  {DEMO_CONTENT.dimensions[dimension]}
                </button>
              );
            })}
          </div>
        </div>
        <div aria-live="polite">
          <DimensionDetail persona={persona} dimension={selected} reducedMotion={reducedMotion} />
        </div>
      </div>
      {/* Le dessin est décoratif : la même information reste lisible au clavier et au lecteur d’écran. */}
      <ul className="sr-only">
        {order.map((dimension) => <li key={dimension}>{DEMO_CONTENT.dimensions[dimension]} : {radar[dimension]}</li>)}
      </ul>
      <div className="mt-5 border-t border-slate-100 pt-4">
        <p className="text-sm font-semibold text-slate-900">{DEMO_CONTENT.restitution.legendeTitre}</p>
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
      <h2 id={`demo-${tone}`} className="flex items-center gap-2 text-xl font-normal text-slate-950">
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

/** Une piste : l’horizon, la dimension du radar qu’elle fait avancer, puis un lien dont la raison est écrite juste au-dessus. */
function PisteCard({ piste, persona }: { piste: DemoPiste; persona: DemoPersona }) {
  const copy = DEMO_CONTENT.restitution;
  const level = persona.restitution!.radar[piste.dimension];
  const next = DEMO_CONTENT.niveauxRadar[DEMO_CONTENT.niveauxRadar.indexOf(level) + 1];
  const { lien } = piste;
  const demo = "demo" in lien ? persona.demos?.find((item) => item.id === lien.demo) : undefined;
  const resource = "ressource" in lien ? getResource(lien.ressource) : null;
  return (
    <li className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <span className="self-start rounded-full bg-[#515792]/10 px-3 py-1 text-xs font-semibold text-[#515792]">{piste.horizon}</span>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
        {fillTemplate(copy.pisteVise, { dimension: DEMO_CONTENT.dimensions[piste.dimension] })}
        {next && <span className="mt-0.5 block text-sm normal-case tracking-normal" style={{ color: LEVEL_COLORS[level] }}>{level} → <span style={{ color: LEVEL_COLORS[next] }}>{next}</span></span>}
      </p>
      <p className="mt-2 flex-1 leading-relaxed text-slate-800">{piste.texte}</p>
      <div className="mt-4 border-t border-slate-100 pt-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">{copy.pisteLienTitre}</p>
        <p className="mt-1 text-sm leading-snug text-slate-700">{lien.raison}</p>
        {demo && (
          <Link href={`${stepPath(persona.id, "demos")}#demo-micro-${demo.id}`} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#515792] underline underline-offset-4">
            {fillTemplate(copy.pisteLireDemo, { titre: demo.titre })}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        )}
        {resource && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDemoEvent("demo_ressource_ouverte", { persona: persona.id, etape: "restitution", ressource: resource.id })}
            className="mt-2 block min-h-11 py-1 text-sm font-semibold text-[#515792]"
          >
            <span className="underline underline-offset-4">{fillTemplate(copy.pisteLireRessource, { titre: resource.titre })}</span>
            <ExternalLink className="ml-1.5 inline h-3.5 w-3.5 align-[-1px]" aria-hidden="true" />
            <span className="sr-only"> {DEMO_CONTENT.lecture.nouvelOnglet}</span>
            <span className="mt-0.5 block text-xs font-normal text-slate-600">{resource.auteur}, {resource.media}{resource.langue === "en" ? ` · ${copy.pisteAnglais}` : ""}</span>
          </a>
        )}
      </div>
    </li>
  );
}

export default function Restitution({ persona }: { persona: DemoPersona }) {
  const copy = DEMO_CONTENT.restitution;
  const restitution = persona.restitution!;
  const paragraphs = restitution.lettre.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#515792]">{copy.surtitre} · {persona.prenom}</p>
        <h1 className="mt-2 text-3xl font-normal leading-tight text-slate-950 sm:text-[2.6rem]">{copy.titre}</h1>
      </header>

      <section aria-labelledby="demo-lettre" className="rounded-2xl border-l-4 border-[#515792] bg-white p-5 shadow-sm sm:p-8">
        <h2 id="demo-lettre" className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">{copy.lettreTitre}</h2>
        {/* Courts paragraphes séparés d’un vrai espace. */}
        <div className="mt-4 max-w-3xl space-y-5 font-serif text-lg leading-relaxed text-slate-900 sm:text-xl sm:leading-relaxed">
          {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <QualitativeRadar persona={persona} />

      <div className="grid gap-6 md:grid-cols-2">
        <CitationList title={copy.fonctionneTitre} items={restitution.fonctionne} tone="fonctionne" personaId={persona.id} />
        <CitationList title={copy.ameliorerTitre} items={restitution.ameliorer} tone="ameliorer" personaId={persona.id} />
      </div>

      <section aria-labelledby="demo-pistes">
        <h2 id="demo-pistes" className="text-3xl font-normal text-slate-950">{copy.pistesTitre}</h2>
        <p className="mt-1 max-w-3xl text-slate-700">{copy.pistesIntro}</p>
        <ol className="mt-4 grid gap-4 md:grid-cols-3">
          {restitution.pistes.map((piste) => <PisteCard key={piste.horizon} piste={piste} persona={persona} />)}
        </ol>
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

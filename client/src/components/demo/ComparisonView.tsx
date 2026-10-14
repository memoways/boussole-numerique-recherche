/**
 * Comparaison des trois parcours (annexe v2, section 5) : pour chaque persona, sa formulation de la même
 * dimension (Données & archivage) et son radar qualitatif. Les trois radars suivent le même ordre
 * d’axes pour se lire côte à côte ; aucun chiffre n’est affiché. Les questions viennent des scripts :
 * c’est la première question de la dimension dans chaque parcours.
 */
import { ArrowRight } from "lucide-react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { Link } from "wouter";
import { DEMO_CONTENT, fillTemplate, firstStepOfDimension, levelValue, stepPath, type DemoPersona, type DimensionId } from "@/lib/demoContent";
import { DemoActions, demoPrimaryButton, demoSecondaryButton } from "./DemoShell";
import { DIMENSION_COLORS } from "./demoTheme";
import { PERSONA_STYLE } from "./PersonaPicker";
import { AxisTick } from "./Restitution";

const AXES = Object.keys(DEMO_CONTENT.dimensions) as DimensionId[];

function PersonaColumn({ persona, current }: { persona: DemoPersona; current: boolean }) {
  const copy = DEMO_CONTENT.comparaison;
  const style = PERSONA_STYLE[persona.id];
  const Icon = style.icon;
  const radar = persona.restitution!.radar;
  const stepId = firstStepOfDimension(persona, copy.dimension);
  const question = persona.etapes.find((step) => step.id === stepId)?.question ?? "";
  const data = AXES.map((dimension) => ({ label: DEMO_CONTENT.dimensions[dimension], value: levelValue(radar[dimension]) }));

  return (
    // Sur grand écran, les quatre blocs de chaque carte partagent les lignes de la grille (subgrid) : questions, radars et boutons s’alignent.
    <li className={`grid min-w-0 gap-4 rounded-2xl border bg-white p-5 lg:row-span-4 lg:grid-rows-subgrid ${current ? "border-[#515792] ring-1 ring-[#515792]/40" : "border-slate-200"}`}>
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${style.tint}1f` }}>
            <Icon className="h-5 w-5" style={{ color: style.color }} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-slate-950">{persona.prenom}</h2>
            <p className="text-sm font-semibold text-slate-700">{persona.metier}</p>
          </div>
        </div>
        {current && <p className="mt-3 inline-block rounded-full bg-[#515792]/10 px-3 py-1 text-xs font-bold text-[#515792]">{copy.parcoursSuivi}</p>}
      </div>

      <blockquote className="self-start border-l-2 pl-3 leading-relaxed text-slate-900" style={{ borderColor: style.color }}>
        « {question} »{" "}
        {stepId !== null && (
          <Link href={stepPath(persona.id, stepId)} className="text-xs font-semibold text-[#515792] underline underline-offset-2">
            {fillTemplate(copy.questionLien, { n: String(stepId) })}
          </Link>
        )}
      </blockquote>

      <figure>
        <figcaption className="text-sm font-bold text-slate-900">{copy.radarTitre}</figcaption>
        <div aria-hidden="true" className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="56%" margin={{ top: 24, right: 44, bottom: 24, left: 44 }}>
              <PolarGrid stroke="#CBD5E1" />
              <PolarAngleAxis dataKey="label" tick={<AxisTick />} />
              <PolarRadiusAxis domain={[0, 4]} tickCount={5} tick={false} axisLine={false} />
              <Radar dataKey="value" stroke={style.color} strokeWidth={2} fill={style.tint} fillOpacity={0.25} isAnimationActive={false} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <dl className="space-y-1.5 text-sm">
          {AXES.map((dimension) => (
            <div key={dimension} className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-1.5">
              <dt className="text-slate-800">{DEMO_CONTENT.dimensions[dimension]}</dt>
              <dd className="font-bold" style={{ color: DIMENSION_COLORS[dimension].text }}>{radar[dimension]}</dd>
            </div>
          ))}
        </dl>
      </figure>

      {current ? <div aria-hidden="true" /> : (
        <Link href={stepPath(persona.id, "accueil")} className={`${demoSecondaryButton} w-full justify-center self-end`}>
          {fillTemplate(copy.boutonVoir, { prenom: persona.prenom })}
        </Link>
      )}
    </li>
  );
}

export default function ComparisonView({ persona }: { persona: DemoPersona }) {
  const copy = DEMO_CONTENT.comparaison;
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#515792]">{copy.surtitre}</p>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{copy.titre}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-800">{copy.texte}</p>
        <p className="mt-6 text-sm font-bold text-slate-900">{fillTemplate(copy.questionTitre, { dimension: DEMO_CONTENT.dimensions[copy.dimension] })}</p>
      </header>
      <ul className="grid gap-5 lg:grid-cols-3">
        {DEMO_CONTENT.personas.map((item) => <PersonaColumn key={item.id} persona={item} current={item.id === persona.id} />)}
      </ul>
      <p className="text-center text-base font-semibold text-slate-800">{DEMO_CONTENT.restitution.radarPhrase}</p>
      <DemoActions>
        <Link href={stepPath(persona.id, "futur")} className={demoSecondaryButton}>{DEMO_CONTENT.lecture.retour}</Link>
        <Link href={stepPath(persona.id, "avis")} className={demoPrimaryButton}>
          {copy.boutonAvis}
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </DemoActions>
    </div>
  );
}

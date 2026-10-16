/** Choix du persona : trois cartes (pictogramme, prénom, métier), sans photo, sans âge ni titre : la personne reste ouverte à la projection. */
import { Clapperboard, Drama, Palette, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, stepPath, type PersonaId } from "@/lib/demoContent";

/** Pictogramme et couleurs de chaque persona, repris par la comparaison des parcours. */
export const PERSONA_STYLE: Record<PersonaId, { icon: LucideIcon; color: string; tint: string }> = {
  cinema: { icon: Clapperboard, color: "#515792", tint: "#515792" },
  scene: { icon: Drama, color: "#A8440D", tint: "#E07428" },
  "arts-visuels": { icon: Palette, color: "#167A5E", tint: "#3aab8a" },
};

export default function PersonaPicker() {
  const { choixPersona, personas } = DEMO_CONTENT;

  return (
    <section aria-labelledby="demo-choix-titre">
      <h1 id="demo-choix-titre" className="text-2xl font-normal leading-tight text-slate-950 sm:text-4xl">{choixPersona.titre}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700 sm:mt-4 sm:text-base">{choixPersona.intro}</p>
      <ul className="mt-4 grid gap-2.5 sm:mt-8 sm:grid-cols-3 sm:gap-4">
        {personas.map((persona) => {
          const style = PERSONA_STYLE[persona.id];
          const Icon = style.icon;
          return (
            <li key={persona.id}>
              <Link
                href={stepPath(persona.id, "accueil")}
                onClick={() => trackDemoEvent("demo_persona_choisi", { persona: persona.id })}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-3.5 transition-colors sm:p-5 hover:border-[#515792]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl sm:h-12 sm:w-12" style={{ backgroundColor: `${style.tint}1f` }}>
                  <Icon className="h-6 w-6" style={{ color: style.color }} aria-hidden="true" />
                </span>
                <span className="mt-2 flex flex-wrap items-center gap-2 sm:mt-4">
                  <span className="text-2xl font-normal text-slate-950">{persona.prenom}</span>
                  {persona.statut !== "pret" && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">{choixPersona.badgePreparation}</span>}
                </span>
                <span className="text-sm font-semibold text-slate-700">{persona.metier}</span>
                <span className="flex-1" />
                <span className="mt-2 text-sm font-semibold text-[#515792] sm:mt-5 underline-offset-4 group-hover:underline">
                  {choixPersona.bouton} {persona.prenom} →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Choix du persona : trois cartes (pictogramme, prénom, métier, accroche), sans photo de personne. */
import { Clapperboard, Drama, Palette, type LucideIcon } from "lucide-react";
import { Link } from "wouter";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, stepPath, type PersonaId } from "@/lib/demoContent";

const PERSONA_STYLE: Record<PersonaId, { icon: LucideIcon; color: string; tint: string }> = {
  cinema: { icon: Clapperboard, color: "#515792", tint: "#515792" },
  scene: { icon: Drama, color: "#A8440D", tint: "#E07428" },
  "arts-visuels": { icon: Palette, color: "#167A5E", tint: "#3aab8a" },
};

export default function PersonaPicker() {
  const { choixPersona, personas } = DEMO_CONTENT;

  return (
    <section aria-labelledby="demo-choix-titre">
      <h1 id="demo-choix-titre" className="text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">{choixPersona.titre}</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-slate-700">{choixPersona.intro}</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {personas.map((persona) => {
          const style = PERSONA_STYLE[persona.id];
          const Icon = style.icon;
          return (
            <li key={persona.id}>
              <Link
                href={stepPath(persona.id, "accueil")}
                onClick={() => trackDemoEvent("demo_persona_choisi", { persona: persona.id })}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#515792]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: `${style.tint}1f` }}>
                  <Icon className="h-6 w-6" style={{ color: style.color }} aria-hidden="true" />
                </span>
                <span className="mt-4 text-xl font-bold text-slate-950">{persona.prenom}</span>
                <span className="text-sm font-semibold text-slate-700">{persona.metier}</span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">{persona.accroche}</span>
                <span className="mt-5 text-sm font-bold text-[#515792] underline-offset-4 group-hover:underline">
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

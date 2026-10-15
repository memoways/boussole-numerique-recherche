/** Message de confiance : repris au début du parcours (`accueil`) puis à l’écran d’avis. */
import { ShieldCheck } from "lucide-react";
import { DEMO_CONTENT } from "@/lib/demoContent";

export default function TrustNotice({ variant }: { variant: "debut" | "fin" }) {
  const { confiance } = DEMO_CONTENT;

  if (variant === "fin") {
    return (
      <aside aria-label="Ce qui est conservé" className="flex items-start gap-3 rounded-2xl border border-[#3aab8a]/40 bg-white p-4 text-sm leading-relaxed text-slate-700">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#167A5E]" aria-hidden="true" />
        <p>{confiance.fin.texte}</p>
      </aside>
    );
  }

  return (
    <aside aria-labelledby="demo-confiance-titre" className="rounded-2xl border border-[#3aab8a]/40 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#167A5E]" aria-hidden="true" />
        <div>
          <h2 id="demo-confiance-titre" className="text-lg font-normal text-slate-900">{confiance.debut.titre}</h2>
          <p className="mt-2 leading-relaxed text-slate-700">{confiance.debut.texte}</p>
          <p className="mt-4 text-sm font-semibold text-slate-900">{confiance.debut.engagementsTitre}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
            {confiance.debut.engagements.map((engagement) => <li key={engagement}>{engagement}</li>)}
          </ul>
        </div>
      </div>
    </aside>
  );
}

import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "wouter";

/**
 * Appel vers /ateliers, partagé par l’accueil et /partenaires.
 * Même grammaire que les autres blocs : filet de couleur à gauche, CTA orange #E07428.
 */
export default function AteliersCallout({ id, width = "max-w-6xl" }: { id: string; width?: "max-w-6xl" | "max-w-4xl" }) {
  return (
    <section className="border-y border-slate-200 bg-white px-4 py-14 sm:py-16" aria-labelledby={id}>
      <div className={`mx-auto ${width}`}>
        <div className="grid items-center gap-6 border-l-4 border-[#E07428] bg-slate-50 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#B8531A]"><CalendarDays className="h-4 w-4" aria-hidden="true" /> Ateliers</p>
            <h2 id={id} className="mt-3 max-w-3xl text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Participer à un atelier de la Boussole</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">Les ateliers réunissent partenaires culturels et artistes pour co-concevoir l’outil. Consultez les dates confirmées et inscrivez-vous en ligne.</p>
          </div>
          <Link href="/ateliers" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#E07428] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c9651f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07428]">
            Voir les ateliers <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

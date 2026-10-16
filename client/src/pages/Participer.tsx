import { ArrowRight, CalendarDays, MessageSquare, MessagesSquare } from "lucide-react";
import { Link } from "wouter";
import AteliersList from "@/components/ateliers/AteliersList";
import { Badge } from "@/components/ui/badge";

/**
 * Page /participer — toutes les façons concrètes de contribuer, en un seul endroit.
 * 1. Les ateliers (premier appel à l’action) ; 2. le questionnaire partenaire, avec demande d’invitation.
 * /ateliers redirige ici ; /partenaires reste la page de présentation des partenaires.
 */

const FORMAT_ATELIER = [
  "Un atelier informel, à hauteur égale : chacun parle depuis sa pratique.",
  "Une discussion ouverte pour co-concevoir l’outil.",
  "Les premiers besoins et questions des participants sont traités sur place.",
  "Chacun repart avec des pistes utiles pour son travail.",
];

const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#E07428] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c9651f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07428]";
const secondaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#515792] bg-white px-6 text-sm font-bold text-[#515792] transition-colors hover:bg-[#515792]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#515792]";

export default function Participer() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 pb-8 pt-10 sm:pb-10 sm:pt-16">
        <div className="mx-auto max-w-4xl">
          <Badge className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ backgroundColor: "#515792", color: "#fff" }}>Participer</Badge>
          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Participer au projet</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
            Deux façons de contribuer à la Boussole : venir à un atelier, ou répondre au questionnaire partenaire.
          </p>
          <nav aria-label="Sur cette page" className="mt-6 flex flex-wrap gap-3">
            <a href="#ateliers" className={primaryButton}><CalendarDays className="h-4 w-4" aria-hidden="true" />Voir les ateliers</a>
            <a href="#questionnaire" className={secondaryButton}><MessagesSquare className="h-4 w-4" aria-hidden="true" />Répondre au questionnaire</a>
          </nav>
        </div>
      </section>

      <section id="ateliers" className="scroll-mt-24 px-4 pb-14 pt-6 sm:pb-16" aria-labelledby="ateliers-titre">
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#B8531A]"><CalendarDays className="h-4 w-4" aria-hidden="true" /> Ateliers</p>
          <h2 id="ateliers-titre" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">S’inscrire à un atelier</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">L’inscription se fait en ligne, sans compte. Les ateliers confirmés apparaissent ci-dessous.</p>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-base font-bold text-slate-950">Comment se déroule un atelier</h3>
            <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700 sm:grid-cols-2">
              {FORMAT_ATELIER.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E07428]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <AteliersList />
          </div>
        </div>
      </section>

      <section id="questionnaire" className="scroll-mt-24 border-t border-slate-200 px-4 py-14 sm:py-16" style={{ backgroundColor: "#f8f9fc" }} aria-labelledby="questionnaire-titre">
        <div className="mx-auto max-w-4xl">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#515792]"><MessagesSquare className="h-4 w-4" aria-hidden="true" /> Questionnaire partenaire</p>
          <h2 id="questionnaire-titre" className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Répondre au questionnaire partenaire</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-gray-600">
            Partagez vos besoins, vos priorités, vos idées et vos points de vigilance. Vos réponses préparent le travail collectif des ateliers. Sans invitation, le parcours vous permet d’en demander une.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/partenaires/questionnaire" className={primaryButton}>
              Répondre au questionnaire <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href="mailto:ulrich.fischer@memoways.com?subject=Boussole Numérique Culture — Je souhaite participer" className={secondaryButton}>
              <MessageSquare className="h-4 w-4" aria-hidden="true" />Demander une invitation
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Pour comprendre le projet avant de vous engager :{" "}
            <Link href="/partenaires/presentation" className="font-semibold text-[#515792] underline underline-offset-4">découvrir la co-conception</Link>
            {" "}ou{" "}
            <Link href="/partenaires" className="font-semibold text-[#515792] underline underline-offset-4">voir les partenaires</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}

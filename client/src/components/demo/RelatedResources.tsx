/**
 * « D’autres regards » : une ou deux citations courtes du corpus de veille du projet, sous la réponse.
 * Elles ancrent la conversation dans des sources traçables et ouvrent sur de la nuance ; elles inspirent,
 * elles ne prouvent rien. Chaque lien s’ouvre dans un nouvel onglet et son ouverture est mesurée
 * (`demo_ressource_ouverte`), sans donnée personnelle.
 */
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, getResource, type DemoStepResource, type PersonaId } from "@/lib/demoContent";

type Props = {
  personaId: PersonaId;
  etape: number;
  ressources: DemoStepResource[];
  reducedMotion: boolean;
};

const RelatedResources = forwardRef<HTMLElement, Props>(function RelatedResources({ personaId, etape, ressources, reducedMotion }, ref) {
  const { lecture } = DEMO_CONTENT;
  const titleId = `demo-ressources-${etape}`;
  const motionProps = reducedMotion ? { initial: false as const } : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

  return (
    <motion.aside ref={ref} {...motionProps} aria-labelledby={titleId} data-demo-ressources className="scroll-mb-32 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <h2 id={titleId} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#515792]">
        <Quote className="h-4 w-4" aria-hidden="true" />
        {lecture.ressourcesTitre}
      </h2>
      <ul className="mt-4 space-y-5">
        {ressources.map((item) => {
          const resource = getResource(item.ref);
          if (!resource) return null;
          return (
            <li key={item.ref} className="min-w-0">
              <figure>
                <blockquote className="border-l-2 border-[#515792]/40 pl-4 font-serif text-base leading-relaxed text-slate-900 sm:text-lg">
                  {/* Espaces insécables : les guillemets ne passent jamais seuls à la ligne. */}
                  {"«\u00a0"}{item.citation}{"\u00a0»"}
                </blockquote>
                <figcaption className="mt-2 pl-4 text-sm leading-snug text-slate-700">
                  <span className="font-semibold text-slate-900">{resource.auteur}</span>
                  {", "}
                  <span className="italic">{resource.media}</span>
                  {item.citationOriginale && <span> · {lecture.traduitAnglais}</span>}
                  <cite className="mt-0.5 block not-italic text-slate-600">{resource.titre}</cite>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDemoEvent("demo_ressource_ouverte", { persona: personaId, etape: String(etape), ressource: resource.id })}
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-[#515792] underline underline-offset-4 hover:text-[#3F4475]"
                  >
                    {lecture.ressourceLire}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only"> {lecture.nouvelOnglet}</span>
                  </a>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
});

export default RelatedResources;

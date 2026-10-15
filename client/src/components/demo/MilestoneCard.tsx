/**
 * « Un premier regard » en fin de dimension : replié par défaut, la personne l’ouvre si elle le souhaite.
 * Ton descriptif, jamais prescriptif ; l’ordre de grandeur reste marqué « illustratif ». Chaque ouverture
 * est mesurée (`demo_regard_ouvert`) pour décider ensuite de garder ces regards.
 */
import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Eye } from "lucide-react";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, type DimensionId, type PersonaId } from "@/lib/demoContent";
import { DIMENSION_COLORS } from "./demoTheme";

type Props = {
  personaId: PersonaId;
  etape: number;
  dimension: DimensionId;
  texte: string;
  ordreDeGrandeur: string | null;
  reducedMotion: boolean;
};

export default function MilestoneCard({ personaId, etape, dimension, texte, ordreDeGrandeur, reducedMotion }: Props) {
  const { lecture, dimensions } = DEMO_CONTENT;
  const [open, setOpen] = useState(false);
  const id = useId();
  const color = DIMENSION_COLORS[dimension];
  const ref = useRef<HTMLElement>(null);

  // Une fois ouvert, le regard reste lisible au-dessus de la barre de commandes du smartphone (`scroll-mb-32`).
  useEffect(() => {
    if (open) ref.current?.scrollIntoView({ block: "nearest", behavior: reducedMotion ? "auto" : "smooth" });
  }, [open, reducedMotion]);

  const toggle = () => {
    if (!open) trackDemoEvent("demo_regard_ouvert", { persona: personaId, etape: String(etape), dimension });
    setOpen(!open);
  };

  return (
    <motion.aside
      ref={ref}
      aria-labelledby={`${id}-titre`}
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="scroll-mb-32 rounded-2xl border-2 bg-white"
      style={{ borderColor: `${color.base}66` }}
    >
      <h2 id={`${id}-titre`}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-contenu`}
          onClick={toggle}
          className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl px-5 py-3 text-left sm:px-6"
        >
          <span className="flex min-w-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: color.text }}>
            <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{lecture.pointEtapeTitre} · {dimensions[dimension]}</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-700">
            {open ? lecture.pointEtapeReplier : lecture.pointEtapeOuvrir}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </span>
        </button>
      </h2>
      {/* Le conteneur reste dans le DOM (cible d’`aria-controls`) ; seul son contenu apparaît à l’ouverture. */}
      <div id={`${id}-contenu`} hidden={!open}>
        {open && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 pb-5 sm:px-6 sm:pb-6"
          >
            <p className="text-lg font-semibold leading-relaxed text-slate-900">{texte}</p>
            {ordreDeGrandeur && <p className="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm leading-relaxed text-slate-700">{ordreDeGrandeur}</p>}
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}

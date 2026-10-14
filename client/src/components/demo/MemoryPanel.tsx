/**
 * « Ce que la Boussole retient » : extraits surlignés, puis notes taguées par dimension, puis jauges
 * qualitatives. Colonne droite rétractable sur ordinateur, tiroir du bas ouvert par un bouton flottant
 * sur smartphone. Seuls les éléments ajoutés à l’étape courante s’animent.
 */
import { AnimatePresence, motion } from "framer-motion";
import { NotebookPen, PanelRightClose, PanelRightOpen, X } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { DEMO_CONTENT, fillTemplate, type DemoPersona, type DimensionId, type RadarLevel, type RetainedItem } from "@/lib/demoContent";
import { DIMENSION_COLORS, dimensionVar } from "./demoTheme";

type PanelProps = {
  persona: DemoPersona;
  items: RetainedItem[];
  gauges: { dimension: DimensionId; level: RadarLevel }[];
  /** Étape dont les éléments viennent d’apparaître : eux seuls s’animent. */
  currentStep: number | null;
  /** Élément cité par un rebond mémoire, mis en évidence. */
  highlight?: string;
  reducedMotion: boolean;
};

function itemMotion(isNew: boolean, reducedMotion: boolean) {
  return isNew && !reducedMotion ? { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.35 } } : { initial: false as const };
}

function PanelBody({ persona, items, gauges, currentStep, highlight, reducedMotion }: PanelProps) {
  const { memoire, dimensions, niveauxRadar } = DEMO_CONTENT;
  const extracts = items.filter((item) => item.kind === "extrait");
  const notes = items.filter((item) => item.kind !== "extrait");
  const highlightClass = "ring-2 ring-[#E07428] ring-offset-1";

  if (items.length === 0) return <p className="text-sm leading-relaxed text-slate-600">{memoire.vide}</p>;

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">{memoire.extraits}</h3>
        <ul className="mt-2 space-y-2">
          <AnimatePresence initial={false}>
            {extracts.map((item) => (
              <motion.li key={item.key} {...itemMotion(item.etape === currentStep, reducedMotion)} className={`rounded-lg border-l-4 bg-white px-3 py-2 text-sm leading-snug text-slate-800 [border-left-color:var(--dim)] ${item.texte === highlight ? highlightClass : ""}`} style={dimensionVar(DIMENSION_COLORS[item.dimension].base)}>
                <mark className="bg-[#E07428]/15 text-inherit">« {item.texte} »</mark>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>

      {notes.length > 0 && (
        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">{memoire.notes}</h3>
          <div className="mt-2 space-y-3">
            {persona.ordreDimensions.map((dimension) => {
              const inDimension = notes.filter((item) => item.dimension === dimension);
              if (inDimension.length === 0) return null;
              const color = DIMENSION_COLORS[dimension];
              return (
                <div key={dimension}>
                  <p className="text-xs font-bold" style={{ color: color.text }}>{dimensions[dimension]}</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    <AnimatePresence initial={false}>
                      {inDimension.map((item) => (
                        <motion.li key={item.key} {...itemMotion(item.etape === currentStep, reducedMotion)} className={`rounded-full border px-2.5 py-1 text-xs font-semibold text-slate-800 ${item.texte === highlight ? highlightClass : ""}`} style={{ borderColor: `${color.base}80`, backgroundColor: `${color.base}14` }}>
                          {item.kind === "curseur" ? `${item.texte} : ${item.niveau}` : item.texte}
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {gauges.length > 0 && (
        <section>
          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-600">{memoire.jauges}</h3>
          <ul className="mt-2 space-y-2.5">
            {gauges.map(({ dimension, level }) => {
              const filled = niveauxRadar.indexOf(level) + 1;
              const color = DIMENSION_COLORS[dimension];
              return (
                <li key={dimension}>
                  <p className="flex justify-between gap-2 text-xs">
                    <span className="font-semibold text-slate-800">{dimensions[dimension]}</span>
                    <span className="font-bold" style={{ color: color.text }}>{level}</span>
                  </p>
                  <span aria-hidden="true" className="mt-1 grid grid-cols-4 gap-1">
                    {niveauxRadar.map((name, index) => (
                      <motion.span
                        key={name}
                        initial={reducedMotion ? false : { opacity: 0.3 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: reducedMotion ? 0 : index * 0.15 }}
                        className={`h-1.5 rounded-full ${index < filled ? "bg-(--dim)" : "bg-slate-200"}`}
                        style={dimensionVar(color.base)}
                      />
                    ))}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

type MemoryPanelProps = PanelProps & { open: boolean; onToggle: () => void };

/** Colonne droite sur ordinateur (≥ lg). */
export function MemoryColumn({ open, onToggle, ...props }: MemoryPanelProps) {
  const { memoire } = DEMO_CONTENT;
  if (!open) {
    return (
      <div className="hidden lg:block">
        <button type="button" onClick={onToggle} aria-expanded={false} className="sticky top-6 flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:border-[#515792]">
          <PanelRightOpen className="h-4 w-4" aria-hidden="true" />
          {memoire.deplier} ({props.items.length})
        </button>
      </div>
    );
  }
  return (
    <aside aria-labelledby="demo-memoire-titre" className="hidden lg:block">
      <div className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2 id="demo-memoire-titre" className="flex items-center gap-2 text-base font-bold text-slate-950">
            <NotebookPen className="h-4 w-4 text-[#515792]" aria-hidden="true" />
            {memoire.titre}
          </h2>
          <button type="button" onClick={onToggle} aria-expanded={true} className="inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-xs font-semibold text-slate-700 hover:bg-white">
            <PanelRightClose className="h-4 w-4" aria-hidden="true" />
            {memoire.replier}
          </button>
        </div>
        <PanelBody {...props} />
      </div>
    </aside>
  );
}

/** Bouton flottant (ancré au-dessus de la barre de commandes) et tiroir du bas sur smartphone et tablette (< lg). */
export function MemoryDrawer(props: PanelProps) {
  const { memoire } = DEMO_CONTENT;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button type="button" className="absolute -top-14 right-4 z-30 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#515792] px-4 text-sm font-bold text-white shadow-lg sm:right-0 lg:hidden">
          <NotebookPen className="h-4 w-4" aria-hidden="true" />
          {fillTemplate(memoire.boutonMobile, { n: String(props.items.length) })}
        </button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#F8F9FC]">
        <div className="flex items-center justify-between gap-3 px-5 pt-4">
          <DrawerTitle className="flex items-center gap-2 text-base font-bold text-slate-950">
            <NotebookPen className="h-4 w-4 text-[#515792]" aria-hidden="true" />
            {memoire.titre}
          </DrawerTitle>
          <DrawerClose className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md text-slate-700" aria-label={memoire.fermer}>
            <X className="h-5 w-5" aria-hidden="true" />
          </DrawerClose>
        </div>
        <DrawerDescription className="sr-only">{memoire.titre}</DrawerDescription>
        <div className="overflow-y-auto px-5 pb-8 pt-4">
          <PanelBody {...props} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

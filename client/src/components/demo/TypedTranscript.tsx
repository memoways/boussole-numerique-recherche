/**
 * Transcription écrite mot par mot. Le texte visible est décoratif (`aria-hidden`) ; le texte complet
 * est toujours disponible pour les lecteurs d’écran. Une fois la réponse reçue, le passage retenu est surligné.
 */
import type { ReactNode } from "react";

type Props = {
  text: string;
  wordsShown: number;
  typing: boolean;
  highlight?: string;
  showHighlight: boolean;
  onAccelerate: () => void;
  hint: string;
};

function withHighlight(text: string, highlight: string | undefined): ReactNode {
  if (!highlight) return text;
  const start = text.indexOf(highlight);
  if (start === -1) return text;
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded bg-[#E07428]/20 px-0.5 text-inherit">{highlight}</mark>
      {text.slice(start + highlight.length)}
    </>
  );
}

/** Espace insécable : les guillemets restent collés au texte, jamais seuls en bout de ligne. */
const NBSP = "\u00A0";

export default function TypedTranscript({ text, wordsShown, typing, highlight, showHighlight, onAccelerate, hint }: Props) {
  const words = text.split(/\s+/).filter(Boolean);
  const complete = wordsShown >= words.length;
  const visible = complete ? withHighlight(text, showHighlight ? highlight : undefined) : words.slice(0, wordsShown).join(" ");

  return (
    <div>
      <p className="sr-only">«{NBSP}{text}{NBSP}»</p>
      {/* Le texte complet, invisible, réserve la hauteur finale : rien ne saute pendant l’écriture. */}
      <div aria-hidden="true" className={`grid text-lg leading-relaxed text-slate-900 ${typing ? "cursor-pointer" : ""}`} onClick={typing ? onAccelerate : undefined}>
        <span className="invisible [grid-area:1/1]">«{NBSP}{text}{NBSP}»</span>
        <span className="[grid-area:1/1]">
          «{NBSP}{visible}
          {typing && <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-[#515792]" />}
          {complete && `${NBSP}»`}
        </span>
      </div>
      {typing && <p aria-hidden="true" className="mt-2 text-xs text-slate-600">{hint}</p>}
    </div>
  );
}

/** Bulle de parole d’une personne : prénom, onde qui s’anime pendant l’écriture, transcription mot par mot. */
import { motion } from "framer-motion";
import { DEMO_CONTENT } from "@/lib/demoContent";
import TypedTranscript from "./TypedTranscript";
import Waveform from "./Waveform";
import type { useTypedSpeech } from "./useTypedSpeech";

type Props = {
  prenom: string;
  text: string;
  speech: ReturnType<typeof useTypedSpeech>;
  reducedMotion: boolean;
  highlight?: string;
};

export default function SpokenBubble({ prenom, text, speech, reducedMotion, highlight }: Props) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-[#515792]/[0.06] p-5 sm:ml-8 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700">{prenom}</p>
        <Waveform active={speech.typing} level={speech.level} reducedMotion={reducedMotion} />
      </div>
      <div className="mt-3">
        <TypedTranscript text={text} wordsShown={speech.wordsShown} typing={speech.typing} highlight={highlight} showHighlight={false} onAccelerate={speech.accelerate} hint={DEMO_CONTENT.lecture.accelerer} />
      </div>
    </motion.div>
  );
}

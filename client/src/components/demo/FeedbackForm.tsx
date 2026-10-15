/**
 * Avis final : seul envoi réel de la démonstration.
 * Texte ou dictée (enregistrer → réécouter → transcrire → relire → envoyer). Aucun audio n’est envoyé avec l’avis :
 * seul le texte relu part vers l’API, qui l’écrit dans Notion.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { CircleAlert, Check, Loader2, Mic, RotateCcw, Send, Square } from "lucide-react";
import { Link } from "wouter";
import { trackDemoEvent } from "@/lib/analytics";
import { DEMO_CONTENT, type PersonaId } from "@/lib/demoContent";
import { hasPartnerApi, partnerApi, PARTNER_API_URL } from "@/lib/partnerApi";
import { demoPrimaryButton, demoSecondaryButton } from "./DemoShell";

const COMMENT_MAX_LENGTH = 5000;
const RECORDING_MAX_SECONDS = 180;
const MIME_CANDIDATES = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RecorderState = "idle" | "recording" | "recorded" | "transcribing";
type SendStatus = "idle" | "sending" | "sent" | "error";

const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

export default function FeedbackForm({ persona }: { persona: PersonaId }) {
  const copy = DEMO_CONTENT.avis;
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [fromVoice, setFromVoice] = useState(false);
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [micNotice, setMicNotice] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");

  const recorder = useRef<MediaRecorder | null>(null);
  const stream = useRef<MediaStream | null>(null);
  const chunks = useRef<Blob[]>([]);
  const audioBlob = useRef<Blob | null>(null);
  const timer = useRef<number | null>(null);
  const started = useRef(false);

  const markStarted = useCallback(() => {
    if (started.current) return;
    started.current = true;
    trackDemoEvent("demo_avis_commence", { persona });
  }, [persona]);

  const clearTimer = () => {
    if (timer.current !== null) window.clearInterval(timer.current);
    timer.current = null;
  };

  const releaseStream = () => {
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
  };

  const discardAudio = useCallback(() => {
    audioBlob.current = null;
    setAudioUrl((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return null;
    });
  }, []);

  useEffect(() => () => {
    clearTimer();
    releaseStream();
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
  }, []);

  useEffect(() => () => { if (audioUrl) URL.revokeObjectURL(audioUrl); }, [audioUrl]);

  // Une zone de texte vidée n’est plus une dictée : le mode redevient « Texte ».
  useEffect(() => { if (!comment.trim()) setFromVoice(false); }, [comment]);

  const stopRecording = () => {
    clearTimer();
    if (recorder.current && recorder.current.state !== "inactive") recorder.current.stop();
  };

  const startRecording = async () => {
    markStarted();
    setMicNotice("");
    if (!hasPartnerApi() || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setMicNotice(copy.micro.indisponible);
      return;
    }
    try {
      discardAudio();
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.current = media;
      const mimeType = MIME_CANDIDATES.find((candidate) => MediaRecorder.isTypeSupported(candidate));
      const mediaRecorder = new MediaRecorder(media, mimeType ? { mimeType } : undefined);
      chunks.current = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size) chunks.current.push(event.data); };
      mediaRecorder.onstop = () => {
        releaseStream();
        clearTimer();
        const blob = new Blob(chunks.current, { type: mediaRecorder.mimeType || mimeType || "audio/webm" });
        if (!blob.size) {
          setRecorderState("idle");
          setMicNotice(copy.micro.indisponible);
          return;
        }
        audioBlob.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setRecorderState("recorded");
      };
      recorder.current = mediaRecorder;
      mediaRecorder.start();
      setElapsed(0);
      setRecorderState("recording");
      trackDemoEvent("demo_avis_micro", { persona });
      const startedAt = Date.now();
      timer.current = window.setInterval(() => {
        const seconds = Math.min(RECORDING_MAX_SECONDS, Math.floor((Date.now() - startedAt) / 1000));
        setElapsed(seconds);
        if (seconds >= RECORDING_MAX_SECONDS) stopRecording();
      }, 500);
    } catch {
      releaseStream();
      setRecorderState("idle");
      setMicNotice(copy.micro.indisponible);
    }
  };

  const transcribe = async () => {
    const blob = audioBlob.current;
    if (!blob) return;
    setMicNotice("");
    setRecorderState("transcribing");
    try {
      const response = await fetch(`${PARTNER_API_URL}/api/public/demo/transcribe`, {
        method: "POST",
        headers: { "Content-Type": (blob.type || "audio/webm").split(";")[0] },
        body: blob,
      });
      const payload = await response.json().catch(() => ({})) as { transcript?: string; error?: string };
      if (!response.ok) throw new Error(payload.error ?? copy.micro.transcriptionErreur);
      const transcript = (payload.transcript ?? "").trim();
      if (!transcript) {
        setRecorderState("recorded");
        setMicNotice(copy.micro.transcriptionVide);
        return;
      }
      setComment((previous) => `${previous.trim() ? `${previous.trim()}\n\n` : ""}${transcript}`.slice(0, COMMENT_MAX_LENGTH));
      setFromVoice(true);
      // L’audio n’est pas conservé : il disparaît dès que la transcription est dans la zone de texte.
      discardAudio();
      setRecorderState("idle");
    } catch (error) {
      setRecorderState("recorded");
      setMicNotice(error instanceof Error && error.message ? error.message : copy.micro.transcriptionErreur);
      trackDemoEvent("demo_avis_erreur", { persona, etape: "transcription" });
    }
  };

  const restartRecording = () => {
    discardAudio();
    setMicNotice("");
    setRecorderState("idle");
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) {
      setEmailError("Cette adresse e-mail ne semble pas valide.");
      return;
    }
    setEmailError("");
    setSendStatus("sending");
    try {
      await partnerApi<{ message: string }>("/api/public/demo-feedback", {
        method: "POST",
        body: JSON.stringify({
          persona,
          mode: fromVoice ? "voix" : "texte",
          comment: comment.trim(),
          ...(trimmedEmail ? { email: trimmedEmail } : {}),
          website,
        }),
      });
      setSendStatus("sent");
      trackDemoEvent("demo_avis_envoye", { persona, mode: fromVoice ? "voix" : "texte", email: Boolean(trimmedEmail) });
    } catch {
      // Le texte saisi est conservé pour permettre un nouvel essai.
      setSendStatus("error");
      trackDemoEvent("demo_avis_erreur", { persona, etape: "envoi" });
    }
  };

  if (!hasPartnerApi()) {
    return <p role="status" className="rounded-2xl border border-slate-200 bg-white p-5 leading-relaxed text-slate-700">{copy.indisponible}</p>;
  }

  if (sendStatus === "sent") {
    return (
      <section role="status" className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <Check className="mx-auto h-10 w-10 text-emerald-700" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-normal text-slate-950">{copy.confirmation}</h2>
        <p className="mt-3 leading-relaxed text-slate-700">{copy.confirmationSuite}</p>
        <Link href="/experience" className={`${demoSecondaryButton} mt-6`}>{copy.retourSite}</Link>
      </section>
    );
  }

  const busy = sendStatus === "sending" || recorderState === "transcribing";

  return (
    <form onSubmit={submit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="demo-avis-commentaire" className="block text-lg font-normal text-slate-900">{copy.libelleCommentaire}</label>
        <textarea
          id="demo-avis-commentaire"
          value={comment}
          onChange={(event) => { markStarted(); setComment(event.target.value); }}
          maxLength={COMMENT_MAX_LENGTH}
          rows={8}
          placeholder={copy.placeholderCommentaire}
          className="mt-2 w-full resize-y rounded-xl border border-slate-300 bg-white p-3 text-base leading-relaxed text-slate-900 outline-none transition-colors focus:border-[#515792] focus:ring-2 focus:ring-[#515792]/20"
        />
        {comment.length > 4500 && <p className="mt-1 text-right text-xs text-slate-600" aria-live="polite">{comment.length} / {COMMENT_MAX_LENGTH}</p>}
      </div>

      <fieldset className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <legend className="px-1 text-sm font-semibold text-slate-900">{copy.micro.titre}</legend>
        <p className="text-sm leading-relaxed text-slate-700">{copy.micro.aide}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {recorderState === "recording" ? (
            <button type="button" onClick={stopRecording} className={demoSecondaryButton}>
              <Square className="h-4 w-4 fill-current text-[#A8440D]" aria-hidden="true" />
              {copy.micro.arreter}
              <span className="font-mono text-sm tabular-nums" aria-hidden="true">{formatDuration(elapsed)} / {formatDuration(RECORDING_MAX_SECONDS)}</span>
            </button>
          ) : (
            <button type="button" onClick={startRecording} disabled={busy || recorderState === "recorded"} className={demoSecondaryButton}>
              <Mic className="h-4 w-4" aria-hidden="true" />
              {copy.micro.demarrer}
            </button>
          )}
        </div>
        {recorderState === "recording" && <p className="sr-only" role="status">Enregistrement en cours</p>}
        {audioUrl && (recorderState === "recorded" || recorderState === "transcribing") && (
          <div className="mt-4 space-y-3">
            <p className="text-sm font-semibold text-slate-800">{copy.micro.reecoute}</p>
            <audio controls src={audioUrl} className="w-full" />
            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={transcribe} disabled={recorderState === "transcribing"} className={demoPrimaryButton}>
                {recorderState === "transcribing" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {recorderState === "transcribing" ? copy.micro.transcriptionEnCours : copy.micro.transcrire}
              </button>
              <button type="button" onClick={restartRecording} disabled={recorderState === "transcribing"} className={demoSecondaryButton}>
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {copy.micro.recommencer}
              </button>
            </div>
          </div>
        )}
        {micNotice && <p role="status" className="mt-3 text-sm leading-relaxed text-slate-700">{micNotice}</p>}
      </fieldset>

      <div>
        <label htmlFor="demo-avis-email" className="block text-lg font-normal text-slate-900">{copy.libelleEmail}</label>
        <p id="demo-avis-email-aide" className="mt-1 text-sm leading-relaxed text-slate-700">{copy.aideEmail}</p>
        <input
          id="demo-avis-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => { markStarted(); setEmail(event.target.value); setEmailError(""); }}
          aria-describedby={emailError ? "demo-avis-email-aide demo-avis-email-erreur" : "demo-avis-email-aide"}
          aria-invalid={emailError ? true : undefined}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base text-slate-900 outline-none transition-colors focus:border-[#515792] focus:ring-2 focus:ring-[#515792]/20"
        />
        {emailError && <p id="demo-avis-email-erreur" className="mt-1 text-sm font-semibold text-red-800">{emailError}</p>}
      </div>

      {/* Champ caché anti-robots : les personnes ne le voient ni ne le remplissent. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      </div>

      {sendStatus === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-900">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {copy.erreurEnvoi}
        </div>
      )}

      <button type="submit" disabled={busy || !comment.trim()} className={`${demoPrimaryButton} w-full sm:w-auto`}>
        {sendStatus === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
        {sendStatus === "sending" ? copy.envoiEnCours : copy.envoyer}
      </button>
    </form>
  );
}

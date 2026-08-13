import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, ChevronRight, CircleAlert, Loader2, Mic, Pause, Send, Sparkles } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { hasPartnerApi, partnerApi, PARTNER_API_URL } from "@/lib/partnerApi";

type Question = {
  key: string;
  section: string;
  label: string;
  helper?: string;
  kind: "likert" | "single" | "multiple" | "short_text" | "long_text" | "voice_text";
  required?: boolean;
  options?: string[];
  likert?: { minLabel: string; maxLabel: string };
  allowVoice?: boolean;
};

type QuestionnairePayload = {
  title: string;
  estimatedMinutes: number;
  questions: Question[];
};

type InvitationPayload = {
  invitation: { organizationName: string; firstName: string; lastName: string; expiresAt: string };
  response: { id: string; status: "draft" | "submitted"; consentedAt: string | null; answers: Array<{ questionKey: string; value: unknown; source: "typed" | "voice" }> };
  questionnaire: QuestionnairePayload;
  voiceEnabled: boolean;
};

function ErrorNotice({ message }: { message: string }) {
  return <div role="alert" className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />{message}</div>;
}

function VoiceInput({ token, value, onChange }: { token: string; value: string; onChange: (value: string, source: "typed" | "voice") => void }) {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState("");

  const start = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : undefined });
      chunks.current = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size) chunks.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audio = new Blob(chunks.current, { type: mediaRecorder.mimeType || "audio/webm" });
        setTranscribing(true);
        try {
          const response = await fetch(`${PARTNER_API_URL}/api/public/invitations/${token}/transcribe`, { method: "POST", headers: { "Content-Type": audio.type }, body: audio });
          const payload = await response.json();
          if (!response.ok) throw new Error(payload.error ?? "La transcription n’a pas pu être réalisée.");
          onChange(payload.transcript ?? "", "voice");
        } catch (transcriptionError) {
          setError(transcriptionError instanceof Error ? transcriptionError.message : "La transcription n’a pas pu être réalisée.");
        } finally {
          setTranscribing(false);
        }
      };
      recorder.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch {
      setError("Le microphone est indisponible ou son accès a été refusé. Vous pouvez répondre par écrit.");
    }
  };

  const stop = () => {
    recorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="mt-3">
      <Button type="button" variant="outline" size="sm" onClick={recording ? stop : start} disabled={transcribing}>
        {transcribing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : recording ? <Pause className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
        {transcribing ? "Transcription en cours…" : recording ? "Terminer l’enregistrement" : "Répondre à l’oral"}
      </Button>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">Vous pourrez corriger la transcription avant l’enregistrement du brouillon. L’audio est supprimé après la transcription.</p>
      {error && <ErrorNotice message={error} />}
    </div>
  );
}

function QuestionField({ question, value, onChange, voiceEnabled, token }: { question: Question; value: unknown; onChange: (value: unknown, source?: "typed" | "voice") => void; voiceEnabled: boolean; token: string }) {
  const textValue = typeof value === "string" ? value : "";
  const choices = Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <legend className="max-w-3xl text-base font-semibold leading-relaxed text-slate-950">{question.label}{question.required && <span className="ml-1 text-[#E07428]">*</span>}</legend>
      {question.helper && <p className="mt-2 text-sm leading-relaxed text-slate-500">{question.helper}</p>}
      {question.kind === "likert" && (
        <div className="mt-5">
          <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label={question.label}>
            {[1, 2, 3, 4, 5].map((score) => <button key={score} type="button" role="radio" aria-checked={value === score} onClick={() => onChange(score)} className={`h-11 rounded-xl border text-sm font-bold transition-colors ${value === score ? "border-[#515792] bg-[#515792] text-white" : "border-slate-200 text-slate-600 hover:border-[#515792]"}`}>{score}</button>)}
          </div>
          <div className="mt-2 flex justify-between gap-4 text-xs leading-relaxed text-slate-500"><span>{question.likert?.minLabel}</span><span className="text-right">{question.likert?.maxLabel}</span></div>
        </div>
      )}
      {question.kind === "single" && <div className="mt-4 space-y-2">{question.options?.map((option) => <label key={option} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-[#515792]"><input type="radio" name={question.key} checked={value === option} onChange={() => onChange(option)} className="mt-1 accent-[#515792]" /><span className="text-sm leading-relaxed text-slate-700">{option}</span></label>)}</div>}
      {question.kind === "multiple" && <div className="mt-4 space-y-2">{question.options?.map((option) => <label key={option} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-[#515792]"><input type="checkbox" checked={choices.includes(option)} onChange={() => onChange(choices.includes(option) ? choices.filter((item) => item !== option) : [...choices, option])} className="mt-1 accent-[#515792]" /><span className="text-sm leading-relaxed text-slate-700">{option}</span></label>)}</div>}
      {(question.kind === "short_text" || question.kind === "long_text" || question.kind === "voice_text") && <>
        <textarea value={textValue} onChange={(event) => onChange(event.target.value)} rows={question.kind === "short_text" ? 3 : 6} className="mt-4 w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed text-slate-800 outline-none transition-colors focus:border-[#515792] focus:ring-2 focus:ring-[#515792]/15" placeholder="Votre réponse…" />
        {question.allowVoice && voiceEnabled && <VoiceInput token={token} value={textValue} onChange={onChange} />}
      </>}
    </fieldset>
  );
}

function InvitationRequest() {
  const [form, setForm] = useState({ organizationName: "", firstName: "", lastName: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending"); setError("");
    try {
      await partnerApi("/api/public/invitation-requests", { method: "POST", body: JSON.stringify(form) });
      setStatus("sent");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "La demande n’a pas pu être envoyée.");
      setStatus("idle");
    }
  };
  if (!hasPartnerApi()) return <ServicePending />;
  if (status === "sent") return <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center"><Check className="mx-auto h-10 w-10 text-emerald-700" /><h1 className="mt-4 text-2xl font-bold text-slate-950">Votre demande est enregistrée</h1><p className="mt-3 leading-relaxed text-slate-600">L’équipe vérifiera votre rattachement à une organisation partenaire puis vous enverra une invitation personnelle si votre participation correspond au pilote.</p></section>;
  return <section className="mx-auto max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#515792]">Questionnaire partenaire</p><h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">Partager mes idées et feedbacks</h1><p className="mt-4 max-w-xl leading-relaxed text-slate-600">Le questionnaire est réservé aux partenaires invités. Si vous avez déjà reçu un lien personnel, ouvrez-le directement. Sinon, demandez une invitation ci-dessous.</p><form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><label className="block text-sm font-semibold text-slate-800">Nom de la structure<input required value={form.organizationName} onChange={(event) => setForm({ ...form, organizationName: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-[#515792]" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold text-slate-800">Prénom<input required value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-[#515792]" /></label><label className="block text-sm font-semibold text-slate-800">Nom<input required value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-[#515792]" /></label></div><label className="block text-sm font-semibold text-slate-800">E-mail<input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:border-[#515792]" /></label>{error && <ErrorNotice message={error} />}<Button type="submit" disabled={status === "sending"} style={{ backgroundColor: "#E07428", color: "#fff" }}>{status === "sending" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Demander une invitation</Button></form></section>;
}

function ServicePending() {
  return <section className="mx-auto max-w-2xl rounded-3xl border border-[#515792]/20 bg-[#515792]/5 p-8"><Sparkles className="h-9 w-9 text-[#515792]" /><h1 className="mt-4 text-2xl font-bold text-slate-950">Le questionnaire partenaire se prépare</h1><p className="mt-3 leading-relaxed text-slate-600">Cette expérience sera activée avec les invitations personnelles dès que le service de collecte sécurisé sera déployé. En attendant, vous pouvez signaler votre intérêt.</p><Button className="mt-6" style={{ backgroundColor: "#E07428", color: "#fff" }} asChild><a href="mailto:ulrich.fischer@memoways.com?subject=Boussole Numérique Culture — Demande d’invitation questionnaire">Nous écrire</a></Button></section>;
}

function TokenQuestionnaire({ token }: { token: string }) {
  const [payload, setPayload] = useState<InvitationPayload | null>(null);
  const [answers, setAnswers] = useState<Record<string, { value: unknown; source: "typed" | "voice" }>>({});
  const [consent, setConsent] = useState(false);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "saving" | "submitted">("loading");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const sections = useMemo(() => payload ? Array.from(new Set(payload.questionnaire.questions.map((question) => question.section))) : [], [payload]);
  const currentSection = sections[sectionIndex];
  const questions = payload?.questionnaire.questions.filter((question) => question.section === currentSection) ?? [];

  const load = async () => {
    try {
      const data = await partnerApi<InvitationPayload>(`/api/public/invitations/${token}`);
      setPayload(data); setConsent(Boolean(data.response.consentedAt));
      setAnswers(Object.fromEntries(data.response.answers.map((answer) => [answer.questionKey, { value: answer.value, source: answer.source }])));
      setStatus(data.response.status === "submitted" ? "submitted" : "ready");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Le questionnaire n’a pas pu être chargé.");
      setStatus("ready");
    }
  };
  useEffect(() => { void load(); }, [token]);

  const persist = async () => {
    setStatus("saving"); setNotice(""); setError("");
    try {
      await partnerApi(`/api/public/invitations/${token}/draft`, { method: "PUT", body: JSON.stringify({ consent, answers: Object.entries(answers).map(([questionKey, answer]) => ({ questionKey, ...answer })) }) });
      setStatus("ready"); setNotice("Brouillon enregistré.");
      return true;
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Le brouillon n’a pas pu être enregistré."); setStatus("ready"); return false;
    }
  };
  const next = async () => { if (await persist()) setSectionIndex((index) => Math.min(sections.length - 1, index + 1)); };
  const submit = async () => { if (!await persist()) return; setStatus("saving"); try { await partnerApi(`/api/public/invitations/${token}/submit`, { method: "POST" }); setStatus("submitted"); } catch (submitError) { setError(submitError instanceof Error ? submitError.message : "Le questionnaire n’a pas pu être envoyé."); setStatus("ready"); } };

  if (!hasPartnerApi()) return <ServicePending />;
  if (status === "loading") return <div className="mx-auto flex max-w-2xl items-center gap-3 py-16 text-slate-600"><Loader2 className="h-5 w-5 animate-spin" /> Chargement de votre questionnaire…</div>;
  if (error && !payload) return <section className="mx-auto max-w-2xl"><ErrorNotice message={error} /></section>;
  if (!payload) return null;
  if (status === "submitted") return <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center"><Check className="mx-auto h-10 w-10 text-emerald-700" /><h1 className="mt-4 text-2xl font-bold text-slate-950">Merci pour vos idées et feedbacks</h1><p className="mt-3 leading-relaxed text-slate-600">Vos réponses contribueront à préparer l’atelier de co-conception. Un récapitulatif individuel vous sera envoyé par e-mail.</p></section>;

  return <section className="mx-auto max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#515792]">{payload.invitation.organizationName}</p><h1 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">{payload.questionnaire.title}</h1><p className="mt-4 leading-relaxed text-slate-600">Bonjour {payload.invitation.firstName}. Ce questionnaire dure environ {payload.questionnaire.estimatedMinutes} minutes. Vous pouvez enregistrer un brouillon à tout moment.</p><div className="mt-7 h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#515792] transition-all" style={{ width: `${((sectionIndex + 1) / sections.length) * 100}%` }} /></div><p className="mt-2 text-xs text-slate-500">Étape {sectionIndex + 1} sur {sections.length} — {currentSection}</p>{sectionIndex === 0 && <label className="mt-7 flex items-start gap-3 rounded-2xl border border-[#515792]/20 bg-[#515792]/5 p-4 text-sm leading-relaxed text-slate-700"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 accent-[#515792]" /><span>J’accepte que mes réponses soient utilisées pour la co-conception de la Boussole jusqu’à la fin du développement de sa version publique. Je peux demander le retrait de mes données en écrivant à ulrich.fischer@memoways.com.</span></label>}<div className="mt-6 space-y-4">{questions.map((question) => <QuestionField key={question.key} question={question} value={answers[question.key]?.value} onChange={(value, source = "typed") => setAnswers((current) => ({ ...current, [question.key]: { value, source } }))} voiceEnabled={payload.voiceEnabled} token={token} />)}</div>{error && <ErrorNotice message={error} />}{notice && <p className="mt-4 text-sm text-emerald-700" role="status">{notice}</p>}<div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><Button variant="outline" disabled={sectionIndex === 0 || status === "saving"} onClick={() => setSectionIndex((index) => Math.max(0, index - 1))}><ChevronLeft className="mr-2 h-4 w-4" /> Précédent</Button>{sectionIndex === sections.length - 1 ? <Button disabled={!consent || status === "saving"} onClick={submit} style={{ backgroundColor: "#E07428", color: "#fff" }}>{status === "saving" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}<Send className="mr-2 h-4 w-4" /> Envoyer mes réponses</Button> : <Button disabled={!consent || status === "saving"} onClick={next} style={{ backgroundColor: "#515792", color: "#fff" }}>{status === "saving" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Suivant <ChevronRight className="ml-2 h-4 w-4" /></Button>}</div></section>;
}

export default function PartnerQuestionnaire() {
  const [matches, params] = useRoute("/partenaires/questionnaire/:token");
  return <div className="bg-gradient-to-b from-slate-50 to-white px-4 py-10 sm:py-14"><div className="mx-auto mb-8 max-w-3xl"><Link href="/partenaires" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#515792]"><ChevronLeft className="h-4 w-4" /> Partenaires</Link></div>{matches && params?.token ? <TokenQuestionnaire token={params.token} /> : <InvitationRequest />}</div>;
}

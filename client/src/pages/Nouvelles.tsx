import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "wouter";
import { Compass, Mail } from "lucide-react";

const api = (import.meta.env.VITE_NEWSLETTER_API_ORIGIN || "https://memoways.com").replace(/\/$/, "");
const field = "mt-2 block min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 focus:border-[#515792] focus:outline-2 focus:outline-offset-2 focus:outline-[#515792]";
const button = "mt-6 min-h-12 w-full rounded-lg bg-[#515792] px-5 py-3 font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#515792] disabled:opacity-50";
const consent = "J’accepte de recevoir Nouvelles de la Boussole par email. Je peux me désinscrire de cette newsletter à tout moment sans modifier mes autres abonnements.";

export default function Nouvelles({ mode = "subscribe" }: { mode?: "subscribe" | "confirm" | "unsubscribe" }) {
  const [available, setAvailable] = useState(false);
  const [status, setStatus] = useState("idle");
  const token = useRef<string | null>(null);
  const busy = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    if (mode === "subscribe") {
      void fetch(`${api}/api/newsletter/status`, {signal: controller.signal, cache: "no-store", credentials: "omit"})
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(d => { if (!controller.signal.aborted) setAvailable(d.boussole === true); })
        .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    } else {
      const candidate = new URLSearchParams(location.hash.slice(1)).get("token");
      history.replaceState(null,"",location.pathname);
      const pattern = mode === "confirm" ? /^[a-f0-9-]{36}\.[A-Za-z0-9_-]{43}$/ : /^[a-f0-9-]{36}\.boussole\.[A-Za-z0-9_-]{43}$/;
      if (candidate && pattern.test(candidate)) {token.current = candidate;setStatus("ready");}
      else if (!token.current) setStatus("invalid");
    }
    return () => controller.abort();
  },[mode]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy.current || mode === "subscribe" && !available) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    busy.current = true;setStatus("loading");
    try {
      const body = mode === "subscribe" ? {topic: "boussole", email: fields.get("email"), firstName: fields.get("firstName"), lastName: fields.get("lastName"), website: fields.get("website"), consent: fields.get("consent") === "on", locale: "fr", source: "embedded"} : {token: token.current, ...(mode === "confirm" ? {topic:"boussole"} : {})};
      const response = await fetch(`${api}/api/newsletter/${mode === "subscribe" ? "subscribe" : mode === "confirm" ? "confirm" : "unsubscribe"}`, {method:"POST", credentials:"omit",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      if (!response.ok) throw new Error("unavailable");
      const result = await response.json();
      if (!["received","confirmed","used","expired","invalid"].includes(result.status)) throw new Error("invalid_response");
      setStatus(result.status);
      if (mode === "subscribe") form.reset(); else token.current = null;
    } catch {setStatus("error");} finally {busy.current = false;}
  }
  const messages: Record<string,string> = {
    received: mode === "unsubscribe" ? "Votre demande de désinscription des Nouvelles de la Boussole est enregistrée. Elle sera répercutée dans la liste de diffusion." : "Votre demande est enregistrée. L’inscription ne sera effective qu’après votre confirmation par email. Sans confirmation, vous ne recevez pas la newsletter.",
    confirmed: "Votre choix est confirmé. Nous allons finaliser votre inscription aux Nouvelles de la Boussole.",
    used: "Votre choix a déjà été confirmé.",
    expired: "Ce lien a expiré. Faites une nouvelle demande d’inscription.",
    invalid: "Ce lien n’est pas valide pour les Nouvelles de la Boussole.",
    error: "Le service est momentanément indisponible. Réessayez plus tard avec ce lien.",
    loading: "Enregistrement…",
  };
  const editable = mode === "subscribe" ? !["received","confirmed"].includes(status) : ["ready","error","loading"].includes(status);
  return <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-12 sm:py-20"><div className="mx-auto max-w-2xl">
    <p className="mb-4 flex items-center gap-2 text-sm font-bold text-[#515792]"><Compass aria-hidden="true" />Boussole Numérique Culture</p>
    <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{mode === "confirm" ? "Confirmer mon inscription" : mode === "unsubscribe" ? "Me désinscrire" : "Nouvelles de la Boussole"}</h1>
    <p className="mt-5 text-lg leading-relaxed text-slate-700">{mode === "subscribe" ? "Les avancées du projet, les apprentissages de terrain et les ressources pour les pratiques numériques dans la culture." : mode === "confirm" ? "Ce choix concerne uniquement le projet « Boussole Numérique Culture »." : "Ce choix concerne uniquement les Nouvelles de la Boussole. Vos autres abonnements restent inchangés."}</p>
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {mode === "subscribe" && <><h2 className="flex items-center gap-2 text-xl font-bold text-slate-950"><Mail aria-hidden="true" />Recevoir les nouvelles par email</h2><p className="mt-3 leading-relaxed text-slate-600">Un abonnement indépendant de la newsletter Memoways, à confirmer séparément. Votre intérêt pour un atelier ou l’ouverture publique ne vous y inscrit pas.</p></>}
      <form className="mt-5" onSubmit={submit} aria-busy={status === "loading"}>
        {editable && <fieldset disabled={status === "loading"}>
          <legend className="sr-only">Nouvelles de la Boussole</legend>
          {mode === "subscribe" && <>
          <div className="grid gap-4 sm:grid-cols-2"><label className="font-semibold text-slate-800">Prénom <span className="text-sm font-normal">(facultatif)</span><input name="firstName" autoComplete="given-name" maxLength={100} className={field} /></label><label className="font-semibold text-slate-800">Nom <span className="text-sm font-normal">(facultatif)</span><input name="lastName" autoComplete="family-name" maxLength={100} className={field} /></label></div>
          <label className="mt-5 block font-semibold text-slate-800">Adresse email<input name="email" type="email" required autoComplete="email" maxLength={254} className={field} /></label>
          <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" maxLength={200} /></label></div>
          <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed text-slate-700"><input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-[#515792]" />{consent}</label>
          </>}
          <button type="submit" disabled={status === "loading" || mode === "subscribe" && !available} className={button}>{status === "loading" ? "Enregistrement…" : mode === "confirm" ? "Je confirme mon inscription aux Nouvelles de la Boussole" : mode === "unsubscribe" ? "Me désinscrire des Nouvelles de la Boussole" : "M’inscrire aux Nouvelles de la Boussole"}</button>
        </fieldset>}
        <p role="status" aria-live="polite" className="mt-4 leading-relaxed text-slate-700">{messages[status] || (mode === "subscribe" && !available ? "Les inscriptions seront bientôt disponibles. Aucun email n’est envoyé pour le moment." : "")}</p>
      </form>
      {mode === "subscribe" && <p className="mt-5 text-sm leading-relaxed text-slate-500">Memoways conserve votre demande et sa confirmation pour ce seul abonnement. Plunk assure la diffusion. <a href="https://memoways.com/politique-de-confidentialite" className="underline">Protection des données</a>. Les adresses exclues de la diffusion restent exclues.</p>}
    </div>
    <p className="mt-6 text-sm text-slate-600">{mode === "subscribe" ? <a href="https://memoways.com/newsletter" className="underline">Découvrir séparément la newsletter Memoways</a> : <Link href="/nouvelles" className="underline">Revenir aux Nouvelles de la Boussole</Link>}</p>
  </div></section>;
}

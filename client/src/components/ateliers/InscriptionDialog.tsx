/**
 * Inscription à un atelier : formulaire en dialog, enregistré dans la base Notion « Inscriptions ateliers Boussole »
 * par l’API. Le succès n’annonce aucun e-mail : la personne est invitée à noter la date elle-même.
 */
import { useState, type FormEvent } from "react";
import { Check, CircleAlert, Loader2, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAtelierDate, registerForAtelier, type Atelier, type InscriptionFailure } from "@/lib/ateliersApi";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName = "prenom" | "nom" | "email" | "structure" | "consentement";
type Status = "idle" | "sending" | "success";

const FAILURE_MESSAGES: Record<InscriptionFailure, string> = {
  duplicate: "Cette adresse e-mail est déjà inscrite à cet atelier.",
  full: "Cet atelier vient de se compléter : les inscriptions sont fermées.",
  closed: "Les inscriptions à cet atelier sont closes.",
  not_found: "Cet atelier n’est plus disponible.",
  invalid: "Certaines informations ne sont pas valides. Vérifiez le formulaire.",
  rate_limited: "Trop de tentatives. Réessayez dans quelques minutes.",
  unavailable: "L’inscription n’a pas abouti. Vos informations sont conservées : vous pouvez réessayer.",
};

const FIELD_IDS: Record<FieldName, string> = {
  prenom: "inscription-prenom",
  nom: "inscription-nom",
  email: "inscription-email",
  structure: "inscription-structure",
  consentement: "inscription-consentement",
};

const inputClass = "h-11 text-base md:text-base";

type Props = {
  atelier: Atelier;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Appelé après une inscription ou lorsque l’état de l’atelier a changé (complet, clos). */
  onChanged: () => void;
};

function InscriptionForm({ atelier, onClose, onChanged }: { atelier: Atelier; onClose: () => void; onChanged: () => void }) {
  const [values, setValues] = useState({ prenom: "", nom: "", email: "", structure: "", remarque: "" });
  const [consentement, setConsentement] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [failure, setFailure] = useState<InscriptionFailure | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const setValue = (name: keyof typeof values) => (event: { target: { value: string } }) => {
    setValues((previous) => ({ ...previous, [name]: event.target.value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setFailure(null);
  };

  const validate = () => {
    const next: Partial<Record<FieldName, string>> = {};
    if (!values.prenom.trim()) next.prenom = "Indiquez votre prénom.";
    if (!values.nom.trim()) next.nom = "Indiquez votre nom.";
    if (!values.email.trim()) next.email = "Indiquez votre adresse e-mail.";
    else if (!EMAIL_PATTERN.test(values.email.trim())) next.email = "Cette adresse e-mail ne semble pas valide.";
    if (!values.structure.trim()) next.structure = "Indiquez votre structure (ou « Indépendant·e »).";
    if (!consentement) next.consentement = "Votre accord est nécessaire pour enregistrer l’inscription.";
    return next;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;
    const next = validate();
    setErrors(next);
    const order: FieldName[] = ["prenom", "nom", "email", "structure", "consentement"];
    const firstInvalid = order.find((name) => next[name]);
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }
    setStatus("sending");
    setFailure(null);
    const result = await registerForAtelier(atelier.id, {
      prenom: values.prenom.trim(),
      nom: values.nom.trim(),
      email: values.email.trim(),
      structure: values.structure.trim(),
      ...(values.remarque.trim() ? { remarque: values.remarque.trim() } : {}),
      consentement: true,
      website,
    });
    if (result.ok) {
      setStatus("success");
      onChanged();
      return;
    }
    setStatus("idle");
    setFailure(result.reason);
    if (result.reason === "duplicate") {
      setErrors({ email: FAILURE_MESSAGES.duplicate });
      document.getElementById(FIELD_IDS.email)?.focus();
    }
    if (result.reason === "full" || result.reason === "closed" || result.reason === "not_found") onChanged();
  };

  if (status === "success") {
    return (
      <div role="status" className="space-y-4 text-center">
        <Check className="mx-auto h-10 w-10 text-emerald-700" aria-hidden="true" />
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-2xl">Inscription enregistrée</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-slate-700">
            Votre place est notée pour « {atelier.titre} » : {formatAtelierDate(atelier)}. Aucun e-mail n’est envoyé automatiquement : pensez à garder cette date.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#515792] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#434879] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#515792]">
            Fermer
          </button>
        </DialogFooter>
      </div>
    );
  }

  const busy = status === "sending";
  const describedBy = (name: FieldName) => (errors[name] ? `${FIELD_IDS[name]}-erreur` : undefined);
  const fieldError = (name: FieldName) => errors[name] && (
    <p id={`${FIELD_IDS[name]}-erreur`} className="mt-1 text-sm font-semibold text-red-800">{errors[name]}</p>
  );

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <DialogHeader>
        <DialogTitle className="text-xl leading-snug">S’inscrire à l’atelier</DialogTitle>
        <DialogDescription className="leading-relaxed text-slate-700">
          {atelier.titre} — {formatAtelierDate(atelier)}. Tous les champs sont obligatoires, sauf la remarque.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor={FIELD_IDS.prenom} className="mb-1.5 text-sm font-semibold text-slate-900">Prénom</Label>
          <Input id={FIELD_IDS.prenom} className={inputClass} autoComplete="given-name" value={values.prenom} onChange={setValue("prenom")} maxLength={100} aria-required="true" aria-invalid={errors.prenom ? true : undefined} aria-describedby={describedBy("prenom")} />
          {fieldError("prenom")}
        </div>
        <div>
          <Label htmlFor={FIELD_IDS.nom} className="mb-1.5 text-sm font-semibold text-slate-900">Nom</Label>
          <Input id={FIELD_IDS.nom} className={inputClass} autoComplete="family-name" value={values.nom} onChange={setValue("nom")} maxLength={100} aria-required="true" aria-invalid={errors.nom ? true : undefined} aria-describedby={describedBy("nom")} />
          {fieldError("nom")}
        </div>
      </div>

      <div>
        <Label htmlFor={FIELD_IDS.email} className="mb-1.5 text-sm font-semibold text-slate-900">Adresse e-mail</Label>
        <Input id={FIELD_IDS.email} className={inputClass} type="email" inputMode="email" autoComplete="email" value={values.email} onChange={setValue("email")} maxLength={320} aria-required="true" aria-invalid={errors.email ? true : undefined} aria-describedby={describedBy("email")} />
        {fieldError("email")}
      </div>

      <div>
        <Label htmlFor={FIELD_IDS.structure} className="mb-1.5 text-sm font-semibold text-slate-900">Structure</Label>
        <Input id={FIELD_IDS.structure} className={inputClass} autoComplete="organization" value={values.structure} onChange={setValue("structure")} maxLength={200} aria-required="true" aria-invalid={errors.structure ? true : undefined} aria-describedby={describedBy("structure")} />
        {fieldError("structure")}
      </div>

      <div>
        <Label htmlFor="inscription-remarque" className="mb-1.5 text-sm font-semibold text-slate-900">Remarque <span className="font-normal text-slate-600">(facultatif)</span></Label>
        <textarea
          id="inscription-remarque"
          value={values.remarque}
          onChange={setValue("remarque")}
          maxLength={1000}
          rows={3}
          className="w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-base text-slate-900 outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <Checkbox
            id={FIELD_IDS.consentement}
            checked={consentement}
            onCheckedChange={(checked) => { setConsentement(checked === true); setErrors((previous) => ({ ...previous, consentement: undefined })); }}
            aria-required="true"
            aria-invalid={errors.consentement ? true : undefined}
            aria-describedby={describedBy("consentement")}
            className="mt-1 size-6"
          />
          <Label htmlFor={FIELD_IDS.consentement} className="block min-h-11 cursor-pointer py-1 text-sm font-normal leading-relaxed text-slate-800">
            J’accepte que ces informations soient enregistrées pour organiser cet atelier.
          </Label>
        </div>
        {fieldError("consentement")}
      </div>

      {/* Champ caché anti-robots : les personnes ne le voient ni ne le remplissent. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Ne pas remplir<input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
      </div>

      {failure && failure !== "duplicate" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-900">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {FAILURE_MESSAGES[failure]}
        </div>
      )}

      <DialogFooter className="gap-3 sm:items-center">
        <button type="button" onClick={onClose} disabled={busy} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#515792] disabled:opacity-60">
          Annuler
        </button>
        <button type="submit" disabled={busy} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#E07428] px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#c9651f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E07428] disabled:opacity-70">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
          {busy ? "Envoi en cours…" : "Valider mon inscription"}
        </button>
      </DialogFooter>
    </form>
  );
}

export default function InscriptionDialog({ atelier, open, onOpenChange, onChanged }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Le formulaire n’existe que dialog ouvert : chaque ouverture repart d’un formulaire vide. */}
      <DialogContent showCloseButton={false} className="max-h-[92dvh] overflow-y-auto">
        <InscriptionForm atelier={atelier} onClose={() => onOpenChange(false)} onChanged={onChanged} />
      </DialogContent>
    </Dialog>
  );
}

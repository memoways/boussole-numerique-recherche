/**
 * Console partenaire — panneaux fonctionnels, sobres et tactiles pour le pilote.
 * Elle rend visibles les actions réversibles sans promettre un envoi e-mail avant l’activation de Dreamlit.
 */
import { useCallback, useEffect, useState } from "react";
import { Ban, Copy, Download, Loader2, LogIn, LogOut, MailCheck, Plus, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasPartnerApi, partnerApi, PARTNER_API_URL } from "@/lib/partnerApi";

type Overview = {
  organizations: Array<{ id: string; name: string; status: string }>;
  contacts: Array<{ id: string; first_name: string; last_name: string; email: string; organization_id: string; organization_name: string }>;
  invitationRequests: Array<{ id: string; organization_name: string; first_name: string; last_name: string; email: string; status: string; created_at: string }>;
  responses: Array<{ id: string; status: string; submitted_at: string | null; organization_name: string; email: string }>;
  recapOutbox: Array<{ id: string; response_id: string; recipient_email: string; recipient_name: string; organization_name: string; subject: string; summary_text: string; created_at: string; updated_at: string; regenerated_at: string | null; regeneration_count: number }>;
  interests: Array<{ id: string; first_name: string | null; email: string; audience: "artist" | "digital_interest"; workshop_interest: boolean; notification_interest: boolean; status: "active" | "withdrawn"; created_at: string }>;
  invitations: Array<{ id: string; status: "active" | "revoked" | "expired" | "completed"; expiresAt: string; createdAt: string; revokedAt: string | null; contactId: string; firstName: string; lastName: string; email: string; organizationName: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-2xl bg-white p-6 shadow-sm ${className}`}>{children}</section>;
}

export default function PartnerAdmin() {
  const [credentials, setCredentials] = useState({ email: "ulrich.fischer@memoways.com", password: "" });
  const [overview, setOverview] = useState<Overview | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [contact, setContact] = useState({ organizationId: "", firstName: "", lastName: "", email: "" });
  const [regeneratingResponseId, setRegeneratingResponseId] = useState<string | null>(null);
  const [revokingInvitationId, setRevokingInvitationId] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const refresh = useCallback(async () => {
    const data = await partnerApi<Overview>("/api/admin/overview");
    setOverview(data);
  }, []);

  useEffect(() => {
    let active = true;
    void refresh().catch(() => undefined).finally(() => {
      if (active) setCheckingSession(false);
    });
    return () => { active = false; };
  }, [refresh]);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(""); setStatus("Connexion…");
    try {
      await partnerApi("/api/admin/login", { method: "POST", body: JSON.stringify(credentials) });
      await refresh(); setStatus("");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Connexion impossible."); setStatus("");
    }
  };

  const createOrganization = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!organizationName) return;
    setError("");
    try {
      await partnerApi("/api/admin/organizations", { method: "POST", body: JSON.stringify({ name: organizationName, status: "candidate" }) });
      setOrganizationName(""); await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Organisation impossible à créer.");
    }
  };

  const createContact = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contact.organizationId) return;
    setError("");
    try {
      await partnerApi("/api/admin/contacts", { method: "POST", body: JSON.stringify(contact) });
      setContact({ organizationId: "", firstName: "", lastName: "", email: "" }); await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Contact impossible à créer.");
    }
  };

  const issueInvitation = async (contactId: string) => {
    setError("");
    try {
      const result = await partnerApi<{ invitationUrl: string }>("/api/admin/invitations", { method: "POST", body: JSON.stringify({ contactId, expiresInDays: 45 }) });
      await navigator.clipboard.writeText(result.invitationUrl).catch(() => undefined);
      setStatus("Lien personnel copié dans le presse-papiers. Il peut être transmis manuellement tant que l’e-mail transactionnel n’est pas actif.");
      await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Invitation impossible à générer.");
    }
  };

  const approveRequest = async (id: string) => {
    setError("");
    try {
      const result = await partnerApi<{ invitationUrl: string }>(`/api/admin/invitation-requests/${id}/approve`, { method: "POST", body: JSON.stringify({ expiresInDays: 45 }) });
      await navigator.clipboard.writeText(result.invitationUrl).catch(() => undefined);
      setStatus("Demande approuvée : le lien personnel est copié dans le presse-papiers.");
      await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Approbation impossible.");
    }
  };

  const regenerateRecap = async (responseId: string, recipientName: string) => {
    if (!window.confirm(`Régénérer le récapitulatif destiné à ${recipientName} ? La boîte d’envoi sera actualisée pour le workflow e-mail lorsqu’il sera activé.`)) return;
    setError(""); setStatus(""); setRegeneratingResponseId(responseId);
    try {
      await partnerApi(`/api/admin/responses/${responseId}/regenerate-recap`, { method: "POST" });
      setStatus(`Le récapitulatif de ${recipientName} a été régénéré dans la boîte d’envoi.`);
      await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Récapitulatif impossible à régénérer.");
    } finally {
      setRegeneratingResponseId(null);
    }
  };

  const revokeInvitation = async (invitation: Overview["invitations"][number]) => {
    if (!window.confirm(`Révoquer le lien personnel de ${invitation.firstName} ${invitation.lastName} ? Il ne permettra plus d’ouvrir ou de modifier le questionnaire.`)) return;
    setError(""); setStatus(""); setRevokingInvitationId(invitation.id);
    try {
      await partnerApi(`/api/admin/invitations/${invitation.id}/revoke`, { method: "POST" });
      setStatus(`L’invitation de ${invitation.firstName} ${invitation.lastName} est révoquée.`);
      await refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Invitation impossible à révoquer.");
    } finally {
      setRevokingInvitationId(null);
    }
  };

  const logout = async () => {
    await partnerApi("/api/admin/logout", { method: "POST" }).catch(() => undefined);
    setOverview(null); setCheckingSession(false);
  };

  if (!hasPartnerApi()) {
    return <div className="mx-auto max-w-3xl px-4 py-12"><Panel className="relative overflow-hidden border border-[#515792]/20 bg-[#f5f6fb]"><div className="absolute inset-y-0 left-0 w-1.5 bg-[#515792]" aria-hidden="true" /><div className="flex items-start gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#515792] text-white"><ShieldCheck className="h-6 w-6" /></span><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#515792]">Statut · API non reliée</p><h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Administration partenaire</h1><p className="mt-3 leading-relaxed text-slate-600">Cette vue correspond à un environnement sans API configurée. Lorsque l’API est disponible, la console affiche les indicateurs de pilote, les invitations, les réponses et les exports.</p></div></div><div className="mt-6 grid gap-px border border-[#515792]/15 bg-[#515792]/15 sm:grid-cols-3"><p className="bg-white px-4 py-3 font-mono text-xs font-bold text-[#515792]">01 · INVITATIONS</p><p className="bg-white px-4 py-3 font-mono text-xs font-bold text-[#3a7fc1]">02 · RÉPONSES</p><p className="bg-white px-4 py-3 font-mono text-xs font-bold text-[#3aab8a]">03 · EXPORTS</p></div></Panel></div>;
  }
  if (checkingSession) return <div className="mx-auto flex max-w-md items-center gap-3 px-4 py-12 text-sm text-slate-600"><Loader2 className="h-5 w-5 animate-spin text-[#515792]" /> Vérification de la session administrateur…</div>;
  if (!overview) {
    return <div className="mx-auto max-w-md px-4 py-12"><form onSubmit={login} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><ShieldCheck className="h-9 w-9 text-[#515792]" /><h1 className="mt-4 text-2xl font-bold text-slate-950">Administration partenaire</h1><p className="mt-2 text-sm leading-relaxed text-slate-600">Gérez les organisations, invitations, réponses et exports.</p><label className="mt-6 block text-sm font-semibold text-slate-800">E-mail<input type="email" value={credentials.email} onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold text-slate-800">Mot de passe<input type="password" required value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal" /></label>{error && <p className="mt-4 text-sm text-red-700">{error}</p>}<Button className="mt-6" type="submit" style={{ backgroundColor: "#515792", color: "#fff" }} disabled={Boolean(status)}>{status ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}Se connecter</Button></form></div>;
  }

  const activeInvitations = overview.invitations.filter((invitation) => invitation.status === "active");

  return <div className="bg-slate-50 px-4 py-10"><section className="mx-auto max-w-6xl">
    <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#515792]">Pilote · espace réservé</p><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Administration partenaire</h1></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={() => window.open(`${PARTNER_API_URL}/api/admin/export.csv`, "_blank")}><Download className="mr-2 h-4 w-4" /> Réponses CSV</Button><Button variant="outline" onClick={() => window.open(`${PARTNER_API_URL}/api/admin/interests.csv`, "_blank")}><Download className="mr-2 h-4 w-4" /> Intérêts CSV</Button><Button variant="outline" onClick={logout}><LogOut className="mr-2 h-4 w-4" /> Déconnexion</Button></div></div>
    {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}{status && <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{status}</p>}
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {[{ label: "Organisations", value: overview.organizations.length }, { label: "Demandes en attente", value: overview.invitationRequests.filter((request) => request.status === "pending").length }, { label: "Questionnaires soumis", value: overview.responses.filter((response) => response.status === "submitted").length }, { label: "Intérêts reçus", value: overview.interests.filter((interest) => interest.status === "active").length }].map((stat, index) => <Panel key={stat.label} className="p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-slate-500">0{index + 1} · {stat.label}</p><p className="mt-1 font-mono text-3xl font-bold text-slate-950">{stat.value}</p></Panel>)}
      <Panel className="border border-[#3aab8a]/20 bg-[#3aab8a]/5 p-5"><p className="font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-[#14755d]">05 · Récapitulatifs prêts</p><p className="mt-1 font-mono text-3xl font-bold text-[#14755d]">{overview.recapOutbox.length}</p></Panel>
    </div>
    <div className="mt-8 grid gap-6 lg:grid-cols-2"><Panel><form onSubmit={createOrganization}><h2 className="font-bold text-slate-950">Ajouter une organisation</h2><input required value={organizationName} onChange={(event) => setOrganizationName(event.target.value)} placeholder="Nom de l’organisation" className="mt-4 w-full rounded-xl border border-slate-200 p-3" /><Button type="submit" className="mt-3" style={{ backgroundColor: "#515792", color: "#fff" }}><Plus className="mr-2 h-4 w-4" /> Ajouter</Button></form></Panel><Panel><form onSubmit={createContact}><h2 className="font-bold text-slate-950">Ajouter un contact</h2><select required value={contact.organizationId} onChange={(event) => setContact({ ...contact, organizationId: event.target.value })} className="mt-4 w-full rounded-xl border border-slate-200 p-3"><option value="">Choisir une organisation</option>{overview.organizations.map((organization) => <option key={organization.id} value={organization.id}>{organization.name}</option>)}</select><div className="mt-3 grid gap-3 sm:grid-cols-2"><input required value={contact.firstName} onChange={(event) => setContact({ ...contact, firstName: event.target.value })} placeholder="Prénom" className="rounded-xl border border-slate-200 p-3" /><input required value={contact.lastName} onChange={(event) => setContact({ ...contact, lastName: event.target.value })} placeholder="Nom" className="rounded-xl border border-slate-200 p-3" /></div><input required type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="E-mail" className="mt-3 w-full rounded-xl border border-slate-200 p-3" /><Button type="submit" className="mt-3" style={{ backgroundColor: "#515792", color: "#fff" }}><Plus className="mr-2 h-4 w-4" /> Ajouter</Button></form></Panel></div>
    <Panel className="mt-8"><h2 className="font-bold text-slate-950">Manifestations d’intérêt</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">Les personnes ont choisi séparément un intérêt pour les ateliers et/ou une notification à l’ouverture. Elles peuvent retirer leur consentement en écrivant à l’équipe de projet.</p><div className="mt-4 space-y-3">{overview.interests.map((interest) => <div key={interest.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"><p className="text-sm text-slate-700"><strong>{interest.first_name || "Personne intéressée"}</strong><span className="block text-slate-500">{interest.email} — {interest.audience === "artist" ? "Artiste" : "Enjeux numériques"}</span></p><span className="text-xs text-slate-500">{interest.workshop_interest ? "Atelier" : ""}{interest.workshop_interest && interest.notification_interest ? " · " : ""}{interest.notification_interest ? "Notification" : ""}</span></div>)}{!overview.interests.length && <p className="text-sm text-slate-500">Aucune manifestation d’intérêt enregistrée.</p>}</div></Panel>
    <Panel className="mt-8"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="font-bold text-slate-950">Récapitulatifs préparés</h2><p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">Chaque ligne est prête pour le workflow transactionnel. Le statut de livraison apparaîtra dans Dreamlit lorsque son intégration sera activée.</p></div><MailCheck className="h-6 w-6 text-[#3aab8a]" /></div>{overview.recapOutbox.length ? <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500"><tr><th className="pb-3 pr-4 font-semibold">Destinataire</th><th className="pb-3 pr-4 font-semibold">Organisation</th><th className="pb-3 pr-4 font-semibold">Créé le</th><th className="pb-3 pr-4 font-semibold">Version</th><th className="pb-3 text-right font-semibold">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{overview.recapOutbox.map((recap) => <tr key={recap.id} className="align-top"><td className="py-4 pr-4 text-slate-700"><strong>{recap.recipient_name}</strong><span className="mt-0.5 block text-slate-500">{recap.recipient_email}</span><details className="mt-2 max-w-md"><summary className="cursor-pointer text-xs font-semibold text-[#515792]">Voir le récapitulatif préparé</summary><p className="mt-2 whitespace-pre-line rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">{recap.summary_text}</p></details></td><td className="py-4 pr-4 text-slate-700">{recap.organization_name}</td><td className="py-4 pr-4 text-slate-600">{formatDate(recap.created_at)}</td><td className="py-4 pr-4 text-slate-600">{recap.regeneration_count ? `${recap.regeneration_count} régénération${recap.regeneration_count > 1 ? "s" : ""}` : "Version initiale"}{recap.regenerated_at && <span className="mt-0.5 block text-xs text-slate-500">{formatDate(recap.regenerated_at)}</span>}</td><td className="py-4 text-right"><Button size="sm" variant="outline" disabled={regeneratingResponseId === recap.response_id} onClick={() => regenerateRecap(recap.response_id, recap.recipient_name)}>{regeneratingResponseId === recap.response_id ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="mr-2 h-3.5 w-3.5" />}Régénérer</Button></td></tr>)}</tbody></table></div> : <p className="mt-4 text-sm text-slate-500">Aucun récapitulatif n’est encore prêt. Une ligne apparaît après chaque questionnaire soumis.</p>}</Panel>
    <Panel className="mt-8"><h2 className="font-bold text-slate-950">Demandes d’invitation</h2><div className="mt-4 space-y-3">{overview.invitationRequests.filter((request) => request.status === "pending").map((request) => <div key={request.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"><p className="text-sm text-slate-700"><strong>{request.organization_name}</strong> — {request.first_name} {request.last_name}, {request.email}</p><Button size="sm" onClick={() => approveRequest(request.id)} style={{ backgroundColor: "#E07428", color: "#fff" }}><Send className="mr-2 h-3.5 w-3.5" /> Approuver</Button></div>)}{!overview.invitationRequests.some((request) => request.status === "pending") && <p className="mt-4 text-sm text-slate-500">Aucune demande en attente.</p>}</div></Panel>
    <Panel className="mt-8"><h2 className="font-bold text-slate-950">Invitations actives</h2><p className="mt-1 text-sm leading-relaxed text-slate-600">Une révocation rend immédiatement le lien personnel inutilisable. Elle ne supprime pas les données déjà soumises.</p><div className="mt-4 space-y-3">{activeInvitations.map((invitation) => <div key={invitation.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 p-4"><p className="text-sm text-slate-700"><strong>{invitation.firstName} {invitation.lastName}</strong><span className="block text-slate-500">{invitation.organizationName} — expire le {formatDate(invitation.expiresAt)}</span></p><Button size="sm" variant="outline" disabled={revokingInvitationId === invitation.id} onClick={() => revokeInvitation(invitation)}>{revokingInvitationId === invitation.id ? <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" /> : <Ban className="mr-2 h-3.5 w-3.5" />}Révoquer</Button></div>)}{!activeInvitations.length && <p className="mt-4 text-sm text-slate-500">Aucune invitation active.</p>}</div></Panel>
    <Panel className="mt-8"><h2 className="font-bold text-slate-950">Contacts et invitations</h2><div className="mt-4 divide-y divide-slate-100">{overview.contacts.map((person) => <div key={person.id} className="flex flex-wrap items-center justify-between gap-3 py-4"><p className="text-sm text-slate-700"><strong>{person.first_name} {person.last_name}</strong><span className="block text-slate-500">{person.organization_name} — {person.email}</span></p><Button size="sm" variant="outline" onClick={() => issueInvitation(person.id)}><Copy className="mr-2 h-3.5 w-3.5" /> Générer un lien</Button></div>)}</div></Panel>
  </section></div>;
}

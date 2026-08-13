export const PARTNER_API_URL = (import.meta.env.VITE_PARTNER_API_URL ?? "").replace(/\/$/, "");

export function hasPartnerApi() {
  return Boolean(PARTNER_API_URL);
}

export async function partnerApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  if (!PARTNER_API_URL) {
    throw new Error("Le service de questionnaire n’est pas encore configuré pour cet environnement.");
  }
  const response = await fetch(`${PARTNER_API_URL}${path}`, {
    credentials: "include",
    headers: options.body instanceof FormData || options.body instanceof Blob
      ? options.headers
      : { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error ?? "Le service partenaire n’a pas pu traiter votre demande.");
  }
  return payload as T;
}

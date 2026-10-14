/**
 * Transcription française via Deepgram nova-3.
 * L’audio ne transite qu’en mémoire : il n’est ni journalisé ni stocké.
 */
export class TranscriptionError extends Error {
  constructor(readonly status: number) {
    super(`Deepgram transcription failed (${status})`);
  }
}

export async function transcribeAudio(apiKey: string, audio: Buffer, contentType: string): Promise<string> {
  const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&language=fr", {
    method: "POST",
    headers: { Authorization: `Token ${apiKey}`, "Content-Type": contentType },
    body: audio,
  });
  if (!response.ok) throw new TranscriptionError(response.status);
  const payload = await response.json() as { results?: { channels?: Array<{ alternatives?: Array<{ transcript?: string }> }> } };
  return payload.results?.channels?.[0]?.alternatives?.[0]?.transcript?.trim() ?? "";
}

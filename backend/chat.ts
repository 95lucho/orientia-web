export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function validateMessages(body: unknown): Message[] {
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 24) {
    throw new Error('Envía entre 1 y 24 mensajes. Reinicia la conversación si supera ese límite.');
  }
  let total = 0;
  const result = messages.map((message) => {
    if (!message || !['user', 'assistant'].includes(message.role) || typeof message.content !== 'string') {
      throw new Error('Cada mensaje debe contener un rol válido y un texto.');
    }
    const content = message.content.trim();
    const maxLength = message.role === 'user' ? 4000 : 8000;
    if (!content || content.length > maxLength) {
      throw new Error(`Cada consulta admite hasta 4000 caracteres y cada respuesta hasta 8000; no se aceptan textos vacíos.`);
    }
    total += content.length;
    return { role: message.role, content } as Message;
  });
  if (total > 24000) throw new Error('La conversación supera los 24000 caracteres. Reiníciala para continuar.');
  if (result.at(-1)?.role !== 'user') throw new Error('El último mensaje debe ser una consulta del estudiante.');
  return result;
}

export function toGeminiContents(messages: Message[]) {
  const start = messages.findIndex((message) => message.role === 'user');
  const contents: { role: 'user' | 'model'; parts: { text: string }[] }[] = [];
  for (const message of messages.slice(start)) {
    const role = message.role === 'assistant' ? 'model' : 'user';
    const previous = contents.at(-1);
    if (previous?.role === role) previous.parts.push({ text: message.content });
    else contents.push({ role, parts: [{ text: message.content }] });
  }
  return contents;
}

// Per-process safeguards. No conversation text is retained here.
export function createChatLimits({ perMinute = 12, perDay = 200, concurrent = 4, maxClients = 10000 } = {}) {
  const clients = new Map<string, { start: number; count: number }>();
  let day = -1;
  let daily = 0;
  let active = 0;
  return {
    acquire(client: string, now = Date.now()) {
      for (const [key, entry] of clients) if (now - entry.start >= 60000) clients.delete(key);
      const today = Math.floor(now / 86400000);
      if (today !== day) { day = today; daily = 0; }
      const entry = clients.get(client);
      if ((entry?.count || 0) >= perMinute) {
        return { ok: false as const, retryAfter: Math.max(1, Math.ceil((60000 - (now - entry!.start)) / 1000)) };
      }
      if (daily >= perDay) return { ok: false as const, retryAfter: Math.ceil(((day + 1) * 86400000 - now) / 1000) };
      if (active >= concurrent || (!entry && clients.size >= maxClients)) return { ok: false as const, retryAfter: 10 };
      clients.set(client, { start: entry?.start ?? now, count: (entry?.count || 0) + 1 });
      daily++;
      active++;
      let released = false;
      return {
        ok: true as const,
        release() { if (!released) { active--; released = true; } },
      };
    },
  };
}

export type GeminiFailure = 'authentication' | 'model-unavailable' | 'quota' | 'timeout' | 'empty-response' | 'provider-unavailable';

export function shouldRetryGemini(error: unknown): boolean {
  const e = error as { status?: number; name?: string; message?: string; error?: { details?: unknown }; details?: unknown };
  if ([400, 401, 403, 404].includes(e?.status || 0)) return false;
  let details = '';
  try { details = JSON.stringify(e?.error?.details || e?.details || []); } catch {}
  const text = `${e?.message || ''} ${details}`.toLowerCase();
  // A quota response may ask for a longer wait. Return the local answer rather
  // than retrying early or keeping an HTTP request open for that entire wait.
  if (e?.status === 429) return false;
  return [408, 500, 502, 503, 504].includes(e?.status || 0) ||
    ['TimeoutError', 'AbortError'].includes(e?.name || '') ||
    /econnreset|etimedout|fetch failed|timeout/.test(text);
}

export function failureReason(error: unknown): GeminiFailure {
  const e = error as { status?: number; code?: number; name?: string };
  if (e?.status === 401 || e?.status === 403) return 'authentication';
  if (e?.status === 404) return 'model-unavailable';
  if (e?.status === 429) return 'quota';
  if (e?.name === 'TimeoutError' || e?.name === 'AbortError') return 'timeout';
  if (e?.name === 'EmptyResponseError') return 'empty-response';
  return 'provider-unavailable';
}

// Inject the SDK call to test error paths without credentials or network calls.
export async function requestGemini({ generate, recoverable, signal, timeoutMs = 10000, retryDelayMs = 1000 }: {
  generate: (signal: AbortSignal) => Promise<{ text?: string }>;
  recoverable: (error: unknown) => boolean;
  signal: AbortSignal;
  timeoutMs?: number;
  retryDelayMs?: number;
}): Promise<{ reply: string } | { reason: GeminiFailure }> {
  let reason: GeminiFailure = 'provider-unavailable';
  for (let attempt = 0; attempt < 2; attempt++) {
    signal.throwIfAborted();
    const timeout = AbortSignal.timeout(timeoutMs);
    const combined = AbortSignal.any([signal, timeout]);
    let onAbort: () => void;
    try {
      const aborted = new Promise<never>((_, reject) => {
        onAbort = () => reject(combined.reason);
        combined.addEventListener('abort', onAbort, { once: true });
      });
      const response = await Promise.race([generate(combined), aborted]);
      if (!response.text?.trim()) {
        const error = new Error('Empty model response');
        error.name = 'EmptyResponseError';
        throw error;
      }
      return { reply: response.text.trim().slice(0, 8000) };
    } catch (error) {
      signal.throwIfAborted();
      reason = failureReason(error);
      if (!recoverable(error) || attempt === 1) break;
      // Abortable backoff; never continue work after the client disconnects.
      await new Promise<void>((resolve, reject) => {
        const cancel = () => { clearTimeout(timer); reject(signal.reason); };
        const timer = setTimeout(() => { signal.removeEventListener('abort', cancel); resolve(); }, retryDelayMs);
        signal.addEventListener('abort', cancel, { once: true });
      });
    } finally {
      combined.removeEventListener('abort', onAbort!);
    }
  }
  return { reason };
}

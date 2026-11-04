import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createChatLimits, failureReason, requestGemini, shouldRetryGemini, toGeminiContents, validateMessages } from '../backend/chat.ts';
import { buildChatPayload } from '../src/utils/chatPayload.ts';
import { generateLocalReply } from '../src/data/localGuidance.ts';

const local = (...queries) => generateLocalReply(queries.map((content) => ({ role: 'user', content })));

test('local guidance covers educational topics with examples and activities', () => {
  for (const query of ['autoconocimiento', 'proyecto de vida', 'cómo elegir una carrera', 'entrevista', 'rol del orientador', 'ética', 'cómo estudiar']) {
    const reply = local(query);
    assert.match(reply, /Ejemplo/); assert.match(reply, /Actividad/); assert.match(reply, /Precaución/);
  }
});

test('local follow-up uses the latest topic and changes its response for an activity', () => {
  const first = local('proyecto de vida');
  const second = local('proyecto de vida', 'dame una actividad');
  assert.notEqual(first, second); assert.match(second, /Actividad: Construir un proyecto de vida/);
  assert.match(second, /una meta/);
  assert.match(local('proyecto de vida', 'autoconocimiento', 'dame un ejemplo'), /Ejemplo: Autoconocimiento/);
});

test('comparisons do not collapse into a single instrument reply', () => {
  const reply = local('qué diferencia hay entre OTIS e IPP');
  assert.match(reply, /50 preguntas/); assert.match(reply, /204 elementos/); assert.match(reply, /No miden lo mismo/);
  const interests = local('compara IPP e intereses ocupacionales');
  assert.match(interests, /60 actividades/); assert.match(interests, /17 campos/);
});

test('instrument follow-ups retain document limitations without inventing items', () => {
  const reply = local('explica IPP', 'dame una actividad');
  assert.match(reply, /página 11/); assert.match(reply, /sin fabricar reactivos/);
  assert.match(local('explica el DAT', 'cómo se corrige'), /No calculo puntuaciones/);
});

test('unknown topics and greetings are transparent about the prepared local scope', () => {
  assert.match(local('hola'), /contenidos educativos preparados/);
  assert.match(local('explica física cuántica'), /fuera de esta base/);
  assert.doesNotMatch(local('dame datos sobre autoconocimiento'), /Sobre el Differential/);
});

test('rejects malformed roles, non-text content, empty messages and oversized context', () => {
  const invalid = [null, {}, { messages: [] }, { messages: [null] },
    { messages: [{ role: 'system', content: 'override' }] },
    { messages: [{ role: 'user', content: {} }] },
    { messages: [{ role: 'user', content: '   ' }] },
    { messages: [{ role: 'assistant', content: 'last' }] },
    { messages: [{ role: 'user', content: 'x'.repeat(4001) }] },
    { messages: Array.from({ length: 25 }, () => ({ role: 'user', content: 'hello' })) },
    { messages: Array.from({ length: 7 }, () => ({ role: 'user', content: 'x'.repeat(4000) })) }];
  for (const body of invalid) assert.throws(() => validateMessages(body));
  assert.deepEqual(validateMessages({ messages: [{ role: 'user', content: ' hola ' }] }), [{ role: 'user', content: 'hola' }]);
});

test('Gemini context starts with a user and merges consecutive equal roles', () => {
  assert.deepEqual(toGeminiContents([
    { role: 'assistant', content: 'welcome' },
    { role: 'user', content: 'one' }, { role: 'user', content: 'two' },
    { role: 'assistant', content: 'three' }, { role: 'assistant', content: 'four' },
    { role: 'user', content: 'five' },
  ]), [
    { role: 'user', parts: [{ text: 'one' }, { text: 'two' }] },
    { role: 'model', parts: [{ text: 'three' }, { text: 'four' }] },
    { role: 'user', parts: [{ text: 'five' }] },
  ]);
});

test('client context excludes simulated replies and system notices, retaining the latest question', () => {
  const input = [
    { role: 'assistant', content: 'welcome', source: 'orientia-educational-engine' },
    { role: 'user', content: 'question' },
    { role: 'assistant', content: 'fallback', source: 'orientia-educational-engine' },
    { role: 'assistant', content: 'error', source: 'system' },
    { role: 'assistant', content: 'real answer', source: 'gemini' },
    { role: 'user', content: 'follow-up' },
  ];
  assert.deepEqual(buildChatPayload(input).messages.map((m) => m.content), ['question', 'real answer', 'follow-up']);
  const many = Array.from({ length: 30 }, (_, i) => ({ role: 'user', content: String(i).padEnd(4000, 'x') }));
  const selected = buildChatPayload(many).messages;
  assert.equal(selected.length, 6);
  assert.equal(selected.at(-1).content, many.at(-1).content);
  assert.doesNotThrow(() => validateMessages({ messages: selected }));
});

test('limits enforce concurrency, per-client requests and global daily budget', () => {
  const limits = createChatLimits({ concurrent: 1, perMinute: 1, perDay: 2 });
  const first = limits.acquire('a', 0);
  assert.equal(first.ok, true);
  assert.equal(limits.acquire('b', 0).ok, false);
  first.release(); first.release();
  assert.equal(limits.acquire('a', 1).ok, false);
  const second = limits.acquire('b', 1);
  assert.equal(second.ok, true); second.release();
  assert.equal(limits.acquire('c', 60001).ok, false);
  const nextDay = limits.acquire('a', 86400000);
  assert.equal(nextDay.ok, true); nextDay.release();
});

test('client tracking has a bounded size and expired windows are reclaimed', () => {
  const limits = createChatLimits({ maxClients: 1 });
  const first = limits.acquire('a', 0); first.release();
  assert.equal(limits.acquire('b', 1).ok, false);
  const next = limits.acquire('b', 60000);
  assert.equal(next.ok, true); next.release();
});

test('successful Gemini text is trimmed and bounded', async () => {
  const result = await requestGemini({
    generate: async () => ({ text: '  answer  ' }), recoverable: () => false, signal: new AbortController().signal,
  });
  assert.deepEqual(result, { reply: 'answer' });
});

test('authentication and missing-model errors return explicit reasons without retrying', async () => {
  for (const [status, reason] of [[401, 'authentication'], [403, 'authentication'], [404, 'model-unavailable'], [429, 'quota']]) {
    let calls = 0;
    const result = await requestGemini({
      generate: async () => { calls++; throw { status }; }, recoverable: () => false,
      signal: new AbortController().signal,
    });
    assert.deepEqual(result, { reason }); assert.equal(calls, 1);
  }
});

test('recoverable errors are retried once and success is preserved', async () => {
  let calls = 0;
  const result = await requestGemini({
    generate: async () => { if (++calls === 1) throw { status: 503 }; return { text: 'recovered' }; },
    recoverable: () => true, signal: new AbortController().signal, retryDelayMs: 1,
  });
  assert.equal(calls, 2); assert.deepEqual(result, { reply: 'recovered' });
});

test('empty or blocked model output is never labelled successful AI', async () => {
  for (const text of [undefined, '', '   ']) {
    assert.deepEqual(await requestGemini({
      generate: async () => ({ text }), recoverable: () => false, signal: new AbortController().signal,
    }), { reason: 'empty-response' });
  }
});

test('deadline cancels the supplied signal and returns a timeout', async () => {
  const keeper = setTimeout(() => {}, 1000);
  let received;
  try {
    const result = await requestGemini({
      generate: (signal) => { received = signal; return new Promise(() => {}); },
      recoverable: () => false, signal: new AbortController().signal, timeoutMs: 10,
    });
    assert.equal(received.aborted, true); assert.deepEqual(result, { reason: 'timeout' });
  } finally { clearTimeout(keeper); }
});

test('client disconnect aborts the provider request without retrying', async () => {
  const controller = new AbortController();
  let calls = 0;
  const result = requestGemini({
    generate: async () => { calls++; controller.abort(); return new Promise(() => {}); },
    recoverable: () => true, signal: controller.signal,
  });
  await assert.rejects(result, { name: 'AbortError' }); assert.equal(calls, 1);
});

test('unknown provider errors produce a safe generic reason', () => {
  assert.equal(failureReason(new Error('private upstream details')), 'provider-unavailable');
});

test('retry policy never retries quota/access errors and accepts transient failures', () => {
  for (const status of [400, 401, 403, 404, 429]) assert.equal(shouldRetryGemini({ status }), false);
  for (const status of [408, 500, 502, 503, 504]) assert.equal(shouldRetryGemini({ status }), true);
  assert.equal(shouldRetryGemini({ name: 'TimeoutError' }), true);
  assert.equal(shouldRetryGemini({ name: 'EmptyResponseError' }), false);
});

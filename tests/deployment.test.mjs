import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';

const cwd = fileURLToPath(new URL('../', import.meta.url));
const services = [];
let api;
let frontend;

async function availablePort() {
  const socket = createServer();
  socket.listen(0, '127.0.0.1');
  await once(socket, 'listening');
  const { port } = socket.address();
  await new Promise((resolve, reject) => socket.close((error) => error ? reject(error) : resolve()));
  return port;
}

async function start(args, port, pathname, env = {}) {
  const child = spawn(process.execPath, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  services.push(child);
  let output = '';
  let failure;
  child.on('error', (error) => { failure = error; });
  for (const stream of [child.stdout, child.stderr]) {
    stream.on('data', (data) => { output = (output + data).slice(-8000); });
  }
  const origin = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (failure || child.exitCode !== null) {
      throw new Error(`Service failed: ${failure || output}`);
    }
    try {
      const response = await fetch(origin + pathname, { signal: AbortSignal.timeout(1000) });
      await response.arrayBuffer();
      if (response.ok) return origin;
    } catch {}
    await delay(100);
  }
  throw new Error(`Service did not become ready: ${output}`);
}

before(async () => {
  const apiPort = await availablePort();
  api = await start(['server.ts'], apiPort, '/api/health', {
    NODE_ENV: 'production', PORT: String(apiPort), GEMINI_API_KEY: '',
  });
  const frontendPort = await availablePort();
  frontend = await start([
    'node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1',
    '--port', String(frontendPort), '--strictPort',
  ], frontendPort, '/orientia-web/');
});

after(async () => {
  await Promise.all(services.map(async (child) => {
    if (child.exitCode !== null || child.signalCode !== null) return;
    const exited = once(child, 'exit');
    child.kill('SIGTERM');
    const timer = setTimeout(() => child.kill('SIGKILL'), 2000);
    try { await exited; } finally { clearTimeout(timer); }
  }));
});

test('Pages build serves JavaScript and CSS below the repository base path', async () => {
  const response = await fetch(frontend + '/orientia-web/');
  assert.equal(response.status, 200);
  const html = await response.text();
  const assets = [...html.matchAll(/(?:src|href)="(\/orientia-web\/assets\/[^"]+)"/g)]
    .map((match) => match[1]);
  assert.ok(assets.some((asset) => asset.endsWith('.js')));
  assert.ok(assets.some((asset) => asset.endsWith('.css')));
  for (const asset of assets) {
    const result = await fetch(frontend + asset);
    assert.equal(result.status, 200, asset);
    assert.match(result.headers.get('content-type'), asset.endsWith('.js') ? /javascript/ : /text\/css/);
  }
});

test('all six instrument PDFs are served as PDF files under the Pages base path', async () => {
  for (const name of ['intereses-ocupacionales', 'otis-superior', 'keirsey', 'habitos-estudio', 'ipp', 'dat']) {
    const response = await fetch(`${frontend}/orientia-web/instruments/${name}.pdf`);
    assert.equal(response.status, 200, name);
    assert.match(response.headers.get('content-type'), /application\/pdf/);
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.subarray(0, 5).toString(), '%PDF-', name);
  }
});

test('both PDF buttons on the independent Habitos page resolve within the repository', async () => {
  const pageUrl = frontend + '/orientia-web/tests/habitos-estudio.html';
  const response = await fetch(pageUrl);
  assert.equal(response.status, 200);
  const html = await response.text();
  const links = [...html.matchAll(/href="([^"]+\.pdf)"/g)];
  assert.equal(links.length, 2);
  for (const [, href] of links) {
    const url = new URL(href, pageUrl);
    assert.equal(url.pathname, '/orientia-web/instruments/habitos-estudio.pdf');
    const pdf = await fetch(url);
    assert.equal(pdf.status, 200);
    assert.match(pdf.headers.get('content-type'), /application\/pdf/);
    await pdf.arrayBuffer();
  }
});

test('production API reports health and allows the GitHub Pages origin', async () => {
  const response = await fetch(api + '/api/health', {
    headers: { Origin: 'https://95lucho.github.io' },
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), 'https://95lucho.github.io');
  const health = await response.json();
  assert.equal(health.status, 'online');
  assert.equal(health.geminiConfigured, false);
  const preflight = await fetch(api + '/api/chat', {
    method: 'OPTIONS',
    headers: {
      Origin: 'https://95lucho.github.io',
      'Access-Control-Request-Method': 'POST',
      'Access-Control-Request-Headers': 'Content-Type',
    },
  });
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('access-control-allow-origin'), 'https://95lucho.github.io');
});

test('production API returns a local educational reply without contacting Gemini', async () => {
  const response = await fetch(api + '/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'Explica el DAT' }] }),
  });
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.source, 'orientia-educational-engine');
  assert.equal(data.mode, 'local');
  assert.equal(data.reason, 'not-configured');
  assert.match(data.note, /local/);
  assert.match(data.reply, /ocho pruebas/);
});

test('API validates malformed input and returns JSON errors with CORS', async () => {
  for (const payload of ['{', 'null', '{"messages":[{"role":"user","content":42}]}', '{"messages":[]}']) {
    const response = await fetch(api + '/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://95lucho.github.io' }, body: payload,
    });
    assert.equal(response.status, 400);
    assert.equal(response.headers.get('access-control-allow-origin'), 'https://95lucho.github.io');
    const data = await response.json(); assert.ok(data.code); assert.equal(data.details, undefined);
  }
  const oversized = await fetch(api + '/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'x'.repeat(70000) }] }),
  });
  assert.equal(oversized.status, 413); assert.equal((await oversized.json()).code, 'BODY_TOO_LARGE');
});

test('API rejects unauthorized browser origins before processing chat', async () => {
  const response = await fetch(api + '/api/chat', {
    method: 'POST', headers: { Origin: 'https://untrusted.example', 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'hola' }] }),
  });
  assert.equal(response.status, 403); assert.equal(response.headers.get('access-control-allow-origin'), null);
  assert.equal((await response.json()).code, 'ORIGIN_NOT_ALLOWED');
});

test('local vocational guidance provides an explanation and example', async () => {
  const response = await fetch(api + '/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'háblame sobre orientación vocacional' }] }),
  });
  const data = await response.json(); assert.equal(response.status, 200);
  assert.match(data.reply, /Autoconocimiento/); assert.match(data.reply, /Ejemplo/);
});

test('production API does not serve frontend HTML for missing resources or endpoints', async () => {
  for (const path of ['/', '/orientia-web/', '/orientia-web/assets/missing.js', '/api/missing']) {
    const response = await fetch(api + path);
    assert.equal(response.status, 404, path);
    assert.match(response.headers.get('content-type'), /application\/json/);
    assert.ok((await response.json()).error);
  }
});

test('educational replies distinguish the published instrument versions and IPP limitations', async () => {
  const cases = [
    ['Explica el OTIS', /50 preguntas/, /30 minutos/],
    ['Explica Hábitos de Estudio', /40 preguntas/, /Algunas veces \(2\)/],
    ['Explica Intereses Ocupacionales', /60 actividades/, /10 secciones A–J/],
    ['Explica el IPP', /204 elementos/, /página 11/],
  ];
  for (const [content, ...patterns] of cases) {
    const response = await fetch(api + '/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content }] }),
    });
    assert.equal(response.status, 200);
    const data = await response.json();
    assert.equal(data.source, 'orientia-educational-engine');
    for (const pattern of patterns) assert.match(data.reply, pattern, content);
  }
});

test('API enforces a request limit and returns Retry-After', async () => {
  let limited = false;
  for (let attempt = 0; attempt < 13; attempt++) {
    const response = await fetch(api + '/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'hola' }] }),
    });
    const data = await response.json();
    if (response.status === 429) {
      assert.ok(Number(response.headers.get('retry-after')) > 0);
      assert.equal(data.code, 'CHAT_LIMIT'); limited = true; break;
    }
    assert.equal(response.status, 200);
  }
  assert.equal(limited, true);
});

import http from 'node:http';

const baseUrl = 'https://3000-i6dgu3159k8hyu3ksimou-9b976c90.us2.manus.computer';
const debugPort = process.env.DEBUG_PORT || '9228';

const getJson = (url) => new Promise((resolve, reject) => {
  http.get(url, (response) => {
    let body = '';
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => resolve(JSON.parse(body)));
  }).on('error', reject);
});

const target = (await getJson(`http://127.0.0.1:${debugPort}/json/list`)).find((page) => page.type === 'page');
if (!target) throw new Error('Aucun onglet Chromium disponible pour le contrôle mobile.');

const ws = new WebSocket(target.webSocketDebuggerUrl);
let messageId = 0;
const calls = new Map();

const command = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++messageId;
  calls.set(id, { resolve, reject });
  ws.send(JSON.stringify({ id, method, params }));
});

await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && calls.has(message.id)) {
    const { resolve, reject } = calls.get(message.id);
    calls.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  }
});

const evaluate = async (expression) => {
  const response = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return response.result.value;
};

await command('Page.enable');
await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await command('Page.navigate', { url: `${baseUrl}/projet` });

for (let attempt = 0; attempt < 15; attempt += 1) {
  if (await evaluate(`Boolean(document.getElementById('projet-sections'))`)) break;
  await new Promise((resolve) => setTimeout(resolve, 150));
}

const result = await evaluate(`(() => {
  const select = document.getElementById('projet-sections');
  const section = document.getElementById('contexte');
  if (!select || !section) return null;
  const initialTop = select.getBoundingClientRect().top;
  window.scrollTo({ top: 820, behavior: 'instant' });
  const stickyTop = select.getBoundingClientRect().top;
  select.value = 'contexte';
  select.dispatchEvent(new Event('change', { bubbles: true }));
  return new Promise((resolve) => setTimeout(() => {
    const active = select.value;
    const contextTop = Math.round(section.getBoundingClientRect().top);
    resolve({
      viewportWidth: window.innerWidth,
      optionCount: select.options.length,
      initialTop: Math.round(initialTop),
      stickyTop: Math.round(stickyTop),
      stickyUnderNavigation: stickyTop >= 60 && stickyTop <= 80,
      active,
      contextTop,
      navigationOffsetIsUsable: contextTop >= 120 && contextTop <= 220,
      documentOverflows: document.documentElement.scrollWidth > window.innerWidth,
    });
  }, 950));
})()`);

console.log(JSON.stringify(result, null, 2));
ws.close();

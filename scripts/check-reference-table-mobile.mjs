import http from 'node:http';

const baseUrl = 'https://3000-i6dgu3159k8hyu3ksimou-9b976c90.us2.manus.computer';

const getJson = (url) => new Promise((resolve, reject) => {
  http.get(url, (response) => {
    let body = '';
    response.on('data', (chunk) => { body += chunk; });
    response.on('end', () => resolve(JSON.parse(body)));
  }).on('error', reject);
});

const target = (await getJson('http://127.0.0.1:9225/json/list')).find((page) => page.type === 'page');
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

const check = async (width) => {
  await command('Emulation.setDeviceMetricsOverride', { width, height: 844, deviceScaleFactor: 1, mobile: true });
  await command('Page.navigate', { url: `${baseUrl}/references` });
  for (let attempt = 0; attempt < 12; attempt += 1) {
    if (await evaluate(`Boolean(document.querySelector('[aria-label^="Tableau comparatif"]'))`)) break;
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  return evaluate(`(() => {
    const region = document.querySelector('[aria-label^="Tableau comparatif"]');
    const table = region?.querySelector('table');
    const rowCount = table?.querySelectorAll('tbody tr').length ?? 0;
    const hint = document.getElementById('tableau-mobile-hint');
    const before = region?.scrollLeft ?? 0;
    if (region) {
      region.style.scrollBehavior = 'auto';
      region.scrollLeft = region.scrollWidth;
    }
    const after = region?.scrollLeft ?? 0;
    return {
      width: window.innerWidth,
      rowCount,
      tableWidth: Math.round(table?.getBoundingClientRect().width ?? 0),
      containerWidth: Math.round(region?.clientWidth ?? 0),
      horizontalScrollAvailable: Boolean(region && region.scrollWidth > region.clientWidth),
      horizontalScrollWorks: after > before,
      documentOverflows: document.documentElement.scrollWidth > window.innerWidth,
      mobileHintVisible: hint ? getComputedStyle(hint).display !== 'none' : false,
      focusableRegion: region?.getAttribute('tabindex') === '0',
    };
  })()`);
};

const results = [await check(390), await check(320)];
console.log(JSON.stringify(results, null, 2));
ws.close();

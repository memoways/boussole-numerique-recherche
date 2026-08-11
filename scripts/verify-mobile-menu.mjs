import fs from 'node:fs';
import http from 'node:http';

const getJson = (url) => new Promise((resolve, reject) => {
  http.get(url, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => resolve(JSON.parse(body)));
  }).on('error', reject);
});

const target = (await getJson('http://127.0.0.1:9223/json/list')).find((page) => page.type === 'page');
if (!target) throw new Error('Aucun onglet Chromium disponible.');

const viewportWidth = Number(process.env.TEST_WIDTH || 390);
const viewportHeight = 844;

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
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  return result.result.value;
};

await command('Page.enable');
await command('Emulation.setDeviceMetricsOverride', {
  width: viewportWidth,
  height: viewportHeight,
  deviceScaleFactor: 1,
  mobile: true,
});
await command('Page.navigate', { url: 'https://3000-i6dgu3159k8hyu3ksimou-9b976c90.us2.manus.computer/' });
await new Promise((resolve) => setTimeout(resolve, 1200));

const initial = await evaluate(`(() => ({
  width: window.innerWidth,
  menuButtonCount: document.querySelectorAll('nav button').length,
  menuOpen: Boolean(document.querySelector('nav .border-t')),
  desktopLinksVisible: Array.from(document.querySelectorAll('nav a')).some((a) => a.textContent.trim() === 'Calendrier' && getComputedStyle(a).display !== 'none')
}))()`);

const menuButtonPresent = await evaluate(`Boolean(document.querySelector('nav button'))`);
if (!menuButtonPresent) throw new Error('Bouton burger introuvable à largeur mobile.');

await evaluate(`document.querySelector('nav button').click()`);
await new Promise((resolve) => setTimeout(resolve, 250));

const afterOpen = await evaluate(`(() => ({
  menuOpen: Boolean(document.querySelector('nav .border-t')),
  labels: Array.from(document.querySelectorAll('nav .border-t a')).map((a) => a.textContent.trim()),
  calendar: Boolean(Array.from(document.querySelectorAll('nav .border-t a')).find((a) => a.textContent.trim() === 'Calendrier' && a.getAttribute('href') === '/timeline'))
}))()`);

const capture = await command('Page.captureScreenshot', { format: 'png' });
fs.writeFileSync(`/home/ubuntu/screenshots/menu-mobile-ouvert-${viewportWidth}.png`, Buffer.from(capture.data, 'base64'));

await evaluate(`Array.from(document.querySelectorAll('nav .border-t a')).find((a) => a.textContent.trim() === 'Calendrier').click()`);
await new Promise((resolve) => setTimeout(resolve, 500));

const afterNavigation = await evaluate(`(() => ({
  path: window.location.pathname,
  menuOpen: Boolean(document.querySelector('nav .border-t'))
}))()`);

const verification = { initial, afterOpen, afterNavigation };
fs.writeFileSync(`/home/ubuntu/boussole-numerique-recherche/mobile-menu-verification-${viewportWidth}.json`, JSON.stringify(verification, null, 2));
console.log(JSON.stringify(verification, null, 2));
ws.close();

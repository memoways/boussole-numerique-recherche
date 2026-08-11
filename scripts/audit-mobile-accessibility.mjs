import fs from 'node:fs';
import http from 'node:http';

const routes = ['/', '/projet', '/experience', '/methode', '/timeline', '/recherche', '/references', '/partenaires', '/ressources'];
const baseUrl = 'https://3000-i6dgu3159k8hyu3ksimou-9b976c90.us2.manus.computer';

const getJson = (url) => new Promise((resolve, reject) => {
  http.get(url, (res) => {
    let body = '';
    res.on('data', (chunk) => { body += chunk; });
    res.on('end', () => resolve(JSON.parse(body)));
  }).on('error', reject);
});

const target = (await getJson('http://127.0.0.1:9224/json/list')).find((page) => page.type === 'page');
if (!target) throw new Error('Aucun onglet Chromium disponible.');

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

const auditPage = async (route) => {
  await command('Page.navigate', { url: `${baseUrl}${route}` });
  for (let attempt = 0; attempt < 10; attempt += 1) {
    if (await evaluate(`Boolean(document.querySelector('main h1'))`)) break;
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return evaluate(`(() => {
    const named = (element) => (element.getAttribute('aria-label') || element.innerText || element.textContent || '').trim();
    const headings = Array.from(document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')).map((heading) => Number(heading.tagName.slice(1)));
    const headingSkips = headings.filter((level, index) => index > 0 && level - headings[index - 1] > 1).length;
    const overflow = Array.from(document.querySelectorAll('body *')).filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.right > window.innerWidth + 1 || rect.left < -1;
    }).length;
    return {
      path: window.location.pathname,
      viewport: window.innerWidth,
      lang: document.documentElement.lang,
      h1: document.querySelectorAll('main h1').length,
      headingSequence: headings,
      headingSkips,
      landmarks: {
        nav: document.querySelectorAll('nav').length,
        main: document.querySelectorAll('main').length,
        footer: document.querySelectorAll('footer').length,
      },
      imagesWithoutAlt: Array.from(document.images).filter((image) => !image.hasAttribute('alt')).length,
      buttonsWithoutName: Array.from(document.querySelectorAll('button,[role="button"]')).filter((element) => !named(element)).length,
      interactiveSvgWithoutTabindex: Array.from(document.querySelectorAll('svg [role="button"]')).filter((element) => !element.hasAttribute('tabindex')).length,
      documentHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
      nestedElementsBeyondViewport: overflow,
    };
  })()`);
};

const results = [];
for (const route of routes) results.push(await auditPage(route));

await command('Page.navigate', { url: `${baseUrl}/` });
await new Promise((resolve) => setTimeout(resolve, 400));
await evaluate('document.activeElement?.blur()');
await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
const focusCheck = await evaluate(`(() => {
  const active = document.activeElement;
  const style = getComputedStyle(active);
  return {
    firstFocus: active?.className || active?.tagName,
    firstFocusText: active?.textContent?.trim(),
    outlineVisible: style.outlineStyle !== 'none' && style.outlineWidth !== '0px',
  };
})()`);

const burgerBefore = await evaluate(`(() => {
  const button = document.querySelector('nav button');
  return { name: button?.getAttribute('aria-label'), expanded: button?.getAttribute('aria-expanded') };
})()`);
await evaluate(`document.querySelector('nav button')?.click()`);
await new Promise((resolve) => setTimeout(resolve, 150));
const burgerAfter = await evaluate(`(() => {
  const button = document.querySelector('nav button');
  return {
    name: button?.getAttribute('aria-label'),
    expanded: button?.getAttribute('aria-expanded'),
    menu: Boolean(document.getElementById('menu-navigation-mobile')),
  };
})()`);

const activateWithKeyboard = async (route, selector, attribute) => {
  await command('Page.navigate', { url: `${baseUrl}${route}` });
  await new Promise((resolve) => setTimeout(resolve, 500));
  const before = await evaluate(`(() => { const target = document.querySelector('${selector}'); target?.focus(); return target?.getAttribute('${attribute}'); })()`);
  await command('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await command('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
  await new Promise((resolve) => setTimeout(resolve, 150));
  const after = await evaluate(`document.querySelector('${selector}')?.getAttribute('${attribute}')`);
  return { before, after, toggled: before !== after };
};

const keyboardChecks = {
  homeRadar: await activateWithKeyboard('/', 'svg [role="button"][aria-pressed]', 'aria-pressed'),
  timelinePhase: await activateWithKeyboard('/timeline', '[role="button"][aria-controls^="phase-detail"]', 'aria-expanded'),
  researchInsight: await activateWithKeyboard('/recherche', '[role="button"][aria-controls^="insight-detail"]', 'aria-expanded'),
};

await command('Page.navigate', { url: `${baseUrl}/` });
await new Promise((resolve) => setTimeout(resolve, 500));
const colorChecks = await evaluate(`(() => {
  const promiseLabel = Array.from(document.querySelectorAll('p')).find((element) => element.textContent.trim() === 'La promesse');
  const experienceLink = Array.from(document.querySelectorAll('a')).find((element) => element.textContent.trim() === "Voir l'expérience");
  return {
    promiseLabel: promiseLabel ? getComputedStyle(promiseLabel).color : null,
    experienceLink: experienceLink ? getComputedStyle(experienceLink).color : null,
  };
})()`);

const report = { pages: results, focusCheck, burgerBefore, burgerAfter, keyboardChecks, colorChecks };
fs.writeFileSync('/home/ubuntu/boussole-numerique-recherche/accessibility-mobile-report.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
ws.close();

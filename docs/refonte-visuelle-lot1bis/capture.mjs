// Capture each sketch at 1440 and 390, full page, and check the title stays on one line and nothing overflows.
// Usage: node docs/refonte-visuelle-lot1bis/capture.mjs <dir-with-html> <out-dir>
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
const [dir, out] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".html"))) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await page.goto("file://" + path.resolve(dir, file));
    const report = await page.evaluate(() => {
      const b = document.querySelector(".title b");
      const r = b.getBoundingClientRect();
      const lineH = parseFloat(getComputedStyle(b).lineHeight) || parseFloat(getComputedStyle(b).fontSize);
      return {
        titlePx: getComputedStyle(b).fontSize,
        titleOneLine: r.height < lineH * 1.5,
        titleFits: b.scrollWidth <= b.parentElement.clientWidth + 1,
        docOverflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    const base = path.join(out, `${file.replace(".html", "")}-${w}`);
    await page.screenshot({ path: base + "-fold.png" });
    await page.screenshot({ path: base + "-full.png", fullPage: true });
    console.log(file, w, JSON.stringify(report));
    await page.close();
  }
}
await browser.close();

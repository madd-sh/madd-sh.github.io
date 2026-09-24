import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

const title = 'Executable contracts';
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(await readFile('scripts/social-card.html', 'utf8'));
  await page.locator('h1').evaluate((el, text) => { el.textContent = text; }, title);
  await page.screenshot({ path: 'static/images/og-default-v3.png' });
} finally {
  await browser.close();
}

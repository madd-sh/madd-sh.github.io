import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { chromium, firefox, webkit } from 'playwright';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = resolve('public');
const mime = { '.html': 'text/html', '.md': 'text/markdown', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jsonld': 'application/ld+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain', '.xml': 'application/xml' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = resolve(root, `.${pathname}${pathname.endsWith('/') ? 'index.html' : ''}`);
    if (!file.startsWith(root + sep)) throw new Error('Outside public output');
    response.setHeader('Content-Type', mime[extname(file)] || 'application/octet-stream');
    response.end(await readFile(file));
  } catch {
    response.writeHead(404).end('Not found');
  }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;
const local = url => origin + new URL(url, 'https://madd.sh').pathname;
const failures = [];
const requestedBrowsers = (process.env.BROWSERS || 'chromium').split(',');
const browsers = { chromium, firefox, webkit };
const sourceResources = JSON.parse(await readFile('data/resources.json', 'utf8'));
const staticAllowlist = [
  'CNAME', 'robots.txt', 'favicon.svg', 'images/og-default.png', 'css/style.css',
  'js/i18n.js', 'js/main.js', 'contract.schema.json',
  'schemas/legacy-0.1.3/contract.schema.json', 'schemas/draft/0.2.0/contract.schema.json',
  'examples/contract-0.2.0.json', 'vocab/madd.jsonld',
];

async function get(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200, `HTTP ${response.status}: ${url}`);
  return response;
}

async function fileList(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) files.push(...(await fileList(`${directory}/${entry.name}`)).map(path => `${entry.name}/${path}`));
    else files.push(entry.name);
  }
  return files;
}

async function resources() {
  assert.equal((await readFile('.hugo-version', 'utf8')).trim(), '0.155.3');
  assert.match((await readFile('.node-version', 'utf8')).trim(), /^\d+\.\d+\.\d+$/);
  const install = await readFile('scripts/install-hugo.sh', 'utf8');
  assert.match(install, /b98243d840f904367ebfaeb53d3c8e51d89a4edec518ef420c1fb3eae3a9cbb1/);
  assert.match(install, /sha256sum --check/);
  for (const workflow of await fileList('.github/workflows')) {
    const source = await readFile(`.github/workflows/${workflow}`, 'utf8');
    for (const match of source.matchAll(/uses:\s*([^\s#]+)/g)) assert.match(match[1], /@[a-f\d]{40}$/, `Immutable Action: ${workflow}`);
  }
  const checkWorkflow = await readFile('.github/workflows/check.yml', 'utf8');
  assert.match(checkWorkflow, /pull_request:/);
  assert.match(checkWorkflow, /contents: read/);
  assert.doesNotMatch(checkWorkflow, /pull_request_target|pages:\s*write|id-token:\s*write|deploy-pages|upload-pages-artifact/);
  assert.match(checkWorkflow, /BROWSERS: chromium,firefox,webkit/);
  const pagesWorkflow = await readFile('.github/workflows/hugo.yml', 'utf8');
  assert.match(pagesWorkflow, /if: github\.ref == 'refs\/heads\/main'/);
  assert.match(pagesWorkflow, /make check HUGO=\.tools\/hugo/);
  const packageJSON = JSON.parse(await readFile('package.json', 'utf8'));
  for (const version of Object.values(packageJSON.devDependencies)) assert.match(version, /^\d+\.\d+\.\d+$/);
  assert(!Object.keys(packageJSON.scripts).some(name => /^(preinstall|install|postinstall|prepare)$/.test(name)));
  assert.deepEqual((await fileList('static')).sort(), staticAllowlist.sort(), 'Review every public static input explicitly');
  assert.equal(await (await get(`${origin}/CNAME`)).text(), 'madd.sh\n');
  const manifest = await (await get(`${origin}/manifest.json`)).json();
  assert.equal(manifest.release, '0.1.3');
  assert.equal(manifest.candidate, '0.2.0');
  assert.equal(manifest.resources.length, 35);
  assert.equal(new Set(manifest.resources.map(resource => resource.url)).size, 35);
  assert.deepEqual(await (await get(`${origin}/fr/manifest.json`)).json(), manifest);
  for (const resource of manifest.resources) {
    assert.equal(new URL(resource.url).origin, 'https://madd.sh');
    const response = await get(local(resource.url));
    const bytes = Buffer.from(await response.arrayBuffer());
    if (resource.sha256) {
      assert.equal(createHash('sha256').update(bytes).digest('hex'), resource.sha256, `Digest ${resource.url}`);
      assert.deepEqual(resource, sourceResources.find(item => item.url === resource.url));
    }
  }
  const schema = await (await get(`${origin}/schemas/draft/0.2.0/contract.schema.json`)).json();
  const vocabulary = await (await get(`${origin}/vocab/madd.jsonld`)).json();
  assert.equal(vocabulary['@type'], 'schema:DefinedTermSet');
  assert.equal(vocabulary.hasDefinedTerm.length, 8);
  const example = await (await get(`${origin}/examples/contract-0.2.0.json`)).json();
  const ajv = new Ajv2020({ strict: false, allErrors: true });
  addFormats(ajv);
  assert(ajv.validate(schema, example), JSON.stringify(ajv.errors));
  assert.deepEqual(await (await get(`${origin}/contract.schema.json`)).json(), await (await get(`${origin}/schemas/legacy-0.1.3/contract.schema.json`)).json());
  const llms = await (await get(`${origin}/llms.txt`)).text();
  for (const resource of manifest.resources.filter(item => item.mediaType === 'text/markdown')) assert(llms.includes(resource.url));
  assert.match(llms, /0\.2\.0 candidate, not yet published/);
  const outputs = await fileList('public');
  assert(!outputs.some(path => path.startsWith('.madd/') || path.startsWith('docs/') || path.includes('node_modules')), 'Private working material must not enter the build');
  console.log('PASS: HTTP resources, explicit static allowlist, manifest, hashes, candidate schema/example, preserved legacy schema');
  return manifest.resources.filter(item => item.mediaType === 'text/html');
}

async function content(page, pages) {
  const links = new Set();
  for (const resource of pages) {
    const route = new URL(resource.url).pathname;
    const response = await page.goto(origin + route);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('html').getAttribute('lang'), resource.language);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), resource.url);
    const otherLanguage = resource.language === 'en' ? 'fr' : 'en';
    const alternate = await page.locator(`link[hreflang=${otherLanguage}]`).getAttribute('href');
    assert.equal(await page.locator('.language-link').getAttribute('href'), new URL(alternate).pathname);
    assert.equal(new URL(alternate).pathname.replace(/^\/fr\//, '/'), route.replace(/^\/fr\//, '/'));
    const mdURL = await page.locator('link[type="text/markdown"]').getAttribute('href');
    const markdown = await (await get(local(mdURL))).text();
    const file = route.endsWith('/') || route.endsWith('/index.html') ? '_index.md' : route.split('/').at(-1).replace('.html', '.md');
    const source = await readFile(`content/${resource.language}/${file}`, 'utf8');
    const body = source.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
    assert(markdown.includes(body), `Markdown source parity: ${route}`);
    const proseText = (await page.locator('.prose').innerText()).replace(/\s+/g, ' ').replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
    for (const paragraph of body.split(/\n\n+/).filter(text => !/^(#|\||```|[-*] |\d+\.)/.test(text))) {
      const plain = paragraph.replace(/^> /gm, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').replace(/\s+/g, ' ').replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
      assert(proseText.includes(plain), `HTML paragraph parity: ${route}: ${plain}`);
    }
    const headings = [...body.matchAll(/^## (.+)$/gm)].map(match => match[1].replace(/ \{#[^}]+\}$/, ''));
    assert.deepEqual(await page.locator('.prose h2').allTextContents(), headings, `HTML headings: ${route}`);
    const code = [...body.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map(match => match[1].trim());
    assert.deepEqual((await page.locator('.prose pre code').allTextContents()).map(text => text.trim()), code, `HTML examples: ${route}`);
    assert.equal(await page.locator('.page-meta').getByText(resource.status, { exact: true }).count(), 1);
    for (const url of await page.locator('a[href], link[href], [src]').evaluateAll(elements => elements.map(el => el.href || el.src))) links.add(url);
  }
  for (const href of links) {
    const url = new URL(href);
    if (![origin, 'https://madd.sh'].includes(url.origin)) continue;
    const response = await get(local(url));
    if (url.hash) {
      const html = await response.text();
      assert(await page.evaluate(({ html, id }) => Boolean(new DOMParser().parseFromString(html, 'text/html').getElementById(id)), { html, id: decodeURIComponent(url.hash.slice(1)) }), `Missing fragment: ${url}`);
    }
  }
  await page.goto(`${origin}/manifesto.html`);
  await page.waitForURL('**/concepts.html');
  for (const lang of ['', '/fr']) {
    await page.goto(origin + lang + '/');
    for (const id of ['agents', 'domains', 'problem', 'principles', 'comparison', 'quickstart']) assert.equal(await page.locator(`#${id}`).count(), 1, `Preserved anchor: ${lang}/#${id}`);
    for (const [path, ids] of [
      ['/concepts.html', ['workflow', 'intention', 'contract', 'fractions', 'retrospec', 'operations']],
      ['/skills.html', ['gap', 'anatomy', 'types', 'transitions', 'domain-skills', 'custom', 'lifecycle']],
    ]) {
      await page.goto(origin + lang + path);
      for (const id of ids) assert.equal(await page.locator(`#${id}`).count(), 1, `Preserved anchor: ${lang}${path}#${id}`);
    }
  }
  console.log(`PASS: ${pages.length} EN/FR pages, source/HTML/Markdown parity, translation routes, internal links/assets/fragments and legacy routes`);
}

async function palette(page) {
  await page.goto(origin);
  const trigger = page.locator('[data-open-commands]');
  const dialog = page.locator('#command-dialog');
  const input = page.locator('#command-input');
  await trigger.click();
  assert(await dialog.isVisible());
  assert(await input.evaluate(el => el === document.activeElement));
  assert.match(await dialog.getAttribute('aria-labelledby'), /command-title/);
  await input.fill('no-such-document-123');
  assert.equal(await page.locator('#command-results li:visible').count(), 0);
  assert.match(await page.locator('#result-count').innerText(), /No matching page/);
  await input.press('Enter');
  assert(await dialog.isVisible());
  await input.fill('/contract.html');
  assert.equal(await page.locator('#command-results li:visible').count(), 1);
  await input.press('Escape');
  assert(!(await dialog.isVisible()));
  assert(await trigger.evaluate(el => el === document.activeElement));
  await page.keyboard.press('Control+k');
  assert(await dialog.isVisible());
  assert.equal(await input.inputValue(), '');
  await input.press('ArrowDown');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '/index.html');
  await page.keyboard.press('ArrowDown');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '/concepts.html');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  assert(await input.evaluate(el => el === document.activeElement));
  await page.locator('#command-results a').last().focus();
  await page.keyboard.press('Tab');
  assert(await page.locator('#close-commands').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Shift+Tab');
  assert(await page.locator('#command-results a').last().evaluate(el => el === document.activeElement));
  await input.fill('/contract.html');
  await input.press('Enter');
  await page.waitForURL('**/contract.html');
  await page.goBack();
  assert.equal(new URL(page.url()).pathname, '/');
  await page.goForward();
  assert.equal(new URL(page.url()).pathname, '/contract.html');
  await page.locator('[data-open-commands]').click();
  await page.locator('#command-results a[href="/evidence.html"]').click();
  await page.waitForURL('**/evidence.html');
  await page.locator('.language-link').click();
  await page.waitForURL('**/fr/evidence.html');
  await page.locator('[data-open-commands]').click();
  await page.locator('#command-input').fill('/fr/contract.html');
  await page.locator('#command-input').press('Enter');
  await page.waitForURL('**/fr/contract.html');
  await page.goto(origin);
  await page.locator('.wordmark').focus();
  await page.keyboard.press('Meta+k');
  assert(await dialog.isVisible());
  await page.keyboard.press('Escape');
  assert(await page.locator('.wordmark').evaluate(el => el === document.activeElement));
  await page.evaluate(() => {
    window.keyResults = [];
    document.addEventListener('keydown', event => queueMicrotask(() => window.keyResults.push({ key: event.key, prevented: event.defaultPrevented })));
  });
  for (const key of ['g', 'j', 'k', 'l', 't', '/', 'Control+Shift+k', 'ArrowDown', 'Home', 'End']) await page.keyboard.press(key);
  assert(!(await dialog.isVisible()));
  assert((await page.evaluate(() => window.keyResults)).every(event => !event.prevented), 'Native browser keys must not be intercepted');
  for (const tag of ['input', 'textarea', 'select', 'div']) {
    await page.evaluate(tag => {
      const el = document.createElement(tag);
      el.id = 'editable-fixture';
      if (tag === 'div') el.contentEditable = 'true';
      document.body.append(el);
      el.focus();
    }, tag);
    await page.keyboard.press('Control+k');
    assert(!(await dialog.isVisible()), `Search must not intercept editable ${tag}`);
    await page.locator('#editable-fixture').evaluate(el => el.remove());
  }
  assert((await page.evaluate(() => window.keyResults)).every(event => !event.prevented));
  await page.reload();
  await trigger.click();
  await page.mouse.click(1, 1);
  assert(!(await dialog.isVisible()), 'Backdrop dismisses search');
  assert(await trigger.evaluate(el => el === document.activeElement));
  console.log('PASS: pointer/Ctrl/Cmd+K, filtering/empty results, arrows/Enter/Escape, focus trap/restore, history, EN/FR search, native keys/editables');
}

function contrast(hexA, hexB) {
  const luminance = hex => hex.match(/[a-f\d]{2}/gi).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
  const [a, b] = [luminance(hexA), luminance(hexB)].sort((x, y) => y - x);
  return (a + .05) / (b + .05);
}

async function layout(page, pages) {
  for (const theme of ['dark', 'light']) {
    await page.goto(origin);
    await page.evaluate(theme => localStorage.setItem('madd-theme', theme), theme);
    await page.reload();
    const tokens = await page.evaluate(() => Object.fromEntries(['bg', 'surface', 'raised', 'text', 'muted', 'accent', 'on-accent', 'code', 'control-line'].map(name => [name, getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim()])));
    for (const background of ['bg', 'surface', 'raised']) {
      for (const foreground of ['text', 'muted', 'accent', 'code']) assert(contrast(tokens[foreground], tokens[background]) >= 4.5, `${theme}: ${foreground}/${background} text contrast`);
      assert(contrast(tokens['control-line'], tokens[background]) >= 3, `${theme}: control boundary contrast`);
    }
    assert(contrast(tokens['on-accent'].length === 4 ? '#' + [...tokens['on-accent'].slice(1)].map(c => c + c).join('') : tokens['on-accent'], tokens.accent) >= 4.5);
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const resource of pages) {
        await page.goto(local(resource.url));
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${theme} ${width}px overflow: ${resource.url}`);
        const themeLabel = resource.language === 'fr' ? (theme === 'dark' ? 'Mode clair' : 'Mode sombre') : (theme === 'dark' ? 'Light mode' : 'Dark mode');
        assert.equal((await page.locator('#theme-toggle').innerText()).trim(), themeLabel);
        assert.equal(await page.getByRole('button', { name: themeLabel, exact: true }).count(), 1, 'Visible theme label must be its accessible name');
      }
      await page.goto(origin);
      await page.locator('[data-open-commands]').click();
      assert(await page.evaluate(() => { const rect = document.querySelector('dialog').getBoundingClientRect(); return rect.left >= 0 && rect.right <= innerWidth; }), `${theme} ${width}px search fit`);
      await page.keyboard.press('Escape');
    }
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1100 });
      for (const resource of pages) {
        await page.goto(local(resource.url));
        const before = await page.locator('body').evaluate(el => parseFloat(getComputedStyle(el).fontSize));
        await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
        assert.equal(await page.locator('body').evaluate(el => parseFloat(getComputedStyle(el).fontSize)), before * 2, 'Text really scales to 200%');
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${theme} ${width}px: 200% text overflow at ${resource.url}`);
        assert(await page.locator('.skip-link').evaluate(el => el.getBoundingClientRect().bottom <= 0), 'Unfocused skip link stays outside the viewport at enlarged text sizes');
        await page.locator('[data-open-commands]').click();
        assert(await page.locator('#command-input').isVisible());
        assert(await page.locator('dialog').evaluate(el => el.scrollWidth <= el.clientWidth + 1), `${theme} ${width}px: 200% search overflow`);
        await page.keyboard.press('Escape');
      }
    }
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(origin);
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
  assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
  await page.locator('#theme-toggle').click();
  const saved = await page.locator('html').getAttribute('data-theme');
  await page.reload();
  assert.equal(await page.locator('html').getAttribute('data-theme'), saved);
  console.log('PASS: both themes, WCAG text contrast, 320/390/768/1440px all pages, 200% text zoom, reduced motion and saved theme');
}

try {
  const pages = await resources();
  await mkdir('test-results', { recursive: true });
  for (const name of requestedBrowsers) {
    assert(browsers[name], `Unknown browser: ${name}`);
    const browser = await browsers[name].launch();
    try {
      const context = await browser.newContext({ colorScheme: 'dark', viewport: { width: 1440, height: 1000 } });
      const page = await context.newPage();
      page.on('pageerror', error => failures.push(error.message));
      await content(page, pages);
      await palette(page);
      await layout(page, pages);
      for (const [label, width, theme, path] of [['desktop', 1440, 'dark', '/'], ['mobile', 390, 'dark', '/'], ['french-light', 1440, 'light', '/fr/']]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(origin + path);
        await page.evaluate(theme => localStorage.setItem('madd-theme', theme), theme);
        await page.reload();
        await page.screenshot({ path: `test-results/${name}-${label}.png`, fullPage: true });
      }
      const noJS = await browser.newContext({ javaScriptEnabled: false });
      const plain = await noJS.newPage();
      await plain.goto(origin);
      assert(!(await plain.locator('[data-open-commands]').isVisible()));
      assert(!(await plain.locator('#theme-toggle').isVisible()));
      for (const resource of pages) {
        await plain.goto(local(resource.url));
        assert.equal(await plain.locator('.sidebar nav a').count(), 8);
        await plain.locator('.language-link').click();
        assert.notEqual(await plain.locator('html').getAttribute('lang'), resource.language);
      }
      console.log(`PASS: ${name}; no-JavaScript EN/FR navigation; screenshots in test-results/`);
    } finally {
      await browser.close();
    }
  }
  assert.deepEqual(failures, [], 'No browser JavaScript errors');
  console.log(`PASS: site acceptance on Node ${process.version}; browsers=${requestedBrowsers.join(',')}. Manual assistive-technology review remains a release gate.`);
} finally {
  server.closeAllConnections();
  await new Promise(done => server.close(done));
}

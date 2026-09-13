import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const base = 'http://127.0.0.1:4173';
const shotDir = new URL('./screenshots', import.meta.url);
await mkdir(shotDir, { recursive: true });

const consoleErrors = [];
const failures = [];

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

async function shot(page, name) {
  await page.screenshot({
    path: join(shotDir.pathname, `${name}.png`),
    fullPage: true,
  });
}

function listen(page) {
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });
}

const desktop = await browser.newPage();
listen(desktop);
await desktop.setViewport({ width: 1280, height: 800 });
await desktop.goto(`${base}/`, { waitUntil: 'networkidle0' });
const hero = await desktop.$eval('h1', (node) => node.textContent ?? '');
if (!/evening, composed/i.test(hero)) {
  failures.push(`Home hero missing: ${hero}`);
}
const banner = await desktop.$eval('.sample-banner', (node) => node.textContent ?? '');
if (!/sample preview/i.test(banner)) {
  failures.push('Sample banner missing on home');
}
await desktop.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await desktop.waitForSelector('.cta-band');
await shot(desktop, 'desktop-home');

await Promise.all([
  desktop.waitForSelector('#panel-tasting'),
  desktop.click('nav.nav-desktop a[href="/menu"]'),
]);
if (!(await desktop.evaluate(() => document.body.innerText.includes('First light')))) {
  failures.push('Tasting dish missing');
}
await desktop.click('#tab-mains');
await desktop.waitForSelector('#panel-mains');
const mainsText = await desktop.evaluate(() => document.body.innerText);
if (!mainsText.includes('Line-caught fish')) {
  failures.push('Mains tab did not show Line-caught fish');
}
if (mainsText.includes('First light')) {
  failures.push('Tasting dish still visible after switching to Mains');
}
await shot(desktop, 'desktop-menu-mains');

await desktop.click('nav.nav-desktop a[href="/contact"]');
await desktop.waitForSelector('form');
await desktop.click('button[type="submit"]');
const emptyErrors = await desktop.evaluate(() => document.body.innerText);
if (!/full name/i.test(emptyErrors) || !/valid email/i.test(emptyErrors)) {
  failures.push('Empty form did not show validation errors');
}

await desktop.type('#name', 'Ada Lovelace');
await desktop.type('#email', 'ada@example.com');
await desktop.$eval('#date', (input) => {
  const proto = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
  proto?.set?.call(input, '2099-12-31');
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
});
await desktop.type('#message', 'Window table if possible.');
await desktop.click('button[type="submit"]');
await desktop.waitForFunction(() => document.body.innerText.toLowerCase().includes('request checked'), {
  timeout: 4000,
}).catch(() => {
  failures.push('Successful submit status missing');
});
await shot(desktop, 'desktop-contact-success');

const mobile = await browser.newPage();
listen(mobile);
await mobile.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
await mobile.goto(`${base}/`, { waitUntil: 'networkidle0' });
await mobile.click('button.menu-toggle');
await mobile.waitForSelector('.nav-mobile.is-open');
await shot(mobile, 'mobile-nav-open');
await mobile.evaluate(() => {
  const link = document.querySelector('.nav-mobile a[href="/contact"]');
  if (link instanceof HTMLElement) {
    link.click();
  }
});
await mobile.waitForSelector('form', { timeout: 8000 });
const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
if (overflow) {
  failures.push('Horizontal overflow on mobile contact');
}
await shot(mobile, 'mobile-contact');

await browser.close();

const report = {
  failures,
  consoleErrors,
  screenshots: ['desktop-home', 'desktop-menu-mains', 'desktop-contact-success', 'mobile-contact'],
};

console.log(JSON.stringify(report, null, 2));
if (failures.length > 0) {
  process.exit(1);
}

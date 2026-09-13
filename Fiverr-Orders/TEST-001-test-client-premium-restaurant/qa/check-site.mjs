import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const dist = new URL('../dist', import.meta.url);
const issues = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else {
      files.push(path);
    }
  }
  return files;
}

const files = await walk(dist.pathname);
const htmlFiles = files.filter((file) => extname(file) === '.html');

if (htmlFiles.length === 0) {
  issues.push('No HTML files in dist/. Run npm run build first.');
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');

  if (!html.includes('<title>')) {
    issues.push(`${file}: missing <title>`);
  }
  if (!html.includes('name="description"')) {
    issues.push(`${file}: missing meta description`);
  }
  if (/href=["']https?:\/\/localhost/i.test(html)) {
    issues.push(`${file}: localhost link`);
  }
  if (/(api[_-]?key|secret|password)\s*[:=]/i.test(html)) {
    issues.push(`${file}: possible secret in HTML`);
  }

  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
      continue;
    }
    if (href.startsWith('/')) {
      const publicFile = join(dist.pathname, href.replace(/^\//, ''));
      const hashed = files.some((candidate) => candidate.endsWith(href.replace(/^\//, '')) || candidate.includes(href.split('/').pop() ?? ''));
      if (!hashed && href !== '/' && !href.startsWith('/assets') && !href.startsWith('/src')) {
        // SPA routes are expected
        if (!['/', '/menu', '/contact', '/favicon.svg'].includes(href)) {
          issues.push(`${file}: unresolved href ${href}`);
        }
      }
      void publicFile;
    }
  }
}

const jsFiles = files.filter((file) => extname(file) === '.js');
for (const file of jsFiles) {
  const source = await readFile(file, 'utf8');
  if (/(sk_live_|ghp_|xox[baprs]-|BEGIN PRIVATE KEY)/.test(source)) {
    issues.push(`${file}: possible committed secret`);
  }
}

if (issues.length > 0) {
  console.error('QA check failed:');
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log(`QA check passed (${htmlFiles.length} HTML, ${jsFiles.length} JS).`);

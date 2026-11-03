// Check that every internal href/src in the built site points at a file in dist/.
// Usage: node scripts/check-links.mjs   (reads BASE_PATH, default /sc)
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH || '/sc').replace(/\/$/, '') + '/';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

async function exists(p) {
  try { return (await stat(p)).isFile(); } catch { return false; }
}

async function resolve(link) {
  const path = decodeURI(link.split(/[?#]/)[0]);
  if (!path.startsWith(base)) return false;
  const rel = path.slice(base.length);
  if (rel === '' || rel.endsWith('/')) return exists(join(dist, rel, 'index.html'));
  return exists(join(dist, rel));
}

const broken = [];
let checked = 0;
for await (const file of walk(dist)) {
  if (!file.endsWith('.html')) continue;
  const html = await readFile(file, 'utf8');
  for (const [, link] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|#|data:)/.test(link)) continue;
    checked++;
    if (!(await resolve(link))) broken.push(`${relative(dist, file)} -> ${link}`);
  }
}

if (broken.length) {
  console.error(`Broken internal links (${broken.length}):\n  ` + broken.join('\n  '));
  process.exit(1);
}
console.log(`OK: ${checked} internal links checked, none broken (base ${base}).`);

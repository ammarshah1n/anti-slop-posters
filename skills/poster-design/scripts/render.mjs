#!/usr/bin/env node
// Render a poster HTML file to PNG (and optionally PDF), and flag AI-slop tells.
//   node render.mjs poster.html [--scale 2] [--pdf] [--out dir]
// Writes <name>.png and <name>.thumb.png (200px wide, greyscale: the squint test).
// Exit code 1 if any warning fires. Waive one line with a  slop-ok: reason  comment.
import { readFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--') && !/^\d+(\.\d+)?$/.test(a));
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i < 0 ? d : args[i + 1]; };
if (!file) { console.error('usage: node render.mjs poster.html [--scale 2] [--pdf] [--out dir]'); process.exit(2); }

const scale = Number(opt('scale', 2));
const src = resolve(file);
const outDir = resolve(opt('out', dirname(src)));
const name = basename(src, '.html');
mkdirSync(outDir, { recursive: true });

// ---------- static lint (source text) ----------
const warns = [];
const warn = (rule, detail) => warns.push(`WARN  ${rule.padEnd(14)} ${detail}`);
const html = readFileSync(src, 'utf8');

export const BANNED_FONTS = ['Inter', 'Roboto', 'Arial', 'Poppins', 'Montserrat', 'Open Sans', 'Lato', 'Space Grotesk', 'Playfair Display', 'Nunito', 'system-ui', 'Segoe UI', '-apple-system', 'Georgia', 'Helvetica', 'Helvetica Neue', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Times', 'Times New Roman', 'Verdana', 'Tahoma', 'Trebuchet MS', 'Palatino', 'Calibri', 'Cambria', 'Courier New', 'Impact', 'ui-sans-serif', 'ui-serif', 'sans-serif', 'serif'];
export const BANNED_WORDS = /\b(elevate[ds]?|unleash(es|ed)?|unlock(s|ed)?|reimagin\w+|seamless(ly)?|game-?chang\w+|cutting-?edge|next-?level|world-?class|unforgettable|revolutioni[sz]\w+|lorem ipsum|your text here)\b|discover the future|where [a-z ]{2,20} meets/i;

html.split('\n').forEach((line, i) => {
  if (/slop-ok/.test(line)) return;
  const at = `line ${i + 1}`;
  if (/(linear|radial|conic)-gradient\(/.test(line)) warn('gradient', `${at}: gradient. Use flat colour (or add a slop-ok: reason)`);
  if (/text-shadow\s*:|backdrop-filter\s*:|filter\s*:[^;]*(blur|drop-shadow)/.test(line)) warn('glow-shadow', `${at}: text-shadow / blur / backdrop-filter`);
  if (/box-shadow\s*:(?!\s*none)/.test(line)) warn('glow-shadow', `${at}: box-shadow. A poster is flat ink on paper`);
  if (/\p{Extended_Pictographic}|[✓✔✕✗◉✎↗↘↖↙→←↑↓➜➔]/u.test(line)) warn('emoji', `${at}: emoji or glyph icon`);
  if (/writing-mode\s*:|rotate\(/.test(line)) warn('rotated', `${at}: rotated text or shape. Rotation is a crutch`);
  if (/—/.test(line) && !/^\s*(\/\/|<!--|\/\*)/.test(line)) warn('em-dash', `${at}: em dash. Use a full stop or comma`);
  const w = line.match(BANNED_WORDS);
  if (w) warn('cliche-copy', `${at}: "${w[0]}"`);
  if (/<img\b(?![^>]*\balt=)/i.test(line)) warn('img-alt', `${at}: <img> without alt`);
  for (const m of line.matchAll(/(?:font-family|--font[\w-]*)\s*:\s*([^;}]+)/gi)) {
    const first = m[1].split(',')[0].replace(/["']/g, '').trim();
    const bad = BANNED_FONTS.find((f) => f.toLowerCase() === first.toLowerCase());
    if (bad) warn('default-font', `${at}: first font is "${bad}", a default or system face. Load a real one (reference/type.md)`);
  }
});

const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({ sel: m[1].trim(), body: m[2] }));
for (const r of rules) {
  if (/slop-ok/.test(r.body)) continue;
  if (/text-transform\s*:\s*uppercase/.test(r.body) && /letter-spacing\s*:\s*(0?\.(0[89]|[1-9])\d*|[1-9]\d*(\.\d+)?)(em|px|rem)/.test(r.body))
    warn('tracked-caps', `"${r.sel}": letter-spaced capitals (the eyebrow tell)`);
}
const outsideRoot = css.replace(/:root\s*\{[^}]*\}/g, '');
const rawHex = outsideRoot.match(/(?<![&\w])#[0-9a-fA-F]{6}\b|(?<![&\w])#[0-9a-fA-F]{3}\b|\brgba?\(/g);
if (rawHex) warn('raw-colour', `${new Set(rawHex).size} raw colour value(s) outside :root. Use var(--paper|--ink|--accent)`);
const rootHex = new Set((css.match(/:root\s*\{[^}]*\}/g) || []).join('').match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) || []);
if (rootHex.size > 4) warn('palette', `${rootHex.size} colours in :root. Paper + ink + one accent (a fourth at most)`);
const fams = new Set();
for (const m of css.matchAll(/(?:font-family|--font[\w-]*)\s*:\s*([^;}]+)/gi)) {
  const first = m[1].split(',')[0].replace(/["']/g, '').trim();
  if (first && !/^(inherit|var\(|serif|sans-serif|monospace)/i.test(first)) fams.add(first);
}
if (fams.size > 2) warn('typefaces', `${fams.size} typefaces (${[...fams].join(', ')}). Use one family, or one display + one text`);
if ((css.match(/text-align\s*:\s*center/g) || []).length >= 3) warn('centred', 'text-align:center used 3+ times. Is this layout a decision or a default?');

// ---------- render + layout checks ----------
let chromium;
try { ({ chromium } = await import('playwright')); }
catch { console.error('playwright missing. Run once:  cd ' + dirname(new URL(import.meta.url).pathname) + ' && npm i && npx playwright install chromium'); process.exit(2); }

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 1600 }, deviceScaleFactor: 1 });
await page.addInitScript(() => { window.__RENDER__ = true; });
await page.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' }).catch(() => {});
await page.evaluate(() => document.fonts.ready);
const box = await page.locator('.poster').boundingBox();
if (!box) { console.error('No .poster element found.'); await browser.close(); process.exit(2); }
const W = Math.round(box.width), H = Math.round(box.height);
await page.setViewportSize({ width: W, height: H });

const issues = await page.evaluate(() => {
  const out = [];
  const poster = document.querySelector('.poster');
  const P = poster.getBoundingClientRect();
  const parse = (c) => { const m = c.match(/[\d.]+/g)?.map(Number) || [0, 0, 0, 1]; return { r: m[0], g: m[1], b: m[2], a: m[3] ?? 1 }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c.a > 0.9) return c; } return { r: 255, g: 255, b: 255 }; };
  const hasImageBehind = (el) => { for (let e = el; e && e !== poster.parentElement; e = e.parentElement) { if (getComputedStyle(e).backgroundImage !== 'none') return true; } return false; };
  const fams = new Set();
  const ys = [];
  const walker = document.createTreeWalker(poster, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let n; (n = walker.nextNode()); ) {
    const el = n.parentElement; const t = n.textContent.trim();
    if (!t || seen.has(el) || ['SCRIPT', 'STYLE'].includes(el.tagName)) continue;
    seen.add(el);
    const cs = getComputedStyle(el); if (cs.visibility === 'hidden' || cs.display === 'none') continue;
    const range = document.createRange(); range.selectNodeContents(n);
    const r = range.getBoundingClientRect(); if (!r.width) continue;
    const label = `"${t.slice(0, 28)}"`;
    // vertical extent from the line boxes, not the font's content area (tight display line-heights overshoot it)
    const eb = el.getBoundingClientRect(); const top = Math.max(r.top, eb.top), bottom = Math.min(r.bottom, eb.bottom);
    const fs = parseFloat(cs.fontSize);
    ys.push([top - P.top, bottom - P.top]);
    fams.add(cs.fontWeight + '|' + cs.fontFamily.split(',')[0].replace(/["']/g, '').trim());
    if (!el.closest('[data-bleed]') && (r.left < P.left - 1 || r.right > P.right + 1 || top < P.top - 1 || bottom > P.bottom + 1)) out.push(['off-poster', `${label} runs outside the poster`]);
    else if (!el.closest('[data-bleed]') && Math.min(r.left - P.left, P.right - r.right, top - P.top, P.bottom - bottom) < P.width * 0.03) out.push(['margin', `${label} is within 3% of an edge`]);
    if (fs < P.width * 0.012) out.push(['tiny-text', `${label} is ${fs.toFixed(0)}px (min ${(P.width * 0.012).toFixed(0)}px)`]);
    if (el.scrollWidth > el.clientWidth + 2 && cs.overflowX !== 'visible') out.push(['clipped', `${label} is clipped`]);
    if (!hasImageBehind(el)) {
      const fg = parse(cs.color), bg = bgOf(el);
      const [a, b] = [lum(fg), lum(bg)]; const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const need = fs >= P.width * 0.04 ? 3 : 4.5;
      if (ratio < need) out.push(['contrast', `${label} contrast ${ratio.toFixed(1)}:1 (needs ${need}:1)`]);
    }
  }
  // dead band: a full-width horizontal stretch with nothing painted in it
  for (const el of poster.querySelectorAll('*')) {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (!r.width || !r.height || cs.display === 'none' || cs.visibility === 'hidden') continue;
    if (r.width >= P.width - 2 && r.height >= P.height - 2) continue;
    if (parse(cs.backgroundColor).a > 0.05 || ['SVG', 'IMG', 'CANVAS', 'VIDEO'].includes(el.tagName.toUpperCase())) ys.push([r.top - P.top, r.bottom - P.top]);
  }
  ys.sort((a, b) => a[0] - b[0]);
  let reach = ys.length ? ys[0][1] : 0;
  for (const [a, b] of ys) { if (a - reach > P.height * 0.25) out.push(['dead-band', `empty band across the page from ${Math.round(reach)}px to ${Math.round(a)}px (${Math.round(((a - reach) / P.height) * 100)}% of the height). Make the hero bigger or put the info into the structure`]); reach = Math.max(reach, b); }
  for (const k of fams) { const [w, f] = k.split('|'); if (!/^(serif|sans-serif|monospace)$/.test(f) && !document.fonts.check(`${w} 16px "${f}"`)) out.push(['font-failed', `font "${f}" (weight ${w}) did not load; the page fell back to a default`]); }
  return out;
});
for (const [rule, detail] of issues) warn(rule, detail);

// high-res PNG via device scale factor
const hi = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
await hi.addInitScript(() => { window.__RENDER__ = true; });
await hi.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' }).catch(() => {});
await hi.evaluate(() => document.fonts.ready);
await hi.screenshot({ path: join(outDir, `${name}.png`), clip: { x: 0, y: 0, width: W, height: H } });
if (args.includes('--pdf')) await hi.pdf({ path: join(outDir, `${name}.pdf`), width: `${W}px`, height: `${H}px`, printBackground: true, pageRanges: '1' });

const th = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 200 / W });
await th.addInitScript(() => { window.__RENDER__ = true; });
await th.goto(pathToFileURL(src).href, { waitUntil: 'networkidle' }).catch(() => {});
await th.evaluate(() => document.fonts.ready);
await th.addStyleTag({ content: '.poster{filter:grayscale(1)}' });
await th.screenshot({ path: join(outDir, `${name}.thumb.png`), clip: { x: 0, y: 0, width: W, height: H } });
await browser.close();

console.log(`rendered ${W}x${H} @${scale}x -> ${join(outDir, name + '.png')}`);
console.log(`squint test -> ${join(outDir, name + '.thumb.png')} (look at it: can you still read the hero and find the date?)`);
if (warns.length) { console.log('\n' + warns.join('\n') + `\n\n${warns.length} slop tell(s). Fix them, or waive one line with a "slop-ok: reason" comment.`); process.exit(1); }
console.log('\nclean: 0 slop tells. Now LOOK at the PNG; the checks cannot judge taste.');

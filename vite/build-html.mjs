// Build entry HTMLs by stripping CDN React/Babel scripts and inline babel blocks,
// and injecting a single <script type="module" src="./src/<name>/main.jsx">.
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve(import.meta.dirname, '..');
const OUT = path.resolve(import.meta.dirname);

const pages = [
  { name: 'onboarding',   html: 'SUNX Sense Onboarding.html'   },
  { name: 'gamification', html: 'SUNX Sense Gamification.html' },
  { name: 'tiers',        html: 'SUNX Sense Tiers.html'        },
  { name: 'consent',      html: 'SUNX Sense Consent.html'      },
];

for (const p of pages) {
  let html = fs.readFileSync(path.join(SRC, p.html), 'utf8');

  // Remove CDN React, ReactDOM, Babel script tags (any of those three).
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/(react|react-dom|@babel\/standalone)[^"]*"[^>]*><\/script>\s*/g,
    ''
  );

  // Remove all <script type="text/babel" ...>...</script> blocks (inline or external).
  html = html.replace(/<script\s+type="text\/babel"[^>]*>[\s\S]*?<\/script>\s*/g, '');

  // Inject our module script just before </body>.
  const moduleTag = `<script type="module" src="/src/${p.name}/main.jsx"></script>\n`;
  html = html.replace(/<\/body>/i, `${moduleTag}</body>`);

  const outPath = path.join(OUT, `${p.name}.html`);
  fs.writeFileSync(outPath, html);
  console.log(`wrote ${outPath}`);
}

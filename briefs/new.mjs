#!/usr/bin/env node
// briefs/new.mjs — scaffold a new brief.
//
//   node briefs/new.mjs <slug> [<client>]
//
// Creates briefs/data/<slug>.json prefilled from the Carbostar example.
// You then edit it and run `node briefs/build.mjs`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const [, , slugArg, clientArg] = process.argv;

if (!slugArg) {
  console.error('Usage: node briefs/new.mjs <slug> [<client>]');
  console.error('Example: node briefs/new.mjs acme-cop31 "Acme Industries"');
  process.exit(1);
}

const slug = slugArg.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const dst = path.join(HERE, 'data', `${slug}.json`);

if (fs.existsSync(dst)) {
  console.error(`✗ Already exists: briefs/data/${slug}.json`);
  console.error('  Edit it directly, or pick a different slug.');
  process.exit(1);
}

// Seed from the Carbostar example (canonical reference).
const seed = JSON.parse(fs.readFileSync(path.join(HERE, 'data', 'carbostar-px-zwf2026.json'), 'utf8'));

// Replace identifying fields with placeholders the user must fill in.
seed.meta.client = clientArg || 'TODO Client Name';
seed.meta.project = 'TODO Project Name';
seed.meta.documentId = 'TODO-PROPOSAL-ID';
seed.meta.eventDate = new Date(Date.now() + 90 * 86400000).toISOString();
seed.meta.updatedAt = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
seed.meta.outputFilename = `${clientArg || 'TODO'} Mission Brief.html`;

seed.hero.eyebrow = `TODO EVENT NAME · OPERATIONAL BRIEF · CUSTOMER`;
seed.hero.headline.lines = ['TODO line one.', 'TODO line two.'];
seed.hero.headline.accent = 'TODO accent line.';
seed.hero.lede = 'TODO 1–2 sentence summary of the deployment.';

fs.writeFileSync(dst, JSON.stringify(seed, null, 2) + '\n');

console.log(`✓ Created briefs/data/${slug}.json`);
console.log('');
console.log('Next:');
console.log(`  1. Edit briefs/data/${slug}.json (fill in TODOs).`);
console.log(`  2. Run:   node briefs/build.mjs`);
console.log(`  3. The new brief appears on the home page.`);

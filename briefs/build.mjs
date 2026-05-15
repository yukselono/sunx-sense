#!/usr/bin/env node
// briefs/build.mjs — canonical build command.
//
//   node briefs/build.mjs
//
// 1. Scans briefs/data/*.json
// 2. Renders each to the repo root using briefs/template.html
// 3. Rebuilds briefs/manifest.json from scratch so it always reflects data/
//
// Idempotent. Delete a JSON in data/ → its HTML at root and its manifest
// entry both disappear on the next build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const DATA_DIR = path.join(HERE, 'data');
const TEMPLATE = path.join(HERE, 'template.html');
const MANIFEST = path.join(HERE, 'manifest.json');

const tpl = fs.readFileSync(TEMPLATE, 'utf8');

const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c]));

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function renderStats(stats) {
  return stats.map(s => `
    <div class="stat">
      <div class="v">${escapeHTML(s.v)}</div>
      <div class="l">${escapeHTML(s.l)}</div>
      <div class="sub">${escapeHTML(s.sub || '')}</div>
    </div>`).join('');
}

function renderPhases(phases) {
  const statusColor = {
    DONE:    'oklch(0.72 0.14 155)',
    ACTIVE:  'oklch(0.65 0.14 230)',
    NEXT:    'rgba(255,255,255,0.3)',
    BLOCKED: 'oklch(0.65 0.18 25)',
  };
  return phases.map(p => `
    <div class="phase phase-${p.status.toLowerCase()}">
      <div class="status" style="color:${statusColor[p.status]}">● ${p.status}</div>
      <div class="id">${escapeHTML(p.id)}</div>
      <div class="title">${escapeHTML(p.title)}</div>
      <div class="window">${escapeHTML(p.window)}</div>
      <div class="deliverable">${escapeHTML(p.deliverable)}</div>
    </div>`).join('');
}

function renderRisks(risks) {
  const sevColor = {
    LOW:  'oklch(0.72 0.14 155)',
    MED:  'oklch(0.78 0.14 75)',
    HIGH: 'oklch(0.65 0.18 25)',
  };
  return risks.map(r => `
    <div class="risk">
      <div class="risk-head">
        <h3>${escapeHTML(r.title)}</h3>
        <span class="sev" style="background:${sevColor[r.severity]}">${r.severity}</span>
      </div>
      <div class="risk-owner">OWNER · ${escapeHTML(r.owner)}</div>
      <p>${escapeHTML(r.mitigation)}</p>
    </div>`).join('');
}

function renderBridge(nodes) {
  return nodes.map(n => `
    <div class="bridge-node">
      <div class="when">${escapeHTML(n.when)}</div>
      <div class="what">${escapeHTML(n.what)}</div>
      <div class="desc">${escapeHTML(n.desc)}</div>
    </div>`).join('');
}

function renderOne(data, outputFilename, slug) {
  const tokens = {
    'meta.client':        escapeHTML(data.meta.client),
    'meta.project':       escapeHTML(data.meta.project),
    'meta.documentId':    escapeHTML(data.meta.documentId),
    'meta.eventDate':     data.meta.eventDate,
    'meta.updatedAt':     escapeHTML(data.meta.updatedAt),
    'meta.audience':      escapeHTML(data.meta.audience || 'CUSTOMER'),

    'hero.eyebrow':       escapeHTML(data.hero.eyebrow),
    'hero.line1':         escapeHTML(data.hero.headline.lines[0] || ''),
    'hero.line2':         escapeHTML(data.hero.headline.lines[1] || ''),
    'hero.accent':        escapeHTML(data.hero.headline.accent),
    'hero.lede':          escapeHTML(data.hero.lede),
    'hero.stats':         renderStats(data.hero.stats),

    'stage.venue':        escapeHTML(data.stage.venue),
    'stage.dates':        escapeHTML(data.stage.dates),
    'stage.format':       escapeHTML(data.stage.format),
    'stage.scale':        escapeHTML(data.stage.scale),
    'stage.role':         escapeHTML(data.stage.role),
    'stage.frontStage.who':  escapeHTML(data.stage.frontStage.who),
    'stage.frontStage.sub':  escapeHTML(data.stage.frontStage.sub),
    'stage.backStage.who':   escapeHTML(data.stage.backStage.who),
    'stage.backStage.sub':   escapeHTML(data.stage.backStage.sub),

    'fleet.units':        String(data.fleet.units),
    'fleet.buffer':       String(data.fleet.buffer),
    'fleet.lot':          escapeHTML(data.fleet.lot),
    'fleet.idRange':      escapeHTML(data.fleet.idRange),
    'fleet.calibration':  escapeHTML(data.fleet.calibration),
    'fleet.shipDate':     escapeHTML(data.fleet.shipDate),

    'dashboard.headline':    escapeHTML(data.dashboard.headline),
    'dashboard.description': escapeHTML(data.dashboard.description),
    'dashboard.streamCount': String(data.dashboard.streamCount),
    'dashboard.languages':   data.dashboard.languages.map(l => `<span class="lang-pill">${escapeHTML(l)}</span>`).join(' '),

    'roadmap.phases':     renderPhases(data.roadmap.phases),
    'risks':              renderRisks(data.risks),

    'closing.bridge':     renderBridge(data.closing.bridgeNodes),
    'closing.manifesto':  escapeHTML(data.closing.manifesto),
    'closing.signoff':    escapeHTML(data.closing.signoff),
  };

  let out = tpl;
  for (const [k, v] of Object.entries(tokens)) out = out.replaceAll(`{{${k}}}`, v);

  const leftover = out.match(/\{\{[a-zA-Z0-9_.]+\}\}/g);
  if (leftover) console.warn(`  ⚠ ${slug}: ${leftover.length} unresolved token(s):`, [...new Set(leftover)]);

  fs.writeFileSync(path.join(ROOT, outputFilename), out);
}

function manifestEntry(data, slug, outputFilename) {
  return {
    slug,
    client:     data.meta.client,
    project:    data.meta.project,
    event:      data.hero.eyebrow.split('·')[0].trim(),
    venue:      data.stage.venue,
    dates:      data.stage.dates,
    eventDate:  data.meta.eventDate,
    documentId: data.meta.documentId,
    updatedAt:  data.meta.updatedAt,
    status:     Date.parse(data.meta.eventDate) > Date.now() ? 'ACTIVE' : 'PAST',
    url:        outputFilename,
    accentHue:  data.meta.accentHue ?? 230,
    headline:   [data.hero.headline.lines.join(' '), data.hero.headline.accent].join(' '),
    handcrafted: !!data.meta.skipBuild,
  };
}

// ─── Run ────────────────────────────────────────────────────

if (!fs.existsSync(DATA_DIR)) {
  console.error(`✗ briefs/data/ not found. Create it and add JSON files.`);
  process.exit(1);
}

const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json')).sort();
if (!files.length) {
  console.warn(`⚠ No briefs in briefs/data/. Manifest will be empty.`);
}

console.log(`Building ${files.length} brief${files.length === 1 ? '' : 's'} from briefs/data/`);

// Track files we render so we can clean up stale outputs.
const renderedFilenames = new Set();
const entries = [];

for (const f of files) {
  const slug = path.basename(f, '.json');
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8'));
  const outputFilename = data.meta.outputFilename || `${data.meta.client} ${data.meta.project} Mission Brief.html`;

  if (data.meta.skipBuild) {
    console.log(`  · ${slug} → ${outputFilename} (skipBuild: hand-crafted)`);
  } else {
    console.log(`  · ${slug} → ${outputFilename}`);
    renderOne(data, outputFilename, slug);
  }
  renderedFilenames.add(outputFilename);
  entries.push(manifestEntry(data, slug, outputFilename));
}

// Stale-output cleanup: read previous manifest, remove any HTML at root whose
// filename was in the OLD manifest but isn't in the new one.
let prev = { briefs: [] };
try { prev = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch {}
for (const oldEntry of prev.briefs || []) {
  if (!renderedFilenames.has(oldEntry.url) && oldEntry.handcrafted !== true) {
    const stale = path.join(ROOT, oldEntry.url);
    if (fs.existsSync(stale)) {
      fs.unlinkSync(stale);
      console.log(`  ✗ removed stale: ${oldEntry.url}`);
    }
  }
}

const manifest = {
  $comment: 'Auto-generated by briefs/build.mjs from briefs/data/*.json. Do not edit by hand.',
  generatedAt: new Date().toISOString(),
  briefs: entries,
};
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`✓ manifest.json updated (${entries.length} brief${entries.length === 1 ? '' : 's'})`);

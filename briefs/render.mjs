#!/usr/bin/env node
// Mission Brief renderer.
// Usage: node render.mjs <data.json> <output.html>
//
// Reads template.html, substitutes {{tokens}} from the data file's flat-key form,
// and writes the result. Arrays/objects expand into HTML lists via convention.

import fs from 'node:fs';
import path from 'node:path';

const [, , dataPath, outPath] = process.argv;
if (!dataPath || !outPath) {
  console.error('Usage: node render.mjs <data.json> <output.html>');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const tpl  = fs.readFileSync(path.join(import.meta.dirname, 'template.html'), 'utf8');

// Flat-key access: "meta.client" -> data.meta.client
const get = (obj, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

// ---- Section renderers ----

const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c]));

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

// ---- Token table ----

const tokens = {
  'meta.client':        escapeHTML(data.meta.client),
  'meta.project':       escapeHTML(data.meta.project),
  'meta.documentId':    escapeHTML(data.meta.documentId),
  'meta.eventDate':     data.meta.eventDate, // raw ISO for JS countdown
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

// ---- Substitute ----

let out = tpl;
for (const [k, v] of Object.entries(tokens)) {
  out = out.replaceAll(`{{${k}}}`, v);
}

// Warn on leftover tokens (likely a schema gap).
const leftover = out.match(/\{\{[a-zA-Z0-9_.]+\}\}/g);
if (leftover) {
  console.warn(`⚠ ${leftover.length} unresolved token(s):`, [...new Set(leftover)]);
}

fs.writeFileSync(outPath, out);
console.log(`✓ wrote ${outPath} (${out.length} bytes)`);

// ---- Update manifest so the home-page gallery auto-picks up this brief ----
const manifestPath = path.join(import.meta.dirname, 'manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const slug = path.basename(outPath, path.extname(outPath))
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const entry = {
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
  // URL is relative to the repo root (where the home page lives).
  url:        path.relative(path.dirname(manifestPath) + '/..', outPath),
  accentHue:  230,
  headline:   [data.hero.headline.lines.join(' '), data.hero.headline.accent].join(' '),
};

const idx = manifest.briefs.findIndex(b => b.slug === slug);
if (idx >= 0) manifest.briefs[idx] = entry;
else manifest.briefs.push(entry);

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`✓ manifest updated (${manifest.briefs.length} brief${manifest.briefs.length === 1 ? '' : 's'})`);

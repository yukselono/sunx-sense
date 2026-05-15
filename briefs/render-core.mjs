// Pure render logic — works in Node (build.mjs) and in the browser (import.html).
// Takes the template HTML string and a brief data object, returns rendered HTML.

export const escapeHTML = (s) => String(s).replace(/[&<>"']/g, c => ({
  '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
}[c]));

export function renderStats(stats) {
  return stats.map(s => `
    <div class="stat">
      <div class="v">${escapeHTML(s.v)}</div>
      <div class="l">${escapeHTML(s.l)}</div>
      <div class="sub">${escapeHTML(s.sub || '')}</div>
    </div>`).join('');
}

export function renderPhases(phases) {
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

export function renderRisks(risks) {
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

export function renderBridge(nodes) {
  return nodes.map(n => `
    <div class="bridge-node">
      <div class="when">${escapeHTML(n.when)}</div>
      <div class="what">${escapeHTML(n.what)}</div>
      <div class="desc">${escapeHTML(n.desc)}</div>
    </div>`).join('');
}

// Archetype defaults — fill in section.* labels when the JSON doesn't override.
// briefType drives which preset is used: 'hardware' | 'saas' | 'ai' | 'grid' | 'generic'.
const ARCHETYPE_DEFAULTS = {
  hardware: {
    stage:     { eyebrow: '01 · THE STAGE',  title: 'Where it all happens.', venueLabel: 'VENUE',
                 label1: 'Dates', label2: 'Format', label3: 'Scale' },
    fleet:     { eyebrow: '02 · FLEET',      title: 'Every unit. Tracked. Calibrated. Bound for the stage.',
                 unitsLabel: 'Primary units', bufferLabel: 'Buffer', bufferSub: 'Shadow units',
                 lotLabel: 'Lot', lotSub: 'BoM locked',
                 shipLabel: 'Ship date', shipSub: 'to venue',
                 idIcon: '📡', calibrationIcon: '🎯' },
    dashboard: { eyebrow: '03 · DASHBOARD',  streamLabel: 'CONCURRENT STREAMS · LIVE' },
    roadmap:   { eyebrow: '04 · ROADMAP',    title: 'From production lock to case study — phase by phase.' },
    risks:     { eyebrow: '05 · RISKS',      title: 'What could break — and how we already handle it.' },
    bridge:    { eyebrow: '06 · BRIDGE',     title: 'This deployment is a seed, not a destination.' },
  },
  saas: {
    stage:     { eyebrow: '01 · ENGAGEMENT', title: 'How the relationship is set up.', venueLabel: 'ENGAGEMENT',
                 label1: 'Kickoff', label2: 'Format', label3: 'Scale' },
    fleet:     { eyebrow: '02 · SCOPE',      title: 'Every seat. Provisioned. Trained.',
                 unitsLabel: 'Seats', bufferLabel: 'Headroom', bufferSub: 'Reserved capacity',
                 lotLabel: 'Tier', lotSub: 'Plan',
                 shipLabel: 'Onboarding', shipSub: 'Kickoff date',
                 idIcon: '🏢', calibrationIcon: '📊' },
    dashboard: { eyebrow: '03 · REPORTING',  streamLabel: 'WORKSPACES · LIVE' },
    roadmap:   { eyebrow: '04 · ROLLOUT',    title: 'From contracts signed to first quarterly review.' },
    risks:     { eyebrow: '05 · RISKS',      title: 'What could slow this down — and how we already handle it.' },
    bridge:    { eyebrow: '06 · EXPANSION',  title: 'Onboarding is the start, not the finish.' },
  },
  ai: {
    stage:     { eyebrow: '01 · PILOT',      title: 'How the pilot is structured.', venueLabel: 'PILOT SCOPE',
                 label1: 'Pilot window', label2: 'Format', label3: 'Scale' },
    fleet:     { eyebrow: '02 · MODELS',     title: 'Every model. Trained. Validated. Deployed.',
                 unitsLabel: 'Models', bufferLabel: 'Variants', bufferSub: 'A/B candidates',
                 lotLabel: 'Family', lotSub: 'Architecture',
                 shipLabel: 'Go-live', shipSub: 'Production date',
                 idIcon: '🧠', calibrationIcon: '🎯' },
    dashboard: { eyebrow: '03 · OBSERVABILITY', streamLabel: 'INFERENCE STREAMS · LIVE' },
    roadmap:   { eyebrow: '04 · PIPELINE',   title: 'From data audit to monitoring — phase by phase.' },
    risks:     { eyebrow: '05 · RISKS',      title: 'What could degrade the model — and how we already handle it.' },
    bridge:    { eyebrow: '06 · NEXT MODELS', title: 'Each model unlocks the next.' },
  },
  grid: {
    stage:     { eyebrow: '01 · GRID NODE',  title: 'Where the integration happens.', venueLabel: 'SITE',
                 label1: 'Pilot window', label2: 'Topology', label3: 'Scale' },
    fleet:     { eyebrow: '02 · ASSETS',     title: 'Every inverter. Wired. Forecasting.',
                 unitsLabel: 'Inverters', bufferLabel: 'Reserve', bufferSub: 'Capacity headroom',
                 lotLabel: 'Phase', lotSub: 'Installation tier',
                 shipLabel: 'Energize', shipSub: 'Commissioning date',
                 idIcon: '⚡', calibrationIcon: '🛰' },
    dashboard: { eyebrow: '03 · TELEMETRY',  streamLabel: 'GRID POINTS · LIVE' },
    roadmap:   { eyebrow: '04 · ROADMAP',    title: 'From site survey to grid-scale operation — phase by phase.' },
    risks:     { eyebrow: '05 · RISKS',      title: 'What could fault the integration — and how we already handle it.' },
    bridge:    { eyebrow: '06 · GRID GROWTH', title: 'A node today, a network tomorrow.' },
  },
  generic: {
    stage:     { eyebrow: '01 · ENGAGEMENT', title: 'How the work is set up.', venueLabel: 'SCOPE',
                 label1: 'Window', label2: 'Format', label3: 'Scale' },
    fleet:     { eyebrow: '02 · DELIVERABLES', title: 'Every item. Specified. Delivered.',
                 unitsLabel: 'Units', bufferLabel: 'Buffer', bufferSub: 'Reserve',
                 lotLabel: 'Batch', lotSub: 'Identifier',
                 shipLabel: 'Delivery', shipSub: 'Date',
                 idIcon: '📦', calibrationIcon: '✅' },
    dashboard: { eyebrow: '03 · DASHBOARD',  streamLabel: 'DATA SOURCES · LIVE' },
    roadmap:   { eyebrow: '04 · ROADMAP',    title: 'From kickoff to handover — phase by phase.' },
    risks:     { eyebrow: '05 · RISKS',      title: 'What could break — and how we already handle it.' },
    bridge:    { eyebrow: '06 · WHAT NEXT',  title: 'This delivery is a start, not an end.' },
  },
};

function resolveSection(data) {
  const type = (data.meta?.briefType) || 'hardware';
  const preset = ARCHETYPE_DEFAULTS[type] || ARCHETYPE_DEFAULTS.generic;
  const user = data.section || {};
  // Shallow-merge user-supplied section overrides on top of the archetype preset.
  const out = {};
  for (const k of Object.keys(preset)) {
    out[k] = { ...preset[k], ...(user[k] || {}) };
  }
  return out;
}

export function renderBrief(template, data) {
  const section = resolveSection(data);
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

    // Section labels (archetype-driven, user-overridable)
    'section.stage.eyebrow':     escapeHTML(section.stage.eyebrow),
    'section.stage.title':       escapeHTML(section.stage.title),
    'section.stage.venueLabel':  escapeHTML(section.stage.venueLabel),
    'section.stage.label1':      escapeHTML(section.stage.label1),
    'section.stage.label2':      escapeHTML(section.stage.label2),
    'section.stage.label3':      escapeHTML(section.stage.label3),

    'section.fleet.eyebrow':         escapeHTML(section.fleet.eyebrow),
    'section.fleet.title':           escapeHTML(section.fleet.title),
    'section.fleet.unitsLabel':      escapeHTML(section.fleet.unitsLabel),
    'section.fleet.bufferLabel':     escapeHTML(section.fleet.bufferLabel),
    'section.fleet.bufferSub':       escapeHTML(section.fleet.bufferSub),
    'section.fleet.lotLabel':        escapeHTML(section.fleet.lotLabel),
    'section.fleet.lotSub':          escapeHTML(section.fleet.lotSub),
    'section.fleet.shipLabel':       escapeHTML(section.fleet.shipLabel),
    'section.fleet.shipSub':         escapeHTML(section.fleet.shipSub),
    'section.fleet.idIcon':          section.fleet.idIcon,
    'section.fleet.calibrationIcon': section.fleet.calibrationIcon,

    'section.dashboard.eyebrow':     escapeHTML(section.dashboard.eyebrow),
    'section.dashboard.streamLabel': escapeHTML(section.dashboard.streamLabel),

    'section.roadmap.eyebrow': escapeHTML(section.roadmap.eyebrow),
    'section.roadmap.title':   escapeHTML(section.roadmap.title),
    'section.risks.eyebrow':   escapeHTML(section.risks.eyebrow),
    'section.risks.title':     escapeHTML(section.risks.title),
    'section.bridge.eyebrow':  escapeHTML(section.bridge.eyebrow),
    'section.bridge.title':    escapeHTML(section.bridge.title),
  };

  let out = template;
  for (const [k, v] of Object.entries(tokens)) out = out.replaceAll(`{{${k}}}`, v);

  const leftover = out.match(/\{\{[a-zA-Z0-9_.]+\}\}/g);
  return { html: out, leftover: leftover ? [...new Set(leftover)] : [] };
}

export function manifestEntry(data, slug, outputFilename) {
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

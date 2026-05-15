import React, { useReducer, useEffect, useMemo, memo } from 'react';
import { Plus, Trash2, FileUp, Download, Image as ImageIcon, Zap, Users, Calculator } from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const CATALOG = {
  carboware: { id: "carboware", name: "Carboware Enterprise", specs: "Bulut tabanlı, Kapsam 1-2-3 Raporlama, ÇYS Paneli", basePrice: 40000 },
  carbostar: { id: "carbostar", name: "PX Carbostar", specs: "Taşınabilir CO₂ Sensörü", basePrice: 150 },
  senseai: { id: "senseai", name: "SenseAI Motoru", specs: "ML kestirimci bakım, anomali tespiti", basePrice: 35000 },
  sunx: { id: "sunx", name: "SUNX Akıllı Şebeke", specs: "Inverter API, Hava durumu tahmini", basePrice: 30000 },
  custom: { id: "custom", name: "Özel Donanım / Hizmet", specs: "", basePrice: 0 }
};

const CURRENCIES = {
  "USD": { symbol: "$", locale: "en-US", name: "USD" },
  "EUR": { symbol: "€", locale: "de-DE", name: "EUR" },
  "TRY": { symbol: "₺", locale: "tr-TR", name: "TRY" }
};

const TAX_RATE = 0.20;
const DEFAULTS = {
  DELIVERY: '10-14 iş günü',
  WARRANTY: '24 Ay'
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
  
  :root {
    --onox-blue: #00B4FF;
    --onox-navy: #0A1128;
    --navy-2: #1B2748;
    --grey-700: #3B4866;
    --grey-500: #5A6B85;
    --grey-300: #9AA5BA;
    --grey-200: #D0D8E5;
    --grey-100: #EEF1F6;
    --grey-50: #F7F9FC;
    --rule-1: 1px solid var(--grey-100);
    --rule-2: 1px solid var(--grey-200);
  }

  body {
    background-color: var(--grey-50);
    color: var(--onox-navy);
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .mono { font-family: "JetBrains Mono", ui-monospace, monospace; letter-spacing: 0; }

  /* A4 Container */
  .a4-page {
    box-sizing: border-box; width: 210mm; min-height: 297mm; margin: 24px auto;
    background: #fff; position: relative; overflow: hidden;
    box-shadow: 0 12px 32px rgba(10,17,40,.10), 0 4px 8px rgba(10,17,40,.05);
    padding: 12mm 14mm; display: flex; flex-direction: column; gap: 0;
  }
  .a4-page * { box-sizing: border-box; }

  .x-wm { position: absolute; pointer-events: none; color: var(--onox-blue); font-weight: 900; font-family: "Inter", sans-serif; line-height: .78; letter-spacing: -0.06em; opacity: .05; user-select: none; }
  .x-wm.tr { font-size: 720px; top: -160px; right: -220px; }
  .x-wm.bl { font-size: 480px; bottom: -200px; left: -160px; opacity: .04; }

  .band { position: relative; z-index: 1; flex-shrink: 0; }
  .header-band { display: flex; align-items: center; justify-content: space-between; border-bottom: var(--rule-2); padding-bottom: 4px; }
  
  .hero-band { display: grid; grid-template-columns: 1.3fr 1fr; gap: 10mm; border-bottom: var(--rule-2); padding: 6mm 0 5mm; align-items: start; position: relative; }
  .hero-h1 { margin: 0; font-weight: 900; font-size: 36pt; line-height: 1.0; letter-spacing: -0.04em; color: var(--onox-navy); white-space: pre-wrap; }
  .hero-lead { margin: 4mm 0 0; font-size: 8.5pt; line-height: 1.5; color: var(--grey-700); max-width: 90%; }
  
  .mockups { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; border-left: var(--rule-1); padding-left: 6mm; height: 100%; }
  .mockups .label { grid-column: 1 / -1; display: flex; justify-content: space-between; border-bottom: var(--rule-1); padding-bottom: 3px; }
  
  .midgrid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 12mm; padding: 8mm 0; border-bottom: var(--rule-2); }
  .midgrid .col:nth-child(2) { position: relative; }
  .midgrid .col:nth-child(2)::before { content: ""; position: absolute; left: -6mm; top: 0; bottom: 0; width: 1px; background-color: var(--grey-100); }
  
  .sec-hd { display: flex; align-items: flex-start; gap: 5px; margin-bottom: 5mm; }
  .sec-hd .num { font-weight: 900; font-size: 14pt; color: var(--onox-blue); line-height: 1; }
  .sec-hd .text .eb { display: block; font-weight: 700; font-size: 6.6pt; letter-spacing: 1.2px; color: var(--grey-500); text-transform: uppercase; }
  .sec-hd .text .ti { font-weight: 800; font-size: 11pt; color: var(--onox-navy); letter-spacing: -0.02em; }
  
  .spec { display: grid; grid-template-columns: max-content 1fr; row-gap: 0; column-gap: 6mm; }
  .spec .k { font-weight: 700; font-size: 6.2pt; letter-spacing: 1.2px; color: var(--grey-500); border-bottom: var(--rule-1); padding: 4.5px 0; }
  .spec .v { font-family: "JetBrains Mono", monospace; font-size: 7pt; color: var(--onox-navy); border-bottom: var(--rule-1); padding: 4.5px 0; }

  .pricing { display: grid; grid-template-columns: 0.34fr 1fr; gap: 6mm; padding: 6mm 0; border-bottom: var(--rule-2); align-items: flex-start; }
  .price-table { width: 100%; border-collapse: collapse; border-top: var(--rule-2); border-bottom: var(--rule-2); }
  .price-table th, .price-table td { padding: 6px 5px; text-align: left; border-bottom: var(--rule-1); font-size: 6.8pt; vertical-align: middle; }
  .price-table th { font-weight: 700; font-size: 6pt; color: var(--grey-500); letter-spacing: 1.2px; }
  .price-table th.r, .price-table td.r { text-align: right; font-family: "JetBrains Mono", monospace; }
  
  .totals { background: var(--onox-navy); color: #fff; display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; margin-bottom: 2mm; }
  .totals .l { font-family: "JetBrains Mono", monospace; font-size: 6.6pt; color: rgba(255,255,255,.7); }
  .totals .r { font-weight: 900; font-size: 11.5pt; font-family: "Inter"; }
  
  .parties { display: grid; grid-template-columns: 1fr 1fr; border: var(--rule-2); margin-top: auto; margin-bottom: 6mm; }
  .parties .col2 { border-left: var(--rule-2); padding: 5mm; }
  .parties .col1 { padding: 5mm; }
  
  .signoff { display: grid; grid-template-columns: 1fr 1fr; gap: 12mm; align-items: start; padding-bottom: 4mm; }
  footer.foot { display: flex; justify-content: space-between; align-items: center; border-top: var(--rule-1); padding-top: 4px; font-family: "JetBrains Mono", monospace; font-size: 6pt; color: var(--grey-500); }
  
  @media print {
    body * { visibility: hidden; }
    .a4-page, .a4-page * { visibility: visible; }
    .a4-page { position: absolute; left: 0; top: 0; margin: 0; box-shadow: none; height: 297mm; }
    @page { size: A4; margin: 0; }
  }
`;

// --- PURE LOGIC ---
const buildQuote = ({ form, items, specs }) => {
  const subtotal = items.reduce((acc, item) => acc + (Number(item.qty) * Number(item.price)), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const todayDate = new Date();
  const validDate = new Date();
  validDate.setDate(todayDate.getDate() + 30);
  
  const quoteId = `ONX-${crypto.randomUUID().slice(0,8).toUpperCase()}`;
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  return {
    id: quoteId,
    dateStr: todayDate.toLocaleDateString('tr-TR', options),
    validStr: validDate.toLocaleDateString('tr-TR', options),
    subtotal,
    tax,
    total,
    items: [...items],
    specs: [...specs],
    ...form // Form verilerini (başlık vb.) PDF'e aktarır
  };
};

const safeNumber = (v) => (v === "" ? "" : Number(v) || 0);

// --- BRIEF EXPORT ---
// Map a generated quote into a SUNX Sense Mission Brief data.json
// and open the import page with the JSON encoded in the URL hash.
const SUNX_BRIEF_URL = "/sunx-sense/briefs/import.html";

function quoteToBriefData(quote) {
  const client = quote.companyName || "Müşteri";
  const items = quote.items || [];
  const totalUnits = items.reduce((acc, i) => acc + Number(i.qty || 0), 0);
  const headlineItem = [...items]
    .filter(i => i.catalogId !== 'custom' && i.name)
    .sort((a, b) => Number(b.price) - Number(a.price))[0] || items[0];
  const project = headlineItem ? String(headlineItem.name).split('—')[0].trim() : "Carbostar PX";
  const currency = CURRENCIES[quote.currency] || CURRENCIES.USD;
  const fmt = (n) => currency.symbol + new Intl.NumberFormat(currency.locale, { maximumFractionDigits: 0 }).format(Math.round(Number(n) || 0));

  const eventDate = new Date(Date.now() + 60 * 86400000);
  const eventDateLabel = eventDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  const updatedAt = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  return {
    meta: {
      client,
      project,
      documentId: quote.id || "ONX-DRAFT",
      eventDate: eventDate.toISOString(),
      updatedAt,
      audience: "CUSTOMER",
      accentHue: 230,
      outputFilename: client + " Mission Brief.html",
    },
    hero: {
      eyebrow: client.toUpperCase() + " · OPERATIONAL BRIEF · CUSTOMER",
      headline: {
        lines: ["For " + client + ".", String(totalUnits || items.length) + " unit" + (totalUnits === 1 ? "" : "s") + ", one timeline."],
        accent: project + " ready.",
      },
      lede: "ONO Yazılım proposes a structured deployment of " + project + " for " + client + ". This brief captures the operational plan — venue, fleet, dashboard, roadmap and risks — companion to proposal " + quote.id + ".",
      stats: [
        { v: String(totalUnits || items.length), l: project.toUpperCase().slice(0, 18), sub: "primary fleet" },
        { v: String(items.length), l: "LINE ITEMS", sub: "in proposal" },
        { v: fmt(quote.subtotal), l: "SUBTOTAL", sub: "+ KDV" },
        { v: fmt(quote.total), l: "TOTAL", sub: "incl. tax" },
        { v: quote.id || "DRAFT", l: "PROPOSAL ID", sub: quote.dateStr || "" },
        { v: quote.warrantyShort || "24 Ay", l: "WARRANTY", sub: quote.deliveryShort || "" },
      ],
    },
    stage: {
      venue: "TBD · venue to be confirmed with client",
      dates: eventDateLabel,
      format: "Operational deployment",
      scale: String(totalUnits) + " unit" + (totalUnits === 1 ? "" : "s"),
      role: "Technology & operations provider. Invisible by design.",
      frontStage: { who: client, sub: "Brand · narrative · audience" },
      backStage:  { who: "ONO Yazılım", sub: "Devices · software · ops" },
    },
    fleet: {
      units: totalUnits || items.length,
      buffer: Math.max(1, Math.round((totalUnits || items.length) * 0.1)),
      lot: "LOT TBD",
      idRange: "TBD",
      calibration: "NIST-traceable · ±30 ppm @ 400 ppm",
      shipDate: "TBD",
    },
    dashboard: {
      headline: "Live data, projected on a single dashboard.",
      description: "Streams from the deployed " + project + " fleet, accessible via a white-label dashboard. Dual-language, audience-readable, no jargon.",
      streamCount: totalUnits || items.length,
      languages: ["EN", "TR"],
    },
    roadmap: {
      phases: [
        { id: "T-21", title: "Production lock",  window: "- 3 weeks",   deliverable: "BoM frozen", status: "ACTIVE" },
        { id: "T-14", title: "Calibration & QA", window: "- 2 weeks",   deliverable: "Fleet calibrated", status: "NEXT" },
        { id: "T-7",  title: "Logistics",        window: "- 1 week",    deliverable: "Units at venue", status: "NEXT" },
        { id: "T-0",  title: "Go-live",          window: "Event week",  deliverable: "Deployment live", status: "NEXT" },
        { id: "T+14", title: "Case study",       window: "+ 2 weeks",   deliverable: "Co-authored writeup", status: "NEXT" },
      ],
    },
    risks: [
      { title: "Scope creep beyond proposal",       severity: "MED", owner: "Account",      mitigation: "Change-requests go through written addendum to the original proposal." },
      { title: "Calibration drift in transit",      severity: "MED", owner: "Hardware Ops", mitigation: "Buffer units + on-site recalibration kit." },
      { title: "Network instability at venue",      severity: "MED", owner: "Site Ops",     mitigation: "Dual SIM + local-cache mode for dashboard." },
      { title: "Talent unavailability during event", severity: "LOW", owner: "People Ops",  mitigation: "Rotating shift schedule, on-call list." },
    ],
    closing: {
      bridgeNodes: [
        { when: "PHASE 1", what: "Deploy",   desc: "Initial " + project + " fleet operational at " + client + "'s site." },
        { when: "PHASE 2", what: "Optimize", desc: "Quarterly tuning + dashboard refinements based on real-world data." },
        { when: "PHASE 3", what: "Expand",   desc: "Optional fleet expansion, additional sensors, multi-site coverage." },
      ],
      manifesto: "This deployment for " + client + " is operational, not symbolic. Every device, every dashboard view, every weekly report is a measured contribution to environmental intelligence.",
      signoff: "ONO Yazılım · operations spine · invisible by design",
    },
  };
}

function openMissionBrief(quote) {
  try {
    const data = quoteToBriefData(quote);
    const json = JSON.stringify(data);
    // UTF-8-safe base64 encode
    const utf8 = new TextEncoder().encode(json);
    let bin = '';
    utf8.forEach(b => { bin += String.fromCharCode(b); });
    const b64 = btoa(bin);
    const url = SUNX_BRIEF_URL + '#data=' + encodeURIComponent(b64);
    window.open(url, '_blank', 'noopener');
  } catch (e) {
    console.error('openMissionBrief failed:', e);
    alert('Could not open mission brief: ' + e.message);
  }
}

// --- STATE REDUCER ---
const initialState = {
  form: { 
    heroTitle: 'The X\nin your', heroHighlight: 'air.', 
    companyName: '', contactPerson: '', email: '', 
    currency: 'USD', paymentTerm: '50_50', 
    deliveryShort: DEFAULTS.DELIVERY, warrantyShort: DEFAULTS.WARRANTY 
  },
  items: [
    { id: 1, catalogId: 'carbostar', name: 'PX Carbostar — Taşınabilir CO₂ Sensörü', qty: 1, price: 150 },
    { id: 2, catalogId: 'custom', name: 'SUNX Sense entegrasyonu (uzaktan)', qty: 1, price: 0 },
    { id: 3, catalogId: 'custom', name: 'Kargo · yurtiçi standart · sigortalı', qty: 1, price: 8 }
  ],
  specs: [
    { id: 1, k: "MİMARİ", v: "Bulut tabanlı · API odaklı" },
    { id: 2, k: "BAĞLANTI", v: "Wi-Fi b/g/n · BLE 5" },
    { id: 3, k: "GÜÇ", v: "3.7 V · 1.800 mAh Li-Po" },
    { id: 4, k: "BOYUT", v: "62 × 62 × 22 mm · 86 g" },
    { id: 5, k: "GÖVDE", v: "Eloksallı AL + PC ızgara · IP54" }
  ],
  logoUrl: null,
  status: 'idle',
  result: null
};

function quoteReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return { ...state, form: { ...state.form, [action.field]: action.value } };
    case 'SET_LOGO':
      return { ...state, logoUrl: action.payload };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, { id: Date.now(), catalogId: 'custom', name: '', qty: 1, price: 0 }] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(i => {
          if (i.id !== action.id) return i;
          let updated = { ...i, [action.field]: action.value };
          if (action.field === 'catalogId' && action.value !== 'custom') {
            updated.name = CATALOG[action.value].name;
            updated.price = CATALOG[action.value].basePrice;
          }
          return updated;
        })
      };
    case 'SET_SPECS':
      return { ...state, specs: action.payload };
    case 'ADD_SPEC':
      return { ...state, specs: [...state.specs, { id: Date.now(), k: "", v: "" }] };
    case 'REMOVE_SPEC':
      return { ...state, specs: state.specs.filter(s => s.id !== action.id) };
    case 'UPDATE_SPEC':
      return { ...state, specs: state.specs.map(s => s.id === action.id ? { ...s, [action.field]: action.value } : s) };
    case 'GENERATE':
      return { ...state, status: 'complete', result: buildQuote(state) };
    case 'RESET':
      return { ...state, status: 'idle', result: null };
    default:
      return state;
  }
}

// --- MEMOIZED SVG COMPONENTS ---
const DeviceFront = memo(({ logoUrl }) => (
  <div className="flex flex-col items-center justify-end">
    <svg viewBox="0 0 100 130" className="w-full max-h-[42mm] block" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="118" rx="42" ry="3" fill="#0A1128" opacity=".06"/>
      <rect x="6" y="8" width="88" height="100" rx="9" fill="#F7F9FC" stroke="#0A1128" strokeWidth="1.2"/>
      <rect x="10" y="12" width="80" height="34" rx="4" fill="#fff" stroke="#0A1128" strokeWidth="0.7"/>
      <g fill="#0A1128">
          <circle cx="14" cy="16" r="0.7"/><circle cx="20" cy="16" r="0.7"/><circle cx="26" cy="16" r="0.7"/><circle cx="32" cy="16" r="0.7"/><circle cx="38" cy="16" r="0.7"/><circle cx="44" cy="16" r="0.7"/><circle cx="50" cy="16" r="0.7"/><circle cx="56" cy="16" r="0.7"/><circle cx="62" cy="16" r="0.7"/><circle cx="68" cy="16" r="0.7"/><circle cx="74" cy="16" r="0.7"/><circle cx="80" cy="16" r="0.7"/><circle cx="86" cy="16" r="0.7"/>
          <circle cx="14" cy="22" r="0.7"/><circle cx="20" cy="22" r="0.7"/><circle cx="26" cy="22" r="0.7"/><circle cx="32" cy="22" r="0.7"/><circle cx="38" cy="22" r="0.7"/><circle cx="44" cy="22" r="0.7"/><circle cx="50" cy="22" r="0.7"/><circle cx="56" cy="22" r="0.7"/><circle cx="62" cy="22" r="0.7"/><circle cx="68" cy="22" r="0.7"/><circle cx="74" cy="22" r="0.7"/><circle cx="80" cy="22" r="0.7"/><circle cx="86" cy="22" r="0.7"/>
          <circle cx="14" cy="28" r="0.7"/><circle cx="20" cy="28" r="0.7"/><circle cx="26" cy="28" r="0.7"/><circle cx="32" cy="28" r="0.7"/><circle cx="38" cy="28" r="0.7"/><circle cx="44" cy="28" r="0.7"/><circle cx="50" cy="28" r="0.7"/><circle cx="56" cy="28" r="0.7"/><circle cx="62" cy="28" r="0.7"/><circle cx="68" cy="28" r="0.7"/><circle cx="74" cy="28" r="0.7"/><circle cx="80" cy="28" r="0.7"/><circle cx="86" cy="28" r="0.7"/>
      </g>
      {logoUrl ? (
        <image href={logoUrl} x="15" y="68" width="70" height="12" preserveAspectRatio="xMidYMid meet" />
      ) : (
        <text x="50" y="76" textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="9" fill="#0A1128">carbostar</text>
      )}
      <circle cx="50" cy="86" r="1.5" fill="#00B4FF"/>
      <rect x="38" y="106" width="24" height="3" fill="#0A1128"/>
    </svg>
    <div className="mono text-[5pt] text-[#5A6B85] mt-1 text-center">ÖN · 62×62</div>
  </div>
));

const DeviceSide = memo(() => (
  <div className="flex flex-col items-center justify-end">
    <svg viewBox="0 0 100 130" className="w-full max-h-[42mm] block" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="86" rx="40" ry="2.5" fill="#0A1128" opacity=".06"/>
      <rect x="8" y="50" width="80" height="32" rx="4" fill="#F7F9FC" stroke="#0A1128" strokeWidth="1.2"/>
      <g stroke="#0A1128" strokeWidth="0.5"><line x1="14" y1="53" x2="86" y2="53"/><line x1="14" y1="55" x2="86" y2="55"/></g>
      <rect x="42" y="80" width="16" height="3" fill="#0A1128"/>
      <g stroke="#9AA5BA" strokeWidth="0.4"><line x1="92" y1="50" x2="92" y2="82"/><line x1="89" y1="50" x2="95" y2="50"/><line x1="89" y1="82" x2="95" y2="82"/></g>
      <text x="96" y="68" fontFamily="JetBrains Mono" fontSize="5.5" fill="#5A6B85">22 mm</text>
    </svg>
    <div className="mono text-[5pt] text-[#5A6B85] mt-1 text-center">YAN · 22 mm</div>
  </div>
));

const DevicePair = memo(({ logoUrl }) => (
  <div className="flex flex-col items-center justify-end">
    <svg viewBox="0 0 100 130" className="w-full max-h-[42mm] block" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="50" cy="118" rx="42" ry="3" fill="#0A1128" opacity=".05"/>
      <rect x="14" y="6" width="38" height="108" rx="6" fill="#0A1128"/>
      <rect x="16" y="11" width="34" height="98" rx="4" fill="#1B2748"/>
      <rect x="29" y="6" width="8" height="3" fill="#0A1128"/>
      <rect x="18" y="93" width="30" height="9" rx="2" fill="#00B4FF"/>
      <text x="33" y="99" textAnchor="middle" fontFamily="JetBrains Mono" fontWeight="700" fontSize="4" fill="#fff">412 ppm</text>
      <path d="M 56 60 Q 62 56 70 60" fill="none" stroke="#00B4FF" strokeWidth="0.7" strokeDasharray="1.5 1.5"/>
      <rect x="68" y="50" width="24" height="32" rx="3" fill="#F7F9FC" stroke="#0A1128" strokeWidth="0.8"/>
      <rect x="70" y="52" width="20" height="10" rx="1.5" fill="#fff" stroke="#0A1128" strokeWidth="0.4"/>
      {logoUrl ? (
        <image href={logoUrl} x="70" y="66" width="20" height="8" preserveAspectRatio="xMidYMid meet" />
      ) : (
        <text x="80" y="72" textAnchor="middle" fontFamily="Inter" fontWeight="900" fontSize="3.6" fill="#0A1128">carbostar</text>
      )}
    </svg>
    <div className="mono text-[5pt] text-[#5A6B85] mt-1 text-center">EŞLEŞME · SUNX</div>
  </div>
));

// --- SUB-COMPONENTS ---
const ItemsEditor = ({ items, dispatch }) => (
  <div className="flex flex-col gap-3">
    <div className="flex justify-between items-end border-b border-[#EEF1F6] pb-1">
      <h3 className="text-[10px] font-bold tracking-widest uppercase">4. Sistem Kalemleri</h3>
      <button type="button" onClick={() => dispatch({ type: 'ADD_ITEM' })} className="text-[9px] font-bold tracking-widest uppercase text-[#00B4FF] flex items-center gap-1"><Plus className="h-3 w-3" /> Ekle</button>
    </div>
    <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2">
      {items.map((item) => (
        <div key={item.id} className="p-3 border border-[#EEF1F6] bg-white relative group">
          <button type="button" onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 className="h-3 w-3" /></button>
          <select value={item.catalogId} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', id: item.id, field: 'catalogId', value: e.target.value })} className="w-full px-2 py-1 bg-[#F7F9FC] border border-[#D0D8E5] text-[10px] mb-2 focus:outline-none">
            <option value="custom">-- Özel Kalem --</option>
            {Object.values(CATALOG).filter(c => c.id !== 'custom').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div className="grid grid-cols-12 gap-2 mb-2">
            <input type="text" value={item.name} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', id: item.id, field: 'name', value: e.target.value })} placeholder="Kalem" className="col-span-6 px-2 py-1 border-b border-[#D0D8E5] text-[10px] focus:outline-none" />
            <input type="number" min="1" value={item.qty ?? ""} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', id: item.id, field: 'qty', value: safeNumber(e.target.value) })} className="col-span-2 px-2 py-1 border-b border-[#D0D8E5] text-[10px] focus:outline-none" />
            <input type="number" min="0" value={item.price ?? ""} onChange={(e) => dispatch({ type: 'UPDATE_ITEM', id: item.id, field: 'price', value: safeNumber(e.target.value) })} className="col-span-4 px-2 py-1 border-b border-[#D0D8E5] text-[10px] focus:outline-none" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SpecsEditor = ({ specs, dispatch }) => {
  const handlePdfUpload = (e) => {
    if(!e.target.files[0]) return;
    setTimeout(() => {
      dispatch({ type: 'SET_SPECS', payload: [
        { id: Date.now() + 1, k: "MİMARİ", v: "PDF'den Aktarılan Sunucu" },
        { id: Date.now() + 2, k: "BAĞLANTI", v: "Endüstriyel M2M Ethernet" },
        { id: Date.now() + 3, k: "GÜÇ", v: "24V DC Adaptör veya PoE" }
      ]});
      e.target.value = '';
    }, 400);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-end border-b border-[#EEF1F6] pb-1 relative">
        <h3 className="text-[10px] font-bold tracking-widest uppercase">5. Teknik Özellikler Tablosu</h3>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer group">
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />
            <button type="button" className="text-[9px] font-bold tracking-widest uppercase text-[#5A6B85] flex items-center gap-1 group-hover:text-[#00B4FF]"><FileUp className="h-3 w-3" /> PDF'den Çek</button>
          </div>
          <button type="button" onClick={() => dispatch({ type: 'ADD_SPEC' })} className="text-[9px] font-bold tracking-widest uppercase text-[#00B4FF] flex items-center gap-1"><Plus className="h-3 w-3" /> Ekle</button>
        </div>
      </div>
      <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-2">
        {specs.map((spec) => (
          <div key={spec.id} className="grid grid-cols-12 gap-2 relative group">
            <input type="text" value={spec.k} onChange={(e) => dispatch({ type: 'UPDATE_SPEC', id: spec.id, field: 'k', value: e.target.value })} placeholder="Etiket" className="col-span-4 px-2 py-1.5 border-b border-[#D0D8E5] text-[10px] focus:outline-none font-bold text-[#5A6B85]" />
            <input type="text" value={spec.v} onChange={(e) => dispatch({ type: 'UPDATE_SPEC', id: spec.id, field: 'v', value: e.target.value })} placeholder="Değer" className="col-span-7 px-2 py-1.5 border-b border-[#D0D8E5] text-[10px] focus:outline-none" />
            <button type="button" onClick={() => dispatch({ type: 'REMOVE_SPEC', id: spec.id })} className="col-span-1 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="h-3 w-3" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [state, dispatch] = useReducer(quoteReducer, initialState);
  const { form, items, specs, status, result, logoUrl } = state;

  // Currency Formatter
  const currencyFormatter = useMemo(() => new Intl.NumberFormat(CURRENCIES[form.currency].locale, { style: 'currency', currency: form.currency }), [form.currency]);
  const formatCurrencyValue = (val) => currencyFormatter.format(val || 0);

  // Logo Cleanup
  useEffect(() => {
    return () => { if (logoUrl) URL.revokeObjectURL(logoUrl); };
  }, [logoUrl]);

  // Derived State
  const subtotal = useMemo(() => items.reduce((acc, item) => acc + (safeNumber(item.qty) * safeNumber(item.price)), 0), [items]);
  const isValid = form.companyName.trim() && items.length > 0 && form.heroTitle.trim();

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!isValid) return alert("Eksik alanlar var.");
    dispatch({ type: 'GENERATE' });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    dispatch({ type: 'SET_LOGO', payload: URL.createObjectURL(file) });
  };

  return (
    <div className="min-h-screen pb-24 relative">
      <style>{GLOBAL_CSS}</style>

      <header className="bg-white border-b border-brand sticky top-0 z-50 h-14 flex items-center px-6 md:px-12 justify-between print:hidden">
        <div className="flex items-center gap-6">
          <svg viewBox="0 0 200 60" className="h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="45" fontFamily="Inter, sans-serif" fontSize="48" fill="#0A1128" fontWeight="400" letterSpacing="0.05em">ONO</text>
            <path d="M135 12 L175 48 M175 12 L135 48" stroke="#00B4FF" strokeWidth="8" strokeLinecap="square" />
          </svg>
          <div className="h-4 w-px bg-[#D0D8E5]"></div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#0A1128]/60">Teklif Motoru</span>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        {status === 'idle' && (
          <div className="grid lg:grid-cols-12 gap-8 print:hidden">
            <div className="lg:col-span-4 flex flex-col gap-6 relative">
              <h1 className="text-2xl font-extrabold tracking-tight text-[#0A1128]">Teklif oluşturucu.</h1>
              
              <form onSubmit={handleGenerate} className="flex flex-col gap-6 text-[#0A1128] pb-16">
                
                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-bold tracking-widest uppercase border-b border-[#EEF1F6] pb-1">1. Teklif Başlığı</h3>
                  <div className="grid grid-cols-12 gap-3">
                    <textarea name="heroTitle" value={form.heroTitle} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'heroTitle', value: e.target.value })} placeholder="Ana Metin" className="col-span-8 w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none resize-none" rows="2" />
                    <input type="text" name="heroHighlight" value={form.heroHighlight} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'heroHighlight', value: e.target.value })} placeholder="Vurgu" className="col-span-4 w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none" />
                  </div>
                  
                  <div className="mt-2 border border-dashed border-[#D0D8E5] p-3 flex items-center justify-between bg-white relative">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-[#5A6B85]" />
                      <div className="flex flex-col"><span className="text-[10px] font-bold text-[#0A1128]">Cihaz Logosu</span><span className="text-[9px] text-[#5A6B85]">PNG, JPG, SVG</span></div>
                    </div>
                    <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLogoUpload} />
                    {logoUrl && <div className="h-6 w-auto border border-[#EEF1F6] bg-white px-2 py-1"><img src={logoUrl} className="h-full object-contain" alt="Custom Logo" /></div>}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-bold tracking-widest uppercase border-b border-[#EEF1F6] pb-1">2. Müşteri Bilgileri</h3>
                  <input required type="text" value={form.companyName} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'companyName', value: e.target.value })} placeholder="Firma Adı" className="w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none" />
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" value={form.contactPerson} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'contactPerson', value: e.target.value })} placeholder="Yetkili Kişi" className="w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none" />
                    <input type="email" value={form.email} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'email', value: e.target.value })} placeholder="E-posta" className="w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-[10px] font-bold tracking-widest uppercase border-b border-[#EEF1F6] pb-1">3. Ticari Ayarlar</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <select value={form.currency} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'currency', value: e.target.value })} className="w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none">
                      <option value="USD">USD ($)</option><option value="EUR">EUR (€)</option><option value="TRY">TRY (₺)</option>
                    </select>
                    <select value={form.paymentTerm} onChange={(e) => dispatch({ type: 'UPDATE_FORM', field: 'paymentTerm', value: e.target.value })} className="w-full px-3 py-2 border border-[#D0D8E5] text-xs focus:outline-none">
                      <option value="50_50">%50 Avans / Bakiye</option><option value="100_upfront">%100 Peşin</option><option value="net_30">Net 30 Gün</option>
                    </select>
                  </div>
                </div>

                <ItemsEditor items={items} dispatch={dispatch} />
                <SpecsEditor specs={specs} dispatch={dispatch} />
              </form>

              {/* STICKY BOTTOM PREVIEW BAR */}
              <div className="fixed bottom-0 left-0 right-0 lg:w-[33.33%] bg-white border-t border-[#D0D8E5] p-4 flex items-center justify-between shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-40">
                 <div className="flex flex-col">
                   <span className="text-[9px] text-[#5A6B85] font-bold tracking-wider uppercase">Ara Toplam ({form.currency})</span>
                   <span className="text-lg font-black text-[#0A1128]">{formatCurrencyValue(subtotal)}</span>
                 </div>
                 <button onClick={handleGenerate} disabled={!isValid} className="px-6 py-3 bg-[#0A1128] text-white font-bold tracking-widest uppercase text-[10px] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity shadow-lg">
                   Oluştur <Calculator className="w-4 h-4"/>
                 </button>
              </div>
            </div>
            
            <div className="lg:col-span-8 bg-[#EEF1F6] flex items-center justify-center min-h-[600px] rounded-lg relative overflow-hidden">
              <svg viewBox="0 0 200 60" className="h-8 opacity-20 grayscale" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="0" y="45" fontFamily="Inter, sans-serif" fontSize="48" fill="#0A1128" fontWeight="400" letterSpacing="0.05em">ONO</text>
                <path d="M135 12 L175 48 M175 12 L135 48" stroke="#00B4FF" strokeWidth="8" strokeLinecap="square" />
              </svg>
            </div>
          </div>
        )}

        {/* OUTPUT: ONOX HTML REFERENCE A4 SHELL */}
        {status === 'complete' && result && (
          <div>
            <div className="max-w-[210mm] mx-auto flex items-center justify-end mb-4 print:hidden gap-2">
              <button onClick={() => dispatch({ type: 'RESET' })} className="px-4 py-1.5 border border-[#D0D8E5] text-[#0A1128] text-[9px] font-bold tracking-widest uppercase hover:bg-white transition-colors">YENİ</button>
              <button onClick={() => openMissionBrief(result)} className="px-4 py-1.5 border border-[#00B4FF] text-[#00B4FF] text-[9px] font-bold tracking-widest uppercase flex items-center gap-2 hover:bg-[#00B4FF] hover:text-white transition-colors" title="Open SUNX Sense Mission Brief in a new tab">
                <Zap className="h-3 w-3" /> MISSION BRIEF
              </button>
              <button onClick={() => window.print()} className="px-4 py-1.5 bg-[#0A1128] text-white text-[9px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg">
                <Download className="h-3 w-3" /> PDF / YAZDIR
              </button>
            </div>

            <article className="a4-page">
              <span className="x-wm tr">×</span>
              <span className="x-wm bl">×</span>

              <header className="band header-band">
                <div className="flex items-center gap-[10px]">
                  <svg className="h-[8mm] w-auto block" viewBox="0 0 2661 812" xmlns="http://www.w3.org/2000/svg">
                    <path d="M673.54 626.82V184.36C673.54 176.31 678.69 169.15 686.38 166.52C694.06 163.89 702.58 166.37 707.61 172.7L1024.77 572.25V184.36C1024.77 173.94 1033.31 165.49 1043.84 165.49C1054.37 165.49 1062.91 173.94 1062.91 184.36V626.82C1062.91 634.87 1057.75 642.03 1050.07 644.66C1042.39 647.29 1033.86 644.81 1028.84 638.48L711.68 238.92V626.81C711.68 637.23 703.14 645.68 692.61 645.68C682.08 645.68 673.54 637.23 673.54 626.81V626.82Z" fill="#B2B2B2"/>
                    <path d="M2650.4 800.74C2637.23 814.46 2615.95 814.69 2602.52 801.25L2294.87 488.9C2281.63 475.66 2260.73 475.66 2247.49 488.9L1939.84 801.25C1926.41 814.68 1905.13 814.46 1891.96 800.74C1878.79 787.02 1878.57 764.85 1891.47 750.85L2186.85 430.28C2199.56 416.49 2199.56 394.7 2186.85 380.91L1891.46 60.33C1878.56 46.33 1878.78 24.16 1891.95 10.44C1905.12 -3.28 1926.39 -3.51 1939.83 9.93L2247.48 322.28C2260.72 335.52 2281.63 335.52 2294.86 322.28L2602.52 9.93C2615.95 -3.5 2637.23 -3.28 2650.4 10.44C2663.57 24.16 2664.26 45.88 2651.36 59.87L2355.51 380.9C2342.8 394.69 2342.8 416.48 2355.51 430.27L2650.89 750.84C2663.79 764.84 2663.57 787.01 2650.4 800.73V800.74Z" fill="#00B4FF"/>
                    <path d="M227.13 645.7C91.32 645.7 0 544.19 0 405.59C0 266.99 91.32 165.48 227.13 165.48C362.94 165.48 454.26 266.99 454.26 405.59C454.26 544.19 362.94 645.7 227.13 645.7ZM227.13 201.92C111.15 201.92 42.57 287.66 42.57 405.27C42.57 522.88 111.15 606.38 227.13 606.38C343.11 606.38 412.4 522.88 412.4 405.27C412.4 287.66 343.11 201.92 227.13 201.92Z" fill="#B2B2B2"/>
                    <path d="M1509.32 645.7C1373.51 645.7 1282.19 544.19 1282.19 405.59C1282.19 266.99 1373.51 165.48 1509.32 165.48C1645.13 165.48 1736.45 266.99 1736.45 405.59C1736.45 544.19 1645.13 645.7 1509.32 645.7ZM1509.32 201.92C1393.34 201.92 1324.76 287.66 1324.76 405.27C1324.76 522.88 1393.34 606.38 1509.32 606.38C1625.3 606.38 1694.59 522.88 1694.59 405.27C1694.59 287.66 1625.3 201.92 1509.32 201.92Z" fill="#B2B2B2"/>
                  </svg>
                  <span className="font-['Inter'] font-bold text-[6.6pt] tracking-[1.4px] text-[#5A6B85] border-l border-[#D0D8E5] pl-2">ONO YAZILIM A.Ş.</span>
                </div>
                <div className="text-right font-['Inter'] text-[6.8pt] text-[#5A6B85] tracking-[1.4px]">
                  <strong className="block text-[#0A1128] font-extrabold text-[8pt] tracking-[1.4px]">FİYAT TEKLİFİ</strong>
                  <span className="mono text-[6.6pt]">NO · {result.id} · {result.dateStr.toUpperCase()}</span>
                </div>
              </header>

              <section className="band hero-band">
                <div className="relative">
                  <svg className="h-[8mm] w-auto block mb-[3mm]" viewBox="0 0 493 85" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 44.9441C0 14.0236 24.4091 -1.01841 56.4592 7.07056C59.6702 7.84956 61.1593 10.0075 61.1594 13.2432V17.2577C61.1594 21.1528 58.8384 22.8304 54.8544 21.9915C30.0587 16.8983 17.719 24.8097 17.719 44.9441C17.7192 65.078 30.0587 72.9872 54.8544 67.8939C58.8382 67.055 61.1591 68.7332 61.1594 72.6277V76.6422C61.1594 79.8781 59.4925 82.0972 55.8652 82.9961C24.1718 90.7258 0.000337878 75.6845 0 44.9441Z" fill="#327DFE"/>
                    <path d="M297.451 41.347C297.452 24.5091 319.037 20.9135 339.908 26.1268C343.119 26.9059 344.605 29.0637 344.605 32.2994V33.7383C344.605 37.6329 342.345 39.311 338.48 38.4721C326.944 35.9553 313.268 35.3562 313.268 40.8692C313.269 42.8462 314.814 44.2245 317.489 44.8837L330.87 48.3599C342.524 51.3562 348.172 57.1082 348.172 66.2162C348.172 84.7326 324.091 88.1482 302.862 82.5155C299.711 81.6766 298.222 79.5788 298.222 76.3429V74.6652C298.223 70.8307 300.483 69.0341 304.347 69.7528C318.202 72.4494 332.415 73.2876 332.415 66.6363C332.415 64.0595 330.571 62.6214 326.587 61.5427L314.099 58.3054C302.445 55.3091 297.451 49.4365 297.451 41.347Z" fill="#327DFE"/>
                    <path d="M365.128 11.3266C368.637 11.3266 370.599 13.3048 370.599 16.8403V24.99H386.773C390.281 24.9901 392.244 26.966 392.245 30.5009V33.1397C392.244 36.6742 390.281 38.6504 386.773 38.6506H370.599V62.1413C370.599 68.2536 373.276 70.8319 379.817 70.8319C382.968 70.8318 384.99 70.1702 387.07 70.1702C390.757 70.1702 392.185 71.6108 392.185 74.5471V77.5428C392.185 80.5986 390.757 82.8169 387.784 83.4162C368.875 87.9704 353.771 83.1148 353.771 62.1413V16.8403C353.771 13.3048 355.734 11.3266 359.243 11.3266H365.128Z" fill="#327DFE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M180.852 0C184.36 0 186.323 1.97813 186.323 5.51367V24.2706C189.177 24.0309 191.971 23.9109 194.587 23.9109C215.459 23.9109 227.829 31.5806 227.829 54.4118C227.829 77.1828 215.459 84.9731 194.587 84.9731C177.224 84.9729 169.792 79.5785 169.792 66.1558V5.51367C169.792 1.97813 171.755 0 175.263 0H180.852ZM195.598 37.8735C192.922 37.8736 189.831 38.1109 186.323 38.5902V63.6406C186.323 68.4939 187.274 70.95 195.718 70.95C206.659 70.95 211.298 66.8159 211.298 54.4118C211.298 41.8277 206.658 37.8735 195.598 37.8735Z" fill="#327DFE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M262.978 23.9109C282.422 23.911 293.067 34.9969 293.067 54.4722C293.067 73.8871 282.422 84.973 262.978 84.9731C243.534 84.9731 232.889 73.8872 232.889 54.4722C232.889 34.9968 243.533 23.9109 262.978 23.9109ZM280.52 41.1603C279.826 40.8773 263.574 34.6166 252.779 42.1735C251.347 43.1762 250.023 44.4167 248.834 45.8667C244.278 51.4359 243.675 58.7894 247.177 64.8185C251.678 57.6607 258.734 52.5695 266.683 50.5593C259.282 54.0389 252.978 60.8943 250.537 68.9153C252.499 70.6292 254.814 71.7803 257.294 72.2735C259.774 72.7668 262.643 72.611 265.387 71.6694C267.122 71.0717 268.725 70.2666 270.158 69.2641C280.952 61.7071 281.569 43.6175 281.599 42.8435C281.61 42.479 281.514 42.1208 281.321 41.8193C281.127 41.5177 280.847 41.2878 280.52 41.1603Z" fill="#327DFE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M94.4829 23.9109C110.598 23.9109 122.49 30.8015 122.49 46.9211V66.6967C122.49 79.1601 116.841 83.8937 104.058 83.894H90.5593C76.0502 83.894 67.1892 79.9991 67.1892 65.9169C67.1893 51.7748 76.1097 46.0067 90.5593 46.0067H105.96V45.0484C105.96 38.4567 100.786 37.4534 92.1042 37.4534C87.8232 37.4534 82.2936 38.1712 76.764 39.3096C73.0181 40.0286 70.7563 38.2921 70.7559 34.4577V32.239C70.7561 28.9434 72.602 26.7877 76.467 26.0087C82.9481 24.6306 89.2504 23.9109 94.4829 23.9109ZM91.3904 57.9319C84.1958 57.9322 82.7094 61.4826 82.7093 65.9169C82.7093 70.2911 84.1958 71.9686 91.3304 71.9687H100.014C105.127 71.9685 105.96 69.8712 105.96 65.8565V57.9319H91.3904Z" fill="#327DFE"/>
                    <path d="M160.097 24.449C163.902 24.3894 165.923 26.3072 165.923 29.9023V33.3786C165.923 36.9138 163.842 38.89 159.917 38.9499C147.432 39.1297 146.896 40.2093 146.896 44.7024V78.3803C146.896 81.9158 144.933 83.894 141.425 83.894H135.539C132.031 83.894 130.068 81.9158 130.068 78.3803V42.3081C130.068 28.5854 134.944 24.8685 160.097 24.449Z" fill="#327DFE"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M421.56 23.9109C437.675 23.9109 449.568 30.8015 449.568 46.9211V66.6967C449.567 79.16 443.918 83.8937 431.135 83.894H417.637C403.127 83.894 394.266 79.9991 394.266 65.9169C394.267 51.7748 403.187 46.0067 417.637 46.0067H433.037V45.0484C433.037 38.4567 427.863 37.4534 419.181 37.4534C414.9 37.4534 409.371 38.1712 403.841 39.3096C400.095 40.0286 397.834 38.2921 397.833 34.4577V32.239C397.833 28.9439 399.677 26.7879 403.541 26.0087C410.023 24.6304 416.327 23.9109 421.56 23.9109ZM418.468 57.9319C411.273 57.9321 409.787 61.4826 409.787 65.9169C409.787 70.2912 411.273 71.9686 418.408 71.9687H427.091C432.204 71.9684 433.037 69.8711 433.037 65.8565V57.9319H418.468Z" fill="#327DFE"/>
                    <path d="M487.174 24.449C490.979 24.3896 493 26.3074 493 29.9023V33.3786C493 36.9138 490.919 38.89 486.995 38.9499C474.509 39.1296 473.973 40.2092 473.973 44.7024V78.3803C473.973 81.9158 472.01 83.894 468.502 83.894H462.614C459.106 83.8935 457.145 81.9154 457.145 78.3803V42.3081C457.145 28.5854 462.021 24.8685 487.174 24.449Z" fill="#327DFE"/>
                  </svg>
                  
                  <h1 className="hero-h1">
                    {result.heroTitle}
                    {result.heroHighlight && <React.Fragment> <span className="text-[#00B4FF]">{result.heroHighlight}</span></React.Fragment>}
                  </h1>
                  <p className="hero-lead">Bu belge, <strong>{result.companyName}</strong> organizasyonunun dijital dönüşüm hedeflerine yönelik resmi satın alma referansınız ve ONOX sistemlerinin tedariki için hazırlanmış fiyat teklifimizdir.</p>
                </div>
                
                <div className="mockups">
                  <div className="label">
                    <span className="font-bold text-[5.8pt] tracking-[1.2px] text-[#5A6B85]">TASARIM · ÖN · YAN · EŞLEŞME</span>
                    <span className="font-bold text-[5.8pt] tracking-normal text-[#5A6B85] mono">3 görünüm</span>
                  </div>
                  <DeviceFront logoUrl={logoUrl} />
                  <DeviceSide />
                  <DevicePair logoUrl={logoUrl} />
                </div>
              </section>

              <section className="band midgrid">
                <div className="col">
                  <div className="sec-hd">
                    <span className="num">01</span>
                    <div className="text"><span className="eb">TEKNİK ÖZELLİKLER</span><span className="ti">Özellik tablosu</span></div>
                  </div>
                  <div className="spec">
                    {result.specs && result.specs.map(spec => (
                      <React.Fragment key={spec.id}>
                        <div className="k">{spec.k}</div><div className="v">{spec.v}</div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="col">
                  <div className="sec-hd">
                    <span className="num">02</span>
                    <div className="text"><span className="eb">SİPARİŞ &amp; TEDARİK</span><span className="ti">Sipariş akışı</span></div>
                  </div>
                  <div className="flex flex-col relative mt-2">
                    <div className="relative pl-[14mm] pb-[7mm]">
                      <div className="absolute left-0 top-0 w-[7.5mm] h-[7.5mm] rounded-full bg-[#00B4FF] flex items-center justify-center font-black text-[6.5pt] text-white z-10">01</div>
                      <div className="absolute left-[3.75mm] top-[7.5mm] bottom-0 w-px border-l-[1.5px] border-dashed border-[#D0D8E5]"></div>
                      <div className="font-bold text-[8pt] tracking-[-0.01em] leading-none pt-[1.5mm]">TEKLİF KABUL</div>
                      <div className="text-[6.8pt] text-[#5A6B85] mt-[3px] leading-snug">Bu teklif imzalı iletilir</div>
                    </div>
                    <div className="relative pl-[14mm] pb-[7mm]">
                      <div className="absolute left-0 top-0 w-[7.5mm] h-[7.5mm] rounded-full border-[1.5px] border-[#00B4FF] bg-white flex items-center justify-center font-black text-[6.5pt] text-[#00B4FF] z-10">02</div>
                      <div className="absolute left-[3.75mm] top-[7.5mm] bottom-0 w-px border-l-[1.5px] border-dashed border-[#D0D8E5]"></div>
                      <div className="font-bold text-[8pt] tracking-[-0.01em] leading-none pt-[1.5mm]">AVANS %50</div>
                      <div className="text-[6.8pt] text-[#5A6B85] mt-[3px] leading-snug">{result.currency} havale veya TL</div>
                    </div>
                    <div className="relative pl-[14mm] pb-[7mm]">
                      <div className="absolute left-0 top-0 w-[7.5mm] h-[7.5mm] rounded-full bg-[#00B4FF] flex items-center justify-center font-black text-[6.5pt] text-white z-10">03</div>
                      <div className="absolute left-[3.75mm] top-[7.5mm] bottom-0 w-px border-l-[1.5px] border-dashed border-[#D0D8E5]"></div>
                      <div className="font-bold text-[8pt] tracking-[-0.01em] leading-none pt-[1.5mm]">SİSTEM KURULUMU</div>
                      <div className="text-[6.8pt] text-[#5A6B85] mt-[3px] leading-snug">Üretim & Entegrasyon</div>
                    </div>
                    <div className="relative pl-[14mm]">
                      <div className="absolute left-0 top-0 w-[7.5mm] h-[7.5mm] rounded-full bg-[#00B4FF] flex items-center justify-center font-black text-[6.5pt] text-white z-10">04</div>
                      <div className="font-bold text-[8pt] tracking-[-0.01em] leading-none pt-[1.5mm]">TESLİM</div>
                      <div className="text-[6.8pt] text-[#5A6B85] mt-[3px] leading-snug">{result.deliveryShort}</div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="band pricing">
                <div className="lhs">
                  <div className="sec-hd">
                    <span className="num">03</span>
                    <div className="text"><span className="eb">FİYATLANDIRMA</span><span className="ti">Adet fiyatı &amp; toplam</span></div>
                  </div>
                  <div className="text-[7.2pt] text-[#5A6B85]">{result.currency} · KDV %{TAX_RATE * 100} · {result.deliveryShort}</div>
                </div>
                <div>
                  <table className="price-table">
                    <thead>
                      <tr>
                        <th>KALEM</th>
                        <th className="r">ADET</th>
                        <th className="r">BİRİM</th>
                        <th className="r">TUTAR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.items.map((item, idx) => (
                        <tr key={idx}>
                          <td className="font-semibold text-[7pt]">{item.name}</td>
                          <td className="r text-[6.6pt]">{item.qty}</td>
                          <td className="r text-[6.6pt]">{formatCurrencyValue(Number(item.price))}</td>
                          <td className="r text-[6.6pt]">{formatCurrencyValue(Number(item.qty) * Number(item.price))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="totals">
                    <span className="l">ARA {formatCurrencyValue(result.subtotal)} · KDV (%{TAX_RATE * 100}) {formatCurrencyValue(result.tax)}</span>
                    <span className="r"><span className="x">×</span>{formatCurrencyValue(result.total)}</span>
                  </div>
                </div>
              </section>

              <section className="band parties">
                <div className="col1">
                  <div className="sec-hd">
                    <span className="num">04</span><div className="text"><span className="eb">TEDARİKÇİ</span></div>
                  </div>
                  <h3 className="m-0 mb-[1mm] font-extrabold text-[11pt] tracking-[-0.02em]">ONO Yazılım A.Ş.</h3>
                  <div className="text-[6.6pt] text-[#3B4866] leading-relaxed">Üniversiteler Mah. 1597 Cad. No: 3/127 · Bilkent HANE</div>
                  <div className="text-[6.6pt] text-[#3B4866] leading-relaxed">06800 Çankaya / Ankara / Türkiye</div>
                  <div className="text-[6.6pt] text-[#3B4866] leading-relaxed">V.D. Kavaklıdere · Vergi No 6430864430 · ono@onoyazilim.com.tr</div>
                </div>
                <div className="col2">
                  <div className="sec-hd">
                    <span className="num">05</span><div className="text"><span className="eb">MÜŞTERİ</span></div>
                  </div>
                  <h3 className="m-0 mb-[1mm] font-extrabold text-[11pt] tracking-[-0.02em]">{result.companyName}</h3>
                  <div className="text-[6.6pt] text-[#3B4866] leading-relaxed">{result.contactPerson || "Yetkili"}</div>
                  <div className="text-[6.6pt] text-[#3B4866] leading-relaxed">{result.email || "E-posta belirtilmedi"}</div>
                  <div className="text-[6.6pt] text-[#3B4866] leading-relaxed">Proje Sipariş Onayı</div>
                </div>
              </section>

              <section className="band signoff">
                <div className="relative">
                  <div className="font-bold text-[6.4pt] tracking-[1.3px] text-[#5A6B85] pt-[3mm] border-t border-[#D0D8E5]">TEDARİKÇİ ADINA · GENEL MÜDÜR</div>
                  <div className="h-px bg-[#D0D8E5] m-[8mm_8mm_2mm_0]"></div>
                  <div className="font-extrabold text-[9pt] text-[#0A1128]">İzzet Armağan Özsoy</div>
                  <div className="text-[6.4pt] text-[#5A6B85] mt-[1px]">Genel Müdür · ONO Yazılım A.Ş.</div>
                </div>
                <div className="relative">
                  <div className="font-bold text-[6.4pt] tracking-[1.3px] text-[#5A6B85] pt-[3mm] border-t border-[#D0D8E5]">MÜŞTERİ ADINA · YETKİLİ İMZA</div>
                  <div className="h-px bg-[#D0D8E5] m-[8mm_8mm_2mm_0]"></div>
                  <div className="font-extrabold text-[9pt] text-[#0A1128]">{result.contactPerson || "Ad Soyad"}</div>
                  <div className="text-[6.4pt] text-[#5A6B85] mt-[1px]">Yetkili imza · kaşe · tarih</div>
                </div>
              </section>

              <footer className="band foot">
                <div>ONO YAZILIM A.Ş. · <span className="text-[#00B4FF]">×</span> FİKİRLERİ GERÇEĞE DÖNÜŞTÜRÜYORUZ.</div>
                <div>ONOX.DEV · {result.id} · 1/1</div>
              </footer>

            </article>
          </div>
        )}
      </main>
    </div>
  );
}
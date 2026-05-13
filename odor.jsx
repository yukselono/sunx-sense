// SUNX Sense — Odor / Environmental Observation Flow
// 8 screens. Calm, scientific, community-driven tone. Not a complaint system.

const O_PRIMARY = 'oklch(0.65 0.14 230)';
const O_ACCENT  = 'oklch(0.72 0.14 155)';
const O_AMBER   = 'oklch(0.78 0.14 75)';
const O_RED     = 'oklch(0.62 0.18 25)';
const O_VIOLET  = 'oklch(0.62 0.18 295)';

// Severity scale (numeric — stored as score 0..4)
const INTENSITY = [
  { score: 0, emoji: '🌿', label: 'No noticeable smell',     sub: 'Air feels clean',         color: O_ACCENT },
  { score: 1, emoji: '🍃', label: 'Slight smell',             sub: 'Faint, barely detectable', color: 'oklch(0.78 0.12 160)' },
  { score: 2, emoji: '🌬', label: 'Noticeable smell',         sub: 'Easy to detect',           color: O_PRIMARY },
  { score: 3, emoji: '⚠️', label: 'Strong unpleasant smell',  sub: 'Hard to ignore',           color: O_AMBER },
  { score: 4, emoji: '🚨', label: 'Extremely intense smell',  sub: 'Overwhelming',             color: O_RED },
];

const ODOR_TYPES = [
  { k: 'traffic',    icon: '🚗', label: 'Traffic / Exhaust' },
  { k: 'smoke',      icon: '🔥', label: 'Smoke / Burning' },
  { k: 'garbage',    icon: '🗑',  label: 'Garbage / Waste' },
  { k: 'sewage',     icon: '🚱', label: 'Sewage' },
  { k: 'chemical',   icon: '🧪', label: 'Chemical' },
  { k: 'industrial', icon: '🏭', label: 'Industrial / Factory' },
  { k: 'mold',       icon: '💧', label: 'Mold / Humidity' },
  { k: 'animal',     icon: '🐄', label: 'Animal / Farm' },
  { k: 'food',       icon: '🍳', label: 'Food / Restaurant' },
  { k: 'cigarette',  icon: '🚬', label: 'Cigarette smoke' },
  { k: 'gas',        icon: '⛽', label: 'Gas-like smell' },
  { k: 'other',      icon: '❓', label: 'Other' },
];

const DISCOMFORT = [
  { score: 1, label: 'Barely noticeable',    sub: 'Doesn’t bother me' },
  { score: 2, label: 'Slightly uncomfortable', sub: 'Mild irritation' },
  { score: 3, label: 'Uncomfortable',          sub: 'Affecting my mood' },
  { score: 4, label: 'Very uncomfortable',     sub: 'Avoiding the area' },
  { score: 5, label: 'Unbearable',             sub: 'Affecting breathing' },
];

const DURATIONS = [
  { k: 'now',       icon: '⚡', label: 'Just started',     sub: 'Within the last 10 min' },
  { k: '30m',       icon: '⏱',  label: '10–30 minutes',     sub: 'Currently ongoing' },
  { k: '1h',        icon: '⏰', label: 'More than 1 hour',  sub: 'Persistent today' },
  { k: 'day',       icon: '📅', label: 'Most of the day',   sub: 'All-day presence' },
  { k: 'frequent',  icon: '🔁', label: 'Happens frequently', sub: 'Recurring pattern' },
];

const ODOR_COPY = {
  en: {
    headerEyebrow: 'SUNX SENSE · ODOR OBSERVATION',
    headerTitle: 'A calm way to map what you smell.',
    headerSub: 'Community-reported environmental observations — not a complaint system.',
    screens: [
      { id: 'map',         eyebrow: '01 · MAP ENTRY',        label: 'Long-press to share' },
      { id: 'intensity',   eyebrow: '02 · INTENSITY',         label: '5-point severity' },
      { id: 'type',        eyebrow: '03 · ODOR TYPE',         label: '12 categories · multi-select' },
      { id: 'discomfort',  eyebrow: '04 · DISCOMFORT',        label: 'Human impact' },
      { id: 'duration',    eyebrow: '05 · DURATION',          label: 'Temporal pattern' },
      { id: 'details',     eyebrow: '06 · OPTIONAL DETAILS',  label: 'Notes & media' },
      { id: 'submitted',   eyebrow: '07 · SUBMITTED',         label: 'Thank-you state' },
      { id: 'intel',       eyebrow: '08 · NEARBY INTEL',      label: 'Community signal' },
    ],
  },
  tr: {
    headerEyebrow: 'SUNX SENSE · KOKU GÖZLEMI',
    headerTitle: 'Çevrede hissettiğini sakin bir akışla haritala.',
    headerSub: 'Topluluk tarafından raporlanan çevresel gözlemler — şikâyet sistemi değildir.',
    screens: [
      { id: 'map',         eyebrow: '01 · HARITA',           label: 'Haritada uzun bas' },
      { id: 'intensity',   eyebrow: '02 · YOĞUNLUK',         label: '5 seviyeli skala' },
      { id: 'type',        eyebrow: '03 · KOKU TÜRÜ',        label: '12 kategori · çoklu seçim' },
      { id: 'discomfort',  eyebrow: '04 · RAHATSIZLIK',      label: 'İnsan etkisi' },
      { id: 'duration',    eyebrow: '05 · SÜRE',             label: 'Zamansal örüntü' },
      { id: 'details',     eyebrow: '06 · İSTEĞE BAĞLI',     label: 'Not & medya' },
      { id: 'submitted',   eyebrow: '07 · GÖNDERİLDİ',       label: 'Teşekkür' },
      { id: 'intel',       eyebrow: '08 · YAKIN ÇEVRE',      label: 'Topluluk sinyali' },
    ],
  },
};

// ===== Small shared bits =====

function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: 'Geist Mono, ui-monospace, monospace',
      fontSize: 10, letterSpacing: 1.8, fontWeight: 500,
      color: O_ACCENT, margin: '14px 24px 0',
    }}>{children}</div>
  );
}

function ScreenTitle({ title, sub, dark }) {
  return (
    <div style={{ padding: '8px 24px 0' }}>
      <h1 style={{
        fontFamily: 'Geist', fontWeight: 600, fontSize: 22, lineHeight: 1.18, letterSpacing: -0.6,
        color: dark ? '#fff' : '#0a1420', margin: '0 0 6px', textWrap: 'balance',
      }}>{title}</h1>
      {sub && (
        <p style={{
          fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)',
          margin: 0, textWrap: 'pretty',
        }}>{sub}</p>
      )}
    </div>
  );
}

function PrimaryButton({ children, disabled, dark, color }) {
  const bg = color || `linear-gradient(135deg, ${O_ACCENT}, oklch(0.62 0.16 155))`;
  return (
    <button disabled={disabled} style={{
      width: '100%', height: 50, border: 'none', borderRadius: 14,
      background: disabled
        ? (dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,30,50,0.08)')
        : bg,
      color: disabled ? (dark ? 'rgba(255,255,255,0.3)' : 'rgba(20,30,50,0.3)') : '#fff',
      fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: disabled ? 'none' : '0 8px 20px oklch(0.55 0.14 155 / 0.35)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>{children}</button>
  );
}

function GhostButton({ children, dark }) {
  return (
    <button style={{
      width: '100%', height: 44, marginTop: 8,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(20,30,50,0.14)'}`,
      borderRadius: 12, background: 'transparent',
      color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)',
      fontFamily: 'Geist', fontSize: 13, fontWeight: 500, cursor: 'pointer',
    }}>{children}</button>
  );
}

function ProgressBar({ step, total, dark }) {
  return (
    <div style={{
      display: 'flex', gap: 4, padding: '0 24px', marginTop: 4,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1, height: 3, borderRadius: 999,
          background: i < step
            ? O_ACCENT
            : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(20,30,50,0.1)'),
        }}/>
      ))}
    </div>
  );
}

function Shell({ dark, device, children }) {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column',
      background: dark ? 'oklch(0.14 0.015 225)' : 'oklch(0.985 0.008 220)',
      animation: 'fadeSlide 0.5s ease-out',
      fontFamily: 'Geist, Inter, -apple-system, system-ui, sans-serif',
      paddingTop: device === 'ios' ? 58 : 48,
    }}>{children}</div>
  );
}

function Footer({ device, children }) {
  return (
    <div style={{
      padding: '16px 24px',
      paddingBottom: device === 'ios' ? 40 : 32,
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );
}

// ===== Screens =====

function MapScreen({ dark, device, copy }) {
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[0].eyebrow}</Eyebrow>
      <ScreenTitle title="Share an environmental observation" sub="Long-press anywhere on the map to drop a calm, structured report." dark={dark} />

      {/* Map mockup */}
      <div style={{ position: 'relative', margin: '16px 24px', borderRadius: 18, overflow: 'hidden',
        height: 280,
        background: dark
          ? 'linear-gradient(135deg, oklch(0.20 0.04 230), oklch(0.18 0.03 200))'
          : 'linear-gradient(135deg, oklch(0.92 0.04 230), oklch(0.94 0.03 155))',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)'}` }}>
        {/* Simulated streets */}
        <svg viewBox="0 0 320 280" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <g stroke={dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,30,50,0.08)'} strokeWidth="1.5" fill="none">
            <path d="M 0 70 L 320 70" />
            <path d="M 0 140 L 320 140" />
            <path d="M 0 210 L 320 210" />
            <path d="M 80 0 L 80 280" />
            <path d="M 180 0 L 180 280" />
            <path d="M 260 0 L 260 280" />
          </g>
          {/* Heatmap blobs */}
          <circle cx="120" cy="100" r="40" fill={O_ACCENT} opacity="0.25"/>
          <circle cx="210" cy="180" r="55" fill={O_AMBER} opacity="0.28"/>
          <circle cx="60"  cy="220" r="30" fill={O_PRIMARY} opacity="0.25"/>
          {/* User pin (long-press indicator) */}
          <g transform="translate(160 130)">
            <circle r="32" fill={O_ACCENT} opacity="0.15">
              <animate attributeName="r" values="20;42;20" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle r="14" fill={O_ACCENT}/>
            <circle r="6"  fill="#fff"/>
          </g>
        </svg>
        <div style={{ position: 'absolute', bottom: 10, left: 10,
          padding: '5px 10px', borderRadius: 8,
          background: dark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)',
          fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.4,
          color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)' }}>
          41.0428°N · 28.9722°E
        </div>
      </div>

      {/* Action sheet */}
      <div style={{ margin: '0 24px', padding: 14, borderRadius: 14,
        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)'}` }}>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.6,
          color: O_ACCENT, fontWeight: 600, textTransform: 'uppercase', marginBottom: 10 }}>SHARE</div>
        {[
          { ic: '👃', l: 'Odor observation' },
          { ic: '👁', l: 'Visibility issue' },
          { ic: '💨', l: 'Smoke observation' },
          { ic: '😶‍🌫️', l: 'Air discomfort' },
        ].map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
            borderTop: i ? `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(20,30,50,0.05)'}` : 'none' }}>
            <span style={{ fontSize: 18 }}>{it.ic}</span>
            <span style={{ flex: 1, fontFamily: 'Geist', fontSize: 13, color: dark ? '#fff' : '#0a1420' }}>{it.l}</span>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 3l4 4-4 4" stroke={dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)'} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}/>
      <Footer device={device}><PrimaryButton dark={dark}>Start observation</PrimaryButton></Footer>
    </Shell>
  );
}

function IntensityScreen({ dark, device, copy }) {
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[1].eyebrow}</Eyebrow>
      <ProgressBar step={1} total={5} dark={dark} />
      <ScreenTitle title="What do you notice in the air right now?" sub="A simple, calm read on what your senses are picking up." dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {INTENSITY.map((it, i) => {
          const selected = i === 2;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              border: `1.5px solid ${selected ? it.color : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)')}`,
              background: selected
                ? `linear-gradient(135deg, ${it.color}22, transparent)`
                : (dark ? 'rgba(255,255,255,0.03)' : 'rgba(20,30,50,0.03)'),
              transition: 'all 0.15s',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 999, flexShrink: 0,
                background: selected ? it.color : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.05)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>{it.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 500,
                  color: dark ? '#fff' : '#0a1420' }}>{it.label}</div>
                <div style={{ fontFamily: 'Geist', fontSize: 11.5, marginTop: 2,
                  color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{it.sub}</div>
              </div>
              <span style={{
                fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
                letterSpacing: 1, padding: '3px 7px', borderRadius: 999,
                background: selected ? it.color : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)'),
                color: selected ? '#fff' : (dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)'),
                fontWeight: 600,
              }}>{it.score}</span>
            </div>
          );
        })}
      </div>
      <Footer device={device}><PrimaryButton dark={dark}>Continue →</PrimaryButton></Footer>
    </Shell>
  );
}

function TypeScreen({ dark, device, copy }) {
  const selected = new Set(['traffic', 'smoke']);
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[2].eyebrow}</Eyebrow>
      <ProgressBar step={2} total={5} dark={dark} />
      <ScreenTitle title="What does the smell resemble?" sub="Tap one or more. Structured categories help us cluster patterns." dark={dark} />
      <div style={{ padding: '14px 20px 0', flex: 1, display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: 8, alignContent: 'start' }}>
        {ODOR_TYPES.map((t) => {
          const on = selected.has(t.k);
          return (
            <div key={t.k} style={{
              padding: '12px 10px', borderRadius: 12,
              border: `1.5px solid ${on ? O_ACCENT : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(20,30,50,0.07)')}`,
              background: on
                ? `linear-gradient(135deg, ${O_ACCENT}22, transparent)`
                : (dark ? 'rgba(255,255,255,0.03)' : 'rgba(20,30,50,0.03)'),
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 22 }}>{t.icon}</div>
              <div style={{ fontFamily: 'Geist', fontSize: 11.5, fontWeight: 500, lineHeight: 1.25,
                color: dark ? '#fff' : '#0a1420' }}>{t.label}</div>
              {on && <div style={{
                position: 'absolute',
              }}/>}
            </div>
          );
        })}
      </div>
      <Footer device={device}>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.4,
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)', textAlign: 'center', marginBottom: 6 }}>
          2 SELECTED
        </div>
        <PrimaryButton dark={dark}>Continue →</PrimaryButton>
      </Footer>
    </Shell>
  );
}

function DiscomfortScreen({ dark, device, copy }) {
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[3].eyebrow}</Eyebrow>
      <ProgressBar step={3} total={5} dark={dark} />
      <ScreenTitle title="How uncomfortable is it?" sub="Separate from intensity — how it affects you, personally." dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DISCOMFORT.map((d) => {
          const selected = d.score === 2;
          const color = d.score <= 1 ? O_ACCENT
            : d.score === 2 ? 'oklch(0.78 0.12 160)'
            : d.score === 3 ? O_AMBER
            : d.score === 4 ? 'oklch(0.70 0.16 50)'
            : O_RED;
          return (
            <div key={d.score} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '14px 16px', borderRadius: 12,
              border: `1.5px solid ${selected ? color : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)')}`,
              background: selected
                ? `linear-gradient(135deg, ${color}22, transparent)`
                : (dark ? 'rgba(255,255,255,0.03)' : 'rgba(20,30,50,0.03)'),
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: 999, flexShrink: 0,
                background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Geist', fontSize: 13, fontWeight: 700, color: '#fff',
              }}>{d.score}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 500,
                  color: dark ? '#fff' : '#0a1420' }}>{d.label}</div>
                <div style={{ fontFamily: 'Geist', fontSize: 11.5, marginTop: 1,
                  color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{d.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer device={device}><PrimaryButton dark={dark}>Continue →</PrimaryButton></Footer>
    </Shell>
  );
}

function DurationScreen({ dark, device, copy }) {
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[4].eyebrow}</Eyebrow>
      <ProgressBar step={4} total={5} dark={dark} />
      <ScreenTitle title="How long has this been happening?" sub="Helps separate one-off events from recurring patterns." dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DURATIONS.map((d, i) => {
          const selected = i === 1;
          return (
            <div key={d.k} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 12,
              border: `1.5px solid ${selected ? O_ACCENT : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)')}`,
              background: selected
                ? `linear-gradient(135deg, ${O_ACCENT}22, transparent)`
                : (dark ? 'rgba(255,255,255,0.03)' : 'rgba(20,30,50,0.03)'),
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 500,
                  color: dark ? '#fff' : '#0a1420' }}>{d.label}</div>
                <div style={{ fontFamily: 'Geist', fontSize: 11.5, marginTop: 1,
                  color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{d.sub}</div>
              </div>
              {selected && <svg width="20" height="20" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="9" fill={O_ACCENT}/>
                <path d="M5.5 10l3 3 6-6.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
            </div>
          );
        })}
      </div>
      <Footer device={device}><PrimaryButton dark={dark}>Continue →</PrimaryButton></Footer>
    </Shell>
  );
}

function DetailsScreen({ dark, device, copy }) {
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[5].eyebrow}</Eyebrow>
      <ProgressBar step={5} total={5} dark={dark} />
      <ScreenTitle title="Anything else you’d like to share?" sub="All fields are optional. We never require typing." dark={dark} />
      <div style={{ padding: '14px 24px 0', flex: 1 }}>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
          letterSpacing: 1.6, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)',
          textTransform: 'uppercase', marginBottom: 6 }}>NOTE · OPTIONAL</div>
        <div style={{
          padding: 14, borderRadius: 12, minHeight: 80,
          background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,30,50,0.04)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(20,30,50,0.08)'}`,
          fontFamily: 'Geist', fontSize: 13, lineHeight: 1.45,
          color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)',
        }}>
          Smells stronger near the intersection. Usually appears around 21:00.
        </div>

        <div style={{ marginTop: 18, fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
          letterSpacing: 1.6, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)',
          textTransform: 'uppercase', marginBottom: 8 }}>MEDIA · OPTIONAL</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, height: 84, borderRadius: 12,
            background: 'linear-gradient(135deg, oklch(0.40 0.04 230), oklch(0.30 0.04 200))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden' }}>
            <svg width="120" height="60" viewBox="0 0 120 60" style={{ opacity: 0.45 }}>
              <path d="M0 50 Q20 30 40 38 T80 28 T120 35 L120 60 L0 60 Z" fill="#fff"/>
            </svg>
            <div style={{ position: 'absolute', bottom: 6, left: 8,
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9,
              letterSpacing: 1.2, color: 'rgba(255,255,255,0.85)' }}>PHOTO · 2.1MB</div>
          </div>
          <button style={{
            width: 56, height: 84, border: `1.5px dashed ${dark ? 'rgba(255,255,255,0.2)' : 'rgba(20,30,50,0.18)'}`,
            background: 'transparent', borderRadius: 12, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)', gap: 2,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            <span style={{ fontSize: 9, fontFamily: 'Geist Mono, ui-monospace, monospace', letterSpacing: 1 }}>ADD</span>
          </button>
        </div>

        <div style={{ marginTop: 14, padding: 10, borderRadius: 10,
          background: dark ? 'oklch(0.22 0.04 230 / 0.3)' : 'oklch(0.96 0.03 230 / 0.5)',
          border: `1px solid ${dark ? 'rgba(110,160,220,0.18)' : 'rgba(110,160,220,0.25)'}`,
          fontFamily: 'Geist', fontSize: 11, lineHeight: 1.4,
          color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)' }}>
          ℹ️ Odor observations are community-reported experiences and may vary between individuals.
        </div>
      </div>
      <Footer device={device}>
        <PrimaryButton dark={dark}>Submit observation</PrimaryButton>
        <GhostButton dark={dark}>Skip</GhostButton>
      </Footer>
    </Shell>
  );
}

function SubmittedScreen({ dark, device, copy }) {
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[6].eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
        {/* Animated success orb */}
        <div style={{
          width: 110, height: 110, borderRadius: 999, marginBottom: 18,
          background: `linear-gradient(135deg, ${O_ACCENT}, oklch(0.55 0.16 200))`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 12px 40px ${O_ACCENT}66`,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: -14, borderRadius: 999,
            border: `1.5px solid ${O_ACCENT}`, opacity: 0.4,
            animation: 'haloBreath 2.4s ease-in-out infinite',
          }}/>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <path d="M14 27l8 8 16-18" stroke="#fff" strokeWidth="3.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 24, letterSpacing: -0.4,
          margin: '0 0 8px', color: dark ? '#fff' : '#0a1420' }}>
          Thank you for sharing.
        </h1>
        <p style={{ fontFamily: 'Geist', fontSize: 13.5, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)',
          margin: '0 0 20px', maxWidth: 280 }}>
          Your observation helps map how the city actually feels — not just what sensors read.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { l: '+15 SP', c: O_ACCENT },
            { l: 'Sewage', c: O_PRIMARY },
            { l: 'Lv. 2', c: 'oklch(0.78 0.12 160)' },
            { l: '10–30 min', c: dark ? 'rgba(255,255,255,0.15)' : 'rgba(20,30,50,0.1)' },
          ].map((c, i) => (
            <span key={i} style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: 1,
              padding: '5px 10px', borderRadius: 999,
              background: c.c, color: (c.c.startsWith('rgba') || c.c.startsWith('oklch(0.7'))
                ? (dark ? 'rgba(255,255,255,0.85)' : 'rgba(20,30,50,0.85)')
                : '#fff',
              fontWeight: 600,
            }}>{c.l}</span>
          ))}
        </div>
      </div>
      <Footer device={device}>
        <PrimaryButton dark={dark} color={`linear-gradient(135deg, ${O_PRIMARY}, oklch(0.58 0.16 220))`}>See on map</PrimaryButton>
        <GhostButton dark={dark}>Done</GhostButton>
      </Footer>
    </Shell>
  );
}

function IntelScreen({ dark, device, copy }) {
  const reports = [
    { n: 12, type: 'Sewage-like', area: 'within 600m', time: 'last 1h',  pct: 78 },
    { n: 7,  type: 'Traffic',     area: 'within 1km',  time: 'last 2h',  pct: 52 },
    { n: 4,  type: 'Smoke',       area: 'within 800m', time: 'last 3h',  pct: 31 },
  ];
  return (
    <Shell dark={dark} device={device}>
      <Eyebrow>{copy.screens[7].eyebrow}</Eyebrow>
      <ScreenTitle title="Others noticed it too." sub="Crowd-powered environmental intelligence — your observation just joined the pattern." dark={dark} />

      {/* Hero stat card */}
      <div style={{ margin: '16px 24px 0', padding: 18, borderRadius: 16,
        background: `linear-gradient(135deg, ${O_ACCENT}22, oklch(0.55 0.14 200 / 0.18))`,
        border: `1px solid ${O_ACCENT}55` }}>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.6,
          color: O_ACCENT, fontWeight: 600, textTransform: 'uppercase' }}>NEAR YOU · LAST HOUR</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
          <span style={{ fontFamily: 'Geist', fontSize: 36, fontWeight: 700,
            color: dark ? '#fff' : '#0a1420', letterSpacing: -1 }}>12</span>
          <span style={{ fontFamily: 'Geist', fontSize: 14,
            color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)' }}>nearby observations</span>
        </div>
        <p style={{ margin: '8px 0 0', fontFamily: 'Geist', fontSize: 12.5, lineHeight: 1.45,
          color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)' }}>
          Sewage-like odors were also reported nearby. Correlated with elevated PM2.5 since 20:40.
        </p>
      </div>

      {/* Breakdown */}
      <div style={{ padding: '14px 24px 0', flex: 1 }}>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.6,
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)',
          textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>BREAKDOWN</div>
        {reports.map((r, i) => (
          <div key={i} style={{ padding: '10px 0',
            borderTop: i ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(20,30,50,0.06)'}` : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'Geist', fontSize: 13.5, fontWeight: 500,
                color: dark ? '#fff' : '#0a1420' }}>
                <span style={{ color: O_ACCENT, fontWeight: 700 }}>{r.n}</span> · {r.type}
              </span>
              <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
                letterSpacing: 1, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>
                {r.area} · {r.time}
              </span>
            </div>
            <div style={{ height: 4, borderRadius: 999, marginTop: 6,
              background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(20,30,50,0.06)' }}>
              <div style={{ height: '100%', width: `${r.pct}%`, borderRadius: 999,
                background: i === 0 ? O_ACCENT : i === 1 ? O_PRIMARY : O_AMBER }}/>
            </div>
          </div>
        ))}
      </div>

      <Footer device={device}>
        <PrimaryButton dark={dark} color={`linear-gradient(135deg, ${O_PRIMARY}, oklch(0.58 0.16 220))`}>
          Open observation heatmap
        </PrimaryButton>
      </Footer>
    </Shell>
  );
}

// ===== Dispatcher =====

function OdorScreen({ dark, lang, device, idx }) {
  const copy = window.ODOR_COPY[lang];
  const id = copy.screens[idx].id;
  switch (id) {
    case 'map':         return <MapScreen        dark={dark} device={device} copy={copy} />;
    case 'intensity':   return <IntensityScreen  dark={dark} device={device} copy={copy} />;
    case 'type':        return <TypeScreen       dark={dark} device={device} copy={copy} />;
    case 'discomfort':  return <DiscomfortScreen dark={dark} device={device} copy={copy} />;
    case 'duration':    return <DurationScreen   dark={dark} device={device} copy={copy} />;
    case 'details':     return <DetailsScreen    dark={dark} device={device} copy={copy} />;
    case 'submitted':   return <SubmittedScreen  dark={dark} device={device} copy={copy} />;
    case 'intel':       return <IntelScreen      dark={dark} device={device} copy={copy} />;
    default:            return null;
  }
}

window.OdorScreen = OdorScreen;
window.ODOR_COPY = ODOR_COPY;

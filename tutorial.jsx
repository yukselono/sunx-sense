// Post-onboarding tutorial — runs after "Let's get started" on slide 5
// 5 steps: Permissions → Locating → First declaration → Thank you → Health insight

const T_PRIMARY = 'oklch(0.65 0.14 230)';
const T_ACCENT  = 'oklch(0.72 0.14 155)';
const T_AMBER   = 'oklch(0.78 0.14 75)';
const T_RED     = 'oklch(0.62 0.18 25)';

const TUTORIAL_COPY = {
  en: {
    skip: '',
    steps: [
      {
        eyebrow: 'STEP 1 · PERMISSIONS',
        title: 'Three permissions to begin.',
        body: 'Sense needs your location to place you in a zone, Bluetooth to pair a Carbostar, and notifications to nudge you when your zone changes.',
        cta: 'Allow all',
      },
      {
        eyebrow: 'STEP 2 · LOCATING',
        title: 'Finding your zone…',
        body: 'Zooming from the global map down to your H3 cell. This is where your declaration will land.',
        cta: 'Continue',
      },
      {
        eyebrow: 'STEP 3 · FIRST DECLARATION',
        title: 'How does the air feel right now?',
        body: 'Tap the option that best describes the air around you. You can refine this later with a Carbostar.',
        cta: 'Send declaration',
      },
      {
        eyebrow: 'STEP 4 · CONFIRMED',
        title: 'Thank you. Your zone is live.',
        body: 'Your declaration has been verified by 3 nearby contributors and added to the SUNX Earth network.',
        cta: 'See what this means',
      },
      {
        eyebrow: 'STEP 5 · YOUR AIR · HEALTH',
        title: 'What 612 ppm means for you.',
        body: 'CO₂ is invisible — but your body knows. Here is how the air you just declared compares to known thresholds.',
        cta: 'Open my map',
      },
    ],
    perms: [
      { name: 'Location', detail: 'When in use', code: 'GPS · ZONE PLACEMENT' },
      { name: 'Bluetooth', detail: 'For PX Carbostar', code: 'BLE 5.0 · PAIRING' },
      { name: 'Notifications', detail: 'Zone alerts only', code: 'CRITICAL EVENTS' },
    ],
    declOptions: [
      { id: 'fresh', label: 'Fresh', sub: 'Outdoor, breezy', ppm: 412, color: T_ACCENT },
      { id: 'normal', label: 'Normal', sub: 'Indoor, ventilated', ppm: 612, color: 'oklch(0.78 0.14 95)' },
      { id: 'stuffy', label: 'Stuffy', sub: 'Crowded room', ppm: 980, color: T_AMBER },
      { id: 'heavy', label: 'Heavy', sub: 'Stale, foggy head', ppm: 1340, color: T_RED },
    ],
    healthBands: [
      { from: 0, to: 600, label: 'Fresh', detail: 'Outdoor baseline. Clear thinking, full focus.', color: T_ACCENT },
      { from: 600, to: 1000, label: 'Normal', detail: 'Typical indoor. Comfortable for hours.', color: 'oklch(0.78 0.14 95)' },
      { from: 1000, to: 1500, label: 'Drowsy', detail: 'Reduced concentration, mild fatigue.', color: T_AMBER },
      { from: 1500, to: 2500, label: 'Heavy', detail: 'Headaches, sleepiness, poor decisions.', color: T_RED },
    ],
    yourReading: 'Your reading',
    verified: 'verified by',
    nearby: 'nearby',
    finish: 'Open my map',
  },
  tr: {
    skip: '',
    steps: [
      {
        eyebrow: 'ADIM 1 · İZİNLER',
        title: 'Başlamak için üç izin.',
        body: 'Sense; bölgene yerleştirmek için konum, Carbostar eşlemek için Bluetooth, bölge değişimlerini haber vermek için bildirim izni ister.',
        cta: 'Tümüne izin ver',
      },
      {
        eyebrow: 'ADIM 2 · KONUM',
        title: 'Bölgen bulunuyor…',
        body: 'Küresel haritadan H3 hücrene yakınlaşıyoruz. Deklarasyonun buraya düşecek.',
        cta: 'Devam et',
      },
      {
        eyebrow: 'ADIM 3 · İLK DEKLARASYON',
        title: 'Şu an hava nasıl hissettiriyor?',
        body: 'Çevrendeki havayı en iyi anlatan seçeneği işaretle. Bunu sonra Carbostar ile inceleştirebilirsin.',
        cta: 'Deklarasyonu gönder',
      },
      {
        eyebrow: 'ADIM 4 · ONAYLANDI',
        title: 'Teşekkürler. Bölgen artık canlı.',
        body: 'Deklarasyonun, yakındaki 3 katılımcı tarafından doğrulandı ve SUNX Earth ağına eklendi.',
        cta: 'Bunun anlamı',
      },
      {
        eyebrow: 'ADIM 5 · HAVAN · SAĞLIK',
        title: '612 ppm senin için ne demek?',
        body: 'CO₂ görünmez — ama bedenin bilir. Az önce deklare ettiğin hava, bilinen eşiklerle nasıl karşılaştırılıyor?',
        cta: 'Haritamı aç',
      },
    ],
    perms: [
      { name: 'Konum', detail: 'Kullanıldığında', code: 'GPS · BÖLGE TESPİTİ' },
      { name: 'Bluetooth', detail: 'PX Carbostar için', code: 'BLE 5.0 · EŞLEME' },
      { name: 'Bildirimler', detail: 'Sadece bölge uyarıları', code: 'KRİTİK OLAYLAR' },
    ],
    declOptions: [
      { id: 'fresh', label: 'Taze', sub: 'Açık hava, esinti', ppm: 412, color: T_ACCENT },
      { id: 'normal', label: 'Normal', sub: 'Havalandırılmış', ppm: 612, color: 'oklch(0.78 0.14 95)' },
      { id: 'stuffy', label: 'Boğucu', sub: 'Kalabalık ortam', ppm: 980, color: T_AMBER },
      { id: 'heavy', label: 'Ağır', sub: 'Bayat, başağrısı', ppm: 1340, color: T_RED },
    ],
    healthBands: [
      { from: 0, to: 600, label: 'Taze', detail: 'Açık hava düzeyi. Net düşünme, tam odak.', color: T_ACCENT },
      { from: 600, to: 1000, label: 'Normal', detail: 'Tipik iç mekân. Saatlerce rahat.', color: 'oklch(0.78 0.14 95)' },
      { from: 1000, to: 1500, label: 'Uyuşuk', detail: 'Konsantrasyon düşer, hafif yorgunluk.', color: T_AMBER },
      { from: 1500, to: 2500, label: 'Ağır', detail: 'Başağrısı, uyku hâli, zayıf kararlar.', color: T_RED },
    ],
    yourReading: 'Senin değerin',
    verified: 'doğrulayan',
    nearby: 'yakın',
    finish: 'Haritamı aç',
  },
};

// ─────────────────────────────────────────────────────────────
// STEP 1 — Permissions hero (3 stacked permission cards)
// ─────────────────────────────────────────────────────────────
function StepPermissions({ dark, lang, onComplete }) {
  const c = TUTORIAL_COPY[lang];
  const [granted, setGranted] = React.useState([false, false, false]);
  const all = granted.every(Boolean);

  // Auto-cascade through perms when "Allow all" is pressed
  const grantAll = () => {
    [0,1,2].forEach((i) => {
      setTimeout(() => setGranted(g => { const n = [...g]; n[i] = true; return n; }), 350 * (i + 1));
    });
    setTimeout(onComplete, 350 * 4 + 400);
  };

  const icons = [
    // Location pin
    <svg key="loc" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z" stroke={T_PRIMARY} strokeWidth="1.8"/>
      <circle cx="12" cy="9" r="2.5" fill={T_PRIMARY}/>
    </svg>,
    // Bluetooth
    <svg key="bt" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M7 7l10 10-5 5V2l5 5L7 17" stroke={T_PRIMARY} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>,
    // Bell
    <svg key="bell" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 17h14l-2-2v-5a5 5 0 0 0-10 0v5l-2 2zM10 21a2 2 0 0 0 4 0" stroke={T_PRIMARY} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>,
  ];

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {c.perms.map((p, i) => (
        <div key={i} style={{
          padding: 14, borderRadius: 14,
          background: dark ? 'oklch(0.20 0.015 225)' : 'rgba(255,255,255,0.85)',
          border: `1px solid ${granted[i] ? T_ACCENT : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)')}`,
          display: 'flex', alignItems: 'center', gap: 12,
          transition: 'all 0.3s',
          transform: granted[i] ? 'translateY(0)' : 'translateY(0)',
          boxShadow: granted[i] ? `0 0 0 4px ${T_ACCENT}1a` : 'none',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: dark ? 'rgba(140,200,255,0.10)' : 'rgba(20,90,180,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{icons[i]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
              color: dark ? '#fff' : '#0a1420' }}>{p.name}</div>
            <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
              color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{p.code}</div>
          </div>
          {granted[i] ? (
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: T_ACCENT,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'fadeSlide 0.3s ease-out',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7l3 3 5-6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ) : (
            <div style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
              color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)',
            }}>{p.detail.toUpperCase()}</div>
          )}
        </div>
      ))}
      <button onClick={grantAll} disabled={all} style={{
        marginTop: 10, height: 50, border: 'none', borderRadius: 14,
        background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.58 0.16 220))',
        color: '#fff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
        cursor: all ? 'default' : 'pointer',
        opacity: all ? 0.5 : 1,
        boxShadow: '0 8px 20px rgba(20,90,200,0.3)',
      }}>{c.steps[0].cta}</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 — Locating: world → H3 zone zoom
// ─────────────────────────────────────────────────────────────
function StepLocating({ dark, lang, onComplete }) {
  const [phase, setPhase] = React.useState(0); // 0: world, 1: city, 2: zone
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 900);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(onComplete, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const cx = 171, cy = 150;
  const cellSize = phase === 0 ? 6 : phase === 1 ? 16 : 36;
  const opacity = phase === 0 ? 1 : 0.3;

  const cells = [];
  const dx = cellSize * Math.sqrt(3);
  const dy = cellSize * 1.5;
  for (let row = -8; row < 8; row++) {
    for (let col = -8; col < 8; col++) {
      const x = cx + col * dx + (row % 2 ? dx / 2 : 0);
      const y = cy + row * dy;
      cells.push({ x, y, row, col });
    }
  }

  const yourCellIdx = cells.findIndex(c => c.row === 0 && c.col === 0);
  const labelMap = { 0: 'EARTH · GLOBAL', 1: 'ISTANBUL · CITY', 2: 'YOUR ZONE · H3 R10' };

  return (
    <div style={{ width: 342, height: 300, position: 'relative',
      borderRadius: 20, overflow: 'hidden',
      background: dark ? 'oklch(0.17 0.015 225)' : 'oklch(0.98 0.008 225)',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>

      {/* breathing target rings */}
      {[0,1,2].map(i => (
        <div key={i} style={{
          position: 'absolute', left: cx - 50, top: cy - 50, width: 100, height: 100,
          borderRadius: '50%', border: `1.5px solid ${T_PRIMARY}`,
          opacity: 0.3, animation: 'ripExpand 2.4s ease-out infinite',
          animationDelay: `${i * 0.8}s`,
        }} />
      ))}

      <svg width="342" height="300">
        {cells.map((c, i) => {
          const d = Math.hypot(c.x - cx, c.y - cy);
          if (d > 150) return null;
          const isYou = i === yourCellIdx;
          return (
            <path key={i}
              d={hexPath(c.x, c.y, cellSize - 1)}
              fill={isYou && phase === 2 ? T_ACCENT : (dark ? 'oklch(0.24 0.015 225)' : 'oklch(0.94 0.01 225)')}
              stroke={isYou && phase === 2 ? T_ACCENT : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)')}
              strokeWidth={isYou && phase === 2 ? 2 : 1}
              opacity={isYou ? 1 : opacity * (1 - d / 200)}
              style={{ transition: 'all 0.9s cubic-bezier(.4,0,.2,1)' }}
            />
          );
        })}
        {/* center crosshair */}
        <circle cx={cx} cy={cy} r="3" fill={T_PRIMARY}
          style={{ animation: 'dotBreath 1.2s ease-in-out infinite', transformOrigin: `${cx}px ${cy}px` }} />
      </svg>

      <div style={{ position: 'absolute', left: 16, bottom: 14,
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
        color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 5, height: 5, background: T_ACCENT, borderRadius: '50%',
          animation: 'dotBreath 1.6s ease-in-out infinite' }} />
        {labelMap[phase]}
      </div>
      <div style={{ position: 'absolute', right: 16, bottom: 14,
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
        color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)' }}>
        ZOOM · {phase === 0 ? 'R3' : phase === 1 ? 'R6' : 'R10'}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — Declaration form (4 air-quality buttons)
// ─────────────────────────────────────────────────────────────
function StepDeclaration({ dark, lang, onComplete, setReadingPpm }) {
  const c = TUTORIAL_COPY[lang];
  const [pick, setPick] = React.useState(1); // default to Normal
  const selected = c.declOptions[pick];

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {/* preview ring */}
      <div style={{
        padding: 16, borderRadius: 16,
        background: dark ? 'oklch(0.20 0.015 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>YOUR DECLARATION</div>
          <div style={{ fontFamily: 'Geist', fontSize: 22, fontWeight: 600, marginTop: 2,
            color: dark ? '#fff' : '#0a1420' }}>
            {selected.label}
            <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: 1,
              color: selected.color, marginLeft: 8 }}>≈ {selected.ppm} ppm</span>
          </div>
          <div style={{ fontFamily: 'Geist', fontSize: 12,
            color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)', marginTop: 2 }}>
            {selected.sub}
          </div>
        </div>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          background: selected.color,
          boxShadow: `0 0 0 6px ${selected.color}26`,
          animation: 'haloBreath 2.4s ease-in-out infinite',
        }} />
      </div>

      {/* options grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {c.declOptions.map((o, i) => (
          <button key={o.id} onClick={() => setPick(i)} style={{
            padding: '12px 12px', borderRadius: 12, textAlign: 'left',
            background: pick === i
              ? (dark ? 'oklch(0.22 0.025 225)' : '#fff')
              : (dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.5)'),
            border: pick === i ? `1.5px solid ${o.color}` : `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', gap: 4,
            boxShadow: pick === i ? `0 4px 14px ${o.color}33` : 'none',
            transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: o.color }} />
              <span style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 600,
                color: dark ? '#fff' : '#0a1420' }}>{o.label}</span>
            </div>
            <div style={{ fontFamily: 'Geist', fontSize: 11,
              color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{o.sub}</div>
          </button>
        ))}
      </div>

      <button onClick={() => { setReadingPpm(selected.ppm); onComplete(); }} style={{
        marginTop: 6, height: 50, border: 'none', borderRadius: 14,
        background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.58 0.16 220))',
        color: '#fff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 8px 20px rgba(20,90,200,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {c.steps[2].cta}
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 4 — Confirmation with sparkles + your reading
// ─────────────────────────────────────────────────────────────
function StepConfirm({ dark, lang, readingPpm, onComplete }) {
  const c = TUTORIAL_COPY[lang];
  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      {/* big checkmark with rings */}
      <div style={{ position: 'relative', width: 200, height: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 6,
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute', width: 200, height: 200, borderRadius: '50%',
            border: `1.5px solid ${T_ACCENT}`,
            opacity: 0.3, animation: 'ripExpand 2.4s ease-out infinite',
            animationDelay: `${i * 0.8}s`,
          }} />
        ))}
        <div style={{
          width: 110, height: 110, borderRadius: '50%',
          background: 'linear-gradient(135deg, oklch(0.78 0.14 155), oklch(0.65 0.14 155))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 16px 40px ${T_ACCENT}55`,
          animation: 'haloBreath 2.4s ease-in-out infinite',
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M12 24l8 8 16-18" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        {/* sparkles */}
        {[0,1,2,3,4,5].map(i => {
          const a = (i / 6) * Math.PI * 2 + 0.3;
          const x = 100 + Math.cos(a) * 80;
          const y = 100 + Math.sin(a) * 80;
          return <div key={i} style={{
            position: 'absolute', left: x - 3, top: y - 3, width: 6, height: 6,
            background: T_ACCENT, transform: 'rotate(45deg)',
            animation: `dotBreath 1.6s ease-in-out infinite`, animationDelay: `${i * 0.2}s`,
            transformOrigin: 'center',
          }} />;
        })}
      </div>

      {/* reading card */}
      <div style={{
        width: '100%', padding: 16, borderRadius: 16,
        background: dark ? 'oklch(0.20 0.015 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
              color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{c.yourReading.toUpperCase()}</div>
            <div style={{ fontFamily: 'Geist', fontSize: 30, fontWeight: 600, marginTop: 2,
              fontVariantNumeric: 'tabular-nums', letterSpacing: -1,
              color: dark ? '#fff' : '#0a1420' }}>{readingPpm}<span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 12, color: T_ACCENT, marginLeft: 6 }}>ppm</span></div>
          </div>
          <div style={{
            fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.2, lineHeight: 1.5,
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)', textAlign: 'right',
          }}>
            {c.verified.toUpperCase()}<br/>
            <span style={{ color: T_ACCENT }}>3 {c.nearby.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 5 — Health insight: CO₂ scale with your reading marked
// ─────────────────────────────────────────────────────────────
function StepHealth({ dark, lang, readingPpm }) {
  const c = TUTORIAL_COPY[lang];
  const max = 2500;
  const pct = (ppm) => Math.min(100, (ppm / max) * 100);

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* scale bar */}
      <div style={{ position: 'relative', height: 38, marginTop: 4 }}>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', borderRadius: 8, overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        }}>
          {c.healthBands.map((b, i) => (
            <div key={i} style={{
              flex: b.to - b.from,
              background: b.color, opacity: 0.85,
            }} />
          ))}
        </div>
        {/* your reading marker */}
        <div style={{
          position: 'absolute', left: `${pct(readingPpm)}%`, top: -8,
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            padding: '3px 8px', borderRadius: 6,
            background: dark ? '#fff' : '#0a1420',
            color: dark ? '#0a1420' : '#fff',
            fontFamily: 'Geist Mono, ui-monospace, monospace',
            fontSize: 10, fontWeight: 600, letterSpacing: 0.5,
            whiteSpace: 'nowrap',
          }}>{readingPpm} ppm</div>
          <div style={{
            width: 0, height: 0,
            borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
            borderTop: `6px solid ${dark ? '#fff' : '#0a1420'}`,
          }} />
        </div>
      </div>
      {/* tick marks */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
        color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)', marginTop: -10 }}>
        <span>0</span><span>600</span><span>1000</span><span>1500</span><span>2500 ppm</span>
      </div>

      {/* band cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
        {c.healthBands.map((b, i) => {
          const isYours = readingPpm >= b.from && readingPpm < b.to;
          return (
            <div key={i} style={{
              padding: '10px 12px', borderRadius: 10,
              background: isYours
                ? (dark ? 'oklch(0.22 0.025 225)' : '#fff')
                : 'transparent',
              border: isYours ? `1.5px solid ${b.color}` : `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
              display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: isYours ? `0 4px 14px ${b.color}26` : 'none',
            }}>
              <div style={{ width: 6, height: 32, borderRadius: 3, background: b.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: 'Geist', fontSize: 13, fontWeight: 600,
                    color: dark ? '#fff' : '#0a1420' }}>{b.label}</span>
                  <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9,
                    letterSpacing: 1, color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,50,0.45)' }}>
                    {b.from}–{b.to} ppm
                  </span>
                  {isYours && (
                    <span style={{ marginLeft: 'auto',
                      fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
                      color: b.color, fontWeight: 600 }}>← YOU</span>
                  )}
                </div>
                <div style={{ fontFamily: 'Geist', fontSize: 11, lineHeight: 1.4, marginTop: 2,
                  color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.55)' }}>{b.detail}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Tutorial host — manages step progression
// ─────────────────────────────────────────────────────────────
function TutorialFlow({ dark, lang, device, onExit }) {
  const c = TUTORIAL_COPY[lang];
  const [step, setStep] = React.useState(0);
  const [readingPpm, setReadingPpm] = React.useState(612);

  const advance = () => setStep(s => s + 1);

  // Auto-advance step 2 (locating) is internal; step 1 advances on grant
  let hero = null;
  if (step === 0) hero = <StepPermissions dark={dark} lang={lang} onComplete={advance} />;
  if (step === 1) hero = <StepLocating dark={dark} lang={lang} onComplete={advance} />;
  if (step === 2) hero = <StepDeclaration dark={dark} lang={lang} onComplete={advance} setReadingPpm={setReadingPpm} />;
  if (step === 3) hero = <StepConfirm dark={dark} lang={lang} readingPpm={readingPpm} onComplete={advance} />;
  if (step === 4) hero = <StepHealth dark={dark} lang={lang} readingPpm={readingPpm} />;

  const stepData = c.steps[step];
  const showCTA = step !== 0 && step !== 2; // those have their own buttons

  return (
    <div key={step} style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column',
      background: dark ? 'oklch(0.14 0.015 225)' : 'oklch(0.985 0.008 220)',
      animation: 'fadeSlide 0.5s ease-out',
      fontFamily: 'Geist, Inter, -apple-system, system-ui, sans-serif',
    }}>
      {/* Top bar */}
      <div style={{
        paddingTop: device === 'ios' ? 58 : 48,
        paddingLeft: 20, paddingRight: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.72 0.14 155))',
            boxShadow: '0 2px 6px rgba(20,90,180,0.25)',
          }} />
          <span style={{
            fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: 2, fontWeight: 500,
            color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.6)',
          }}>SUNX · SENSE · TUTORIAL</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === step ? 16 : 5, height: 5, borderRadius: 3,
              background: i <= step ? T_PRIMARY : (dark ? 'rgba(255,255,255,0.15)' : 'rgba(20,30,50,0.12)'),
              transition: 'all 0.35s cubic-bezier(.2,.9,.2,1)',
            }} />
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{ margin: '20px auto 0', display: 'flex', justifyContent: 'center' }}>
        {hero}
      </div>

      {/* Eyebrow + label strip */}
      <div style={{
        margin: '14px 24px 0',
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: 1.8,
        color: T_PRIMARY, fontWeight: 500,
      }}>{stepData.eyebrow}</div>

      {/* Copy */}
      <div style={{ padding: '8px 24px 0', flex: 1 }}>
        <h1 style={{
          fontFamily: 'Geist', fontWeight: 600, fontSize: 22, lineHeight: 1.18, letterSpacing: -0.6,
          color: dark ? '#fff' : '#0a1420', margin: '0 0 8px', textWrap: 'balance',
        }}>{stepData.title}</h1>
        <p style={{
          fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)',
          margin: 0, textWrap: 'pretty',
        }}>{stepData.body}</p>
      </div>

      {/* Footer CTA (only when step is passive) */}
      {showCTA && (
        <div style={{
          padding: '0 24px',
          paddingBottom: device === 'ios' ? 40 : 32,
        }}>
          <button onClick={step === 4 ? onExit : advance} style={{
            width: '100%', height: 50, border: 'none', borderRadius: 14,
            background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.58 0.16 220))',
            color: '#fff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(20,90,200,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            {stepData.cta}
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      )}
      {/* If step has internal button (perms/declaration), still leave bottom space */}
      {!showCTA && (
        <div style={{ paddingBottom: device === 'ios' ? 40 : 32 }} />
      )}
    </div>
  );
}

window.TutorialFlow = TutorialFlow;

// Data-viz heroes — aligned with SUNX Sense product (H3 hex zones, declarations, PX Carbostar telemetry, SUNX tokens, zone trust)
const HERO_W = 342;
const HERO_H = 300;

const AQI_RAMP = {
  good: 'oklch(0.72 0.14 155)',
  mod:  'oklch(0.78 0.14 95)',
  poor: 'oklch(0.72 0.16 55)',
  bad:  'oklch(0.62 0.18 25)',
};
const PRIMARY = 'oklch(0.65 0.14 230)';
const ACCENT  = 'oklch(0.72 0.14 155)';

// flat-top hex path generator — pointy hexes for H3-style map
function hexPath(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i - Math.PI / 2;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return 'M ' + pts.map(p => p.join(' ')).join(' L ') + ' Z';
}
// offset hex grid layout
function hexGrid(cols, rows, r, startX = 0, startY = 0) {
  const dx = r * Math.sqrt(3);
  const dy = r * 1.5;
  const out = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = startX + col * dx + (row % 2 ? dx / 2 : 0);
      const y = startY + row * dy;
      out.push({ x, y, row, col });
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────
// HERO 1 — Global H3 intelligence: hex world pulse
// ─────────────────────────────────────────────────────────────
function Hero1Globe({ dark }) {
  const bg    = dark ? 'oklch(0.17 0.015 225)' : 'oklch(0.98 0.008 225)';
  const hexFill = dark ? 'oklch(0.24 0.015 225)' : 'oklch(0.94 0.01 225)';
  const hexStroke = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  // sphere-like: hex cells arranged in circle, fade at edges
  const cells = hexGrid(12, 9, 17, -20, -10);
  const cx = HERO_W / 2, cy = HERO_H / 2;

  const active = [
    { i: 30, c: AQI_RAMP.good },
    { i: 41, c: AQI_RAMP.good },
    { i: 55, c: AQI_RAMP.mod },
    { i: 27, c: AQI_RAMP.poor },
    { i: 52, c: AQI_RAMP.good },
    { i: 39, c: AQI_RAMP.bad },
    { i: 63, c: AQI_RAMP.good },
    { i: 44, c: AQI_RAMP.mod },
    { i: 70, c: AQI_RAMP.good },
  ];
  const activeMap = new Map(active.map(a => [a.i, a.c]));

  return (
    <div style={{ width: HERO_W, height: HERO_H, position: 'relative',
      borderRadius: 20, overflow: 'hidden', background: bg,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>

      {/* breathing rings */}
      {[0,1,2].map(i => (
        <div key={i} style={{
          position: 'absolute', left: cx - 130, top: cy - 130,
          width: 260, height: 260, borderRadius: '50%',
          border: `1.5px solid ${PRIMARY}`, opacity: 0.15,
          animation: `breathPulse 4s ease-in-out infinite`,
          animationDelay: `${i * 1.3}s`,
        }} />
      ))}

      <svg width={HERO_W} height={HERO_H}>
        <defs>
          <radialGradient id="h1mask" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1"/>
            <stop offset="75%" stopColor="#fff" stopOpacity="1"/>
            <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
          </radialGradient>
          <mask id="h1m">
            <rect width={HERO_W} height={HERO_H} fill="url(#h1mask)"/>
          </mask>
        </defs>
        <g mask="url(#h1m)">
          {cells.map((c, i) => {
            const d = Math.hypot(c.x - cx, c.y - cy);
            if (d > 125) return null;
            const isAct = activeMap.has(i);
            return (
              <path key={i} d={hexPath(c.x, c.y, 15)}
                fill={isAct ? activeMap.get(i) : hexFill}
                stroke={hexStroke} strokeWidth="1"
                style={isAct ? {
                  animation: 'dotBreath 3s ease-in-out infinite',
                  animationDelay: `${(i * 97) % 2000}ms`,
                  transformOrigin: `${c.x}px ${c.y}px`,
                  opacity: 0.9,
                } : { opacity: 1 - (d / 150) }}
              />
            );
          })}
        </g>
      </svg>

      {/* readout chip */}
      <div style={{
        position: 'absolute', left: 16, bottom: 14,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        fontSize: 9, letterSpacing: 1.5,
        color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,50,0.45)',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 5, height: 5, background: ACCENT, borderRadius: '50%',
          animation: 'dotBreath 1.6s ease-in-out infinite' }} />
        H3 · RES 8 · GLOBAL
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO 2 — Declaration lands into a zone
// ─────────────────────────────────────────────────────────────
function Hero2Ripple({ dark }) {
  const bg = dark ? 'oklch(0.17 0.015 225)' : 'oklch(0.98 0.008 225)';
  const hexFill = dark ? 'oklch(0.24 0.015 225)' : 'oklch(0.94 0.01 225)';
  const hexStroke = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  // local hex neighborhood — user's zone center, neighbours around
  const cells = hexGrid(8, 7, 22, -5, 10);
  const cx = HERO_W / 2, cy = HERO_H / 2;
  // find nearest hex to center as "your zone"
  let nearest = 0, minD = Infinity;
  cells.forEach((c, i) => {
    const d = Math.hypot(c.x - cx, c.y - cy);
    if (d < minD) { minD = d; nearest = i; }
  });

  const neighbors = [
    { idx: nearest, c: ACCENT, isYou: true },
    { idx: nearest - 8, c: AQI_RAMP.good, isYou: false },
    { idx: nearest + 8, c: AQI_RAMP.mod, isYou: false },
    { idx: nearest - 1, c: AQI_RAMP.good, isYou: false },
    { idx: nearest + 1, c: AQI_RAMP.good, isYou: false },
    { idx: nearest - 9, c: AQI_RAMP.poor, isYou: false },
    { idx: nearest + 7, c: AQI_RAMP.good, isYou: false },
  ];
  const nMap = new Map(neighbors.map(n => [n.idx, n]));

  return (
    <div style={{ width: HERO_W, height: HERO_H, position: 'relative',
      borderRadius: 20, overflow: 'hidden', background: bg,
      border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>

      <svg width={HERO_W} height={HERO_H}>
        {/* all cells */}
        {cells.map((c, i) => {
          const hit = nMap.get(i);
          if (hit) {
            return (
              <g key={i}>
                <path d={hexPath(c.x, c.y, 20)}
                  fill={hit.c} opacity={hit.isYou ? 0.9 : 0.5}
                  stroke={hit.isYou ? ACCENT : hexStroke} strokeWidth={hit.isYou ? 2 : 1}
                  style={hit.isYou ? {} : {
                    animation: 'dotBreath 3.2s ease-in-out infinite',
                    animationDelay: `${i * 180}ms`,
                    transformOrigin: `${c.x}px ${c.y}px`,
                  }}
                />
              </g>
            );
          }
          return <path key={i} d={hexPath(c.x, c.y, 20)}
            fill={hexFill} stroke={hexStroke} strokeWidth="1" />;
        })}

        {/* user's hex ripple */}
        {[0, 1, 2].map(i => {
          const c = cells[nearest];
          return (
            <path key={`r${i}`} d={hexPath(c.x, c.y, 20)}
              fill="none" stroke={ACCENT} strokeWidth="2"
              style={{
                animation: 'ripExpand 2.4s ease-out infinite',
                animationDelay: `${i * 0.8}s`,
                transformOrigin: `${c.x}px ${c.y}px`,
                transformBox: 'fill-box',
              }} />
          );
        })}
      </svg>

      {/* Declaration chip */}
      <div style={{
        position: 'absolute', left: cx + 40, top: cy - 70,
        padding: '8px 10px', borderRadius: 10,
        background: dark ? 'rgba(15,25,35,0.92)' : 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        fontSize: 10, letterSpacing: 0.2,
        color: dark ? '#e8f0fa' : '#0a1420',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        whiteSpace: 'nowrap',
        animation: 'chipFloat 2.4s ease-in-out infinite',
      }}>
        <div style={{ color: ACCENT, fontSize: 8, letterSpacing: 1 }}>DECLARATION · +1</div>
        <div style={{ marginTop: 2, fontSize: 11 }}>CLEAN AIR · 0.87</div>
      </div>

      {/* hex id */}
      <div style={{
        position: 'absolute', left: 16, bottom: 14,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        fontSize: 9, letterSpacing: 1.5,
        color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,50,0.45)',
      }}>8828308281fffff · YOUR ZONE</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO 3 — PX Carbostar telemetry stream
// ─────────────────────────────────────────────────────────────
function Hero3Network({ dark }) {
  const bg = dark ? 'oklch(0.17 0.015 225)' : 'oklch(0.98 0.008 225)';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textMute = dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)';
  const textMain = dark ? '#fff' : '#0a1420';

  // Telemetry sparkline (CO₂ ppm over time)
  const N = 32;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const x = (i / (N-1)) * (HERO_W - 40) + 20;
    const t = i / (N-1);
    const base = 410 + Math.sin(t * 5) * 8 + Math.sin(t * 13) * 4 + t * 6;
    const y = 240 - (base - 400) * 4;
    pts.push([x, y, base]);
  }
  const sparkD = pts.reduce((a, [x,y], i) => a + (i===0?`M ${x} ${y}`:` L ${x} ${y}`), '');
  const sparkArea = sparkD + ` L ${pts[N-1][0]} 270 L ${pts[0][0]} 270 Z`;

  return (
    <div style={{ width: HERO_W, height: HERO_H, position: 'relative',
      borderRadius: 20, overflow: 'hidden', background: bg, border: `1px solid ${border}`,
      padding: 18, boxSizing: 'border-box' }}>

      {/* device pill */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {/* device icon */}
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, oklch(0.35 0.03 240), oklch(0.22 0.02 240))',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: ACCENT, boxShadow: `0 0 10px ${ACCENT}`,
              animation: 'dotBreath 1.3s ease-in-out infinite',
            }} />
            {/* grille */}
            <div style={{
              position: 'absolute', right: 5, top: 6, width: 6, height: 22,
              background: `repeating-linear-gradient(to bottom, transparent 0 2px, rgba(255,255,255,0.15) 2px 3px)`,
              borderRadius: 2,
            }} />
          </div>
          <div>
            <div style={{
              fontFamily: 'Geist, Inter, system-ui', fontSize: 13, fontWeight: 500,
              color: textMain,
            }}>PX Carbostar</div>
            <div style={{
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
              color: textMute,
            }}>PAIRED · BLE 5.0</div>
          </div>
        </div>
        <div style={{
          padding: '4px 8px', borderRadius: 100,
          background: dark ? 'rgba(180,220,160,0.12)' : 'rgba(50,150,80,0.08)',
          color: ACCENT,
          fontFamily: 'Geist Mono, ui-monospace, monospace',
          fontSize: 8, letterSpacing: 1,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: ACCENT,
            animation: 'dotBreath 1.5s ease-in-out infinite' }} />
          LIVE
        </div>
      </div>

      {/* big readout */}
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div style={{
          fontFamily: 'Geist, Inter, system-ui', fontWeight: 600,
          fontSize: 52, letterSpacing: -1.8, lineHeight: 1,
          color: textMain, fontVariantNumeric: 'tabular-nums',
        }}>412</div>
        <div style={{
          fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 13,
          color: textMute,
        }}>ppm CO₂</div>
      </div>
      <div style={{
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9,
        color: ACCENT, marginTop: 2, letterSpacing: 0.5,
      }}>▲ STREAMING TO SUNX EARTH</div>

      {/* telemetry sparkline */}
      <svg width={HERO_W - 36} height={90} style={{ position: 'absolute', left: 0, bottom: 14 }}
        viewBox={`0 150 ${HERO_W} 130`}>
        <defs>
          <linearGradient id="h3sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={sparkArea} fill="url(#h3sparkFill)"/>
        <path d={sparkD} stroke={PRIMARY} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={pts[N-1][0]} cy={pts[N-1][1]} r="4" fill={PRIMARY}/>
        <circle cx={pts[N-1][0]} cy={pts[N-1][1]} r="8" fill={PRIMARY} opacity="0.3"
          style={{ animation: 'dotBreath 1.6s ease-in-out infinite',
            transformOrigin: `${pts[N-1][0]}px ${pts[N-1][1]}px` }}/>

        {/* traveling telemetry packets */}
        {[0,1,2].map(i => (
          <circle key={i} r="2" fill={ACCENT}>
            <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${i * 0.8}s`} path={sparkD}/>
          </circle>
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO 4 — SUNX tokens (on Earth platform)
// ─────────────────────────────────────────────────────────────
function Hero4Tokens({ dark }) {
  const gold = 'oklch(0.78 0.14 75)';
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let i = 0, steps = 80, target = 864;
    const t = setInterval(() => {
      i++;
      const p = i / steps, eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (i >= steps) clearInterval(t);
    }, 30);
    return () => clearInterval(t);
  }, []);

  const spark = [];
  const N = 24;
  for (let i = 0; i < N; i++) {
    const x = (i / (N-1)) * (HERO_W - 48) + 24;
    const base = i / (N-1);
    const noise = Math.sin(i * 0.8) * 0.08 + Math.sin(i * 1.7) * 0.05;
    const y = 220 - (base * 90 + noise * 40);
    spark.push([x, y]);
  }
  const sparkD = spark.reduce((a, [x,y], i) => a + (i===0?`M ${x} ${y}`:` L ${x} ${y}`), '');
  const sparkArea = sparkD + ` L ${spark[N-1][0]} 240 L ${spark[0][0]} 240 Z`;

  return (
    <div style={{ width: HERO_W, height: HERO_H, position: 'relative', borderRadius: 20, overflow: 'hidden',
      background: dark
        ? 'linear-gradient(160deg, oklch(0.22 0.03 250), oklch(0.17 0.015 230))'
        : 'linear-gradient(160deg, oklch(0.98 0.01 230), oklch(0.94 0.02 220))',
      border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
      padding: 20, boxSizing: 'border-box' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          fontFamily: 'Geist Mono, ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.5,
          color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)',
        }}>SUNX · EARTH WALLET</div>
        <div style={{
          padding: '4px 8px', borderRadius: 100,
          background: dark ? 'rgba(180,220,160,0.15)' : 'rgba(50,150,80,0.1)',
          color: ACCENT,
          fontFamily: 'Geist Mono, ui-monospace, monospace',
          fontSize: 9, letterSpacing: 0.5,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT,
            animation: 'dotBreath 1.5s ease-in-out infinite' }} />
          SETTLING
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <div style={{
          fontFamily: 'Geist, Inter, system-ui', fontWeight: 600,
          fontSize: 56, letterSpacing: -2, lineHeight: 1,
          color: dark ? '#fff' : '#0a1420',
          fontVariantNumeric: 'tabular-nums',
        }}>{count.toLocaleString()}</div>
        <div style={{
          fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 14, color: gold,
        }}>SUNX</div>
      </div>
      <div style={{
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10, color: ACCENT, marginTop: 2,
      }}>+86.4 this week · 14 declarations verified</div>

      <svg width={HERO_W - 40} height={130} style={{ position: 'absolute', left: 0, bottom: 20 }}
        viewBox={`0 110 ${HERO_W} 140`}>
        <defs>
          <linearGradient id="h4sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={PRIMARY} stopOpacity="0.35"/>
            <stop offset="100%" stopColor={PRIMARY} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <path d={sparkArea} fill="url(#h4sparkFill)"/>
        <path d={sparkD} stroke={PRIMARY} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={spark[N-1][0]} cy={spark[N-1][1]} r="5" fill={PRIMARY}/>
        <circle cx={spark[N-1][0]} cy={spark[N-1][1]} r="9" fill={PRIMARY} opacity="0.3"
          style={{ animation: 'dotBreath 1.6s ease-in-out infinite',
            transformOrigin: `${spark[N-1][0]}px ${spark[N-1][1]}px` }} />
        {[0,1,2,3,4].map(i => (
          <circle key={i} cx={40 + i*60} cy={200} r="2" fill={gold}
            style={{ animation: `particleRise 3s ease-out infinite`, animationDelay: `${i*0.6}s` }} />
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO 5 — Zone trust dial (H3 cell ready to declare)
// ─────────────────────────────────────────────────────────────
function Hero5Dial({ dark }) {
  const good = ACCENT;
  const track = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const textMute = dark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.45)';

  const cx = HERO_W / 2, cy = 160, r = 100;
  const startA = 135, sweepA = 270;
  const trustScore = 0.87; // fraction
  const endA = startA + sweepA * trustScore;

  const polar = (deg, rad) => [cx + Math.cos(deg * Math.PI/180) * rad, cy + Math.sin(deg * Math.PI/180) * rad];
  const arcPath = (from, to, rad) => {
    const [x1,y1] = polar(from, rad), [x2,y2] = polar(to, rad);
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${rad} ${rad} 0 ${large} 1 ${x2} ${y2}`;
  };

  return (
    <div style={{ width: HERO_W, height: HERO_H, position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <div style={{
        position: 'absolute', width: 260, height: 260, borderRadius: '50%',
        background: `radial-gradient(circle, ${good} 0%, transparent 70%)`,
        opacity: 0.15, animation: 'haloBreath 4s ease-in-out infinite',
      }} />

      <svg width={HERO_W} height={HERO_H}>
        {/* hexagonal frame behind dial */}
        <path d={hexPath(cx, cy, 110)} fill="none"
          stroke={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
          strokeWidth="1" strokeDasharray="2 4" />

        <path d={arcPath(startA, startA + sweepA, r)} fill="none" stroke={track} strokeWidth="14" strokeLinecap="round"/>
        <path d={arcPath(startA, endA, r)} fill="none" stroke={good} strokeWidth="14" strokeLinecap="round"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: 'dialDraw 2s ease-out forwards' }}/>

        {Array.from({ length: 14 }).map((_, i) => {
          const a = startA + (sweepA / 13) * i;
          const [x1,y1] = polar(a, r-22), [x2,y2] = polar(a, r-14);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} strokeWidth="1.5"/>;
        })}

        <text x={cx} y={cy - 4} textAnchor="middle"
          style={{ fontFamily: 'Geist, Inter, system-ui', fontWeight: 600, fontSize: 56, letterSpacing: -1.8,
            fill: dark ? '#fff' : '#0a1420' }}>0.87</text>
        <text x={cx} y={cy + 26} textAnchor="middle"
          style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: 2, fill: good }}>
          TRUST · READY</text>
        <text x={cx} y={cy + 48} textAnchor="middle"
          style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.2, fill: textMute }}>
          H3 · 8828308281fffff</text>
      </svg>

      <div style={{ position: 'absolute', left: 20, bottom: 20,
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
        color: textMute }}>0.00</div>
      <div style={{ position: 'absolute', right: 20, bottom: 20,
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
        color: textMute }}>1.00</div>
    </div>
  );
}

window.Heroes = [Hero1Globe, Hero2Ripple, Hero3Network, Hero4Tokens, Hero5Dial];

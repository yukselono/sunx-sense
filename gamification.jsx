// Gamification screens — same format as onboarding/tutorial
// 8 screens: Streak, Rank progression, Regional leaderboard, Place explorer,
// Badges, Referral, Trust score, Citizen Scientist identity

const G_PRIMARY = 'oklch(0.65 0.14 230)';
const G_ACCENT  = 'oklch(0.72 0.14 155)';
const G_AMBER   = 'oklch(0.78 0.14 75)';
const G_RED     = 'oklch(0.62 0.18 25)';
const G_VIOLET  = 'oklch(0.62 0.18 295)';

function gHex(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 3 * i - Math.PI / 2;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return 'M ' + pts.map(p => p.join(' ')).join(' L ') + ' Z';
}

const GAMIF_COPY = {
  en: {
    screens: [
      { id: 'streak',     eyebrow: '01 · STREAK',         title: 'Don\u2019t break the streak.',          body: '14 consecutive days of declarations. One more keeps your weekly bonus alive.', cta: 'Declare today' },
      { id: 'rank',       eyebrow: '02 · RANK',           title: 'You\u2019re an Urban Analyst.',          body: 'Climb the ladder of citizen scientists. 1,240 XP to Air Guardian.',           cta: 'View milestones' },
      { id: 'leaderboard',eyebrow: '03 · LEADERBOARD',    title: 'You\u2019re #4 in \u00c7ankaya this week.', body: 'Regional rankings reset every Monday. Three more verified declarations to climb.', cta: 'See full board' },
      { id: 'places',     eyebrow: '04 · PLACE EXPLORER', title: 'Map the city\u2019s air, place by place.',body: 'Cafes, offices, transit, parks. 18 of 60 indoor categories explored.',          cta: 'Find a new place' },
      { id: 'badges',     eyebrow: '05 · BADGES',         title: 'Four new badges this month.',           body: 'Rush Hour Survivor unlocked. Three more in progress.',                          cta: 'See all badges' },
      { id: 'referral',   eyebrow: '06 · REFER',          title: 'Bring a friend. Grow the map.',         body: 'Each referral plants a verified zone and unlocks an exclusive co-op badge.',     cta: 'Share invite link' },
      { id: 'trust',      eyebrow: '07 · TRUST',          title: 'Your trust score is 0.92.',             body: 'Built from consistency, data quality, location diversity and tenure.',          cta: 'How it\u2019s calculated' },
      { id: 'identity',   eyebrow: '08 · IDENTITY',       title: 'You are a Citizen Scientist.',          body: 'Your data feeds research, cities and your neighbours. This is real environmental work.', cta: 'Open my profile' },
    ],
    rankNames: ['Fresh Beginner','Air Scout','CO\u2082 Explorer','Urban Analyst','Air Guardian','Atmosphere Master'],
    badges: [
      { name: 'Rush Hour Survivor', sub: '7am declarations \u00d7 10', state: 'unlocked', color: G_AMBER },
      { name: 'Clean Air Hunter',   sub: '< 500 ppm \u00d7 25',         state: 'unlocked', color: G_ACCENT },
      { name: 'Night Explorer',     sub: 'After 22:00 \u00d7 15',       state: 'unlocked', color: G_VIOLET },
      { name: 'First 100',          sub: '100 measurements',          state: 'unlocked', color: G_PRIMARY },
      { name: 'Cross-City',         sub: '5 districts',                state: 'progress', color: 'oklch(0.62 0.16 200)', pct: 0.6 },
      { name: 'Atmosphere Master',  sub: 'Reach Lv 50',                state: 'locked',   color: G_RED },
    ],
    leaders: [
      { name: 'Elif K.',     decl: 312, you: false },
      { name: 'Mehmet T.',   decl: 287, you: false },
      { name: 'Aysu D.',     decl: 261, you: false },
      { name: 'You',         decl: 248, you: true },
      { name: 'Berk \u00d6.',decl: 230, you: false },
      { name: 'Su S\u00fc.', decl: 219, you: false },
    ],
    placeCats: [
      { name: 'Cafes',     count: 6, total: 12, color: G_ACCENT },
      { name: 'Offices',   count: 4, total: 10, color: G_PRIMARY },
      { name: 'Transit',   count: 3, total: 8,  color: G_AMBER },
      { name: 'Parks',     count: 2, total: 6,  color: G_VIOLET },
      { name: 'Markets',   count: 2, total: 8,  color: 'oklch(0.62 0.16 200)' },
      { name: 'Gyms',      count: 1, total: 6,  color: G_RED },
    ],
    trustFactors: [
      { name: 'Consistency',     value: 0.95 },
      { name: 'Data quality',    value: 0.91 },
      { name: 'Location variety',value: 0.88 },
      { name: 'Tenure',          value: 0.94 },
    ],
    streakLabels: ['M','T','W','T','F','S','S'],
    today: 'TODAY',
    bonus: 'WEEKLY BONUS ACTIVE',
    next: 'NEXT',
    rank: 'RANK',
    youAre: 'YOU',
    invited: 'INVITED',
    verified: 'VERIFIED',
    trustOf: 'OF 1.00',
    citizen: 'CITIZEN SCIENTIST · ID 04217',
  },
  tr: {
    screens: [
      { id: 'streak',     eyebrow: '01 · SER\u0130',         title: 'Seriyi bozma.',                          body: '14 g\u00fcnd\u00fcr aral\u0131ks\u0131z deklarasyon. Bir tane daha haftal\u0131k bonusunu canl\u0131 tutar.', cta: 'Bug\u00fcn deklare et' },
      { id: 'rank',       eyebrow: '02 · R\u00dcTBE',         title: 'Bir Urban Analyst\u2019s\u0131n.',       body: 'Yurtta\u015f bilim insanlar\u0131 merdiveninde t\u0131rman. Air Guardian\u2019a 1.240 XP kald\u0131.',         cta: 'Kilometre ta\u015flar\u0131' },
      { id: 'leaderboard',eyebrow: '03 · L\u0130DERL\u0130K',title: '\u00c7ankaya\u2019da bu hafta 4. s\u0131radas\u0131n.', body: 'B\u00f6lgesel s\u0131ralama her Pazartesi s\u0131f\u0131rlan\u0131r. \u00dc\u00e7 do\u011frulanm\u0131\u015f deklarasyon t\u0131rmanmana yeter.', cta: 'T\u00fcm tabloyu g\u00f6r' },
      { id: 'places',     eyebrow: '04 · MEK\u00c2N KA\u015e\u0130F\u0130', title: '\u015eehrin havas\u0131, mek\u00e2n mek\u00e2n.', body: 'Kafeler, ofisler, ula\u015f\u0131m, parklar. 60 i\u00e7 mek\u00e2n kategorisinden 18\u2019i ke\u015ffedildi.', cta: 'Yeni bir mek\u00e2n bul' },
      { id: 'badges',     eyebrow: '05 · ROZETLER',           title: 'Bu ay d\u00f6rt yeni rozet.',              body: 'Rush Hour Survivor a\u00e7\u0131ld\u0131. \u00dc\u00e7\u00fc daha s\u00fcr\u00fcyor.',                                            cta: 'T\u00fcm rozetler' },
      { id: 'referral',   eyebrow: '06 · DAVET',             title: 'Bir arkada\u015f getir. Haritay\u0131 b\u00fcy\u00fct.', body: 'Her davet do\u011frulanm\u0131\u015f bir b\u00f6lge ekler ve \u00f6zel bir co-op rozeti a\u00e7ar.',  cta: 'Davet ba\u011flant\u0131s\u0131n\u0131 payla\u015f' },
      { id: 'trust',      eyebrow: '07 · G\u00dcVEN',         title: 'G\u00fcven skorun 0,92.',                 body: 'Tutarl\u0131l\u0131k, veri kalitesi, lokasyon \u00e7e\u015fitlili\u011fi ve k\u0131demden olu\u015fur.', cta: 'Nas\u0131l hesaplan\u0131yor' },
      { id: 'identity',   eyebrow: '08 · K\u0130ML\u0130K',   title: 'Sen bir Yurtta\u015f Bilim \u0130nsan\u0131s\u0131n.', body: 'Verin; ara\u015ft\u0131rmac\u0131lara, \u015fehirlere ve kom\u015fular\u0131na akar. Bu ger\u00e7ek bir \u00e7evre i\u015fi.', cta: 'Profilimi a\u00e7' },
    ],
    rankNames: ['Fresh Beginner','Air Scout','CO\u2082 Explorer','Urban Analyst','Air Guardian','Atmosphere Master'],
    badges: [
      { name: 'Rush Hour Survivor', sub: 'Sabah 7\u201109 \u00d7 10',  state: 'unlocked', color: G_AMBER },
      { name: 'Clean Air Hunter',   sub: '< 500 ppm \u00d7 25',        state: 'unlocked', color: G_ACCENT },
      { name: 'Night Explorer',     sub: '22:00 sonras\u0131 \u00d7 15',state: 'unlocked', color: G_VIOLET },
      { name: 'First 100',          sub: '\u0130lk 100 \u00f6l\u00e7\u00fcm', state: 'unlocked', color: G_PRIMARY },
      { name: 'Cross-City',         sub: '5 il\u00e7e',                state: 'progress', color: 'oklch(0.62 0.16 200)', pct: 0.6 },
      { name: 'Atmosphere Master',  sub: 'Sv 50\u2019ye ula\u015f',     state: 'locked',   color: G_RED },
    ],
    leaders: [
      { name: 'Elif K.',     decl: 312, you: false },
      { name: 'Mehmet T.',   decl: 287, you: false },
      { name: 'Aysu D.',     decl: 261, you: false },
      { name: 'Sen',         decl: 248, you: true },
      { name: 'Berk \u00d6.',decl: 230, you: false },
      { name: 'Su S\u00fc.', decl: 219, you: false },
    ],
    placeCats: [
      { name: 'Kafeler',  count: 6, total: 12, color: G_ACCENT },
      { name: 'Ofisler',  count: 4, total: 10, color: G_PRIMARY },
      { name: 'Ula\u015f\u0131m', count: 3, total: 8,  color: G_AMBER },
      { name: 'Parklar',  count: 2, total: 6,  color: G_VIOLET },
      { name: 'Pazarlar', count: 2, total: 8,  color: 'oklch(0.62 0.16 200)' },
      { name: 'Spor',     count: 1, total: 6,  color: G_RED },
    ],
    trustFactors: [
      { name: 'Tutarl\u0131l\u0131k',  value: 0.95 },
      { name: 'Veri kalitesi',        value: 0.91 },
      { name: 'Lokasyon',             value: 0.88 },
      { name: 'K\u0131dem',           value: 0.94 },
    ],
    streakLabels: ['P','S','\u00c7','P','C','C','P'],
    today: 'BUG\u00dcN',
    bonus: 'HAFTALIK BONUS AKT\u0130F',
    next: 'SONRAK\u0130',
    rank: 'R\u00dcTBE',
    youAre: 'SEN',
    invited: 'DAVETL\u0130',
    verified: 'DO\u011eRULANDI',
    trustOf: '/ 1,00',
    citizen: 'YURTTA\u015e B\u0130L\u0130M \u0130NSANI · ID 04217',
  },
};

// ─────────────────────────────────────────────────────────────
// 1. STREAK
// ─────────────────────────────────────────────────────────────
function GamStreak({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  const days = [1,1,1,1,1,1,1, 1,1,1,1,1,1,1, 0,0,0,0,0,0,0]; // 14 done
  const todayIdx = 13;

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Big number */}
      <div style={{ padding: '18px 20px', borderRadius: 18,
        background: dark ? 'oklch(0.20 0.02 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>STREAK · DAYS</div>
          <div style={{ fontFamily: 'Geist', fontSize: 56, fontWeight: 600, lineHeight: 1, letterSpacing: -2,
            fontVariantNumeric: 'tabular-nums', color: dark ? '#fff' : '#0a1420' }}>14</div>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.2,
            color: G_ACCENT, marginTop: 2 }}>▲ {c.bonus}</div>
        </div>
        {/* flame */}
        <div style={{ position: 'relative', width: 68, height: 84 }}>
          <div style={{ position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 50% 70%, ${G_AMBER} 0%, ${G_RED} 55%, transparent 75%)`,
            filter: 'blur(2px)', animation: 'haloBreath 1.6s ease-in-out infinite' }} />
          <svg viewBox="0 0 60 80" width="68" height="84" style={{ position: 'relative' }}>
            <path d="M30 76 C 8 70, 6 50, 18 36 C 22 44, 26 38, 24 30 C 32 32, 44 44, 44 56 C 44 68, 38 76, 30 76 Z"
              fill={G_AMBER} />
            <path d="M30 70 C 18 66, 18 54, 26 46 C 26 52, 30 50, 30 44 C 36 48, 38 56, 36 62 C 34 68, 32 70, 30 70 Z"
              fill="oklch(0.92 0.14 75)" />
          </svg>
        </div>
      </div>

      {/* 21-day grid */}
      <div style={{ padding: '14px 16px', borderRadius: 16,
        background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
          color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)', marginBottom: 8 }}>
          {c.streakLabels.map((d,i) => <span key={i} style={{ width: 36, textAlign: 'center' }}>{d}</span>)}
        </div>
        {[0,1,2].map(row => (
          <div key={row} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
            {Array.from({length:7}).map((_,col) => {
              const i = row*7 + col;
              const done = days[i] === 1;
              const isToday = i === todayIdx;
              return (
                <div key={col} style={{ flex: 1, height: 36, borderRadius: 8,
                  background: done ? G_ACCENT : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                  border: isToday ? `2px solid ${G_AMBER}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  boxShadow: done ? `inset 0 0 0 1px rgba(255,255,255,0.15)` : 'none',
                }}>
                  {done && <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  {isToday && !done && <div style={{ width: 6, height: 6, borderRadius: '50%', background: G_AMBER,
                    animation: 'dotBreath 1.2s ease-in-out infinite' }} />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 2. RANK PROGRESSION
// ─────────────────────────────────────────────────────────────
function GamRank({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  const youLv = 3; // Urban Analyst
  const xp = 8760, nextXp = 10000;
  const pct = xp / nextXp;

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Current rank */}
      <div style={{ padding: '18px', borderRadius: 18,
        background: `linear-gradient(135deg, oklch(0.22 0.04 250), oklch(0.18 0.02 225))`,
        border: `1px solid rgba(255,255,255,0.06)`,
        position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -10, opacity: 0.18 }}>
          <svg width="160" height="160" viewBox="-80 -80 160 160">
            <path d={gHex(0,0,70)} fill="none" stroke={G_PRIMARY} strokeWidth="1.5" />
            <path d={gHex(0,0,55)} fill="none" stroke={G_PRIMARY} strokeWidth="1" strokeDasharray="2 4" />
            <path d={gHex(0,0,40)} fill="none" stroke={G_PRIMARY} strokeWidth="1" />
          </svg>
        </div>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
          color: 'rgba(255,255,255,0.5)' }}>{c.rank} · LV {youLv*5+5}</div>
        <div style={{ fontFamily: 'Geist', fontSize: 24, fontWeight: 600, color: '#fff', marginTop: 4, letterSpacing: -0.6 }}>
          {c.rankNames[youLv]}
        </div>
        <div style={{ marginTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
            color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
            <span>{xp.toLocaleString()} XP</span>
            <span>{nextXp.toLocaleString()} XP</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct*100}%`,
              background: `linear-gradient(90deg, ${G_PRIMARY}, ${G_ACCENT})`,
              borderRadius: 4, boxShadow: `0 0 12px ${G_PRIMARY}` }} />
          </div>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
            color: G_ACCENT, marginTop: 6 }}>1.240 XP → {c.rankNames[youLv+1].toUpperCase()}</div>
        </div>
      </div>

      {/* Ladder */}
      <div style={{ padding: '12px 14px', borderRadius: 16,
        background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
        display: 'flex', flexDirection: 'column', gap: 4 }}>
        {c.rankNames.map((n,i) => {
          const isYou = i === youLv;
          const isPast = i < youLv;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
              padding: '6px 8px', borderRadius: 8,
              background: isYou ? (dark ? 'rgba(120,180,255,0.08)' : 'rgba(20,90,200,0.06)') : 'transparent',
              opacity: i > youLv ? 0.45 : 1,
            }}>
              <div style={{ width: 24, height: 24, position: 'relative' }}>
                <svg width="24" height="24" viewBox="-12 -12 24 24">
                  <path d={gHex(0,0,10)} fill={isPast || isYou ? G_PRIMARY : 'transparent'}
                    stroke={isPast || isYou ? G_PRIMARY : (dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)')} strokeWidth="1.5" />
                </svg>
              </div>
              <span style={{ flex: 1, fontFamily: 'Geist', fontSize: 12, fontWeight: isYou ? 600 : 400,
                color: dark ? '#fff' : '#0a1420' }}>{n}</span>
              <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
                color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)' }}>LV {i*7+1}</span>
              {isYou && <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
                color: G_ACCENT, fontWeight: 600 }}>← {c.youAre}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. LEADERBOARD
// ─────────────────────────────────────────────────────────────
function GamLeaderboard({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  const max = c.leaders[0].decl;

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ padding: '14px 16px', borderRadius: 16,
        background: dark ? 'oklch(0.20 0.02 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>ÇANKAYA · WEEK 19</div>
          <div style={{ fontFamily: 'Geist', fontSize: 18, fontWeight: 600, marginTop: 2,
            color: dark ? '#fff' : '#0a1420' }}>Regional leaderboard</div>
        </div>
        <div style={{
          padding: '6px 10px', borderRadius: 100, background: G_PRIMARY,
          color: '#fff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
        }}>#4</div>
      </div>

      <div style={{ padding: '10px 12px', borderRadius: 16,
        background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
        display: 'flex', flexDirection: 'column', gap: 6 }}>
        {c.leaders.map((p,i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: 10,
            background: p.you ? (dark ? 'rgba(120,180,255,0.10)' : 'rgba(20,90,200,0.08)') : 'transparent',
            border: p.you ? `1px solid ${G_PRIMARY}55` : '1px solid transparent',
          }}>
            <div style={{ width: 22, fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11,
              fontWeight: 600, color: i < 3 ? G_AMBER : (dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)') }}>
              {String(i+1).padStart(2,'0')}
            </div>
            <div style={{ width: 26, height: 26, borderRadius: '50%',
              background: `linear-gradient(135deg, oklch(0.7 0.1 ${(i*47)%360}), oklch(0.55 0.12 ${(i*47+60)%360}))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontFamily: 'Geist', fontSize: 11, fontWeight: 600,
            }}>{p.name[0]}</div>
            <div style={{ flex: 1, fontFamily: 'Geist', fontSize: 12, fontWeight: p.you ? 600 : 500,
              color: dark ? '#fff' : '#0a1420' }}>{p.name}</div>
            <div style={{ width: 70, height: 6, borderRadius: 3,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(p.decl/max)*100}%`,
                background: p.you ? G_PRIMARY : G_ACCENT,
                borderRadius: 3 }} />
            </div>
            <div style={{ width: 32, textAlign: 'right',
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10,
              fontVariantNumeric: 'tabular-nums', fontWeight: 600,
              color: dark ? '#fff' : '#0a1420' }}>{p.decl}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. PLACE EXPLORER
// ─────────────────────────────────────────────────────────────
function GamPlaces({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  const total = c.placeCats.reduce((a,p) => a + p.total, 0);
  const done = c.placeCats.reduce((a,p) => a + p.count, 0);

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ padding: '16px 18px', borderRadius: 18,
        background: dark ? 'oklch(0.20 0.02 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <div style={{ fontFamily: 'Geist', fontSize: 44, fontWeight: 600, lineHeight: 1, letterSpacing: -1.5,
          fontVariantNumeric: 'tabular-nums', color: dark ? '#fff' : '#0a1420' }}>{done}</div>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 14,
          color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>/ {total} places</div>
        <div style={{ marginLeft: 'auto', fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1,
          color: G_ACCENT }}>+3 THIS WEEK</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {c.placeCats.map((p,i) => {
          const pct = p.count / p.total;
          return (
            <div key={i} style={{ padding: 12, borderRadius: 12,
              background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.6)',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color }} />
                <span style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600,
                  color: dark ? '#fff' : '#0a1420' }}>{p.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <span style={{ fontFamily: 'Geist', fontSize: 18, fontWeight: 600, lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums', color: dark ? '#fff' : '#0a1420' }}>{p.count}</span>
                <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9,
                  color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)' }}>/ {p.total}</span>
              </div>
              <div style={{ height: 4, borderRadius: 2,
                background: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct*100}%`, background: p.color, borderRadius: 2 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. BADGES
// ─────────────────────────────────────────────────────────────
function GamBadges({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  return (
    <div style={{ width: 342, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {c.badges.map((b,i) => {
        const locked = b.state === 'locked';
        const progress = b.state === 'progress';
        return (
          <div key={i} style={{ padding: 14, borderRadius: 14,
            background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.7)',
            border: `1px solid ${locked ? (dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)') : b.color + '55'}`,
            opacity: locked ? 0.4 : 1, position: 'relative', overflow: 'hidden' }}>
            <svg width="56" height="56" viewBox="-32 -32 64 64" style={{ display: 'block', marginBottom: 8 }}>
              <path d={gHex(0,0,28)} fill={locked ? 'transparent' : b.color}
                stroke={b.color} strokeWidth="2"
                opacity={locked ? 0.3 : 0.95} />
              <path d={gHex(0,0,18)} fill="none" stroke="#fff" strokeWidth="1.2" strokeDasharray={progress ? '2 3' : '0'}
                opacity={locked ? 0.3 : 0.7} />
              {/* glyph */}
              {b.name.startsWith('Rush') && <text x="0" y="4" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fontWeight="700" fill="#fff">7AM</text>}
              {b.name.startsWith('Clean') && <text x="0" y="5" textAnchor="middle" fontFamily="Geist Mono" fontSize="13" fill="#fff">✓</text>}
              {b.name.startsWith('Night') && <text x="0" y="4" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="700" fill="#fff">22+</text>}
              {b.name.startsWith('First') && <text x="0" y="4" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fontWeight="700" fill="#fff">100</text>}
              {b.name.startsWith('Cross') && <text x="0" y="4" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fontWeight="700" fill="#fff">×5</text>}
              {b.name.startsWith('Atmosphere') && <text x="0" y="5" textAnchor="middle" fontFamily="Geist Mono" fontSize="13" fill="#fff">★</text>}
            </svg>
            <div style={{ fontFamily: 'Geist', fontSize: 12, fontWeight: 600, lineHeight: 1.2,
              color: dark ? '#fff' : '#0a1420' }}>{b.name}</div>
            <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 0.8,
              color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,50,0.45)', marginTop: 2 }}>{b.sub}</div>
            {progress && (
              <div style={{ marginTop: 8, height: 3, borderRadius: 2,
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.pct*100}%`, background: b.color, borderRadius: 2 }} />
              </div>
            )}
            {locked && <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>🔒</div>}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. REFERRAL
// ─────────────────────────────────────────────────────────────
function GamReferral({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Hex network */}
      <div style={{ position: 'relative', height: 180,
        borderRadius: 18, overflow: 'hidden',
        background: dark ? 'oklch(0.18 0.012 225)' : 'oklch(0.98 0.008 225)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}` }}>
        <svg viewBox="0 0 342 180" width="342" height="180">
          {/* connecting lines */}
          {[
            [171,90, 100,50], [171,90, 240,50], [171,90, 90,140],
            [171,90, 250,140], [100,50, 60,30], [240,50, 290,30],
            [250,140, 300,160],
          ].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={G_PRIMARY} strokeWidth="1.5" strokeDasharray="3 3"
              opacity="0.5">
              <animate attributeName="stroke-dashoffset" from="0" to="-12" dur="1.5s" repeatCount="indefinite"/>
            </line>
          ))}
          {/* you in center */}
          <path d={gHex(171,90,26)} fill={G_PRIMARY} />
          <text x="171" y="95" textAnchor="middle" fontFamily="Geist" fontSize="10" fontWeight="700" fill="#fff">YOU</text>
          {/* friends */}
          {[
            {x:100,y:50,c:G_ACCENT,inv:1},
            {x:240,y:50,c:G_ACCENT,inv:1},
            {x:90,y:140,c:G_ACCENT,inv:1},
            {x:250,y:140,c:G_AMBER,inv:0},
            {x:60,y:30,c:G_ACCENT,inv:1},
            {x:290,y:30,c:G_AMBER,inv:0},
            {x:300,y:160,c:G_AMBER,inv:0},
          ].map((p,i) => (
            <g key={i}>
              <path d={gHex(p.x,p.y,p.inv?16:13)} fill={p.inv ? p.c : 'none'}
                stroke={p.c} strokeWidth={p.inv?0:1.5} strokeDasharray={p.inv?'0':'2 2'} />
              {p.inv === 1 && <text x={p.x} y={p.y+3} textAnchor="middle" fontFamily="Geist Mono" fontSize="8" fill="#fff">✓</text>}
            </g>
          ))}
        </svg>
      </div>

      {/* counter */}
      <div style={{ padding: '14px 16px', borderRadius: 16,
        background: dark ? 'oklch(0.20 0.02 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
            color: dark ? 'rgba(255,255,255,0.5)' : 'rgba(20,30,50,0.5)' }}>{c.invited} · {c.verified}</div>
          <div style={{ fontFamily: 'Geist', fontSize: 28, fontWeight: 600, marginTop: 2, letterSpacing: -1,
            color: dark ? '#fff' : '#0a1420' }}>4 <span style={{ fontSize: 16, color: dark ? 'rgba(255,255,255,0.4)' : 'rgba(20,30,50,0.4)' }}>/ 7</span></div>
        </div>
        <div style={{ padding: '6px 10px', borderRadius: 8, background: G_ACCENT + '22',
          fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1, color: G_ACCENT, fontWeight: 600 }}>
          +200 XP
        </div>
      </div>

      {/* invite link */}
      <div style={{ padding: '12px 14px', borderRadius: 12,
        background: dark ? 'oklch(0.16 0.01 225)' : 'rgba(0,0,0,0.04)',
        border: `1px dashed ${dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11,
        color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span>sense.sunx.app/i/<span style={{ color: G_PRIMARY }}>04217</span></span>
        <span style={{ color: G_PRIMARY, fontSize: 9, letterSpacing: 1 }}>COPY</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. TRUST SCORE
// ─────────────────────────────────────────────────────────────
function GamTrust({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  const cx = 171, cy = 110, r = 72;
  const score = 0.92;
  const startA = 135, sweepA = 270;
  const polar = (deg, rad) => [cx + Math.cos(deg*Math.PI/180)*rad, cy + Math.sin(deg*Math.PI/180)*rad];
  const arcPath = (from,to,rad) => { const [x1,y1]=polar(from,rad),[x2,y2]=polar(to,rad); const large = to-from>180?1:0; return `M ${x1} ${y1} A ${rad} ${rad} 0 ${large} 1 ${x2} ${y2}`; };

  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ position: 'relative', height: 220,
        borderRadius: 18,
        background: dark ? 'oklch(0.20 0.02 225)' : 'rgba(255,255,255,0.85)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="342" height="220">
          <path d={gHex(cx,cy,90)} fill="none" stroke={dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'} strokeWidth="1" strokeDasharray="2 4"/>
          <path d={arcPath(startA, startA+sweepA, r)} fill="none" stroke={dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} strokeWidth="12" strokeLinecap="round"/>
          <path d={arcPath(startA, startA+sweepA*score, r)} fill="none" stroke={G_ACCENT} strokeWidth="12" strokeLinecap="round"/>
          <text x={cx} y={cy-2} textAnchor="middle" fontFamily="Geist" fontWeight="600" fontSize="44" letterSpacing="-1.5"
            fill={dark ? '#fff' : '#0a1420'}>0.92</text>
          <text x={cx} y={cy+22} textAnchor="middle" fontFamily="Geist Mono" fontSize="9" letterSpacing="2" fill={G_ACCENT}>{c.trustOf.replace('/', '·')}</text>
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {c.trustFactors.map((f,i) => (
          <div key={i} style={{ padding: '10px 12px', borderRadius: 10,
            background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.6)',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
            display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 110, fontFamily: 'Geist', fontSize: 12, fontWeight: 500,
              color: dark ? '#fff' : '#0a1420' }}>{f.name}</span>
            <div style={{ flex: 1, height: 6, borderRadius: 3,
              background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${f.value*100}%`, background: G_ACCENT, borderRadius: 3 }} />
            </div>
            <span style={{ width: 40, textAlign: 'right',
              fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, fontWeight: 600,
              color: dark ? '#fff' : '#0a1420', fontVariantNumeric: 'tabular-nums' }}>{f.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 8. CITIZEN SCIENTIST IDENTITY
// ─────────────────────────────────────────────────────────────
function GamIdentity({ dark, lang }) {
  const c = GAMIF_COPY[lang];
  return (
    <div style={{ width: 342, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* ID card */}
      <div style={{ padding: 18, borderRadius: 18,
        background: `linear-gradient(135deg, oklch(0.22 0.04 250), oklch(0.16 0.02 230))`,
        border: `1px solid rgba(255,255,255,0.08)`,
        position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -30, bottom: -40, opacity: 0.25 }}>
          <svg width="180" height="180" viewBox="-90 -90 180 180">
            {[60, 45, 30].map((rr,i) => (
              <path key={i} d={gHex(0,0,rr)} fill="none" stroke={G_PRIMARY} strokeWidth="1" strokeDasharray={i?'2 4':'0'}/>
            ))}
            <path d={gHex(0,0,15)} fill={G_ACCENT} opacity="0.5"/>
          </svg>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5,
          color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: G_ACCENT,
            animation: 'dotBreath 1.5s ease-in-out infinite' }} />
          {c.citizen}
        </div>

        <div style={{ marginTop: 12, fontFamily: 'Geist', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>
          You are
        </div>
        <div style={{ fontFamily: 'Geist', fontSize: 34, fontWeight: 600, lineHeight: 1.05, letterSpacing: -1,
          color: '#fff', textWrap: 'balance', marginTop: 4 }}>
          a Citizen<br/>Scientist
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
          paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { l: 'declarations', v: '248' },
            { l: 'zones live',   v: '37'  },
            { l: 'research feeds', v: '9' },
          ].map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily: 'Geist', fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: -0.4,
                fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
              <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 8.5, letterSpacing: 1,
                color: 'rgba(255,255,255,0.5)' }}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact line */}
      <div style={{ padding: '12px 14px', borderRadius: 12,
        background: dark ? 'oklch(0.18 0.012 225)' : 'rgba(255,255,255,0.6)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
        fontFamily: 'Geist', fontSize: 12, lineHeight: 1.5,
        color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)' }}>
        <span style={{ color: G_ACCENT, fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 9, letterSpacing: 1.5 }}>↗ IMPACT</span>
        <div style={{ marginTop: 4 }}>Your contributions feed <b style={{ color: dark ? '#fff' : '#0a1420' }}>3 universities</b>, <b style={{ color: dark ? '#fff' : '#0a1420' }}>6 city dashboards</b> and the global SUNX Earth network.</div>
      </div>
    </div>
  );
}

const GAMIF_COMPONENTS = [GamStreak, GamRank, GamLeaderboard, GamPlaces, GamBadges, GamReferral, GamTrust, GamIdentity];

// ─────────────────────────────────────────────────────────────
// Single-screen shell (same chrome as tutorial)
// ─────────────────────────────────────────────────────────────
function GamificationScreen({ dark, lang, device, idx }) {
  const c = GAMIF_COPY[lang];
  const screen = c.screens[idx];
  const Hero = GAMIF_COMPONENTS[idx];

  return (
    <div key={idx} style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column',
      background: dark ? 'oklch(0.14 0.015 225)' : 'oklch(0.985 0.008 220)',
      animation: 'fadeSlide 0.5s ease-out',
      fontFamily: 'Geist, Inter, -apple-system, system-ui, sans-serif',
    }}>
      <div style={{
        paddingTop: device === 'ios' ? 58 : 48,
        paddingLeft: 20, paddingRight: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: 6,
            background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.72 0.14 155))',
            boxShadow: '0 2px 6px rgba(20,90,180,0.25)' }} />
          <span style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 11, letterSpacing: 2, fontWeight: 500,
            color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.6)' }}>SUNX · SENSE</span>
        </div>
        <div style={{ fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: 1.5,
          color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,50,0.45)' }}>
          {String(idx+1).padStart(2,'0')} / 08
        </div>
      </div>

      <div style={{ margin: '20px auto 0', display: 'flex', justifyContent: 'center' }}>
        <Hero dark={dark} lang={lang} />
      </div>

      <div style={{ margin: '14px 24px 0',
        fontFamily: 'Geist Mono, ui-monospace, monospace', fontSize: 10, letterSpacing: 1.8,
        color: G_PRIMARY, fontWeight: 500 }}>{screen.eyebrow}</div>

      <div style={{ padding: '8px 24px 0', flex: 1 }}>
        <h1 style={{ fontFamily: 'Geist', fontWeight: 600, fontSize: 22, lineHeight: 1.18, letterSpacing: -0.6,
          color: dark ? '#fff' : '#0a1420', margin: '0 0 8px', textWrap: 'balance' }}>{screen.title}</h1>
        <p style={{ fontFamily: 'Geist', fontSize: 13, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(20,30,50,0.6)',
          margin: 0, textWrap: 'pretty' }}>{screen.body}</p>
      </div>

      <div style={{ padding: '0 24px', paddingBottom: device === 'ios' ? 40 : 32 }}>
        <button style={{
          width: '100%', height: 50, border: 'none', borderRadius: 14,
          background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.58 0.16 220))',
          color: '#fff', fontFamily: 'Geist', fontSize: 14, fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(20,90,200,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {screen.cta}
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );
}

window.GamificationScreen = GamificationScreen;
window.GAMIF_COPY = GAMIF_COPY;

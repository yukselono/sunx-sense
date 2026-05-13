// Main onboarding prototype
// Slide shell that renders inside iOS or Android device

function OnboardingApp({ dark, lang, onToggleDark, onToggleLang, device }) {
  const copy = window.ONBOARDING_COPY[lang];
  const [slide, setSlide] = React.useState(() => {
    const stored = parseInt(localStorage.getItem('sunx_slide') || '0', 10);
    return isNaN(stored) ? 0 : Math.max(0, Math.min(4, stored));
  });
  const [autoPlay, setAutoPlay] = React.useState(true);

  React.useEffect(() => {
    localStorage.setItem('sunx_slide', String(slide));
  }, [slide]);

  // Auto-advance
  React.useEffect(() => {
    if (!autoPlay) return;
    if (slide === 4) return; // don't auto-advance past the CTA
    const t = setTimeout(() => setSlide(s => Math.min(4, s + 1)), 6500);
    return () => clearTimeout(t);
  }, [slide, autoPlay]);

  const slideData = copy.slides[slide];
  const Hero = window.Heroes[slide];
  const moodByIdx = ['calm', 'focused', 'focused', 'excited', 'excited'];

  // Screen content
  const screen = (
    <div key={slide} style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column',
      background: dark ? 'oklch(0.14 0.015 225)' : 'oklch(0.985 0.008 220)',
      animation: 'fadeSlide 0.5s ease-out',
      fontFamily: 'Geist, Inter, -apple-system, system-ui, sans-serif',
    }}>
      {/* Top bar: skip + progress */}
      <div style={{
        paddingTop: device === 'ios' ? 58 : 48,
        paddingLeft: 20, paddingRight: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        {/* SUNX wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6,
            background: 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.72 0.14 155))',
            boxShadow: '0 2px 6px rgba(20,90,180,0.25)',
          }} />
          <span style={{
            fontFamily: 'Geist Mono, ui-monospace, monospace',
            fontSize: 11, letterSpacing: 2, fontWeight: 500,
            color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.6)',
          }}>SUNX · SENSE</span>
        </div>
        <button onClick={() => setSlide(4)} style={{
          border: 'none', background: 'transparent',
          fontFamily: 'Geist, Inter, system-ui', fontSize: 13,
          color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(20,30,50,0.5)',
          cursor: 'pointer', padding: '4px 8px',
        }}>{copy.skip}</button>
      </div>

      {/* Hero visual */}
      <div style={{
        margin: '20px auto 0',
        width: 342, position: 'relative',
        display: 'flex', justifyContent: 'center',
      }}>
        <Hero dark={dark} />
      </div>

      {/* Hero label strip */}
      <div style={{
        margin: '12px 24px 0',
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: 'Geist Mono, ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.5,
        color: dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,30,50,0.45)',
      }}>
        <div style={{
          width: 5, height: 5, borderRadius: '50%',
          background: 'oklch(0.72 0.14 155)',
          animation: 'dotBreath 1.6s ease-in-out infinite',
        }} />
        {slideData.heroLabel.toUpperCase()}
        <div style={{ flex: 1, height: 1, background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />
        <span>
          <span style={{ color: dark ? 'rgba(255,255,255,0.7)' : 'rgba(20,30,50,0.7)', fontSize: 11 }}>{slideData.stat.value}</span>
          <span style={{ opacity: 0.7 }}>{slideData.stat.suffix}</span>
        </span>
      </div>

      {/* Copy block */}
      <div style={{ padding: '26px 24px 0', flex: 1 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
        }}>
          <SenseOrb size={32} dark={dark} mood={moodByIdx[slide]} />
          <div style={{
            fontFamily: 'Geist Mono, ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.8, fontWeight: 500,
            color: 'oklch(0.65 0.14 230)',
          }}>{slideData.eyebrow.toUpperCase()}</div>
        </div>
        <h1 style={{
          fontFamily: 'Geist, Inter, system-ui', fontWeight: 600,
          fontSize: 28, lineHeight: 1.15, letterSpacing: -0.8,
          color: dark ? '#fff' : '#0a1420',
          margin: '0 0 12px', textWrap: 'balance',
        }}>{slideData.title}</h1>
        <p style={{
          fontFamily: 'Geist, Inter, system-ui', fontSize: 15, lineHeight: 1.5,
          color: dark ? 'rgba(255,255,255,0.65)' : 'rgba(20,30,50,0.62)',
          margin: 0, textWrap: 'pretty',
          fontWeight: 400,
        }}>{slideData.body}</p>
      </div>

      {/* Footer: dots + CTA */}
      <div style={{
        padding: '0 24px',
        paddingBottom: device === 'ios' ? 40 : 32,
        display: 'flex', flexDirection: 'column', gap: 18,
        flexShrink: 0,
      }}>
        {/* Dots */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} onClick={() => { setAutoPlay(false); setSlide(i); }}
              style={{
                height: 6, borderRadius: 3,
                width: i === slide ? 24 : 6,
                background: i === slide
                  ? 'oklch(0.65 0.14 230)'
                  : dark ? 'rgba(255,255,255,0.15)' : 'rgba(20,30,50,0.12)',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(.2,.9,.2,1)',
                position: 'relative', overflow: 'hidden',
              }}>
              {i === slide && autoPlay && slide !== 4 && (
                <div style={{
                  position: 'absolute', left: 0, top: 0, height: '100%',
                  background: 'rgba(255,255,255,0.45)',
                  animation: 'progressFill 6.5s linear forwards',
                  borderRadius: 3,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => {
          setAutoPlay(false);
          if (slide === 4) {
            // "begin" — reset
            setSlide(0); setAutoPlay(true);
          } else {
            setSlide(slide + 1);
          }
        }} style={{
          height: 54, border: 'none', borderRadius: 16,
          background: slide === 4
            ? 'linear-gradient(135deg, oklch(0.65 0.14 230), oklch(0.58 0.16 220))'
            : dark ? '#fff' : '#0a1420',
          color: slide === 4 ? '#fff' : dark ? '#0a1420' : '#fff',
          fontFamily: 'Geist, Inter, system-ui',
          fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
          cursor: 'pointer',
          boxShadow: slide === 4
            ? '0 10px 30px rgba(20,90,200,0.35), inset 0 1px 0 rgba(255,255,255,0.25)'
            : '0 2px 8px rgba(0,0,0,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'transform 0.15s',
        }}>
          {slide === 4 ? copy.getStarted : copy.next}
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M2 7h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );

  return screen;
}

window.OnboardingApp = OnboardingApp;

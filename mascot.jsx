// Mascot — the "Sense Orb": a friendly pulsing sphere with AQI ring
// Consistent across all slides; changes expression subtly per slide
function SenseOrb({ size = 56, dark = false, mood = 'calm' }) {
  const primary = 'oklch(0.65 0.14 230)';
  const accent = 'oklch(0.72 0.14 155)';
  const eyeColor = dark ? '#0a1420' : '#0a1420';

  const eyeY = mood === 'excited' ? 44 : mood === 'focused' ? 50 : 48;
  const smileY = mood === 'excited' ? 68 : 64;
  const smileCurve = mood === 'excited' ? 8 : mood === 'focused' ? 3 : 5;

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
      <defs>
        <radialGradient id={`orbGrad-${mood}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="40%" stopColor={primary} stopOpacity="0.5" />
          <stop offset="100%" stopColor={primary} stopOpacity="0.9" />
        </radialGradient>
      </defs>

      {/* outer AQI ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={accent} strokeWidth="1.5"
        strokeDasharray="3 4" opacity="0.5"
        style={{ animation: 'coreSpin 12s linear infinite', transformOrigin: '50px 50px' }} />

      {/* breathing glow */}
      <circle cx="50" cy="50" r="42" fill={primary} opacity="0.12"
        style={{ animation: 'haloBreath 3s ease-in-out infinite', transformOrigin: '50px 50px' }} />

      {/* body */}
      <circle cx="50" cy="50" r="34" fill={`url(#orbGrad-${mood})`} />

      {/* highlight */}
      <ellipse cx="40" cy="36" rx="10" ry="6" fill="#fff" opacity="0.45" />

      {/* eyes */}
      <circle cx="40" cy={eyeY} r="2.5" fill={eyeColor} />
      <circle cx="60" cy={eyeY} r="2.5" fill={eyeColor} />

      {/* smile */}
      <path d={`M 42 ${smileY} Q 50 ${smileY + smileCurve} 58 ${smileY}`}
        stroke={eyeColor} strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

window.SenseOrb = SenseOrb;

// Shared sticky top navigation injected into every page.
// Single source of truth — edit here, all pages update.
(function () {
  const LINKS = [
    { href: 'index.html',                       label: 'Home',         ix: '00' },
    { href: 'SUNX Sense Onboarding.html',       label: 'Onboarding',   ix: '01' },
    { href: 'SUNX Sense Gamification.html',     label: 'Gamification', ix: '02' },
    { href: 'SUNX Sense Tiers.html',            label: 'Tiers',        ix: '03' },
    { href: 'SUNX Sense Consent.html',          label: 'Consent · EK J', ix: '04' },
    { href: 'SUNX Sense Signup.html',           label: 'Sign up',      ix: '05' },
  ];

  const here = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');

  const css = `
    .sx-nav {
      position: sticky; top: 0; z-index: 1000;
      backdrop-filter: blur(18px) saturate(180%);
      -webkit-backdrop-filter: blur(18px) saturate(180%);
      background: rgba(10, 15, 22, 0.72);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-family: 'Geist', Inter, -apple-system, system-ui, sans-serif;
    }
    body:not(.dark) .sx-nav {
      background: rgba(245, 246, 248, 0.78);
      border-bottom-color: rgba(20,30,50,0.08);
    }
    .sx-nav-inner {
      max-width: 1280px; margin: 0 auto;
      padding: 12px 24px;
      display: flex; align-items: center; gap: 24px;
      flex-wrap: wrap;
    }
    .sx-nav .brand {
      font-family: 'Geist Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 2.6px; font-weight: 600;
      color: oklch(0.65 0.14 230); text-transform: uppercase;
      text-decoration: none; flex-shrink: 0;
      display: inline-flex; align-items: center; gap: 8px;
    }
    .sx-nav .brand .dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: oklch(0.72 0.14 155);
      animation: sx-pulse 2.4s ease-in-out infinite;
    }
    @keyframes sx-pulse {
      0%, 100% { opacity: 0.65; transform: scale(1); }
      50%      { opacity: 1;    transform: scale(1.3); }
    }
    .sx-nav-links {
      display: flex; gap: 4px; flex-wrap: wrap; flex: 1;
      justify-content: flex-end;
    }
    .sx-nav-links a {
      font-family: 'Geist', system-ui, sans-serif;
      font-size: 13px; font-weight: 500;
      color: rgba(255,255,255,0.65);
      text-decoration: none;
      padding: 7px 12px; border-radius: 8px;
      transition: background 0.15s, color 0.15s;
      display: inline-flex; align-items: center; gap: 8px;
      white-space: nowrap;
    }
    body:not(.dark) .sx-nav-links a { color: rgba(20,30,50,0.7); }
    .sx-nav-links a .ix {
      font-family: 'Geist Mono', ui-monospace, monospace;
      font-size: 9px; letter-spacing: 1.2px; opacity: 0.6;
    }
    .sx-nav-links a:hover {
      background: rgba(255,255,255,0.06);
      color: rgba(255,255,255,0.95);
    }
    body:not(.dark) .sx-nav-links a:hover {
      background: rgba(20,30,50,0.05);
      color: rgba(20,30,50,0.95);
    }
    .sx-nav-links a.active {
      background: linear-gradient(135deg, oklch(0.65 0.14 230 / 0.18), oklch(0.72 0.14 155 / 0.12));
      color: oklch(0.78 0.14 230);
      border: 1px solid oklch(0.65 0.14 230 / 0.35);
      padding: 6px 11px;
    }
    body:not(.dark) .sx-nav-links a.active {
      color: oklch(0.45 0.16 230);
    }
    @media (max-width: 760px) {
      .sx-nav-inner { padding: 10px 16px; gap: 12px; }
      .sx-nav-links a { padding: 6px 9px; font-size: 12px; }
      .sx-nav-links a .ix { display: none; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const linkHTML = LINKS.map(l => {
    const active = l.href === here ? ' class="active"' : '';
    return `<a href="${l.href}"${active}><span class="ix">${l.ix}</span>${l.label}</a>`;
  }).join('');

  const nav = document.createElement('header');
  nav.className = 'sx-nav';
  nav.innerHTML = `
    <div class="sx-nav-inner">
      <a class="brand" href="index.html"><span class="dot"></span>SUNX · SENSE</a>
      <nav class="sx-nav-links">${linkHTML}</nav>
    </div>
  `;

  // Insert as the very first element of <body>.
  document.body.insertBefore(nav, document.body.firstChild);
})();

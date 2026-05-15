// Shared top navigation injected into every page. Edit here, every page updates.
(function () {
  const LINKS = [
    { href: 'index.html',                       label: 'Home',         ix: '00' },
    { href: 'SUNX Sense Onboarding.html',       label: 'Onboarding',   ix: '01' },
    { href: 'SUNX Sense Gamification.html',     label: 'Gamification', ix: '02' },
    { href: 'SUNX Sense Tiers.html',            label: 'Tiers',        ix: '03' },
    { href: 'SUNX Sense Consent.html',          label: 'Consent · EK J', ix: '04' },
    { href: 'SUNX Sense Odor.html',             label: 'Odor',         ix: '05' },
    { href: 'SUNX Sense Signup.html',           label: 'Sign up',      ix: '06' },
    { href: 'Carbostar PX Mission Brief.html',  label: 'PX Brief',     ix: '07' },
    { href: 'briefs/import.html',                label: 'Import Brief', ix: '08', external: false },
    { href: 'https://yukselono.github.io/onox-quote-engine/', label: '↗ Quote Engine', ix: '↗', external: true },
  ];
  // Identify the current page (handles nested paths like briefs/import.html)
  const parts = location.pathname.split('/').filter(Boolean);
  const here = decodeURIComponent(
    parts.slice(-2).join('/').includes('briefs/') ? parts.slice(-2).join('/') : (parts.pop() || 'index.html')
  );

  // Pages inside subfolders (e.g. briefs/import.html) need to walk up to root.
  const inSubfolder = parts.some(p => p === 'briefs');
  const root = inSubfolder ? '../' : '';

  const css = `
    /* Reserve space at top of every page for the fixed nav */
    body { padding-top: 60px; }

    .sx-nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 9999;
      height: 60px;
      display: flex; align-items: center; justify-content: center;
      pointer-events: none;
    }
    .sx-nav-pill {
      pointer-events: auto;
      max-width: 1140px;
      width: calc(100% - 32px);
      margin-top: 12px;
      padding: 6px 8px 6px 16px;
      display: flex; align-items: center; gap: 4px;
      background: rgba(10, 15, 22, 0.72);
      backdrop-filter: blur(20px) saturate(180%);
      -webkit-backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 999px;
      box-shadow:
        0 8px 32px rgba(0,0,0,0.32),
        0 1px 0 rgba(255,255,255,0.06) inset;
      font-family: 'Geist', Inter, -apple-system, system-ui, sans-serif;
    }

    .sx-brand {
      display: inline-flex; align-items: center; gap: 9px;
      padding: 6px 10px 6px 4px;
      text-decoration: none;
      flex-shrink: 0;
      margin-right: 4px;
      border-right: 1px solid rgba(255,255,255,0.08);
    }
    .sx-brand .orb {
      width: 18px; height: 18px; border-radius: 50%;
      background:
        radial-gradient(circle at 30% 30%, oklch(0.85 0.16 155), oklch(0.55 0.18 230) 70%);
      box-shadow:
        0 0 12px oklch(0.65 0.14 230 / 0.55),
        inset 0 0 6px rgba(255,255,255,0.3);
      flex-shrink: 0;
    }
    .sx-brand .wm {
      font-family: 'Geist Mono', ui-monospace, monospace;
      font-size: 11px; letter-spacing: 2.4px; font-weight: 600;
      color: #fff; text-transform: uppercase;
      line-height: 1;
    }
    .sx-brand .wm em {
      font-style: normal;
      background: linear-gradient(110deg, oklch(0.72 0.14 230), oklch(0.78 0.14 155));
      -webkit-background-clip: text; background-clip: text; color: transparent;
    }

    .sx-links {
      display: flex; align-items: center; gap: 2px;
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .sx-links::-webkit-scrollbar { display: none; }

    .sx-link {
      position: relative;
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 14px;
      font-size: 13px; font-weight: 500;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      border-radius: 999px;
      white-space: nowrap;
      transition: color 0.15s, background 0.15s;
    }
    .sx-link .ix {
      font-family: 'Geist Mono', ui-monospace, monospace;
      font-size: 9px; letter-spacing: 1.2px;
      color: rgba(255,255,255,0.35); font-weight: 600;
    }
    .sx-link:hover { color: #fff; }
    .sx-link:hover .ix { color: rgba(255,255,255,0.55); }
    .sx-link.active {
      color: #fff;
      background: linear-gradient(135deg, oklch(0.65 0.14 230 / 0.5), oklch(0.55 0.16 220 / 0.45));
      box-shadow:
        0 4px 14px oklch(0.55 0.16 220 / 0.4),
        inset 0 1px 0 rgba(255,255,255,0.15);
    }
    .sx-link.active .ix { color: rgba(255,255,255,0.75); }

    @media (max-width: 860px) {
      .sx-nav-pill { padding: 5px 8px; }
      .sx-brand { padding-right: 8px; margin-right: 2px; }
      .sx-brand .wm { font-size: 10px; letter-spacing: 2px; }
      .sx-link { padding: 7px 10px; font-size: 12px; }
      .sx-link .ix { display: none; }
    }
    @media (max-width: 560px) {
      .sx-nav-pill { border-radius: 16px; width: calc(100% - 16px); padding: 4px; }
      .sx-brand { padding: 4px 8px 4px 2px; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const linkHTML = LINKS.map(l => {
    const active = l.href === here ? ' active' : '';
    const isExternal = l.external || /^https?:\/\//.test(l.href);
    const target = isExternal ? ' target="_blank" rel="noopener"' : '';
    const href = isExternal ? l.href : `${root}${l.href}`;
    return `<a class="sx-link${active}" href="${href}"${target}><span class="ix">${l.ix}</span>${l.label}</a>`;
  }).join('');

  const nav = document.createElement('header');
  nav.className = 'sx-nav';
  nav.innerHTML = `
    <div class="sx-nav-pill">
      <a class="sx-brand" href="${root}index.html">
        <span class="orb"></span>
        <span class="wm">SUNX<em> · SENSE</em></span>
      </a>
      <nav class="sx-links">${linkHTML}</nav>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);
})();

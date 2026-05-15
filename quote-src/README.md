# Quote Engine (copy + integration)

Vite/React app — copied from [yukselono/onox-quote-engine](https://github.com/yukselono/onox-quote-engine) and modified to integrate with the SUNX Sense Mission Brief system.

## Why a copy?

The upstream repo is the canonical proposal generator. We keep a copy here so the brief integration (button + JSON mapper) can live alongside the brief template + import page in a single repo, deployed to a single Pages URL.

## Where it lives

- **Source:** `quote-src/` (this directory)
- **Built output:** `../quote/` (committed, served by GitHub Pages)
- **Deployed URL:** https://yukselono.github.io/sunx-sense/quote/

## Build

```bash
cd quote-src
npm install
npx vite build      # outputs to ../quote/
```

Then commit `quote/` and push. GitHub Pages picks it up.

## What was added (vs. the upstream)

In [src/App.jsx](src/App.jsx):

1. **`quoteToBriefData(quote)`** — maps a generated quote to a JSON matching `briefs/schema.json`.
2. **`openMissionBrief(quote)`** — base64-encodes the JSON and opens `../briefs/import.html#data=<b64>` in a new tab.
3. **⚡ MISSION BRIEF button** in the post-generate action bar (between *YENİ* and *PDF / YAZDIR*).

In [vite.config.js](vite.config.js):

- `base: '/sunx-sense/quote/'` so Pages serves assets correctly.
- `build.outDir: '../quote'` so the build lands at the repo root for Pages.

## To sync upstream changes

```bash
cd /tmp && git clone https://github.com/yukselono/onox-quote-engine.git
# Then manually copy any changes from /tmp/onox-quote-engine/src/ into quote-src/src/,
# preserving the openMissionBrief() additions in App.jsx.
```

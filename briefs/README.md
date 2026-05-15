# Mission Brief Generator

Customer-facing **Mission Brief** companion pages — auto-generated from sales proposals, displayed in a gallery on the home page with SVG poster thumbnails.

## How it works

```
briefs/
├── data/                      ← source of truth (one JSON per brief)
│   └── carbostar-px-zwf2026.json
├── template.html              ← HTML template with {{tokens}}
├── build.mjs                  ← THE build command
├── new.mjs                    ← scaffold a new brief
├── schema.json                ← JSON Schema (for validation / LLM)
├── manifest.json              ← auto-generated index (don't edit)
└── README.md
```

The repo root contains the rendered HTML files plus the home-page gallery (`index.html`) that reads `manifest.json` and renders cards with SVG poster previews.

## Add a new brief — three steps

```bash
# 1. Scaffold a new JSON, seeded from the Carbostar example
node briefs/new.mjs acme-cop31 "Acme Industries"

# 2. Edit briefs/data/acme-cop31.json — fill in the TODOs.
#    Schema: see briefs/schema.json or the Carbostar example.

# 3. Build everything
node briefs/build.mjs
```

The build command:
- Scans `briefs/data/*.json`
- Renders each to the repo root using `template.html`
- Rebuilds `manifest.json` from scratch
- **Cleans up stale outputs** (HTML files at root that were in the previous manifest but no longer have a corresponding JSON)

To **remove** a brief: `rm briefs/data/<slug>.json && node briefs/build.mjs`.

## What the brief looks like

Take a look at [`../Carbostar PX Mission Brief.html`](../Carbostar%20PX%20Mission%20Brief.html) — the canonical example, hand-crafted for the Sıfır Atık Vakfı / Zero Waste Forum 2026 deployment.

The template is a slimmed-down version of that same design language (Geist + OKLCH, dark glass cards, hero countdown, 6 sections: Stage · Fleet · Dashboard · Roadmap · Risks · Bridge).

## Workflow for the proposal-generator Claude session

1. After generating a proposal, produce a `data.json` matching `briefs/schema.json`.
2. Save it as `briefs/data/<slug>.json` (slug = lowercase-kebab-case).
3. Run `node briefs/build.mjs`.
4. `git add briefs/data/<slug>.json briefs/manifest.json "<output>.html" && git commit && git push`.
5. The new brief appears on the home page gallery within 30–60s.

## Design rules (do not break)

- **Geist + Geist Mono** fonts (Google).
- **OKLCH color tokens**: primary `0.65 0.14 230`, accent `0.72 0.14 155`, amber `0.78 0.14 75`, red `0.65 0.18 25`, violet `0.62 0.18 295`, gold `0.80 0.13 80`. Backgrounds: `#07090d` / `#0c1018`.
- **Eyebrow style** — Geist Mono, 11px, 2px letter-spacing, primary color, uppercase.
- **Big numbers** — Geist 600 weight, tight letter-spacing (-1 to -3px), high contrast.
- **Eyebrows over titles** — section headings always preceded by an uppercase mono eyebrow (e.g. `01 · THE STAGE`).
- Dark background only. No light-mode variant.
- Customer brand is **front-stage**; ONO is **back-stage / invisible technology partner**.

## Tone rules

- Calm, scientific, operational. Not salesy.
- Past for delivered, future for upcoming, present for live.
- Numbers > adjectives.
- Risks listed openly — credibility comes from acknowledging them.

## Per-brief customization

In `data/<slug>.json`:

- `meta.accentHue` — OKLCH hue for that brief's gallery card (default 230 = blue). Try 155 (green) for sustainability, 295 (violet) for tech, 75 (amber) for civic, 25 (red) for industrial.
- `meta.outputFilename` — override the rendered HTML filename. Default: `<Client> <Project> Mission Brief.html`.

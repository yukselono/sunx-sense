# Mission Brief Generator

Customer-facing **Mission Brief** companion pages — auto-generated from sales proposals.

## What this is

When the proposal-generator session produces a proposal for a new deployment, it should also produce a **Mission Brief**: a customer-facing HTML page that shows *how it will go* — venue, schedule, fleet, dashboard, roadmap, risks — in the same visual language as the proposal.

Reference brief: [`../Carbostar PX Mission Brief.html`](../Carbostar%20PX%20Mission%20Brief.html) — the canonical example for the Sıfır Atık Vakfı / Zero Waste Forum 2026 deployment.

## Workflow

The other Claude session (proposal generator) does this:

1. After the proposal is finalized, build a `data.json` matching [`schema.json`](schema.json).
2. Either:
   - **Path A (recommended)** — Call `node render.mjs data.json output.html`. This substitutes `{{TOKEN}}` placeholders in [`template.html`](template.html) with values from `data.json`.
   - **Path B (custom layout)** — If the deployment needs sections that don't fit the template (e.g. multi-city, no event, B2B-only), generate a fresh HTML using the Carbostar brief + the existing [`example-carbostar.json`](example-carbostar.json) as visual + structural references.

3. Save the result to `../<slug>.html` (e.g. `../Acme Deployment Brief.html`) and add a card to `../index.html`, an entry to `../nav.js`.

## Files

| File | Purpose |
|---|---|
| `schema.json` | JSON schema describing every field a brief needs. |
| `example-carbostar.json` | The Carbostar PX / ZWF 2026 brief's data — a worked example. |
| `template.html` | Slimmed-down templated brief with `{{TOKEN}}` placeholders. Single-page, same design tokens as the reference. |
| `render.mjs` | Node script: reads a JSON file, swaps tokens, writes the result. |
| `README.md` | This file. |

## Design rules (do not break)

- **Geist + Geist Mono** fonts (Google).
- **OKLCH color tokens**: primary `0.65 0.14 230`, accent `0.72 0.14 155`, amber `0.78 0.14 75`, red `0.65 0.18 25`, violet `0.62 0.18 295`, gold `0.80 0.13 80`. Backgrounds: `#07090d` / `#0c1018`.
- **Eyebrow style** — Geist Mono, 11px, 2px letter-spacing, `--primary` color, uppercase.
- **Big numbers** — Geist 600 weight, tight letter-spacing (-1 to -3px), high contrast.
- **Eyebrows over titles** — section headings are always preceded by an uppercase mono eyebrow (e.g. `01 · THE STAGE`).
- **No emoji in chrome**, only sparingly inside cards if relevant.
- Dark background only. No light-mode variant.
- Customer brand goes **front-stage**, ONO is **back-stage / invisible technology partner**.

## Tone rules (do not break)

- Calm, scientific, operational. Not salesy.
- Past tense for delivered, future tense for upcoming, present tense for live.
- Avoid hyperbole, no rocket emojis, no exclamation points.
- Risks are listed, not hidden — credibility comes from acknowledging them.
- Numbers > adjectives.

# papamoa-previews

Demo site and preview pages for [Papamoa.info](https://www.papamoa.info) — the local business directory for Pāpāmoa, Bay of Plenty, New Zealand.

## Structure

```
├── index.html                  ← Directory homepage demo
├── assets/
│   └── css/styles.css          ← Shared stylesheet
├── listings/                   ← Business listing pages
├── categories/                 ← Sub-category pages
├── sales/                      ← Sales and pitch pages
├── previews/                   ← Client preview pages (PPPs)
├── onboarding/                 ← Client approval pages
├── admin/                      ← Internal tools
├── docs/                       ← Project documentation
├── archive/                    ← Superseded pages
├── worker.js                   ← Cloudflare Worker (Claude API proxy)
└── wrangler.toml               ← Cloudflare config
```

## Design System

- **Fonts:** Figtree (body) + Playfair Display (headings)
- **Palette:** Ocean / Sand / Dune
- **Shared CSS:** `assets/css/styles.css`

Part of the [TaurangaNZ.info](https://www.tauranganZ.info) network — trusted since 2005.

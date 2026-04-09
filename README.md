# papamoa-previews

Demo site and preview pages for [Papamoa.info](https://www.papamoa.info) -- the local business directory for Papamoa, Bay of Plenty, New Zealand.

## Structure

```
├── homepage.html               ← Public directory homepage
├── index.html                  ← Internal site index / dashboard (noindex)
├── search.html                 ← Site-wide search
├── legal.html                  ← Privacy & terms
├── 404.html                    ← Custom 404 (gremlin game)
├── nav.js                      ← Shared nav injection system
├── assets/
│   ├── css/styles.css          ← Shared stylesheet (design system source of truth)
│   ├── nav-footer-snippet.html ← Nav/footer HTML reference
│   └── sm-icons/               ← Social media icon files
├── categories/                 ← Category & sub-category pages
│   ├── accommodation/
│   ├── activities/
│   ├── food-drink/
│   ├── services/
│   └── shops/
├── community/                  ← Local info, articles & community pages (50+)
├── listings/                   ← Business listing pages (20 live + 2 templates)
├── sales/                      ← Sales, pitch & outreach pages
│   └── partners/               ← Real estate agent pages
├── previews/                   ← Client preview pages (PPPs)
├── onboarding/                 ← Client approval pages
├── admin/                      ← Internal tools (CRM, dashboard, upload)
├── docs/                       ← Project documentation & reference
├── images/
│   └── listings/{slug}/        ← Per-listing images (logo.png, hero-1.jpg etc.)
├── archive/                    ← Superseded pages
├── worker.js                   ← Cloudflare Worker source (API proxy)
└── wrangler.toml               ← Cloudflare config
```

## Design System

- **Fonts:** Figtree (body) + Playfair Display (headings)
- **Palette:** Navy / Ocean / Sand / Dune / Blue accent
- **Source of truth:** `assets/css/styles.css`

## Nav System

Shared nav injection via `nav.js` with three variants:
- `data-nav="default"` -- full nav (homepage, community, info)
- `data-nav="category"` -- breadcrumb nav (categories, listings)
- `data-nav="sales"` -- back link + custom CTA (sales pages)

See `docs/nav-usage.md` for implementation guide.

## Infrastructure

- **Cloudflare Worker:** `papamoa-claude-proxy.jkbrownnz.workers.dev` (weather, sheets, fishing data, Claude proxy)
- **Forms:** Web3Forms
- **CRM:** Google Sheets
- **Email sequences:** Brevo

Part of the [TaurangaNZ.info](https://www.tauranganz.info) network -- trusted since 2005.

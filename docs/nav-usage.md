# nav.js — Implementation Guide (LOCKED single source)

`nav.js` is the **single source of truth** for the site nav, mobile drawer, and
footer *styling*. The markup + CSS it injects are the LOCKED versions captured
from `homepage.html` on 2026-06-03. Do not fork per-page nav/drawer markup again
— change it here and it changes everywhere.

## What nav.js owns

| Element | Owned by nav.js | Notes |
|---|---|---|
| Top nav (`.pnf-nav`) | ✅ markup + CSS | Flat tab bar, 64px, FB **+ IG** icons, "List Your Business" CTA. Active tab auto-computed from the URL. |
| Mobile drawer (`.pnf-drawer*`) | ✅ markup + CSS | Plain text links (no emoji icons), FB + IG "Follow" links in the foot. |
| Footer **styling** (`.pnf-footer*`) | ✅ CSS only | The footer **markup stays inline** per page so each page keeps its contextual columns (e.g. a category's subcategory links). nav.js only injects the CSS so the look is consistent. |
| Contact modal (`.pnf-overlay/.pnf-modal/.pnf-cf`) | ❌ | Stays inline per page (markup + CSS + the `pnfOpenContact()` JS). |

## Setup

On each public page:

```html
<body data-nav="default">

  <!-- nav.js injects nav + drawer here, then removes this placeholder -->
  <div id="pnf-nav-placeholder"></div>

  <!-- page content, including the inline <footer class="pnf-footer"> ... </footer> -->

  <script src="/papamoa-previews/nav.js"></script>
</body>
```

That's it. `nav.js` injects the nav, the drawer + overlay, and all `.pnf-*` CSS
(nav, drawer, footer). It exposes `window.pnfDrawerOpen` / `window.pnfDrawerClose`
so any legacy inline `onclick="pnfDrawerOpen()"` left in old markup still works.

## Nav variant — flat everywhere (locked)

Every public page uses **`data-nav="default"`** — the flat tab bar (Home, Info,
Community, Stay, Do, Eat, Services, Shop). This is deliberate: Carwyn's brief #3
is *"main page tabs more visible"*, so the tabs stay visible on every page and
only the **active** tab changes.

The active tab is computed from the URL:
- Category links (`/categories/FOLDER/...`) highlight on the category page **and**
  all of that category's subcategory pages.
- Home / Info / Community highlight on their exact page.
- Detection is robust to dev servers that strip `.html` from the address bar.

### Retained but NOT deployed: `category` / `sales` variants

`nav.js` still contains `buildCategory()` (logo + breadcrumb + CTA) and
`buildSales()` (logo + ← Directory + custom CTA) for possible future use, but
they are **not deployed** — flat is the locked site-wide nav. If breadcrumb
wayfinding is wanted on deep pages later, add it as a thin strip *under* the flat
nav rather than replacing the tab bar.

## What to remove when converting a page

```html
<!-- Remove the inline nav -->
<nav class="pnf-nav"> ... </nav>

<!-- Remove the inline drawer (overlay + drawer) if present -->
<div class="pnf-drawer-overlay" ...></div>
<div class="pnf-drawer" id="pnf-drawer"> ... </div>

<!-- Remove the inline drawer JS (nav.js owns it) -->
<script>function pnfDrawerOpen(){...}function pnfDrawerClose(){...}</script>
```

**Keep** the inline `<footer class="pnf-footer">` markup, the contact modal
markup, and `pnfOpenContact()`. Inline nav/drawer/footer **CSS** left in a page's
`<style>` block is harmless — nav.js injects the authoritative copy last, so it
wins — but it's dead weight and can be stripped in a later cleanup pass.

## Base path override

By default `nav.js` uses `/papamoa-previews` as the path prefix (GitHub Pages
preview). At custom-domain launch, set the base to empty **before** the script:

```html
<script>var PNF_BASE = '';</script>
<script src="/nav.js"></script>
```

Or do a single find-and-replace across the repo when going live.

## Rollout status (2026-06-03) — COMPLETE

- ✅ **225 public pages** on the placeholder + script pattern — every public page.
  All legacy nav systems converted: `pnf-nav`+drawer, `pnf-nav`-only, `listing-nav`
  (→ flat nav + breadcrumb strip), `site-nav`, `nav`, classless `<nav>`, and pages
  that had no top nav (nav inserted). Secondary section navs (`tab-nav`, `page-nav`,
  `category-nav` pills) were preserved everywhere they existed.
- ✅ **Contact modal** injected by nav.js (guarded) so the footer's "Get in touch"
  works on every page, including the ~23 that had no inline modal. Pages with an
  inline modal are untouched (no double-inject).
- ✅ **Footer shell** locked to the homepage canonical (logo, tagline, FB + IG,
  "Get in touch", trust bullets + Privacy/Terms/Sitemap/Editorial bottom bar) on
  **120 grid footers**, with each page's contextual columns kept. Footer CSS is
  single-source via nav.js.
- ⛔ Excluded by scope: `index.html` (Project Dashboard), `dashboard.html`,
  `admin/*`, `docs/*`, the `assets/nav-footer-snippet.html` reference snippet's
  *nav* (its footer was normalised), and internal reference docs
  (`sales/facebook-posts`, `email-follow-up`, `followup-emails`, `sales-scripts`).

### Footer follow-ups (not yet done)

- **23 compact footers** (no column grid; some carry page-specific content like
  the weather page's data attribution) — still on the old compact shell, need
  per-page handling.
- **`site-footer` (38) + other footer systems (36)** — separate footer markup,
  not yet unified onto `pnf-footer`.
- **"Sitemap" link** in the canonical bottom bar points at `index.html` (the
  internal dashboard); no public sitemap exists. Repoint or drop site-wide.

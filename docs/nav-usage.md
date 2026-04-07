# nav.js — Implementation Guide

## Setup

1. Add `nav.js` to your repo root (or `/assets/js/nav.js`)
2. On each page, **remove** the existing hardcoded `<nav>`, drawer overlay, and drawer HTML
3. Add the placeholder div and script tag at the top of `<body>`

---

## Minimal page template

```html
<body data-nav="default">

  <!-- Nav placeholder — nav.js replaces this -->
  <div id="pnf-nav-placeholder"></div>

  <!-- Page content here -->

  <script src="/papamoa-previews/nav.js"></script>
</body>
```

---

## Nav variants

### Default (homepage, community, info pages)
```html
<body data-nav="default">
```
Full nav with all links, Facebook icon, "List Your Business" CTA, full drawer.

---

### Category / Listing pages
```html
<body
  data-nav="category"
  data-breadcrumb="Food & Drink|/papamoa-previews/categories/food-drink/food-and-drink.html,Mumbai Masala"
>
```

**Breadcrumb format** — `data-breadcrumb` is a comma-separated list of segments:
- `Label|/path` — a linked crumb (parent pages)
- `Label` — the current page (no link, shown bold)

Home is always prepended automatically. Examples:

```
// Category page
data-breadcrumb="Food & Drink"

// Subcategory page
data-breadcrumb="Food & Drink|/papamoa-previews/categories/food-drink/food-and-drink.html,Restaurants"

// Listing page
data-breadcrumb="Food & Drink|/papamoa-previews/categories/food-drink/food-and-drink.html,Restaurants|/papamoa-previews/categories/food-drink/restaurants-papamoa.html,Mumbai Masala"
```

---

### Sales / Business pages
```html
<body
  data-nav="sales"
  data-cta-href="#contact"
  data-cta-label="Get started →"
>
```

- `data-cta-href` — where the CTA button links (usually an anchor to the form on that page)
- `data-cta-label` — button text (defaults to "Get started →" if omitted)

---

## Base path override

By default `nav.js` uses `/papamoa-previews` as the path prefix (for GitHub Pages preview).

At custom domain launch, add this **before** the nav.js script tag on every page:

```html
<script>var PNF_BASE = '';</script>
<script src="/nav.js"></script>
```

Or do a single find-and-replace across the repo when going live.

---

## What to remove from each page

When retrofitting existing pages, remove:

```html
<!-- Remove this block entirely -->
<nav class="pnf-nav">
  ...
</nav>

<!-- Remove this block entirely -->
<div class="pnf-drawer-overlay" ...></div>
<div class="pnf-drawer" ...>
  ...
</div>
```

Also remove the nav/drawer **CSS** from the page `<style>` block — all CSS is now injected by `nav.js`. The CSS variables and classes to remove are prefixed with `.pnf-nav`, `.pnf-logo`, `.pnf-links`, `.pnf-link`, `.pnf-cta`, `.pnf-fb`, `.pnf-hamburger`, `.pnf-drawer*`.

Keep the `.pnf-footer`, `.pnf-overlay` (contact modal), and `.pnf-modal` CSS — those are not part of nav.js.

---

## Existing pages that need updating

### Use `data-nav="default"`
All community pages, homepage, info pages — just swap in the placeholder, no breadcrumb needed.

### Use `data-nav="category"`
All category pages, subcategory pages, listing pages — set breadcrumb per page.

### Use `data-nav="sales"`
`sales/list-with-us.html`, `sales/landing.html`, `sales/post-call-landing.html` — set `data-cta-href` to the form anchor on each page.

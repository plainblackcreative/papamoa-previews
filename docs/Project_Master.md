# Papamoa.info -- Project Master
## Single Source of Truth
### Consolidated April 9, 2026 | Updated April 13, 2026 | Replaces all previous memory files

---

## HOW TO USE THIS DOCUMENT

This file is the canonical reference for the Papamoa.info project. Feed it to Claude at the start of every session. If anything in a repo file, previous chat, or memory contradicts this document, this document wins.

Do not use any of the following as reference: `Project_Memory.rtf`, `papamoa-project-master.md`, `papamoa-info-system-brief.md`, `papamoa-master-email-content.md`, `papamoa-consolidation.md`, `papamoa-publication-automation-plan.md`, `papamoa-setup-documentation.md`, or any `session-memory-*.md` file. They are all superseded by this document.

---

## 1. PROJECT OVERVIEW

**Site:** Papamoa.info -- commercial local business directory for Papamoa, Bay of Plenty, NZ
**Owner/operator:** Jayden Brown (Jay) / Plain Black Creative
**Client/investor:** Carwyn (site owner, DNS access holder)
**Sister site:** TaurangaNZ.info
**Domain:** papamoa.info (no macron). Content spelling: always **Papamoa** (with macron) in body text.
**Architecture:** Static HTML/CSS/JS on GitHub Pages. Target migration: Astro (future, not required for launch).
**Repo:** `plainblackcreative/papamoa-previews`
**Live preview:** `https://plainblackcreative.github.io/papamoa-previews/`

---

## 2. CONTACTS & KEYS

| Item | Value |
|------|-------|
| Jay email (public) | `jayden@papamoa.info` |
| Jay email (admin) | `jkbrownnz@gmail.com` |
| Jay phone | 027 533 2970 |
| Facebook | `https://www.facebook.com/papamoa.info/` |
| Web3Forms key | `37f6bfe1-3ae3-4c71-a1a4-07c83d6d8e78` |
| Web3Forms notifications | `jkbrownnz@gmail.com` |
| Cloudflare Worker URL | `papamoa-claude-proxy.jkbrownnz.workers.dev` |
| CRM Google Sheet ID | `1X5i40RLF-r-yLRbm_XCgVyzJAkgO_o6whaoCzdC3SiM` |
| CRM lead count | 97 (PPI-001 to PPI-097), next ID: PPI-098 |
| Correct Papamoa coordinates | -37.7167, 176.3167 |

**Email encoding rule:** Use `&#64;` for `@` in all email addresses in HTML to prevent Cloudflare obfuscation.

---

## 3. PRICING (LOCKED)

Source of truth: `docs/pricing-master.html` (needs updating per conflicts below)

| Product | Price | Notes |
|---------|-------|-------|
| Silver Listing | $599+gst/yr | Logo only (1 image). Annual subscription. |
| Gold Listing | $1,199+gst/yr | 1 logo + up to 9 hero images (gallery). Annual subscription. |
| Menu Add-On | $199+gst/yr | Silver: paid add-on ($199+gst/yr). Gold: included free. |
| Extra Subcategory Spotlight | $199+gst/yr each | Gold only. First Spotlight included with Gold. |
| Spotlight Ad Spots | POA/TBC | Variable pricing based on impressions. Not publicly shown. |
| Featured Agent Position | Bespoke | Not published. Conversation-first. |
| Bronze | Free / internal only | Never sold. Placeholder listings. |

### GST formatting
Always lowercase `+gst` in customer-facing content. Never `+gst`.

### Guarantees (active on both tiers)
- **Lifetime Price Lock:** Renewal price stays the same as long as they renew consecutively. Standard feature. Show everywhere.
- **2027 ROI Guarantee:** If they don't feel they got value, renewal year is free (not a refund, it's an extension). Sales tool only. Show on PPP, sales scripts, landing pages. Do NOT show on organic/public-facing pages (homepage, category pages, listing pages).

### Sales Funnel Offers (non-public)
- **Standard offer (all qualifying leads):** Free Silver listing on TaurangaNZ.info included with any paid Papamoa.info listing.
- **Last-ditch offer (selected leads only, final lever before dropout):** "Pay Silver price, get Gold" -- $599+gst/yr unlocks full Gold product including Spotlight.

### Dead Offers (do NOT reinstate)
- Gold-for-Silver-price as default Founding Member perk (moved to last-ditch only)
- Unlimited AI Sub-Pages free / Sub-page add-on ($150+gst)
- Bronze as $99 lifetime product
- Silver as one-off lifetime cost
- Lifetime Price Lock as a "Founding Member" perk (it's now a standard feature)
- "Founding Member" package name/concept entirely
- Offers bank (deferred indefinitely)
- Glenn's Glass & The Phoenix as listing examples

### CTA Destinations
- Organic/cold CTAs: `sales/list-with-us.html`
- Warm/outbound CTAs: `sales/landing.html?biz=X&cat=Y`

---

## 4. DESIGN SYSTEM (LOCKED)

### Fonts
- **Body/UI:** Figtree (Google Fonts, weights 300-800)
- **Headings/display:** Playfair Display (Google Fonts, weights 600, 700; italic 400)
- **NEVER use:** DM Sans, Fraunces, Inter, Libre Baskerville, Space Grotesk, Roboto, Arial, Outfit

### Google Fonts import (use on every page)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet">
```

### Nav Logo Pattern (LOCKED)
- **Playfair Display bold** "Papamoa" in white
- `.info` span in `--blue` (#3AABDE)
- Phone in nav (if shown): `--blue` (#3AABDE), NOT dune
- NOT Figtree for logo. NOT ocean for .info span. No "www" prefix.

### CSS Design Tokens (canonical from `assets/css/styles.css`)

#### Core palette
```css
--navy:        #0D2B3E;   /* darkest -- nav bg, headings */
--navy-mid:    #2B3F5C;   /* homepage hero bg (intentional variant) */
--ocean:       #1B6B7D;   /* primary brand colour */
--ocean-deep:  #0F4352;   /* darker ocean -- hero gradients */
--ocean-mid:   #1A5F70;   /* mid gradient stop */
--ocean-light: #E4F2F5;   /* tinted bg */
--blue:        #3AABDE;   /* accent -- CTAs, links, .info in logo */
--sand:        #F7F3ED;   /* page background */
--sand-alt:    #F5EFE0;   /* homepage body bg (warmer variant) */
--sand-dark:   #EDE7DB;   /* section dividers */
--dune:        #C4985A;   /* warm gold -- secondary accent */
--dune-light:  #F5EDD8;   /* dune tint bg */
--white:       #FFFFFF;
```

#### Text & borders
```css
--body:        #1E2D3E;   /* homepage body text */
--text:        #1A2832;   /* sales/listing page text */
--muted:       #5A6E78;   /* secondary text */
--muted-alt:   #607080;   /* homepage muted */
--border:      #D8E4E8;   /* standard border */
--border-alt:  #DDE5EE;   /* homepage border */
--bg:          #F4F7FA;   /* homepage section bg */
```

#### Tier colours
```css
--gold:        #B8840A;   /* Gold listing tier */
--gold-bg:     #FBF3E2;
--gold-alt:    #C8962A;   /* homepage gold (brighter variant) */
--silver:      #5A7A8A;   /* Silver listing tier */
--silver-bg:   #EDF3F6;
--bronze:      #9A7060;   /* Bronze placeholder */
--bronze-bg:   #F5EDE8;
```

#### Status colours
```css
--green:       #1E6B3C;
--green-bg:    #E6F4EC;
--green-pulse: #7DC143;   /* live indicator, lime accent */
--lime:        #7DC143;   /* alias for green-pulse */
--red:         #8B2020;
--red-bg:      #FAEAEA;
--amber:       #8A5A00;
--amber-bg:    #FFF8E6;
--coral:       #E8344A;   /* homepage alert/error */
```

#### PNF nav/footer system tokens
```css
--pnf-navy:    #0D2B3E;
--pnf-accent:  #3AABDE;
--pnf-dune:    #C4985A;
--pnf-white:   #FFFFFF;
--pnf-muted:   rgba(255,255,255,0.45);
--pnf-font:    'Figtree', sans-serif;
--pnf-display: 'Playfair Display', serif;
```

### Homepage variant tokens (intentional, not bugs)
The homepage uses slightly different colour temperatures by design. These are documented as `-alt`, `-mid`, and `--bg` tokens in the stylesheet. The homepage's `--navy-mid: #2B3F5C` and `--gold-alt: #C8962A` are intentional variants, not errors.

### Category hero gradients (THREE sets exist -- need reconciling)

**Set 1: Homepage category sections** -- uses one palette
**Set 2: Listing templates (Gold/Silver)** -- uses another palette
**Set 3: styles.css `.hero-cat-*` classes** -- uses a third palette (richest colours)

These three sets need reconciling in a design audit. The styles.css set is the most distinct (e.g., purple for shopping `#3D2B6E`, brown for food `#5C2D1E`).

### 4.4 Category Page Hero Colours (LOCKED April 2026)

The five main category pages each have a distinct hero gradient and accent colour. These are locked and canonical. Do not change them without updating this document and `assets/css/styles.css`.

| Page | Hero gradient | Accent colour | Accent token |
|------|--------------|---------------|-------------|
| **Stay** (Accommodation) | `#0A1A2E → #0D2840 → #142A3A` | #3AABDE | `--blue` |
| **Do** (Activities) | `#0A2215 → #0D3828 → #0F4A30` | #7DC143 | `--lime` |
| **Eat** (Food & Drink) | `#1A1208 → #2A2010 → #1A0A08` | #E07830 | `--cat-eat-accent` |
| **Services** | `#141820 → #1E2535 → #28334A` | #3AABDE | `--blue` |
| **Shop** | `#1A1408 → #2A1E0C → #3A2810` | #C8962A | `--gold-alt` |

**Accent colour applies to:** eyebrow text, `h1 em` italic, hero bottom bar, see-more button, sidebar bullet `›`, list CTA button.

**Stay and Services** share the `--blue` accent but have clearly distinct hero gradients (ocean blue vs dark charcoal).

The `assets/css/styles.css` `.hero-cat-*` classes reflect these values and are the authoritative reference for any new pages.

---

## 5. TERMINOLOGY (LOCKED)

| Term | Meaning | Rules |
|------|---------|-------|
| Gold Listing | The $1,199+gst/yr tier product | Always "Gold Listing", never "Gold Spotlight" as a tier name |
| Silver Listing | The $599+gst/yr tier product | Always "Silver Listing", never "Silver Spotlight" |
| Spotlight | Ad placements on category/article pages | Separate concept from listing tiers |
| Gold Spotlight | Acceptable shorthand for the Spotlight position feature within Gold | Only in context of the feature, not the tier |
| Bronze | Internal placeholder label | Never mentioned to prospects or shown on public pages |
| PPP | Personalised Preview Page | The sales demo page at `previews/driftwood-cafe.html` |
| GEO | Generative Engine Optimisation | Umbrella term for all AI answer engines. Preferred over AEO. |
| AEO | Answer Engine Optimisation | Google-specific subset of GEO |

### Listing voice
All listings written from directory perspective: third-party "they/them/call them". Never "we/us". Neutral editorial tone. Specific and honest -- genuine strengths AND nuances. No listing should be purely promotional.

### Spelling
- Always **Papamoa** (with macron) in content body text
- Domain: **Papamoa.info** (no macron)
- No em dashes in content

---

## 6. NAV SYSTEM (LOCKED)

### Desktop nav links (short labels)
Home | Info | Community | Stay | Do | Eat | Services | Shop

### Nav CTA
"List Your Business" linking to `/sales/list-with-us.html`

### nav.js (shared nav injection)
Three variants via `data-nav` attribute on `<body>`:

| Variant | Usage | Behaviour |
|---------|-------|-----------|
| `data-nav="default"` | Homepage, community, info pages | Full nav + Facebook icon + CTA + full drawer |
| `data-nav="category"` | Category, subcategory, listing pages | Logo + breadcrumb + CTA + full drawer |
| `data-nav="sales"` | Sales pages | Logo + "Directory" back link + custom CTA + simplified drawer |

### nav.js implementation
```html
<body data-nav="default">
  <div id="pnf-nav-placeholder"></div>
  <!-- page content -->
  <script src="/papamoa-previews/nav.js"></script>
</body>
```

### Breadcrumb format (category nav)
`data-breadcrumb="Label|/path,CurrentPage"` -- comma-separated segments. Home is auto-prepended.

### Base path variable
`PNF_BASE` defaults to `/papamoa-previews` for GitHub Pages. Set to `''` at custom domain launch:
```html
<script>var PNF_BASE = '';</script>
<script src="/nav.js"></script>
```

### nav.js status
In repo but not confirmed correct. Part of final consolidation steps. Not yet rolled out to all pages.

### Footer
Not injected by nav.js. Manual copy-paste from `nav-footer-snippet.html`. Three variants: Public (5-column grid), Sales (slim centred), Admin (minimal).

---

## 7. FILE STRUCTURE (LOCKED)

```
papamoa-previews/
  homepage.html               -- Public homepage
  index.html                  -- Internal sitemap/dashboard (noindex)
  search.html                 -- Site search
  legal.html                  -- Privacy & terms
  nav.js                      -- Shared nav injection
  worker.js                   -- Cloudflare Worker source
  wrangler.toml               -- Cloudflare config
  .nojekyll                   -- Prevents Jekyll processing
  404.html                    -- Gremlin game 404 page
  README.md
  assets/
    css/styles.css             -- Global stylesheet (source of truth)
    nav-footer-snippet.html    -- Nav/footer HTML reference
  categories/
    accommodation/             -- accommodation.html + subcategory pages
    activities/                -- entertainment.html + subcategory pages
    food-drink/                -- food-and-drink.html + subcategory pages
    services/                  -- services.html + subcategory pages
    shops/                     -- shopping.html + subcategory pages
  community/                   -- 50+ info/article pages (ALL moved from articles/)
  listings/                    -- 20 live listings + 2 templates
  sales/
    list-with-us.html          -- Organic full pitch page
    landing.html               -- Funnel/outreach page
    claim.html
    menu-addon.html
    why-list.html
    spotlight-ads.html
    facebook-posts.html
    followup-emails.html
    sales-scripts.html
    partners/
      real-estate-agent.html
      real-estate-outreach.html
  previews/
    driftwood-cafe.html        -- PPP master template
  admin/                       -- 6 internal tool pages
  docs/                        -- 6 HTML + 9 markdown reference docs
  images/
    listings/{slug}/           -- logo.png + hero-1.jpg through hero-9.jpg
  archive/                     -- Superseded pages
```

### Key path rules
- `articles/` folder is EMPTY. Everything moved to `community/`. Any link pointing to `articles/` is broken.
- Categories use nested folders: `categories/food-drink/cafe-papamoa.html`
- Real estate sales pages are in `sales/partners/`, NOT `partners/` or `admin/`
- `entertainment.html` stays as filename (rename to `things-to-do.html` deferred). Nav label is "Do", H1 is "What to Do in Papamoa"

### Internal link prefix
All internal links use `/papamoa-previews/` prefix for GitHub Pages. Each page includes a path-rewriting script at the bottom. At domain launch, find-and-replace to strip the prefix.

### Listing pages with images currently populated
karaka-pines-papamoa, pacific-park-papamoa, the-wagon-papamoa

---

## 8. LISTINGS (20 live + 2 templates)

| Listing | Tier |
|---------|------|
| Barber Toms | Silver |
| Blackberry Eatery | Silver |
| Coastal Autos | Gold |
| Greencut | Silver |
| Hakanini Surf School | Gold |
| Karaka Pines | Gold |
| Kayco Nails | Silver |
| Mumbai Masala | Silver |
| Pacific Palms | Silver |
| Pacific Park | Gold |
| PAP House | Gold |
| Papamoa Beach Resort | Silver |
| Papamoa Orthodontist | Gold |
| ReDefined Wellbeing | Gold |
| Speedy Screens | Gold |
| Tara Road Dental | Gold |
| The Cave | Gold |
| The Pizza Pundits | Silver |
| The Wagon | Gold |
| Xanadu Book Exchange | Silver |

**Templates:** `listing-gold-template.html`, `listing-silver-template.html`

### Tier label rules on public pages
- Gold listing: show "Gold Listing" badge (star icon)
- Silver listing: show "Silver Listing" badge (diamond icon)
- Bronze/placeholder/directory listing: NO tier label shown. Plain directory card only.
- "Basic" is never rendered in HTML.

---

## 9. INFRASTRUCTURE

### Cloudflare Worker (v2.2)
URL: `papamoa-claude-proxy.jkbrownnz.workers.dev`

| Route | Method | Purpose |
|-------|--------|---------|
| `/weather` | GET | Open-Meteo proxy. Defaults: -37.7167, 176.3167. Uses `&daily=uv_index_max`. 10min cache. |
| `/sheets` | GET | Google Sheets proxy. Params: `sheetId`, `range`. |
| `/fishing-data` | POST | Claude Haiku generates tide/sun/bite time JSON for fishing page. |
| `/` | POST | Claude Haiku search visibility checker for PPP/sales pages. |

**Environment variables:** `env.CLAUDE_API_KEY`, `env.GOOGLE_SHEETS_KEY`. Both in Worker secrets only, never in HTML.
**Claude model for Worker:** `claude-haiku-4-5-20251001`

### GitHub Pages
- Deploy from branch (should switch to GitHub Actions to stop Jekyll truncation)
- `PNF_BASE` variable for prefix handling

### Email
- Brevo under `jkbrownnz@gmail.com`, company Plain Black
- Sending domain: `papamoa.info`
- DNS records (SPF, DKIM, DMARC): pending

### Payments
- Stripe: prepared, not active at launch
- PPP uses `STRIPE_GOLD_URL` and `STRIPE_SILVER_URL` placeholders

### Image storage
- Current: `images/listings/{slug}/` in repo
- Future (when repo approaches 1GB): Cloudflare R2 at `images.papamoa.info/listings/{slug}/`

---

## 10. QUALITY STANDARD (LOCKED)

Every page built must meet this minimum bar, no exceptions (from Jay's instruction: "don't make any more pages that let down the quality of this project"):

- `<meta name="description">` -- specific, not templated
- `<link rel="canonical">`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`)
- Schema markup appropriate to page type (`CollectionPage`, `FAQPage`, `LocalBusiness`, `BreadcrumbList`)
- AEO FAQ section on all category pages (minimum 4 questions, real search queries)
- No tier labels exposed on Bronze/placeholder listings
- No dummy phone numbers in `tel:` links -- leave empty or omit until real numbers confirmed
- Design system applied correctly throughout
- Listing voice: third-party editorial, specific and honest

---

## 11. BUILD PREFERENCES

- Jay prefers **complete drop-in replacement files**, not patches or manual copy-paste instructions
- Jay copies code directly into GitHub's web editor. Does not download/upload files.
- Comprehensive conflict analysis before building. Sequential one-question-at-a-time decisions. Single resolved output file.
- Jay confirms decisions without elaboration once direction is set ("nice", "great", "ready")
- Defers technical complexity to later phases with game plan notes rather than blocking progress

---

## 12. HOMEPAGE (current state = correct)

- Listing cards and spotlight ads stay on homepage
- Browse Categories: 5 visible cards in scrollable row
- Sections: Nav, Hero+weather, About strip, Search, Browse Categories, Essential Info (green), Community (blue), Food & Drink, Services, Accommodation, Entertainment, Shopping, Footer+contact modal
- Search uses simple substring matching
- Real estate content NOT yet merged into homepage
- Uses intentional variant tokens (--navy-mid, --sand-alt, --gold-alt etc.)

---

## 13. PPP (Personalised Preview Page)

**Master template:** `previews/driftwood-cafe.html`
- Single `BUSINESS` data object at top = only per-PPP change needed
- Includes: SEO score card, live search checker (via Cloudflare Worker), tier comparison, Gold/Silver listing mockups, menu add-on demo, Spotlight subcategory selector with live price calculator, Stripe payment CTAs
- Stripe payment links are placeholders (pointing to `/sales/landing.html`)
- Uses correct design system tokens (ocean-deep palette)
- `PRICE_EXTRA = 199` (correct, matches $199+gst/yr for Extra Spotlights)

---

## 14. SEARCH (search.html)

### Known bugs
1. `handleSearch()` function calls `norm()` with undefined `ql` variable (should be `q`)
2. Weather widget fetches directly from Open-Meteo with wrong coordinates (-37.6833, 176.1833) and `uv_index` in `&current=`. Should use Cloudflare Worker proxy.
3. Duplicate script blocks: mobile drawer and contact modal scripts appear twice. Second set has broken `<script>` tag opening.
4. Missing `legal.html` link in footer

### Search index
107+ entries covering all categories, listings, and community pages. Must stay identical between homepage and search.html.

### Search management (to build)
Category-scoped search bars (e.g., Food & Drink section search only shows food results). As content grows, search parameters need a maintenance system. Possible approach: feeder page/portal for adding new entries, or Google Sheets as search index source synced to GitHub via API.

---

## 15. KEY PAGES REFERENCE

### 404 page (404.html)
Gremlin-catching game with 20 gremlins, phase 2 at 10, fairy trap at 18. JSONBin shared leaderboard. Auto-reports broken links via Web3Forms. Confetti on win.

**Monthly giveaway concept:** One sponsor per month provides a prize and gets a spotlight ad on the 404 page. The game is re-themed to match the sponsor's business (e.g., Pizza Pundits month = pizza-themed game, highest score wins $200 voucher). Investigate whether high-engagement 404 pages can benefit SEO/GEO rankings.

### Menu Add-On
Interactive lightbox with category tabs, dietary filters (VG/V/GF/DF), order online link. Client updates via private form. Applies to any service list with pricing, not just food. Category-specific upsell labels in Silver template (e.g., "Add your menu" for food, "Add services & pricing" for services).

**Known menu bugs:**
1. Menu lightbox button crashes the page on PPP and list-with-us. Page becomes unresponsive. Quick fix: change button to anchor link scrolling to menu demo section.
2. Dietary filter tags (V, VG, GF, DF) are hardcoded defaults but only relevant for food & drink. Filters are not functionally linked to menu items. Fix: make filters dynamic (only show tags that exist in the menu data) and wire up actual filtering.
3. Menu item images need an easy path. Either added during build, or auto-discovered from `images/listings/{slug}/menu/` folder.

### Menu Add-On approve-before-pay flow
1. Customer clicks "Add Menu to my listing"
2. Short form: business name, listing URL, menu source
3. Claude scans via Worker, builds menu draft
4. Preview link sent
5. Customer approves or requests changes
6. Payment triggered on approval (Stripe link)
7. Menu goes live, client gets private update form link

### Social media icons
All listings include social icon slots by default (Facebook, Instagram, TikTok, etc.), hidden until a URL is provided during onboarding. Icons are image files stored at `/assets/sm-icons/`. Not emoji or text characters.

### Live review widgets
Google and TripAdvisor review widgets in listing hero section. Live-check on each page load (not static data). Show/hide based on whether review URLs were provided at build. Function to add review URLs later. Implementation: Google Places API via Cloudflare Worker for ratings. TripAdvisor approach TBD.

### Listing sidebar categories
- Gold: Main category + all subcategories shown in sidebar
- Silver: Main category + 1 subcategory
- Should be automated from listing data, not manually guessed

### Listing management portal (to build)
A page/form where Jay or the business owner can update a listing at any time: add/remove images, add/remove social media links, change content, upgrade Silver to Gold, add Menu Add-On. Consider magic-link per listing (unique URL with token) rather than a full login system. Submissions go through a review step before going live.

---

## 16. OUTDATED DOCUMENTS (archived, do not use)

These files exist in the repo or in session history. They are all superseded by this document:

| File | Why it's outdated |
|------|-------------------|
| `Project_Memory.rtf` | Wrong on Menu Add-On, Founding Member offers, Bronze, Extra Spotlight price, GST formatting |
| `docs/papamoa-project-master.md` | March 2026. Wrong pricing, wrong tool stack, wrong tier names |
| `docs/papamoa-info-system-brief.md` | March 2026. $1,200 Gold, Tally.so, HubSpot, ScreenshotOne |
| `docs/papamoa-master-email-content.md` | Dead offers, wrong pricing, Glenn's Glass examples |
| `docs/papamoa-landing-page-architecture.md` | Make.com automation pipeline, Tally.so, HubSpot |
| `docs/papamoa-publication-automation-plan.md` | HubSpot, CMS migration, Phase 3 API |
| `docs/papamoa-setup-documentation.md` | March 2026. $1,200 Gold, Tally.so, v1 Worker |
| `docs/papamoa-consolidation.md` | March 2026. $1,200 Gold, HubSpot, Make.com |
| `docs/papamoa-info-site-reference.md` | Old Drupal site scrape. Reference only for domain migration. |
| `papamoa-master-doc.docx` | Early-stage planning. Wrong on everything. |
| `papamoa-info-project-handoff.md` | Mid-project. Wrong on pricing, offers. |
| All `session-memory-*.md` files | Superseded by this document |

---

## 17. GREY AREAS & TBCs

These items need decisions or investigation before they can be locked:

### 17.1 Category hero gradients ~~(three conflicting sets)~~ -- RESOLVED April 2026
The five main category page hero gradients and accent colours are now locked. See Section 4.4. The `styles.css` `.hero-cat-*` classes are the canonical reference. Homepage section gradients and listing template gradients remain separate and have not been reconciled -- this is still pending for a future design audit pass.

### 17.2 Scored search algorithm
The homepage search uses simple substring matching. A scored version was discussed but status is unclear. Is the scored version in the repo, or still pending?

### 17.3 Homepage nav links vs locked short labels
The current homepage HTML uses full labels (Food & Drink, Things To Do, Accommodation, etc.) not the locked short labels (Home, Info, Community, Stay, Do, Eat, Services, Shop). The nav.js file has the correct short labels. Does the homepage need updating to match, or does it keep its own nav pattern?

### 17.4 `sales/post-call-landing.html`
Referenced in the pricing-master update list but not found in any file structure listing. Has it been renamed, merged, or deleted?

### 17.5 "Trusted since 2005"
Appears in footer and README. Refers to the original Drupal site's domain history. Is this still the tagline to use, or has it changed?

### 17.6 Contact section pattern
`ci-text` flex pattern was locked as correct over `ci-label/ci-value` grid. But both listing templates still use the old grid pattern. Needs updating in templates.

### 17.7 Onboarding folder
`/onboarding/add-menu.html` was mentioned as needing building. Does this folder exist yet, or is it still pending?

### 17.8 Repo folder restructure
Consider: moving root-level pages (homepage.html, search.html, legal.html) into a dedicated folder. Define boundary between "articles" and "community" pages, or merge into a single "pages" folder. This is a major link-breaking change requiring full site-wide URL fix afterwards. Needs a clear decision before executing.

### 17.9 Business model decision
Revenue share with Carwyn (50/50, Carwyn invoices) vs Jay operates independently (full revenue, full cost). Decision pending from task-plan.html.

### 17.10 `sales/post-call-landing.html`
Referenced in pricing-master update list and task-plan. Exists in repo per task-plan (has "Gold Spotlight" naming issues). Not found in file structure listings from session files. Confirm status.

---

## 18. PENDING TASKS (consolidated from all sessions + task-plan.html)

### Critical (before launch)
- [ ] Update `docs/pricing-master.html`: Silver images (logo only), Extra Spotlight price ($199), +gst formatting, Gold images (up to 9 not unlimited)
- [ ] Replace `Project_Memory.rtf` with this document
- [ ] Fix search.html bugs (undefined `ql`, weather widget, duplicate scripts)
- [ ] Rotate Claude API key in `console.anthropic.com`, update in Cloudflare Worker env vars
- [ ] Fix `href="#"` in 20+ subcategory pages (all should point to `/sales/landing.html`)
- [ ] Fix "Gold Spotlight" naming: replace with "Gold Listing" in `sales/list-with-us.html`, `sales/post-call-landing.html`, and anywhere else it appears as a product name
- [ ] Fix menu lightbox crash on PPP and list-with-us pages (change to anchor link as quick fix)
- [ ] Fix menu dietary filters: make dynamic (only show tags in menu data), wire up actual filtering

### High priority (pre-launch)
- [ ] Update `assets/css/styles.css`: Extra Spotlight price comment ($99 > $199), reconcile category hero colours
- [ ] Update `nav-footer-snippet.html`: nested folder paths, short labels, `articles/` > `community/`, add `legal.html`
- [ ] Update `README.md`: index.html description, missing folders, TaurangaNZ URL typo
- [ ] Fix listing template contact pattern: `ci-label/ci-value` grid > `ci-text` flex
- [ ] Site-wide `+gst` > `+gst` find-and-replace
- [ ] Site-wide `articles/` > `community/` link fix
- [ ] Design system audit: Figtree + Playfair Display throughout, no DM Sans/Fraunces remnants
- [ ] Pricing audit: $599 Silver, $1,199 Gold, $199 Menu Add-On, $199 Extra Spotlight across all pages
- [ ] "Claim this listing" CTAs on Gold listings should not show (already paid)
- [ ] Menu Add-On audit: Silver CTA should show purchase option for $199+gst/yr, NOT upgrade-to-Gold prompt
- [ ] Add `legal.html` link to all page footers (do via nav.js rollout)
- [ ] Web3Forms verification
- [ ] Build `sales/list-with-us.html` "best of 4" rebuild
- [ ] Build `/onboarding/add-menu.html`
- [ ] Add social media icon slots to all listings (hidden until URL provided), upload icons to `/assets/sm-icons/`
- [ ] Build live review widgets (Google/TripAdvisor) for listing hero sections
- [ ] Implement automated listing sidebar categories (Gold: main + all subcats, Silver: main + 1 subcat)
- [ ] Build admin new-listing intake form/checklist (collects all required data before build)
- [ ] Site-wide style/layout audit: scan all HTML, upgrade to current design system (width, nav, category colours, sidebar)
- [ ] DNS consolidation session with Carwyn (GitHub CNAME, Brevo auth: DKIM, DMARC, SPF)
- [ ] Activate Stripe: create Silver ($599) and Gold ($1,199) payment links

### Medium priority (post-launch infrastructure)
- [ ] nav.js rollout to all pages (after all content work done)
- [ ] Sales pages rebuild
- [ ] Category pages glow-up (main category pages need updating for new subcat pages)
- [ ] Rename `entertainment.html` > `things-to-do.html` (do last, fix all links)
- [ ] Gallery placeholder tiles retrofit to Gold listings missing them (papamoa-orthodontist confirmed)
- [ ] Homepage: merge real estate content
- [ ] CRM dashboard rebuild (route Google API through Worker)
- [ ] Admin `sales-funnel.html`: fix truncated JS + update copy
- [ ] Fix `docs/crm-sheet-reference.html`: remove Bronze from dropdowns, remove Sub-Pages column
- [ ] Build `sales/spotlight-ads.html` properly (stub exists)
- [ ] Google Analytics + Search Console setup
- [ ] Switch GitHub Pages from "Deploy from branch" to "GitHub Actions"
- [ ] Brevo Day 0/3/6/10 email sequences setup
- [ ] Build search management system (feeder page/portal for updating search index as content grows)
- [ ] Build menu item image system (auto-discover from `images/listings/{slug}/menu/`)
- [ ] Build listing management portal (magic-link per listing for owner updates)
- [ ] Build self-upgrade flow (Silver > Gold, add Menu Add-On, add Extra Spotlights via Stripe)

### Deferred (game plan / future phases)
- [ ] Repo folder restructure (move root pages into folder, define articles vs community, fix all links)
- [ ] Investigate scored search algorithm
- [ ] Fuel Stations page with live AI update (Gaspy NZ API or crowd-source)
- [ ] index.html star persistence upgrade (localStorage > KV)
- [ ] Sub-cat pill auto-discovery (detect new subcat pages, inject pills dynamically)
- [ ] Live Check button for listings (verify hours, rating, address accuracy)
- [ ] PPP BUSINESS object generator (admin page: URL in, paste-ready object out)
- [ ] Mumbai Masala menu test (photo-to-menu pipeline validation)
- [ ] Photo/content upload pipeline test end-to-end
- [ ] Outscraper lead scrape (first 200 Papamoa records)
- [ ] First cold email batch (20 businesses, track opens)
- [ ] Facebook growth (30 posts ready in `sales/facebook-posts.html`, target 500 followers)
- [ ] Named placeholder listings for active outreach targets
- [ ] Upgrade sales email automation (personalise with listing data, dynamic PPP links)
- [ ] 404 page monthly giveaway system (sponsor themes game, provides prize, gets spotlight ad)
- [ ] Investigate 404 engagement impact on SEO/GEO
- [ ] CRM platform decision + setup (Google Sheets + custom dashboard)
- [ ] Update sitemap and task-plan after restructure

### Completed
- [x] Admin password changed
- [x] `community.html` typo fixed (was `comunity.html`)
- [x] `electricians-papamoa.html` and `plumbers-papamoa.html` duplicates deleted
- [x] `categories/health/` folder deleted, moved to `categories/services/`
- [x] `listings/lawn-mowing-papamoa.html` deleted
- [x] 404.html page built (gremlin game with leaderboard)
- [x] Carwyn demo completed

---

*Papamoa.info -- Plain Black Creative -- Consolidated April 9, 2026*
*This document replaces all previous memory files, session exports, and project briefs.*

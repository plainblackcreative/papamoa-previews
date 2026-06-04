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
**Owner/operator:** Jayden Brown (Jay) / PlainBlack
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
| Form endpoint | `pb-forms.jkbrownnz.workers.dev/submit?client=papamoa` |
| Form notifications | `info@plainblackcreative.com` (via Resend) |
| Cloudflare Worker URL | `papamoa-claude-proxy.jkbrownnz.workers.dev` |
| CRM Google Sheet ID | `1X5i40RLF-r-yLRbm_XCgVyzJAkgO_o6whaoCzdC3SiM` |
| CRM lead count | 97 (PPI-001 to PPI-097), next ID: PPI-098 |
| Correct Papamoa coordinates | -37.7167, 176.3167 |

**Email encoding rule:** Use `&#64;` for `@` in all email addresses in HTML to prevent Cloudflare obfuscation.

---

## 3. PRICING (LOCKED)

Source of truth: this document, §3 below. (Earlier `docs/pricing-master.html` was absorbed into this doc on 2026-06-02 and then deleted.)

**The ladder (locked 2026-06-04): Gold | Silver | Bronze.**

| Product | Price | Notes |
|---------|-------|-------|
| Gold Listing | $1,199+gst/yr | 1 logo + up to 9 hero images (gallery). Annual subscription. Top of ladder. |
| Silver Listing | $599+gst/yr | Logo only (1 image). Annual subscription. |
| Bronze (Basic) | **Free** | **Locked 2026-06-04.** Free self-serve listing, auto-publishes *pending admin approval*. **Surfaces as an info-card** on the assigned sub-category page (NOT a dedicated page — Silver/Gold structural difference, locked session 7 extended; see §8.2). **Includes:** business name, category, phone, website link, location/map + a 1-2 line blurb (rendered inline + in the "More info" lightbox). **Excludes** (Silver+ only): your own listing page, logo, photo gallery, editorial write-up, rich schema. The lead-gen tier (card on the page + warm upsell hook). Resolves §17.15. Not the dead $99 Bronze. |
| Spotlight / Ad Spots | Included perk (Phase 1) | **Phase 1:** ad/spotlight slots scattered site-wide are **claimable by any Silver or Gold listing** (no separate charge). The self-serve, duration-based purchase model (1 / 3 / 6 / 12 mo, impressions shown) is a later evolution — see §17.11. |
| Extra Subcategory Spotlight | $199+gst/yr each | Gold only. First Spotlight included with Gold. |
| Featured Agent Position | Bespoke | Not published. Conversation-first. |
| Menu Add-On | — (DEFERRED to Phase 2) | **Menu feature hidden site-wide 2026-06-04** (`e1ba5a0`). Not offered in Phase 1. The Menu Add-On product + the "menu as live demo" pitch below are parked until Phase 2. |

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
- **Single destination (locked 2026-06-04): `sales/list-with-us.html`.** All sales CTAs across the site point here — it's the consolidated tiers/pricing hub (Gold | Silver | Bronze) with the Get-listed form. `landing.html` + `claim.html` were merged into it and deleted (2026-06-04); `why-list.html` is now a lean SEO article linking back here.
- (Legacy: warm/outbound previously used `landing.html?biz=X&cat=Y` — folded into the hub.)

### Sales pitch toolkit (reusable language for list-with-us / landing / PPP / cold outreach)

These were pulled out of the hub triage on 2026-06-02 (see `docs/carwyn-feedback-2026-06-02.md` and the hub items closed in the same pass). Use verbatim where they fit; adapt for tone where they don't.

**Traffic-cascade rationale (Carwyn's own framing, accommodation tier).**
> "Your Spotlight doesn't just sell your rooms. It drives traffic to every other Papamoa.info business, which is why we want the right brands paying for the slot."
*Use:* explaining why accommodation Spotlights are paid not free. Carwyn's intel was 3-4 pages per session, so accommodation listings act as platform value-drivers.

**"We SEO for the category" framing.**
Papamoa.info ranks for category-level queries ("massage Papamoa", "tire repair Papamoa", "best cafe Pāpāmoa"). Listed businesses get the click-through without paying for the SEO themselves. Stronger than generic "we'll help you rank" because it's true and self-evident from the page.

**Orchestrator of every directory.**
Papamoa.info is the front door to every relevant directory, not one of many. Standard offer already includes a free TaurangaNZ.info listing (§3 above). Future enhancement candidate: extend to free bayofplentynz.com listing too (if Catherine channel opens; current intel says BOPNZ listings are free and same-client-on-both is fine). Pitch shape: *"You don't choose between Papamoa.info and the others. You get on Papamoa.info and we get you onto the rest."*

**Menu Add-On as live demo (hospitality vertical only).** *(DEFERRED to Phase 2 — Menu hidden site-wide 2026-06-04. Keep for when the Menu feature returns.)*
Show-don't-tell. The menu function on a Papamoa.info hospo listing is itself the sales demo for two products at once:

1. **Membership** — "the menu alone is worth being on this site"
2. **Standalone build** — "and just by showing you, you want one on yours. I can sort that for you."

Closed loop: prospect joins the directory OR commissions a standalone build. Either is a yes.
- Standalone build price band: **$500–$1k** per build
- Standalone lives on Papamoa.info (not a separate domain)
- Carwyn IP / commission: split, negotiated case by case
- Warmest hospo prospects to demo first: The Wagon, Blackberry Eatery, The Pizza Pundits, Aunty's Fish & Chips, Grill & Green
- Voice: *"I can sort that for you."* Direct, calm, capable. PlainBlack voice.

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
- `.info` span in `--blue` (#00B0F8 — the logo cyan)
- Phone in nav (if shown): `--blue` (#00B0F8), NOT dune
- NOT Figtree for logo. NOT ocean for .info span. No "www" prefix.

### CSS Design Tokens (canonical — re-anchored to the logo 2026-06-04)

> **The logo is the source of truth for brand colour.** These hexes are
> sampled directly from
> `assets/papamoa-info-asset-pack/logo/papamoa-info-logo-transparent-master.png`.
> Blue + green shades only — no brown/beige (Carwyn rule §21).
> **The live `.html`/`.css` files still render the older drifted values**
> (see the migration map) until the site-wide sweep lands.

#### Brand palette (sampled from the logo — canonical)
```css
--blue:        #00B0F8;   /* signature cyan -- ".info" wordmark + koru highlight; primary accent, CTAs, links */
--blue-bright: #00C8F8;   /* lightest koru cyan highlight */
--ocean:       #0F86B9;   /* koru mid-blue -- primary brand mid-tone, gradient mid stop */
--teal-deep:   #004878;   /* koru dark ring -- darkest brand colour; nav bg, headings, hero base */
--green:       #62C000;   /* leaf green -- "pāpāmoa" wordmark; secondary brand accent */
--green-deep:  #4F9E00;   /* wordmark gradient bottom -- darker leaf */
--green-light: #8FDB4D;   /* koru lime highlight -- live indicator, light green accent */
--white:       #FFFFFF;
```
*Hero gradients build from `--navy-fill → --ocean-fill` (blue pages) or
`--green-deep → --green-fill` (green pages); pair with photography per §4.4.*

#### Two-tier application (LOCKED 2026-06-05 per Jay)
**Accents / text / small elements → punchy logo hexes above. Large fills
→ slightly-muted variants below** (saturation ×0.72, lightness +4% off the
logo accent). Same hue, lower intensity, so big nav/hero/section fills
don't read neon.
```css
/* Large-fill tier (backgrounds, hero gradients, full-width bands) */
--blue-fill:   #2FABDD;   /* muted --blue -- large blue fills (≈ today's #359FE8) */
--ocean-fill:  #2B89B2;   /* muted --ocean -- gradient mid fills */
--navy-fill:   #145079;   /* muted --teal-deep -- nav/footer bg, hero base */
--green-fill:  #6CB71E;   /* muted --green -- large green fills/bands */
--bg-cool:     #F2FAFE;   /* cool off-white -- replaces --sand page bg */
```
**Rule of thumb:** `color` / `border` / small SVG `fill` / eyebrow / `h1 em`
/ bullets / button text → accent tier (punchy). `background` /
`background-color` / `linear-gradient()` / full-width band → fill tier (muted).

#### Migration map — current code value → logo target (for the sweep)
The code renders muted/desaturated stand-ins for the logo hues. The sweep
splits each by context (accent vs fill):

| Role | Current in code | ~Occ | → Accent (small) | → Fill (large) |
|---|---|---|---|---|
| Blue | `#359FE8` | 635 | `#00B0F8` | `#2FABDD` |
| Navy / dark | `#243B59` | 607 | `#004878` | `#145079` |
| Ocean mid | `#1B6B7D` + `#2D95C4` | ~698 | `#0F86B9` | `#2B89B2` |
| Green (Do / live) | `#89BE43` | 257 | `#62C000` / `#8FDB4D` | `#6CB71E` |
| Green (dark) | `#1E6B3C` | 191 | `#4F9E00` | `#4F9E00` |
| Sand bg | `#F7F3ED` | 283 | — | `#F2FAFE` (cool off-white) |
| Dune gold | `#C4985A` | 172 | `#62C000` (logo green) | `#6CB71E` |

> ⚠ The previously-documented `--navy #0D2B3E`, `--blue #3AABDE`, and
> `--lime #7DC143` were **never the real code values** (each appears 0–1×
> in `.html`/`.css`) and are removed. The doc now states what the logo
> specifies; the migration map is what's actually in the files today.

#### Warm tones — DEPRECATED (not in the logo)
`--sand*` / `--dune*` are beige/gold tints that appear nowhere in the logo
and violate Carwyn's "blue and green shades only — no brown/beige" rule
(§21, §4.4). Page backgrounds → white or a cool tint; dune/gold secondary
accents → logo green or deep teal. (The **Gold listing tier** swatch is a
separate, intentional UI signal — see Tier colours, keep it.)

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
/* Success/live = logo green family. Success TEXT uses --green-deep (#4F9E00,
   the leaf darkened for AA contrast); --green (#62C000) is the brand leaf above. */
--green-bg:    #ECF7DC;   /* logo-green tint -- success bg (was #E6F4EC) */
--green-pulse: #8FDB4D;   /* live indicator -- logo koru lime (was #7DC143) */
--lime:        #8FDB4D;   /* alias for green-pulse (was #7DC143) */
--red:         #8B2020;   /* error -- functional, kept */
--red-bg:      #FAEAEA;
--amber:       #8A5A00;   /* warning -- functional, kept */
--amber-bg:    #FFF8E6;
--coral:       #E8344A;   /* homepage alert/error -- functional, kept */
```

#### PNF nav/footer system tokens
```css
--pnf-navy:    #004878;   /* logo deep teal -- nav/footer bg (was #0D2B3E; code renders #243B59) */
--pnf-accent:  #00B0F8;   /* logo cyan -- ".info", links (was #3AABDE; code renders #359FE8) */
--pnf-green:   #62C000;   /* logo leaf -- replaces the deprecated --pnf-dune warm gold */
--pnf-white:   #FFFFFF;
--pnf-muted:   rgba(255,255,255,0.45);
--pnf-font:    'Figtree', sans-serif;
--pnf-display: 'Playfair Display', serif;
```
*`--pnf-dune` (#C4985A) is deprecated — warm gold, not in the logo. Footer
columns that used it move to `--pnf-green` or `--pnf-accent`.*

### Homepage variant tokens (intentional, not bugs)
The homepage uses slightly different colour temperatures by design. These are documented as `-alt`, `-mid`, and `--bg` tokens in the stylesheet. The homepage's `--navy-mid: #2B3F5C` and `--gold-alt: #C8962A` are intentional variants, not errors.

> **Logo re-anchor (2026-06-04):** these warm variants reconcile to the
> logo palette in the sweep — `--navy-mid` → a mid teal between `--teal-deep`
> and `--ocean`; `--gold-alt` → drop (warm gold, non-logo). They stay
> documented here only until the site-wide sweep lands.

### Category hero gradients (THREE sets exist -- need reconciling)

**Set 1: Homepage category sections** -- uses one palette
**Set 2: Listing templates (Gold/Silver)** -- uses another palette
**Set 3: styles.css `.hero-cat-*` classes** -- uses a third palette (richest colours)

These three sets need reconciling in a design audit. The styles.css set is the most distinct (e.g., purple for shopping `#3D2B6E`, brown for food `#5C2D1E`).

### 4.4 Category Page Hero Colours (PARTIALLY UNLOCKED 2026-06-02 — see warning)

The five main category pages each had a distinct hero gradient and accent colour, locked April 2026. **Two of them now violate a client-stated brand rule** (Carwyn email, captured in §21):

> *"Can we also stick to the Brand colours Blue, Green shades — Not brown / Beige like the EAT page. Use imagery to differentiate between pages instead of colours."*

> **Logo re-anchor (2026-06-04):** the compliant accents in the table map to
> the logo palette — blue accent → `--blue #00B0F8`, green accent →
> `--green-light #8FDB4D`. The EAT/Shop rework drops brown/orange/gold for
> these. Hexes below are the pre-re-anchor record, cleared in the site-wide sweep.

Status per page:

| Page | Hero gradient | Accent colour | Accent token | Status |
|------|--------------|---------------|-------------|--------|
| **Stay** (Accommodation) | `#0A1A2E → #0D2840 → #142A3A` | #3AABDE | `--blue` | LOCKED — Carwyn-compliant (blue family) |
| **Do** (Activities) | `#0A2215 → #0D3828 → #0F4A30` | #7DC143 | `--lime` | LOCKED — Carwyn-compliant (green family) |
| **Eat** (Food & Drink) | `#1A1208 → #2A2010 → #1A0A08` | #E07830 | `--cat-eat-accent` | **NEEDS REWORK** — browns + orange violate the blue/green rule. Was the page Carwyn called out specifically. |
| **Services** | `#141820 → #1E2535 → #28334A` | #3AABDE | `--blue` | LOCKED — dark charcoal + blue accent, broadly compliant |
| **Shop** | `#1A1408 → #2A1E0C → #3A2810` | #C8962A | `--gold-alt` | **NEEDS REWORK** — browns + gold accent violate the blue/green rule. Same family of palette as EAT. |

**Direction for the rework (per Carwyn):** use **imagery** to differentiate the pages, not colour. The hero treatment for all five should converge on the blue/green palette and lean on photography (beach, food shots, activity shots, services hero photography, shopping district photography) to give each page its identity.

The `assets/css/styles.css` `.hero-cat-*` classes still reflect the original values until the rework lands. Treat the .css as historical until §18 ships the new heroes.

**Accent colour applies to:** eyebrow text, `h1 em` italic, hero bottom bar, see-more button, sidebar bullet `›`, list CTA button. The accent slot stays as a concept; the specific accent token per page is what's being reworked.

---

## 5. TERMINOLOGY (LOCKED)

| Term | Meaning | Rules |
|------|---------|-------|
| Gold Listing | The $1,199+gst/yr tier product | Always "Gold Listing", never "Gold Spotlight" as a tier name |
| Silver Listing | The $599+gst/yr tier product | Always "Silver Listing", never "Silver Spotlight" |
| Spotlight | Ad placements on category/article pages | Separate concept from listing tiers |
| Gold Spotlight | Acceptable shorthand for the Spotlight position feature within Gold | Only in context of the feature, not the tier |
| Bronze | Internal placeholder label | Never mentioned to prospects or shown on public pages |
| PPP | Personalised Preview Page | ~~The sales demo page at `previews/driftwood-cafe.html`~~ **RETIRED 2026-06-04** — see §13 for reasoning. Term no longer in use. |
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
    list-with-us.html          -- Consolidated Gold|Silver|Bronze hub + Get-listed form (single CTA destination)
    menu-addon.html
    why-list.html
    spotlight-ads.html
    post-call-landing.html
    internal/                  -- non-public sales tools (noindex)
      sales-scripts.html
      facebook-posts.html
      follow-up-emails.html    -- Day 0 post-call template + Day 3/6/10 sequence + ROI explainer (merged 2026-06-04)
  previews/                    -- EMPTY (PPP retired 2026-06-04, see §13)
  admin/                       -- 6 internal tool pages
  docs/                        -- 6 HTML + 9 markdown reference docs
  images/
    listings/{slug}/           -- logo.png + hero-1.jpg through hero-9.jpg
  archive/                     -- Superseded pages
```

### Key path rules
- `articles/` folder is EMPTY. Everything moved to `community/`. Any link pointing to `articles/` is broken.
- Categories use nested folders: `categories/food-drink/cafe-papamoa.html`
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

### 8.1 Listing spec (LOCKED 2026-06-04) — canonical build contract for Gold & Silver

The two template files are the **canonical build artifacts**: `listing-gold-template.html`, `listing-silver-template.html`. This spec pins down *what a buyer gets per tier* and *what we collect to build it*. It is the direct input to (a) the sales Get-listed form (`sales/list-with-us.html`) and (b) the Bronze self-serve build. Every built listing must also clear the §10 quality bar and use the §4 design tokens.

#### Required intake data (what we collect)

**Core fields — collected for both Gold and Silver** (ALLCAPS tokens in the template body / `BUSINESS.*` in head):

| Field | Token(s) | Notes |
|---|---|---|
| Business name | `BUSINESS_NAME` / `BUSINESS.name` | Hero + title + schema |
| Slug | `BUSINESS_SLUG` / `BUSINESS.slug` | URL + image folder name |
| Category | `CATEGORY_SLUG` / `BUSINESS.category` | One of: `food-drink` `services` `accommodation` `health` `entertainment` `shopping` `real-estate` `default` (drives hero accent class) |
| Subcategory | `BUSINESS.subcat` | Title + breadcrumb |
| Tagline | `TAGLINE` | Hero |
| Meta description | `BUSINESS.metaDesc` | Specific, not templated (§10) |
| Address | `ADDRESS` | |
| Phone | `PHONE` | Real numbers only; omit `tel:` if unconfirmed (§10) |
| Website | `WEBSITE` | |
| Email | `EMAIL` | Contact (collected; rendered in sidebar) |
| Hours | `HOURS` | |
| Editorial description | `DESCRIPTION` | Third-party editorial voice, specific + honest (§10) |
| Logo | `images/listings/SLUG/logo.png` | 1 image, both tiers |
| Social URLs | `SOCIAL{}` | facebook / instagram / tiktok / youtube / linkedin / twitter — blank = icon hidden |
| Review widgets | `REVIEWS{}` | google + trip: url / rating / count — blank = widget hidden |

**Gold-only extras:**

| Field | Token | Notes |
|---|---|---|
| Photo gallery | `PHOTOS[]` | Logo **+ up to 9 hero images** (`hero-1.jpg`…`hero-9.jpg`) each with alt text |
| FAQ | `BUSINESS.faqs[]` | **Min 4 Q&A pairs**, real search queries — feeds the FAQPage / AEO schema |

**Silver:** logo only (no gallery), **no FAQ section**. `MENU_DATA` / `hasMenu` exist in the template but the **Menu Add-On is deferred to Phase 2** — keep `hasMenu:false`; no menu CTA renders.

**Bronze (free, per §3):** business name + category + phone + website + location/map + a 1–2 line blurb only. **No** logo, gallery, editorial write-up, or rich schema. Built by the Bronze self-serve flow (auto-publish pending admin approval), **not** these templates.

#### Page sections per tier

| Section | Gold | Silver |
|---|---|---|
| Hero (name, tagline, subcat, review widgets) | ✓ | ✓ |
| Photo gallery (up to 9) | ✓ | — (logo only) |
| About / editorial | ✓ | ✓ |
| Hours | ✓ | ✓ |
| Reviews (Google / TripAdvisor badges) | ✓ | ✓ |
| FAQ (AEO) | ✓ | — |
| Sidebar: contact (`ci-text` flex pattern, locked) + map | ✓ | ✓ |

#### Schema per tier
- **Gold:** `LocalBusiness` + `FAQPage` + `ImageObject`.
- **Silver:** `LocalBusiness` only.
- Plus the §10 bar on every build: specific `meta description`, `canonical`, Open Graph tags, correct design tokens (§4), third-party editorial voice, no dummy `tel:` links.

#### Image storage
Repo path now: `/images/listings/SLUG/` (`logo.png`, `hero-1.jpg`…`hero-9.jpg`). Future CDN: `images.papamoa.info/listings/SLUG/` (Cloudflare R2) — find-replace the path prefix site-wide when switching.

#### Tier labels (recap of §8)
Gold = "Gold Listing" star badge · Silver = "Silver Listing" diamond badge · Bronze / placeholder = **no** tier label.

#### Known divergence (not blocking the lock)
The Gold template configures content via ALLCAPS body tokens + `PHOTOS`/`faqs`; Silver via ALLCAPS tokens + a `BUSINESS{}` object. Both share the same core field set above. Unifying them into one shared config object is an **optional later refactor**, explicitly out of scope for this spec lock.

### 8.2 Bronze self-serve auto-create — build architecture (LOCKED 2026-06-04)

**Model: Bronze is a CARD, not a page.** Locked session 7 extended, 2026-06-04. Jay's call.

A visitor creates a free Bronze listing themselves; on operator approval it **surfaces as an info-card** on the assigned sub-category page (rendered by `nav.js` from the worker's `/bronze-public` endpoint). **No `/listings/<slug>.html` page is generated for Bronze.** Silver/Gold remain the only tiers that get their own dedicated listing page; this is the structural ladder difference between them.

#### Why card-not-page (decision rationale)

- **Coherent sales ladder.** Silver/Gold = you HAVE a page on the directory. Bronze = you APPEAR on the directory. Shape change, not tier downgrade. Easier upsell from Bronze to Silver.
- **SEO/AEO safer at scale.** Hundreds of thin auto-generated Bronze pages (5 fields each) is exactly the pattern Google flags as thin-content auto-generation. AI search engines cite the sub-cat page that aggregates many Bronzes ("plumbers in Pāpāmoa") rather than any individual entry. Data enriching existing high-quality pages > new weak pages.
- **Lower maintenance surface.** No `listing-bronze-template.html`, no GitHub-Contents-API commit logic per approval, no `/listings/<slug>.html` URL space, no auto-publish ordering.

#### Architecture

- **Source of truth:** the Google Sheet `Papamoa.info Bronze Listings` (id `11sn0WgZaJwbsEG3Kqjpb-mWmiKkiVQ8LgGw_SAMDIrw`). Columns: `id | ts | status | name | category | subcategory | address | phone | website | email | blurb | slug | url | subcat_path | subcat_name`.
- **Public read:** `/bronze-public?subcat=<cat>/<slug>` (cached, 5min TTL) returns `{ ok, items: [...] }` of live Bronze rows for that sub-cat. Public-safe fields only (name, subcategory, address, phone, website, blurb, slug). Email is never exposed publicly.
- **Card render:** `nav.js` detects sub-cat pages, fetches `/bronze-public`, prepends full info-cards into `.ghost-grid` (name + address pin + blurb + phone/website icon row + "More info →" button). Click "More info" opens a lightbox (modal — same overlay/modal shell as the contact modal) with the full record + a Silver/Gold upsell footer link.
- **Submit flow:** `sales/create-bronze-listing.html` → `/bronze-submit` (public POST, honeypot + per-IP rate-limit + sanitise) → appends pending row to Sheet → emails operator (if `RESEND_API_KEY` set).
- **Moderation:** `admin/bronze-queue.html` → operator assigns Category + Subcategory from A-Z dropdowns → `/bronze-approve` (admin-token-gated) marks the row `live`, writes the chosen category + `subcat_path`/`subcat_name` back to the Sheet, invalidates the `/bronze-public` cache for that sub-cat, and emails the owner the "card is live + upgrade nudge" first touch.

#### Worker routes (`worker.js`, `papamoa-claude-proxy`)

| Route | Method | Auth | Purpose |
|---|---|---|---|
| `/bronze-submit` | POST | public (honeypot + rate-limit) | Append pending row |
| `/bronze-public` | GET | public, cached 5min | Card data per sub-cat |
| `/bronze-list` | GET | `BRONZE_ADMIN_TOKEN` | Admin queue rows |
| `/bronze-approve` | POST | `BRONZE_ADMIN_TOKEN` | Mark live + cache invalidate + welcome email |
| `/bronze-reject` | POST | `BRONZE_ADMIN_TOKEN` | Mark rejected |

#### Secrets (already deployed on `papamoa-claude-proxy`)

- `GOOGLE_SERVICE_ACCOUNT_KEY` — Sheets API (still needed)
- `BRONZE_ADMIN_TOKEN` — admin route auth (still needed)
- `RESEND_API_KEY` — owner welcome email (optional)
- ~~`GITHUB_TOKEN`~~ — **no longer needed.** Worker no longer commits HTML pages. Jay: feel free to revoke the `papamoa-bronze-worker` fine-grained PAT after the next worker deploy.

#### What was deleted (Bronze-as-card pass, session 7 extended)

- `listing-bronze-template.html` (15KB Mustache-style template) — retired.
- `worker.js` helpers `bronzeRender()`, `bronzeB64Utf8()`, `BRONZE_CATEGORY` map — retired.
- `worker.js` `/bronze-approve` GitHub Contents API commit logic — retired.
- BRONZE config: `ghOwner`, `ghRepo`, `ghBranch`, `templateUrl` fields — retired.
- `admin/bronze-queue.html` instruction box "publishes a real static page to /listings/SLUG.html via a commit" → rewritten to reflect the card model.
- `admin/bronze-queue.html` live-row "Live: /listings/X.html →" link → repointed to `/categories/<subcat_path>.html` (where the card now appears).

#### Deploy

The worker source is `worker.js` at the repo root. After this commit, **Jay needs to run `wrangler deploy` from the repo root** to update production. Until that deploy, the deployed worker continues writing pages, so:

- Any Bronze approval that happens between now and deploy will produce a stale `/listings/<slug>.html` page. Fine — these pages are still valid HTML and will resolve. After deploy they stop being generated.
- The new card rendering in `nav.js` works against the existing `/bronze-public` data shape (no breaking changes there), so it ships as soon as Pages rebuilds — no deploy dependency.
- The new `admin/bronze-queue.html` copy is purely descriptive, ships immediately, no deploy dependency.

After Jay deploys: `GITHUB_TOKEN` secret can be revoked, `papamoa-bronze-worker` fine-grained PAT can be deleted in GitHub settings.

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
- DNS records (SPF, DKIM, DMARC): **pending — values below, ready to paste in a single DNS session with Carwyn**

### DNS records to add (single session with Carwyn)

All records below should land in one 15-minute session. Brevo auth can take up to 48 hours to propagate after adding.

| # | Purpose | Type | Name | Value | Notes |
|---|---|---|---|---|---|
| 1 | GitHub Pages preview subdomain | CNAME | `preview` | `plainblackcreative.github.io` | TTL 3600 or Auto |
| 2 | Brevo domain verification | TXT | `@` | `brevo-code:fe02c41a77fa17740f1b2071d2ac3af4` | |
| 3 | DKIM 1 (Brevo email signing) | CNAME | `brevo1._domainkey` | `b1.papamoa-info.dkim.brevo.com` | |
| 4 | DKIM 2 (Brevo email signing) | CNAME | `brevo2._domainkey` | `b2.papamoa-info.dkim.brevo.com` | |
| 5 | DMARC | TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` | |
| 6 | SPF (Gmail + Brevo) | TXT | `@` | `v=spf1 include:_spf.google.com include:spf.brevo.com ~all` | **Only one SPF record allowed on `@`** — if one already exists, merge these `include:` directives into it, don't add a second record |

After the session: verify in Brevo dashboard once propagation completes, then activate sending domain in Brevo. Until then, Day 0/3/6/10 sequences can fire from the Gmail send domain as a stopgap.

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

## 13. PPP (Personalised Preview Page) — RETIRED 2026-06-04 ✅

**Decision:** the entire PPP flow is removed. Jay's call (session 7 extended).

Reasoning:
- Bronze self-serve already covers "try us for free" instantly. PPP duplicated that with a 24-hour SLA and AI-quality risk.
- AI-generated "here's what we wrote about your business" from automated input is high-risk — hallucination, misrepresentation, miscategorisation all land as "this is insulting" not "this is helpful." One viral screenshot of a botched PPP kills the launch.
- Every form submission committed PB to manual fulfillment within 24h. Operational treadmill at any real traffic.
- Doesn't fit the new model cleanly: Bronze = self-serve free, Silver/Gold = paid (built manually by PB per prospect), Spotlight Ad Spot = scarce upsell. PPP had no slot.

**What was deleted:**
- `previews/driftwood-cafe.html` (the PPP master template)
- `sales/list-with-us.html` form section (`#get-found`), `submitForm`, `presetTier`, and warm-deep-link form-prefill JS
- Index dashboard "Previews & PPPs" section block

**What replaced it on `sales/list-with-us.html`:**
- Hero CTA → `Get listed in 2 minutes →` pointing direct to `sales/create-bronze-listing.html` (Bronze self-serve)
- Demo section retained as a static "what each tier looks like" showcase (no `data-biz` placeholders, no PPP framing)
- Silver/Gold tier CTAs → `Talk to us about [tier] →` triggering the contact modal (`pnfOpenContact()`)

**Sales process implications:**
- Cold leads (Bronze): self-serve. Submit Bronze form, auto-publish pending approval.
- Warm leads (Silver/Gold): Jay contacts manually, points them to a real live Gold listing as the demo, builds their listing manually on close.
- Spotlight Ad Spot prospects: discussed on the call, manual fulfillment until §17.11 self-serve flow ships.

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
Gremlin-catching game with 20 gremlins, phase 2 at 10, fairy trap at 18. JSONBin shared leaderboard. Auto-reports broken links to the pb-forms worker. Confetti on win.

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
Two options on the table, decision pending:

- **Option A — Revenue share with Carwyn.** 50/50 split, costs shared, Carwyn invoices the client. Lower risk, shared upside.
- **Option B — Jay operates independently.** Jay owns the directory outright, full revenue, full cost.

The current manual launch gameplan (§19) assumes Option A — Carwyn invoices on each close. Switching to B would push invoicing through PlainBlack and change the customer-facing entity on receipts and footers.

### 17.10 `sales/post-call-landing.html`
Referenced in pricing-master update list and task-plan. Exists in repo per task-plan (has "Gold Spotlight" naming issues). Not found in file structure listings from session files. Confirm status.

### 17.11 Premium Spotlight Ad Spot pricing model
Locked in §3 as POA/TBC — variable by impressions/traffic, not publicly shown. The actual pricing model is unresolved: per-impression, flat monthly, tiered by page traffic, or hybrid. Decision deferred until there's enough live analytics to set a rate. Needs a small dashboard to manage availability + price per slot.

**Direction added 2026-06-03 (Jay):** move to **self-serve, transparent, duration-based** ad spots. Show the available Spotlight / Ad slots site-wide; a visitor clicks a spot to see its **monthly impressions**, then **buys that spot for a fixed duration — 1 / 3 / 6 / 12 months** (via Stripe). This replaces the POA-only framing with a self-purchase flow. Still needs the availability + price/impressions dashboard (ties into §17.12) and live analytics to set per-slot rates.

**Phase 1 scope (locked 2026-06-04):** ad spots are the *only* upsell beyond the tiers in Phase 1, and they are **claimable by any business with a Silver or Gold listing** (a perk of being listed — no separate charge yet). The paid, duration-based self-serve purchase model above is the Phase 2 evolution once analytics exist. So Phase 1 = "claim an open spot if you're Silver/Gold"; Phase 2 = "buy a spot for a set duration."

**Promotion to scarcity product (locked 2026-06-04, session 7 extended — resolves §17.13):** Ad Spots are now **the** scarcity product across the platform. Gold and Silver tiers have no per-sub-cat slot cap (anyone can buy either); the urgency premium ("only one, real impressions, time-bound") sits on ad inventory instead. This makes §17.11 load-bearing for revenue, not a Phase 2 evolution — the availability + impressions dashboard and the duration-based self-serve purchase flow need to land sooner than originally planned. Sales pitch shape: *"Silver gets you listed properly. Gold gets you the full hero treatment. An Ad Spot gets you in front of every visitor on this page."*

### 17.12 CRM / Ad Spot automation platform
Direction is locked: Google Sheets + custom GitHub-hosted dashboard, fed by pb-forms via a `/crm-write` style Worker route (see §18 Medium). Still open: whether the same dashboard runs Premium Ad Spot availability and revenue tracking, or whether ad-spot management gets its own surface. Deferred until §17.11 lands.

### 17.13 Gold Listings — rotation vs fixed top-spot — RESOLVED 2026-06-04 ✅

**Decision: drop scarcity from the tier ladder entirely. Scarcity moves to Ad Spots.** Jay's call (session 7 extended).

The cleaner model:
- **Gold + Silver = product tiers** differentiated by features, content depth, and placement priority *within* a sub-category. Anyone can buy either. No "one per sub-cat" cap. Multiple Golds in the same sub-cat is fine — they all carry the Gold feature set (gallery, FAQ, full editorial, hero treatment) and rank above Silver, which ranks above Bronze.
- **Ad Spots = the scarce product.** Hero Spotlights, sub-cat top-of-page slots, community-page sidebars — these are inventory-limited and duration-bound. The urgency premium ("only one slot, first in wins, real impressions data") lives here, not in Gold/Silver. See §17.11 for the duration-based self-serve model.

Why this works better:
- Sales pitch stays clean: "Silver gets you listed properly with a logo; Gold gets you the full hero treatment, gallery, FAQ; an Ad Spot gets you in front of every visitor."
- Revenue ceiling per sub-cat is uncapped on tiers (more Gold buyers possible) AND on ad spots (limited inventory at premium pricing).
- Lifetime Price Lock stays clean — it's a tier-level guarantee, not a slot-level one.
- Resolves Carwyn's rotation concern without folding to literal rotation. The answer to "should Gold rotate?" becomes "Gold doesn't need to rotate — anyone can buy Gold. The thing you're trying to share with rotation is the Ad Spot, and that's a separate product."

**§3 implications (still to land):**
- Remove "one Gold per sub-cat / first in keeps it" framing wherever it lives in customer-facing copy
- §3 pricing table: Gold and Silver descriptions need to drop scarcity language; Ad Spots need to be repositioned from "Phase 1 perk" to "the scarce product, duration-based purchase"
- §17.11 (Premium Spotlight pricing) becomes the load-bearing piece — the duration-based self-serve model is now the *primary* monetisation mechanism, not a Phase 2 evolution. Needs the availability/impressions dashboard sooner than originally planned.
- Sales scripts + landing copy in `sales/internal/` need a pass to strip scarcity-on-Gold language

**§3 rewrite is a follow-on task** — captured here so the decision is durable; the actual customer-facing copy sweep is queued in §18.

### 17.14 Annual vs monthly billing direction — RESOLVED 2026-06-04 ✅

**Decision: Annual contracts with Stripe instalment plans.** Jay's call (session 7 extended).

Customer can split annual into 4 or 12 monthly instalments under one annual contract. Same commitment, same revenue, same churn dynamics — but the customer hears "yes you can pay monthly" on the call.

Why this beats true monthly billing:
- Annual cadence keeps the Lifetime Price Lock guarantee meaningful (locked at renewal)
- Churn dynamics stay annual-shaped, not monthly-shaped (monthly billing typically drives 3-6mo cancels)
- Carwyn can sell on either cadence: "annual, $599 up-front" or "annual, 12 instalments of $50". Same product
- No §3 pricing rewrite — the price stays $599/yr and $1,199/yr; only the payment cadence varies

**§3 implications:**
- Add "Stripe instalments available (4mo / 12mo)" as a billing-option note under Silver and Gold rows
- No change to the prices themselves
- Sales scripts can lead with either cadence depending on what the prospect needs to hear

**Setup work pending:**
- Configure Stripe instalment plans alongside the annual product
- Update the `STRIPE_SILVER_URL` / `STRIPE_GOLD_URL` checkout flows to surface the instalment option
- Already on §18 high-priority list under "Activate Stripe"

### 17.15 Free Bronze / Basic listings — RESOLVED 2026-06-04 ✅
**Decision: Bronze = Free, locked.** Jay's position carried — the ladder is **Gold | Silver | Bronze** with Bronze a free, self-serve, auto-publish-pending-approval lead-gen tier (now in §3). Still to communicate to Carwyn in the reply (the "no free listings" pushback, framed on lead-gen / SEO / funnel value). Original rationale kept below for the reply.


Jay wants a **free Bronze (Basic) tier** as the bottom of the ladder: **Gold | Silver | Bronze**. Carwyn's brief opposed free listings. Jay's argument: **Bronze is the best lead-gen opportunity** — let site visitors self-create a free Basic listing, which feeds an **automated lead-gen funnel**, and *more listings = more leads, more SEO surface, more visibility* (every free listing surfaces as a card on the sub-cat page enriching that page's content + a warm upsell target for Silver/Gold). *(Note: Bronze model later locked as card-not-page, session 7 extended -- see §8.2 for the SEO/AEO reasoning behind the structural difference.)*

Conflicts to resolve:
- **§3** locked the paid Silver/Gold model and the Dead Offers list killed "Bronze" as a *paid* product. A *free* Bronze is a new, different thing (lead-gen, not revenue) — needs an explicit §3 addition, not just a price.
- **Carwyn** explicitly didn't want free listings. This is a position to make in the reply (data/SEO/funnel argument), respectfully, since he sees himself as the design/commercial authority (§21.4).

Decision pending. If accepted, Bronze becomes the self-serve auto-create tier (see §18 "Listings & sales direction"); AI-generated listings are deferred in favour of visitor self-creation (pending admin approval).

---

## 18. PENDING TASKS (consolidated from all sessions; task-plan.html + pricing-master.html absorbed and deleted 2026-06-02)

### Critical (before launch)
- [ ] **Draft and send the response to Carwyn's feedback email** *after* the demo-site polish is in (homepage simplification, EAT/SHOP hero rework, header redesign, imagery placeholders). Sequencing decided 2026-06-02: ship the visible changes first so the reply leads with proof (*"I heard you, here's what's done"*) rather than promises. Reply still has to answer the 10 operational questions in §21 — the polish is the cover letter, the answers are the body. Source brief: `docs/carwyn-feedback-2026-06-02.md`. Decisions still needed before reply: §17.13 (rotation), §17.14 (monthly billing), plus CMS scope, multi-site cost, AI billing model.
- [ ] Rework EAT and SHOP category page heroes per Carwyn's brand rule (blue/green palette only, imagery-led differentiation). See §4.4 for the unlocked status and direction. Same rework may extend to other category surfaces using the same brown/beige palette.
- [ ] Homepage simplification pass per Carwyn's "KISS" feedback: hide secondary content in dropdowns or "more info" links, reduce the Essential Info block, clearer single primary CTA, beach slideshow / imagery-heavy hero ("the moment people land it shouts Papamoa"), local imagery + news touches. Reference sites Carwyn likes: aucklandnz.com, australia.com Gold Coast guide, visitlondon.com.
- [x] Header redesign per Carwyn: main page tabs more visible, more visual appeal (2026-06-03, session 2). The header/nav is now the locked flat tab bar on every public page via `nav.js` (64px, FB + IG icons, clear active tab, mobile drawer). Satisfies Carwyn req #3. Same lock also unified the mobile menu and footer shell. See `docs/nav-usage.md`.
- [ ] Each page gets imagery placeholders representing what the page is (Activities, Accommodation, etc.) — imagery-led differentiation replaces colour-led differentiation across the category tree.
- [ ] **Footer lock — finish the remaining systems** (session-2 follow-up). The homepage footer shell is now locked onto 120 grid footers (`bffe868`). Still to do: (1) 23 compact (no-grid) footers — some carry page-specific content (e.g. weather page's data attribution), need per-page handling; (2) `site-footer` (38 pages) + other footer systems (36) not yet unified onto `pnf-footer`; (3) the canonical bottom-bar "Sitemap" link points at `index.html` (internal dashboard) — no public sitemap exists, repoint or drop site-wide. See `docs/nav-usage.md` "Footer follow-ups".
- [ ] Replace `Project_Memory.rtf` with this document
- [ ] Rotate Claude API key in `console.anthropic.com`, update in Cloudflare Worker env vars (do after all build work is complete)
- [ ] Fix menu lightbox crash on PPP and list-with-us pages (change to anchor link as quick fix)
- [ ] Fix menu dietary filters: make dynamic (only show tags in menu data), wire up actual filtering

### Listings & sales direction (added 2026-06-03, Jay)

The listing ladder is **Gold | Silver | Bronze**. Near-term focus is Bronze self-serve + locking Gold/Silver; AI-generated listings and Menu are deferred.

- [x] **Lock Gold & Silver listing spec — DONE 2026-06-04 (session 5).** Canonical build contract written at **§8.1** (required intake fields, page sections, schema, and the Gold deltas: photo gallery + AEO FAQ). The two template files are confirmed canonical. Feeds the Get-listed form + the Bronze self-serve build.
- [ ] **Bronze (free Basic) self-serve auto-create** — let a site visitor create a free Bronze listing themselves; it **auto-publishes pending admin approval** (moderation gate). This is the priority listing build. Pairs with the lead-gen funnel below. ✅ Tier locked free 2026-06-04 (§17.15 resolved, §3 updated) — unblocked.
- [ ] **Automated lead-gen funnel off Bronze** — free listing signup → captured lead (CRM) → automated nurture toward Silver/Gold upsell. The "more listings = more leads + SEO + visibility" play. Ties into §18 Medium (CRM, Brevo sequences) and the post-email journey item.
- [ ] **Self-serve Spotlights / Ad Spots** — surface available ad/spotlight slots site-wide; visitor clicks a slot to see its **monthly impressions** and buys it for a **fixed duration (1 / 3 / 6 / 12 months)** via Stripe. See §17.11 for the model + dashboard need.
- [ ] **Audit + consolidate the sales pages** — review all `sales/*` pages, simplify and de-duplicate (likely overlapping content across list-with-us / landing / why-list / spotlight-ads / menu-addon). Goal: fewer, clearer prospect-facing pages aligned to the Gold/Silver/Bronze ladder.
- [ ] *(Deferred)* AI-generated listings — hold all AI auto-generation of listings for now; Bronze visitor self-create (above) is the path instead.
- [x] Menu / Menu Add-On — **hidden site-wide 2026-06-04** (`e1ba5a0`): all visible menu UI removed/CSS-hidden (View-menu buttons, upsells, lightbox, footer/page links), `menu-addon.html` noindexed, feature deferred to Phase 2. Woven "Menu Add-On" copy purged from the sales pages in the session-5 consolidation; **the live Menu feature was then fully stripped** (session 5, 2026-06-04) from `previews/driftwood-cafe.html` (menu demo + overlay + Silver purchase-toggle + its pricing JS) and `sales/post-call-landing.html`, and the `menu-addon.html` upsell links removed/suppressed on `homepage.html` (search index), `listing-silver-template.html`, and 4 listings (pacific-park, papamoa-orthodontist, speedy-screens, tara-road-dental). `sales/menu-addon.html` itself remains as the parked, noindexed Phase-2 product page (linked only from the internal `index.html` dashboard). Phase 2: rebuild/restore the menu feature, or fully strip `menu-addon.html` + the inert lightbox source.

### High priority (pre-launch)

#### Functional fixes + integration tests
- [x] **Spotlight Silver listings — VERIFIED CLICKABLE 2026-06-04 (session 5).** Investigated markup + live preview: Silver listing cards (`.silver-card`) are structurally identical to Gold and fully clickable (business name + "View Listing" both navigate; confirmed by clicking through to the listing + clean hit-test). The reported "not clickable" bug does not reproduce — treated as resolved (likely fixed in the session-2/3 nav/template sweeps). Reopen with a specific page if it recurs.
- [ ] **Form success snap too low on mobile** across the sales-flow funnel (list-with-us, menu-addon, claim, spotlights, landing, PPP). UX bug.
- [ ] **Post-email user journey design.** Today: prospect submits form → email arrives → no defined next step. Decide and build: do they get a preview link? A scheduled PPP send? Open/intent/pay tracking pixels? This is a real funnel-design gap, not just a polish task.
- [ ] **End-to-end integration test.** Run a real Silver listing and a real Gold listing through the full funnel: form submission → listing appears on category + subcategory + search → CRM Sheet captures the lead → confirmation flow. Document what breaks.
- [ ] Add `llms.txt` at the repo root. Plain-text summary of directory purpose/structure for AI crawlers. Small file, real GEO win.
- [ ] **Easter trading hours block is now stale** — remove or update across community pages where it lingers. Same pattern likely on other date-specific content; bundle into a community content sweep.
- [ ] **Add favicon.** Currently no favicon; visible polish gap on every browser tab.
- [ ] External links audit site-wide: all `<a>` to off-site URLs should have `target="_blank" rel="noopener"`.

#### Subcat + landing surface polish
- [ ] **Subcat pages full polish pass:** site-width / CSS / nav / footer consistency match the main 5 category pages, populate each subcat with the real listings it should surface. Currently inconsistent.
- [ ] **Home + Category + Subcategory pages — surface real existing listings on each level.** Landing pages should show concrete listings, not abstract category cards. Proves the directory's value at first glance.

#### Carwyn-question answer prep
- [ ] **CMS plan decision.** Carwyn asked to see the CMS. Either: (a) build a minimal admin (GitHub commits via Cloudflare Worker, gated form), or (b) document the "no CMS, hand-edit + redeploy" flow with screenshots. Decision blocks the Carwyn reply.
- [ ] **Astro migration ownership decision.** Carwyn offered: *"I will process the migration via Astro."* Confirm scope before reply — does PB hand off the static repo for him, does PB do the migration, or hybrid?
- [ ] **One-page hosting + AI cost reassurance sheet** for the Carwyn reply: GitHub Pages free, Cloudflare Worker free at current volume, security/SLA, AI billing model (currently absorbed; flat-per-site if scaled), multi-site rollout cost band.
- [ ] Update `assets/css/styles.css`: Extra Spotlight price comment ($99 > $199), reconcile category hero colours
- [ ] Update `nav-footer-snippet.html`: nested folder paths, short labels, add `legal.html`
- [ ] Update `README.md`: index.html description, missing folders, TaurangaNZ URL typo
- [ ] Fix listing template contact pattern: `ci-label/ci-value` grid > `ci-text` flex
- [ ] Design system audit: Figtree + Playfair Display throughout, no DM Sans/Fraunces remnants
- [ ] Pricing audit: verify Silver $599+gst/yr, Gold $1,199+gst/yr, Menu Add-On $199+gst/yr, Extra Spotlight $199+gst/yr across all pages. Per the pricing-master audit, these files specifically still need a pass:
  - **High priority — prospect-facing:**
    - [ ] `sales/list-with-us.html` — full tier comparison, offer language, pricing table
  - **Medium priority — sales collateral + listing upsells:**
    - [ ] `sales/menu-addon.html` — Menu Add-On pricing and availability by tier
    - [ ] `sales/why-list.html` — editorial with tier references
    - [ ] `sales/internal/follow-up-emails.html` — email sequences with offer language
    - [ ] `sales/internal/sales-scripts.html` — scripts referencing offers and tier structure
    - [ ] `listings/the-wagon-papamoa.html` — tier upsell block
    - [ ] `listings/speedy-screens-papamoa.html` — tier upsell block
    - [ ] `listings/greencut-papamoa.html` — tier comparison block
  - **Lower priority — internal / admin:**
    - [ ] `admin/sales-funnel.html` — funnel steps reference old offer structure
    - [ ] `docs/crm-sheet-reference.html` — may reference old offer structure
    - [ ] `community/fishing.html` — check Spotlight ad upsell language
    - [ ] `community/gardening.html` — check Spotlight ad upsell language
- [ ] "Claim this listing" CTAs on Gold listings should not show (already paid)
- [ ] Menu Add-On audit: Silver CTA should show purchase option for $199+gst/yr, NOT upgrade-to-Gold prompt. While in there, replace placeholder menu content on the demo with a real menu + real images (closer to what a real Silver/Gold customer would see).
- [ ] Add `legal.html` link to remaining page footers (homepage, sales pages, community pages — listings + search done 2026-06-02)
- [ ] Add footer to 3 stub listings (barber-toms, pacific-palms, papamoa-beach-resort) — currently no footer at all
- [ ] Smoke-test pb-forms papamoa client end-to-end (404 bot + sales/contact forms)
- [ ] Build `sales/list-with-us.html` "best of 4" rebuild
- [ ] Build `/onboarding/add-menu.html`
- [ ] Add social media icon slots to all listings (hidden until URL provided), upload icons to `/assets/sm-icons/`
- [ ] Build live review widgets (Google/TripAdvisor) for listing hero sections
- [ ] Implement automated listing sidebar categories (Gold: main + all subcats, Silver: main + 1 subcat)
- [ ] Build admin new-listing intake form/checklist (collects all required data before build)
- [ ] Site-wide style/layout audit: scan all HTML, upgrade to current design system (width, nav, category colours, sidebar)
- [ ] DNS consolidation session with Carwyn (GitHub CNAME, Brevo auth: DKIM, DMARC, SPF)
- [ ] Activate Stripe: create Silver ($599) and Gold ($1,199) payment links (annual + 4mo/12mo instalment variants per §17.14), plus duration-based Spotlight Ad Spot products per §17.11 when that flow lands. Wire CTAs on `sales/list-with-us.html` Silver/Gold tier cards. Also create a `JBTEST` 100%-off coupon code for Jay's end-to-end QA testing without spending real money. (PPP swap requirement removed — PPP retired, see §13.)

### Medium priority (post-launch infrastructure)

#### Carwyn-question follow-through (after the reply lands)
- [ ] Content moderation flow (if/when public submissions are added). Submit-to-queue mechanic, operator notification, approve-before-publish. Not in v1 but Carwyn asked.
- [ ] Stripe expired-CC dunning + manual recovery flow (Carwyn asked how renewals work when a card expires). Stripe default + operator flag on dunning failure.
- [ ] Multi-site rollout templating documentation: clone-repo + brand-swap + redeploy pattern, plus the price band for spinning up a TaurangaNZ.info equivalent (the Carwyn reply needs a number).
- [ ] Build a sample "Ad spot demo article" — a fake article that says *"this is what an ad spot looks like. This one is yours. It got X impressions. CTA → "*. Sales-demo asset that proves the value of every other community page. Ties into §17.11 (Premium Spotlight pricing model still deferred until analytics).

#### Content + structure
- [ ] **Community & Info content audit.** Sweep all 50+ `community/` pages for stale content (Easter hours, dated event references, broken external links, copy that needs refreshing). Surface anything that's gone obviously out of date.
- [ ] Area sub-pages — neighbourhood-level targeting for Papamoa Beach, Papamoa East, Golden Sands. Either as standalone `community/area-*.html` pages or a small `areas/` folder. Helps with hyper-local AI/Google search queries.
- [ ] Editorial guide pages — "Best Cafes in Papamoa", "New Businesses Opening 2026", local guides. Lives in `community/` or a dedicated `guides/` folder. Strong GEO surface for AI citation.
- [ ] FB "Welcome post" pinned to the top of the Papamoa.info Facebook page. Sits alongside the 30 posts already drafted in `sales/internal/facebook-posts.html`.

#### AI / structured data
- [ ] Structured JSON feed / API endpoint AI agents can parse. Cloudflare Worker route returning a clean JSON index of listings + categories + community pages, plus an `/llms.txt`-shaped summary at `/api/structure`.

- [x] nav.js rollout to all pages (2026-06-03, session 2) — done across all 225 public pages; nav.js is now the single locked source for nav + drawer + footer styling + breadcrumb strip + contact modal. See `docs/nav-usage.md`.
- [ ] Sales pages rebuild. Reference for the pricing page layout/comparison pass: `https://devonport.net.au/get-listed` (Carwyn flagged this as a useful structural reference for comparing layout, features and prices when we rebuild the pricing surface)
- [ ] Category pages glow-up (main category pages need updating for new subcat pages)
- [ ] Rename `entertainment.html` > `things-to-do.html` (do last, fix all links)
- [ ] Gallery placeholder tiles retrofit to Gold listings missing them (papamoa-orthodontist confirmed)
- [ ] Homepage: merge real estate content
- [ ] CRM dashboard rebuild (route Google API through Worker). Note: a hardcoded Google API key was previously exposed in `admin/crm-dashboard.html` and revoked — never hardcode, key lives in Worker env vars only.
- [ ] Admin `sales-funnel.html`: fix truncated `updateUI()` function (buttons/navigation broken) + update "What Happens Next" Month 3 copy from "Gold Founding Member two-for-one bonus" to "included free with any paid listing"
- [ ] Fix `docs/crm-sheet-reference.html`: remove Bronze from dropdowns, remove Sub-Pages column
- [ ] Build `sales/spotlight-ads.html` properly (stub exists)
- [ ] Google Analytics + Search Console setup
- [ ] Switch GitHub Pages from "Deploy from branch" to "GitHub Actions" — and add a workflow that auto-regenerates `sitemap.html` on every push to main (scans `.html` files, no more manual sitemap updates)
- [ ] Brevo Day 0/3/6/10 email sequences setup
- [ ] Auto-update homepage hero quick chips from analytics. Currently the 5 chips (Weather, Surf & Tides, What's On, Schools, Rubbish Day) are hardcoded in `homepage.html`. Wire to top-5 most-visited community/info pages: Cloudflare Analytics or a KV-counter on the existing Worker → JSON endpoint (e.g. `/api/top-info-pages`) → small JS rewrites the chip list on load. Keep current 5 as static fallback. Optional: time/season-aware overrides (AIMS Games in September, etc.)
- [ ] Auto-feed homepage News & Events from a single source. The 3 news items and 3 upcoming events on the homepage are currently hand-curated in `homepage.html`, duplicated from `community/news-events.html`. Extract to `data/news-events.json` (or a Worker endpoint), then have both the homepage section and `news-events.html` render from it. Sort by date, slice top 3 for homepage. Regenerate the Event JSON-LD schema in `<head>` from the same source so SEO/GEO data never drifts.
- [ ] Build search management system (feeder page/portal for updating search index as content grows)
- [ ] Build menu item image system (auto-discover from `images/listings/{slug}/menu/`)
- [ ] Build listing management portal (magic-link per listing for owner updates)
- [ ] Build self-upgrade flow (Silver > Gold, add Menu Add-On, add Extra Spotlights via Stripe)

### Deferred (game plan / future phases)
- [ ] Repo folder restructure (move root pages into folder, define articles vs community, fix all links)
- [ ] Investigate scored search algorithm
- [ ] Fuel Stations page with live AI update (Gaspy NZ API or crowd-source via pb-forms + GitHub Actions). Worker route pattern already established from the existing `/fishing-data` endpoint.
- [ ] index.html star persistence upgrade (localStorage > KV)
- [ ] Sub-cat pill auto-discovery (detect new subcat pages, inject pills dynamically). Approach: build step or JS fetch of the sitemap that finds `/categories/FOLDER/` pages and renders the pill list.
- [ ] Live Check button for listings (verify hours, rating, address accuracy). Implementation: Worker route calling Google Places API for ratings/hours, or a Claude prompt against the business website for content drift. Flag listings not verified recently.
- [ ] PPP BUSINESS object generator (admin page: URL in, paste-ready object out)
- [ ] Mumbai Masala menu test (photo-to-menu pipeline validation)
- [ ] Photo/content upload pipeline test end-to-end
- [ ] Outscraper lead scrape (first 200 Papamoa records). Complementary local-directory sources to scrape for business listings as a cross-reference: `https://www.bayofplentynz.com/`, `https://baythrive.nz/`, `https://bizwin.co.nz/tauranga-business-directory/`
- [ ] First cold email batch (20 businesses, track opens)
- [ ] Facebook growth (30 posts ready in `sales/internal/facebook-posts.html`, target 500 followers). Discovery list of existing Pāpāmoa / Mt Maunganui groups + business pages worth joining/engaging: `https://www.facebook.com/search/pages/?q=Papamoa`
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
- [x] Site-wide `articles/` → `community/` link fix (verified 0 matches 2026-06-02)
- [x] All forms migrated Web3Form → pb-forms papamoa client (commit a55df7d, 132 pages)
- [x] Launch-readiness sweep: paths, canonicals, broken links, a11y (commit 34edecf)
- [x] Stub listings noindexed + leaky strategy docs hidden (commit 56983d2)
- [x] Site-wide `+gst` → `+gst` find-and-replace (commit bf73bae + final cleanup of one `+ GST` capital instance 2026-06-02)
- [x] Fix `href="#"` dead CTAs in subcategory pages → `/papamoa-previews/sales/landing.html` with biz slugs where derivable (2026-06-02)
- [x] Fix "Gold Spotlight" as tier-name across sales/admin/community pages — feature-shorthand usage kept per §5 (2026-06-02)
- [x] `search.html`: weather widget routed through Worker, dedupe drawer/modal scripts (broken `<script>` opener removed), Privacy & Terms link added to footer (2026-06-02)
- [x] `search.html` `ql` was never a bug — defined at line 757; entry was stale (verified 2026-06-02)
- [x] `legal.html` link added to all 17 live listing footers (2026-06-02)
- [x] Root-relative path leftovers prefixed (`/assets/css/styles.css` in 5 pages, plus `/admin/` and `/listings/` link refs) (2026-06-02)

---

## 19. LAUNCH PLAN

### Design direction (the hybrid Jay is delivering)

The deliverable is a hybrid of three reference points. None of the three on its own is the answer:

1. **`devonport.net.au`** as a structural model — layout, page count, pricing surface, listing-density patterns. (See `sales/list-with-us.html` rebuild in §18.)
2. **Carwyn's current `papamoa.info`** for the patterns Carwyn is emotionally attached to and wants preserved — brand palette (blue / green / koru), header treatment, the "tourism-friendly" feel.
3. **The papamoa-previews repo** for modern upgrades — schema, AEO FAQ blocks, responsive nav, listing template polish, dashboard.html operator surface.

Carwyn's three named tourism references for visual inspiration:
- https://www.aucklandnz.com/
- https://www.australia.com/en-nz/places/gold-coast-and-surrounds/guide-to-the-gold-coast.html
- https://www.visitlondon.com/

What survives the blend, and what gets dropped, is exactly what Phase B (Carwyn's bar — see project session notes) is for. The reference set is the input; the punch list is the output.

### Deployment & scale roadmap

1. **Ready GitHub site.** Current static site on GitHub Pages — all content and listing pages live at `plainblackcreative.github.io/papamoa-previews/`.
2. **Astro migration.** Rebuild on a custom domain (`papamoa.info`), still hosted on GitHub Pages. Performance + cleaner architecture before any paid acquisition runs.
3. **30-day organic test.** No paid ads, no automated funnel. Let the site index and rank. Measure organic traffic and self-convert rate. This is the window during which the manual gameplan below applies.
4. **Then scale.** Activate Brevo Day 0/3/6/10 sequences, paid ads, Outscraper outreach.

### 30-day manual gameplan

During the organic-test window, conversions are handled by hand — no automated funnel is wired up yet:

- Business finds the site organically and submits via `sales/list-with-us.html`.
- Jay contacts them manually, points them to a real live Gold listing in the repo as the demo (PPP retired per §13), closes the sale.
- Carwyn invoices the client (assumes §17.9 Option A; if Option B is chosen, invoicing routes through PlainBlack instead).
- Facebook: start a Pāpāmoa Community Info group separate from the directory page — articles, events, community content. Drives organic traffic and brand awareness. Proposed URL: `facebook.com/groups/papamoa.info`. 30 posts ready in `sales/internal/facebook-posts.html`.

### What flips the switch from manual to scale

Trigger to leave the 30-day window: enough organic conversion data to know the funnel works without paid inputs. Once Brevo sequences and Outscraper outreach turn on, the manual contact step is replaced by automated PPP send + Brevo Day 0.

---

## 20. PRE-LAUNCH QA

Verify-before-flip checklist. §10 sets the per-page minimum bar at build time. This is the site-wide sweep before public launch.

### Design system
Figtree + Playfair Display everywhere. No DM Sans / Fraunces / Inter / Outfit remnants. CSS variables match `assets/css/styles.css`. Nav logo: Playfair Display bold "Papamoa" in white + `.info` span in `--blue` (#3AABDE).

### Internal links
No `href="#"` remaining (except intentional JS handlers like `svcClear()`). No flat `/slug` paths — all should be `/papamoa-previews/categories/folder/slug.html` for GH Pages or stripped at custom-domain launch. No dead Claim / Advertise / Home links.

### Pricing accuracy
Silver $599+gst/yr. Gold $1,199+gst/yr. Menu Add-On $199+gst/yr (Silver paid add-on, free with Gold). Extra Spotlights $199+gst/yr each (Gold only, first included). No Bronze as a paid product. No sub-pages add-on. All `+gst` lowercase, no space.

### Forms & APIs
Test pb-forms from each active form type on live GitHub Pages: 404 broken-link bot, sales/contact forms (homepage, list-with-us, claim), admin/upload, admin/add-lead. Verify the email lands at `info@plainblackcreative.com` via Resend. Cloudflare Worker: test via PPP search-visibility checker and the fishing page Update button.

### Mobile rendering
Every page tested at 375px. Two-col layouts collapse cleanly. Tables scroll horizontally without breaking layout. No horizontal page overflow. Nav drawer opens, closes, and traps focus correctly.

### SEO basics
Every page has a unique `<title>`. `<meta name="description">` present and not templated. No duplicate H1s. `noindex` only on admin, sales, stub, and internal-doc pages. `sitemap.html` current (per §18, this should be auto-regenerated once GitHub Actions is wired up).

### Editorial voice
Listing copy is third-party: never "we / us / our", always "they / them / call them / visit them". Macron on **Pāpāmoa** in body text. Domain stays **Papamoa.info** (no macron). No em dashes. No "Jayden" or first-person references on public-facing pages.

### Security
Claude API key rotated post-build (see §18 Critical). Admin password changed in `admin/upload.html`. No API keys hardcoded in HTML — all live in Cloudflare Worker env vars only. CRM dashboard Google Sheets calls routed through the Worker, never direct.

---

## 21. CARWYN'S REQUIREMENTS

The client brief, structured. Sourced verbatim from `docs/carwyn-feedback-2026-06-02.md`. When the locked sections of this document conflict with Carwyn's stated direction, the conflict resolves in §17 (Grey Areas) before either side wins — see §17.13 and §17.14 for the two big ones.

### 21.1 Locked design direction (he stated; we accept)

| # | Direction | Reflects in |
|---|---|---|
| 1 | Imagery first — a lot more of it. Placeholders representing what each page is (Activities, Accommodation, etc.) | §18 Critical Carwyn-driven implementation block |
| 2 | Hero slideshow / beach imagery on homepage. "Shouts Papamoa" the moment you land | §18 Critical |
| 3 | Header visual lift — main page tabs more visible, more visual appeal | §18 Critical |
| 4 | KISS homepage — clear single CTA, hide secondary content in dropdowns or "more info" links | §18 Critical |
| 5 | Local touch on homepage — local images, local news stories | §18 Critical |
| 6 | Balance info + imagery on every page | §18 Critical (homepage) + §18 Medium (subcat polish) |
| 7 | **Blue and green shades only.** No brown / beige. | §4.4 (EAT + SHOP unlocked) |
| 8 | Use imagery to differentiate pages, not colour | §4.4 + §18 Critical |
| 9 | Essential Info block on homepage is too busy — trim or move | §18 Critical |

### 21.2 Reference set (sites Carwyn wants the deliverable to feel like)

- https://www.aucklandnz.com/
- https://www.australia.com/en-nz/places/gold-coast-and-surrounds/guide-to-the-gold-coast.html
- https://www.visitlondon.com/
- https://devonport.net.au/ (Jay's structural reference, surfaced separately; consistent direction)

All four are tourism / destination-style local sites: photo-heavy heroes, simple primary navigation, light secondary content, strong sense of place. The deliverable should feel like that family of site, not like a transactional yellow-pages directory.

### 21.3 Open questions PB needs a position on before reply

Each of these blocks the reply. Detailed notes for answering them live in `docs/carwyn-feedback-2026-06-02.md` and the §17 grey areas; this is the index.

| # | Question | Where the answer lives |
|---|---|---|
| 1 | Can we see the CMS? How do we manage / update pages? | §18 Critical: CMS plan decision |
| 2 | I will process the migration via Astro? | §18 Critical: Astro migration ownership decision |
| 3 | What does monthly hosting cost? | §18 Critical: hosting + AI cost reassurance sheet |
| 4 | How secure / reliable is the hosting platform? | Same one-pager |
| 5 | What does the AI model cost? Monthly / per sale / annual? | Same one-pager |
| 6 | How does it work if we want another site in another town or city? | §18 Medium: multi-site rollout templating |
| 7 | Who monitors / approves public-submitted content? | §18 Medium: content moderation flow |
| 8 | How do renewals work when a CC has expired? | §18 Medium: Stripe expired-CC dunning |
| 9 | Monthly payment options for businesses that can't afford up-front? | §17.14 (decision pending) |
| 10 | Should Gold Listings rotate randomly between multiple buyers per slot? | §17.13 (decision pending — major scope shift) |

### 21.4 Strategic signals to read into the reply

- He still expects **direct sales** to businesses (cold outreach), not pure organic. The 30-day organic test in §19 is still valid as a measurement window, but the answer to "how do we get sales" stays "we sell to them" not "we wait for them to come."
- **Self-signup is a bonus** if social marketing brings prospects in, not the primary funnel.
- He sees **himself as the design authority** — *"Designers are always going to disagree on certain things."* Meet that respectfully in the reply. Don't argue brand direction; explain trade-offs where we'd diverge.
- He runs **Dot Info Marketing Ltd** — a full marketing services agency. The reply's bar is set by who he is, not by the size of the project.

---

*Papamoa.info -- PlainBlack -- Consolidated April 9, 2026 -- Last updated 2026-06-02*
*This document replaces all previous memory files, session exports, and project briefs.*

# Pāpāmoa.info — Polish & Perfection Audit

**Session:** audit only (no edits). Fixes deploy in a separate pass next session.
**Date:** 2026-06-05
**Method:** Live local preview (`papamoa-static`, port 8766) served via the `papamoa-previews/` symlink so URLs mirror production. Per page: desktop + mobile render, console/network errors, broken-image/link scan, brand-palette + 15px-font-floor check, heading outline, SEO/meta, accessibility.

**Severity key:** 🔴 must-fix · 🟠 should-fix · 🟡 polish/nice-to-have · 🟢 already good

**Scope — 9 pages:**
1. `homepage.html` ← audited + Phase 1 DEPLOYED
2. `community/essential-info.html` ← audited
3. `community/community.html` ← audited
4. `categories/accommodation/accommodation.html`
5. `categories/activities/entertainment.html`
6. `categories/food-drink/food-and-drink.html`
7. `categories/services/services.html`
8. `categories/shops/shopping.html`
9. `sales/list-with-us.html` ← audited + DEPLOYED

---

## Page 1 — `homepage.html`

**Verdict:** Strong, near-ship-ready. Clean technical baseline; issues are accessibility + SEO polish, not breakage.

> **✅ PHASE 1 DEPLOYED — 2026-06-05.** C1–C7 implemented in `homepage.html` + `nav.js` (C5 site-wide), OG image asset created, verified in live preview (no console/network errors), committed + pushed to `main`. **C8** verified across all 4 hero crops on mobile — existing scrim adequate, **no change needed**. Phase 2 redesign brief remains deferred.

### 🟢 Already good
- No console errors, no failed network requests.
- 0 broken images, 0 images missing `alt`, 0 empty/`#` links (89 links total).
- 0 text nodes below the 15px floor; no horizontal overflow at desktop **or** 375px mobile.
- Single, correct `<h1>`; logical heading outline (H1 → H2 sections → H3 cards/items).
- Rich JSON-LD already present: WebSite, WebPage, Organization, **FAQPage**, ItemList ×3.
- Contact form is well-built: posts to the Cloudflare Worker proxy via `pnfSubmitContact()`, has a `botcheck` honeypot, correct `required` + `type=email`, enquiry-type select.
- `<meta name=description>`, `og:title`, canonical (`https://papamoa.info/`), viewport all present.
- Brand palette is consistent (nav navy, green CTAs/links). Mobile nav collapses to a hamburger correctly.

### 🟠 Should-fix
1. **Contact-form inputs have no programmatic labels.** name / email / enquiry_type / message rely on placeholders only — no `<label for>`, no wrapping `<label>`, no `aria-label`. Fails WCAG 1.3.1 / 4.1.2; placeholder text also vanishes on focus. *Fix: add associated `<label>`s (visually-hidden if the design wants placeholder look) in nav.js modal markup.*
2. **`og:image` missing** (and likely `og:description`, `og:url`, `twitter:card`). Social/link-unfurl shares of the homepage will have no preview image. *Fix: add an OG image (e.g. the hero) + Twitter card tags.*

### 🟡 Polish
3. **Featured-card overlay legibility varies by photo.** All three "Featured local businesses" cards use a `rgba(255,255,255,0.78)` text box. Over cool images (Tara Road Dental, Karaka Pines) it reads crisp; over the vivid warm burger photo (The Wagon) the box tints and text contrast drops. *Fix: raise overlay opacity (~0.92) or move text to a solid card body below the image for uniform legibility.*
4. **Hero headline contrast relies on `text-shadow`, not a scrim.** H1 is white `#fff` with a navy `text-shadow`. Fine over the darker desktop dune crop; over the brighter mobile sunset crop ("from the locals who") it's marginal. *Fix: add a subtle dark gradient overlay on the hero image so contrast is guaranteed regardless of crop.*
5. **Content freshness vs. the "kept current" promise.** "Latest local updates" newest item is APR 2026 (today is JUN 2026) — 2 months stale on a page that markets itself as current. *Content task, not code: refresh before/at launch.*

### ✅ Confirmed changes (from user notes — to build next session)

**C1 — Hero H1: accent the word "Pāpāmoa" in deep green.**
- **File:** `homepage.html`
- **HTML (line ~720):** `<h1>Discover <em>Pāpāmoa</em>,<br>from the locals who know it</h1>` (wrap only the word, not the comma).
- **CSS (next to `.hero-v2 h1`):** `.hero-v2 h1 em { color:var(--blue); font-style:normal; }` — **revised 2026-06-05: green → `--blue` `#00B0F8` (the logo's ".info" blue, sampled from the wordmark PNG) per user; shipped "as-is" without a scrim boost.**
- **Rationale:** reuses the established site-wide heading-accent pattern (`<em>` → `--green-deep` `#5B9230`, non-italic, bold). Inherits the H1's `font-weight:700` + `text-shadow`, so legibility over the photo is preserved.
- **Companion (recommended, ties to polish #4):** add a subtle dark gradient scrim to the hero so the green word stays legible over the brighter **mobile** sunset crop. *Optional — confirm if wanted.*
- **Acceptance:** only "Pāpāmoa" renders green; rest of H1 stays white; legible at desktop and 375px. Verified via temporary live preview — reads well on the desktop crop.

**C2 — Hero quick-chips: balance the row to the search-bar width (add a 6th chip).**
- **File:** `homepage.html`
- **Root cause:** `.hero-v2-chips` (line 363) is capped at `max-width:680px` while `.hero-v2-search` (line 352) is `max-width:780px` — the chip row can never reach the bar's right edge (last chip stops 143px short).
- **CSS (line 363):** change `.hero-v2-chips { ... max-width:680px; }` → `max-width:780px` (match the search bar). *Required* — otherwise a 6th chip wraps to a 2nd line.
- **HTML:** add a 6th chip after the "Rubbish Day" `<a>` inside `#hero-quick-chips`:
  ```html
  <a href="/papamoa-previews/community/dogs-papamoa.html" class="hero-v2-chip"><span class="hero-v2-chip-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="4" r="2"></circle><circle cx="18" cy="8" r="2"></circle><circle cx="20" cy="16" r="2"></circle><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"></path></svg></span>Dogs</a>
  ```
- **Why "Dogs" (SEO/AEO rationale):** highest local search demand of the candidates ("can dogs go on Pāpāmoa beach", "papamoa dog rules"); the most *factual* answer-engine question (definitive seasonal-ban/zone answer that councils explain poorly → high AI-citation potential); low competition; no overlap with existing chips. Backed by existing `community/dogs-papamoa.html`.
- **Layout mechanic:** keep left-aligned (flex `flex-wrap:wrap`), NOT `justify-content:space-between` (which distributes awkwardly when the row wraps on mobile).
- **Acceptance:** 6 chips on one line at desktop; row's right edge within ~50px of the search bar's right edge; wraps cleanly on 375px mobile; "Dogs" → `dogs-papamoa.html`; paw icon renders. Verified via temporary live preview (gap 143px → 49px, no wrap).
- **Dependency/note:** the chip sends homepage link-equity to `dogs-papamoa.html` — make sure that page is strong (title/H1/structured Q&A) to actually win the SEO/AEO benefit. (Out of current 9-page scope; flag for a later page pass.)

**C3 — "What's happening" section: remove duplicate links to `news-events.html`, deep-link the cards.**
- **File:** `homepage.html`
- **Problem:** 3 links all resolved to `news-events.html`. The page is tabbed (`#tab-upcoming`, `#tab-recurring`, `#tab-news`, `#tab-submit`); the section-header link and the events-card link both dumped on the default (Upcoming) tab — true duplication.
- **Changes:**
  1. **Delete line 892** — the section-header link `<a href="/papamoa-previews/community/news-events.html" class="wh-more">Full news &amp; events calendar →</a>`.
  2. **Line 932** — events card: `href="…/news-events.html"` → `href="…/news-events.html#tab-upcoming"` ("Full calendar →").
  3. **Line 901** — news card "All news →" already `#tab-news`; leave as-is.
- **Result:** two links, two distinct tab destinations, each contextual to its card.
- **Layout:** `.wh-head` (line 499) is `display:flex; justify-content:space-between`; removing the link leaves the H2 alone → left-aligns cleanly, no breakage.
- **Do NOT touch** the other `.wh-more` at line 864 ("Read more about Pāpāmoa →" → population-statistics.html) — different section.
- **Acceptance:** header shows only the H2; events card link lands on the Upcoming tab; news card link lands on the News tab.

**C4 — Footer "For Businesses" column: remove duplicate links (4 clean items).**
- **File:** `homepage.html` (footer markup is intentionally inline per-page; `nav.js` owns only the footer CSS — see nav.js lines 19–20).
- **Replace lines 1054–1058** (current 5 items, 2 dupes):
  ```html
  <li><a href="/papamoa-previews/sales/list-with-us.html">List Your Business</a></li>
  <li><a href="/papamoa-previews/sales/spotlight-ads.html">Advertise</a></li>
  <li><a href="/papamoa-previews/sales/spotlight-ads.html">Spotlight Options</a></li>
  <li><a href="/papamoa-previews/sales/list-with-us.html">Update a Listing</a></li>
  <li><button onclick="pnfOpenContact()">Contact</button></li>
  ```
  **with (4 distinct items):**
  ```html
  <li><a href="/papamoa-previews/sales/list-with-us.html">List Your Business</a></li>
  <li><a href="/papamoa-previews/sales/why-list.html">Why List?</a></li>
  <li><a href="/papamoa-previews/sales/spotlight-ads.html">Advertise</a></li>
  <li><button onclick="pnfOpenContact()">Contact</button></li>
  ```
- **Rationale:** "Advertise" + "Spotlight Options" were the same product/page → merged to one ("Advertise"; "Spotlight Options" is internal jargon). "Update a Listing" sent existing customers to the *sales* page → folded into Contact (whose enquiry-type dropdown covers listing updates). Surfaces `why-list.html`, previously unlinked here. Order = funnel logic (list → why → upsell → contact).
- **Acceptance:** 4 list items, every destination unique; no visual regression in the footer grid.
- **⚠ Cross-page note (not homepage scope):** the **"Update a Listing" → `list-with-us.html`** dupe is repeated on **14 pages** site-wide (copy-paste boilerplate); "Spotlight Options" is homepage-only. Recommend applying the same de-dup to those 14 footers — handle in their page passes or as a one-shot global footer cleanup. *Decision deferred.*

**C5 — Associate the existing contact-form labels (a11y). [shared — fixes all pages]**
- **File:** `nav.js` (contact modal, lines ~457–472). Labels already exist but are unlinked siblings (`<div><label>Your name *</label><input name="name" …></div>`) → screen readers don't associate them.
- **Fix:** add `for`/`id` pairs (lowest layout risk, no visual change):
  - name → `<label for="pnf-name">` + `<input id="pnf-name" …>`
  - email → `<label for="pnf-email">` + `<input id="pnf-email" …>`
  - enquiry → `<label for="pnf-enquiry-type">` (select already has `id="pnf-enquiry-type"`)
  - message → `<label for="pnf-message">` + `<textarea id="pnf-message" …>`
- **Acceptance:** clicking each label focuses its field; SR announces the label. No visual change. **Bonus:** fixes the contact form site-wide.

**C6 — Add `og:image` + `twitter:image`; upgrade Twitter card.**
- **File:** `homepage.html` `<head>` (lines 702–709 already have og:type/url/title/description/site_name + twitter:card/title/description). **Missing:** `og:image`, `twitter:image`; card is small `summary`.
- **Fix:** add `og:image` (+ `og:image:width` 1200 / `og:image:height` 630 / `og:image:alt`) and `twitter:image`; change line 707 `twitter:card` `summary` → `summary_large_image`.
- **Asset dependency:** needs a 1200×630 **JPG/PNG** social card (WebP isn't reliably unfurled by all crawlers). Derive from the hero (`images/hero/papamoa-hero-afternoon.webp`) → export `images/og/papamoa-home-1200x630.jpg`. Use absolute URL `https://papamoa.info/…`.
- **Acceptance:** validate in a link-preview debugger (LinkedIn/Slack/X) → large hero image card.

**C7 — Featured-card overlay opacity (legibility).**
- **File:** `homepage.html` line 438, `.flb-card-body`.
- **Fix:** `background:rgba(255,255,255,0.78)` → `rgba(255,255,255,0.92)` (keep `backdrop-filter:blur(14px) saturate(140%)`).
- **Why:** at 0.78 the vivid burger photo tints the box; 0.92 keeps the frosted look but guarantees AA text contrast over any photo.
- **Acceptance:** body text ≥ AA over all three featured photos incl. The Wagon.

**C8 — Hero scrim: verify on mobile, bump only if needed (conditional).**
- **File:** `homepage.html`. A scrim **already exists** — `.hero-v2-bg::after` (line 349): `linear-gradient(100deg,rgba(13,30,48,0.78)…rgba(...,0) 72%)` — darkest top-left where the headline/green word sit; effective on desktop.
- **Action:** QA the green "Pāpāmoa" (C1) + headline at **375px** across all 4 hero images (morning/afternoon/evening/rain). If any fail AA, add a mobile media-query bump (e.g. under 768px prepend a top-down component `linear-gradient(180deg,rgba(13,30,48,0.45),rgba(13,30,48,0) 55%)`). Only if needed.
- **Acceptance:** green accent + headline ≥ AA at 375px on every hero variant.

---

## Phase 2 — Homepage redesign brief (deferred, from Carwyn I-54)
Bigger design-direction asks — **out of the Phase-1 lock-in**, for a future session:
- **Imagery-forward:** per-page representative/placeholder images (Activities, Accommodation, …); richer category + news-row imagery. *Note:* the hero **already rotates by time-of-day + weather** (`papamoa-hero-morning/afternoon/evening/rain.webp`) — "slideshow" is partly built; decide whether to extend to a true multi-slide carousel.
- **Reduce density / KISS:** fewer top-level options on the homepage; move secondary content into dropdowns / "more info" links; let the primary path (search + top categories) POP; sharpen a single primary CTA.
- **Header (nav.js, site-wide):** clearer main tabs + more visual appeal (cf. project item "Fix nav.js etc issue").
- **"Imagery differentiates pages, not colour."**
- **Reference sites:** aucklandnz.com, sunshinecoast.com, visitnoosa.com.au.

---

### 📋 Stakeholder feedback — P-5 / item I-54 (Carwyn Evans, Dot Info Marketing) — reference, dated ~23 May
Homepage-relevant points (verbatim-ish), each mapped to status:
- "a lot more imagery… placeholders that represent what each page is (Activities, Accommodation)… a Home page slide show that shows the beach the moment people land — it shouts Pāpāmoa." → **larger design follow-up** (hero slideshow + per-page imagery).
- "The header needs to be easier to see the main page tabs and have more visual appeal." → **nav.js / header** (shared, site-wide; cf. project item "Fix nav.js etc issue").
- "Home needs call to actions and not so busy so users know where to start." → **larger: reduce homepage density + sharpen primary CTA.**
- "local touch on the home page with images, local news stories" → **partially done** (What's happening / Pāpāmoa at a glance); could add imagery to news rows.
- "current home page is very busy… hide in dropdowns/more-info links… show less options so the main info can POP." → **larger: density reduction.**
- "stick to Brand colours Blue, Green shades — NOT brown/beige like the EAT page." → **already addressed** by recent palette commits (warm/off-palette → logo blue/green; EAT brown CTA bands → navy). Homepage palette verified navy/green in this audit. (Re-verify EAT page on Page 6.)
- "Use imagery to differentiate between pages instead of colours." → ties to imagery follow-up.
- Reference sites cited: aucklandnz.com, sunshinecoast.com, visitnoosa.com.au (image-rich destination sites).
- Non-design questions (out of homepage scope, for Jayden): CMS/edit access, hosting cost & reliability, AI-model pricing per site, content moderation/approval, expired-card renewals, monthly payment options, GOLD-listing rotation.

GEO artefact (item #1, HIGH): declarative-question headers + structured entity facts as the skeleton for Gold/Spotlight listing rewrites — confirms the site's AEO strategy (validates the homepage FAQ/JSON-LD approach and the Dogs-chip AEO rationale in C2).

### Notes / open questions for the user
- Confirm the contact form's Worker proxy endpoint (`papamoa-claude-proxy.jkbrownnz.workers.dev`) is the intended production endpoint.
- "Own a Pāpāmoa business?" CTA card sits inside the Featured grid — intentional placement? Reads fine, just semantically a CTA among listings.

---

## Page 2 — `community/essential-info.html` ← AUDITED 2026-06-05

**Verdict:** Clean and well-organised visually, but **structurally hollow** — a 29-card, 2559px page with almost no heading outline, and missing the SEO basics the homepage has. Carwyn's "too busy" is partly a *structure* problem (no real section headings to chunk it).

> **✅ DEPLOYED — 2026-06-05.** Per user notes: hero BG now uses `assets/essential-info-hero.webp` (optimised from the 2.5 MB `essential-info-hero.png` → 226 KB) with a green overlay for text contrast; OG/Twitter tags added using `assets/essential-info-og.jpeg`; `canonical` added; JSON-LD added (BreadcrumbList + CollectionPage→ItemList of 28 guides); the 4 `pg-section-label` divs → `<h2>` (and the 1 on `community.html`). Verified in preview (no console/network errors, valid JSON-LD, headings H1→4×H2, hero legible desktop+mobile). 🟡 #5 (card density/imagery) remains a Phase-2 item.

### 🟢 Already good
- No console/network errors; 0 broken images, 0 missing `alt`, 0 empty links (of 80), 0 sub-15px text; no horizontal overflow desktop **or** 375px mobile.
- Single correct `<h1>`; clean breadcrumb (Home / Essential Info); good `meta description`.
- Content logically grouped into labelled card groups; mobile stacks to one column cleanly.

### 🔴 Should-fix (structure/SEO)
1. **Section labels are non-semantic `<div class="pg-section-label">`, not headings.** Group titles — BEACH & OUTDOORS, HEALTH SAFETY & SERVICES, PROPERTY & SHOPPING, GETTING AROUND & NEARBY, ALSO IN THE DIRECTORY — are divs. The only content heading is a stray `<h3>Community</h3>`. So the page is H1 + (effectively) nothing. *Fix: convert `.pg-section-label` group titles to `<h2>` (move the class onto `<h2>`, keep the uppercase styling). Helps SEO outline, screen-reader heading nav, AND scannability.* **Scope: same `pg-section-label` div pattern is on `community.html` (Page 3) — fix both with one change. `pg-section-label` is always a `<div>`, never used on the category pages.**
2. **No `<link rel="canonical">`** (homepage has one). *Add `https://papamoa.info/community/essential-info.html` — confirm production canonical form.*
3. **No JSON-LD** (homepage ships rich structured data). *Add `BreadcrumbList` (Home → Essential Info) + an `ItemList` of the info categories (or `CollectionPage`). High AEO value for an info hub.*
4. **No `og:image` / OG tags.** *Add OG + Twitter image (reuse homepage 1200×630 card or page-specific), same pattern as homepage C6.*

### 🟡 Polish / Phase 2 (Carwyn "too busy" + "use imagery")
5. **29 visually-identical text cards** = dense. The heading fix (#1) chunks it structurally; beyond that, imagery/visual differentiation or collapsing low-traffic groups is a Phase-2 design call. Only 3 images on the whole page.

### Notes / open questions
- Confirm the canonical URL form for community pages (`papamoa.info/community/...` vs github.io demo path).
- "ALSO IN THE DIRECTORY → Community" is the only cross-sell; could surface more sibling hubs.

---

## Page 3 — `community/community.html` ← AUDITED 2026-06-05

**Verdict:** In good shape already — the strongest baseline of the three so far. Proper heading outline, canonical, and JSON-LD (incl. FAQPage) are all present. Main gaps mirror the prepped assets: no hero image, no `og:image`.

> **✅ DEPLOYED — 2026-06-05.** Hero BG → `assets/community-hero.webp` (2.95 MB PNG → 220 KB) with navy overlay; `og:image`/`twitter:image` added + `summary_large_image` → `assets/community-og-1200x630.jpg` (**user re-exporting the designed card at 1200×630**); BreadcrumbList already existed (no change). **Bonus fix:** `.con-card { min-width:0 }` resolves a pre-existing mobile grid blowout (Key Contacts overflowed ~47px at 375px). Verified: no console/network errors, no overflow desktop/mobile, hero legible. ⏳ Pending: drop the 1200×630 OG export at `assets/community-og-1200x630.jpg`.
>
> **Spotlight-card polish (user notes, 2026-06-05):** hid the dev URL paths (`.hub-path { display:none }`); made the 4 card icons white (`.old-hub-top { color:#fff }` — `.pnf-i` uses `stroke:currentColor`); recoloured the "Community Groups & Volunteering" card header from green → blue (`#145079,#0F86B9`) to match Police & Emergency. (Note: Neighbourhood Support card uses a very slightly different blue `#1a3a50,#2a6a96` — left as-is; offer to unify.)
>
> **White icons (round 2) + OG done (2026-06-05):** also whited the **Key Contacts** (`.con-icon`) and **emergency strip** (`.e-icon`) icons — they inherited dark `--body` on navy. ✅ **OG resolved:** user re-exported the card at 1200×630; converted to optimised JPEG `assets/community-og-1200x630.jpg` (1.5 MB PNG → 275 KB) — matches the deployed og/twitter tags. Page 3 fully done.

### 🟢 Already good
- No console/network errors; 0 broken images, 0 missing `alt`, 0 empty links (of 83), 0 sub-15px text; no horizontal overflow.
- Single `<h1>`; **strong heading outline** — H1 → H2 Key Contacts → H2 People & Safety (now `<h2>`) → H2 Safety & Support Spotlight Pages (H3 children) → H2 Common Questions (FAQ) → H3 Essential Info. Already navigable.
- **`canonical` present** (`…/community/community.html`); good `meta description`.
- **JSON-LD present**: `WebPage` + `FAQPage`.

### 🟠 Should-fix (matches prepped assets)
1. **Hero is still the navy gradient** (`.hub-hero` line 29: `linear-gradient(135deg,#1B3A5C,#2B4F70)`). *Swap to `assets/community-hero.png` (2.95 MB → encoded WebP **220 KB** at `assets/community-hero.webp`) with a navy overlay for white-text contrast — same treatment as essential-info.*
2. **`og:image` / `twitter:image` missing**, and `twitter:card` is the small `summary` (line 240). *Add image tags using the prepped OG asset + upgrade to `summary_large_image`.*
   - ⚠ **OG asset caveat:** `assets/community-og.png` is **1359×1158 (~1.17:1, near-square) and 2.68 MB**. For `summary_large_image` (wants ~1.91:1) it'll be **center-cropped** on most platforms, and 2.68 MB is heavy. *Decision needed (see below).*

### 🟡 Polish / Phase 2
3. **No `BreadcrumbList` in JSON-LD** (essential-info now has one). *Optional: add `BreadcrumbList` (Home → Community) to match.*
4. Long page (4705px) but well-structured; sparse imagery (3 images) — Phase-2 imagery is a general theme.

---

## Cross-page tasks (user notes, 2026-06-05)

**Task 1 — Homepage footer:** "Dogs in Pāpāmoa" → "News & Events" (`news-events.html`) in the Local Info column. ✅ deployed (batch 1).

**Task 2 — Uniform nav & footer (9 pages):**
- **Nav:** already uniform (all 9 driven by `nav.js`, `data-nav="default"`, no hardcoded nav). No change needed.
- **Footer:** standardised to a **uniform shell + page-specific columns**. Canonical shell = brand block + [page col 1] + [page col 2] + **For Businesses** (List Your Business · Why List? · Advertise · Contact) + **About Papamoa.info** (Editorial Policy · Privacy · Terms · TaurangaNZ.info) + bottom bar (© · Privacy · Terms · Editorial Policy).
  - Homepage: already canonical (reference).
  - essential-info + community: split the crammed "For Businesses"+"Network" column into For Businesses + About. ✅ batch 1.
  - 5 category pages (accommodation, entertainment, food-drink, services, shops): standardised For Businesses + replaced/added About; **dropped the redundant "Browse Directory" cross-links** (Do/Eat/Services/Shop still in the top nav) per user OK. Each keeps its 2 category sub-category columns (SEO). ✅ batch 2.
  - **`list-with-us`: kept its deliberate SLIM footer** (sales-page conversion pattern) per user decision — NOT converted to the full footer.
- Verified: grids fill `2fr 1fr 1fr 1fr 1fr`, no console errors, no overflow.

**Task 3 — Community hero:** removed the redundant safety/crime/tsunami paragraph (already covered more thoroughly by the page FAQs + FAQPage JSON-LD). ✅ deployed.

---

## Page 9 — `sales/list-with-us.html` ← AUDITED + DEPLOYED 2026-06-05

**Verdict:** Strong conversion page (clear value prop, stats, pricing tiers, guarantees, brand-consistent blue accent, appropriate slim footer) — but it was **SEO-thin**. Fixed.

### 🟢 Already good
- No console/network errors; 0 broken images, 0 missing alt, 0 tiny fonts, no overflow. Single `<h1>`, rich heading outline, good title + meta description.

### ✅ Deployed
- **Canonical** added (`…/sales/list-with-us.html`).
- **OG + Twitter** added using user-supplied `list-with-us.png` → optimised `assets/list-with-us-og-1200x630.jpg` (2.16 MB → 207 KB), `summary_large_image`.
- **JSON-LD** added: `BreadcrumbList` + `Service` (Pāpāmoa Business Listing) with three `Offer`s — Bronze $0 / Silver $599 / Gold $1,199 NZD (per-year, GST-exclusive). Strong AEO for "cost to list on Papamoa.info".
- **CTA semantics:** the 4 modal-opening `href="#"` CTAs ("Enquire about Gold" ×2, "Talk to us about Silver/Gold") → `<button type="button">`; normalised `.tier-cta` (`font-family:inherit; border:0; cursor:pointer; width:100%; box-sizing:border-box`) so buttons render identically. Verified: Figtree font preserved, modal still opens on click, 0 `href="#"` left.

### Notes
- Source `list-with-us.png` (2.16 MB) left untracked (the optimised JPEG is used).
- The contact form (modal) handles all enquiries; slim footer kept (sales-page conversion pattern).

**Pricing-tier card alignment (user note, 2026-06-05):** the 3 tier cards looked uneven. Equalised the `.tier-head` height (`.tier-tagline { min-height:4.5em }` + tightened the over-long Bronze tagline to ~3 lines) so dividers + feature lists align, and made `.tier-footer { display:flex; flex-direction:column-reverse; gap:10px }` so the CTA buttons bottom-align across all three (sub-notes sit above each button). Verified: head/featTop/CTA-bottom ranges all = 0px; no overflow desktop/mobile.

**Evergreen years + final CTA (user notes, 2026-06-05):**
- Genericised dated copy so a Dec sign-up isn't confused: "2027 ROI guarantee/Guarantee" → "12-month / 12-Month ROI Guarantee" (×6); guarantee body → "...within your first 12 months, your next year's renewal is free"; AI-search line "In 2026, when someone searches" → "Today, ...". Kept the conventional `© 2026` copyright.
- Converted the bottom "run by locals" block into a primary CTA: kept the trust text + avatar, replaced Jayden's phone/email with **"Get your free listing →"** (→ `create-bronze-listing.html`) + **"Talk to us about Gold & Silver →"** (→ contact modal). Added button-compat to `.jayden-btn` (font-family:inherit, border:0, cursor) so the modal CTA is a real `<button>`; on mobile the two CTAs stack full-width. Verified: modal opens, Figtree font, no overflow desktop/mobile.

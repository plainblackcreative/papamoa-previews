# Session handoff — papamoa-previews

**Last updated:** 2026-06-04 (session 7 extended -- end-of-session wrap) by Jay + Claude
**Last commit:** `9ebccba` admin: add the canonical brand logo to bronze-queue + add-lead + listing-health + upload
**Branch:** `main` (tree clean, all 40 session-7-extended commits pushed)

> **★ FIRST THING NEXT SESSION: nothing in the repo is blocked, but ONE Jay-side action is pending:**
>
> **Run `wrangler deploy` from the repo root** to push the new Cloudflare Worker code to production. The new `worker.js` covers two material changes that won't take effect until deploy:
> 1. `e98b6a9` -- `/bronze-approve` rewritten for the Bronze-as-card model (no longer commits HTML pages to `/listings/<slug>.html`; just marks Sheet row live + invalidates `/bronze-public` cache + sends owner welcome email pointing to the sub-cat page)
> 2. `1c6202a` -- new `/bronze-update` endpoint that the Edit modal on `admin/bronze-queue.html` calls when an operator saves a field change. Until deploy, clicking Save in the Edit modal will fail (404 from the worker).
>
> **The static side of both changes IS already live on GitHub Pages** -- nav.js renders the new full-info Bronze cards + lightbox, the queue page shows the Edit modal, the list-with-us tier copy is updated. Only the *worker-backed actions* need the deploy.
>
> **After deploy:**
> - The `GITHUB_TOKEN` Worker secret can be revoked (`wrangler secret delete GITHUB_TOKEN`).
> - The fine-grained PAT named `papamoa-bronze-worker` can be deleted in GitHub settings.
> - End-to-end smoke test: open `admin/bronze-queue.html`, hit Edit on a row, change a field, Save. Should round-trip cleanly + invalidate the `/bronze-public` cache for the affected sub-cat.

> **Session 7 extended -- final tally: 40 commits shipped (`4da41cc` → `9ebccba`).** Tree clean. The session covered:
>
> **Strategy + positioning:**
> - §17.13 (no tier scarcity, scarcity moves to Ad Spots) + §17.14 (annual contracts + Stripe instalments) locked
> - §3 customer-facing scarcity-language sweep across 8 files (sales pages + internal scripts)
> - PPP (Personalised Preview Page) retired entirely; 1062 lines + the form/submitForm/JS gone
> - **Bronze model locked as CARD not PAGE** (the load-bearing decision of this session) -- see §8.2 in Project_Master for the full rationale + architecture
>
> **Build:**
> - Hero accent fix on 61 sub-cat pages (food-drink, shops, activities) to navy + locked brand accents
> - §17.11 Phase 1A: Spotlight Ad Spot Claim CTAs wired through contact modal with sub-cat context pre-fill
> - Legacy inline contact-modal sweep: 152 pages stripped (~4377 lines removed), nav.js owns the modal markup + CSS + behaviour
> - Bronze info-card rendering + lightbox in nav.js (replaces the old "View listing →" link approach)
> - Editable Bronze listings: `/bronze-update` worker endpoint + Edit modal on the admin queue (all 11 fields + cache invalidation)
>
> **Dashboard polish:**
> - Operator status panel on `index.html` (Bronze inbox + canonical doc chips)
> - Page-card deep clean: 9 dead anchor cards + 4 duplicate cards removed (200 cards now, all resolve)
> - GitHub shortcuts removed, scratchpad killed, Previews + Assets sections retired, Admin section cleaned up (Bronze Queue added, broken-tagged the unfixed ones, Confirm Listing + Sales Funnel removed)
> - Counter drift fixed (215 → 200 indexed pages, stats line matches DOM counts)
>
> **Homepage polish:**
> - Single CTA on "Own a Pāpāmoa business?" block (drops the `spotlight-ads.html` deviation; locks the single-destination rule)
> - "What is Pāpāmoa?" FAQ dropped (visible + schema)
> - "37,800 residents in the Pāpāmoa Community Trust Area" → "Pāpāmoa residents"
> - At-a-glance "Read more about Pāpāmoa" link sits where Population & stats was; bottom prose disclosure removed
>
> **Admin pages:**
> - Canonical brand logo image rolled out to `bronze-queue` + `listing-health` + `add-lead` + `upload`. `crm-dashboard` + `search-analytics` already had it. Skipped `confirm-listing` (customer-facing) + `sales-funnel` (stale demo).
> - Bronze token now persists in localStorage (was sessionStorage)
>
> **Other:**
> - Carwyn reply prep drafted (`docs/carwyn-reply-prep-2026-06-04.md`) -- marked Do-Not-Send pending more demo polish
> - Bronze nurture Resend runbook drafted (`docs/bronze-nurture-resend-runbook.md`) -- execution deferred per Jay until DNS sorted post-Carwyn
> - tauranga.png staged for the future TaurangaNZ.info template clone
> - 3 stub-listing footers got the canonical pnf-footer block
> - supermarkets-papamoa.html legacy template rewritten

> **Session 7 extended -- post-handoff additions (commits `4ddc71e` through `e98b6a9`):**
> (a) `4ddc71e` -- §17.11 Phase 1A Spotlight CTAs wired through contact modal; (b) `e35475f` -- 152-page inline contact-modal strip, nav.js owns the modal; (c) `4c5af81` -- PPP retired; (d) `f0aba7e` -- homepage single CTA only; (e) `1cdfb52` -- 'What is Pāpāmoa?' FAQ dropped; (f) `f762f1c` -- '37,800 Pāpāmoa residents' label (drop 'Community Trust Area'); (g) `75a2708` -- at-a-glance 'Read more' link sits where Population & stats was; (h) `3bba4a8` + `8ac085d` -- index dashboard ops panel + Admin cleanup (Bronze Queue card added, broken tags on CRM Dashboard + Add Lead, Confirm Listing + Sales Funnel removed, GitHub shortcuts gone); (i) `9c0172f` -- scratchpad killed; (j) `b4fc9e1` -- index page-card deep-clean (200 cards, dead anchor cards + duplicate cards gone); (k) `e98b6a9` (this) -- **Bronze model LOCKED as card-not-page**.
>
> **★ Bronze-as-card lock-in (`e98b6a9` -- the load-bearing model decision):** Jay's call after flagging the discrepancy across create-bronze-listing.html / list-with-us.html / sub-cat pages. **Bronze = a card on the assigned sub-cat page; Silver/Gold = your own dedicated page.** Shape change between Bronze and the paid tiers, not a tier downgrade. **What shipped:** (a) `worker.js` /bronze-approve rewritten -- no template fetch, no GitHub commit; marks Sheet row live, invalidates `/bronze-public` cache, sends owner welcome email pointing to the sub-cat page. Helpers `bronzeRender()`, `bronzeB64Utf8()`, `BRONZE_CATEGORY` map deleted. BRONZE config trimmed (ghOwner/ghRepo/ghBranch/templateUrl gone). (b) `nav.js` Bronze injector renders full info-cards inline (name + pin + address + blurb + clickable phone + clickable website + "More info →" button) + a new `pnf-bz-modal` lightbox in the contact-modal shell that shows the full record + a Silver & Gold upsell foot link. (c) `sales/list-with-us.html` Bronze tier card retitled "Card on your sub-category page" (was "Indexable page, ranks in Google"); added explicit "Your own dedicated page" as a Silver/Gold-only feature to make the structural ladder difference visible. (d) `listing-bronze-template.html` deleted (232 lines). (e) `admin/bronze-queue.html` instruction box + live-row link rewritten -- live-row now links to the sub-cat page where the card appears, not /listings/<slug>.html. (f) `Project_Master.md` §8.2 fully rewritten around the new model with rationale (SEO/AEO thin-content risk, sales ladder coherence, maintenance shrinkage). **Verified live:** plumber sub-cat renders the Test Plumbing Co card with full info inline; clicking More info opens the lightbox; Silver & Gold upsell link in the foot. No console errors.
>
> **⚠ JAY ACTION REQUIRED for `e98b6a9`:** `worker.js` is the source for the `papamoa-claude-proxy` Cloudflare Worker. **Run `wrangler deploy` from the repo root** to push the new `/bronze-approve` (Bronze-as-card) flow to production. Until that deploy, any new Bronze approval still writes a stale `/listings/<slug>.html` page -- harmless but wasted. **After deploy:** the `GITHUB_TOKEN` Worker secret can be revoked + the `papamoa-bronze-worker` fine-grained PAT can be deleted in GitHub settings (no longer needed).
**Branch:** `main` (tree clean, pushed)

> **Session 7 extended headline (queued backlog cleared in one stretch):** After the hero accent fix landed, Jay asked to push through the full queued backlog from §5 of the handoff. 11 commits total this session (`4da41cc`→`4361295`). The carry-overs cleared: (1) **`supermarkets-papamoa.html`** rewritten (`9b5c626`) — hero CSS rebuilt to canonical (was missing background on primary rule, late override was dark-green), site-footer swapped to canonical pnf-footer with a contextual "More Shopping" column. Last of the legacy-template shops subcats. (2) **3 stub-listing footers** (`8ed5a79`) — barber-toms, pacific-palms, papamoa-beach-resort all got the full canonical pnf-footer block (brand col + Explore + Local Info + For Businesses + About + legal bottom-bar). nav.js handles the contact modal injection. (3) **Footer migration sweep** (`4361295`) — 10 more pages off the legacy `<footer class="site-footer">...</footer>` one-liner onto canonical pnf-footer: 6 shops subcats (building-supplies, clothing, garden-centre, liquor, pharmacy, surf-skate) + listings/blackberry-eatery + legal.html + sales/internal/facebook-posts + sales/partners/real-estate-agent. **148 pages now on pnf-footer, 29 still on site-footer (all community/*).** (4) **Carwyn reply prep** (`6392529`) at `docs/carwyn-reply-prep-2026-06-04.md` — full positions doc on the 10 open §21.3 questions (recommended PB position on each with reasoning, action Jay needs to take before send) + a draft reply email leading with the shipped polish work. Marked Do-Not-Send pending Jay's locked positions on §17.13 (Gold rotation) and §17.14 (monthly billing). (5) **Bronze nurture Resend runbook** (`925238f`) at `docs/bronze-nurture-resend-runbook.md` — two paths around the DNS blocker (Path A: today, plainblack.com sender, gets emails firing within 30 min; Path B: later, papamoa.info sender, after DNS consolidation with Carwyn). Step-by-step for Resend signup + domain verify + API key + Cloudflare Worker secret + sender swap in `worker.js` + smoke test. (6) **Two untracked files resolved** — `archive/index.html` deleted (Jay's call: stale snapshot, not needed), `assets/tauranga.png` staged + committed (`a0a1b44`) as the TaurangaNZ.info wordmark for the future template clone.
>
> **Real bug found + fixed this session:** the earlier session-7 shops Python regex in commit `8902241` silently broke 6 shops pages (the legacy single-line late `.page-hero{...}` override pages: building-supplies, clothing, garden-centre, liquor, pharmacy, surf-skate). The regex used `[^;]*;` to find the end of the hero declaration; those pages had no trailing semicolon, so the regex consumed text past `</style>` deep into HTML body content, producing pages with scrollHeight=0 and no rendered footer. **Caught during footer migration smoke-test.** Fixed in `4361295` by restoring from pre-sweep state and re-applying the hero change with a brace-anchored pattern (`[^}]*\}` not `[^;]*;`). **Worth a quick spot-check on the other shops pages I swept** in case similar mangling slipped through that the audit didn't catch.

> **Session 7 headline (hero accent fix — COMPLETE on food-drink/shops/activities, brown story closed on food-drink):** The #1 session-6 carry-over shipped in 4 commits (`4da41cc`→`784fa0d`). **What shipped:** (1) 21 food-drink subcat pages — brown/orange hero gradient (`#1A1208/#2A2010/#1A0A08` + `--eat-accent:#E07830`) replaced with the locked canonical navy + blue (`#0A1825/#0F2030/#102025` + `#359FE8`). Vegan was the one outlier (dark-green hero variant + hardcoded `#89BE43` throughout) -- swept too, with semantic green retained only on vegan-dish tag pills (the `--green-bg` callouts that communicate "this is a vegan dish"). (2) 20 shops subcat pages — 20+ unique hero gradient variants (gold, brown, purple, magenta, red) normalised to navy + blue via Python regex sweep over `.page-hero`, `::before`, `::after`, `--shop-*`/`--hero-*` vars, plus hero-eyebrow + h1 em colour. (3) 20 activities subcat pages — dark-green hero (`#0A2215/#0D3828/#0F4A30`) → canonical navy; **accent stays green** (`--lime #89BE43`) since green is the locked Do/Services category colour per the Carwyn palette. (4) 49 food-drink inline `.dc-thumb`/`.gc-thumb` `style="..."` brown/red gradients (37 unique cuisine-themed variants) collapsed to one canonical navy `linear-gradient(135deg,#0A1825,#0F2030)`. **Net:** every subcat hero across the three folders now shares the locked navy gradient; food-drink+shops carry blue accent, activities carries green accent -- both per the Carwyn brand rule. **Carwyn brand rule #7 satisfied** ("Blue and green shades only. No brown / beige. EAT page specifically called out.").
>
> **Residual from the hero pass (small):** (a) `categories/shops/supermarkets-papamoa.html` -- legacy template with a sand-banner hero (no dark hero CSS), needs a structural rewrite not a sweep; **intentionally skipped**. (b) Image-hero category landings `categories/shops/shopping.html` + `categories/activities/entertainment.html` -- correct as-is, intentionally skipped. (c) Inline thumb gradients on shops + activities -- none found (only food-drink had this pattern). (d) Two untracked files from before session 7 still floating: `archive/index.html`, `assets/tauranga.png` -- worth confirming intent before they get muddied.

> **Session 6 headline (subcat-page structural pass — COMPLETE):** All 131 subcategory pages now have a consistent **Gold → Silver → More [subcat] → FAQ** stack. 6 commits (`ba65186`→`2ae9aee`). **What shipped:** (1) Canonical subcat template at `categories/subcat-page-template.html` (Gold available card, Silver available card, Bronze ghost-grid section, FAQ). (2) "More [subcat]" section added to all 96 pages that lacked a `.ghost-grid` — each gets a dashed empty-state card ("Your business here / Add your business →") + navy CTA strip ("List your X business free / Add a free listing →"). nav.js auto-injects live Bronze listings into the grid when they arrive. (3) Ghost-grid CSS moved from per-page `<style>` blocks (96x duplication) into `nav.js` once — ~144KB removed from the repo; also resolves future cascade conflicts since nav.js fires after page CSS. (4) Section ordering fixed on all 93 pages where FAQ appeared before More — correct order enforced across all 131 pages. (5) Redundant standalone CTAs removed from 26 pages (21 food-drink + 5 activities had old `cta-strip` and/or orphaned "Another X in Pāpāmoa?" ghost-cards sitting outside the grid section). **One CTA path per page, in the right place.** **Static ghost placeholder cards kept** (Jay's call — they drive businesses toward the funnel via "Claim listing" links; will be dropped long-term as real Bronze listings fill the grid). **Still pending from §18 subcat polish:** hero accent color fix -- 121 food-drink/shops/activities pages still use the old brown/orange hero gradient instead of the locked dark navy + blue (`#359FE8`). Separate sweep, ready to run.

> **Session 5 headline B (Bronze self-serve auto-create — BUILT, DEPLOYED, LIVE):** The free-listing funnel is live in production. Locked the **Gold/Silver listing spec → §8.1** (canonical intake fields + sections + schema). Built + **deployed** the Bronze self-serve pipeline (architecture + deploy checklist in **§8.2**): `listing-bronze-template.html`, `sales/create-bronze-listing.html` (form + live preview), `worker.js` routes `/bronze-submit` `/bronze-public` `/bronze-list` `/bronze-approve` `/bronze-reject` (added to the `papamoa-claude-proxy` worker, **deployed**), `admin/bronze-queue.html` (moderation queue with **Category + Subcategory A-Z dropdowns** — operator assigns the real subcat at approval), `assets/bronze-subcats.json` (category→subcat map). **Infra wired with Jay (via Chrome MCP + wrangler):** Google Sheet "Papamoa.info Bronze Listings" (id `11sn0WgZaJwbsEG3Kqjpb-mWmiKkiVQ8LgGw_SAMDIrw`, cols incl. `subcat_path`/`subcat_name`, shared Editor with `papamoa-sheets-writer@papamoa-info.iam.gserviceaccount.com`); worker secrets `GITHUB_TOKEN` (fine-grained PAT `papamoa-bronze-worker`, contents:write — **has an expiry, rotate before it lapses or auto-publish stops**) + `BRONZE_ADMIN_TOKEN`; `RESEND_API_KEY` not set yet (owner/operator emails skipped, loop still works). **Verified end-to-end live:** submit → pending Sheet row → operator assigns Plumbers → `/bronze-approve` commits the listing page with the correct breadcrumb → it surfaces. **Surfacing (Jay's model, locked):** free Bronze listings render **inside each subcategory page's existing "More [subcat]" `.ghost-grid`** as small cards (name + "View listing →", **no "Claim listing" link**), prepended before the placeholder ghosts; fed by `/bronze-public?subcat=<cat>/<slug>`. `nav.js` injector **shipped + proven on the Plumbers page**. ~~**Still pending = the subcategory structural pass**~~ **DONE session 6** -- see above.

> **Session 5 headline A (the sales-page consolidation — DONE):** The whole sales funnel now lives at one destination, `sales/list-with-us.html`. **Stage A** (`72535f6`): internal tools moved to `sales/internal/` (`sales-scripts`, `facebook-posts`, `real-estate-outreach`; `real-estate-agent` stays — it's public), and the two follow-up email files merged into one complete `sales/internal/follow-up-emails.html` (Day 0 + 3/6/10 + ROI explainer; fixed a pre-existing truncation). **Stage B** (`e56222a` + `cffa18c`): `list-with-us` rebuilt as the **Gold | Silver | Bronze** hub (free Bronze card per §3), `landing.html` + `claim.html` merged into one Get-listed form (tier selector + warm `?biz/cat/claim/subcat/type/page` deep-link prefill), **all Menu copy purged**, the menu-lightbox crash removed; **346 `landing` + 82 `claim` CTAs across 112 pages repointed** to the hub (params preserved; spotlight/adspot deep-links handled by the form); `why-list` trimmed to a lean SEO article; `landing.html` + `claim.html` **deleted**. **⚠️ Found + fixed (`4cf170c`):** commit `e1ba5a0` (session-4 menu-hide sweep) had silently gutted `list-with-us.html` (1866→628 lines, head/style/body gone) and `landing.html` — the main CTA page had been serving broken HTML unnoticed; both recovered from `e3f5e66` then reworked. **Menu fully stripped (session 5 follow-up):** `post-call-landing.html` menu copy purged; the live Menu feature stripped from `driftwood-cafe.html` (demo + overlay + Silver purchase-toggle + pricing JS); `menu-addon.html` upsell links removed/suppressed on homepage + listing-silver-template + 4 listings. `menu-addon.html` itself stays parked (noindexed, Phase-2 product page). Also **verified the §18 "Spotlight Silver not clickable" bug does not reproduce** (Silver cards are clickable) — marked resolved.

> **Session 4 headline (listings/sales groundwork):** Two decisions executed before the sales rebuild. **(1) Menu feature hidden site-wide** (`e1ba5a0`) — deferred to Phase 2; View-menu buttons/upsells/lightbox/links removed or CSS-hidden via nav.js, `menu-addon.html` noindexed. **(2) Tiers locked** (`ce193c6`,`c6ceeb3`): **Gold $1,199 | Silver $599 | Bronze FREE** (Bronze = NAP + link + short blurb, auto-publish pending admin approval); Menu→Phase 2; ad spots = Phase 1 claimable perk for Silver/Gold; single CTA = `list-with-us`. §17.15 resolved (free-tier pushback won). **NEXT (not started): the sales-page consolidation** — see "Next moves".

> **Session 3 headline (visual polish):** all 5 category pages rebuilt to one clean template (photo hero + card-grid + custom line icons + sticky page-filter); category accents locked to the logo palette (blue: Stay/Eat/Shop, green: Do/Services); all emojis → custom SVG icons site-wide; all em dashes removed; new brand logo + favicon pack.

> **Session 2 headline (the nav/footer lock):** `nav.js` is the single locked source for the nav, mobile drawer, and footer styling — loaded on every public page. See `docs/nav-usage.md`.

> Read this if you're a new Claude session picking up work on this repo. It's the fastest path from cold to useful.

---

## 1. Where this project actually is

**Papamoa.info** is a paid local-business directory for Pāpāmoa, NZ. It belongs to **Carwyn (Dot Info Marketing Ltd)** — he's the **client**. **Jay (PlainBlack)** is the **agency contractor** building it. PlainBlack is the priority business; .info sites are a client engagement under it.

The site lives at `https://plainblackcreative.github.io/papamoa-previews/` for preview; the launch target is `papamoa.info` (Carwyn's existing Drupal-era domain, to be migrated). The full deliverable will eventually replicate as a template for TaurangaNZ.info and future sites.

### Canonical source documents (read these first)

| File | What it is |
|---|---|
| `docs/Project_Master.md` | The locked spec — pricing, design system, file structure, listings, infrastructure, terminology, key features, dead offers, grey areas, pending tasks, launch plan, pre-launch QA, **Carwyn's Requirements (§21)**. If a file in the repo contradicts this, this wins. |
| `docs/Project_Master.html` | Visual mirror of the .md for team reference. Kept in sync. |
| `docs/carwyn-feedback-2026-06-02.md` | **The client brief.** Carwyn's verbatim feedback email + structured read. This drives the active design work. |

---

## 2. What's done — recent session highlights

### Yesterday (2026-06-02)

The big consolidation day.

- Sweep: launch-blocker cleanup (Gold Spotlight naming, dead CTAs, search.html bugs, +gst, legal links, root-relative paths). 40 files.
- Merge: `docs/task-plan.html` + `docs/pricing-master.html` absorbed into `Project_Master`, both originals deleted. -1,157 lines net.
- Tidy: `index.html` Assets grid (dead .md cards out, 2 Worker READMEs in, counts trued up).
- Built `dashboard.html` (Carwyn-facing operator dashboard, brand-styled in his Poppins + #23BAEB teal + koru logo).
- Branded: `Plain Black Creative` → `PlainBlack` swept site-wide (24 occurrences across 8 files).

Then the 17-item PlainBlack Hub P-5 triage:

- Resolved 3 stale-tool conflicts in the doc chain (Web3Forms → pb-forms, Make.com rewrite, Bronze defn drift in 2 files)
- Walked all 17 items one-by-one, absorbed unique content into Project_Master, restructured §21 around Carwyn's email
- Net: 15 marked Done in the hub, 2 left open (`I-176 GEO/AI Feeders`, `I-54 Carwyn email`)

Overnight tidy while Jay slept:

- `llms.txt` at repo root (AI-crawler brief)
- Favicon set generated from the koru, wired site-wide (237 pages)
- 231 anchors got `rel="noopener"` (security sweep)
- Easter Trading Hours destamped from 2026 + archive banner

### Today (2026-06-03)

Phase C kickoff — homepage walkthrough + simplification per Carwyn's "too busy" feedback.

| SHA | What |
|---|---|
| `2d050d0` | Killed redundant Essential local info chip block (-228px) |
| `3a49be9` | Killed duplicate "Own a Pāpāmoa business?" CTA strip (-117px) |
| `3727bf0` | Browse Categories → imagery-led cards (Carwyn rule satisfied; placeholder photos with TODO comments per card) |
| `75aa20d` | Tightened FAQ section (-168px, all 7 questions kept) |
| `f8fc48a` | Slimmed hero — removed floating weather + population widgets (-89px) |
| `6d39876` | Nav visual lift — bigger tabs, higher contrast, hover state |
| `ca92d5d` | Brand logo image into homepage nav, drawer, footer |
| `b430823` | Brand logo swept site-wide (~198 files + nav.js) |
| `4caf571` | Banned ✉ envelope icon — Jay's hard rule, locked in auto-memory |

Net homepage: 4294px → 3819px (~11% shorter). Brand consistency: koru on every public page.

### Today (2026-06-03) — session 2: the nav / drawer / footer lock

Jay's ask: *"LOCK the Nav, Mobile Menu and Footer. Update nav-usage.md, then deploy site-wide."* Done, in four commits.

| SHA | What |
|---|---|
| `f11fef4` | `nav.js` rewritten as the locked single source (nav 64px + FB/IG, icon-free drawer, footer CSS, robust active-tab detection, data-driven breadcrumb strip). Rolled out to the first 179 public pages (categories, subcats, community, search, listings). |
| `2970862` | Legacy nav sweep — `site-nav` / `nav` / classless-`<nav>` / no-nav pages all converted. Every public page now on nav.js (225). Secondary section navs preserved. |
| `bffe868` | Footer shell locked to homepage canonical on 119 grid footers (logo, FB **+ IG**, "Get in touch", trust bullets, normalised bottom bar) keeping contextual columns; nav.js now injects the contact modal (guarded) so "Get in touch" works everywhere. |
| `80799b5` | Fixed 3 truncated community pages (`local-government`, `notable-people`, `maori-history`) — restored closing markup + footer, converted to nav.js. (Was PR #1, spawned mid-session.) |
| `90b55db` | Brand asset refresh — Jay dropped `assets/papamoa-info-asset-pack/`. Swapped the new combined koru + "pāpāmoa.info" logo site-wide (nav.js + 143 footer refs), replaced root favicons + added android-chrome/manifest (PWA), removed old `papamoa-macron.png`/`papamoa.png`. Made `.claude/launch.json` portable. |

**Decisions Jay made this session:** mechanism = nav.js single source · scope = public-facing only · category/listing nav = flat tabs everywhere (Carwyn req #3) · listings = flat nav + breadcrumb strip · footer = lock shell, keep columns · footer canonical = upgrade all to homepage shell.

**Net:** one file (`nav.js`) now owns the nav, drawer, footer styling, breadcrumb strip, and contact modal for the whole public site. Change it once → changes everywhere. No more per-page nav/footer drift.

**Footer follow-ups still open** (see `docs/nav-usage.md` "Footer follow-ups"): 23 compact (no-grid) footers; `site-footer` (38) + other footer systems (36); and the bottom-bar "Sitemap" link points at `index.html` (internal dashboard — no public sitemap exists; repoint or drop).

### Today (2026-06-03) — session 3: visual polish, brand consistency, category template

| SHA | What |
|---|---|
| `90b55db` | New brand asset pack wired site-wide: combined koru + "pāpāmoa.info" logo (`assets/papamoa-info-asset-pack/`) replaces the old `papamoa-macron.png` everywhere; new favicons + android-chrome + `site.webmanifest`; old logo files removed; `launch.json` made portable. |
| `ada5719` / `c4bc0d1` | Homepage Browse Categories: real category photos (portrait crops) + evened descriptions so cards align. |
| `b817a61` | Homepage hero: white text + soft navy left-scrim, removed the washed-out white overlay (readability fix). |
| `34e3b69` / `4848330` | **All 5 category heroes → imagery-led photo + navy scrim + white text.** EAT/SHOP de-browned to blue; Stay/Do/Services kept their accents. |
| `1f3753c` | **Removed all em dashes site-wide** (3,359 → hyphens, 238 files). Hard brand rule. docs/ excluded. |
| `1104255`→`5188718` | **Category-page template** built on Stay, rolled out to all 5: clean hero, single card-grid navigator (hero chips + pill bar + duplicate search removed), **custom SVG line icons** (emoji removed from cards), uniform cards, no title truncation, even descriptions. Footer "Sitemap" link removed site-wide. Services accent teal → **logo green**. |
| `b12500a` / `e3f5e66` | **All emojis → custom inline SVG icons site-wide** (~4,400 across ~230 public pages). nav.js injects a shared `.pnf-i` inline-icon style. Text-node-only (scripts/attributes untouched). |
| `fd0b1f1` | Captured Jay's listings/sales **strategy notes** into Project_Master §18 (Listings & sales direction) + §17.15 (free Bronze tier) + §17.11 (self-serve spotlights). |
| `3e263e3` | **Sticky page-filter** on all 5 category pages — one clean search field that live-filters cards + listings together (solves the long-scroll problem, esp. Services' 57 subcats). |

**Locked this session:**
- **Category-page template** — photo hero + sticky page-filter + single card-grid (custom line icons, uniform cards) + listings. This is now the pattern for all 5.
- **Category accent palette (logo only):** Blue `#359FE8` = Stay, Eat, Shop · Green `#89BE43` = Do, Services. No teal/brown.
- **Icons:** `nav.js` injects `.pnf-i` (inline SVG icon, sizes to text, inherits colour). No emoji in visible content on public pages.
- **No em dashes, no emoji** anywhere in public copy (both swept this session).

---

## 3. What's actively open

### Phase tracking (the strategic plan from 2026-06-02)

- **Phase A1 — Hub triage**: ✅ done
- **Phase A2 — "How this site works" operator guide for Carwyn**: pending. Fills the placeholder tile on `dashboard.html`. Standalone writing task.
- **Phase B — Define Carwyn's bar**: substantially done in `§21 Carwyn's Requirements`. The 10 open questions there are the unresolved part.
- **Phase C — Homepage cleanup**: in progress. 8 commits today. One item left from the walkthrough plan: **#7 Pāpāmoa at a glance** (compress or move — Jay said *"leave as-is for now"* 2026-06-03).
- **Phase D — Make the CRM foolproof**: not started. Google Sheet is the source; needs one read-only dashboard pulling from it. The hardcoded API key in `admin/crm-dashboard.html` was revoked — must rebuild via Worker proxy.
- **Phase E — Streamline automations**: not started. pb-forms to Resend works; needs one welcome email + one Day-3 follow-up wired up. Brevo Day 0/3/6/10 plan is in §18.
- **Phase F — Demo to Carwyn, get paid**: gated on E.

### The two open hub items (don't touch without intent)

- `I-176 GEO / AI Feeders` — keep open, HIGH/Attention. Jay's active sales toolkit for explaining the GEO play to prospects. Lives parallel to the work; not blocking.
- `I-54 Carwyn email` — keep open, HIGH/Attention. The source brief. **Don't reply to Carwyn until the demo-site polish has shipped** (sequencing decided 2026-06-02 — the polish is the cover letter, the answers to his 10 questions are the body).

### Carwyn's 10 open questions awaiting PB positions

Catalogued in §21.3. Two are big-enough to need explicit grey-area entries:

- **§17.13 Gold Listings — rotation vs fixed top-spot.** Carwyn floated rotation; conflicts with §3's locked "one Gold per sub-category" scarcity model. Decision pending.
- **§17.14 Annual vs monthly billing direction.** Carwyn asked about monthly payment options for businesses that can't pay up-front. Recommended: annual contracts with Stripe instalment plans (no §3 rewrite). Decision pending.

Plus 8 operational questions (CMS scope, Astro migration ownership, hosting cost, security, AI billing model, multi-site cost, content moderation flow, expired-CC dunning).

---

## 4. What's blocked on Jay's direct input

None of these can move without him:

- **Real category photos** for the Browse Categories cards on the homepage. Currently using placeholders with TODO comments:
  - **Where to Shop** — beach evening placeholder, needs a real shop / shopping centre photo
  - **What to Do** — beach morning placeholder, on-theme but generic
  - Where to Eat / Services / Stay all use on-theme listing photos as decent stand-ins
- **EAT and SHOP category page hero rework** (§4.4 partially unlocked). Both currently use brown/orange palette that violates Carwyn's blue/green rule. Need design direction: keep dark heroes with blue/green tints, or go imagery-led for the hero too?
- **Footer for 3 stub listings** (barber-toms, pacific-palms, papamoa-beach-resort) — they have no footer at all. Needs a footer template designed (likely a stripped-down version of the full footer).
- **Decisions on §17.13 + §17.14** before any pricing copy changes elsewhere can be locked.
- **CMS scope** before answering Carwyn — build a simple admin via Worker, or document the no-CMS hand-edit flow with screenshots?
- **Astro migration ownership** — Carwyn offered to drive it himself ("I will process the migration via Astro?"). Needs confirm.

---

## 5. Recommended first moves for the next session

1. **Read this file + `docs/carwyn-feedback-2026-06-02.md` + Project_Master.md §21 + §17.13 + §17.14** to load context.
2. **Open the live demo** at `https://plainblackcreative.github.io/papamoa-previews/homepage.html` to see what the user is looking at.
3. **Ask Jay what's first** — don't assume. Today's session shipped 9 commits in one stretch; that pace is sustainable only when each step is clearly aligned with him. The default cadence is propose → confirm → execute → verify → commit → push.

**#1 LIVE TASK — sales-page consolidation into `list-with-us`** — ✅ **DONE (session 5).** Both stages shipped in 5 commits (`72535f6` Stage A, `4cf170c` hotfix, `e56222a` hub rework, `cffa18c` consolidation). The single CTA destination `sales/list-with-us.html` is now the Gold | Silver | Bronze hub with one merged Get-listed form; `landing.html` + `claim.html` deleted; `why-list` trimmed to an SEO article; all listing CTAs repointed; Menu copy purged from the rewritten pages. See the session-5 headline at the top for the full breakdown, including the `e1ba5a0` breakage that was found and fixed. Follow-up (session 5): the Menu feature was then **fully stripped** from `driftwood-cafe.html` + `post-call-landing.html` and the `menu-addon.html` upsell links removed/suppressed sitewide; `menu-addon.html` stays parked for the Phase-2 decision. The §18 "Spotlight Silver not clickable" bug was verified non-reproducing and marked resolved.

**Then (the listings build):**
1. ✅ **Lock the Gold & Silver listing spec — DONE (session 5).** Canonical build contract at **Project_Master §8.1**.
2. ✅ **Bronze self-serve auto-create — BUILT + DEPLOYED + LIVE (session 5).** See "Session 5 headline B" at the top + **§8.2** (architecture, deploy checklist, infra). The whole loop runs in production; the subcat-page injector is shipped.
3. ✅ **Subcategory-page structural pass — DONE (session 6).** All 131 subcat pages now have a consistent Gold → Silver → More [subcat] (Bronze grid) → FAQ stack. Canonical template at `categories/subcat-page-template.html`. Ghost-grid CSS in `nav.js`. One CTA per page. See session-6 headline at top.
4. ✅ **Hero accent color fix — DONE (session 7).** 62 of 65 subcat pages across food-drink/shops/activities reskinned to the locked navy + brand-accent palette. 4 commits (`4da41cc`→`784fa0d`) + `9b5c626` (supermarkets). Image-hero landings `shopping.html` + `entertainment.html` correct as-is.
5. ✅ **Supermarkets rewrite — DONE (session 7 extended, `9b5c626`).**
6. ✅ **3 stub-listing footers — DONE (session 7 extended, `8ed5a79`).**
7. ✅ **Footer migration tranche 1 — DONE (session 7 extended, `4361295`).** 10 more pages off site-footer onto canonical pnf-footer (6 shops repaired + 4 other). 148 total pages on pnf-footer.
8. ✅ **Carwyn reply prep — DRAFTED (session 7 extended, `6392529`).** See `docs/carwyn-reply-prep-2026-06-04.md`. **Do not send** until Jay locks §17.13 + §17.14 positions and signs off on multi-site price band + AI platform fee band.
9. ✅ **Bronze nurture runbook — WRITTEN (session 7 extended, `925238f`).** See `docs/bronze-nurture-resend-runbook.md`. **Execution deferred** (Jay's call session 7 extended): don't ship transactional emails from a workaround sender domain; wait until DNS is sorted post-Carwyn-acceptance and do it once via `noreply@papamoa.info` (Path B). Worker code is wired and gated cleanly on `env.RESEND_API_KEY`, so emails silently skip until the key is set. **No action until DNS is real.** Note for posterity: my earlier walkthrough used "plainblack.com" as the workaround sender; Jay's actual root domain is `plainblackcreative.com` (with `forms.plainblackcreative.com` already verified in Resend) -- the runbook will need a one-line edit when revived.
10. **★ Real-bug surface area to verify:** the session-7 shops regex silently broke 6 pages before being caught and repaired (`4361295`). Worth a more thorough live-render audit on the other 14 shops pages I swept (jewellery, florist, powersports were verified live in-session; the rest were not). Quick script suggestion: navigate each + check `document.body.scrollHeight > 0`.
11. ✅ **§17.13 + §17.14 positions locked (session 7 extended, `8335859`).** §17.13 RESOLVED: drop scarcity from tier ladder, scarcity moves to Ad Spots (§17.11 promoted from Phase-2 to load-bearing). §17.14 RESOLVED: annual contracts with Stripe instalment plans (4mo / 12mo). Project_Master updated; reply prep doc reflects locked positions.
12. ✅ **§3 customer-facing scarcity-language sweep -- DONE (session 7 extended, `d862be0`).** 8 files swept (sales/list-with-us, sales/why-list, sales/post-call-landing, previews/driftwood-cafe, sales/internal/sales-scripts, follow-up-emails, facebook-posts, real-estate-outreach). Tier ladder positioning is now: anyone can buy Bronze/Silver/Gold (no scarcity); the Spotlight Ad Spot at top of each sub-cat is the scarce, time-bound urgency product. Same urgency mechanic in scripts, correct product. **Notable replacements:** "Four guarantees" tile #4 changed from "One Gold per Sub-Category" to **"Built for Google + AI Search"**. Silver tier now shows "Eligible to buy any Ad Spot" + Stripe instalments line instead of "Spotlight position" X. Sales scripts shifted ~10+ urgency hooks from "one Gold per sub-cat" to "one Spotlight slot per sub-cat". A prospect seeing the demo URL + a sales call now hear a consistent pitch.
13. ✅ **PPP (Personalised Preview Page) flow retired entirely -- DONE (session 7 extended, `4c5af81`).** Jay's call: kill it. Bronze self-serve already covers "try us for free" instantly; the PPP flow was a 24h SLA + AI-quality risk treadmill that didn't fit the new model. Deleted: `previews/driftwood-cafe.html` (1062-line PPP template), `sales/list-with-us.html` #get-found form + `submitForm`/`presetTier`/warm-deep-link JS (~150 lines), `index.html` dashboard "Previews & PPPs" section block. **What replaced it on `list-with-us.html`:** Hero CTA = `Get listed in 2 minutes →` direct to `sales/create-bronze-listing.html` (Bronze self-serve as top-of-funnel); hero sub reframed to acknowledge Bronze self-serve vs Silver/Gold done-for-you split; Silver/Gold tier CTAs = `Talk to us about [tier] →` triggering `pnfOpenContact()` modal; demo section retained as a static "what each tier looks like" showcase (dropped "your business" framing, demo-cta-row removed); the "From enquiry to live listing in 24 hours" step list rebuilt as **"How a paid Silver or Gold listing comes together"** -- properly framed for the manual paid-tier process. Sales scripts swept: 3 objection responses + Day 0 + Day 3 follow-up emails reframed from "I'll send you a personalised preview" to "I'll send you a live Gold listing as a reference" + "Set up a free Bronze in 2 minutes." `Project_Master.md` §13 marked RETIRED with full reasoning + replacement model. §5 Terminology, §7 File structure, §18 Stripe task, §19 Launch plan all updated. **Bronze self-serve = top-of-funnel; Silver/Gold = paid, manual fulfilment by PB on close; Spotlight Ad Spot = scarce upsell.**
14. ✅ **§17.11 Phase 1A -- Spotlight Ad Spot inventory surface live (session 7 extended, `4ddc71e`).** Every sub-cat page's existing "Gold Spotlight - one position available" placeholder is now a real Claim CTA that routes through the contact modal with sub-cat context pre-filled. **What shipped:** (a) `nav.js` -- enhanced `pnfOpenContact(type, ctx)` to accept `{name, path}` context and pre-fill the message textarea with `"Hi - I'd like to enquire about the [name] Spotlight Ad Spot (https://papamoa.info/[path]). Please send details on availability, duration options and pricing."` + added "Spotlight Ad Spot" to the enquiry-type dropdown. (b) 61 sub-cat pages -- Claim CTA rewired from a static link to `sales/list-with-us.html` into an onclick calling `pnfOpenContact('Spotlight Ad Spot', {name, path})`. Section-title and adjacent h3 reframed from "Gold Spotlight" to "Spotlight Ad Spot" for page-local consistency. (c) 111 pages with legacy inline `pnfOpenContact()` (predates nav.js taking ownership; guarded so inline wins) patched to accept the same `(type, ctx)` signature. **What it enables on a sales call:** prospect lands on say `categories/services/plumber-papamoa.html`, sees "Spotlight Ad Spot - Plumbers & Gasfitters", clicks Claim, contact modal opens with the message pre-filled with the sub-cat name + canonical URL. Operator gets a tagged lead. **What's NOT in Phase 1A (deferred):** real impressions data per slot (needs analytics tracking); availability/inventory tracking (which slots are currently booked, expiry dates); Stripe duration-based purchase (1/3/6/12mo); admin queue to manage bookings; cron to auto-expire and re-open. Those are Phase 1B/2.
15. ✅ **Legacy inline contact-modal sweep -- DONE (session 7 extended, `e35475f`).** Phase 1A exposed a long-standing architecture issue: nav.js's `pnfOpenContact(type, ctx)` + contact modal markup were behind `if not already defined` guards, so pages that shipped inline copies (predating session-2's nav.js lock) won and the new `(type, ctx)` signature never took effect. **152 pages swept** -- removed inline `<div class="pnf-overlay" id="pnf-contact-overlay">...</div>` markup, `pnfDrawerOpen/Close`, `pnfOpenContact/Close`, `pnfOverlayClick`, `pnfSubmitContact`, and the inline Escape-key listener. nav.js's `pnfEnsureContactModal()` now finds no inline modal on load and injects its own (with the enquiry-type dropdown). Net: **4,377 lines removed** (~30 duplicate lines × 152 pages), single source of truth for the contact modal restored. **Verified live:** plumber sub-cat page (Spotlight CTA → modal with enquiry-type pre-selected + message pre-filled), community/weather page (general modal opens cleanly), listings/blackberry-eatery (renders normally), no console errors. Inline modal CSS in `<style>` blocks left in place -- dead but harmless, separate cleanup later. **Kept per page:** FAQ accordion IIFE + path-rewriter IIFE (page-specific behaviour, not duplicated by nav.js).
16. **★ NEXT real work options** (sequencing reflects Jay's "site has alot more work" framing):
    - **(0) [JAY-SIDE] `wrangler deploy` from repo root** -- pushes the new `worker.js` to prod. Covers both the Bronze-as-card `/bronze-approve` rewrite and the new `/bronze-update` endpoint that the Edit modal calls. Until deploy: the Edit modal's Save 404s, and new Bronze approvals still write stale `/listings/<slug>.html` pages. Static side is already live. **5 minutes of Jay's time.**
    - (a) **§17.11 Phase 1B -- Spotlight inventory admin page.** Internal admin page showing which sub-cats have Spotlights claimed, who holds them, when they expire, with a "release" button. Manual tracking, no Stripe yet. Pairs with the Phase 1A claim flow.
    - (b) **§17.11 Phase 2 -- Stripe duration-based Spotlight purchase.** Self-serve buy flow (1 / 3 / 6 / 12 mo) with real impressions data shown. Significant build.
    - (c) **Inline modal CSS cleanup.** 152 pages still carry dead `.pnf-overlay` / `.pnf-modal` / `.pnf-cf` CSS in their `<style>` blocks. nav.js now injects these. Mechanical Python sweep.
    - (d) **§3 / `sales/list-with-us.html` polish.** With the Bronze-as-card model locked, the "How a paid Silver or Gold listing comes together" steps may need another pass; the demo section can lean into the inline-card Bronze story too if Jay wants to show Bronze visually distinct from Silver/Gold on that page.
    - (e) **Footer migration tranche 2 -- 29 community pages still on site-footer.** Each likely needs a contextual column 3 (related community pages by topic). ~1-2h.
    - (f) **Phase A2 "How this site works" operator guide** for Carwyn dashboard.
    - (g) **Phase D CRM dashboard rebuild** through worker (currently flagged Broken on the dashboard).
    - (h) **Phase E Brevo Day 0/3/6/10 sequences** -- gated on DNS sorted post-Carwyn.
    - (i) **Site-wide Carwyn brand-rule audit** -- with tier-positioning + PPP retirement + nav/modal consolidation + Bronze-as-card all landed, time to re-run the Carwyn req #1-#8 audit on what's actually shipped vs what the reply prep claims.
    - (j) **`sales-funnel.html` deletion sweep** -- card removed from dashboard, file still on disk. If you don't want to keep the stale demo around, delete + audit refs.
12. **Self-serve Spotlights / Ad Spots** — Phase 2 (Phase 1 = Silver/Gold claim open slots). §17.11.

Smaller carry-overs: **footer follow-ups** (23 compact footers, site-footer/other systems — `docs/nav-usage.md`); **3 stub-listing footers**; **Phase A2 operator guide**. (✅ Spotlight Silver clickability bug verified non-reproducing — resolved, see §18.) (✅ Subcat orange/gold accents — partially done; hero accent fix above is the remaining piece.)

Deferred per Jay: **AI-generated listings**, **Menu** (now hidden; Phase 2 rebuild or full source strip).

---

## 6. Things NOT to do

- **Don't reply to Carwyn** until demo-site polish ships. Sequencing locked 2026-06-02.
- **Don't touch §3 pricing copy** until §17.13 (rotation) and §17.14 (monthly billing) decisions land. The locked $599 Silver / $1,199 Gold annual model is intact for now.
- **Don't use the ✉ envelope unicode** anywhere. Hard ban — see `feedback_no_envelope_icon.md` in auto-memory. Existing 134 occurrences were stripped in `4caf571`. Don't re-introduce.
- **Don't use em dashes** in client copy, comments, or code (existing memory rule). Site was swept clean in `1f3753c` — don't re-introduce; use a hyphen.
- **Don't use emoji in public content** — they were all replaced with custom inline SVG icons in `b12500a`/`e3f5e66`. Use the `.pnf-i` icon system (see gotchas) instead of an emoji. Don't paste emoji into a public page.
- **Don't add per-category colours outside the logo palette** — Blue `#359FE8` = Stay/Eat/Shop, Green `#89BE43` = Do/Services. No teal/brown/orange (Carwyn rule, locked session 3).
- **Don't re-add the old category clutter** — category pages are now: photo hero → sticky page-filter → single card-grid → listings. Don't reintroduce hero chip rows, a sticky pill bar, or a second search.
- **Don't use a text logo** — every public page uses the brand image logo (`assets/papamoa-info-asset-pack/logo/papamoa-info-logo-transparent-400w.png`), injected by `nav.js` in the nav/drawer and referenced inline in footers. If you regenerate any page, pull the image, not text.
- **Don't edit nav / drawer / footer markup or CSS per-page anymore** — as of session 2 (`f11fef4`→`bffe868`), `nav.js` is the single locked source for the nav, mobile drawer, footer styling, breadcrumb strip, and contact modal, loaded on all 225 public pages via `<div id="pnf-nav-placeholder"></div>` + `<script src="/papamoa-previews/nav.js">`. To change the nav/drawer/footer site-wide, edit `nav.js` once. Per-page footer *column* content (contextual links) still lives inline. See `docs/nav-usage.md`. (Leftover inline nav/footer CSS in old `<style>` blocks is dead weight overridden by nav.js — safe to strip in a later cleanup, don't rely on it.)
- **Don't sweep other CSS across pages indiscriminately** — many pages still have bespoke `<style>` blocks with their own variants for non-nav content.

---

## 7. Repo gotchas worth knowing

- **Brand assets live in `assets/papamoa-info-asset-pack/`** (the full pack Jay dropped 2026-06-03, session 2). The site logo is `logo/papamoa-info-logo-transparent-400w.png` (combined koru + "pāpāmoa.info" mark) — referenced by `nav.js` (nav + drawer) and every inline footer brand image. The old `papamoa-macron.png` / `papamoa.png` were removed in `90b55db`. The pack also has wordmark-only, koru-icon-only, and other logo widths if needed. To change the logo site-wide, swap the path in `nav.js` + the inline footer refs (or just drop a new file at the same path).
- **Favicon / PWA at repo root** — `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192/512.png`, `site.webmanifest`, all from the asset pack (`90b55db`). Linked in every page `<head>` (favicons + `<link rel="manifest">`). Manifest icon paths are relative so they work at both `/papamoa-previews/` preview and custom-domain launch; theme colour is brand navy `#243B59`.
- **Custom icon system (`.pnf-i`)** — `nav.js` injects a `.pnf-i` class (inline SVG: `width/height:1em`, `vertical-align:-0.125em`, `stroke:currentColor`). To add an icon, drop `<svg class="pnf-i" viewBox="0 0 24 24" aria-hidden="true">…paths…</svg>` inline — it sizes to the text and inherits its colour. This replaced all emoji site-wide. The emoji→icon swap was **text-node-only** (never inside `<script>`/`<style>`/`<title>`/attributes) — if you ever script a bulk text replace, mask those first (a naive global replace broke JSON-LD/search-index once this session before it was fixed).
- **Category-page template** — all 5 category landing pages share: photo hero (landscape crop from `assets/papamoa-category-card-backgrounds/` + navy scrim + white text) → **sticky page-filter** (`.cat-filter`, `catPageFilter()` drives `catWidgetSearch` for cards + `svcSearch` for listings) → **card-grid navigator** (`.subcat-card`, custom `.pnf-i` icons, uniform `min-height:118px`) → listings. Subcategory pages NOT yet on this template (still their own orange/gold accents + emoji-free now).
- **Subcategory pages still pending** — the food-drink/shops subcats keep their own `:root` accents (a later sweep); category *landing* pages are done.
- **`llms.txt` at repo root** — AI crawler brief. If site content or pricing changes substantially, update this too.
- **`docs/carwyn-feedback-2026-06-02.md`** — verbatim email + structured read. The structured read sources §21 of Project_Master. If the structured read changes, §21 likely needs an update too.
- **The path-rewriter script** at the bottom of most pages only handles click events, not asset loads. Use `/papamoa-previews/` prefix for image / favicon / stylesheet refs explicitly.
- **Preview server:** the repo's `.claude/launch.json` now defines **`plainblack-admin`** (port 8767, serves `..` = parent so the `/papamoa-previews/` absolute paths resolve) alongside `papamoa-static` (8766, repo root — does NOT resolve the prefix). **Use `plainblack-admin`** to preview at `http://localhost:8767/papamoa-previews/homepage.html`. The 8766 server 404s the `/papamoa-previews/` paths. (Parent `GitHub/.claude/launch.json` also has these.)
- **`docs/Project_Master.html` §12 Pending Tasks block** mirrors `.md §18`. Both updated together. The HTML's section numbers (§11 / §12 / §13 / §14 / §15) map to the .md's (§17 / §18 / §19 / §20 / §21).

---

## 8. Auto-memory rules that affect this project

- PlainBlack voice: plain, direct, slightly dry. No babysitter, no SaaS-speak, no clever-for-clever's-sake.
- No em dashes (U+2014) in client copy, comments, or code.
- No ✉ envelope unicode (U+2709) anywhere, ever.
- Use Chrome MCP for non-localhost URLs (not curl, except for status polling).
- Confirm site ownership before crawling — papamoa.info live is the client's existing Drupal site; this repo is the rebuild.
- pb-forms client allowlist must include any new site's origin before launch.

---

*End of handoff. New session: read above, glance at the live preview, ask Jay what's first. Don't guess.*

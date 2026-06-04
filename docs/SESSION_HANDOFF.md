# Session handoff — papamoa-previews

**Last updated:** 2026-06-04 (session 4) by Jay + Claude
**Last commit:** `c6ceeb3` docs: lock Bronze (Basic) tier contents
**Branch:** `main` (pushed, tree clean)

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

**#1 LIVE TASK — sales-page consolidation into `list-with-us`** (audit done, plan approved, tiers locked — just execute). Two stages:

- **Stage A (mechanical, safe):** move internal tools → `sales/internal/` (`sales-scripts.html`, `facebook-posts.html`, the two email files, `partners/real-estate-outreach.html`); their only inbound links are `index.html` + `docs/Project_Master.html` — fix those. **Merge the two follow-up email files** (`email-follow-up.html` single template + `followup-emails.html` sequence) into one.
- **Stage B (the big rewrite):** rebuild `sales/list-with-us.html` (1867L) as the **Gold | Silver | Bronze** 3-tier hub (Bronze spec in §3: NAP + link + blurb); fold in `why-list`'s "why / AI-search" content; **merge `landing.html` + `claim.html` into one Get-listed form**; trim `why-list.html` to a lean SEO article linking the hub; **repoint every site CTA to `list-with-us`**; purge the leftover "Menu Add-On" sentence copy on these pages as they're rewritten. `spotlight-ads.html` rebuild stays deferred. Match the current site style; bring the hub back for review before deleting/merging anything destructive.

**Then (the listings build):**
1. **Lock the Gold & Silver listing spec** (style/design/required data → canonical templates `listing-gold-template.html`, `listing-silver-template.html`).
2. **Bronze self-serve auto-create** — visitor creates a free Bronze listing, auto-publishes pending admin approval. ✅ Unblocked (tier locked).
3. **Self-serve Spotlights / Ad Spots** — Phase 2 (Phase 1 = Silver/Gold claim open slots). §17.11.

Smaller carry-overs: **footer follow-ups** (23 compact footers, site-footer/other systems — `docs/nav-usage.md`); **3 stub-listing footers**; subcategory pages still on old orange/gold accents; **Phase A2 operator guide**; **Spotlight Silver clickability bug** (§18 High).

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

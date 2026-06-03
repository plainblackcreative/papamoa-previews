# Session handoff — papamoa-previews

**Last updated:** 2026-06-03 (session 2) by Jay + Claude
**Last commit:** `80799b5` fix: restore 3 truncated community pages + convert to locked nav.js (#1)
**Branch:** `main` (pushed)

> **Session 2 headline (the nav/footer lock):** `nav.js` is now the single locked source for the nav, mobile drawer, and footer styling — and is loaded on **every one of the 225 public pages**. The footer shell was upgraded to the homepage canonical (logo, tagline, FB + IG, "Get in touch", trust bullets) on 120 grid footers while keeping each page's contextual columns, and nav.js injects the contact modal so "Get in touch" works everywhere. See `docs/nav-usage.md` for the full spec + remaining footer follow-ups.

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

**Decisions Jay made this session:** mechanism = nav.js single source · scope = public-facing only · category/listing nav = flat tabs everywhere (Carwyn req #3) · listings = flat nav + breadcrumb strip · footer = lock shell, keep columns · footer canonical = upgrade all to homepage shell.

**Net:** one file (`nav.js`) now owns the nav, drawer, footer styling, breadcrumb strip, and contact modal for the whole public site. Change it once → changes everywhere. No more per-page nav/footer drift.

**Footer follow-ups still open** (see `docs/nav-usage.md` "Footer follow-ups"): 23 compact (no-grid) footers; `site-footer` (38) + other footer systems (36); and the bottom-bar "Sitemap" link points at `index.html` (internal dashboard — no public sitemap exists; repoint or drop).

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

Likely next items if Jay just says "keep going":

- **Finish the footer lock** — the remaining footer follow-ups from session 2: the 23 compact (no-grid) footers, the `site-footer`/other footer systems (74 pages), and the "Sitemap → index.html" link fix. See `docs/nav-usage.md` "Footer follow-ups". Natural continuation of this session.
- **EAT/SHOP category page hero rework** — biggest visible remaining Carwyn-fix. Brown/orange palette swap to blue/green family. Pair with the imagery rule. (Header/nav visual-lift is now DONE via the nav lock — Carwyn req #3 satisfied.)
- **Phase A2: operator guide for Carwyn** — solo writing task. ~1 page document explaining how the site is managed, what each section does, how to add a lead / confirm a listing / find pricing. Fills the "How this site works" placeholder tile on `dashboard.html`.
- **Spotlight Silver clickability bug** (in §18 High) — Jay knows the surface where it lives; needs his pointer.

---

## 6. Things NOT to do

- **Don't reply to Carwyn** until demo-site polish ships. Sequencing locked 2026-06-02.
- **Don't touch §3 pricing copy** until §17.13 (rotation) and §17.14 (monthly billing) decisions land. The locked $599 Silver / $1,199 Gold annual model is intact for now.
- **Don't use the ✉ envelope unicode** anywhere. Hard ban — see `feedback_no_envelope_icon.md` in auto-memory. Existing 134 occurrences were stripped in `4caf571`. Don't re-introduce.
- **Don't use em dashes** in client copy, comments, or code (existing memory rule).
- **Don't auto-renew Carwyn's nav-text logo** — every public page now uses the brand image (`assets/papamoa-macron.png`). If you regenerate any page, pull the image, not the text.
- **Don't edit nav / drawer / footer markup or CSS per-page anymore** — as of session 2 (`f11fef4`→`bffe868`), `nav.js` is the single locked source for the nav, mobile drawer, footer styling, breadcrumb strip, and contact modal, loaded on all 225 public pages via `<div id="pnf-nav-placeholder"></div>` + `<script src="/papamoa-previews/nav.js">`. To change the nav/drawer/footer site-wide, edit `nav.js` once. Per-page footer *column* content (contextual links) still lives inline. See `docs/nav-usage.md`. (Leftover inline nav/footer CSS in old `<style>` blocks is dead weight overridden by nav.js — safe to strip in a later cleanup, don't rely on it.)
- **Don't sweep other CSS across pages indiscriminately** — many pages still have bespoke `<style>` blocks with their own variants for non-nav content.

---

## 7. Repo gotchas worth knowing

- **`assets/papamoa.png` (no macron) and `assets/papamoa-macron.png` (with macrons)** — only the macron version is in use site-wide. The plain version was the source for generating the macron version (Python + Pillow script).
- **`favicon.ico` + favicon PNGs at repo root** — generated from cropping the koru out of the logo PNG. Auto-discovered + explicitly linked on every page.
- **`llms.txt` at repo root** — AI crawler brief. If site content or pricing changes substantially, update this too.
- **`docs/carwyn-feedback-2026-06-02.md`** — verbatim email + structured read. The structured read sources §21 of Project_Master. If the structured read changes, §21 likely needs an update too.
- **The path-rewriter script** at the bottom of most pages only handles click events, not asset loads. Use `/papamoa-previews/` prefix for image / favicon / stylesheet refs explicitly.
- **`launch.json`** lives in `.claude/` at the parent `GitHub/` dir, not in this repo. Servers configured: `plainblack-site`, `plainblack-admin` (serves parent), `themarshallmethod`. Use `plainblack-admin` to preview this project at `http://localhost:8767/papamoa-previews/`.
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

# Papamoa.info — session handoff (2026-06-05)

Full per-page detail lives in **[docs/polish-audit.md](docs/polish-audit.md)**. This is the fast-start summary + the one big pending task.

## Deploy & environment (read first)
- **Repo:** `github.com/plainblackcreative/papamoa-previews`. Deploys via **GitHub Pages** (legacy, branch `main` / root). Live demo: `https://plainblackcreative.github.io/papamoa-previews/`. Build ~25–50s. Check status: `gh api repos/plainblackcreative/papamoa-previews/pages/builds --jq '.[0]'`.
- **`papamoa.info` is a SEPARATE nginx deploy** — pushing this repo does NOT update it.
- **⚠ Never commit the `papamoa-previews -> .` symlink** (gitignored). If tracked, the Pages build recurses infinitely and hangs for hours. (Already fixed; see memory.)
- **Local preview:** `preview_start` name `papamoa-static` (port 8766). Open pages at `/papamoa-previews/<path>` so absolute paths resolve via the symlink. Verify with `preview_*` tools, not Bash/Chrome.
- `homepage.html` = public homepage; `index.html` = internal dashboard. Footer markup is **inline per-page** (nav.js owns only footer CSS); **nav is nav.js** (uniform).
- Workflow each change: edit → reload preview → check console/network + render → commit → push `main` → poll the Pages build → cache-busted curl to confirm live.
- Source PNGs left untracked on purpose (optimised webp/jpg are what's referenced).

## Done & deployed this session
- **homepage.html:** hero accent "Pāpāmoa" → logo **blue** `--blue`; 6th "Dogs" quick-chip + chip-row width fix; de-duped news links; footer "For Businesses" cleaned + "Dogs in Pāpāmoa"→"News & Events"; `og:image`/twitter card; featured-card overlay 0.92.
- **nav.js:** contact-form `<label for>`/`id` (a11y, site-wide).
- **essential-info.html & community.html:** hero photos, canonical/OG/JSON-LD where missing, `pg-section-label` div→`<h2>`; community got Key-Contacts mobile-overflow fix, white icons, spotlight-card cleanup, hero photo + OG, redundant hero paragraph removed.
- **list-with-us.html:** canonical + OG + Service/Offers JSON-LD; CTA links → `<button>`; aligned the 3 pricing cards; evergreen guarantee copy (no dated years); bottom "run by locals" block → primary CTA.
- **All 9 pages:** uniform footer shell (brand · page cols · For Businesses · About · bottom bar); per-page OG cards.
- **Category pages (all 5):** semantic `<h2>` section titles; OG → per-category cards (`assets/category-og/`); "Clear search" link → `<button>`; **visual sub-category tile grid** (photo-ready `var(--sc-img, gradient)` panels).
- **accommodation.html ONLY:** rebuilt the 7 editorial sections into **image-led feature rows** (photo/branded-placeholder + tight summary + Browse chips); **editorial neutrality** — removed all specific business names from general copy + sidebar + alt + FAQ (visible + JSON-LD). Feature images in `assets/category-features/`.

## Standing conventions (memory)
- **No specific business names in general category copy** (sections, sidebars, alt, FAQ incl. JSON-LD) — independent/editorial directory. Generic only; named businesses live in listings + labelled Spotlight/Featured. Now also in `editorial-policy.html`.
- CSS for shared components goes in `nav.js`, not per-page.

## ✅ DONE (2026-06-05): merged image-led directory rolled to all 5 category pages
Commit `188619d`. The icon-tile grid and the editorial rows were **both just routers to the same sub-cat pages** (double-listing → page felt heavy). Per user's call, **merged them into ONE image-led directory**: dropped the `.cat-widget` icon grid; each editorial group is now a single `.spotlight-avail.has-photo` row (Stay-style photo/placeholder + GENERIC summary + `.sa-chips` chips to every sub-cat in the group + combined `data-tags`). The search bar (`#catf-input` → `catPageFilter` → `svcSearch`) stays and filters the rows; the dead grid JS no-ops (no `.cat-widget`).
- **accommodation** — removed 14-tile grid (rows were already image-led).
- **services** 57 tiles+57 rows → **7 rows**; **entertainment** 16+23 → **8**; **food-and-drink** 20+24 → **7**; **shopping** 22+21 → **6**.
- **Editorial neutrality from the start:** genericised every summary, sidebar fact-box, **hero subtitle**, and rewrote FAQs (visible + FAQPage JSON-LD) with no business names; stripped business names from `data-tags` too. Shopping-centre **landmarks kept** (Fashion Island, Pāpāmoa Plaza, The Sands, Bayfair) as geographic refs.
- **Chip palette fix (Carwyn):** recoloured EAT brown (`rgba(224,120,48)`) and SHOP gold (`rgba(200,150,42)`) `.sa-btn` tints → brand blue `rgba(0,176,248)`.
- **Photos:** one hero-ish row per page → webp in `assets/category-features/` (`services-trades`, `activities-what-to-do`, `food-where-to-eat`, `shopping-where-to-shop`); **all other rows are gradient `sa-photo-ph` placeholders.** Source JPEGs in `assets/papamoa-category-card-backgrounds/` left untracked.
- Verified each: search filter, no overflow/console errors, 375px mobile stacks photo-on-top, JSON-LD valid.

**Build method (reusable):** `build_merge.py` helper + per-page `cfg_*.py` (deleted after run) — drops grid by slicing `<!-- QUICK SUBCATEGORY WIDGET ... <div class="page-wrap">`, replaces `<!-- FIRST SECTION --> ... <!-- NO RESULTS -->` with generated rows, swaps whole FAQ blocks, asserts every change. Re-derive from git if needed.

## Other backlog
- Swap the 4 gradient placeholders on the Stay page for real sub-category photos (give the user ChatGPT prompts like the OG cards).
- (Optional) strip business names from category `data-tags` for full neutrality — currently kept as invisible search aids.
- Homepage "Latest local updates" content is stale (newest Apr 2026) — refresh with news/events later (user deferred).
- "Update a Listing"→list-with-us footer dupe repeats on ~14 pages — global footer cleanup pending.

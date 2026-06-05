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

## ▶ MAIN PENDING TASK: roll the image-led feature rows to the other 4 category pages
`entertainment.html` (Do) · `food-and-drink.html` (Eat) · `services.html` · `shopping.html`.
**Reference implementation:** `categories/accommodation/accommodation.html` — copy that pattern.

Per page:
1. **Add the CSS** for `.spotlight-avail.has-photo`, `.sa-photo`, `.sa-photo-ph`, `.sa-chips` — copy the block from accommodation's `<style>` (search `image-led feature row`).
2. **Replace the editorial `.section` blocks** (everything from the first section comment up to `<!-- NO RESULTS -->`) with **one `.spotlight-avail has-photo` feature row per section**: keep the `<h2 class="section-title">` (icon + title); row = photo/placeholder panel + a tight **GENERIC summary (NO business names)** + a `.sa-chips` row of `<a class="sa-btn">` Browse links (one per sub-category, hrefs from the existing per-card browse links) + **combined `data-tags`** (union of the section's old card tags, for search). A Python regex `<!-- FIRST SECTION COMMENT -->.*?(?=<!-- NO RESULTS -->)` did this cleanly on accommodation.
3. **Photos:** optimise `assets/papamoa-category-card-backgrounds/{what-to-do,where-to-eat,services-trades,where-to-shop}.jpeg` → webp in `assets/category-features/` for a hero-ish row each; **gradient placeholders (`sa-photo-ph` + icon)** for the rest (or all placeholders to start).
4. **Genericise the FAQ** (visible accordion + FAQPage JSON-LD) — remove business names, keep Q&As that have none.
5. **Verify:** search filter works (`catPageFilter`/`svcSearch`), no overflow/console errors, mobile stacks photo-on-top; commit, push, poll build, cache-busted curl.

## Other backlog
- Swap the 4 gradient placeholders on the Stay page for real sub-category photos (give the user ChatGPT prompts like the OG cards).
- (Optional) strip business names from category `data-tags` for full neutrality — currently kept as invisible search aids.
- Homepage "Latest local updates" content is stale (newest Apr 2026) — refresh with news/events later (user deferred).
- "Update a Listing"→list-with-us footer dupe repeats on ~14 pages — global footer cleanup pending.

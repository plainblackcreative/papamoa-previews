# Carwyn reply — positions + draft (prep for send)

**For:** Jay's review before sending
**Source brief:** `docs/carwyn-feedback-2026-06-02.md`
**Open questions catalogue:** Project_Master §21.3
**Status:** Draft. **Do not send** until Jay has locked positions on §17.13 (Gold rotation) and §17.14 (monthly billing), and signed off on the answers below.

---

## Part 1 — Recommended PB positions on the 10 open questions

These are my recommendations as a starting point. Some are operational facts (hosting cost, security), some need Jay's commercial call (rotation, monthly billing, multi-site price band).

### Q1 — "How easy is it for us to manage the pages and update info? Can we see the CMS?"

**Position (recommended): no traditional CMS in v1 — operator updates via PlainBlack.**

Reasoning: the site is built static for speed, GEO, and security. A CMS adds maintenance surface, hosting cost, and an attack surface that's wildly disproportionate to a directory edited <10x/month. The right answer for v1 is *PlainBlack handles edits* (we make the change, push, it's live in 60s) and Carwyn gets a single-page dashboard at `dashboard.html` showing every listing's status, expiry, and a "request edit" form that emails us.

If Carwyn pushes back, the fallback is a **minimal admin** (Cloudflare Worker route + GitHub-commit auth) that lets him edit listing fields directly. That's a 1-2 week build, not v1 scope.

**Action needed before reply:** Jay sign-off on "PB-managed edits + a status dashboard" framing vs "build a real CMS now."

### Q2 — "I will process the migration via Astro?"

**Position: PB hands off the static repo; Carwyn drives the Astro migration himself, since he offered.**

Reasoning: he wants to own that piece, and Astro is a clean structural rewrite that doesn't change the deliverable. PB stays available to consult but the migration is his.

**Caveat to flag in the reply:** the Cloudflare Worker (forms, fishing-data, PPP search, Bronze submit/approve) is *not* part of the Astro migration — it stays as-is on Cloudflare. Carwyn needs to know that.

### Q3 — "How much does or would the monthly hosting etc cost?"

**Position (fact-based answer):**

- **GitHub Pages:** $0/mo at any reasonable volume for a static directory
- **Cloudflare Worker:** $0/mo on the free tier (100k requests/day). Realistic v1 traffic = single-digit thousands of requests/day
- **Domain:** ~$25/yr for `.info` (Carwyn already owns it)
- **Stripe:** % per transaction, no monthly fee
- **Resend (email):** $0/mo at <3k emails/mo (free tier covers the Bronze welcome + nurture)
- **Brevo (Day 0/3/6/10 sequences):** $0/mo at <300 emails/day (free tier)
- **Realistic total operating cost: $0-5/mo for v1**, scaling to ~$25/mo if R2 storage or KV traffic grows beyond the free tier

This is a strong selling point. Include the table.

### Q4 — "How secure and reliable is the hosting platform, server etc?"

**Position (reassurance answer):**

- **GitHub Pages:** GitHub's enterprise infra. No SLA on the free tier but uptime has been >99.9% for years. DDoS-handled by GitHub's edge.
- **Cloudflare Worker:** 100% SLA on paid tier; the free tier we're using sits on the same edge. Cloudflare absorbs DDoS automatically.
- **No customer data on the static site.** PII (Stripe customer details, Bronze submitter contacts) lives in Stripe + Google Sheets, both with their own enterprise security postures.
- **Forms** go through `pb-forms` (PlainBlack's own form proxy), with origin allowlisting.
- **Worker secrets** (Sheets API, GitHub token, Resend) live in Cloudflare's encrypted secret store, not in the repo.

If Carwyn wants formal documentation, we can put a one-page security brief together for him to forward.

### Q5 — "What are we charged to use the AI on our websites? Monthly / per sale / annually?"

**Position: PB absorbs current AI cost. At scale, flat per-site fee.**

Current state: the only AI call is the fishing-data endpoint (Claude Haiku, <100 calls/day, ~$0.05/mo) and a now-deprecated PPP search check. Carwyn never sees an AI invoice in v1.

**For multi-site scale: ~$50-100/yr per site, flat.** This frames it as a *PB platform fee* rather than usage-based, which is easier to sell on. If Carwyn signs up TaurangaNZ.info, his AI cost is a known, fixed line item.

**Action needed:** Jay confirm the $50-100/site/yr band feels right commercially.

### Q6 — "How does it work if we want another site in another town or city?"

**Position: PB ships a templated clone — content swap + brand swap + redeploy.**

Workflow:
1. Carwyn signs the new-site agreement (separate per-site contract)
2. PB clones `papamoa-previews` → `tauranganz-previews`
3. Content swap (categories, community pages, listings) — PB drives, Carwyn supplies local copy/photos
4. Brand swap (colours, logo, favicon) — done in `nav.js` + `assets/`
5. Worker domain + Sheet provisioning
6. DNS + go-live

**Price band to propose:** $4,500-$8,500 setup, depending on content volume (categories, community articles, initial listing count). Plus the $50-100/site/yr AI fee. Plus PB's annual maintenance retainer ($X/mo TBD — Carwyn's call on whether he wants this or self-manages).

**Action needed:** Jay lock the setup-fee band before reply.

### Q7 — "Who monitors / approves public-submitted content?"

**Position: shipped. Bronze self-serve auto-create has a moderation queue.**

This question has flipped since the brief landed. The Bronze submission flow we built in session 5 (and that's now live) already has the answer:
- Visitor fills the form at `sales/create-bronze-listing.html`
- Submission lands in the Google Sheet `Papamoa.info Bronze Listings` as "pending"
- Operator (Carwyn or Jay) opens `admin/bronze-queue.html`, assigns a category + subcategory, and clicks Approve
- Worker commits the listing page to the repo, it's live in 60s
- Owner gets a welcome email

That's the moderation model. We can demo it to Carwyn live.

### Q8 — "How do renewals work when a CC has expired?"

**Position: Stripe handles dunning automatically + operator flag for stuck cases.**

Stripe defaults:
- 4 retry attempts over 2 weeks when a card declines
- Auto-email to the customer asking to update the card
- Subscription pauses if not resolved
- Listing falls back to Bronze (free tier) on lapse

For the stuck cases, operator gets a Slack/email ping and reaches out manually. Stripe also has a Customer Portal where Carwyn (or the customer themselves) can update payment methods.

This is straightforward Stripe setup. Already on the post-launch task list.

### Q9 — "Monthly payment options for businesses that can't afford up-front?" (§17.14)

**Position (recommended): Annual contracts with optional Stripe instalment plans.** *Do NOT add monthly variants.*

Reasoning:
- Annual ($599 Silver / $1,199 Gold) is the commitment level that makes the Lifetime Price Lock guarantee meaningful
- Monthly billing tends to drive higher churn (customers cancel after 2-3 months of "not seeing results")
- Stripe supports 4 or 12-month instalment plans under one annual contract — this gives Carwyn the *answer he needs* ("yes we can split it monthly") without breaking the annual model
- The instalment plan is invisible to the customer's mental model — they're still buying a year, just paying over time

This way Carwyn can sell on either cadence: "annual, $599 up-front" or "annual, 12 instalments of $50". Same commitment, same revenue, same churn dynamics.

**Action needed:** Jay sign-off on holding the annual model + adding the instalment-plan option.

### Q10 — "Should Gold Listings ROTATE between businesses?" (§17.13)

**Position (recommended): Hold the locked scarcity model. One Gold per sub-category.**

Reasoning (this is the harder one to push back on, so the framing matters):
- The Gold pitch is *"the only one in this sub-cat — first in keeps it."* That scarcity is what makes Gold worth $1,199 instead of $599
- Rotation dilutes scarcity and changes Gold from "I bought the top spot" to "I bought a 50% chance at the top spot" — same money, less perceived value
- Rotation also breaks the Lifetime Price Lock story (if a second buyer joins the rotation, they pay current price; the first buyer's lock becomes confusing)
- For sub-categories where there's strong competition for the slot, we have a better answer: **a paid Silver upgrade path** ($599 → $1,199 Gold) when the current Gold lapses, plus a waitlist Carwyn can sell from

**Acceptable counter-position if Carwyn pushes hard:** offer rotation as a *Silver* feature ("Silver rotates among up to 3 businesses per sub-cat at a slight discount, $499 each"), keeping Gold as the locked single-buyer scarcity slot. That preserves both models.

**Action needed:** Jay decide — hold scarcity, or fold to rotation, or split-the-baby (Silver rotates, Gold stays locked).

---

## Part 2 — Draft reply email

**Subject:** Re: Papamoa.info feedback — updates + answers

> Hey Carwyn,
>
> Thanks for the feedback. Most of what you flagged needed doing, so I've spent the last two weeks shipping it before replying. Quick update on what's changed, then answers to your operational questions.
>
> **What's changed on the demo site:**
>
> - **Brand palette locked to blue + green.** Brown/orange gone from EAT, the shops pages, and the activities subcats. Every category surface now uses the locked navy + brand-accent palette per your rule.
> - **Header redesigned.** The main page tabs are now the visible flat bar you see on every public page — bigger, higher contrast, clear active state. Mobile gets a slide-in drawer with the same tabs.
> - **Homepage simplified.** Killed two duplicate CTA blocks, slimmed the hero (~90px shorter), tightened the FAQ, moved Browse Categories to imagery-led cards. The Essential Info block came out. ~11% shorter overall.
> - **Imagery-led category pages.** All 5 main category landings rebuilt — photo hero, sticky filter, single card-grid with custom line icons. No more emoji.
> - **Free Bronze tier live.** Self-serve form → moderation queue → auto-publish. The free-listing lead-gen funnel you'd expect.
> - **Footer locked + nav locked.** Single source of truth across all 225 public pages. No more drift.
>
> Live preview: https://plainblackcreative.github.io/papamoa-previews/homepage.html
>
> **On your operational questions:**
>
> **CMS — there isn't one in v1, and I'd argue against building one.** A directory edited a handful of times per month doesn't earn the cost or attack surface of a CMS. I'd rather give you a single-page status dashboard at `/dashboard.html` (listings + expiries + a "request edit" form that emails me) and have PB handle the edits. If we need a real admin later, we build one — it's a 1-2 week job — but not in v1.
>
> **Astro migration — you said you'd drive it, that works for me.** I'll hand you the static repo when we're done; you take it through Astro on your end. One thing to flag: the Cloudflare Worker (forms, fishing data, search, Bronze submit + approve) stays on Cloudflare. It's not part of the static repo migration.
>
> **Monthly hosting cost — effectively $0/mo for v1.** GitHub Pages is free. Cloudflare Worker is free at our volume (100k requests/day on the free tier; we'll do single-digit thousands). Brevo + Resend are free at our email volume. Stripe is per-transaction, no monthly. Realistically we're at $0–5/mo until traffic gets serious, then maybe $25/mo if we outgrow free tiers.
>
> **Hosting security and reliability.** GitHub Pages and Cloudflare are both enterprise-grade — DDoS-handled, ~99.9%+ uptime track record, no customer PII stored on the static side (Stripe holds the payment data, Google Sheets holds the leads, both with their own enterprise security). Worker secrets live in Cloudflare's encrypted store, not in the repo. Happy to put a one-page security brief together if you want one for prospects.
>
> **AI cost.** Currently PB absorbs it — the only live AI call is the fishing-data endpoint, costs us cents per month. If we add a second site (TaurangaNZ.info etc), my proposal is a flat $50-100/site/yr platform fee that covers AI usage. Easy to sell on and predictable on your end.
>
> **Multi-site rollout.** Yes — that's the model. Clone the repo, swap content + brand, redeploy. Setup fee scales with content volume; price band is roughly $4.5k–$8.5k per site depending on category count and initial listing seed. Plus the $50-100/yr platform fee. We can walk through a TaurangaNZ.info quote whenever you're ready.
>
> **Who monitors public-submitted content.** Already shipped this with the Bronze tier — every free submission lands in a moderation queue (Google Sheet + admin page); operator assigns the right subcat and clicks Approve, then the listing page commits and goes live. I can walk you through it on a call.
>
> **Renewals / expired cards.** Stripe handles dunning automatically (4 retries over 2 weeks, auto-email to customer, subscription pauses on failure, listing drops to Bronze on lapse). For stuck cases, operator gets a flag and reaches out manually. Stripe also has a Customer Portal so customers can update cards themselves.
>
> **Monthly payment options.** My read: hold annual subscriptions as the model, but enable Stripe instalment plans so customers can split the annual into 4 or 12 monthly payments. Same commitment, same revenue, same churn dynamics — but the customer hears "yes you can pay monthly." Annual-only is what makes the Lifetime Price Lock work; switching to true monthly billing would undermine that.
>
> **Gold rotation.** This one I'd push back on. The whole pitch for Gold at $1,199 is "the only one in this sub-cat — first in keeps it." Rotation dilutes that scarcity and changes Gold from "I bought the top spot" to "I bought a 50% chance at the top spot" — same money, less perceived value. It also makes the Lifetime Price Lock guarantee confusing if rotators come and go. I'd rather keep Gold scarce and use a Silver-to-Gold upgrade path when slots lapse. **If you've got a specific case where rotation feels right, talk me through it — happy to revisit.**
>
> Let me know your reads on the two open commercial calls (monthly billing approach, Gold rotation) and I'll lock §3 accordingly. Everything else above is shipped or ready to ship.
>
> Cheers,
> Jay
>
> Jayden Brown · PlainBlack
> jay@plainblack.com

---

## Part 3 — Pre-send checklist

- [ ] Jay reviews Part 1 positions, locks his call on §17.13 (Gold rotation) and §17.14 (monthly billing)
- [ ] Jay reviews the draft reply, edits voice if needed
- [ ] Confirm multi-site price band ($4.5-8.5k) feels right commercially
- [ ] Confirm AI platform fee band ($50-100/site/yr) feels right
- [ ] If we hold scarcity on Gold (Q10), pre-commit to the "Silver upgrade path when slots lapse" mechanic so the answer doesn't feel hand-wavy
- [ ] If we hold annual on billing (Q9), make sure the Stripe instalment plan is actually configured before promising it
- [ ] Verify the live demo at the URL before sending — Carwyn will click it first
- [ ] Send via the email he wrote from (`carwyn@dotinfomarketing.co.nz`)

Once sent, §3 may need a §17.13 / §17.14 resolution paragraph (per the locked grey-areas pattern), and the Project_Master §21 open-questions block can be marked resolved.

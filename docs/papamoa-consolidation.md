# Papamoa.info — Project Consolidation
## State of Play · March 2026
### Everything locked, everything pending, everything next

---

## 1. WHAT WE'RE BUILDING

A fully automated sales and listing system for papamoa.info — a Papamoa-specific business directory targeting 50–100 paid listings at launch, scaling from there.

**The funnel in one line:**
Outreach → Main Lander → PPP → Signup Form → Onboarding → Mockup Approval → Invoice → Payment → Listing Goes Live

**The automation stack in one line:**
URL drop → Claude builds everything → GitHub hosts it → Web3Forms captures it → Make.com connects it → HubSpot tracks it → Stripe collects it → papamoa.info publishes it

---

## 2. PRODUCT — LOCKED

### Tiers
| Tier | Price | Key Features |
|---|---|---|
| Bronze | Free | Name, address, phone, website link only. No SEO, no images. Hidden by default — toggle `SHOW_BRONZE = true` to enable. Decision pending first converted lead. |
| Silver | $599 + GST/yr | Full listing, SEO description, up to 9 images, schema markup, all contact/social links, dedicated welcome Facebook post |
| Gold | $1,200 + GST/yr | Everything in Silver + Spotlight position (top of sub-category), unlimited images, AI-optimised FAQ, AEO schema, periodic Facebook features. ONE Gold per sub-category. |
| Sub Page | $150 + GST each | Service-specific SEO page added to any listing |
| Additional sub-categories (Gold) | $99 + GST each | Gold listing appears in additional sub-categories |

### Scarcity
Gold Spotlight only — one per sub-category. Silver has no scarcity. If no Gold exists in a sub-category, the PPP and directory show "Spotlight available."

### Active Launch Offer
Two-for-One Network Boost — Gold on Papamoa.info includes Silver on TaurangaNZ.info free.

### Offers Bank (situational, not all at once)
1. Two-for-One Network Boost — CURRENT LAUNCH OFFER
2. Free Gold Upgrade — Silver price gets Gold product (hesitant prospects in competitive categories)
3. Unlimited AI Sub-Pages free (Founding Member)
4. Lifetime Price Lock — price never increases on consecutive renewal
5. 2027 ROI Guarantee — no trackable return = 2027 listing free

### Guarantees (always available)
- Lifetime Price Lock
- 2027 ROI Guarantee
- Done-for-you setup

---

## 3. MARKET — LOCKED

- Papamoa population: ~37,800 (June 2024), fastest growing suburb in Tauranga
- Tauranga City: 20,364 active businesses
- Western Bay of Plenty: 30,030 businesses
- Tier 1 target: ~5,000 (Trades, Health, Professional Services)
- Tier 2 target: ~3,000 (Retail, Hospitality, Other Services)
- Top industries by volume: Trades (2,907), Professional Services (2,313), Retail (1,287), Health (1,167), Other Services (1,047), Accommodation & Food (750)
- Competitive moat: Only Papamoa-specific directory. National directories (Yellow, Finda, Cylex, BizWin) bury Papamoa businesses among thousands
- Domain authority: TaurangaNZ.info network operating since 2005 — 20-year Google trust signal is the core pitch

### Ideal Lead Checklist
1. Geography matters — local customers
2. Intent — people search "near me" or "Papamoa [service]"
3. Capacity — they want more customers now

### Avoid
Purely virtual/global businesses, referral-only micro-businesses, big box national brands, e-commerce only, heavily regulated specialists

---

## 4. TOOL STACK — LOCKED

| Tool | Role | Cost |
|---|---|---|
| Claude API | Content generation, SEO/AEO analysis, listing descriptions, Facebook posts | ~$0.02/listing |
| GitHub + GitHub Pages | Hosts all PPP preview pages at preview.papamoa.info | Free |
| Make.com | Automation glue — connects everything | $9/month |
| Google Sheets | Master lead database | Free |
| HubSpot Free | CRM — pipeline tracking, deal stages, renewal tracking | Free |
| Brevo | Automated email sequences | Free |
| Gmail (jayden@papamoa.info) | Personal outreach, manual sends | Free |
| Web3Forms | All signup and onboarding forms | Free |
| Stripe | Invoice and payment (manual Phase 1, automated Phase 2) | ~1.8% + 30c/transaction |
| ScreenshotOne | SERP screenshots for PPP | $19/month |
| Outscraper | Google Maps lead scrape | ~$10 one-time |
| papamoa.info CMS | Full admin access confirmed | Existing |

**Total running cost before first sale: ~$28/month**
**Recovered after: first listing sold**

---

## 5. FUNNEL — LOCKED

### Full Flow
```
1. OUTREACH
   Cold call / email / Facebook / Instagram / LinkedIn DM
   Goal: permission to send overview
   Never price in first DM
   Always lock in callback day

2. FIRST EMAIL / DM
   Minimal — 3-4 sentences + PPP link
   Subject line options: 6 variants (visual tease, urgency, value anchor, peer-to-peer, final close, ultra short)

3. MAIN LANDER (papamoa.info)
   Entry gate form — name, business, category
   Fires Claude analysis + notifies Jayden
   Pitch content, competitor comparison, tier overview
   CTA: "See your free preview" → PPP

4. PPP — Personal Preview Page (GitHub)
   preview.papamoa.info/{slug}
   SEO/AEO score out of 100
   Search term checker (Claude analysis → ScreenshotOne after testing)
   4-tier visual mockup (Bronze hidden by default)
   Google Reviews + TripAdvisor (Claude finds URLs)
   "Spotlight available" badge if no Gold in sub-category
   CTA → Web3Forms signup

5. SIGNUP FORM (Web3Forms)
   Tier selection + basic details
   Notifies Jayden
   Triggers welcome email

6. WELCOME EMAIL
   Confirms Founding Member status
   Links to onboarding form

7. ONBOARDING FORM (Web3Forms)
   Company name, trading name, contact person
   Admin email + customer email (separate)
   Admin phone + customer phone (separate)
   Website, social profiles
   Optional: logo (PNG/SVG), hero images (up to 5), menu/pricing docs

8. LISTING BUILD
   Claude generates description, FAQs, tags (third-party directory voice)
   Jayden reviews
   Preview link sent to client
   Client approves

9. INVOICE
   Jayden generates manually via Stripe
   Sent to client billing email
   Client pays online

10. GO LIVE
    Listing migrates from GitHub → papamoa.info CMS
    GitHub preview redirects to live listing
    Welcome email sent with live URL
    Facebook post published (Community Hero / Lifestyle & Vibes / AI-First template)
    HubSpot deal = Won
    Renewal date = payment date + 365 days
```

### Follow-Up Sequence (non-responders)
- Day 3: Mockup offer email ("Should I finish that mockup for [Business Name]?")
- Day 6: Scarcity nudge ("Quick update on the [Industry] spot")
- Day 10: Final check-in ("Closing the loop")
- Bonus: ROI Explainer (send when they ask "how does it work?")
- Always pair emails with same-day phone call

---

## 6. CONTENT & VOICE — LOCKED

### Directory Voice
Always third-party — "they/them/call them" never "we/us". Neutral editorial authority. Honest and specific including genuine strengths AND nuances. Consistency across all listings builds site-wide SEO cohesion.

### Core Pitch Pillars (appear in all materials)
1. Dominating Local Search — Papamoa-specific keyword optimisation
2. AI-Ready Visibility — structured for ChatGPT, Gemini, Perplexity, Google AI Overviews
3. Boosting Your Own Website — high-authority backlink passes SEO credit

### AI/AEO Proof Points (from Semrush)
- Google AI Overviews appear in 88% of informational searches
- Only 12% of ChatGPT citations match Google's first page results
- AI prioritises well-organised, trusted local networks
- Schema markup (FAQPage, LocalBusiness) is the key citation signal
- Co-occurrence: brand appearing consistently next to category keywords builds AI authority

### Key Principles Across All Sales Materials
- Lead with the live site URL — proves legitimacy instantly
- One Gold Spotlight per category — say it early, let it do the work
- Genuinely local is the hook — Papamoa locals are proud of their community
- Never price in the first DM
- TaurangaNZ.info is proof, not pitch — drop once, move on
- Always lock in a callback day
- Emails get shorter each time (Day 3 detailed → Day 6 half length → Day 10 shortest)

---

## 7. ASSETS BUILT — READY TO USE OR UPGRADE

| Asset | Location | Status |
|---|---|---|
| PPP (Personal Preview Page) | `/outputs/papamoa-ppp.html` | Built — needs real data injection, ScreenshotOne integration |
| First landing page (listing preview) | `/outputs/papamoa-listing-preview.html` | Built — early version, superseded by PPP |
| System brief | `/outputs/papamoa-info-system-brief.md` | Built — needs updating with new decisions |
| Master email content | `/outputs/papamoa-master-email-content.md` | Built — needs scarcity fix |
| Architecture doc | `/outputs/papamoa-landing-page-architecture.md` | Built — accurate |
| Publication automation plan | `/outputs/papamoa-publication-automation-plan.md` | Built — accurate |

### Six GitHub Pages (existing, need revision)
| Page | URL | Primary Fix Needed |
|---|---|---|
| Follow-up email sequence | plainblackcreative.github.io/papamoa-info-followup-emails | "One Gold Spotlight per category" everywhere |
| Landing page (post-call) | plainblackcreative.github.io/papamoa-info-landing | Same + `jay@` → `jayden@` + US spelling |
| Sales scripts | plainblackcreative.github.io/papamoa-info-sales-scripts | "One Gold Spotlight per category" everywhere |
| Main lander | plainblackcreative.github.io/papamoa-lander-main | Same + Web3Forms integration |
| Email HTML | plainblackcreative.github.io/papamoa-info-email | Same + US → NZ spelling |
| Editorial article | plainblackcreative.github.io/why-your-business-needs-to-be-listed-on-papamoa-info-main | Remove Papamoa Presence branding, re-attribute |

### Universal Revision List (applies to all 6 pages + all built assets)
1. "One business per industry / category" → "One Gold Spotlight per sub-category"
2. "Monthly Facebook promotions" → "Dedicated welcome post + periodic features"
3. All three Founding Member offers shown → Two-for-One Network Boost as primary launch offer only
4. US spelling → NZ/UK spelling throughout
5. `jay@papamoa.info` → `jayden@papamoa.info`

---

## 8. BRAND REFERENCE — LOCKED

| Element | Value |
|---|---|
| Primary email | jayden@papamoa.info |
| Phone | 027 533 2970 |
| Website | www.papamoa.info |
| Network | Part of TaurangaNZ.info — trusted since 2005 |
| Colours | Navy `#2B3F5C` · Blue `#3AABDE` · Green `#7DC143` · Red `#E8344A` |
| Fonts | Figtree (body) + Playfair Display (headings) — upgrade from current |
| Profile | Illustrated avatar (bald, beard, glasses, pounamu pendant, green/blue split background) |
| Logo format | www.[site].info with Māori swirl icon |
| Tagline | "Our Local Directory Online" |

---

## 9. PHASE PLAN — LOCKED

### Phase 1 — Manual Launch (now)
- Everything runs manually
- Automation tools set up but not connected
- Jayden does outreach, builds PPPs, sends invoices, publishes listings
- Goal: first 10 converted leads to prove the system

### Phase 2 — Automation (post-launch, proven flow)
- Stripe webhook → Make.com fires on payment
- GitHub redirect auto-pushed
- Welcome email auto-sent
- HubSpot auto-updated
- Renewal reminders automated
- Claude API generates Facebook post copy for Jayden review

### Phase 3 — Full Hands-Off (if CMS supports API)
- CMS API publishes listing automatically on payment
- Zero manual steps except Facebook post review
- TBD pending CMS investigation

---

## 10. WHAT'S STILL NEEDED

### Immediate — feeding in progress
- [ ] papamoa.info existing content (layout, listing examples)
- [ ] CMS backend functions and capabilities
- [ ] 6 top-level categories and all sub-categories
- [ ] Live listing examples from papamoa.info

### After content feed
- [ ] CRM/Lead management plan
- [ ] GitHub repo dashboard design
- [ ] Make.com automation scenario builds
- [ ] Web3Forms setup and integration
- [ ] Stripe product setup (Silver, Gold, Sub Page, Additional Sub-category)
- [ ] HubSpot pipeline configuration
- [ ] Brevo email sequence build
- [ ] Ultimate PPP rebuild with all data
- [ ] Ultimate main lander rebuild
- [ ] All 6 GitHub pages revised with universal fixes
- [ ] Tide times SEO page build
- [ ] Example listings build (Glenn's Glass + The Phoenix equivalents for papamoa.info)
- [ ] Bronze tier decision and build (pending first converted lead)

### Open questions
- [ ] What CMS does papamoa.info run on? (determines Phase 3 feasibility)
- [ ] Is there an existing Google Analytics / Search Console setup on papamoa.info?
- [ ] Bronze — confirmed free, or nominal fee (e.g. $49)?

---

*Consolidated: March 2026 · Papamoa.info project*

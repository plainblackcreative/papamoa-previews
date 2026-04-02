# Papamoa.info — Project Master Document
**Last updated:** March 2026
**Purpose:** Running reference for the full listing sales system. Feed new information into Claude alongside this document to maintain full context across sessions.

---

## 1. THE BUSINESS

**Product:** Paid business directory listings on Papamoa.info
**Network:** Part of a wider .info regional directory network (also includes TaurangaNZ.info and others)
**Operating since:** 2005 — 20 years of domain authority. This is the #1 sales differentiator.
**CMS access:** Full admin access confirmed. Listings are published manually by the operator.
**Owner/operator:** Jay (Tauranga, Bay of Plenty, NZ)

### Pricing
| Tier | Price | Billing |
|---|---|---|
| Standard | $599 + GST | Annual recurring |
| Premium | $1,200 + GST | Annual recurring |

### Tier Features (Proposed — needs CMS confirmation)
**Standard:**
- Business name, logo, contact details, address, map pin
- Category placement
- SEO-optimised description (~300 words)
- Website and social links
- LocalBusiness schema markup
- Google indexing via sitemap

**Premium (everything in Standard plus):**
- Extended AEO-optimised description (500+ words)
- Photo gallery (up to 10 images)
- Video embed
- Featured/priority placement in category
- FAQ section (structured for AI answer engines)
- Quarterly content refresh
- Monthly traffic report
- Cross-post to Papamoa.info social accounts

### Revenue Model
- 50 listings = ~$46K–$55K ARR
- 100 listings = ~$92K–$110K ARR
- Target mix assumption: 70% Standard, 30% Premium

### Status
- [ ] Confirm Standard vs Premium features against CMS capabilities
- [ ] Confirm whether any paid listings are currently live (needed for social proof)
- [ ] Confirm GST registration status

---

## 2. THE MARKET

### Tauranga City
- **Total active businesses:** 20,364 (2025/2026 data)
- **Western Bay of Plenty (wider region):** 30,030 businesses
- **97% are SMEs** (fewer than 20 employees) — high flexibility for marketing spend decisions

### Target Industries (Priority Order)
| Industry | Business Count | Why They Buy |
|---|---|---|
| Construction & Trades | 2,907 | High-value jobs. One kitchen reno pays for 10 years of listing fees. |
| Professional Services | 2,313 | Accountants, lawyers. Value "established authority" of a 20-year directory. |
| Retail Trade | 1,287 | Need visibility to local shoppers. |
| Health & Wellness | 1,167 | High local search volume. "Physio near me", "Dentist Tauranga". |
| Other Services | 1,047 | Mechanics, hairdressers, pet groomers. Bread and butter of local directories. |
| Accommodation & Food | 750 | High ROI from tourist traffic (Mount, Pāpāmoa). |

### Target Tiers
- **Tier 1 (~5,000 businesses):** Trades, Health, Professional Services
- **Tier 2 (~3,000 businesses):** Retail, Hospitality, Services

### Priority Suburbs
1. **Pāpāmoa Beach** (37,900+ residents) — largest suburb, surge of new businesses needing to anchor against established competitors
2. **Mount Maunganui** (21,800+ residents) — lifestyle and tourism heart, businesses willing to pay for visibility
3. **Bethlehem & Pyes Pa** (26,000+ combined) — high-income, professional services heavy

### Ideal Lead Checklist
A perfect lead answers YES to all three:
1. **Geography** — Does it matter if the customer is physically in or near Tauranga?
2. **Intent** — Do people search using "near me" or "Tauranga [service]"?
3. **Capacity** — Do they actually want more customers right now?

### Leads to Avoid
- Purely virtual or global SaaS businesses
- Referral-only micro-businesses (fully booked, no interest in new leads)
- Big box national/global brands (McDonald's, Bunnings, Countdown)
- E-commerce only businesses (no physical/service area footprint)
- Heavily regulated specialists with strict advertising ethics rules

---

## 3. THE COMPETITIVE EDGE

### The 2005 Pitch (use this in every touchpoint)
> "The reason Papamoa.info works so well is that it's been around since 2005. In Google's eyes, that's grandfather status. It has 20 years of authority that a brand-new website or a Facebook page just can't match. When you list here, you're essentially borrowing 20 years of reputation to boost your own Google ranking."

### Competitor Comparison
| Platform | Geographic Focus | Papamoa Visibility |
|---|---|---|
| Yellow NZ | National | Low — buried |
| Finda | National | Low — buried |
| BizWin NZ | National | Low — buried |
| Cylex | National | Low — buried |
| **Papamoa.info** | **Papamoa only** | **Dominant** |

No competitor targets Papamoa specifically. This is a category-of-one position.

### The Honest Disqualifier (builds trust, generates referrals)
If a lead is a poor fit, say:
> "To be honest, based on your business model, you probably wouldn't see the ROI I'd want you to get from this. You're better off focusing on [Instagram/Global SEO]. I only want to work with businesses where I know the local SEO will actually move the needle."

This positions you as a consultant, not a salesman. Poor-fit leads often refer better-fit ones.

---

## 4. THE FUNNEL ARCHITECTURE

```
Email → Personalised Preview Lander → Claim Form → Payment → CMS Publish
```

### Step by Step
1. Lead scraped from Google Maps (Outscraper)
2. Email found/verified (Hunter.io / Apollo.io)
3. Claude API generates SEO description + FAQs for their business
4. Make.com assembles personalised HTML and pushes to GitHub
5. GitHub Pages serves preview at: `preview.papamoa.info/{business-slug}`
6. Cold email sent via Brevo with personalised preview URL
7. Prospect clicks → sees their listing already built → clicks Claim
8. Tally.so form (pre-filled with their details)
9. Make.com webhook → HubSpot deal created + Stripe payment link sent
10. Stripe payment → Make.com notifies Jay to publish listing in CMS
11. Welcome email sent, listing goes live within 24 hours

### Why Personalised Landers Win
The prospect sees their own business, already listed, ready to go. The psychological trigger: "Someone has already done the work. All I have to do is claim it." Converts 3–5x better than a generic pitch page.

---

## 5. THE TOOL STACK

| Function | Tool | Cost |
|---|---|---|
| Lead scraping | Outscraper.com | ~$10–15 per 500 leads |
| Email finding | Hunter.io / Apollo.io (free tiers) | Free to start |
| CRM | HubSpot Free | Free |
| Email sequences | Brevo (300/day free) | Free |
| Automation | Make.com (Core) | $9/month |
| Landing pages | GitHub Pages | Free |
| Custom preview domain | preview.papamoa.info (CNAME) | Already owned |
| Signup form | Tally.so | Free |
| Payments | Stripe | ~1.5% + 30c NZD |
| AI content generation | Claude API (Sonnet) | ~$2 per 100 listings |
| Lead database | Google Sheets | Free |

**Total monthly cost before revenue: ~$9–12 NZD**
**Recovered after: First listing sold**

---

## 6. CONTENT & SEO STRATEGY

### Claude API Prompt (for listing generation)
```
System: You are a local business copywriter for Papamoa.info, a New Zealand 
business directory operating since 2005. Write in a warm, trustworthy, local 
tone. Avoid hype.

User: Generate a directory listing for this Papamoa business:
Name: {business_name}
Category: {category}
Address: {address}
Website: {website}

Return ONLY valid JSON:
{
  "slug": "url-safe-slug",
  "description": "400 word SEO-optimised description",
  "tags": ["tag1","tag2","tag3","tag4","tag5"],
  "faqs": [
    {"q": "Question?", "a": "Answer."},
    {"q": "Question?", "a": "Answer."},
    {"q": "Question?", "a": "Answer."}
  ],
  "opening_hours_guess": "Mon-Fri 9am-5pm"
}

Description must include natural phrases: "[category] in Papamoa", 
"Papamoa [category]", "best [category] near me Papamoa".
FAQ questions must mirror real local search queries.
```

### AEO (Answer Engine Optimisation)
Each listing is structured to surface in AI tools (ChatGPT, Perplexity, Google AI Overviews):
- FAQ section with question-based search phrases
- LocalBusiness schema markup with GeoCoordinates
- Consistent NAP (Name, Address, Phone) matching Google Business Profile
- Natural language descriptions answering "who, what, where, why"

---

## 7. EMAIL TEMPLATES

### Cold Email — Tourism/Hospitality Variant
**Subject (A/B test):**
- `Your Papamoa.info listing preview`
- `I built a listing for [Business Name]`
- `[Business Name] — have a look at this`

**Body:**
> Hi [First Name],
>
> I run Papamoa.info — the only dedicated online directory for businesses in Pāpāmoa, operating since 2005. I've put together a preview listing for [Business Name] so you can see exactly what it would look like before committing to anything.
>
> [View your preview listing →]
> preview.papamoa.info/[slug]
>
> When someone searches "best [category] in Papamoa" on Google — or asks an AI tool like ChatGPT — this is how you'd show up.
>
> Listings start from $599 + GST per year. The preview is free, no obligation.
>
> [Your name]
> Papamoa.info

### Sequence Timing
- Email 1: Day 0 — Preview link
- Email 2: Day 4 — Value-add follow-up ("20 years of Google authority")
- Email 3: Day 10 — Soft close with direct signup link

### Still to Build
- [ ] Trades/Professional Services variant (different tone — authority, trust, not tourist traffic)
- [ ] Phone script incorporating the 2005 pitch
- [ ] Referral script for disqualified leads

---

## 8. GITHUB PAGES SETUP

**Repo:** `papamoa-previews` (public)
**Pages URL:** `https://{username}.github.io/papamoa-previews/previews/{slug}.html`
**Custom domain:** `preview.papamoa.info` (CNAME to GitHub Pages)

**File structure:**
```
papamoa-previews/
├── previews/
│   ├── driftwood-cafe.html
│   ├── papamoa-surf-school.html
│   └── ...
├── assets/
│   ├── style.css
│   └── papamoa-logo.svg
└── index.html
```

**Token replacement in Make.com:**
`{{BUSINESS_NAME}}`, `{{CONTACT_FIRST_NAME}}`, `{{CATEGORY}}`,
`{{ADDRESS}}`, `{{PHONE}}`, `{{WEBSITE}}`, `{{DESCRIPTION_HTML}}`,
`{{TAGS_HTML}}`, `{{FAQS_HTML}}`, `{{SLUG}}`, `{{TALLY_FORM_URL}}`

---

## 9. 48-HOUR DEPLOYMENT CHECKLIST

### Block 1 (Hours 0–6): Accounts
- [ ] GitHub repo + Pages enabled
- [ ] CNAME: preview.papamoa.info → GitHub Pages
- [ ] Make.com account
- [ ] Brevo account + outreach email (hello@papamoa.info)
- [ ] SPF / DKIM / DMARC DNS records
- [ ] HubSpot Free CRM
- [ ] Tally.so form
- [ ] Stripe (two subscription products: $599 / $1200 + GST)

### Block 2 (Hours 6–12): Leads
- [ ] Outscraper pull (6 category searches for Papamoa)
- [ ] Clean CSV, deduplicate
- [ ] Import to Google Sheet, segment Hot/Warm/Cold
- [ ] Email enrichment for leads without emails (Hunter.io)

### Block 3 (Hours 12–20): Templates
- [ ] Finalise HTML preview template with tokens
- [ ] Test Claude API prompt with 3 real businesses
- [ ] Upload base template to GitHub

### Block 4 (Hours 20–32): Make.com Build
- [ ] Scenario: Sheet → Claude API → GitHub → Brevo
- [ ] Scenario: Tally form → HubSpot → Stripe email
- [ ] Full end-to-end test

### Block 5 (Hours 32–48): Launch
- [ ] Set 20 hot leads to "Ready to Send"
- [ ] Watch Make.com run, verify preview pages live
- [ ] Confirm 20 emails sent
- [ ] Monitor and respond

---

## 10. FILES CREATED (keep these)

| File | Description |
|---|---|
| `papamoa-listing-preview.html` | Working HTML preview page template (Driftwood Café demo) |
| `papamoa-info-system-brief.md` | Full system brief — market, product, funnel, tool stack |
| `papamoa-landing-page-architecture.md` | Technical architecture for the personalised lander system |
| `papamoa-project-master.md` | This document |

---

## 11. OPEN QUESTIONS (update as answered)

| Question | Status |
|---|---|
| Standard vs Premium feature split — what does CMS support? | Open |
| Are any paid listings currently live on the site? | Open |
| Is Jay GST registered? | Open |
| Who will handle phone outreach if used? | Open |
| What is the listing publication time per listing in the CMS? | Open |
| Are there other .info sites in the network to reference as proof? | Open |

---

## 12. INFORMATION STILL TO FEED IN

Drop any of the following to Claude alongside this document to deepen the system:

- CMS screenshots or feature list (confirms tier differentiation)
- Existing live listings (social proof, SEO benchmarks)
- Competitor pricing or positioning intel
- Decisions on outreach channel (email only vs phone + email)
- VA or sales resource decisions
- Any Google Analytics / Search Console data from papamoa.info
- Feedback from first outreach batch (open rates, replies)

---

*This document is a living brief. Re-upload to Claude at the start of each work session.*

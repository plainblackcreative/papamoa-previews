# Papamoa.info — Personalised Landing Page System
## Email → Lander → Form → Repo → Signup Architecture

---

## The Core Idea

Every prospect receives a cold email with a unique URL.
When they click it, they land on a page that already shows **their business listing** — name, description, category, contact details, FAQs — as a live preview of what they'd get if they signed up.

This is not a generic pitch page. It is a *personalised proof of value* delivered before any money changes hands.

**Psychological mechanism:** "Someone has already done the work. All I have to do is claim it."

Conversion benchmark: Personalised landing pages with pre-built mockups typically convert 3–5x higher than generic pages in B2B local business outreach.

---

## Full System Architecture

```
[Lead Data]
    ↓
Outscraper CSV (name, address, phone, website, category, email)
    ↓
Google Sheet (master lead database)
    ↓
Make.com Trigger (new row added or status = "Ready to Send")
    ↓
Claude API Call
  └── Input: business name, category, address, website, phone
  └── Output: SEO description (400w), FAQ (3 Q&As), tags, slug
    ↓
GitHub API — create file in repo
  └── File: /previews/{business-slug}.html
  └── Template: personalised HTML with injected business data
    ↓
GitHub Pages serves it at:
  └── https://papamoa.github.io/previews/{business-slug}
  OR  https://papamoa.info/preview/{business-slug} (via CNAME)
    ↓
Brevo / Instantly sends personalised cold email
  └── Hi [First Name], we've built a preview of your listing → [URL]
    ↓
Prospect clicks URL → sees their listing preview page
    ↓
Clicks "Claim This Listing" → Tally.so form (pre-filled)
    ↓
Form submitted → Make.com webhook:
  1. Create HubSpot deal
  2. Send Stripe payment link via email
  3. Tag contact as "Form Submitted"
    ↓
Stripe payment completes → Make.com webhook:
  1. Tag HubSpot deal as "Won"
  2. Notify you to publish listing on papamoa.info CMS
  3. Send welcome email to business owner
    ↓
Listing published on papamoa.info ✓
```

---

## Component Breakdown

### 1. Google Sheet — Master Lead Database

Columns:
| Column | Source |
|---|---|
| business_name | Outscraper |
| slug | Auto-generated (lowercase, hyphens) |
| category | Outscraper |
| address | Outscraper |
| phone | Outscraper |
| website | Outscraper |
| contact_name | Outscraper / manual |
| email | Outscraper / Hunter.io |
| status | Ready / Sent / Opened / Clicked / Won / Lost |
| preview_url | Auto-filled after GitHub push |
| seo_description | Auto-filled after Claude API call |
| faqs_json | Auto-filled after Claude API call |
| date_sent | Auto-filled |

Status field drives the Make.com trigger. Change row to "Ready to Send" → automation fires.

---

### 2. Claude API — Content Generation

Make.com calls the Claude API (claude-sonnet-4-20250514) with this prompt:

```
System: You are a local business copywriter for Papamoa.info, a New Zealand 
business directory. Write in a warm, trustworthy, local tone. Avoid hype.

User: Generate a directory listing for this Papamoa business:

Name: {business_name}
Category: {category}
Address: {address}
Website: {website}

Return ONLY valid JSON with this exact structure:
{
  "slug": "url-safe-slug",
  "description": "400 word SEO-optimised description...",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "faqs": [
    {"q": "Question 1?", "a": "Answer 1."},
    {"q": "Question 2?", "a": "Answer 2."},
    {"q": "Question 3?", "a": "Answer 3."}
  ],
  "opening_hours_guess": "Mon-Fri 9am-5pm"
}

Description requirements:
- First paragraph: what the business is and why locals love it
- Second paragraph: services or specialities with specific detail
- End with: who the business is ideal for
- Weave in natural keyword phrases: "[category] in Papamoa", 
  "Papamoa [category]", "best [category] near me Papamoa"
- FAQ questions must mirror real search queries about this type of business
```

Store the returned JSON fields back to the Google Sheet row.

---

### 3. GitHub Repository Setup

**Repo name:** `papamoa-previews`
**Visibility:** Public (required for GitHub Pages free tier)
**GitHub Pages:** Enabled on `main` branch, served from `/docs` or root

**File structure:**
```
papamoa-previews/
├── index.html          ← optional directory or redirect
├── _template.html      ← base HTML template (do not edit directly)
├── assets/
│   ├── style.css       ← shared styles (linked from all previews)
│   └── papamoa-logo.svg
└── previews/
    ├── driftwood-cafe.html
    ├── papamoa-surf-school.html
    ├── the-beach-motel.html
    └── ...
```

**GitHub Pages URL structure:**
`https://{your-username}.github.io/papamoa-previews/previews/{slug}.html`

**Custom domain option:**
Point `preview.papamoa.info` to GitHub Pages via CNAME record.
Result: `https://preview.papamoa.info/driftwood-cafe`
This looks far more professional and trustworthy in cold emails.

---

### 4. Make.com — GitHub Push Automation

Make.com scenario: **"Generate and Deploy Listing Preview"**

Steps:
1. **Trigger:** Google Sheets — watch for rows where `status = "Ready to Send"`
2. **HTTP Module:** POST to Claude API (`/v1/messages`) with business data → parse JSON response
3. **Google Sheets Update:** Write `seo_description`, `faqs_json`, `slug` back to row
4. **HTML Assembly:** Use Make.com Text module to inject Claude output into HTML template string
5. **GitHub API — Create File:**
   - Endpoint: `PUT https://api.github.com/repos/{owner}/papamoa-previews/contents/previews/{slug}.html`
   - Auth: GitHub Personal Access Token
   - Body: base64-encoded HTML content
6. **Google Sheets Update:** Write `preview_url` and set `status = "Preview Live"`
7. **Brevo:** Trigger personalised email sequence with `preview_url` variable

**Make.com operations per lead: ~8–10**
Free tier: 1,000 ops/month = ~100 leads/month free
Core tier ($9/month): 10,000 ops/month = ~1,000 leads/month

---

### 5. HTML Template — Injection Points

The base template uses placeholder tokens that Make.com replaces before pushing to GitHub:

```html
<!-- Replace these tokens in Make.com Text module -->
{{BUSINESS_NAME}}       → The Driftwood Café
{{CONTACT_FIRST_NAME}}  → Sarah
{{CATEGORY}}            → Food & Drink
{{ADDRESS}}             → 17 Parton Road, Pāpāmoa
{{PHONE}}               → 07 542 0000
{{WEBSITE}}             → driftwoodcafe.co.nz
{{DESCRIPTION_HTML}}    → Claude-generated paragraphs
{{TAGS_HTML}}           → <span class="tag">Specialty Coffee</span> ...
{{FAQS_HTML}}           → FAQ items (blurred on Standard preview)
{{SLUG}}                → driftwood-cafe
{{TALLY_FORM_URL}}      → https://tally.so/r/xxxxx?business={{SLUG}}
{{CURRENT_YEAR}}        → 2026
```

---

### 6. Tally.so — Signup Form

Form URL: `https://tally.so/r/your-form-id`

Include hidden field `?business={slug}` in the URL so submissions are automatically tagged in HubSpot.

Fields:
- Business name (pre-filled from URL param)
- Contact name
- Email (pre-filled from URL param)
- Phone
- Preferred tier (radio: Standard $599 / Premium $1200)
- Anything to add or change about the preview listing? (textarea)
- How did you hear about us?

On submit: Make.com webhook fires → creates HubSpot deal → sends Stripe payment link.

---

### 7. Cold Email Template (Updated for Personalised Lander)

**Subject options (A/B test these):**
- `Your Papamoa.info listing preview`
- `I built a listing for [Business Name]`
- `[Business Name] — have a look at this`

**Email body:**

> Hi [First Name],
>
> I run Papamoa.info — the only dedicated online directory for businesses in Pāpāmoa. I've put together a preview listing for [Business Name] so you can see exactly what it would look like before committing to anything.
>
> **[View your preview listing →]**
> `preview.papamoa.info/[slug]`
>
> When someone searches "best [category] in Papamoa" on Google — or asks an AI tool like ChatGPT — this is how you'd show up.
>
> Listings start from $599 + GST per year. The preview is free, no obligation.
>
> [Your name]
> Papamoa.info

---

## Cost Summary

| Tool | Plan | Monthly Cost |
|---|---|---|
| GitHub + GitHub Pages | Free | $0 |
| Claude API (content gen) | ~500 tokens per listing | ~$2 per 100 listings |
| Make.com | Core | $9 |
| Brevo (email) | Free (300/day) | $0 |
| Tally.so | Free | $0 |
| Stripe | Per transaction | ~$11 per sale |
| Google Sheets | Free | $0 |
| HubSpot CRM | Free | $0 |
| Custom domain (preview.papamoa.info) | Already owned | $0 |

**Total recurring cost: ~$9–11/month before sales**
**Recovered: After first listing sold**

---

## 48-Hour Deployment Sequence (Revised)

### Block 1 (Hours 0–6): Accounts & Infrastructure
- [ ] Create GitHub account and `papamoa-previews` repo
- [ ] Enable GitHub Pages on repo
- [ ] Set up CNAME: `preview.papamoa.info` → GitHub Pages
- [ ] Create Make.com account
- [ ] Create Brevo account
- [ ] Create HubSpot CRM
- [ ] Create Tally.so form
- [ ] Set up Stripe with two subscription products

### Block 2 (Hours 6–12): Lead Pull & Sheet Setup
- [ ] Run Outscraper for Papamoa businesses
- [ ] Clean CSV, add to Google Sheet
- [ ] Segment by category, mark top 50 as "Ready to Send"

### Block 3 (Hours 12–20): Template + Claude Prompt
- [ ] Finalise HTML template with all `{{TOKEN}}` placeholders
- [ ] Test Claude API prompt in Claude.ai with 3 sample businesses
- [ ] Refine prompt until output is consistently good quality
- [ ] Upload base template to GitHub repo

### Block 4 (Hours 20–32): Make.com Automation Build
- [ ] Build Make.com scenario (Sheet → Claude → GitHub → Brevo)
- [ ] Test with 3 real leads — check GitHub files appear correctly
- [ ] Test Tally → HubSpot → Stripe email flow
- [ ] Full end-to-end dry run

### Block 5 (Hours 32–48): Launch First Batch
- [ ] Set 20 hot leads to "Ready to Send" in the Sheet
- [ ] Watch Make.com run, verify 20 preview pages appear on GitHub
- [ ] Confirm 20 emails go out via Brevo
- [ ] Monitor opens and clicks
- [ ] Manually follow up any same-day replies

---

## Scaling Notes

Once the system is proven with 20 leads:
- Increase batch size to 50/day (within Brevo free limit of 300/day)
- If open rates are good (>25%), the bottleneck will be listing publication speed — create a templated CMS workflow or bring in a VA to publish faster
- Consider adding a LinkedIn outreach layer using the same personalised URL — same system, different channel
- At 50+ listings sold, consider migrating preview pages from GitHub Pages to a subdirectory on papamoa.info itself for maximum SEO value

---

*Architecture document — Papamoa.info · March 2026*

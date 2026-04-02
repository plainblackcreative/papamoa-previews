# Papamoa.info — Master Setup Documentation
## Google Sheet + Tool Stack + GitHub Automation + API Proxy
### Build before launch — Phase 1 manual, Phase 2 automated

---

## PART 1 — TOOL STACK DECISIONS (FINAL)

All tools selected for free tier at launch. Paid tools introduced only when justified by revenue.

| Tool | Role | Cost | When to set up |
|---|---|---|---|
| Google Sheets | Master database — all lead and listing data | Free | Now |
| Web3Forms | All forms — signup, onboarding, contact | Free (250/mo) | Before first outreach |
| Gmail (jayden@papamoa.info) | Personal outreach + manual email sends | Free | Already exists |
| Brevo | Automated follow-up sequences (Day 3/6/10) | Free (300/day) | Before first outreach |
| Make.com | Automation glue — connects all tools | Free (1,000 ops/mo) → $9/mo Core | After first 5 leads |
| GitHub Pages | Hosts all PPP preview pages | Free (public repo) | Before first outreach |
| Claude API | Generates listing content, SEO scores, Facebook posts | ~$0.02/listing | Before automation build |
| Cloudflare Workers | Proxies Claude API calls from PPP (search checker) | Free (100k req/day) | Before PPP goes live |
| ScreenshotOne | SERP screenshot on PPP | $19/mo | After testing phase |
| Stripe | Invoice + payment links | ~1.8% + 30c/transaction | Prepared now, activated at first sale |

**Tools deliberately avoided:**
- HubSpot — replaced by Google Sheets + Make.com + GitHub dashboard
- Monday.com — replaced by GitHub dashboard
- Zapier — replaced by Make.com (better free tier)
- Instantly.ai — defer until volume justifies cost
- Tally.so — replaced by Web3Forms (simpler, free)

---

## PART 2 — GOOGLE SHEET SETUP

**Sheet name:** `Papamoa.info — Master CRM`
**Owner:** jayden@papamoa.info
**Visibility:** Private — Jayden only
**Make.com connection:** Google Sheets module via OAuth

### Create the sheet
1. Go to sheets.google.com
2. Create new spreadsheet
3. Rename to `Papamoa.info — Master CRM`
4. Create 3 tabs: `LEADS` · `LISTINGS` · `RENEWALS`

---

### TAB 1 — LEADS

Every prospect. One row per business. Added when first contacted.

| Col | Name | Type | Values |
|---|---|---|---|
| A | ID | Text | PPI-001, PPI-002... (manual at launch) |
| B | Business Name | Text | Official trading name |
| C | Slug | Text | url-safe e.g. driftwood-cafe |
| D | Contact Name | Text | Person Jayden spoke to |
| E | Email | Text | Primary outreach email |
| F | Phone | Text | Primary outreach phone |
| G | Website | Text | Full URL incl. https:// |
| H | Category | Dropdown | Accommodation / Activities / Food & Drink / Shops / Services |
| I | Sub-Category | Text | e.g. Cafes, Plumbers, Motels |
| J | Tier Interest | Dropdown | Silver / Gold / Unknown |
| K | Lead Source | Dropdown | Cold Call / Facebook DM / Instagram DM / LinkedIn DM / Cold Email / Referral / Inbound |
| L | Status | Dropdown | See status values below |
| M | Preview URL | Text | https://preview.papamoa.info/{slug} |
| N | PPP Built | Checkbox | Tick when PPP is live on GitHub |
| O | Date First Contact | Date | DD/MM/YYYY |
| P | Date Email 1 Sent | Date | Day 3 follow-up |
| Q | Date Email 2 Sent | Date | Day 6 follow-up |
| R | Date Email 3 Sent | Date | Day 10 follow-up |
| S | Date PPP Sent | Date | When preview link was shared |
| T | Call Back Date | Date | Committed callback day |
| U | Response | Dropdown | No Reply / Interested / Not Now / Not Interested / Wrong Fit |
| V | Notes | Text | Free text — call notes, objections, context |

**Status dropdown values (column L):**
New Lead → Contacted → PPP Sent → Engaged → Form Submitted → Onboarding → Approved → Invoiced → Paid → Published → Lost → Not Now

**How to add data validation dropdowns in Google Sheets:**
1. Click the column header to select the whole column
2. Data → Data Validation → Add Rule
3. Criteria: Dropdown (from a list)
4. Enter values separated by commas
5. Click Done

---

### TAB 2 — LISTINGS

Only businesses that have paid and gone live. One row per active listing.

| Col | Name | Type | Values |
|---|---|---|---|
| A | ID | Text | Matches LEADS tab ID |
| B | Business Name | Text | |
| C | Slug | Text | |
| D | Tier | Dropdown | Silver / Gold / Bronze |
| E | Category | Dropdown | |
| F | Sub-Category | Text | Primary sub-category |
| G | Additional Sub-Categories | Text | Comma separated if multiple |
| H | Sub-Pages | Number | Count of published sub-pages |
| I | Live URL | Text | https://papamoa.info/business/{slug} |
| J | TaurangaNZ URL | Text | Gold only — their TaurangaNZ.info listing URL |
| K | Admin Email | Text | Invoice and admin contact |
| L | Customer Email | Text | Public-facing contact |
| M | Admin Phone | Text | |
| N | Customer Phone | Text | |
| O | Logo URL | Text | Link to uploaded file |
| P | Payment Date | Date | |
| Q | Invoice Number | Text | |
| R | Annual Value | Currency | NZD excl. GST |
| S | Renewal Date | Date | = Payment Date + 365 days (formula: =O2+365) |
| T | Renewal Status | Dropdown | Active / Renewal Due / Renewed / Lapsed |
| U | Facebook Post Date | Date | When welcome post was published |
| V | GA Connected | Checkbox | When Google Analytics is tracking listing |
| W | Notes | Text | |

---

### TAB 3 — RENEWALS

Auto-populated by Make.com (Phase 2). Manual tracking at launch.
Shows all listings with renewal dates within the next 60 days.

| Col | Name | Formula / Source |
|---|---|---|
| A | Business Name | Manual or pulled from LISTINGS tab |
| B | Tier | Manual |
| C | Renewal Date | Manual |
| D | Days Until Renewal | =C2-TODAY() |
| E | Status | Dropdown: Active / 30-Day Notice Sent / 7-Day Notice Sent / Renewed / Lapsed |
| F | Renewal Value | Manual — same as original or updated |
| G | Notes | Free text |

**Conditional formatting for RENEWALS tab:**
- Days Until Renewal < 7 → Red background
- Days Until Renewal 7–30 → Amber background
- Days Until Renewal > 30 → Green background

To set: Format → Conditional Formatting → Custom formula
- Red: `=D2<7`
- Amber: `=AND(D2>=7,D2<=30)`
- Green: `=D2>30`

---

## PART 3 — MAIN LANDER FORM-TO-EMAIL FLOW

**The question:** When a prospect fills in the "Test Your Visibility" form on the main lander, what happens next?

**Decision: Semi-automated at launch, fully automated in Phase 2**

### Phase 1 — Launch (manual)

```
Prospect fills in form (name, business name, website, category, email)
        ↓
Web3Forms sends submission to jayden@papamoa.info
        ↓
Jayden receives email notification with all details
        ↓
Jayden manually builds PPP (or triggers Claude to build it)
        ↓
Jayden manually emails prospect with PPP link
        Subject: "Your Papamoa.info visibility report is ready"
        Body: 3 sentences + PPP link + signature
        Send from: jayden@papamoa.info via Gmail
        ↓
Row added to LEADS tab manually
```

**Expected turnaround at launch:** Same day or next morning.
**This is acceptable for Phase 1** — the form sets expectations:
> "We'll send your personalised preview within 24 hours."

### Phase 2 — Automated

```
Form submitted → Web3Forms webhook → Make.com
        ↓
Make.com calls Claude API with business URL
        ↓
Claude returns: SEO score, description, FAQs, tags, slug
        ↓
Make.com pushes PPP HTML to GitHub via API
        ↓
Make.com sends email via Brevo: "Your preview is ready → [URL]"
        ↓
Make.com adds row to Google Sheet
        ↓
Jayden receives Slack/email notification
```

**Form fields on main lander:**
- First name (required)
- Business name (required)
- Website URL (required — Claude uses this for analysis)
- Category (dropdown — required)
- Email address (required)
- Phone (optional)

**Web3Forms setup for this form:**
- Create form at web3forms.com
- Get access key
- Add hidden field: `form_name` = `main-lander-visibility`
- Set redirect: back to same page with `?submitted=true`
- Notification email: jayden@papamoa.info

---

## PART 4 — GITHUB AUTOMATION SETUP

### Repository Structure

**Two repos needed:**

**Repo 1: `papamoa-previews`**
- Visibility: Public (required for free GitHub Pages)
- Purpose: Hosts all PPP pages
- URL pattern: `preview.papamoa.info/{slug}`
- Branch: `main`
- Pages settings: Settings → Pages → Source: Deploy from branch → Branch: main → Folder: / (root)

**Repo 2: `papamoa-dashboard`**
- Visibility: Private (Jayden only)
- Purpose: CRM dashboard — reads from Google Sheet via API
- Not served via Pages — opened locally or via GitHub Codespaces

### Custom Domain Setup (preview.papamoa.info)

1. In papamoa.info domain DNS settings, add:
   - Type: CNAME
   - Name: preview
   - Value: `{your-github-username}.github.io`
2. In GitHub repo `papamoa-previews`:
   - Settings → Pages → Custom domain → enter `preview.papamoa.info`
   - Tick "Enforce HTTPS"
3. Add a file named `CNAME` to the root of the repo containing:
   ```
   preview.papamoa.info
   ```
4. DNS propagation takes up to 24 hours

### PPP File Structure in Repo

```
papamoa-previews/
├── CNAME                          ← custom domain file
├── index.html                     ← optional: redirect to papamoa.info
├── assets/
│   ├── style.css                  ← shared styles (optional — can be inline)
│   └── papamoa-logo.png           ← logo asset
└── previews/
    ├── driftwood-cafe.html        ← PPP for The Driftwood Café
    ├── papamoa-surf-school.html   ← PPP for Papamoa Surf School
    └── ...
```

URL result: `https://preview.papamoa.info/previews/driftwood-cafe.html`

Or for cleaner URLs, use root-level files:
```
papamoa-previews/
├── driftwood-cafe.html
└── ...
```
URL result: `https://preview.papamoa.info/driftwood-cafe.html` ← cleaner, use this

### How Claude Builds and Uploads a PPP (Phase 2)

**Make.com scenario — "Build and Deploy PPP":**

1. Trigger: New row in Google Sheet with `Status = Ready to Build`
2. HTTP module: POST to Claude API
   - Model: claude-sonnet-4-20250514
   - Prompt: [listing content generation prompt — see Part 6]
   - Input: business name, website URL, category, sub-category, contact details
   - Output: JSON with description, FAQs, tags, slug, SEO score items
3. Text module: Inject Claude output into PPP HTML template
   - Replace all `{{TOKEN}}` placeholders with real data
4. GitHub module: Create or Update File
   - Repo: papamoa-previews
   - Path: `{slug}.html`
   - Content: base64-encoded HTML
   - Commit message: `Add PPP: {business-name}`
   - Branch: main
5. Google Sheets module: Update row
   - Set `Preview URL` = `https://preview.papamoa.info/{slug}`
   - Set `PPP Built` = TRUE
   - Set `Status` = PPP Sent

**GitHub API call structure (for reference):**
```
PUT https://api.github.com/repos/{owner}/papamoa-previews/contents/{slug}.html

Headers:
  Authorization: token {GITHUB_PERSONAL_ACCESS_TOKEN}
  Content-Type: application/json

Body:
{
  "message": "Add PPP: Business Name",
  "content": "{base64-encoded-html}",
  "branch": "main"
}
```

**GitHub Personal Access Token setup:**
1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Generate new token
3. Scopes: tick `repo` (full control of private repositories)
4. Copy token — save it in Make.com credentials, never in code
5. Token expires — set to 1 year, add reminder to renew

### Post-Payment: GitHub Redirect

When a listing is paid and goes live on papamoa.info, update the PPP file on GitHub to redirect:

```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="refresh" content="0; url=https://papamoa.info/business/{slug}">
<script>window.location.href = "https://papamoa.info/business/{slug}";</script>
</head>
<body>
<p>Redirecting to live listing...</p>
</body>
</html>
```

Replace entire file content with the above. The preview URL now forwards to the live listing permanently.

---

## PART 5 — PPP API PROXY (Cloudflare Worker)

**The problem:** GitHub Pages is a static host. It cannot make authenticated API calls to Claude directly — the API key would be exposed in the HTML source. A proxy is needed.

**The solution:** A Cloudflare Worker acts as a middleman. The PPP calls the Worker, the Worker calls Claude with the stored API key, returns the result. Free tier: 100,000 requests per day.

### Setup Steps

**Step 1: Create Cloudflare account**
- Go to cloudflare.com → Sign up (free)
- No domain needed for Workers

**Step 2: Create a Worker**
- Cloudflare dashboard → Workers & Pages → Create Application → Create Worker
- Name it: `papamoa-claude-proxy`
- Click Deploy (default code is fine for now)

**Step 3: Add the Worker code**

Click "Edit Code" and replace with:

```javascript
export default {
  async fetch(request, env) {
    // Allow CORS from GitHub Pages domain
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': 'https://preview.papamoa.info',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const body = await request.json();
    const { searchTerm, businessName, category } = body;

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        messages: [{
          role: 'user',
          content: `You are checking local search visibility for a business directory.

Business: ${businessName}
Category: ${category}
Search term entered by prospect: "${searchTerm}"

Search the web for this term and check if papamoa.info ranks for it or similar terms.
Return a JSON object only (no markdown):
{
  "found": true/false,
  "headline": "one sentence result headline",
  "body": "2-3 sentence explanation of what this means for the business",
  "positive": true/false
}`
        }],
        tools: [{
          type: 'web_search_20250305',
          name: 'web_search'
        }]
      })
    });

    const data = await claudeResponse.json();

    // Extract text response
    const textBlock = data.content?.find(b => b.type === 'text');
    const text = textBlock?.text || '{"found":false,"headline":"Unable to check","body":"Please try again.","positive":false}';

    // Parse JSON from Claude response
    let result;
    try {
      result = JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch {
      result = { found: false, headline: 'Check unavailable', body: 'Please try a different search term.', positive: false };
    }

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://preview.papamoa.info',
      }
    });
  }
};
```

**Step 4: Add the Claude API key as a secret**
- Worker page → Settings → Variables → Add Variable
- Variable name: `CLAUDE_API_KEY`
- Value: your Anthropic API key
- Type: Secret (encrypted)
- Save

**Step 5: Get the Worker URL**
- Your Worker URL will be: `https://papamoa-claude-proxy.{your-subdomain}.workers.dev`
- Copy this URL

**Step 6: Update PPP HTML**

In the PPP's `checkSearchTerm()` function, replace the simulated timeout with:

```javascript
async function checkSearchTerm() {
  const input = document.getElementById('search-term-input');
  const term = input.value.trim();
  const result = document.getElementById('search-result');
  const btn = document.getElementById('check-btn');

  if (!term) return;

  btn.disabled = true;
  btn.textContent = 'Checking...';

  try {
    const response = await fetch('https://papamoa-claude-proxy.{your-subdomain}.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchTerm: term,
        businessName: BUSINESS.name,
        category: BUSINESS.category
      })
    });

    const data = await response.json();

    result.className = `search-result ${data.positive ? 'positive' : 'negative'} showing`;
    result.innerHTML = `
      <div class="result-headline">${data.headline}</div>
      <div class="result-body">${data.body}</div>
      <button class="btn-retry" onclick="resetSearch()">Try a different search</button>
    `;
  } catch (err) {
    result.className = 'search-result negative showing';
    result.innerHTML = `
      <div class="result-headline">Search check unavailable</div>
      <div class="result-body">Please try again or call Jayden on 027 533 2970.</div>
      <button class="btn-retry" onclick="resetSearch()">Try again</button>
    `;
  }

  btn.disabled = false;
  btn.textContent = 'Check';
}
```

**When to implement:** Before PPP goes live for first real prospect. Cloudflare Worker takes about 10 minutes to set up.

---

## PART 6 — CLAUDE API LISTING CONTENT PROMPT

This is the production prompt used by Make.com to generate listing content for every new lead.

### System Prompt
```
You are a professional listing writer for Papamoa.info, a local business directory for Pāpāmoa, New Zealand.

Write all content from the directory's perspective — never from the business's own voice.
Use third-party editorial tone: "they offer", "the team provides", "customers can expect."
Never use: "we", "our", "us", "you will", "contact us."

Be specific and honest. Include genuine strengths and any relevant nuances.
Avoid marketing fluff. Write as a trusted local guide would describe the business.

Always return valid JSON only. No markdown, no preamble.
```

### User Prompt (injected per business)
```
Generate a directory listing for this Papamoa business:

Name: {{BUSINESS_NAME}}
Category: {{CATEGORY}}
Sub-category: {{SUB_CATEGORY}}
Address: {{ADDRESS}}
Phone: {{PHONE}}
Website: {{WEBSITE}}
Additional info: {{ANY_NOTES_FROM_ONBOARDING}}

Return this exact JSON structure:
{
  "slug": "url-safe-business-name",
  "seo_title": "Business Name — Service Type in Papamoa, NZ | Papamoa.info",
  "description_short": "One sentence, 20-30 words, third-party voice",
  "description_main": "Two paragraphs, 150-200 words total. Third-party voice. Weave in natural keyword phrases: '[category] in Papamoa', 'Papamoa [category]', '[service] near me Papamoa'",
  "description_more_info": "Two paragraphs, 200-250 words. More detailed. Include specific services, any notable strengths, who it suits best. Third-party voice. SEO-optimised.",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "services_list": ["Service 1", "Service 2", "Service 3"],
  "faqs": [
    {"q": "Question targeting real search query?", "a": "Direct answer, 2-3 sentences."},
    {"q": "Second question?", "a": "Answer."},
    {"q": "Third question?", "a": "Answer."}
  ],
  "seo_score": {
    "overall": 35,
    "items": [
      {"status": "fail", "label": "Schema markup", "note": "No LocalBusiness schema detected"},
      {"status": "fail", "label": "AI search visibility", "note": "Not appearing in ChatGPT or Perplexity"},
      {"status": "warn", "label": "Directory citations", "note": "Found on Finda, missing from 4 major NZ directories"},
      {"status": "pass", "label": "Website present", "note": "Live website found"},
      {"status": "warn", "label": "Local keywords", "note": "Weak use of Papamoa on website pages"},
      {"status": "fail", "label": "Google Business Profile", "note": "Incomplete or not optimised"}
    ]
  },
  "facebook_post_community": "Community Hero post for trades/services businesses",
  "facebook_post_lifestyle": "Lifestyle & Vibes post for food/retail/activities businesses",
  "opening_hours_guess": "Mon-Fri 9am-5pm (verify with business)"
}
```

### Quality Check Before Using Output
Before Jayden pastes into CMS, verify:
- [ ] No first-person voice anywhere
- [ ] Description mentions "Papamoa" at least twice
- [ ] FAQs read like real search queries
- [ ] Tags are specific, not generic
- [ ] SEO score items reflect honest gaps

---

## PART 7 — EMAIL DOMAIN AUTHENTICATION

Must be completed before any cold outreach. Unauthenticated domains land in spam.

**Domain:** papamoa.info
**Sending address:** jayden@papamoa.info
**Tool:** Gmail (personal send) + Brevo (automated sequences)

### Step 1 — Gmail Send As Setup
If jayden@papamoa.info is a Google Workspace account this is already handled.
If using Gmail alias:
1. Gmail Settings → Accounts → Add another email address
2. Enter jayden@papamoa.info
3. Follow verification steps

### Step 2 — SPF Record
Add to papamoa.info DNS:
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com include:spf.brevo.com ~all
```
This allows both Gmail and Brevo to send from papamoa.info.

### Step 3 — DKIM for Brevo
1. Brevo → Senders & Domains → Add a domain → papamoa.info
2. Brevo provides DKIM DNS record values
3. Add to papamoa.info DNS as instructed
4. Verify in Brevo dashboard

### Step 4 — DMARC Record
Add to papamoa.info DNS:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:jayden@papamoa.info
```
Start with `p=none` (monitor only). Move to `p=quarantine` after 30 days if no issues.

### Step 5 — Email Warmup
Before sending cold outreach at volume:
1. Send 10 real emails from jayden@papamoa.info over 3 days (to friends, test accounts)
2. Reply to some of them — inbox activity builds sender reputation
3. Start outreach batches small: 20/day for week 1, 50/day for week 2, 100/day from week 3
4. Monitor spam placement — ask early recipients to check their spam folder

**When to implement:** Set up DNS records immediately. Warmup begins the week before first outreach batch.

---

## PART 8 — STRIPE PREPARATION (Launch-Ready, Not Yet Active)

Stripe is prepared but payment links are not distributed until the manual invoice process is proven.

### Setup Steps (Do Now)
1. Create Stripe account at stripe.com
2. Set business name: Papamoa.info
3. Set currency: NZD
4. Enable GST:
   - Settings → Tax → Add New Rate
   - Country: New Zealand
   - Rate: 15%
   - Name: GST
   - Inclusive: No (added on top)
5. Create Products:
   - Silver Listing — $599 NZD/year recurring
   - Gold Listing — $1,200 NZD/year recurring
   - Sub Page — $150 NZD one-time
   - Additional Sub-Category — $99 NZD one-time
   - Bronze Listing — $99 NZD lifetime (create but don't activate)
6. Create Payment Links for each product (Stripe dashboard → Payment Links)
7. Copy all Payment Link URLs into a notes doc — do not embed in PPP yet

### For Manual Invoice Process (Phase 1)
1. Stripe dashboard → Invoices → Create Invoice
2. Enter customer name and email
3. Add line item (Silver or Gold listing + GST)
4. Add memo: "Founding Member — Lifetime Price Lock applies"
5. Send invoice — customer receives email with card payment link
6. When paid, Stripe shows payment confirmed

### Stripe Webhook (Phase 2 — do not configure yet)
When ready to automate payment:
1. Stripe → Developers → Webhooks → Add Endpoint
2. Endpoint URL: your Make.com webhook URL
3. Events to listen for: `invoice.paid`, `customer.subscription.created`
4. Copy webhook signing secret into Make.com

---

## PART 9 — IMPLEMENTATION ORDER

Do these in sequence. Do not skip ahead.

### Week 1 — Before Any Outreach
- [ ] Create Google Sheet with all 3 tabs and columns
- [ ] Set up Web3Forms account, create main lander form
- [ ] Set up Brevo account, verify sending domain
- [ ] Add SPF/DKIM/DMARC DNS records for papamoa.info
- [ ] Create GitHub repo `papamoa-previews`, enable Pages, set up custom domain CNAME
- [ ] Create Cloudflare Worker for Claude API proxy
- [ ] Set up Stripe account, create products (do not share payment links yet)
- [ ] Begin email warmup (10 real emails over 3 days)

### Week 2 — Build & Test
- [ ] Write and test Claude API listing prompt with 3 real Papamoa businesses
- [ ] Build first manual PPP for a placeholder business
- [ ] Upload to GitHub, verify preview.papamoa.info/{slug} loads correctly
- [ ] Test Web3Forms submission → email notification to jayden@papamoa.info
- [ ] Test Cloudflare Worker → PPP search checker works with real queries
- [ ] Do full manual end-to-end test: fake lead → PPP built → form submitted → invoice → payment confirmed

### Week 3 — First Real Outreach
- [ ] Select first 20 hot leads from Google Sheet (accommodation, food, trades)
- [ ] Build PPPs manually for top 5 prospects before calling
- [ ] Begin cold call / DM outreach
- [ ] Send Day 3/6/10 follow-up emails manually via Gmail
- [ ] Log everything in Google Sheet

### Month 2 — Automation
- [ ] Set up Make.com account
- [ ] Build Make.com scenario: Sheet trigger → Claude API → GitHub push → Brevo email
- [ ] Test with 3 synthetic leads
- [ ] Go live with automation for new leads

---

*Setup documentation — Papamoa.info · PlainBlack · March 2026*

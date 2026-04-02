# Papamoa.info — Listing Publication Automation Plan
## Phase 1: Manual Launch | Phase 2: Full Automation

---

## OVERVIEW

The listing lifecycle has three states:

1. **Preview** — lives on GitHub Pages at `preview.papamoa.info/{slug}`
2. **Approved** — client has signed off, invoice sent, awaiting payment
3. **Live** — published on `papamoa.info/business/{slug}`, GitHub preview redirects or is retired

The goal is to build the automation architecture now, execute it manually at launch, and switch to automated triggers once the flow is proven.

---

## FULL AUTOMATION ARCHITECTURE (Build now, automate later)

```
PAYMENT RECEIVED (Stripe webhook)
        ↓
Make.com — Stripe trigger fires
        ↓
1. HubSpot deal → status "Won"
2. Google Sheet row → status "Live"
3. GitHub API → update preview HTML
   (inject redirect to live listing URL)
4. Notify Jayden → "Publish this listing"
   (email or Slack message with all content)
5. Send client welcome email via Brevo
   (live listing link + Facebook post notice)
        ↓
Jayden publishes listing in CMS (manual step)
        ↓
Jayden marks row "Published" in Google Sheet
        ↓
Make.com trigger (status = "Published")
        ↓
Facebook post content generated via Claude API
Jayden reviews + posts to Papamoa Facebook groups
```

---

## PHASE 1 — MANUAL LAUNCH PROCESS

Every step below is done by Jayden manually. The tools are all set up, just not connected yet.

### Step 1 — Client approves mockup
- Jayden receives approval reply or confirmation
- Google Sheet row updated: status → "Approved"
- HubSpot deal stage → "Approved"

### Step 2 — Send invoice
- Open Stripe dashboard
- Create invoice: business name, amount ($599 or $1200 + GST), billing email
- Send via Stripe (client receives email with card payment link)
- Log invoice number in Google Sheet

### Step 3 — Payment received
- Stripe dashboard shows payment complete
- Jayden manually updates Google Sheet: status → "Paid"
- HubSpot deal stage → "Won"

### Step 4 — Publish listing on papamoa.info
- Open CMS
- Copy content from GitHub preview page:
  - Business name, address, phone, website
  - Claude-generated description
  - Tags / services list
  - FAQ section (Gold only)
  - Images (from onboarding form upload)
- Publish listing
- Copy live URL (`papamoa.info/business/{slug}`)
- Update Google Sheet: `live_url` column, status → "Published"

### Step 5 — Retire GitHub preview
- Open GitHub repo
- Edit `previews/{slug}.html`
- Replace entire body content with redirect:

```html
<meta http-equiv="refresh" content="0; url=https://papamoa.info/business/{slug}">
<script>window.location.href = "https://papamoa.info/business/{slug}";</script>
```

- Commit change
- Preview URL now forwards to live listing automatically

### Step 6 — Send welcome email
- Open Brevo (or Gmail)
- Send welcome email to client:
  - Live listing link
  - Confirmation of Founding Member status
  - Facebook post coming within 24 hours
  - Renewal reminder note (annual)

### Step 7 — Facebook welcome post
- Select correct template (Community Hero / Lifestyle & Vibes / AI-First)
- Customise with business name, category, specific details
- Post to Papamoa Facebook community groups
- Tag the business's Facebook page
- Add first comment from Jayden with personal endorsement

---

## PHASE 2 — FULL AUTOMATION (Post-launch, once flow is proven)

### Trigger: Stripe payment webhook → Make.com

**Scenario: "Listing Go-Live"**

| Step | Tool | Action |
|---|---|---|
| 1 | Stripe | Webhook fires on `invoice.paid` event |
| 2 | Make.com | Parse customer email + invoice amount |
| 3 | Google Sheets | Find row by email, update status → "Paid" |
| 4 | HubSpot | Update deal stage → "Won" |
| 5 | GitHub API | Push redirect HTML to `previews/{slug}.html` |
| 6 | Brevo | Send welcome email with live listing URL |
| 7 | Make.com | Send Jayden a publish notification email |
| 8 | Claude API | Generate Facebook post copy for Jayden to review |

**Jayden's only manual step in Phase 2:**
- Publish the listing in the CMS (until API access confirmed)
- Review and post the Facebook welcome post

### Automation cost at Phase 2
| Tool | Plan | Cost |
|---|---|---|
| Make.com Core | 10,000 ops/month | $9/month |
| Stripe | Per transaction | ~1.8% + 30c NZD |
| Brevo | Free tier | $0 |
| GitHub API | Free | $0 |
| Claude API | ~500 tokens per post | ~$0.02 per listing |

**Total: ~$9/month + Stripe fees**
Recovered after: first listing sold

---

## GOOGLE SHEET COLUMNS — FULL LIFECYCLE

| Column | Values |
|---|---|
| business_name | Text |
| slug | url-safe-slug |
| category | Dropdown |
| contact_name | Text |
| email | Text |
| phone | Text |
| website | Text |
| tier | Silver / Gold |
| additional_subcategories | Number |
| total_value | Auto-calculated |
| status | Lead / Preview Live / Approved / Invoiced / Paid / Published |
| preview_url | Auto-filled |
| live_url | Filled on publish |
| invoice_number | Filled on invoice |
| invoice_date | Filled on invoice |
| payment_date | Filled on payment |
| publish_date | Filled on publish |
| facebook_post_date | Filled on post |
| renewal_date | Auto: payment_date + 365 days |
| notes | Free text |

---

## CMS API QUESTION (Determines Phase 3)

If papamoa.info CMS supports an API or webhook for creating/publishing listings, Phase 3 becomes possible:

**Phase 3 — Full hands-off publishing:**
```
Stripe payment confirmed
        ↓
Make.com builds listing payload from Google Sheet
        ↓
CMS API call → creates and publishes listing automatically
        ↓
GitHub redirect pushed automatically
        ↓
Welcome email sent automatically
        ↓
Facebook post drafted and queued for Jayden review
```

This removes the manual CMS step entirely. Worth investigating what CMS papamoa.info runs on and whether it has REST API or webhook support.

---

## MANUAL LAUNCH CHECKLIST — BEFORE FIRST SALE

- [ ] Stripe account created, GST configured
- [ ] Google Sheet set up with all columns above
- [ ] HubSpot pipeline stages match Sheet status values
- [ ] Brevo welcome email template written and saved
- [ ] Facebook post templates saved and ready to customise
- [ ] GitHub repo live at `preview.papamoa.info`
- [ ] CMS login confirmed, test listing published and deleted
- [ ] Redirect HTML snippet saved somewhere accessible for quick copy/paste
- [ ] Invoice process tested end-to-end with a $1 test transaction

---

## RENEWAL AUTOMATION (Phase 2 addition)

Every listing has a `renewal_date` column (payment date + 365 days).

Make.com scheduled trigger — runs daily:
- Checks Google Sheet for rows where `renewal_date` = today + 30 days
- Sends renewal reminder email via Brevo
- Checks again at today + 7 days — sends final reminder
- If not renewed by `renewal_date` — sends lapsed notice, flags in HubSpot

Renewal email angle:
> "Your Papamoa.info listing renews in 30 days. Your listing had [X views] this year. Renew now to lock in your founding member rate."

Traffic stats (even basic Google Analytics pageview counts) make the renewal email significantly more compelling — worth setting up GA on papamoa.info if not already done.

---

*Automation plan — Papamoa.info · March 2026*
*Phase 1: Manual · Phase 2: Stripe → Make.com → GitHub → Brevo · Phase 3: CMS API TBD*

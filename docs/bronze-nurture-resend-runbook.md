# Bronze nurture wire-up — Resend runbook

**Purpose:** Get the Bronze welcome + operator-notification emails actually firing in production.

**Status as of 2026-06-04:** Worker code is shipped and live (`worker.js` lines 255-262 = operator email on submit; lines 322-330 = owner welcome on approve). Both fire only when `env.RESEND_API_KEY` is set. The key is **not** currently set, so both emails silently skip.

**Blocking constraint:** the `from:` field is `'Papamoa.info <noreply@papamoa.info>'`. Resend requires a verified sender domain. **`papamoa.info` DNS is still pointed at Carwyn's existing Drupal site** — we don't control those DNS records yet. So we have two paths, depending on how soon you want the emails firing:

---

## Path A — Quick win, fires today (use plainblack.com sender)

Get the emails firing now, fix the sender domain when DNS migrates.

### Step 1 — Sign up / log in to Resend

1. Go to https://resend.com and log in (or create an account)
2. Confirm `plainblack.com` is on your verified domain list. If not, add it:
   - Add domain → enter `plainblack.com`
   - Resend gives you 3-4 DNS records (TXT for SPF, CNAME for DKIM)
   - Add those records to wherever plainblack.com DNS lives (Cloudflare DNS? Squarespace?)
   - Click Verify in Resend after DNS propagates (5min–2hr)
3. Once `plainblack.com` is verified, you can send `from: noreply@plainblack.com`

### Step 2 — Get a Resend API key

1. Resend dashboard → API Keys → Create API Key
2. Name: `papamoa-claude-proxy-bronze`
3. Permission: **Sending access** only (not full access)
4. Copy the key — starts with `re_`

### Step 3 — Set the Cloudflare Worker secret

The Bronze worker is the `papamoa-claude-proxy` Worker on Cloudflare (not in this repo's `worker/` folder — that's the leaderboard/scratchpad workers).

```bash
cd path/to/papamoa-claude-proxy
wrangler secret put RESEND_API_KEY
# paste the re_... key when prompted, press enter
```

Or via the Cloudflare dashboard: Workers → papamoa-claude-proxy → Settings → Variables → Add Secret → `RESEND_API_KEY` = `re_...`

### Step 4 — Swap the sender domain in worker.js

The current `from:` is `'Papamoa.info <noreply@papamoa.info>'`. Until DNS migrates, change both occurrences to `'Papamoa.info <noreply@plainblack.com>'`:

Lines to edit in `worker.js` (the live `papamoa-claude-proxy` source, not just this repo's mirror):
- Line ~258 (operator notification)
- Line ~326 (owner welcome)

Add a `reply_to: 'info@plainblackcreative.com'` field to each so replies route somewhere humans read.

Deploy: `wrangler deploy`.

### Step 5 — Smoke test

1. Open https://plainblackcreative.github.io/papamoa-previews/sales/create-bronze-listing.html
2. Submit a test listing with your own email as the owner email
3. **Expected:** within 30s, `info@plainblackcreative.com` receives the operator notification
4. Open `https://plainblackcreative.github.io/papamoa-previews/admin/bronze-queue.html`, find the pending submission, assign a category + subcategory, click Approve
5. **Expected:** within 60s, the listing commits to the repo *and* the owner email receives the welcome
6. Delete the test listing afterwards (`git rm listings/your-test-slug.html` + queue cleanup)

### Step 6 — Mark §18 done

In `docs/Project_Master.md` §18 under "Listings & sales direction":
- Move the **Automated lead-gen funnel off Bronze** line from `[ ]` to `[~]` (in-progress, first touch live)

---

## Path B — Wait for DNS, do it right (use papamoa.info sender)

Cleaner, but blocks on the DNS consolidation session with Carwyn (already on the §18 list: *"DNS consolidation session with Carwyn (GitHub CNAME, Brevo auth: DKIM, DMARC, SPF)"*).

### Prereqs

You need control of (or write-access to) the `papamoa.info` DNS zone. Carwyn currently runs DNS through wherever the Drupal site lives. Options:
1. **Carwyn delegates `papamoa.info` DNS to Cloudflare** — cleanest. We get full control of the zone, can add Resend records without bothering him.
2. **Carwyn adds Resend records on his side** — send him the records via email, he adds them. Workable but a roundtrip.
3. **Subdomain delegation** — Carwyn delegates `mail.papamoa.info` to us, we control just that subdomain. Then sender becomes `noreply@mail.papamoa.info`. Reasonable compromise.

### Steps (once DNS control is in place)

1. Resend → Add domain → `papamoa.info` (or `mail.papamoa.info`)
2. Add the SPF (TXT), DKIM (CNAME x3), and optional DMARC (TXT) records
3. Verify in Resend
4. Steps 2-6 from Path A, but with `from: 'Papamoa.info <noreply@papamoa.info>'` (already in worker.js — no edit needed if you've already swapped per Path A, revert that swap)

---

## Recommended sequence

1. **Today:** do Path A (quick win, emails firing within 30 min if `plainblack.com` is already verified in Resend).
2. **Next week:** raise the DNS consolidation with Carwyn (one combined ask: Cloudflare DNS migration covering GitHub Pages CNAME + Brevo + Resend records all at once).
3. **After DNS migrates:** swap the sender back to `noreply@papamoa.info`, re-deploy worker.

---

## What's still pending after this runbook

This runbook covers only the **first-touch** Bronze emails (operator notification on submit + owner welcome on approve). The full Day 0 / 3 / 6 / 10 nurture sequence is **Phase E (Brevo)** — a separate setup since Resend is for transactional, Brevo handles drip campaigns. See §18 Medium for the Brevo work, gated on launch readiness.

# Papamoa.info scratchpad — Cloudflare Worker

Backs the scratchpad on the curator index page. Stores notes in
**Cloudflare KV**, gated by a **bearer token** (single shared
secret, set in Cloudflare, paste once into each browser).

No third-party services. No keys in the repo.

---

## One-time deploy

```bash
cd worker/scratchpad
npm install

# 1. Create the KV namespace
npx wrangler kv namespace create SCRATCHPAD_KV
#   → copy the printed `id` into wrangler.toml (replace REPLACE_WITH_...)

# 2. Generate + set the bearer token
openssl rand -base64 32           # generate one, save it somewhere safe
npx wrangler secret put SCRATCHPAD_TOKEN
#   → paste the token when prompted

# 3. Deploy
npx wrangler deploy
#   → returns https://papamoa-scratchpad.<your-subdomain>.workers.dev
```

## Wire `index.html` up

First focus on the scratchpad input prompts for the Worker URL +
the bearer token. Both saved to `localStorage` per device, per
browser.

To rotate: re-run `wrangler secret put SCRATCHPAD_TOKEN`. To
re-paste on the device: shift-click the scratchpad header.

## Endpoints

```
GET   /            → { notes: [...] }
PUT   /            → body: { notes: [...] }   →  { ok: true, count }
GET   /health      → { ok: true }              (open, no auth)
```

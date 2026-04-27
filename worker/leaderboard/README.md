# Papamoa.info Gremlin Hunt leaderboard — Cloudflare Worker

Backs the leaderboard on `/404.html`. Stores top-10 scores in
**Cloudflare KV**. Public read, public write — but writes are
**rate-limited per IP** (1 submission every 30s) and validated
server-side (impossible-fast scores rejected, names sanitised, list
capped at 10 entries).

No third-party services. No secrets. The Worker URL is hardcoded
into `404.html` because there's nothing sensitive to hide.

---

## One-time deploy

```bash
cd worker/leaderboard
npm install

# 1. Create the KV namespace
npx wrangler kv namespace create LEADERBOARD_KV
#   → copy the printed `id` into wrangler.toml (replace REPLACE_WITH_...)

# 2. Deploy
npx wrangler deploy
#   → returns https://papamoa-leaderboard.<your-subdomain>.workers.dev
```

## Endpoints

```
GET   /            → { scores: [{name, time, date}, ...] }
POST  /            → body: { name: "ABC", time: 12345 }
                    →  { scores: [...], accepted: true }
                    or  { error: "rate_limited", retry_after: 30 }
GET   /health      → { ok: true }
```

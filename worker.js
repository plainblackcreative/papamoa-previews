export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ── CORS preflight ────────────────────────────────
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // ── Weather proxy ─────────────────────────────────
    if (url.pathname === '/weather') {
      const lat = url.searchParams.get('latitude') || '-37.7167';
      const lon = url.searchParams.get('longitude') || '176.3167';
      const weatherUrl = 'https://api.open-meteo.com/v1/forecast'
        + '?latitude=' + lat
        + '&longitude=' + lon
        + '&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m'
        + '&daily=uv_index_max&timezone=Pacific%2FAuckland&forecast_days=1';
      const resp = await fetch(weatherUrl);
      const data = await resp.json();
      return new Response(JSON.stringify(data), {
        status: resp.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=600',
        }
      });
    }

    // ── Google Sheets proxy (read-only, uses API key) ─
    if (url.pathname === '/sheets') {
      if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
      }

      const sheetId = url.searchParams.get('sheetId');
      const range   = url.searchParams.get('range');

      if (!sheetId || !range) {
        return new Response('Missing sheetId or range param', { status: 400 });
      }

      if (!env.GOOGLE_SHEETS_KEY) {
        return new Response(JSON.stringify({ error: 'GOOGLE_SHEETS_KEY not configured in Worker secrets' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${env.GOOGLE_SHEETS_KEY}`;

      const resp = await fetch(sheetsUrl);
      const data = await resp.json();

      return new Response(JSON.stringify(data), {
        status: resp.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    // ── Search tracking ───────────────────────────────
    // POST /search-track
    // Body: { term, page, ts }
    // Appends one row to Search Logs tab using service account OAuth.
    if (url.pathname === '/search-track' && request.method === 'POST') {
      const ANALYTICS_SHEET_ID = '163qFZn4Iit3Pt7HFBou4B3W_OYeOOlLHjdNChmj960w';
      const ANALYTICS_TAB      = 'Search Logs';

      try {
        const body = await request.json();
        const term = (body.term || '').trim().slice(0, 120);
        const page = (body.page || 'unknown').slice(0, 60);
        const ts   = body.ts || new Date().toISOString();

        if (!term) {
          return new Response(JSON.stringify({ ok: false, error: 'empty term' }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }

        const ip        = request.headers.get('CF-Connecting-IP') || 'unknown';
        const sessionId = await hashString(ip + ts.slice(0, 13));
        const row       = [ts, term, term.toLowerCase(), page, sessionId];

        // Get OAuth token for service account
        const token = await getServiceAccountToken(
          'papamoa-sheets-writer@papamoa-info.iam.gserviceaccount.com',
          env.GOOGLE_SERVICE_ACCOUNT_KEY,
          'https://www.googleapis.com/auth/spreadsheets'
        );

        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${ANALYTICS_SHEET_ID}/values/${encodeURIComponent(ANALYTICS_TAB)}:append?valueInputOption=USER_ENTERED`;

        // Fire-and-forget
        ctx.waitUntil(
          fetch(sheetsUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ values: [row] }),
          }).catch(() => {})
        );

        return new Response(JSON.stringify({ ok: true }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // ── Search top 10 ─────────────────────────────────
    // GET /search-top10
    // Reads Search Logs via service account, counts by TermLower, returns top 10.
    // Cached for 1 hour.
    if (url.pathname === '/search-top10' && request.method === 'GET') {
      const ANALYTICS_SHEET_ID = '163qFZn4Iit3Pt7HFBou4B3W_OYeOOlLHjdNChmj960w';
      const ANALYTICS_TAB      = 'Search Logs';
      const TOP10_CACHE_TTL    = 3600;

      const cache    = caches.default;
      const cacheKey = new Request('https://papamoa-internal/search-top10-cache');
      const cached   = await cache.match(cacheKey);
      if (cached) {
        const body = await cached.json();
        return new Response(JSON.stringify(body), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      try {
        const token = await getServiceAccountToken(
          'papamoa-sheets-writer@papamoa-info.iam.gserviceaccount.com',
          env.GOOGLE_SERVICE_ACCOUNT_KEY,
          'https://www.googleapis.com/auth/spreadsheets.readonly'
        );

        const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${ANALYTICS_SHEET_ID}/values/${encodeURIComponent(ANALYTICS_TAB)}`;
        const res  = await fetch(sheetsUrl, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        const rows = (data.values || []).slice(1); // skip header row

        const counts  = {};
        const display = {};
        rows.forEach(row => {
          const lower = (row[2] || '').trim();
          const disp  = (row[1] || '').trim();
          if (!lower || lower.length < 2) return;
          counts[lower]  = (counts[lower] || 0) + 1;
          display[lower] = disp;
        });

        const total = rows.length;

        const top10 = Object.keys(counts)
          .sort((a, b) => counts[b] - counts[a])
          .slice(0, 10)
          .map(k => capitalise(display[k] || k));

        const result = { terms: top10, total };

        const cacheResponse = new Response(JSON.stringify(result), {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${TOP10_CACHE_TTL}`,
          },
        });
        ctx.waitUntil(cache.put(cacheKey, cacheResponse.clone()));

        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (e) {
        return new Response(JSON.stringify({ terms: [], total: 0, error: e.message }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // ── Fishing data ──────────────────────────────────
    if (url.pathname === '/fishing-data') {
      if (!env.CLAUDE_API_KEY) {
        return new Response(JSON.stringify({ error: 'CLAUDE_API_KEY not configured' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      const now = new Date().toLocaleDateString('en-NZ', { timeZone: 'Pacific/Auckland', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      const fishingResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1200,
          system: 'You are a fishing and tide data assistant for Papamoa Beach, Bay of Plenty, New Zealand. Return valid JSON only, no markdown.',
          messages: [{
            role: 'user',
            content: `Today is ${now}. Generate realistic tides, sunrise/sunset, and solunar bite times for Papamoa Beach NZ. Return this exact JSON:
{
  "date_label": "full date string",
  "updated_iso": "ISO timestamp",
  "tides": [
    { "type": "high", "time": "6:14 AM", "height_m": 1.82 },
    { "type": "low", "time": "12:28 PM", "height_m": 0.31 },
    { "type": "high", "time": "6:45 PM", "height_m": 1.74 },
    { "type": "low", "time": "12:52 AM", "height_m": 0.28 }
  ],
  "sun": {
    "first_light": "6:02 AM",
    "sunrise": "6:28 AM",
    "solar_noon": "12:44 PM",
    "sunset": "7:00 PM",
    "last_light": "7:26 PM",
    "daylight_hours": "12h 32m",
    "sunrise_bearing": 88,
    "sunset_bearing": 272,
    "solar_altitude_deg": 52
  },
  "bite_times": [
    { "period": "major", "start": "6:10 AM", "end": "8:10 AM", "quality": "Excellent" },
    { "period": "minor", "start": "12:20 PM", "end": "1:20 PM", "quality": "Good" },
    { "period": "major", "start": "6:40 PM", "end": "8:40 PM", "quality": "Excellent" },
    { "period": "minor", "start": "12:50 AM", "end": "1:50 AM", "quality": "Fair" }
  ],
  "moon": {
    "phase_name": "Waning Gibbous",
    "illumination_pct": 68,
    "fishing_note": "Good solunar activity. Fish the major periods around tide changes."
  },
  "conditions_summary": "Autumn conditions. Easterly 15 knots easing afternoon. Good surf fishing on the incoming tide."
}`
          }]
        })
      });

      const fishingData = await fishingResp.json();
      const textBlock = fishingData.content && fishingData.content.find(b => b.type === 'text');
      const rawText = textBlock ? textBlock.text : '';

      let result;
      try {
        result = JSON.parse(rawText.replace(/```json|```/g, '').trim());
        result.updated_iso = new Date().toISOString();
      } catch(e) {
        return new Response(JSON.stringify({ error: 'Failed to parse fishing data' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-store',
        }
      });
    }

    // ── Claude proxy (search visibility checker) ─────
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const { searchTerm, businessName, category } = body;

    if (!searchTerm || !businessName) {
      return new Response('Missing required fields', { status: 400 });
    }

    if (!env.CLAUDE_API_KEY) {
      return new Response(JSON.stringify({
        positive: false,
        headline: 'Configuration error',
        body: 'API key not found in environment.',
        search_term_used: searchTerm
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: 'You are a local search visibility checker for Papamoa.info, a business directory in Papamoa, New Zealand. Always return valid JSON only — no markdown, no preamble, no explanation outside the JSON.',
        messages: [{
          role: 'user',
          content: `Check local search visibility for this business:
Business: ${businessName}
Category: ${category}
Search term: "${searchTerm}"

Based on your knowledge of local NZ search and this business type, assess whether this business is likely visible for this search term in Papamoa.

Return this exact JSON:
{
  "positive": true or false,
  "headline": "One punchy sentence, max 12 words",
  "body": "2-3 sentences explaining the result and how a papamoa.info listing helps.",
  "search_term_used": "${searchTerm}"
}`
        }]
      })
    });

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      return new Response(JSON.stringify({
        positive: false,
        headline: 'Search check temporarily unavailable',
        body: errorText,
        search_term_used: searchTerm
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const data = await claudeResponse.json();
    const textBlock = data.content && data.content.find(function(b) { return b.type === 'text'; });
    const rawText = textBlock ? textBlock.text : '';

    let result;
    try {
      result = JSON.parse(rawText.replace(/```json|```/g, '').trim());
    } catch(e) {
      result = {
        positive: false,
        headline: 'Try a more specific search term',
        body: 'Try something like "best cafe in Papamoa" or "plumber Papamoa Beach."',
        search_term_used: searchTerm
      };
    }

    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

// ── Service account OAuth ─────────────────────────────
// Generates a short-lived Bearer token using a Google service account private key.
async function getServiceAccountToken(clientEmail, privateKeyPem, scope) {
  const now     = Math.floor(Date.now() / 1000);
  const payload = {
    iss: clientEmail,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const header  = { alg: 'RS256', typ: 'JWT' };
  const b64     = str => btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const encHead  = b64(JSON.stringify(header));
  const encPay   = b64(JSON.stringify(payload));
  const sigInput = `${encHead}.${encPay}`;

  // Import the private key
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\n/g, '')
    .trim();

  const keyData = Uint8Array.from(atob(pemBody), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(sigInput)
  );

  const encSig = b64(String.fromCharCode(...new Uint8Array(signature)));
  const jwt    = `${sigInput}.${encSig}`;

  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResp.json();
  if (!tokenData.access_token) {
    throw new Error('Failed to get OAuth token: ' + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

// ── Helpers ───────────────────────────────────────────
async function hashString(str) {
  const msgBuffer  = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray  = Array.from(new Uint8Array(hashBuffer));
  return hashArray.slice(0, 8).map(b => b.toString(16).padStart(2, '0')).join('');
}

function capitalise(str) {
  return String(str).split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
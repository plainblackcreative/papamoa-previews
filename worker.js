// papamoa-claude-proxy v2.2
export default {
  async fetch(request, env) {
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

    // ── Google Sheets proxy ───────────────────────────
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


    // ── Fishing data (tides, sun, bite times) ────────
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

    // ── Claude proxy (existing, unchanged) ───────────
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
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
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
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

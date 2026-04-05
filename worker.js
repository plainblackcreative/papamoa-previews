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

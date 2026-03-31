// papamoa-claude-proxy v1

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

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

    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 600,
        system: 'You are a local search visibility checker for Papamoa.info, a business directory in Pāpāmoa, New Zealand. Always return valid JSON only — no markdown, no preamble.',
        messages: [{
          role: 'user',
          content: `Check local search visibility for:
Business: ${businessName}
Category: ${category}
Search term: "${searchTerm}"

Search the web for this term and Papamoa-specific variations.
Return this exact JSON:
{
  "positive": true or false,
  "headline": "One punchy sentence, max 12 words",
  "body": "2-3 sentences explaining the result and how papamoa.info helps.",
  "search_term_used": "the exact term searched"
}`
        }],
        tools: [{
          type: 'web_search_20250305',
          name: 'web_search'
        }]
      })
    });

    if (!claudeResponse.ok) {
      return new Response(JSON.stringify({
        positive: false,
        headline: 'Search check temporarily unavailable',
        body: 'Please try again or call Jayden on 027 533 2970.',
        search_term_used: searchTerm
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    const data = await claudeResponse.json();
    const textBlock = data.content?.find(b => b.type === 'text');
    const rawText = textBlock?.text || '';

    let result;
    try {
      result = JSON.parse(rawText.replace(/```json|```/g, '').trim());
    } catch {
      result = {
        positive: false,
        headline: 'Try a more specific search term',
        body: 'Try something like "best café in Papamoa" or "plumber Papamoa Beach."',
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

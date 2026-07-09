const COUNTER_KEY = "family-investment-dashboard-total";
const ALLOWED_ORIGINS = new Set([
  "https://elthefang.github.io",
  "http://localhost:3000",
  "http://localhost:4173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:4173"
]);

function corsHeaders(origin) {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...extraHeaders
    }
  });
}

async function readCount(env) {
  const raw = await env.PAGE_VIEWS.get(COUNTER_KEY);
  const count = Number(raw ?? 0);
  return Number.isFinite(count) && count >= 0 ? count : 0;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

    if (!cors) {
      return json({ error: "Origin not allowed" }, 403);
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname !== "/view") {
      return json({ error: "Not found" }, 404, cors);
    }

    if (request.method === "GET") {
      return json({ count: await readCount(env) }, 200, cors);
    }

    if (request.method === "POST") {
      const nextCount = await readCount(env) + 1;
      await env.PAGE_VIEWS.put(COUNTER_KEY, String(nextCount));
      return json({ count: nextCount }, 200, cors);
    }

    return json({ error: "Method not allowed" }, 405, cors);
  }
};

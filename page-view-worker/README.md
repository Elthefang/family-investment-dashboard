# Page View Worker

This optional Cloudflare Worker provides a lightweight total page-view counter for the family investment dashboard.

It is intentionally simple:

- One global counter key: `family-investment-dashboard-total`
- One KV binding: `PAGE_VIEWS`
- `GET /view` returns the current count
- `POST /view` increments the count and returns the new total

It does not store IP addresses, user agents, Google tokens, emails, account values, or any personal data. It is an approximate lightweight counter, not a full analytics system.

## Routes

### `GET /view`

Returns:

```json
{ "count": 128 }
```

### `POST /view`

Returns:

```json
{ "count": 129 }
```

## Allowed Origins

The Worker only allows browser requests from:

- `https://elthefang.github.io`
- `http://localhost:3000`
- `http://localhost:4173`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:4173`

Adjust the allowlist in [src/index.js](./src/index.js) if your deployment origin changes.

## Setup

1. Create a Workers KV namespace.
2. Replace `REPLACE_WITH_PRODUCTION_KV_NAMESPACE_ID` in [wrangler.jsonc](./wrangler.jsonc).
3. Deploy the Worker.
4. Set `PAGE_VIEW_ENDPOINT` in the dashboard [config.js](../config.js) to your deployed `/view` URL.

Example:

```js
PAGE_VIEW_ENDPOINT: "https://your-worker.example.workers.dev/view"
```

## Notes

- The frontend increments only after a successful authenticated dashboard load.
- The frontend uses `sessionStorage` only for a harmless per-tab counted flag.
- Localhost preview uses `GET` only, so development does not increase the production counter.

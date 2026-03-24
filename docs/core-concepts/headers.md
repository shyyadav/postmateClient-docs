# Headers

Add, edit, and manage HTTP request headers with autocomplete support.

## Adding Headers

Switch to the **Headers** tab in the request panel. Add key-value pairs for any HTTP header:

```
Content-Type:  application/json
Authorization: Bearer {{authToken}}
Accept:        application/json
X-API-Key:     {{apiKey}}
X-Request-ID:  {{requestId}}
```

Use `{{variables}}` in both header names and values — they are resolved at send time.

## Autocomplete

Postmate Client provides autocomplete for common header names as you type:

- `Content-Type` — suggests `application/json`, `multipart/form-data`, etc.
- `Authorization` — suggests `Bearer`, `Basic`, `Digest`
- `Accept`, `Cache-Control`, `X-*` — standard HTTP header names

## Common Headers Reference

| Header | Common Values |
|---|---|
| `Content-Type` | `application/json`, `application/x-www-form-urlencoded`, `multipart/form-data` |
| `Authorization` | `Bearer {{token}}`, `Basic {{base64Credentials}}` |
| `Accept` | `application/json`, `*/*` |
| `Cache-Control` | `no-cache`, `no-store` |
| `X-API-Key` | `{{apiKey}}` |

## Reading Response Headers

Response headers are accessible in post-request scripts via `RESPONSE.headers`:

```js
const contentType = RESPONSE.headers['content-type'];
const rateLimit   = RESPONSE.headers['x-ratelimit-remaining'];

pm.log('Remaining API calls: ' + rateLimit);
```

# Autocomplete

Postmate Client provides intelligent autocomplete across the request editor to speed up your workflow.

## Variable Autocomplete

Typing `{{` anywhere in the URL, headers, or body triggers a dropdown of all variables in the active environment.

```
{{ba  →  {{baseUrl}}  (suggestion appears)
         {{basicAuth}}
```

This works in:
- Request URL
- Header names and values
- Request body (JSON, form, raw)
- Pre/post-request scripts

## Header Autocomplete

Start typing a header name in the **Headers** tab to get suggestions for standard HTTP headers:

- `Co` → `Content-Type`, `Content-Length`, `Content-Encoding`
- `Au` → `Authorization`, `Auth-Token`
- `Ac` → `Accept`, `Accept-Encoding`, `Accept-Language`
- `Ca` → `Cache-Control`
- `X-` → common `X-*` headers

After selecting `Content-Type`, Postmate also suggests common values: `application/json`, `multipart/form-data`, `application/x-www-form-urlencoded`.

## JSON Path Suggestions in Tests

When writing tabular tests with a **Body** assertion type, Postmate suggests JSON paths from the most recent response:

1. Send your request once.
2. Open the **Tests** tab → **Test** sub-tab.
3. Select **Body** as the Test Type.
4. Click the **Action** field — Postmate shows all available JSON paths from the last response.

```
Response body: { "user": { "id": 42, "name": "Alice", "role": "admin" } }

Suggestions:
  user.id
  user.name
  user.role
```

## pm API Autocomplete in Scripts

The script editor (Monaco-based) provides autocomplete for `pm.*` methods. Type `pm.` to see all available methods with their signatures.

# Import cURL / Swagger

Get started instantly by importing real-world cURL commands or Swagger/OpenAPI specs.

## Import from cURL

Copy any cURL command — from browser DevTools, API documentation, or a colleague — and paste it directly into Postmate. It parses the URL, method, headers, and body automatically.

**Example cURL:**

```bash
curl -X POST https://api.example.com/v1/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer mytoken' \
  -d '{"name":"Alice","role":"admin"}'
```

**Steps:**

1. Click **Import** in the Postmate panel.
2. Select **Import from cURL**.
3. Paste the cURL command.
4. Click **Import** — Postmate creates a fully configured request, ready to send.

[Watch the cURL import demo video ↗](https://www.youtube.com/watch?v=K0TjOP-nPZM)

::: info
cURL flags supported: `-X` (method), `-H` (headers), `-d` / `--data` (body), `--data-raw`, `-u` (basic auth), and more.
:::

## Import from Swagger / OpenAPI

Import a Swagger 2.0 or OpenAPI 3.x spec to automatically generate a collection of all endpoints. Postmate creates folders by tag or path prefix, with method, path, and parameters pre-filled.

**Steps:**

1. Click **Import** → **Import from Swagger / OpenAPI**.
2. Choose **Local File** or **Remote URL**.
3. Select or paste your spec.
4. Click **Import** — a full collection is generated instantly.

**What gets imported:**

| Spec element | Postmate result |
|---|---|
| Tags | Collection folders |
| Endpoints | Individual requests |
| Path parameters | URL with `{{param}}` syntax |
| Request bodies | Pre-filled body with example values |
| Security schemes | Header stubs (e.g. `Authorization: Bearer {{token}}`) |

::: info
Import from a local `.json` or `.yaml` file, or from a remote URL pointing to a live spec (e.g. `https://petstore.swagger.io/v2/swagger.json`).
:::

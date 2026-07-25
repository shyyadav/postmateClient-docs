---
title: API Authentication in Postmate Client (VS Code)
description: Configure Basic, Bearer, API Key, AWS Signature, and OAuth 2.0 authentication for your API requests in Postmate Client — with automatic token fetching and refresh, all local and private.
---

# Authentication

Postmate Client handles authentication from the **Auth** tab of any request. Pick an auth type, fill in the fields, and Postmate builds the correct `Authorization` header (or query parameter) automatically when you send the request.

Every auth type works the same everywhere requests run — the request panel, the [Collection Runner](/data-driven/collection-runner), [pre-requests](/data-driven/request-chaining), and the [CLI](/ci-cd/cli-reference).

## Auth types at a glance

| Type | Use for |
|---|---|
| **No Auth** | Public endpoints, or when you set `Authorization` manually in the Headers tab |
| **Basic Auth** | Username + password (sent as base64) |
| **Bearer Token** | A token you already have (JWT, PAT, API token) |
| **API Key** | A key sent as a header or query parameter |
| **AWS Signature** | AWS SigV4-signed requests (API Gateway, S3, etc.) |
| **OAuth 2.0** | Client Credentials, Password, or Authorization Code (PKCE) — with automatic token fetching |

::: tip Variables and secrets work everywhere
Every field on the Auth tab supports <span v-pre>`{{variable}}`</span> resolution from the active environment. Keep credentials out of your collection files by referencing a [secret variable](/security/secret-variables) — the real value is resolved only at send time and never written to disk.
:::

::: warning Explicit header always wins
If you set an `Authorization` header yourself in the **Headers** tab, it takes precedence — the Auth tab is ignored for that request. This lets you override the configured auth for a one-off call.
:::

---

## Basic Auth

Enter a **Username** and **Password**. Postmate sends `Authorization: Basic <base64(username:password)>`.

Non-ASCII credentials are handled correctly (UTF-8 base64).

## Bearer Token

Enter a **Bearer Token**. Postmate sends `Authorization: Bearer <token>`.

For tokens that differ per environment, reference a variable so it stays in sync:

```
{{accessToken}}
```

## API Key

Enter the **Key**, **Value**, and choose where it goes:

- **Header** — added as a request header `Key: Value`
- **Query Params** — appended to the URL as `?Key=Value`

## AWS Signature

Signs the request with AWS Signature Version 4. Fill in:

| Field | Notes |
|---|---|
| **Access Key ID** | Your AWS access key |
| **Secret Access Key** | Your AWS secret key |
| **Session Token** | Optional — for temporary STS credentials |
| **Region** | e.g. `us-east-1` (default) |
| **Service** | e.g. `execute-api` (default), `s3` |
| **UNSIGNED-PAYLOAD** | Tick for S3-style requests that don't sign the body |

Signing happens last, after the body is finalized, so the signature always matches what's sent.

---

## OAuth 2.0

Select **OAuth 2.0** and choose a **Grant Type**. Postmate can fetch the token for you and inject `Authorization: Bearer <token>` on send.

### How token fetching works

- Leave the **Access Token** field empty and Postmate fetches a token automatically the first time you send the request.
- The token is **cached and reused** until just before it expires, so the token endpoint isn't called on every request. Requests that share the same OAuth config reuse one token.
- Click **Get New Access Token** to fetch a token manually and inspect it before sending.
- Paste a value into **Access Token** to use it directly and skip fetching entirely.

::: tip Tokens are never saved to disk
Access tokens and refresh tokens live in memory only. Saving a request writes the OAuth **configuration** to your collection file — never the token itself.
:::

### Client authentication

Choose how client credentials reach the token endpoint:

- **Basic Auth header** *(default)* — `client_secret_basic`: client ID and secret in an `Authorization: Basic` header.
- **In request body** — `client_secret_post`: `client_id` and `client_secret` in the form body.

If you leave **Client Secret** empty (a public client, typical for PKCE), Postmate sends `client_id` in the body and never an empty Basic header — matching what providers like Microsoft Entra ID expect.

### Grant: Client Credentials

Machine-to-machine auth with no user. Fill in:

- **Access Token URL**
- **Client ID**, **Client Secret**
- **Scope** (optional)

On send, Postmate exchanges the credentials for a token and caches it.

### Grant: Password Credentials

Exchanges a username and password directly for a token. In addition to the client fields, provide **Username** and **Password**.

::: warning
The password grant is deprecated in OAuth 2.1 and unsupported by many providers. Prefer Authorization Code where possible.
:::

### Grant: Authorization Code (PKCE)

The interactive, user-context flow — the user logs in through a browser and Postmate captures the result automatically. No copy-pasting tokens.

Fill in:

| Field | Notes |
|---|---|
| **Auth URL** | The provider's authorization endpoint |
| **Access Token URL** | The provider's token endpoint |
| **Client ID** | Your app's client ID |
| **Client Secret** | Optional — leave empty for public/PKCE clients |
| **Scope** | Space-separated scopes (include `offline_access` if you want a refresh token) |
| **Redirect Port** | The loopback port Postmate listens on (default `53210`) |

**How it works:**

1. Click **Get New Access Token**. Postmate starts a temporary local server and opens your **default browser** at the provider's login page.
2. Log in and approve access. Postmate uses PKCE (S256) and a `state` check for security.
3. The provider redirects back to `http://127.0.0.1:<port>/callback` — the local server captures the authorization code, and the browser tab shows **"Authentication complete."**
4. Postmate exchanges the code for a token (and a refresh token, if granted) and fills in the Access Token field.

::: warning Register the redirect URI
Your provider must allow the loopback redirect URI shown under the Redirect Port field — `http://127.0.0.1:<port>/callback` — in your app's registered redirect URIs. This flow works with providers that support loopback (`127.0.0.1`) redirects, which is most standard OAuth 2.0 providers.
:::

**Silent refresh:** if the provider returns a refresh token, Postmate renews the access token in the background when it expires — the browser only opens on the first login. Rotated refresh tokens are chained automatically.

### OAuth 2.0 in the Collection Runner and CLI

Interactive login can't happen mid-run, so the runner and CLI use a **cached or refreshable** token:

- **Client Credentials / Password** — fetched automatically during the run.
- **Authorization Code** — run **Get New Access Token** once in the request panel first; the runner and CLI then reuse the cached token and refresh it silently. If no token is available, the request fails with a clear message.

For CI, keep client secrets out of files with the CLI's `--secret` flag or `POSTMATE_SECRET_<NAME>` environment variables — see the [CLI Reference](/ci-cd/cli-reference).

---

## Related

- [Building Requests](/core-concepts/building-requests) — the full request panel
- [Secret Variables](/security/secret-variables) — keep credentials off disk
- [Environments & Variables](/core-concepts/environments) — <span v-pre>`{{variable}}`</span> resolution

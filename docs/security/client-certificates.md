---
title: Client Certificates (mTLS) in VS Code
description: Add client certificates (mTLS) to API requests directly in VS Code with Postmate Client. PEM and PFX supported, per-host config, fully local — no cloud, no upload.
---

# Client Certificates (mTLS) in VS Code

Some APIs — especially internal microservices and enterprise gateways — require **mutual TLS (mTLS)**: your client must present a certificate during the TLS handshake to authenticate. Postmate Client supports this natively for REST, GraphQL, and WebSocket requests, right inside VS Code.

Unlike Postman, there's no account or cloud sync involved — certificate configuration is a local JSON file, and your certificates never leave your machine.

Available since **v1.4.9**.

::: tip Do I need to change a VS Code setting?
- **REST and GraphQL requests on v2.5.0 or later:** no — client certificates work with VS Code's default settings.
- **WebSocket (`wss://`) connections, or Postmate before v2.5.0:** add `"http.proxySupport": "on"` to your VS Code settings.
:::

## How to send a client certificate (mTLS) with your requests

Three steps: create a `certificates.json` file, add an entry for your host, and send your request — the certificate is attached automatically whenever the hostname matches.

### 1. Create `certificates.json`

The file lives in your `.postmate` folder:

- **Workspace mode** (`postmate.useWorkspaceAsProjectDir` enabled): `<your-workspace>/.postmate/certificates.json`
- **Global mode** (default): in the global `.postmate` folder, next to your environments:
  - Windows: `%APPDATA%/Code/User/globalStorage/.postmate/certificates.json`
  - macOS: `~/Library/Application Support/Code/User/globalStorage/.postmate/certificates.json`
  - Linux: `~/.config/Code/User/globalStorage/.postmate/certificates.json`

### 2. Add an entry for your host

```json
{
  "certificates": [
    {
      "host": "my-service.internal.company.com",
      "certPath": "/path/to/client.crt",
      "keyPath": "/path/to/client.key",
      "enabled": true
    }
  ]
}
```

### 3. Send your request

Send requests as usual. When the request's hostname matches an entry, the certificate is presented during the TLS handshake — no per-request setup needed.

::: tip Windows paths
Use forward slashes in paths: `C:/certs/client.crt`. Backslashes require JSON escaping (`C:\\certs\\client.crt`) — forward slashes are simpler and work everywhere.
:::

## Configuration reference

Each entry in the `certificates` array supports:

| Field | Required | Description |
|-------|----------|-------------|
| `host` | ✅ | Hostname to match. Supports exact hosts (`api.company.com`), wildcards (`*.internal.company.com`), and optional port (`legacy.local:8443`). Most specific match wins. |
| `certPath` | For PEM | Path to your PEM certificate file (`.crt`, `.pem`) |
| `keyPath` | For PEM | Path to your PEM private key file (`.key`, `.pem`) |
| `pfxPath` | For PFX | Path to a PFX/PKCS#12 bundle (`.p12`, `.pfx`) — alternative to `certPath` + `keyPath`. If an entry has both, `pfxPath` is used. |
| `passphrase` | Optional | Passphrase for an encrypted key or PFX bundle |
| `caPath` | Optional | Path to a custom CA bundle — needed when the server uses a private/internal CA that isn't installed on your computer. Added to the CAs Postmate already trusts. |
| `rejectUnauthorized` | Optional | Set `false` to skip server certificate verification for this host (not recommended outside local development) |
| `enabled` | Optional | Set `false` to disable an entry without deleting it. Defaults to `true`. |

Changes to `certificates.json` are picked up automatically — no reload needed.

## Common scenarios

### PEM certificate and key

```json
{
  "host": "api.internal.company.com",
  "certPath": "C:/certs/client.crt",
  "keyPath": "C:/certs/client.key",
  "enabled": true
}
```

### PFX / PKCS#12 bundle

Common in corporate environments where certs are distributed as a single `.p12`/`.pfx` file:

```json
{
  "host": "legacy-service.company.com",
  "pfxPath": "C:/certs/employee.p12",
  "passphrase": "your-passphrase",
  "enabled": true
}
```

### Private / internal CA

If the server's certificate is signed by an internal CA, add the CA bundle so the server can be verified:

```json
{
  "host": "*.internal.company.com",
  "certPath": "C:/certs/client.crt",
  "keyPath": "C:/certs/client.key",
  "caPath": "C:/certs/internal-ca.pem",
  "enabled": true
}
```

### One cert for many services (wildcard)

`*.internal.company.com` matches `auth.internal.company.com`, `orders.internal.company.com`, and `internal.company.com` itself. If both a wildcard and an exact entry match a request, the exact entry wins.

### Testing locally (self-signed certificates)

For a local mTLS server on a custom port — for example during development — include the port in `host`, and point `caPath` at your local CA. If your local server's certificate can't be verified at all, you can set `rejectUnauthorized: false` for that host:

```json
{
  "host": "localhost:8443",
  "certPath": "C:/certs/dev/client.crt",
  "keyPath": "C:/certs/dev/client.key",
  "caPath": "C:/certs/dev/ca.pem",
  "enabled": true
}
```

### WebSocket (wss://)

`wss://` connections use the same certificate entries as HTTPS requests. With VS Code's default settings, set `"http.proxySupport": "on"` for WebSocket connections — unlike REST and GraphQL requests, they don't bypass VS Code's network handling yet. See [WebSocket support](/blog/websocket-support-launch) for the basics.

## Converting PFX to PEM

If you have a `.p12`/`.pfx` file but prefer PEM:

```bash
# extract the certificate
openssl pkcs12 -in bundle.p12 -out client.crt -clcerts -nokeys

# extract the private key
openssl pkcs12 -in bundle.p12 -out client.key -nocerts -nodes
```

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Server <host> requires a valid client certificate` or `Server <host> closed the connection before responding` | The server requested a client cert but none matched, the entry is disabled, or the server rejected the certificate | Add an entry for that host in `certificates.json`, check `host` matches the request's hostname (including port, if specified), and check the certificate is the one the server expects |
| `Could not load certificate file for "<host>": <path> (file not found)` | A configured path doesn't exist | Fix the path — the full resolved path is shown in the error |
| `Client certificate for "<host>" needs BOTH cert and key paths` | Only one of `certPath`/`keyPath` is set | PEM requires both; or use `pfxPath` instead |
| `Wrong or missing passphrase for the client certificate` | `passphrase` is wrong or missing for an encrypted key or PFX — including an entry with both `pfxPath` and `certPath`/`keyPath`, where the PFX is used | Add or correct `passphrase`, or remove `pfxPath` to use the PEM files |
| `Invalid PEM file for <host>` | A `certPath`/`keyPath` points to a non-PEM file (often a PFX by mistake) | Use `pfxPath` for `.p12`/`.pfx` files, or convert to PEM (see above) |
| `Could not verify the certificate of <host>: its issuing CA isn't trusted` | Server uses a private CA that isn't installed on your computer | Add the CA bundle via `caPath` |
| `<host> uses a self-signed certificate` | The server's certificate is self-signed | Add it via `caPath` if you trust it, or set `rejectUnauthorized: false` for that host in local development |

## Privacy

In keeping with Postmate Client's local-first design:

- Only **file paths** are stored in `certificates.json` — certificate contents are read at request time and never written anywhere.
- Nothing is synced, uploaded, or logged. Your certificates never leave your machine.
- `certificates.json` may contain passphrases, so keep `.postmate/` in your `.gitignore` (Postmate suggests this automatically in workspace mode).

Coming from Postman or Bruno? See [Migrate from Bruno](/import-export/migrate-from-bruno) or the [Postman comparison](/postman-alternative-vscode) for how Postmate handles the rest of your workflow locally.
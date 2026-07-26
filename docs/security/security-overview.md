---
title: Security & Privacy — Fully Local API Testing in VS Code
description: How Postmate Client handles your data — zero telemetry, no cloud sync, no account, fully local storage. The data-flow overview your security team will ask for, including certificate handling, proxy credentials, and offline installation.
---

# Security & Privacy

Postmate Client was built because of a security review: the original author's organization blocked Postman over its cloud sync and data-residency concerns. That origin shapes every design decision in this product. The short version your security team wants:

**Postmate makes exactly the network requests you ask it to make — and nothing else.**

## The guarantees

| Question security teams ask | Postmate's answer |
|---|---|
| Does it send telemetry or analytics? | **No.** Zero telemetry. No crash reporting, no usage analytics, no phone-home of any kind. |
| Does it sync data to a cloud? | **No.** There is no cloud. There is no server. |
| Does it require an account or login? | **No.** No sign-up, no authentication, no license server. |
| Where do my collections and environments live? | **On your disk**, as plain files you can read, diff, and audit. |
| Can it work fully offline / air-gapped? | **Yes.** After installation, no external connectivity is required except the requests you send. |
| Is traffic inspectable? | **Yes.** Enable `postmate.logAsCurl` and every outgoing request is logged as a curl command you can review. |

## Data flow

There is only one flow: **your machine → the API endpoints you specify.**

- When you press Send, Postmate makes that HTTP/WebSocket request from your machine directly to the target (or through the proxy *you* configured — see [corporate proxy support](/security/corporate-proxy)).
- No request, response, header, token, or environment variable is ever transmitted anywhere else.
- Postmate itself makes no background network calls. The only Postmate-adjacent network activity on your machine is VS Code's own extension-update mechanism, which is controlled by VS Code, not by Postmate.

## Where your data is stored

Everything lives in a single `.postmate` folder — either in VS Code's global storage or, if you enable `postmate.useWorkspaceAsProjectDir`, inside your project workspace:

| Data | Location | Format |
|---|---|---|
| Collections & requests | `.postmate/collections/` | Plain JSON files |
| Environments & variables | `.postmate/` environment files | Plain JSON |
| Request history | `.postmate/` | Local files |
| Run reports | `.postmate/reports/` | JSON + HTML, generated locally |
| Script logs (`pm.log()`) | `.postmate/reports/log.txt` | Plain text |

Plain files mean you stay in control: audit them, encrypt the disk they sit on, `.gitignore` them, or commit them to your own repository and review changes in pull requests like any other code. Your data's residency is wherever *you* put it.

::: tip Version-control note
If you use workspace mode in a Git repository, Postmate offers to add `.postmate/` to your `.gitignore`. Whether to commit collections (useful for team sharing) or ignore them is your call — Postmate never makes it for you. If you mark credentials as [secret variables](/security/secret-variables), the committed files contain no secret values at all, which makes committing the safe default.
:::

## Certificates and credentials

- **Client certificates (mTLS):** Postmate's `certificates.json` stores only **file paths** to your certificate and key files — never the certificate contents. Keys are read from disk at request time and used solely for the TLS handshake. See [client certificates](/security/client-certificates).
- **Proxy credentials:** live in your VS Code settings (`postmate.proxy.url`) on your machine, used only for the proxy authentication handshake. For CI, prefer environment variables (`HTTPS_PROXY`) so credentials never enter a settings file.
- **Tokens and secrets in environments:** mark them as [secret variables](/security/secret-variables) and the value is stored in your **OS keychain** (via VS Code's encrypted secret storage) — the environment file on disk keeps only a `{"$secret": true}` marker, making it safe to commit and share. Plain (non-secret) variables live in the local env file as before; for those, disk encryption and `.gitignore` remain your friends.

## Installation without the marketplace (air-gapped environments)

For networks where the VS Code Marketplace is unreachable, Postmate installs from a VSIX file:

1. On a connected machine, download the VSIX from the [marketplace listing](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate).
2. Transfer the file to the target machine.
3. Install: `code --install-extension postmate-x.y.z.vsix` — or VS Code → Extensions → "…" menu → *Install from VSIX*.

After installation, Postmate is fully functional offline. The `pmc` CLI installs the same way from an npm tarball (`npm pack` / `npm install <file>.tgz`).

## Verifying these claims

Don't take our word for it:

- **Watch the wire:** run Postmate with a local intercepting proxy (mitmproxy, Fiddler) or `netstat` and observe that the only connections are the requests you send.
- **Read the files:** everything in `.postmate/` is human-readable JSON.
- **Inspect requests:** `postmate.logAsCurl` prints every outgoing request in full.

Found something that contradicts this page? That's a security issue and we want to know immediately: **help@postmateclient.com** or [open an issue](https://github.com/shyyadav/postmateClient-docs/issues).

---

*This page describes Postmate Client and the `pmc` CLI as of v1.5.0 / core 0.3.x. It exists so you can forward one link to your security team instead of writing the justification yourself.*
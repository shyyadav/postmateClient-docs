---
title: OAuth 2.0 Testing in VS Code — Now Built Into Postmate Client
description: Postmate Client now supports full OAuth 2.0 — Client Credentials, Password, and Authorization Code with PKCE — with automatic token fetching, silent refresh, and a browser login flow. Free, local, no login, no telemetry.
date: 2026-07-25
author: Postmate Client
head:
  - - meta
    - name: keywords
      content: oauth2 vscode, oauth 2.0 api testing, authorization code pkce vscode, postman oauth alternative, get access token vscode, oauth token refresh api client, client credentials grant testing, bearer token vscode, free oauth client vscode
  - - meta
    - property: og:title
      content: OAuth 2.0 Testing is Live in Postmate Client — Free, Local, Native to VS Code
  - - meta
    - property: og:description
      content: Full OAuth 2.0 in VS Code — Client Credentials, Password, and Authorization Code (PKCE) with automatic token fetching and refresh. Free, local, no login.
  - - meta
    - property: og:url
      content: https://www.postmateclient.com/blog/oauth2-support-launch
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: article:published_time
      content: 2026-07-25
  - - meta
    - name: twitter:title
      content: OAuth 2.0 Testing is Live in Postmate Client
  - - meta
    - name: twitter:description
      content: Test OAuth 2.0 APIs directly inside VS Code — automatic token fetch and refresh, browser login flow, free and local.
  - - meta
    - property: og:image
      content: https://www.postmateclient.com/postmateClient-OAuth2.0-support.png
  - - meta
    - name: twitter:image
      content: https://www.postmateclient.com/postmateClient-OAuth2.0-support.png
---

# OAuth 2.0 Testing is Live in Postmate Client

**TL;DR:** Postmate Client now supports full **OAuth 2.0** — **Client Credentials**, **Password**, and **Authorization Code with PKCE** — alongside Basic, Bearer, API Key, and AWS Signature. Postmate fetches your token automatically on send, caches it, refreshes it silently, and never writes it to disk. It works in the request panel, the [Collection Runner](/data-driven/collection-runner), and the [CLI](/ci-cd/cli-reference) — free forever, no login, no telemetry. [Install or update from the VS Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)

<img src="/postmateClient-OAuth2.0-support.png" alt="OAuth 2.0 authentication in Postmate Client for VS Code — Client Credentials grant with an access token fetched automatically" width="100%" style="border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin:1.25rem 0" />

## Why this matters

OAuth 2.0 is the one part of API testing everyone hits and nobody enjoys. If your API sits behind a token endpoint, you've probably been doing some version of this:

1. **Fetch a token in one tool, paste it into another.** Run a `curl` to the token endpoint, copy the `access_token`, paste it into a `Bearer` header — then repeat every hour when it expires.
2. **Pay for Postman.** Its OAuth flow works, but it comes with an account requirement, cloud sync on by default, and telemetry in the background.
3. **Hand-roll a login script.** Fine until you need to test the actual request, in the actual editor, next to the rest of your API tests.

Today we're shipping the option that should have existed all along: **OAuth 2.0 as a first-class feature in Postmate Client — the token handling done for you, in the same editor you write your code in, entirely on your machine.**

## What you can do today

Open the **Auth** tab on any request, choose **OAuth 2.0**, and pick a grant:

- **Client Credentials** — machine-to-machine auth. Fill in the token URL, client ID, and secret; Postmate exchanges them for a token on send.
- **Password Credentials** — swap a username and password for a token.
- **Authorization Code (PKCE)** — the interactive, user-context flow. Postmate opens your **default browser**, you log in and approve, and the token comes back automatically. No copy-pasting codes out of a URL bar.

On top of the grant, you get:

- **Automatic token fetch on send.** Leave the Access Token field empty and Postmate fetches one the first time you send — then caches and reuses it until just before it expires. No hammering the token endpoint.
- **Silent refresh.** If the provider issues a refresh token, Postmate renews the access token in the background when it expires. With the browser flow, the browser only opens on the first login.
- **Get New Access Token** button — fetch a token manually and inspect it before sending.
- **Client authentication your way** — send client credentials as an `Authorization: Basic` header (`client_secret_basic`) or in the request body (`client_secret_post`). Public/PKCE clients with no secret are handled correctly too.

Full field-by-field reference: **[Authentication in Postmate Client →](/core-concepts/authentication)**

## How the browser flow works

The Authorization Code grant is the one people dread. Here's the whole thing:

1. Click **Get New Access Token**. Postmate starts a temporary local server and opens the provider's login page in your default browser.
2. You log in and approve access. Postmate uses PKCE (S256) and a `state` check under the hood.
3. The provider redirects back to `http://127.0.0.1:<port>/callback`, Postmate captures the authorization code, and the browser shows **"Authentication complete."**
4. Postmate exchanges the code for a token — and a refresh token, if you asked for one — and fills it in.

Because the token logic lives in Postmate's core engine, the same auth works everywhere: the request panel, [collection runs](/data-driven/collection-runner), [pre-requests](/data-driven/request-chaining), and the [CLI for CI/CD](/ci-cd/cli-reference).

## A few honest notes

- **Tokens never touch your disk.** Access and refresh tokens live in memory only. Saving a request writes the OAuth *configuration* to your collection file — never the token. Keep the client secret out of files too by referencing a [secret variable](/security/secret-variables), stored in your OS keychain.
- **An explicit header still wins.** If you set an `Authorization` header yourself in the [Headers tab](/core-concepts/building-requests), it overrides the Auth tab for that request.
- **The Authorization Code grant needs one interactive login.** A browser login can't happen mid-run, so the Collection Runner and CLI reuse the cached token and refresh it silently — run **Get New Access Token** once in the panel first. Client Credentials and Password grants need no interaction and run unattended, which makes them the right fit for CI.
- **The browser flow uses loopback redirects.** It works with providers that allow a `http://127.0.0.1:<port>/callback` redirect URI — which is most standard OAuth 2.0 providers. Just register that URI in your app.

## How to try it

1. [Install Postmate Client](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate) (or update if you already have it) from the VS Code Marketplace.
2. Open or create a request and click the **Auth** tab.
3. Choose **OAuth 2.0**, pick a grant type, and fill in your provider's details.
4. Leave **Access Token** empty and hit **Send** — Postmate fetches the token and makes the call. Or click **Get New Access Token** to grab one first.

Full walkthrough: **[Authentication →](/core-concepts/authentication)** · Keep secrets safe: **[Secret Variables →](/security/secret-variables)**

## Feedback wanted

OAuth 2.0 support is new and we want to know how you're using it — which providers, which grants, what's missing.

- Open an issue or feature request on [GitHub](https://github.com/shyyadav/postmateClient-docs/issues)
- Join the conversation in the [discussion forum](https://github.com/shyyadav/postmateClient-docs/discussions)

If you've been waiting for a free, local, VS Code-native way to test OAuth 2.0 APIs — it's here. Happy testing.

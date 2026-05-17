---
title: WebSocket Support is Live in Postmate Client — Free, Local, Native to VS Code
description: Postmate Client now supports WebSocket and WSS testing directly inside VS Code. Connect, send messages, stream responses, and save to collections — free forever, no login, no telemetry.
date: 2026-05-17
author: Postmate Client
head:
  - - meta
    - name: keywords
      content: vscode websocket client, websocket testing vs code, postman alternative websocket, free websocket client, wss test vscode extension, thunder client websocket alternative, websocket api testing tool
  - - meta
    - property: og:title
      content: WebSocket Support is Live in Postmate Client — Free, Local, Native to VS Code
  - - meta
    - property: og:description
      content: Postmate Client now supports WebSocket and WSS testing directly inside VS Code. Free, local, no login, no telemetry.
  - - meta
    - property: og:url
      content: https://www.postmateclient.com/blog/websocket-support-launch
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: article:published_time
      content: 2026-05-17
  - - meta
    - name: twitter:title
      content: WebSocket Support is Live in Postmate Client
  - - meta
    - name: twitter:description
      content: Test WebSocket and WSS APIs directly inside VS Code — free, local, no login.
  - - link
    - rel: canonical
      href: https://www.postmateclient.com/blog/websocket-support-launch
---

# WebSocket Support is Live in Postmate Client

**TL;DR:** Postmate Client now supports WebSocket and WSS testing directly inside VS Code. Connect to any endpoint, send messages, watch responses stream in real time, save to your collections — free forever, no login, no telemetry. [Install or update from the VS Code Marketplace →](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)

## Why this matters

If you build anything real-time — chat, notifications, live dashboards, IoT, market data feeds, multiplayer game state, GraphQL subscriptions — you've probably been forced into one of three uncomfortable options for testing WebSockets:

1. **Pay for Postman.** WebSocket support is locked behind their account requirement, with cloud sync on by default and telemetry running in the background.
2. **Pay for Thunder Client.** Their WebSocket support is gated behind a paid tier.
3. **Roll your own.** A bespoke Node.js script, a browser console with `new WebSocket(...)`, or a one-off CLI tool. Works, but doesn't save, doesn't compare, doesn't fit alongside your REST tests.

None of these are great. Today we're shipping a fourth option: **WebSocket testing as a first-class feature in Postmate Client — free, local, and in the same editor you write your code in.**

## What you can do today

Pop open the **New HTTP Request** dropdown, choose **WebSocket**, and you get a full WebSocket client inside your editor:

- **Connect to any `ws://` or `wss://` endpoint.** Paste the URL, click Connect, and the connection opens immediately.
- **Authenticate with custom headers.** Add `Authorization` tokens, API keys, or any other custom header your server expects through the Headers tab.
- **Send messages in TEXT, JSON, XML, or HTML mode.** Each mode (except TEXT) comes with inline syntax validation that warns you about errors without blocking you from sending.
- **Stream responses in real time.** Every message the server pushes shows up in the response panel as it arrives. No buffering, no manual refresh.
- **Save WebSocket requests to collections.** Press <kbd>Ctrl</kbd>+<kbd>S</kbd>, name your request, and it lands in the collection of your choice with a `ws` label so you can tell it apart from REST and GraphQL requests at a glance.
- **Mix WebSocket and HTTP requests in the same collection.** When you run a folder or collection, WebSocket requests are skipped automatically so they don't block your stateless HTTP run.

It's everything you need to test a WebSocket the way you'd test any other API — without leaving VS Code and without paying for a tier upgrade.

## How it compares

|  | Postmate Client | Postman | Thunder Client |
| --- | --- | --- | --- |
| WebSocket support | ✅ Free | ⚠️ Yes (login required) | 💰 Paid tier only |
| Runs inside VS Code | ✅ Native | ❌ Desktop app | ✅ Native |
| Works without login | ✅ Always | ❌ Required | ⚠️ For paid features |
| No telemetry | ✅ None | ❌ Yes | ❌ Yes |
| Save to collections | ✅ Yes | ✅ Yes | ✅ Yes |
| Inline message validation | ✅ TEXT / JSON / XML / HTML | ⚠️ Limited | ⚠️ Limited |
| Price | ✅ Free forever | 💰 Paid plans | 💰 Paid tier |

## A few honest notes

We want to be straightforward about what's in this release and what's coming:

- **Reconnection is manual.** If your connection drops, click Connect to reopen it. We considered auto-reconnect but decided against it for v1 — when you're testing a protocol, you generally want to see disconnects, not hide them.
- **No separate Auth tab yet.** WebSocket auth goes through custom headers. If you'd typically configure Bearer tokens or API keys under "Auth" on an HTTP request, add them via the **Headers** tab on the WebSocket panel.
- **CLI support is on the roadmap.** Right now WebSocket requests run only inside VS Code. Collection runs (folder/collection runner) and the CI/CD CLI automatically skip WebSocket entries. CLI support for WebSocket flows is coming — no firm ETA yet.
- **No connection or message limits.** Send what you need.

## How to try it

1. [Install Postmate Client](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate) (or update if you already have it) from the VS Code Marketplace.
2. Click the **Postmate Client** icon in the VS Code Activity Bar.
3. Click the dropdown arrow next to **New HTTP Request** and choose **WebSocket**.
4. Try the public echo server — paste `wss://echo.websocket.org` into the URL bar and hit **Connect**. Send a message in JSON mode and watch it bounce back.

Full walkthrough with screenshots: **[WebSocket testing in VS Code →](/core-concepts/websocket)**

## Feedback wanted

WebSocket support is a brand-new addition and we want to know how you're using it. What works? What's missing? What real-time API are you testing?

- Open an issue or feature request on [GitHub](https://github.com/shyyadav/postmateClient-docs/issues)
- Join the conversation in the [discussion forum](https://github.com/shyyadav/postmateClient-docs/discussions)

If you've been waiting for a free, local, VS Code-native WebSocket client — it's here. Happy testing.

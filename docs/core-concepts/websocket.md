---
title: WebSocket Testing in VS Code — Postmate Client
description: Test WebSocket and WSS APIs directly inside VS Code. Connect, send messages, stream responses, and save WebSocket requests to collections — free, local, no telemetry.
head:
  - - meta
    - name: keywords
      content: vscode websocket client, websocket testing vs code, postman alternative websocket, wss test vscode extension, websocket api testing tool, free websocket client, thunder client websocket alternative, websocket client free
  - - meta
    - property: og:title
      content: WebSocket Testing in VS Code — Postmate Client
  - - meta
    - property: og:description
      content: Test WebSocket and WSS APIs directly inside VS Code. Connect, send messages, stream responses, save to collections — free, local, no telemetry.
  - - meta
    - property: og:url
      content: https://www.postmateclient.com/core-concepts/websocket
  - - meta
    - name: twitter:title
      content: WebSocket Testing in VS Code — Postmate Client
  - - meta
    - name: twitter:description
      content: Test WebSocket and WSS APIs directly inside VS Code. Free, local, no telemetry.
---

# WebSocket Testing in VS Code

Postmate Client is a **free WebSocket client built natively into VS Code**. Connect to any `ws://` or `wss://` endpoint, send messages, watch responses stream in real time, and save WebSocket requests to your collections alongside REST and GraphQL — all without leaving the editor, and without a paid tier.

If you've been using Postman or paying for Thunder Client just to test WebSocket connections, this is a free, local-first alternative that runs entirely inside VS Code.

## Why test WebSockets in VS Code?

Most VS Code REST extensions stop at HTTP. Postman supports WebSocket only in its desktop app, behind a login. Thunder Client supports WebSocket only in its paid tier. **Postmate Client supports WebSocket for free, in the same editor you write code in, with no cloud sync and no telemetry.** Connections stay on your machine.

## Open a new WebSocket request

Click the **dropdown arrow** next to the **New HTTP Request** button in the Postmate Client sidebar, then choose **WebSocket** from the menu.

![Opening a new WebSocket request in Postmate Client — dropdown menu showing WebSocket, From cURL, From Swagger, and From Postman / Postmate options inside the VS Code sidebar](/websocket-new-request.png)

A new WebSocket panel opens in the editor with a URL bar, **Message** and **Headers** tabs, a **Connect** button, and a response panel on the right.

## Connect to a WebSocket server

1. Enter the WebSocket URL (e.g. `wss://echo.websocket.org`) in the URL bar at the top of the panel.
2. If your server requires authentication or custom headers, open the **Headers** tab and add them (for example, an `Authorization: Bearer <token>` header).
3. Click **Connect**.

When the connection succeeds, the **Connect** button turns into a red **Disconnect** button, and the response panel shows a system message confirming the connection. Any messages the server sends will start streaming into the response panel automatically.

::: tip Authentication
Postmate Client's WebSocket panel uses the **Headers** tab for authentication. Add an `Authorization` header, an API key header, or any other custom header your server expects. There is no separate Auth tab for WebSocket today — anything you'd normally configure under "Auth" goes in **Headers**.
:::

## Send and receive messages

While connected, type a message in the editor and click **Send**. Pick the message format from the dropdown above the editor — **TEXT**, **JSON**, **XML**, or **HTML**.

![Postmate Client WebSocket message panel with format dropdown showing TEXT, JSON, XML, and HTML options for sending messages](/websocket-message-mode.png)

Each format gives you:

- **TEXT** — Send any free-form string. No validation, no syntax highlighting.
- **JSON** — Inline syntax validation. Invalid JSON shows an error, but you can still send it — the editor warns you, it doesn't block you.
- **XML** — Inline XML validation with the same non-blocking behavior.
- **HTML** — Inline HTML validation with the same non-blocking behavior.

Click **Send**. Your outgoing message appears in the response panel with a green `Sent` label, and any reply from the server arrives below it with a `Recv` label.

![Active WebSocket connection in Postmate Client showing JSON message sent and the server's echo response streamed back in the response panel](/websocket-connected-stream.png)

The response panel **streams every message in real time** — there's no buffering, no manual refresh. Whatever the server pushes, you see immediately.

## Disconnect

Click the red **Disconnect** button at any time to close the connection. The button switches back to a blue **Connect**, ready to reconnect.

::: warning Reconnection is manual
Postmate Client does not auto-reconnect dropped WebSocket connections. If the server closes the connection (or your network drops), click **Connect** again to reopen it. This is intentional — auto-reconnect can hide real protocol bugs you'd want to see in testing.
:::

## Save a WebSocket request

To save the current WebSocket request to a collection, press <kbd>Ctrl</kbd>+<kbd>S</kbd> (or <kbd>Cmd</kbd>+<kbd>S</kbd> on macOS). Enter a name when prompted and pick the collection to save it under.

Saved WebSocket requests appear in your collection sidebar with a green **`ws`** label so you can tell them apart from REST and GraphQL requests at a glance.

## Run a folder or collection that contains WebSocket requests

**WebSocket requests are automatically excluded** when you run an entire folder or collection that mixes WebSocket and HTTP requests. The collection runner runs only the HTTP/GraphQL requests and skips the WebSocket entries silently.

This is intentional: WebSocket connections are long-lived and stateful, while collection runs are sequential and stateless. Forcing them into the same flow would either block the run on every WebSocket or produce misleading results.

::: info Coming soon
WebSocket request execution from the **CLI** (`postmate run …`) is on the roadmap. There's no separate ETA yet — follow the [GitHub repo](https://github.com/shyyadav/postmate-docs) for release notes.
:::

## Common use cases

WebSocket testing in Postmate Client is useful for:

- **Chat and messaging APIs** — test live message delivery, presence, and typing indicators.
- **Stock tickers and market data feeds** — verify subscription messages and streamed price updates.
- **IoT and device telemetry** — confirm device check-ins and command responses.
- **Real-time dashboards and notifications** — validate push events and event ordering.
- **GraphQL subscriptions** — connect to a GraphQL-over-WebSocket endpoint and watch subscription data stream in.
- **Game backends and multiplayer servers** — exercise lobby joins, state syncs, and matchmaking events.

## How Postmate Client compares for WebSocket support

|  | Postmate Client | Postman | Thunder Client |
| --- | --- | --- | --- |
| WebSocket support | ✅ Free | ⚠️ Yes (login required) | 💰 Paid tier only |
| Runs inside VS Code | ✅ Native | ❌ Desktop app | ✅ Native |
| Works offline | ✅ Always | ⚠️ Limited | ⚠️ Limited |
| Save to collections | ✅ Yes | ✅ Yes | ✅ Yes |
| Per-message format validation | ✅ TEXT / JSON / XML / HTML | ⚠️ Limited | ⚠️ Limited |
| Streaming response view | ✅ Yes | ✅ Yes | ✅ Yes |
| No telemetry | ✅ None | ❌ Yes | ❌ Yes |
| Price | ✅ Free forever | 💰 Paid plans | 💰 Paid tier |

## Feedback and feature requests

WebSocket support is a new feature and we want to hear how you're using it. Open an issue or feature request on [GitHub](https://github.com/shyyadav/postmateClient-docs/issues) or jump into the [discussion forum](https://github.com/shyyadav/postmateClient-docs/discussions).

## Next steps

- [Install Postmate Client from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)
- [Read the Getting Started guide](/getting-started/introduction)
- [See how Collections and Folders work](/core-concepts/collections)
- [Learn about Environments and Variables](/core-concepts/environments)

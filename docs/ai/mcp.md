---
title: MCP Server Reference — Postmate Client
description: Technical reference for Postmate Client's local MCP server — read live responses and your collections, let an AI run your saved API requests and update part of a resource, redaction rules, and configuration.
head:
  - - meta
    - name: keywords
      content: mcp server vscode, local mcp server api testing, vscode api client mcp, postmate mcp tools, let ai run api requests, copilot api testing, agentic api testing, ai api regression testing, json patch api
---

# MCP Server Reference

Postmate Client runs a local [MCP](https://modelcontextprotocol.io) server on `127.0.0.1` so AI agents in your editor can read the request panel you are actually looking at, read your collections and their docs, and — once you turn it on — run requests you have already saved, including building a request's body from another response. It exposes five tools, redacts credentials before returning anything, and can be disabled with a single setting.

This page is the complete reference: every tool, every parameter, what gets redacted, and how to configure it.

::: tip Beta
The MCP server arrived in v2.0.0, `send_request` in v2.1.0, `list_collections` and `get_collection` in v2.6.0, and building a body from another response in v2.7.0. All of it is beta — behaviour and tool names may change. [Feedback welcome](https://github.com/shyyadav/postmateClient-docs/discussions).
:::

## Postmate does not call an AI. An AI calls Postmate

::: info How it works
There is no Postmate AI vendor, no API key, and no model endpoint. Postmate exposes a local MCP server on `127.0.0.1` and waits. Your agent — the one you already use and your company already approved — connects to it locally.
:::

That means Postmate itself still sends nothing anywhere — the same guarantee that covers
everything else in [Security & Privacy](/security/security-overview). Everything the agent
reads is then handled by **your agent's own model provider**, under their data policy.

[Data and privacy](#data-and-privacy) below covers exactly what that involves.

## Setup

### GitHub Copilot

Nothing to configure. Postmate registers the server with VS Code, and Copilot discovers it automatically.

1. Open Copilot Chat (`Ctrl+Alt+I` / `Cmd+Alt+I`)
2. Switch the mode dropdown to **Agent** — tools are not available in Ask mode

![Copilot Chat mode dropdown set to Agent](/copilot-agent-mode.png)

3. Ask about your active Postmate panel

To confirm the server is connected, run **MCP: List Servers** from the Command Palette. You should see *Postmate Client*.

### Other MCP clients

Claude Code, Cursor, and Windsurf read their own configuration files rather than VS Code's MCP API, so they are **not supported yet**. Support for manual configuration is planned — [let us know](https://github.com/shyyadav/postmateClient-docs/discussions) if you want it.

## Tools

| Tool | Available | What it does |
| --- | --- | --- |
| `get_active_response` | Always | Reads the request and response in your active panel |
| `list_open_panels` | Always | Lists your open request panels |
| `list_collections` | On by default | Lists your collections |
| `get_collection` | On by default | Returns a collection's docs and a map of its requests |
| `send_request` | Off until you [enable it](#letting-the-agent-send-requests) | Runs a saved request, optionally with a body built from another response |

`list_collections` and `get_collection` can be turned off with [`postmate.mcp.allowReadCollections`](#reading-collections).

### `get_active_response`

Returns the request and response from the panel you last had focused.

| Field | Description |
| --- | --- |
| `request` | Method, resolved URL, headers, body, and auth type |
| `response` | Status, response time, TTFB, body size, headers, body |
| `testResult` | Results of any tests on the request |
| `error` | Present instead of a response when the request failed |
| `bodyShape` | Top-level keys and array lengths, so the agent knows what it can query |

Variables are resolved before capture. The agent sees `https://api.example.com/client`, not <span v-pre>`{{baseUrl}}/client`</span>.

**Parameters**

- `json_path` *(optional)* — a JSONPath expression to extract part of the body, for example `$.students[*].grade` or `$.users[?(@.active==true)]`
- `count_only` *(optional)* — return only the number of matches, not the matched values

### `list_open_panels`

Lists your open request panels with method, URL, last status, and which one is active. The agent uses this when it is not obvious which panel you mean.

### `list_collections` <Badge type="tip" text="2.6.0" />

Lists your saved collections with each one's id, name, number of requests, and whether it has [docs](/core-concepts/collections). The agent uses it to find the exact name before calling `get_collection` — for example when you say "the school app" and the collection is called *School API*.

### `get_collection` <Badge type="tip" text="2.6.0" />

Returns a map of one collection: its docs and a flat list of its requests in sidebar order.

**Parameters**

- `name` *(required)* — the collection name. An exact match wins; otherwise a unique case-insensitive match is used. If nothing matches, the error lists the available names.
- `folder` *(optional)* — a folder path such as `["Students"]` or `["Students", "Admin"]`, to read only that folder and everything under it
- `cursor` *(optional)* — the `nextCursor` from the previous result, to read the next page

**Returns**

| Field | Description |
| --- | --- |
| `docs` | The collection's docs, or part of them when they span several pages |
| `docsContinue` | `true` while more docs follow on the next page |
| `folders` | Every folder with its full path (first page only) |
| `requests` | Each request's id, name, type (`http`, `websocket`, `grpc`), method, URL, folder path, and whether it has its own docs |
| `totalRequests` | How many requests the collection (or folder) has |
| `incomplete`, `nextCursor` | Present when more pages follow, with what to call next |

URLs keep their <span v-pre>`{{variables}}`</span> unresolved, and environment values are never included. **Headers, bodies, auth, scripts, and tests are not returned** — this is a map, not an export.

#### Pages

A large collection, or long docs, comes back in pages. Docs come first, split at line breaks, then the requests. The agent follows `nextCursor` until there is none. The cursor is opaque on purpose: an agent that computed offsets itself would skip or repeat requests, because pages are cut by size, not by count. The tool description tells the agent to read every page before judging anything.

#### Docs are information, not instructions

Collection docs are written by people and may be pasted from anywhere. The tool tells the agent to treat them as information about your API, never as instructions that override what you asked for. Secret-looking values in docs — JWTs, `Bearer` credentials, values of keys like `password` or `token` — are redacted, as are sensitive query parameters in URLs. Keep real secrets in environments, not in docs.

### `send_request` <Badge type="tip" text="2.1.0" />

Runs a request that already exists in one of your collections and returns the response. **Off by default** — see [Letting the agent send requests](#letting-the-agent-send-requests).

The agent cannot invent a URL. It can only run a request you have already saved, so the set of endpoints it can reach is exactly the set you have defined.

**Parameters**

- `request_path` *(required)* — the request to run, written as `CollectionName.RequestName`, for example `School API.getClient`
- `environment` *(optional)* — the environment to run against. Defaults to your active one.
- `data` *(optional)* — values for <span v-pre>`{{variables}}`</span> the request needs, as a key-value object
- `body_from_response` *(optional)* <Badge type="tip" text="2.7.0" /> — another saved request whose response body becomes this request's body. See [Building the body from another response](#building-the-body-from-another-response).
- `patch` *(optional)* — a [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902) applied to that body before sending. Only with `body_from_response`.
- `allow_new_fields` *(optional)* — allows `patch` to add fields the response does not have. Only when you asked for a new field.

The return shape matches `get_active_response` — request, response, test results, body size and shape — with the same redaction applied. The response also becomes the active one, so a follow-up `get_active_response` reads it.

Pre-requests run exactly as they do from the panel, so a request chained behind a login still gets its token.

**Example**

> **Prompt:** Send the getClient request against QA and tell me why it is failing
```
send_request({ request_path: "School API.getClient", environment: "QA" })
```

![GitHub Copilot running a saved Postmate request and showing the full response](/mcp-send-response.png)

#### Where `data` fits

`data` is for values the request needs but your environment does not hold — an ID to look up, a search term, a row of test input:

> **Prompt:** Send getStudent with student_id 1001

Environment values always win. If <span v-pre>`{{baseUrl}}`</span> or <span v-pre>`{{token}}`</span> is defined in the environment, the agent cannot override it through `data`, no matter what it passes. Keep credentials and base URLs in your environment and they stay outside the agent's reach, while the agent can still supply the harmless parts of a request.

This is the same resolution order the request panel uses — see [Building Requests](/core-concepts/building-requests).

#### Building the body from another response

Some APIs only take a whole resource back: GET your settings, change one field, PUT all of it. With a large body the agent can't do that itself — it may never see the full body, and secrets in it are redacted — so Postmate does it:

```
send_request({
  request_path: "Settings.putUserSettings",
  body_from_response: "Settings.getUserSettings",
  patch: [{ op: "replace", path: "/nickName", value: "Sam" }]
})
```

1. Postmate sends `getUserSettings` (same environment and `data`) and takes its **full, unredacted** response body.
2. It applies the patch. Supported operations: `replace`, `add`, `remove`, and `test` (check a value before changing it). Paths are JSON Pointers such as `/nickName` or `/addresses/0/city`.
3. It sends the result as the body of `putUserSettings`, and the response comes back as usual.

The target can use any method — `PUT`, `POST`, `PATCH` — and the saved request's own body is replaced. The body goes out with your saved `Content-Type` if the request has one, otherwise the source response's JSON type (for example `application/vnd.acme.settings+json`), otherwise `application/json`.

Nothing is sent to the target if any step fails:

- the source request doesn't return 2xx, or its body isn't a JSON object or array
- a `replace` or `remove` path doesn't exist — the error names the keys that do exist at that level, and suggests the right one when only the case differs (`/nickname` → *did you mean `/nickName`?*), so the agent can ask you which field you meant
- an `add` would create a field the response doesn't have and `allow_new_fields` isn't set — so a typo can never add a junk field. Adding array items always works.
- a `test` operation doesn't match

The agent is told not to change the patch on its own after a failure, and the [confirmation dialog](#confirmation-before-mutating-requests) shows every change, marking new fields.

→ See [Update Part of a Resource with Your AI Agent](/ai/partial-updates) for a walkthrough

## Letting the agent send requests

`send_request` is opt-in. Until you turn it on the tool is not registered at all, so your agent will not see it in its tool list and will not try to use it.

```json
{
  "postmate.mcp.allowSend": true
}
```

Or search for **"postmate mcp"** in VS Code Settings and tick **Allow Send**. Changing it takes effect on the agent's next connection; reload the window if the tool does not appear.

Like every other Postmate setting, this can live in a workspace `.vscode/settings.json`, so a team can enable it for a scratch repository and leave it off everywhere else.

### Confirmation before mutating requests

Any send that is not `GET`, `HEAD`, or `OPTIONS` shows a dialog with the method, resolved URL, and environment before anything leaves your machine. When the body was built from another response, the dialog also shows where it came from and each change, for example `replace /nickName = "Sam"` — and `(NEW field)` next to an `add` that creates a field.

![GitHub Copilot asking for confirmation before sending a POST request from Postmate Client](/mcp-send-confirm.png)

Nothing is sent until you approve it. If you decline, the agent is told you declined and asked not to retry — it will come back and ask what you want instead of looping on the dialog.

To send without confirming, which is reasonable when you are iterating against a scratch environment:

```json
{
  "postmate.mcp.confirmMutations": false
}
```

Your agent may show its own confirmation on top of this one. Copilot, for example, asks before running any tool it considers destructive. That prompt is Copilot's, not Postmate's, and it appears whether or not `confirmMutations` is on.

### What the agent can and cannot do

| | |
| --- | --- |
| Run a request you have saved | ✅ |
| Choose which environment it runs against | ✅ |
| Supply values for variables your environment does not define | ✅ |
| Read the response, headers, timing, and test results | ✅ |
| Build a body from another saved request's response and change named fields | ✅ |
| Invent a URL, method, or header | ❌ |
| Write a body from scratch | ❌ |
| Override a value your environment defines | ❌ |
| Create, modify, or delete a saved request | ❌ |
| Send a multipart request | ❌ — file contents are not stored with a saved request |

## What to ask

Prompts that work well:

- *What was the last API response in Postmate?*
- *Write a test to validate the response in the active Postmate panel*
- *Write a schema test for this response*
- *Why did this request fail?*
- *How many items are in the response?*
- *Which Postmate panels do I have open?*

With `send_request` enabled:

- *Send the getClient request and tell me why it is failing*
- *Run Students against QA and check the response shape*
- *Send getStudent with student_id 1001 and show me the payment status*
- *Run the login request, then getClient, and tell me if the token is being picked up*
- *Change my nickName to Sam using putUserSettings with the body from getUserSettings, then check it was saved*

With collections (on by default):

- *List my Postmate collections*
- *Get the School API collection and summarize its docs and requests*
- *Do a full regression for School API in QA env* — works when the collection docs describe the run order, the scenarios to check and the report you want. See [Let Your AI Agent Read Your Docs and Run a Full Regression](/ai/read-collections).

::: tip
Mention "Postmate" or "the active panel" in your prompt. Without it the agent may not realise it should look at your request panel at all.
:::

→ See [AI Test Generation](/ai/generate-api-tests) for a walkthrough of a real generated test

## Generated tests use Postmate's API

Postmate's scripting differs from Postman's in one place: there is no `pm.response` object. The response is exposed through a `RESPONSE` global.

```js
const response = RESPONSE.body;
const status = RESPONSE.status;
const headers = RESPONSE.headers;
```

Everything else — `pm.test`, `pm.expect`, Chai matchers — works as you would expect.

The agent is told about this difference automatically, so generated tests use `RESPONSE.body` and run as-is. It also knows about [`pm.schemaTest`](/testing/pm-library), which Postman does not have, and will generate a JSON Schema from the actual response shape rather than writing out a long list of individual property assertions.

See the [scripting reference](/testing/pm-library) for the full `pm` API, and [AI Test Generation](/ai/generate-api-tests) for worked examples of what the agent produces.

## Large responses

Sending a multi-megabyte response body to an AI agent is slow, expensive, and often gets silently truncated by the agent before the model sees it — which leads to confidently wrong answers about data the model never actually received.

Postmate handles this differently. Bodies over the size limit are **not sent at all**. The agent gets the body's size and shape instead, and queries what it needs:

```
get_active_response({ json_path: "$.students[*].grade" })
```

For a 900-item response, that returns 900 short strings instead of hundreds of kilobytes of objects. For counting questions, `count_only` returns just a number and no data at all.

The same limit applies to responses from `send_request`. A large response comes back as size and shape, and the agent queries it with `get_active_response` afterwards.

`get_collection` keeps each result small enough to reach the model intact and pages the rest, so a big collection or long docs never get silently cut off.

## Timeouts

Requests the agent sends time out after 30 seconds. This is deliberately separate from [`postmate.request.timeoutMs`](/core-concepts/building-requests), which defaults to no timeout: a request you send yourself can hang as long as you are willing to wait for it, but an agent waiting on a dead endpoint blocks the conversation.

On timeout the agent gets an error with a `REQUEST_TIMEOUT` code and the host it was trying to reach, so it can report the problem rather than guessing.

## Data and privacy

This is the section worth reading carefully, especially if you are evaluating Postmate for a workplace that restricts where API data can go.

### What Postmate sends

**Nothing.** Postmate has no telemetry, no cloud service, and no AI vendor. The MCP server listens on `127.0.0.1` and responds to requests from your local agent. It never initiates an outbound connection.

When the agent runs a request through `send_request`, that request goes to **your** API — the one you saved — over your normal proxy and TLS path. It does not pass through anything of ours.

### What your agent sends

Whatever it reads, to its own model provider. If you use GitHub Copilot, that means GitHub and its model providers, under whatever agreement covers your Copilot plan. **Check your agent's data policy** — Copilot Business and Enterprise plans typically carry different terms than individual plans.

Specifically, when you ask a question that triggers a tool call, your agent may receive:

- The request method, resolved URL, headers, and body
- The response status, headers, and body
- Test results for the request
- The names of your open request panels
- The same details for any request it runs itself, if you have enabled `send_request`
- Your collection names, request names, methods, URLs with <span v-pre>`{{variables}}`</span> unresolved, folder paths, and collection docs, if `allowReadCollections` is on (the default). Never headers, bodies, auth, or environment values from collections.

When the agent builds a body from another response, the full source body stays inside Postmate. The agent sees only the response of the request it sent.

### What is redacted

Credentials are replaced with `[redacted by Postmate]` before the tool returns anything. This applies to both the request and the response, and to every tool equally.

**Headers** — `Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, `X-Api-Key`, `X-Auth-Token`, `X-CSRF-Token`, and similar. The header name is kept so the agent knows it was present; only the value is removed.

**Body keys** — any key containing `token`, `password`, `secret`, `apikey`, `authorization`, `credential`, `privatekey`, `clientsecret`, or `sessionid`, at any depth. Matching is deliberately broad.

**Data table secrets** — any key using Postmate's `__` prefix convention, consistent with how those columns are [masked in HTML reports](/testing/reporting).

**JWT-shaped values** — any string matching a JWT pattern is redacted regardless of its key name, since tokens often appear under innocuous field names.

**Auth configuration** — only the auth *type* is exposed (`bearer`, `oauth2`). Client secrets, refresh tokens, AWS keys, and stored credentials are never captured, including for requests the agent runs itself.

**Docs and URLs** — in collection docs, JWTs, `Bearer`/`Basic` credentials, and values of the keys above are redacted; in saved URLs, sensitive query parameters such as `api_key` or `token`. <span v-pre>`{{variables}}`</span> are kept, since they are names, not values. Docs are free text, so this is best effort — keep real secrets in environments.

Redaction applies to JSON bodies and URL-encoded form bodies. Binary and multipart bodies are not sent at all.

### What is not redacted

**Response data is passed through in full, minus credentials.** Postmate does not attempt to detect or remove personal information — names, email addresses, account numbers, and anything else in your response body reaches the agent as-is.

This is deliberate. There is no reliable way to identify PII across arbitrary APIs, and attempting it would break the feature: a test that asserts a name field is correct needs to see the name.

If you work with production data containing personal information, take that into account, and consider turning the feature off for that work.

### Turning it off

Search for **"postmate mcp"** in VS Code Settings and uncheck it:

![Postmate MCP setting in VS Code Settings, unchecked](/postmate-mcp-setting.png)

Or in `settings.json`:

```json
{
  "postmate.mcp.enabled": false
}
```

Disabling takes effect immediately — the server shuts down and the agent loses access on its next call. No reload needed.

Enabling requires a window reload before the agent will reconnect. This is a [VS Code limitation](https://github.com/microsoft/vscode/issues/245018): stopped MCP servers are not restarted automatically.

The setting can be committed to a workspace `.vscode/settings.json`, so a team can disable it for a specific repository.

## Settings reference

| Setting | Default | What it does |
| --- | --- | --- |
| `postmate.mcp.enabled` | `true` | Runs the local MCP server. Off means no tools at all. |
| `postmate.mcp.allowSend` | `false` | Exposes `send_request`. Off means the tool is not registered. |
| `postmate.mcp.confirmMutations` | `true` | Asks before any send that is not `GET`, `HEAD`, or `OPTIONS`. |
| `postmate.mcp.allowReadCollections` | `true` | Exposes `list_collections` and `get_collection`. Off means those tools are not registered. |

### Reading collections

`allowReadCollections` decides whether Postmate serves your collections to the agent. It does not stop the agent from opening files you have open in your workspace — if your collections live in the workspace (`postmate.useWorkspaceAsProjectDir`), the agent's own file tools can read them, including headers and bodies. With the setting on, the agent gets the compact, redacted map instead.

## Limitations

- **GitHub Copilot only.** Other MCP clients are not supported yet.
- **Enabling requires a window reload.** Disabling does not.
- **`send_request` runs saved requests only.** The agent cannot construct a request that does not already exist in a collection.
- **Multipart requests cannot be sent by the agent.** File contents are not stored with a saved request, so the tool declines and asks you to send it from the panel.
- **The agent may use a stale response.** If you switch panels mid-conversation, the agent sometimes answers from a response it read earlier. Asking again prompts a fresh read.
- **The most recent send wins.** A request the agent runs becomes the active response, the same as if you had sent it yourself. Focusing a panel makes that panel active again.
- **Counting questions can take several tool calls.** The agent may query each distinct value separately rather than fetching them all at once.
- **The agent may rely on docs it read earlier.** In a long conversation it can skip re-reading a collection whose docs you have since changed. Start a new chat, or ask it to read the collection again.
- **`body_from_response` needs a JSON source.** The source response must be a JSON object or array; other bodies are refused.
- **Instructions are advice; limits are enforced.** An agent can ignore guidance, so the safety rules — saved requests only, no junk fields without `allow_new_fields`, confirmation for mutations — are enforced by Postmate, not left to the agent.

## Feedback

This is a beta and the design is still moving. If the agent picks the wrong panel, generates a test that does not run, sends something it should have asked about first, or something is redacted that should not be, that is useful to know.

[Open an issue](https://github.com/shyyadav/postmateClient-docs/issues) · [Start a discussion](https://github.com/shyyadav/postmateClient-docs/discussions)
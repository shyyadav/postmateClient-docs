---
title: MCP Server Reference — Postmate Client
description: Technical reference for Postmate Client's local MCP server — tools, parameters, redaction rules, and how to turn it off.
head:
  - - meta
    - name: keywords
      content: mcp server vscode, local mcp server api testing, vscode api client mcp, postmate mcp tools
---
# MCP Server Reference

This page is the technical reference: tools, parameters, redaction rules, and configuration. For what the feature does and how to use it day to day, see [AI Test Generation](/ai/generate-api-tests).

Postmate Client runs a local [MCP](https://modelcontextprotocol.io) server on `127.0.0.1` so AI agents in your editor can read your live request panels. It exposes two tools, redacts credentials before returning anything, and can be disabled with a single setting.

::: tip Beta
This feature is new in v2.0.0 and marked beta. Behaviour and tool names may change. [Feedback welcome](https://github.com/shyyadav/postmateClient-docs/discussions).
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

### `get_active_response`

Returns the request and response from the panel you last had focused.

| Field | Description |
| --- | --- |
| `request` | Method, resolved URL, headers, body, and auth type |
| `response` | Status, response time, headers, body |
| `testResult` | Results of any tests on the request |
| `error` | Present instead of a response when the request failed |
| `bodyShape` | Top-level keys and array lengths, so the agent knows what it can query |

Variables are resolved before capture. The agent sees `https://api.example.com/client`, not `{{baseUrl}}/client`.

**Parameters**

- `json_path` *(optional)* — a JSONPath expression to extract part of the body, for example `$.students[*].grade` or `$.users[?(@.active==true)]`
- `count_only` *(optional)* — return only the number of matches, not the matched values

### `list_open_panels`

Lists your open request panels with method, URL, last status, and which one is active. The agent uses this when it is not obvious which panel you mean.

## What to ask

Prompts that work well:

- *What was the last API response in Postmate?*
- *Write a test to validate the response in the active Postmate panel*
- *Write a schema test for this response*
- *Why did this request fail?*
- *How many items are in the response?*
- *Which Postmate panels do I have open?*

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

## Data and privacy

This is the section worth reading carefully, especially if you are evaluating Postmate for a workplace that restricts where API data can go.

### What Postmate sends

**Nothing.** Postmate has no telemetry, no cloud service, and no AI vendor. The MCP server listens on `127.0.0.1` and responds to requests from your local agent. It never initiates an outbound connection.

### What your agent sends

Whatever it reads, to its own model provider. If you use GitHub Copilot, that means GitHub and its model providers, under whatever agreement covers your Copilot plan. **Check your agent's data policy** — Copilot Business and Enterprise plans typically carry different terms than individual plans.

Specifically, when you ask a question that triggers a tool call, your agent may receive:

- The request method, resolved URL, headers, and body
- The response status, headers, and body
- Test results for the request
- The names of your open request panels

### What is redacted

Credentials are replaced with `[redacted by Postmate]` before the tool returns anything. This applies to both the request and the response.

**Headers** — `Authorization`, `Proxy-Authorization`, `Cookie`, `Set-Cookie`, `X-Api-Key`, `X-Auth-Token`, `X-CSRF-Token`, and similar. The header name is kept so the agent knows it was present; only the value is removed.

**Body keys** — any key containing `token`, `password`, `secret`, `apikey`, `authorization`, `credential`, `privatekey`, `clientsecret`, or `sessionid`, at any depth. Matching is deliberately broad.

**Data table secrets** — any key using Postmate's `__` prefix convention, consistent with how those columns are [masked in HTML reports](/testing/reporting).

**JWT-shaped values** — any string matching a JWT pattern is redacted regardless of its key name, since tokens often appear under innocuous field names.

**Auth configuration** — only the auth *type* is exposed (`bearer`, `oauth2`). Client secrets, refresh tokens, and stored credentials are never captured.

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

## Limitations

- **GitHub Copilot only.** Other MCP clients are not supported yet.
- **Enabling requires a window reload.** Disabling does not.
- **The agent may use a stale response.** If you switch panels mid-conversation, the agent sometimes answers from a response it read earlier. Asking again prompts a fresh read.
- **Counting questions can take several tool calls.** The agent may query each distinct value separately rather than fetching them all at once.

## Feedback

This is a beta and the design is still moving. If the agent picks the wrong panel, generates a test that does not run, or something is redacted that should not be, that is useful to know.

[Open an issue](https://github.com/shyyadav/postmateClient-docs/issues) · [Start a discussion](https://github.com/shyyadav/postmateClient-docs/discussions)
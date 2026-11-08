---
title: AI Agent Regression Testing from Your Docs — Postmate Client
description: Let GitHub Copilot read your Postmate collections and their Markdown docs, so it understands your API before it runs anything — and can run a full regression from your docs. Local, redacted, free.
head:
  - - meta
    - name: keywords
      content: ai api regression testing, copilot read api collection, ai agent api documentation, mcp api collection, agentic api testing vscode, ai test plan from docs, api release check ai
---

# Let Your AI Agent Read Your Docs and Run a Full Regression Test

An agent that can send a request still has to know *which* request, in what order, and what a good response looks like. That knowledge usually lives in someone's head, a wiki page, or a test plan nobody updates.

Postmate puts it next to the requests. Write [docs](/core-concepts/collections) on a collection and on each request, and GitHub Copilot can read them along with a map of the collection — so it understands your API before it touches it.

> **Prompt:** Do a full regression for School API in QA env*

With good collection docs, that one sentence is enough for the agent to work out the run order, send the requests, check every documented scenario, and come back with a **GO** or **NO-GO**.

## What the agent sees

Two tools, both on by default:

- **`list_collections`** — your collection names, request counts, and which collections have docs
- **`get_collection`** — one collection's docs and a flat list of its requests in sidebar order: name, method, URL with <span v-pre>`{{variables}}`</span> unresolved, folder path, and whether the request has its own docs

> **Prompt:** Get the School API collection and summarize its docs and requests

![GitHub Copilot summarizing a Postmate collection's docs and requests](/mcp-get-collection.png)

What it does **not** see: headers, bodies, auth, scripts, tests, or any environment value. `get_collection` is a map, not an export. Secret-looking values in docs and URLs are redacted, and <span v-pre>`{{variables}}`</span> stay as names.

When the agent then runs a request with [`send_request`](/ai/run-api-requests), it gets that one response — redacted the same way as everything else.

## Big collections and long docs

A real collection has dozens of requests and docs that run to pages. Postmate never sends the agent more than it can actually receive: results come in pages, docs first (split at line breaks), then the requests, and the agent follows a cursor until it has everything.

This matters more than it sounds. If an agent silently gets half your docs, it doesn't know the other half exists — it will judge requests against rules it never saw, and report a confident result. Paging, plus a tool description that tells the agent to read every page before judging anything, is what stops that.

## Writing docs an agent can use

The agent can only check what your docs say. A few habits make the difference between a vague summary and a real release check.

**On the collection** — what a new teammate would need on day one:

- What the API does and which environment to test against
- How authentication works (for example: *"Get All Students has Login as a pre-request, so it gets its own token"*)
- The run order and which requests depend on others
- What "full regression" means: which requests are in scope and which to skip
- Test-data rules: what the agent may create, update or delete, and what it must never touch
- What the report should look like, and when the verdict is GO or NO-GO

**For each check** — make it concrete and give it an id:

```markdown
| Id | Scenario | Critical |
|---|---|---|
| S1 | Status is `200` | Yes |
| S6 | Every student has a `studentId` that is a positive integer, and no two share one | Yes |
| S9 | Every student has a non-empty `status` | No |
```

*"Every student's grade is one of PreKg, KG, First … Twelfth"* can be checked. *"Returns valid student data"* can't — the agent will guess.

**Known quirks** — say so, or the agent will report them as bugs every time: *"`schoolInof` is spelled that way in the API. It is not a bug."*

::: tip Docs are information, not instructions
The agent is told to treat docs as information about your API, never as instructions that override what you asked. Write them as facts and rules about the API, and keep real credentials in environments, not docs.
:::

## Example: a release check from docs

The School API collection has two requests in scope, Login and Get All Students, and collection docs that list fifteen scenarios with ids and a GO/NO-GO rule.

> **Prompt:** Do a full regression for School API in QA env*

The agent reads both pages of docs, sends Login and Get All Students against QA, checks the large students response field by field with JSONPath (the body is 116 KB, so it queries rather than reading it whole), and reports:

![Postmate regression report from Copilot — GO verdict with fifteen scenarios and evidence for each](/mcp-regression-report.png)
*The collection has nine requests; its docs put two in scope. The agent ran only those two, checked all fifteen scenarios, and returned GO with a warning for one non-critical finding.*

Every scenario has a result and evidence — *"898 checked; none invalid"* — and non-critical findings are listed as warnings without blocking the release. When a check could only be partly done, the agent marks it as a warning instead of a pass, because the docs tell it to.

## Turning it off

```json
{
  "postmate.mcp.allowReadCollections": false
}
```

The tools are then not registered at all. Reading the active response and running saved requests are controlled separately — see the [settings reference](/ai/mcp#settings-reference).

One thing the setting cannot do: stop your agent from opening files that are already open in your workspace. If you keep collections in your repository with `postmate.useWorkspaceAsProjectDir`, the agent's own file tools can read them, headers and bodies included. With the setting on, it gets the compact, redacted map instead.

## Limitations

- **The agent checks what the docs say, nothing more.** Vague docs give vague checks.
- **It may rely on docs it read earlier.** In a long conversation, an agent can skip re-reading a collection whose docs you have since changed. Start a new chat, or ask it to read the collection again.
- **Docs redaction is best effort.** Docs are free text; keep secrets out of them.
- **GitHub Copilot only**, like the rest of Postmate's MCP tools for now.

## FAQs

### Does the agent get my request bodies or headers from collections?

No. `get_collection` returns names, methods, URLs, folders and docs. Bodies, headers, auth and scripts are never part of it. The agent only sees a request's details when it runs it, and those are redacted.

### Are my environment values shared?

No. URLs keep their <span v-pre>`{{variables}}`</span> unresolved, and no environment value is ever included.

### Do I need docs for this to work?

No — the agent can list and run requests without them. Docs are what turn "run these requests" into "check these requests against what they should do".

### Can it run a regression in CI?

The same tools are planned for the [`pmc` CLI](/ci-cd/cli-reference)'s MCP server, so a CI agent can run the same docs-driven check.

### Why is it on by default when sending isn't?

Reading a map of your collections doesn't change anything, and only your own editor's agent — the one your company already approved — reads it, when your prompt needs it. Sending requests can change data, so it stays opt-in.

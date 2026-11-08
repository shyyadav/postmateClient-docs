---
title: AI Agents in Postmate Client
description: How AI agents work with Postmate Client — reading live responses and your collections, generating tests, running your saved requests, and updating part of a resource.
head:
  - - meta
    - name: robots
      content: noindex, follow
---

# AI Agents in Postmate Client

Postmate Client runs a local MCP server so the AI assistant you already use can work with your live API requests. Postmate never calls a model — your agent calls Postmate.

- **[Generate API Tests with AI](/ai/generate-api-tests)** — Copilot reads the response your API actually returned and writes assertions against it
- **[Let Your AI Agent Run Your API Requests](/ai/run-api-requests)** — opt in, and the agent can send a request you have saved and read what comes back
- **[Let Your AI Agent Read Your Docs and Run a Full Regression](/ai/read-collections)** — the agent reads a map of your collection and its docs, and can run a full regression from them
- **[Update Part of a Resource with Your AI Agent](/ai/partial-updates)** — GET, change one field, send it back; Postmate builds the body from the full response
- **[MCP Reference](/ai/mcp)** — every tool, parameter, and redaction rule
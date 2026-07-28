---
title: "HTTP QUERY Method (RFC 10008): What It Is and How to Send One from VS Code"
description: The HTTP QUERY method (RFC 10008) is a safe, idempotent request with a body — the official replacement for POST /search. What it is, how it compares to GET and POST, and how to send a QUERY request today from VS Code with Postmate Client or curl.
date: 2026-07-19
image: /query-method-hero.png
---

# HTTP QUERY Method (RFC 10008): What It Is and How to Send One from VS Code

*Available from Postmate Client 1.6.0*

![HTTP QUERY method in VS Code API client method dropdown — Postmate Client](/query-method-hero.png)

In June 2026 the IETF published [RFC 10008](https://datatracker.ietf.org/doc/rfc10008/), giving HTTP its first new method since PATCH in 2010: **QUERY**. Postmate Client supports it today — pick it from the method dropdown like any other verb, and it just works: body editor, <span v-pre>`{{variable}}`</span> resolution, [secret variables](/security/secret-variables), test scripts, collection runs, and the `pmc` CLI.

## What is the HTTP QUERY method?

**QUERY is a safe, idempotent HTTP method that carries a request body** — GET's guarantees with POST's payload. It's designed for exactly one job: reads that are too complex to fit in a URL.

```
QUERY /users HTTP/1.1
Content-Type: application/json

{ "filter": "age > 21", "limit": 10 }
```

Because the spec *guarantees* no state change, proxies and clients can retry a failed QUERY without fear of double-charging anyone, and responses are cacheable.

## QUERY vs POST /search

Every API developer has faced this choice: your search endpoint needs a complex filter — nested conditions, long ID lists, a GraphQL-ish query. It doesn't fit in a URL (length limits, encoding pain, and URLs leak into server logs). So you reach for POST.

But POST is a lie here. The request doesn't *change* anything — it's a read. By using POST you lose everything HTTP gives safe requests: intermediaries won't cache it, clients can't safely retry it, and tooling treats it as a state-changing operation. `POST /search` became the industry's workaround, and everyone quietly knew it was wrong. QUERY is the honest verb that replaces it.

## How to send a QUERY request from VS Code

Select **QUERY** from the method dropdown. The body editor behaves exactly as it does for POST — JSON, form, XML, or plain text, with variable autocomplete and per-row data table resolution. Environment variables and secret variables resolve inside the body as usual.

![Sending an HTTP QUERY request with a JSON body in Postmate Client — environment variable resolved in the body and echoed back in the response](/query-request-response.png)

Collections with QUERY requests run everywhere Postmate runs: the VS Code panel, the collection runner, and CI via the CLI:

```bash
pmc run search-suite QA --secret apiToken=abc123
```

Nothing special to configure — a QUERY request in a committed collection file works identically for every teammate and pipeline.

## Which servers support QUERY today?

Your *server* has to understand QUERY too. Adoption is early: Node.js parses it natively, OpenAPI 3.2 can document it, and framework support (Rails, Spring) is in progress. If your backend routes only the classic verbs, a QUERY request will bounce with a 405 — which is itself a quick way to find out where your stack stands.

That's precisely why an API client should support it *now*: you can't experiment with a method your tooling won't send.

## Try it: a public QUERY test endpoint

1. Update Postmate Client from the [VS Code marketplace](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)
2. New request → method dropdown → **QUERY**
3. Point it at `https://echo.postmateclient.com/` and send a JSON body — it echoes your method, headers, and body straight back

We run that endpoint ourselves, because nothing else would do: the public echo services (`httpbingo.org`, `postman-echo.com`) all predate the RFC and reject QUERY with a 405. As far as we know, **`echo.postmateclient.com` is the only public endpoint you can QUERY today.** No Postmate installed? It works from curl too:

```bash
curl -X QUERY https://echo.postmateclient.com/ \
  -H "content-type: application/json" \
  -d '{"filter":"age > 21","limit":10}'
```

## FAQ

### Does Postman support the QUERY method?

Not first-class. Postman lets you type a custom method string into the method field, but QUERY isn't in the dropdown, and custom methods don't get method-aware behavior. Postmate Client has QUERY in the method dropdown from v1.6.0, with the full body editor, variable resolution, test scripts, and CLI support.

### Does my server need to support QUERY?

Yes. QUERY is a real HTTP method on the wire, not a header trick — if your framework only routes the classic verbs, you'll get a 405. Node.js parses QUERY natively today; Rails and Spring support is in progress. A quick QUERY request against your stack is the fastest way to find out where it stands.

### Is QUERY cacheable?

Yes — that's much of the point. RFC 10008 defines QUERY as safe and idempotent, so responses can be cached by intermediaries and clients can retry failed requests, neither of which is true for `POST /search`.

### Is there a public endpoint I can test QUERY against?

`https://echo.postmateclient.com/` — it accepts any method, including QUERY, and echoes your method, headers, and body back as JSON. The established echo services (httpbingo, postman-echo) predate the RFC and reject QUERY with a 405.

---

Questions or a server framework we should test against? [Open an issue](https://github.com/shyyadav/postmateClient-docs/issues).

---
title: "API Migration Testing: How to Prove the New Stack Returns the Same Thing"
description: "Migrating a service means promising behavioural parity. Here's how to prove it — what should count as a difference, and how to triage expected changes from real bugs."
date: 2026-08-11
author: Shyam Yadav
head:
  - - meta
    - name: keywords
      content: api migration testing, api parity testing, test api v1 vs v2, regression testing after api migration, behavioural parity api, compare api responses two environments
---

# API Migration Testing: How to Prove the New Stack Returns the Same Thing

A migration is a promise: same input, same output, no surprises for consumers. Monolith to microservices, on-prem to cloud, framework rewrite, vendor swap — the technology changes, the promise doesn't.

The problem is that nobody asks *"did the new service work?"* They ask *"can you prove it returns the same thing as the old one, across every case, and show me the evidence?"*

That's a harder question than it sounds, and the naive answer falls apart immediately.

![Migration parity report showing differences between the legacy and new stack](/Bulk-API-Compare.png)

## Why a text diff is useless here

Point a plain diff at old and new responses during a cross-stack rewrite and *every endpoint comes back changed.* Not one of them actually is.

Field order moved, because Jackson emits declaration order and Go's `encoding/json` sorts map keys alphabetically. Numbers now serialize as `10.00` instead of `10`. An array came back in a different sequence because the new implementation fetches in parallel. Nothing about the data changed. Everything about the bytes did.

So you eyeball responses one at a time, then write a script to normalize the noise, then realize the script is a second codebase with its own bugs that nobody will run again after cutover.

The idea — compare the two — is right. The bar is wrong. Textual identity was never the thing you promised. **Semantic equivalence** is.

> If you're still deciding *how* to compare — online diff tools, a custom script, or a purpose-built client — that ground is covered in [How to Compare JSON Responses: 3 Practical Methods](/blog/how-to-compare-json-response). This post assumes you've picked a method and asks the harder question: what should count as a difference, and how do you work through hundreds of them without losing the real bugs in the noise?

## What counts as a difference?

Postmate Client's comparison is deliberately opinionated: **lenient where nothing downstream would notice, strict where a consumer would break.**

| Case | Legacy | New | Reported? |
|---|---|---|---|
| Key order | `{name, address, email}` | `{name, email, address}` | No |
| Array order | `[a, b, c]` | `[c, a, b]` | No |
| Numeric format | `10` | `10.00` | No |
| Type change | `"100"` | `100` | **Yes** |
| Field dropped | `"Ada"` | *missing* | **Yes** |
| Field added | *missing* | `"Ada"` | **Yes** |
| Value nulled | `"Ada"` | `null` | **Yes** |
| Null populated | `null` | `"Ada"` | **Yes** |
| Status code | `200` | `201` | **Yes** |
| Response headers | — | — | Not compared |

Read down the "No" column: every one is a serializer setting. A client parsing JSON into an object doesn't care what order the keys arrived in, and `10`, `10.0` and `10.00` all deserialize to the same number. Those aren't findings. They're noise that would bury your findings.

Read down the "Yes" column: every one is a promise you made to a consumer and then changed.

### Type changes are the expensive ones

`"100"` versus `100` looks trivial and is anything but. Any typed client — a generated model, anything in Java, Go, C#, or TypeScript with strict parsing — fails on the spot. In a financial context, a price that used to arrive as a number and now arrives as a string isn't a formatting nit. It's an incident.

Schema validation frequently waves this through when the field is loosely typed. Comparison won't.

### `null` and missing are different promises

This is the classic migration bug, and most tooling flattens the two together.

A consumer written as `if ('email' in user)` behaves differently from one written as `if (user.email !== null)`. When a Java service is rewritten in Go and `omitempty` quietly drops null fields from the payload, the legacy version sent `"email": null` and the new one sends nothing at all. The schema still validates — the field was optional. The client breaks anyway.

Postmate Client reports the four states separately:

```
$.email:  "ada@example.com"  |  undefined     # field dropped
$.email:  undefined          |  "ada@..."     # field added
$.email:  "ada@example.com"  |  null          # value nulled
$.email:  null               |  "ada@..."     # previously-null value populated
```

Four different bugs. Four different conversations with whoever owns the client.

![Comparison report showing a type change, a dropped field, a nulled value and a preserved string](/BulkCompare-null-missing-value.png)

## Parity isn't only about payloads

Two things the payload diff won't tell you on its own, both of which Postmate Client surfaces alongside it.

**Response time.** Each side's timing is reported next to the diff counts, so a latency regression shows up in the same place as a payload difference rather than in a separate exercise nobody runs. Behavioural parity isn't only about what comes back — if the rewritten service returns byte-perfect data noticeably slower, you haven't finished migrating.

![Response time and difference counts shown in the comparison footer](/BulkCompare-futter.png)

**Status codes.** Because status is compared, your error cases belong in the run alongside the happy path — 400, 401, 404, 422. Migrations break on error shapes constantly: a framework upgrade alters the error envelope, a validation library starts returning 422 where the old one returned 400, an auth layer returns 403 where it used to return 401. Nobody tests this, and every consumer's error handling depends on it.

## Running it across the whole surface

A migration is 200 endpoints across a dozen input combinations each. The mechanics are the same as any bulk comparison — one collection, two [environments](/core-concepts/environments) carrying base URL and auth, a [data table](/data-driven/data-tables) of inputs — and the step-by-step for both modes lives in the docs:

- [Compare API responses — Data Row mode](/testing/compare-api-response)
- [Compare API responses — Data Table mode](/testing/compare-api-response-bulk-data)

Two things worth knowing that are specific to migrations:

**Auth almost certainly differs between the two sides.** Legacy service on an API key, new service behind OAuth 2.0 is an extremely common shape. Because auth config lives on the environment rather than the request, the request definition stays identical and only the environment swaps. That's the difference between maintaining one collection and maintaining two.

**Compare like for like.** Legacy-QA against Next-QA, not legacy production against the new stack's dev box. Differences caused by tier drift will bury the differences caused by the migration.

**Start from the spec if you have one.** Importing the Swagger/OpenAPI definition beats hand-building two hundred requests, and it gives you the full endpoint surface rather than the subset someone remembered.

## The goal was never zero differences

Here's the reframe that turns this from a pass/fail gate into a workflow you can actually run.

Real migrations are never identical, and they shouldn't be. The new stack adds a field. It drops something deprecated. It returns a new ID format that was in the plan from day one. If your success criterion is "no differences," you fail on run one and stay failed forever, and everyone stops reading the report.

The criterion that works is:

> **Every difference is one you already knew about and signed off on.**

Postmate Client lets you hide expected differences by path, so the loop becomes:

1. **Run one** — a wall of differences. Most are intentional.
2. **Triage** — hide the known, planned changes.
3. **What's left is your bug list.** Short, real, actionable.
4. **Re-run as the migration progresses** — the noise stays folded away, and anything new stands out immediately.

![Hiding expected differences to leave only the real bug list](/BulkCompare-Hide-Diff.png)

In the run above, hiding `$.meta.schemaVersion` and `$.account.riskProfile` — both planned changes — clears one row entirely and shortens two others. What remains is a type change, a dropped field, a restructured object and an error contract that no longer matches. Four things worth a conversation, instead of fifteen lines worth of scrolling.

## Chasing one field across every row

The other way through a large report is the opposite move: instead of removing what you don't care about, isolate what you do.

Type the start of a JSONPath into the filter and the report narrows as you type, across every row in the run. Searching `account.balance` answers a question the row-by-row view can't: *is this field wrong everywhere, or only for margin accounts?*

![Filtering the comparison report by JSONPath to isolate one field across all rows](/BulkCompare-Search-Diff.png)

That distinction usually decides who owns the bug. A field that differs on every single row is a serialization or mapping problem in the new implementation. A field that differs on three rows out of two hundred is a data problem, and the rows it fires on tell you which case triggers it. Same report, two different investigations.

## What this doesn't catch

Three limitations worth stating plainly, because knowing where a tool stops is part of using it well.

**Ordered collections.** Index-insensitive array matching is the right default — it's what prevents the false-positive flood — but it cuts both ways. If the legacy service returns your top ten holdings sorted by value and the new one returns the same ten in a different order, that *is* a regression, and comparison will report no difference. Anything sorted, ranked, paginated, or priority-ordered needs an explicit assertion; a post-request script checking `$.items[0].id` covers it in a couple of lines.

**Response headers.** Body and status code are compared; headers are not. Check `Content-Type`, `Cache-Control`, CORS headers, and any pagination or rate-limit headers your clients read — `Link`, `X-Total-Count`, `X-RateLimit-*`. New frameworks rename these more often than you'd like.

**It's an interactive workflow, not a CI gate.** Comparison runs inside the editor today — there's no CLI equivalent, so you can't wire parity into a pipeline the way you can with the collection runner. For a migration that's less of a constraint than it sounds, since triaging expected differences is a judgement call someone has to make anyway. But it does mean re-running the comparison is a deliberate act, not something that happens on every deploy.

## One more reason this has to run locally

Meaningful parity testing means hitting both stacks with production-shaped payloads — real account numbers, real customer records, real volume. Synthetic data doesn't surface the encoding edge cases that break migrations: the one customer with a diacritic in their name, the one account with a null field nothing else has.

Postmate Client runs entirely inside VS Code with no login, no cloud sync, and no telemetry, so those payloads never leave your machine. In a regulated environment that's not a preference — it's the difference between running this exercise properly and not being permitted to run it at all.

## Migration parity checklist

Copy this into your cutover ticket:

- [ ] Collection built once, pointed at two environments (legacy / new)
- [ ] Auth configured per environment — they almost certainly differ
- [ ] Same tier on both sides — QA against QA, not QA against prod
- [ ] Endpoint surface sourced from the spec, not from memory
- [ ] Input matrix in a data table, covering edge values as well as the happy path
- [ ] Error cases included — 400, 401, 404, 422 — status codes are compared
- [ ] Run one triaged; intentional changes hidden by path
- [ ] Remaining differences filed as bugs, not waved through
- [ ] Fields that differ everywhere separated from fields that differ occasionally
- [ ] Ordered or ranked arrays covered by explicit assertions
- [ ] Response headers checked separately — `Content-Type`, caching, pagination
- [ ] Response time deltas reviewed, not just payloads
- [ ] Comparison re-run after every meaningful change on either side

---

A migration sign-off shouldn't rest on "we tested it and it looked fine." It should rest on a report that lists every difference between the old stack and the new one, with a name next to each. That report takes an afternoon to produce and it's the only thing that makes the cutover decision defensible.

Postmate Client is a free, local-first API client for VS Code — REST, GraphQL, and WebSocket, with no login and no telemetry. [Install it from the marketplace](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate).

---

**Related reading**

- [How to Compare JSON Responses: 3 Practical Methods](/blog/how-to-compare-json-response)
- [Compare API responses (Data Row mode)](/testing/compare-api-response)
- [Compare bulk API responses (Data Table mode)](/testing/compare-api-response-bulk-data)
- [Data-Driven API Testing in Postmate Client](/data-driven/data-tables)

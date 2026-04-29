---
title: Compare Bulk API Responses Across Environments | Postmate Client
description: Compare API responses across two environments using bulk data from a data table. Send parallel requests per row and view only the differences. Ideal for regression testing and environment migrations.
keywords: compare api responses, bulk api testing, data-driven api testing, api regression testing, compare api across environments, parallel api requests, api response diff, postmate client compare
---

# Compare Bulk API Responses Using a Data Table

Postmate Client's **Data Table mode** lets you compare API responses across two environments using bulk input data. Instead of comparing a single request/response pair, Postmate Client sends one request per row in your data table — in parallel to both environments — and shows you only the differences between the responses.

This is a companion to [Data Row mode](/testing/compare-api-response). If you're new to response comparison in Postmate Client, start there.

![API response compare with bulk data in postmate client](/public/compare-api-response-bulk.png)

## When to Use Data Table Mode

Reach for Data Table mode when you need to verify API behavior across many inputs at once. Common scenarios:

- **Environment migrations** — confirm `staging` and `prod` return identical responses for a known set of inputs before cutting over.
- **Regression testing after a release** — run the same dataset against `prod` and a release candidate to catch unintended changes in response shape, status codes, or values.
- **Backend refactors** — verify that a rewritten service returns the same data as the legacy service for every row in your test dataset.
- **Data-driven contract testing** — validate that an API contract holds across edge cases (empty fields, special characters, large payloads) sourced from a CSV.

If you only need to compare one request, use Data Row mode instead — it's simpler and faster for ad-hoc checks.

## How Data Table Mode Works

1. **Pick a data table** — select any data table defined in your collection (for example, a `person` table with columns like `name`, `office`, `address`).
2. **Select two requests and environments** — choose the request and environment for each side of the comparison (e.g. `POST echo-request-1` on `PROD` vs. `POST echo-request-2` on `PROD`).
3. **Run the comparison** — Postmate Client iterates through every row in the table and sends both requests in parallel, substituting row values into the request as variables.
4. **Review per-row diffs** — each row gets its own result card showing only the JSONPath differences between the two responses. Identical fields are hidden so you can focus on what changed.

Each row card displays:

- The input row data (so you know which input produced the diff).
- Response status codes and response times for both sides.
- A line-by-line list of differences using JSONPath notation (e.g. `$.projects[0-0].metrics.builds[1-1].env: "dev" → "prod"`).
- An expandable **...and N more** link when there are additional differences beyond the first few.

![Select data table for bulk compare](/public/compare-api-responsemode.png)

## Reading the Diff Output

Differences are expressed as JSONPath transitions from the left response to the right response. A few examples:

```
$.projects[0-0].metrics.builds[1-1].env: "dev" → "prod"
$.projects[0-0].metrics.builds[1-1].passed: true → false
$.logs[1-1].level: "info" → "error"
```

The notation `[1-1]` refers to array index `1` on both sides; `[2-?]` means the index exists on one side but not the other. A value of `undefined` on either side of the arrow means the field is missing in that response.

## Parallel Execution

Both requests for a given row are sent at the same time, so wall-clock runtime is roughly the slower of the two environments per row, not the sum. Response times are shown per row so you can spot environments that are degrading even when the response bodies match.

## Tips for Effective Bulk Comparison

- **Start small.** Run against 5–10 representative rows first to confirm your variable substitution works before pointing at a 10,000-row table.
- **Pin response times in mind, not just bodies.** A matching body with a 10x slower response is still a regression worth investigating.
- **Use stable, deduplicated inputs.** Rows with timestamps, UUIDs, or other non-deterministic data will produce noisy diffs. Either strip these from the comparison or accept that those paths will always differ.
- **Keep a "golden" dataset.** Maintain a curated table of inputs that exercise known edge cases — it pays for itself the first time it catches a regression.

## Data Row vs. Data Table — Quick Reference

| | Data Row | Data Table |
|---|---|---|
| Input | Single request | One request per table row |
| Execution | Two parallel requests | `2 × N` parallel requests |
| Output | One diff view | One diff card per row |
| Best for | Ad-hoc checks, debugging | Regression testing, migrations |

## Related

- [Compare API responses (Data Row mode)](/testing/compare-api-response)
- [Working with data tables in Postmate Client](/data-driven/data-tables)
- [Environment management](/core-concepts/environments)

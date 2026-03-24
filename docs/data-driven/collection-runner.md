# Collection Runner

Execute an entire collection in sequence, with data table support and test result summaries.

## Running a Collection

1. Right-click a collection in the Postmate sidebar.
2. Select **Run Collection**.
3. Choose an **environment** and optionally select a **data table**.
4. Click **Run**.

Postmate executes every request in order. Pre/post scripts and tests run for each request. Results appear in the **Run Results** panel.

## Data-Driven Runs

When a data table is attached, the runner iterates through each row — executing the full collection once per row. Three rows in your table means three full collection runs, each with different variable values.

This gives you comprehensive coverage without duplicating requests.

::: tip
Runner results show pass/fail per test, response times, and status codes — making it easy to spot regressions at a glance.
:::

## Run Results

After a run completes, the results panel shows:

| Column | Description |
|---|---|
| Request | The request name and method |
| Status | HTTP status code returned |
| Time | Response time in milliseconds |
| Tests | Pass/fail count for that request |

A summary at the top shows total tests passed, failed, and skipped across the entire run.

## Stopping a Run

Click **Stop** in the runner panel at any time to abort the run mid-sequence. Requests already completed will show their results; pending requests are skipped.

## Running via CLI

For headless/automated runs, use the [Postmate CLI](/ci-cd/cli-reference) — it wraps the collection runner and outputs results to a report file.

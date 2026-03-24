# Reporting

Generate structured test reports from CLI runs for sharing, archiving, and dashboards.

## Reporter Types

The `--reporter` flag controls output format:

| Reporter | Description |
|---|---|
| `cli` | Prints results to stdout (default) |
| `html` | Generates a self-contained HTML report |
| `json` | Outputs structured JSON for custom processing |

## HTML Report

The HTML reporter generates a self-contained file — no external dependencies, open it in any browser:

```bash
postmate run \
  --collection ./collections/api-suite.json \
  --environment ./environments/staging.json \
  --reporter html \
  --output ./reports/results.html
```

**The HTML report includes:**

- Overall pass/fail summary with percentages
- Per-request results with status code, response time, and test outcomes
- Expandable rows showing response body and headers
- Timestamp and environment name in the header

## JSON Report

Use the JSON reporter to pipe results into your own tooling or dashboards:

```bash
postmate run \
  --collection ./api-suite.json \
  --environment ./staging.json \
  --reporter json \
  --output ./results.json
```

**Output shape:**

```json
{
  "summary": {
    "total": 12,
    "passed": 11,
    "failed": 1,
    "duration": 843
  },
  "results": [
    {
      "name": "POST /auth/login",
      "status": 200,
      "responseTime": 142,
      "tests": [
        { "name": "Status is 200", "passed": true },
        { "name": "Token is present", "passed": true }
      ]
    }
  ]
}
```

## CLI Output

Without `--reporter`, results print to stdout — useful for local runs and quick feedback:

```
✓  POST /auth/login          200  142ms  2/2 tests
✓  GET  /users/{{userId}}    200   89ms  1/1 tests
✗  DELETE /users/{{userId}}  403   54ms  0/1 tests
   └─ FAIL: Status is 204 — expected 204, got 403

────────────────────────────────────────
  11 passed  1 failed  843ms total
```

## Uploading Reports in CI

See the [CLI Reference](/ci-cd/cli-reference) for GitHub Actions and GitLab CI examples that upload the HTML report as a build artifact.

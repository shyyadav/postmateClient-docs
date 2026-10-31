---
title: CLI Reference — Run API Collections from the Terminal
description: Run API collections from your terminal with the free pmc CLI — data-driven runs, HTML reports, client certificates, proxy support, an MCP server for AI agents, and CI/CD exit codes.
---
# Postmate Client CLI — Run API Collections from Terminal (Best Postman CLI Alternative)

Run API collections directly from your terminal using the **Postmate Client CLI** (`pmc`) — a fast, lightweight API testing CLI and Postman CLI alternative.

Part of Postmate Client (a VS Code API client), the CLI is built for local-first API development, automated testing, and CI/CD workflows — with no cloud dependency.

The Postmate Client CLI supports:
- Environment-based execution
- Data-driven API testing
- JSON and HTML reports
- Client certificates (mTLS) and corporate proxies
- An MCP server, so AI agents can run your saved requests in CI
- CI/CD pipeline integration with exit codes based on your assertions

## Install Postmate Client CLI

The CLI needs **Node.js 20 or later**. Install it globally using npm:

```bash
npm install -g @postmate/cli
```

Verify the installation:

```bash
pmc --version
```

## Project Structure

Postmate Client CLI works inside a project that contains a `.postmate` directory. This folder stores your collections, environments, data tables and settings.

```
my-project/
├── .postmate/
│   ├── collections/          # one JSON file per collection
│   ├── data/                 # data tables (CSV)
│   ├── postmate-envs.json    # environments and variables
│   ├── postmateHeader.json   # default headers
│   └── certificates.json     # optional: client certificates
└── reports/                  # created by pmc run (see below)
```

You can run the CLI from the project root, from any folder below it, or from inside `.postmate` — the CLI walks up from the current folder until it finds `.postmate`.

## Run API Collection from Terminal

Basic usage:

```bash
pmc run --collection <collectionName> --env <environmentName>
```

**Example:**

```bash
pmc run --collection school --env Dev
```

For data-driven runs, add a data table with `--data` — each row executes the collection once, and variables like <span v-pre>`{{id}}`</span> and <span v-pre>`{{username}}`</span> resolve per row:

```bash
pmc run --collection school --env Dev --data dataTable
```

## Execution Output

A typical terminal run looks like this:

```
🚀 Running school
Env: Dev
Iterations: 1
Total Requests: 3

→ GET    https://api.example.com/users
  200 OK · 96ms
▸ Get Users [Itr. 1]
  ✔ Status code is 200
  ✔ Response is JSON

→ POST   https://api.example.com/users
  201 Created · 143ms
▸ Create User [Itr. 1]
  ✖ Returns the new user id

→ GET    https://api.example.com/admin
  401 Unauthorized · 48ms
▸ Admin Dashboard [Itr. 1]
  no assertions

Finished in 1s
Total Requests: 3
Tests: 2 passed, 1 failed
Report saved: /home/me/my-project/reports/school-Dev-2026-10-31T15-32-10.123Z.json
HTML Report saved: /home/me/my-project/reports/school-Dev-2026-10-31T15-32-10.123Z.html
```

Each request shows its method, URL, status and time, followed by its assertion results. The status is information only: a request passes or fails on its assertions, never on its status code (see [exit codes](#cli-exit-codes-for-ci-cd)). Requests sent by a script during the run (for example a Login sent by [request chaining](/data-driven/request-chaining)) appear as `→` lines without a `▸` line.

In CI logs, set `FORCE_COLOR=1` to keep the colors (see the [GitHub Actions example](#github-actions-example)).

## HTML and JSON Reports

After every run, a JSON report and an HTML report are saved to a `reports/` folder **in the folder you ran `pmc` from**. Run it from the project root and the reports land in `my-project/reports/`; run it from inside `.postmate` and they land in `.postmate/reports/`.

Reports follow this filename format:

```
<collection>-<environment>-<timestamp>.json
<collection>-<environment>-<timestamp>.html
```

**Example:**

```
school-Dev-2026-10-31T15-32-10.123Z.json
```

Without `--env`, the environment part is `noenv`. With `--report <name>`, the files are `<name>.json` and `<name>.html` (a trailing `.html` in the name is ignored).

Reports can be stored as CI artifacts, parsed for analytics, converted to JUnit, or used for dashboards. Add `reports/` to your `.gitignore` so local runs don't end up in version control.

## CLI Exit Codes for CI/CD

A run passes or fails **on your assertions only**:

| Code | Meaning |
|------|---------|
| `0`  | Every assertion passed. A request with no assertions counts as passed, whatever its status. |
| `1`  | An assertion failed, a request got no response at all (TLS, DNS, connection refused, timeout), a secret had no value, the collection was not found, or the `--certificates` file was not found. |

A `401` or `400` does not fail a run by itself — it may be exactly what a negative test expects. Assert the status you expect:

```js
pm.test('Status code is 200', () => pm.expect(RESPONSE.status).to.equal(200));
pm.test('Rejects a missing token', () => pm.expect(RESPONSE.status).to.equal(401));
```

**Example:**

```bash
pmc run --collection school --env Dev
echo $?              # bash
echo $LASTEXITCODE   # PowerShell
```

## CLI Command Reference

### `pmc run`

```bash
# positional form — collection, env, data in order (env and data optional)
pmc run test-var QA dataTable

# flag form (or mix both)
pmc run test-var --env QA --secret password=Test@123 --data dataTable
```

| Option | Description |
|--------|-------------|
| `-c, --collection <name>` | Name of the collection to run (or first positional argument) |
| `-e, --env <name>` | Target environment name (or second positional argument) |
| `-d, --data <name>` | Optional data table for iteration (or third positional argument) |
| `-s, --secret <name=value>` | Value for a [secret variable](/security/secret-variables) (repeatable) |
| `-r, --report <name>` | Custom report file name |
| `--certificates <file>` | Client certificates config. Default: `.postmate/certificates.json` |
| `--proxy <url>` | Proxy URL. Default: `HTTPS_PROXY` / `HTTP_PROXY` |
| `--proxy-bypass <hosts>` | Comma-separated hosts that skip the proxy (merged with `NO_PROXY`) |
| `--ca-bundle <file>` | Extra CA bundle (PEM) to trust, for example a corporate root CA |
| `--insecure` | Do not verify server TLS certificates |

Flags take precedence over positional arguments when both are given.

### `pmc mcp`

Starts Postmate's [MCP server](/ai/mcp) over stdio, so an AI agent (GitHub Copilot CLI, Claude Code and others) can send your **saved** requests headless, for example in a CI pipeline.

```bash
pmc mcp --env QA
```

| Option | Description |
|--------|-------------|
| `-e, --env <name>` | Default environment for requests that don't name one |
| `--allow-mutations` | Allow non-GET/HEAD/OPTIONS requests. Off by default: POST, PUT, PATCH and DELETE are blocked and reported to the agent as blocked |
| `-s, --secret <name=value>` | Value for a secret variable (repeatable); also read from `POSTMATE_SECRET_<NAME>` |
| `--certificates`, `--proxy`, `--proxy-bypass`, `--ca-bundle`, `--insecure` | Same as for `pmc run` |

The agent gets one tool, `send_request`, which takes a saved request as `"CollectionName.RequestName"`. It cannot call URLs that are not saved in your collections, and tokens and auth headers are redacted from what it sees. Logs go to stderr, so they never mix with the MCP traffic on stdout.

In CI there is no editor, so the agent has no tool to list your saved requests or read your data tables. Name the requests it should use, and the path to any data table file (for example `.postmate/data/School-Fee.csv`), in the agent's instructions.

Register it in your agent's MCP config, for example:

```json
{
  "mcpServers": {
    "postmate": {
      "type": "local",
      "command": "pmc",
      "args": ["mcp", "--env", "QA"]
    }
  }
}
```

See it in action: [My AI QA Agent Now Runs in CI](/blog/ai-qa-agent-ci-github-actions), with the full workflow in [shyyadav/postmate-school](https://github.com/shyyadav/postmate-school).

## Secret Variables in the CLI

[Secret variables](/security/secret-variables) store their values in the VS Code keychain — which the CLI can't (and shouldn't) read. In the terminal and CI, supply values via:

```bash
# explicit flag, repeatable
pmc run school QA --secret apiToken=abc123 --secret aws-secret=xyz

# or environment variables
POSTMATE_SECRET_APITOKEN=abc123 pmc run school QA
```

Env-var naming: variable name uppercased, non-alphanumerics replaced with `_` (`aws-secret` → `POSTMATE_SECRET_AWS_SECRET`). Flags take precedence over env vars.

If a request references a secret with no value supplied, the run fails with exit code `1` and an error naming the variable. Secrets in the environment that the collection never references don't require values.

## Client Certificates and Proxy

### Client certificates (mTLS)

By default the CLI reads `.postmate/certificates.json`, the same file the extension uses (see [Client Certificates](/security/client-certificates) for the format). Point to a different file with `--certificates`:

```bash
pmc run school QA --certificates ./ci-certs.json
```

Relative paths inside the file (`certPath`, `keyPath`, `pfxPath`, `caPath`) are resolved from the folder that contains the JSON file, not from where you run `pmc`:

```json
{
  "certificates": [
    {
      "host": "api.example.com",
      "certPath": "certs/client.crt",
      "keyPath": "certs/client.key",
      "caPath": "certs/ca.pem"
    }
  ]
}
```

If the `--certificates` file does not exist, the run stops with an error. If the file is not valid JSON, the CLI prints a warning with the line and column and continues without client certificates.

### Proxy

Without any flag, the CLI uses the standard `HTTPS_PROXY`, `HTTP_PROXY` and `NO_PROXY` environment variables. Use `--proxy` and `--proxy-bypass` to set them explicitly, and `--ca-bundle` if your proxy re-signs TLS traffic with a corporate root CA. See [Proxy Setup](/security/corporate-proxy).

```bash
pmc run school QA --proxy http://proxy.corp:3128 --ca-bundle ./corp-root.pem
```

Use `--insecure` only for local testing: it turns off server certificate verification for every request. Requests to `localhost` already skip server certificate verification, so self-signed local servers work without it.

## CI/CD Integration

### GitHub Actions Example

```yaml
jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - uses: actions/setup-node@v5
        with:
          node-version: "22"

      - name: Install Postmate CLI
        run: npm install -g @postmate/cli

      - name: Run API Tests
        env:
          FORCE_COLOR: "1"
          POSTMATE_SECRET_APITOKEN: ${{ secrets.API_TOKEN }}
        run: pmc run --collection school --env QA --data dataTable

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v5
        with:
          name: postmate-report
          path: reports/
```

If any assertion fails, or a request gets no response, the step fails automatically — no extra configuration required. Values that come from GitHub's `secrets` context are automatically masked in Actions logs. `FORCE_COLOR` keeps the colored output in the Actions log.

Full working example: [shyyadav/pmcSampleProject](https://github.com/shyyadav/pmcSampleProject). More detail: [GitHub Actions](/ci-cd/github-action).

## Troubleshooting

- **`No .postmate directory found`**: run `pmc` from the project folder or a folder below it.
- **`Collection not found`**: names are matched as saved in the extension, including spaces and case (`"School API"`, not `school-api`).
- **A request fails with "closed the connection before responding"**: the server most likely requires a client certificate. Check the `host` in your certificates file and that the run picked up the right file.
- **Full error details**: set `PMC_DEBUG=1` to print the complete error, including the request. This can include auth headers, so don't enable it in CI logs that others can read.

## Best Practices

- Keep base URLs inside environment files
- Use data files for bulk, data-driven execution
- Version control your `.postmate` directory, but not `reports/` or private keys
- Assert the status code you expect on every request that matters
- Store reports as CI artifacts for traceability
- Use clear, consistent environment names (`Dev`, `QA`, `Prod`)

## Why Postmate Client CLI?

Postmate Client CLI is a fast, lightweight alternative to Postman CLI built for developers who want to run API tests locally, automate workflows, and integrate with CI/CD pipelines — without relying on cloud-based tools.

It is ideal for developers looking for a simple Postman CLI alternative to run API tests without leaving the terminal.

It is designed to be:
- Local-first (no data leaves your machine)
- CI/CD friendly (exit codes follow your assertions)
- Agent-ready (`pmc mcp` lets AI agents run your saved requests, with guardrails)
- Developer-focused (simple CLI, no GUI required)

## Learn more:
- [Collection Runner](/core-concepts/collections)
- [Environments and variables](/core-concepts/environments)
- [Data Tables](/data-driven/data-tables)
- [Tests & Assertions](/testing/tests-assertions)
- [Client Certificates](/security/client-certificates)
- [Proxy Setup](/security/corporate-proxy)
- [AI Agent Access (MCP)](/ai/mcp)
- [GitHub Actions](/ci-cd/github-action)

## FAQ
### Is Postmate Client CLI a Postman CLI alternative?
Yes. Postmate Client CLI is a lightweight, local-first alternative to Postman CLI for running API collections, automated testing, and CI/CD workflows.
### Can I run API tests in CI/CD using Postmate Client CLI?
Yes. Postmate Client CLI returns `0` when every assertion passes and `1` when an assertion fails or a request gets no response, so it works with GitHub Actions, Jenkins, Bamboo and other CI tools.
### Does a 401 or 500 response fail the run?
Not by itself. A request passes or fails on its assertions. Add an assertion for the status you expect — `200` for a normal call, `401` for a negative test.
### Does Postmate Client CLI support data-driven testing?
Yes. You can pass a data table using the `--data` option. Each row runs the collection with different inputs.
### Can I use client certificates or a corporate proxy?
Yes. The CLI reads `.postmate/certificates.json` (or the file given with `--certificates`) and honors `HTTPS_PROXY`/`NO_PROXY` or the `--proxy` flags.
### Can an AI agent run my requests in CI?
Yes. `pmc mcp` starts an MCP server that lets an agent send your saved requests. Mutating requests are blocked unless you pass `--allow-mutations`.
### Where are Postmate Client CLI reports stored?
In a `reports/` folder inside the folder you ran `pmc` from — both a JSON and an HTML report for each run.


*Made with ❤️ using Postmate Client

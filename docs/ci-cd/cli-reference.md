# Postmate Client CLI — Run API Collections from Terminal (Best Postman CLI Alternative)

Run API collections directly from your terminal using the **Postmate Client CLI** — a fast, lightweight API testing CLI and Postman CLI alternative.

Part of Postmate Client (a VS Code API client), the CLI is built for local-first API development, automated testing, and CI/CD workflows — with no cloud dependency.

The Postmate Client CLI supports:
- Environment-based execution
- Data-driven API testing
- JSON reporting
- CI/CD pipeline integration with proper exit codes

## Install Postmate Client CLI

Install Postmate Client CLI globally using npm:

```bash
npm install -g @postmate/cli
```

Verify the installation:

```bash
pmc --version
```

## Project Structure

Postmate Client CLI works inside a project that contains a `.postmate` directory. This folder stores all your collections, environments, and related data.

```
my-project/
│
├── .postmate/
│   ├── collections/
│   ├── environments/
│   ├── data/
│   └── reports/
```

You can run the CLI from inside `.postmate` or from the project root — the CLI automatically detects the correct project folder.

## Run API Collection from Terminal

Use the Postmate Client CLI to run API collections from the terminal for automated API testing, scripting, and CI/CD workflows.

Basic usage:

```bash
pmc run --collection <collectionName> --env <environmentName>
```

**Example:**

```bash
pmc run --collection school --env Dev
```

Each row in the data file will execute the collection once. Variables like `{{id}}` and `{{username}}` resolve per row.

## Execution Output

A typical terminal run looks like this:

```
🚀 Running school
Env: Dev
Iterations: 1
Total Requests: 10

✔ [1] Get Users (200)
✖ [1] Create User (500)

Finished in 3s 120ms
Total Requests: 10
Report saved: .postmate/reports/school-Dev-2026-02-14T15-32-10.json
```

---

## HTML and JSON Reports

After every run, a JSON report and HTML report are automatically saved to:

```
.postmate/reports/
```

Reports follow this filename format:

```
<collection>-<environment>-<timestamp>.json
```

**Example:**

```
school-Dev-2026-02-14T15-32-10.json
```

Reports can be stored as CI artifacts, parsed for analytics, converted to JUnit, or used for dashboards.

## CLI Exit Codes for CI/CD

Postmate Client CLI returns standard exit codes for CI/CD compatibility:

| Code | Meaning |
|------|---------|
| `0`  | All requests successful (HTTP 2xx) |
| `1`  | One or more requests failed |

**Example:**

```bash
pmc run --collection school --env Dev
echo $?
```

## CLI Command Reference

### `pmc run`

```bash
pmc run --collection <name> --env <envName> [--data <dataFile>]
```

| Option | Description |
|--------|-------------|
| `--collection` | Name of the collection to run |
| `--env` | Target environment name |
| `--data` | Optional data file for iteration |

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Run API Tests
  run: pmc run --collection school --env QA
```

If any request fails, the pipeline step fails automatically — no extra configuration required.

## Best Practices

- Keep base URLs inside environment files
- Use data files for bulk, data-driven execution
- Version control your `.postmate` directory
- Store reports as CI artifacts for traceability
- Use clear, consistent environment names (`Dev`, `QA`, `Prod`)

## Why Postmate Client CLI?

Postmate Client CLI is a fast, lightweight alternative to Postman CLI built for developers who want to run API tests locally, automate workflows, and integrate with CI/CD pipelines — without relying on cloud-based tools.

It is ideal for developers looking for a simple Postman CLI alternative to run API tests without leaving the terminal.

It is designed to be:
- Local-first (no data leaves your machine)
- CI/CD friendly (with proper exit codes)
- Developer-focused (simple CLI, no GUI required)

## Learn more:
- [Collection Runner](/data-driven/collection-runner)
- [Environments and variables](/core-concepts/environments)
- [Data Tables](/data-driven/data-tables)
- [Postmate Client Requests](/core-concepts/requests)

:::info FAQ
### Is Postmate Client CLI a Postman CLI alternative?
Yes. Postmate Client CLI is a lightweight, local-first alternative to Postman CLI for running API collections, automated testing, and CI/CD workflows.
### Can I run API tests in CI/CD using Postmate Client CLI?
Yes. Postmate Client CLI returns standard exit codes (`0` for success, `1` for failure), making it easy to integrate with CI/CD tools like GitHub Actions, Jenkins, and Bamboo.
### Does Postmate Client CLI support data-driven testing?
Yes. You can pass a data file using the `--data` option. Each row in the file runs the collection with different inputs.
### Where are Postmate Client CLI reports stored?
Reports are automatically saved in the `.postmate/reports/` directory in JSON format after each run.
:::

*Made with ❤️ using Postmate Client
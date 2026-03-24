# CLI Reference

Run Postmate collections from the command line — integrate API tests into any CI/CD pipeline.

## Installation

```bash
npm install -g postmate-cli
```

Verify the installation:

```bash
postmate --version
```

## Basic Usage

```bash
postmate run --collection <path> --environment <path>
```

## Commands

### `postmate run`

Execute a collection.

```bash
postmate run \
  --collection ./collections/auth-api.json \
  --environment ./environments/staging.json \
  --reporter html \
  --output ./reports/results.html
```

**Options:**

| Flag | Alias | Description |
|---|---|---|
| `--collection` | `-c` | Path to the collection JSON file |
| `--environment` | `-e` | Path to the environment JSON file |
| `--data` | `-d` | Path to a data table CSV file |
| `--reporter` | `-r` | Output format: `cli`, `html`, `json` (default: `cli`) |
| `--output` | `-o` | Output file path for the report |
| `--bail` | | Stop on first test failure |
| `--timeout` | | Request timeout in milliseconds (default: `10000`) |
| `--verbose` | `-v` | Print full response bodies in the console |

### `postmate export`

Export a collection from the VS Code extension to a JSON file.

```bash
postmate export --collection "Auth API" --output ./collections/auth-api.json
```

## CI/CD Integration

### GitHub Actions

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Postmate CLI
        run: npm install -g postmate-cli

      - name: Run API tests
        run: |
          postmate run \
            --collection ./collections/api-suite.json \
            --environment ./environments/ci.json \
            --reporter html \
            --output ./reports/api-results.html

      - name: Upload test report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: api-test-report
          path: ./reports/api-results.html
```

### GitLab CI

```yaml
api-tests:
  image: node:20
  script:
    - npm install -g postmate-cli
    - postmate run -c ./collections/api-suite.json -e ./environments/ci.json -r html -o report.html
  artifacts:
    when: always
    paths:
      - report.html
```

### Data-Driven CI Run

Pass a CSV file to run the collection once per data row:

```bash
postmate run \
  --collection ./collections/login-tests.json \
  --environment ./environments/staging.json \
  --data ./data/test-users.csv \
  --reporter html \
  --output ./reports/login-results.html
```

## Exit Codes

| Code | Meaning |
|---|---|
| `0` | All tests passed |
| `1` | One or more tests failed |
| `2` | Configuration or runtime error |

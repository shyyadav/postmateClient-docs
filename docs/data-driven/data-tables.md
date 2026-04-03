---
title: Data Tables in Postmate Client (Data-Driven API Testing in VS Code)
description: Run data-driven API testing in Visual Studio Code with Postmate Client. Use environment-scoped data tables, CSV import, variables, and automated workflows — a privacy-first Postman alternative.

head:
  - - meta
    - name: description
      content: Run data-driven API testing in Visual Studio Code with Postmate Client. Use environment-scoped data tables, CSV import, variables, and automated workflows — a privacy-first Postman alternative.
  - - meta
    - property: og:title
      content: Data Tables in Postmate Client (Data-Driven API Testing in VS Code)
  - - meta
    - property: og:description
      content: Run data-driven API tests in VS Code with Postmate Client. Attach CSV data tables to environments and automate API testing locally.
---

# Data Tables (Data-Driven API Testing in VS Code)

Run **data-driven API testing in Visual Studio** Code using Postmate Client. Data Tables let you parameterize API requests using CSV-style datasets, making it easy to test multiple scenarios with different inputs.

Postmate Client is a privacy-first **Postman alternative** that keeps all your test data local while supporting powerful automation features like collections, environments, and scripting.

This makes Postmate Client ideal for **data-driven API testing in VS Code**, similar to Postman Collection Runner with CSV data — but fully local and privacy-first.

<img src="/datatableRequest.gif" alt="Select individual row of data while sending request" width="100%" style="border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin:1rem 0" />

## What is a Data Table in API Testing?

A Data Table is a structured dataset (like a spreadsheet) used to run API requests with multiple inputs.

- Each column = variable name
- Each row = one test case
- Works with {{variable}} syntax

Example: API test data table `test-users`

| username | password | expectedStatus |
|---|---|---|
| alice@example.com | pass123 | 200 |
| bob@example.com | wrongpass | 401 |
| admin@example.com | admin123 | 200 |

**Perfect for:**

- Login API testing
- Negative test cases
- Bulk API validation

## Environment-Scoped Data Tables

Unlike traditional API tools, Postmate Client supports **environment-scoped data tables.**

Attach different datasets to:

- Dev environment
- Staging environment
- Production environment

When you switch environments, your **test data automatically switches** too.

This makes it ideal for:

* Environment-specific testing
* Safe production validation
* Clean separation of test data

## How to Attach a Data Table to an Environment
1. Open the Env tab in the sidebar
2. Select your environment (Dev, Staging, Prod)
3. Click **Data Tables → New Table**
4. Add columns and rows

Once attached:

* No need to reselect
* Automatically persists across sessions
* Always synced with environment



## Using Data Tables in API Requests

Reference columns using standard variable syntax:

Reference any column name exactly like an environment variable using <span v-pre>`{{variableName}}`</span> syntax:

```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email":    "{{username}}",
  "password": "{{password}}"
}
```
* Select environment
* Choose a data row
* Click Send

Postmate Client injects variables dynamically at runtime.

::: tip
For running all rows in sequence, use the [Collection Runner](/data-driven/collection-runner) for **data-driven API testing automation in VS Code**.
:::

## Run Data-Driven Tests with Collection Runner

Use the **Collection Runner** to execute API tests across all rows automatically.

* Iterates through each row
* Runs full request flow
* Generates pass/fail results

👉 Ideal for:

* **Automated API testing
* Regression testing
* Bulk validation**

<img src="/collectionRunDatatable.gif" alt="Select any data table in collection run" width="100%" style="border-radius:8px;border:1px solid rgba(255,255,255,0.08);margin:1rem 0" />

## Import CSV for API Testing

Already have test data?

Import it instantly:

1. Open **Data Tables** panel
2. Click Import CSV
3. Upload file
4. First row → column names
5. Remaining rows → test cases

## Key Behaviors

- **Unlimited tables** — create as many tables as your project needs, with no row or column limits.
- **Environment-scoped** — each table is attached to one environment; switching environments automatically switches the active table.
- **Always attached** — once a table is linked to an environment it stays linked across sessions.
- **Works anywhere variables work** — use <span v-pre>`{{columnName}}`</span> in URLs, headers, request bodies, and test scripts.

## Why Use Data Tables in Postmate Client?

If you're looking for:

* A **Postman alternative** in VS Code
* **Data-driven API testing tools**
* **Local-first API testing** (no cloud sync)
* Better handling of **test data across environments**

Data Tables give you a clean, scalable way to manage API test inputs.
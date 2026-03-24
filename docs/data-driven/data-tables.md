# Data Tables

Parameterise requests with CSV-style data tables to run the same request against multiple input sets.

## What is a Data Table?

A Data Table is a named grid of key-value pairs attached to an environment. Each row represents one set of variable values — like a spreadsheet where every row is a different test case.

**Example table: `test-users`**

| username | password | expectedStatus |
|---|---|---|
| alice@example.com | pass123 | 200 |
| bob@example.com | wrong | 401 |
| admin@example.com | admin123 | 200 |

## Creating a Data Table

1. Open the **Environments** panel in Postmate Client.
2. Select an environment, then click **Data Tables**.
3. Click **New Table** and give it a name.
4. Add columns for each variable, then add rows of data.

## Using a Table in a Request

Reference table columns in your request exactly like environment variables:

```
POST {{baseUrl}}/auth/login

{
  "email":    "{{username}}",
  "password": "{{password}}"
}
```

Select a specific row from the **Data Table** selector in the request panel before clicking **Send**. The variables for that row are injected at send time.

::: info
Select a specific data row for single requests, or let the [Collection Runner](/data-driven/collection-runner) iterate through all rows automatically.
:::

## Attaching a Table to an Environment

Data tables are scoped to an environment. Attach a table to an environment so it's available to all requests running under that environment.

## CSV Import

You can import an existing CSV file as a data table:

1. Open the Data Tables panel.
2. Click **Import CSV**.
3. Select your file — the first row becomes the column headers.

# Migrate from Postman

Move your existing Postman collections into Postmate Client with a single import.

## Step 1: Export from Postman

1. In Postman, right-click your collection and choose **Export**.
2. Select **Collection v2.1** format.
3. Save the `.json` file to your machine.

## Step 2: Import into Postmate

1. In Postmate Client, click **Import**.
2. Select **Postman Collection**.
3. Choose the exported `.json` file.

Postmate imports all requests, folders, and collection structure. Environments can be exported from Postman and imported separately.

## API Differences

Most `pm.*` API calls are compatible, but some Postman methods have Postmate equivalents:

| Postman | Postmate Equivalent |
|---|---|
| `pm.environment.set(k, v)` | `pm.setVariable(k, v)` |
| `pm.environment.get(k)` | `pm.getVariable(k)` |
| `pm.environment.unset(k)` | `pm.clearVariable(k)` |
| `pm.variables.get(k)` | `pm.getVariable(k)` |
| `pm.response.to.have.status(n)` | `pm.expect(RESPONSE.status).to.equal(n)` |
| `pm.response.json()` | `RESPONSE.body` |
| `pm.response.code` | `RESPONSE.status` |
| `pm.response.responseTime` | `RESPONSE.responseTime` |
| `pm.response.headers.get(k)` | `RESPONSE.headers[k]` |
| `console.log()` | `pm.log()` |

::: warning
Scripts using `pm.environment.set()` must be updated to `pm.setVariable()`. A global find-and-replace in your exported JSON before importing is the fastest way to handle this.
:::

## What Transfers Cleanly

- ✅ Request method, URL, headers, body
- ✅ Collection and folder structure
- ✅ Pre/post-request scripts (with API updates above)
- ✅ Tests using `pm.test()` and `pm.expect()`
- ✅ Environment variables (imported separately)

## What Needs Manual Review

- ⚠️ `pm.environment.*` calls — update to `pm.setVariable` / `pm.getVariable`
- ⚠️ `pm.response.*` calls — update to `RESPONSE.*`
- ⚠️ `console.log()` — update to `pm.log()`

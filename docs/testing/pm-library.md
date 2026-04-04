---
title: "Postmate Client pm Library (Scripting API) — Postman pm Object Alternative"
description: "Complete reference for the Postmate Client pm object (Postman alternative). Learn how to write API tests, use pm.test and pm.expect, manage environment variables, validate JSON schemas, and debug API responses using the Postmate Client scripting API."
keywords: ["postmate client pm object", "postmate Client pm object", "postman pm object alternative", "api testing scripting api", "pm.test examples", "pm.expect assertions", "api testing scripts", "environment variables api testing"]
canonical: "https://postmateclient.com/docs/pm-library"
---

# Postmate Client pm Library (Scripting API Reference)

The `pm` object is Postmate Client's built-in scripting API, available globally in all pre-request and post-request scripts. Use it to write assertions, manage environment variables, validate response schemas, and log debug output — without any imports or setup.

Postmate Cleint's `pm` object is similar to the Postman pm API, allowing you to write tests, assertions, and scripts for API testing directly inside your requests.

Developers familiar with Postman can use the Postmate Client `pm` object as a drop-in alternative for writing API tests and scripts.

## What is the pm Object?

When Postmate Client executes a script, it injects a global `pm` object into the scripting context. This object exposes methods for:

- **Testing** — assert response status, body values, and timing
- **Variables** — read and write environment variables across requests
- **Validation** — check response bodies against JSON Schema
- **Utilities** — decode Base64 strings, inspect the active request, and log output

## What can you do with the pm object?

- Write automated API tests using `pm.test`
- Validate responses using `pm.expect`
- Store and reuse data with environment variables
- Run pre-request and post-request scripts
- Debug API responses with logging

This makes Postmate Client a powerful alternative to Postman scripting for API testing workflows.

## API Reference

### `pm.test(name, fn)` — Define API Tests

Registers a named test. The callback `fn` should throw if the assertion fails — use `pm.expect` inside for readable, chainable assertions.

```js
pm.test('Status is 200', () => {
  pm.expect(RESPONSE.status).to.equal(200);
});

pm.test('Response includes user object', () => {
  pm.expect(RESPONSE.body).to.have.property('user');
});
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Display name shown in the test results panel |
| `fn` | `function` | Callback that runs the assertion; throw to fail |

---

### `pm.expect(value)` — Assertions for API Testing

Returns a [Chai](https://www.chaijs.com/api/bdd/)-based assertion chain. Call `.to.equal()`, `.to.include()`, `.to.be.above()`, and other Chai BDD matchers to assert on any value.

```js
pm.expect(RESPONSE.status).to.equal(201);
pm.expect(RESPONSE.body.name).to.include('Alice');
pm.expect(RESPONSE.responseTime).to.be.below(300);
pm.expect(RESPONSE.body.items).to.have.length(5);
```

Common matchers:

| Matcher | Example |
|---------|---------|
| `.to.equal(val)` | Strict equality |
| `.to.include(str)` | String or array contains value |
| `.to.be.above(n)` | Greater than n |
| `.to.be.below(n)` | Less than n |
| `.to.have.length(n)` | Array or string length |
| `.to.have.property(key)` | Object has key |
| `.to.be.true` / `.to.be.false` | Boolean check |

---

### `pm.assert(condition, message?)`

Simple boolean assertion. Throws with an optional message if `condition` is falsy. Use this as a lightweight alternative to `pm.expect` when you don't need chaining.

```js
pm.assert(RESPONSE.status === 200, 'Expected status 200');
pm.assert(RESPONSE.body.token !== undefined, 'Token must be present');
```

---

### `pm.setVariable(key, value)` — Set Environment or data Variables

Writes a variable to the active environment. Use this to capture values from one response and pass them to subsequent requests — common patterns include storing auth tokens and resource IDs.

```js
pm.setVariable('authToken', RESPONSE.body.token);
pm.setVariable('userId', RESPONSE.body.user.id);
```

---

### `pm.getVariable(key)` — Get Environment or data Variables

Reads a variable from the active environment. Returns `undefined` if the key does not exist.

```js
const token = pm.getVariable('authToken');
```

---

### `pm.clearVariable(key)` 

Removes a variable from the active environment. Useful for cleaning up short-lived values like one-time tokens.

```js
pm.clearVariable('tempToken');
```

---

### `pm.listVariables()` — List All Variables

Returns an array of all variable keys currently set in the active environment. Useful for debugging environment state.

```js
const keys = pm.listVariables();
pm.log('Variables: ' + keys.join(', '));
```

---

### `pm.getRequest()`

Returns the current request object, including the URL, HTTP method, headers, and body. Available in both pre-request and post-request scripts.

```js
const req = pm.getRequest();
pm.log('Sending ' + req.method + ' to ' + req.url);
```

---

### `pm.log(message)`

Writes a message to the Postmate Client output console. Helpful for tracing variable values and debugging script logic.

```js
pm.log('Auth token: ' + pm.getVariable('authToken'));
pm.log('Response time: ' + RESPONSE.responseTime + 'ms');
```

---

### `pm.schemaTest(name, schema, data)` — Validate JSON Schema

Validates `data` against a [JSON Schema](https://json-schema.org/) object. Results are reported the same way as `pm.test` — pass or fail with the given name.

```js
const schema = {
  type: 'object',
  required: ['id', 'email'],
  properties: {
    id:    { type: 'number' },
    email: { type: 'string' }
  }
};

pm.schemaTest('User schema is valid', schema, RESPONSE.body);
```

---

### `pm.base64Decode(encoded)`

Decodes a Base64-encoded string and returns the decoded value. Commonly used to inspect JWT payloads.

```js
const payload = pm.base64Decode(accessToken.split('.')[1]);
pm.log(payload);
```
## Quick Reference

| Method | Purpose |
|--------|---------|
| `pm.test(name, fn)` | Register a named test |
| `pm.expect(value)` | Chai assertion chain |
| `pm.assert(cond, msg?)` | Boolean assertion |
| `pm.setVariable(k, v)` | Write a variable to the environment |
| `pm.getVariable(k)` | Read a variable from the environment |
| `pm.clearVariable(k)` | Delete a variable |
| `pm.listVariables()` | List all variable keys |
| `pm.getRequest()` | Get the current request object |
| `pm.log(msg)` | Print to the output console |
| `pm.schemaTest(n, s, d)` | Validate data against a JSON Schema |
| `pm.base64Decode(str)` | Decode a Base64 string |

## Related Docs

- [Collection Run in Postmate Client](/data-driven/collection-runner) — Copy-paste examples for common assertions
- [Variable Resolution in Postmate Client](/reference/variable-resolution) — Managing variables across collections
- [Run API Tests from Terminal (CLI Reference)](/ci-cd/cli-reference) — Run collections from the terminal
- [Environments and Variables](/core-concepts/environments) — Understanding test results and JSON reports

## FAQ
### Is Postmate Client pm object similar to Postman pm?
Yes. Postmate Client provides a similar `pm` scripting API to Postman, allowing you to write tests, assertions, and scripts for API testing workflows.
### Can I use pm.test and pm.expect in Postmate Client?
Yes. Postmate Client supports `pm.test`, `pm.expect`, and other assertion methods for writing automated API tests.
### Does Postmate Client support pre-request and post-request scripts?
Yes. The `pm` object is available globally in both pre-request and post-request scripts.
### Can I use environment variables in scripts?
Yes. You can use `pm.setVariable`, `pm.getVariable`, and `pm.clearVariable` to manage environment variables.
### What is pm.test used for?
`pm.test` is used to define automated API tests in Postmate Client. It allows you to validate response status, body, headers, and performance.

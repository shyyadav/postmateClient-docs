# pm Library Reference

Postmate exposes a global `pm` object in all pre/post-request scripts. It provides assertion, variable management, logging, and utility methods.

## Full API

### `pm.test(name, fn)`

Register a named test. The callback `fn` should throw if the assertion fails (use `pm.expect` inside).

```js
pm.test('Status is 200', () => {
  pm.expect(RESPONSE.status).to.equal(200);
});
```

### `pm.expect(value)`

Chai-based assertion chain. Returns an assertion object you chain with `.to.equal()`, `.to.include()`, `.to.be.above()`, etc.

```js
pm.expect(RESPONSE.status).to.equal(201);
pm.expect(RESPONSE.body.name).to.include('Alice');
pm.expect(RESPONSE.responseTime).to.be.below(300);
pm.expect(RESPONSE.body.items).to.have.length(5);
```

### `pm.assert(condition, message?)`

Simple boolean assertion. Throws with an optional message if `condition` is falsy.

```js
pm.assert(RESPONSE.status === 200, 'Expected status 200');
pm.assert(RESPONSE.body.token !== undefined, 'Token must be present');
```

### `pm.setVariable(key, value)`

Set a variable in the active environment. Use this to capture values from responses.

```js
pm.setVariable('authToken', RESPONSE.body.token);
pm.setVariable('userId',    RESPONSE.body.user.id);
```

### `pm.getVariable(key)`

Read a variable from the active environment.

```js
const token = pm.getVariable('authToken');
```

### `pm.clearVariable(key)`

Remove a variable from the active environment.

```js
pm.clearVariable('tempToken');
```

### `pm.listVariables()`

Returns an array of all variable keys in the active environment. Useful for debugging.

```js
const keys = pm.listVariables();
pm.log('Variables: ' + keys.join(', '));
```

### `pm.getRequest()`

Returns the current request object, including URL, method, headers, and body.

```js
const req = pm.getRequest();
pm.log('Sending ' + req.method + ' to ' + req.url);
```

### `pm.log(message)`

Writes a message to the Postmate output console.

```js
pm.log('Auth token: ' + pm.getVariable('authToken'));
```

### `pm.schemaTest(name, schema, data)`

Validates `data` against a JSON Schema object. Uses the same test result reporting as `pm.test`.

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

### `pm.base64Decode(encoded)`

Decodes a Base64-encoded string. Useful for inspecting JWT payloads.

```js
const payload = pm.base64Decode(accessToken.split('.')[1]);
pm.log(payload);
```

## Quick Reference

| Method | Purpose |
|---|---|
| `pm.test(name, fn)` | Register a named test |
| `pm.expect(value)` | Chai assertion chain |
| `pm.assert(cond, msg?)` | Boolean assertion |
| `pm.setVariable(k, v)` | Write a variable |
| `pm.getVariable(k)` | Read a variable |
| `pm.clearVariable(k)` | Delete a variable |
| `pm.listVariables()` | List all variable keys |
| `pm.getRequest()` | Get the current request |
| `pm.log(msg)` | Print to output console |
| `pm.schemaTest(n, s, d)` | JSON Schema validation |
| `pm.base64Decode(str)` | Decode Base64 string |

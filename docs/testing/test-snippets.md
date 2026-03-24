# Test Snippets

Copy-paste-ready scripts for the most common testing patterns.

## Status Code

```js
pm.test('Status is 200 OK', () => {
  pm.expect(RESPONSE.status).to.equal(200);
});

pm.test('Status is 201 Created', () => {
  pm.expect(RESPONSE.status).to.equal(201);
});

pm.test('Status is in 2xx range', () => {
  pm.expect(RESPONSE.status).to.be.within(200, 299);
});
```

## Response Body

```js
// Field equals a value
pm.test('Name is Alice', () => {
  pm.expect(RESPONSE.body.name).to.equal('Alice');
});

// Field is not null/undefined
pm.test('ID is present', () => {
  pm.expect(RESPONSE.body.id).to.exist;
});

// Array has items
pm.test('Results are not empty', () => {
  pm.expect(RESPONSE.body.results).to.have.length.above(0);
});

// String contains substring
pm.test('Message mentions success', () => {
  pm.expect(RESPONSE.body.message).to.include('success');
});
```

## Response Time

```js
pm.test('Response is fast', () => {
  pm.expect(RESPONSE.responseTime).to.be.below(500);
});
```

## Headers

```js
pm.test('Content-Type is JSON', () => {
  pm.expect(RESPONSE.headers['content-type']).to.include('application/json');
});
```

## Capture & Chain

```js
// Capture a token for use in subsequent requests
pm.setVariable('authToken', RESPONSE.body.token);

// Capture a created resource ID
pm.setVariable('createdId', RESPONSE.body.id);
```

## Schema Validation

```js
const schema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id:    { type: 'number' },
    name:  { type: 'string' },
    email: { type: 'string' }
  }
};

pm.schemaTest('Response matches schema', schema, RESPONSE.body);
```

## Conditional Logic

```js
if (RESPONSE.status === 200) {
  pm.setVariable('authToken', RESPONSE.body.token);
  pm.log('Token captured successfully');
} else {
  pm.log('Login failed with status: ' + RESPONSE.status);
}
```

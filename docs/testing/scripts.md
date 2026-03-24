# Pre/Post Scripts

Run JavaScript before or after every request to set up state, extract values, and validate responses.

## Pre-request Scripts

A pre-request script runs **before** the request is sent. Use it to:

- Generate dynamic values (timestamps, UUIDs, signatures)
- Set variables based on other variables
- Conditionally modify request data

```js
// Generate a timestamp for the request
pm.setVariable('timestamp', Date.now().toString());

// Build a composite value
const base = pm.getVariable('baseUrl');
pm.log('Sending request to: ' + base);
```

## Post-request Scripts

A post-request script runs **after** the response is received. Use it to:

- Extract values from the response and store them as variables
- Assert conditions with `pm.test` and `pm.expect`
- Log response data for debugging

```js
// Capture a token from a login response
pm.setVariable('authToken', RESPONSE.body.token);
pm.setVariable('userId', RESPONSE.body.user.id);

// Validate status
pm.test('Login succeeded', () => {
  pm.expect(RESPONSE.status).to.equal(200);
});

// Log for debugging
pm.log('Logged in as user: ' + RESPONSE.body.user.email);
```

## Working with Response Body

The `RESPONSE.body` object is fully parsed — access nested fields with standard dot or bracket notation:

```js
// Dot notation
const name  = RESPONSE.body.user.name;
const items = RESPONSE.body.data.items;

// Array access
const first = RESPONSE.body.results[0].id;

// Store multiple values
RESPONSE.body.tags.forEach((tag, i) => {
  pm.setVariable('tag_' + i, tag);
});
```

## Script Execution Order

When running a collection:

```
Pre-request Script (Request 1)
  → Send Request 1
    → Post-request Script (Request 1)
      → Tests (Request 1)

Pre-request Script (Request 2)
  → Send Request 2
    → Post-request Script (Request 2)
      → Tests (Request 2)
```

Variables set in a post-request script are available to all subsequent requests in the same run.

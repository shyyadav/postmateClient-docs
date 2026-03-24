# Tests & Assertions

Validate API responses with plain-English tabular tests or JavaScript-based assertions — no configuration required.

## Tabular Tests (Plain English)

Go to the **Tests** tab and click the **Test** sub-tab. Each row in the table is one test. Rows have five columns:

| Column | Description |
|---|---|
| **Test Type** | What kind of assertion to run |
| **Action** | The comparison operator (equals, contains, etc.) |
| **Expected** | The expected value |
| **Test Description** | A human-readable label shown in results |
| _(delete)_ | Remove the row |

### Test Types

**Status Check** — verify the HTTP status code:

| Test Type | Action | Expected |
|---|---|---|
| Status Code | equals | 200 |

**Body Field** — check a JSON path in the response body:

| Test Type | Action | Expected |
|---|---|---|
| Body › user.role | equals | admin |

**Set Env Variable** — extract a value from the response and store it:

| Test Type | Action | Expected |
|---|---|---|
| Set Env Variable | body › token | authToken |

::: tip
Run your request once before writing tests. Postmate suggests JSON paths from the actual response, so you can pick the right field from a dropdown.
:::

## Script-Based Assertions

For advanced checks, write assertions in JavaScript in the **Post-request Script**:

```js
// Status assertion
pm.test('Status is 200', () => {
  pm.expect(RESPONSE.status).to.equal(200);
});

// Body field check
pm.test('User has admin role', () => {
  pm.expect(RESPONSE.body.user.role).to.equal('admin');
});

// Response time check
pm.test('Response under 500ms', () => {
  pm.expect(RESPONSE.responseTime).to.be.below(500);
});
```

## Schema Validation

Validate the entire response body against a JSON Schema:

```js
const userSchema = {
  type: 'object',
  required: ['id', 'name', 'email'],
  properties: {
    id:    { type: 'number' },
    name:  { type: 'string' },
    email: { type: 'string', format: 'email' }
  }
};

pm.schemaTest('Response matches user schema', userSchema, RESPONSE.body);
```

## Viewing Test Results

After sending a request, switch to the **Test Results** tab. Each test shows:
- ✅ Pass / ❌ Fail status
- The test description
- The actual vs expected values on failure

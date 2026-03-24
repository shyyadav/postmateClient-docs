# Request Chaining

Automatically pass data from one API response into the next request — build end-to-end workflows without copy-paste.

## How It Works

1. Send **Request 1** — it returns data you need (e.g. an auth token or a created resource ID).
2. In **Request 1's post-request script**, extract the value and store it with `pm.setVariable()`.
3. In **Request 2**, reference that variable with `{{variableName}}` in the URL, headers, or body.

When the Collection Runner executes these requests in sequence, values flow automatically.

## Example: Login → Get Profile

**Request 1: `POST /auth/login` — Post-request Script**

```js
pm.setVariable('authToken', RESPONSE.body.token);
pm.setVariable('userId',    RESPONSE.body.user.id);
```

**Request 2: `GET /users/{{userId}}`**

```
GET {{baseUrl}}/users/{{userId}}
Authorization: Bearer {{authToken}}
```

The token and user ID captured in Request 1 are automatically available in Request 2.

## Example: Create → Read → Delete

This three-request pattern tests the full lifecycle of a resource:

**Request 1: `POST /items` — Post-request Script**

```js
pm.test('Item created', () => {
  pm.expect(RESPONSE.status).to.equal(201);
});
pm.setVariable('itemId', RESPONSE.body.id);
```

**Request 2: `GET /items/{{itemId}}`**

```
GET {{baseUrl}}/items/{{itemId}}
Authorization: Bearer {{authToken}}
```

**Request 3: `DELETE /items/{{itemId}}`**

```
DELETE {{baseUrl}}/items/{{itemId}}
Authorization: Bearer {{authToken}}
```

## Tips

- Variables set in a post-request script persist for all subsequent requests **in the same run**.
- Use `pm.log()` to trace captured values while building the chain.
- Combine chaining with [Data Tables](/data-driven/data-tables) to run end-to-end flows across multiple test users or input sets.

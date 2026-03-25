# Building Requests
By now you alredy know how to send your first request in Postmate Client.
Construct HTTP requests with full control over method, URL, headers, body, and auth.

## HTTP Methods

Postmate Client supports all standard HTTP methods:

`GET` `POST` `PUT` `PATCH` `DELETE` `HEAD` `OPTIONS`

## Request URL

Enter your endpoint URL directly, or use `{{variables}}` anywhere in the URL to reference environment variables:

```
{{baseUrl}}/api/v1/users/{{userId}}
```

## Request Body

### JSON

```json
{
  "name": "{{userName}}",
  "email": "{{email}}",
  "role": "admin"
}
```

### Form Data

```
name={{userName}}
email={{email}}
role=admin
```

### Raw

Enter any raw text body. Set the `Content-Type` header accordingly.

## The RESPONSE Object

After a request is sent, Postmate exposes these response properties in pre/post-request scripts:

| Property | Type | Description |
|---|---|---|
| `RESPONSE.status` | `number` | The HTTP status code (e.g. `200`, `404`) |
| `RESPONSE.body` | `object` | The parsed response body — access fields with dot notation |
| `RESPONSE.headers` | `object` | All response headers as key-value pairs |
| `RESPONSE.responseTime` | `number` | Round-trip time in milliseconds |

### Example

```js
// Access response body fields
const userId = RESPONSE.body.user.id;
const token  = RESPONSE.body.token;

// Check status
if (RESPONSE.status === 200) {
  pm.setVariable('authToken', token);
}

// Log response time
pm.log('Response took: ' + RESPONSE.responseTime + 'ms');
```

## Authentication

Add authentication headers directly in the **Headers** tab:

```
Authorization: Bearer {{authToken}}
```

Or set `authToken` from a login response using a post-request script. See [Request Chaining](/data-driven/request-chaining) for the full workflow.

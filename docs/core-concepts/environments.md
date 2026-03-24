# Environments & Variables

Switch between dev, staging, and production effortlessly using named environments and dynamic variables.

## What is an Environment?

An environment is a named set of key-value pairs. For example:

| Variable | Development | Production |
|---|---|---|
| `baseUrl` | `http://localhost:3000` | `https://api.myapp.com` |
| `apiKey` | `dev-key-abc` | `prod-key-xyz` |

Switch environments from the environment selector at the top of Postmate Client. Every request immediately uses the new values.

## Variable Syntax

Reference any variable with double curly braces `{{variableName}}` — anywhere in your request:

```
# In URL
{{baseUrl}}/api/users/{{userId}}

# In Headers
Authorization: Bearer {{authToken}}

# In Body
{ "tenantId": "{{tenantId}}" }
```

## Managing Variables via the pm API

Use scripts to set, read, and clear variables at runtime:

```js
// Set a variable from the response (e.g., capture a token after login)
pm.setVariable('authToken', RESPONSE.body.token);

// Read a variable
const token = pm.getVariable('authToken');

// List all variables in the active environment
pm.listVariables();

// Remove a variable
pm.clearVariable('tempToken');
```

::: warning
Variables set via `pm.setVariable()` are scoped to the **active environment**. Switching environments will use that environment's variable set.
:::

## Resolution Order

When Postmate resolves `{{variableName}}`, it looks up values in this order:

1. **Runtime variables** — set by `pm.setVariable()` during the current run
2. **Active environment** — the selected environment's key-value pairs
3. **Unresolved** — the literal `{{variableName}}` string is sent as-is

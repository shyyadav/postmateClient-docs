# Variable Resolution in Postmate Client

Understand how Postmate resolves <span v-pre>`{{variableName}}`</span> at send time.

## Resolution Order

When a request is sent, Postmate resolves variables in this priority order:

1. **Runtime variables** — set by `pm.setVariable()` during the current run (highest priority)
2. **Active environment** — key-value pairs in the currently selected environment
3. **Unresolved** — if no match is found, the literal <span v-pre>`{{variableName}}`</span> string is sent as-is

## Variable Syntax

```
{{variableName}}
```

Variables are case-sensitive. <span v-pre>`{{authToken}}`</span> and <span v-pre>`{{AuthToken}}`</span> are different variables.

Use them anywhere in a request:

```
# URL
{{baseUrl}}/api/v1/users/{{userId}}

# Header value
Authorization: Bearer {{authToken}}

# Header name (rare but supported)
{{customHeaderName}}: {{customHeaderValue}}

# Body (JSON)
{ "tenantId": "{{tenantId}}", "name": "{{userName}}" }

# Body (Form)
email={{email}}&password={{password}}
```

## Nested Variable References

Variables can reference other variables in their values:

```
# Environment variable: endpoint = /api/v1/users
# Environment variable: baseUrl  = https://api.myapp.com
# Result: https://api.myapp.com/api/v1/users
{{baseUrl}}{{endpoint}}
```

## Debugging Unresolved Variables

If a variable isn't resolving as expected:

1. **Check the active environment** — confirm the variable name exists in the selected environment.
2. **Check spelling and case** — <span v-pre>`{{AuthToken}}` ≠ `{{authToken}}`</span>.
3. **Check script execution order** — if set in a pre-request script, ensure the script runs before the URL is resolved.
4. **Use `pm.log()`** — add `pm.log(pm.getVariable('varName'))` to your pre-request script to inspect the value.
5. **Enable "Log as cURL"** in settings — the logged cURL command shows the fully resolved request with all variable values substituted.
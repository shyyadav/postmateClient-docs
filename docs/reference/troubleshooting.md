# Troubleshooting

Solutions for common issues with Postmate Client.

## Postmate icon not visible in Activity Bar

**Cause:** The extension may not be installed, or the activity bar icon may be hidden.

**Fix:**
1. Open the Extensions panel (`Ctrl+Shift+X`) and confirm **Postmate Client** is listed and enabled.
2. Right-click the Activity Bar and ensure **Postmate Client** is checked in the list of visible items.
3. If recently installed, try reloading VS Code: `Ctrl+Shift+P` → **Reload Window**.

## Network error / request fails immediately

**Cause:** The target server is unreachable, or a proxy/firewall is blocking the request.

**Fix:**
1. Test the URL in a browser to confirm the server is reachable.
2. Check if your corporate network requires a proxy — configure it in VS Code settings under `http.proxy`.
3. For `localhost` targets, ensure the local server is running.
4. For HTTPS targets, verify the certificate is valid.

## Variables not resolving — `{{variableName}}` sent literally

**Cause:** No active environment is selected, the variable name is misspelled, or the variable hasn't been set yet.

**Fix:**
1. Confirm an environment is selected in the environment selector.
2. Check variable name spelling and case (`{{authToken}}` ≠ `{{AuthToken}}`).
3. If the variable is set by a pre-request script, ensure the script runs before the request.
4. Use `pm.log(pm.getVariable('varName'))` in a script to inspect the value.

See [Variable Resolution](/reference/variable-resolution) for the full resolution order.

## Tests not running / showing no results

**Cause:** Scripts may have a syntax error that prevents execution.

**Fix:**
1. Open the **Console** tab after sending — any script errors are logged there.
2. Check for missing parentheses, unclosed strings, or typos in your `pm.test()` calls.
3. Confirm you're editing the **Post-request Script** tab, not the Pre-request tab.

## Log as cURL setting

Enable **Log as cURL** in settings to log every outgoing request as a cURL command in the output console. This is the fastest way to inspect the fully-resolved request (with all variables substituted) and reproduce it outside Postmate.

To enable: Open VS Code Settings → search **Postmate** → enable **Log as cURL**.

## Collection Runner stops mid-run

**Cause:** A request timed out, or `--bail` mode is enabled (CLI only).

**Fix:**
1. Check the **Run Results** panel — the failing request is highlighted.
2. Increase the timeout in Postmate settings, or add a `--timeout` flag in CLI runs.
3. For network issues, see the **Network error** section above.

## Still stuck?

[Open an issue on GitHub ↗](https://github.com/shyyadav/postmate-docs/issues) — include the error message, the request that fails, and your VS Code version.

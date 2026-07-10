---
title: "Extension Settings Reference — Postmate Client"
description: "Complete reference for Postmate Client VS Code extension settings — clear output before request, log as cURL, save on send, sort requests alphabetically, and workspace project directory."
keywords: ["postmate client settings", "postmate vs code settings", "clear output before request", "log as curl", "api client vs code configuration"]
---

# Extension Settings

Postmate Client can be customized through standard VS Code settings. All settings live under the **PostMate** section.

## How to Open Settings

1. Open the Command Palette (`Ctrl+,` / `Cmd+,` also works directly)
2. Go to **Settings → Extensions → PostMate**
3. Or search for `postmate` in the settings search bar

Settings can be configured at the **User** level (applies everywhere) or the **Workspace** level (applies to the current project only), just like any other VS Code setting.

![Postmate Client extension settings in VS Code showing Clear Output Before Request, Log As Curl, Save On Send, Sort Request Alphabetically, and Use Workspace As Project Dir with their default values](/postmate-settings.png)

## Available Settings

### Clear Output Before Request

Clears the Postmate output window automatically before every request, so the output panel shows only the logs for your latest request.

- **Default:** `false` (off)
- **Scope:** Applies to individual HTTP requests only. It does **not** apply to collection runs or WebSocket connections — a collection run keeps its full consolidated log, and WebSocket sessions keep their streaming message history.

::: tip Manual alternative
You can always right-click inside the output panel and select **Clear** to wipe it manually, regardless of this setting.
:::

### Log As Curl

Logs each outgoing request to the output window as a ready-to-run cURL command instead of plain text. Useful for sharing a reproducible request with teammates or replaying it from a terminal.

- **Default:** `true` (on)

### Save On Send

Automatically saves the request when you click **Send**, so you never lose changes to the URL, headers, body, or scripts.

- **Default:** `true` (on)

### Sort Request Alphabetically

Sorts requests alphabetically inside each collection or folder, instead of showing them in creation order.

- **Default:** `false` (off)

### Use Workspace As Project Dir

Stores Postmate data (collections, environments, data tables) in the current workspace folder instead of the default VS Code `globalStorage` location. Enable this when you want your API collections versioned alongside your project in Git.

- **Default:** `false` (off)

::: warning Heads-up
Changing this setting switches where Postmate reads and writes its data. Existing collections in the other location are not moved automatically.
:::

## Quick Reference

| Setting | Default | What it does |
|---|---|---|
| Clear Output Before Request | `false` | Clear the output window before each HTTP request |
| Log As Curl | `true` | Log outgoing requests as cURL commands |
| Save On Send | `true` | Save the request when Send is clicked |
| Sort Request Alphabetically | `false` | Alphabetical ordering inside collections/folders |
| Use Workspace As Project Dir | `false` | Store data in the workspace folder instead of globalStorage |

## Related

- [Building Requests](/core-concepts/building-requests)
- [Collection Runner](/data-driven/collection-runner)
- [pm Library Reference](/testing/pm-library)
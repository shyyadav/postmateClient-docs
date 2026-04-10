---
title: "Migrate from Postman to Postmate Client (PMC) — Step-by-Step Import Guide"
description: "Learn how to migrate your existing Postman collections into Postmate Client (PMC) in seconds. Import your .json collection file directly inside VS Code — no re-building from scratch."
keywords: ["migrate postman to postmate client", "import postman collection VS Code", "postman to PMC migration", "postmate client postman import", "postman collection json import VSCode", "postmate client PMC tutorial"]
canonical: "https://yoursite.com/migrate-from-postman-to-postmate-client"
author: "Your Name"
date: "2026-04-10"
---

# Migrate from Postman to Postmate Client (PMC) — Complete Import Guide

Already have a **Postman** collection? **Postmate Client (PMC)** lets you import it directly inside VS Code — **no rebuilding from scratch, no copy-pasting requests**. Your entire collection, folder structure, and requests are ready in seconds.

This guide walks you through the full migration: from exporting your Postman collection to having it live inside PMC.

## What Is Postmate Client (PMC)?

**Postmate Client** — commonly referred to as **PMC** — is a VS Code extension for testing REST APIs directly inside your editor. If you're already using Postman, PMC is the natural next step: same workflow, same collection format, but without leaving your code.

## Prerequisites

- [Postmate Client (PMC)](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate) installed in VS Code
- Your Postman collection exported as a `.json` file (Collection v2.1 format)

## Step 1: Export Your Collection from Postman

Before importing into PMC, you need to export your collection from Postman:

1. In Postman, **right-click** your collection in the sidebar.
2. Select **Export**.
3. Choose **Collection v2.1** format.
4. Save the `.json` file somewhere accessible on your machine.

> **Tip:** Export your Postman environments separately too — PMC supports importing environment variables independently.

---

## Step 2: Open "From Postman OR postmate..." in PMC

In the **Postmate Client sidebar**, click the **dropdown arrow (▾)** on the right side of the **New Request** split button.

Select **"From Postman OR postmate..."** from the menu.

![Postmate Client sidebar showing the New Request dropdown with From Postman OR postmate option highlighted](/public/postman-import-menu.png)
*The New Request dropdown in Postmate Client — select "From Postman OR postmate..." to begin migration.*

> **All options in the split button:**
> - From cURL...
> - From Swagger...
> - **From Postman OR postmate...** ← Select this

---

## Step 3: Select the Collection Type

![Postmate Client collection type selector showing Postmate and Postman options with Postman highlighted](/public/postman-import-select-type.png)

*Select "Postman" as the collection type — PMC supports both its own native format and Postman's.*

> **Available types:**
> - Postmate (native PMC format)
> - **Postman** ← select this for Postman `.json` collections

---

## Step 4: Select Your Postman Collection File

A **Windows file selector** will open. Navigate to the `.json` file you exported from Postman and click **Import Postman Collection**.

PMC will immediately parse the file and import everything:

✅ All **requests** (with method, URL, headers, body)  
✅ All **folders** and collection hierarchy  
✅ All **pre/post-request scripts** and tests  
✅ Full **collection structure** — exactly as it was in Postman

*Import confirmation — your Postman collection is now live inside PMC.*

Your collection will appear instantly in the **PMC sidebar**, organized exactly as it was in Postman.

---

## Handling Duplicate Collection Names

If a collection with the **same name already exists** in PMC, you'll see a confirmation prompt:

> ⚠️ **Collection "school" already exists. Overwrite?**

![PMC overwrite confirmation dialog asking if the existing collection should be replaced](/public/postman-import-overwrite.png)
*PMC asks before overwriting — click Yes to replace, or No to keep both.*

| Choice | Result |
|---|---|
| **Yes** | Replaces the existing collection with the newly imported one |
| **No** | Cancels the import, leaving the existing collection untouched |

---

## API Differences: Postman → PMC

Most `pm.*` API calls are compatible, but a few Postman methods have direct PMC equivalents you'll want to update in your scripts:

| Postman | PMC Equivalent |
|---|---|
| `pm.environment.set(k, v)` | `pm.setVariable(k, v)` |
| `pm.environment.get(k)` | `pm.getVariable(k)` |
| `pm.environment.unset(k)` | `pm.clearVariable(k)` |
| `pm.variables.get(k)` | `pm.getVariable(k)` |
| `pm.response.to.have.status(n)` | `pm.expect(RESPONSE.status).to.equal(n)` |
| `pm.response.json()` | `RESPONSE.body` |
| `pm.response.code` | `RESPONSE.status` |
| `pm.response.responseTime` | `RESPONSE.responseTime` |
| `pm.response.headers.get(k)` | `RESPONSE.headers[k]` |
| `console.log()` | `pm.log()` |

> **Fast Migration Tip:** Run a global **find-and-replace** on your exported `.json` file before importing — swap `pm.environment.set` → `pm.setVariable`, `pm.environment.get` → `pm.getVariable`, and `console.log` → `pm.log` in one pass.

---

## What Transfers Cleanly

- ✅ Request method, URL, headers, body
- ✅ Collection and folder structure
- ✅ Pre/post-request scripts (with API updates above)
- ✅ Tests using `pm.test()` and `pm.expect()`
- ✅ Environment variables (imported separately)

## What Needs Manual Review

- ⚠️ `pm.environment.*` calls — update to `pm.setVariable` / `pm.getVariable`
- ⚠️ `pm.response.*` calls — update to `RESPONSE.*`
- ⚠️ `console.log()` — update to `pm.log()`

---

## Quick Reference Summary

| Step | What to Do |
|---|---|
| 1 | Export your collection from Postman as **Collection v2.1** `.json` |
| 2 | In PMC, click **New Request ▾** → **From Postman OR postmate...** |
| 3 | Select **Postman** as the collection type |
| 4 | Browse to your `.json` file and confirm the import |
| 5 | If prompted about duplicates, choose **Yes** to overwrite or **No** to keep both |

## Learn more:
- [Collection Runner](/core-concepts/collections)
- [Swagger to PMC in 3 clicks](/import-export/import-swagger)
- [Data Tables](/data-driven/data-tables)
- [Postmate Client Requests](/core-concepts/building-requests)

## Frequently Asked Questions

### Can I import a Postman collection into Postmate Client (PMC) without losing my folder structure?

Yes. PMC preserves the complete collection hierarchy from your Postman export — all folders, sub-folders, and requests appear in the PMC sidebar exactly as they were organized in Postman.

### What Postman collection format should I export for PMC import?

Export as **Collection v2.1** from Postman. This is the most widely supported format and what PMC expects when importing Postman collections.

### What happens if I already have a collection with the same name in PMC?

PMC will detect the conflict and show a confirmation dialog asking if you want to overwrite the existing collection. You can choose **Yes** to replace it or **No** to cancel and keep the original.

### Do I need to update my Postman scripts after importing into PMC?

Scripts using `pm.environment.set()`, `pm.environment.get()`, and `console.log()` need to be updated to their PMC equivalents (`pm.setVariable`, `pm.getVariable`, `pm.log`). The fastest approach is a global find-and-replace in the `.json` file before importing.

### Can I also import Postmate (PMC) collections using the same flow?

Yes. In Step 3, instead of selecting **Postman**, choose **Postmate** to import a native PMC collection file.

### Is Postmate Client (PMC) a free alternative to Postman?

Postmate Client (PMC) is a VS Code extension that brings API testing directly into your editor. Install directly in you vscode [PMC listing on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate).

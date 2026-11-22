---
title: "How to Export a Bruno Collection: Postman, OpenAPI, YAML or ZIP"
description: "Export a Bruno collection in a few clicks (••• → Share → Export) as Postman, OpenAPI, YAML or ZIP, then import it into Postman, Postmate Client or Bruno."
---

# How to Export a Bruno Collection (to Postman and More)

**Quick answer:** in Bruno, hover over the collection, click the **•••** menu → **Share** → **Export**, choose a format, and click **Proceed**. Bruno saves the file to your machine.

| Export format | Use it when |
| --- | --- |
| **Postman Collection** (`.json`) | Moving to Postman, Postmate Client, or any tool that imports the Postman format |
| **OpenAPI Specification** | Sharing an API definition with documentation, mocking or code-generation tools |
| **Bruno Collection (ZIP)** | Backing up the collection, or moving it to another machine running Bruno. Bruno marks this one as *Recommended* |
| **Single File (YAML)** | Keeping the whole collection in one file, for example in Git |

The exact list depends on your Bruno version. The steps below show the Postman export, which most people need, and then how to import the file into **Postman** or **Postmate Client**. Going the other way? See [Import a Postman collection into Bruno](#import-a-postman-collection-into-bruno).

> *Tested with Bruno v4.2.0 on Windows, November 2026.*

::: tip Moving to Postmate Client? You can skip the export
Postmate Client 2.8.2 and later imports a Bruno collection folder directly: requests, folders, auth, scripts and environments, with no Postman file in between. See [Option B](#option-b-import-the-bruno-folder-directly-into-postmate-client).
:::

## Step 1: Export your collection from Bruno

1. Open your collection in **Bruno**.
2. Hover over the collection, click its **•••** menu, and select **Share**.
3. In the Share Collection panel, open the **Export** tab and choose **Postman**. The panel opens on the **Git** tab, so switch to **Export** first.

   ![Bruno collection ••• menu with Share selected, and the Share Collection dialog's Export tab showing Bruno Collection (ZIP), Single File (YAML), Postman and OpenAPI formats](/bruno-share-export-formats.png)
   *The collection's ••• menu → Share, then the Export tab. Pick Postman under "Other formats".*

4. Click **Proceed**. If the collection has gRPC requests, Bruno shows a note that they won't be exported to the Postman format.

   ![Bruno Share Collection dialog with Postman selected and a note: gRPC requests in this collection will not be exported](/bruno-export-postman-grpc-note.png)
   *With Postman selected, Bruno warns that gRPC requests are left out.*

5. In the **Export to Postman** dialog, enter a **Name** for the file, pick a **Location** (or click **Browse**), and click **Export**. Bruno saves a `.json` file there.

There's no separate "Bruno to Postman converter" to install. Bruno's own Postman export produces a standard Postman Collection file that Postman, Postmate Client and most other API clients can read.

Now pick your destination.

## Option A: Import into Postman

1. Open **Postman** and click **Import** (top-left, next to the workspace selector).
2. Drag the exported `.json` file into the import dialog, or click **files** to browse to it.
3. Postman detects the Postman Collection format automatically. Confirm and click **Import**.

Your collection appears in the sidebar with its folder structure intact.

## Option B: Import the Bruno folder directly into Postmate Client

No export needed. Postmate Client 2.8.2 and later reads the collection folder Bruno saves on your disk.

1. In the **Postmate Client sidebar**, click the **hamburger menu (☰)** next to the collection search bar and select **Import Collection**.
2. From the **"Select collection type"** dropdown, choose **Bruno**.
3. Pick your Bruno collection folder: the one that contains `opencollection.yml`. If you pick the folder above it, Postmate finds the collection inside, or lets you choose when there are several.
4. If the collection uses variables that none of its environments define, Postmate asks where to put them, the same as in a Postman import.

Postmate imports the collection and its environments, then shows one summary notification listing anything that couldn't come across.

**What the direct import brings over**

- ✅ Requests, folders and Markdown docs
- ✅ Headers and auth set on a folder or the collection. Postmate applies them to each request, so inherited auth keeps working
- ✅ `bru.runRequest("Login")` becomes a Postmate pre-request, so a request that logs in first still does
- ✅ Common script calls are translated: `res.getBody()` → `RESPONSE.body`, `bru.setVar()` → `pm.setVariable()`, `test()` / `expect()` → `pm.test()` / `pm.expect()`
- ✅ Environments, including ones that extend another environment. New variables are added; values you already have in Postmate are never overwritten
- ⚠️ Secret variables come across with an empty value. Bruno keeps secret values outside the collection, and Postmate doesn't read them, so fill them in the **Env** tab
- ⚠️ Collection- and folder-level scripts, gRPC and WebSocket requests, digest/NTLM auth and file fields in multipart bodies are left out and listed in the summary

**Older `.bru` collections:** the direct import supports Bruno's YAML format (OpenCollection), which has `opencollection.yml` in the collection folder. If your collection has `bruno.json` and `.bru` files instead, Postmate tells you so. Use [Option C](#option-c-import-the-postman-export-into-postmate-client) for those.

## Option C: Import the Postman export into Postmate Client

Use this for collections in Bruno's older `.bru` format, or if you already have the Postman export from Step 1.

1. In the **Postmate Client sidebar**, click the **hamburger menu (☰)** next to the collection search bar.

   ![Postmate Client collections panel hamburger menu showing Import Collection option](/postman-import-menu.png)
   *Click the hamburger icon above your collections list to open the import menu.*

2. Select **Import Collection**.
3. From the **"Select collection type"** dropdown, choose **Postman**.

   ![Postmate Client collection type selector showing Postmate and Postman options](/postman-import-select-type.png)
   *Choose "Postman", since that's the format you exported from Bruno.*

4. Browse to the exported `.json` file.
5. If the collection uses variables (such as a base URL or a token), Postmate lists them and asks where to put them. Keep the ones you need checked, click **OK**, then pick an existing environment or create a new one. Press **Esc** to skip.

   ![Postmate Client prompt: "School" uses 2 variables, with schoolBaseUrl and token checked and the note "no value in export, you'll need to fill this in"](/postmate-import-variables-prompt.png)
   *Postmate shows every variable the collection declares. The export carries no values, so fill them in afterwards in the Env tab.*

6. Click **Import Postman Collection**.

Your Bruno collection now appears in the Postmate Client sidebar, with folders and requests ready to use. Open the **Env** tab and fill in the variable values (for example `schoolBaseUrl`) before you send your first request.

## What transfers cleanly

Whichever client you import into:

- ✅ URLs, methods, headers and bodies
- ✅ Folder structure
- ✅ Environment variables used in requests
- ✅ Pre-request and post-response scripts: Bruno translates common `bru.*` calls into `pm.*`, and Postmate Client converts them into its own [`pm` library](/testing/pm-library). Run the collection once to confirm.

## What to double-check after import

- ⚠️ **Assertions from Bruno's Assert tab are not exported.** The Postman export leaves out Bruno's native assertions (such as `res.status eq 200`), so recreate them after import. In Postmate Client you can add them without code as [assertions](/testing/tests-assertions), or as `pm.test` scripts. Tests written as scripts in Bruno's **Tests** tab do come across with the other scripts.
- ⚠️ **gRPC requests are not exported.** Bruno leaves gRPC requests out of the Postman export and says so in the export dialog. Recreate them in the destination client: Postmate Client supports [gRPC requests](/core-concepts/grpc) with server reflection or a `.proto` file. If the collection has WebSocket requests, check that they came across too.

## Import a Postman collection into Bruno

Moving in the other direction is just as direct.

**Collection**

1. In Postman, open the collection's **•••** menu, choose **Export**, pick **Collection v2.1**, and save the `.json` file.
2. In Bruno, click **+** in the top-left sidebar and choose **Import Collection**.
3. Select the exported file, choose where Bruno should save the collection, and click **Import**.

By default, Bruno translates common Postman script calls (such as `pm.test` and `pm.environment`) into Bruno equivalents. To keep scripts as `pm.*` code instead, open **Options → Show Advanced Options** in the import dialog and turn on **Preserve scripts** before you click **Import**.

**Environment**

1. In Postman, click **•••** next to the environment in the **Environments** sidebar, choose **Export**, and save the `.json` file.
2. In Bruno, click the **Environments** icon (top-right) → **Configure environments** → **Import environment**.
3. Select the file. If an environment with the same name exists, choose **Replace**, **New** or **Skip**.

If you're leaving Postman because of the login requirement or cloud sync, Bruno isn't the only local-first option. See [migrating from Postman to Postmate Client](/import-export/migrate-from-postman) for a VS Code-native alternative.

## Quick reference

| Step | What to do |
| --- | --- |
| 1 | In Bruno, collection **•••** menu → **Share** → **Export** → choose a format |
| 2 | Click **Proceed** and save the file |
| 3a | **To Postman:** **Import** → drag the `.json` file → **Import** |
| 3b | **To Postmate Client (no export):** **☰** → **Import Collection** → choose **Bruno** → select the collection folder |
| 3c | **To Postmate Client (`.bru` collections):** **☰** → **Import Collection** → choose **Postman** → select the exported `.json` file |
| 4 | Run the collection once and review scripts and assertions |
| ↩ | **Postman → Bruno:** export from Postman as Collection v2.1, then in Bruno **+** → **Import Collection** |

You can also [import from Swagger/OpenAPI](/import-export/import-swagger) if you exported an OpenAPI file.

## If you're evaluating where to land

Plenty of people export from Bruno before deciding on a destination. A quick, honest comparison:

**Bruno** is genuinely good at local-first, Git-friendly API testing. If it's working for you, the main reasons people leave are wanting richer test data handling or a client that lives inside the editor.

**Postman** has the largest ecosystem and the best team collaboration features. The tradeoffs are a required account, cloud sync by default, and a heavier app.

**Postmate Client** runs inside VS Code with no login and no telemetry. Collections are plain JSON files that live in your repo, so team sharing happens through Git: branches, pull requests, review and full history, using the workflow your team already has. Need to hand off a complete setup instead? One-click project export bundles collections, environments and data tables into a single file that imports on the other end with zero configuration. You also get [data-driven testing from CSV](/data-driven/data-tables), [response comparison](/testing/compare-api-response) across environments, and [CI/CD via the `pmc` CLI](/ci-cd/cli-reference), which also generates standalone HTML reports that anyone can open in a browser.

The tradeoffs, plainly: there's no cloud workspace layer, so no live sync between teammates and no in-app comments on requests. It's also newer than both Bruno and Postman, so the community is smaller and there are fewer third-party guides when you hit an edge case. And it runs as a VS Code extension, which ties it to that editor.

## Frequently asked questions

### How do I export a Bruno collection?

Hover over the collection in Bruno, click the **•••** menu, choose **Share**, then the **Export** tab. Pick a format (Postman, OpenAPI, YAML or ZIP, depending on your Bruno version) and click **Proceed**.

### Which export format should I choose?

Choose **Postman** if you're moving to Postman or Postmate Client. Choose **Bruno Collection (ZIP)** or **YAML** for a backup or to move the collection to another machine running Bruno. Choose **OpenAPI** to share an API definition with documentation or code-generation tools.

### Is there a Bruno to Postman converter?

You don't need one. Bruno has a built-in Postman export: **•••** → **Share** → **Export** → **Postman**. The resulting `.json` file imports directly into Postman.

### How do I import a Postman collection into Bruno?

Export the collection from Postman as **Collection v2.1**, then in Bruno click **+** in the top-left sidebar → **Import Collection** and select the file. Environments are imported separately from **Environments → Configure environments → Import environment**.

### Can Postmate Client import a Bruno collection without exporting it?

Yes, from version 2.8.2. Choose **Bruno** as the collection type and pick the collection folder. It brings over requests, folders, auth, scripts and environments. For collections in the older `.bru` format, export to Postman from Bruno and import that file instead.

### Are gRPC requests included in the Postman export?

No. When you export to the Postman format, Bruno shows a note that gRPC requests in the collection will not be exported. You'll need to recreate them in the client you import into.

### Do Bruno assertions transfer to Postman or Postmate?

Not the ones in Bruno's **Assert** tab. They are left out of the Postman export, so you'll need to recreate them. Tests written as scripts in the **Tests** tab are exported along with your other scripts.

### Will my Bruno scripts work after import?

Mostly, yes. With the direct import, Postmate Client translates common `bru.*` and `res.*` calls itself and turns `bru.runRequest` into a pre-request. With the Postman route, Bruno's export translates `bru.*` calls into `pm.*` and Postmate converts those on import. Either way, run the collection once afterwards; any script call without a Postmate equivalent is listed in the import summary.

## Share your feedback

Exported from Bruno recently? We'd love to hear how it went.

> **[Try Postmate Client now →](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)**
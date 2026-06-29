---
canonical: https://www.postmateclient.com/import-export/migrate-from-bruno
meta-description: Learn how to migrate your Bruno API collections to Postmate Client using Bruno's built-in Postman export — no separate importer needed.
meta-og:description: Learn how to migrate your Bruno API collections to Postmate Client using Bruno's built-in Postman export — no separate importer needed.
meta-og:title: How to Migrate from Bruno to Postmate Client (Step-by-Step Guide)
meta-og:type: website
meta-og:url: https://www.postmateclient.com/import-export/migrate-from-bruno
meta-twitter:card: summary_large_image
meta-twitter:description: Learn how to migrate your Bruno API collections to Postmate Client using Bruno's built-in Postman export.
meta-twitter:title: How to Migrate from Bruno to Postmate Client (Step-by-Step Guide)
title: How to Migrate from Bruno to Postmate Client (Step-by-Step Guide)
---

# How to Migrate from Bruno to Postmate Client (Step-by-Step Guide)

Already using Bruno and want to switch to Postmate Client? You don't need a separate importer — Bruno has a built-in **Export to Postman** option, and Postmate Client already supports importing Postman collections natively. That means migrating from Bruno takes just two short steps.

You can also [import from Swagger/OpenAPI](https://www.postmateclient.com/import-export/import-swagger) or [migrate from Postman](https://www.postmateclient.com/import-export/migrate-from-postman) if either of those fits your situation better.

## Why This Works

Bruno collections are stored in Bruno's own `.bru` format, but Bruno's **Share → Export** menu can convert any collection directly into a Postman Collection JSON file. Since Postmate Client already has full Postman import support, there's no need for a dedicated Bruno parser — you get a clean migration path using tools both apps already provide.

## Prerequisites

- [Bruno](https://www.usebruno.com/) installed, with the collection you want to migrate
- [Postmate Client](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate) extension installed in VS Code

## Step 1: Export Your Collection from Bruno

1. Open your collection in **Bruno**.
2. Click the collection **options (•••)** menu and select **Share**.

   ![Bruno collection options menu with Share option highlighted](/public/bruno-collection-options-share.png)
   *The collection's ••• menu — select "Share" to open the export panel.*

3. In the Share Collection panel, select the **Export** tab → **Postman**.

   ![Bruno Share Collection menu with Export tab open showing Postman export option](/public/bruno-share-export-postman.png)
   *The Bruno "Share Collection" panel — choose Export, then Postman.*

4. Click **Proceed**.
5. Save the exported `.json` file to your machine.

> **Tip:** Bruno's Export panel also offers **Bruno Collection (ZIP)**, **Single File (YAML)**, and **OpenAPI Specification** formats — for migrating to Postmate Client, **Postman** is the one you want.

## Step 2: Import into Postmate Client

1. In the **Postmate Client sidebar**, click the **hamburger menu (☰)** next to the collection search bar.

   ![Postmate Client collections panel hamburger menu showing Import Postman/Postmate option](/public//postman-import-menu.png)
   *Click the hamburger icon above your collections list to open the import menu.*

2. Select **Import Postman/Postmate**.
3. From the **"Select collection type"** dropdown, choose **Postman**.

   ![Postmate Client collection type selector showing Postmate and Postman options](/public//postman-import-select-type.png)
   *Choose "Postman" since that's the format you exported from Bruno.*

4. Browse to the exported `.json` file.
5. Click **Import Postman Collection**.

Your Bruno collection will now appear in the Postmate Client sidebar — fully structured and ready to use.

## What Transfers Cleanly

- ✅ URLs, methods, headers, body
- ✅ Folder structure
- ✅ Environment variables

## What to Double-Check After Import

- ⚠️ **Pre-request / post-response scripts** — Bruno uses its own scripting API (`bru.setVar`, etc.), while Postmate Client uses the [`pm` library](https://www.postmateclient.com/testing/pm-library). Review any imported scripts and adjust syntax where needed.
- ⚠️ **Assertions** — Bruno's native `assert` blocks may not map one-to-one to Postmate Client's [Tests & Assertions](https://www.postmateclient.com/testing/tests-assertions) format. Re-check and re-test after import.

## Quick Reference Summary

| Step | What to Do |
| ---- | ----------- |
| 1 | In Bruno, open collection **•••** menu → **Share** → **Export** → **Postman** |
| 2 | Click **Proceed** and save the `.json` file |
| 3 | In Postmate Client, click the **☰** menu → **Import Postman/Postmate** |
| 4 | Choose **Postman** as the collection type |
| 5 | Browse to the `.json` file and click **Import Postman Collection** |

## Why Switch to Postmate Client?

Postmate Client gives you [Data-Driven Testing](https://www.postmateclient.com/data-driven/data-tables), built-in [CI/CD via the `pmc` CLI](https://www.postmateclient.com/ci-cd/cli-reference), and response comparison — all while staying 100% local with no login required.

## Frequently Asked Questions

### Do I need a special Bruno importer for Postmate Client?

No. Bruno can export collections directly in Postman format, and Postmate Client already supports importing Postman collections — so no dedicated Bruno importer is needed.

### Will my Bruno scripts work after import?

Not automatically. Bruno's scripting API differs from Postmate Client's `pm` library, so pre-request and post-response scripts may need minor manual adjustments after import.

### What export format should I choose in Bruno?

Choose **Postman** under Bruno's Share → Export menu. The other formats (Bruno ZIP, YAML, OpenAPI) are not directly compatible with Postmate Client's import flow.

## Share Your Feedback

Tried migrating from Bruno? We'd love to hear what you think.
> **[Try Postmate Client now →](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)**

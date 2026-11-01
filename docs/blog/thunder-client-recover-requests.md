---
title: "Thunder Client Requests Gone? Recover Them Without Logging In"
description: "Thunder Client 3.0 hides your saved requests until you log in, but they are still on disk. Find the folder and recover or import them, no account needed."
date: 2026-11-01
author: Shyam
head:
  - - link
    - rel: canonical
      href: https://www.postmateclient.com/blog/thunder-client-recover-requests
  - - meta
    - name: keywords
      content: thunder client requests gone, thunder client login required, thunder client data location, recover thunder client collections, import thunder client collections, thunder client alternative
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: "Thunder Client Requests Gone? Recover Them Without Logging In"
  - - meta
    - property: og:description
      content: "Your Thunder Client requests are still on disk as plain JSON. Here is where they are and how to get them back, no account needed."
  - - meta
    - property: og:url
      content: https://www.postmateclient.com/blog/thunder-client-recover-requests
  - - meta
    - property: og:image
      content: https://www.postmateclient.com/thunderCollectionList.png
  - - meta
    - property: article:published_time
      content: 2026-11-01
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Thunder Client Requests Gone? Recover Them Without Logging In"
  - - meta
    - name: twitter:description
      content: "Your Thunder Client requests are still on disk as plain JSON. Here is where they are and how to get them back, no account needed."
  - - meta
    - name: twitter:image
      content: https://www.postmateclient.com/thunderCollectionList.png
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            "headline": "Thunder Client Requests Gone After the Update? How to Get Them Back Without Logging In",
            "description": "Thunder Client 3.0 hides your saved requests until you log in, but they are still on disk. Find the folder and recover or import them, no account needed.",
            "datePublished": "2026-11-01",
            "dateModified": "2026-11-01",
            "author": { "@type": "Person", "name": "Shyam" },
            "publisher": { "@type": "Organization", "name": "Postmate Client", "url": "https://www.postmateclient.com" },
            "mainEntityOfPage": "https://www.postmateclient.com/blog/thunder-client-recover-requests",
            "image": "https://www.postmateclient.com/thunderCollectionList.png"
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Did the Thunder Client update delete my requests?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. The files stay in Thunder's storage folder. The extension just won't show them until you sign in." } },
              { "@type": "Question", "name": "Do I need to export from Thunder Client first?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. Postmate reads the storage folder directly. Exporting is impossible anyway if Thunder won't open your collections without a login." } },
              { "@type": "Question", "name": "Do I need a Postmate account?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. Postmate has no accounts and no cloud sync. Your requests stay on your machine." } },
              { "@type": "Question", "name": "Can I still import an exported Thunder Client file?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. In the import menu, choose Choose an exported file… instead." } },
              { "@type": "Question", "name": "Is it safe to try?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Postmate only reads Thunder's files. Make a backup of the Thunder folder first if you want extra peace of mind." } },
              { "@type": "Question", "name": "What if Postmate doesn't find my data?",
                "acceptedAnswer": { "@type": "Answer", "text": "Check Thunder's storage folder for your operating system. If your files are somewhere else, open an issue on GitHub and tell us where Thunder put them." } }
            ]
          }
        ]
      }
---

# Thunder Client Requests Gone After the Update? How to Get Them Back Without Logging In

Your Thunder Client requests are not deleted. They are still on your disk as plain JSON files, and you can get them back without creating an account.

Thunder Client 3.0 made an account mandatory for the free plan. After the update, the extension stops showing your saved collections until you sign in. To many people it looks like years of requests vanished overnight, and the Marketplace reviews show how that felt.

The good news: Thunder Client stores everything locally. Its own support replies point users to the storage folder. This post shows where that folder is, how to recover the files by hand, and how to import everything into another VS Code client in one click.

## Where Thunder Client keeps your data

Thunder Client saves its data in VS Code's global storage, in a folder named `rangav.vscode-thunder-client`. The exact path depends on your operating system.

| OS | Folder |
| --- | --- |
| Windows | `%APPDATA%\Code\User\globalStorage\rangav.vscode-thunder-client` |
| macOS | `~/Library/Application Support/Code/User/globalStorage/rangav.vscode-thunder-client` |
| Linux | `~/.config/Code/User/globalStorage/rangav.vscode-thunder-client` |
| VS Code Server (remote/WSL) | `~/.vscode-server/data/User/globalStorage/rangav.vscode-thunder-client` |

Using VS Code Insiders, Cursor, Windsurf or VSCodium? Replace `Code` with that editor's folder name, for example `Code - Insiders` or `Cursor`.

Inside the folder you will find:

- `collections/` with one `tc_col_<name>.json` file per collection. Each file holds the collection's folders and every request in it.
- `environment/` with one `tc_env_<name>.json` file per environment, including all its variables.

If you had Thunder's Save to Workspace setting turned on, look for a `thunder-tests` folder in your project as well. It uses the same `collections` and `environments` layout.

## Option 1: Recover the files by hand

The files are plain JSON, so you can read and back them up with nothing but a file manager and a text editor.

1. Close VS Code, so nothing writes to the folder while you work.
2. Open the folder for your OS from the table above. On Windows, paste the path into the File Explorer address bar.
3. Copy the whole `rangav.vscode-thunder-client` folder somewhere safe. This is your backup, whatever you decide next.
4. Open any `tc_col_*.json` file in VS Code. Each request's URL, method, headers and body are right there, so you can copy what you need.

This gets your data back in readable form. It does not give you a working API client again: you still need a tool that can open those requests and send them.

## Option 2: Import Thunder Client collections into Postmate in one click

[Postmate Client](https://www.postmateclient.com) is a free, local-first API client for VS Code. It needs no account, sends nothing to the cloud and stores your requests as plain JSON in your project. Since version 2.5.5 it reads Thunder Client's folder directly, so you don't need to export anything or log in to Thunder first.

1. Install Postmate Client from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate).
2. If you have no Postmate collections yet, Postmate offers the import as soon as it starts: click **Import**. You can also open the Postmate sidebar and choose **Import Collection → Thunder Client**.

   ![Postmate notification offering to import the Thunder Client data it found](/tcDetected.png)

3. Choose **Import from this machine**. Postmate shows the folder where it found your data.
4. Tick the collections and environments you want. All are selected by default.
5. Click **OK**. Your requests appear in the sidebar with their folders, in the same order.

![Postmate picker listing the Thunder Client collections and environments found, with the folder they came from](/thunderCollectionList.png)

A few details that matter if you already use Postmate:

- **Your environments are safe.** If an environment with the same name already exists, Postmate only adds the variables it is missing. It never replaces a value you already have.
- **Your active environment carries over.** Thunder's default environment becomes active in Postmate, unless you have already picked one.
- **Other editors are covered too.** Postmate also finds Thunder data from other editors on the same machine, so you can move from VS Code to Cursor and still bring your requests along.

Thunder's files are only read, never changed or deleted. If you ever want to go back, everything is still where it was.

For every option, including importing an exported Thunder Client file, see the full [Migrate from Thunder Client guide](/import-export/migrate-from-thunder-client).

## What carries over, and what doesn't

Most requests come across complete. A few Thunder-specific features don't, and Postmate lists each one in a summary after the import.

| Comes across | Needs a quick redo |
| --- | --- |
| Collections, nested folders and request order | Thunder tests (re-add them in the Tests tab) |
| URL, method, enabled headers and query params | Pre-request and post-request scripts |
| JSON, form, multipart text fields, XML, text and GraphQL bodies | File fields in multipart bodies (re-attach the files) |
| <span v-pre>`{{variables}}`</span>, including unquoted ones in JSON | Auth types other than Bearer and Basic |
| Bearer and Basic auth | Disabled headers and query params (skipped) |
| Environments and their variables |  |

## FAQ

**Did the Thunder Client update delete my requests?** No. The files stay in Thunder's storage folder. The extension just won't show them until you sign in.

**Do I need to export from Thunder Client first?** No. Postmate reads the storage folder directly. Exporting is impossible anyway if Thunder won't open your collections without a login.

**Do I need a Postmate account?** No. Postmate has no accounts and no cloud sync. Your requests stay on your machine.

**Can I still import an exported Thunder Client file?** Yes. In the import menu, choose **Choose an exported file…** instead.

**Is it safe to try?** Yes. Postmate only reads Thunder's files. Make the backup from Option 1 first if you want extra peace of mind.

**What if Postmate doesn't find my data?** Check the folder from the table above. If your files are somewhere else, [open an issue](https://github.com/shyyadav/postmateClient-docs/issues) and tell us where Thunder put them.

## Your requests, your machine

Whatever you choose, back up the Thunder folder first. Your work is still there, and it should stay yours.

Postmate can’t phone home, because it doesn’t have one. There is no Postmate server, no account and no cloud, only JSON files on your machine.

If you want an API client that never asks you to sign in to see your own requests, give Postmate a try. It's free, it keeps everything on your machine, and moving over takes about a minute. Still comparing tools? See how [Postmate, Postman and Thunder Client handle scripting](/blog/pre-post-request-scripts-vs-code) or browse the [best free Postman alternatives for 2026](/blog/best-free-postman-alternatives-2026).

**[Install Postmate Client from the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate)**

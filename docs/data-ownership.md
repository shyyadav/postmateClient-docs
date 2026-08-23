---
title: Data Ownership
description: Where Postmate Client stores your data, why nothing is locked behind a license check, and what happens to your collections if you stop using the extension.
---

# Data Ownership

If you have used an API client that changed its terms after you had already built your test suite in it, you know the specific feeling: your work is sitting inside somebody else's product, and the terms of access are theirs to set.

This page is about why that cannot happen here — not as a promise, but as a consequence of how the extension works.

## Nothing gates on a license check

Postmate Client has no license server, no activation flow, and no sign-in. There is no code path in which the extension checks a subscription status and then decides whether to open your collections.

This matters more than it first sounds. A tool can store your data locally and still refuse to read it without a valid license — that has only moved the lock, not removed it. Postmate Client has no lock to move.

## Everything is plain JSON on your machine

Your data lives in a `.postmate` folder containing your collections, environments, data tables, headers, certificates config, and run history — all of it plain JSON you can open in any editor.

By default this folder sits in VS Code's `globalStorage` directory:

```
Windows   %APPDATA%\Code\User\globalStorage\.postmate
macOS     ~/Library/Application Support/Code/User/globalStorage/.postmate
Linux     ~/.config/Code/User/globalStorage/.postmate
```

Nothing is encrypted against you, and nothing is in a proprietary binary format. If you wanted to write a script today that reads every request you have ever saved and converts it to some other tool's format, you could — the files are right there and the shape is obvious.

## You can keep collections in your repository instead

Enable **Use Workspace As Project Dir** in the extension settings and Postmate stores the `.postmate` folder in your workspace rather than in `globalStorage`.

That puts your API collections in the same repository as the code they test: versioned, diffable, and reviewable in a pull request alongside the change that altered the endpoint.

Switching is handled for you. Turn the setting on and Postmate detects the existing `.postmate` folder in `globalStorage` and asks whether to move it into the current workspace. Answer yes and your collections, environments, and data tables come with you. Answer no and you start clean in the workspace, with the global copy left untouched.

Full details in the [settings reference](/reference/settings#use-workspace-as-project-dir).

## The CLI is a separate package

`pmc`, the command-line runner, ships independently on npm. Your pipelines invoke it directly against a `.postmate` directory:

```yaml
- run: pmc run smoke-tests staging
  working-directory: .postmate
```

The CLI does not require the editor extension, and it does not check a license either. If the extension stopped being maintained tomorrow, CI pipelines built on `pmc` would keep running against the same files.

## No telemetry

The extension collects no telemetry. Not usage analytics, not activation pings, not error reports.

Your requests go from your machine to your API. Response bodies, headers, tokens, and environment variables never pass through a Postmate server, because there is no Postmate server. This is what makes the extension usable behind corporate firewalls and on restricted networks, and it is the reason the project exists at all.

Since v2.0.0 the extension also runs a local MCP server on `127.0.0.1` so AI agents in
your editor can read your active request panel. It listens; it never initiates an
outbound connection, and there is no Postmate AI vendor behind it. Anything the agent
reads is then handled by that agent's own model provider. Credentials are redacted
first, and the whole thing is disabled with `postmate.mcp.enabled: false`.

[What is captured and redacted →](/ai/mcp)

## On pricing

Being direct about this, because vague answers are how trust gets lost.

**The core API testing experience will remain free.** Sending requests, collections, environments, the collection runner, scripting and assertions, data-driven testing, and the CLI — these are the product, and they stay free.

**The AI agent integration is not a future paywall.** There is nothing to meter: no Postmate API key, no Postmate model, no usage that costs anything to run. The agent is yours, the model is yours, and the server runs on your machine. There is no version of this feature that could be moved behind a subscription, because there is no service behind it.

**If paid functionality is ever introduced,** it would be for team and organization capabilities that do not exist today. It would be additive, not a fence around what already works.

**Your existing collections would never be locked behind it.** No retroactive caps on collections, requests, or environments. Whatever you have built keeps working.

That is a commitment about scope, and it is one that can actually be kept. Postmate Client is built and maintained by one person, and claiming certainty about the next five years would be the less honest answer.

The stronger guarantee is the one above it: your data is plain JSON on your own disk, readable without this tool, and nothing checks a license before opening it. That holds regardless of anyone's intentions, including mine.

## Frequently asked

**Is Postmate Client free?**
Yes. No tiers, no trial period, no account.

**Will I hit a limit on collections, requests, or environments?**
No. There are no counts to hit.

**What happens if the project is abandoned?**
Your collections remain plain JSON on your machine and the CLI remains published on npm. Moving to another tool would be a format conversion, not a data recovery problem.

**Can I keep my collections in Git?**
Yes — enable **Use Workspace As Project Dir** and the `.postmate` folder lives in your workspace. You decide whether to commit it or gitignore it.

**Do you collect analytics?**
The extension sends nothing. The documentation website uses standard web analytics, which is entirely separate from the extension.

**Where do secrets live?**
See [Secret Variables](/security/secret-variables) for how these are handled and what to keep out of version control.

**Will the AI features cost money later?**
There is nothing to charge for. Postmate has no AI vendor and no model endpoint — your
own agent does the work. See [AI test generation](/ai/mcp).

---

If any claim on this page looks overstated or is not matching what you see, [open an issue](https://github.com/shyyadav/postmateClient-docs/issues) or email [help@postmateclient.com](mailto:help@postmateclient.com). Being wrong in public about this would be worse than being vague.
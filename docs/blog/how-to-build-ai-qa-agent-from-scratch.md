---
title: "How to Build an AI QA Agent from Scratch: Regression Testing from Your API Docs"
description: "Write your API test plan in plain English in your collection docs and let a Copilot agent run a full regression with Postmate. One prompt, a GO/NO-GO report."
date: 2026-11-14
author: Shyam Yadav
head:
  - - meta
    - name: keywords
      content: how to build an ai qa agent, how to create a qa ai agent from scratch, ai qa agent, spec-driven testing, api regression testing, natural language test plan, ai agent api testing, postmate mcp, github copilot agent api testing
  - - meta
    - property: og:image
      content: https://www.postmateclient.com/ai-qa-agent-from-scratch-og.png
  - - meta
    - name: twitter:image
      content: https://www.postmateclient.com/ai-qa-agent-from-scratch-og.png
---
# How to Build an AI QA Agent from Scratch: Regression Testing from Your API Docs

You can build an AI QA agent without writing a single test script. Write your test plan in plain English inside your API collection's docs, then type one prompt: **"Do a full regression for School API in QA env."**

In my run, the agent read the test plan, sent the requests, checked every scenario against 898 records, and came back with a **GO** verdict and one warning. Everything happened inside VS Code, in the same extension where the requests live.

Most "build an AI agent from scratch" guides are about chatbots or no-code builders. This one is for QA engineers who are not hardcore developers. If you can write a test case, you can build this agent.

## The idea: your collection docs are the test plan

An agent that can send a request still has to know which request, in what order, and what a good response looks like. That knowledge usually lives in someone's head, a wiki page, or a test plan nobody updates.

In **Postmate Client**, you put it next to the requests. In the collection's docs you write what "correct" means: what the API does, the run order, each scenario with an id, and which ones block a release. The agent reads that plan and runs it. No test code. **The spec is the test.**

![Your docs are the test plan; the agent runs it: your prompt, read the docs, send the request, check scenarios against the docs, repeat for the next request or scenario, then a GO / NO-GO report](/qa-agent-loop.png)

That loop is all an agent is: read, act, check, repeat, then report. You own the first box. Everything else is the agent's job.

## The three building blocks

OpenAI's [practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) splits every agent into a model, tools, and instructions. Here is what each one is in a QA agent built on Postmate Client:

| Building block | What it does | In this agent |
| --- | --- | --- |
| Instructions | Say what "correct" looks like | Your collection and request docs |
| Tools | Let the agent look and act | Postmate's `list_collections`, `get_collection` and `send_request` |
| Model | Plans, runs and judges | GitHub Copilot in agent mode |

The tools do three simple jobs:

- **`list_collections`** shows the agent your collection names, request counts, and which collections have docs.
- **`get_collection`** gives it one collection's docs plus a map of its requests in sidebar order: name, method, URL with <span v-pre>`{{variables}}`</span> unresolved, folder, and whether the request has its own docs.
- **`send_request`** runs one saved request and returns that one response.

The map is not an export. The agent never sees headers, bodies, auth, scripts or environment values from `get_collection`, and secret-looking values are redacted.

## Build it step by step in VS Code

Everything below happens inside the Postmate Client extension. The demo is a small school management API with dummy data, but any API you test works the same way.

### Step 1: Save your requests and set up an environment

Install [Postmate Client](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate), create a collection, and save the requests you want covered. Put the base URL and other per-environment values in a QA environment, not in the requests.

![Sidebar with the School API collection and the QA environment selected.](/school-agent1.png)

### Step 2: Write the collection docs like a day-one briefing

Open the collection's docs and write what a new teammate would need on day one:

- What the API does and which environment to test against
- How authentication works, for example "Get All Students has Login as a pre-request, so it gets its own token"
- The run order and which requests depend on others
- What "full regression" means: which requests are in scope and which to skip
- Test-data rules: what the agent may create, update or delete, and what it must never touch
- What the report should look like, and when the verdict is GO or NO-GO

![The collection docs editor with the School API test plan open.](/school-agent2.png)

### Step 3: Turn each check into a scenario with an id

This is where most of the value is. Give every check an id, make it concrete, and mark whether it blocks a release:

```markdown
| Id | Scenario | Critical |
|---|---|---|
| S1 | Status is `200` | Yes |
| S6 | Every student has a `studentId` that is a positive integer, and no two share one | Yes |
| S9 | Every student has a non-empty `status` | No |
```

"Every student's grade is one of PreKg, KG, First … Twelfth" can be checked. "Returns valid student data" cannot. The agent will guess.

### Step 4: Write down the known quirks

If the API does something odd on purpose, say so, or the agent will report it as a bug every run. In the School API, a field is spelled `schoolInof`. The docs say: "schoolInof is spelled that way in the API. It is not a bug."

Write docs as facts about the API, not as orders to the agent, and keep real credentials in environments, never in docs.

### Step 5: Add short request docs

On each request, two or three lines are enough: what it does, what it needs, and what a good response looks like.

### Step 6: Ask for a regression

Open Copilot chat in agent mode and type:

**"Do a full regression for School API in QA env."**

Reading collections is on by default. Sending requests changes data, so it is opt-in: turn it on in Postmate's settings before your first run.

![Exact setting name for sending requests, and add a screenshot of the Copilot chat with the prompt.](/school-agent-3.png)

## What the agent did with one prompt

The School API collection has nine requests. Its docs put two in scope, Login and Get All Students, and list fifteen scenarios with ids and a GO/NO-GO rule. Here is what the agent did, in order:

1. Read every page of the collection docs, so it knew the scope, run order and all fifteen scenarios.
2. Ran only the two in-scope requests against QA and skipped the other seven, because the docs said so.
3. Got a 116 KB students response and queried it field by field with JSONPath instead of reading it whole.
4. Checked all fifteen scenarios and attached evidence to each, such as "898 checked; none invalid".
5. Listed one non-critical finding as a warning, without blocking the release.
6. Returned the verdict: **GO, with one warning.**

When a check could only be partly done, the agent marked it as a warning instead of a pass, because the docs told it to.

![The final report in Copilot chat: scenario table with ids, results, evidence, the warning, and the GO verdict.](/school-agent-run.png)

This is the same work a tester does by hand: read the plan, send the request, compare against expected, write it up. The agent just does it end to end, and you review the report.

## Two lessons from building it

### An agent that reads half your test plan gives a confident wrong answer

Real test plans run to pages. If the agent silently gets only half the docs, it does not know the other half exists. It judges requests against the rules it saw and reports a confident result.

So Postmate never sends the agent more than it can take in one go. Docs come in pages, split at line breaks, and the agent follows a cursor until it has everything. The tool also tells the agent to read every page before judging anything. If you build your own agent, make sure it says when it did not read everything.

### Safety has to live in the tool, not in the prompt

Agents sometimes ignore instructions. A line in your prompt saying "never send to production" is a request, not a guarantee.

That is why the guardrails sit in Postmate itself: reading collections is on by default because it changes nothing, but sending requests stays off until you turn it on. Secrets are redacted before the agent sees anything, and docs are treated as information about the API, never as instructions that override what you asked.

## So, are test scripts dead?

No. Scripts and agents are good at different things, and they are not rivals.

|  | Test scripts | Docs-driven agent |
| --- | --- | --- |
| Best for | The same answer every time | Plans that change often |
| Typical use | CI on every commit | Release checks, exploratory checks, flows nobody has scripted yet |
| Cost per run | No model, no cost | Model time on each run |
| Repeatability | Identical every run | Same result, path may vary |
| Who maintains it | Someone who writes code | Anyone who can write a test case |

The same docs that drive the agent today can become scripts for CI tomorrow. The test plan is the source; scripts are one output of it.

## Limitations to know up front

- **It checks what the docs say, nothing more.** Vague docs give vague checks.
- **It may rely on docs it read earlier.** In a long chat, start a new one or ask it to read the collection again after you change the docs.
- **Redaction in docs is best effort.** Docs are free text, so keep secrets out of them.
- **GitHub Copilot only, for now.** The same tools are planned for the `pmc` CLI's MCP server, so a CI agent can run the same docs-driven check.

## Try it yourself

Install [Postmate Client](https://marketplace.visualstudio.com/items?itemName=PostMate-lab.postmate), write a test plan in one collection's docs, and ask Copilot for a regression. The full reference for writing agent-ready docs is in [Let Your AI Agent Read Your Docs and Run a Full Regression Test](https://www.postmateclient.com/ai/read-collections).

### Related reading

- [How I Built an AI QA Agent for API Regression and Other Testing Tasks](https://www.postmateclient.com/blog/ai-qa-agent-api-regression)
- [A Practical Guide to Building AI Agents (OpenAI)](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)

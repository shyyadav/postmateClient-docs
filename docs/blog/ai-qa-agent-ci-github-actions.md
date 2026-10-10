---
title: "My AI QA Agent Now Runs in CI: Headless, Guarded, No Test Scripts"
description: "The same plain-English API test scenario from part 1 now runs in GitHub Actions with an AI agent: headless, guarded, and with no test scripts to maintain."
date: 2026-10-10
author: Shyam Yadav
head:
  - - meta
    - name: keywords
      content: ai qa agent, plain english test scenarios, ai agent ci cd, api regression github actions, copilot cli, mcp server ci, api testing without scripts, ai agent guardrails
  - - meta
    - property: og:image
      content: https://www.postmateclient.com/qa-agent-og.png
  - - meta
    - name: twitter:image
      content: https://www.postmateclient.com/qa-agent-og.png
---
# My AI QA Agent Now Runs in CI: Headless, Guarded, No Test Scripts

The same plain-English test scenario from part 1 now runs in GitHub Actions on every trigger: headless, with guardrails, and still without a single line of test code. It passed 21 of 21 steps on the first green run.

In [part 1](https://www.postmateclient.com/blog/ai-qa-agent-api-regression), I argued that regression tests can live as plain-English scenarios instead of a large test code base. An AI agent reads the scenario, sends saved API requests, and reports PASS, FAIL or BLOCKED. I demonstrated it with GitHub Copilot in VS Code and Postmate Client against a demo School API.

The post got good questions on LinkedIn, and they all pointed the same way:

- **Mark Hughes:** how does this work in CI/CD, where speed and determinism are mandatory?
- **Jakub and Muskan:** if the agent reads the steps fresh every run, how do you keep results stable?
- **Konstantin:** coded test scripts are faster and cheaper. Why not use them?

A demo on my laptop could not answer those. Running the same scenario in a pipeline could. This post is about what that took, what went wrong, and what it says about the idea.

## The scenario did not change

The test that runs in CI is the same skill file I wrote for VS Code. Not one step of the scenario changed:

```markdown
## Scenario 1: Fee lifecycle

1. Create the fee with "Add Fee" using the row's values.
   Expected: 200.
2. Fetch all fees with "Get All Fees".
   Expected: the new fee is present with name "{submitted name} {amount}",
   and the same type, amount and grades.
3. Fetch fees for the row's `grade` with "Get Fees By Grade".
   Expected: the new fee is present.
4. Fetch fees for the row's `otherGrade` with "Get Fees By Grade".
   Expected: the new fee is absent.
5. Delete the fee with "Delete Fee".
   Expected: 200.
6. Fetch all fees again.
   Expected: the fee is no longer present.
7. Fetch fees for the row's `grade` again.
   Expected: the fee is no longer present.
```

This is the core of the idea. Moving from an editor to a pipeline did not mean rewriting tests in code, adding a test framework, or keeping two versions in sync. The scenario stays a document that anyone on the team can read, review and change.

What did change were the agent's rules, and only by a few lines. More on that below.

## What plain-English tests need to run in CI

In VS Code, I was part of the loop: I picked the agent, approved each POST and DELETE, and watched. In a pipeline nobody is watching. Three things have to exist without a person or an editor:

| Ingredient | Why it matters | What I used |
| --- | --- | --- |
| A headless agent | Reads the scenario and decides each step with no chat window | GitHub Copilot CLI (`copilot -p`), with the same custom agent and skill as in VS Code |
| A tool layer that runs without an editor | The agent needs a way to send saved requests, and nothing else | Postmate's MCP server, started from the CLI with `pmc mcp` |
| Guardrails outside the model | No human approves anything, so the rules must be enforced by tools, not by trust | Postmate blocks POST, PUT and DELETE unless `--allow-mutations` is set, and redacts tokens. The CLI denies shell commands and file writes |

The tool layer was the only piece I had to build. Postmate's MCP server used to live inside the VS Code extension, so I made it run on its own and added a `pmc mcp` command to the Postmate CLI. The approval rules moved with it, so the same guardrails apply in the editor and in CI.

The agent's job also got narrower in CI: send only saved requests, never ask anyone, and stop when it cannot continue. That last part turned out to matter most.

## The agent that went looking for a password

Before going to CI, I tested the unhappy path. I removed the API password and ran the scenario.

The first request failed with a clear message: the secret `__password` was missing. A human tester would stop and report it. The agent kept going. It read the request history file, `.git/config` and the previous run's report, ran SQL queries to search the repo for hidden credentials, and browsed `node_modules`.

It ended with the right verdict, BLOCKED. But the path was dangerous. An old token in the history file, or the PASS table in the previous report, was one step away from a fake green run.

The fix was more plain English. I added two rules to the agent file:

```markdown
- If a request fails because a secret or credential is missing, or with
  401/403, stop immediately and report the affected steps as BLOCKED.
  Never search files, history, git config, reports or anywhere else for
  credentials or tokens.
- Never read or reuse earlier reports. Every result must come from a
  request sent in this run.
```

Plus one line in the skill, because the agent then retried with the Login request: a missing secret is not a 401, so do not retry with any request, including Login.

| Run | Rules in place | What the agent did | Requests | Time |
| --- | --- | --- | --- | --- |
| 1 | None about stopping | Searched history, git config, old reports, `node_modules` | 2 | 1m 47s |
| 2 | Stop on a missing credential, never search for one | Stopped searching, retried with Login | 2 | 1m 59s |
| 3 | A missing secret is not a 401 | Reported BLOCKED after the first error | 1 | 28s |

This is the lesson I did not expect from part 1. A plain-English scenario says what to test. For an agent, the spec also has to say when to stop. Agents optimize for finishing the task, and without a stopping rule they will find another way.

## Running plain-English tests in GitHub Actions

The GitHub Actions workflow is short. It installs the Postmate CLI and Copilot CLI from npm, runs the agent with one prompt, and treats the agent's report as the test report:

```bash
   copilot -p "Run fee regression." \
     --agent school-qa-agent \
     --additional-mcp-config @ci/mcp.json \
     --allow-all-mcp-server-instructions \
     --allow-all-tools \
     --deny-tool shell --deny-tool write \
     --no-ask-user \
     --share reports/qa-run.md
```

The report table goes into the job summary, the session is uploaded as an artifact, and the job fails unless the report says `0 failed, 0 blocked`. The API password comes from a repository secret, never from the repo.

The first green run passed all 21 steps across 3 data rows. The agent created fees with unique names such as `QA Lab Fee 20261006-0248-01 750`, verified each one in the right grade and absent from the wrong one, deleted it, and confirmed it was gone. It changed no files on the runner.

![GitHub Actions job summary showing the AI QA agent report: 21 passed, 0 failed, 0 blocked](/qa-regression-agent-ci.png)

The full workflow, agent and skill files are in [shyyadav/postmate-school](https://github.com/shyyadav/postmate-school).

## Answering the questions

**Can it run in CI/CD?** Yes. The same scenario runs headless on a GitHub Actions runner, gates the job on its result, and leaves a report behind.

**Is it deterministic?** The agent's path can vary a little between runs. On my laptop it grouped requests across rows; in CI it sent one request per step. The verdict did not vary, because the parts that decide it are fixed: the requests are saved requests, the data comes from a data table, and every expectation is written in the scenario. The agent sequences the steps and compares responses against expectations it was given. It does not invent tests, URLs or data.

**Does it scale?** At work I run this approach on an API project with about 50 scenarios, so dozens of scenarios is real use, not a demo. The API is not the bottleneck: each call takes milliseconds, and most of a run's time is the agent reading and reasoning. The real limit is context. Today every scenario sits in one skill file, so the agent reads all of them on every run. Marek pointed this out on LinkedIn, and he is right: that works for dozens of scenarios, not hundreds. The fix keeps the idea intact. The skill file keeps only the app rules and how to run, each scenario moves to its own file, and a run loads only the scenarios it needs. A pull request then runs the scenarios for the endpoints it touches, a nightly job runs everything, and separate CI jobs can run scenario files in parallel.

**Aren't scripts cheaper?** They are, and faster too. A full run here costs 1 to 2.5 cents in GitHub AI credits, depending on the model Copilot picks. The trade-off is what you maintain: a plain-English document instead of a test code base that has to change every time the API does.

## Guardrails, in layers

When nobody is watching, "guarded" has to mean more than good instructions. Most of these layers do not depend on the model at all:

| Layer | What it prevents | Enforced by |
| --- | --- | --- |
| Saved requests only | Calls to URLs that are not in the collection | The tool layer |
| Mutation policy | POST, PUT or DELETE without explicit permission | The tool layer |
| Secret variables | Passwords sitting in the repo | The tool layer and CI secrets |
| Redaction | Tokens and auth headers reaching the agent | The tool layer |
| Tool limits | Shell commands, file writes, SQL | Copilot CLI flags |
| Fresh checkout | Old history or reports to dig through | GitHub Actions |
| Stop rule | Hunting for credentials after a failure | The agent's rules |

Only the last row relies on the agent following instructions. The password story is why it is still on the list.

## What's next, and try it

Part 1 showed that a regression test can be a document. Part 2 shows that the document survives the move to CI unchanged, as long as the agent has a tool layer it can run headless, guardrails it cannot talk its way around, and a clear rule for when to stop.

Three things I want to try next:

- **A verdict that does not depend on the report text.** The agent would record each step's result through a tool, and the tool layer would attach the actual status and response as evidence.
- **One scenario file per endpoint**, so a pull request runs only the scenarios it touches.
- **Scenarios that follow the requirements.** An agent would read a user story in Jira, compare its acceptance criteria with the skill file, and propose scenario updates for me to review. When the requirements change, the plain-English tests change with them, in the same language.

Everything in this post is in [shyyadav/postmate-school](https://github.com/shyyadav/postmate-school): the skill and agent files, the saved requests and data table, and the workflow. The School API credentials are not shared, so to run it end to end, point it at your own API: save your requests, rewrite the scenarios for your app, and add the secrets.

- [Part 1: How I Built an AI QA Agent for API Regression](https://www.postmateclient.com/blog/ai-qa-agent-api-regression)
- [Postmate Client](https://marketplace.visualstudio.com/items?itemName=postmate-lab.postmate), the API client used for the demo

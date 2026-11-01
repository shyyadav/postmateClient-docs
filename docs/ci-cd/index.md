---
title: Run API Tests in CI/CD with Postmate Client — Free CLI
description: Run your Postmate Client collections in GitHub Actions, GitLab CI, Jenkins or any pipeline with the free pmc CLI. No account, no subscription, no run limits.
head:
  - - meta
    - name: keywords
      content: api testing ci cd, postmate cli, pmc cli, run api tests github actions, api tests in pipeline, free api testing cli, postman cli alternative, newman alternative, thunder client cli alternative
  - - meta
    - property: og:title
      content: Run API Tests in CI/CD with Postmate Client — Free CLI
  - - meta
    - property: og:description
      content: Run Postmate Client collections in any CI/CD pipeline with the free pmc CLI. No account, no subscription, no run limits.
  - - meta
    - property: og:url
      content: https://www.postmateclient.com/ci-cd/
---

# CI/CD with Postmate Client

The same collections you build and run in VS Code can run in your pipeline. Postmate Client's **`pmc` CLI** runs collections headlessly in GitHub Actions, GitLab CI, Jenkins or any other CI/CD system — **free, with no account, no subscription and no limit on runs**.

Your collections, environments and data tables are plain JSON files in your project, so the pipeline reads them straight from your repository. Nothing has to be synced or uploaded first.

## Where to start

| Guide | What it covers |
|---|---|
| [CLI Reference](/ci-cd/cli-reference) | Every `pmc` command and option: running collections, picking environments and data tables, reports and exit codes |
| [GitHub Actions](/ci-cd/github-action) | A ready-to-use workflow that runs your collections on every push or pull request |

## Why run API tests in CI/CD

- **Catch breaking changes before they merge.** A failing assertion fails the build, so a broken API never reaches your main branch unnoticed.
- **One source of truth.** The tests you debug in VS Code are the tests the pipeline runs — no second copy to keep in sync.
- **Free at any scale.** Many API clients charge for their CLI or meter collection runs. Postmate Client doesn't.

## Related

- [Collection Runner →](/data-driven/collection-runner)
- [Tests & Assertions →](/testing/tests-assertions)
- [Data Tables →](/data-driven/data-tables)
- [My AI QA Agent Now Runs in CI →](/blog/ai-qa-agent-ci-github-actions)

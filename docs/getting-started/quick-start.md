# Quick Start

Go from zero to your first successful API test in under 5 minutes.

## Prerequisites

You only need Visual Studio Code. No additional runtimes, Node.js versions, or external dependencies are required.

## Step-by-Step

**1. Install the Extension**

Open VS Code, press `Ctrl+P` (or `⌘P` on Mac), paste the command below, and press Enter:

```
ext install PostMate-lab.postmate
```

**2. Open Postmate Client**

Click the **Postmate icon** in the VS Code Activity Bar (left sidebar). The panel opens within your editor.

**3. Create Your First Request**

Click **New Request**. Enter a URL such as `https://jsonplaceholder.typicode.com/posts/1` and select **GET**.

**4. Send the Request**

Click **Send**. The response panel shows the status code, body, headers, and response time instantly.

**5. Save to a Collection**

Click **Save** to add the request to a collection for reuse and automation.

::: tip
Once installed, you'll see the Postmate icon in your activity bar. Your first request takes less than 30 seconds to send.
:::

## Next Steps

- Learn about [Environments & Variables](/core-concepts/environments) to manage dev vs production configs
- Explore [Tests & Assertions](/testing/tests-assertions) to validate responses
- Set up [CI/CD with the CLI](/ci-cd/cli-reference) to run tests in your pipeline

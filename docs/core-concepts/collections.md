# Collections & Folders

Organise your API requests into logical groups for reuse, sharing, and automation.

## Collections

A collection is a named group of saved requests. Think of it as a project — all endpoints for a single API or service live in one collection.

Collections can be:
- **Run in sequence** with the [Collection Runner](/data-driven/collection-runner)
- **Exported** as JSON for sharing or version control
- **Imported** from Postman or Swagger specs

## Folders

Within a collection, use folders to organise requests by feature, module, or endpoint group. Folders can be nested for complex APIs.

**Example structure:**

```
Auth API
├── Auth
│   ├── POST /login
│   ├── POST /refresh
│   └── DELETE /logout
├── Users
│   ├── GET /users
│   ├── POST /users
│   └── GET /users/:id
└── Admin
    └── GET /admin/stats
```

## Creating a Collection

1. Click the **+** icon next to **Collections** in the Postmate panel.
2. Enter a collection name and press **Enter**.
3. Add requests to it by saving any request and selecting the collection.

## Import from Postman

Already using Postman? Import your entire Postman collection directly into Postmate Client. See the [Migrate from Postman](/import-export/migrate-from-postman) guide.

::: info
Collections support import/export, making it easy to onboard teammates or version-control your test suites in Git.
:::

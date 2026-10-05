---
name: API startup seed guard
description: Preserve CMS data when restarting the API while keeping manual sample-data seeding available
---

**Rule:** Run the API's automatic sample seed only when all CMS tables are empty. Keep manual seeding available for an intentional reset.

**Why:** The seed upserts baseline projects and replaces site settings, so running it on every API restart can overwrite administrator edits.

**How to apply:** Keep workflow and deployment restarts non-destructive. Before any manual seed, explain that it can replace project and settings content.

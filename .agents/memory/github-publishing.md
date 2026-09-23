---
name: GitHub publishing
description: Authentication boundary between the workspace Git remote and the Replit GitHub integration
---

The workspace Git remote may reject HTTPS credentials even when the Replit-managed GitHub connection is active. In that case, the authenticated connector SDK can read local files and publish a Git Data API commit without exposing credentials.

**Why:** The GitHub connection and the shell's Git credential helper are separate authentication paths; a failed `git push` does not prove that the connected GitHub account lacks repository access.

**How to apply:** Verify the target repository and branch through the connector first. If native Git remains unavailable, use a temporary SDK helper from the workspace to create blobs, a tree, a commit, and update the branch ref with a non-forced update; verify the resulting branch SHA through the same connection.
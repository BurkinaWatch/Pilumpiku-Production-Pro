---
name: GitHub publishing
description: Authentication boundary between the workspace Git remote and the Replit GitHub integration
---

The workspace Git remote may reject HTTPS credentials even when the Replit-managed GitHub connection is active. A secure `GIT_URL` secret can restore native pushes when it contains the GitHub token; a local credential helper can read that secret at push time without storing its value in `.git/config`. If no secure Git secret exists, the authenticated connector SDK can publish a Git Data API commit without exposing credentials.

**Why:** The GitHub connection and the shell's Git credential helper are separate authentication paths; a failed `git push` does not prove that the connected GitHub account lacks repository access.

**How to apply:** Verify the target repository and branch first. Prefer a temporary URL or credential helper that reads `GIT_URL` at runtime and then run native `git fetch`/`git push`; never put the secret in the remote URL saved in `.git/config`. If native Git remains unavailable, use a temporary SDK helper to create blobs, a tree, a commit, and update the branch ref with a non-forced update; verify the resulting branch SHA.
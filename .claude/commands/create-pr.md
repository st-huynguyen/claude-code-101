# Create PR from Current Branch

Create a pull request from the current branch against the main branch.

## Steps

1. **Get branch info** — Run `git branch --show-current` to get the current branch name and `git log main..HEAD --oneline` to get the commits.

2. **Get the diff** — Run `git diff main...HEAD` to see all changes relative to main.

3. **Analyze the diff** — Read through all changes and understand what was implemented.

4. **Extract the GitHub issue reference** — Parse the branch name or commit messages to find the related GitHub issue (e.g., `CC-123`). If not found, ask the user.

5. **Push the branch** — Run `git push -u origin HEAD` to ensure the branch is pushed to the remote.

6. **Create the PR** — Use `gh pr create` with a concise title (under 70 characters) and a structured body. Format using a HEREDOC:

```bash
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## References
- Closes #<issue-number>

## Description
<bullet points summarizing what changed and why, based on the diff>

## Test plan
- [ ] <checklist item to verify the changes>
- [ ] <another checklist item>

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

7. **Return the PR URL** to the user so they can review it.

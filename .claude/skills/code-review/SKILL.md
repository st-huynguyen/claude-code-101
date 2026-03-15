---
name: code-review
description: Orchestrate code review by collecting branch context, running reviewer agents in parallel, then aggregating results into a unified report.
---

# Code Review Orchestration

## Purpose

Collect context about the current branch changes, then run all reviewer agents in parallel to review code before push. Produce a single aggregated report with prioritized findings.

## Workflow

### Step 1: Context Collection

Gather all context about the current branch changes:

1. Run `git diff --name-only main` to list all changed files
2. Run `git log main..HEAD --oneline` to see commit history on the branch
3. If GitHub issue context is already available from `/create-plan`, reuse it. Otherwise, extract the issue number from the branch name (e.g. `feature/123-add-cart` → `123`) and run `gh issue view <number>`

### Step 2: Parallel Review

Launch reviewer agents **in a single message** so they run in parallel. Pass the branch context from Step 1 to each agent.

### Step 3: Aggregate Results

Collect results from reviewer agents and produce a unified report using the format in `references/report-format.md`.

- Group findings by reviewer category (Performance, Quality)
- Aggregate positive feedback into a single "What Looks Good" section
- Summarize total counts per priority level in the Action Items table
- Provide a recommendation: APPROVE, REQUEST CHANGES, or COMMENT

## Reviewers

| Agent                | Model  | Focus                                                                    |
| -------------------- | ------ | ------------------------------------------------------------------------ |
| quality-reviewer     | sonnet | TypeScript types, error handling, project conventions, naming, dead code |
| performance-reviewer | sonnet | N+1 queries, indexes, pagination, over-fetching, bundle size, rendering  |

## Key Rules

1. **Context first**: Always collect branch context before launching reviewers
2. **Parallel execution**: Launch reviewer agents in a single message
3. **P0-P1 first**: Surface critical findings at the top of the report

## References

- `references/report-format.md` - Aggregated report output format

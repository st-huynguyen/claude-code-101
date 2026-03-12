# Development Planning

Fetch GitHub issue CC-$ARGUMENTS from the repository, checkout a working branch, then create a detailed implementation plan including parallel execution strategy and commit plan.

## Step 1: Process GitHub Issue

Fetch the GitHub issue by running: `gh issue view cc-$ARGUMENTS` to get the issue title, body, and labels.

## Step 2: Checkout Branch

Create and checkout a new branch for this issue:

```bash
git checkout -b cc-$ARGUMENTS
```

If the branch already exists, switch to it with `git checkout cc-$ARGUMENTS`.

## Step 3: Codebase Investigation

Investigate the following to inform the plan. Run parallel execution when investigations are independent:

- Related files and code locations
- Existing implementation patterns
- Potentially affected areas

## Step 4: Create Plan

Use the EnterPlanMode tool to design the implementation approach and create a plan in markdown containing:

### 4.1 Requirements Understanding

- Overview of the feature to implement
- Goal (what becomes possible)

### 4.2 Impact Scope

- List of files to change (with paths)
- Existing features that may be affected

### 4.3 Implementation Steps (with Commit Plan)

Each step should include:

- Specific work to be done
- Commit point: record the proposed commit message for this step (do not commit yet — all commits happen after verification passes)

Create unit tests and e2e tests if applicable.

### 4.4 Parallel Execution Plan (Task-level)

- Identify implementation tasks that can be executed independently
- Describe agent split proposal for parallel execution

## Step 5: Verification Flow

Run the following checks in parallel using sub agents:

1. **Lint**: `lint-fixer` agent
2. **Unit Test**: `unit-test-fixer` agent
3. **E2E Test**: `e2e-test-fixer` agent

## Step 6: User Confirmation (Required)

After outputting the plan in chat, display the following message and **wait for the user's response** before proceeding with implementation:

> Shall I proceed with the plan above? Let me know if you'd like any changes.

**Important**: Do not proceed with implementation without explicit user confirmation.

## Key Rules

- Write the plan in specific and actionable terms
- Plan commits in reviewable units
- Explicitly indicate sections that can run in parallel
- Do not skip the verification flow
- Do not commit during implementation — all commits happen after verification passes using the saved commit points from the plan

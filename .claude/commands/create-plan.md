# Create Plan from GitHub Issue

Fetch GitHub issue CC-$ARGUMENTS from the repository and create an implementation plan.

## Steps

1. **Fetch the GitHub issue** by running: `gh issue view CC-$ARGUMENTS` to get the issue title, body, and labels.

2. **Enter plan mode** using the EnterPlanMode tool to design the implementation approach.

3. **In plan mode**, thoroughly explore the codebase to understand the relevant code, then create a detailed implementation plan based on the issue requirements.

4. **The final step of every plan must be a verification step** that runs lint and tests **in parallel using the dedicated agents**:

```
Step N (final): Verify — run `lint-checker` and `unit-test-runner` agents in parallel
```

Use the Agent tool to launch both agents simultaneously:

- `lint-checker` agent to check for and fix any linting errors
- `unit-test-runner` agent to run unit tests and fix any failures

This verification step is mandatory and must always be the last step in the plan.

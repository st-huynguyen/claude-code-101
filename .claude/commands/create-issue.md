# Create GitHub Issue from Rough Requirement

Turn a rough feature idea into a detailed GitHub issue using the project's issue template.

## Input

The user provides `$ARGUMENTS` as a rough feature description (e.g., "add a shopping cart page" or "user can filter products by country").

If `$ARGUMENTS` is empty, ask the user: "What feature would you like to create an issue for?"

## Steps

1. **Parse the rough requirement** — Read `$ARGUMENTS` to understand the user's intent.

2. **Clarify the requirement** — Use the AskUserQuestion tool to ask targeted questions that fill in the gaps. Ask up to 4 questions at a time, covering:

   **Round 1 — Core understanding:**
   - **User type**: Who is the target user? (e.g., customer, admin, guest)
   - **Goal**: What specific outcome should this feature achieve?
   - **Scope**: What is in scope vs out of scope for this feature?
   - **Priority**: Any specific requirements that are must-haves vs nice-to-haves?

   **Round 2 (if needed) — Detail refinement:**
   - **UI/UX**: Any specific UI expectations? (e.g., modal, full page, inline)
   - **Edge cases**: Any known edge cases or error scenarios to handle?
   - **Dependencies**: Does this depend on or affect other features?
   - **Technical notes**: Any specific technical constraints or preferences?

   Skip questions where the answer is obvious from context. Stop asking once you have enough detail to write a comprehensive issue.

3. **Determine the issue number** — Run `gh issue list --limit 1 --json number --jq '.[0].number // 0'` to find the latest issue number, then increment by 1 for the `CC-` prefix in the title.

4. **Preview and confirm** — Compose the issue body using the template format from `.github/ISSUE_TEMPLATE/feature.md`, then output the full draft (title and body) as text so the user can review it. After showing the draft, use AskUserQuestion to ask: "Does this issue look good to create?" with options to approve, edit, or cancel. Do NOT put the draft inside the AskUserQuestion markdown preview — always output it as regular text above the question.

   Issue body template:

   ```markdown
   ## Background & Purpose

   <Why this feature is needed, based on the clarified requirement>

   ## User Story

   As a **<user type>**, I want **<goal>** so that **<benefit>**.

   ## Functional Requirements

   - [ ] <requirement 1>
   - [ ] <requirement 2>
   - [ ] <requirement 3>
         ...

   ## Acceptance Criteria

   - [ ] <criterion 1>
   - [ ] <criterion 2>
   - [ ] <criterion 3>
         ...

   ## Notes

   <Edge cases, technical considerations, design references, or out-of-scope items>
   ```

5. **Create the issue** — Once approved, run:

   ```bash
   gh issue create --title "CC-<number>: <concise title>" --body "$(cat <<'EOF'
   <issue body>
   EOF
   )"
   ```

6. **Return the issue URL** to the user.

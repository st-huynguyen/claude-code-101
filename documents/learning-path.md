## Claude Code Learning Path

### PHASE 1: FOUNDATION

- Init Next.js project
- Init Claude Code
- Create CLAUDE.md (basic rules)
- Configure status line
- Create folder structure
- Application specs
- Create database schema

Deliverable: Working project with Claude Code

### PHASE 2: SKILLS

- Create front-end SKILL (add references/)
- Rebuild FE component with skill
- Evaluate skill
- Repeat for back-end skill
- Repeat for database skill

Deliverable: 3 skills + comparison notes

### PHASE 3: AGENTS

- Read: How agents work (isolated context)
- Define lint-fixer agent
- Test: Run lint-fixer alone
- Define unit-test-fixer agent
- Test: Run unit-test-fixer alone
- Test: Run BOTH in parallel (single message)
- Observe: Context isolation

Deliverable: 2 working agents

### PHASE 4: MCP

- Add GitHub MCP to .mcp.json
- Test: Call MCP tools directly
- Create read-github-issue skill (uses MCP)
- Test: Invoke skill

Deliverable: GitHub MCP + read-ticket skill

### PHASE 5: ORCHESTRATION

- Create create-pr skill
- Test create-pr skill
- Create plan-start skill
- Test plan-start skill
- Full workflow test: plan-start → implement → test agents → review → create-pr

Deliverable: Complete workflow

## CLAUDE CODE

Claude code = orchestration + tool use + LLMs

- Orchestration: flow, decides what to do
- Tool use: execute actions read, write, edit, bash
- LLMs: Opus, Sonnet, Haiku

## TOOLS

- LLMs just interact with text. But Claude Code use tool to:
  - Interact with codebase: Search (grep), Read, Write, Edit
  - Interact to the world: Create a pull request (Github MCP)

## PERMISSION

- Claude Code need permissions to execute actions:
  - Auto-approved: read files, grep
  - Needs approved: write files
  - Blocked: rm -f /

## CONTEXT

- Prompt: User input, what Claude Code need to DO. But, need GOOD instructions to improve accuracy
- Context: Conversation history, memory..., what Claude Code KNOW

## SKILLS

- Instructions to extend Claude Code ability, make consistent quality.

## SUB-AGENTS

- Working independent in isolated context, report the result to Claude Code agent.

## MCP

- Connect external service (local or remote) to Claude, provides additional capabilities.

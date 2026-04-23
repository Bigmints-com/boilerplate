# Minions Autonomous Agent Framework

## What is this?
Minions is an agentic boilerplate designed to provide a universal "Orchestrator" loop. This engine uses large language models (like Google Gemma) to act autonomously by injecting **Skills** (markdown instruction files) and dynamically executing **Tools** (TypeScript capabilities).

## The Core Loop
The AI operates on a continuous **ReAct (Reason + Act)** loop:
1. **Context & Discovery:** Discovers available skills and dynamically loads TypeScript tools into the LLM context.
2. **Execution Loop:** The AI thinks, calls a tool via JSON/OpenAI tool-calling formats, reads the result from the local file system or network, and continues.
3. **Meta-Cognition:** The agent can write its own tools (using the `ToolCreator` skill), test them in a sandbox, and register them.

## System Agents
- **Orchestrator (Main Engine):** The central nervous system handling routing, context management, and iterative execution.
- **Toolsmith Agent:** A specialized capability/mode where the Orchestrator generates, tests, and deploys its own code and capabilities autonomously.
- **Documentation Agent:** Responsible for auditing changes and auto-updating project wikis and the knowledge base.

*(Note: See `.agents/knowledgebase/` for comprehensive system documentation tailored for different team roles.)*

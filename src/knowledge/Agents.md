# System Agents Registry

This file acts as the routing table for the Orchestrator. When a complex task is received, the Orchestrator reviews this file to determine if a specialized sub-agent should handle it.

## 1. Orchestrator (Primary)
*   **Role:** The main reasoning engine.
*   **Responsibilities:** Receives user prompts, queries the vector DB for context, routes tasks to sub-agents, and handles general-purpose tools.

## 2. Documentation Agent
*   **Role:** The archivist and context maintainer.
*   **Responsibilities:** Runs the Auto-Doc skill. Analyzes codebase changes and updates `Agents.md`, the Knowledge Base, and Skills.
*   **Trigger:** Invoked explicitly or after major code generation tasks.

## 3. Toolsmith Agent
*   **Role:** The self-enhancing meta-agent.
*   **Responsibilities:** Runs the Tool Creator and Skill Creator pipelines. Writes, tests, and registers new tools using Deno/isolated-vm.

*(Note: The system will autonomously append new agents to this file as it identifies repeating patterns in workflows.)*

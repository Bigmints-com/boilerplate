# Minions Framework Knowledge Base

This document serves as the canonical reference for the Minions Autonomous Agent Framework. It is designed to bridge the gap between human operators (designers, PMs, engineers, business owners) and the autonomous agents operating within the system.

---

## 1. Executive & Business Owner Perspective

**The Vision: Scalable Autonomy**
The Minions framework is not just a chatbot wrapper; it is an autonomous workforce engine. For business owners, this means shifting from *software as a tool* to *software as an employee*.

- **Cost Efficiency:** By utilizing local inference (e.g., LM Studio with models like `gemma-4-26b`), the framework reduces cloud AI operational costs to zero for internal tooling and data processing.
- **Self-Enhancement:** Traditional software requires developer time to add new features. Minions uses a `ToolCreator` pipeline to autonomously write, test, and deploy its own capabilities in real-time when it encounters a roadblock.
- **Extensibility:** Workflows are defined in plain Markdown ("Skills"). This allows non-technical domain experts to write standard operating procedures (SOPs) that the AI can instantly parse, internalize, and execute.

---

## 2. Product Manager Perspective

**The Product: Dynamic Workflow Orchestration**
As a Product Manager, your goal is to map user needs to system capabilities. Minions changes the paradigm from "building features" to "teaching skills."

- **Skills as Features:** Instead of writing PRDs for a development team to build a rigid UI flow, you write "Skill Files" (`.md`). These files instruct the Orchestrator on how to combine primitives (like `read_file`, `send_email`, `query_db`) to solve a user's problem.
- **Tool Registries:** You act as the curator of the `ToolRegistry`. You define *what* the agent is allowed to do (e.g., granting sandbox execution rights vs. restricting to read-only DB queries).
- **Iterative Loops:** The ReAct loop (Reason -> Act -> Observe) means the product can handle ambiguous edge cases. If an API returns a 400 error, the agent doesn't crash; it reads the error, modifies its JSON payload, and retries automatically.

---

## 3. UX / UI Designer Perspective

**The Interface: Invisible yet Omnipresent**
For a UX Designer, designing for an autonomous agent means moving away from point-and-click graphical interfaces and moving towards conversational, intent-based design.

- **System Transparency:** The primary UX challenge is trust. The framework exposes its internal "Thoughts" and "Actions" iteratively (e.g., `[Executing Tool] read_file`). The UI must render these agentic loops clearly so the user knows *why* the agent is taking a certain action.
- **Graceful Failures:** If the agent reaches its `maxIterations` without solving the problem, the UX must seamlessly transition from an autonomous loop to a human-in-the-loop fallback, prompting the user with the exact context of where the agent got stuck.
- **Skill Authoring UX:** In the future, the UI should provide visual node-based editors or rich-text environments for humans to write Markdown Skills, lowering the barrier to entry for teaching the agent.

---

## 4. Engineering & Architecture Perspective

**The Code: Deterministic Wrappers around Non-Deterministic Models**
For engineers and architects, Minions is a strictly typed, modular system designed to contain LLM hallucinations and enforce security boundaries.

- **The Orchestrator (`orchestrator.ts`):** The core engine. It bridges the LLM (via standard OpenAI-compatible REST endpoints) with the local execution environment. It handles the `while` loop that powers autonomy.
- **Dynamic Registries (`ToolRegistry` & `SkillRegistry`):** 
  - The `ToolRegistry` uses dynamic imports to load `.ts` files, allowing the agent to write a tool to disk and immediately execute it without a full system reboot.
  - The `SkillRegistry` loads Markdown files and maps them into the system prompt, dynamically altering the agent's persona and context based on the user's intent.
- **Secure Sandboxing:** The `execute_sandbox` tool is the most critical security boundary. Currently, it uses Node's `child_process`. In production, this must be isolated using Deno, `isolated-vm`, or Docker containers to prevent the LLM from inadvertently (or maliciously) destroying the host environment.
- **State Management:** The context array (`messages`) grows with every iteration. Engineers must manage context window limits by summarizing older tool results or utilizing vector databases (`src/memory`) for semantic retrieval of long-term knowledge.

---

## System Primitives Summary

For bots and agents reading this file, here are your core capabilities:
1. `write_file`: Create and modify system files. Use this to write code or save data.
2. `read_file`: Ingest context from the repository.
3. `list_directory`: Explore the filesystem to discover context.
4. `execute_sandbox`: Run compiled code or tests safely.
5. `register_tool`: Inform the registry that a new dynamic tool is ready for use.

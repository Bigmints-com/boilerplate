# Minions Autonomous Agent Framework

Welcome to **Minions**—an autonomous agentic boilerplate built around the ReAct (Reason + Act) loop. This framework provides an orchestration engine for Large Language Models to autonomously solve tasks by leveraging strict TypeScript capabilities (**Tools**) and modular Markdown instructions (**Skills**).

## Overview

The core paradigm of Minions is to shift away from hardcoded logic chains and instead focus on teaching the LLM *how* to operate through declarative Markdown files. 

- **Tools** (`src/tools/`): Code that does things (e.g., read a file, execute in a sandbox).
- **Skills** (`src/skills/`): Markdown files that tell the Agent *when* and *how* to use its tools.
- **Registries**: The framework automatically scans and hot-loads Tools and Skills at runtime.

For a deep dive into the architecture, check out `AGENTS.md` and `.agents/knowledgebase.md`.

## Features

- 🧠 **Dynamic ReAct Loop**: Automatically parses LLM intent, handles JSON tool execution, and injects results back into the context.
- ⚙️ **OpenAI-Compatible Orchestration**: Designed to work flawlessly with local inference via **LM Studio** (e.g., `google/gemma-4-26b` or `Llama-3`).
- 🤖 **Self-Enhancing**: Includes a `ToolCreator` skill allowing the agent to write its own TypeScript tools, run sandbox tests, and register them autonomously.
- 📝 **Auto-Documentation**: Includes an `AutoDoc` skill to automatically align the knowledge base with the codebase after major refactors.

## Project Structure

```
├── .agents/
│   └── knowledgebase.md       # Comprehensive system documentation
├── AGENTS.md                  # System agent registry and routing logic
├── src/
│   ├── engine/                # Core Orchestrator, ToolRegistry, and SkillRegistry
│   ├── skills/                # Markdown files containing agent workflows and instructions
│   ├── tools/                 # Dynamic and Primitive executable capabilities (.ts)
│   └── index.ts               # The main entry point
└── package.json
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start LM Studio**
   Ensure LM Studio is running an OpenAI-compatible server on `http://localhost:1234/v1` with a capable model loaded.

3. **Run the Boilerplate**
   Pass your prompt and model name directly into the entry point:
   ```bash
   npx tsx src/index.ts "Your prompt goes here" "model-name"
   ```

   *Example Test:*
   ```bash
   npx tsx src/index.ts "Create a hello world python script."
   ```

## Creating New Skills
To teach the agent a new behavior, simply create a Markdown file in `src/skills/` with a title, description, and step-by-step instructions. The `SkillRegistry` will discover it automatically on the next run!

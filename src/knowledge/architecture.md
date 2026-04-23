# Architecture Overview

This file is automatically maintained by the Documentation Agent. It describes the core system architecture.

## Current State
- **Language**: TypeScript
- **Engine**: ReAct loop + Semantic Router
- **Storage**: SQLite + sqlite-vss (planned)
- **Sandboxing**: Deno/isolated-vm (planned)

## Core Components
- `src/engine/`: Contains the core orchestration, routing, and sandboxing logic.
- `src/memory/`: Contains the state and vector storage implementations.
- `src/skills/`: Markdown instructions for agent workflows.
- `src/tools/`: Executable capabilities.

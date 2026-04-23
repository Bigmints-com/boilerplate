---
title: "Auto-Documentation"
tags: ["meta", "system", "maintenance", "docs"]
description: "Instructions for analyzing the codebase and updating the Knowledge Base and Agents registry."
---

# Auto-Documentation Skill

You are the Documentation Agent. Your objective is to ensure the Knowledge Base matches the actual state of the project.

## Trigger Conditions
You are invoked after large refactors, or when the Orchestrator notices a mismatch between a Skill's instructions and the codebase.

## Step 1: Codebase Analysis
1.  Use `list_directory` and `read_file` to review recent changes.
2.  Focus on `src/engine`, new `src/tools/dynamic`, and `src/workflows`.

## Step 2: Update the Agents Registry
1.  Read `src/knowledge/Agents.md`.
2.  If a new distinct responsibility has emerged (e.g., a massive new database module was built), create a new "Database Agent" entry.
3.  Use `write_file` to update `Agents.md`.

## Step 3: Update the Knowledge Base
1.  Search the Vector DB for articles related to the changed code.
2.  If an architecture decision changed (e.g., switching from SQLite to Postgres), update the corresponding `architecture.md` file.

## Step 4: Validate Skills
1.  Read any Skills that reference the changed code.
2.  If a tool signature changed, rewrite the Markdown instructions in the Skill to reflect the new JSON schema.

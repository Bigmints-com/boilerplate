---
name: minions
description: Schedule and execute a queue of prompts against the Gemini CLI sequentially, without manual intervention.
---

# Minions Batch Prompt Scheduler

Automate sequential prompt execution against the Gemini CLI. Define prompts in a YAML queue file and run them hands-free.

## Trigger Phrases

Activate this skill when the user says anything like:

- "check my minions queue" / "show my queue" / "what's in my queue"
- "run my queue" / "execute the queue" / "start the batch"
- "create a queue" / "schedule prompts" / "batch these tasks"
- "minions batch" / "batch prompts"
- Any mention of "queue" + "prompts" or "minions" + "batch"

## Instructions for Each Action

### ACTION: Check / Show / View Queue

When the user wants to see what's in their queue:

1. **Find queue files** — Use `find_by_name` to search for `*.yaml` files in the project root directory and common locations:
   - `./queue.yaml`, `./prompts.yaml`, `./batch.yaml`
   - `.agents/skills/minions/examples/`
   - Any file passed by the user
2. **Display contents** — Use `view_file` to show the YAML contents of any found queue files
3. **Summarize** — List the prompt names and what each one does
4. **Offer to run** — Ask the user if they want to execute it (dry-run first, then real run)

### ACTION: Run / Execute Queue

When the user wants to run a queue:

1. **Locate the queue file** — Ask the user or search for `*.yaml` queue files
2. **Dry run first** — Always preview with:
   ```bash
   pi --queue <file> --workdir <project-dir> --dry-run
   ```
3. **Confirm with user** — Show the dry-run output and ask for confirmation
4. **Execute** — Run the actual batch:
   ```bash
   pi --queue <file> --workdir <project-dir>
   ```
5. **Show results** — Read and display the run log from `./runs/`

### ACTION: Create / Schedule a Queue

When the user wants to create a new prompt queue:

1. **Ask what tasks** they want to automate (or infer from context)
2. **Create the YAML file** at the project root as `queue.yaml` using this format:
   ```yaml
   queue:
     - name: "Task label"
       prompt: "The prompt to send to Gemini CLI"
     - name: "Another task"
       prompt: "Another prompt"
   ```
3. **Show a dry-run preview** of the created queue
4. **Offer to execute** it

## Queue File Locations

Search for queue files in this order:

1. Path explicitly provided by the user
2. `./queue.yaml` in the current project root
3. `./prompts.yaml` in the current project root
4. `./batch.yaml` in the current project root
5. `.agents/skills/minions/examples/example-queue.yaml` (sample/demo)

## Prompt Queue Format

Create a YAML file with a `queue` array:

```yaml
queue:
  - name: "Analyze codebase"
    prompt: "Explain the architecture of this project"

  - name: "Fix lint errors"
    prompt: "Run the linter and fix all reported issues"
    approval_mode: auto_edit # override per-prompt

  - name: "Write tests"
    prompt: "Write unit tests for all untested functions"
    workdir: /path/to/other/dir # override per-prompt
```

### Fields

| Field           | Required | Description                                             |
| --------------- | -------- | ------------------------------------------------------- |
| `name`          | Yes      | Human-readable label for logs                           |
| `prompt`        | Yes      | The prompt string sent to Gemini CLI                    |
| `workdir`       | No       | Override working directory for this prompt              |
| `model`         | No       | Override model for this prompt                          |
| `approval_mode` | No       | Override approval mode (`default`, `auto_edit`, `yolo`) |

## CLI Reference

The `pi` CLI is installed at `~/.local/bin/pi`.

| Flag                     | Default       | Description                                   |
| ------------------------ | ------------- | --------------------------------------------- |
| `--queue <file>`         | (required)    | Path to YAML prompt queue file                |
| `--workdir <dir>`        | `.`           | Working directory for Gemini CLI              |
| `--approval-mode <mode>` | `yolo`        | Approval mode: `default`, `auto_edit`, `yolo` |
| `--dry-run`              | off           | Print prompts without executing               |
| `--continue-on-error`    | off           | Don't abort on prompt failure                 |
| `--model <model>`        | (CLI default) | Override Gemini model                         |
| `--sandbox`              | off           | Run in sandbox mode                           |
| `--delay <seconds>`      | `2`           | Seconds to wait between prompts               |
| `--log-dir <dir>`        | `./runs/`     | Directory for run logs                        |

## Run Logs

Each run creates a timestamped log at `<log-dir>/run-<timestamp>.log` containing:

- Start/end timestamps per prompt
- Exit codes and truncated responses
- Overall run summary

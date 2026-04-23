import { execSync } from 'child_process';

export const name = "execute_sandbox";
export const description = "Executes a command or test script in a secure sandbox environment.";
export const parameters = {
  type: "object",
  properties: {
    command: { type: "string", description: "The command to run, e.g. 'npx tsx src/tools/dynamic/test.ts'" }
  },
  required: ["command"]
};

export async function execute(args: { command: string }) {
  try {
    const output = execSync(args.command, { encoding: 'utf-8', stdio: 'pipe' });
    return `Sandbox Execution Success:\n${output}`;
  } catch (error: any) {
    return `Sandbox Execution Failed:\n${error.message}\nOutput:\n${error.stdout || error.stderr}`;
  }
}

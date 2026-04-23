export class Sandbox {
  constructor() {}

  async execute(code: string) {
    console.log(`Executing code in sandbox: ${code}`);
    // Deno or isolated-vm logic goes here
    return { success: true, output: "" };
  }
}

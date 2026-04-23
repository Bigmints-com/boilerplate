import * as fs from 'fs';
import * as path from 'path';

export class ToolRegistry {
  tools: Map<string, any> = new Map();

  async loadTools(dirPath: string) {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
        const fullPath = path.join(dirPath, file);
        // We use dynamic import for ts-node/tsx compatibility
        const mod = await import(fullPath);
        if (mod.name && mod.execute) {
          this.tools.set(mod.name, mod);
        }
      }
    }
  }

  async discover() {
    this.tools.clear();
    const basePath = path.resolve(__dirname, '..', 'tools');
    await this.loadTools(path.join(basePath, 'primitives'));
    await this.loadTools(path.join(basePath, 'dynamic'));
    console.log(`[ToolRegistry] Discovered ${this.tools.size} tools.`);
  }

  getOpenAITools() {
    return Array.from(this.tools.values()).map(tool => ({
      type: "function",
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters
      }
    }));
  }

  async executeTool(name: string, args: any) {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Tool ${name} not found.`);
    console.log(`[Executing Tool] ${name}(${JSON.stringify(args)})`);
    return await tool.execute(args);
  }
}

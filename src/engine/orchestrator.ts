import { ToolRegistry } from './toolRegistry';
import { SkillRegistry } from './skillRegistry';

export class Orchestrator {
  private baseUrl: string;
  private toolRegistry: ToolRegistry;
  private skillRegistry: SkillRegistry;
  private maxIterations = 10;

  constructor(baseUrl: string = "http://localhost:1234/v1") {
    this.baseUrl = baseUrl;
    this.toolRegistry = new ToolRegistry();
    this.skillRegistry = new SkillRegistry();
  }

  async init() {
    await this.toolRegistry.discover();
    await this.skillRegistry.discover();
  }

  async run(prompt: string, model: string = "google/gemma-4-26b-a4b") { // Defaulting to the model user specified
    console.log(`\n[Orchestrator] Received task: "${prompt}"`);
    console.log(`[Orchestrator] Connecting to LM Studio at ${this.baseUrl} with model ${model}...`);

    let messages: any[] = [
      { 
        role: "system", 
        content: `You are the Orchestrator agent. You have access to tools and skills. 
Use the tools to accomplish the user's task. If you don't have a tool to do something, you can write a new tool using write_file.
Here are the skills you know:\n${this.skillRegistry.getContext()}`
      },
      { role: "user", content: prompt }
    ];

    let iteration = 0;
    
    while (iteration < this.maxIterations) {
      iteration++;
      console.log(`\n--- Iteration ${iteration} ---`);
      
      const tools = this.toolRegistry.getOpenAITools();
      
      try {
        const payload: any = {
          model: model,
          messages: messages,
          temperature: 0.2,
        };
        
        if (tools.length > 0) {
          payload.tools = tools;
          payload.tool_choice = "auto";
        }

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}. Body: ${errText}`);
        }

        const data = await response.json();
        const responseMessage = data.choices[0]?.message;

        if (!responseMessage) {
          throw new Error("No response message from model.");
        }

        // Add model response to history
        messages.push(responseMessage);

        if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
          // Model decided to call tools
          for (const toolCall of responseMessage.tool_calls) {
            const funcName = toolCall.function.name;
            const args = JSON.parse(toolCall.function.arguments);
            
            console.log(`[Model Action] Attempting to call ${funcName}(${JSON.stringify(args)})`);
            
            let toolResult;
            try {
              toolResult = await this.toolRegistry.executeTool(funcName, args);
            } catch (e: any) {
              toolResult = `Error executing tool: ${e.message}`;
            }
            
            console.log(`[Tool Result]: ${toolResult}`);
            
            messages.push({
              role: "tool",
              tool_call_id: toolCall.id,
              name: funcName,
              content: String(toolResult)
            });
          }
          // The loop continues to send the tool result back to the model
        } else {
          // Model returned a text response, meaning the task is done or needs user input
          console.log(`\n[Agent Final Output]:\n${responseMessage.content}\n`);
          return { status: "success", data: responseMessage.content };
        }
      } catch (error: any) {
        console.error(`\n[Error]: Communication failed.`);
        console.error(error.message);
        return { status: "error", message: error.message };
      }
    }
    
    console.log(`\n[Orchestrator] Max iterations reached.`);
    return { status: "max_iterations" };
  }
}

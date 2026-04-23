export const name = "register_tool";
export const description = "Registers a newly created tool into the active ToolRegistry.";
export const parameters = {
  type: "object",
  properties: {
    toolName: { type: "string", description: "The name of the tool to register." },
    filePath: { type: "string", description: "The file path of the tool." }
  },
  required: ["toolName", "filePath"]
};

export async function execute(args: { toolName: string, filePath: string }) {
  // In a real system, this would ask the Orchestrator to reload the module.
  // For the boilerplate, we just acknowledge the registration for the next runtime.
  return `Successfully registered tool '${args.toolName}'. It will be available on the next Orchestrator loop/startup.`;
}

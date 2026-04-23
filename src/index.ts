import { Orchestrator } from './engine/orchestrator';

async function main() {
  console.log("=======================================");
  console.log("   Minions AI Boilerplate - Test App   ");
  console.log("=======================================\n");

  const orchestrator = new Orchestrator();
  await orchestrator.init(); // Discover tools and skills
  
  const prompt = process.argv[2] || "Write a file named testing.txt with the content 'hello from agent' and then read it back.";
  
  // Model name should match the model loaded in LM Studio
  const modelName = process.argv[3] || "google/gemma-4-26b-a4b";
  
  await orchestrator.run(prompt, modelName);
}

if (require.main === module) {
  main().catch(console.error);
}

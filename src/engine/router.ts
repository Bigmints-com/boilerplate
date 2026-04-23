export class Router {
  constructor() {}

  async route(prompt: string) {
    console.log(`Routing prompt: ${prompt}`);
    // Vector DB semantic search logic goes here
    return { skills: [], context: [] };
  }
}

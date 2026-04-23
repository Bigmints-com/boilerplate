import * as fs from 'fs';
import * as path from 'path';

export const name = "write_file";
export const description = "Writes content to a specific file path. Overwrites the file if it exists.";
export const parameters = {
  type: "object",
  properties: {
    filePath: { type: "string", description: "The path of the file to write to." },
    content: { type: "string", description: "The content to write into the file." }
  },
  required: ["filePath", "content"]
};

export async function execute(args: { filePath: string, content: string }) {
  const fullPath = path.resolve(process.cwd(), args.filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, args.content, 'utf8');
  return `Successfully wrote to ${args.filePath}`;
}

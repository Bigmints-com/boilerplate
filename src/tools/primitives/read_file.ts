import * as fs from 'fs';
import * as path from 'path';

export const name = "read_file";
export const description = "Reads the content of a specific file.";
export const parameters = {
  type: "object",
  properties: {
    filePath: { type: "string", description: "The path of the file to read." }
  },
  required: ["filePath"]
};

export async function execute(args: { filePath: string }) {
  const fullPath = path.resolve(process.cwd(), args.filePath);
  if (!fs.existsSync(fullPath)) {
    return `Error: File not found at ${args.filePath}`;
  }
  return fs.readFileSync(fullPath, 'utf8');
}

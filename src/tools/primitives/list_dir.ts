import * as fs from 'fs';
import * as path from 'path';

export const name = "list_directory";
export const description = "Lists the contents of a directory.";
export const parameters = {
  type: "object",
  properties: {
    dirPath: { type: "string", description: "The path of the directory to list." }
  },
  required: ["dirPath"]
};

export async function execute(args: { dirPath: string }) {
  const fullPath = path.resolve(process.cwd(), args.dirPath);
  if (!fs.existsSync(fullPath)) {
    return `Error: Directory not found at ${args.dirPath}`;
  }
  const stat = fs.statSync(fullPath);
  if (!stat.isDirectory()) {
    return `Error: ${args.dirPath} is not a directory.`;
  }
  const files = fs.readdirSync(fullPath);
  return files.join('\n');
}

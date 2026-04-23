import * as fs from 'fs';
import * as path from 'path';

export class SkillRegistry {
  skills: { title: string; content: string }[] = [];

  async loadSkills(dirPath: string) {
    if (!fs.existsSync(dirPath)) return;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        await this.loadSkills(fullPath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Naive markdown title extraction
        const titleMatch = content.match(/title:\s*"([^"]+)"/);
        const title = titleMatch ? titleMatch[1] : file;
        this.skills.push({ title, content });
      }
    }
  }

  async discover() {
    this.skills = [];
    const basePath = path.resolve(__dirname, '..', 'skills');
    await this.loadSkills(basePath);
    console.log(`[SkillRegistry] Discovered ${this.skills.length} skills.`);
  }

  getContext() {
    return this.skills.map(s => `=== SKILL: ${s.title} ===\n${s.content}\n`).join('\n');
  }
}

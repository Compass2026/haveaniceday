// Voice guard: the brand voice uses no em dashes (or en dashes standing in
// for them). Fails the check if any slip into site source or built pages.
import fs from 'node:fs';
import path from 'node:path';

const roots = ['src', 'dist'].filter((d) => fs.existsSync(d));
const bad = [];
const walk = (dir) => {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(astro|ts|html|md|json)$/.test(f)) {
      fs.readFileSync(p, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          if (/[—]|\s–\s/.test(line)) bad.push(`${p}:${i + 1}: ${line.trim().slice(0, 100)}`);
        });
    }
  }
};
roots.forEach(walk);
if (bad.length) {
  console.error(`Found ${bad.length} em dash(es):\n${bad.join('\n')}`);
  process.exit(1);
}
console.log('Copy check passed: no em dashes.');

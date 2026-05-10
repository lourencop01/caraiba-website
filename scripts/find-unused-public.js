#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');

const SKIP_FILES = new Set(['.DS_Store', 'robots.txt', 'sitemap.xml']);
const SKIP_DIRS = new Set(['node_modules', '.next', '.git', 'public', '.turbo', 'out', 'dist']);
const SEARCH_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.css', '.json', '.md', '.mdx', '.html']);

function collectSourceFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) collectSourceFiles(path.join(dir, entry.name), results);
    } else if (SEARCH_EXTS.has(path.extname(entry.name).toLowerCase())) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

const sourceFiles = collectSourceFiles(ROOT);
const allSource = sourceFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const publicFiles = fs.readdirSync(PUBLIC_DIR).filter(f => {
  if (SKIP_FILES.has(f)) return false;
  return fs.statSync(path.join(PUBLIC_DIR, f)).isFile();
});

const unused = publicFiles.filter(f => !allSource.includes(f));

if (unused.length === 0) {
  console.log('All public files are referenced.');
} else {
  console.log(`Unused public files (${unused.length}):`);
  unused.forEach(f => console.log(` - ${f}`));

  const rl = readline.createInterface({ input, output });
  let deleted = 0;
  for (const f of unused) {
    const answer = await rl.question(`\nDelete "${f}"? [y/N] `);
    if (/^y(es)?$/i.test(answer.trim())) {
      fs.unlinkSync(path.join(PUBLIC_DIR, f));
      deleted++;
    }
  }
  rl.close();
  console.log(deleted === 0 ? '\nNo files deleted.' : `\nDeleted ${deleted} file(s).`);
}

import { readFileSync } from 'fs';
import { resolve } from 'path';

// read DevToolsPage.tsx
const content = readFileSync(resolve(__dirname, '../src/app/pages/DevToolsPage.tsx'), 'utf8');

// match all PhosphorIcons.X
const matches = content.match(/PhosphorIcons\.([A-Za-z0-9_]+)/g);
const icons = [...new Set(matches.map(m => m.split('.')[1]))];
console.log('Icons found in DevToolsPage:', icons);

// run node with vite config or check with tsx

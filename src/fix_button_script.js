const fs = require('fs');

const path = require('path');

const file = path.join(__dirname, 'app/components/blocks/design/Button.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/'inline-flex items-center whitespace-nowrap flex-nowrap whitespace-nowrap flex-nowrap justify-center gap-2'/, "'inline-flex items-center justify-center flex-nowrap whitespace-nowrap gap-[var(--spacing-gap-sm)]'");

fs.writeFileSync(file, content);
console.log("Fixed Button.tsx");

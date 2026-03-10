const fs = require('fs');
let content = fs.readFileSync('../src/app/pages/SpecialSingle.tsx', 'utf8');
content = content.replace('text-[10px]', 'text-xs');
fs.writeFileSync('../src/app/pages/SpecialSingle.tsx', content);

const fs = require('fs');
let text = fs.readFileSync('/src/app/pages/QuoteRequestPage.tsx', 'utf8');
text = text.replace(/text-\[length:var\(--text-xs\)\]/g, 'text-xs');
text = text.replace(/text-\[length:var\(--text-sm\)\]/g, 'text-sm');
text = text.replace(/text-\[length:var\(--text-base\)\]/g, 'text-base');
text = text.replace(/text-\[length:var\(--text-lg\)\]/g, 'text-lg');
fs.writeFileSync('/src/app/pages/QuoteRequestPage.tsx', text);

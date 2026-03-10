const fs = require('fs');

const dts = fs.readFileSync('node_modules/@phosphor-icons/react/dist/index.d.ts', 'utf8');
const { execSync } = require('child_process');
const result = execSync('grep -h -o -E "import \\{[^}]+\\} from [\'\\\"]@phosphor-icons/react[\'\\\"]" $(find src/app -name "*.tsx")').toString();
const imports = result.split('\n').filter(l => l.trim().length > 0);
const icons = new Set();
imports.forEach(line => {
    const match = line.match(/\{([^}]+)\}/);
    if (match) {
        const parts = match[1].split(',');
        parts.forEach(p => {
            const name = p.split(' as ')[0].trim();
            if (name && name !== 'Icon') {
                icons.add(name);
            }
        });
    }
});

const used = Array.from(icons);
const missing = used.filter(icon => !dts.includes(`export * from './csr/${icon}'`) && !dts.includes(`export type { ${icon}` ) && !dts.includes(`export { ${icon}`));
console.log('Missing icons:', missing);
console.log('Used count:', used.length);

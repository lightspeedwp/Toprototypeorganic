const _fs = require('fs');
const _path = require('path');

function run(d) {
  const files = _fs.readdirSync(d);
  for(let file of files) {
    let fp = _path.join(d, file);
    if(_fs.statSync(fp).isDirectory()){
      run(fp);
    } else if (fp.endsWith('.tsx') || fp.endsWith('.ts')) {
      let content = _fs.readFileSync(fp, 'utf8');
      let orig = content;
      content = content.replace(/\brounded-sm\b/g, 'rounded-[var(--radius-sm)]');
      content = content.replace(/\brounded-md\b/g, 'rounded-[var(--radius-md)]');
      content = content.replace(/\brounded-lg\b/g, 'rounded-[var(--radius-lg)]');
      content = content.replace(/\brounded-xl\b/g, 'rounded-[var(--radius-xl)]');
      content = content.replace(/\brounded-2xl\b/g, 'rounded-[var(--radius-2xl)]');
      content = content.replace(/\brounded-3xl\b/g, 'rounded-[var(--radius-3xl)]');
      content = content.replace(/\brounded-full\b/g, 'rounded-[var(--radius-full)]');
      content = content.replace(/\brounded-none\b/g, 'rounded-[var(--radius-none)]');

      content = content.replace(/\btext-xs\b/g, 'text-[length:var(--text-xs)]');
      content = content.replace(/\btext-sm\b/g, 'text-[length:var(--text-sm)]');
      content = content.replace(/\btext-base\b/g, 'text-[length:var(--text-base)]');
      content = content.replace(/\btext-lg\b/g, 'text-[length:var(--text-lg)]');
      content = content.replace(/\btext-xl\b/g, 'text-[length:var(--text-xl)]');
      content = content.replace(/\btext-2xl\b/g, 'text-[length:var(--text-2xl)]');
      content = content.replace(/\btext-3xl\b/g, 'text-[length:var(--text-3xl)]');
      content = content.replace(/\btext-4xl\b/g, 'text-[length:var(--text-4xl)]');
      content = content.replace(/\btext-5xl\b/g, 'text-[length:var(--text-5xl)]');
      content = content.replace(/\btext-6xl\b/g, 'text-[length:var(--text-6xl)]');

      content = content.replace(/\bfont-bold\b/g, 'font-[var(--font-weight-bold)]');
      content = content.replace(/\bfont-semibold\b/g, 'font-[var(--font-weight-semibold)]');
      content = content.replace(/\bfont-medium\b/g, 'font-[var(--font-weight-medium)]');
      content = content.replace(/\bfont-normal\b/g, 'font-[var(--font-weight-normal)]');
      content = content.replace(/\bfont-light\b/g, 'font-[var(--font-weight-light)]');
      content = content.replace(/\bfont-serif\b/g, '');
      content = content.replace(/\bfont-sans\b/g, '');
      content = content.replace(/\bfont-mono\b/g, '');

      // Also let's fix spacing for some simple classes if not already mapped, but the main ones are these typography/border ones.
      
      // Clean up extra spaces in className
      content = content.replace(/className="([^"]*)"/g, (match, p1) => {
        let cleaned = p1.replace(/\s+/g, ' ').trim();
        return `className="${cleaned}"`;
      });
      
      if(content !== orig) {
        _fs.writeFileSync(fp, content, 'utf8');
        console.log('Fixed:', fp);
      }
    }
  }
}
run('/tmp/sandbox/src/app/components');

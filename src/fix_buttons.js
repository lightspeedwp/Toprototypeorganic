const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Find classNames that have 'inline-flex' and 'items-center'
  // and add 'whitespace-nowrap flex-nowrap' if not present
  
  content = content.replace(/className=(["'])([^"']+)["']/g, (match, quote, classes) => {
    if (classes.includes('inline-flex') && classes.includes('items-center')) {
      let newClasses = classes;
      if (!newClasses.includes('whitespace-nowrap')) {
        newClasses += ' whitespace-nowrap';
      }
      if (!newClasses.includes('flex-nowrap')) {
        newClasses += ' flex-nowrap';
      }
      return `className=${quote}${newClasses}${quote}`;
    }
    return match;
  });

  // Handle cn() or clsx() strings
  content = content.replace(/cn\(\s*(["'])([^"']+)["']/g, (match, quote, classes) => {
    if (classes.includes('inline-flex') && classes.includes('items-center')) {
      let newClasses = classes;
      if (!newClasses.includes('whitespace-nowrap')) {
        newClasses += ' whitespace-nowrap';
      }
      if (!newClasses.includes('flex-nowrap')) {
        newClasses += ' flex-nowrap';
      }
      return `cn(${quote}${newClasses}${quote}`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(path.join(__dirname, 'app'));

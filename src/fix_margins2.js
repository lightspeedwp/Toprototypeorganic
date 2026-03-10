const fs = require('fs');
const glob = require('glob');

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove text-center mx-auto and use flex
    content = content.replace(/className="text-center([^"]*)mx-auto([^"]*)"/g, 'className="text-center$1$2 flex flex-col items-center"');
    content = content.replace(/className="max-w-2xl mx-auto/g, 'className="max-w-2xl w-full mx-auto flex flex-col items-center');

    // Replace mb-* with flex gaps
    // This is hard to do with regex without breaking things. Let's just remove simple mb- / mt- / mx-auto where we can safely assume it's just spacing.

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log("Updated", file);
    }
}

glob.sync('../src/app/**/*.tsx').forEach(processFile);

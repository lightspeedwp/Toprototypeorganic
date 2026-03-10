const fs = require('fs');
let file = '../src/app/pages/SpecialSingle.tsx';
let data = fs.readFileSync(file, 'utf8');
data = data.replace('text-[10px] font-bold uppercase tracking-[0.2em]', 'text-xs font-bold uppercase tracking-widest');
data = data.replace('text-[10px] font-bold uppercase tracking-widest', 'text-xs font-bold uppercase tracking-widest');
data = data.replace('text-[10px] font-bold uppercase tracking-widest', 'text-xs font-bold uppercase tracking-widest');
fs.writeFileSync(file, data);

file = '../src/app/pages/ReviewSingle.tsx';
data = fs.readFileSync(file, 'utf8');
data = data.replace('text-[10px]', 'text-xs');
fs.writeFileSync(file, data);

file = '../src/app/pages/TripPlannerPage.tsx';
data = fs.readFileSync(file, 'utf8');
data = data.replace('text-[10px]', 'text-xs');
fs.writeFileSync(file, data);

console.log("Done");

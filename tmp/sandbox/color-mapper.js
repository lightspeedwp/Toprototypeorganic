const fs = require('fs');

const mappings = [
  // Savannah-contour-frame-light.svg
  { hex: /#030202/ig, token: 'var(--foreground)' },
  { hex: /#100703/ig, token: 'var(--foreground)' },
  { hex: /#271D0F/ig, token: 'var(--foreground)' },
  { hex: /#3C392E/ig, token: 'var(--muted-foreground)' },
  { hex: /#403D3A/ig, token: 'var(--muted-foreground)' },
  { hex: /#444336/ig, token: 'var(--muted-foreground)' },
  { hex: /#45361E/ig, token: 'var(--muted-foreground)' },
  { hex: /#565548/ig, token: 'var(--muted-foreground)' },
  { hex: /#655643/ig, token: 'var(--muted)' },
  { hex: /#656653/ig, token: 'var(--muted)' },
  { hex: /#6F6E57/ig, token: 'var(--muted)' },
  { hex: /#73523A/ig, token: 'var(--secondary)' },
  { hex: /#7C706A/ig, token: 'var(--secondary)' },
  { hex: /#7E825F/ig, token: 'var(--secondary)' },
  { hex: /#A39780/ig, token: 'var(--secondary)' },
  { hex: /#C4B395/ig, token: 'var(--accent)' },
  { hex: /#CD925C/ig, token: 'var(--primary)' },
  { hex: /#DBD6CD/ig, token: 'var(--card)' },
  { hex: /#EBE6D8/ig, token: 'var(--background)' },
  { hex: /#CF915A/ig, token: 'var(--primary)' },
  { hex: /#3D352D/ig, token: 'var(--foreground)' },
  { hex: /#999360/ig, token: 'var(--accent)' },
  { hex: /#717F4E/ig, token: 'var(--secondary)' },
  { hex: /#4B4621/ig, token: 'var(--foreground)' },
  { hex: /#CAA383/ig, token: 'var(--card)' },
  { hex: /#726B5B/ig, token: 'var(--muted)' },
  { hex: /#818162/ig, token: 'var(--muted)' },
  { hex: /#464039/ig, token: 'var(--foreground)' },
  { hex: /#FEFEFE/ig, token: 'var(--background)' },
  { hex: /#9B7646/ig, token: 'var(--accent)' },
  { hex: /#D6C8B1/ig, token: 'var(--card)' }
];

function processSVG(filename) {
  try {
    let content = fs.readFileSync(`/tmp/sandbox/src/imports/${filename}`, 'utf8');
    mappings.forEach(m => {
      content = content.replace(m.hex, m.token);
    });
    content = content.replace(/width="\d+"/ig, 'width="100%"');
    content = content.replace(/height="\d+"/ig, 'height="100%"');
    fs.writeFileSync(`/tmp/sandbox/src/imports/${filename.replace('-light.svg', '.svg')}`, content);
    console.log(`Processed ${filename}`);
  } catch(e) {
    console.log(`Error processing ${filename}:`, e.message);
  }
}

processSVG('Savannah-contour-frame-light.svg');
processSVG('Safari-medallion-light.svg');
processSVG('Botanical-corner-light.svg');

const fs = require('fs');
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
function contrast(rgb1, rgb2) {
    var lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    var lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

const light = {
  background: '#FFFFFF',
  foreground: '#000000',
  card: '#FFFFFF',
  card_foreground: '#000000',
  popover: '#FFFFFF',
  popover_foreground: '#000000',
  primary: '#4A7311',
  primary_foreground: '#FFFFFF',
  secondary: '#5C5340',
  secondary_foreground: '#FFFFFF',
  accent: '#B87A00',
  accent_foreground: '#FFFFFF',
  muted: '#F5F5F5',
  muted_foreground: '#595959',
  destructive: '#B71C1C',
  destructive_foreground: '#FFFFFF',
};

const dark = {
  background: '#0A0A0A',
  foreground: '#FFFFFF',
  card: '#1A1A1A',
  card_foreground: '#FFFFFF',
  popover: '#1A1A1A',
  popover_foreground: '#FFFFFF',
  primary: '#90BA48',
  primary_foreground: '#000000',
  secondary: '#A89A7A',
  secondary_foreground: '#000000',
  accent: '#FFB740',
  accent_foreground: '#000000',
  muted: '#262626',
  muted_foreground: '#B8B8B8',
  destructive: '#F44336',
  destructive_foreground: '#000000',
};

function checkTheme(theme, name) {
  console.log(`\n--- ${name} Theme ---`);
  const pairs = [
    ['background', 'foreground'],
    ['card', 'card_foreground'],
    ['popover', 'popover_foreground'],
    ['primary', 'primary_foreground'],
    ['secondary', 'secondary_foreground'],
    ['accent', 'accent_foreground'],
    ['muted', 'muted_foreground'],
    ['destructive', 'destructive_foreground'],
    ['background', 'muted_foreground'],
  ];

  pairs.forEach(([bg, fg]) => {
    const bgHex = theme[bg];
    const fgHex = theme[fg];
    const ratio = contrast(hexToRgb(bgHex), hexToRgb(fgHex)).toFixed(2);
    let pass = 'FAIL';
    if (ratio >= 4.5) pass = 'AA';
    if (ratio >= 7.0) pass = 'AAA';
    if (ratio >= 3.0 && ratio < 4.5) pass = 'AA Large';
    console.log(`${bg} (${bgHex}) vs ${fg} (${fgHex}): ${ratio}:1 [${pass}]`);
  });
}

checkTheme(light, 'Light');
checkTheme(dark, 'Dark');

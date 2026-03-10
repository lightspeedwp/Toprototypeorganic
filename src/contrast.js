function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : {r:0,g:0,b:0};
}

function contrast(hex1, hex2) {
    var rgb1 = hexToRgb(hex1);
    var rgb2 = hexToRgb(hex2);
    var lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    var lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    var brightest = Math.max(lum1, lum2);
    var darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

const themeLight = {
  background: "#FFFFFF",
  foreground: "#000000",
  primary: "#4A7311",
  primaryFg: "#FFFFFF",
  secondary: "#5C5340",
  secondaryFg: "#FFFFFF",
  accent: "#B87A00",
  accentFgWhite: "#FFFFFF",
  accentFgBlack: "#000000",
  muted: "#F5F5F5",
  mutedFg: "#595959",
  border: "#8A8A8A",
  destructive: "#B71C1C",
  destructiveFg: "#FFFFFF",
  success: "#1B5E20",
  warning: "#E65100",
  info: "#01579B"
};

const themeDark = {
  background: "#0A0A0A",
  foreground: "#FFFFFF",
  primary: "#90BA48",
  primaryFg: "#000000",
  secondary: "#A89A7A",
  secondaryFg: "#000000",
  accent: "#FFB740",
  accentFgWhite: "#FFFFFF",
  accentFgBlack: "#000000",
  muted: "#262626",
  mutedFg: "#B8B8B8",
  border: "#666666",
  destructive: "#F44336",
  destructiveFg: "#000000",
  success: "#66BB6A",
  warning: "#FFA726",
  info: "#42A5F5"
};

console.log("Light Mode Contrasts:");
console.log("Bg vs Fg:", contrast(themeLight.background, themeLight.foreground));
console.log("Bg vs MutedFg:", contrast(themeLight.background, themeLight.mutedFg));
console.log("Bg vs Border:", contrast(themeLight.background, themeLight.border));
console.log("Primary vs PrimaryFg:", contrast(themeLight.primary, themeLight.primaryFg));
console.log("Secondary vs SecondaryFg:", contrast(themeLight.secondary, themeLight.secondaryFg));
console.log("Accent vs White:", contrast(themeLight.accent, themeLight.accentFgWhite));
console.log("Accent vs Black:", contrast(themeLight.accent, themeLight.accentFgBlack));
console.log("Destructive vs Fg:", contrast(themeLight.destructive, themeLight.destructiveFg));

console.log("\nDark Mode Contrasts:");
console.log("Bg vs Fg:", contrast(themeDark.background, themeDark.foreground));
console.log("Bg vs MutedFg:", contrast(themeDark.background, themeDark.mutedFg));
console.log("Bg vs Border:", contrast(themeDark.background, themeDark.border));
console.log("Primary vs PrimaryFg:", contrast(themeDark.primary, themeDark.primaryFg));
console.log("Secondary vs SecondaryFg:", contrast(themeDark.secondary, themeDark.secondaryFg));
console.log("Accent vs White:", contrast(themeDark.accent, themeDark.accentFgWhite));
console.log("Accent vs Black:", contrast(themeDark.accent, themeDark.accentFgBlack));
console.log("Destructive vs Fg:", contrast(themeDark.destructive, themeDark.destructiveFg));

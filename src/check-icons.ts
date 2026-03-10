import * as PhosphorIcons from "@phosphor-icons/react";

const iconsToCheck = [
  "PaintBrush",
  "Palette",
  "TextT",
  "ArrowsOut",
  "Stack",
  "Circle",
  "Mouse",
  "Sliders",
  "GridFour",
  "Cube",
  "Play",
  "FileText",
  "Scissors",
  "Flask",
  "Eye",
  "PuzzlePiece",
  "BookOpen",
  "MagnifyingGlass",
  "Rocket",
  "Gauge",
  "Monitor",
  "Terminal",
  "Lightning",
  "Ruler",
  "Check",
  "Info"
];

const undefinedIcons = iconsToCheck.filter(name => !PhosphorIcons[name]);
console.log("Undefined icons:", undefinedIcons);

/**
 * Visual Regression Tester
 * 
 * Utilities for detecting visual changes in components.
 * Compares component snapshots to catch unintended style changes.
 * 
 * @module visualRegressionTester
 * @category utils
 */

/**
 * Component snapshot data.
 */
export interface ComponentSnapshot {
  componentName: string;
  timestamp: number;
  styles: ComputedStyles;
  layout: LayoutMetrics;
  colors: ColorPalette;
  typography: TypographySnapshot;
  accessibility: AccessibilitySnapshot;
  hash: string;
}

/**
 * Computed styles for a component.
 */
export interface ComputedStyles {
  backgroundColor: string;
  color: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  lineHeight: string;
  padding: string;
  margin: string;
  border: string;
  borderRadius: string;
  boxShadow: string;
  display: string;
  position: string;
  width: string;
  height: string;
}

/**
 * Layout metrics for a component.
 */
export interface LayoutMetrics {
  width: number;
  height: number;
  x: number;
  y: number;
  scrollWidth: number;
  scrollHeight: number;
  offsetWidth: number;
  offsetHeight: number;
}

/**
 * Color palette extracted from component.
 */
export interface ColorPalette {
  primary: string[];
  background: string[];
  text: string[];
  borders: string[];
  all: string[];
}

/**
 * Typography snapshot.
 */
export interface TypographySnapshot {
  fontFamilies: string[];
  fontSizes: string[];
  fontWeights: string[];
  lineHeights: string[];
  textColors: string[];
}

/**
 * Accessibility snapshot.
 */
export interface AccessibilitySnapshot {
  ariaAttributes: Record<string, string>;
  tabIndex: number | null;
  role: string | null;
  hasAltText: boolean;
  hasLabel: boolean;
}

/**
 * Comparison result between two snapshots.
 */
export interface SnapshotComparison {
  componentName: string;
  hasChanges: boolean;
  changeCount: number;
  changes: VisualChange[];
  severity: 'none' | 'minor' | 'moderate' | 'major';
  summary: string;
}

/**
 * Individual visual change.
 */
export interface VisualChange {
  category: 'style' | 'layout' | 'color' | 'typography' | 'accessibility';
  property: string;
  oldValue: string | number;
  newValue: string | number;
  severity: 'minor' | 'moderate' | 'major';
  impact: string;
}

/**
 * Extract computed styles from an element.
 */
function extractComputedStyles(element: HTMLElement): ComputedStyles {
  const computed = window.getComputedStyle(element);
  
  return {
    backgroundColor: computed.backgroundColor,
    color: computed.color,
    fontSize: computed.fontSize,
    fontFamily: computed.fontFamily,
    fontWeight: computed.fontWeight,
    lineHeight: computed.lineHeight,
    padding: computed.padding,
    margin: computed.margin,
    border: computed.border,
    borderRadius: computed.borderRadius,
    boxShadow: computed.boxShadow,
    display: computed.display,
    position: computed.position,
    width: computed.width,
    height: computed.height,
  };
}

/**
 * Extract layout metrics from an element.
 */
function extractLayoutMetrics(element: HTMLElement): LayoutMetrics {
  const rect = element.getBoundingClientRect();
  
  return {
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y,
    scrollWidth: element.scrollWidth,
    scrollHeight: element.scrollHeight,
    offsetWidth: element.offsetWidth,
    offsetHeight: element.offsetHeight,
  };
}

/**
 * Extract colors from an element and its children.
 */
function extractColors(element: HTMLElement): ColorPalette {
  const colors: Set<string> = new Set();
  const primary: Set<string> = new Set();
  const background: Set<string> = new Set();
  const text: Set<string> = new Set();
  const borders: Set<string> = new Set();
  
  const processElement = (el: HTMLElement) => {
    const computed = window.getComputedStyle(el);
    
    // Background colors
    if (computed.backgroundColor && computed.backgroundColor !== 'rgba(0, 0, 0, 0)') {
      colors.add(computed.backgroundColor);
      background.add(computed.backgroundColor);
    }
    
    // Text colors
    if (computed.color) {
      colors.add(computed.color);
      text.add(computed.color);
    }
    
    // Border colors
    if (computed.borderColor && computed.borderColor !== 'rgb(0, 0, 0)') {
      colors.add(computed.borderColor);
      borders.add(computed.borderColor);
    }
    
    // Check for primary color usage (heuristic)
    const classes = el.className.toString();
    if (classes.includes('primary') || classes.includes('bg-primary')) {
      if (computed.backgroundColor) {
        primary.add(computed.backgroundColor);
      }
    }
  };
  
  // Process element and all children
  processElement(element);
  element.querySelectorAll('*').forEach((child) => {
    processElement(child as HTMLElement);
  });
  
  return {
    primary: Array.from(primary),
    background: Array.from(background),
    text: Array.from(text),
    borders: Array.from(borders),
    all: Array.from(colors),
  };
}

/**
 * Extract typography information.
 */
function extractTypography(element: HTMLElement): TypographySnapshot {
  const fontFamilies: Set<string> = new Set();
  const fontSizes: Set<string> = new Set();
  const fontWeights: Set<string> = new Set();
  const lineHeights: Set<string> = new Set();
  const textColors: Set<string> = new Set();
  
  const processElement = (el: HTMLElement) => {
    const computed = window.getComputedStyle(el);
    
    if (computed.fontFamily) fontFamilies.add(computed.fontFamily);
    if (computed.fontSize) fontSizes.add(computed.fontSize);
    if (computed.fontWeight) fontWeights.add(computed.fontWeight);
    if (computed.lineHeight) lineHeights.add(computed.lineHeight);
    if (computed.color) textColors.add(computed.color);
  };
  
  processElement(element);
  element.querySelectorAll('*').forEach((child) => {
    processElement(child as HTMLElement);
  });
  
  return {
    fontFamilies: Array.from(fontFamilies),
    fontSizes: Array.from(fontSizes),
    fontWeights: Array.from(fontWeights),
    lineHeights: Array.from(lineHeights),
    textColors: Array.from(textColors),
  };
}

/**
 * Extract accessibility information.
 */
function extractAccessibility(element: HTMLElement): AccessibilitySnapshot {
  const ariaAttributes: Record<string, string> = {};
  
  // Get all ARIA attributes
  Array.from(element.attributes).forEach(attr => {
    if (attr.name.startsWith('aria-')) {
      ariaAttributes[attr.name] = attr.value;
    }
  });
  
  return {
    ariaAttributes,
    tabIndex: element.tabIndex >= 0 ? element.tabIndex : null,
    role: element.getAttribute('role'),
    hasAltText: element.tagName === 'IMG' ? element.hasAttribute('alt') : false,
    hasLabel: element.hasAttribute('aria-label') || element.hasAttribute('aria-labelledby'),
  };
}

/**
 * Generate a hash for snapshot comparison.
 */
function generateHash(data: any): string {
  const str = JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return hash.toString(36);
}

/**
 * Create a snapshot of a component.
 * 
 * @param element - DOM element to snapshot
 * @param componentName - Name of the component
 * @returns Component snapshot
 * 
 * @example
 * ```tsx
 * const element = document.querySelector('.my-component');
 * const snapshot = createSnapshot(element, 'MyComponent');
 * 
 * // Store snapshot for later comparison
 * localStorage.setItem('MyComponent-snapshot', JSON.stringify(snapshot));
 * ```
 */
export function createSnapshot(
  element: HTMLElement,
  componentName: string
): ComponentSnapshot {
  const styles = extractComputedStyles(element);
  const layout = extractLayoutMetrics(element);
  const colors = extractColors(element);
  const typography = extractTypography(element);
  const accessibility = extractAccessibility(element);
  
  const snapshot: ComponentSnapshot = {
    componentName,
    timestamp: Date.now(),
    styles,
    layout,
    colors,
    typography,
    accessibility,
    hash: '',
  };
  
  // Generate hash after creating snapshot
  snapshot.hash = generateHash({
    styles,
    layout,
    colors,
    typography,
    accessibility,
  });
  
  return snapshot;
}

/**
 * Compare two snapshots and detect changes.
 * 
 * @param oldSnapshot - Original snapshot
 * @param newSnapshot - New snapshot to compare
 * @returns Comparison result with detected changes
 * 
 * @example
 * ```tsx
 * const oldSnapshot = JSON.parse(localStorage.getItem('MyComponent-snapshot'));
 * const newSnapshot = createSnapshot(element, 'MyComponent');
 * const comparison = compareSnapshots(oldSnapshot, newSnapshot);
 * 
 * if (comparison.hasChanges) {
 *   console.warn('Visual changes detected:', comparison.changes);
 * }
 * ```
 */
export function compareSnapshots(
  oldSnapshot: ComponentSnapshot,
  newSnapshot: ComponentSnapshot
): SnapshotComparison {
  const changes: VisualChange[] = [];
  
  // Compare styles
  Object.entries(oldSnapshot.styles).forEach(([property, oldValue]) => {
    const newValue = newSnapshot.styles[property as keyof ComputedStyles];
    
    if (oldValue !== newValue) {
      changes.push({
        category: 'style',
        property,
        oldValue,
        newValue,
        severity: determineStyleChangeSeverity(property, oldValue, newValue),
        impact: getStyleChangeImpact(property),
      });
    }
  });
  
  // Compare layout
  Object.entries(oldSnapshot.layout).forEach(([property, oldValue]) => {
    const newValue = newSnapshot.layout[property as keyof LayoutMetrics];
    
    // Allow small variations (< 2px)
    if (Math.abs(Number(oldValue) - Number(newValue)) >= 2) {
      changes.push({
        category: 'layout',
        property,
        oldValue,
        newValue,
        severity: determineLayoutChangeSeverity(property, oldValue as number, newValue as number),
        impact: getLayoutChangeImpact(property),
      });
    }
  });
  
  // Compare colors
  const colorChanges = compareColorPalettes(oldSnapshot.colors, newSnapshot.colors);
  changes.push(...colorChanges);
  
  // Compare typography
  const typoChanges = compareTypography(oldSnapshot.typography, newSnapshot.typography);
  changes.push(...typoChanges);
  
  // Compare accessibility
  const a11yChanges = compareAccessibility(oldSnapshot.accessibility, newSnapshot.accessibility);
  changes.push(...a11yChanges);
  
  // Determine overall severity
  const hasMajor = changes.some(c => c.severity === 'major');
  const hasModerate = changes.some(c => c.severity === 'moderate');
  const severity = hasMajor ? 'major' : hasModerate ? 'moderate' : changes.length > 0 ? 'minor' : 'none';
  
  // Generate summary
  const summary = generateSummary(changes, severity);
  
  return {
    componentName: newSnapshot.componentName,
    hasChanges: changes.length > 0,
    changeCount: changes.length,
    changes,
    severity,
    summary,
  };
}

/**
 * Determine severity of a style change.
 */
function determineStyleChangeSeverity(
  property: string,
  oldValue: string,
  newValue: string
): 'minor' | 'moderate' | 'major' {
  // Major changes
  if (property === 'display' || property === 'position') {
    return 'major';
  }
  
  // Moderate changes
  if (property === 'backgroundColor' || property === 'color' || property === 'fontSize') {
    return 'moderate';
  }
  
  // Minor changes
  return 'minor';
}

/**
 * Get impact description for style change.
 */
function getStyleChangeImpact(property: string): string {
  const impacts: Record<string, string> = {
    backgroundColor: 'Visual appearance changed',
    color: 'Text color changed, may affect readability',
    fontSize: 'Text size changed, may affect hierarchy',
    fontFamily: 'Font family changed',
    fontWeight: 'Font weight changed',
    padding: 'Spacing changed',
    margin: 'Layout spacing changed',
    border: 'Border styling changed',
    borderRadius: 'Corner rounding changed',
    display: 'Display mode changed, major layout impact',
    position: 'Positioning changed, major layout impact',
  };
  
  return impacts[property] || 'Style changed';
}

/**
 * Determine severity of a layout change.
 */
function determineLayoutChangeSeverity(
  property: string,
  oldValue: number,
  newValue: number
): 'minor' | 'moderate' | 'major' {
  const diff = Math.abs(oldValue - newValue);
  const percentChange = (diff / oldValue) * 100;
  
  // Major if size changed significantly
  if ((property === 'width' || property === 'height') && percentChange > 20) {
    return 'major';
  }
  
  // Moderate if position changed
  if ((property === 'x' || property === 'y') && diff > 10) {
    return 'moderate';
  }
  
  return 'minor';
}

/**
 * Get impact description for layout change.
 */
function getLayoutChangeImpact(property: string): string {
  const impacts: Record<string, string> = {
    width: 'Component width changed',
    height: 'Component height changed',
    x: 'Horizontal position changed',
    y: 'Vertical position changed',
    scrollWidth: 'Scrollable width changed',
    scrollHeight: 'Scrollable height changed',
  };
  
  return impacts[property] || 'Layout changed';
}

/**
 * Compare color palettes.
 */
function compareColorPalettes(
  oldColors: ColorPalette,
  newColors: ColorPalette
): VisualChange[] {
  const changes: VisualChange[] = [];
  
  // Check for new colors
  newColors.all.forEach(color => {
    if (!oldColors.all.includes(color)) {
      changes.push({
        category: 'color',
        property: 'new color',
        oldValue: 'none',
        newValue: color,
        severity: 'moderate',
        impact: 'New color introduced to component',
      });
    }
  });
  
  // Check for removed colors
  oldColors.all.forEach(color => {
    if (!newColors.all.includes(color)) {
      changes.push({
        category: 'color',
        property: 'removed color',
        oldValue: color,
        newValue: 'none',
        severity: 'moderate',
        impact: 'Color removed from component',
      });
    }
  });
  
  return changes;
}

/**
 * Compare typography.
 */
function compareTypography(
  oldTypo: TypographySnapshot,
  newTypo: TypographySnapshot
): VisualChange[] {
  const changes: VisualChange[] = [];
  
  // Compare font families
  if (oldTypo.fontFamilies.sort().join(',') !== newTypo.fontFamilies.sort().join(',')) {
    changes.push({
      category: 'typography',
      property: 'fontFamily',
      oldValue: oldTypo.fontFamilies.join(', '),
      newValue: newTypo.fontFamilies.join(', '),
      severity: 'major',
      impact: 'Font family changed, affects entire typography system',
    });
  }
  
  // Compare font sizes
  if (oldTypo.fontSizes.sort().join(',') !== newTypo.fontSizes.sort().join(',')) {
    changes.push({
      category: 'typography',
      property: 'fontSize',
      oldValue: oldTypo.fontSizes.length,
      newValue: newTypo.fontSizes.length,
      severity: 'moderate',
      impact: 'Font sizes changed, may affect hierarchy',
    });
  }
  
  return changes;
}

/**
 * Compare accessibility.
 */
function compareAccessibility(
  oldA11y: AccessibilitySnapshot,
  newA11y: AccessibilitySnapshot
): VisualChange[] {
  const changes: VisualChange[] = [];
  
  // Compare ARIA attributes
  const oldAria = JSON.stringify(oldA11y.ariaAttributes);
  const newAria = JSON.stringify(newA11y.ariaAttributes);
  
  if (oldAria !== newAria) {
    changes.push({
      category: 'accessibility',
      property: 'aria-attributes',
      oldValue: oldAria,
      newValue: newAria,
      severity: 'major',
      impact: 'ARIA attributes changed, affects accessibility',
    });
  }
  
  // Check for removed labels
  if (oldA11y.hasLabel && !newA11y.hasLabel) {
    changes.push({
      category: 'accessibility',
      property: 'label',
      oldValue: 'present',
      newValue: 'missing',
      severity: 'major',
      impact: 'Accessibility label removed, critical issue',
    });
  }
  
  return changes;
}

/**
 * Generate summary of changes.
 */
function generateSummary(changes: VisualChange[], severity: string): string {
  if (changes.length === 0) {
    return '✅ No visual changes detected';
  }
  
  const majorCount = changes.filter(c => c.severity === 'major').length;
  const moderateCount = changes.filter(c => c.severity === 'moderate').length;
  const minorCount = changes.filter(c => c.severity === 'minor').length;
  
  let summary = `⚠️ ${changes.length} visual change(s) detected: `;
  
  const parts: string[] = [];
  if (majorCount > 0) parts.push(`${majorCount} major`);
  if (moderateCount > 0) parts.push(`${moderateCount} moderate`);
  if (minorCount > 0) parts.push(`${minorCount} minor`);
  
  summary += parts.join(', ');
  
  return summary;
}

/**
 * Store snapshot to localStorage.
 */
export function saveSnapshot(snapshot: ComponentSnapshot): void {
  const key = `snapshot-${snapshot.componentName}`;
  localStorage.setItem(key, JSON.stringify(snapshot));
}

/**
 * Load snapshot from localStorage.
 */
export function loadSnapshot(componentName: string): ComponentSnapshot | null {
  const key = `snapshot-${componentName}`;
  const data = localStorage.getItem(key);
  
  if (!data) return null;
  
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to parse snapshot:', e);
    return null;
  }
}

/**
 * Clear all snapshots.
 */
export function clearAllSnapshots(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('snapshot-')) {
      localStorage.removeItem(key);
    }
  });
}

/**
 * Get all stored snapshots.
 */
export function getAllSnapshots(): ComponentSnapshot[] {
  const snapshots: ComponentSnapshot[] = [];
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith('snapshot-')) {
      const data = localStorage.getItem(key);
      if (data) {
        try {
          snapshots.push(JSON.parse(data));
        } catch (e) {
          console.error('Failed to parse snapshot:', e);
        }
      }
    }
  });
  
  return snapshots;
}

/**
 * Log comparison results to console.
 */
export function logComparisonResults(comparison: SnapshotComparison): void {
  console.group(`📸 Visual Regression Test: ${comparison.componentName}`);
  
  console.log(`Summary: ${comparison.summary}`);
  console.log(`Severity: ${comparison.severity}`);
  console.log(`Changes: ${comparison.changeCount}`);
  
  if (comparison.changes.length > 0) {
    console.group('\nDetected Changes:');
    
    const byCategory: Record<string, VisualChange[]> = {
      style: [],
      layout: [],
      color: [],
      typography: [],
      accessibility: [],
    };
    
    comparison.changes.forEach(change => {
      byCategory[change.category].push(change);
    });
    
    Object.entries(byCategory).forEach(([category, changes]) => {
      if (changes.length > 0) {
        console.group(`\n${category.toUpperCase()} (${changes.length})`);
        changes.forEach(change => {
          const icon = change.severity === 'major' ? '🔴' : change.severity === 'moderate' ? '🟡' : '⚪';
          console.log(`${icon} ${change.property}: ${change.oldValue} → ${change.newValue}`);
          console.log(`   Impact: ${change.impact}`);
        });
        console.groupEnd();
      }
    });
    
    console.groupEnd();
  }
  
  console.groupEnd();
}

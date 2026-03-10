/**
 * Design Token Helper Utilities
 * 
 * Helper functions to work with design tokens programmatically.
 * Useful for generating dynamic styles while maintaining design system compliance.
 * 
 * @module designTokenHelper
 * @category utils
 */

/**
 * Semantic color tokens available in the design system.
 */
export const semanticColors = {
  // Backgrounds
  background: 'bg-background',
  foreground: 'bg-foreground',
  card: 'bg-card',
  cardForeground: 'bg-card-foreground',
  popover: 'bg-popover',
  popoverForeground: 'bg-popover-foreground',
  primary: 'bg-primary',
  primaryForeground: 'bg-primary-foreground',
  secondary: 'bg-secondary',
  secondaryForeground: 'bg-secondary-foreground',
  muted: 'bg-muted',
  mutedForeground: 'bg-muted-foreground',
  accent: 'bg-accent',
  accentForeground: 'bg-accent-foreground',
  destructive: 'bg-destructive',
  destructiveForeground: 'bg-destructive-foreground',
  
  // Borders
  border: 'border-border',
  input: 'border-input',
  ring: 'ring-ring',
} as const;

/**
 * Text color tokens mapped to semantic names.
 */
export const textColors = {
  foreground: 'text-foreground',
  background: 'text-background',
  primary: 'text-primary',
  primaryForeground: 'text-primary-foreground',
  secondary: 'text-secondary',
  secondaryForeground: 'text-secondary-foreground',
  muted: 'text-muted-foreground',
  accent: 'text-accent-foreground',
  destructive: 'text-destructive-foreground',
  card: 'text-card-foreground',
  popover: 'text-popover-foreground',
} as const;

/**
 * Spacing scale tokens (Tailwind scale).
 */
export const spacing = {
  // Standard scale
  px: 'px',      // 1px
  0: '0',        // 0
  0.5: '0.5',    // 2px
  1: '1',        // 4px
  1.5: '1.5',    // 6px
  2: '2',        // 8px
  2.5: '2.5',    // 10px
  3: '3',        // 12px
  3.5: '3.5',    // 14px
  4: '4',        // 16px
  5: '5',        // 20px
  6: '6',        // 24px
  7: '7',        // 28px
  8: '8',        // 32px
  9: '9',        // 36px
  10: '10',      // 40px
  11: '11',      // 44px
  12: '12',      // 48px
  14: '14',      // 56px
  16: '16',      // 64px
  20: '20',      // 80px
  24: '24',      // 96px
  28: '28',      // 112px
  32: '32',      // 128px
  
  // Fluid spacing (CSS custom properties)
  sectionSm: 'section-sm',   // --spacing-section-sm
  sectionMd: 'section-md',   // --spacing-section-md
  sectionLg: 'section-lg',   // --spacing-section-lg
  elementSm: 'element-sm',   // --spacing-element-sm
  elementMd: 'element-md',   // --spacing-element-md
  elementLg: 'element-lg',   // --spacing-element-lg
} as const;

/**
 * Border radius tokens.
 */
export const radius = {
  none: 'rounded-none',      // 0
  sm: 'rounded-sm',          // var(--radius-sm) = 2px
  base: 'rounded',           // 4px
  md: 'rounded-md',          // var(--radius-md) = 4px
  lg: 'rounded-lg',          // var(--radius-lg) = 6px
  xl: 'rounded-xl',          // var(--radius-xl) = 8px
  '2xl': 'rounded-2xl',      // 16px
  '3xl': 'rounded-3xl',      // 24px
  full: 'rounded-full',      // 9999px
} as const;

/**
 * Shadow/elevation tokens.
 */
export const shadows = {
  none: 'shadow-none',
  sm: 'shadow-sm',           // var(--elevation-sm)
  base: 'shadow',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  '2xl': 'shadow-2xl',
  inner: 'shadow-inner',
} as const;

/**
 * Font family tokens (DO NOT USE - rely on semantic HTML instead).
 * These are provided for reference only.
 */
export const fontFamilies = {
  lora: 'var(--font-family-lora)',           // Serif - headings
  notoSans: 'var(--font-family-noto-sans)',  // Sans-serif - body
} as const;

/**
 * Font weight tokens.
 */
export const fontWeights = {
  normal: 'font-normal',     // 400
  medium: 'font-medium',     // 500
  semibold: 'font-semibold', // 600
  bold: 'font-bold',         // 700
} as const;

/**
 * Get a background color class with its corresponding text color.
 * 
 * @param bg - Background color name
 * @returns Object with background and text color classes
 * 
 * @example
 * ```tsx
 * const { bg, text } = getColorPair('primary');
 * <div className={`${bg} ${text}`}>Content</div>
 * // Result: <div className="bg-primary text-primary-foreground">Content</div>
 * ```
 */
export function getColorPair(
  bg: 'background' | 'card' | 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive'
): { bg: string; text: string } {
  const pairs = {
    background: { bg: 'bg-background', text: 'text-foreground' },
    card: { bg: 'bg-card', text: 'text-card-foreground' },
    primary: { bg: 'bg-primary', text: 'text-primary-foreground' },
    secondary: { bg: 'bg-secondary', text: 'text-secondary-foreground' },
    muted: { bg: 'bg-muted', text: 'text-muted-foreground' },
    accent: { bg: 'bg-accent', text: 'text-accent-foreground' },
    destructive: { bg: 'bg-destructive', text: 'text-destructive-foreground' },
  };
  
  return pairs[bg];
}

/**
 * Get padding class from spacing token.
 * 
 * @param size - Spacing size
 * @returns Padding class string
 * 
 * @example
 * ```tsx
 * <div className={getPadding(6)}>Content</div>
 * // Result: <div className="p-6">Content</div>
 * ```
 */
export function getPadding(size: keyof typeof spacing): string {
  const value = spacing[size];
  if (value.includes('-')) {
    return `py-${value}`; // Fluid spacing
  }
  return `p-${value}`;
}

/**
 * Get margin class from spacing token.
 * 
 * @param size - Spacing size
 * @returns Margin class string
 * 
 * @example
 * ```tsx
 * <div className={getMargin(4)}>Content</div>
 * // Result: <div className="m-4">Content</div>
 * ```
 */
export function getMargin(size: keyof typeof spacing): string {
  const value = spacing[size];
  if (value.includes('-')) {
    return `my-${value}`; // Fluid spacing
  }
  return `m-${value}`;
}

/**
 * Get gap class from spacing token.
 * 
 * @param size - Spacing size
 * @returns Gap class string
 * 
 * @example
 * ```tsx
 * <div className={`flex ${getGap(4)}`}>Content</div>
 * // Result: <div className="flex gap-4">Content</div>
 * ```
 */
export function getGap(size: keyof typeof spacing): string {
  const value = spacing[size];
  return `gap-${value}`;
}

/**
 * Common component style presets using design tokens.
 */
export const stylePresets = {
  // Card presets
  card: 'bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm',
  cardHover: 'bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow',
  cardInteractive: 'bg-card text-card-foreground p-6 rounded-lg border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer',
  
  // Button presets
  buttonPrimary: 'bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  buttonSecondary: 'bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/80 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  buttonGhost: 'hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring',
  buttonDestructive: 'bg-destructive text-destructive-foreground px-6 py-3 rounded-lg hover:bg-destructive/90 transition-colors focus-visible:ring-2 focus-visible:ring-ring',
  
  // Link presets
  link: 'text-primary hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  linkMuted: 'text-muted-foreground hover:text-foreground hover:underline transition-colors focus-visible:ring-2 focus-visible:ring-ring',
  
  // Input presets
  input: 'w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  textarea: 'w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px]',
  
  // Section presets
  section: 'bg-background text-foreground py-section-md',
  sectionMuted: 'bg-muted text-foreground py-section-md',
  sectionAccent: 'bg-accent text-accent-foreground py-section-md',
  
  // Container presets
  container: 'container mx-auto px-4',
  containerNarrow: 'max-w-3xl mx-auto px-4',
  containerWide: 'max-w-7xl mx-auto px-4',
  
  // Badge presets
  badge: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm',
  badgePrimary: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm',
  badgeSecondary: 'inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm',
  
  // Alert presets
  alert: 'p-4 rounded-lg bg-accent text-accent-foreground border border-accent/20',
  alertDestructive: 'p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20',
} as const;

/**
 * Get focus ring classes (for accessibility).
 * 
 * @returns Focus ring class string
 * 
 * @example
 * ```tsx
 * <button className={getFocusRing()}>Click me</button>
 * // Result: <button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
 * ```
 */
export function getFocusRing(): string {
  return 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
}

/**
 * Get hover state classes for interactive elements.
 * 
 * @param type - Type of hover effect
 * @returns Hover class string
 * 
 * @example
 * ```tsx
 * <div className={getHoverState('scale')}>Content</div>
 * // Result: <div className="hover:scale-105 transition-transform">
 * ```
 */
export function getHoverState(
  type: 'scale' | 'opacity' | 'bg' | 'border' | 'shadow'
): string {
  const states = {
    scale: 'hover:scale-105 transition-transform',
    opacity: 'hover:opacity-80 transition-opacity',
    bg: 'hover:bg-accent hover:text-accent-foreground transition-colors',
    border: 'hover:border-primary/50 transition-colors',
    shadow: 'hover:shadow-md transition-shadow',
  };
  
  return states[type];
}

/**
 * Get responsive grid classes.
 * 
 * @param cols - Number of columns at each breakpoint
 * @returns Grid class string
 * 
 * @example
 * ```tsx
 * <div className={getResponsiveGrid({ sm: 1, md: 2, lg: 3 })}>
 *   {/* Grid items */}
 * </div>
 * // Result: <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 * ```
 */
export function getResponsiveGrid(cols: {
  sm?: number;
  md?: number;
  lg?: number;
}): string {
  const classes = ['grid'];
  
  if (cols.sm) classes.push(`grid-cols-${cols.sm}`);
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
  
  classes.push('gap-6');
  
  return classes.join(' ');
}

/**
 * Check if we're in dark mode (client-side only).
 * 
 * @returns true if dark mode is active
 * 
 * @example
 * ```tsx
 * const isDark = isDarkMode();
 * console.log(isDark ? 'Dark mode' : 'Light mode');
 * ```
 */
export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return document.documentElement.classList.contains('dark');
}

/**
 * Get CSS variable value (client-side only).
 * 
 * @param varName - CSS variable name (without --)
 * @returns Variable value or empty string
 * 
 * @example
 * ```tsx
 * const primary = getCSSVariable('primary');
 * console.log(primary); // "110.47 65.22% 18.43%"
 * ```
 */
export function getCSSVariable(varName: string): string {
  if (typeof window === 'undefined') return '';
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${varName}`)
    .trim();
  return value;
}

/**
 * Generate component classes using design tokens.
 * 
 * @param base - Base classes
 * @param options - Additional options
 * @returns Combined class string
 * 
 * @example
 * ```tsx
 * const classes = generateClasses('card', {
 *   interactive: true,
 *   padding: 6,
 *   rounded: 'lg'
 * });
 * <div className={classes}>Content</div>
 * ```
 */
export function generateClasses(
  base: keyof typeof stylePresets,
  options?: {
    interactive?: boolean;
    padding?: keyof typeof spacing;
    rounded?: keyof typeof radius;
    shadow?: keyof typeof shadows;
  }
): string {
  const classes = [stylePresets[base]];
  
  if (options?.interactive) {
    classes.push('cursor-pointer');
    classes.push(getHoverState('shadow'));
  }
  
  if (options?.padding) {
    classes.push(getPadding(options.padding));
  }
  
  if (options?.rounded) {
    classes.push(radius[options.rounded]);
  }
  
  if (options?.shadow) {
    classes.push(shadows[options.shadow]);
  }
  
  return classes.join(' ');
}

/**
 * Utility to ensure all color pairs are accessible (WCAG AA compliant).
 * This is a type-safe helper for common color combinations.
 */
export const accessibleColorPairs = {
  // High contrast pairs (WCAG AAA)
  primary: getColorPair('primary'),
  secondary: getColorPair('secondary'),
  destructive: getColorPair('destructive'),
  
  // Standard contrast pairs (WCAG AA)
  card: getColorPair('card'),
  muted: getColorPair('muted'),
  accent: getColorPair('accent'),
  
  // Background
  default: getColorPair('background'),
} as const;

/**
 * Type-safe helper for generating accessible interactive elements.
 * 
 * @param variant - Button variant
 * @param size - Button size
 * @returns Class string for button
 * 
 * @example
 * ```tsx
 * <button className={getButtonClasses('primary', 'md')}>
 *   Click me
 * </button>
 * ```
 */
export function getButtonClasses(
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
): string {
  const variants = {
    primary: stylePresets.buttonPrimary,
    secondary: stylePresets.buttonSecondary,
    ghost: stylePresets.buttonGhost,
    destructive: stylePresets.buttonDestructive,
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Replace default padding with size-specific padding
  const baseClasses = variants[variant].replace(/px-\d+ py-\d+/, sizes[size]);
  
  return baseClasses;
}

/**
 * Helper to create responsive spacing classes.
 * 
 * @param base - Base spacing
 * @param md - Tablet spacing
 * @param lg - Desktop spacing
 * @returns Responsive spacing classes
 * 
 * @example
 * ```tsx
 * <div className={getResponsiveSpacing(4, 6, 8)}>
 *   Content with responsive padding
 * </div>
 * // Result: p-4 md:p-6 lg:p-8
 * ```
 */
export function getResponsiveSpacing(
  base: keyof typeof spacing,
  md?: keyof typeof spacing,
  lg?: keyof typeof spacing
): string {
  const classes = [getPadding(base)];
  
  if (md) classes.push(`md:${getPadding(md)}`);
  if (lg) classes.push(`lg:${getPadding(lg)}`);
  
  return classes.join(' ');
}

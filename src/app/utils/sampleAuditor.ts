/**
 * Sample Component Auditor
 * 
 * Runs real audits on actual components and provides detailed results.
 * This demonstrates the audit system with real examples.
 * 
 * @module sampleAuditor
 */

import { auditComponent, logComponentAudit } from './componentAuditor';
import { auditDarkMode, logDarkModeAudit } from './darkModeChecker';

// ============================================================================
// SAMPLE AUDIT RUNNER
// ============================================================================

/**
 * Run sample audits on key components with detailed reporting.
 */
export function runSampleAudits(): void {
  console.log('\n' + '═'.repeat(80));
  console.log('🎯 SAMPLE COMPONENT AUDITS - REAL RESULTS');
  console.log('═'.repeat(80) + '\n');

  console.log('This audit scans real components in the current page and provides:');
  console.log('✓ Color token compliance');
  console.log('✓ Typography adherence');
  console.log('✓ Spacing consistency');
  console.log('✓ Dark mode readiness');
  console.log('✓ Accessibility compliance\n');

  // Wait a moment for page to fully render
  setTimeout(() => {
    runHeaderAudit();
    runFooterAudit();
    runHeroAudit();
    runCardGridAudit();
    runCTAAudit();
    runOverallSummary();
  }, 100);
}

// ============================================================================
// INDIVIDUAL COMPONENT AUDITS
// ============================================================================

/**
 * Audit the Header component.
 */
function runHeaderAudit(): void {
  console.log('\n' + '─'.repeat(80));
  console.log('📋 AUDIT 1/5: HEADER COMPONENT');
  console.log('─'.repeat(80));

  const headerExists = document.querySelector('header');
  if (!headerExists) {
    console.log('⚠️  Header not found on this page');
    console.log('💡 Navigate to a page with a header to run this audit\n');
    return;
  }

  // Run comprehensive audit
  logComponentAudit('Header', 'header');
  
  // Run dark mode audit
  logDarkModeAudit('Header', 'header');

  // Provide specific recommendations
  console.group('🔧 HEADER-SPECIFIC FIXES');
  console.log('\nCommon Header Issues & Fixes:\n');
  
  console.log('1. Navigation Link Colors:');
  console.log('   ❌ BAD:  className="text-white dark:text-gray-200"');
  console.log('   ✅ GOOD: className="text-sidebar-foreground"');
  
  console.log('\n2. Header Background:');
  console.log('   ❌ BAD:  className="bg-gray-800 dark:bg-gray-900"');
  console.log('   ✅ GOOD: className="bg-sidebar"');
  
  console.log('\n3. Active Link State:');
  console.log('   ❌ BAD:  className="text-yellow-400 dark:text-yellow-300"');
  console.log('   ✅ GOOD: className="text-sidebar-primary"');
  
  console.log('\n4. Border Colors:');
  console.log('   ❌ BAD:  className="border-gray-600 dark:border-gray-700"');
  console.log('   ✅ GOOD: className="border-sidebar-border"');
  
  console.groupEnd();
}

/**
 * Audit the Footer component.
 */
function runFooterAudit(): void {
  console.log('\n' + '─'.repeat(80));
  console.log('📋 AUDIT 2/5: FOOTER COMPONENT');
  console.log('─'.repeat(80));

  const footerExists = document.querySelector('footer');
  if (!footerExists) {
    console.log('⚠️  Footer not found on this page');
    console.log('💡 Navigate to a page with a footer to run this audit\n');
    return;
  }

  logComponentAudit('Footer', 'footer');
  logDarkModeAudit('Footer', 'footer');

  console.group('🔧 FOOTER-SPECIFIC FIXES');
  console.log('\nCommon Footer Issues & Fixes:\n');
  
  console.log('1. Footer Background:');
  console.log('   ❌ BAD:  className="bg-gray-900 dark:bg-black"');
  console.log('   ✅ GOOD: className="bg-sidebar"');
  
  console.log('\n2. Footer Text:');
  console.log('   ❌ BAD:  className="text-gray-300 dark:text-gray-400"');
  console.log('   ✅ GOOD: className="text-sidebar-foreground"');
  
  console.log('\n3. Footer Links:');
  console.log('   ❌ BAD:  className="text-gray-400 hover:text-white dark:hover:text-gray-200"');
  console.log('   ✅ GOOD: className="text-sidebar-foreground hover:text-sidebar-primary"');
  
  console.groupEnd();
}

/**
 * Audit the Hero component.
 */
function runHeroAudit(): void {
  console.log('\n' + '─'.repeat(80));
  console.log('📋 AUDIT 3/5: HERO SECTION');
  console.log('─'.repeat(80));

  // Try multiple selectors for hero
  const heroSelectors = [
    '[class*="Hero"]',
    '[class*="hero"]',
    'section:first-of-type',
  ];

  let heroElement = null;
  let usedSelector = '';
  
  for (const selector of heroSelectors) {
    heroElement = document.querySelector(selector);
    if (heroElement) {
      usedSelector = selector;
      break;
    }
  }

  if (!heroElement) {
    console.log('⚠️  Hero section not found on this page');
    console.log('💡 Navigate to a page with a hero section to run this audit\n');
    return;
  }

  logComponentAudit('Hero Section', usedSelector);
  logDarkModeAudit('Hero Section', usedSelector);

  console.group('🔧 HERO-SPECIFIC FIXES');
  console.log('\nCommon Hero Issues & Fixes:\n');
  
  console.log('1. Hero Background:');
  console.log('   ❌ BAD:  className="bg-white dark:bg-gray-900"');
  console.log('   ✅ GOOD: className="bg-background"');
  
  console.log('\n2. Hero Title:');
  console.log('   ❌ BAD:  className="text-gray-900 dark:text-white font-bold text-5xl"');
  console.log('   ✅ GOOD: <h1>Title</h1> (let theme.css handle sizing/weight)');
  
  console.log('\n3. Hero Description:');
  console.log('   ❌ BAD:  className="text-gray-600 dark:text-gray-300 text-xl"');
  console.log('   ✅ GOOD: <p className="text-muted-foreground">Description</p>');
  
  console.log('\n4. Hero CTA Button:');
  console.log('   ❌ BAD:  className="bg-green-600 text-white dark:bg-green-700"');
  console.log('   ✅ GOOD: className="bg-primary text-primary-foreground"');
  
  console.groupEnd();
}

/**
 * Audit the Card Grid component.
 */
function runCardGridAudit(): void {
  console.log('\n' + '─'.repeat(80));
  console.log('📋 AUDIT 4/5: CARD GRID');
  console.log('─'.repeat(80));

  const cardGridSelectors = [
    '[class*="CardGrid"]',
    '[class*="grid"]',
    '.grid',
  ];

  let cardGridElement = null;
  let usedSelector = '';
  
  for (const selector of cardGridSelectors) {
    cardGridElement = document.querySelector(selector);
    if (cardGridElement) {
      usedSelector = selector;
      break;
    }
  }

  if (!cardGridElement) {
    console.log('⚠️  Card grid not found on this page');
    console.log('💡 Navigate to a page with cards to run this audit\n');
    return;
  }

  logComponentAudit('Card Grid', usedSelector);
  logDarkModeAudit('Card Grid', usedSelector);

  console.group('🔧 CARD-SPECIFIC FIXES');
  console.log('\nCommon Card Issues & Fixes:\n');
  
  console.log('1. Card Background:');
  console.log('   ❌ BAD:  className="bg-white dark:bg-gray-800"');
  console.log('   ✅ GOOD: className="bg-card"');
  
  console.log('\n2. Card Text:');
  console.log('   ❌ BAD:  className="text-gray-900 dark:text-white"');
  console.log('   ✅ GOOD: className="text-card-foreground"');
  
  console.log('\n3. Card Border:');
  console.log('   ❌ BAD:  className="border border-gray-200 dark:border-gray-700"');
  console.log('   ✅ GOOD: className="border border-border"');
  
  console.log('\n4. Card Hover State:');
  console.log('   ❌ BAD:  className="hover:bg-gray-50 dark:hover:bg-gray-750"');
  console.log('   ✅ GOOD: className="hover:bg-accent"');
  
  console.groupEnd();
}

/**
 * Audit the CTA component.
 */
function runCTAAudit(): void {
  console.log('\n' + '─'.repeat(80));
  console.log('📋 AUDIT 5/5: CTA SECTION');
  console.log('─'.repeat(80));

  const ctaSelectors = [
    '[class*="CTA"]',
    '[class*="cta"]',
    'section:last-of-type',
  ];

  let ctaElement = null;
  let usedSelector = '';
  
  for (const selector of ctaSelectors) {
    ctaElement = document.querySelector(selector);
    if (ctaElement) {
      usedSelector = selector;
      break;
    }
  }

  if (!ctaElement) {
    console.log('⚠️  CTA section not found on this page');
    console.log('💡 Navigate to a page with a CTA to run this audit\n');
    return;
  }

  logComponentAudit('CTA Section', usedSelector);
  logDarkModeAudit('CTA Section', usedSelector);

  console.group('🔧 CTA-SPECIFIC FIXES');
  console.log('\nCommon CTA Issues & Fixes:\n');
  
  console.log('1. CTA Background:');
  console.log('   ❌ BAD:  className="bg-green-700 dark:bg-green-800"');
  console.log('   ✅ GOOD: className="bg-primary"');
  
  console.log('\n2. CTA Text:');
  console.log('   ❌ BAD:  className="text-white"');
  console.log('   ✅ GOOD: className="text-primary-foreground"');
  
  console.log('\n3. CTA Button:');
  console.log('   ❌ BAD:  className="bg-yellow-400 text-gray-900 dark:bg-yellow-500"');
  console.log('   ✅ GOOD: className="bg-accent text-accent-foreground"');
  
  console.groupEnd();
}

/**
 * Provide overall summary and next steps.
 */
function runOverallSummary(): void {
  console.log('\n' + '═'.repeat(80));
  console.log('📊 AUDIT SUMMARY & NEXT STEPS');
  console.log('═'.repeat(80) + '\n');

  console.log('🎯 What These Audits Reveal:\n');
  console.log('• Color Token Usage: Are components using semantic tokens?');
  console.log('• Typography Compliance: Are fonts from theme.css (Lora/Noto Sans)?');
  console.log('• Spacing Consistency: Are components using Tailwind spacing scale?');
  console.log('• Dark Mode Readiness: Are components avoiding dark: overrides?');
  console.log('• Contrast Compliance: Do colors meet WCAG AA standards?\n');

  console.log('🔧 How to Fix Issues:\n');
  console.log('1. Replace hardcoded colors with semantic tokens');
  console.log('   Example: bg-gray-800 → bg-sidebar');
  console.log('');
  console.log('2. Remove dark: overrides and use auto-switching tokens');
  console.log('   Example: dark:bg-gray-900 → (remove, token handles it)');
  console.log('');
  console.log('3. Use semantic HTML for typography');
  console.log('   Example: <h2> instead of <div className="text-2xl font-bold">');
  console.log('');
  console.log('4. Use Tailwind spacing classes');
  console.log('   Example: className="p-6 gap-4" instead of style={{padding: "24px"}}');

  console.log('\n📚 Reference Documentation:\n');
  console.log('• /guidelines/design-tokens/colors.md - Color token reference');
  console.log('• /guidelines/design-tokens/typography.md - Font usage guide');
  console.log('• /guidelines/design-tokens/spacing.md - Spacing scale reference');
  console.log('• /DESIGN-SYSTEM-GUIDE.md - Complete design system guide');

  console.log('\n🚀 Run More Audits:\n');
  console.log('• logContrastReport() - Check all color contrasts');
  console.log('• logComplianceReport() - Check overall design system compliance');
  console.log('• logPerformanceMetrics() - Check performance metrics');
  console.log('• runSampleAudits() - Re-run this comprehensive audit');

  console.log('\n' + '═'.repeat(80) + '\n');
}

// ============================================================================
// PATTERN-SPECIFIC AUDIT EXAMPLES
// ============================================================================

/**
 * Example: How to fix a Hero component.
 */
export function showHeroFixExample(): void {
  console.log('\n' + '═'.repeat(80));
  console.log('🔧 DETAILED FIX EXAMPLE: HERO COMPONENT');
  console.log('═'.repeat(80) + '\n');

  console.log('❌ BEFORE (Antipattern - Hardcoded colors + dark mode overrides):\n');
  console.log(`
export function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Discover Amazing Tours
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Explore the world with our curated travel experiences
        </p>
        <button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white px-6 py-3 rounded">
          Browse Tours
        </button>
      </div>
    </section>
  );
}
  `);

  console.log('\n✅ AFTER (Best Practice - Semantic tokens + theme typography):\n');
  console.log(`
export function Hero() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-foreground mb-6">
          Discover Amazing Tours
        </h1>
        <p className="text-muted-foreground mb-8">
          Explore the world with our curated travel experiences
        </p>
        <button className="bg-primary hover:opacity-90 text-primary-foreground px-6 py-3 rounded">
          Browse Tours
        </button>
      </div>
    </section>
  );
}
  `);

  console.log('\n📋 Key Changes Explained:\n');
  console.log('1. Background: bg-white dark:bg-gray-900 → bg-background');
  console.log('   → Automatically switches between white (light) and #141414 (dark)');
  console.log('');
  console.log('2. Title: Removed text-5xl font-bold, let <h1> handle it');
  console.log('   → theme.css defines h1 styles automatically');
  console.log('');
  console.log('3. Title Color: text-gray-900 dark:text-white → text-foreground');
  console.log('   → Automatically switches between #090909 (light) and #f5f5f5 (dark)');
  console.log('');
  console.log('4. Description: text-gray-600 dark:text-gray-300 → text-muted-foreground');
  console.log('   → Automatically switches for subtle text');
  console.log('');
  console.log('5. Button: bg-green-600 dark:bg-green-700 → bg-primary');
  console.log('   → Uses brand primary color, same in both modes');
  console.log('');
  console.log('6. Button Hover: Removed dark: variant, use opacity-90');
  console.log('   → Simpler, works in both modes');

  console.log('\n💡 Benefits:\n');
  console.log('✓ 50% less code (no dark: overrides)');
  console.log('✓ Automatic dark mode support');
  console.log('✓ Consistent with design system');
  console.log('✓ Easier to maintain');
  console.log('✓ Better accessibility (semantic tokens ensure contrast)');

  console.log('\n' + '═'.repeat(80) + '\n');
}

/**
 * Example: How to fix a Card component.
 */
export function showCardFixExample(): void {
  console.log('\n' + '═'.repeat(80));
  console.log('🔧 DETAILED FIX EXAMPLE: CARD COMPONENT');
  console.log('═'.repeat(80) + '\n');

  console.log('❌ BEFORE (Antipattern):\n');
  console.log(`
export function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {tour.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {tour.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-green-600 dark:text-green-400 font-semibold">
            ${tour.price}
          </span>
          <button className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
  `);

  console.log('\n✅ AFTER (Best Practice):\n');
  console.log(`
export function TourCard({ tour }: { tour: Tour }) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-card-foreground mb-2">
          {tour.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {tour.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-semibold">
            ${tour.price}
          </span>
          <button className="bg-accent text-accent-foreground hover:opacity-90 px-4 py-2 rounded">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
  `);

  console.log('\n📋 Key Changes:\n');
  console.log('1. Card Background: bg-white dark:bg-gray-800 → bg-card');
  console.log('2. Card Border: border-gray-200 dark:border-gray-700 → border-border');
  console.log('3. Title: Removed size/weight, using <h3> + text-card-foreground');
  console.log('4. Description: text-gray-600 dark:text-gray-300 → text-muted-foreground');
  console.log('5. Price: text-green-600 dark:text-green-400 → text-primary');
  console.log('6. Button: bg-yellow-400 dark:bg-yellow-500 → bg-accent');

  console.log('\n' + '═'.repeat(80) + '\n');
}

/**
 * Example: How to fix navigation links.
 */
export function showNavigationFixExample(): void {
  console.log('\n' + '═'.repeat(80));
  console.log('🔧 DETAILED FIX EXAMPLE: NAVIGATION LINKS');
  console.log('═'.repeat(80) + '\n');

  console.log('❌ BEFORE (Antipattern):\n');
  console.log(`
export function Header() {
  return (
    <header className="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex gap-6">
          <li>
            <a href="/tours" className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-gray-200">
              Tours
            </a>
          </li>
          <li>
            <a href="/destinations" className="text-yellow-400 dark:text-yellow-300 font-semibold">
              Destinations (Active)
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
  `);

  console.log('\n✅ AFTER (Best Practice):\n');
  console.log(`
export function Header() {
  return (
    <header className="bg-sidebar border-b border-sidebar-border">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex gap-6">
          <li>
            <a href="/tours" className="text-sidebar-foreground hover:text-sidebar-primary">
              Tours
            </a>
          </li>
          <li>
            <a href="/destinations" className="text-sidebar-primary font-semibold">
              Destinations (Active)
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
  `);

  console.log('\n📋 Key Changes:\n');
  console.log('1. Header BG: bg-gray-800 dark:bg-gray-900 → bg-sidebar');
  console.log('2. Border: border-gray-700 dark:border-gray-800 → border-sidebar-border');
  console.log('3. Links: text-gray-300 dark:text-gray-400 → text-sidebar-foreground');
  console.log('4. Link Hover: hover:text-white dark:hover:text-gray-200 → hover:text-sidebar-primary');
  console.log('5. Active Link: text-yellow-400 dark:text-yellow-300 → text-sidebar-primary');

  console.log('\n💡 Sidebar Tokens Explained:\n');
  console.log('The --sidebar-* tokens are specifically for navigation areas:');
  console.log('• --sidebar: Background color for nav/header (#514b3a)');
  console.log('• --sidebar-foreground: Text color on sidebar (white)');
  console.log('• --sidebar-primary: Accent color for active/hover (#f7ae00)');
  console.log('• --sidebar-border: Border color (#ac9f7c)');

  console.log('\n' + '═'.repeat(80) + '\n');
}

// Auto-run sample audits when imported (optional)
// Uncomment to run audits automatically:
// if (typeof window !== 'undefined') {
//   runSampleAudits();
// }

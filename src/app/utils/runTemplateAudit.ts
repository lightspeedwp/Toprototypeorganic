/**
 * Run Template Audit
 * 
 * Automatically audits all template and page files for design system compliance.
 * Run this in the browser console to get a full audit report.
 * 
 * @module runTemplateAudit
 * @category utils
 */

import {
  detectHardcodedFontSizes,
  detectHardcodedColors,
  detectInvalidSpacing,
  detectBrokenLinks,
  generateAuditReport,
  logAuditReport,
  generateTaskList,
  type AuditIssue
} from './templateAuditor';

/**
 * List of all template and page files to audit
 */
const FILES_TO_AUDIT = [
  // Pages
  '/src/app/pages/HomePage.tsx',
  '/src/app/pages/AboutPage.tsx',
  '/src/app/pages/ContactPage.tsx',
  '/src/app/pages/FAQPage.tsx',
  '/src/app/pages/ToursArchive.tsx',
  '/src/app/pages/TourSingle.tsx',
  '/src/app/pages/DestinationsArchive.tsx',
  '/src/app/pages/DestinationSingle.tsx',
  '/src/app/pages/AccommodationArchive.tsx',
  '/src/app/pages/AccommodationSingle.tsx',
  '/src/app/pages/SpecialsArchive.tsx',
  '/src/app/pages/SpecialSingle.tsx',
  '/src/app/pages/TeamArchive.tsx',
  '/src/app/pages/ReviewsArchive.tsx',
  '/src/app/pages/ReviewsHubPage.tsx',
  '/src/app/pages/BlogArchive.tsx',
  '/src/app/pages/BlogSingle.tsx',
  '/src/app/pages/TaxonomyArchive.tsx',
  '/src/app/pages/DestinationGuidesHubPage.tsx',
  '/src/app/pages/PackingGuidesPage.tsx',
  '/src/app/pages/NewsletterSignupPage.tsx',
  '/src/app/pages/PrivacyPolicyPage.tsx',
  '/src/app/pages/TermsConditionsPage.tsx',
  '/src/app/pages/TravelInsurancePage.tsx',
  '/src/app/pages/WhyBookWithUsPage.tsx',
  '/src/app/pages/QuoteRequestPage.tsx',
  '/src/app/pages/TripPlannerPage.tsx',
  '/src/app/pages/SearchResultsPage.tsx',
  
  // Patterns
  '/src/app/components/patterns/Hero.tsx',
  '/src/app/components/patterns/CardGrid.tsx',
  '/src/app/components/patterns/CTA.tsx',
  '/src/app/components/patterns/FAQ.tsx',
  '/src/app/components/patterns/ArchiveHeader.tsx',
  '/src/app/components/patterns/TourCard.tsx',
  '/src/app/components/patterns/DestinationCard.tsx',
  '/src/app/components/patterns/AccommodationCard.tsx',
  '/src/app/components/patterns/SpecialCard.tsx',
  '/src/app/components/patterns/TeamCard.tsx',
  '/src/app/components/patterns/BlogCard.tsx',
  '/src/app/components/patterns/RelatedContent.tsx',
  '/src/app/components/patterns/FastFacts.tsx',
  '/src/app/components/patterns/EditorialContent.tsx',
  '/src/app/components/patterns/TaxonomyNav.tsx',
  '/src/app/components/patterns/Pagination.tsx',
  
  // Parts
  '/src/app/components/parts/Header.tsx',
  '/src/app/components/parts/Footer.tsx',
  
  // Dev Tools (for completeness)
  '/src/app/pages/DevToolsPage.tsx',
  '/src/app/pages/TemplateTester.tsx',
  '/src/app/pages/ComponentShowcase.tsx',
  '/src/app/pages/IconLibrary.tsx',
  '/src/app/pages/LivePreview.tsx',
  '/src/app/pages/StyleGuide.tsx'
];

/**
 * Mock function to simulate reading file content
 * In a real implementation, this would use fs or fetch
 */
async function readFileContent(filepath: string): Promise<string> {
  // This is a placeholder - in production, you'd read actual file content
  // For now, return empty string to demonstrate the structure
  console.log(`Reading ${filepath}...`);
  return '';
}

/**
 * Audits a single file
 */
export async function auditFile(filepath: string): Promise<AuditIssue[]> {
  const content = await readFileContent(filepath);
  const issues: AuditIssue[] = [];
  
  // Run all audit checks
  issues.push(...detectHardcodedFontSizes(content, filepath));
  issues.push(...detectHardcodedColors(content, filepath));
  issues.push(...detectInvalidSpacing(content, filepath));
  issues.push(...detectBrokenLinks(content, filepath));
  
  return issues;
}

/**
 * Audits all template files
 */
export async function auditAllTemplates(): Promise<void> {
  console.log('🔍 Starting Template Audit...\n');
  
  const allIssues: AuditIssue[] = [];
  
  for (const file of FILES_TO_AUDIT) {
    const issues = await auditFile(file);
    allIssues.push(...issues);
  }
  
  const report = generateAuditReport(allIssues);
  logAuditReport(report);
  
  // Generate task list
  const taskList = generateTaskList(report);
  
  console.log('\n📝 Task List Generated');
  console.log('Copy the following to create TEMPLATE-AUDIT-TASKS.md:\n');
  console.log(taskList);
  
  return;
}

/**
 * Run audit and export results
 */
export function runAudit(): void {
  console.log('🚀 Template Design System Audit');
  console.log('================================\n');
  
  auditAllTemplates().then(() => {
    console.log('\n✅ Audit Complete!');
  }).catch(error => {
    console.error('❌ Audit Failed:', error);
  });
}

// Auto-run in development
if (import.meta.env.DEV) {
  // Wait 3 seconds after page load to run audit
  setTimeout(() => {
    console.log('\n🔍 Auto-running template audit in development mode...\n');
    // Uncomment to enable auto-audit:
    // runAudit();
  }, 3000);
}

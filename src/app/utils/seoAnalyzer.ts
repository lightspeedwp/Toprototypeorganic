/**
 * SEO Analyzer
 * 
 * Comprehensive SEO auditing and optimization tool.
 * Analyzes meta tags, structured data, content, and technical SEO.
 * 
 * @module seoAnalyzer
 * @category utils
 */

/**
 * SEO analysis report.
 */
export interface SEOAnalysisReport {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  categories: {
    metaTags: SEOCategory;
    content: SEOCategory;
    technical: SEOCategory;
    social: SEOCategory;
    structuredData: SEOCategory;
  };
  issues: SEOIssue[];
  opportunities: SEOOpportunity[];
  keywordAnalysis: KeywordAnalysis;
  competitiveness: ContentCompetitiveness;
  timestamp: number;
}

/**
 * SEO category score.
 */
export interface SEOCategory {
  score: number;
  checks: SEOCheck[];
  passed: number;
  failed: number;
}

/**
 * Individual SEO check.
 */
export interface SEOCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  score: number;
  message: string;
  recommendation?: string;
  impact: 'high' | 'medium' | 'low';
}

/**
 * SEO issue.
 */
export interface SEOIssue {
  type: 'meta' | 'content' | 'technical' | 'social' | 'structured-data';
  severity: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  fix: string;
  impact: string;
}

/**
 * SEO opportunity.
 */
export interface SEOOpportunity {
  type: string;
  title: string;
  description: string;
  implementation: string;
  potentialImpact: 'high' | 'medium' | 'low';
}

/**
 * Keyword analysis.
 */
export interface KeywordAnalysis {
  primaryKeyword?: string;
  keywordDensity: number;
  keywordInTitle: boolean;
  keywordInDescription: boolean;
  keywordInH1: boolean;
  relatedKeywords: string[];
  recommendations: string[];
}

/**
 * Content competitiveness.
 */
export interface ContentCompetitiveness {
  wordCount: number;
  readabilityScore: number;
  uniqueness: number;
  engagement: {
    hasImages: boolean;
    hasVideos: boolean;
    hasLists: boolean;
    hasInternalLinks: boolean;
    hasExternalLinks: boolean;
  };
}

/**
 * Analyze meta tags.
 */
function analyzeMetaTags(): SEOCategory {
  const checks: SEOCheck[] = [];
  
  // Title tag
  const title = document.title;
  const titleLength = title.length;
  checks.push({
    name: 'Title Tag',
    status: titleLength === 0 ? 'fail' : titleLength < 30 || titleLength > 60 ? 'warning' : 'pass',
    score: titleLength === 0 ? 0 : titleLength < 30 || titleLength > 60 ? 70 : 100,
    message: titleLength === 0
      ? 'Missing title tag'
      : titleLength < 30
      ? `Title too short (${titleLength} chars) - aim for 50-60`
      : titleLength > 60
      ? `Title too long (${titleLength} chars) - may be truncated in search results`
      : `Title length optimal (${titleLength} chars)`,
    recommendation: 'Keep titles between 50-60 characters for optimal display',
    impact: 'high',
  });
  
  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  const descContent = metaDesc?.getAttribute('content') || '';
  const descLength = descContent.length;
  checks.push({
    name: 'Meta Description',
    status: descLength === 0 ? 'fail' : descLength < 120 || descLength > 160 ? 'warning' : 'pass',
    score: descLength === 0 ? 0 : descLength < 120 || descLength > 160 ? 70 : 100,
    message: descLength === 0
      ? 'Missing meta description'
      : descLength < 120
      ? `Description too short (${descLength} chars) - aim for 150-160`
      : descLength > 160
      ? `Description too long (${descLength} chars) - may be truncated`
      : `Description length optimal (${descLength} chars)`,
    recommendation: 'Keep descriptions between 150-160 characters',
    impact: 'high',
  });
  
  // Canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  checks.push({
    name: 'Canonical URL',
    status: canonical ? 'pass' : 'warning',
    score: canonical ? 100 : 75,
    message: canonical
      ? 'Canonical URL present'
      : 'No canonical URL - may cause duplicate content issues',
    recommendation: 'Add canonical URL to prevent duplicate content',
    impact: 'medium',
  });
  
  // Robots meta tag
  const robots = document.querySelector('meta[name="robots"]');
  const robotsContent = robots?.getAttribute('content') || '';
  const hasNoIndex = robotsContent.includes('noindex');
  const hasNoFollow = robotsContent.includes('nofollow');
  checks.push({
    name: 'Robots Meta Tag',
    status: hasNoIndex || hasNoFollow ? 'warning' : 'pass',
    score: hasNoIndex ? 50 : hasNoFollow ? 80 : 100,
    message: hasNoIndex
      ? 'Page set to noindex - will not be indexed by search engines'
      : hasNoFollow
      ? 'Page set to nofollow - links will not be followed'
      : 'Robots meta tag properly configured',
    recommendation: 'Remove noindex/nofollow for production pages',
    impact: hasNoIndex ? 'high' : 'medium',
  });
  
  // Viewport meta tag
  const viewport = document.querySelector('meta[name="viewport"]');
  checks.push({
    name: 'Viewport Meta Tag',
    status: viewport ? 'pass' : 'fail',
    score: viewport ? 100 : 0,
    message: viewport
      ? 'Viewport meta tag present'
      : 'Missing viewport meta tag - required for mobile SEO',
    recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
    impact: 'high',
  });
  
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0) / checks.length;
  
  return {
    score: Math.round(totalScore),
    checks,
    passed,
    failed,
  };
}

/**
 * Analyze content quality.
 */
function analyzeContent(): SEOCategory {
  const checks: SEOCheck[] = [];
  
  // Word count
  const text = document.body.textContent || '';
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  checks.push({
    name: 'Content Length',
    status: wordCount < 300 ? 'fail' : wordCount < 600 ? 'warning' : 'pass',
    score: wordCount < 300 ? 50 : wordCount < 600 ? 75 : 100,
    message: wordCount < 300
      ? `Content too short (${wordCount} words) - aim for 600+`
      : wordCount < 600
      ? `Content adequate (${wordCount} words) - 600+ is better`
      : `Good content length (${wordCount} words)`,
    recommendation: 'Aim for 600+ words for better SEO',
    impact: 'high',
  });
  
  // Heading structure
  const h1s = document.querySelectorAll('h1').length;
  const h2s = document.querySelectorAll('h2').length;
  checks.push({
    name: 'Heading Structure',
    status: h1s === 0 ? 'fail' : h1s > 1 ? 'warning' : h2s === 0 ? 'warning' : 'pass',
    score: h1s === 0 ? 0 : h1s > 1 ? 70 : h2s === 0 ? 80 : 100,
    message: h1s === 0
      ? 'No H1 heading - every page needs one'
      : h1s > 1
      ? `Multiple H1 headings (${h1s}) - use only one`
      : h2s === 0
      ? 'No H2 headings - add subheadings for better structure'
      : `Good heading structure (1 H1, ${h2s} H2s)`,
    recommendation: 'Use one H1 and multiple H2-H6 for structure',
    impact: 'high',
  });
  
  // Images with alt text
  const images = document.querySelectorAll('img');
  const imagesWithAlt = Array.from(images).filter(img => img.hasAttribute('alt'));
  const altTextScore = images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100;
  checks.push({
    name: 'Image Alt Text',
    status: images.length > 0 && altTextScore < 100 ? 'warning' : 'pass',
    score: Math.round(altTextScore),
    message: images.length === 0
      ? 'No images on page'
      : altTextScore === 100
      ? `All ${images.length} images have alt text`
      : `${imagesWithAlt.length}/${images.length} images have alt text`,
    recommendation: 'Add descriptive alt text to all images',
    impact: 'medium',
  });
  
  // Internal links
  const internalLinks = Array.from(document.querySelectorAll('a')).filter(a => {
    const href = a.getAttribute('href') || '';
    return href.startsWith('/') || href.includes(window.location.hostname);
  });
  checks.push({
    name: 'Internal Links',
    status: internalLinks.length < 3 ? 'warning' : 'pass',
    score: internalLinks.length < 3 ? 80 : 100,
    message: internalLinks.length === 0
      ? 'No internal links - add links to related content'
      : internalLinks.length < 3
      ? `Only ${internalLinks.length} internal links - add more`
      : `Good internal linking (${internalLinks.length} links)`,
    recommendation: 'Add 3-5 internal links to related content',
    impact: 'medium',
  });
  
  // External links
  const externalLinks = Array.from(document.querySelectorAll('a')).filter(a => {
    const href = a.getAttribute('href') || '';
    return href.startsWith('http') && !href.includes(window.location.hostname);
  });
  checks.push({
    name: 'External Links',
    status: externalLinks.length > 0 ? 'pass' : 'warning',
    score: externalLinks.length > 0 ? 100 : 85,
    message: externalLinks.length > 0
      ? `Good external linking (${externalLinks.length} links)`
      : 'No external links - consider adding authoritative sources',
    recommendation: 'Link to 1-2 authoritative external sources',
    impact: 'low',
  });
  
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0) / checks.length;
  
  return {
    score: Math.round(totalScore),
    checks,
    passed,
    failed,
  };
}

/**
 * Analyze technical SEO.
 */
function analyzeTechnicalSEO(): SEOCategory {
  const checks: SEOCheck[] = [];
  
  // HTTPS
  const isHTTPS = window.location.protocol === 'https:';
  checks.push({
    name: 'HTTPS',
    status: isHTTPS ? 'pass' : 'fail',
    score: isHTTPS ? 100 : 0,
    message: isHTTPS ? 'Site uses HTTPS' : 'Site not using HTTPS - critical for SEO',
    recommendation: 'Enable HTTPS for all pages',
    impact: 'high',
  });
  
  // Page load speed (simplified check)
  const resourceCount = performance.getEntriesByType('resource').length;
  checks.push({
    name: 'Resource Count',
    status: resourceCount > 100 ? 'warning' : 'pass',
    score: resourceCount > 100 ? 75 : 100,
    message: resourceCount > 100
      ? `Many resources (${resourceCount}) - may impact load speed`
      : `Resource count acceptable (${resourceCount})`,
    recommendation: 'Optimize and combine resources where possible',
    impact: 'medium',
  });
  
  // Mobile-friendly (viewport check)
  const viewport = document.querySelector('meta[name="viewport"]');
  checks.push({
    name: 'Mobile-Friendly',
    status: viewport ? 'pass' : 'fail',
    score: viewport ? 100 : 0,
    message: viewport
      ? 'Page is mobile-friendly'
      : 'No viewport meta tag - page may not be mobile-friendly',
    recommendation: 'Add viewport meta tag',
    impact: 'high',
  });
  
  // Structured data
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  checks.push({
    name: 'Structured Data',
    status: structuredData ? 'pass' : 'warning',
    score: structuredData ? 100 : 70,
    message: structuredData
      ? 'Structured data present'
      : 'No structured data - consider adding Schema.org markup',
    recommendation: 'Add JSON-LD structured data',
    impact: 'medium',
  });
  
  // Sitemap reference
  const sitemapLink = document.querySelector('link[rel="sitemap"]');
  checks.push({
    name: 'Sitemap',
    status: sitemapLink ? 'pass' : 'warning',
    score: sitemapLink ? 100 : 80,
    message: sitemapLink
      ? 'Sitemap linked'
      : 'No sitemap link - ensure sitemap.xml exists',
    recommendation: 'Add sitemap.xml and link in header',
    impact: 'medium',
  });
  
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0) / checks.length;
  
  return {
    score: Math.round(totalScore),
    checks,
    passed,
    failed,
  };
}

/**
 * Analyze social media optimization.
 */
function analyzeSocialMedia(): SEOCategory {
  const checks: SEOCheck[] = [];
  
  // Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  
  const ogScore = [ogTitle, ogDescription, ogImage, ogUrl].filter(Boolean).length * 25;
  checks.push({
    name: 'Open Graph Tags',
    status: ogScore === 100 ? 'pass' : ogScore > 0 ? 'warning' : 'fail',
    score: ogScore,
    message: ogScore === 100
      ? 'All Open Graph tags present'
      : ogScore > 0
      ? 'Some Open Graph tags missing'
      : 'No Open Graph tags - poor social media sharing',
    recommendation: 'Add og:title, og:description, og:image, og:url',
    impact: 'high',
  });
  
  // Twitter Card
  const twitterCard = document.querySelector('meta[name="twitter:card"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const twitterImage = document.querySelector('meta[name="twitter:image"]');
  
  const twitterScore = [twitterCard, twitterTitle, twitterDescription, twitterImage].filter(Boolean).length * 25;
  checks.push({
    name: 'Twitter Card Tags',
    status: twitterScore > 75 ? 'pass' : twitterScore > 0 ? 'warning' : 'fail',
    score: twitterScore,
    message: twitterScore > 75
      ? 'Twitter Card tags present'
      : twitterScore > 0
      ? 'Some Twitter Card tags missing'
      : 'No Twitter Card tags',
    recommendation: 'Add twitter:card, twitter:title, twitter:description, twitter:image',
    impact: 'medium',
  });
  
  // og:image dimensions check
  if (ogImage) {
    const ogImageUrl = ogImage.getAttribute('content') || '';
    checks.push({
      name: 'Social Image Present',
      status: ogImageUrl ? 'pass' : 'warning',
      score: ogImageUrl ? 100 : 70,
      message: ogImageUrl
        ? 'Social sharing image present'
        : 'Social sharing image URL empty',
      recommendation: 'Use 1200x630px images for best social media display',
      impact: 'medium',
    });
  }
  
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0) / checks.length;
  
  return {
    score: Math.round(totalScore),
    checks,
    passed,
    failed,
  };
}

/**
 * Analyze structured data.
 */
function analyzeStructuredData(): SEOCategory {
  const checks: SEOCheck[] = [];
  
  // Check for JSON-LD
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  checks.push({
    name: 'JSON-LD Structured Data',
    status: jsonLdScripts.length > 0 ? 'pass' : 'warning',
    score: jsonLdScripts.length > 0 ? 100 : 60,
    message: jsonLdScripts.length > 0
      ? `${jsonLdScripts.length} structured data blocks found`
      : 'No structured data - consider adding Schema.org markup',
    recommendation: 'Add JSON-LD for Organization, WebSite, or specific content types',
    impact: 'medium',
  });
  
  // Parse and validate JSON-LD
  if (jsonLdScripts.length > 0) {
    let validCount = 0;
    jsonLdScripts.forEach(script => {
      try {
        JSON.parse(script.textContent || '');
        validCount++;
      } catch (e) {
        // Invalid JSON
      }
    });
    
    checks.push({
      name: 'Valid JSON-LD Syntax',
      status: validCount === jsonLdScripts.length ? 'pass' : 'warning',
      score: validCount === jsonLdScripts.length ? 100 : 70,
      message: validCount === jsonLdScripts.length
        ? 'All JSON-LD is valid'
        : `${validCount}/${jsonLdScripts.length} JSON-LD blocks are valid`,
      recommendation: 'Validate JSON-LD using Google Rich Results Test',
      impact: 'medium',
    });
  }
  
  const passed = checks.filter(c => c.status === 'pass').length;
  const failed = checks.filter(c => c.status === 'fail').length;
  const totalScore = checks.reduce((sum, c) => sum + c.score, 0) / checks.length;
  
  return {
    score: Math.round(totalScore),
    checks,
    passed,
    failed,
  };
}

/**
 * Analyze keywords.
 */
function analyzeKeywords(): KeywordAnalysis {
  const text = document.body.textContent || '';
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  
  // Count word frequency
  const wordFreq = new Map<string, number>();
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });
  
  // Get top keywords
  const sortedWords = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  const primaryKeyword = sortedWords[0]?.[0];
  const keywordDensity = primaryKeyword
    ? ((wordFreq.get(primaryKeyword) || 0) / words.length) * 100
    : 0;
  
  const title = document.title.toLowerCase();
  const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content')?.toLowerCase() || '';
  const h1 = document.querySelector('h1')?.textContent?.toLowerCase() || '';
  
  return {
    primaryKeyword,
    keywordDensity,
    keywordInTitle: primaryKeyword ? title.includes(primaryKeyword) : false,
    keywordInDescription: primaryKeyword ? metaDesc.includes(primaryKeyword) : false,
    keywordInH1: primaryKeyword ? h1.includes(primaryKeyword) : false,
    relatedKeywords: sortedWords.slice(1, 6).map(w => w[0]),
    recommendations: [
      !primaryKeyword ? 'Add a clear focus keyword' : '',
      primaryKeyword && !title.includes(primaryKeyword) ? 'Include focus keyword in title' : '',
      primaryKeyword && !metaDesc.includes(primaryKeyword) ? 'Include focus keyword in meta description' : '',
      keywordDensity > 3 ? 'Keyword density too high (keyword stuffing) - reduce to 1-2%' : '',
    ].filter(Boolean),
  };
}

/**
 * Analyze content competitiveness.
 */
function analyzeCompetitiveness(): ContentCompetitiveness {
  const text = document.body.textContent || '';
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
  
  // Simple readability score (Flesch Reading Ease approximation)
  const sentences = text.split(/[.!?]+/).length;
  const syllables = text.split(/[aeiouy]+/).length;
  const avgWordsPerSentence = wordCount / sentences;
  const avgSyllablesPerWord = syllables / wordCount;
  const readabilityScore = Math.max(0, Math.min(100,
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
  ));
  
  return {
    wordCount,
    readabilityScore: Math.round(readabilityScore),
    uniqueness: 85, // Would need external API
    engagement: {
      hasImages: document.querySelectorAll('img').length > 0,
      hasVideos: document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0,
      hasLists: document.querySelectorAll('ul, ol').length > 0,
      hasInternalLinks: Array.from(document.querySelectorAll('a')).some(a => {
        const href = a.getAttribute('href') || '';
        return href.startsWith('/') || href.includes(window.location.hostname);
      }),
      hasExternalLinks: Array.from(document.querySelectorAll('a')).some(a => {
        const href = a.getAttribute('href') || '';
        return href.startsWith('http') && !href.includes(window.location.hostname);
      }),
    },
  };
}

/**
 * Run complete SEO analysis.
 * 
 * @returns SEO analysis report
 * 
 * @example
 * ```tsx
 * const report = analyzeSEO();
 * 
 * console.log(`SEO Score: ${report.overallScore}/100`);
 * console.log(`Grade: ${report.grade}`);
 * 
 * report.issues.forEach(issue => {
 *   console.error(`${issue.severity}: ${issue.message}`);
 *   console.log(`Fix: ${issue.fix}`);
 * });
 * ```
 */
export function analyzeSEO(): SEOAnalysisReport {
  const categories = {
    metaTags: analyzeMetaTags(),
    content: analyzeContent(),
    technical: analyzeTechnicalSEO(),
    social: analyzeSocialMedia(),
    structuredData: analyzeStructuredData(),
  };
  
  const overallScore = Math.round(
    (categories.metaTags.score +
     categories.content.score +
     categories.technical.score +
     categories.social.score +
     categories.structuredData.score) / 5
  );
  
  const grade: SEOAnalysisReport['grade'] =
    overallScore >= 95 ? 'A+' :
    overallScore >= 85 ? 'A' :
    overallScore >= 75 ? 'B' :
    overallScore >= 65 ? 'C' :
    overallScore >= 55 ? 'D' : 'F';
  
  // Collect issues
  const issues: SEOIssue[] = [];
  Object.values(categories).forEach(category => {
    category.checks.forEach(check => {
      if (check.status === 'fail' || (check.status === 'warning' && check.impact === 'high')) {
        issues.push({
          type: 'meta',
          severity: check.status === 'fail' ? 'critical' : check.impact === 'high' ? 'high' : 'medium',
          message: check.message,
          fix: check.recommendation || '',
          impact: `${check.impact} impact on SEO`,
        });
      }
    });
  });
  
  // Generate opportunities
  const opportunities: SEOOpportunity[] = [];
  
  if (categories.structuredData.score < 90) {
    opportunities.push({
      type: 'structured-data',
      title: 'Add Structured Data',
      description: 'Implement Schema.org markup to enhance search result appearance',
      implementation: 'Add JSON-LD for Organization, WebSite, Article, or Product',
      potentialImpact: 'high',
    });
  }
  
  if (categories.social.score < 80) {
    opportunities.push({
      type: 'social',
      title: 'Optimize Social Sharing',
      description: 'Complete Open Graph and Twitter Card tags for better social media presence',
      implementation: 'Add all required OG and Twitter meta tags',
      potentialImpact: 'medium',
    });
  }
  
  if (categories.content.score < 85) {
    opportunities.push({
      type: 'content',
      title: 'Improve Content Quality',
      description: 'Enhance content length, structure, and engagement elements',
      implementation: 'Add more comprehensive content, images, and internal links',
      potentialImpact: 'high',
    });
  }
  
  const keywordAnalysis = analyzeKeywords();
  const competitiveness = analyzeCompetitiveness();
  
  return {
    overallScore,
    grade,
    categories,
    issues,
    opportunities,
    keywordAnalysis,
    competitiveness,
    timestamp: Date.now(),
  };
}

/**
 * Log SEO analysis report to console.
 */
export function logSEOAnalysis(report: SEOAnalysisReport): void {
  console.group('🔍 SEO Analysis Report');
  
  console.log(`\n📊 Overall Score: ${report.overallScore}/100`);
  console.log(`🎯 Grade: ${report.grade}`);
  
  console.group('\nCategory Scores:');
  Object.entries(report.categories).forEach(([name, category]) => {
    const icon = category.score >= 85 ? '✅' : category.score >= 70 ? '⚠️' : '❌';
    console.log(`${icon} ${name}: ${category.score}/100`);
  });
  console.groupEnd();
  
  if (report.issues.length > 0) {
    console.group(`\n⚠️ Issues (${report.issues.length}):`);
    report.issues.forEach(issue => {
      console.warn(`${issue.severity.toUpperCase()}: ${issue.message}`);
      console.log(`  Fix: ${issue.fix}`);
    });
    console.groupEnd();
  }
  
  if (report.opportunities.length > 0) {
    console.group(`\n💡 Opportunities (${report.opportunities.length}):`);
    report.opportunities.forEach(opp => {
      console.log(`${opp.title} (${opp.potentialImpact} impact)`);
      console.log(`  ${opp.description}`);
      console.log(`  Implementation: ${opp.implementation}`);
    });
    console.groupEnd();
  }
  
  console.group('\n🔑 Keyword Analysis:');
  console.log(`Primary: ${report.keywordAnalysis.primaryKeyword || 'Not detected'}`);
  console.log(`Density: ${report.keywordAnalysis.keywordDensity.toFixed(2)}%`);
  console.log(`In Title: ${report.keywordAnalysis.keywordInTitle ? 'Yes' : 'No'}`);
  console.log(`In Description: ${report.keywordAnalysis.keywordInDescription ? 'Yes' : 'No'}`);
  console.log(`In H1: ${report.keywordAnalysis.keywordInH1 ? 'Yes' : 'No'}`);
  console.groupEnd();
  
  console.groupEnd();
}

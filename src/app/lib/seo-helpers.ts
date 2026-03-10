/**
 * SEO Helper Utilities
 * 
 * Utilities for optimizing SEO across the application.
 * 
 * **Features:**
 * - Title optimization
 * - Description generation
 * - Keyword extraction
 * - URL slug generation
 * - Image alt text generation
 * - Readability scoring
 * 
 * @module seo-helpers
 * @category lib
 */

/**
 * Generate optimized page title.
 * 
 * **Rules:**
 * - Keep under 60 characters
 * - Include primary keyword
 * - Add brand name
 * - Use pipe separator
 * 
 * @param title - Page title
 * @param siteName - Site/brand name
 * @param maxLength - Maximum character length (default: 60)
 * @returns Optimized title string
 * 
 * @example
 * ```ts
 * generatePageTitle("Iceland Explorer Tour", "Arctic Adventures")
 * // Returns: "Iceland Explorer Tour | Arctic Adventures"
 * 
 * generatePageTitle("Very Long Tour Name That Exceeds Limit", "Arctic Adventures", 60)
 * // Returns: "Very Long Tour Name That Exceeds... | Arctic Adventures"
 * ```
 */
export function generatePageTitle(
  title: string,
  siteName: string,
  maxLength: number = 60
): string {
  const separator = " | ";
  const fullTitle = `${title}${separator}${siteName}`;

  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }

  // Truncate title to fit
  const availableLength = maxLength - separator.length - siteName.length - 3; // -3 for "..."
  const truncatedTitle = title.substring(0, availableLength) + "...";
  
  return `${truncatedTitle}${separator}${siteName}`;
}

/**
 * Generate optimized meta description.
 * 
 * **Rules:**
 * - Keep between 120-160 characters
 * - Include primary keyword
 * - Include call-to-action
 * - End with complete sentence
 * 
 * @param description - Raw description
 * @param maxLength - Maximum character length (default: 160)
 * @returns Optimized description string
 * 
 * @example
 * ```ts
 * generateMetaDescription("Explore Iceland's stunning landscapes on this 8-day tour...", 160)
 * // Returns: Truncated to 160 chars with complete sentence
 * ```
 */
export function generateMetaDescription(
  description: string,
  maxLength: number = 160
): string {
  if (description.length <= maxLength) {
    return description;
  }

  // Find last complete sentence within limit
  const truncated = description.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf(".");
  const lastExclamation = truncated.lastIndexOf("!");
  const lastQuestion = truncated.lastIndexOf("?");
  
  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);

  if (lastSentenceEnd > maxLength * 0.7) {
    // Use sentence if it's not too short
    return description.substring(0, lastSentenceEnd + 1);
  }

  // Otherwise, truncate at word boundary
  const lastSpace = truncated.lastIndexOf(" ");
  return description.substring(0, lastSpace) + "...";
}

/**
 * Generate URL-friendly slug.
 * 
 * @param text - Text to convert to slug
 * @returns URL-friendly slug
 * 
 * @example
 * ```ts
 * generateSlug("Iceland Explorer Tour")
 * // Returns: "iceland-explorer-tour"
 * 
 * generateSlug("Best Tours in 2024!")
 * // Returns: "best-tours-in-2024"
 * ```
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Extract keywords from text.
 * 
 * @param text - Text to extract keywords from
 * @param count - Number of keywords to extract (default: 10)
 * @returns Array of keywords
 * 
 * @example
 * ```ts
 * extractKeywords("Iceland tour adventure glacier hiking", 3)
 * // Returns: ["iceland", "tour", "adventure"]
 * ```
 */
export function extractKeywords(text: string, count: number = 10): string[] {
  // Common stop words to exclude
  const stopWords = new Set([
    "a", "an", "and", "are", "as", "at", "be", "by", "for", "from",
    "has", "he", "in", "is", "it", "its", "of", "on", "that", "the",
    "to", "was", "will", "with", "the", "this", "but", "they", "have",
    "had", "what", "when", "where", "who", "which", "why", "how",
  ]);

  // Split into words and clean
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !stopWords.has(word));

  // Count word frequency
  const frequency: Record<string, number> = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word);
}

/**
 * Generate image alt text.
 * 
 * @param context - Image context (title, location, etc.)
 * @param maxLength - Maximum character length (default: 125)
 * @returns Alt text string
 * 
 * @example
 * ```ts
 * generateImageAlt({ title: "Glacier Hike", location: "Iceland" })
 * // Returns: "Glacier Hike in Iceland"
 * ```
 */
export function generateImageAlt(
  context: {
    title?: string;
    location?: string;
    description?: string;
  },
  maxLength: number = 125
): string {
  const parts: string[] = [];

  if (context.title) parts.push(context.title);
  if (context.location) parts.push(`in ${context.location}`);
  if (context.description && parts.length === 0) parts.push(context.description);

  let alt = parts.join(" ");

  if (alt.length > maxLength) {
    alt = alt.substring(0, maxLength - 3) + "...";
  }

  return alt;
}

/**
 * Calculate readability score (Flesch Reading Ease).
 * 
 * @param text - Text to analyze
 * @returns Readability score (0-100, higher is easier)
 * 
 * @example
 * ```ts
 * const score = calculateReadability("Simple short sentences. Easy to read.");
 * // Returns: ~80 (easy to read)
 * ```
 */
export function calculateReadability(text: string): number {
  // Count sentences
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = sentences.length;

  if (sentenceCount === 0) return 0;

  // Count words
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  // Count syllables (approximation)
  const syllableCount = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);

  // Flesch Reading Ease formula
  const score =
    206.835 -
    1.015 * (wordCount / sentenceCount) -
    84.6 * (syllableCount / wordCount);

  // Clamp between 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Count syllables in a word (approximation).
 */
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;

  const vowels = "aeiouy";
  let syllables = 0;
  let previousWasVowel = false;

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i]);
    if (isVowel && !previousWasVowel) {
      syllables++;
    }
    previousWasVowel = isVowel;
  }

  // Silent 'e'
  if (word.endsWith("e")) {
    syllables--;
  }

  return Math.max(1, syllables);
}

/**
 * Get readability interpretation.
 * 
 * @param score - Readability score (0-100)
 * @returns Interpretation string
 * 
 * @example
 * ```ts
 * getReadabilityLevel(80)
 * // Returns: "Easy to read"
 * ```
 */
export function getReadabilityLevel(score: number): string {
  if (score >= 90) return "Very easy to read";
  if (score >= 80) return "Easy to read";
  if (score >= 70) return "Fairly easy to read";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly difficult";
  if (score >= 30) return "Difficult";
  return "Very difficult";
}

/**
 * Validate SEO requirements for content.
 * 
 * @param content - Content to validate
 * @returns Validation result with issues
 * 
 * @example
 * ```ts
 * const result = validateSEO({
 *   title: "Iceland Tour",
 *   description: "Join our Iceland adventure...",
 *   content: "Lorem ipsum...",
 * });
 * // Returns: { valid: true, issues: [] }
 * ```
 */
export function validateSEO(content: {
  title: string;
  description: string;
  content: string;
  keywords?: string[];
  imageAlt?: string[];
}): {
  valid: boolean;
  issues: string[];
  warnings: string[];
  score: number;
} {
  const issues: string[] = [];
  const warnings: string[] = [];
  let score = 100;

  // Title validation
  if (!content.title) {
    issues.push("Missing page title");
    score -= 20;
  } else if (content.title.length < 30) {
    warnings.push("Title is too short (< 30 characters)");
    score -= 5;
  } else if (content.title.length > 60) {
    issues.push("Title is too long (> 60 characters)");
    score -= 10;
  }

  // Description validation
  if (!content.description) {
    issues.push("Missing meta description");
    score -= 20;
  } else if (content.description.length < 120) {
    warnings.push("Description is too short (< 120 characters)");
    score -= 5;
  } else if (content.description.length > 160) {
    issues.push("Description is too long (> 160 characters)");
    score -= 10;
  }

  // Content validation
  if (!content.content || content.content.length < 300) {
    warnings.push("Content is too short (< 300 words recommended)");
    score -= 10;
  }

  // Keyword validation
  if (!content.keywords || content.keywords.length === 0) {
    warnings.push("No keywords defined");
    score -= 5;
  }

  // Image alt text validation
  if (!content.imageAlt || content.imageAlt.length === 0) {
    warnings.push("No image alt text provided");
    score -= 5;
  }

  // Readability check
  const readability = calculateReadability(content.content);
  if (readability < 50) {
    warnings.push("Content readability is low (difficult to read)");
    score -= 5;
  }

  return {
    valid: issues.length === 0,
    issues,
    warnings,
    score: Math.max(0, score),
  };
}

/**
 * Generate canonical URL.
 * 
 * @param path - Page path
 * @param baseUrl - Base URL
 * @returns Canonical URL
 * 
 * @example
 * ```ts
 * generateCanonicalUrl("/tours/iceland", "https://example.com")
 * // Returns: "https://example.com/tours/iceland"
 * ```
 */
export function generateCanonicalUrl(path: string, baseUrl: string): string {
  // Remove trailing slash from base URL
  const cleanBase = baseUrl.replace(/\/$/, "");
  
  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${cleanBase}${cleanPath}`;
}

/**
 * Extract content preview for social sharing.
 * 
 * @param content - Full content
 * @param maxLength - Maximum length (default: 200)
 * @returns Preview text
 * 
 * @example
 * ```ts
 * extractContentPreview("Long article text...", 100)
 * // Returns: Truncated preview at 100 chars
 * ```
 */
export function extractContentPreview(
  content: string,
  maxLength: number = 200
): string {
  // Remove HTML tags
  const cleanContent = content.replace(/<[^>]*>/g, " ");
  
  // Remove extra whitespace
  const normalized = cleanContent.replace(/\s+/g, " ").trim();
  
  if (normalized.length <= maxLength) {
    return normalized;
  }

  // Truncate at word boundary
  const truncated = normalized.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  
  return normalized.substring(0, lastSpace) + "...";
}

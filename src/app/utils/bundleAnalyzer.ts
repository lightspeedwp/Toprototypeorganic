/**
 * Bundle Analyzer Utility
 * 
 * Analyzes JavaScript bundle size and composition.
 * Provides insights into bundle optimization opportunities.
 * 
 * **Features:**
 * - Script size analysis
 * - Dependency tracking
 * - Compression ratio estimation
 * - Performance recommendations
 * - Visual size breakdown
 * 
 * @module bundleAnalyzer
 * @category utils
 */

/**
 * Script entry information.
 */
interface ScriptEntry {
  url: string;
  size: number;
  type: string;
  async: boolean;
  defer: boolean;
  module: boolean;
}

/**
 * Bundle analysis results.
 */
interface BundleAnalysis {
  totalSize: number;
  totalSizeKB: number;
  totalSizeMB: number;
  scriptCount: number;
  scripts: ScriptEntry[];
  largestScript: ScriptEntry | null;
  recommendations: string[];
}

/**
 * Size thresholds (in KB).
 */
const SIZE_THRESHOLDS = {
  singleScript: 200, // Single script should be < 200KB
  totalBundle: 500, // Total bundle should be < 500KB
  critical: 50, // Critical scripts should be < 50KB
};

/**
 * Format bytes to human-readable size.
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Estimate compressed size (gzip).
 * 
 * Rough estimation: gzip typically compresses text by 70-80%.
 */
function estimateCompressedSize(size: number): number {
  return Math.round(size * 0.3); // Assume 70% compression
}

/**
 * Get script size via Performance API.
 */
function getScriptSize(url: string): Promise<number> {
  return new Promise((resolve) => {
    const resource = performance.getEntriesByType("resource").find(
      (entry: any) => entry.name === url && entry.initiatorType === "script"
    ) as any;
    
    if (resource && resource.transferSize) {
      resolve(resource.transferSize);
    } else {
      // Fallback: try to fetch the script
      fetch(url, { method: "HEAD" })
        .then((response) => {
          const contentLength = response.headers.get("content-length");
          resolve(contentLength ? parseInt(contentLength, 10) : 0);
        })
        .catch(() => resolve(0));
    }
  });
}

/**
 * Analyze all scripts on the page.
 */
async function analyzeScripts(): Promise<ScriptEntry[]> {
  const scripts = Array.from(document.querySelectorAll("script[src]"));
  const entries: ScriptEntry[] = [];
  
  for (const script of scripts) {
    const url = (script as HTMLScriptElement).src;
    const size = await getScriptSize(url);
    
    entries.push({
      url,
      size,
      type: (script as HTMLScriptElement).type || "text/javascript",
      async: (script as HTMLScriptElement).async,
      defer: (script as HTMLScriptElement).defer,
      module: (script as HTMLScriptElement).type === "module",
    });
  }
  
  return entries;
}

/**
 * Generate recommendations based on analysis.
 */
function generateRecommendations(analysis: BundleAnalysis): string[] {
  const recommendations: string[] = [];
  
  // Total bundle size
  if (analysis.totalSizeKB > SIZE_THRESHOLDS.totalBundle) {
    recommendations.push(
      `Total bundle size (${formatBytes(analysis.totalSize)}) exceeds recommended ${
        SIZE_THRESHOLDS.totalBundle
      }KB. Consider code splitting.`
    );
  }
  
  // Large individual scripts
  const largeScripts = analysis.scripts.filter(
    (s) => s.size / 1024 > SIZE_THRESHOLDS.singleScript
  );
  
  if (largeScripts.length > 0) {
    recommendations.push(
      `${largeScripts.length} script(s) exceed ${SIZE_THRESHOLDS.singleScript}KB. Consider splitting large bundles.`
    );
  }
  
  // Non-async/defer scripts
  const blockingScripts = analysis.scripts.filter((s) => !s.async && !s.defer && !s.module);
  
  if (blockingScripts.length > 0) {
    recommendations.push(
      `${blockingScripts.length} render-blocking script(s) found. Add async or defer attributes.`
    );
  }
  
  // Compression
  const estimatedCompressed = estimateCompressedSize(analysis.totalSize);
  const compressionRatio = ((1 - estimatedCompressed / analysis.totalSize) * 100).toFixed(1);
  
  recommendations.push(
    `Enable gzip/brotli compression for ~${compressionRatio}% size reduction (estimated ${formatBytes(
      estimatedCompressed
    )}).`
  );
  
  // Module vs non-module
  const moduleScripts = analysis.scripts.filter((s) => s.module);
  const nonModuleScripts = analysis.scripts.filter((s) => !s.module);
  
  if (nonModuleScripts.length > moduleScripts.length) {
    recommendations.push(
      `Consider using ES modules (type="module") for better tree-shaking and code splitting.`
    );
  }
  
  // General optimization tips
  if (analysis.scriptCount > 10) {
    recommendations.push(`${analysis.scriptCount} scripts loaded. Consider bundling to reduce HTTP requests.`);
  }
  
  return recommendations;
}

/**
 * Run bundle analysis.
 */
export async function runBundleAnalysis(): Promise<BundleAnalysis> {
  console.log("📦 Analyzing JavaScript bundle...");
  
  const scripts = await analyzeScripts();
  const totalSize = scripts.reduce((sum, script) => sum + script.size, 0);
  const largestScript = scripts.reduce((largest, script) =>
    script.size > (largest?.size || 0) ? script : largest
  , null as ScriptEntry | null);
  
  const analysis: BundleAnalysis = {
    totalSize,
    totalSizeKB: totalSize / 1024,
    totalSizeMB: totalSize / (1024 * 1024),
    scriptCount: scripts.length,
    scripts: scripts.sort((a, b) => b.size - a.size),
    largestScript,
    recommendations: [],
  };
  
  analysis.recommendations = generateRecommendations(analysis);
  
  return analysis;
}

/**
 * Log bundle analysis to console.
 */
export async function logBundleAnalysis(): Promise<void> {
  const analysis = await runBundleAnalysis();
  
  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║              BUNDLE ANALYSIS REPORT                          ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
  
  console.log("📊 Bundle Summary:");
  console.log(`  Total Size: ${formatBytes(analysis.totalSize)} (${analysis.totalSizeKB.toFixed(2)} KB)`);
  console.log(`  Total Scripts: ${analysis.scriptCount}`);
  
  if (analysis.largestScript) {
    console.log(`  Largest Script: ${formatBytes(analysis.largestScript.size)}`);
  }
  
  console.log("\n");
  
  // Script breakdown
  console.log("📦 Scripts by Size:");
  analysis.scripts.forEach((script, index) => {
    const sizeKB = script.size / 1024;
    const emoji = sizeKB > SIZE_THRESHOLDS.singleScript ? "🔴" : sizeKB > SIZE_THRESHOLDS.critical ? "🟡" : "🟢";
    const fileName = script.url.split("/").pop() || script.url;
    const attributes = [];
    
    if (script.async) attributes.push("async");
    if (script.defer) attributes.push("defer");
    if (script.module) attributes.push("module");
    
    const attrString = attributes.length > 0 ? ` [${attributes.join(", ")}]` : "";
    
    console.log(`  ${emoji} ${index + 1}. ${fileName} - ${formatBytes(script.size)}${attrString}`);
    
    // Show URL for top 5 largest
    if (index < 5) {
      console.log(`     ${script.url}`);
    }
  });
  
  console.log("\n");
  
  // Size breakdown chart (ASCII)
  console.log("📊 Size Distribution:");
  const maxSize = analysis.largestScript?.size || 1;
  analysis.scripts.slice(0, 10).forEach((script, index) => {
    const fileName = script.url.split("/").pop() || `Script ${index + 1}`;
    const percentage = (script.size / maxSize) * 100;
    const barLength = Math.round(percentage / 2);
    const bar = "█".repeat(barLength) + "░".repeat(50 - barLength);
    const sizeKB = (script.size / 1024).toFixed(2);
    
    console.log(`  ${fileName.padEnd(30)} ${bar} ${sizeKB} KB`);
  });
  
  console.log("\n");
  
  // Compression estimate
  const estimatedCompressed = estimateCompressedSize(analysis.totalSize);
  const compressionRatio = ((1 - estimatedCompressed / analysis.totalSize) * 100).toFixed(1);
  
  console.log("🗜️  Compression Estimate:");
  console.log(`  Uncompressed: ${formatBytes(analysis.totalSize)}`);
  console.log(`  Compressed (gzip): ~${formatBytes(estimatedCompressed)} (-${compressionRatio}%)`);
  console.log("\n");
  
  // Loading strategy
  console.log("⚡ Loading Strategy:");
  const asyncScripts = analysis.scripts.filter((s) => s.async);
  const deferScripts = analysis.scripts.filter((s) => s.defer);
  const moduleScripts = analysis.scripts.filter((s) => s.module);
  const blockingScripts = analysis.scripts.filter((s) => !s.async && !s.defer && !s.module);
  
  console.log(`  Async Scripts: ${asyncScripts.length}`);
  console.log(`  Defer Scripts: ${deferScripts.length}`);
  console.log(`  Module Scripts: ${moduleScripts.length}`);
  console.log(`  Blocking Scripts: ${blockingScripts.length} ${blockingScripts.length > 0 ? "⚠️" : "✅"}`);
  console.log("\n");
  
  // Recommendations
  if (analysis.recommendations.length > 0) {
    console.log("💡 Recommendations:");
    analysis.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    console.log("\n");
  }
  
  // Overall assessment
  const totalKB = analysis.totalSizeKB;
  let assessment = "";
  let emoji = "";
  
  if (totalKB < SIZE_THRESHOLDS.critical) {
    assessment = "Excellent! Bundle size is very small.";
    emoji = "🎉";
  } else if (totalKB < SIZE_THRESHOLDS.totalBundle) {
    assessment = "Good! Bundle size is within recommended limits.";
    emoji = "✅";
  } else if (totalKB < SIZE_THRESHOLDS.totalBundle * 2) {
    assessment = "Bundle size could be optimized.";
    emoji = "⚠️";
  } else {
    assessment = "Bundle size needs significant optimization.";
    emoji = "🔴";
  }
  
  console.log(`${emoji} ${assessment}`);
  console.log("\n════════════════════════════════════════════════════════════════\n");
}

/**
 * Auto-run in development mode.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      logBundleAnalysis();
    }, 3500);
  });
}

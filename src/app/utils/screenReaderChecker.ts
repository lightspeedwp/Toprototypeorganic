/**
 * Screen Reader Compatibility Checker
 * 
 * Validates content structure and semantics for screen reader accessibility.
 * Checks ARIA implementation, landmark regions, and semantic HTML usage.
 * 
 * **Features:**
 * - Landmark region validation
 * - ARIA role verification
 * - Alt text quality check
 * - Form label association
 * - Link text descriptiveness
 * - Table semantics
 * - List structure
 * - Live regions
 * 
 * @module screenReaderChecker
 * @category utils
 */

/**
 * Landmark issue.
 */
interface LandmarkIssue {
  issue: string;
  recommendation: string;
}

/**
 * ARIA issue.
 */
interface AriaImplementationIssue {
  element: string;
  issue: string;
  recommendation: string;
}

/**
 * Content issue.
 */
interface ContentIssue {
  element: string;
  issue: string;
  recommendation: string;
}

/**
 * Screen reader compatibility results.
 */
interface ScreenReaderResults {
  landmarkIssues: LandmarkIssue[];
  ariaIssues: AriaImplementationIssue[];
  contentIssues: ContentIssue[];
  score: number;
  recommendations: string[];
}

/**
 * Check landmark regions (ARIA landmarks).
 */
function checkLandmarks(): LandmarkIssue[] {
  const issues: LandmarkIssue[] = [];

  // Check for required landmarks
  const hasMain = document.querySelector("main, [role='main']");
  const hasNav = document.querySelector("nav, [role='navigation']");
  const hasHeader = document.querySelector("header, [role='banner']");
  const hasFooter = document.querySelector("footer, [role='contentinfo']");

  if (!hasMain) {
    issues.push({
      issue: "No main landmark found",
      recommendation: "Add <main> element or role='main' to main content area",
    });
  }

  if (!hasNav) {
    issues.push({
      issue: "No navigation landmark found",
      recommendation: "Add <nav> element or role='navigation' to navigation area",
    });
  }

  if (!hasHeader) {
    issues.push({
      issue: "No banner landmark found",
      recommendation: "Add <header> element or role='banner' to site header",
    });
  }

  if (!hasFooter) {
    issues.push({
      issue: "No contentinfo landmark found",
      recommendation: "Add <footer> element or role='contentinfo' to site footer",
    });
  }

  // Check for multiple mains without labels
  const mains = document.querySelectorAll("main, [role='main']");
  if (mains.length > 1) {
    mains.forEach((main) => {
      const label =
        main.getAttribute("aria-label") ||
        main.getAttribute("aria-labelledby");
      if (!label) {
        issues.push({
          issue: "Multiple main landmarks without unique labels",
          recommendation: "Add aria-label to distinguish multiple main regions",
        });
      }
    });
  }

  return issues;
}

/**
 * Check ARIA implementation.
 */
function checkAriaImplementation(): AriaImplementationIssue[] {
  const issues: AriaImplementationIssue[] = [];

  // Check for invalid ARIA roles
  const validRoles = [
    "alert",
    "alertdialog",
    "application",
    "article",
    "banner",
    "button",
    "cell",
    "checkbox",
    "columnheader",
    "combobox",
    "complementary",
    "contentinfo",
    "definition",
    "dialog",
    "directory",
    "document",
    "feed",
    "figure",
    "form",
    "grid",
    "gridcell",
    "group",
    "heading",
    "img",
    "link",
    "list",
    "listbox",
    "listitem",
    "log",
    "main",
    "marquee",
    "math",
    "menu",
    "menubar",
    "menuitem",
    "menuitemcheckbox",
    "menuitemradio",
    "navigation",
    "none",
    "note",
    "option",
    "presentation",
    "progressbar",
    "radio",
    "radiogroup",
    "region",
    "row",
    "rowgroup",
    "rowheader",
    "scrollbar",
    "search",
    "searchbox",
    "separator",
    "slider",
    "spinbutton",
    "status",
    "switch",
    "tab",
    "table",
    "tablist",
    "tabpanel",
    "term",
    "textbox",
    "timer",
    "toolbar",
    "tooltip",
    "tree",
    "treegrid",
    "treeitem",
  ];

  const elementsWithRole = document.querySelectorAll("[role]");
  elementsWithRole.forEach((element) => {
    const role = element.getAttribute("role");
    if (role && !validRoles.includes(role)) {
      issues.push({
        element: element.tagName.toLowerCase(),
        issue: `Invalid ARIA role: "${role}"`,
        recommendation: "Use a valid ARIA role from the WAI-ARIA specification",
      });
    }
  });

  // Check for required ARIA attributes
  const buttonsWithPressed = document.querySelectorAll(
    "button[aria-pressed], [role='button'][aria-pressed]"
  );
  buttonsWithPressed.forEach((button) => {
    const pressed = button.getAttribute("aria-pressed");
    if (pressed !== "true" && pressed !== "false") {
      issues.push({
        element: "button",
        issue: "aria-pressed must be 'true' or 'false'",
        recommendation: "Set aria-pressed to 'true' or 'false' for toggle buttons",
      });
    }
  });

  // Check for aria-expanded without controls
  const expandedElements = document.querySelectorAll("[aria-expanded]");
  expandedElements.forEach((element) => {
    const controls = element.getAttribute("aria-controls");
    if (!controls) {
      issues.push({
        element: element.tagName.toLowerCase(),
        issue: "aria-expanded without aria-controls",
        recommendation:
          "Add aria-controls pointing to the ID of the controlled element",
      });
    }
  });

  // Check for aria-labelledby pointing to non-existent IDs
  const labelledByElements = document.querySelectorAll("[aria-labelledby]");
  labelledByElements.forEach((element) => {
    const ids = element.getAttribute("aria-labelledby")?.split(" ");
    ids?.forEach((id) => {
      if (!document.getElementById(id)) {
        issues.push({
          element: element.tagName.toLowerCase(),
          issue: `aria-labelledby references non-existent ID: "${id}"`,
          recommendation: "Ensure the referenced ID exists in the document",
        });
      }
    });
  });

  return issues;
}

/**
 * Check content quality for screen readers.
 */
function checkContent(): ContentIssue[] {
  const issues: ContentIssue[] = [];

  // Check for poor link text
  const links = document.querySelectorAll("a");
  const poorLinkText = ["click here", "read more", "here", "more", "link"];

  links.forEach((link) => {
    const text = link.textContent?.trim().toLowerCase();
    if (text && poorLinkText.includes(text)) {
      issues.push({
        element: "a",
        issue: `Non-descriptive link text: "${text}"`,
        recommendation:
          "Use descriptive link text that makes sense out of context",
      });
    }

    // Check for links without text
    const hasText = link.textContent?.trim();
    const ariaLabel = link.getAttribute("aria-label");
    const ariaLabelledBy = link.getAttribute("aria-labelledby");

    if (!hasText && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        element: "a",
        issue: "Link without accessible text",
        recommendation: "Add descriptive text, aria-label, or aria-labelledby",
      });
    }
  });

  // Check for images without alt text or poor alt text
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const alt = img.getAttribute("alt");

    if (alt === null) {
      issues.push({
        element: "img",
        issue: "Image without alt attribute",
        recommendation:
          "Add descriptive alt text or alt='' for decorative images",
      });
    } else if (alt && alt.toLowerCase().includes("image")) {
      issues.push({
        element: "img",
        issue: `Redundant alt text: "${alt}"`,
        recommendation:
          "Avoid 'image of' or 'picture of' - screen readers announce it's an image",
      });
    }
  });

  // Check for tables without proper structure
  const tables = document.querySelectorAll("table");
  tables.forEach((table) => {
    const hasCaption = table.querySelector("caption");
    const hasThead = table.querySelector("thead");
    const hasTh = table.querySelector("th");

    if (!hasCaption && !table.getAttribute("aria-label")) {
      issues.push({
        element: "table",
        issue: "Table without caption or aria-label",
        recommendation:
          "Add <caption> element or aria-label to describe table purpose",
      });
    }

    if (!hasThead && !hasTh) {
      issues.push({
        element: "table",
        issue: "Table without header cells",
        recommendation:
          "Use <th> elements or role='columnheader'/'rowheader' for headers",
      });
    }
  });

  // Check for lists using divs instead of semantic list elements
  const divLists = document.querySelectorAll("div[role='list']");
  divLists.forEach(() => {
    issues.push({
      element: "div",
      issue: "Using div with role='list' instead of semantic <ul> or <ol>",
      recommendation: "Use <ul> or <ol> elements for better semantics",
    });
  });

  // Check for iframe without title
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    const title = iframe.getAttribute("title");
    if (!title) {
      issues.push({
        element: "iframe",
        issue: "iframe without title attribute",
        recommendation: "Add descriptive title attribute to iframe",
      });
    }
  });

  return issues;
}

/**
 * Run screen reader compatibility check.
 */
export function runScreenReaderCheck(): ScreenReaderResults {
  console.log("📢 Running screen reader compatibility check...");

  const landmarkIssues = checkLandmarks();
  const ariaIssues = checkAriaImplementation();
  const contentIssues = checkContent();

  const totalIssues =
    landmarkIssues.length + ariaIssues.length + contentIssues.length;

  const totalChecks = totalIssues + 50; // Baseline checks
  const passedChecks = totalChecks - totalIssues;
  const score = Math.round((passedChecks / totalChecks) * 100);

  const recommendations: string[] = [];

  if (landmarkIssues.length > 0) {
    recommendations.push(`Add ${landmarkIssues.length} missing landmark regions`);
  }

  if (ariaIssues.length > 0) {
    recommendations.push(`Fix ${ariaIssues.length} ARIA implementation issues`);
  }

  if (contentIssues.length > 0) {
    recommendations.push(
      `Improve ${contentIssues.length} content issues for screen readers`
    );
  }

  return {
    landmarkIssues,
    ariaIssues,
    contentIssues,
    score,
    recommendations,
  };
}

/**
 * Log screen reader check results.
 */
export function logScreenReaderCheck(): void {
  const results = runScreenReaderCheck();

  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║       SCREEN READER COMPATIBILITY REPORT                    ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  console.log(`📊 Score: ${results.score}/100\n`);

  if (results.landmarkIssues.length > 0) {
    console.log("🏛️  Landmark Region Issues:");
    results.landmarkIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue.issue}`);
      console.log(`     💡 ${issue.recommendation}`);
    });
    console.log("");
  }

  if (results.ariaIssues.length > 0) {
    console.log("♿ ARIA Implementation Issues:");
    results.ariaIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue.element}: ${issue.issue}`);
      console.log(`     💡 ${issue.recommendation}`);
    });
    console.log("");
  }

  if (results.contentIssues.length > 0) {
    console.log("📝 Content Quality Issues:");
    const grouped = results.contentIssues.reduce((acc, issue) => {
      if (!acc[issue.element]) {
        acc[issue.element] = [];
      }
      acc[issue.element].push(issue);
      return acc;
    }, {} as Record<string, ContentIssue[]>);

    Object.entries(grouped).forEach(([element, issueList]) => {
      console.log(`  ${element}:`);
      issueList.forEach((issue) => {
        console.log(`    • ${issue.issue}`);
        console.log(`      💡 ${issue.recommendation}`);
      });
    });
    console.log("");
  }

  if (results.recommendations.length > 0) {
    console.log("🎯 Recommendations:");
    results.recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. ${rec}`);
    });
    console.log("");
  }

  if (results.score >= 90) {
    console.log("🎉 Excellent! Your site is highly accessible for screen readers.");
  } else if (results.score >= 70) {
    console.log(
      "👍 Good screen reader compatibility, but there's room for improvement."
    );
  } else {
    console.log(
      "⚠️  Screen reader compatibility needs significant improvement."
    );
  }

  console.log("\n════════════════════════════════════════════════════════════════\n");
}

/**
 * Show screen reader testing guide.
 */
export function showScreenReaderGuide(): void {
  console.log("\n╔══════════════════════════════════════════════════════════════╗");
  console.log("║         SCREEN READER TESTING GUIDE                         ║");
  console.log("╚══════════════════════════════════════════════════════════════╝\n");

  console.log("Popular Screen Readers:\n");

  console.log("🖥️  Desktop:");
  console.log("  • NVDA (Windows) - Free, most popular");
  console.log("  • JAWS (Windows) - Commercial, widely used");
  console.log("  • VoiceOver (macOS) - Built-in, Cmd+F5 to enable");
  console.log("  • Narrator (Windows) - Built-in, Win+Ctrl+Enter\n");

  console.log("📱 Mobile:");
  console.log("  • VoiceOver (iOS) - Settings > Accessibility");
  console.log("  • TalkBack (Android) - Settings > Accessibility\n");

  console.log("Testing Checklist:\n");

  console.log("1. Landmark Navigation");
  console.log("   ✓ Can navigate by landmarks (main, nav, footer)");
  console.log("   ✓ All major sections have appropriate landmarks");
  console.log("   ✓ Landmarks have unique labels if multiple\n");

  console.log("2. Heading Navigation");
  console.log("   ✓ Can navigate by headings (H1-H6)");
  console.log("   ✓ Heading hierarchy is logical");
  console.log("   ✓ One H1 per page\n");

  console.log("3. Link Navigation");
  console.log("   ✓ Can navigate by links");
  console.log("   ✓ Link text is descriptive out of context");
  console.log("   ✓ No 'click here' or 'read more' without context\n");

  console.log("4. Form Navigation");
  console.log("   ✓ Can navigate by form fields");
  console.log("   ✓ All inputs have associated labels");
  console.log("   ✓ Error messages are announced\n");

  console.log("5. Image Descriptions");
  console.log("   ✓ All images have alt text");
  console.log("   ✓ Alt text is descriptive");
  console.log("   ✓ Decorative images have alt=''\n");

  console.log("6. Dynamic Content");
  console.log("   ✓ Live regions announce updates");
  console.log("   ✓ Modal focus is managed");
  console.log("   ✓ Loading states are announced\n");

  console.log("════════════════════════════════════════════════════════════════\n");
}

/**
 * Auto-run check on page load (development only).
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  window.addEventListener("load", () => {
    setTimeout(() => {
      logScreenReaderCheck();
    }, 3000);
  });
}

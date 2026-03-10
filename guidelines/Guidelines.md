# Figma Make Prototype Guidelines

**Version:** V3 — WordPress-Native Alignment (Structure, Composition, Tokens)

---

# ⚠️⚠️⚠️ STOP - READ THIS FIRST ⚠️⚠️⚠️

## 🚨 BEFORE GENERATING ANY UI - READ THIS DOCUMENT 🚨

### **📖 [/docs/MUST-READ-FIRST.md](/docs/MUST-READ-FIRST.md)** ← **READ NOW!**

**This 1-page document contains THE TWO NON-NEGOTIABLE RULES:**

1. **RULE #1:** Use CSS variables ONLY (no hardcoded colors/fonts)
2. **RULE #2:** Use ONLY 5 fonts (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)

**If you skip this, your component WILL be rejected!** ❌

---

## 🚨 **CRITICAL: STYLING & COMPLIANCE RULES**

### **⚠️ ZERO MARGIN & ORGANIC WRAPPER POLICY ⚠️**

1. ✅ **Zero Margin Policy:** ALL elements must rely on flex/grid gaps or specific padding. You MUST NOT use margin utilities (e.g., `mb-4`, `mt-8`, `my-6`, `mx-auto`) to separate elements. Use layout components or CSS grid/flex spacing instead.
2. ✅ **Organic Wrappers:** Use specific organic section wrappers (`organic-section-top`, `organic-section-middle`, `organic-section-bottom`) for page layout sections. Do not use plain `<section>` or `<div>` for the primary sections of a page.
3. ✅ **Use design tokens:** Colors, spacing, typography must come from `/styles/global.css` and the Tailwind config.

### **⚠️ ZERO TOLERANCE: INLINE STYLES ⚠️**

**The use of inline `style={{ }}` attributes is STRICTLY PROHIBITED** for all production components and pages.

1. ✅ **ALWAYS use CSS Classes** - All styling must be defined in external `.css` files using BEM conventions.
2. ✅ **ALWAYS use Design Tokens** - Reference CSS variables (e.g., `var(--primary)`) exclusively.
3. ✅ **EXEMPTIONS:**
   - motion/react `style` prop for dynamic animation values (e.g., `<motion.div style={{ y }} />`).
   - Dynamic CSS Custom Properties for state-driven styling (e.g., `style={{ '--dynamic-color': color } as React.CSSProperties}`).
4. ❌ **NEVER hardcode values** in JSX or CSS files.

---

## 🚨🚨🚨 MANDATORY DESIGN SYSTEM ENFORCEMENT 🚨🚨🚨

### **⚠️ RUN THIS COMMAND BEFORE GENERATING ANY UI ⚠️**

```bash
./scripts/pre-generation-check.sh
```

**This interactive script will verify you understand:**
1. ✅ Must use CSS variables for ALL styling
2. ✅ Must use ONLY defined fonts (Lora, Noto Sans, Courier New, Caveat, Shadows Into Light)
3. ✅ Must create external CSS files
4. ✅ Must use BEM naming convention
5. ✅ Must avoid hardcoded colors
6. ✅ Must avoid inline styles
7. ✅ Must avoid dark: classes

**📖 MANDATORY READING:**
- **[/docs/DESIGN-SYSTEM-MANDATORY.md](/docs/DESIGN-SYSTEM-MANDATORY.md)** ← Complete enforcement guide
- **[/docs/START-HERE.md](/docs/START-HERE.md)** ← Visual guide with examples
- **[/docs/CSS-VARIABLES-COMPLETE.md](/docs/CSS-VARIABLES-COMPLETE.md)** ← All 80+ CSS variables

**If you skip these, your component WILL be rejected!** ❌

---

## 🛑 **STOP! READ THIS FIRST!** 🛑

### **⚠️ MANDATORY - BEFORE GENERATING ANY UI ⚠️**

**📖 READ NOW: [/docs/START-HERE.md](/docs/START-HERE.md)** ← **CRITICAL DOCUMENT!**

This document contains:
- ✅ All CSS variables you can use
- ✅ What you MUST do (CSS variables, defined fonts, external CSS)
- ✅ What you MUST NOT do (hardcoded colors/fonts, inline styles, dark: classes)
- ✅ Complete component generation workflow
- ✅ Quick verification checklist
- ✅ Perfect component example

**If you skip this document, your component WILL fail compliance!**

---

## 🚨 **CRITICAL: DESIGN SYSTEM ENFORCEMENT**

### **⚠️ MANDATORY - READ BEFORE GENERATING ANY UI ⚠️**

**BEFORE generating ANY UI component, you MUST read:**
📖 **[/docs/UI-GENERATION-RULES.md](/docs/UI-GENERATION-RULES.md)** - Mandatory rules & available CSS variables
📖 **[/docs/START-HERE.md](/docs/START-HERE.md)** - Visual enforcement guide with examples

**ALL UI generation MUST strictly follow these rules:**

1. ✅ **USE CSS VARIABLES ONLY** - No hardcoded colors, fonts, spacing, borders, radius, shadows
2. ✅ **USE DEFINED FONTS ONLY** - Lora (serif), Noto Sans (sans-serif), Courier New (monospace), Caveat (handwriting), Shadows Into Light (handwriting)
3. ✅ **FOLLOW BEM NAMING** - `.wp-part-*`, `.wp-pattern-*`, `.wp-card-*`
4. ✅ **NO INLINE STYLES** - All styling via external CSS files
5. ✅ **NO dark: CLASSES** - CSS variables handle dark mode automatically

**❌ NEVER:**
- Hardcode colors: `background-color: #548235` or `color: white`
- Hardcode fonts: `font-family: "Arial"` or `font-family: "Helvetica"`
- Use inline styles: `style={{ backgroundColor: 'white' }}`
- Use dark: classes: `dark:bg-slate-800` or `dark:text-white`
- Use non-semantic HTML: `<div className="heading">` instead of `<h2>`

**✅ ALWAYS:**
- Use CSS variables: `background-color: var(--primary)`
- Use defined fonts: `font-family: var(--font-family-lora)`
- Use defined fonts: `font-family: var(--font-family-lora)`
- Use external CSS: Create dedicated `.css` files with BEM classes
- Use semantic HTML: `<h2>`, `<nav>`, `<article>`, etc.

**📖 ENFORCEMENT GUIDE:**
- **Read FIRST:** `/docs/DESIGN-SYSTEM-ENFORCEMENT.md`
- **Before coding:** `/docs/COMPLIANCE-CHECKLIST.md`
- **Component template:** `/docs/COMPONENT-TEMPLATE.md`
- **Variable reference:** `/docs/CSS-VARIABLES.md`

---

## 🚨 **CRITICAL: FILE ORGANIZATION & ROOT DIRECTORY RULES**

### **⚠️ ROOT DIRECTORY - STRICT ENFORCEMENT ⚠️**

**ONLY these files are allowed in root directory (`/`):**

✅ **ALLOWED IN ROOT:**
1. `README.md` - Project overview (optional)
2. `CHANGELOG.md` - Version history (optional)
3. `index.html` - HTML entry point (required)
4. `package.json` - Dependencies (required)
5. `vite.config.ts` - Build config (required)
6. `tsconfig.json` - TypeScript config (required)
7. `tsconfig.node.json` - Node TS config (required)
8. `.gitignore` - Git ignore rules (required)
9. `pnpm-lock.yaml` - Lockfile (auto-generated)

**❌ NEVER CREATE IN ROOT:**
- ❌ `.md` documentation files (except README.md and CHANGELOG.md)
- ❌ `.sh` script files (use `/scripts/` folder instead)
- ❌ Report files (*-report.md, *-summary.md, etc.)
- ❌ Task list files (*-tasks.md, *-checklist.md, etc.)
- ❌ Guide files (*-guide.md, *-instructions.md, etc.)
- ❌ Orphaned config files (.eslintrc, .prettierrc, etc.)
- ❌ Backup files (*-backup.*, *-old.*, etc.)
- ❌ Numbered variants (file-2.tsx, component-3.tsx, etc.)

**✅ CORRECT FILE PLACEMENT:**

| File Type | Destination | Examples |
|-----------|-------------|----------|
| Documentation | `/docs/` | project-guide.md, setup-instructions.md |
| Guides & References | `/docs/guides/` | dev-tools-reference.md, migration-guide.md |
| Figma Make Docs | `/docs/figma-make/` | readiness-summary.md, cleanup-plan.md |
| Reports | `/reports/` or `/reports/[project]/` | 2026-02-25-audit-report.md |
| Archived Reports | `/reports/archive/` | old-audit-reports.md |
| Task Lists | `/tasks/` | cleanup-tasks.md, feature-tasks.md |
| Archived Tasks | `/tasks/archive/` | completed-tasks.md |
| Prompts | `/prompts/` or `/prompts/[project]/` | audit-prompt.md |
| Guidelines | `/guidelines/` | component-guidelines.md |
| Scripts | `/scripts/` | build.sh, deploy.sh |
| Source Code | `/src/` | components, pages, styles |

**📁 /docs/ FOLDER STRUCTURE:**
```
/docs/
├── *.md                    # General documentation
├── /guides/                # Reference guides and how-tos
├── /figma-make/            # Figma Make specific documentation
└── /archive/               # Old documentation (optional)
```

**🔍 ENFORCEMENT:**
- Before creating ANY .md file, verify destination folder
- Before creating ANY .sh file, use `/scripts/` folder
- If file is documentation → `/docs/`
- If file is a reference guide → `/docs/guides/`
- If file is Figma Make related → `/docs/figma-make/`
- If file is a report → `/reports/`
- If file is a task list → `/tasks/`
- If file is a prompt → `/prompts/`
- If file is a shell script → `/scripts/`
- If unsure → Ask first, NEVER default to root!

---

## 🗂️ **PROJECT ORGANIZATION & WORKFLOW**

### **⚠️ CRITICAL: TASK, PROMPT, AND REPORT MANAGEMENT ⚠️**

**ALL development work MUST follow this organizational structure:**

#### **1. Task Management** 📋
- **Master Task List:** `/tasks/task-list.md` - Central checklist of all open tasks
- **Task Lists:** All task lists MUST be saved in `/tasks/` folder
- **Format:** Markdown files with checkboxes for tracking progress
- **Naming:** Descriptive names (e.g., `root-cleanup-tasks.md`, `audit-findings-tasks.md`)
- **Subfolder Rule:** Related tasks can be in subfolders (e.g., `/tasks/css-migration/`)
- **Archive Rule:** Completed tasks should be archived to `/tasks/archive/` for reference

#### **2. Prompt Management** 📝
- **Prompts Folder:** `/prompts/` - All reusable prompts MUST be saved here
- **Naming:** Clear, descriptive names (e.g., `root-cleanup-prompt.md`, `css-audit-prompt.md`)
- **Subfolder Rule:** Multi-step prompts go in subfolders with an orchestrator prompt
  - Example: `/prompts/multi-phase-audit/orchestrator.md`
  - Example: `/prompts/multi-phase-audit/phase-1-css.md`
- **Format:** Markdown files with clear instructions and acceptance criteria

#### **3. Report Management** 📊
- **Reports Folder:** `/reports/` - All audit findings and analysis reports
- **Naming:** Date-stamped, descriptive names (e.g., `2026-02-25-root-cleanup-report.md`)
- **Subfolder Rule:** Related reports go in subfolders
  - Example: `/reports/css-migration/phase-1-findings.md`
  - Example: `/reports/css-migration/phase-2-findings.md`
- **Archive Rule:** Reports older than 30 days should be moved to `/reports/archive/`
- **Format:** Markdown with clear sections (Summary, Findings, Recommendations)

#### **4. Standard Workflow Pattern** 🔄

**ALWAYS follow this sequence when given a task:**

```
1. CREATE PROMPT → /prompts/[task-name]-prompt.md
2. RUN AUDIT → Execute the audit based on prompt
3. SAVE REPORT → /reports/[date]-[task-name]-report.md
4. CREATE TASKS → /tasks/[task-name]-tasks.md
5. UPDATE MASTER → Add to /tasks/task-list.md
```

**Example Workflow:**
```bash
# User says: "Audit CSS for design system compliance"

Step 1: Create /prompts/css-compliance-audit.md
Step 2: Run audit against all CSS files
Step 3: Save /reports/2026-02-25-css-compliance-report.md
Step 4: Create /tasks/css-compliance-fixes.md
Step 5: Update /tasks/task-list.md with new tasks
```

#### **5. Guideline References** 📚

**When referencing guidelines:**
- ✅ **Always cite the specific guideline file** (e.g., `/guidelines/design-tokens/colors.md`)
- ✅ **Link to relevant sections** for context
- ✅ **Include guideline path in reports** so findings are traceable
- ❌ **Never reference non-existent guidelines** - verify file exists first

**Example:**
```markdown
**Violation:** Component uses hardcoded color `#548235`
**Guideline:** `/guidelines/design-tokens/colors.md` - Section "Semantic Color Tokens"
**Fix:** Replace with `var(--primary)` CSS variable
```

#### **6. Folder Structure Rules** 📁

```
/
├── /tasks/                    # All task lists
│   ├── task-list.md          # ⭐ MASTER TASK LIST (never delete)
│   ├── [task-name]-tasks.md  # Individual task lists
│   └── /archive/             # Completed tasks
├── /prompts/                  # All reusable prompts
│   ├── [prompt-name].md      # Single-file prompts
│   └── /[multi-prompt]/      # Multi-step prompts
│       ├── orchestrator.md   # Master prompt
│       ├── step-1.md         # Sub-prompts
│       └── step-2.md
├── /reports/                  # All audit reports
│   ├── [date]-[name].md      # Individual reports
│   └── /[project]/           # Related reports
│       ├── phase-1.md
│       └── phase-2.md
├── /guidelines/               # Project guidelines (DO NOT DELETE)
└── /src/                      # Source code
```

#### **7. Maintenance Rules** 🧹

**Reports:**
- ✅ Keep recent reports (< 30 days) in main folder
- ✅ Archive older reports to `/reports/archive/`
- ✅ Delete duplicates or superseded reports
- ✅ Group related reports in subfolders

**Tasks:**
- ✅ Mark completed tasks with `[x]` checkboxes
- ✅ Move completed task files to `/tasks/archive/`
- ✅ Keep `/tasks/task-list.md` as active master list
- ✅ Update master list when creating new task files

**Prompts:**
- ✅ Keep all prompts for reuse
- ✅ Version prompts if significant changes (e.g., `v1-audit.md`, `v2-audit.md`)
- ✅ Document prompt dependencies in headers
- ❌ Never delete working prompts

#### **8. Root Directory Cleanliness** 🗑️

**The root directory (`/`) should contain ONLY:**
- ✅ Essential config files (package.json, vite.config.ts, tsconfig.json)
- ✅ Entry points (index.html)
- ✅ README.md (project overview)
- ✅ .gitignore
- ❌ NO excessive .md documentation files (move to /docs/ or /guidelines/)
- ❌ NO old backup files
- ❌ NO orphaned config files

**When cleaning root:**
1. Move documentation to `/docs/` or `/guidelines/`
2. Delete old reports (move recent ones to `/reports/`)
3. Archive completed tasks (move to `/tasks/archive/`)
4. Remove orphaned config files (e.g., `.eslintrc.cjs` without ESLint installed)
5. Delete duplicate or superseded files

---

## 📋 **DOCUMENT OVERVIEW**

This document serves as the **entry point** for the LightSpeed Tour Operator plugin prototype guidelines and defines the **structural, compositional, and behavioural rules** for a **content-first Figma Make prototype** designed explicitly around **WordPress block theme architecture**.

The prototype must map **directly and deterministically** to:

* WordPress block templates (`templates/*.html`)
* Template parts (`parts/*.html`)
* Block patterns (`patterns/*.php` or registered patterns)
* A single `theme.json`
* A WordPress-aligned React implementation (rendering only)

This prototype exists to validate **content models, layout patterns, and editorial workflows** — **not visual design**.

---

## 🎨 **DESIGN SYSTEM REQUIREMENTS**

**All UI generation MUST use CSS custom properties (CSS variables) defined in `/src/styles/theme.css`.**

### **Why This Matters:**
- ✅ **Adherence to design system** - All styling follows established patterns
- ✅ **Easy updates** - Modify CSS variables to change styling globally
- ✅ **Consistent styling** - All components use the same design tokens
- ✅ **Theme support** - Automatic light/dark mode via CSS variables
- ✅ **User customization** - Users can update entire theme by editing CSS variables

### **Typography Requirements:**

**ONLY use these 5 font faces defined in `/src/styles/theme.css`:**

1. **Lora** (serif) via `var(--font-family-lora)`
   - Usage: Headings (H1-H6), labels, blockquotes, editorial content
   
2. **Noto Sans** (sans-serif) via `var(--font-family-noto-sans)`
   - Usage: Body text, paragraphs, buttons, inputs, UI elements
   
3. **Courier New** (monospace) via `var(--font-family-courier-new)`
   - Usage: Code blocks, technical content

4. **Caveat** (handwriting) via `var(--font-family-caveat)`
   - Usage: Accent text, organic flourishes, decorative microcopy

5. **Shadows Into Light** (handwriting) via `var(--font-family-shadows)`
   - Usage: Alternative accent text for organic, hand-drawn feel

**NO OTHER FONTS ARE ALLOWED.**

### **Critical Rules:**

🚫 **NEVER hardcode:**
- Colors (use `var(--color-*)`)
- Fonts (use `var(--font-family-*)`)
- Font sizes (use `var(--text-*)`)
- Font weights (use `var(--font-weight-*)`)
- Spacing (use `var(--spacing-*)` or Tailwind scale)
- Borders (use `var(--color-border)`)
- Radius (use `var(--radius-*)`)
- Shadows (use `var(--elevation-*)`)

✅ **ALWAYS use:**
- CSS variables for ALL styling
- External CSS files (no inline styles)
- BEM naming convention
- Semantic HTML elements

The guidelines have been organized into focused, modular files for easier navigation and maintenance.

---

## 🛠️ **ACTIVE ENGINEERING PROJECTS**

### **1. CSS Architecture & QA Refactor (March 2026)**
- **Objective:** Eliminate 100% of inline `style={{ }}` attributes, fix all broken links (`href="#"`), and ensure 100% image `alt` text compliance.
- **Strategy:** Refactor dynamic props to CSS variables and map placeholder links to production routes.
- **Reference:** `/tasks/styles-links-assets-refactor-tasks.md`
- **Status:** 🔴 Audit Complete | Migration In Progress

---

## Quick Start

**IMPORTANT: Follow these steps IN ORDER before writing any code:**

### Step 1: Read Overview Files (REQUIRED)

Read ALL overview files to understand the system architecture:

- **[overview-components.md](overview-components.md)** - Component architecture, directory structure, and import conventions
- **[overview-patterns.md](overview-patterns.md)** - Block patterns, composition rules, and pattern taxonomy
- **[overview-icons.md](overview-icons.md)** - Icon system, verification process, and usage guidelines
- **[blocks/overview-blocks.md](blocks/overview-blocks.md)** - WordPress block equivalents and tour operator blocks
- **[blocks/overview-parts.md](blocks/overview-parts.md)** - Template parts reference
- **[blocks/overview-templates.md](blocks/overview-templates.md)** - Page template archetypes

### Step 2: Read Design Tokens (REQUIRED)

Read ALL files in the `design-tokens/` folder to understand the styling system:

- **[design-tokens/colors.md](design-tokens/colors.md)** - Semantic color system with dark mode support
- **[design-tokens/typography.md](design-tokens/typography.md)** - Typography hierarchy, font families, and usage rules
- **[design-tokens/spacing.md](design-tokens/spacing.md)** - Spacing scale, responsive patterns, and layout tokens
- **[design-tokens/borders.md](design-tokens/borders.md)** - Border styles and widths (future)
- **[design-tokens/radii.md](design-tokens/radii.md)** - Border radius presets (future)
- **[design-tokens/shadows.md](design-tokens/shadows.md)** - Shadow/elevation presets (future)
- **[styles/section-styles.md](styles/section-styles.md)** - Section preset styles (22 types for consistent page composition)

**NEW:** For comprehensive design system implementation guidance:
- **[DESIGN-SYSTEM-GUIDE.md](DESIGN-SYSTEM-GUIDE.md)** - Complete design system guide including dark mode, template browser, and implementation patterns

### Step 2.5: Understand Developer Tools (IMPORTANT)

The prototype includes developer tools for testing and validation:

**Template Browser:**
- Access: Top-left floating button OR footer link "Test All Templates & Pages"
- Purpose: Navigate between all page templates and archetypes
- Features: Real-time search, current template indicator, WordPress alignment labels
- Location: `/src/app/components/common/TemplateBrowser.tsx`

**Dark Mode Switcher:**
- Access: Header (desktop: top-right, mobile: in navigation menu)
- Purpose: Toggle between light and dark modes
- Persistence: Saves preference to localStorage
- Implementation: Integrated in `/src/app/components/parts/Header.tsx`

**Performance Monitor (NEW - December 26, 2024):**
- **Automatic:** Runs in development mode (browser console)
- Purpose: Track Core Web Vitals (FCP, LCP, FID, CLS, TTI, Memory)
- Features: Automatic evaluation, threshold alerts, actionable insights
- Location: `/src/app/utils/performanceMonitor.ts`
- Documentation: `/PERFORMANCE-OPTIMIZATION-REPORT.md`

**Compliance Scorecard (NEW - December 26, 2024):**
- **Automatic:** Runs in development mode (browser console)
- Purpose: Audit design system compliance
- Checks: Fluid typography (90%+), semantic HTML (80%+), font weights (90%+), color tokens (90%+), fluid spacing (70%+)
- Features: Detailed reports, specific issues, recommendations
- Location: `/src/app/utils/complianceScorecard.ts`
- Documentation: `/COMPLIANCE-PERFORMANCE-IMPROVEMENTS.md`

**Contrast Auditor (NEW - December 26, 2024):**
- **Automatic:** Runs in development mode (browser console)
- Purpose: WCAG 2.1 Level AA and AAA contrast compliance
- Checks: All text/background combinations, light and dark modes
- Features: Automated contrast ratio calculation, detailed failure reports, fix recommendations
- Location: `/src/app/utils/contrastAuditor.ts`
- Documentation: `/CONTRAST-AUDIT-REPORT.md`
- Target: 95%+ WCAG AA compliance in both modes

**How to Use Developer Tools:**
1. Open browser console in development mode
2. Navigate to any page
3. Wait 2 seconds for automatic audits
4. Review performance metrics, compliance scores, and contrast ratios

See [DESIGN-SYSTEM-GUIDE.md](DESIGN-SYSTEM-GUIDE.md) for detailed documentation.

### Step 2.6: Component Auditing Tools (NEW - December 26, 2024)

The prototype now includes **5 comprehensive auditing utilities** for verifying design system compliance:

**1. Component Auditor (`/src/app/utils/componentAuditor.ts`)**
- **Purpose:** Audit individual components for design system compliance
- **Checks:** Color tokens, typography, spacing, violations
- **Output:** Detailed reports with scores (0-100) and recommendations
- **Usage:** `logComponentAudit('Header', 'header')`

**2. Dark Mode Checker (`/src/app/utils/darkModeChecker.ts`)**
- **Purpose:** Verify dark mode implementation without hardcoded overrides
- **Checks:** dark: class usage, semantic tokens, contrast in both modes
- **Output:** Light/dark scores, violation details, fix recommendations
- **Usage:** `logDarkModeAudit('Hero Section', '[class*="Hero"]')`

**3. Sample Auditor (`/src/app/utils/sampleAuditor.ts`)**
- **Purpose:** Run real audits with before/after fix examples
- **Checks:** Header, Footer, Hero, Card Grid, CTA components
- **Output:** Comprehensive reports + code examples
- **Usage:** `runSampleAudits()` (runs automatically in dev mode)

**4. Contrast Checker (`/src/app/utils/contrastChecker.ts`)**
- **Purpose:** Verify WCAG AA/AAA color contrast compliance
- **Checks:** 34 color pairs (17 × 2 modes), contrast ratios
- **Output:** Pass/fail for each pair, recommendations
- **Usage:** `logContrastReport()` (runs automatically)

**5. Compliance Scorecard (`/src/app/utils/complianceScorecard.ts`)**
- **Purpose:** Overall design system compliance scoring
- **Checks:** Fluid typography, semantic HTML, font weights, colors, spacing
- **Output:** Percentage scores, detailed recommendations
- **Usage:** `logComplianceReport()` (runs automatically)

**Automatic Execution:**
All 5 audits run automatically 2 seconds after page load in development mode.

**Manual Execution:**
```javascript
// Browser console
import { runSampleAudits, showHeroFixExample } from './utils/sampleAuditor';
runSampleAudits();           // Run all component audits
showHeroFixExample();        // Show Hero fix example
showCardFixExample();        // Show Card fix example
showNavigationFixExample();  // Show Navigation fix example
```

**Documentation:**
- **[/AUDIT-FINDINGS-AND-FIX-GUIDE.md](/AUDIT-FINDINGS-AND-FIX-GUIDE.md)** - Complete audit findings, fix patterns, and before/after examples

**Target Scores:**
- Component Compliance: 95/100
- Dark Mode Score: 100/100
- Color Token Usage: 95%
- Typography Compliance: 100%
- Spacing Consistency: 95%
- Contrast (WCAG AA): 100%

### Step 3: Read Component Guidelines BEFORE Using Components (REQUIRED)

BEFORE using ANY component, read its specific guidelines file in `components/`:

**Common Components:**
- [components/Logo.md](components/Logo.md) - Site branding component
- [components/ScrollBackToTop.md](components/ScrollBackToTop.md) - Back-to-top button
- [components/ScrollDownArrow.md](components/ScrollDownArrow.md) - Scroll indicator
- [components/Container.md](components/Container.md) - Width constraints component
- [components/Typography.md](components/Typography.md) - Typography utility component (future)

**Pattern Components:**
- [components/Hero.md](components/Hero.md) - Hero pattern (future)
- [components/ArchiveHeader.md](components/ArchiveHeader.md) - Archive header (future)
- [components/CardGrid.md](components/CardGrid.md) - Card grid pattern (future)
- [components/CTA.md](components/CTA.md) - Call-to-action pattern (future)
- [components/EditorialContent.md](components/EditorialContent.md) - Editorial content block (future)
- [components/FastFacts.md](components/FastFacts.md) - Meta/quick-facts pattern (future)

**Template Parts:**
- [components/Header.md](components/Header.md) - Site header (future)
- [components/Footer.md](components/Footer.md) - Site footer (future)

### Step 4: Read Icon Guidelines BEFORE Using Icons (REQUIRED)

BEFORE using ANY icon, read the appropriate icon category file:

- **[icons/travel.md](icons/travel.md)** - Travel-related icons (destinations, activities, transportation)
- **[icons/interface.md](icons/interface.md)** - UI control icons (navigation, actions, status)

**CRITICAL:** Always verify icons exist in lucide-react using bash before importing:
```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

### Step 4.5: Read Pattern Guidelines (REQUIRED)

**NEW - December 25, 2024:** Comprehensive pattern implementation guidelines:

**Essential Reading:**
- **[patterns/section-styles.md](patterns/section-styles.md)** - Section composition, backgrounds, dark mode, spacing (820 lines)
- **[patterns/navigation-links.md](patterns/navigation-links.md)** - Link vs button, breadcrumbs, accessibility (900 lines)
- **[patterns/typography-verification.md](patterns/typography-verification.md)** - Typography standards, verification, fixes (1,100 lines)
- **[patterns/archive-patterns.md](patterns/archive-patterns.md)** - Complete archive template system (all 8 archives) ✨ **NEW**

**Specific Patterns:**
- **[patterns/hero-patterns.md](patterns/hero-patterns.md)** - Hero section variations
- **[patterns/card-grid-patterns.md](patterns/card-grid-patterns.md)** - Card layout patterns
- **[patterns/PostGrid.md](patterns/PostGrid.md)** - Blog post grid pattern (BlogCard + CardGrid) ✨ **NEW**
- **[patterns/cta-patterns.md](patterns/cta-patterns.md)** - Call-to-action patterns
- **[patterns/editorial-content-patterns.md](patterns/editorial-content-patterns.md)** - Editorial content blocks
- **[patterns/filter-patterns.md](patterns/filter-patterns.md)** - Taxonomy and search filters

**Why These Matter:**
- Section styles ensure consistent WordPress-aligned page composition
- Navigation guidelines maintain semantic HTML and accessibility
- Typography verification prevents design system violations
- PostGrid pattern ensures consistent blog post display across archives

### Step 5: Write Code

Only after completing steps 1-4 should you begin writing code.

---

## System Principles

### Core Principles (Non-Negotiable)

1. **System-first, not page-first** - Build reusable patterns, not one-off layouts
2. **Patterns over one-off layouts** - Every page must use approved patterns
3. **Content drives layout** - Layout adapts to content, not vice versa
4. **Accessibility is mandatory** - WCAG 2.1 AA compliance required
5. **Theme-first inheritance** - Plugin inherits from block theme defaults
6. **Block theme mapping** - All structure maps to WordPress blocks + patterns + templates
7. **Deterministic composition** - Same inputs produce same outputs
8. **Design system adherence** - All styling uses CSS variables from theme.css

---

## Content Architecture

### Canonical Content Types (Fixed)

**Post Types:**
- Tours
- Destinations (hierarchical)
- Accommodation
- Specials
- Team
- Reviews
- Blog posts
- Core pages (About, Contact, FAQ)

**Taxonomies:**
- Travel Styles (applies to: Tours, Accommodation, Destinations)
- Accommodation Types (applies to: Accommodation)
- Continents (applies to: Destinations)
- Brands (applies to: Accommodation)
- Facilities (applies to: Accommodation)
- Blog Categories (applies to: Posts)
- Blog Tags (applies to: Posts)

**Rule:** Do not invent new post types or taxonomies.

### Mock Data

All mock data is located in `/src/app/data/`:

- **`types.ts`** - TypeScript interfaces for all content types
- **`mock.ts`** - Sample data exports for all content types

**Always use data from mock files, never hardcode content.**

---

## Directory Structure

### React to WordPress Mapping

This prototype maps directly to WordPress block theme architecture:

| React Location                   | WordPress Equivalent          | Purpose                                    |
| -------------------------------- | ----------------------------- | ------------------------------------------ |
| `/src/app/`                      | Theme root                    | Application entry point                    |
| `/src/app/pages/`                | `templates/*.html`            | Page templates (single, archive, etc.)     |
| `/src/app/components/parts/`     | `parts/*.html`                | Template parts (header, footer)            |
| `/src/app/components/patterns/`  | `patterns/*.php`              | Reusable block patterns                    |
| `/src/app/components/blocks/`    | Core/custom blocks            | Block implementations (future)             |
| `/src/app/components/common/`    | Utility components            | Shared utility components (not WP blocks)  |
| `/src/app/components/ui/`        | shadcn/ui library             | UI library components (not WP blocks)      |
| `/src/app/data/`                 | Mock content                  | Content models & sample data               |
| `/src/app/hooks/`                | Custom React hooks            | Reusable hooks                             |
| `/src/app/lib/`                  | Utility functions             | Helper functions                           |
| `/src/styles/`                   | `theme.json` + CSS            | Design system tokens                       |

### Component Organization

```
/src/app/components/
├── blocks/           # WordPress block equivalents (future)
├── common/           # Shared utility components
│   ├── BackToTopButton.tsx
│   ├── Container.tsx
│   ├── Logo.tsx
│   ├── ScrollDownArrow.tsx
│   └── Typography.tsx (future)
├── figma/            # Figma-specific utilities (protected)
├── parts/            # Template parts (Header, Footer)
├── patterns/         # Reusable block patterns
└── ui/               # shadcn/ui library components ONLY
```

### Other Directories

```
/src/app/
├── data/             # Mock data, content models
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page templates (NOT general templates)
└── styles/           # Global CSS, theme tokens
```

---

## Import Conventions

**All imports must use relative paths from the importing file.**

### From Pages (`/src/app/pages/*.tsx`):

```typescript
// Layout
import { PageLayout } from "../components/layout/PageLayout";

// Parts
import { Header } from "../components/parts/Header";
import { Footer } from "../components/parts/Footer";

// Patterns
import { Hero } from "../components/patterns/Hero";
import { CardGrid } from "../components/patterns/CardGrid";

// Common
import { Container } from "../components/common/Container";
import { Logo } from "../components/common/Logo";
import { BackToTopButton } from "../components/common/BackToTopButton";

// Utilities
import { cn } from "../lib/utils";

// Hooks
import { useIsMobile } from "../hooks/use-mobile";

// Data
import { TOURS, DESTINATIONS } from "../data/mock";
import type { Tour, Destination } from "../data/types";
```

### From Components:

```typescript
// From patterns to common
import { Container } from "../common/Container";

// From patterns to UI
import { Button } from "../ui/button";

// From anywhere to utilities
import { cn } from "../../lib/utils";
```

**Prohibited:**
- ❌ Absolute paths (e.g., `from '/src/app/lib/utils'`)
- ❌ Webpack aliases (e.g., `from '@/lib/utils'`)

---

## Page Archetypes

All pages must conform to one of these archetypes:

### 1. Content Hub Archetype
**Example:** Tours Archive (`/tours`)

**Required patterns (order):**
1. Hero
2. Filter / taxonomy navigation (optional)
3. Card grid
4. FAQ section
5. CTA (optional)

### 2. Taxonomy Archive Archetype
**Example:** Adventure Tours (`/travel-styles/adventure`)

**Required patterns (order):**
1. Archive header
2. Taxonomy navigation (siblings/children) (optional)
3. Card grid
4. Pagination (if needed)
5. FAQ section
6. CTA (optional)

### 3. Single Detail Archetype
**Example:** Tour Detail (`/tours/iceland-explorer`)

**Required patterns (order):**
1. Hero
2. Editorial content (primary narrative)
3. Meta / quick-facts
4. Supporting editorial sections (optional)
5. Cross-link / related content
6. FAQ section
7. CTA (enquiry / next step)

### 4. Editorial Listing Archetype
**Example:** Blog (`/blog`)

**Required patterns (order):**
1. Listing header
2. Card grid (posts only)
3. Pagination/load more
4. FAQ section (optional)

### 5. Utility Page Archetype
**Example:** FAQ (`/faq`)

**Required patterns (order):**
1. Page header
2. Editorial content blocks
3. Structured utility block (FAQ accordion)
4. CTA (optional)

---

## Design System

### CSS Variables

All styling MUST use CSS custom properties from `/src/styles/theme.css`:

**NEW - December 26, 2024: Split Theme Architecture**

The theme system is now split into separate files for better maintainability:

- **`/src/styles/theme-light.css`** - Light mode color palette and logo references
- **`/src/styles/theme-dark.css`** - Dark mode color palette and logo references  
- **`/src/styles/theme.css`** - Main entry point that imports both, semantic HTML rules, Tailwind integration

**Benefits:**
- ✅ Easy to maintain each mode separately
- ✅ Proper logo switching (dark logo in light mode, light logo in dark mode)
- ✅ Clear color token organization
- ✅ WCAG AA/AAA compliance built-in
- ✅ Shared typography and spacing tokens

**Typography:**
- Font families: `var(--font-family-lora)` (serif), `var(--font-family-noto-sans)` (sans-serif)
- Font sizes: `var(--text-6xl)` (H1), `var(--text-4xl)` (H2), `var(--text-3xl)` (H3), `var(--text-2xl)` (H4), `var(--text-xl)` (H5), `var(--text-lg)` (H6), `var(--text-base)` (body)
- Font weights: `var(--font-weight-bold)` (700), `var(--font-weight-semibold)` (600), `var(--font-weight-medium)` (500), `var(--font-weight-normal)` (400)

**Modern Font Weight Scale (Updated December 26, 2024):**
- H1: Bold (700) - Maximum impact
- H2-H3: Semibold (600) - Strong hierarchy
- H4-H6: Medium (500) - Modern, clean appearance
- Body/Paragraphs: Normal (400) - Optimal readability
- Buttons/Labels: Medium (500) - Clear UI hierarchy

**Colors:**
- Semantic tokens: Use Tailwind classes that reference CSS variables
  - `bg-primary`, `text-primary-foreground`
  - `bg-secondary`, `text-secondary-foreground`
  - `bg-accent`, `text-accent-foreground`
  - `bg-muted`, `text-muted-foreground`
  - `bg-card`, `text-card-foreground`
  - `border-border`, `ring-ring`
- Dark mode: Automatic via CSS custom properties
- **WCAG AA Compliance:** All color combinations meet 4.5:1 minimum contrast ratio
- **Dark Mode Fix:** Primary link color adjusted to `rgba(110, 165, 50, 1)` for better contrast

**Spacing:**
- Fluid spacing using clamp(): `var(--spacing-section-md)`, `var(--spacing-gap-lg)`
- Tailwind scale: `p-4` (16px), `p-6` (24px), `gap-4` (16px), `mb-12` (48px)
- Responsive breakpoints: Use `md:` and `lg:` prefixes for fluid layouts

**Border Radius:**
- `rounded-sm` → `var(--radius-sm)` (2px)
- `rounded-md` → `var(--radius-md)` (4px)
- `rounded-lg` → `var(--radius-lg)` (6px)
- `rounded-xl` → `var(--radius-xl)` (8px)

**Shadows:**
- `shadow-sm` → `var(--elevation-sm)` (brutalist solid shadow)

### Typography Rules

**CRITICAL: Do NOT use Tailwind typography classes unless explicitly overriding:**

❌ Prohibited (unless intentionally deviating):
```typescript
className="text-2xl font-bold leading-tight"
```

✅ Use semantic HTML instead:
```typescript
<h2>Section Title</h2>  // Gets 32px, Lora, 600 automatically
<p>Body text</p>         // Gets 16px, Noto Sans, 400 automatically
```

**Exception:** Only use Tailwind text classes when intentionally deviating from defaults (e.g., small print, feature stats, card metadata).

---

## Accessibility Requirements

All components must meet WCAG 2.1 AA:

1. **Heading Order:** One H1 per page, logical hierarchy (H1 → H2 → H3)
2. **Keyboard Navigation:** All interactive elements keyboard-reachable
3. **Focus States:** Visible focus indicators (use `ring-ring`)
4. **Color Independence:** Information not conveyed by color alone
5. **Labels:** Proper ARIA labels where needed (buttons, forms)
6. **Empty States:** Explicit messages, never blank areas
7. **Touch Targets:** Minimum 44px × 44px for interactive elements
8. **Skip Links:** Provide skip-to-content links where appropriate

---

## Critical Rules

### File Creation & Naming

**NEVER create numbered backup files:**
- ❌ `App-2.tsx`, `App-3.tsx`, `Component-backup.tsx`
- ✅ Always modify the original file directly

**Enforcement:** Numbered file variants break the module system.

### Component Rules

1. **shadcn/ui only in `/ui/`:** Custom components go in appropriate category folders
2. **Read guidelines first:** Always check component-specific guidelines before use
3. **WordPress mapping:** Every component should map to a WordPress block theme concept
4. **Import from data:** Use mock data from `/src/app/data/`, not hardcoded values
5. **Design tokens:** Use CSS variables from theme.css for all styling
6. **Override defaults:** Explicitly set styling to override component defaults
7. **NO INLINE STYLES:** Never use inline `style` attributes - all styling must use Tailwind classes or CSS classes that reference design system tokens

### Styling Rules (CRITICAL)

1. **No inline styles:** Never use inline `style={{...}}` attributes in JSX
2. **Use Tailwind classes:** All styling must use Tailwind utility classes that reference CSS variables
3. **Use design tokens:** Colors, spacing, typography must come from `/src/styles/theme.css`
4. **CSS class method:** If Tailwind doesn't support a specific style, create a CSS class in the appropriate stylesheet
5. **Component variants:** Define styling variations through className composition, not inline styles

**❌ PROHIBITED:**
```tsx
<button style={{ backgroundColor: 'white', color: 'green' }}>
  Click me
</button>
```

**✅ CORRECT:**
```tsx
<button className="bg-white text-primary border-2 border-primary">
  Click me
</button>
```

### Icon Rules

1. **Always verify first:** Use bash to check icon exists in lucide-react before importing
2. **Use exact names:** lucide-react uses PascalCase (e.g., `MapPin`, not `Mappin`)
3. **Read guidelines:** Check `icons/travel.md` or `icons/interface.md` before use

---

## Components Not Mapped to WordPress

The following components are utility/library components and do not map directly to WordPress blocks:

**Common Components:**
- `BackToTopButton` - Client-side scroll utility
- `ScrollDownArrow` - Client-side scroll indicator
- `Logo` - Site branding (uses WordPress customizer image)
- `Container` - Width constraint wrapper
- `Typography` - Typography utility component

**UI Library (shadcn/ui):**
- All components in `/src/app/components/ui/` are third-party UI primitives
- These enhance WordPress blocks but are not blocks themselves
- Examples: `Button`, `Card`, `Accordion`, `Dialog`, etc.

**Layout Components:**
- `PageLayout` - Overall page structure shell

---

## Guidelines File Structure

```
├── guidelines/
│   ├── blocks/
│   │   ├── overview-blocks.md
│   │   ├── accommodation-related-accommodation.md
│   │   ├── review-related-accommodation.md
│   │   ├── tour-related-destination.md
│   │   ├── tour-related-tour.md
│   │   ├── related-regions.md
│   │   ├── design/ (design blocks - buttons, group, grid, etc.)
│   │   └── theme/ (theme blocks - future)
│   ├── components/
│   │   ├── Logo.md
│   │   ├── ScrollBackToTop.md
│   │   ├── ScrollDownArrow.md
│   │   ├── Container.md
│   │   ├── Header.md
│   │   ├── Footer.md
│   │   └── Typography.md
│   ├── design-tokens/
│   │   ├── colors.md
│   │   ├── typography.md
│   │   ├── MODERN-TYPOGRAPHY.md
│   │   ├── spacing.md
│   │   ├── borders.md
│   │   ├── radii.md
│   │   └── shadows.md
│   ├── icons/
│   │   ├── travel.md
│   │   └── interface.md
│   ├── mobile/
│   │   ├── forms.md
│   │   ├── images.md
│   │   ├── performance.md
│   │   ├── touch-targets.md
│   │   └── typography.md
│   ├── patterns/
│   │   ├── hero-patterns.md
│   │   ├── card-grid-patterns.md
│   │   ├── PostGrid.md
│   │   ├── cta-patterns.md
│   │   ├── cta-patterns-UPDATED.md
│   │   ├── editorial-content-patterns.md
│   │   ├── filter-patterns.md
│   │   ├── faq-pattern.md
│   │   ├── navigation-links.md
│   │   ├── section-styles.md
│   │   └── typography-verification.md
│   ├── styles/
│   │   └── section-styles.md
│   ├── testing/
│   │   └── TESTING-GUIDELINES.md
│   ├── DESIGN-SYSTEM-GUIDE.md
│   ├── Guidelines.md (this file)
│   ├── overview-components.md
│   ├── overview-icons.md
│   ├── overview-patterns.md
│   ├── overview-site-structure.md
│   └── overview-sitemap.md
```

---

## Getting Help

**When working with this system:**

1. **Start with overview files** - Get the big picture first
2. **Check design tokens** - Understand the styling system
3. **Read component guidelines** - Before using any component
4. **Verify icons** - Always check lucide-react exports
5. **Use mock data** - Never hardcode content
6. **Follow patterns** - Don't create one-off layouts
7. **Use CSS variables** - All styling via theme.css tokens

---

## Quick Reference Checklist

Before writing any code:

- [ ] Read `overview-components.md` (component architecture)
- [ ] Read `overview-patterns.md` (pattern composition)
- [ ] Read `overview-icons.md` (icon system)
- [ ] Read `blocks/overview-blocks.md` (WordPress blocks and tour operator blocks)
- [ ] Read all files in `design-tokens/` (styling system)
- [ ] Read component-specific guidelines for components you'll use
- [ ] Read icon category guidelines for icons you'll use
- [ ] Read block-specific guidelines for tour operator blocks you'll use
- [ ] Verify all icons exist in lucide-react before importing
- [ ] Use relative imports based on file location
- [ ] Use semantic HTML elements (not Tailwind size/weight classes)
- [ ] Use theme color tokens (not hardcoded colors)
- [ ] Use data from mock files (not hardcoded content)
- [ ] Follow WordPress architectural mapping
- [ ] Follow approved block patterns and composition rules
- [ ] Explicitly override component default styling with design system values

---

This Guidelines.md file is the starting point. Always refer to the specialized guidelines files for detailed information about specific components, design tokens, icons, and patterns.

**IMPORTANT:** Some base components may have styling (e.g., gap/typography) baked in as defaults. Make sure you explicitly set any styling information from the guidelines in the generated React to override the defaults.

---

## WordPress-Native React Folder Taxonomy

This taxonomy aligns **React rendering components** directly with **WordPress block theme architecture**, not generic frontend conventions.

The structure intentionally mirrors:

* `templates/*.html`
* `parts/*.html`
* `patterns/*`
* block categories as exposed in the editor

This ensures **zero translation cost** between:
Figma Make → WordPress patterns → React → PHP.

### Root Structure (WordPress-first)

All React components live under:

```
src/app/components/
```

This directory represents **renderable WordPress concepts**, not UI abstractions.

No hooks, no data fetching, no styling systems live here.

### Canonical Folder Structure (Aligned to WP)

```txt
components/
├─ parts/          // template parts (header, footer, layout shell)
├─ blocks/         // block-equivalent renderers
│  ├─ nav/
│  ├─ listing/
│  ├─ meta/
│  ├─ related/
│  ├─ cta/
│  ├─ utility/
│  └─ state/
├─ patterns/       // composed block groups (WordPress patterns)
│  ├─ hero/
│  ├─ header/
│  └─ content/
└─ templates/      // page-level composition (archive, single, page)
```

> **Important:**
>
> * `blocks/` = *what WordPress would register as blocks*
> * `patterns/` = *what WordPress would register as patterns*
> * `templates/` = *what WordPress resolves via template hierarchy*

### Mapping: WordPress → React (Exact)

#### Template Parts

| WordPress           | React                             |
| ------------------- | --------------------------------- |
| `parts/header.html` | `components/parts/SiteHeader.tsx` |
| `parts/footer.html` | `components/parts/SiteFooter.tsx` |

```
components/parts/
├─ SiteHeader.tsx
├─ SiteFooter.tsx
├─ Breadcrumbs.tsx
├─ PageLayout.tsx
```

**Rules**

* Structural only
* No content assumptions
* Used by all templates

#### Blocks (Atomic, Reusable)

These align **1:1 with block-like responsibilities**, even if implemented as patterns in PHP.

```
components/blocks/
├─ nav/
│  ├─ TaxonomyFilterBar.tsx
│  ├─ TaxonomySiblingNav.tsx
│  └─ Pagination.tsx
├─ listing/
│  ├─ CardGrid.tsx
│  ├─ CardTour.tsx
│  ├─ CardDestination.tsx
│  ├─ CardAccommodation.tsx
│  └─ CardPost.tsx
├─ meta/
│  └─ MetaBlock.tsx
├─ related/
│  ├─ RelatedSection.tsx
│  └─ RelatedStack.tsx
├─ cta/
│  └─ PrimaryCTA.tsx
├─ utility/
│  ├─ FaqAccordion.tsx
│  └─ ContactForm.tsx
└─ state/
   ├─ EmptyState.tsx
   └─ LoadingState.tsx
```

**Rules**

* One responsibility per block
* No layout orchestration
* Tolerates missing data
* Accessible by default

#### Patterns (Composed, Opinionated)

Patterns are **block compositions**, just like WordPress patterns.

```
components/patterns/
├─ hero/
│  └─ HeroStandard.tsx
├─ header/
│  ├─ ArchiveHeader.tsx
│  ├─ ListingHeader.tsx
│  └─ PageHeader.tsx
└─ content/
   ├─ EditorialContent.tsx
   └─ SupportingSection.tsx
```

**Rules**

* Compose blocks only
* No conditionals beyond presence/absence
* No data fetching
* Must map to a registered WP pattern slug

#### Templates (Composition Only)

Templates mirror WordPress' template hierarchy exactly.

```
components/templates/
├─ ArchiveTemplate.tsx
├─ TaxonomyTemplate.tsx
├─ SingleTemplate.tsx
├─ PageTemplate.tsx
└─ EditorialTemplate.tsx
```

**Rules**

* Enforces section order
* No visual logic
* One template = one archetype
* Equivalent to `archive-*.html`, `single-*.html`, etc.

### Revised Component Mapping

The WordPress-aligned mapping for pattern categories:

| Pattern Category     | Old Location           | WordPress-Aligned Location                         |
| -------------------- | ---------------------- | -------------------------------------------------- |
| `part/*`             | `components/part/*`    | `components/parts/*`                               |
| `hero/*`, `header/*` | `components/headers/*` | `components/patterns/Hero.tsx` + `parts/Header.tsx` |
| `nav/*`              | `components/nav/*`     | `components/patterns/TaxonomyNav.tsx`              |
| `listing/*`          | `components/listing/*` | `components/patterns/CardGrid.tsx`                 |
| `content/*`          | `components/content/*` | `components/patterns/EditorialContent.tsx`         |
| `meta/*`             | `components/meta/*`    | `components/patterns/FastFacts.tsx`                |
| `related/*`          | `components/related/*` | `components/patterns/RelatedContent.tsx`           |
| `cta/*`              | `components/cta/*`     | `components/patterns/CTA.tsx`                      |
| `utility/*`          | `components/utility/*` | `components/patterns/FAQ.tsx`                      |
| `state/*`            | `components/state/*`   | `components/common/*` (various utilities)          |

This keeps **React flexible**, while staying **mentally identical to WordPress**.

### Mental Model (This Is the Key)

* **Blocks** = atomic, reusable, content-aware
* **Patterns** = editorial structure
* **Templates** = enforced order + hierarchy
* **Parts** = site chrome

### WordPress-Aligned Component Composition

All page compositions follow the same structure:

```tsx
<PageLayout>
  <SiteHeader />
  <Main>
    {Patterns in fixed order}
  </Main>
  <SiteFooter />
</PageLayout>
```

This is **conceptual**, not a React API contract — it exists to keep Figma Make honest.

**Important for Figma Make:**
These folders exist to reinforce **what something is in WordPress terms**, not how it looks.

If a component cannot be explained as a **block, pattern, or template part**, it does not belong in the prototype.

---

## Import Conventions

**All imports must use relative paths from the importing file.**

### From Pages (`/src/app/pages/*.tsx`):

```typescript
// Layout
import { PageLayout } from "../components/layout/PageLayout";

// Parts
import { Header } from "../components/parts/Header";
import { Footer } from "../components/parts/Footer";

// Patterns
import { Hero } from "../components/patterns/Hero";
import { CardGrid } from "../components/patterns/CardGrid";

// Common
import { Container } from "../components/common/Container";
import { Logo } from "../components/common/Logo";
import { BackToTopButton } from "../components/common/BackToTopButton";

// Utilities
import { cn } from "../lib/utils";

// Hooks
import { useIsMobile } from "../hooks/use-mobile";

// Data
import { TOURS, DESTINATIONS } from "../data/mock";
import type { Tour, Destination } from "../data/types";
```

### From Components:

```typescript
// From patterns to common
import { Container } from "../common/Container";

// From patterns to UI
import { Button } from "../ui/button";

// From anywhere to utilities
import { cn } from "../../lib/utils";
```

**Prohibited:**
- ❌ Absolute paths (e.g., `from '/src/app/lib/utils'`)
- ❌ Webpack aliases (e.g., `from '@/lib/utils'`)

---

## Page Archetypes

All pages must conform to one of these archetypes:

### 1. Content Hub Archetype
**Example:** Tours Archive (`/tours`)

**Required patterns (order):**
1. Hero
2. Filter / taxonomy navigation (optional)
3. Card grid
4. FAQ section
5. CTA (optional)

### 2. Taxonomy Archive Archetype
**Example:** Adventure Tours (`/travel-styles/adventure`)

**Required patterns (order):**
1. Archive header
2. Taxonomy navigation (siblings/children) (optional)
3. Card grid
4. Pagination (if needed)
5. FAQ section
6. CTA (optional)

### 3. Single Detail Archetype
**Example:** Tour Detail (`/tours/iceland-explorer`)

**Required patterns (order):**
1. Hero
2. Editorial content (primary narrative)
3. Meta / quick-facts
4. Supporting editorial sections (optional)
5. Cross-link / related content
6. FAQ section
7. CTA (enquiry / next step)

### 4. Editorial Listing Archetype
**Example:** Blog (`/blog`)

**Required patterns (order):**
1. Listing header
2. Card grid (posts only)
3. Pagination/load more
4. FAQ section (optional)

### 5. Utility Page Archetype
**Example:** FAQ (`/faq`)

**Required patterns (order):**
1. Page header
2. Editorial content blocks
3. Structured utility block (FAQ accordion)
4. CTA (optional)

---

## Design System

### CSS Variables

All styling MUST use CSS custom properties from `/src/styles/theme.css`:

**NEW - December 26, 2024: Split Theme Architecture**

The theme system is now split into separate files for better maintainability:

- **`/src/styles/theme-light.css`** - Light mode color palette and logo references
- **`/src/styles/theme-dark.css`** - Dark mode color palette and logo references  
- **`/src/styles/theme.css`** - Main entry point that imports both, semantic HTML rules, Tailwind integration

**Benefits:**
- ✅ Easy to maintain each mode separately
- ✅ Proper logo switching (dark logo in light mode, light logo in dark mode)
- ✅ Clear color token organization
- ✅ WCAG AA/AAA compliance built-in
- ✅ Shared typography and spacing tokens

**Typography:**
- Font families: `var(--font-family-lora)` (serif), `var(--font-family-noto-sans)` (sans-serif)
- Font sizes: `var(--text-6xl)` (H1), `var(--text-4xl)` (H2), `var(--text-3xl)` (H3), `var(--text-2xl)` (H4), `var(--text-xl)` (H5), `var(--text-lg)` (H6), `var(--text-base)` (body)
- Font weights: `var(--font-weight-bold)` (700), `var(--font-weight-semibold)` (600), `var(--font-weight-medium)` (500), `var(--font-weight-normal)` (400)

**Modern Font Weight Scale (Updated December 26, 2024):**
- H1: Bold (700) - Maximum impact
- H2-H3: Semibold (600) - Strong hierarchy
- H4-H6: Medium (500) - Modern, clean appearance
- Body/Paragraphs: Normal (400) - Optimal readability
- Buttons/Labels: Medium (500) - Clear UI hierarchy

**Colors:**
- Semantic tokens: Use Tailwind classes that reference CSS variables
  - `bg-primary`, `text-primary-foreground`
  - `bg-secondary`, `text-secondary-foreground`
  - `bg-accent`, `text-accent-foreground`
  - `bg-muted`, `text-muted-foreground`
  - `bg-card`, `text-card-foreground`
  - `border-border`, `ring-ring`
- Dark mode: Automatic via CSS custom properties
- **WCAG AA Compliance:** All color combinations meet 4.5:1 minimum contrast ratio
- **Dark Mode Fix:** Primary link color adjusted to `rgba(110, 165, 50, 1)` for better contrast

**Spacing:**
- Fluid spacing using clamp(): `var(--spacing-section-md)`, `var(--spacing-gap-lg)`
- Tailwind scale: `p-4` (16px), `p-6` (24px), `gap-4` (16px), `mb-12` (48px)
- Responsive breakpoints: Use `md:` and `lg:` prefixes for fluid layouts

**Border Radius:**
- `rounded-sm` → `var(--radius-sm)` (2px)
- `rounded-md` → `var(--radius-md)` (4px)
- `rounded-lg` → `var(--radius-lg)` (6px)
- `rounded-xl` → `var(--radius-xl)` (8px)

**Shadows:**
- `shadow-sm` → `var(--elevation-sm)` (brutalist solid shadow)

### Typography Rules

**CRITICAL: Do NOT use Tailwind typography classes unless explicitly overriding:**

❌ Prohibited (unless intentionally deviating):
```typescript
className="text-2xl font-bold leading-tight"
```

✅ Use semantic HTML instead:
```typescript
<h2>Section Title</h2>  // Gets 32px, Lora, 600 automatically
<p>Body text</p>         // Gets 16px, Noto Sans, 400 automatically
```

**Exception:** Only use Tailwind text classes when intentionally deviating from defaults (e.g., small print, feature stats, card metadata).

---

## Accessibility Requirements

All components must meet WCAG 2.1 AA:

1. **Heading Order:** One H1 per page, logical hierarchy (H1 → H2 → H3)
2. **Keyboard Navigation:** All interactive elements keyboard-reachable
3. **Focus States:** Visible focus indicators (use `ring-ring`)
4. **Color Independence:** Information not conveyed by color alone
5. **Labels:** Proper ARIA labels where needed (buttons, forms)
6. **Empty States:** Explicit messages, never blank areas
7. **Touch Targets:** Minimum 44px × 44px for interactive elements
8. **Skip Links:** Provide skip-to-content links where appropriate

---

## Critical Rules

### File Creation & Naming

**NEVER create numbered backup files:**
- ❌ `App-2.tsx`, `App-3.tsx`, `Component-backup.tsx`
- ✅ Always modify the original file directly

**Enforcement:** Numbered file variants break the module system.

### Component Rules

1. **shadcn/ui only in `/ui/`:** Custom components go in appropriate category folders
2. **Read guidelines first:** Always check component-specific guidelines before use
3. **WordPress mapping:** Every component should map to a WordPress block theme concept
4. **Import from data:** Use mock data from `/src/app/data/`, not hardcoded values
5. **Design tokens:** Use CSS variables from theme.css for all styling
6. **Override defaults:** Explicitly set styling to override component defaults
7. **NO INLINE STYLES:** Never use inline `style` attributes - all styling must use Tailwind classes or CSS classes that reference design system tokens

### Styling Rules (CRITICAL)

1. **No inline styles:** Never use inline `style={{...}}` attributes in JSX
2. **Use Tailwind classes:** All styling must use Tailwind utility classes that reference CSS variables
3. **Use design tokens:** Colors, spacing, typography must come from `/src/styles/theme.css`
4. **CSS class method:** If Tailwind doesn't support a specific style, create a CSS class in the appropriate stylesheet
5. **Component variants:** Define styling variations through className composition, not inline styles

**❌ PROHIBITED:**
```tsx
<button style={{ backgroundColor: 'white', color: 'green' }}>
  Click me
</button>
```

**✅ CORRECT:**
```tsx
<button className="bg-white text-primary border-2 border-primary">
  Click me
</button>
```

### Icon Rules

1. **Always verify first:** Use bash to check icon exists in lucide-react before importing
2. **Use exact names:** lucide-react uses PascalCase (e.g., `MapPin`, not `Mappin`)
3. **Read guidelines:** Check `icons/travel.md` or `icons/interface.md` before use

---

## Components Not Mapped to WordPress

The following components are utility/library components and do not map directly to WordPress blocks:

**Common Components:**
- `BackToTopButton` - Client-side scroll utility
- `ScrollDownArrow` - Client-side scroll indicator
- `Logo` - Site branding (uses WordPress customizer image)
- `Container` - Width constraint wrapper
- `Typography` - Typography utility component

**UI Library (shadcn/ui):**
- All components in `/src/app/components/ui/` are third-party UI primitives
- These enhance WordPress blocks but are not blocks themselves
- Examples: `Button`, `Card`, `Accordion`, `Dialog`, etc.

**Layout Components:**
- `PageLayout` - Overall page structure shell

---

## Guidelines File Structure

```
├── guidelines/
│   ├── blocks/
│   │   ├── overview-blocks.md
│   │   ├── accommodation-related-accommodation.md
│   │   ├── review-related-accommodation.md
│   │   ├── tour-related-destination.md
│   │   ├── tour-related-tour.md
│   │   ├── related-regions.md
│   │   ├── design/ (design blocks - buttons, group, grid, etc.)
│   │   └── theme/ (theme blocks - future)
│   ├── components/
│   │   ├── Logo.md
│   │   ├── ScrollBackToTop.md
│   │   ├── ScrollDownArrow.md
│   │   ├── Container.md
│   │   ├── Header.md
│   │   ├── Footer.md
│   │   └── Typography.md
│   ├── design-tokens/
│   │   ├── colors.md
│   │   ├── typography.md
│   │   ├── MODERN-TYPOGRAPHY.md
│   │   ├── spacing.md
│   │   ├── borders.md
│   │   ├── radii.md
│   │   └── shadows.md
│   ├── icons/
│   │   ├── travel.md
│   │   └── interface.md
│   ├── mobile/
│   │   ├── forms.md
│   │   ├── images.md
│   │   ├── performance.md
│   │   ├── touch-targets.md
│   │   └── typography.md
│   ├── patterns/
│   │   ├── hero-patterns.md
│   │   ├── card-grid-patterns.md
│   │   ├── PostGrid.md
│   │   ├── cta-patterns.md
│   │   ├── cta-patterns-UPDATED.md
│   │   ├── editorial-content-patterns.md
│   │   ├── filter-patterns.md
│   │   ├── faq-pattern.md
│   │   ├── navigation-links.md
│   │   ├── section-styles.md
│   │   └── typography-verification.md
│   ├── styles/
│   │   └── section-styles.md
│   ├── testing/
│   │   └── TESTING-GUIDELINES.md
│   ├── DESIGN-SYSTEM-GUIDE.md
│   ├── Guidelines.md (this file)
│   ├── overview-components.md
│   ├── overview-icons.md
│   ├── overview-patterns.md
│   ├── overview-site-structure.md
│   └── overview-sitemap.md
```

---

## Getting Help

**When working with this system:**

1. **Start with overview files** - Get the big picture first
2. **Check design tokens** - Understand the styling system
3. **Read component guidelines** - Before using any component
4. **Verify icons** - Always check lucide-react exports
5. **Use mock data** - Never hardcode content
6. **Follow patterns** - Don't create one-off layouts
7. **Use CSS variables** - All styling via theme.css tokens

---

## Quick Reference Checklist

Before writing any code:

- [ ] Read `overview-components.md` (component architecture)
- [ ] Read `overview-patterns.md` (pattern composition)
- [ ] Read `overview-icons.md` (icon system)
- [ ] Read `blocks/overview-blocks.md` (WordPress blocks and tour operator blocks)
- [ ] Read all files in `design-tokens/` (styling system)
- [ ] Read component-specific guidelines for components you'll use
- [ ] Read icon category guidelines for icons you'll use
- [ ] Read block-specific guidelines for tour operator blocks you'll use
- [ ] Verify all icons exist in lucide-react before importing
- [ ] Use relative imports based on file location
- [ ] Use semantic HTML elements (not Tailwind size/weight classes)
- [ ] Use theme color tokens (not hardcoded colors)
- [ ] Use data from mock files (not hardcoded content)
- [ ] Follow WordPress architectural mapping
- [ ] Follow approved block patterns and composition rules
- [ ] Explicitly override component default styling with design system values

---

This Guidelines.md file is the starting point. Always refer to the specialized guidelines files for detailed information about specific components, design tokens, icons, and patterns.

**IMPORTANT:** Some base components may have styling (e.g., gap/typography) baked in as defaults. Make sure you explicitly set any styling information from the guidelines in the generated React to override the defaults.
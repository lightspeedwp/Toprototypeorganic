# File Optimization and Refactoring Prompt

**Version:** 1.0  
**Date:** March 1, 2026  
**Purpose:** Comprehensive audit and refactoring to reduce memory usage, improve maintainability, and follow DRY principles

---

## Objective

Conduct a comprehensive audit of the LightSpeed Tour Operator prototype to identify opportunities for:

1. **File Size Reduction** - Break large files into smaller, manageable modules
2. **DRY Implementation** - Extract repeated patterns into reusable components
3. **CSS Optimization** - Split large CSS files into focused, modular stylesheets
4. **Component Cleanup** - Remove unused components, reduce nesting, simplify variants
5. **SVG Optimization** - Flatten complex vector shapes to reduce memory

---

## Scope

### 1. React/TypeScript Files (.tsx, .ts)

**Focus Areas:**
- **Pages** (`/src/app/pages/*.tsx`) - 73+ page files
- **Data Files** (`/src/app/data/*.ts`) - Mock data, generators, types
- **Components** (`/src/app/components/**/*.tsx`) - Patterns, parts, blocks
- **Utilities** (`/src/app/utils/*.ts`) - Helper functions, validators, auditors

**Audit Criteria:**
- ✅ Files > 500 lines → Consider splitting
- ✅ Duplicate code patterns → Extract to shared module
- ✅ Complex nested components → Flatten structure
- ✅ Unused exports → Remove or consolidate
- ✅ Large data files → Split by logical grouping

### 2. CSS Files (.css)

**Focus Areas:**
- **Global Styles** (`/src/styles/global.css`) - Main stylesheet
- **Theme Files** (`theme.css`, `theme-light.css`, `theme-dark.css`)
- **Pattern Styles** (`/src/styles/patterns/*.css`)
- **Component Styles** (`/src/styles/components/*.css`)
- **Template Styles** (`/src/styles/templates/*.css`)
- **Page Styles** (`/src/styles/pages/*.css`)

**Audit Criteria:**
- ✅ Files > 300 lines → Consider splitting
- ✅ Duplicate selectors → Consolidate into shared classes
- ✅ Unused CSS rules → Remove dead code
- ✅ Overly specific selectors → Simplify
- ✅ Non-semantic class names → Refactor to BEM

### 3. SVG and Vector Assets

**Focus Areas:**
- **Imported SVGs** (`/src/imports/svg-*.ts`)
- **Logo Files** (`/public/logos/*.svg`)
- **Inline SVG components** (e.g., `LogoSVG.tsx`)

**Audit Criteria:**
- ✅ Complex paths → Flatten to reduce nodes
- ✅ Unused layers → Remove hidden/unnecessary elements
- ✅ Optimization opportunities → Reduce precision, remove metadata

### 4. Component Variants

**Focus Areas:**
- **Pattern Components** with multiple visual variations
- **Block Components** with conditional rendering
- **UI Components** (shadcn/ui) with extensive props

**Audit Criteria:**
- ✅ Excessive variants → Replace with component properties
- ✅ Conditional styling → Use CSS classes instead of inline styles
- ✅ Prop drilling → Use context or composition patterns

---

## Audit Questions

For each file/component, answer:

1. **Size:** How many lines? Is it too large?
2. **Purpose:** What is the single responsibility?
3. **Dependencies:** What does it import? Are all imports necessary?
4. **Duplication:** Does it repeat patterns found elsewhere?
5. **Complexity:** Is it overly nested or complex?
6. **Optimization:** Can it be split, simplified, or consolidated?

---

## Audit Process

### Phase 1: Discovery (30 minutes)
1. Count files by type (`.tsx`, `.ts`, `.css`)
2. Identify largest files (top 20 by line count)
3. Map file dependencies and import relationships
4. Identify duplicate code patterns (manual review + grep)

### Phase 2: Analysis (45 minutes)
1. **Pages Analysis** - Identify common patterns across pages
2. **Data Analysis** - Group related data, identify split opportunities
3. **CSS Analysis** - Find duplicate rules, consolidation opportunities
4. **Component Analysis** - Identify over-engineered or under-used components

### Phase 3: Categorization (30 minutes)
1. **High Priority** - Files > 1000 lines, critical performance impact
2. **Medium Priority** - Files 500-1000 lines, moderate duplication
3. **Low Priority** - Files < 500 lines, minor cleanup opportunities

### Phase 4: Recommendations (45 minutes)
1. Specific refactoring strategies for each high-priority item
2. Proposed new file structure (before/after)
3. Estimated complexity and impact for each change
4. Sequencing: Which changes should happen first?

---

## Expected Outputs

### 1. Audit Report (`/reports/[date]-file-optimization-audit.md`)

**Sections:**
- **Executive Summary** - Key findings, high-level recommendations
- **File Size Analysis** - Largest files, line counts, complexity metrics
- **Duplication Analysis** - Repeated patterns, consolidation opportunities
- **CSS Analysis** - Large stylesheets, unused rules, optimization strategies
- **Component Analysis** - Over-engineered components, variant reduction
- **SVG Analysis** - Complex vectors, optimization opportunities
- **Recommendations by Priority** - High/Medium/Low with specific actions

### 2. Task List (`/tasks/file-optimization-tasks.md`)

**Format:**
```markdown
## Phase 1: High Priority (Critical)
- [ ] Split `/src/app/pages/HomePage.tsx` (XYZ lines) into smaller modules
  - [ ] Extract `FeaturedToursSection.tsx`
  - [ ] Extract `DestinationsSection.tsx`
  - [ ] Extract `StatisticsSection.tsx`
- [ ] Consolidate `/src/styles/global.css` (XYZ lines)
  - [ ] Move pattern styles to `/src/styles/patterns/*.css`
  - [ ] Move component styles to `/src/styles/components/*.css`

## Phase 2: Medium Priority (Important)
...

## Phase 3: Low Priority (Cleanup)
...
```

---

## Success Metrics

**Quantitative:**
- ✅ Reduce average file size by 30%
- ✅ Reduce total line count by 20% (through consolidation)
- ✅ Reduce CSS file size by 25%
- ✅ Reduce SVG complexity by 40% (fewer nodes/paths)

**Qualitative:**
- ✅ Improved code maintainability (single responsibility)
- ✅ Faster build times (smaller bundles)
- ✅ Better developer experience (easier to navigate)
- ✅ Reduced memory usage in Figma Make environment

---

## Constraints

**DO NOT:**
- ❌ Change design system tokens or CSS variables
- ❌ Modify WordPress BEM class names (maintain alignment)
- ❌ Break existing component APIs (maintain backwards compatibility)
- ❌ Remove user-facing functionality
- ❌ Change import paths without updating all references

**DO:**
- ✅ Maintain existing file structure organization (no major reorganization)
- ✅ Use relative imports (no absolute paths)
- ✅ Follow WordPress architectural mapping
- ✅ Preserve JSDoc documentation
- ✅ Test after each change to ensure no breakage

---

## Execution Workflow

```
1. CREATE PROMPT → /prompts/file-optimization-and-refactoring.md ✅
2. RUN AUDIT → Execute audit based on prompt
3. SAVE REPORT → /reports/[date]-file-optimization-audit.md
4. CREATE TASKS → /tasks/file-optimization-tasks.md
5. EXECUTE TASKS → Follow task list sequentially by priority
```

---

## Related Guidelines

- `/guidelines/Guidelines.md` - File organization rules, root directory rules
- `/guidelines/overview-components.md` - Component architecture
- `/guidelines/css-architecture.md` - CSS organization principles (if exists)
- `/guidelines/design-tokens/*.md` - Design system constraints

---

## Notes

- This audit is focused on **structural optimization**, not visual redesign
- All changes must maintain **WordPress block theme architectural alignment**
- All styling must continue to use **CSS variables from theme files only**
- All refactoring must follow **DRY principles** and **single responsibility**

---

**End of Prompt**

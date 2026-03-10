# 🔍 CODEBASE AUDIT PROMPT

**Comprehensive Tailwind CSS & Design System Compliance Audit**

**Date Created:** February 24, 2026  
**Audit Type:** Tailwind CSS Class Replacement & Design System Violations  
**Scope:** Entire React/TypeScript codebase

---

## 🎯 **AUDIT OBJECTIVES**

### **Primary Goals:**

1. **Identify ALL Tailwind CSS classes** in TypeScript/React files
2. **Map Tailwind classes** to WordPress theme.json aligned CSS classes
3. **Detect design system violations** (hardcoded values, wrong fonts, inline styles)
4. **Generate replacement plan** for converting to BEM CSS
5. **Create task list** for systematic replacement

### **Success Criteria:**

- ✅ 100% of Tailwind classes identified and categorized
- ✅ All violations documented with file locations
- ✅ Clear replacement mapping provided for each class
- ✅ Prioritized task list created
- ✅ Zero breaking changes in replacement plan

---

## 📋 **AUDIT SCOPE**

### **Files to Audit:**

**React/TypeScript Components:**
```
/src/app/components/
├── parts/*.tsx              # Template parts (Header, Footer)
├── patterns/*.tsx           # Pattern components (Hero, Cards, CTA, etc.)
├── common/*.tsx             # Common utilities
└── ui/*.tsx                 # shadcn/ui components
```

**Page Templates:**
```
/src/app/pages/*.tsx         # All page templates
```

**CSS Files:**
```
/src/styles/
├── *.css                    # All CSS files
├── parts/*.css              # Template part styles
├── patterns/*.css           # Pattern component styles
└── templates/*.css          # Template styles
```

### **What to Look For:**

**1. Tailwind CSS Classes:**
- Layout: `flex`, `grid`, `block`, `inline`, `hidden`, `container`
- Spacing: `p-*`, `m-*`, `gap-*`, `space-*`
- Sizing: `w-*`, `h-*`, `min-*`, `max-*`
- Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`
- Colors: `bg-*`, `text-*`, `border-*`
- Borders: `border-*`, `rounded-*`
- Effects: `shadow-*`, `opacity-*`, `transition-*`
- Responsive: `sm:*`, `md:*`, `lg:*`, `xl:*`
- States: `hover:*`, `focus:*`, `active:*`
- Dark mode: `dark:*` (CRITICAL VIOLATION)

**2. Design System Violations:**
- Hardcoded colors: `style={{ color: '#...' }}`
- Hardcoded fonts: `style={{ fontFamily: '...' }}`
- Inline styles: Any `style={{...}}` attribute
- Wrong fonts: Fonts other than Lora, Noto Sans, Courier New
- Hardcoded sizes: Pixel values in inline styles
- Non-BEM classes: Generic class names like `.button`, `.card`

**3. CSS Variable Usage:**
- Missing CSS variables: Colors, fonts, spacing not using `var(--*)`
- Incorrect variable usage
- Unused CSS classes

---

## 🔍 **AUDIT METHODOLOGY**

### **Phase 1: Discovery (File Scanning)**

**1.1: Scan TypeScript/React Files**

For each `.tsx` file:
- Extract all `className` attributes
- Extract all `style` attributes
- Extract all Tailwind utility classes
- Count occurrences of each class
- Record file path and line number

**1.2: Scan CSS Files**

For each `.css` file:
- Identify unused selectors
- Check for hardcoded values
- Verify CSS variable usage
- Check BEM naming compliance

**1.3: Create Inventory**

Generate complete inventory:
- Total Tailwind classes found
- Breakdown by category (layout, spacing, typography, etc.)
- Most frequently used classes
- Files with most Tailwind usage
- Critical violations (dark: classes, inline styles)

---

### **Phase 2: Classification**

**2.1: Categorize Tailwind Classes**

Group classes by type:

**Layout Classes:**
```
flex, grid, block, inline-flex, inline-block, hidden, container
```

**Spacing Classes:**
```
p-1, p-2, p-4, p-6, p-8, m-1, m-2, m-4, m-6, m-8
gap-1, gap-2, gap-4, gap-6, gap-8
space-x-*, space-y-*
```

**Typography Classes:**
```
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl
font-normal, font-medium, font-semibold, font-bold
leading-tight, leading-normal, leading-relaxed
```

**Color Classes:**
```
bg-white, bg-gray-*, bg-primary, bg-secondary
text-black, text-white, text-gray-*, text-primary
border-gray-*, border-primary
```

**Border Classes:**
```
border, border-2, border-t, border-b
rounded, rounded-sm, rounded-md, rounded-lg, rounded-full
```

**Effect Classes:**
```
shadow, shadow-sm, shadow-md, shadow-lg
opacity-*, transition-*, duration-*
```

**Responsive Classes:**
```
sm:*, md:*, lg:*, xl:*, 2xl:*
```

**State Classes:**
```
hover:*, focus:*, active:*, group-hover:*
```

**Dark Mode Classes (CRITICAL):**
```
dark:* (ALL instances - highest priority)
```

**2.2: Severity Levels**

Assign severity to each finding:

**🔴 CRITICAL (Must fix immediately):**
- `dark:*` classes (breaks design system)
- Inline styles with hardcoded colors
- Wrong fonts (not Lora, Noto Sans, Courier New)
- Hardcoded color values in CSS

**🟠 HIGH (Should fix soon):**
- Tailwind typography classes (`text-*`, `font-*`)
- Tailwind color classes (`bg-*`, `text-*`, `border-*`)
- Tailwind spacing classes (`p-*`, `m-*`, `gap-*`)
- Non-BEM class names

**🟡 MEDIUM (Can fix later):**
- Tailwind layout classes (`flex`, `grid`, etc.)
- Tailwind responsive classes (`md:*`, `lg:*`)
- Unused CSS classes

**🟢 LOW (Nice to have):**
- Code organization improvements
- CSS file consolidation

---

### **Phase 3: Mapping**

**3.1: Create Replacement Map**

For each Tailwind class, provide:
- **Current Tailwind class**
- **Replacement BEM class**
- **Required CSS** (if new class needed)
- **CSS variable to use**
- **Location** (file path, line number)

**Example Mapping:**

```json
{
  "tailwind": "text-2xl font-bold text-gray-900",
  "replacement": "wp-pattern-hero__title",
  "css_required": true,
  "css_class": ".wp-pattern-hero__title { font-family: var(--font-family-lora); font-size: var(--text-2xl); font-weight: var(--font-weight-bold); color: var(--color-foreground); }",
  "files": [
    { "path": "/src/app/components/patterns/Hero.tsx", "line": 45 }
  ]
}
```

**3.2: Create Action Items**

For each file:
- List all classes to replace
- Show before/after code
- Provide replacement CSS if needed
- Estimate effort (simple/medium/complex)

---

### **Phase 4: Prioritization**

**4.1: Priority Order**

1. **P0 - Critical Violations** (Fix immediately)
   - All `dark:*` classes
   - All inline styles with hardcoded values
   - All wrong fonts

2. **P1 - Core Components** (Fix next)
   - Template parts (Header, Footer)
   - Core patterns (Hero, CardGrid, CTA)

3. **P2 - Supporting Components** (Fix after core)
   - Card components (CardTour, CardDestination, etc.)
   - Supporting patterns (EditorialContent, FastFacts, FAQ)

4. **P3 - Utility Components** (Fix last)
   - Navigation patterns (TaxonomyNav, Pagination)
   - Common utilities (Container, Logo, etc.)

**4.2: Effort Estimation**

For each component:
- **Simple** (< 30 min): Few Tailwind classes, straightforward replacement
- **Medium** (30-60 min): Moderate Tailwind usage, some CSS creation needed
- **Complex** (> 60 min): Heavy Tailwind usage, significant CSS work

---

## 📊 **AUDIT REPORT STRUCTURE**

### **Executive Summary**

```
Total files audited: [number]
Total Tailwind classes found: [number]
Total violations found: [number]
Estimated effort: [hours]
Priority breakdown:
  - P0 (Critical): [number] issues
  - P1 (High): [number] issues
  - P2 (Medium): [number] issues
  - P3 (Low): [number] issues
```

### **Detailed Findings**

For each component:

```
Component: [name]
File: [path]
Total Tailwind classes: [number]
Severity: [CRITICAL/HIGH/MEDIUM/LOW]
Effort: [Simple/Medium/Complex]

Tailwind Classes Found:
  - [class] (used [count] times)
  - [class] (used [count] times)

Violations:
  - [severity] [description] at line [number]

Replacement Plan:
  - Replace [old] with [new]
  - Create CSS class: [class name]
  - Required CSS: [css code]

Before:
  [current code]

After:
  [replacement code]
```

### **Replacement Mapping Table**

```
| Tailwind Class | BEM Replacement | CSS Variable | Files Affected | Priority |
|----------------|-----------------|--------------|----------------|----------|
| text-2xl font-bold | .wp-pattern-hero__title | var(--text-2xl), var(--font-weight-bold) | Hero.tsx | P1 |
```

### **Task List**

```
[ ] Task 1: Fix critical violations (dark: classes)
    Files: [list]
    Effort: [estimate]
    Priority: P0

[ ] Task 2: Replace Header component Tailwind classes
    Files: Header.tsx
    Effort: Medium
    Priority: P1
```

---

## 🔍 **SPECIFIC CHECKS**

### **Check 1: Dark Mode Classes**

**Command:**
```bash
grep -rn "dark:" src/app/components/ src/app/pages/
```

**Expected:** ZERO instances (all should use CSS variables)

**If found:**
- List all files
- Show line numbers
- Create P0 task to remove

---

### **Check 2: Inline Styles**

**Command:**
```bash
grep -rn "style={{" src/app/components/ src/app/pages/
```

**Expected:** ZERO instances (all should use CSS classes)

**If found:**
- Extract inline styles
- Convert to BEM class
- Create replacement CSS

---

### **Check 3: Hardcoded Colors**

**Command:**
```bash
grep -rn "#[0-9a-fA-F]\{6\}" src/styles/
```

**Expected:** ZERO instances (all should use CSS variables)

**If found:**
- List all files
- Show context
- Identify CSS variable replacement

---

### **Check 4: Wrong Fonts**

**Search for:**
- `font-family:` without `var(--font-family-*)`
- Font names other than Lora, Noto Sans, Courier New

**Expected:** Only `var(--font-family-lora)`, `var(--font-family-noto-sans)`, `var(--font-family-courier-new)`

---

### **Check 5: Tailwind Typography**

**Classes to find:**
```
text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl
font-normal, font-medium, font-semibold, font-bold
```

**Replacement:** Remove and rely on semantic HTML or BEM classes with CSS variables

---

### **Check 6: Tailwind Spacing**

**Classes to find:**
```
p-1, p-2, p-4, p-6, p-8, p-10, p-12
m-1, m-2, m-4, m-6, m-8, m-10, m-12
gap-1, gap-2, gap-4, gap-6, gap-8
```

**Replacement:** Use CSS variables `var(--spacing-*)` or keep Tailwind classes if appropriate

---

### **Check 7: BEM Naming**

**Check for:**
- Generic class names: `.button`, `.card`, `.hero`
- Non-BEM patterns

**Expected:** All custom classes follow BEM: `.wp-part-*`, `.wp-pattern-*`, `.wp-card-*`

---

## 📝 **AUDIT EXECUTION STEPS**

### **Step 1: Initialize Audit**

1. Create `/reports/` directory
2. Create `/tasks/` directory
3. Set up audit tracking spreadsheet

### **Step 2: Scan Codebase**

1. Run file scanning commands
2. Collect all Tailwind classes
3. Identify all violations
4. Generate raw data file

### **Step 3: Analyze Data**

1. Categorize findings
2. Assign severity levels
3. Calculate statistics
4. Create priority order

### **Step 4: Generate Report**

1. Write executive summary
2. Document detailed findings
3. Create replacement mapping table
4. Generate task list

### **Step 5: Create Tasks**

1. Break work into manageable tasks
2. Assign priority levels
3. Estimate effort
4. Create task files in `/tasks/`

### **Step 6: Review & Approve**

1. Review audit report
2. Validate replacement plan
3. Approve task list
4. Begin execution

---

## 📋 **AUDIT DELIVERABLES**

### **1. Audit Report** (`/reports/tailwind-audit-report.md`)

Complete findings including:
- Executive summary
- Detailed findings per component
- Violation list with severity
- Statistics and charts
- Replacement mapping table

### **2. Task List** (`/tasks/tailwind-replacement-tasks.md`)

Prioritized task list including:
- Task descriptions
- File locations
- Effort estimates
- Priority levels
- Dependencies

### **3. Replacement Guide** (`/reports/replacement-guide.md`)

Step-by-step guide including:
- Before/after examples
- CSS code to add
- Testing checklist
- Common patterns

### **4. Progress Tracker** (`/tasks/progress-tracker.md`)

Track completion including:
- Task status (Not Started/In Progress/Complete)
- Time spent
- Issues encountered
- Notes

---

## ✅ **AUDIT SUCCESS METRICS**

### **Completeness:**
- [ ] 100% of files scanned
- [ ] All Tailwind classes identified
- [ ] All violations documented
- [ ] Replacement plan created

### **Accuracy:**
- [ ] All file paths correct
- [ ] All line numbers accurate
- [ ] Replacement mapping validated
- [ ] CSS variables verified

### **Actionability:**
- [ ] Clear task descriptions
- [ ] Realistic effort estimates
- [ ] Prioritization makes sense
- [ ] Dependencies identified

### **Quality:**
- [ ] Report is well-structured
- [ ] Findings are clear
- [ ] Examples are helpful
- [ ] Ready for execution

---

## 🎯 **POST-AUDIT ACTIONS**

### **After Audit Complete:**

1. **Review Report**
   - Validate findings
   - Check replacement mapping
   - Verify effort estimates

2. **Approve Tasks**
   - Confirm priority order
   - Adjust estimates if needed
   - Identify dependencies

3. **Begin Execution**
   - Start with P0 tasks
   - Work through priority order
   - Track progress

4. **Test & Verify**
   - Test each replacement
   - Verify visual fidelity
   - Check light/dark mode
   - Validate accessibility

5. **Document Changes**
   - Update component docs
   - Note any breaking changes
   - Update style guide

---

## 📖 **REFERENCE DOCUMENTS**

**Before Starting Audit:**
- Read: `/docs/DESIGN-SYSTEM-ENFORCEMENT.md`
- Read: `/docs/COMPLIANCE-CHECKLIST.md`
- Reference: `/docs/CSS-VARIABLES.md`

**During Audit:**
- Use: `/docs/COMPONENT-TEMPLATE.md`
- Reference: `/src/styles/theme.css`

**After Audit:**
- Update: Progress tracker
- Document: Lessons learned
- Share: Report with team

---

## 🚀 **READY TO EXECUTE**

This prompt provides:
- ✅ Clear audit objectives
- ✅ Comprehensive scope definition
- ✅ Systematic methodology
- ✅ Specific checks to run
- ✅ Report structure template
- ✅ Task creation guidelines
- ✅ Success metrics
- ✅ Post-audit action plan

**Next Steps:**
1. Execute audit using this prompt
2. Generate report in `/reports/`
3. Create tasks in `/tasks/`
4. Review and approve
5. Begin replacement work

---

**Audit Prompt Version:** 1.0  
**Date:** February 24, 2026  
**Status:** Ready for Execution

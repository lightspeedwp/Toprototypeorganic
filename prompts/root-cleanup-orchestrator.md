# Root Directory Cleanup - Audit Prompt

**Version:** 1.0  
**Created:** February 25, 2026  
**Type:** Orchestrator Prompt  
**Related Prompts:**
- `/prompts/root-cleanup/phase-1-files-audit.md`
- `/prompts/root-cleanup/phase-2-orphans-audit.md`
- `/prompts/root-cleanup/phase-3-styles-audit.md`
- `/prompts/root-cleanup/phase-4-imports-audit.md`

---

## 🎯 OBJECTIVE

Clean up the root directory and identify orphaned files, unused imports, and unnecessary styles throughout the codebase to:
1. Reduce clutter in root directory
2. Remove unused code (components, imports, styles)
3. Improve build performance
4. Prepare for Figma Make publication
5. Maintain 100% design system compliance

---

## 📋 SCOPE

### Areas to Audit:

#### 1. Root Directory (`/`)
- ✅ Config files (.eslintrc.cjs, .prettierrc, etc.)
- ✅ Documentation files (.md files)
- ✅ Orphaned files (old configs, backups)
- ✅ Entry points (index.html, main.tsx)

#### 2. Source Code (`/src/`)
- ✅ Unused TypeScript/TSX components
- ✅ Orphaned CSS files
- ✅ Unused imports across all files
- ✅ Unused utility functions
- ✅ Dead code paths

#### 3. Styles (`/src/styles/`)
- ✅ Unused CSS files
- ✅ Orphaned style rules
- ✅ Duplicate styles
- ✅ Non-compliant hardcoded values

#### 4. Dependencies (`package.json`)
- ✅ Unused npm packages
- ✅ Development dependencies in production
- ✅ Duplicate dependencies

---

## 🔍 AUDIT CRITERIA

### Root Directory Files

**KEEP:**
- ✅ index.html - Entry point
- ✅ package.json - Dependencies
- ✅ vite.config.ts - Build config
- ✅ tsconfig.json - TypeScript config
- ✅ tsconfig.node.json - Node config
- ✅ .gitignore - Git config
- ✅ README.md - Project overview (optional)

**DELETE:**
- ❌ .eslintrc.cjs - ESLint not in dependencies
- ❌ .prettierrc - Prettier not needed
- ❌ .prettierignore - Prettier not needed
- ❌ .npmrc - May interfere with Figma Make
- ❌ postcss.config.mjs - Empty file
- ❌ main.ts - Old Storybook config
- ❌ All other .md files (move to /docs/ or /guidelines/)

### Component Files

**ORPHAN DETECTION:**
- ❌ Component not imported anywhere
- ❌ Component file exists but export not used
- ❌ Test file without corresponding component
- ❌ Story file without corresponding component

**KEEP IF:**
- ✅ Imported and used in at least one file
- ✅ Exported from index.ts and used elsewhere
- ✅ Part of public API (even if not yet used)

### Style Files

**ORPHAN DETECTION:**
- ❌ CSS file not imported anywhere
- ❌ CSS classes defined but never used
- ❌ Duplicate CSS files (same content)
- ❌ Styles with hardcoded values (design system violations)

**KEEP IF:**
- ✅ Imported in component or global.css
- ✅ Classes actively used in JSX
- ✅ Part of design system (tokens, theme)

### Import Statements

**UNUSED DETECTION:**
- ❌ Imported but never referenced in file
- ❌ Import from non-existent file
- ❌ Circular imports
- ❌ Default import + named import from same module

---

## 🔄 EXECUTION SEQUENCE

### Phase 1: Root Files Audit (5 minutes)
**Prompt:** `/prompts/root-cleanup/phase-1-files-audit.md`
**Task:** Identify all files in root directory
**Output:** `/reports/root-cleanup/phase-1-files-audit.md`

### Phase 2: Component Orphans Audit (10 minutes)
**Prompt:** `/prompts/root-cleanup/phase-2-orphans-audit.md`
**Task:** Find unused components, utilities, and hooks
**Output:** `/reports/root-cleanup/phase-2-orphans-audit.md`

### Phase 3: Styles Audit (10 minutes)
**Prompt:** `/prompts/root-cleanup/phase-3-styles-audit.md`
**Task:** Find unused CSS files and orphaned styles
**Output:** `/reports/root-cleanup/phase-3-styles-audit.md`

### Phase 4: Imports Audit (10 minutes)
**Prompt:** `/prompts/root-cleanup/phase-4-imports-audit.md`
**Task:** Find unused imports across all files
**Output:** `/reports/root-cleanup/phase-4-imports-audit.md`

### Phase 5: Consolidation (5 minutes)
**Task:** Combine all findings into master report
**Output:** `/reports/root-cleanup/master-cleanup-report.md`

### Phase 6: Task Creation (5 minutes)
**Task:** Create actionable task list from findings
**Output:** `/tasks/root-cleanup-tasks.md`

---

## 📊 EXPECTED OUTPUTS

### Reports (in `/reports/root-cleanup/`)
1. `phase-1-files-audit.md` - Root directory file analysis
2. `phase-2-orphans-audit.md` - Unused components/utilities
3. `phase-3-styles-audit.md` - Unused CSS files and rules
4. `phase-4-imports-audit.md` - Unused import statements
5. `master-cleanup-report.md` - Consolidated findings

### Tasks (in `/tasks/`)
1. `root-cleanup-tasks.md` - Prioritized cleanup checklist

---

## ✅ SUCCESS CRITERIA

### Metrics:
- ✅ Root directory has ≤ 10 files
- ✅ Zero unused component files
- ✅ Zero unused CSS files
- ✅ Zero unused imports
- ✅ 100% design system compliance maintained
- ✅ Build still succeeds after cleanup
- ✅ All tests still pass after cleanup

### Validation:
1. Run `npm run build` - Should succeed
2. Check bundle size - Should reduce
3. Check for TypeScript errors - Should be zero
4. Verify all pages still render correctly

---

## ⚠️ SAFETY RULES

### DO NOT DELETE:
- ❌ Any file in `/guidelines/` folder
- ❌ Any file in `/src/app/components/figma/` (protected)
- ❌ Active page components in `/src/app/pages/`
- ❌ Core routes in `/src/app/routes.ts`
- ❌ Design system files in `/src/styles/`
- ❌ Mock data in `/src/app/data/`

### VERIFY BEFORE DELETING:
- ✅ Search codebase for imports of the file
- ✅ Check if file is referenced in routes
- ✅ Verify no dynamic imports (e.g., lazy loading)
- ✅ Check if file is part of build output
- ✅ Ensure removal doesn't break design system compliance

### BACKUP STRATEGY:
- ✅ Move files to `/archive/` folder first
- ✅ Test build after each batch of deletions
- ✅ Commit changes incrementally
- ✅ Keep record of deleted files in report

---

## 📝 EXECUTION INSTRUCTIONS

### For AI Assistant:

1. **Read this prompt completely**
2. **Execute Phase 1**: Run files audit, save report
3. **Execute Phase 2**: Run orphans audit, save report
4. **Execute Phase 3**: Run styles audit, save report
5. **Execute Phase 4**: Run imports audit, save report
6. **Execute Phase 5**: Consolidate findings into master report
7. **Execute Phase 6**: Create task list from findings
8. **Update**: Add tasks to `/tasks/task-list.md`

### For Developer:

1. **Review all reports** in `/reports/root-cleanup/`
2. **Prioritize tasks** in `/tasks/root-cleanup-tasks.md`
3. **Execute deletions** in batches
4. **Test after each batch**: `npm run build`
5. **Verify pages still work**
6. **Commit changes**: Document what was deleted

---

## 🎯 NEXT STEPS AFTER COMPLETION

1. ✅ Mark cleanup tasks as complete in `/tasks/task-list.md`
2. ✅ Archive reports to `/reports/archive/`
3. ✅ Update README.md with clean file structure
4. ✅ Test Figma Make publication
5. ✅ Run final design system compliance audit

---

**Status:** Ready to Execute  
**Estimated Time:** 45 minutes  
**Risk Level:** Low (with verification steps)  
**Dependencies:** None

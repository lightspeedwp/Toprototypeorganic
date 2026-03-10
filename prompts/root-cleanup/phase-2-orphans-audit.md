# Phase 2: Component Orphans Audit

**Parent Prompt:** `/prompts/root-cleanup-orchestrator.md`  
**Phase:** 2 of 4  
**Duration:** 10 minutes  
**Output:** `/reports/root-cleanup/phase-2-orphans-audit.md`

---

## 🎯 OBJECTIVE

Identify unused/orphaned files in the source code:
- Components (.tsx files)
- Utilities (.ts files in /lib/)
- Hooks (.ts files in /hooks/)
- Data files (.ts files in /data/)
- Context providers

---

## 🔍 DETECTION CRITERIA

### Orphaned Component:
- ❌ Not imported in any file
- ❌ Not referenced in routes
- ❌ Not used in any other component
- ❌ Not part of lazy loading

### Orphaned Utility:
- ❌ Function defined but never called
- ❌ Exported but not imported anywhere
- ❌ Duplicate functionality exists

### Orphaned Hook:
- ❌ Defined but never used
- ❌ Superseded by new implementation

---

## 📊 AUDIT SCOPE

### Check These Folders:
1. `/src/app/components/` - All component files
2. `/src/app/lib/` - Utility functions
3. `/src/app/hooks/` - Custom hooks
4. `/src/app/contexts/` - Context providers
5. `/src/app/utils/` - Utility functions

### Exclude From Audit:
- ❌ `/src/app/components/figma/` - Protected folder
- ❌ `/src/app/data/` - Mock data (keep all)
- ❌ `/guidelines/` - Documentation

---

## 🔧 EXECUTION STEPS

1. **List all .tsx/.ts files** in scope
2. **For each file:** Search codebase for imports
3. **Check routes.ts:** Verify page components are used
4. **Check lazy loading:** Verify React.lazy() references
5. **Generate findings:** List unused files

---

## ✅ COMPLETION CRITERIA

- [x] All components checked for usage
- [x] All utilities checked for usage
- [x] All hooks checked for usage
- [x] Report generated with findings
- [x] Saved to `/reports/root-cleanup/phase-2-orphans-audit.md`

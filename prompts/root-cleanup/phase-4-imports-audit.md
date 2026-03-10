# Phase 4: Imports Audit

**Parent Prompt:** `/prompts/root-cleanup-orchestrator.md`  
**Phase:** 4 of 4  
**Duration:** 10 minutes  
**Output:** `/reports/root-cleanup/phase-4-imports-audit.md`

---

## 🎯 OBJECTIVE

Identify unused import statements across the codebase:
- Imported but never used
- Duplicate imports
- Import from non-existent files
- Circular imports

---

## 🔍 DETECTION CRITERIA

### Unused Import:
- ❌ Imported but never referenced in file
- ❌ Import of entire module when only one export needed
- ❌ Duplicate named + default imports

### Problem Import:
- ❌ Import from non-existent file (TypeScript error)
- ❌ Circular import (A imports B, B imports A)
- ❌ Import path incorrect (../../../ vs @/ alias)

---

## 📊 AUDIT SCOPE

### Check These Folders:
1. `/src/app/` - All .tsx/.ts files
2. Focus on high file count folders:
   - `/src/app/pages/`
   - `/src/app/components/`
   - `/src/app/lib/`

---

## 🔧 EXECUTION STEPS

1. **Sample key files** (don't audit all 314 files)
2. **Check imports vs usage** in each file
3. **Identify patterns** of unused imports
4. **Generate recommendations** for cleanup

---

## ✅ COMPLETION CRITERIA

- [x] Sample of files audited (20-30 files)
- [x] Unused imports identified
- [x] Patterns documented
- [x] Report generated with findings
- [x] Saved to `/reports/root-cleanup/phase-4-imports-audit.md`

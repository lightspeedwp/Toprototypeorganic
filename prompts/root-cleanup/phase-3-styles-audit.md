# Phase 3: Styles Audit

**Parent Prompt:** `/prompts/root-cleanup-orchestrator.md`  
**Phase:** 3 of 4  
**Duration:** 10 minutes  
**Output:** `/reports/root-cleanup/phase-3-styles-audit.md`

---

## 🎯 OBJECTIVE

Identify unused CSS files and orphaned styles:
- CSS files not imported anywhere
- CSS classes defined but never used
- Duplicate CSS files
- Design system violations (hardcoded values)

---

## 🔍 DETECTION CRITERIA

### Orphaned CSS File:
- ❌ Not imported in any component
- ❌ Not imported in global.css
- ❌ Classes never referenced in JSX

### Orphaned CSS Class:
- ❌ Defined in CSS but never used in className
- ❌ Duplicate of existing class
- ❌ Superseded by new implementation

### Design System Violation:
- ❌ Hardcoded colors (#548235, white, etc.)
- ❌ Hardcoded fonts (Arial, Helvetica)
- ❌ Non-semantic class names

---

## 📊 AUDIT SCOPE

### Check These Folders:
1. `/src/styles/` - All CSS files
2. `/src/styles/parts/` - Template part styles
3. `/src/styles/patterns/` - Pattern styles
4. `/src/styles/templates/` - Template styles
5. `/src/styles/common/` - Common styles

---

## 🔧 EXECUTION STEPS

1. **List all .css files**
2. **Check if imported:** Search for @import statements
3. **Check class usage:** Search codebase for className references
4. **Check for hardcoded values:** Scan for violations
5. **Generate findings:** List unused/problematic files

---

## ✅ COMPLETION CRITERIA

- [x] All CSS files checked for imports
- [x] All CSS classes checked for usage
- [x] Design system compliance verified
- [x] Report generated with findings
- [x] Saved to `/reports/root-cleanup/phase-3-styles-audit.md`

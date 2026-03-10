# Phase 1: Root Files Audit

**Parent Prompt:** `/prompts/root-cleanup-orchestrator.md`  
**Phase:** 1 of 4  
**Duration:** 5 minutes  
**Output:** `/reports/root-cleanup/phase-1-files-audit.md`

---

## 🎯 OBJECTIVE

Audit all files in the root directory (`/`) and categorize them as:
- ✅ **KEEP** - Essential files needed for build/deployment
- ⚠️ **MOVE** - Documentation files to relocate to proper folders
- ❌ **DELETE** - Unnecessary config files, orphaned files

---

## 🔍 AUDIT CHECKLIST

### Essential Files (KEEP)
- [ ] index.html - HTML entry point
- [ ] package.json - Dependencies
- [ ] vite.config.ts - Vite configuration
- [ ] tsconfig.json - TypeScript configuration
- [ ] tsconfig.node.json - Node TypeScript configuration
- [ ] .gitignore - Git ignore rules
- [ ] README.md (optional) - Project overview

### Config Files to Review
- [ ] .eslintrc.cjs - Check if ESLint is in dependencies
- [ ] .prettierrc - Check if Prettier is needed
- [ ] .prettierignore - Check if Prettier is needed
- [ ] .npmrc - Check if it interferes with Figma Make
- [ ] postcss.config.mjs - Check if it's empty/needed
- [ ] main.ts - Check what it contains

### Documentation Files
- [ ] Count .md files in root
- [ ] Identify documentation vs essential
- [ ] Check for duplicates
- [ ] Check for outdated reports

---

## 📊 ANALYSIS CRITERIA

### For Config Files:
**Decision Matrix:**
```
IF file requires dependency NOT in package.json → DELETE
IF file is empty or default → DELETE
IF file conflicts with Figma Make → DELETE
IF file is essential for build → KEEP
IF file is optional but useful → KEEP (with note)
```

### For Documentation Files:
**Decision Matrix:**
```
IF file is README.md → KEEP in root
IF file is guideline → MOVE to /guidelines/
IF file is report → MOVE to /reports/
IF file is task list → MOVE to /tasks/
IF file is archived/old → DELETE or archive
IF file is duplicate → DELETE (keep latest)
```

---

## 🔧 EXECUTION STEPS

1. **List all files in root**: Use bash to get complete file list
2. **Categorize each file**: Apply decision matrix
3. **Check dependencies**: Verify package.json for required packages
4. **Check file dates**: Identify old files (>30 days)
5. **Check file content**: Quick scan for empty/default configs
6. **Generate recommendations**: Create action list per file

---

## 📝 REPORT FORMAT

```markdown
# Phase 1: Root Files Audit Report

## Summary
- Total files in root: X
- Essential files: Y
- Files to delete: Z
- Files to move: W

## Essential Files (KEEP)
| File | Purpose | Status |
|------|---------|--------|
| index.html | HTML entry | ✅ Keep |

## Files to Delete
| File | Reason | Risk |
|------|--------|------|
| .eslintrc.cjs | ESLint not installed | Low |

## Files to Move
| File | Move To | Reason |
|------|---------|--------|
| AUDIT-REPORT.md | /reports/ | Old report |

## Recommendations
1. Delete X unnecessary config files
2. Move Y documentation files
3. Archive Z old reports

## Next Steps
- Execute deletions via delete_tool
- Move files to appropriate folders
- Update .gitignore if needed
```

---

## ✅ COMPLETION CRITERIA

- [x] All root files identified
- [x] Each file categorized (KEEP/DELETE/MOVE)
- [x] Dependencies verified
- [x] Report generated
- [x] Saved to `/reports/root-cleanup/phase-1-files-audit.md`

---

**Status:** Ready to Execute  
**Risk Level:** Low  
**Dependencies:** None

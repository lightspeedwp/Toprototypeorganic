# Root Directory Cleanup - Critical Action Required

**Date:** February 25, 2026  
**Priority:** 🚨 **IMMEDIATE**  
**Issue:** Multiple .md files created in root that violate organization rules

---

## 🚨 PROBLEM

The following files were incorrectly placed in root directory:

### Violating Files (Need Immediate Action):
1. `/QUICK-REFERENCE-PROJECT-ORGANIZATION.md` → MOVED to `/docs/`
2. `/FIGMA-MAKE-CLEANUP-PLAN.md` → Need to move to `/docs/figma-make/`
3. `/FIGMA-MAKE-READY-SUMMARY.md` → Need to move to `/docs/figma-make/`
4. `/QUICK-START-GUIDE.md` → Need to move to `/docs/figma-make/`

### Additional Files Found (287 total .md files in root!):
- ACCESSIBILITY-* files
- AUDIT-* files  
- BATCH-* files (65+ files)
- PROJECT-* files
- QUICK-* files
- Many more...

---

## ✅ SOLUTION

### Immediate Actions (AI Assistant):

1. **Move Figma Make Documentation**
   - Create `/docs/figma-make/` folder
   - Move FIGMA-MAKE-*.md files
   - Move QUICK-START-GUIDE.md

2. **Update Guidelines** ✅ DONE
   - Added strict root directory rules
   - Only README.md and CHANGELOG.md allowed

3. **Update Task List**
   - Document all files that need moving
   - Create systematic cleanup plan

### Next Actions (Developer):

4. **Execute Bulk Move**
   - Follow `/tasks/root-cleanup-tasks.md`
   - Move all 287 .md files to proper folders
   - Test build after each batch

---

## 📋 CORRECT FILE PLACEMENT

| File Type | Destination | Example |
|-----------|-------------|---------|
| Figma Make docs | `/docs/figma-make/` | cleanup-plan.md |
| Quick reference guides | `/docs/` | quick-reference.md |
| Project summaries | `/reports/` or `/docs/` | project-summary.md |
| Audit reports | `/reports/archive/` | audit-report.md |
| Batch reports | `/reports/archive/batches/` | batch-1.md |
| Task lists | `/tasks/` | cleanup-tasks.md |
| Guidelines | `/guidelines/` | component-guide.md |

---

## 📊 ROOT DIRECTORY RULES (Updated)

### ✅ ALLOWED IN ROOT (Only 9 files max):
1. README.md
2. CHANGELOG.md
3. index.html
4. package.json
5. vite.config.ts
6. tsconfig.json
7. tsconfig.node.json
8. .gitignore
9. pnpm-lock.yaml (auto-generated)

### ❌ NEVER IN ROOT:
- ANY other .md files
- Reports, guides, summaries
- Task lists, checklists
- Old configs, backups
- Documentation files

---

## 🔧 MANUAL CLEANUP REQUIRED

Since AI cannot bulk-move 287 files, developer must:

1. **Create destination folders:**
   ```bash
   mkdir -p /docs/figma-make
   mkdir -p /reports/archive/batches
   mkdir -p /reports/archive/completed
   mkdir -p /tasks/archive
   ```

2. **Move files in batches:**
   ```bash
   # Move Figma Make docs
   mv FIGMA-MAKE-*.md /docs/figma-make/
   mv QUICK-START-GUIDE.md /docs/figma-make/
   
   # Move batch reports
   mv BATCH-*.md /reports/archive/batches/
   
   # Move completed reports
   mv *COMPLETE*.md /reports/archive/completed/
   
   # Move audit reports
   mv AUDIT-*.md /reports/archive/
   
   # Move all other .md files (except README/CHANGELOG)
   # Review each category and move appropriately
   ```

3. **Test after each batch:**
   ```bash
   npm run build
   npm run dev
   ```

4. **Verify root is clean:**
   ```bash
   ls -1 *.md
   # Should only show README.md or CHANGELOG.md (if exists)
   ```

---

## ⚠️ LESSON LEARNED

**For AI Assistants:**
- ✅ ALWAYS check destination folder before creating .md files
- ✅ NEVER create .md files in root (except README/CHANGELOG)
- ✅ When in doubt, put in `/docs/` folder
- ✅ Reference `/guidelines/Guidelines.md` for file placement rules

**For Developers:**
- ✅ Review root directory weekly
- ✅ Move misplaced files immediately
- ✅ Enforce strict file organization

---

## 📈 EXPECTED OUTCOME

**Before:**
- Root: 314 files (chaos!)
- 287 .md files in root
- Hard to find anything

**After:**
- Root: 7-9 files (clean!)
- All .md files in proper folders
- Easy to navigate

---

**Status:** 🔴 Action Required  
**Assigned:** Developer (manual cleanup needed)  
**Priority:** 🚨 CRITICAL  
**Next:** Follow `/tasks/root-cleanup-tasks.md`

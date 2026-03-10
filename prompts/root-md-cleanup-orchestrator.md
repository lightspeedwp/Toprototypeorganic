# Root Directory .md Files Cleanup - Orchestrator Prompt

**Created:** February 25, 2026  
**Purpose:** Systematically clean up 284+ .md files from root directory  
**Priority:** 🚨 CRITICAL  
**Est. Time:** 60-90 minutes

---

## 🎯 OBJECTIVE

Remove ALL .md files from root directory except:
- README.md (if exists)
- CHANGELOG.md (if exists)

**Target:** Reduce from 286 .md files → 0-2 files

---

## 📋 CATEGORIZATION STRATEGY

### Category 1: BATCH REPORTS (~26 files)
**Pattern:** `BATCH-*.md`  
**Action:** DELETE (all completed, archived elsewhere)  
**Examples:** BATCH-10-SUMMARY.md, BATCH-15-COMPLETE.md

### Category 2: AUDIT REPORTS (~50 files)
**Pattern:** `AUDIT-*.md`, `*-AUDIT-*.md`  
**Action:** DELETE (old audit reports from December 2024)  
**Examples:** AUDIT-COMPLETE.md, GUIDELINES-AUDIT-REPORT.md

### Category 3: COMPLETION SUMMARIES (~40 files)
**Pattern:** `*-COMPLETE.md`, `*-SUMMARY.md`  
**Action:** DELETE (old completion reports)  
**Examples:** BREADCRUMBS-COMPONENT-COMPLETE.md, AUTOMATION-COMPLETE-SUMMARY.md

### Category 4: TASK LISTS (~10 files)
**Pattern:** `*-TASKS*.md`, `*-CHECKLIST.md`, `TODO*.md`  
**Action:** CHECK for current tasks, then DELETE if outdated (all from December)  
**Examples:** INCOMPLETE-TASKS-AND-IMPROVEMENTS.md, TEMPLATE-FIX-TASK-LIST.md

###Category 5: GUIDES & REFERENCES (~30 files)
**Pattern:** `*-GUIDE.md`, `*-QUICK-*.md`, `*-REFERENCE.md`  
**Action:** EVALUATE - Move important ones to /docs/, delete rest  
**Examples:** MIGRATION-GUIDE.md, DEV-TOOLS-QUICK-REFERENCE.md

### Category 6: PROJECT SUMMARIES (~15 files)
**Pattern:** `PROJECT-*.md`, `COMPLETE-PROJECT-*.md`  
**Action:** DELETE (old project summaries)  
**Examples:** PROJECT-COMPLETE.md, COMPLETE-PROJECT-INDEX.md

### Category 7: GUIDELINES UPDATES (~20 files)
**Pattern:** `GUIDELINES-*.md`, `*-GUIDELINES-*.md`  
**Action:** DELETE (old guideline updates, current guidelines in /guidelines/)  
**Examples:** GUIDELINES-AUDIT-AND-FIXES.md, FINAL-GUIDELINES-UPDATE-SUMMARY.md

### Category 8: ACCESSIBILITY REPORTS (~15 files)
**Pattern:** `ACCESSIBILITY-*.md`, `WCAG-*.md`  
**Action:** DELETE (old accessibility reports from December)  
**Examples:** ACCESSIBILITY-PHASE-2-QUICK-SUMMARY.md, WCAG-AAA-COMPLIANCE-GUIDE.md

### Category 9: MISCELLANEOUS (~78 files)
**Pattern:** Various  
**Action:** EVALUATE case-by-case  
**Examples:** ATTRIBUTIONS.md, MIGRATION-GUIDE.md, etc.

---

## 🔍 EVALUATION CRITERIA

**DELETE if:**
- ✅ File is a completion report from December 2024 or earlier
- ✅ File is a batch summary (BATCH-*.md)
- ✅ File is an old audit report
- ✅ File is a duplicate of existing documentation in /docs/ or /guidelines/
- ✅ File contains outdated task lists (all tasks from December)
- ✅ File is a temporary summary or status report

**KEEP (move to /docs/) if:**
- ✅ File contains reusable reference information
- ✅ File is a comprehensive guide that's still relevant
- ✅ File documents design system patterns (move to /docs/guides/)
- ✅ File contains migration instructions (move to /docs/)

**Examples to KEEP:**
- MIGRATION-GUIDE.md → /docs/migration-guide.md
- COMPONENT-TEMPLATES-GUIDE.md → /docs/guides/component-templates.md
- DEV-TOOLS-QUICK-REFERENCE.md → /docs/guides/dev-tools-reference.md

**Examples to DELETE:**
- All BATCH-*.md files (completed batches)
- All *-COMPLETE.md files (old completion reports)
- All AUDIT-*.md files (old audit reports)
- All PROJECT-*.md files (old project summaries)
- All GUIDELINES-*.md files (guidelines are in /guidelines/ folder)
- All ACCESSIBILITY-*.md files from December (old reports)
- All WCAG-*.md files from December (old compliance reports)

---

## 📊 EXECUTION PLAN

### Step 1: List and Count
```bash
ls -1 *.md | grep -v "README\|CHANGELOG" | wc -l
```

### Step 2: Delete by Category

**Batch 1 - BATCH Reports (26 files):**
```bash
ls -1 BATCH-*.md
# Review list, then delete all
```

**Batch 2 - AUDIT Reports (50 files):**
```bash
ls -1 *AUDIT*.md
# Review list, then delete all
```

**Batch 3 - COMPLETE/SUMMARY (40 files):**
```bash
ls -1 *-COMPLETE.md *-SUMMARY.md
# Review list, then delete all
```

**Batch 4 - TASK LISTS (10 files):**
```bash
ls -1 *-TASK*.md *-CHECKLIST.md
# Review, check for current tasks, delete outdated ones
```

**Batch 5 - GUIDELINES Updates (20 files):**
```bash
ls -1 GUIDELINES-*.md *-GUIDELINES-*.md
# Delete all (current guidelines in /guidelines/)
```

**Batch 6 - PROJECT Summaries (15 files):**
```bash
ls -1 PROJECT-*.md *-PROJECT-*.md
# Delete all (old summaries)
```

**Batch 7 - ACCESSIBILITY Reports (15 files):**
```bash
ls -1 ACCESSIBILITY-*.md WCAG-*.md
# Delete all from December
```

**Batch 8 - Evaluate Remaining (~108 files):**
- Review each file individually
- Move important guides to /docs/guides/
- Delete outdated reports and summaries

### Step 3: Verify
```bash
ls -1 *.md | grep -v "README\|CHANGELOG" | wc -l
# Should be 0-2 (only README/CHANGELOG)
```

---

## ⚠️ SAFEGUARDS

1. **Never delete README.md or CHANGELOG.md**
2. **Check file date** - If from December 2024 or earlier, likely safe to delete
3. **Check file content** - If it's a completion/summary report, safe to delete
4. **When in doubt** - Ask before deleting

---

## 📈 SUCCESS CRITERIA

- [x] All BATCH-*.md files deleted
- [x] All old AUDIT-*.md files deleted
- [x] All *-COMPLETE.md files deleted
- [x] All old TASK-*.md files deleted
- [x] All GUIDELINES-*.md files deleted
- [x] All PROJECT-*.md files deleted
- [x] All ACCESSIBILITY-*.md files from December deleted
- [x] Important guides moved to /docs/guides/
- [x] Root directory has 0-2 .md files (only README/CHANGELOG)
- [x] Verify build still works: `npm run build`

---

## 🎯 OUTCOME

**Before:** 286 .md files in root  
**After:** 0-2 .md files in root  
**Reduction:** ~284 files (99%+ cleanup)

---

**Next Steps:**
1. Execute this prompt systematically
2. Create audit report in /reports/
3. Update /tasks/task-list.md with completion status
4. Verify build after cleanup

---

**References:**
- **Guidelines:** `/guidelines/Guidelines.md` (root directory rules)
- **Tasks:** `/tasks/root-cleanup-tasks.md`
- **Reports:** Save to `/reports/2026-02-25-root-md-cleanup-report.md`

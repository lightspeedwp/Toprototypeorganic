# Project Organization - Quick Reference Guide

**Last Updated:** February 25, 2026  
**Purpose:** Quick reference for task, prompt, and report management

---

## 🗂️ FOLDER STRUCTURE

```
/
├── /tasks/
│   ├── task-list.md          ⭐ Master list (NEVER DELETE)
│   ├── [name]-tasks.md       Individual task lists
│   └── /archive/             Completed tasks
│
├── /prompts/
│   ├── [name]-prompt.md      Single prompts
│   └── /[project]/           Multi-step prompts
│       ├── orchestrator.md   Master prompt
│       └── step-*.md         Sub-prompts
│
└── /reports/
    ├── [date]-[name].md      Recent reports
    └── /archive/             Old reports (>30 days)
```

---

## 🔄 STANDARD WORKFLOW

```
User Request
     ↓
1. CREATE PROMPT → /prompts/[name].md
     ↓
2. RUN AUDIT → Execute the audit
     ↓
3. SAVE REPORT → /reports/[date]-[name].md
     ↓
4. CREATE TASKS → /tasks/[name]-tasks.md
     ↓
5. UPDATE MASTER → /tasks/task-list.md
```

---

## 📝 NAMING CONVENTIONS

### Prompts:
- `[purpose]-prompt.md` (e.g., `css-audit-prompt.md`)
- `[project]-orchestrator.md` (e.g., `root-cleanup-orchestrator.md`)

### Reports:
- `[YYYY-MM-DD]-[purpose]-report.md` (e.g., `2026-02-25-css-audit-report.md`)
- Use subfolders for related reports

### Tasks:
- `[purpose]-tasks.md` (e.g., `css-fixes-tasks.md`)
- Always update master: `task-list.md`

---

## ✅ CHECKLIST

### When Creating a Prompt:
- [ ] Save to `/prompts/` folder
- [ ] Include clear objective
- [ ] Define audit criteria
- [ ] Specify output format
- [ ] Document execution steps

### When Running an Audit:
- [ ] Follow prompt instructions
- [ ] Document all findings
- [ ] Save report to `/reports/`
- [ ] Use date in filename
- [ ] Create subfolder if needed

### When Saving a Report:
- [ ] Use date-stamped filename
- [ ] Include executive summary
- [ ] List all findings
- [ ] Provide recommendations
- [ ] Reference source guidelines

### When Creating Tasks:
- [ ] Save to `/tasks/` folder
- [ ] Use checkboxes [ ]
- [ ] Prioritize tasks
- [ ] Estimate time
- [ ] Add to master list

---

## 🎯 QUICK EXAMPLES

### Example 1: CSS Audit
```
1. Create: /prompts/css-compliance-audit.md
2. Run: Audit all CSS files for design tokens
3. Save: /reports/2026-02-25-css-compliance-report.md
4. Create: /tasks/css-compliance-fixes.md
5. Update: /tasks/task-list.md (add CSS fixes)
```

### Example 2: Component Cleanup
```
1. Create: /prompts/component-orphans-audit.md
2. Run: Find unused components
3. Save: /reports/2026-02-25-component-orphans-report.md
4. Create: /tasks/component-cleanup-tasks.md
5. Update: /tasks/task-list.md (add cleanup)
```

---

## 📚 KEY GUIDELINES

### Task Management:
- ✅ Master list is `/tasks/task-list.md` (NEVER DELETE)
- ✅ All task files go in `/tasks/`
- ✅ Archive completed tasks to `/tasks/archive/`
- ✅ Update master list when creating new task files

### Prompt Management:
- ✅ All prompts go in `/prompts/`
- ✅ Use subfolders for multi-step prompts
- ✅ Keep prompts for reuse
- ✅ Document dependencies in headers

### Report Management:
- ✅ All reports go in `/reports/`
- ✅ Use date-stamped filenames
- ✅ Archive old reports (>30 days)
- ✅ Group related reports in subfolders

### Root Directory:
- ✅ Only README.md and CHANGELOG.md allowed
- ✅ All documentation goes in `/docs/`
- ✅ All reports go in `/reports/`
- ✅ All tasks go in `/tasks/`

---

## ⚠️ IMPORTANT RULES

### DO:
- ✅ Create prompts before starting work
- ✅ Save reports after audits
- ✅ Update master task list
- ✅ Reference specific guidelines
- ✅ Test after changes
- ✅ Archive old work

### DON'T:
- ❌ Delete `/tasks/task-list.md` (master list)
- ❌ Put ANY .md files in root (except README/CHANGELOG)
- ❌ Skip creating prompts
- ❌ Forget to update master list
- ❌ Delete guidelines
- ❌ Leave work undocumented

---

## 🔍 FINDING FILES

### Need to find a task?
```
ls /tasks/
ls /tasks/archive/
```

### Need to find a prompt?
```
ls /prompts/
ls /prompts/*/
```

### Need to find a report?
```
ls /reports/
ls /reports/archive/
```

### Need recent work?
```
ls -lt /reports/ | head -10
ls -lt /tasks/ | head -10
```

---

## 📊 MAINTENANCE

### Weekly:
- [ ] Review open tasks in master list
- [ ] Mark completed tasks with [x]
- [ ] Move old reports to archive (>30 days)
- [ ] Archive completed task files
- [ ] Update master list

### Monthly:
- [ ] Clean archive folders
- [ ] Delete very old reports (>90 days)
- [ ] Review and update guidelines
- [ ] Verify root directory is clean (only README/CHANGELOG)

---

## 🚀 GETTING STARTED

### First Time?

1. **Read Guidelines**
   - `/guidelines/Guidelines.md`
   - Section: "🗂️ PROJECT ORGANIZATION & WORKFLOW"

2. **Check Master Task List**
   - `/tasks/task-list.md`
   - See what's currently open

3. **Review Example Prompt**
   - `/prompts/root-cleanup-orchestrator.md`
   - See how prompts are structured

4. **Review Example Report**
   - `/reports/root-cleanup/phase-1-files-audit.md`
   - See how reports are formatted

5. **Start Working**
   - Follow standard workflow
   - Create prompt → Run audit → Save report → Create tasks

---

## 🆘 TROUBLESHOOTING

### Can't find a file?
- Check `/tasks/`, `/prompts/`, `/reports/`
- Check archive folders
- Use `find` command

### Don't know what to work on?
- Check `/tasks/task-list.md`
- Look for high-priority items
- Check recent reports for recommendations

### Not sure how to structure something?
- Look at existing examples
- Follow naming conventions
- Reference guidelines

---

**Quick Links:**
- **Guidelines:** `/guidelines/Guidelines.md`
- **Master Tasks:** `/tasks/task-list.md`
- **Example Prompt:** `/prompts/root-cleanup-orchestrator.md`
- **Example Report:** `/reports/root-cleanup/phase-1-files-audit.md`
- **Example Tasks:** `/tasks/root-cleanup-tasks.md`

---

**Status:** ✅ Ready to Use  
**Version:** 1.0.0  
**Last Updated:** February 25, 2026

#!/bin/bash
# Archive Completed Task Files
# Moves all completed reports to /tasks/archive/
# Keeps only active reference files in /tasks/
# 
# Run from project root: bash scripts/archive-tasks.sh

echo "🗂️  Task Archive Migration"
echo "======================================"
echo ""

# Navigate to tasks folder
cd tasks || { echo "❌ Error: /tasks/ folder not found"; exit 1; }

# Create archive folder if it doesn't exist
mkdir -p archive

echo "📦 Moving completed reports to archive..."
echo ""

# Track counts
moved=0
failed=0

# Function to move file with error handling
move_file() {
  if [ -f "$1" ]; then
    mv "$1" archive/ && ((moved++)) && echo "  ✅ $1"
  else
    ((failed++))
  fi
}

echo "📋 Phase Reports (16 files):"
move_file "phase-0-completion-report.md"
move_file "phase-1-completion-report.md"
move_file "phase-2-completion-report.md"
move_file "phase-2-complete-FINAL.md"
move_file "phase-2-progress-report.md"
move_file "phase-4-complete-summary.md"
move_file "phase-4-wave-1-complete.md"
move_file "phase-4-wave-2-complete.md"
move_file "phase-4-wave-3-complete.md"
move_file "phase-4-wave-4-complete.md"
move_file "phase-4-wave-5-audit.md"
move_file "phase-4-wave-5-complete.md"
move_file "phase-5-complete.md"
move_file "phase-5-plan.md"
move_file "phase-6-verification.md"
move_file "PROJECT-COMPLETE.md"
echo ""

echo "📋 Wave Reports (8 files):"
move_file "wave-1-migration-complete.md"
move_file "wave-2-complete.md"
move_file "wave-2-FINAL-complete.md"
move_file "wave-2-progress.md"
move_file "wave-3-complete.md"
move_file "wave-3-progress.md"
move_file "wave-3-progress-update.md"
move_file "wave-4-complete-FINAL.md"
echo ""

echo "📋 Migration Reports (9 files):"
move_file "HOMEPAGE-MIGRATION-EXAMPLES.md"
move_file "HOMEPAGE-MIGRATION-GUIDE.md"
move_file "HOMEPAGE-MIGRATION-REPORT.md"
move_file "homepage-migration-complete.md"
move_file "homepage-migration-complete-feb-25.md"
move_file "toursingle-migration-complete-feb-25.md"
move_file "three-page-migrations-report.md"
move_file "breadcrumbs-css-fix-feb-25.md"
move_file "migration-progress-update.md"
echo ""

echo "📋 Audit Reports (7 files):"
move_file "tailwind-to-wordpress-migration.md"
move_file "tailwind-wordpress-migration-summary.md"
move_file "tailwind-replacement-tasks.md"
move_file "wordpress-css-migration-audit.md"
move_file "css-data-audit-remediation.md"
move_file "css-enabled-summary.md"
move_file "option-a-complete-pattern-css.md"
echo ""

echo "📋 Session Summaries (7 files):"
move_file "session-summary-feb-24-2026.md"
move_file "continue-session-summary.md"
move_file "current-status-feb-25-2026.md"
move_file "progress-summary-feb-25-2026-final.md"
move_file "wordpress-css-migration-session-feb-27-2026.md"
move_file "wordpress-css-migration-session-2-feb-27-2026.md"
move_file "wordpress-css-migration-session-3-feb-27-2026.md"
echo ""

echo "📋 Other Completed Reports (8 files):"
move_file "build-error-fix-summary.md"
move_file "jsx-migration-status.md"
move_file "storybook-tests-removal-complete.md"
move_file "root-cleanup-tasks.md"
move_file "progress-tracker.md"
move_file "task-list-summary.md"
move_file "SUMMARY.md"
move_file "TASK-ORGANIZATION-COMPLETE.md"
echo ""

echo "📋 Archive Management Docs (4 files):"
move_file "ARCHIVE-ACTION-REQUIRED.md"
move_file "ARCHIVE-MIGRATION-INSTRUCTIONS.md"
move_file "ARCHIVE-STATUS-VERIFICATION.md"
move_file "VERIFICATION-COMPLETE-SUMMARY.md"
echo ""

echo "======================================"
echo "✅ Archive Complete!"
echo "======================================"
echo ""
echo "📊 Results:"
echo "  Moved: $moved files"
if [ $failed -gt 0 ]; then
  echo "  Skipped (not found): $failed files"
fi
echo ""
echo "📁 Active files remaining: $(ls *.md 2>/dev/null | wc -l)"
echo "📁 Archived files total: $(ls archive/*.md 2>/dev/null | wc -l)"
echo ""
echo "📋 Active Reference Files:"
ls -1 *.md 2>/dev/null | sed 's/^/  ✅ /'
echo ""
echo "🎯 Next Steps:"
echo "  1. Review active files in /tasks/"
echo "  2. Consult /tasks/task-list.md for current status"
echo "  3. Use DESIGN-SYSTEM-QUICK-REFERENCE.md for development"
echo ""

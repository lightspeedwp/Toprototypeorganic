#!/bin/bash

# Root .md Files Cleanup Script
# Deletes all .md files from root except README.md and CHANGELOG.md
# LightSpeed Tour Operator - WordPress Plugin Prototype

echo "=========================================="
echo "Root Directory .md Files Cleanup"
echo "=========================================="
echo ""

# Change to project root
cd "$(dirname "$0")/.." || exit 1

# Backup count
TOTAL=$(ls -1 *.md 2>/dev/null | grep -v "README\|CHANGELOG" | wc -l)
echo "Found $TOTAL .md files to delete (excluding README/CHANGELOG)"
echo ""

# Confirm deletion
read -p "Continue with deletion? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cleanup cancelled."
    exit 1
fi

echo ""
echo "Starting cleanup..."
echo ""

# Category 1: BATCH Reports
echo "[1/10] Deleting BATCH reports..."
rm -f BATCH-*.md 2>/dev/null
echo "✓ BATCH reports deleted"

# Category 2: Completion Summaries
echo "[2/10] Deleting completion summaries..."
rm -f *-COMPLETE.md 2>/dev/null
rm -f *-SUMMARY.md 2>/dev/null
echo "✓ Completion summaries deleted"

# Category 3: Audit Reports
echo "[3/10] Deleting audit reports..."
rm -f AUDIT-*.md 2>/dev/null
rm -f *-AUDIT-*.md 2>/dev/null
echo "✓ Audit reports deleted"

# Category 4: Guidelines Updates
echo "[4/10] Deleting guidelines updates..."
rm -f GUIDELINES-*.md 2>/dev/null
rm -f *-GUIDELINES-*.md 2>/dev/null
echo "✓ Guidelines updates deleted"

# Category 5: Project Summaries
echo "[5/10] Deleting project summaries..."
rm -f PROJECT-*.md 2>/dev/null
rm -f COMPLETE-PROJECT-*.md 2>/dev/null
echo "✓ Project summaries deleted"

# Category 6: Accessibility Reports
echo "[6/10] Deleting accessibility reports..."
rm -f ACCESSIBILITY-*.md 2>/dev/null
rm -f WCAG-*.md 2>/dev/null
echo "✓ Accessibility reports deleted"

# Category 7: Task Lists
echo "[7/10] Deleting task lists..."
rm -f *-TASK*.md 2>/dev/null
rm -f *-CHECKLIST.md 2>/dev/null
rm -f TODO*.md 2>/dev/null
echo "✓ Task lists deleted"

# Category 8: Quick References (delete most, keep some for manual review)
echo "[8/10] Deleting quick references..."
rm -f ACCESSIBILITY-PHASE-2-QUICK-SUMMARY.md 2>/dev/null
rm -f QUICK-FIX-REFERENCE.md 2>/dev/null
rm -f QUICK-REFERENCE.md 2>/dev/null
echo "✓ Old quick references deleted"

# Category 9: Error & Fix Reports
echo "[9/10] Deleting error and fix reports..."
rm -f *-FIXED.md 2>/dev/null
rm -f *-ERROR-*.md 2>/dev/null
rm -f *-FIX-*.md 2>/dev/null
echo "✓ Error and fix reports deleted"

# Category 10: Testing & Deployment Reports
echo "[10/10] Deleting testing and deployment reports..."
rm -f *-TESTING-*.md 2>/dev/null
rm -f *-DEPLOYMENT-*.md 2>/dev/null
rm -f *-IMPLEMENTATION-*.md 2>/dev/null
rm -f *-UPDATE-*.md 2>/dev/null
rm -f *-MIGRATION-*.md 2>/dev/null
echo "✓ Testing and deployment reports deleted"

# Verify
echo ""
echo "=========================================="
echo "Cleanup Summary"
echo "=========================================="
echo ""

REMAINING=$(ls -1 *.md 2>/dev/null | grep -v "README\|CHANGELOG" | wc -l)
DELETED=$((TOTAL - REMAINING))

echo "Files deleted: $DELETED"
echo "Files remaining: $REMAINING"
echo ""

if [ $REMAINING -eq 0 ]; then
    echo "✅ SUCCESS: Root directory is clean!"
    echo "Only README.md and/or CHANGELOG.md remain (if they exist)."
elif [ $REMAINING -le 10 ]; then
    echo "⚠️  WARNING: $REMAINING files still remain"
    echo "These may need manual review:"
    echo ""
    ls -1 *.md 2>/dev/null | grep -v "README\|CHANGELOG"
    echo ""
    echo "Recommendation: Review these files and move to /docs/ or delete manually."
else
    echo "❌ ERROR: $REMAINING files still remain"
    echo "Manual cleanup required."
    echo ""
    ls -1 *.md 2>/dev/null | grep -v "README\|CHANGELOG"
fi

echo ""
echo "=========================================="
echo ""

exit 0

#!/bin/bash

# Design System Compliance Audit Script
# Checks for common design system violations

echo "======================================="
echo "  DESIGN SYSTEM COMPLIANCE AUDIT"
echo "======================================="
echo ""

# Initialize counters
TOTAL_VIOLATIONS=0

# Check for hardcoded colors
echo "🔍 Checking for hardcoded colors..."
COLORS=$(grep -r "#[0-9a-fA-F]\{3,6\}\|rgb(\|rgba(" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
if [ $COLORS -gt 0 ]; then
  echo "   ❌ Found $COLORS hardcoded color violations"
  TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + COLORS))
else
  echo "   ✅ No hardcoded colors found"
fi
echo ""

# Check for inline styles
echo "🔍 Checking for inline styles..."
INLINE=$(grep -r "style={{" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
if [ $INLINE -gt 0 ]; then
  echo "   ❌ Found $INLINE inline style violations"
  TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + INLINE))
else
  echo "   ✅ No inline styles found"
fi
echo ""

# Check for dark: classes
echo "🔍 Checking for dark: Tailwind classes..."
DARK=$(grep -r "dark:" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
if [ $DARK -gt 0 ]; then
  echo "   ❌ Found $DARK dark: class violations"
  TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + DARK))
else
  echo "   ✅ No dark: classes found"
fi
echo ""

# Check for hardcoded fonts (excluding comments and imports)
echo "🔍 Checking for hardcoded font families..."
FONTS=$(grep -r "fontFamily:\|font-family:" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | grep -v "var(--font" | wc -l)
if [ $FONTS -gt 0 ]; then
  echo "   ⚠️  Found $FONTS potential font violations (review manually)"
  TOTAL_VIOLATIONS=$((TOTAL_VIOLATIONS + FONTS))
else
  echo "   ✅ No hardcoded fonts found"
fi
echo ""

# Check for hardcoded spacing in inline styles
echo "🔍 Checking for hardcoded spacing..."
SPACING=$(grep -r "padding:\|margin:\|gap:" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | grep -E "[0-9]+px|[0-9.]+rem" | wc -l)
if [ $SPACING -gt 0 ]; then
  echo "   ⚠️  Found $SPACING potential spacing violations (review manually)"
else
  echo "   ✅ No hardcoded spacing found"
fi
echo ""

# Summary
echo "======================================="
echo "  AUDIT SUMMARY"
echo "======================================="
echo "Total violations found: $TOTAL_VIOLATIONS"
echo ""

if [ $TOTAL_VIOLATIONS -eq 0 ]; then
  echo "✅ All checks passed! Design system is compliant."
  echo ""
  exit 0
else
  echo "❌ Violations found. Please review and fix."
  echo ""
  echo "To see detailed violations, run:"
  echo "  grep -rn 'style={{' src/app --include='*.tsx'"
  echo "  grep -rn 'dark:' src/app --include='*.tsx'"
  echo "  grep -rn '#[0-9a-fA-F]\{6\}' src/app --include='*.tsx'"
  echo ""
  echo "Refer to /docs/DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md for fixes."
  echo ""
  exit 1
fi

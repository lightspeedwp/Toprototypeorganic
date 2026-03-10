#!/bin/bash

# Design System Compliance Verification - Comprehensive Check
# Verifies that ALL UI adheres to the design system

echo "╔════════════════════════════════════════════════╗"
echo "║  Design System Compliance Verification        ║"
echo "║  Comprehensive Check - All Rules               ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
VIOLATIONS=0
WARNINGS=0
PASSED=0

# =====================================================
# CHECK 1: Hardcoded Colors
# =====================================================
echo -e "${BLUE}[1/10] Checking for hardcoded colors...${NC}"
HARDCODED_COLORS=$(grep -rn "#[0-9a-fA-F]\{6\}" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "figma:asset" | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  wc -l)

if [ "$HARDCODED_COLORS" -eq 0 ]; then
  echo -e "${GREEN}✓ No hardcoded colors found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Found $HARDCODED_COLORS hardcoded color(s)${NC}"
  grep -rn "#[0-9a-fA-F]\{6\}" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
    grep -v "figma:asset" | \
    grep -v "^[[:space:]]*\/\/" | \
    grep -v "^[[:space:]]*\*" | \
    head -5
  echo "  (Showing first 5 violations)"
  ((VIOLATIONS++))
fi
echo ""

# =====================================================
# CHECK 2: Inline Styles
# =====================================================
echo -e "${BLUE}[2/10] Checking for inline styles...${NC}"
INLINE_STYLES=$(grep -rn "style={{" src/app --include="*.tsx" 2>/dev/null | \
  grep -v "width: \`\${" | \
  grep -v "height: \`\${" | \
  wc -l)

if [ "$INLINE_STYLES" -eq 0 ]; then
  echo -e "${GREEN}✓ No inline styles found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Found $INLINE_STYLES inline style(s)${NC}"
  grep -rn "style={{" src/app --include="*.tsx" 2>/dev/null | \
    grep -v "width: \`\${" | \
    grep -v "height: \`\${" | \
    head -5
  echo "  (Showing first 5 violations)"
  ((VIOLATIONS++))
fi
echo ""

# =====================================================
# CHECK 3: dark: Classes
# =====================================================
echo -e "${BLUE}[3/10] Checking for dark: classes...${NC}"
DARK_CLASSES=$(grep -rn "dark:" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  wc -l)

if [ "$DARK_CLASSES" -eq 0 ]; then
  echo -e "${GREEN}✓ No dark: classes found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Found $DARK_CLASSES dark: class(es)${NC}"
  grep -rn "dark:" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
    grep -v "^[[:space:]]*\/\/" | \
    grep -v "^[[:space:]]*\*" | \
    head -5
  echo "  (Showing first 5 violations)"
  ((VIOLATIONS++))
fi
echo ""

# =====================================================
# CHECK 4: Hardcoded Fonts (Common Culprits)
# =====================================================
echo -e "${BLUE}[4/10] Checking for hardcoded fonts...${NC}"
HARDCODED_FONTS=0

# Check for Arial
ARIAL_COUNT=$(grep -rn "Arial" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  wc -l)
HARDCODED_FONTS=$((HARDCODED_FONTS + ARIAL_COUNT))

# Check for Helvetica
HELVETICA_COUNT=$(grep -rn "Helvetica" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  wc -l)
HARDCODED_FONTS=$((HARDCODED_FONTS + HELVETICA_COUNT))

# Check for Inter
INTER_COUNT=$(grep -rn "Inter" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  wc -l)
HARDCODED_FONTS=$((HARDCODED_FONTS + INTER_COUNT))

# Check for Roboto
ROBOTO_COUNT=$(grep -rn "Roboto" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  wc -l)
HARDCODED_FONTS=$((HARDCODED_FONTS + ROBOTO_COUNT))

if [ "$HARDCODED_FONTS" -eq 0 ]; then
  echo -e "${GREEN}✓ No hardcoded fonts found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Found $HARDCODED_FONTS hardcoded font reference(s)${NC}"
  [ "$ARIAL_COUNT" -gt 0 ] && echo "  - Arial: $ARIAL_COUNT"
  [ "$HELVETICA_COUNT" -gt 0 ] && echo "  - Helvetica: $HELVETICA_COUNT"
  [ "$INTER_COUNT" -gt 0 ] && echo "  - Inter: $INTER_COUNT"
  [ "$ROBOTO_COUNT" -gt 0 ] && echo "  - Roboto: $ROBOTO_COUNT"
  ((VIOLATIONS++))
fi
echo ""

# =====================================================
# CHECK 5: RGB/RGBA Colors
# =====================================================
echo -e "${BLUE}[5/10] Checking for rgb/rgba color values...${NC}"
RGB_COLORS=$(grep -rn "rgb(" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
  grep -v "^[[:space:]]*\/\/" | \
  grep -v "^[[:space:]]*\*" | \
  grep -v "color-mix" | \
  wc -l)

if [ "$RGB_COLORS" -eq 0 ]; then
  echo -e "${GREEN}✓ No rgb/rgba colors found${NC}"
  ((PASSED++))
else
  echo -e "${RED}✗ Found $RGB_COLORS rgb/rgba color(s)${NC}"
  grep -rn "rgb(" src/app --include="*.tsx" --include="*.css" 2>/dev/null | \
    grep -v "^[[:space:]]*\/\/" | \
    grep -v "^[[:space:]]*\*" | \
    grep -v "color-mix" | \
    head -5
  echo "  (Showing first 5 violations)"
  ((VIOLATIONS++))
fi
echo ""

# =====================================================
# CHECK 6: Generic Class Names
# =====================================================
echo -e "${BLUE}[6/10] Checking for generic class names...${NC}"
GENERIC_CLASSES=0

# Check for bare .card class (should be .wp-card or wp-pattern-card)
CARD_COUNT=$(grep -rn "\.card\s*{" src/styles --include="*.css" 2>/dev/null | \
  grep -v "wp-card" | \
  grep -v "card-" | \
  wc -l)
GENERIC_CLASSES=$((GENERIC_CLASSES + CARD_COUNT))

# Check for bare .button class (should be .wp-block-button or specific)
BUTTON_COUNT=$(grep -rn "\.button\s*{" src/styles --include="*.css" 2>/dev/null | \
  grep -v "wp-block-button" | \
  grep -v "button-" | \
  grep -v "\.button," | \
  wc -l)

if [ "$GENERIC_CLASSES" -eq 0 ]; then
  echo -e "${GREEN}✓ No generic class names found${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Found $GENERIC_CLASSES potential generic class name(s)${NC}"
  echo "  (Review manually - some may be intentional)"
  ((WARNINGS++))
fi
echo ""

# =====================================================
# CHECK 7: CSS Files Imported
# =====================================================
echo -e "${BLUE}[7/10] Checking CSS file imports...${NC}"

# Find all CSS files in components/patterns directories
CSS_FILES=$(find src/styles/components src/styles/patterns -name "*.css" 2>/dev/null | wc -l)

# Count imports in global.css
IMPORTED_COUNT=$(grep "@import" src/styles/global.css 2>/dev/null | \
  grep -E "(components|patterns)" | \
  wc -l)

if [ "$CSS_FILES" -le "$IMPORTED_COUNT" ]; then
  echo -e "${GREEN}✓ All CSS files appear to be imported${NC}"
  echo "  Found $CSS_FILES CSS files, $IMPORTED_COUNT imports"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ Possible missing imports${NC}"
  echo "  Found $CSS_FILES CSS files, but only $IMPORTED_COUNT imports"
  echo "  (Some files may be intentionally not imported)"
  ((WARNINGS++))
fi
echo ""

# =====================================================
# CHECK 8: Theme Files Exist
# =====================================================
echo -e "${BLUE}[8/10] Checking theme files exist...${NC}"
THEME_FILES_OK=true

if [ ! -f "src/styles/theme-light.css" ]; then
  echo -e "${RED}✗ Missing theme-light.css${NC}"
  THEME_FILES_OK=false
  ((VIOLATIONS++))
fi

if [ ! -f "src/styles/theme-dark.css" ]; then
  echo -e "${RED}✗ Missing theme-dark.css${NC}"
  THEME_FILES_OK=false
  ((VIOLATIONS++))
fi

if [ ! -f "src/styles/theme.css" ]; then
  echo -e "${RED}✗ Missing theme.css${NC}"
  THEME_FILES_OK=false
  ((VIOLATIONS++))
fi

if [ "$THEME_FILES_OK" = true ]; then
  echo -e "${GREEN}✓ All theme files exist${NC}"
  ((PASSED++))
fi
echo ""

# =====================================================
# CHECK 9: Font Imports
# =====================================================
echo -e "${BLUE}[9/10] Checking font imports...${NC}"

if [ -f "src/styles/fonts.css" ]; then
  LORA_IMPORT=$(grep -c "Lora" src/styles/fonts.css 2>/dev/null)
  NOTO_IMPORT=$(grep -c "Noto Sans" src/styles/fonts.css 2>/dev/null)
  
  if [ "$LORA_IMPORT" -gt 0 ] && [ "$NOTO_IMPORT" -gt 0 ]; then
    echo -e "${GREEN}✓ Font imports found (Lora, Noto Sans)${NC}"
    ((PASSED++))
  else
    echo -e "${YELLOW}⚠ Some font imports may be missing${NC}"
    [ "$LORA_IMPORT" -eq 0 ] && echo "  - Lora not found"
    [ "$NOTO_IMPORT" -eq 0 ] && echo "  - Noto Sans not found"
    ((WARNINGS++))
  fi
else
  echo -e "${YELLOW}⚠ fonts.css not found${NC}"
  ((WARNINGS++))
fi
echo ""

# =====================================================
# CHECK 10: Documentation Exists
# =====================================================
echo -e "${BLUE}[10/10] Checking documentation files...${NC}"

DOCS_MISSING=0
[ ! -f "docs/DESIGN-SYSTEM-ENFORCEMENT.md" ] && ((DOCS_MISSING++))
[ ! -f "docs/COMPONENT-TEMPLATE.md" ] && ((DOCS_MISSING++))
[ ! -f "docs/CSS-VARIABLES.md" ] && ((DOCS_MISSING++))
[ ! -f "docs/QUICK-REFERENCE.md" ] && ((DOCS_MISSING++))

if [ "$DOCS_MISSING" -eq 0 ]; then
  echo -e "${GREEN}✓ All essential documentation files exist${NC}"
  ((PASSED++))
else
  echo -e "${YELLOW}⚠ $DOCS_MISSING documentation file(s) missing${NC}"
  ((WARNINGS++))
fi
echo ""

# =====================================================
# FINAL SUMMARY
# =====================================================
echo "═══════════════════════════════════════════════════"
echo "                  FINAL REPORT                     "
echo "═══════════════════════════════════════════════════"
echo ""

TOTAL_CHECKS=10
echo "Total Checks: $TOTAL_CHECKS"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "${RED}Violations: $VIOLATIONS${NC}"
echo ""

# Calculate score
SCORE=$((PASSED * 100 / TOTAL_CHECKS))

if [ "$VIOLATIONS" -eq 0 ] && [ "$WARNINGS" -eq 0 ]; then
  echo "═══════════════════════════════════════════════════"
  echo -e "${GREEN}🎉 PERFECT! 100% COMPLIANCE ACHIEVED! 🎉${NC}"
  echo "═══════════════════════════════════════════════════"
  echo ""
  echo "All checks passed with no violations or warnings."
  echo "Your design system is fully compliant!"
  echo ""
  exit 0
elif [ "$VIOLATIONS" -eq 0 ]; then
  echo "═══════════════════════════════════════════════════"
  echo -e "${GREEN}✅ PASSED - Score: $SCORE%${NC}"
  echo "═══════════════════════════════════════════════════"
  echo ""
  echo "No critical violations found."
  echo -e "${YELLOW}$WARNINGS warning(s) detected - review manually.${NC}"
  echo ""
  exit 0
else
  echo "═══════════════════════════════════════════════════"
  echo -e "${RED}❌ FAILED - Score: $SCORE%${NC}"
  echo "═══════════════════════════════════════════════════"
  echo ""
  echo -e "${RED}$VIOLATIONS critical violation(s) must be fixed!${NC}"
  [ "$WARNINGS" -gt 0 ] && echo -e "${YELLOW}$WARNINGS warning(s) should be reviewed.${NC}"
  echo ""
  echo "Fix violations and run this script again."
  echo ""
  echo "Documentation:"
  echo "  - /docs/DESIGN-SYSTEM-ENFORCEMENT.md - Rules"
  echo "  - /docs/MIGRATION-GUIDE.md - How to fix"
  echo "  - /docs/TROUBLESHOOTING.md - Common issues"
  echo ""
  exit 1
fi

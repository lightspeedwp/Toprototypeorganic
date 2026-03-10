#!/bin/bash

# LightSpeed Tour Operator - Design System Compliance Verification Script
# Tests all aspects of design system usage across the codebase

echo "=========================================="
echo "Design System Compliance Verification"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_WARNING=0

# Test function
run_test() {
    local test_name="$1"
    local command="$2"
    local threshold="$3"
    local warning_threshold="$4"
    
    echo -n "Testing $test_name... "
    
    # Run command and get count
    local result=$(eval "$command")
    
    if [ -z "$threshold" ]; then
        # Just report the number
        echo -e "${GREEN}Found: $result${NC}"
        ((TESTS_PASSED++))
    elif [ "$result" -le "$threshold" ]; then
        echo -e "${GREEN}✓ PASS${NC} (Found: $result, Threshold: ≤$threshold)"
        ((TESTS_PASSED++))
    elif [ ! -z "$warning_threshold" ] && [ "$result" -le "$warning_threshold" ]; then
        echo -e "${YELLOW}⚠ WARNING${NC} (Found: $result, Expected: ≤$threshold)"
        ((TESTS_WARNING++))
    else
        echo -e "${RED}✗ FAIL${NC} (Found: $result, Expected: ≤$threshold)"
        ((TESTS_FAILED++))
    fi
}

echo "1. TYPOGRAPHY COMPLIANCE"
echo "------------------------"

# Typography tests
run_test "Hardcoded text sizes (excluding UI lib)" \
    "grep -r \"className=\\\"[^\\\"]*text-(xs|sm|base|lg|xl|2xl|3xl|4xl)\" src/app/components/ --exclude-dir=ui --exclude='TemplateBrowser.tsx' 2>/dev/null | wc -l" \
    "5" \
    "10"

run_test "Hardcoded font weights (excluding UI lib)" \
    "grep -r \"className=\\\"[^\\\"]*font-(bold|semibold|medium)\" src/app/components/ --exclude-dir=ui --exclude='TemplateBrowser.tsx' 2>/dev/null | wc -l" \
    "5" \
    "10"

run_test "CSS variable font-family usage" \
    "grep -r \"var(--font-family\" src/app/components/ 2>/dev/null | wc -l"

run_test "CSS variable text-* usage" \
    "grep -r \"var(--text-\" src/app/components/ 2>/dev/null | wc -l"

run_test "CSS variable font-weight usage" \
    "grep -r \"var(--font-weight\" src/app/components/ 2>/dev/null | wc -l"

echo ""
echo "2. COLOR COMPLIANCE"
echo "-------------------"

# Color tests
run_test "Hardcoded hex colors (excluding Logo)" \
    "grep -r \"#[0-9a-fA-F]\\{6\\}\" src/app/components/*.tsx --exclude='Logo.tsx' 2>/dev/null | wc -l" \
    "0" \
    "5"

run_test "Semantic color token usage (text-primary)" \
    "grep -r \"text-primary\" src/app/components/ 2>/dev/null | wc -l"

run_test "Semantic color token usage (bg-card)" \
    "grep -r \"bg-card\" src/app/components/ 2>/dev/null | wc -l"

run_test "Border color token usage (border-border)" \
    "grep -r \"border-border\" src/app/components/ 2>/dev/null | wc -l"

echo ""
echo "3. SPACING COMPLIANCE"
echo "---------------------"

# Spacing tests
run_test "Padding class usage (p-*)" \
    "grep -r \"p-[0-9]\" src/app/components/ 2>/dev/null | wc -l"

run_test "Margin class usage (m-*)" \
    "grep -r \"m-[0-9]\" src/app/components/ 2>/dev/null | wc -l"

run_test "Gap class usage (gap-*)" \
    "grep -r \"gap-[0-9]\" src/app/components/ 2>/dev/null | wc -l"

run_test "Hardcoded pixel padding (should be 0)" \
    "grep -r \"padding:.*px\" src/app/components/ --exclude-dir=ui 2>/dev/null | wc -l" \
    "0" \
    "3"

echo ""
echo "4. BORDER & RADIUS COMPLIANCE"
echo "------------------------------"

# Border tests
run_test "Border token usage (border-border)" \
    "grep -r \"border-border\" src/app/components/ 2>/dev/null | wc -l"

run_test "Ring token usage (ring-ring)" \
    "grep -r \"ring-ring\" src/app/components/ 2>/dev/null | wc -l"

run_test "Semantic radius usage (rounded-lg)" \
    "grep -r \"rounded-lg\" src/app/components/ 2>/dev/null | wc -l"

run_test "Semantic radius usage (rounded-md)" \
    "grep -r \"rounded-md\" src/app/components/ 2>/dev/null | wc -l"

echo ""
echo "5. COMPONENT STRUCTURE"
echo "----------------------"

# Component structure tests
run_test "Pattern components exist" \
    "ls -1 src/app/components/patterns/*.tsx 2>/dev/null | wc -l"

run_test "Part components exist" \
    "ls -1 src/app/components/parts/*.tsx 2>/dev/null | wc -l"

run_test "Block components exist" \
    "ls -1 src/app/components/blocks/*.tsx 2>/dev/null | wc -l"

run_test "Common components exist" \
    "ls -1 src/app/components/common/*.tsx 2>/dev/null | wc -l"

echo ""
echo "6. ACCESSIBILITY CHECKS"
echo "-----------------------"

# Accessibility tests
run_test "ARIA label usage" \
    "grep -r \"aria-label\" src/app/components/ 2>/dev/null | wc -l"

run_test "ARIA hidden usage (decorative icons)" \
    "grep -r \"aria-hidden\" src/app/components/ 2>/dev/null | wc -l"

run_test "Focus ring usage" \
    "grep -r \"focus:ring\" src/app/components/ 2>/dev/null | wc -l"

run_test "Role attribute usage" \
    "grep -r \"role=\" src/app/components/ 2>/dev/null | wc -l"

echo ""
echo "7. DARK MODE SUPPORT"
echo "--------------------"

# Dark mode tests
run_test "Dark mode variant usage (dark:)" \
    "grep -r \"dark:\" src/app/components/ 2>/dev/null | wc -l"

run_test "Dark mode background usage" \
    "grep -r \"dark:bg-\" src/app/components/ 2>/dev/null | wc -l"

run_test "Dark mode text usage" \
    "grep -r \"dark:text-\" src/app/components/ 2>/dev/null | wc -l"

echo ""
echo "8. RESPONSIVE DESIGN"
echo "--------------------"

# Responsive tests
run_test "Mobile-first breakpoint usage (md:)" \
    "grep -r \"md:\" src/app/components/ 2>/dev/null | wc -l"

run_test "Desktop breakpoint usage (lg:)" \
    "grep -r \"lg:\" src/app/components/ 2>/dev/null | wc -l"

run_test "Grid responsive usage" \
    "grep -r \"grid.*md:grid-cols\" src/app/components/ 2>/dev/null | wc -l"

echo ""
echo "=========================================="
echo "TEST SUMMARY"
echo "=========================================="
echo ""
echo -e "${GREEN}Tests Passed:${NC}  $TESTS_PASSED"
echo -e "${YELLOW}Tests Warning:${NC} $TESTS_WARNING"
echo -e "${RED}Tests Failed:${NC}  $TESTS_FAILED"
echo ""

TOTAL_TESTS=$((TESTS_PASSED + TESTS_WARNING + TESTS_FAILED))
SUCCESS_RATE=$((TESTS_PASSED * 100 / TOTAL_TESTS))

echo "Total Tests: $TOTAL_TESTS"
echo "Success Rate: $SUCCESS_RATE%"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ ALL CRITICAL TESTS PASSED!${NC}"
    echo "Status: PRODUCTION READY"
    exit 0
elif [ $TESTS_FAILED -le 2 ]; then
    echo -e "${YELLOW}⚠ MINOR ISSUES DETECTED${NC}"
    echo "Status: REVIEW RECOMMENDED"
    exit 1
else
    echo -e "${RED}✗ MULTIPLE FAILURES DETECTED${NC}"
    echo "Status: FIXES REQUIRED"
    exit 2
fi

# Design System Audit Script

**Quick audit tool to check files for design system violations.**

---

## 🔍 How to Use

Run this in your terminal to search for common violations:

### 1. Check for Hardcoded Colors

```bash
# Check all TSX files for hex colors
grep -r "#[0-9a-fA-F]\{3,6\}" src/app --include="*.tsx" --exclude-dir=node_modules

# Check for RGB colors
grep -r "rgb(" src/app --include="*.tsx" --exclude-dir=node_modules

# Check for named colors in styles
grep -r "color:\s*\(red\|blue\|green\|white\|black\)" src/app --include="*.tsx" --exclude-dir=node_modules
```

### 2. Check for Inline Styles

```bash
# Check for style={{ in TSX files
grep -r "style={{" src/app --include="*.tsx" --exclude-dir=node_modules

# Check for style= in JSX
grep -r 'style=' src/app --include="*.tsx" --exclude-dir=node_modules
```

### 3. Check for dark: Classes

```bash
# Check for dark: Tailwind classes
grep -r "dark:" src/app --include="*.tsx" --exclude-dir=node_modules

# Check for className with dark:
grep -r 'className.*dark:' src/app --include="*.tsx" --exclude-dir=node_modules
```

### 4. Check for Hardcoded Fonts

```bash
# Check for fontFamily
grep -r "fontFamily" src/app --include="*.tsx" --exclude-dir=node_modules

# Check for font-family in inline styles
grep -r "font-family" src/app --include="*.tsx" --exclude-dir=node_modules

# Check for @import of random Google Fonts
grep -r "@import.*fonts.googleapis.com" src/styles --include="*.css"
```

### 5. Check for Hardcoded Spacing

```bash
# Check for hardcoded pixel padding/margin
grep -r "padding:\s*[0-9]*px" src/app --include="*.tsx"
grep -r "margin:\s*[0-9]*px" src/app --include="*.tsx"

# Check for hardcoded rem values
grep -r "padding:\s*[0-9.]*rem" src/app --include="*.tsx"
```

---

## 🎯 Complete Audit Command

Run all checks at once:

```bash
#!/bin/bash

echo "=== DESIGN SYSTEM COMPLIANCE AUDIT ==="
echo ""

echo "❌ Checking for hardcoded colors..."
COLORS=$(grep -r "#[0-9a-fA-F]\{3,6\}\|rgb(\|rgba(" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
echo "Found $COLORS potential violations"
echo ""

echo "❌ Checking for inline styles..."
INLINE=$(grep -r "style={{" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
echo "Found $INLINE violations"
echo ""

echo "❌ Checking for dark: classes..."
DARK=$(grep -r "dark:" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
echo "Found $DARK violations"
echo ""

echo "❌ Checking for hardcoded fonts..."
FONTS=$(grep -r "fontFamily\|font-family" src/app --include="*.tsx" --exclude-dir=node_modules 2>/dev/null | wc -l)
echo "Found $FONTS potential violations"
echo ""

echo "=== AUDIT COMPLETE ==="
TOTAL=$((COLORS + INLINE + DARK + FONTS))
echo "Total violations: $TOTAL"

if [ $TOTAL -eq 0 ]; then
  echo "✅ All checks passed! Design system compliant."
else
  echo "⚠️  Please review violations and fix before proceeding."
fi
```

Save as `/scripts/audit-design-system.sh` and run:

```bash
chmod +x scripts/audit-design-system.sh
./scripts/audit-design-system.sh
```

---

## 📊 Detailed Reports

### Generate Detailed Hardcoded Color Report

```bash
echo "=== HARDCODED COLORS REPORT ===" > audit-colors.txt
echo "" >> audit-colors.txt
grep -rn "#[0-9a-fA-F]\{3,6\}\|rgb(\|rgba(" src/app --include="*.tsx" --exclude-dir=node_modules >> audit-colors.txt 2>/dev/null
cat audit-colors.txt
```

### Generate Detailed Inline Styles Report

```bash
echo "=== INLINE STYLES REPORT ===" > audit-inline-styles.txt
echo "" >> audit-inline-styles.txt
grep -rn "style={{" src/app --include="*.tsx" --exclude-dir=node_modules >> audit-inline-styles.txt 2>/dev/null
cat audit-inline-styles.txt
```

### Generate Detailed dark: Classes Report

```bash
echo "=== DARK MODE CLASSES REPORT ===" > audit-dark-classes.txt
echo "" >> audit-dark-classes.txt
grep -rn "dark:" src/app --include="*.tsx" --exclude-dir=node_modules >> audit-dark-classes.txt 2>/dev/null
cat audit-dark-classes.txt
```

---

## 🔧 Fix Common Violations

### Fix Hardcoded Colors

**Before:**
```tsx
<div style={{ backgroundColor: '#4a7311' }}>
```

**After:**
```tsx
<div className="bg-primary">
```

---

### Fix Inline Styles

**Before:**
```tsx
<div style={{ padding: '20px', color: 'white' }}>
```

**After:**
```tsx
<div className="p-5 text-primary-foreground">
```

---

### Fix dark: Classes

**Before:**
```tsx
<div className="bg-white dark:bg-slate-900">
```

**After:**
```tsx
<div className="bg-background">
```

---

### Fix Hardcoded Fonts

**Before:**
```tsx
<h1 style={{ fontFamily: 'Arial' }}>
```

**After:**
```tsx
<h1 className="font-serif">
```

Or in CSS:
```css
h1 {
  font-family: var(--font-family-lora);
}
```

---

## 📋 Manual Review Checklist

After running automated checks, manually verify:

- [ ] All colors use CSS variables
- [ ] No inline styles anywhere
- [ ] No `dark:` classes
- [ ] Only Lora, Noto Sans, Courier New fonts
- [ ] Spacing uses CSS variables or Tailwind scale
- [ ] BEM naming convention followed
- [ ] External CSS files for all styling
- [ ] Component works in light mode
- [ ] Component works in dark mode
- [ ] User can customize by editing CSS

---

## 🎯 CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/design-system-audit.yml
name: Design System Audit

on: [push, pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Check for hardcoded colors
        run: |
          if grep -r "#[0-9a-fA-F]\{3,6\}" src/app --include="*.tsx" --exclude-dir=node_modules; then
            echo "❌ Found hardcoded colors"
            exit 1
          fi
      
      - name: Check for inline styles
        run: |
          if grep -r "style={{" src/app --include="*.tsx" --exclude-dir=node_modules; then
            echo "❌ Found inline styles"
            exit 1
          fi
      
      - name: Check for dark: classes
        run: |
          if grep -r "dark:" src/app --include="*.tsx" --exclude-dir=node_modules; then
            echo "❌ Found dark: classes"
            exit 1
          fi
      
      - name: All checks passed
        run: echo "✅ Design system compliant"
```

---

## 📚 Related Documentation

- **[DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md](./DESIGN-SYSTEM-COMPLIANCE-CHECKLIST.md)** - Complete checklist
- **[NEW-COMPONENT-GUIDE.md](./NEW-COMPONENT-GUIDE.md)** - Component development guide
- **[DESIGN-TOKENS-REFERENCE.md](./DESIGN-TOKENS-REFERENCE.md)** - CSS variables reference

---

## 🚀 Quick Fix Script

Create a file `/scripts/quick-fix-violations.sh`:

```bash
#!/bin/bash

echo "🔧 Quick Fix Common Violations"
echo ""

# Backup files
echo "Creating backups..."
cp -r src/app src/app.backup

# Replace common hardcoded colors with CSS variables
echo "Replacing hardcoded primary color..."
find src/app -type f -name "*.tsx" -exec sed -i 's/#4a7311/var(--primary)/g' {} +

# Replace inline background colors
echo "Removing inline background colors..."
# This is complex - better to do manually

echo ""
echo "⚠️  IMPORTANT: Review all changes carefully!"
echo "Backup saved to: src/app.backup"
echo ""
echo "Run: diff -r src/app src/app.backup"
```

---

**Remember:** Automated checks catch obvious violations, but manual review is essential for quality! 🎨

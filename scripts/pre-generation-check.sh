#!/bin/bash

# ============================================
# PRE-GENERATION DESIGN SYSTEM CHECK
# ============================================
# Run this BEFORE generating any UI component
# to ensure you understand the design system rules.
#
# Usage: ./scripts/pre-generation-check.sh
# ============================================

echo ""
echo "🛑 ============================================"
echo "   PRE-GENERATION DESIGN SYSTEM CHECK"
echo "============================================"
echo ""
echo "Before generating ANY UI, you MUST confirm:"
echo ""

# Function to ask yes/no questions
ask_confirmation() {
  local question="$1"
  local answer
  
  while true; do
    read -p "$question (yes/no): " answer
    case $answer in
      [Yy]* | yes | YES ) return 0;;
      [Nn]* | no | NO ) return 1;;
      * ) echo "Please answer yes or no.";;
    esac
  done
}

echo "📚 DOCUMENTATION:"
echo "─────────────────────────────────────────────"

if ! ask_confirmation "✓ Have you read /docs/START-HERE.md?"; then
  echo ""
  echo "❌ STOP! You MUST read START-HERE.md first!"
  echo "   📖 Open: /docs/START-HERE.md"
  echo ""
  exit 1
fi

if ! ask_confirmation "✓ Have you read /docs/UI-GENERATION-RULES.md?"; then
  echo ""
  echo "❌ STOP! You MUST read UI-GENERATION-RULES.md!"
  echo "   📖 Open: /docs/UI-GENERATION-RULES.md"
  echo ""
  exit 1
fi

echo ""
echo "🎨 CSS VARIABLES:"
echo "─────────────────────────────────────────────"

if ! ask_confirmation "✓ Will you use CSS variables for ALL colors?"; then
  echo ""
  echo "❌ REJECTED! You MUST use CSS variables!"
  echo "   Examples: var(--primary), var(--background)"
  echo "   Reference: /docs/CSS-VARIABLES-COMPLETE.md"
  echo ""
  exit 1
fi

if ! ask_confirmation "✓ Will you use CSS variables for ALL spacing?"; then
  echo ""
  echo "❌ REJECTED! You MUST use CSS variables!"
  echo "   Examples: var(--spacing-section-md), var(--spacing-gap-lg)"
  echo "   Reference: /docs/CSS-VARIABLES-COMPLETE.md"
  echo ""
  exit 1
fi

echo ""
echo "✍️ TYPOGRAPHY:"
echo "─────────────────────────────────────────────"

if ! ask_confirmation "✓ Will you ONLY use Lora, Noto Sans, Courier New fonts?"; then
  echo ""
  echo "❌ REJECTED! ONLY these 3 fonts are allowed!"
  echo "   ✅ Lora (serif) via var(--font-family-lora)"
  echo "   ✅ Noto Sans (sans-serif) via var(--font-family-noto-sans)"
  echo "   ✅ Courier New (mono) via var(--font-family-mono)"
  echo "   ❌ NO Arial, Helvetica, Georgia, Times, etc."
  echo ""
  exit 1
fi

echo ""
echo "🚫 PROHIBITED:"
echo "─────────────────────────────────────────────"

if ! ask_confirmation "✓ Will you avoid ALL hardcoded colors (#hex, rgb(), etc.)?"; then
  echo ""
  echo "❌ REJECTED! NO hardcoded colors allowed!"
  echo "   ❌ #FFFFFF, rgb(255,255,255), white"
  echo "   ✅ var(--background), className='bg-background'"
  echo ""
  exit 1
fi

if ! ask_confirmation "✓ Will you avoid ALL inline styles (except dynamic calculated values)?"; then
  echo ""
  echo "❌ REJECTED! NO inline styles allowed!"
  echo "   ❌ style={{ backgroundColor: 'white' }}"
  echo "   ✅ className='bg-background'"
  echo "   ✅ External CSS with CSS variables"
  echo ""
  exit 1
fi

if ! ask_confirmation "✓ Will you avoid ALL dark: classes?"; then
  echo ""
  echo "❌ REJECTED! NO dark: classes allowed!"
  echo "   ❌ className='bg-white dark:bg-slate-900'"
  echo "   ✅ className='bg-background' (auto-switches!)"
  echo ""
  exit 1
fi

echo ""
echo "📁 FILE STRUCTURE:"
echo "─────────────────────────────────────────────"

if ! ask_confirmation "✓ Will you create an external CSS file with BEM naming?"; then
  echo ""
  echo "❌ REJECTED! You MUST create external CSS!"
  echo "   ✅ /src/styles/patterns/my-component.css"
  echo "   ✅ .wp-pattern-mycomponent (BEM naming)"
  echo "   ✅ All styling via CSS variables"
  echo ""
  exit 1
fi

if ! ask_confirmation "✓ Will you import CSS in /src/styles/index.css?"; then
  echo ""
  echo "❌ REJECTED! You MUST import CSS!"
  echo "   Add: @import './patterns/my-component.css';"
  echo "   To: /src/styles/index.css"
  echo ""
  exit 1
fi

echo ""
echo "✅ ============================================"
echo "   ALL CHECKS PASSED!"
echo "============================================"
echo ""
echo "✅ You understand the design system rules!"
echo "✅ You will use CSS variables for all styling!"
echo "✅ You will use only defined fonts!"
echo "✅ You will create external CSS files!"
echo "✅ You will follow BEM naming!"
echo ""
echo "🎉 You may now generate UI!"
echo ""
echo "📋 Next Steps:"
echo "─────────────────────────────────────────────"
echo "1. Copy template from /docs/COMPONENT-TEMPLATE.md"
echo "2. Create React component (classNames only)"
echo "3. Create external CSS file (CSS variables only)"
echo "4. Import CSS in /src/styles/index.css"
echo "5. Run: ./scripts/verify-compliance.sh"
echo "6. Done! ✅"
echo ""
echo "🎨 CSS Variables Reference:"
echo "─────────────────────────────────────────────"
echo "📖 /docs/CSS-VARIABLES-COMPLETE.md"
echo "📖 /docs/START-HERE.md"
echo "📖 /docs/QUICK-REFERENCE.md"
echo ""
echo "Happy building! 🚀✨"
echo ""

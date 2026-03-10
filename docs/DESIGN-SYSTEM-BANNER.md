```
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    🚨 DESIGN SYSTEM RULES - MANDATORY 🚨                     ║
║                                                                              ║
║  BEFORE GENERATING ANY UI, YOU MUST FOLLOW THESE TWO RULES:                 ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │  RULE #1: CSS Variables ONLY                                           │ ║
║  │  ✅ Use: bg-primary, text-foreground, var(--card)                      │ ║
║  │  ❌ Never: #FFFFFF, rgb(), white, bg-green-600, dark:classes          │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  ┌────────────────────────────────────────────────────────────────────────┐ ║
║  │  RULE #2: ONLY 3 Fonts                                                 │ ║
║  │  ✅ Lora (font-serif), Noto Sans (font-sans), Courier New (font-mono) │ ║
║  │  ❌ Never: Arial, Helvetica, Georgia, Times, or ANY other font        │ ║
║  └────────────────────────────────────────────────────────────────────────┘ ║
║                                                                              ║
║  WHY? So users can customize the entire site by editing 3 CSS files!        ║
║                                                                              ║
║  RESOURCES:                                                                  ║
║  📖 /docs/MUST-READ-FIRST.md          - 1-page rules (2 min)                ║
║  📖 /docs/UI-GENERATION-CARD.md       - Quick reference (2 min)             ║
║  📖 /docs/CSS-VARIABLES-COMPLETE.md   - All 80+ variables (15 min)          ║
║  🔒 /scripts/pre-generation-check.sh  - Run this before coding!             ║
║                                                                              ║
║  THE ONE QUESTION:                                                           ║
║  "Can users customize this by editing CSS variables?"                       ║
║  ✅ YES → Ship it!  |  ❌ NO → Fix it!                                      ║
║                                                                              ║
║  STATUS: 🔒 LOCKED & ENFORCED - NO EXCEPTIONS                               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

**Copy this banner and keep it visible while generating UI!**

---

## Quick Reference

**Colors:**
```
bg-background, bg-primary, bg-card, bg-success
text-foreground, text-primary-foreground
border-border, shadow-sm
```

**Fonts:**
```
font-serif   → Lora
font-sans    → Noto Sans
font-mono    → Courier New
```

**Spacing:**
```
p-4, px-6, py-8, gap-4, space-y-6
```

**What's Prohibited:**
```
❌ #FFFFFF, rgb(), white, bg-green-600
❌ Arial, Helvetica, Georgia, Times
❌ style={{ backgroundColor: 'white' }}
❌ dark:bg-slate-900
```

---

**Keep this banner visible and follow the rules!** ✅

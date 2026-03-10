# LightSpeed Tour Operator Plugin - Guidelines Directory

This directory contains the complete documentation for the LightSpeed Tour Operator WordPress plugin prototype.

---

## 📋 Start Here

**👉 [Guidelines.md](Guidelines.md)** - Main entry point and quick start guide

---

## 📚 Documentation Structure

### Overview Files (Read These First)

| File | Purpose | Status |
|------|---------|--------|
| [overview-components.md](overview-components.md) | Component architecture, directory structure, import conventions | ✅ Complete |
| [overview-patterns.md](overview-patterns.md) | Block patterns, composition rules, pattern taxonomy | ✅ Complete |
| [overview-icons.md](overview-icons.md) | Icon system, verification process, usage guidelines | ✅ Complete |
| [overview-blocks.md](overview-blocks.md) | WordPress block equivalents | 🔜 Future |
| [overview-parts.md](overview-parts.md) | Template parts reference | 🔜 Future |
| [overview-templates.md](overview-templates.md) | Page template archetypes | 🔜 Future |

---

### Design Tokens

**Purpose:** Define the visual system (colors, typography, spacing)

| File | Purpose | Status |
|------|---------|--------|
| [design-tokens/colors.md](design-tokens/colors.md) | Semantic color system with dark mode support | ✅ Complete |
| [design-tokens/typography.md](design-tokens/typography.md) | Typography hierarchy, fonts, usage rules | ✅ Complete |
| [design-tokens/spacing.md](design-tokens/spacing.md) | Spacing scale, responsive patterns, layout | ✅ Complete |
| [design-tokens/borders.md](design-tokens/borders.md) | Border presets | 🔜 Future |
| [design-tokens/radii.md](design-tokens/radii.md) | Border radius presets | 🔜 Future |
| [design-tokens/shadows.md](design-tokens/shadows.md) | Shadow presets | 🔜 Future |

---

### Component Guidelines

**Purpose:** Detailed documentation for each React component

#### Common Components

| File | Component | Status |
|------|-----------|--------|
| [components/Logo.md](components/Logo.md) | Site branding logo | ✅ Complete |
| [components/Container.md](components/Container.md) | Width constraints wrapper | 🔜 Future |
| [components/ScrollBackToTop.md](components/ScrollBackToTop.md) | Back-to-top button | 🔜 Future |
| [components/ScrollDownArrow.md](components/ScrollDownArrow.md) | Scroll indicator | 🔜 Future |
| [components/LayoutSwitcher.md](components/LayoutSwitcher.md) | Grid/list view toggle | 🔜 Future |

#### Pattern Components

| File | Component | Status |
|------|-----------|--------|
| [components/Hero.md](components/Hero.md) | Hero pattern | 🔜 Future |
| [components/ArchiveHeader.md](components/ArchiveHeader.md) | Archive header pattern | 🔜 Future |
| [components/CardGrid.md](components/CardGrid.md) | Card grid pattern | 🔜 Future |
| [components/TourCard.md](components/TourCard.md) | Tour card component | 🔜 Future |
| [components/CTA.md](components/CTA.md) | Call-to-action pattern | 🔜 Future |
| [components/EditorialContent.md](components/EditorialContent.md) | Editorial content block | 🔜 Future |
| [components/FastFacts.md](components/FastFacts.md) | Meta/quick-facts pattern | 🔜 Future |

#### Template Parts

| File | Component | Status |
|------|-----------|--------|
| [components/SiteHeader.md](components/SiteHeader.md) | Site header | 🔜 Future |
| [components/SiteFooter.md](components/SiteFooter.md) | Site footer | 🔜 Future |

#### Layout Components

| File | Component | Status |
|------|-----------|--------|
| [components/PageLayout.md](components/PageLayout.md) | Page layout wrapper | 🔜 Future |

---

### Icon Guidelines

**Purpose:** Reference for lucide-react icons used in the system

| File | Category | Status |
|------|----------|--------|
| [icons/travel.md](icons/travel.md) | Travel-related icons (destinations, activities, transportation) | ✅ Complete |
| [icons/interface.md](icons/interface.md) | UI control icons (navigation, actions, status) | ✅ Complete |

**⚠️ CRITICAL:** Always verify icons exist in lucide-react before importing:
```bash
grep "IconName" node_modules/lucide-react/dist/esm/icons/index.js
```

---

### Pattern Guidelines

**Purpose:** Detailed documentation for block patterns

| Directory | Purpose | Status |
|-----------|---------|--------|
| [patterns/](patterns/) | Individual pattern documentation | 🔜 Future |

**Examples:**
- TaxonomyNav.md - Filter/navigation pattern
- RelatedContent.md - Cross-link pattern
- Pagination.md - Page navigation pattern
- Breadcrumbs.md - Breadcrumb navigation pattern

---

### Block Guidelines

**Purpose:** WordPress block equivalents and implementations

| Directory | Purpose | Status |
|-----------|---------|--------|
| [blocks/](blocks/) | Block component documentation | 🔜 Future |

---

### Template Guidelines

**Purpose:** Page template archetype documentation

| Directory | Purpose | Status |
|-----------|---------|--------|
| [templates/](templates/) | Template documentation | 🔜 Future |

---

### Part Guidelines

**Purpose:** Template part documentation

| Directory | Purpose | Status |
|-----------|---------|--------|
| [parts/](parts/) | Template part documentation | 🔜 Future |

---

### Mobile Guidelines

**Purpose:** Mobile-specific patterns and best practices

| Directory | Purpose | Status |
|-----------|---------|--------|
| [mobile/](mobile/) | Mobile optimization guidelines | 🔜 Future |

**Topics:**
- Navigation patterns
- Touch targets
- Typography scaling
- Form optimization
- Image optimization
- Performance considerations

---

## 🎯 Quick Navigation

### By Task

**Setting up a new page:**
1. Read [overview-components.md](overview-components.md) - Understand architecture
2. Read [overview-patterns.md](overview-patterns.md) - See which patterns to use
3. Read [Guidelines.md](Guidelines.md) - Check page archetype requirements
4. Read component guidelines for each pattern you'll use

**Using icons:**
1. Read [overview-icons.md](overview-icons.md) - Understand icon system
2. Read [icons/travel.md](icons/travel.md) or [icons/interface.md](icons/interface.md)
3. **Verify icon exists** using bash tool
4. Import and use

**Styling components:**
1. Read [design-tokens/colors.md](design-tokens/colors.md) - Color system
2. Read [design-tokens/typography.md](design-tokens/typography.md) - Typography rules
3. Read [design-tokens/spacing.md](design-tokens/spacing.md) - Spacing patterns
4. Use CSS custom properties from theme.css

**Creating new components:**
1. Read [overview-components.md](overview-components.md) - See where it belongs
2. Read [overview-patterns.md](overview-patterns.md) - Check if pattern exists
3. Read design token files - Use system tokens
4. Create component in appropriate directory
5. Document in `components/YourComponent.md`

---

## 📖 Reading Order

**For first-time users:**

1. **[Guidelines.md](Guidelines.md)** - Overview and quick start
2. **[overview-components.md](overview-components.md)** - Component system
3. **[overview-patterns.md](overview-patterns.md)** - Pattern composition
4. **[overview-icons.md](overview-icons.md)** - Icon usage
5. **Design tokens:**
   - [colors.md](design-tokens/colors.md)
   - [typography.md](design-tokens/typography.md)
   - [spacing.md](design-tokens/spacing.md)
6. **Component guidelines** - As needed when using specific components
7. **Icon guidelines** - When selecting icons for your design

---

## 🔑 Key Principles

1. **System-first, not page-first** - Build with reusable patterns
2. **Read before you code** - Always check guidelines first
3. **Verify icons** - Never assume icons exist
4. **Use semantic HTML** - Don't override with Tailwind classes
5. **Use design tokens** - CSS variables for all styling
6. **Import from data** - Never hardcode content
7. **Follow WordPress mapping** - Every component maps to WordPress concept

---

## 🆘 Troubleshooting

**Icon not found error:**
- Read [overview-icons.md](overview-icons.md#critical-icon-verification-process)
- Verify icon exists using bash tool
- Check exact capitalization (PascalCase)

**Import path error:**
- Read [overview-components.md](overview-components.md#import-path-rules)
- Use relative paths only
- Check file location

**Styling not working:**
- Read appropriate design token file ([colors](design-tokens/colors.md), [typography](design-tokens/typography.md), [spacing](design-tokens/spacing.md))
- Use CSS custom properties from theme.css
- Avoid hardcoded values

**Pattern composition unclear:**
- Read [overview-patterns.md](overview-patterns.md#pattern-composition-rules)
- Check page archetype in [Guidelines.md](Guidelines.md#page-archetypes)
- See pattern usage examples

---

## 📝 Documentation Status Legend

- ✅ **Complete** - Documentation is finished and reviewed
- 🔜 **Future** - Planned for future implementation
- 🚧 **In Progress** - Currently being written

---

## 🤝 Contributing to Guidelines

When adding new components or patterns:

1. Create component guideline in appropriate subdirectory
2. Follow existing guideline format
3. Include:
   - Purpose and usage
   - Props/API reference
   - Examples
   - WordPress mapping
   - Accessibility notes
   - Design tokens used
4. Update this README
5. Update relevant overview file

---

**Questions?** Start with [Guidelines.md](Guidelines.md) or the relevant overview file.

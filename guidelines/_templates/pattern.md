# [Pattern Name] Pattern

**File:** `/src/app/components/patterns/[PatternName].tsx`
**CSS:** `/src/styles/patterns/[pattern-name].css`
**WordPress Mapping:** `patterns/[pattern-slug]`
**Status:** [Active | Future | Deprecated]

---

## Purpose

[1-2 sentences explaining what editorial or structural role this pattern serves.]

---

## Composition

[List the blocks/components this pattern composes.]

```
PatternName
├── Block A
├── Block B
│   └── Sub-block
└── Block C
```

---

## Variants

| Variant | Description | When to Use |
|---------|-------------|-------------|
| `default` | [Description] | [Usage context] |

---

## Section Style Integration

| Section Style Class | Background | Usage |
|--------------------|------------|-------|
| `.organic-section-[position]` | [Token] | [Context] |

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `propName` | `type` | Yes/No | — | [Description] |

---

## Usage in Templates

```tsx
{/* Used in [ArchiveTemplate, SingleTemplate, etc.] */}
<PatternName data={data} />
```

**Appears in these page archetypes:**
- [Content Hub, Single Detail, etc.]

---

## Styling

**BEM Structure:**

```
.wp-pattern-[name]
  .wp-pattern-[name]__[element]
  .wp-pattern-[name]--[modifier]
```

---

## Accessibility

- [Semantic HTML requirements]
- [Heading hierarchy]
- [ARIA attributes]

---

## Do / Don't

### Do
- [Correct composition patterns]

### Don't
- [Anti-patterns]

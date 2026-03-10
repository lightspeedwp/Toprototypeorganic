Project context:
We are building a highly responsive, mobile-first React prototype for a tour operator website.
Use WordPress-aligned CSS architecture and class naming.
Do not use Tailwind utility classes for authored prototype components.

Mandatory workflow order:
1) Review and reconcile guidelines/documentation first
2) Run orchestrator-driven code audit immediately after docs review
3) Produce audit report
4) Produce phased implementation plan
5) Implement in phases (high-impact first)

Design system constraints:
- Typography: Lora (headings), Noto Sans (body/UI), mono only for technical values (booking IDs/reference codes)
- Use CSS variables only for tokens (no hardcoded core values)
- Use clamp() for fluid typography/spacing
- Keep semantic flow margins for h1-h6 and p in base/prose
- Remove margins from patterns/parts/templates layout orchestration
- Use padding + gap for layout rhythm; spacer block is forbidden

Class naming constraints:
- Use WordPress-aligned project block classes: .wp-block-tour-*
- Keep WP-aligned utility naming conventions
- No Tailwind utility authoring in custom prototype components

Responsive system:
- Breakpoints (mobile-first): 320, 480, 640, 768, 1024, 1280, 1440, 1600, 1920
- Clamp-first for fluid scales; media queries only for structural changes
- Archive grid progression:
  1 col (320-639)
  2 cols (640-1023)
  3 cols (1024-1279)
  4 cols (1280-1439)
  5 cols (1440-1679)
  6 cols (1680+)

Container/layout:
- Expand max container from 1440 to 1680 with fluid gutters at wide desktop
- Support both unified gap and row/column-specific gap

Block gap:
- Canonical variable: --wp--style--block-gap
- Map to fluid 16px-32px scale
- Support WP-like flow/flex/grid block layout behavior

Documentation deliverables:
- Consolidate into 3 master docs:
  A) Architecture
  B) Tokens
  C) Responsive/Layout
- Archive legacy docs as references
- Prioritize corrections for spacing scale docs, breakpoint docs, grid behavior docs
- Reconcile legacy token naming drift (e.g., old --text-* usage) against current WP preset vars

Audit deliverables:
- Audit all CSS files (prioritize token/global architecture layers first)
- Extract definitive token sources:
  - color tokens
  - spacing tokens
  - typography tokens
  - border/radius tokens
- Produce:
  - automated findings
  - manual-review findings
  - task list
  - human-review-only task list
  - risk-ranked implementation sequence

Compliance rules:
- Update scorecard/lint checks to fail non-exempt margins in patterns/parts/templates
- Exemptions allowed:
  - semantic prose flow margins
  - accessibility helper patterns
  - print layout margins
  - auto-centering margins (where structurally required)

Output required:
1) Consolidated decision matrix (Q&A with final choices)
2) Documentation audit summary with file-level action list
3) Code audit report with severity
4) Phased implementation plan (Phase 1-4)
5) Acceptance checklist for 320/480/640/768/1024/1280/1440/1600/1920

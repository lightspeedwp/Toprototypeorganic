# File Organization Rules

**Category:** Rules — Project Structure
**Last Updated:** March 13, 2026
**Status:** Active

---

## Root Directory (`/`)

**ONLY these files are allowed in root:**

| File | Purpose |
|------|---------|
| `README.md` | Project overview (optional) |
| `CHANGELOG.md` | Version history (optional) |
| `index.html` | HTML entry point |
| `package.json` | Dependencies |
| `vite.config.ts` | Build config |
| `tsconfig.json` | TypeScript config |
| `tsconfig.node.json` | Node TS config |
| `.gitignore` | Git ignore rules |
| `pnpm-lock.yaml` | Lockfile (auto-generated) |

**Never create in root:** `.md` docs (except README/CHANGELOG), `.sh` scripts, reports, task lists, guides, backups, numbered variants.

---

## File Placement Rules

| File Type | Destination | Examples |
|-----------|-------------|----------|
| Documentation | `/docs/` | project-guide.md, setup-instructions.md |
| Guides & References | `/docs/guides/` | dev-tools-reference.md |
| Reports | `/reports/` | 2026-03-13-audit-report.md |
| Archived Reports | `/reports/archive/` | old reports |
| Task Lists | `/tasks/` | cleanup-tasks.md |
| Archived Tasks | `/tasks/archive/` | completed tasks |
| Prompts | `/prompts/` | audit-prompt.md |
| Guidelines | `/guidelines/` | component-guidelines.md |
| Scripts | `/scripts/` | build.sh, deploy.sh |
| Source Code | `/src/` | components, pages, styles |

---

## File Naming Rules

- **Reports:** `YYYY-MM-DD-[descriptive-name]-report.md`
- **Tasks:** `[descriptive-name]-tasks.md`
- **Prompts:** `[descriptive-name]-prompt.md` or `[descriptive-name].md`
- **Never create:** Numbered backup files (`App-2.tsx`, `Component-backup.tsx`)

---

## Source Directory Structure

```
/src/app/
├── components/
│   ├── blocks/       # WordPress block equivalents
│   ├── common/       # Shared utility components
│   ├── figma/        # Figma-specific (protected)
│   ├── parts/        # Template parts (Header, Footer)
│   ├── patterns/     # Reusable block patterns
│   └── ui/           # shadcn/ui library ONLY
├── data/             # Mock data, content models
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Page templates
└── styles/           # Global CSS, theme tokens

/src/styles/
├── blocks/           # Block-level CSS
├── common/           # Shared utility CSS
├── components/       # Component CSS
├── organic/          # Organic theme overrides
├── pages/            # Page-specific CSS
├── parts/            # Template part CSS
├── patterns/         # Pattern CSS
├── templates/        # Template CSS
└── theme*.css        # Design system tokens
```

---

## Import Conventions

**All imports must use relative paths.** No absolute paths or webpack aliases.

```typescript
// ✅ CORRECT
import { Hero } from "../components/patterns/Hero";
import { cn } from "../lib/utils";
import { TOURS } from "../data/mock";

// ❌ WRONG
import { Hero } from "/src/app/components/patterns/Hero";
import { cn } from "@/lib/utils";
```

---

## Maintenance Rules

- **Reports:** Keep recent (< 7 days) in main folder, archive older ones
- **Tasks:** Mark completed with `[x]`, move finished files to `/tasks/archive/`
- **Prompts:** Keep all prompts for reuse, version if significant changes
- **Root:** Regularly clean orphaned files using `cleanup` trigger

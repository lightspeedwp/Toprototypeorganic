# Changelog — Update Project Changelog

**Type:** Utility  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `changelog`

---

## Prompt Purpose

**Objective:** Audit recent work and ensure `/CHANGELOG.md` is complete and current under the `[Unreleased]` section.

**When to Use:** After completing work that has not yet been documented in the changelog, or at end of session.

---

## Workflow Steps

### Step 1: Identify Undocumented Work

1. Read `/CHANGELOG.md` — note what is already documented under `[Unreleased]`.
2. Read `/tasks/task-list.md` — identify recently completed tasks (`[x]`) not yet in changelog.
3. Scan recent file modifications in `/src/`, `/guidelines/`, `/prompts/` for undocumented changes.

### Step 2: Write Entries

Add entries under `[Unreleased]` using [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) categories:

- **Added** — New files, features, routes, components, guidelines
- **Changed** — Refactored code, updated configs, modified existing features
- **Fixed** — Bug fixes, broken imports, compliance fixes
- **Removed** — Deleted files, dead code, deprecated features
- **Deprecated** — Features marked for future removal

### Step 3: Entry Format Rules

- Each entry: 1-2 sentences maximum
- Bold the initiative name: `**[Initiative Name] — [Date]:** Description`
- Include file counts and metrics where relevant
- Never delete existing entries
- Follow SemVer 2.0.0 conventions (see `/guidelines/Changelog-Guidelines.md`)

---

## Success Criteria

- [ ] All recent work documented under `[Unreleased]`
- [ ] Entries follow Keep a Changelog format
- [ ] No existing entries deleted
- [ ] Each entry is 1-2 sentences

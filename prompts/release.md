# Release — Version Bump and Release Workflow

**Type:** Utility  
**Version:** 2.0.0  
**Created:** 2026-03-18  
**Status:** Active  
**Trigger Word:** `release`

---

## Environment Reminder

You are working inside **Figma Make** — a sandboxed web IDE. There is no terminal, no browser refresh, no cache to clear. Do NOT suggest the user "refresh their browser," "clear cache," "run npm install," or "restart the dev server." All file changes are live immediately.

---

## Prompt Purpose

**Objective:** Automate the version bump workflow — move `[Unreleased]` entries in the changelog to a versioned section, update version numbers across the project, and prepare release notes.

**When to Use:** When ready to cut a new release version.

---

## Input Required

The user should provide:
1. **Version type** — `major`, `minor`, or `patch` (or a specific version number like `2.1.0`)

If not provided, determine the version type from changelog entries:
- **Major:** Breaking changes, major rewrites, architecture changes -> `X.0.0`
- **Minor:** New features, new pages, new patterns, new data -> `x.Y.0`
- **Patch:** Bug fixes, documentation updates, compliance fixes -> `x.y.Z`

---

## Workflow Steps

### Step 1: Determine Version Number

1. Read `/CHANGELOG.md` to find the current latest version.
2. Calculate the new version based on user input or auto-detection.
3. Confirm with the user: "Releasing version **X.Y.Z** — proceed?"

### Step 2: Update CHANGELOG.md

1. Replace `## [Unreleased]` content with a new versioned section:

```markdown
## [X.Y.Z] — YYYY-MM-DD

### Added
- [entries from Unreleased]

### Changed
- [entries from Unreleased]

### Fixed
- [entries from Unreleased]
```

2. Create a new empty `## [Unreleased]` section at the top.

### Step 3: Update Version References

Update the version number in:
1. `/CHANGELOG.md` — done in Step 2
2. `/guidelines/Guidelines.md` — version in header
3. `/README.md` — version reference if present

### Step 4: Update Guidelines.md

1. Increment the version in the header of `Guidelines.md`.
2. Update `Last Updated` date.

### Step 5: Generate Release Summary

```
## Release v[X.Y.Z] — [Today's Date]

### Highlights
- [Top 3-5 changes from this release]

### Statistics
- Added: [N] entries
- Changed: [N] entries
- Fixed: [N] entries
- Removed: [N] entries

### Files Updated
- /CHANGELOG.md
- /guidelines/Guidelines.md
- [other files]
```

---

## Success Criteria

- [ ] `[Unreleased]` entries moved to versioned section
- [ ] New empty `[Unreleased]` section created
- [ ] Version number updated in all relevant files
- [ ] Release summary generated
- [ ] Guidelines.md version and date updated

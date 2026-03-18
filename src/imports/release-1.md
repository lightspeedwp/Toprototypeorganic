# Release — Version Bump and Release Workflow

**Type:** Utility  
**Created:** 2026-03-15  
**Status:** Ready  
**Trigger Word:** `release`

---

## Prompt Purpose

**Objective:** Automate the version bump workflow — move `[Unreleased]` entries in the changelog to a versioned section, update version numbers across the project, and prepare release notes.

**When to Use:** When ready to cut a new release version.

---

## Input Required

The user should provide:
1. **Version type** — `major`, `minor`, or `patch` (or a specific version number like `2.1.0`)

If not provided, determine the version type from changelog entries:
- **Major:** Breaking changes, major rewrites, architecture changes → `X.0.0`
- **Minor:** New features, new templates, new patterns → `x.Y.0`
- **Patch:** Bug fixes, documentation updates, compliance fixes → `x.y.Z`

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
3. Update comparison links at the bottom of the file:

```markdown
[Unreleased]: https://github.com/user/repo/compare/vX.Y.Z...HEAD
[X.Y.Z]: https://github.com/user/repo/compare/vPREV...vX.Y.Z
```

### Step 3: Update Version References

Update the version number in:
1. `/CHANGELOG.md` — done in Step 2
2. `/guidelines/Guidelines.md` — footer version reference
3. `/README.md` — version badge/reference if present
4. Any other files that display the current version

### Step 4: Update Guidelines.md

1. Increment the version in the frontmatter of `Guidelines.md`.
2. Update `Last Updated` date.
3. Add a Version History entry.

### Step 5: Generate Release Summary

Output a release summary:

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
- [ ] Comparison links updated in CHANGELOG
- [ ] Release summary generated
- [ ] Guidelines.md version and date updated

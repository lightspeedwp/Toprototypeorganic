# Trigger Words — Quick Command Reference

**Version:** 1.0.0
**Date:** March 13, 2026

---

## Overview

Trigger words are single-word or short-phrase commands that tell the AI to execute a specific prompt file. This eliminates the need to paste full prompt instructions — just type the word.

---

## Registered Trigger Words

| Trigger | Prompt File | What It Does |
|---------|-------------|--------------|
| **cleanup** | `/prompts/cleanup.md` | Full project hygiene: filesystem, imports, routes, tasks, reports, changelog, sitemap, devtools |
| **continue** | `/prompts/continue.md` | Resume next unchecked task from `/tasks/task-list.md` |
| **cleanup + continue** | Both in sequence | Run cleanup first, then continue with next task |

---

## How to Use

### In Figma Make chat, just type:

```
cleanup
```
AI reads `/prompts/cleanup.md` and executes all 6 phases in one session.

```
continue
```
AI reads `/prompts/continue.md`, finds next task in `task-list.md`, and executes it.

```
cleanup then continue
```
AI runs cleanup first, then picks up the next task.

---

## Adding New Trigger Words

To register a new trigger word:

1. Create the prompt file in `/prompts/[name].md`
2. Add an entry to the table above
3. Add the trigger word to the `TRIGGER WORDS` section in `/guidelines/Guidelines.md`

---

## Rules for Trigger Word Prompts

1. **Self-contained:** Each prompt must include all instructions needed — no dependencies on user memory
2. **Single-session:** Prompts should complete in one session (~30-45 min max)
3. **Idempotent:** Running the same prompt twice should be safe (no double-deletions, no duplicate entries)
4. **Environment-aware:** Every prompt must include the Figma Make environment reminder (no browser refresh, no cache clear, no terminal commands)
5. **Design-system-aware:** Every prompt that generates UI must reference the design system compliance rules

# ARCHIVED — See `~/Projects/holston-road`

**This repository is no longer the canonical Holston Road project.**

The project was reset on **2026-04-28** to a marker-network + publication + patrons architecture, with new branding (vintage badge, "Tennessee Heritage Music Trail," "Follow the river. Hear the roots.") and a federation strategy spanning Tennessee's three Grand Divisions.

## Where to find the new project

```
~/Projects/holston-road/
├── docs/BUSINESS-PLAN.md     ← canonical business plan
├── docs/PROJECT-PLAN.md      ← canonical project plan
├── docs/archive/             ← all historical planning docs
└── brand/logo-system.png     ← brand identity
```

## What this old repo still contains

A working TanStack Start app that pre-dates the brand reset. Its content (chapter slugs, palette, voice) reflects the pre-pivot music-heritage framing and is **not** authoritative.

The most useful thing in this old repo for new development is the working TanStack Start + Cloudflare Workers + D1 + Tailwind setup, which can be referenced for Boring Stack patterns. The new repo is a clean rebuild, not a fork.

## Do not deploy this repo

The deployment target `holston-partners.codyboring.workers.dev` (or any current domain attached) should be retired or pointed at the new build once it's live. Until then, this repo is reference-only.

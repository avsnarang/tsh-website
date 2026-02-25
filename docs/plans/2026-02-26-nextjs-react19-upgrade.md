# Next.js 16.1 + React 19 + Turbopack + ESLint 16 Upgrade Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the app from Next.js 16.0.7/React 18 to Next.js 16.1.x/React 19, enable Turbopack, update ESLint, and rename middleware to proxy.

**Architecture:** All-at-once upgrade. Update dependencies first, then config files, then verify everything builds and runs.

**Tech Stack:** Next.js 16.1, React 19, Turbopack, ESLint 9 + eslint-config-next 16, TypeScript 5

---

### Task 1: Update dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install updated packages**

Run:
```bash
npm install next@latest react@^19.0.0 react-dom@^19.0.0 framer-motion@^12.0.0
```

Expected: Installs successfully. May show peer dependency warnings — that's fine.

**Step 2: Update dev dependencies**

Run:
```bash
npm install --save-dev @types/react@^19.0.0 @types/react-dom@^19.0.0 eslint-config-next@^16.0.0
```

Expected: Installs successfully.

**Step 3: Verify package.json looks correct**

Read `package.json` and confirm:
- `next` is 16.1.x
- `react` and `react-dom` are ^19.x
- `framer-motion` is ^12.x
- `@types/react` and `@types/react-dom` are ^19.x
- `eslint-config-next` is ^16.x

---

### Task 2: Update next.config.ts — remove webpack config, enable Turbopack

**Files:**
- Modify: `next.config.ts:53-97`

**Step 1: Remove the webpack callback and empty turbopack config**

Delete lines 53-97 in `next.config.ts` (the entire `webpack` callback function and the `turbopack: {}` line). The resulting file should go from `serverExternalPackages` directly to `headers()`.

Before (lines 53-97):
```typescript
  // Force webpack usage instead of Turbopack
  webpack: (config, { isServer }) => {
    // ... splitChunks config ...
    return config;
  },

  // Add empty turbopack config to silence the error when using webpack
  turbopack: {},
```

After: those lines are simply gone.

**Step 2: Verify the config is valid**

Read the full `next.config.ts` and confirm no syntax errors (balanced braces, commas).

---

### Task 3: Update dev script to use Turbopack

**Files:**
- Modify: `package.json`

**Step 1: Remove --webpack flag from dev script**

Change:
```json
"dev": "next dev --webpack",
```
To:
```json
"dev": "next dev",
```

---

### Task 4: Rename middleware.ts to proxy.ts

**Files:**
- Rename: `middleware.ts` → `proxy.ts`

**Step 1: Rename the file**

Run:
```bash
mv middleware.ts proxy.ts
```

No content changes needed — the file contents are the same, Next.js 16.1 looks for `proxy.ts` at the project root.

---

### Task 5: Verify — TypeScript check

**Step 1: Run typecheck**

Run:
```bash
npm run typecheck
```

Expected: Exits with code 0, no errors. If there are React 19 type errors, fix them before proceeding.

---

### Task 6: Verify — ESLint

**Step 1: Run lint**

Run:
```bash
npm run lint
```

Expected: Exits cleanly. Some warnings are OK, errors should be addressed.

---

### Task 7: Verify — Production build

**Step 1: Run build**

Run:
```bash
npm run build
```

Expected: Build completes successfully. This is the critical gate — if this passes, the upgrade is solid.

---

### Task 8: Verify — Dev server with Turbopack

**Step 1: Start dev server**

Run:
```bash
timeout 15 npm run dev 2>&1 || true
```

Expected: See Turbopack mentioned in the startup output. Server starts on localhost:3000. The timeout will kill it after 15 seconds — we just need to confirm it starts.

---

### Task 9: Commit

**Step 1: Stage and commit all changes**

```bash
git add package.json package-lock.json next.config.ts proxy.ts docs/plans/
git rm middleware.ts
git commit -m "chore: upgrade to Next.js 16.1, React 19, Turbopack, ESLint 16

- next 16.0.7 → 16.1.x
- react/react-dom 18 → 19
- framer-motion 11 → 12
- eslint-config-next 15 → 16
- Enable Turbopack (remove webpack splitChunks config)
- Rename middleware.ts → proxy.ts (Next.js 16.1 convention)"
```

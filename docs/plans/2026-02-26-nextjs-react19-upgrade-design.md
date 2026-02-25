# Upgrade Design: Next.js 16.1 + React 19 + Turbopack + ESLint 16

**Date:** 2026-02-26
**Status:** Approved

## Summary

All-at-once upgrade of the Next.js app from Next.js 16.0.7/React 18 to Next.js 16.1.x/React 19, with Turbopack enabled and ESLint config updated.

## Dependency Updates (package.json)

| Package | Current | Target |
|---------|---------|--------|
| `next` | 16.0.7 | ~16.1.6 |
| `react` | ^18.3.1 | ^19.0.0 |
| `react-dom` | ^18.3.1 | ^19.0.0 |
| `framer-motion` | ^11.0.8 | ^12.0.0 |
| `@types/react` | ^18.3.0 | ^19.0.0 |
| `@types/react-dom` | ^18.3.0 | ^19.0.0 |
| `eslint-config-next` | ^15.1.0 | ^16.0.0 |

## next.config.ts Changes

- Remove the entire `webpack` callback (custom `splitChunks` config) — Turbopack handles optimization
- Keep everything else (image config, rewrites, `transpilePackages`, `optimizePackageImports`, etc.)

## package.json Scripts

- Change `"dev": "next dev --webpack"` to `"dev": "next dev"`

## middleware.ts to proxy.ts

- Rename the file (no content changes needed)

## Verification

- `npm run build` — production build passes
- `npm run dev` — Turbopack dev server starts
- `npm run lint` — ESLint 16 works
- `npm run typecheck` — TypeScript happy with React 19 types

## Not Changing

- No React API changes needed (no deprecated patterns found)
- No component refactoring
- Tailwind stays at v3
- No tsconfig changes needed

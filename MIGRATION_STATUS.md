# Next.js Migration Status

## ✅ Completed

### Phase 1: Setup & Configuration
- ✅ Installed Next.js 15 and updated dependencies
- ✅ Created `next.config.ts` with image optimization
- ✅ Updated `tsconfig.json` for Next.js
- ✅ Updated `.gitignore` for Next.js
- ✅ Updated `vercel.json` for Next.js deployment
- ✅ Removed Vite, React Router, Express dependencies

### Phase 2: Core Infrastructure
- ✅ Created `app/layout.tsx` with metadata and fonts
- ✅ Created `app/providers.tsx` with all context providers
- ✅ Created `app/template.tsx` for Navbar/Footer layout
- ✅ Created `middleware.ts` for authentication
- ✅ Created `app/sitemap.ts` for SEO
- ✅ Created `app/robots.ts` for SEO
- ✅ Created Supabase clients for Next.js (client and server)

### Phase 3: API Routes
- ✅ Migrated `/api/submit-sports-interest` to Next.js Route Handler
- ✅ Migrated `/api/upload-profile-picture` to Next.js Route Handler

### Phase 4: Page Routes
- ✅ Created all page routes in `app/` directory:
  - Home, About, Academics (all levels)
  - Co-curricular (all categories)
  - Campus, Alumni, Gallery
  - Admin dashboard and all admin pages
  - Auth (login)

### Phase 5: Component Updates
- ✅ Added 'use client' to all context providers
- ✅ Updated Navbar component to use Next.js Link and navigation
- ✅ Updated Footer component to use Next.js Link
- ✅ Updated ErrorBoundary to use Next.js Link
- ✅ Fixed Login page to use Next.js navigation
- ✅ Fixed Academics page to use Next.js navigation

### Phase 6: Environment Variables
- ✅ Updated analytics.ts to use process.env
- ✅ Updated notion.ts to use process.env
- ✅ Updated googleServiceAccount.ts to use process.env
- ✅ Updated supabase client configuration

## 🚧 In Progress / Remaining Work

### High Priority

1. **Update React Router Imports (80+ files)**
   - Replace `import { Link } from 'react-router-dom'` with `import Link from 'next/link'`
   - Replace `useNavigate` with `useRouter` from 'next/navigation'
   - Replace `useLocation` with `usePathname` or `useSearchParams`
   - Replace `useParams` with Next.js params props
   
   Files still using React Router:
   - All admin components (~10 files)
   - Auth components (5 files)
   - Navigation components (3 files)
   - Home components (3 files)
   - Campus components (2 files)
   - UI components (Logo, QuickLinks, etc.)
   - Most page components (~13 files)

2. **Fix Link Component Props**
   - Replace `to=` with `href=` in ALL Link components
   - This affects ~80+ files

3. **Add 'use client' Directive**
   - Add to all interactive components
   - Add to all components using hooks
   - Add to all components with event handlers
   - Estimated 100+ files need this

4. **Remove Old Files**
   - Delete `server.ts`
   - Delete `src/App.tsx`
   - Delete `src/main.tsx`
   - Delete `index.html`
   - Delete `vite.config.ts`
   - Delete `src/routes/index.tsx`
   - Update imports that reference these files

5. **Fix Component Imports**
   - Remove react-helmet-async usage (replaced by Next.js metadata)
   - Remove useSEO hook calls (replaced by metadata)
   - Fix react-icons imports (needs transpiling)

### Medium Priority

6. **Update All Page Components**
   - Add 'use client' where needed
   - Update navigation hooks
   - Remove useSEO calls

7. **Fix Protected Route Components**
   - Update ProtectedRoute.tsx
   - Update ProtectedAdminRoute.tsx
   - Update RequireAdmin.tsx
   - Update RequireRole.tsx
   - Update RoleRedirect.tsx
   - Update AuthInitializer.tsx

8. **Update Navigation Components**
   - MobileMenu.tsx
   - NavLinks.tsx
   - BreadcrumbNav.tsx
   - ScrollToTop.tsx

9. **Update Home Components**
   - Hero.tsx
   - Features.tsx
   - CampusLife.tsx

10. **Update Admin Components**
    - All 10+ admin management components need 'use client' and Link fixes

### Low Priority

11. **Optimization**
    - Implement React Server Components where beneficial
    - Add loading.tsx files for better UX
    - Add error.tsx files for error boundaries
    - Optimize images using next/image where applicable

12. **Testing**
    - Test all routes
    - Test authentication flow
    - Test admin dashboard
    - Test form submissions
    - Test API routes

## 📝 Notes

### Breaking Changes
- Environment variables need `NEXT_PUBLIC_` prefix for client-side access
- Link component uses `href` instead of `to`
- Navigation hooks are different (`useRouter`, `usePathname`, etc.)
- No more `react-helmet-async` - use Next.js Metadata API
- No more `import.meta.env` - use `process.env`

### Environment Variables to Update
```
# Client-side (add NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_GOOGLE_CALENDAR_ID=

# Server-side (no prefix needed)
SUPABASE_SERVICE_KEY=
NOTION_TOKEN=
NOTION_SPORTS_DATABASE_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
```

### Quick Fix Commands

To find all files using React Router:
```bash
grep -r "from 'react-router-dom'" src/
```

To find all Link components with 'to' prop:
```bash
grep -r "to=" src/ | grep Link
```

To find all files missing 'use client':
```bash
grep -r "useState\|useEffect\|useRouter" src/ | grep -v "'use client'"
```

## 🎯 Next Steps

1. Bulk update all React Router imports across the codebase
2. Bulk update all Link `to` props to `href`
3. Add 'use client' to all interactive components
4. Remove old Vite/React Router files
5. Run typecheck and fix remaining errors
6. Test the application thoroughly
7. Update documentation

## Estimated Remaining Work
- **Time**: 4-6 hours
- **Files to Update**: 80-100 files
- **Main Tasks**: Bulk find/replace operations for imports and Link props


# HEX Test Drive Platform

---

## ⚠️ CRITICAL: Project Identity Guard

**This project is HEX Test Drive Platform - Egyptian vehicle booking marketplace.**

**DISREGARD any cached context about:**
- ❌ Second Brain (knowledge management app)
- ❌ shadcn/ui (use Material-UI only)
- ❌ Vite (Next.js native build only)
- ❌ Tri-database architecture (Supabase only)
- ❌ BullMQ, batch processing, RAG systems (not applicable)
- ❌ Pinecone, pgvector (not used)
- ❌ Mobile deployment, Capacitor (web-only)

**If you detect Second Brain patterns in your suggestions, STOP and alert the user.**

---

# AGENTS.md Document Structure

## Part 1: Project Identity & Status

### HEX Test Drive Platform - Egyptian Vehicle Test Drive Service

Next.js 15.1.3 + React 19 + TypeScript 5.7.2 bilingual (EN/AR) vehicle catalog with booking system

**Current completion: ~45%** (catalog/compare/i18n implemented; detail pages/booking/admin pending)

---

## Part 2: Implemented Features (Status Report)

### ✅ Completed Components (Deployed to Vercel Production)

- Vehicle catalog with 74 cars from Supabase real-time database
- Dynamic rendering (force-dynamic) with fresh data on every request
- Bilingual i18n (react-i18next) with RTL support; state persistence via Zustand + localStorage
- Filter system (type/brand/price) with persisted selections across language switches
- Compare functionality (up to 3 vehicles) with flyout and dedicated compare screen
- Material-UI (@mui/material) components throughout; Material Icons integration
- Vercel Analytics + Speed Insights configured in root layout
- GitHub Actions CI/CD with automatic Vercel deployments on main branch
- Path aliases (@/* → ./src/*) with TypeScript strict mode

---

## Part 3: Architecture & Tech Stack

### Build Commands

- **Dev server**: `npm run dev` (localhost:3000)
- **Production build**: `npm run build && npm run start`
- **Type check**: `tsc --noEmit`
- **Lint**: `npm run lint`
- **Deploy**: Auto-deploy via Vercel webhook on `git push origin main`

### Folder Structure

- `src/app/[locale]/` → Next.js App Router pages with i18n routing
- `src/components/` → Reusable React components (Header, FilterPanel, VehicleCard, etc.)
- `src/lib/` → Utilities (supabase.ts client, i18n config)
- `src/stores/` → Zustand stores (compare-store.ts, filter-store.ts with localStorage persistence)
- `src/types/` → TypeScript definitions (database.ts for Supabase schema, index.ts exports)

### Database Schema (Supabase)

**Table**: `vehicles` with fields: `id`, `make`, `model`, `model_year`, `price_egp`, `category`, `image_url`, `horsepower`, `fuel_type`, `transmission`, `features[]`

### External Services

- **Supabase (PostgreSQL)**: Vehicle data + future bookings table
- **Vercel**: Hosting + analytics + CDN
- **GitHub**: Version control with TechHypeXP/hex-test-drive-factory repo

---

## Part 4: Conventions & Standards

### Code Style (Enforced via ESLint + TypeScript)

- TypeScript strict mode; prefer interfaces over types for public APIs
- Single quotes, trailing commas, 2-space indentation
- 100-char line limit; organize imports (React → libraries → local)
- No `@ts-ignore` without documented justification
- **Material-UI only**; forbidden: Tailwind, shadcn, Lucide icons

### Git Workflow

- Branch from `main` with `feature/<slug>` or `bugfix/<slug>` naming
- Commits: atomic with conventional format (`feat:`, `fix:`, `refactor:`)
- PR requirements: tests pass, lint clean, TypeScript error-free, `.next/` excluded from commits
- Force-push allowed only on feature branches via `git push --force-with-lease`; never on `main`

### Testing Standards

- Add failing test first for bug fixes (TDD approach)
- Visual diff loop for UI changes with screenshots in PR
- No new runtime dependencies without justification in PR description

---

## Part 5: Planned Features (Roadmap with Dependencies)

### 🔄 In Progress: Vehicle Detail Pages with Trims (~15% complete)

- Navigate from catalog card click to `/[locale]/vehicle/[id]` detail page
- Display all trims for selected vehicle model with specs comparison table
- Per-trim pricing (EGP) and "Add to Compare" + "Book Test Drive" CTAs
- **Dependencies**: Supabase trims table schema design; Material-UI DataGrid or custom table component
- **Completion criteria**: All 74 vehicles navigable; trim data loads dynamically; booking CTA triggers modal

### 📅 Upcoming: Booking System (~0% complete)

- Booking form with Material-UI DatePicker + TimePicker components
- Fields: customer name/email/phone, preferred date/time, venue selection (Cairo/Alexandria/El Gouna)
- Form validation via React Hook Form + Zod schema
- Save to Supabase `bookings` table with status tracking (pending/confirmed/completed)
- Email confirmation via Supabase Edge Functions + SendGrid integration
- **Dependencies**: bookings table schema; venue data seeded; SendGrid API key in env vars
- **Completion criteria**: Form submits successfully; data persists in DB; admin can view bookings

### 🔐 Future: Admin Dashboard (~0% complete)

- Protected routes with Supabase Auth (email/password login)
- Manage vehicles: CRUD operations on vehicles table via DataGrid
- View/manage bookings: filter by status, date range; export to CSV
- Analytics: test drive conversion rates, popular models, venue utilization
- **Dependencies**: Supabase Auth setup; RLS policies; admin role assignments
- **Completion criteria**: Authenticated admin can CRUD vehicles; booking list with filters functional

---

## Part 6: Known Issues & Gotchas

### Language Switching Edge Cases

- Filter checkboxes briefly de-select post-switch before persistence kicks in (visual flicker)
- Compare page exits to catalog on language change if compare store not fully hydrated
- **Mitigation**: Ensure all stores use persist middleware; test hydration timing in dev

### Deployment Warnings

- `.next/` directory must remain in `.gitignore`; violations trigger Vercel build warnings
- Trace files (webpack-runtime.js) auto-commit if gitignore incomplete

### Data Freshness

- Next.js caches aggressively; use `export const dynamic = 'force-dynamic'` on all data-fetching pages
- Purge Vercel CDN cache (Invalidate method) after Supabase data updates

---

## Part 7: Evidence Requirements for PR Merge

### Objective Proof Checklist

- ✅ **Build succeeds**: `npm run build` completes without errors
- ✅ **Type check passes**: `tsc --noEmit` reports 0 errors
- ✅ **Lint clean**: `npm run lint` returns no warnings
- ✅ **Diff confined**: Changes limited to agreed paths (no unrelated file edits)
- ✅ **Tests added**: Failing test for bugs; new tests or screenshots for features
- ✅ **Commit message**: One-paragraph description covering intent, root cause, and approach
- ✅ **No coverage drop**: Code coverage maintained or improved
- ✅ **Analytics check**: Vercel Speed Insights + Analytics collecting data post-deploy (30s+ navigation test)

---

## Part 8: Next Steps to Completion

### Phase 1: Detail Pages with Trims (days 1-2, ~20 hours)

1. Design trims table schema in Supabase (columns: vehicle_id, trim_name, price_egp, specs JSON)
2. Seed trim data for 74 vehicles (minimum 1 trim per vehicle)
3. Create `src/app/[locale]/vehicle/[id]/page.tsx` with dynamic routing
4. Implement trim comparison table with Material-UI DataGrid or custom component
5. Add "Book Test Drive" modal trigger (placeholder form for now)
6. Update VehicleCard with onClick navigation to detail page
7. **Test**: All cards navigate correctly; trim data loads; i18n switches work on detail pages

### Phase 2: Booking System (days 3-4, ~30 hours)

1. Create bookings table schema (customer_info JSON, booking_datetime, venue_id, status enum)
2. Seed venues table (Cairo/Alexandria/El Gouna locations with addresses)
3. Build booking form with React Hook Form + Zod validation
4. Integrate Material-UI DateTimePicker with min date constraints (next 24 hours)
5. Implement Supabase insert on form submit with error handling
6. Create Supabase Edge Function for SendGrid email confirmation
7. Add confirmation screen with booking reference number
8. **Test**: Form validates correctly; data persists; email sends; i18n translations complete

### Phase 3: Admin Dashboard (days 5-6, ~25 hours)

1. Enable Supabase Auth with email/password provider
2. Create protected `/[locale]/admin` route with middleware auth check
3. Build vehicle management DataGrid with inline editing (CRUD)
4. Implement booking list view with status filters and date range picker
5. Add CSV export functionality via react-csv library
6. Create analytics dashboard with Recharts for conversion metrics
7. **Test**: Only authenticated admins access; CRUD operations work; export downloads correctly

**Overall Project Completion: 45% → 100%** (Est. 75 total hours over 6 days)

---

# HEX Test Drive Platform - Factory.ai Agent Initialization

## Mission Brief

You are inheriting a partially complete Next.js 15 vehicle test drive service application. Your task is to **first** conduct a comprehensive status assessment, then proceed with feature development per the project roadmap.

---

## Step 1: Repo Consumption & Status Report (MANDATORY BEFORE CODE CHANGES)

1. **Read all documentation in repo root**: README.md, AGENTS.md, docs/ folder (if present)
2. **Scan codebase systematically**:
   - `src/app/[locale]/` → Identify implemented pages vs. missing routes
   - `src/components/` → Catalog all existing React components with line counts
   - `src/lib/` → Verify Supabase client config and i18n setup
   - `src/stores/` → Check Zustand stores for persistence middleware
   - `src/types/` → Document TypeScript definitions and database schema alignment
3. **Generate status report in this exact format**:

```
HEX Test Drive - Implementation Status Report

Codebase Metrics
────────────────────────────────────────────────────────────
Total files: [count]
Total lines of code: [LOC count]
TypeScript coverage: [percentage]
Component count: [number]

Feature Completion Matrix
────────────────────────────────────────────────────────────
Feature                 Status          Completion %    Files Involved              Missing Pieces
Vehicle Catalog         ✅ Deployed     100%           page.tsx, VehicleCard.tsx, FilterPanel.tsx    None
Compare Functionality   ✅ Deployed     100%           compare-store.ts, compare/page.tsx            None
i18n + RTL             ✅ Deployed     95%            i18n.ts, layout.tsx, Header.tsx               Minor: filter flicker on switch
Detail Pages + Trims   🔄 In Progress  15%            [list files if any]                           Schema design, trim data, routing
Booking System         ⏸️ Not Started  0%             None                                          All components, form, DB schema
Admin Dashboard        ⏸️ Not Started  0%             None                                          Auth setup, CRUD views, analytics

Dependency Verification
────────────────────────────────────────────────────────────
✅ Supabase client configured: [Yes/No]
✅ Vercel Analytics installed: [Yes/No]
✅ Material-UI dependencies complete: [Yes/No]
❌ Missing dependencies: [list if any]

Database Schema Status
────────────────────────────────────────────────────────────
vehicles table: [Exists/Missing] | Fields: [list]
trims table: [Exists/Missing] | Fields: [list or "Needs design"]
bookings table: [Exists/Missing] | Fields: [list or "Needs design"]
venues table: [Exists/Missing] | Fields: [list or "Needs design"]

Technical Debt Identified
────────────────────────────────────────────────────────────
[Issue 1 with file path and line number]
[Issue 2 with file path and line number]
[Etc.]

Gap Analysis for Next Feature (Detail Pages)
────────────────────────────────────────────────────────────
Blockers: [list]
Required before code: [e.g., schema design, data seeding]
Estimated effort: [hours]
Risk factors: [e.g., i18n complexity on new pages]
```

4. **Output this report as a GitHub issue** titled "Factory.ai Status Assessment - [Date]" before proceeding.

---

## Step 2: Confirm Understanding & Alignment

After generating the status report, ask:
- "Does this assessment align with your understanding of project state?"
- "Shall I proceed with [Next Feature from Roadmap], or prioritize differently?"
- "Are there any blockers or decisions needed before I begin coding?"

**DO NOT write any code until explicit confirmation received.**

---

## Step 3: Feature Development (Only After Confirmation)

Follow AGENTS.md specifications for:
- Build commands (`npm run dev`, `npm run build`)
- Code style (TypeScript strict, Material-UI only, no Tailwind)
- Git workflow (feature branches, atomic commits, PR evidence requirements)
- Testing standards (failing tests first for bugs, visual diffs for UI)

---

## Project Management Constraints

- **Work in phases**: Complete one phase fully before starting next (no parallel incomplete features)
- **Daily progress updates**: End each session with commit + summary of: % complete, blockers, next steps
- **Evidence-based completion**: Each feature requires: passing tests, screenshots, deployment verification
- **Metrics tracking**: Update completion percentages in status report after each merge to main

---

## Quality Gates (Non-Negotiable)

Before any PR:
- ✅ `npm run build` succeeds
- ✅ `tsc --noEmit` returns 0 errors
- ✅ `npm run lint` clean
- ✅ Diff confined to feature scope (no unrelated changes)
- ✅ `.next/` not in commit (verify gitignore)
- ✅ Vercel deployment preview link tested (provide URL in PR)

---

## Communication Protocol

- Use bullet lists (7-15 words per bullet, max 25 for complex explanations)
- Number steps when giving instructions
- Push back if requirements ambiguous or risky
- Provide pros/cons for technical decisions
- Ask clarifying questions until 95% confident in approach

---

## Reference Materials

- **AGENTS.md** (this file) - Single source of truth
- **README.md** - Human-readable project overview
- **Supabase docs**: https://supabase.com/docs
- **Material-UI docs**: https://mui.com/material-ui/
- **Next.js 15 docs**: https://nextjs.org/docs

**Begin by executing Step 1 (Status Report) immediately upon workspace initialization.**

---

## Commit Message Standards

Every commit pushed to main must include:

1. **Emoji-prefixed header** with action verb (🔧 Fix, ✨ Add, 🚀 Optimize, 📘 Refactor)
2. **Hierarchical sections** using these emojis where applicable:
   - 🗄️ Database changes (schema, queries, migrations)
   - 🐛 Critical bugs (blocking issues with "CRITICAL:" prefix)
   - 📊 Analytics/monitoring (instrumentation, metrics)
   - 🚀 Performance/deployment (build optimizations, CI/CD)
   - 🔧 Bug fixes (non-blocking issues with root cause)
   - 📘 Architecture (types, patterns, structure)
3. **Checkmark bullets (✅)** with:
   - Specific file paths: `src/lib/supabase.ts`
   - Version numbers: `@vercel/analytics (v1.5.0)`
   - Quantified outcomes: `74 vehicles`, `3 dependencies`, `0 errors`
   - Technical decisions explained: "Uses `force-dynamic` to bypass Next.js cache"
4. **File manifest** when ≥5 files modified:
   - NEW FILES: `+ path (purpose)`
   - MODIFIED FILES: `✏️ path (change summary)`
5. **Validation footer**:

```
✅ Build Status: SUCCESSFUL
✅ TypeScript: No errors
✅ Tests: [passing count]
✅ Lint: Clean
```

**Before committing, verify**:
- Each bullet has actionable detail (not "Updated utils", but "src/lib/utils.ts: Added date formatter")
- Outcomes stated explicitly ("Analytics collecting data" not "Analytics added")
- No passive voice ("Fixed bug" not "Bug was fixed")
- Downstream effects mentioned ("Prevents 6-7 rapid deploys" for .gitignore change)

**Generate commit message drafts in this format for review before pushing.**

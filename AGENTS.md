AGENTS.md Document Structure

Part 1: Project Identity & Status

HEX Test Drive Platform - Egyptian Vehicle Test Drive Service

Next.js 15.1.3 + React 19 + TypeScript 5.7.2 bilingual (EN/AR) vehicle catalog with booking system

Current completion: ~45% (catalog/compare/i18n implemented; detail pages/booking/admin pending)

Part 2: Implemented Features (Status Report)

✅ Completed Components (Deployed to Vercel Production)

Vehicle catalog with 74 cars from Supabase real-time database

Dynamic rendering (force-dynamic) with fresh data on every request

Bilingual i18n (react-i18next) with RTL support; state persistence via Zustand + localStorage

Filter system (type/brand/price) with persisted selections across language switches

Compare functionality (up to 3 vehicles) with flyout and dedicated compare screen

Material-UI (@mui/material) components throughout; Material Icons integration

Vercel Analytics + Speed Insights configured in root layout

GitHub Actions CI/CD with automatic Vercel deployments on main branch

Path aliases (@/* → ./src/*) with TypeScript strict mode

Part 3: Architecture & Tech Stack

Build Commands

Dev server: npm run dev (localhost:3000)

Production build: npm run build && npm run start

Type check: tsc --noEmit

Lint: npm run lint

Deploy: Auto-deploy via Vercel webhook on git push origin main

Folder Structure

src/app/[locale]/ → Next.js App Router pages with i18n routing

src/components/ → Reusable React components (Header, FilterPanel, VehicleCard, etc.)

src/lib/ → Utilities (supabase.ts client, i18n config)

src/stores/ → Zustand stores (compare-store.ts, filter-store.ts with localStorage persistence)

src/types/ → TypeScript definitions (database.ts for Supabase schema, index.ts exports)

Database Schema (Supabase)

Table: vehicles with fields: id, make, model, model_year, price_egp, category, image_url, horsepower, fuel_type, transmission, features[]

External Services

Supabase (PostgreSQL): Vehicle data + future bookings table

Vercel: Hosting + analytics + CDN

GitHub: Version control with TechHypeXP/hex-test-drive-factory repo

Part 4: Conventions & Standards

Code Style (Enforced via ESLint + TypeScript)

TypeScript strict mode; prefer interfaces over types for public APIs

Single quotes, trailing commas, 2-space indentation

100-char line limit; organize imports (React → libraries → local)

No @ts-ignore without documented justification

Material-UI only; forbidden: Tailwind, shadcn, Lucide icons

Git Workflow

Branch from main with feature/<slug> or bugfix/<slug> naming

Commits: atomic with conventional format (feat:, fix:, refactor:)

PR requirements: tests pass, lint clean, TypeScript error-free, .next/ excluded from commits

Force-push allowed only on feature branches via git push --force-with-lease; never on main

Testing Standards

Add failing test first for bug fixes (TDD approach)

Visual diff loop for UI changes with screenshots in PR

No new runtime dependencies without justification in PR description

Part 5: Planned Features (Roadmap with Dependencies)

🔄 In Progress: Vehicle Detail Pages with Trims (~15% complete)

Navigate from catalog card click to /[locale]/vehicle/[id] detail page

Display all trims for selected vehicle model with specs comparison table

Per-trim pricing (EGP) and "Add to Compare" + "Book Test Drive" CTAs

Dependencies: Supabase trims table schema design; Material-UI DataGrid or custom table component

Completion criteria: All 74 vehicles navigable; trim data loads dynamically; booking CTA triggers modal

📅 Upcoming: Booking System (~0% complete)

Booking form with Material-UI DatePicker + TimePicker components

Fields: customer name/email/phone, preferred date/time, venue selection (Cairo/Alexandria/El Gouna)

Form validation via React Hook Form + Zod schema

Save to Supabase bookings table with status tracking (pending/confirmed/completed)

Email confirmation via Supabase Edge Functions + SendGrid integration

Dependencies: bookings table schema; venue data seeded; SendGrid API key in env vars

Completion criteria: Form submits successfully; data persists in DB; admin can view bookings

🔐 Future: Admin Dashboard (~0% complete)

Protected routes with Supabase Auth (email/password login)

Manage vehicles: CRUD operations on vehicles table via DataGrid

View/manage bookings: filter by status, date range; export to CSV

Analytics: test drive conversion rates, popular models, venue utilization

Dependencies: Supabase Auth setup; RLS policies; admin role assignments

Completion criteria: Authenticated admin can CRUD vehicles; booking list with filters functional

Part 6: Known Issues & Gotchas

Language Switching Edge Cases

Filter checkboxes briefly de-select post-switch before persistence kicks in (visual flicker)

Compare page exits to catalog on language change if compare store not fully hydrated

Mitigation: Ensure all stores use persist middleware; test hydration timing in dev

Deployment Warnings

.next/ directory must remain in .gitignore; violations trigger Vercel build warnings

Trace files (webpack-runtime.js) auto-commit if gitignore incomplete

Data Freshness

Next.js caches aggressively; use export const dynamic = 'force-dynamic' on all data-fetching pages

Purge Vercel CDN cache (Invalidate method) after Supabase data updates

Part 7: Evidence Requirements for PR Merge

Objective Proof Checklist

✅ Build succeeds: npm run build completes without errors

✅ Type check passes: tsc --noEmit reports 0 errors

✅ Lint clean: npm run lint returns no warnings

✅ Diff confined: Changes limited to agreed paths (no unrelated file edits)

✅ Tests added: Failing test for bugs; new tests or screenshots for features

✅ Commit message: One-paragraph description covering intent, root cause, and approach

✅ No coverage drop: Code coverage maintained or improved

✅ Analytics check: Vercel Speed Insights + Analytics collecting data post-deploy (30s+ navigation test)

Part 8: Next Steps to Completion

Phase 1: Detail Pages with Trims (days 1-2, ~20 hours)

Design trims table schema in Supabase (columns: vehicle_id, trim_name, price_egp, specs JSON)

Seed trim data for 74 vehicles (minimum 1 trim per vehicle)

Create src/app/[locale]/vehicle/[id]/page.tsx with dynamic routing

Implement trim comparison table with Material-UI DataGrid or custom component

Add "Book Test Drive" modal trigger (placeholder form for now)

Update VehicleCard with onClick navigation to detail page

Test: All cards navigate correctly; trim data loads; i18n switches work on detail pages

Phase 2: Booking System (days 3-4, ~30 hours)

Create bookings table schema (customer_info JSON, booking_datetime, venue_id, status enum)

Seed venues table (Cairo/Alexandria/El Gouna locations with addresses)

Build booking form with React Hook Form + Zod validation

Integrate Material-UI DateTimePicker with min date constraints (next 24 hours)

Implement Supabase insert on form submit with error handling

Create Supabase Edge Function for SendGrid email confirmation

Add confirmation screen with booking reference number

Test: Form validates correctly; data persists; email sends; i18n translations complete

Phase 3: Admin Dashboard (days 5-6, ~25 hours)

Enable Supabase Auth with email/password provider

Create protected /[locale]/admin route with middleware auth check

Build vehicle management DataGrid with inline editing (CRUD)

Implement booking list view with status filters and date range picker

Add CSV export functionality via react-csv library

Create analytics dashboard with Recharts for conversion metrics

Test: Only authenticated admins access; CRUD operations work; export downloads correctly

Overall Project Completion: 45% → 100% (Est. 75 total hours over 6 days)


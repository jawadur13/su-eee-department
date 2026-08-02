# ═══════════════════════════════════════════════════════════════════════
#  00-README.txt
#  OVERVIEW: Mechanical Engineering → EEE Department Website Conversion
# ═══════════════════════════════════════════════════════════════════════

#  ── WHAT THIS IS ──
#  This temporary/ folder contains an instruction set for converting
#  the Sonargaon University Department of Mechanical Engineering website
#  into a complete Department of Electrical and Electronics Engineering
#  (EEE) website.
#
#  The original ME site is a full-featured Next.js 15 department website
#  with CMS, auth, dynamic sections, and database-driven content.
#  The template and structure are being reused; only the department-
#  specific content (text, names, routes, models) is changing.

#  ── WHAT CHANGES ──
#  Phase 01 — Site Identity & Config       (~9 files)
#    SITE_NAME, SITE_URL, meta tags, og image alt, admin titles,
#    Cloudinary folder, package.json name, sitemap, robots, not-found

#  Phase 02 — Hardcoded Component Text     (~7 files)
#    Hero section, overview section, sidebar, email sender, notices,
#    events, splash screen sessionStorage key

#  Phase 03 — Page Metadata               (~30 files)
#    Every public page.tsx title and description "Mechanical → EEE"

#  Phase 04 — Static Data Files           (~10 files)
#    faculty-data, news-data, events-data, alumni-data, clubs-data,
#    research-data, labs-data, notices-data, search-index, data.ts

#  Phase 05 — Mecha Club → SUEEC           (~15 files + renames)
#    Route renames, API renames, admin pages, Prisma models,
#    sidebar nav, admin actions, validation comments, sitemap

#  Phase 06 — Admin Form Defaults           (~5 files)
#    Alumni, prospectus, syllabus, fee structure, designation

#  Phase 07 — Documentation & Assets        (~5 files)
#    README, asset file references, social links, pending items

#  ── WHAT DOES NOT CHANGE (handled separately) ──
#  - scripts/seed.ts — excluded per request (full EEE seed needed later)
#  - Database content — run db:seed after data files are updated
#  - Course codes (ME 2101 → EEE 21xx) — values to be provided
#  - Lab names (Fluid Mechanics → EEE labs) — values to be provided
#  - Faculty member data — needs actual EEE faculty list
#  - Club name "SUEEC" — pending verification
#  - Image assets (mecha-hero.webp → eee-hero.webp) — need actual EEE photos

#  ── KEY DECISIONS (already confirmed by user) ──
#  Degree code:       BSc-EEE
#  Program name:      B.Sc. in Electrical and Electronics Engineering
#  Club name:         SU Electrical and Electronic Club (SUEEC) ⚠ verify
#  Club route:        /about/eee-club
#  Cloudinary folder: sonargaon-eee
#  Vercel URL:        eee-engineering-olive.vercel.app
#  GitHub repo:       https://github.com/jawadur13/su-eee-department

#  ── TOTAL SCOPE ──
#  ~55 source files across ~7 phases
#  ~300+ individual text replacements
#  ~4 directory renames
#  ~4 file renames
#  ~2 Prisma model renames

#  ── HOW TO USE ──
#  Give these files to a coding agent and say:
#    "Execute the changes in temporary/ folder, starting with 01
#     and going through 07 in order."
#
#  Or execute each file manually:
#    - Read the file
#    - Open each referenced source file
#    - Find the OLD text → replace with NEW text
#    - For renames: move/rename directories and files as listed
#    - After all changes: run `npx prisma generate`
#
#  ── POST-CONVERSION STEPS (Dont do these now unless told again) ──
#  1. Update course codes when values are provided
#  2. Update lab names when values are provided
#  3. Replace faculty data with actual EEE faculty
#  4. Replace image assets with EEE-specific photos
#  5. Update seed.ts with full EEE content
#  6. Run `npm run db:seed` to populate database
#  7. Verify club name "SUEEC" and adjust if needed
#  8. Run `npm run dev` and test all pages
#  9. git commit and push to GitHub

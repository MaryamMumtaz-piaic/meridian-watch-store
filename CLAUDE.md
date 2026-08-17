# CLAUDE.md

This file gives Claude Code project-specific context for working in this repository.

## Project overview

**Maison Temps** is a full luxury-watch e-commerce platform (Rolex/Cartier-style) built with Next.js. It is a real, sellable store — products, orders, and users live in a real database via Prisma, and payments go through Stripe. See `README.md` for the full product/build plan and page map.

## Tech stack

- **Framework:** Next.js 16 (App Router) + TypeScript, React 19
- **Styling:** Tailwind CSS v4
- **State:** Zustand (`src/lib/store`) for cart/wishlist
- **Database/ORM:** Prisma, SQLite locally via `DATABASE_URL` (swap to Postgres/Neon for production)
- **Auth:** NextAuth.js (Auth.js) v5, Prisma adapter
- **Payments:** Stripe (`stripe`, `@stripe/stripe-js`)
- **Email:** Resend
- **Forms/validation:** react-hook-form + zod

## Commands

```bash
npm run dev          # start dev server (http://localhost:3000)
npm run build        # production build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit, run this after non-trivial changes
npm run db:push      # push Prisma schema without a migration
npm run db:migrate   # create + apply a migration
npm run db:studio    # open Prisma Studio
npm run db:seed      # seed sample collections/watches
npm run db:reset      # reset db and reseed (destructive — ask before running)
npm run images        # regenerate placeholder SVG assets (scripts/generate-images.ts)
```

## Project structure

```
src/app/          Route segments (App Router) — cart, checkout/*, collections/*, watches/*, actions/
src/components/   UI grouped by domain: cart, catalog, checkout, home, layout, product, ui
src/lib/store/    Zustand stores (cart, wishlist, etc.)
prisma/schema.prisma   Data models (User, Product, Order, Cart, Wishlist, JournalPost, Boutique, ...)
prisma/seed.ts    Seed script (run via `npm run db:seed`)
scripts/          Utility scripts (e.g. image generation)
```

## Conventions

- Money is stored as **integer minor units (cents)** everywhere in the schema and code, to stay exact and match what Stripe expects on the wire — never store prices as floats.
- Prisma is the source of truth for data shape; update `prisma/schema.prisma` and run a migration rather than hand-editing generated client types.
- Server actions live in `src/app/actions`; prefer them over new API routes for form/mutation handling unless a webhook (e.g. Stripe) requires a route handler.
- Follow the existing brand system: serif display font for headings, clean sans for body, black/gold/cream palette, generous whitespace — match the luxury-editorial tone described in `README.md` §1 and §Phase 1.
- Build features in the phase order laid out in `README.md` §4 when doing greenfield work; don't jump ahead of unimplemented dependencies (e.g. checkout before cart).

## Environment

Required `.env` values: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`. See `.env.example` for the full list — never commit real values from `.env`.

## Notes for Claude

- This repo was recently flattened from a `luxury-watch-store/` subfolder into the project root — ignore any stale paths referencing that subfolder in older notes.
- Prefer `npm run typecheck` and `npm run lint` over manual review after edits touching TypeScript files.
- Ask before running destructive database commands (`db:reset`) or touching Stripe live keys.

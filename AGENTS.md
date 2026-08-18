# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository.

## What this is

**Maison Temps** — a full luxury-watch e-commerce platform (Next.js App Router, TypeScript, Prisma, Stripe). It's a real store, not a template: products/orders/users persist in a database and payments run through Stripe. Full product spec, page map, and phased build plan live in `README.md` — read it before starting greenfield work.

## Setup

```bash
npm install
npx prisma migrate dev   # creates local tables
npm run db:seed          # optional: sample collections/watches
npm run dev              # http://localhost:3000
```

Requires a `.env` file (see `.env.example`): `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`.

## Checks to run before finishing a task

```bash
npm run lint
npm run typecheck
npm run build
```

## Code map

- `src/app/` — routes (App Router): `cart`, `checkout/{shipping,payment,review,success,failed}`, `collections/[slug]`, `watches/[slug]`, `actions/` (server actions)
- `src/components/` — grouped by domain: `cart`, `catalog`, `checkout`, `home`, `layout`, `product`, `ui`
- `src/lib/store/` — Zustand stores for client state (cart, wishlist)
- `prisma/schema.prisma` — data models; `prisma/seed.ts` — seed data
- `scripts/` — utility scripts (e.g. `generate-images.ts`)

## Rules

- Store all money as **integer cents**, never floats — this matches what Stripe expects and what the Prisma schema already does.
- Change the data model via `prisma/schema.prisma` + a migration, not by hand-editing generated Prisma client types.
- New form/mutation logic belongs in a server action under `src/app/actions`, not a new API route — reserve route handlers for things that need them (e.g. the Stripe webhook).
- Match the existing brand system (serif display headings, sans body, black/gold/cream palette, generous whitespace) rather than introducing a new visual language.
- When building new features from scratch, follow the phase order in `README.md` §4 (design system → data → catalog pages → cart/checkout → auth → content pages → admin → polish) so later phases aren't built on missing earlier ones.
- Don't commit `.env` or real Stripe/Resend/database credentials; only `.env.example` should be tracked.
- Ask before running destructive commands (`npm run db:reset`, force-pushes) or switching Stripe keys to live mode.

## PR/commit expectations

- Keep commits scoped to one logical change; run lint + typecheck before proposing a commit.
- Update `README.md`'s phase checklist or route map when a described page/feature is actually implemented, so the doc stays accurate.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

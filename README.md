# Maison Temps — Luxury Watch E-Commerce Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe)](https://stripe.com)

End-to-end e-commerce website for luxury watches (Rolex / Cartier style) — full brand storytelling, catalog, checkout, and payments.

**Founder/Developer:** Maryam Mumtaz — Full Stack Developer & AI Agent Engineer
**Stack owner note:** Built to match Maryam's existing skillset (Next.js, TypeScript, Tailwind, Prisma, Neon, Vercel) so it fits her portfolio and can be shipped fast with Claude Code.

Licensed under the [MIT License](./LICENSE). Contributor guidance for AI coding agents lives in [`CLAUDE.md`](./CLAUDE.md) / [`AGENTS.md`](./AGENTS.md).

---

## What this project is

A full luxury-watch e-commerce website — like Rolex.com or Cartier.com — with:
- A brand storytelling front-end (home, about, craftsmanship, journal/magazine)
- A full product catalog (collections → individual watches, with filters, search, wishlist)
- A real shopping flow (cart → 3-step checkout → Stripe payment → order confirmation email)
- Customer accounts (login, order history, saved wishlist)
- An admin panel to manage products and orders (optional, Phase 7)

It's a real, working, sellable store — not a static template. Products, orders, and users are all stored in a real database (Postgres via Prisma), and payments actually go through Stripe.

---

## How it will run (once built)

**Local development:**
```bash
cd luxury-watch-store
npm install
npx prisma migrate dev     # creates tables in your database
npx prisma db seed         # (optional) loads sample watches
npm run dev                # starts the site at http://localhost:3000
```

**What you need before running it:**
1. A Postgres database — easiest is a free [Neon](https://neon.tech) database, copy its connection string
2. A [Stripe](https://stripe.com) account (test mode is fine at first) — get your test API keys
3. A `.env` file in the project root with the values listed in Phase 0 below (`DATABASE_URL`, `STRIPE_SECRET_KEY`, etc.)

**Going live (production):**
```bash
git push                   # push code to GitHub
```
Then connect the GitHub repo to [Vercel](https://vercel.com), add the same `.env` values in Vercel's dashboard (Settings → Environment Variables), and Vercel deploys it automatically. Swap Stripe test keys for live keys once you're ready to accept real payments.

**Day-to-day (after launch):**
- Add/edit watches → through the Admin panel (`/admin/products`) once Phase 7 is built, or directly in the database
- See orders → `/admin/orders`
- Customers checkout → cart → checkout → Stripe takes payment → confirmation email sent automatically → order appears in admin

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript | SEO-friendly SSR, matches your top skill (98%) |
| Styling | Tailwind CSS + shadcn/ui | Fast, luxury-editorial look achievable with custom tokens |
| Animation | Framer Motion | Smooth reveal/scroll animations like Rolex.com |
| Database | PostgreSQL on Neon | Serverless, matches your existing stack |
| ORM | Prisma | Type-safe, you're already at 90%+ |
| Auth | NextAuth.js (Auth.js) — email + Google | Account, order history, wishlist |
| Payments | Stripe Checkout + Webhooks | Card payments, test mode → live mode |
| Images/CDN | Cloudinary or Vercel Blob | Product photography, zoom, 360° views |
| State (cart/wishlist) | Zustand | Lightweight client state |
| Search | Algolia or simple Postgres full-text | Product/collection search |
| Deployment | Vercel | One command, matches your workflow |
| Email | Resend | Order confirmation, shipping emails |

---

## 2. Full Page / Route Map

### Public-facing
1. **Home (`/`)** — Hero video/campaign, featured collections, brand story teaser, new arrivals
2. **Collections (`/collections`)** — All watch families (e.g. "Heritage", "Diver", "Dress", "Chronograph")
3. **Collection Detail (`/collections/[slug]`)** — All watches in that family, filters (case size, material, movement, price)
4. **Product Listing / Shop All (`/watches`)** — Full catalog with filters + sort
5. **Product Detail (`/watches/[slug]`)** — Gallery/zoom, specs (movement, case, water resistance), price, "Add to Cart", "Find in Boutique", related watches
6. **About (`/about`)** — Brand heritage, founder story, craftsmanship/atelier story
7. **Craftsmanship / Savoir-Faire (`/craftsmanship`)** — Movement engineering, materials, sustainability
8. **Journal / Magazine (`/journal`)** + **(`/journal/[slug]`)** — Editorial stories, brand ambassadors, watch care tips
9. **Boutiques / Store Locator (`/boutiques`)** — Map + list of physical stores, book an appointment
10. **Services (`/services`)** — Warranty, repair, authentication, customization/engraving
11. **Contact (`/contact`)** — Form + live chat placeholder
12. **FAQ (`/faq`)**
13. **Wishlist (`/wishlist`)**
14. **Search results (`/search`)**

### Cart & Checkout Flow
15. **Cart (`/cart`)** — Slide-over + full page, quantity, remove, order summary
16. **Checkout — Shipping (`/checkout/shipping`)** — Address form, guest or account
17. **Checkout — Payment (`/checkout/payment`)** — Stripe Elements, order summary sidebar
18. **Checkout — Review (`/checkout/review`)** — Final confirm before pay
19. **Order Confirmation (`/checkout/success`)** — Order number, email sent, tracking info
20. **Order Failed (`/checkout/failed`)**

### Account Area
21. **Login (`/login`)**
22. **Register (`/register`)**
23. **Forgot Password (`/forgot-password`)**
24. **Account Dashboard (`/account`)** — Profile, saved addresses
25. **Order History (`/account/orders`)** + **(`/account/orders/[id]`)**
26. **Wishlist synced to account**

### Admin (Phase 2 — optional but recommended for a real store)
27. **Admin Login (`/admin/login`)**
28. **Dashboard (`/admin`)** — Sales overview
29. **Products CRUD (`/admin/products`)**
30. **Orders management (`/admin/orders`)**
31. **Customers (`/admin/customers`)**

### System pages
32. `not-found` (404), `error`, `sitemap.xml`, `robots.txt`, Privacy Policy, Terms of Service, Shipping & Returns Policy

---

## 3. Database Schema (Prisma models — outline)

- **User** — id, name, email, passwordHash, role (customer/admin), createdAt
- **Address** — id, userId, line1, city, country, postalCode, isDefault
- **Collection** — id, name, slug, description, heroImage
- **Product** — id, name, slug, collectionId, description, movement, caseSize, caseMaterial, waterResistance, price, images[], stock, sku
- **Wishlist** — id, userId, productId
- **Cart / CartItem** — id, userId/sessionId, productId, quantity
- **Order** — id, userId, status, subtotal, shipping, tax, total, stripePaymentId, createdAt
- **OrderItem** — id, orderId, productId, quantity, priceAtPurchase
- **JournalPost** — id, title, slug, content, coverImage, publishedAt
- **Boutique** — id, name, city, address, lat, lng, phone

---

## 4. Build Phases (give these to Claude Code one at a time)

### Phase 0 — Setup (do this first)
```bash
npx create-next-app@latest luxury-watch-store --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"
cd luxury-watch-store
npx shadcn@latest init
npm install prisma @prisma/client zustand framer-motion next-auth @auth/prisma-adapter stripe @stripe/stripe-js resend zod react-hook-form @hookform/resolvers
npx prisma init
```
Then create `.env` with: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `CLOUDINARY_URL` (or Vercel Blob token).

### Phase 1 — Design system & layout
Prompt for Claude Code:
> "Set up a luxury editorial design system in Tailwind: serif display font (e.g. Playfair Display) for headings, clean sans (Inter) for body, black/gold/cream color palette via CSS variables, generous whitespace, thin borders. Build the global Header (logo center, nav left, cart+account icons right, transparent-over-hero on homepage) and Footer (newsletter signup, sitemap columns, social, legal links)."

### Phase 2 — Database + Prisma models
> "Create the Prisma schema for a luxury watch e-commerce site with these models: User, Address, Collection, Product, Wishlist, Cart, CartItem, Order, OrderItem, JournalPost, Boutique [paste schema outline from section 3]. Run migration and seed 3 collections and 12 sample watches with realistic data."

### Phase 3 — Home, Collections, Product pages
> "Build the Home page with a full-screen hero video/image section, featured collections grid, and new arrivals carousel. Then build /collections, /collections/[slug], /watches (with filter sidebar: case size, material, movement, price range), and /watches/[slug] with an image gallery, zoom-on-hover, spec table, and related products."

### Phase 4 — Cart & Checkout
> "Implement a Zustand cart store, a slide-over cart drawer, and a full /cart page. Build the 3-step checkout (shipping → payment → review) using Stripe Checkout/Elements. On successful payment, create an Order + OrderItems in the database via a Stripe webhook, and send a confirmation email via Resend."

### Phase 5 — Auth & Account
> "Add NextAuth.js with email/password and Google login. Build /login, /register, /account dashboard, /account/orders with order history, and sync the wishlist to the logged-in user."

### Phase 6 — About, Craftsmanship, Journal, Boutiques, Contact, FAQ
> "Build the remaining brand pages: /about (heritage storytelling with scroll animations), /craftsmanship, /journal + /journal/[slug] (editorial blog), /boutiques (store locator with map), /contact, /faq, plus Privacy Policy / Terms / Shipping pages."

### Phase 7 — Admin panel (optional)
> "Build a protected /admin area (role-based via NextAuth) with a dashboard showing total sales/orders, a Products CRUD table, and an Orders management table with status updates."

### Phase 8 — Polish & deploy
> "Add SEO metadata (Next.js metadata API) per page, generate sitemap.xml and robots.txt, add loading skeletons, optimize images with next/image, run Lighthouse and fix issues, then deploy to Vercel and connect the custom domain."

---

## 5. How to use this with Claude Code (CLI)

1. Open terminal in an empty folder.
2. Run the **Phase 0** commands above yourself (or paste them to Claude Code as-is).
3. For each phase after that, paste the **quoted prompt** to Claude Code one at a time — don't jump ahead. Let it finish and test each phase before moving to the next.
4. Keep this README in the project root — Claude Code will read it for context if you say "check README.md for the project plan" at the start of a session.

---

## 6. Suggested brand name / placeholder
Using **"Maison Temps"** as a placeholder brand name (French for "House of Time") — replace with your real brand name throughout before launch.
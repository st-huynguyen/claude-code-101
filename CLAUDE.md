# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev       # Start development server at localhost:3000
npm run build     # Build production bundle
npm start         # Start production server (requires build first)
npm run lint      # Run ESLint
```

### Docker Development

```bash
docker compose up -d --build # Start all services (db + webapp)
docker-compose down          # Stop all services
docker-compose logs -f       # View logs
```

## Technology Stack

- **Next.js 16** with App Router (directory-based routing in `app/`)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS 4** for styling
- **shadcn/ui** for UI components
- **Prisma** for database ORM
- **Geist font family** (sans-serif and monospace)

## Architecture

### Folder Structure

```
app/               # Next.js App Router pages and layouts
features/          # Business domains (vertical slices)
  └── <domain>/    # e.g. product/, order/
      ├── actions/     # Server Actions ("use server")
      ├── components/  # Domain-specific UI components
      ├── hooks/       # Client logic / derived state
      ├── services/    # Business logic (framework-agnostic)
      ├── types.ts
      └── constants.ts
shared/            # Domain-agnostic shared code
  ├── ui/          # shadcn/ui components
  ├── components/  # App-level shared components (Header, Footer, etc.)
  ├── hooks/       # Shared React hooks
  ├── utils/       # Pure utility functions
  └── constants/   # App-wide constants
lib/               # Infrastructure only (db, auth, config, integrations)
  └── db/
      ├── prisma.ts    # Prisma client singleton
      └── generated/   # Auto-generated Prisma client (gitignored)
prisma/            # Prisma schema and migrations
docker/            # Docker configuration
  └── local/       # Local development Dockerfile
```

### Data Flow Pattern

```
Page (Server Component) → Action → Service → Prisma → Database
```

- **Pages** (`app/`) — server pages can call services directly; client components call actions
- **Actions** (`features/*/actions/`) — thin wrappers with `"use server"`
- **Services** (`features/*/services/`) — business logic and Prisma queries
- **Prisma client** singleton in `lib/db/prisma.ts`

### Import Rules

Import feature files directly by path. No barrel exports (`index.ts`).

```ts
// Pages can import any feature's files directly
import { getProducts } from '@/features/product/services/get-products';
import type { Product } from '@/features/product/types';
import ProductList from '@/features/product/components/product-list';
```

Cross-feature component imports are not allowed. If a component is needed by multiple features, move it to `shared/ui/` or `shared/components/`.

### Component Locations

- `app/<route>/_components/` — Thin wrapper functions for page-level composition (no business logic)
- `features/<domain>/components/` — Domain-specific UI (ProductCard, OrderTable)
- `shared/components/` — App-level shared components used across many pages (Header, Footer, Sidebar)
- `shared/ui/` — shadcn/ui primitives (Button, Input, Modal)

### Route-Level Files

- Add `loading.tsx` to any route segment that fetches data
- Add `error.tsx` to top-level layout segments (`app/`, `app/admin/`)
- Add `not-found.tsx` for custom 404 pages (e.g., invalid magic link tokens)

### File Naming

All files use lowercase kebab-case: `product-card.tsx`, `use-cart.ts`, `get-products.ts`, `create-order.ts`.

### Conventions

- Server components are the default; use `"use client"` directive for client components
- Path alias `@/*` maps to the project root
- Features are organized by domain (vertical slices)
- `lib/` is for infrastructure only (db, auth, config, integrations) — not pure functions
- `shared/utils/` is for pure utility functions (`cn`, `formatCurrency`, etc.)
- `proxy.ts` handles request-level concerns (auth, redirects)
- `app/api/` is for API routes (webhooks, health checks)
- Dark mode is handled via CSS variables and `prefers-color-scheme`
- Images use Next.js `Image` component for optimization

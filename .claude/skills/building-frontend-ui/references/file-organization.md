# File Organization

## File Naming

All files use lowercase kebab-case:

- Components: `product-card.tsx`
- Hooks: `use-cart.ts`
- Services: `get-products.ts`
- Actions: `create-order.ts`
- Types/constants: `types.ts`, `constants.ts`
- Route files: lowercase (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`)

## Component Locations

### `app/<route>/_components/` — page wrapper functions

Thin wrapper functions that compose domain components and pass data. Only contain layout wiring — no business logic or reusable UI.

```
app/products/_components/
└── product-wrapper.tsx
```

**When to use:** The page needs a client wrapper to connect server data to client domain components, or to handle page-specific layout composition.

### `features/<domain>/components/` — domain-specific UI

Reusable components tied to a business domain. Used by pages within that domain's routes. Can be imported directly by pages.

Examples: ProductCard, OrderTable, EsimStatusBadge

```
features/product/components/
├── product-card.tsx
├── product-list.tsx
└── product-filter.tsx
```

**When to use:** The component displays or interacts with domain data (Product, Order, Esim, etc.).

### `shared/components/` — shared app-level components

Components used across multiple pages or layouts that aren't tied to a single domain. Not shadcn primitives — these are app-specific but reusable everywhere.

Examples: Header, Footer, Sidebar, Breadcrumbs, ThemeToggle

```
shared/components/
├── header.tsx
├── footer.tsx
├── sidebar.tsx
└── theme-toggle.tsx
```

**When to use:** The component appears on multiple pages and is not domain-specific.

### `shared/ui/` — shadcn/ui primitives

Generic, domain-agnostic components installed via `npx shadcn@latest add`. No business logic.

Examples: Button, Input, Label, Form, Card, Dialog, Table

```
shared/ui/
├── button.tsx
├── input.tsx
├── label.tsx
└── form.tsx
```

## Decision Guide

| Question                                                | Location                        |
| ------------------------------------------------------- | ------------------------------- |
| Is it a thin wrapper for one page?                      | `app/<route>/_components/`      |
| Does it display/interact with domain data?              | `features/<domain>/components/` |
| Is it used across many pages (header, footer, sidebar)? | `shared/components/`            |
| Is it a generic UI primitive (button, input, modal)?    | `shared/ui/`                    |

## Feature Folder Structure

```
features/<domain>/
├── actions/         # Server Actions ("use server")
├── components/      # Domain-specific UI
├── hooks/           # Client logic / derived state
├── services/        # Business logic and Prisma queries
├── types.ts         # Domain types
├── constants.ts     # Domain constants
```

### Hooks (`features/<domain>/hooks/`)

Client-side logic, derived state, and data-fetching wrappers scoped to a domain. Used by client components within the same feature.

```
features/product/hooks/
├── use-product.ts        # Fetch/manage single product state
├── use-product-list.ts   # Fetch/manage product list with filters
└── use-product-search.ts # Search/filter logic
```

Import directly:

```ts
import { useProduct } from '@/features/product/hooks/use-product';
```

### Import Rules

Import directly by path. No barrel exports (`index.ts`).

```ts
// Importing in a page
import { getProducts } from '@/features/product/services/get-products';
import type { Product } from '@/features/product/types';
import ProductList from '@/features/product/components/product-list';
```

### Cross-Feature Rules

- **Services/types**: import directly by path (`@/features/product/services/get-products`)
- **Components**: never import across features. If a component is needed by multiple features, move it to `shared/ui/` (generic) or `shared/components/` (shared but domain-aware)
- **Pages** (`app/`): can import any feature's components, services, and types directly — pages sit above the feature layer

```
// ❌ Don't import components across features
import ProductBadge from '@/features/product/components/product-badge';
// in features/order/components/order-detail.tsx

// ✅ Move shared components up
import ProductBadge from '@/shared/components/product-badge';
```

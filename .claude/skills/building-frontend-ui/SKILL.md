---
name: building-frontend-ui
description: >
  Build frontend UI for this Next.js 16 / React 19 / Tailwind CSS 4 / shadcn/ui eSIM e-commerce project.
  Use when creating pages, components, forms, tables, layouts, or any visual UI work.
  Triggers: building pages, creating components, adding UI features, form implementation,
  data display (tables/cards/lists), layout work, styling, responsive design, loading/error states.
---

# Building Frontend UI

## Purpose

Build consistent, maintainable frontend UI for an application using Next.js 16 App Router, React 19, Tailwind CSS 4, and shadcn/ui.

## When to Use

- Creating new pages or route segments
- Building components (domain-specific, shared, or page wrappers)
- Implementing forms, tables, cards, or lists
- Adding layout structure or responsive design
- Styling with Tailwind or semantic color tokens
- Handling loading states, error boundaries, or empty states

## Important Rules

1. **Two component patterns coexist** — custom components use `export default function` with a separate `interface`; shadcn/ui components use plain `function` with named exports. Never modify the shadcn pattern.
2. **No barrel exports** — import everything by direct path (`@/features/product/services/get-products`), never through `index.ts`.
3. **No cross-feature component imports** — if a component is needed by multiple features, move it to `shared/components/` or `shared/ui/`.
4. **All filenames are kebab-case** — `product-card.tsx`, `use-cart.ts`, `get-products.ts`.
5. **Server components are the default** — only add `"use client"` when hooks, event handlers, or browser APIs are needed.
6. **Tailwind utility classes only** — no inline styles, no CSS modules. Use `cn()` for conditional classes.
7. **Strict TypeScript** — no `any`, explicit return types, `import type` for type-only imports.

## Checklist

Before completing any UI task, verify:

- [ ] Component is in the correct location (see file organization reference)
- [ ] Correct component pattern used (custom vs shadcn)
- [ ] Import order follows the 6-group convention
- [ ] `"use client"` added only if needed
- [ ] Semantic color tokens used (not hardcoded colors)
- [ ] Responsive breakpoints applied where needed
- [ ] Loading state handled (`loading.tsx` or skeleton)
- [ ] TypeScript strict — no `any`, explicit return types

## References

- **Component patterns**: See [references/component-patterns.md](references/component-patterns.md) for custom vs shadcn component patterns, export/import orders, loading/error states
- **Common patterns**: See [references/common-patterns.md](references/common-patterns.md) for reusable UI patterns across the project
- **File organization**: See [references/file-organization.md](references/file-organization.md) for naming conventions, component locations, feature structure, cross-feature rules
- **TypeScript standards**: See [references/typescript-standards.md](references/typescript-standards.md) for strict mode, type imports, props interfaces, ActionResult pattern
